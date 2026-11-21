#!/usr/bin/env bash
# Frame-interpolate a clip with Topaz Video AI on fiip-ws03 (headless, over SSH).
#   scripts/topaz-interpolate.sh <src> <out.mov> [model=apo-8] [fps=96]
# Same transport as the studio's topaz_upscale.sh (scp both ways; ws03 can't see the share).
set -euo pipefail
src=$1; out=$2; model=${3:-apo-8}; fps=${4:-96}
host=fiip-ws03; tag=fiip_fi_$(basename "$out" .mov)
ssh -n -o BatchMode=yes $host 'cmd /c if not exist D:\tvai mkdir D:\tvai' >/dev/null
scp -q -o BatchMode=yes "$src" "$host:D:/tvai/$tag.in.mp4"
cat > /tmp/.tvai_$tag.ps1 <<PS
\$env:TVAI_MODEL_DIR="C:\ProgramData\Topaz Labs LLC\Topaz Video AI\models"
\$env:TVAI_MODEL_DATA_DIR="C:\ProgramData\Topaz Labs LLC\Topaz Video AI\models"
& "C:\Program Files\Topaz Labs LLC\Topaz Video AI\ffmpeg.exe" -hide_banner -loglevel error -y -i "D:\tvai\\$tag.in.mp4" -vf "tvai_fi=model=$model:slowmo=1:rdt=0.01:fps=$fps:device=0:vram=1:instances=1" -c:v prores_ks -profile:v 2 -pix_fmt yuv422p10le "D:\tvai\\$tag.out.mov"
exit \$LASTEXITCODE
PS
scp -q -o BatchMode=yes /tmp/.tvai_$tag.ps1 "$host:C:/ProgramData/FIIP-Studio/tvai_$tag.ps1"; rm -f /tmp/.tvai_$tag.ps1
ssh -n -o BatchMode=yes $host "powershell -NoProfile -ExecutionPolicy Bypass -File C:\\ProgramData\\FIIP-Studio\\tvai_$tag.ps1"
scp -q -o BatchMode=yes "$host:D:/tvai/$tag.out.mov" "$out"
ssh -n -o BatchMode=yes $host "cmd /c del /q D:\\tvai\\$tag.in.mp4 D:\\tvai\\$tag.out.mov C:\\ProgramData\\FIIP-Studio\\tvai_$tag.ps1" >/dev/null || true
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames,r_frame_rate -of csv=p=0 "$out"
