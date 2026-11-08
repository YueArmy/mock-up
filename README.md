# onlyyuuka — ホームページ確認版

今回は「布の小さなギャラリー」1案を提出します。

- [ホームページを見る](https://yuearmy.github.io/mock-up/preview/)
- [ご確認いただきたいこと](https://yuearmy.github.io/mock-up/preview/review.html)

HP本体はトップ、About、黒帯ポシェット、バッグインバッグ、ストーマ用ショーツ、ご購入・お問い合わせ、カスハラ方針の全7ページ。確認事項ページを別に設けています。

デザイン・構成・文章を確認するためのモックです。価格・仕様・在庫・受付条件・販売先/SNSのリンクとQR・問い合わせ窓口は確認後に反映します。問い合わせは入力確認・修正・文面コピーまでで、送信・保存・注文・決済は行いません。

## 構成

- `site/preview/` — 現在の提出版。7ページと確認事項、共通CSS/JS、支給画像5点
- `site/index.html` — 提出版トップへ案内
- `site/proposal.html` — 提出版の確認事項へ案内
- `site/designs/index.html` — 提出版トップへ案内
- `site/designs/design04/`、`atelier/`、`journal/` — 過去の3案を保存。現在の提出版からはリンクしません
- `scripts/check-design-files.py` — site/全体の相対リンク・画像・アンカー検証
- `plans/20261108-single-proposal-delivery.md` — 今回の実装・公開計画

## ローカル確認

    python3 -m http.server 4197 --bind 127.0.0.1 --directory site

[提出版のローカルプレビュー](http://127.0.0.1:4197/preview/)を開きます。依存パッケージ不要の静的サイトです。

## 検証・公開

    node --check site/preview/gallery.js
    python3 scripts/check-design-files.py

mainへのsite/変更でGitHub ActionsがGitHub Pagesへ公開します。配信対象はsite/のみ。元のWord原稿、内部制作メモ、ローカルreview/は公開対象に含めません。

提出版は利用を許可された支給画像を使用し、画像生成を追加していません。検索抑制のためnoindexを指定しています。パスワードは設けていません。
