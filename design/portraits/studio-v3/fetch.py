import sys,json,urllib.request,time
import os; sys.path.insert(0,os.path.expanduser('~/.cache/fiip-tools')); from fiip_comfy import call
pid, out = sys.argv[1], sys.argv[2]
for i in range(40):
    s=call('get_job_status',{'prompt_id':pid})['structuredContent']
    st=s.get('status') or s.get('state')
    if st in ('completed','success','succeeded','failed','error') or s.get('ready'): break
    time.sleep(6)
print('status',st)
o=call('get_output',{'prompt_id':pid,'client_os':'linux'})['structuredContent']
files=o.get('outputs') or o.get('files') or o.get('results') or []
for f in files[:1]:
    urllib.request.urlretrieve(f['url'],out); print('saved',out,f.get('width'),f.get('height'))
if not files: print(json.dumps(o)[:800])
