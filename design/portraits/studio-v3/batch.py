import sys,json
sys.path.insert(0,'/tmp'); from fiip_comfy import call
TPL="59250cdfcd3b4bdf87c07ccbcf871c5fb43722eb96a5438e075045a3fb6e484c.png"
ups=json.load(open('../../cinematic-v2/uploads.json'))
REFS=json.load(open('refs/uploaded.json'))
P=("The supplied image has two panels. LEFT panel = IMAGE 1, RIGHT panel = IMAGE 2. Output ONE single portrait photo, not two panels. Photograph of the real person from IMAGE 1, re-shot in a professional studio. IMAGE 1 is the ONLY identity source: keep his exact face - bone structure, face width and shape, jawline, chin, nose shape and size, eye shape and spacing, eyebrows, ears, lips, skin tone, skin texture with pores and natural blemishes, hairline, hairstyle and hair texture, beard and moustache shape and density, eyeglasses if he wears them, earrings if present. Do not idealise, beautify, slim, smooth, widen or change his age; he must be instantly recognisable to his colleagues. "
   "IMAGE 2 is ONLY a pose, framing and lighting template (a grey sculpture): copy its exact camera position, head size in frame, perfectly frontal pose with head upright and level (zero tilt, zero turn), square level shoulders, eye line at the same height, crop at mid-chest, and copy its lighting - soft key from camera-left, gentle fill from the right, thin rim light, dark graphite seamless backdrop with a soft glow behind the head. Do NOT copy the sculpture's face or bald head. "
   "Wardrobe: plain matte black crew-neck t-shirt, no logos, no jewellery around the neck. Expression: calm and confident, relaxed natural closed-mouth smile, eyes looking straight into the lens. "
   "Black and white photograph, 85mm f/5.6, real camera, natural skin, fine film-like grain, no retouching, no CGI look, no illustration. Vertical 4:5. No text.")
items=[]
for slug,name,ref,u in ups:
    items.append({"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-pro","aspect_ratio":"4:5","description":"fiip-v3-"+slug,
      "prompt":P,"params":{"resolution":"2K"},"seed":31,
      "medias":[{"role":"image","name":REFS[slug],"type":"input"}]})
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open('batch-submit.json' if '--confirm' in sys.argv else 'batch-quote.json','w')); print(r['content'][0]['text'][:500])
