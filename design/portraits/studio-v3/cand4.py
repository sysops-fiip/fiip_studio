import sys,json,os
sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call, upload
NOTES={
 'balaji-sripathi':"His natural expression is a big, warm open-mouth smile showing his teeth, exactly like in his photos - keep that smile. Wavy, thick dark hair with volume on top, full dark beard and moustache, rounded cheeks and broad nose exactly as in the photos.",
 'shivraj':"Neat, freshly trimmed look: short tidy side-parted hair with modest volume (not puffy), closely trimmed short beard and moustache, small stud earring in his left ear. Soft, gentle, slightly lower-contrast lighting - calm, polished, not dramatic. Subtle closed-mouth smile like in his photo.",
 'sri-karthik':"Slim, narrow face with defined cheekbones; long, dense, voluminous curly black hair falling to the jaw; thin moustache and a light, sparse chin beard; small hoop earring in his left ear; relaxed, confident half-smile. Same skin tone and features as in the photos, just turned to face the camera straight on.",
}
P=("This image has three panels. PANEL 1 (left) is a close-up of a real person's face and PANEL 2 (middle) is the full original photo of the SAME person - these two panels are the ONLY identity sources. PANEL 3 (right) is ONLY a pose, framing and lighting template (a grey sculpture) - never copy its face or bald head. "
   "Output ONE single photograph (not panels) of this exact person, re-shot in a professional studio: copy PANEL 3's camera height, perfectly frontal pose with head upright and level (no tilt, no turn), square level shoulders, head size and eye-line position, crop at mid-chest, and its lighting (soft key from camera-left, gentle fill, thin rim light, dark graphite backdrop with a soft glow behind the head). "
   "Keep his exact identity: bone structure, face width and shape, jaw, chin, nose, eyes and their spacing, eyebrows, ears, lips, skin tone and texture, hairline, hair. He must be instantly recognisable to his family. {notes} "
   "Wardrobe: plain matte black crew-neck t-shirt. Black and white photograph, 85mm f/5.6, real camera, natural skin texture, fine grain, no retouching, no CGI, no illustration. Vertical 4:5. No text.")
people=[a for a in sys.argv[1:] if not a.startswith('--')]
up=json.load(open('refs4/uploaded.json')) if os.path.exists('refs4/uploaded.json') else {}
for s in people:
    if s not in up: up[s]=upload(os.path.abspath(f'refs4/{s}.jpg'))
json.dump(up,open('refs4/uploaded.json','w'))
items=[]
for s in people:
    m=[{"role":"image","name":up[s],"type":"input"}]; pr=P.format(notes=NOTES[s])
    for seed in (11,22,33,44,55,66):
        items.append({"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-pro","aspect_ratio":"4:5","prompt":pr,"params":{"resolution":"2K"},"seed":seed,"medias":m,"description":f"fiip-c4-{s}-nbp{seed}"})
    for seed in (11,22,33):
        items.append({"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-2","aspect_ratio":"4:5","prompt":pr,"params":{"resolution":"2K"},"seed":seed,"medias":m,"description":f"fiip-c4-{s}-nb2{seed}"})
    for seed in (11,22,33):
        items.append({"tool":"partner_generate","type":"image","model":"openai/images-generations","prompt":pr,"seed":seed,"medias":m,"params":{"model":"gpt-image-2","size":"1024x1280","quality":"high"},"description":f"fiip-c4-{s}-gpt{seed}"})
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open('c4-submit.json' if '--confirm' in sys.argv else 'c4-quote.json','w')); print(r['content'][0]['text'][:300])
