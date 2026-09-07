"""Bundle the Claude UI typefaces, subset to the mockup's displayed copy."""
from pathlib import Path
from urllib.request import urlopen
from fontTools import subset
from fontTools.ttLib import TTFont
import io

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'site/designs/assets/fonts'
OUT.mkdir(parents=True, exist_ok=True)
copy = ''.join(p.read_text() for p in (ROOT / 'site/designs/design04').glob('*.html'))
copy += (ROOT / 'site/designs/shared.js').read_text()
copy += ''.join(chr(n) for n in range(32, 127))
for directory, filename, target, family in [
    ('shipporimincho', 'ShipporiMincho-Regular.ttf', 'onlyyuuka-mincho.woff', 'Onlyyuuka Mincho'),
    ('jost', 'Jost%5Bwght%5D.ttf', 'onlyyuuka-labels.woff', 'Onlyyuuka Labels'),
]:
    url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{directory}/'
    font = TTFont(io.BytesIO(urlopen(url + filename).read()))
    options = subset.Options()
    options.flavor = 'woff'
    options.layout_features = ['*']
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=copy)
    subsetter.subset(font)
    for record in font['name'].names:
        if record.nameID in (1, 4, 6, 16):
            record.string = (family.replace(' ', '') if record.nameID == 6 else family).encode(record.getEncoding())
    font.flavor = 'woff'
    font.save(OUT / target)
    license_text = urlopen(url + 'OFL.txt').read().decode('utf-8')
    (OUT / f'{directory}-OFL.txt').write_text('\n'.join(line.rstrip() for line in license_text.splitlines()) + '\n')
    print(target, (OUT / target).stat().st_size)
