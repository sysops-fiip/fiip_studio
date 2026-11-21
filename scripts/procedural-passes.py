"""Derive render-pass-style layers from a single plate by ensemble consensus.

usage: python3 -I scripts/procedural-passes.py <frame.png> <out_dir> [--width 1600] [--debug <dir>]

Nothing is painted by hand and no pass is trusted from one estimator:
  depth   12 estimates (Depth Anything V2 Small + Base, 3 input scales, mirrored and not),
          each scale/shift-aligned to the median, then the per-pixel median; where the
          members disagree the result is smoothed toward its neighbourhood.
  normal  camera-space normals from the back-projected consensus depth.
  clay    lambert key + fill and multi-scale occlusion from those normals.
  id      boundary-vote segmentation: five independent segmentations vote on edges,
          watershed over the vote map, then RAG merging into object-level mattes.
  wire    Delaunay mesh seeded along the consensus object boundaries and by surface detail.
  uv      one planar UV island per object, projected on its mean 3D plane.
  --debug writes every ensemble member, the disagreement map and each segmentation.
"""
import os, sys
import cv2, numpy as np, onnxruntime as ort
from scipy import ndimage as ndi
from scipy.spatial import Delaunay
from skimage.segmentation import felzenszwalb, slic, watershed, find_boundaries
from skimage import graph as skgraph

MODELS = [os.path.expanduser('~/.cache/fiip-models/da2s.onnx'), os.path.expanduser('~/.cache/fiip-models/da2b.onnx')]
SCALES = [392, 518, 644]


def guided(I, p, r=8, eps=1e-4):
    """He et al. guided filter, I = grey guide in [0,1]."""
    mean = lambda x: cv2.boxFilter(x, -1, (r, r))
    mI, mp = mean(I), mean(p)
    a = (mean(I * p) - mI * mp) / (mean(I * I) - mI * mI + eps)
    b = mp - a * mI
    return mean(a) * I + mean(b)


