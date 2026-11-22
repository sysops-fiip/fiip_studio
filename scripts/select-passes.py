"""Cross-check AI-generated render passes against the frame and the procedural consensus; keep the best.

usage: python3 -I scripts/select-passes.py <hold.png> <procedural_dir> <candidates_dir> <out_dir>
  candidates are named <anything>-<pass>-<variant>.png, e.g. v4-normal-flare.png

Each candidate is
  1. registered to the frame: affine ECC between its sky/solid mask and the consensus mask,
  2. gated: skyline IoU after registration must be >= 0.9,
  3. scored: 0.45 * skyline IoU + 0.35 * edge agreement (F-score of its edges vs the frame's object
     edges within 3 px) + 0.20 * a pass-specific agreement with the procedural consensus:
       depth  - rank correlation with the 12-estimate median depth
       normal - mean cosine between decoded normals and consensus normals
       clay   - correlation of shading with the consensus clay
       others - edge agreement only
The winner per pass is written to out_dir/<pass>.png (registered to the frame); if no candidate passes
the gate, the procedural pass is kept. A JSON report with every score is written beside it.
"""
import os, sys, glob, json
import cv2, numpy as np
from scipy.stats import spearmanr

PASSES = ['depth', 'wire', 'normal', 'clay', 'uv', 'id']


def edges(img, lo=40, hi=110):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) if img.ndim == 3 else img
    return cv2.Canny(cv2.GaussianBlur(g, (5, 5), 0), lo, hi) > 0


def fscore(a, b, tol=3):
    k = np.ones((2 * tol + 1, 2 * tol + 1), np.uint8)
    da = cv2.dilate(a.astype(np.uint8), k) > 0; db = cv2.dilate(b.astype(np.uint8), k) > 0
    p = (a & db).sum() / max(1, a.sum()); r = (b & da).sum() / max(1, b.sum())
    return 2 * p * r / max(1e-6, p + r)


def main():
    hold, pdir, cdir, out = sys.argv[1:5]
    os.makedirs(out, exist_ok=True)
    frame = cv2.imread(hold)
    pd = cv2.imread(f'{pdir}/depth.png', 0)
    h, w = pd.shape
    frame = cv2.resize(frame, (w, h), interpolation=cv2.INTER_AREA)
    solid = (pd > 3).astype(np.float32)
    ref_edges = edges(frame, 30, 90) & (cv2.dilate(solid, np.ones((5, 5))) > 0)
    proc = {k: cv2.imread(f'{pdir}/{k}.png') for k in PASSES}
    pn = proc['normal'][..., ::-1].astype(np.float32) / 127.5 - 1
    report = {}
    for k in PASSES:
        rows = []
        for c in sorted(glob.glob(f'{cdir}/*-{k}-*.png')):
            raw = cv2.imread(c)
            v = cv2.resize(raw, (w, h), interpolation=cv2.INTER_AREA)
            vm = (cv2.cvtColor(v, cv2.COLOR_BGR2GRAY) > (40 if k != 'clay' else 0)).astype(np.float32)
            if k == 'clay':  # clay has a grey sky: treat the darkest top band as sky
                g = cv2.cvtColor(v, cv2.COLOR_BGR2GRAY).astype(np.float32)
                skyv = np.median(g[: h // 8]); vm = (np.abs(g - skyv) > 12).astype(np.float32)
            Wm = np.eye(2, 3, dtype=np.float32)
            try:
                _, Wm = cv2.findTransformECC(cv2.GaussianBlur(cv2.resize(solid, (w // 4, h // 4)), (0, 0), 3), cv2.GaussianBlur(cv2.resize(vm, (w // 4, h // 4)), (0, 0), 3),
                                             Wm, cv2.MOTION_AFFINE, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 300, 1e-6), None, 5)
                Wm[:, 2] *= 4
            except cv2.error:
                pass
            reg = cv2.warpAffine(v, Wm, (w, h), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REPLICATE)
            regm = cv2.warpAffine(vm, Wm, (w, h), flags=cv2.INTER_NEAREST | cv2.WARP_INVERSE_MAP) > 0.5
            iou = float((regm & (solid > 0.5)).sum() / max(1, (regm | (solid > 0.5)).sum()))
            ef = float(fscore(edges(reg) & regm, ref_edges))
            spec = ef
            if k == 'depth':
                g = cv2.cvtColor(reg, cv2.COLOR_BGR2GRAY).astype(np.float32); m = solid > 0.5
                spec = float(max(0, spearmanr(g[m][::37], pd[m][::37]).correlation))
            elif k == 'normal':
                an = reg[..., ::-1].astype(np.float32) / 127.5 - 1; m = solid > 0.5
                an /= np.linalg.norm(an, axis=2, keepdims=True) + 1e-6
                spec = float(max(0, (an[m] * pn[m]).sum(1).mean()))
            elif k == 'clay':
                g = cv2.cvtColor(reg, cv2.COLOR_BGR2GRAY).astype(np.float32); m = solid > 0.5
                spec = float(max(0, np.corrcoef(g[m][::29], cv2.cvtColor(proc['clay'], cv2.COLOR_BGR2GRAY)[m][::29])[0, 1]))
            score = 0.45 * iou + 0.35 * ef + 0.2 * spec
            rows.append({'file': os.path.basename(c), 'iou': round(iou, 3), 'edges': round(ef, 3), 'specific': round(spec, 3), 'score': round(score, 3), 'pass_gate': iou >= 0.9, '_img': reg})
        rows.sort(key=lambda r: -r['score'])
        ok = [r for r in rows if r['pass_gate']]
        win = ok[0] if ok else None
        cv2.imwrite(f'{out}/{k}.png', win['_img'] if win else proc[k])
        report[k] = {'winner': win['file'] if win else 'procedural consensus', 'candidates': [{x: r[x] for x in r if x != '_img'} for r in rows]}
        print(f'{k:7s} -> {report[k]["winner"]:34s} ' + '  '.join(f'{r["file"].split("-")[-1][:-4]}:{r["score"]:.2f}{"" if r["pass_gate"] else "x"}' for r in rows))
    json.dump(report, open(f'{out}/selection.json', 'w'), indent=1)


if __name__ == '__main__':
    main()
