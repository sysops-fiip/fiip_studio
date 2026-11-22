#!/usr/bin/env bash
# hero-holdframe.sh <video> <frames> <end|seconds> <out.png>: the exact frame build-page-hero.py will hold on
set -euo pipefail
v=$1; n=$2; at=$3; out=$4; t=$(mktemp -d)
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$v")
ffmpeg -v error -i "$v" -vf "fps=$(python3 -c "print(f'{$n/$dur:.6f}')")" -frames:v "$n" "$t/f%04d.png"
cnt=$(ls $t | wc -l)
if [ "$at" = end ]; then i=$cnt; else i=$(python3 -c "print(min($cnt, round($at/$dur*$cnt)+1))"); fi
cp "$t/$(printf 'f%04d.png' $i)" "$out"; rm -rf "$t"; echo "hold frame $((i-1)) of $cnt -> $out"
