"""Rebuild a hero sequence from a 4K exact-frame clip: sharper desktop frames and portrait phone frames.

usage: python3 -I scripts/build-hero-4k.py <name> <clip_4k.mov> <states_4k_dir|-> --focus 0.5 [--manifest data/heroes/<name>.json]
  The clip must contain exactly the sequence frames 0..N (see design/page-heroes/video/*-exact.mov).
  Phones get a 1:2 portrait crop at full source resolution (720x1440), centred by --focus (0 = left, 1 = right);
  hold states are cropped identically so wipes stay aligned. Writes a new versioned folder and updates the manifest.
"""
import glob, json, os, shutil, subprocess, sys, tempfile, time
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arg = lambda k, d=None: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
name, clip, states = sys.argv[1], sys.argv[2], sys.argv[3]
focus = float(arg('--focus', 0.5)); mpath = arg('--manifest', os.path.join(ROOT, 'data/heroes', f'{name}.json'))
DESK = (1440, int(arg('--quality', 64))); MOB = (720, 1440, int(arg('--quality-m', 62)))
m = json.load(open(mpath))
old = os.path.join(ROOT, 'public', m['base'].strip('/').rsplit('/', 1)[0])
prefix = os.path.basename(old).rsplit('-', 1)[0]
ver = f"{prefix}-{time.strftime('%Y%m%d%H%M')}"; out = os.path.join(ROOT, 'public/sequences', ver)
for d in ('desktop', 'mobile'): os.makedirs(f'{out}/{d}', exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-v', 'error', '-i', clip, f'{tmp}/f%04d.png'], check=True)
files = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))
files = files[: (m['range'][1] + 1) if m.get('range') else m['frames']]  # Topaz can append a duplicate last frame

def portrait(im):
    w, h = im.size; cw = h // 2; x0 = round((w - cw) * focus)
    return im.crop((x0, 0, x0 + cw, h)).resize(MOB[:2], Image.LANCZOS)

for i, f in enumerate(files):
    im = Image.open(f'{tmp}/{f}').convert('RGB')
    im.resize((DESK[0], round(im.height * DESK[0] / im.width)), Image.LANCZOS).save(f'{out}/desktop/f{i:04d}.webp', quality=DESK[1], method=6)
    portrait(im).save(f'{out}/mobile/f{i:04d}.webp', quality=MOB[2], method=6)
if m.get('hold'):
    pre = m['hold'].get('prefix', 'hold')
    for p in m['hold']['passes']:
        if states != '-' and os.path.exists(os.path.join(states, p['id'] + '.png')):
            im = Image.open(os.path.join(states, p['id'] + '.png')).convert('RGB')
            im.resize((DESK[0], round(im.height * DESK[0] / im.width)), Image.LANCZOS).save(f'{out}/desktop/{pre}-{p["id"]}.webp', quality=min(90, DESK[1] + 14), method=6)
            portrait(im).save(f'{out}/mobile/{pre}-{p["id"]}.webp', quality=min(90, MOB[2] + 14), method=6)
        else:  # keep the existing state images (desktop) and crop them for mobile as a fallback
            shutil.copyfile(f'{old}/desktop/{pre}-{p["id"]}.webp', f'{out}/desktop/{pre}-{p["id"]}.webp')
            portrait(Image.open(f'{old}/desktop/{pre}-{p["id"]}.webp').convert('RGB')).save(f'{out}/mobile/{pre}-{p["id"]}.webp', quality=min(90, MOB[2] + 14), method=6)
for k in ('base', 'mobileBase', 'poster'):
    m[k] = m[k].replace(m['base'].rsplit('/', 1)[0], f'/sequences/{ver}')
m['mobileBase'] = f'/sequences/{ver}/mobile'; m['mobileFocus'] = 0.5
json.dump(m, open(mpath, 'w'), indent=2)
shutil.rmtree(tmp)
sz = lambda d: sum(os.path.getsize(os.path.join(d, x)) for x in os.listdir(d)) / 1e6
print(f'{name}: {len(files)} frames -> {ver}; desktop {sz(out + "/desktop"):.1f} MB, mobile {sz(out + "/mobile"):.1f} MB (focus {focus})')