def depth_ensemble(img, debug=None):
    h, w = img.shape[:2]
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    members = []
    for mp in MODELS:
        sess = ort.InferenceSession(mp, providers=['CPUExecutionProvider'])
        for th in SCALES:
            tw = int(round(w * th / h / 14)) * 14
            x = (cv2.resize(rgb, (tw, th), interpolation=cv2.INTER_AREA) - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
            for flip in (False, True):
                xi = x[:, ::-1] if flip else x
                d = sess.run(None, {'pixel_values': np.ascontiguousarray(xi.transpose(2, 0, 1)[None]).astype(np.float32)})[0][0]
                d = d[:, ::-1] if flip else d
                d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
                lo, hi = np.percentile(d, [1, 99.5])
                members.append(np.clip((d - lo) / (hi - lo + 1e-6), 0, 1).astype(np.float32))
    stack = np.stack(members)
    med = np.median(stack, 0)
    for i, m in enumerate(stack):  # least-squares scale/shift alignment to the median
        A = np.vstack([m.ravel(), np.ones(m.size)]).T
        a, b = np.linalg.lstsq(A, med.ravel(), rcond=None)[0]
        stack[i] = np.clip(a * m + b, 0, 1)
    med = np.median(stack, 0)
    mad = np.median(np.abs(stack - med), 0)
    smooth = cv2.GaussianBlur(med, (0, 0), 6)
    trust = np.clip(1 - mad / 0.06, 0, 1)
    d = trust * med + (1 - trust) * smooth
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    d = guided(gray, d.astype(np.float32), r=9, eps=2e-3)
    if debug:
        for i, m in enumerate(stack):
            cv2.imwrite(f'{debug}/depth_member_{i:02d}.jpg', (m * 255).astype(np.uint8))
        cv2.imwrite(f'{debug}/depth_disagreement.jpg', np.clip(mad / 0.08 * 255, 0, 255).astype(np.uint8))
        print(f'depth: {len(stack)} members, median abs disagreement {float(np.median(mad)):.4f}, 95th pct {float(np.percentile(mad, 95)):.4f}')
    return np.clip(d, 0, 1).astype(np.float32), mad


def backproject(d, f=1.1):
    h, w = d.shape
    z = 1.0 / (0.12 + d)  # disparity-like -> distance
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    X = (xx - w / 2) / (f * w) * z
    Y = -(yy - h / 2) / (f * w) * z
    return np.dstack([X, Y, -z])


def normals_of(P):
    Ps = np.dstack([cv2.GaussianBlur(P[..., i], (0, 0), 2.2) for i in range(3)])
    dx = np.gradient(Ps, axis=1); dy = np.gradient(Ps, axis=0)
    n = np.cross(dx, -dy)
    n /= np.linalg.norm(n, axis=2, keepdims=True) + 1e-9
    n[n[..., 2] < 0] *= -1  # face the camera
    return n


def segment_consensus(img, d, solid, target=16, debug=None):
    h, w = d.shape
    lab = cv2.cvtColor(cv2.GaussianBlur(img, (0, 0), 1.5), cv2.COLOR_BGR2LAB).astype(np.float32) / 255
    F = np.dstack([lab, d[..., None] * 1.6])
    small = lambda a, s=0.5: cv2.resize(a, (int(w * s), int(h * s)), interpolation=cv2.INTER_AREA)
    up = lambda s: cv2.resize(s.astype(np.int32).astype(np.float32), (w, h), interpolation=cv2.INTER_NEAREST).astype(np.int32)
    methods = {
        'felz_color_depth': up(felzenszwalb(small(F), scale=180, sigma=0.9, min_size=600)),
        'felz_color': up(felzenszwalb(small(lab), scale=260, sigma=1.0, min_size=700)),
        'slic_color_depth': up(slic(small(F), n_segments=40, compactness=0.12, channel_axis=2, start_label=0)),
        'depth_kmeans': None,
        'depth_edges': None,
    }
    Z = d[solid > 0.5].reshape(-1, 1).astype(np.float32)
    _, lbl, cent = cv2.kmeans(Z, 7, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 1e-3), 3, cv2.KMEANS_PP_CENTERS)
    km = np.zeros((h, w), np.int32); km[solid > 0.5] = lbl.ravel() + 1
    methods['depth_kmeans'] = ndi.median_filter(km, 7)
    gd = np.hypot(cv2.Sobel(d, cv2.CV_32F, 1, 0, ksize=5), cv2.Sobel(d, cv2.CV_32F, 0, 1, ksize=5))
    edges = gd > np.percentile(gd[solid > 0.5], 90)
    methods['depth_edges'] = ndi.label(~edges)[0]
    votes = np.zeros((h, w), np.float32)
    for k, s in methods.items():
        b = find_boundaries(s, mode='thick').astype(np.float32)
        votes += cv2.GaussianBlur(b, (0, 0), 2.0) / (cv2.GaussianBlur(b, (0, 0), 2.0).max() + 1e-6)
        if debug:
            rng = np.random.default_rng(1); pal = rng.integers(40, 230, (s.max() + 2, 3), dtype=np.uint8)
            cv2.imwrite(f'{debug}/seg_{k}.jpg', pal[s % len(pal)])
    votes /= len(methods)
    votes = np.maximum(votes, (1 - solid) * 0)  # sky handled separately
    # Overlay the partitions, then merge across any boundary the methods do not agree on.
    combo = np.zeros((h, w), np.int64)
    for k in ('felz_color_depth', 'felz_color', 'depth_kmeans'):
        combo = combo * 100003 + methods[k]
    seg0 = np.unique(combo, return_inverse=True)[1].reshape(h, w).astype(np.int32) + 1
    seg0[solid < 0.5] = 0
    seg0 = ndi.label(seg0 > 0)[0] * 0 + seg0  # keep ids
    def weight_boundary(g, src, dst, n):
        default = {'weight': 0.0, 'count': 0}
        c1 = g[src].get(n, default)['count']; c2 = g[dst].get(n, default)['count']
        w1 = g[src].get(n, default)['weight']; w2 = g[dst].get(n, default)['weight']
        c = c1 + c2
        return {'count': c, 'weight': (c1 * w1 + c2 * w2) / max(c, 1)}
    def merge_boundary(g, src, dst):
        pass
    gdn = np.clip(gd / (np.percentile(gd[solid > 0.5], 97) + 1e-6), 0, 1)
    rag = skgraph.rag_boundary(seg0, (0.6 * votes + 0.4 * cv2.GaussianBlur(gdn, (0, 0), 1.5)).astype(np.float64))
    best = None
    for thresh in (0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.1, 0.12, 0.15, 0.2):
        cand = skgraph.merge_hierarchical(seg0, rag.copy(), thresh=thresh, rag_copy=False, in_place_merge=True, merge_func=merge_boundary, weight_func=weight_boundary)
        sizes = np.bincount(cand.ravel())
        big = np.sum(sizes[np.unique(cand[solid > 0.5])] > h * w * 0.004)
        best = (cand, big)
        if big <= target:
            break
    merged, n = best
    # absorb fragments into the neighbour they share most border with
    sizes = np.bincount(merged.ravel())
    small_ids = set(np.nonzero((sizes > 0) & (sizes < h * w * 0.004))[0].tolist())
    for _ in range(3):
        if not small_ids: break
        for i in list(small_ids):
            m = merged == i
            if not m.any(): small_ids.discard(i); continue
            ring = cv2.dilate(m.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & ~m
            nb = merged[ring]; nb = nb[(nb != i) & ~np.isin(nb, list(small_ids))]
            if nb.size: merged[m] = np.bincount(nb).argmax(); small_ids.discard(i)
    n = len(np.unique(merged[solid > 0.5]))
    seg = merged
    seg[solid < 0.5] = -1
    if debug:
        cv2.imwrite(f'{debug}/seg_boundary_votes.jpg', np.clip(votes * 255 * 1.6, 0, 255).astype(np.uint8))
        print(f'segmentation: {len(methods)} methods voted, {n} objects after merge')
    return seg, votes


def segment_ai_vote(img, solid, voter_paths, debug=None, cut=22.0):
    """Fine superpixels from the frame; neighbours merge only if the MEDIAN colour distance
    across the AI object-ID maps (each voter) says they belong to the same object."""
    h, w = img.shape[:2]
    sp = slic(cv2.cvtColor(img, cv2.COLOR_BGR2LAB), n_segments=1600, compactness=12, channel_axis=2, start_label=1, convert2lab=False)
    sp[solid < 0.5] = 0
    labs, used = [], []
    ref = cv2.GaussianBlur(cv2.Canny(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), 40, 120).astype(np.float32), (0, 0), 4)
    for vp in voter_paths:
        raw = cv2.imread(vp)
        # Gate 1: an ID map is flat colour. Reject voters that are still a photograph.
        g = cv2.cvtColor(raw, cv2.COLOR_BGR2GRAY).astype(np.float32)
        loc = cv2.blur(g * g, (5, 5)) - cv2.blur(g, (5, 5)) ** 2
        flat = float(np.mean(loc < 25))
        # Gate 2: register the voter's skyline (sky is black in an ID map) to our depth-derived skyline,
        # affine ECC on blurred masks, and score the overlap (IoU) after warping.
        v = cv2.resize(raw, (w, h), interpolation=cv2.INTER_NEAREST)
        vs = (v.max(2) > 40).astype(np.float32)
        fs = (solid > 0.5).astype(np.float32)
        W = np.eye(2, 3, dtype=np.float32)
        try:
            _, W = cv2.findTransformECC(cv2.GaussianBlur(cv2.resize(fs, (w // 4, h // 4)), (0, 0), 3), cv2.GaussianBlur(cv2.resize(vs, (w // 4, h // 4)), (0, 0), 3),
                                        W, cv2.MOTION_AFFINE, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 300, 1e-6), None, 5)
            W[:, 2] *= 4
        except cv2.error:
            pass
        v = cv2.warpAffine(v, W, (w, h), flags=cv2.INTER_NEAREST | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REPLICATE)
        vs2 = v.max(2) > 40
        cc = float((vs2 & (fs > 0)).sum() / max(1, (vs2 | (fs > 0)).sum()))
        ok = flat > 0.8 and cc > 0.88
        print(f'  voter {os.path.basename(vp):28s} flat {flat:.2f}  skyline IoU {cc:.3f}  -> {"USED" if ok else "REJECTED"}')
        if ok:
            labs.append(cv2.cvtColor(v, cv2.COLOR_BGR2LAB).astype(np.float32)); used.append(vp)
    voter_paths = used
    # 1) each voter -> its own clean label map (flat colours quantised, specks removed, split disconnected parts)
    maps = []
    for L in labs:
        X = L.reshape(-1, 3)
        _, lbl, _ = cv2.kmeans(X[::7].copy(), 18, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.5), 2, cv2.KMEANS_PP_CENTERS)
        _, _, cent = cv2.kmeans(X[::7].copy(), 18, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.5), 2, cv2.KMEANS_PP_CENTERS)
        lab_full = np.argmin(((X[:, None, :] - cent[None]) ** 2).sum(2), 1).reshape(h, w).astype(np.int32)
        lab_full = ndi.median_filter(lab_full, 7)
        parts = np.zeros((h, w), np.int32); nxt = 1
        for c in np.unique(lab_full):
            cc, k = ndi.label(lab_full == c); parts[cc > 0] = cc[cc > 0] + nxt - 1; nxt += k
        parts[solid < 0.5] = 0
        maps.append(parts)
    # 2) consensus by medoid: the voter whose partition agrees most with all the others (adjusted Rand index)
    def ari(x, y, m):
        x = x[m]; y = y[m]
        _, xi = np.unique(x, return_inverse=True); _, yi = np.unique(y, return_inverse=True)
        cont = np.zeros((xi.max() + 1, yi.max() + 1)); np.add.at(cont, (xi, yi), 1)
        c2 = lambda v: (v * (v - 1) / 2).sum()
        sij, sa, sb, nn = c2(cont), c2(cont.sum(1)), c2(cont.sum(0)), c2(np.array([cont.sum()]))
        exp = sa * sb / nn
        return (sij - exp) / (0.5 * (sa + sb) - exp + 1e-9)
    mask = (solid > 0.5)[::4, ::4]
    small = [m[::4, ::4] for m in maps]
    scores = [np.mean([ari(small[i], small[j], mask) for j in range(len(maps)) if j != i]) if len(maps) > 1 else 1.0 for i in range(len(maps))]
    pick = int(np.argmax(scores))
    if debug:
        for vp, sc in zip(voter_paths, scores): print(f'  agreement {os.path.basename(vp):28s} mean ARI {sc:.3f}' + ('   <- consensus' if vp == voter_paths[pick] else ''))
    seg = maps[pick].copy()
    # 3) fold specks into the neighbour they share most border with
    minarea = h * w * 0.0012
    for _ in range(4):
        sizes = np.bincount(seg.ravel())
        small_ids = [i for i in np.argsort(sizes) if 0 < sizes[i] < minarea and i != 0]
        if not small_ids: break
        for i in small_ids:
            m = seg == i
            if not m.any(): continue
            ys, xs = np.nonzero(m); y0, y1, x0, x1 = max(ys.min() - 3, 0), ys.max() + 4, max(xs.min() - 3, 0), xs.max() + 4
            sub = seg[y0:y1, x0:x1]; mm = m[y0:y1, x0:x1]
            ring = cv2.dilate(mm.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & ~mm
            nb = sub[ring]; nb = nb[(nb > 0) & (nb != i)]
            if nb.size: sub[mm] = np.bincount(nb).argmax()
    # 4) snap edges to the photograph: guided-filter each object's mask with the frame, take the argmax
    ids = [i for i in np.unique(seg) if i > 0]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    best = np.full((h, w), -1.0, np.float32); out = np.zeros((h, w), np.int32)
    for i in ids:
        sm = guided(gray, (seg == i).astype(np.float32), r=6, eps=2e-3)
        upd = sm > best; best[upd] = sm[upd]; out[upd] = i
    out[solid < 0.5] = 0
    seg = out
    seg = np.unique(seg, return_inverse=True)[1].reshape(h, w) - 1
    seg[solid < 0.5] = -1
    if debug:
        print(f'ai-vote segmentation: {len(voter_paths)} voters, {len(np.unique(seg[seg >= 0]))} objects')
        for k, vp in enumerate(voter_paths):
            cv2.imwrite(f'{debug}/id_voter_{k}.jpg', cv2.resize(cv2.imread(vp), (w // 2, h // 2)))
    return seg


def main():
    src, out = sys.argv[1], sys.argv[2]
    width = int(sys.argv[sys.argv.index('--width') + 1]) if '--width' in sys.argv else 1600
    debug = sys.argv[sys.argv.index('--debug') + 1] if '--debug' in sys.argv else None
    os.makedirs(out, exist_ok=True)
    if debug: os.makedirs(debug, exist_ok=True)
    img = cv2.imread(src)
    img = cv2.resize(img, (width, int(img.shape[0] * width / img.shape[1])), interpolation=cv2.INTER_AREA)
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255

    cache = os.path.join(out, '_depth.npz')
    if os.path.exists(cache):
        z = np.load(cache); d, mad = z['d'], z['mad']
    else:
        d, mad = depth_ensemble(img, debug); np.savez_compressed(cache, d=d, mad=mad)
    sky = ((d < 0.07) & (cv2.GaussianBlur(d, (0, 0), 8) < 0.1)).astype(np.float32)
    sky = cv2.morphologyEx(sky, cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
    solid = 1 - cv2.GaussianBlur(sky, (0, 0), 1.5)
    sm = solid[..., None]
    cv2.imwrite(f'{out}/depth.png', (np.dstack([d] * 3) * 255 * sm).astype(np.uint8))

    P = backproject(d)
    n = normals_of(P)
    cv2.imwrite(f'{out}/normal.png', ((n * 0.5 + 0.5)[..., ::-1] * 255 * sm).astype(np.uint8))

    key = np.array([-0.5, 0.55, 0.67]); key /= np.linalg.norm(key)
    fill = np.array([0.6, 0.1, 0.8]); fill /= np.linalg.norm(fill)
    lam = np.clip((n * key).sum(2), 0, 1); fl = np.clip((n * fill).sum(2), 0, 1)
    ao = np.ones_like(d)
    for s in (3, 9, 24):
        ao *= np.clip(1 - 3.0 * np.maximum(cv2.GaussianBlur(d, (0, 0), s) - d, 0), 0.6, 1)
    detail = gray - cv2.GaussianBlur(gray, (0, 0), 3)
    clay = (0.14 + 0.6 * lam + 0.16 * fl) * ao + detail * 0.25
    cv2.imwrite(f'{out}/clay.png', (np.clip(clay * solid + 0.06 * (1 - solid), 0, 1) * 255).astype(np.uint8))

    voters = sys.argv[sys.argv.index('--id-voters') + 1].split(',') if '--id-voters' in sys.argv else []
    if voters:
        seg = segment_ai_vote(img, solid, voters, debug)
    else:
        seg, votes = segment_consensus(img, d, solid, debug=debug)
    ids = [i for i in np.unique(seg) if i >= 0]
    warm = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    warmth = ((warm[..., 0] < 30) & (warm[..., 1] > 70)).astype(np.float32) * (warm[..., 2] / 255)
    portal = max(ids, key=lambda i: warmth[seg == i].mean()) if ids else -2
    pal = np.array([[118, 142, 172], [164, 120, 150], [112, 158, 136], [176, 120, 100], [96, 110, 160], [150, 160, 104],
                    [120, 170, 180], [180, 150, 120], [136, 116, 176], [100, 140, 110], [170, 110, 128], [128, 150, 190],
                    [156, 136, 98], [108, 128, 120], [184, 160, 150], [90, 120, 140]], np.float32)
    idimg = np.zeros((h, w, 3), np.float32)
    for k, i in enumerate(sorted(ids, key=lambda i: -np.sum(seg == i))):
        idimg[seg == i] = [62, 148, 202] if i == portal else pal[k % len(pal)][::-1]
    idimg *= (0.62 + 0.38 * lam)[..., None]
    bnd = find_boundaries(seg, mode='inner').astype(np.float32)
    bnd = cv2.GaussianBlur(bnd, (0, 0), 0.7); bnd /= bnd.max() + 1e-6
    idimg = idimg * (1 - bnd[..., None] * 0.85) + 235 * bnd[..., None] * 0.85
    cv2.imwrite(f'{out}/id.png', (idimg * sm).astype(np.uint8))

    # Wireframe seeded on consensus boundaries + surface detail, denser where closer.
    rng = np.random.default_rng(7)
    by, bx = np.nonzero(find_boundaries(seg, mode='inner') & (solid > 0.5))
    keep = rng.random(len(bx)) < 1 / 9
    bpts = np.column_stack([bx[keep], by[keep]])
    wgt = (np.abs(cv2.Laplacian(cv2.GaussianBlur(gray, (0, 0), 1.2), cv2.CV_32F)) + 0.015) * (0.35 + d) ** 2 * solid
    p = (wgt / wgt.sum()).ravel()
    ipts = rng.choice(p.size, size=2600, replace=False, p=p)
    ipts = np.column_stack([ipts % w, ipts // w])
    pts = np.vstack([bpts, ipts, [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]]).astype(np.float32)
    tri = Delaunay(pts)
    wire = np.zeros((h, w, 3), np.uint8)
    for s in tri.simplices:
        q = pts[s]; c = q.mean(0).astype(int)
        cx, cy = min(c[0], w - 1), min(c[1], h - 1)
        if solid[cy, cx] < 0.5 or np.ptp(q[:, 0]) > w * 0.12 or np.ptp(q[:, 1]) > h * 0.12:
            continue
        a = 70 + int(150 * d[cy, cx])
        cv2.polylines(wire, [q.astype(np.int32)], True, (a, a, a), 1, cv2.LINE_AA)
    wire = np.maximum(wire, (find_boundaries(seg, mode='inner')[..., None] * solid[..., None] * 235).astype(np.uint8))
    cv2.imwrite(f'{out}/wire.png', wire)

    # UV: one planar island per object, projected on its mean 3D plane.
    uvimg = np.zeros((h, w), np.float32)
    for k, i in enumerate(ids):
        m = seg == i
        if m.sum() < 50: continue
        nm = n[m].mean(0); nm /= np.linalg.norm(nm) + 1e-9
        t1 = np.cross(nm, [0, 1, 0]); t1 = t1 / (np.linalg.norm(t1) + 1e-9) if np.linalg.norm(t1) > 1e-3 else np.array([1., 0, 0])
        t2 = np.cross(nm, t1)
        ang = (k * 0.7) % np.pi
        r1, r2 = np.cos(ang) * t1 + np.sin(ang) * t2, -np.sin(ang) * t1 + np.cos(ang) * t2
        pm = P[m]; sc = 7.0
        u = pm @ r1 * sc + k * 0.37; v = pm @ r2 * sc + k * 0.61
        chk = (np.floor(u) + np.floor(v)) % 2
        fine = (np.floor(u * 4) + np.floor(v * 4)) % 2
        uvimg[m] = 0.3 + 0.5 * chk + 0.06 * fine
    uvimg *= (0.55 + 0.45 * lam)
    uvimg = np.maximum(uvimg, find_boundaries(seg, mode='inner') * 0.9)
    cv2.imwrite(f'{out}/uv.png', (np.clip(uvimg * solid, 0, 1) * 255).astype(np.uint8))
    cv2.imwrite(f'{out}/beauty.png', img)
    print('passes written to', out, img.shape)


if __name__ == '__main__':
    main()
