"""Procedural hold states for the page heroes, computed on the exact hold frame (so wipes line up).

usage: python3 -I scripts/hero-states.py <kind> <hold_frame.png> <out_dir>
  disciplines : raw plate -> the cut -> VFX cleanup -> colour -> mastering
  work        : the warm plate shows real project stills from public/images/work
  studio      : the real studio portraits develop from negative to positive on the lightbox
Writes <id>.png states and labels.json for scripts/build-page-hero.py.
"""
import json, os, sys
import cv2, numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
ACC = (202, 148, 62)


def save(img, path):
    (Image.fromarray(img[..., ::-1]) if isinstance(img, np.ndarray) else img).save(path)


def disciplines(F, out):
    h, w = F.shape[:2]
    f = F.astype(np.float32) / 255
    # raw / log look: lifted blacks, compressed contrast, low saturation, slight green cast
    g = f.mean(2, keepdims=True)
    log = 0.18 + 0.62 * (g + 0.35 * (f - g)) ** 0.75
    log[..., 1] *= 1.03
    raw = (np.clip(log, 0, 1) * 255).astype(np.uint8)
    clean = raw.copy()
    # rig wire + tracking markers on the raw plate (removed again in the VFX state)
    wire = raw.copy()
    cv2.line(wire, (int(w * .62), 0), (int(w * .70), int(h * .62)), (205, 205, 200), max(1, w // 1100), cv2.LINE_AA)
    for (x, y) in [(.18, .3), (.42, .22), (.81, .34), (.27, .7), (.74, .76)]:
        cx, cy, s = int(w * x), int(h * y), max(6, w // 160)
        cv2.line(wire, (cx - s, cy), (cx + s, cy), (230, 230, 225), max(1, w // 900), cv2.LINE_AA)
        cv2.line(wire, (cx, cy - s), (cx, cy + s), (230, 230, 225), max(1, w // 900), cv2.LINE_AA)
    # the cut: timecode burn-in + slate data, as an editor sees it
    cut = Image.fromarray(wire[..., ::-1].copy()); d = ImageDraw.Draw(cut)
    fs = max(14, w // 70); font = ImageFont.truetype(MONO, fs)
    pad = int(w * .03)
    d.rectangle((0, h - fs * 3, w, h), fill=(8, 8, 8))
    d.text((pad, h - fs * 2.3), 'SC 12  TK 3  A001_C014', font=font, fill=(220, 220, 214))
    d.text((w - pad - d.textlength('01:02:14:08', font=font), h - fs * 2.3), '01:02:14:08', font=font, fill=ACC)
    d.text((pad, pad * .7), 'V1  REC 709 PREVIEW', font=font, fill=(170, 170, 166))
    # mastering: final frame with 2.39:1 delivery mask and title-safe guides
    mast = F.copy()
    bar = int((h - w / 2.39) / 2)
    mast[:bar] = 0; mast[h - bar:] = 0
    m = Image.fromarray(mast[..., ::-1].copy()); d = ImageDraw.Draw(m)
    sx, sy = int(w * .1), int(bar + (h - 2 * bar) * .1)
    d.rectangle((sx, sy, w - sx, h - sy), outline=(120, 120, 116), width=max(1, w // 1400))
    d.text((pad, bar // 2 - fs // 2), 'DCI 2.39:1  ·  DCP / IMF  ·  P3-D65', font=font, fill=(200, 200, 194))
    d.text((w - pad - d.textlength('MASTER v012', font=font), h - bar // 2 - fs // 2), 'MASTER v012', font=font, fill=ACC)
    states = [('raw', Image.fromarray(wire[..., ::-1]), 'Raw plate', 'Log · ungraded · on-set markers', '#7c7f7a'),
              ('cut', cut, 'Editorial', 'The cut · timecode and slate', '#e4e4df'),
              ('vfx', Image.fromarray(clean[..., ::-1]), 'Visual effects', 'Rig wire and trackers removed', '#8f86d8'),
              ('colour', Image.fromarray(F[..., ::-1]), 'Colour', 'The grade · from log to final', '#ca943e'),
              ('master', m, 'Conform & mastering', 'Delivery masters · 2.39:1', '#bdbdb8')]
    return states


def find_bright_quad(F, min_area=0.02):
    g = cv2.cvtColor(F, cv2.COLOR_BGR2GRAY)
    _, t = cv2.threshold(cv2.GaussianBlur(g, (9, 9), 0), 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    t = cv2.morphologyEx(t, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
    cs, _ = cv2.findContours(t, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(cs, key=cv2.contourArea)
    if cv2.contourArea(c) < min_area * g.size: raise SystemExit('no bright region found')
    q = cv2.approxPolyDP(cv2.convexHull(c), 0.02 * cv2.arcLength(c, True), True).reshape(-1, 2)
    if len(q) != 4: q = cv2.boxPoints(cv2.minAreaRect(c))
    s = q.sum(1); dd = np.diff(q, axis=1).ravel()
    return np.array([q[np.argmin(s)], q[np.argmin(dd)], q[np.argmax(s)], q[np.argmax(dd)]], np.float32)  # tl, tr, br, bl


def place(F, img, quad, alpha_mask_feather=6, blend=0.94):
    h, w = F.shape[:2]
    src = np.array([[0, 0], [img.shape[1], 0], [img.shape[1], img.shape[0]], [0, img.shape[0]]], np.float32)
    H = cv2.getPerspectiveTransform(src, quad)
    warped = cv2.warpPerspective(img, H, (w, h), flags=cv2.INTER_LANCZOS4)
    mask = cv2.warpPerspective(np.ones(img.shape[:2], np.float32), H, (w, h))
    mask = cv2.GaussianBlur(mask, (0, 0), alpha_mask_feather) * blend
    return (F * (1 - mask[..., None]) + warped * mask[..., None]).astype(np.uint8)


def work(F, out):
    studio = json.load(open(os.path.join(ROOT, 'content/studio.json')))
    quad = find_bright_quad(F)
    # light falloff of the plate (so the still glows like the plate did)
    glow = cv2.GaussianBlur(cv2.cvtColor(F, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255, (0, 0), 25)
    states = []
    for wk in studio['homepage']['featured'][:3]:
        src = cv2.imread(os.path.join(ROOT, 'public', wk['image'].lstrip('/')))
        tw, th = int(np.linalg.norm(quad[1] - quad[0])), int(np.linalg.norm(quad[3] - quad[0]))
        sh, sw = src.shape[:2]; s = max(tw / sw, th / sh); src = cv2.resize(src, (int(sw * s), int(sh * s)), interpolation=cv2.INTER_AREA)
        y0, x0 = (src.shape[0] - th) // 2, (src.shape[1] - tw) // 2; src = src[y0:y0 + th, x0:x0 + tw]
        img = place(F, src, quad)
        img = np.clip(img.astype(np.float32) * (0.82 + 0.3 * glow[..., None]), 0, 255).astype(np.uint8)
        states.append((wk['id'].replace('project-', ''), Image.fromarray(img[..., ::-1]), wk['name'], f"{wk['subtitle']} · {wk.get('contribution', '')}"[:60], '#ca943e'))
    return states


def studio_dev(F, out):
    team = json.load(open(os.path.join(ROOT, 'data/team.json')))['team']
    people = [p for p in team if p.get('image')][:12]
    quad = find_bright_quad(F)
    cols, rows = 4, 3
    cw, ch = 400, 300
    def sheet(developed):
        S = np.full((rows * ch, cols * cw, 3), 236, np.uint8)
        for i in range(rows * cols):
            r, c = divmod(i, cols); x, y = c * cw + 14, r * ch + 14
            cv2.rectangle(S, (c * cw + 4, r * ch + 4), (c * cw + cw - 4, r * ch + ch - 4), (40, 40, 40), 2)
            if i >= len(people): continue
            p = cv2.imread(os.path.join(ROOT, 'public', people[i]['image'].lstrip('/')), cv2.IMREAD_GRAYSCALE)
            p = cv2.resize(p, (cw - 28, int(p.shape[0] * (cw - 28) / p.shape[1])))[: ch - 28]
            p = cv2.cvtColor(p, cv2.COLOR_GRAY2BGR)
            if i not in developed:
                p = 255 - p; p = (p * np.array([0.78, 0.86, 1.0])).astype(np.uint8)  # orange-based negative
            S[y:y + p.shape[0], x:x + p.shape[1]] = p
        return S
    order = list(range(len(people)))
    steps = [order[:4], order[:8], order]
    states = [('negative', Image.fromarray(place(F, sheet([]), quad, 3, 0.9)[..., ::-1]), 'On the lightbox', 'Contact sheet · negative', '#c98a55')]
    names = [p['name'].split(' ')[0] for p in people]
    for k, dev in enumerate(steps):
        img = place(F, sheet(dev), quad, 3, 0.9)
        who = names[(steps[k - 1] if k else []).__len__():len(dev)]
        states.append((f'dev{k + 1}', Image.fromarray(img[..., ::-1]), 'Developing', ' · '.join(who)[:60], '#e4e4df'))
    return states


def disciplines_panel(F, out, quad_path):
    """The five hands act only inside the floating panel: rectify it, treat it, warp it back."""
    quad = np.array(json.load(open(quad_path)), np.float32)
    tw = int(max(np.linalg.norm(quad[1] - quad[0]), np.linalg.norm(quad[2] - quad[3])))
    th = int(max(np.linalg.norm(quad[3] - quad[0]), np.linalg.norm(quad[2] - quad[1])))
    rect = np.array([[0, 0], [tw, 0], [tw, th], [0, th]], np.float32)
    Hf = cv2.getPerspectiveTransform(quad, rect)
    P = cv2.warpPerspective(F, Hf, (tw, th), flags=cv2.INTER_LANCZOS4)
    inset = int(tw * 0.012); Pin = P[inset:th - inset, inset:tw - inset]  # keep the panel's metal edge untouched
    states = disciplines(Pin, out)
    # portrait panel: replace the 2.39 master with social delivery guides
    ph, pw = Pin.shape[:2]
    m = Image.fromarray(Pin[..., ::-1].copy()); d = ImageDraw.Draw(m)
    fs = max(12, pw // 34); font = ImageFont.truetype(MONO, fs)
    for ratio, label, col in [(9 / 16, '9:16', (230, 230, 224)), (4 / 5, '4:5', ACC)]:
        gw = min(pw, ph * ratio) * 0.94; gh = gw / ratio
        x0, y0 = (pw - gw) / 2, (ph - gh) / 2
        d.rectangle((x0, y0, x0 + gw, y0 + gh), outline=col, width=max(1, pw // 380))
        d.text((x0 + 10, y0 + 8), label, font=font, fill=col)
    d.rectangle((0, ph - fs * 2.6, pw, ph), fill=(8, 8, 8))
    d.text((12, ph - fs * 2), 'MASTERS · DCP · IMF · SOCIAL', font=font, fill=(214, 214, 208))
    states[-1] = ('master', m, 'Conform & mastering', 'Delivery masters · every format', '#bdbdb8')
    Hb = np.linalg.inv(Hf)
    mask = np.zeros((th, tw), np.float32); mask[inset:th - inset, inset:tw - inset] = 1
    mask = cv2.warpPerspective(cv2.GaussianBlur(mask, (0, 0), 0.8), Hb, (F.shape[1], F.shape[0]))
    outs = []
    for sid, img, label, meta, sw in states:
        a = np.asarray(img)[..., ::-1]
        full = P.copy(); full[inset:th - inset, inset:tw - inset] = a
        back = cv2.warpPerspective(full, Hb, (F.shape[1], F.shape[0]), flags=cv2.INTER_LANCZOS4)
        comp = (F * (1 - mask[..., None]) + back * mask[..., None]).astype(np.uint8)
        outs.append((sid, Image.fromarray(comp[..., ::-1]), label, meta, sw))
    return outs


def commissioning(F, out, sheets_dir, quad_path=None):
    """Brief -> storyboard drawn in -> review marks -> approved, laid onto the paper in the frame."""
    quad = np.array(json.load(open(quad_path)), np.float32) if quad_path else find_bright_quad(F, 0.01)
    # paper lighting: the lamp's falloff over the sheet, used to light the drawings
    g = cv2.cvtColor(F, cv2.COLOR_BGR2GRAY).astype(np.float32)
    light = cv2.GaussianBlur(g, (0, 0), 18) / max(1, np.percentile(g, 99.5))
    steps = [('brief', 'Brief', 'Your film, in a page'), ('board-a', 'Proposal', 'The storyboard takes shape'),
             ('board', 'Proposal', 'Six shots, one sequence'), ('review', 'Review in Frames', 'Notes on the exact frame'),
             ('approved', 'Delivery', 'Approved · masters delivered')]
    states = []
    for sid, label, meta in steps:
        sh = cv2.imread(os.path.join(sheets_dir, sid + '.png'))
        comp = place(F, sh, quad, 1.2, 1.0).astype(np.float32)
        lit = np.clip(comp * np.clip(light[..., None] * 1.08, 0.35, 1.15), 0, 255)
        m = cv2.warpPerspective(np.ones(sh.shape[:2], np.float32), cv2.getPerspectiveTransform(np.array([[0, 0], [sh.shape[1], 0], [sh.shape[1], sh.shape[0]], [0, sh.shape[0]]], np.float32), quad), (F.shape[1], F.shape[0]))
        m = cv2.GaussianBlur(m, (0, 0), 1.0)[..., None]
        img = (F * (1 - m) + lit * m)
        # keep what lies ON the paper in the real frame (the pencil and its shadow): dark pixels inside the sheet
        dark = (cv2.cvtColor(F, cv2.COLOR_BGR2GRAY) < 70).astype(np.float32)
        dark = cv2.GaussianBlur(dark, (0, 0), 1.2)[..., None] * m
        img = (img * (1 - dark) + F * dark).astype(np.uint8)
        states.append((sid, Image.fromarray(img[..., ::-1]), label, meta, '#ca943e' if sid in ('review', 'approved') else '#e4e4df'))
    return states


if __name__ == '__main__':
    kind, frame, out = sys.argv[1:4]
    os.makedirs(out, exist_ok=True)
    F = cv2.imread(frame)
    states = commissioning(F, out, sys.argv[4], sys.argv[5] if len(sys.argv) > 5 else None) if kind == 'commissioning' else disciplines_panel(F, out, sys.argv[4]) if kind == 'disciplines-panel' else {'disciplines': disciplines, 'work': work, 'studio': studio_dev}[kind](F, out)
    labels = []
    for sid, img, label, meta, sw in states:
        save(img, os.path.join(out, sid + '.png')); labels.append({'id': sid, 'label': label, 'meta': meta, 'swatch': sw})
    json.dump(labels, open(os.path.join(out, 'labels.json'), 'w'), indent=1)
    print(kind, [l['id'] for l in labels])
