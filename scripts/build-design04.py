"""Build the static adaptation of the Claude Design UI (Design 04)."""
from pathlib import Path
import importlib.util
import re

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('designs', ROOT / 'scripts/build-designs.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.CONCEPTS['design04'] = ('04', '布の小さなギャラリー — 展示室', 'Textile Gallery')


def contactband():
    return '''<section class="d4-contact"><div class="d4-container"><p class="eyebrow">LET’S MAKE SOMETHING</p><h2>作品のことも、<br>これからのことも。</h2><p class="d4-contact-copy">作品についてのご質問、展示やコラボレーションのご相談。<br>まだ具体的に決まっていなくても、お聞かせください。</p><a class="d4-contact-button" href="contact.html">お問い合わせ <span aria-hidden="true">↗</span></a></div></section>'''


def newsletter():
    return '''<section class="d4-newsletter" id="newsletter"><div class="d4-container"><div><p class="eyebrow">LETTER FROM ONLYYUUKA</p><h2>新しい作品ができたら、<br>お便りを。</h2><p>新作や展示のお知らせ、制作途中のひとこまを<br>メールでお届けするニュースレターです。</p></div><form class="newsletter-form"><label for="letter-email">メールアドレス</label><input id="letter-email" type="email" placeholder="you@example.com" autocomplete="off" required maxlength="254"><button type="submit">入力内容を確認する</button><p class="sample-note">ご提案用サンプルのため、メールは登録・送信されません。</p><p class="form-status" role="status"></p></form></div></section>'''


def footer():
    return '''<footer class="d4-footer"><div class="d4-container d4-footer-top"><a class="d4-footer-brand" href="index.html">onlyyuuka</a><nav aria-label="フッターメニュー"><a href="index.html">ホーム</a><a href="about.html">作り手について</a><a href="works.html">作品</a><a href="contact.html">お問い合わせ</a></nav></div><div class="d4-container d4-footer-bottom"><p>© onlyyuuka WEBSITE DESIGN PROPOSAL</p><p>写真・文章はデザイン検討用です。イメージ写真は実作品・実際のアトリエを示すものではありません。</p></div></footer>'''


def cards(detailed=False):
    detail = '<span class="d4-work-detail">詳しく見る</span>' if detailed else ''
    return ''.join(f'''<article class="work d4-work" data-category="{w['cat']}"><button class="work-open" data-work="{w['id']}" aria-label="{w['name']}の詳細を見る">{base.img(w['file'],w['name'])}<span class="d4-work-title"><span>{i:02d}</span><span>{w['name']}</span></span><span class="d4-work-info">{w['use']} ／ {w['material']}</span>{detail}</button></article>''' for i, w in enumerate(base.WORKS, 1))


def works():
    return f'''<section class="page-intro wrap"><p class="eyebrow">WORKS / THE COLLECTION</p><h1><span>もとの布を、</span><wbr><span>知るとおもしろい。</span></h1><p>帯から、テーブルランナーへ。古布から、毎日の小物へ。<br>素材と使う場面から、作品をご覧ください。</p></section>
    <section class="d4-collection wrap"><div class="filters" role="group" aria-label="作品のカテゴリ"><button class="active" data-filter="all" aria-pressed="true">すべて <span>03</span></button><button data-filter="interior" aria-pressed="false">インテリア・布小物 <span>02</span></button><button data-filter="bag" aria-pressed="false">バッグ・ポーチ <span>01</span></button></div><p id="filter-result" aria-live="polite">3作品を表示</p><div class="works-grid">{cards(True)}</div><p class="sample-note">掲載作品は既存資料からの制作例です。現在の仕様・受付状況を示すものではありません。</p></section>
    <section class="d4-values d4-work-faq wrap"><p class="eyebrow">ABOUT THE WORKS</p><h2>作品について。</h2><div><article><h3>同じ柄の作品はありますか？</h3><p>素材や柄の取り方によって作品の表情が変わります。再制作の可否は、作品ごとにご確認いただく想定です。</p></article><article><h3>自分の布を使った制作は相談できますか？</h3><p>オーダーの受付範囲は、正式公開前に確認します。お問い合わせの見本では、素材や希望するかたちをお伝えいただけます。</p></article><article><h3>お手入れ方法は？</h3><p>使用する布と仕立てによって異なります。作品ごとに確認したお手入れ方法を、正式掲載時にご案内します。</p></article></div></section>{base.contactband()}{base.newsletter()}'''


def about():
    return f'''<section class="page-intro wrap"><p class="eyebrow">ABOUT ONLYYUUKA</p><h1><span>布と向き合う、</span><wbr><span>ひとりの作り手。</span></h1><p>リメイクアーティスト、onlyyuukaについて。</p></section>
    <figure class="d4-about-photo wrap">{base.img('hands-process.webp','布を縫う手元のイメージ写真',eager=True)}<figcaption>イメージ写真 / ご本人の制作風景に差し替える想定です。</figcaption></figure>
    <section class="d4-about-intro wrap"><div><p class="eyebrow">REMAKE ARTIST</p><h2>onlyyuuka</h2></div><div><p>帯や古着など、使われなくなった素材から、バッグや布小物、テーブルに添える作品を制作しています。帯や古布を、もう一度使えるかたちへ。</p><p>同じ布でも、どの柄を切り取るかで表情が変わる。その違いを活かしながら、もう一度手に取って使えるかたちを考えます。</p><p class="sample-note">紹介文は提案原稿です。活動のきっかけ・経歴は、ご本人へのヒアリング後に加えます。</p></div></section>
    <section class="d4-values wrap"><p class="eyebrow">AN APPROACH TO MAKING</p><h2>一枚の布から、考えること。</h2><div><article><p class="eyebrow">01</p><h3>柄・素材：どの表情を、残そう。</h3><p>織り柄や色の重なり。もとの素材の特徴を、次の作品の手がかりに。</p></article><article><p class="eyebrow">02</p><h3>使う場面：どんな場面で、使おう。</h3><p>食卓に置く、持ち歩く、部屋に飾る。使う場面に合うかたちを考えます。</p></article><article><p class="eyebrow">03</p><h3>組み合わせ：何が変わる。</h3><p>外と内、柄と無地。布同士の組み合わせも、一点ごとの違いになります。</p></article></div></section>{base.contactband()}{base.newsletter()}'''


def home():
    return f'''<section class="exhibition-hero">
      {base.img('gallery-textile.webp', '異なる織りの布を展示した、ギャラリーのイメージ写真', 'exhibition-backdrop', eager=True)}
      <div class="exhibition-hero-content wrap">
      <p class="eyebrow">REMAKE ARTIST</p>
      <h1><span>暮らしに、</span><wbr><span>もう一度物語を。</span></h1>
      <p class="exhibition-lead">帯や古布の、色と手ざわりを活かして。<br>毎日手に取るものを、一点ずつ仕立てています。</p>
      <div class="exhibition-actions"><a class="button" href="works.html">Worksを見る</a><a class="button button-outline" href="contact.html">お問い合わせ</a></div>
      </div><p class="exhibition-caption"><span>THE BEAUTY IN WHAT REMAINS.</span><span>イメージビジュアル</span></p>
    </section>
    <section class="exhibition-concept wrap" id="concept"><div>
      <p class="eyebrow">REMAKE AS STORY — 01</p><h2>しまっていた布に、<br>新しい居場所を。</h2>
    </div><div><p>帯や古布を、もう一度使えるかたちへ。身にまとっていた帯が、食卓の一枚になる。小さな布のかけらが、お茶の時間を彩る。</p><p>もとの素材のよさを見つけ、今の暮らしで使うかたちを考えています。残したいのは、布の表情。</p><p class="d4-concept-note">布と、手と、そのつづき。</p></div></section>
    <section class="selected-works d4-gallery-selection wrap" id="works"><div class="section-heading"><div>{base.label('SELECTED WORKS','02')}<h2>布から生まれた、<br>三つのかたち。</h2></div>{base.link('works.html', 'すべての作品を見る')}</div><div class="works-grid">{base.cards()}</div><p class="sample-note">既存資料の実作品写真です。寸法・制作年・受付状況は、正式掲載前に確認します。</p></section>
    <section class="d4-artist wrap"><figure>{base.img('hands-process.webp', '布と針を使った手仕事のイメージ写真')}<figcaption>制作風景のイメージ / ご本人の手元ではありません。</figcaption></figure><div class="d4-artist-copy"><div><p class="eyebrow">THE HANDS BEHIND — 03</p><h2>布を見つめて、<br>次のかたちを考える。</h2></div><div><p>リメイクアーティスト、onlyyuuka。帯や古布の色、柄、織りを手がかりに、バッグや小物、インテリアの作品を制作しています。</p>{base.link('about.html', '作り手について')}</div></div></section>
    {base.contactband()}{base.newsletter()}'''


def document(page, content):
    html = base.document('design04', page, content)
    html = html.replace('3つの案を見比べる', '4つの案を見比べる')
    html = html.replace(base.contactband(), contactband()).replace(base.newsletter(), newsletter()).replace(base.footer(), footer())
    nav = ''.join(f'<a href="{href}" {"aria-current=page" if page==key else ""}>{label}</a>' for key, href, label in [('works','works.html','作品'),('about','about.html','作り手について'),('contact','contact.html','お問い合わせ')])
    html = re.sub(r'<nav id="navigation".*?</nav>', f'<nav id="navigation" aria-label="メインナビゲーション">{nav}<a href="#newsletter">お便り</a></nav>', html)
    html = html.replace('まだ、決まって<br>いなくても。','<span>まだ、決まって</span><wbr><span>いなくても。</span>')
    html = html.replace('もとの布を、<br>知るとおもしろい。','<span>もとの布を、</span><wbr><span>知るとおもしろい。</span>')
    html = html.replace(' rows="6"',' rows="7"').replace(' placeholder="例：山田 花子"','').replace(' placeholder="例：hello@example.com"',' placeholder="you@example.com"').replace(' placeholder="気になる作品や、ご相談の内容をお聞かせください。"','')
    html = html.replace('入力内容を確認する <span aria-hidden="true">↗</span>','入力内容を確認する')
    return html


if __name__ == '__main__':
    target = ROOT / 'site/designs/design04'
    target.mkdir(parents=True, exist_ok=True)
    pages = [('home', 'index.html', home()), ('about', 'about.html', about()),
             ('works', 'works.html', works()), ('contact', 'contact.html', base.contact('design04'))]
    for page, filename, content in pages:
        (target / filename).write_text(document(page, content))
    print('Built Design 04: 4 pages')
