"""Build the single-breakdown hero sequence.

usage: python3 -I scripts/build-hero-sequence.py <frames_video> <hold_frame> <passes_dir>
Writes public/sequences/shot/{desktop,mobile}/f####.webp, hold-<pass>.webp and data/scroll-shot.json.
"""
import json, os, sys, shutil, subprocess, tempfile
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASSES = [('depth', 'Depth', 'Z · median of 12 estimates', '#9a9c9f'),
          ('wire', 'Geometry', 'Mesh · seeded on object edges', '#e4e4df'),
          ('normal', 'Normals', 'N · camera space', '#8f86d8'),
          ('clay', 'Clay & light', 'Key + fill · occlusion', '#bdbdb8')]
SIZES = {'desktop': (1440, 66), 'mobile': (720, 60)}
video, hold, pdir = sys.argv[1], int(sys.argv[2]), sys.argv[3]
# Versioned folder: sequence files are served with an immutable cache header.
ver = 'shot-' + __import__('time').strftime('%Y%m%d%H%M')
for old in __import__('glob').glob(os.path.join(ROOT, 'public/sequences/shot*')): shutil.rmtree(old)
out = os.path.join(ROOT, 'public/sequences', ver)
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-frames:v', '384', f'{tmp}/f%04d.png'], check=True)
files = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))
for n in SIZES: os.makedirs(f'{out}/{n}', exist_ok=True)
for i, f in enumerate(files):
    im = Image.open(f'{tmp}/{f}').convert('RGB')
    for n, (w, q) in SIZES.items():
        im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{n}/f{i:04d}.webp', quality=q, method=6)
for pid, *_ in PASSES:
    im = Image.open(f'{pdir}/{pid}.png').convert('RGB')
    for n, (w, q) in SIZES.items():
        im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{n}/hold-{pid}.webp', quality=min(90, q + 14), method=6)
m = {'frames': len(files), 'base': f'/sequences/{ver}/desktop', 'mobileBase': f'/sequences/{ver}/mobile', 'ext': 'webp',
     'poster': f'/sequences/{ver}/desktop/f{len(files) - 1:04d}.webp',
     'hold': {'frame': hold, 'title': 'Inside the shot', 'passes': [{'id': p, 'label': l, 'meta': f'{meta} · frame {hold:04d}', 'swatch': s} for p, l, meta, s in PASSES]}}
json.dump(m, open(os.path.join(ROOT, 'data/scroll-shot.json'), 'w'), indent=2)
size = lambda d: sum(os.path.getsize(os.path.join(d, x)) for x in os.listdir(d)) / 1e6
print(f'{len(files)} frames, hold {hold}; desktop {size(out + "/desktop"):.1f} MB, mobile {size(out + "/mobile"):.1f} MB')
