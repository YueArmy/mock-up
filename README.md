# onlyyuuka — ホームページ確認版

今回は「布の小さなギャラリー」1案を提出します。

- [ホームページを見る](https://yuearmy.github.io/mock-up/preview/)
- [ご確認いただきたいこと](https://yuearmy.github.io/mock-up/preview/review.html)

HP本体は次の全3ページです。確認事項ページは別枠として、本体のページ数に含めません。

1. トップ・ブランド紹介 — 作り手の写真、ストーリー、布合わせの紹介
2. 商品紹介 — 黒帯ポシェット、バッグインバッグ、ストーマ用ショーツの写真・特徴・仕様・英語説明
3. ご購入・お問い合わせ — 購入案内、FAQ、問い合わせ確認、ショップ/SNS、末尾にカスハラ方針の全文

トップから各商品の紹介位置へ直接移動できます。以前のAbout・商品・方針URLも、新しい掲載位置へ案内します。

デザイン・構成・文章を確認するためのモックです。価格・仕様・在庫・受付条件・販売先/SNSのリンクとQR・問い合わせ窓口は確認後に反映します。問い合わせは入力確認・修正・文面コピーまでで、送信・保存・注文・決済は行いません。

## 構成

- `site/preview/` — 現在の提出版。3ページと確認事項、旧URLの案内、共通CSS/JS、支給画像5点
- `site/index.html` — 提出版トップへ案内
- `site/proposal.html` — 提出版の確認事項へ案内
- `site/designs/index.html` — 提出版トップへ案内
- `site/designs/design04/`、`atelier/`、`journal/` — 過去の3案を保存。現在の提出版からはリンクしません
- `scripts/check-design-files.py` — site/全体の相対リンク・画像・アンカー検証
- `plans/20261108-three-page-proposal.md` — 3ページ統合の実装・公開計画
- `plans/20261108-single-proposal-delivery.md` — 1案の初回提出版を公開した際の計画

## ローカル確認

    python3 -m http.server 4197 --bind 127.0.0.1 --directory site

[提出版のローカルプレビュー](http://127.0.0.1:4197/preview/)を開きます。依存パッケージ不要の静的サイトです。

## 検証・公開

    node --check site/preview/gallery.js
    python3 scripts/check-design-files.py

mainへのsite/変更でGitHub ActionsがGitHub Pagesへ公開します。配信対象はsite/のみ。元のWord原稿、内部制作メモ、ローカルreview/は公開対象に含めません。

提出版は利用を許可された支給画像を使用し、画像生成を追加していません。検索抑制のためnoindexを指定しています。パスワードは設けていません。
