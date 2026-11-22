"""Build a page hero sequence (see components/ScrollHero.tsx).

usage: python3 -I scripts/build-page-hero.py <video> <name> --frames 240 [--hold-time 2.6 | --hold-end]
       [--states <dir> --labels <labels.json>] [--prefix hold]
Writes public/sequences/<name>-<stamp>/{desktop,mobile}/f####.webp (+ hold-<id>.webp states) and data/heroes/<name>.json.
States are images the same size as the video frame; labels.json = [{"id","label","meta","swatch"}, ...].
"""
import glob, json, os, shutil, subprocess, sys, tempfile, time
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arg = lambda k, d=None: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
SIZES = {'desktop': (1440, int(arg('--quality', 64))), 'mobile': (720, int(arg('--quality-m', 60)))}
video, name = sys.argv[1], sys.argv[2]
n = int(arg('--frames', 240))
ver = f"{name}-{time.strftime('%Y%m%d%H%M')}"
for old in glob.glob(os.path.join(ROOT, 'public/sequences', f'{name}-*')): shutil.rmtree(old)
out = os.path.join(ROOT, 'public/sequences', ver)
tmp = tempfile.mkdtemp()
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).decode())
subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'fps={n / dur:.6f}', '-frames:v', str(n), f'{tmp}/f%04d.png'], check=True)
files = sorted(f for f in os.listdir(tmp) if f.endswith('.png')); n = len(files)
for k in SIZES: os.makedirs(f'{out}/{k}', exist_ok=True)
for i, f in enumerate(files):
    im = Image.open(f'{tmp}/{f}').convert('RGB')
    for k, (w, q) in SIZES.items(): im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{k}/f{i:04d}.webp', quality=q, method=6)
m = {'frames': n, 'base': f'/sequences/{ver}/desktop', 'mobileBase': f'/sequences/{ver}/mobile', 'ext': 'webp', 'poster': f'/sequences/{ver}/desktop/f{n - 1:04d}.webp'}
if '--reverse' in sys.argv: m['reverse'] = True; m['poster'] = f'/sequences/{ver}/desktop/f0000.webp'
if arg('--states'):
    hold = int(arg('--hold-frame')) if arg('--hold-frame') else (n - 1 if '--hold-end' in sys.argv else min(n - 1, round(float(arg('--hold-time')) / dur * n)))
    labels = json.load(open(arg('--labels'))); prefix = arg('--prefix', 'hold')
    for s in labels:
        im = Image.open(os.path.join(arg('--states'), s['id'] + '.png')).convert('RGB')
        for k, (w, q) in SIZES.items(): im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{k}/{prefix}-{s["id"]}.webp', quality=min(90, q + 14), method=6)
    m['hold'] = {'frame': hold, 'prefix': prefix, 'passes': labels}
    # also export the exact hold frame so states can be checked against it
    shutil.copyfile(f'{tmp}/{files[hold]}', os.path.join(arg('--states'), '_hold_frame.png'))
if arg('--range'):
    a, b = map(int, arg('--range').split(',')); m['range'] = [a, b]; m['poster'] = f'/sequences/{ver}/desktop/f{b:04d}.webp'
json.dump(m, open(os.path.join(ROOT, 'data/heroes', f'{name}.json'), 'w'), indent=2)
sz = lambda d: sum(os.path.getsize(os.path.join(d, x)) for x in os.listdir(d)) / 1e6
print(f'{name}: {n} frames{", hold " + str(m["hold"]["frame"]) if "hold" in m else ""}; desktop {sz(out + "/desktop"):.1f} MB, mobile {sz(out + "/mobile"):.1f} MB')
