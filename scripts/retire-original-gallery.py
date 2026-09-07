"""Reconcile the proposal after the original gallery design was retired."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
path = root / 'site/designs/index.html'
text = path.read_text()
text = re.sub(r'<article class="concept-card"><a href="gallery/index.html">.*?</article>', '', text)
def trim_column(match):
    cells = re.findall(r'<t[hd]>.*?</t[hd]>', match.group())
    return '<tr>' + ''.join(cells[:4]) + '</tr>' if len(cells)==5 else match.group()
text = re.sub(r'<tr>.*?</tr>', trim_column, text)
text = text.replace('FOUR DESIGNS','THREE DESIGNS').replace('四つ。','三つ。')
text = text.replace('<br>3つのコンセプトに、ギャラリーの新しい見せ方を加えました。','')
text = text.replace('作品を主役にするなら、01と04から。','作品を主役にするなら、01から。')
text = text.replace('01は写真と見出しが一体の構図、04は左右の対比。どちらも名刺サイトとして作品の魅力を見せやすく、','01は写真と見出しが一体の構図。名刺サイトとして作品の魅力を見せやすく、')
path.write_text(text)
for path in [*root.glob('site/designs/**/*.html'), root/'site/index.html', root/'scripts/build-designs.py', root/'scripts/build-design04.py', root/'README.md']:
    text=path.read_text().replace('4つの案','3つの案').replace('4案','3案').replace('4つのホームページ案','3つのホームページ案')
    if path.name=='README.md':
        text=re.sub(r'^\| 04 \|.*\n','',text,flags=re.M)
        text=text.replace('python3 scripts/build-designs.py gallery atelier journal','python3 scripts/build-designs.py atelier journal')
        text=text.replace('Design 01は既存の `/designs/design04/`、Design 04は `/designs/gallery/` を維持しています。','Design 01は既存の `/designs/design04/` を維持しています。旧ギャラリー版は削除済みです。')
    path.write_text(text)
