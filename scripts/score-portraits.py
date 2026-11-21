"""Pick the most faithful portrait candidate per person, then match exposure across the set.

usage: python3 -I scripts/score-portraits.py <refs.json> <candidates_dir> <out_dir>
  refs.json: {"slug": "path/to/real-photo.jpg", ...}
  candidates_dir: any *.png whose name contains the slug (e.g. cand-ganesh-s101.png, v3-ganesh.png)

Identity = cosine similarity of ArcFace embeddings (insightface buffalo_l) between the real photo
and each candidate; the highest wins. Exposure = the face region's luminance (median and 95th
percentile) is mapped onto the set's median values with a levels + gamma adjustment, so no
portrait reads brighter or flatter than the rest.
"""
import os, sys, glob, json
import cv2, numpy as np
from insightface.app import FaceAnalysis

app = FaceAnalysis(name='buffalo_l', allowed_modules=['detection', 'recognition'], providers=['CPUExecutionProvider'])
app.prepare(ctx_id=-1, det_size=(640, 640))


def face(img):
    f = app.get(img)
    return max(f, key=lambda x: (x.bbox[2] - x.bbox[0]) * (x.bbox[3] - x.bbox[1])) if f else None


def face_lum(img, f):
    x0, y0, x1, y1 = [int(v) for v in f.bbox]
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)[max(y0, 0):y1, max(x0, 0):x1].astype(np.float32)
    return float(np.median(g)), float(np.percentile(g, 95))


def main():
    refs = json.load(open(sys.argv[1])); cdir, out = sys.argv[2], sys.argv[3]
    os.makedirs(out, exist_ok=True)
    picks, report = {}, {}
    for slug, rp in refs.items():
        r = face(cv2.imread(rp))
        if r is None:
            print('no face in reference', slug); continue
        cands = [c for c in glob.glob(os.path.join(cdir, '*.png')) if f'-{slug}.' in c or f'-{slug}-s' in c]
        scored = []
        for c in cands:
            f = face(cv2.imread(c))
            if f is not None:
                scored.append((float(np.dot(r.normed_embedding, f.normed_embedding)), c))
        scored.sort(reverse=True)
        report[slug] = [(round(s, 3), os.path.basename(c)) for s, c in scored]
        if scored:
            picks[slug] = scored[0][1]
            print(f'{slug:18s} ' + '  '.join(f'{os.path.basename(c).split(slug)[-1].strip("-.png") or "v3"}={s:.3f}' for s, c in scored))
    # exposure match on the face region
    stats = {}
    for slug, c in picks.items():
        img = cv2.imread(c); f = face(img); stats[slug] = (img, f, face_lum(img, f))
    tm = np.median([s[2][0] for s in stats.values()]); th = np.median([s[2][1] for s in stats.values()])
    for slug, (img, f, (m, hi)) in stats.items():
        x = img.astype(np.float32) / 255
        # levels: map this face's 95th percentile onto the set's, then gamma so its median lands on the set's median
        scale = (th / 255) / max(hi / 255, 1e-3)
        x = np.clip(x * scale, 0, 1)
        m2 = min(max(m / 255 * scale, 1e-3), 0.999)
        gamma = np.log(tm / 255) / np.log(m2)
        x = np.clip(x ** gamma, 0, 1)
        cv2.imwrite(os.path.join(out, f'{slug}.png'), (x * 255).astype(np.uint8))
        print(f'  exposure {slug:18s} face median {m:5.1f} -> {tm:5.1f}   p95 {hi:5.1f} -> {th:5.1f}')
    json.dump({'scores': report, 'picks': {k: os.path.basename(v) for k, v in picks.items()}}, open(os.path.join(out, 'scores.json'), 'w'), indent=1)


if __name__ == '__main__':
    main()
