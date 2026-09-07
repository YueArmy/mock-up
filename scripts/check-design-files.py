from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]/'site'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.links=[];self.ids=set(); self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'): self.ids.add(a['id'])
  for key in ['href','src']:
   if a.get(key):self.links.append(a[key])
pages=list((ROOT/'designs').rglob('*.html')); errors=[]
for p in pages:
 for href in Page(p.read_text()).links:
  u=urlsplit(href)
  if u.scheme or u.netloc:continue
  target=(p.parent/unquote(u.path)).resolve() if u.path else p
  if target.is_dir():target=target/'index.html'
  if not target.is_file():errors.append((str(p.relative_to(ROOT)),href,'missing file'))
  elif u.fragment and target.suffix=='.html' and unquote(u.fragment) not in Page(target.read_text()).ids:errors.append((str(p.relative_to(ROOT)),href,'missing anchor'))
if errors:raise SystemExit(errors)
print(f'PASS: {len(pages)} HTML pages, all relative assets/links/anchors exist.')
