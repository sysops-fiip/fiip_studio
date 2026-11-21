import sys,json,os
sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call
H=json.load(open('holds/uploaded.json'))
P=("Turn this exact photograph into a 3D render's object-ID (cryptomatte) pass. Keep every silhouette, edge and object position exactly where it is, pixel-aligned, same framing. "
   "Fill each separate object with ONE flat, uniform, fully saturated colour, and give different objects clearly different colours: the observatory drum and roof, its columns, the round glowing portal and its ring, the base/plinth, the bridge deck, each bridge pillar, the left cliff, the background cliffs, the right cliff/rock mass, the water surface, the foreground rocks, the moon. "
   "Sky pure black. No shading, no gradients, no texture, no outlines, no text.")
items=[]
for h,name in H.items():
    m=[{"role":"image","name":name,"type":"input"}]
    items+= [
     {"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-pro","aspect_ratio":"16:9","prompt":P,"medias":m,"description":f"fiip-id-{h}-nbp","params":{"resolution":"2K"}},
     {"tool":"partner_generate","type":"image","model":"openai/images-generations","prompt":P,"medias":m,"description":f"fiip-id-{h}-gpt","params":{"model":"gpt-image-2","size":"1536x1024","quality":"high"}},
     {"tool":"partner_generate","type":"image","model":"bfl/flux-kontext-max","aspect_ratio":"16:9","prompt":P,"medias":m,"description":f"fiip-id-{h}-kontext"}]
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open('ids-submit.json' if '--confirm' in sys.argv else 'ids-quote.json','w')); print(r['content'][0]['text'][:600])
