import urllib.request, urllib.parse, re, json
from html.parser import HTMLParser

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.attrs=[]; self.text=[]; self.in_script=False; self.in_style=False
    def handle_starttag(self,t,a):
        d=dict(a); self.attrs.append((t,d))
        if t=='script': self.in_script=True
        if t=='style': self.in_style=True
    def handle_endtag(self,t):
        if t=='script': self.in_script=False
        if t=='style': self.in_style=False
    def handle_data(self,d):
        if not self.in_script and not self.in_style: self.text.append(d)

base='http://localhost:3101'
results={}
for name,path in [('en','/en/services/groom-wedding-services'),('ar','/ar/services/groom-wedding-services')]:
    req=urllib.request.Request(base+path, headers={'User-Agent':'QA'})
    opener=urllib.request.build_opener(urllib.request.HTTPRedirectHandler())
    with opener.open(req, timeout=10) as r:
        html=r.read().decode('utf-8','replace'); final=r.geturl(); status=r.status
    p=P(); p.feed(html); text=' '.join(' '.join(p.text).split())
    imgs=[d.get('src','') for t,d in p.attrs if t=='img']
    links=[d.get('href','') for t,d in p.attrs if t=='a']
    lang=re.search(r'<html[^>]*lang="([^"]+)',html)
    direction=re.search(r'<html[^>]*dir="([^"]+)',html)
    results[name]={
      'status':status,'final_url':final,'bytes':len(html),
      'lang':lang.group(1) if lang else None,
      'dir':direction.group(1) if direction else None,
      'h1_count':len(re.findall(r'<h1\b',html,re.I)),
      'recommended_count':text.count('Recommended')+text.count('موصى به'),
      'enhanced_count':text.count('Enhanced Scope')+text.count('النطاق الموسّع'),
      'images':len(imgs),'broken_images':[],
      'internal_scaffolding':[x for x in ['t_0cac4210','C01-C20','STAGED CAPABILITY','kanban','placeholder','TODO'] if x.lower() in text.lower()],
      'banned_hits':[x for x in ['AED 8,000','AED 16,000','AED 26,000','AED 9,500','drone','female coming soon','Aqd Al Qiran','Katb Kitab','Al-Ayyala','harbiya','most-booked','most crews skip','100% male','every booking','7-day'] if x.lower() in text.lower()],
      'hrefs':links,
      'broken_links':[],
    }
    for href in links:
        if href.startswith('/'):
            try: code=urllib.request.urlopen(urllib.parse.urljoin(base,href),timeout=10).status
            except Exception as e: code=getattr(e,'code',str(e))
            if code not in (200,301,302,303,307,308): results[name]['broken_links'].append({'href':href,'result':code})
    for src in imgs:
        u=urllib.parse.urljoin(base,src)
        try: code=urllib.request.urlopen(u,timeout=10).status
        except Exception as e: code=str(e)
        if code!=200: results[name]['broken_images'].append({'src':src,'result':code})
print(json.dumps(results,ensure_ascii=False,indent=2))
