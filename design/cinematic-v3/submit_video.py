import sys,json
import os; sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call
LENS="b87bb8dcdac8a782cbd1c85f6b83fd3f82a1a292cb7ad1e4eae9303516cf3ee7.png"
PLATE="231324083f10f653ff5c2bd3ed87abe48d8599e75776adaa021f75da8b8dff07.png"
style=" Photoreal feature-film VFX shot, monochrome silver night palette with a single warm ochre light from the circular portal. Physically plausible, no morphing, no warping architecture, no new objects, no people, no text, no logos. Locked exposure, filmic, smooth and steady."
items=[
 {"tool":"run_template","name":"api_seedance2_0_flf2v","description":"fiip-v3-lens-to-world","input_overrides":{
   "3":{"image":LENS},"4":{"image":PLATE},
   "1":{"model":"Seedance 2.0","model.prompt":"One continuous camera move. Start: extreme close-up of a cinema lens front element, its nine-blade iris partly open with the observatory visible through it. The iris blades open smoothly and fully, the dark lens barrel slides out past the edges of frame as the camera pushes forward straight through the glass and into the scene, resolving seamlessly into the wide shot of the brutalist circular observatory in the basalt canyon at night, shallow water in the foreground. Slow, elegant, dolly-forward motion, no cuts."+style,
        "model.resolution":"1080p","model.ratio":"16:9","model.duration":6,"model.generate_audio":False,"seed":4242,"watermark":False}}},
 {"tool":"run_template","name":"api_seedance2_5_i2v_1080p","description":"fiip-v3-world-push","input_overrides":{
   "2":{"image":PLATE},
   "9":{"model":"Seedance 2.5","model.prompt":"One continuous take starting exactly on the reference frame. The camera performs a very slow, steady dolly forward low over the shallow water toward the glowing circular portal of the observatory, with a gentle drift to the right. Tiny ripples move on the water and catch the ochre reflection, thin clouds drift slowly across the moonlit sky, faint mist moves between the cliffs, the portal light breathes very subtly. The architecture and cliffs stay perfectly rigid and stable."+style,
        "model.resolution":"1080p","model.ratio":"adaptive","model.duration":10,"model.generate_audio":False,"model.task_type":"reference","model.output_format":"mp4","model.auto_downscale":True,"model.auto_upscale":False,"seed":77,"watermark":False}}},
]
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args)
json.dump(r,open('video-submit.json' if '--confirm' in sys.argv else 'video-quote.json','w'))
print(r['content'][0]['text'][:900])
