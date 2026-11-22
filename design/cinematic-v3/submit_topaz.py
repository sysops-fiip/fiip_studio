import sys,os,json
sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call, upload
up=json.load(open('topaz-upload.json')) if os.path.exists('topaz-upload.json') else {}
if 'clip' not in up: up['clip']=upload(os.path.abspath('out/shot-384-1080-up.mp4')); json.dump(up,open('topaz-upload.json','w'))
res=sys.argv[1] if len(sys.argv)>1 and not sys.argv[1].startswith('--') else '4K (2160p)'
items=[{"tool":"run_template","name":"api_topaz_starlight_precise25","description":"fiip-shot-topaz-4k","input_overrides":{"3":{"file":up['clip']},"7":{"upscaler_model":"Starlight Precise 2.5","upscaler_model.upscaler_resolution":res,"interpolation_model":"Disabled","dynamic_compression_level":"Low"}}}]
args={'items':items,'client_os':'linux'}
if '--confirm' in sys.argv: args['confirm']=True
r=call('submit_batch',args); json.dump(r,open('topaz-submit.json' if '--confirm' in sys.argv else 'topaz-quote.json','w')); print(r['content'][0]['text'][:700])
