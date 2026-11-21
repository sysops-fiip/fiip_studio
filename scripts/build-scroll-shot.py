"""Turn a generated shot into the scroll-scrubbed hero sequence.

usage: python3 -I scripts/build-scroll-shot.py <video> --holds 0.38,0.93 [--frames 384]
       [--titles "A|B"] [--voters "a.png,b.png|c.png,d.png"]   (AI object-ID voters per hold)

Writes public/sequences/shot/{desktop,mobile}/f0000.webp..., the procedural
passes for each hold frame (hold<N>-<pass>.webp) and data/scroll-shot.json.
"""
import json, os, subprocess, sys, shutil, tempfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASSES = [
    ('depth', 'Depth', 'Z · median of 12 estimates', '#8f9399'),
    ('wire', 'Geometry', 'Mesh · seeded on object boundaries', '#d9d9d4'),
    ('normal', 'Normals', 'N · camera space', '#8f86d8'),
    ('clay', 'Clay & light', 'Key + fill · multi-scale occlusion', '#b9b9b4'),
    ('uv', 'UV checker', 'UV · one planar island per object', '#6f6f6c'),
    ('id', 'Object ID', 'Cryptomatte · consensus of 3 AI voters', '#ca943e'),
]
SIZES = {'desktop': 1440, 'mobile': 720}
QUALITY = {'desktop': 62, 'mobile': 58}


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def main():
    video = sys.argv[1]
    holds = [float(x) for x in arg('--holds', '0.5').split(',')]
    count = int(arg('--frames', '144'))
    titles = arg('--titles', '|'.join(f'Hold {i + 1}' for i in range(len(holds)))).split('|')
    out = os.path.join(ROOT, 'public/sequences/shot')
    shutil.rmtree(out, ignore_errors=True)
    tmp = tempfile.mkdtemp()
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]).decode().strip())
    subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'fps={count / dur:.5f}', '-frames:v', str(count), f'{tmp}/f%04d.png'], check=True)
    files = sorted(f for f in os.listdir(tmp) if f.endswith('.png'))
    count = len(files)
    for name, w in SIZES.items():
        os.makedirs(f'{out}/{name}', exist_ok=True)
    for i, f in enumerate(files):
        im = Image.open(f'{tmp}/{f}').convert('RGB')
        for name, w in SIZES.items():
            im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{name}/f{i:04d}.webp', quality=QUALITY[name], method=5)
    first = Image.open(f'{tmp}/{files[0]}')
    manifest = {'frames': count, 'width': first.width, 'height': first.height, 'base': '/sequences/shot/desktop', 'mobileBase': '/sequences/shot/mobile', 'ext': 'webp', 'poster': '/sequences/shot/desktop/f%04d.webp' % (count - 1), 'holds': []}
    for hi, h in enumerate(holds):
        fi = min(count - 1, round(h * (count - 1)))
        pdir = f'{tmp}/passes{hi}'
        cmd = [sys.executable, '-I', os.path.join(ROOT, 'scripts/procedural-passes.py'), f'{tmp}/{files[fi]}', pdir, '--width', '1600']
        voters = arg('--voters', '').split('|')
        if hi < len(voters) and voters[hi]:
            cmd += ['--id-voters', voters[hi], '--debug', f'{pdir}/debug']
        r = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print('\n'.join(l for l in r.stdout.splitlines() if 'voter' in l or 'agreement' in l or 'depth:' in l))
        for pid, *_ in PASSES:
            im = Image.open(f'{pdir}/{pid}.png').convert('RGB')
            for name, w in SIZES.items():
                im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{out}/{name}/hold{hi}-{pid}.webp', quality=78)
        manifest['holds'].append({'frame': fi, 'title': titles[hi] if hi < len(titles) else f'Hold {hi + 1}',
                                  'passes': [{'id': p, 'label': l, 'meta': f'{meta} · frame {fi:04d}', 'swatch': s} for p, l, meta, s in PASSES]})
    json.dump(manifest, open(os.path.join(ROOT, 'data/scroll-shot.json'), 'w'), indent=2)
    total = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(out) for f in fs)
    print(f'{count} frames, holds at {[h["frame"] for h in manifest["holds"]]}, {total / 1e6:.1f} MB total')


if __name__ == '__main__':
    main()
