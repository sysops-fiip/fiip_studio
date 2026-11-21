"""Align studio portraits so every face shares eye position and scale.

usage: python3 scripts/align-portraits.py <in_dir> <out_dir> [--sheet path]
Detects 5-point landmarks (insightface), then applies a similarity transform
that puts the eye centres on fixed pixels of a 1600x2000 canvas. Background is
extended with the image's own edge colour, so no borders appear.
"""
import sys, os, glob, cv2, numpy as np
from insightface.app import FaceAnalysis

W, H = 1200, 1500
LEFT_EYE, RIGHT_EYE = (W * 0.405, H * 0.385), (W * 0.595, H * 0.385)  # 19% of width apart

def main():
    src, dst = sys.argv[1], sys.argv[2]
    sheet = sys.argv[sys.argv.index('--sheet') + 1] if '--sheet' in sys.argv else None
    os.makedirs(dst, exist_ok=True)
    app = FaceAnalysis(name='buffalo_l', allowed_modules=['detection'], providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
    app.prepare(ctx_id=0, det_size=(640, 640))
    done = []
    for f in sorted(glob.glob(os.path.join(src, '*.png')) + glob.glob(os.path.join(src, '*.jpg'))):
        img = cv2.imread(f)
        faces = app.get(img)
        if not faces:
            print('NO FACE', f); continue
        face = max(faces, key=lambda x: (x.bbox[2] - x.bbox[0]) * (x.bbox[3] - x.bbox[1]))
        le, re_ = face.kps[0], face.kps[1]
        roll = np.degrees(np.arctan2(re_[1] - le[1], re_[0] - le[0]))
        M, _ = cv2.estimateAffinePartial2D(np.array([le, re_], np.float32), np.array([LEFT_EYE, RIGHT_EYE], np.float32))
        out = cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
        name = os.path.splitext(os.path.basename(f))[0]
        cv2.imwrite(os.path.join(dst, name + '.png'), out)
        scale = float(np.hypot(M[0, 0], M[0, 1]))
        print(f'{name:28s} roll {roll:+5.1f}deg  scale x{scale:.2f}  eyes-dist-src {np.linalg.norm(re_-le):.0f}px')
        done.append(out)
    if sheet and done:
        th = [cv2.resize(o, (320, 400)) for o in done]
        for t in th:
            cv2.line(t, (0, int(400 * .385)), (320, int(400 * .385)), (62, 148, 202), 1)
        rows = [np.hstack(th[i:i + 5] + [np.zeros_like(th[0])] * (5 - len(th[i:i + 5]))) for i in range(0, len(th), 5)]
        avg = np.mean(np.stack([cv2.resize(o, (320, 400)).astype(np.float32) for o in done]), 0).astype(np.uint8)
        cv2.imwrite(sheet, np.vstack(rows)); cv2.imwrite(sheet.replace('.jpg', '-overlay.jpg'), avg)

if __name__ == '__main__':
    main()
