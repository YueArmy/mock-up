"""Add the fourth concept to the existing proposal without regenerating other designs."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
page = ROOT / 'site/designs/index.html'
html = page.read_text()
if 'preview-design04' not in html:
    card = '''<article class="concept-card"><a href="design04/index.html"><div class="concept-preview preview-design04"><iframe src="design04/index.html" title="Design 04の実画面プレビュー" tabindex="-1" aria-hidden="true" loading="lazy"></iframe></div><p class="eyebrow">04 / 作品を主役に・もうひとつの見せ方</p><h2>布の小さなギャラリー — 展示室</h2><p>01のコンセプトから、Claude Designで制作したUI。写真と見出しを一体にし、展示室に入るような第一印象をつくります。</p><span class="text-link">このデザインを見る <span aria-hidden="true">↗</span></span></a></article>'''
    html = html.replace('</div><p class="concept-summary">', card + '</div><p class="concept-summary">', 1)
    additions = [
        ('<th>03 編集誌</th>', '<th>04 展示室</th>'),
        ('<td>知的、素材の変化が気になる</td>', '<td>写真と言葉が一体、展示室のような広がり</td>'),
        ('<td>素材の変化 → 作品ごとの記事 → 作者 → 相談</td>', '<td>写真とメッセージ → 制作の考え → 作品 → 作者 → 相談</td>'),
        ('<td>リメイクの面白さ・読みものとしての紹介</td>', '<td>01の作品性を、中央の見出しと大きな写真で伝える</td>'),
        ('<td>同じ作品の制作前後・使う場面・短い解説</td>', '<td>余白のある横長写真・作品写真・制作中の手元</td>'),
        ('<td>生成り×ローズ、セリフと罫線、記事の構成</td>', '<td>生成り×茶、明朝、写真に重なるタイトル</td>'),
    ]
    for before, after in additions:
        assert before in html
        html = html.replace(before, before + after, 1)
    html = html.replace('3案', '4案').replace('3つの', '4つの').replace('三つ。', '四つ。').replace('THREE DIRECTIONS', 'FOUR DESIGNS')
    html = html.replace('写真を眺めるように。アトリエを訪れるように。雑誌をめくるように。', '写真を眺めるように。アトリエを訪れるように。雑誌をめくるように。<br>3つのコンセプトに、ギャラリーの新しい見せ方を加えました。')
    html = html.replace('今回のおすすめは、01を軸に考えること。', '作品を主役にするなら、01と04から。')
    html = html.replace('名刺サイトとして作品の魅力を見せやすく、', '01は左右の対比、04は写真と見出しが一体の構図。どちらも名刺サイトとして作品の魅力を見せやすく、')
    page.write_text(html)

for path in [ROOT / 'scripts/build-designs.py', *ROOT.glob('site/designs/*/*.html')]:
    text = path.read_text()
    path.write_text(text.replace('3つの案を見比べる', '4つの案を見比べる'))
path = ROOT / 'site/index.html'
path.write_text(path.read_text().replace('デザイン3案', 'デザイン4案'))
