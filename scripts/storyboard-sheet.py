"""Procedural storyboard from the site's own shots (pencil-sketch conversion), plus a typed brief and review marks.

usage: python3 -I scripts/storyboard-sheet.py <out_dir>
Writes brief.png, board-a.png (panels 1-3 drawn), board.png (all panels), review.png, approved.png (sheet images, 3:4).
"""
import os, sys
import cv2, numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
SANS = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ACC = (202, 148, 62); PAPER = (238, 234, 226); INK = (52, 52, 50)
W, H = 1500, 2000
PANELS = [('public/sequences/shot-20261122/desktop/f0020.webp', '01  ECU', 'THROUGH THE LENS'),
          ('public/sequences/shot-20261122/desktop/f0150.webp', '02  WIDE', 'EXT. OBSERVATORY - NIGHT'),
          ('public/sequences/shot-20261122/desktop/f0383.webp', '03  MED', 'THE PORTAL'),
          ('public/sequences/disciplines-202611221040/desktop/f0000.webp', '04  WIDE', 'INT. CHAMBER'),
          ('public/sequences/disciplines-202611221040/desktop/f0139.webp', '05  MCU', 'THE PLATE'),
          ('public/sequences/work-202611221042/desktop/f0000.webp', '06  TRACK', 'THE ARCHIVE')]

def sketch(path, w, h):
    """XDoG line drawing + soft graphite tone, from a (night) frame brightened first."""
    im = cv2.imread(os.path.join(ROOT, path)); im = cv2.resize(im, (w * 2, h * 2), interpolation=cv2.INTER_AREA)
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255
    g = np.clip(g / max(1e-3, np.percentile(g, 99.5)), 0, 1) ** 0.55          # lift the night
    g = cv2.bilateralFilter(g, 9, 0.08, 6)
    s1, k, tau, eps, phi = 1.1, 1.6, 0.985, 0.012, 38.0
    d = cv2.GaussianBlur(g, (0, 0), s1) - tau * cv2.GaussianBlur(g, (0, 0), s1 * k)
    lines = np.where(d >= eps, 1.0, 1.0 + np.tanh(phi * (d - eps)))
    lines = np.clip(lines, 0, 1)
    tone = 1 - 0.32 * (1 - np.round(cv2.GaussianBlur(g, (0, 0), 4) * 4) / 4)  # 4-step graphite wash
    out = np.clip(lines * tone, 0, 1)
    out = cv2.resize(out, (w, h), interpolation=cv2.INTER_AREA)
    paper = np.array(PAPER, np.float32)[::-1] / 255
    ink = np.array(INK, np.float32)[::-1] / 255
    rgb = out[..., None] * paper + (1 - out[..., None]) * ink
    return (rgb * 255).astype(np.uint8)

def base():
    im = Image.new('RGB', (W, H), PAPER); d = ImageDraw.Draw(im)
    return im, d

def board(n_drawn):
    im, d = base(); f = ImageFont.truetype(MONO, 22); t = ImageFont.truetype(MONO, 30)
    d.text((90, 70), 'FIIP  /  OPENING FILM  /  STORYBOARD', font=t, fill=INK)
    d.text((W - 90 - d.textlength('SHEET 1 / 1', font=t), 70), 'SHEET 1 / 1', font=t, fill=INK)
    pw, ph = 600, 338; xs = [110, 790]; ys = [190, 760, 1330]
    boxes = []
    for i, (src, shot, desc) in enumerate(PANELS):
        x, y = xs[i % 2], ys[i // 2]; boxes.append((x, y, pw, ph))
        d.rectangle((x - 3, y - 3, x + pw + 3, y + ph + 3), outline=INK, width=3)
        if i < n_drawn:
            im.paste(Image.fromarray(sketch(src, pw, ph)[..., ::-1]), (x, y))
            d.text((x, y + ph + 16), shot, font=f, fill=INK)
            d.text((x, y + ph + 48), desc, font=f, fill=(90, 90, 86))
    return im, boxes

def brief():
    im, d = base(); t = ImageFont.truetype(MONO, 34); f = ImageFont.truetype(MONO, 27)
    lines = [('BRIEF', t, INK), ('', f, INK), ('Project      Opening film', f, INK), ('Mood         Night. One warm light.', f, INK),
             ('             Quiet, precise, inside the frame.', f, INK), ('', f, INK), ('Disciplines  Editorial · VFX · Colour', f, INK),
             ('             Conform & mastering', f, INK), ('', f, INK), ('Formats      2.39 master · 16:9 · 9:16 · 4:5', f, INK),
             ('Review       Frames, on the frame', f, INK), ('Delivery     Masters to agreed specs', f, INK), ('', f, INK),
             ('Notes', t, INK), ('- every pass should line up with the frame', f, (90, 90, 86)), ('- one ochre accent, nothing else warm', f, (90, 90, 86)),
             ('- end on the headline', f, (90, 90, 86))]
    y = 140
    for txt, fn, col in lines:
        d.text((120, y), txt, font=fn, fill=col); y += 62 if fn is t else 52
    d.line((120, 200, 520, 200), fill=ACC, width=3)
    return im

def review(img, boxes):
    im = img.copy(); d = ImageDraw.Draw(im); f = ImageFont.truetype(MONO, 22)
    marks = [(1, (0.68, 0.45), 'warmer portal'), (2, (0.5, 0.55), '+4 frames'), (4, (0.5, 0.4), 'hold longer')]
    for k, (u, v), note in marks:
        x, y, pw, ph = boxes[k]; cx, cy = x + pw * u, y + ph * v; r = 46
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ACC, width=5)
        d.line((cx + r * .7, cy - r * .7, cx + r * 1.6, cy - r * 1.6), fill=ACC, width=4)
        d.text((cx + r * 1.7, cy - r * 2.1), note, font=f, fill=ACC)
    for k in (0, 3, 5):
        x, y, pw, ph = boxes[k]; d.line((x + pw - 70, y + ph - 40, x + pw - 50, y + ph - 18, x + pw - 16, y + ph - 64), fill=ACC, width=6)
    return im

def approved(img):
    im = img.copy(); d = ImageDraw.Draw(im); f = ImageFont.truetype(MONO, 40)
    txt = 'APPROVED  ·  MASTER v012'; tw = d.textlength(txt, font=f)
    x, y = W - 110 - tw - 40, H - 160
    d.rounded_rectangle((x, y, x + tw + 40, y + 78), radius=10, outline=ACC, width=5)
    d.text((x + 20, y + 16), txt, font=f, fill=ACC)
    return im

if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    brief().save(f'{out}/brief.png')
    a, _ = board(3); a.save(f'{out}/board-a.png')
    full, boxes = board(6); full.save(f'{out}/board.png')
    r = review(full, boxes); r.save(f'{out}/review.png')
    approved(r).save(f'{out}/approved.png')
    print('sheets written to', out)
