"""Derive render-pass-style layers procedurally from a single plate.

usage: python3 -I scripts/procedural-passes.py <frame.png> <out_dir> [--width 1600]

Everything is computed from the pixels of the frame itself:
  depth   Depth Anything V2 (ONNX, CPU) relative depth
  normal  surface normals from depth gradients (tangent colours)
  clay    lambert + cavity shading from those normals, untextured grey
  wire    Delaunay mesh sampled from image detail, drawn as a viewport wireframe
  uv      perspective-correct checker driven by depth
  id      cryptomatte-style object IDs from SLIC over colour+depth
  edges   structure lines (Canny) for the line-up pass
"""
import os, sys
import cv2, numpy as np, onnxruntime as ort
from scipy.spatial import Delaunay
from skimage.segmentation import slic

MODEL = os.path.expanduser('~/.cache/fiip-models/da2s.onnx')


def depth_of(img):
    h, w = img.shape[:2]
    th = 518; tw = int(round(w * th / h / 14)) * 14
    x = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGR2RGB), (tw, th), interpolation=cv2.INTER_CUBIC).astype(np.float32) / 255
    x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    sess = ort.InferenceSession(MODEL, providers=['CPUExecutionProvider'])
    d = sess.run(None, {'pixel_values': x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0]
    d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
    d = (d - d.min()) / (np.ptp(d) + 1e-6)  # 1 = near, 0 = far
    return cv2.bilateralFilter(d.astype(np.float32), 9, 0.05, 7)


def normals_of(d, strength=28.0):
    gx = cv2.Sobel(d, cv2.CV_32F, 1, 0, ksize=5)
    gy = cv2.Sobel(d, cv2.CV_32F, 0, 1, ksize=5)
    n = np.dstack([-gx * strength, gy * strength, np.ones_like(d)])
    return n / np.linalg.norm(n, axis=2, keepdims=True)


def main():
    src, out = sys.argv[1], sys.argv[2]
    width = int(sys.argv[sys.argv.index('--width') + 1]) if '--width' in sys.argv else 1600
    os.makedirs(out, exist_ok=True)
    img = cv2.imread(src)
    img = cv2.resize(img, (width, int(img.shape[0] * width / img.shape[1])), interpolation=cv2.INTER_AREA)
    h, w = img.shape[:2]
    d = depth_of(img)
    sky = (d < 0.06).astype(np.float32)
    sky = cv2.GaussianBlur(sky, (0, 0), 3)
    solid = 1 - sky
    cv2.imwrite(f'{out}/depth.png', (np.dstack([d] * 3) * 255 * solid[..., None]).astype(np.uint8))

    n = normals_of(d)
    nrm = ((n * 0.5 + 0.5)[..., ::-1] * 255 * solid[..., None]).astype(np.uint8)  # RGB=XYZ -> BGR for cv2
    cv2.imwrite(f'{out}/normal.png', nrm)

    light = np.array([-0.55, 0.6, 0.58]); light /= np.linalg.norm(light)
    lam = np.clip((n * light).sum(2), 0, 1)
    cavity = np.clip(1 - 4 * (cv2.GaussianBlur(d, (0, 0), 6) - d), 0.55, 1)
    detail = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    detail = detail - cv2.GaussianBlur(detail, (0, 0), 4)  # high-frequency form only, no texture colour
    clay = (0.18 + 0.62 * lam) * cavity + detail * 0.35
    clay = clay * solid + 0.07 * sky
    cv2.imwrite(f'{out}/clay.png', (np.clip(clay, 0, 1) * 255).astype(np.uint8))

    # Wireframe: points weighted by image detail and depth edges, triangulated.
    rng = np.random.default_rng(7)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), 40, 110)
    cv2.imwrite(f'{out}/edges.png', cv2.merge([edges] * 3) * solid[..., None].astype(np.uint8))
    weight = cv2.GaussianBlur(edges.astype(np.float32), (0, 0), 4) + 6 * cv2.GaussianBlur(np.abs(cv2.Laplacian(d, cv2.CV_32F)), (0, 0), 3) * 255
    weight *= solid; weight += 0.02 * weight.mean() * solid
    p = (weight / weight.sum()).ravel()
    idx = rng.choice(p.size, size=3200, replace=False, p=p)
    pts = np.column_stack([idx % w, idx // w]).astype(np.float32)
    grid = np.mgrid[0:w:w / 24, 0:h:h / 14].reshape(2, -1).T
    grid = grid[solid[grid[:, 1].astype(int), grid[:, 0].astype(int)] > 0.5]
    pts = np.vstack([pts, grid, [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]])
    tri = Delaunay(pts)
    wire = np.zeros((h, w, 3), np.uint8)
    for s in tri.simplices:
        c = pts[s].mean(0).astype(int)
        if solid[min(c[1], h - 1), min(c[0], w - 1)] < 0.5:
            continue
        a = 90 + int(165 * d[min(c[1], h - 1), min(c[0], w - 1)])
        cv2.polylines(wire, [pts[s].astype(np.int32)], True, (a, a, a), 1, cv2.LINE_AA)
    cv2.imwrite(f'{out}/wire.png', wire)

    # UV checker, perspective-correct-ish: coordinates scale with 1/depth.
    ds = cv2.GaussianBlur(d, (0, 0), 9)
    z = 0.35 + 2.0 * (1 - ds)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u = (xx - w * 0.5) / (z * w * 0.035)
    v = (yy - h * 0.48) / (z * w * 0.035) + 6 * ds
    chk = ((np.floor(u) + np.floor(v)) % 2).astype(np.float32)
    fine = ((np.floor(u * 4) + np.floor(v * 4)) % 2).astype(np.float32)
    uv = (0.32 + 0.5 * chk + 0.07 * fine) * (0.55 + 0.45 * lam)
    cv2.imwrite(f'{out}/uv.png', (np.clip(uv * solid, 0, 1) * 255).astype(np.uint8))

    # Cryptomatte-style IDs.
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB).astype(np.float32) / 255
    feats = np.dstack([lab * 0.6, d[..., None] * 2.2])
    seg = slic(feats, n_segments=18, compactness=0.35, channel_axis=2, start_label=0, enforce_connectivity=True)
    pal = np.array([[202, 148, 62], [126, 172, 160], [168, 112, 160], [92, 128, 196], [190, 98, 84], [140, 170, 92], [214, 190, 120], [96, 96, 168], [180, 130, 110], [110, 160, 190]], np.uint8)
    ids = pal[seg % len(pal)][..., ::-1]
    edge = cv2.morphologyEx((seg.astype(np.uint16)), cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8)) > 0
    ids = (ids.astype(np.float32) * (0.55 + 0.45 * lam[..., None]))
    ids[edge] = 255
    cv2.imwrite(f'{out}/id.png', (ids * solid[..., None]).astype(np.uint8))
    cv2.imwrite(f'{out}/beauty.png', img)
    print('passes written to', out, img.shape)


if __name__ == '__main__':
    main()
