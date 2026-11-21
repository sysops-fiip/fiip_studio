#!/usr/bin/env bash
# Upscale a clip with Topaz Video AI on fiip-ws03.   scripts/topaz-upscale.sh <src> <out.mov> [model=prob-4] [scale=2]
set -euo pipefail
exec /opt/studio/stacks/frames/tools/frames-mcp/topaz_upscale.sh "$@"
