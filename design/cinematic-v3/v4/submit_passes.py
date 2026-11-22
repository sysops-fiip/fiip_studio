import sys,os,json
sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call, upload
here=os.path.dirname(os.path.abspath(__file__))
up=json.load(open(f'{here}/upload.json')) if os.path.exists(f'{here}/upload.json') else {}
if 'hold' not in up: up['hold']=upload(f'{here}/hold.png'); json.dump(up,open(f'{here}/upload.json','w'))
LOCK=("Use the supplied photograph as an exact layout reference: keep the identical camera, framing, perspective, horizon and every object's silhouette in exactly the same position and size - the observatory drum and roof, columns, round portal and ring, bridge deck and pillars, every cliff edge, rocks and the waterline. Do not move, add, remove or restyle any object. Same 16:9 framing, no crop, no border, no text, no labels, no UI.")
PASSES={
 'depth':"Render this exact scene as a 3D renderer's depth (Z) pass: smooth greyscale where near surfaces are bright white and far surfaces fade to dark grey, the sky pure black. Perfectly smooth gradients along each surface, crisp edges between objects at different depths, no texture, no lighting, no detail other than distance.",
 'wire':"Render this exact scene as a 3D viewport wireframe pass of clean production meshes: thin, even, light-grey polygon edges on pure black; quads and edge loops following each object's form (circular loops on the drum and portal ring, straight loops on columns and bridge, irregular triangulated topology on rocks and cliffs, a regular grid on the water plane). Lines only, no shading, no texture.",
 'normal':"Render this exact scene as a camera-space world-normal AOV pass: smooth normal-map colours where surfaces facing the camera are lavender-blue, surfaces facing up are green-cyan, facing left magenta-pink, facing right blue-teal; sky pure black. Crisp facets on the architecture, faceted rock strata, flat uniform colour on the water plane. No lighting, no texture, no shadows.",
 'clay':"Render this exact scene as a grey clay lighting pass: every surface the same matte neutral-grey clay material with no textures and no colour, lit by the same moonlight direction with soft sky fill and ambient occlusion in crevices; the round portal still glows softly. Sky dark grey. Clean, physically based, like a lookdev clay render.",
 'uv':"Render this exact scene with a UV checker material: every object covered by a precise black-and-light-grey checkerboard with a finer sub-checker, mapped along each surface so squares wrap around the drum and columns, follow the bridge deck, recede in perspective on the water plane and stretch slightly over rocks; each object has its own UV island orientation. Sky pure black. Greyscale only.",
 'id':"Render this exact scene as an object-ID (cryptomatte) pass: each object filled with one flat, fully saturated, distinct colour - drum, roof, each column, portal ring, portal opening, plinth, bridge deck, each bridge pillar, left cliff, background cliffs, right rock mass, water, foreground rocks, moon. Sky pure black. No shading, no gradients, no outlines.",
}
items=[]
m=[{"role":"image","name":up['hold'],"type":"input"}]
for k,txt in PASSES.items():
    pr=txt+" "+LOCK
    for seed in (5,9):
        items.append({"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-pro","aspect_ratio":"16:9","prompt":pr,"params":{"resolution":"2K"},"seed":seed,"medias":m,"description":f"fiip-v4-{k}-nbp{seed}"})
    for gm in ('gpt-image-2.6-flare','gpt-image-2.6-sunburst'):
        items.append({"tool":"partner_generate","type":"image","model":"openai/images-generations","prompt":pr,"medias":m,"params":{"model":gm,"size":"1536x1024","quality":"high"},"description":f"fiip-v4-{k}-{gm.split('-')[-1]}"})
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open(f'{here}/'+('submit.json' if '--confirm' in sys.argv else 'quote.json'),'w')); print(r['content'][0]['text'][:600])
