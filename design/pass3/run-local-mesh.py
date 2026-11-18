"""Run the saved Comfy node graph in an isolated process with non-tiled decoding.
The installed o_voxel lacks its optional tiled decoder. The sentinel only permits
module import; it cannot silently stand in for a decoder. No shared install edits.
"""
import importlib
import json
from pathlib import Path
import sys
import types

COMFY = Path('/opt/comfyui')
sys.path.insert(0, str(COMFY))
import folder_paths
folder_paths.set_input_directory('/opt/ActiveProjects/ComfyUI/input')
folder_paths.set_output_directory(str(Path(__file__).resolve().parent / 'mesh-output'))
import o_voxel.convert

def unavailable_tiled_decoder(*args, **kwargs):
    raise RuntimeError('Tiled decoder is unavailable; this workflow must use non-tiled decoding.')

if not hasattr(o_voxel.convert, 'tiled_flexible_dual_grid_to_mesh'):
    o_voxel.convert.tiled_flexible_dual_grid_to_mesh = unavailable_tiled_decoder

package = types.ModuleType('fiip_trellis')
package.__path__ = [str(COMFY / 'custom_nodes/ComfyUI-Trellis2-GGUF')]
sys.modules[package.__name__] = package
nodes = importlib.import_module('fiip_trellis.nodes')
workflow = json.loads(Path(__file__).with_name('comfy-lens-workflow.json').read_text())
workflow['4']['inputs']['use_tiled_decoder'] = False
results = {}
for key, node in workflow.items():
    cls = getattr(nodes, node['class_type'].replace('Trellis2', 'Trellis2_GGUF', 1))
    inputs = {k: results[v[0]][v[1]] if isinstance(v, list) else v for k,v in node['inputs'].items()}
    print('EXECUTE', key, node['class_type'], flush=True)
    result = getattr(cls(), cls.FUNCTION)(**inputs)
    results[key] = result.get('result', ()) if isinstance(result, dict) else result
print('OUTPUT', results['7'], flush=True)
