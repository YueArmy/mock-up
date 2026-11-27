# onlyyuuka — ホームページ確認版

今回は「布の小さなギャラリー」1案を提出します。

- [ホームページを見る](https://yuearmy.github.io/mock-up/preview/)

HP本体は次の全4ページです。確認事項ページは別枠です。

1. ホーム — メイン画像と商品・作り手紹介への入口
2. onlyyuukaについて — 本人写真、ストーリー、事業概要
3. 商品紹介 — 3商品の写真・特徴・仕様
4. ご購入・お問い合わせ — 購入案内、FAQ、問い合わせ確認、ショップ/SNS、カスハラ方針

確認用モックです。ショーツの注文方法と新しいカスハラ方針は別紙を待っています。お問い合わせは仮公開中はメールへのリンクです。Googleフォーム・スプレッドシート、注文・決済は未接続です。

## 構成

- `site/preview/` — 現在の提出版。4ページと確認事項、旧URLの案内、共通CSS/JS、支給画像
- `site/index.html` — 提出版トップへ案内
- `site/proposal.html` — 提出版トップへ案内
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
