import sys,json,os
sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call
exec(open('batch.py').read().split("items=[]")[0].split("ups=json.load")[0])  # TPL
P=open('batch.py').read().split('P=(',1)[1].split('\nitems=[]')[0]; P=eval('('+P)
REFS=json.load(open('refs/uploaded.json'))
people=[a for a in sys.argv[1:] if not a.startswith('--')]
items=[]
for slug in people:
    for seed in (101,202,303,404):
        items.append({"tool":"partner_generate","type":"image","model":"vertexai/nano-banana-pro","aspect_ratio":"4:5","description":f"fiip-cand-{slug}-s{seed}",
          "prompt":P,"params":{"resolution":"2K"},"seed":seed,"medias":[{"role":"image","name":REFS[slug],"type":"input"}]})
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open('cand-submit.json' if '--confirm' in sys.argv else 'cand-quote.json','w')); print(r['content'][0]['text'][:300])
