# Design 04 UI確認

2026-09-07、Computer Use（Codex in-app browser）で確認。

## Claude Designとの照合

参照プロジェクト: https://claude.ai/design/p/fe7dba6d-9b76-4643-88a8-3609a8484c1a

- 実作品写真・Hero画像のURLを渡し、生成UI参照v1/v2を画像添付。
- Heroの写真とタイトルを同じ写真領域へ統合。
- Homeの制作紹介、Contact CTA、Newsletter、Footer、About、Worksを実DOMの配置・余白・配色と照合して専用HTMLへ実装。
- Shippori MinchoとJostの字形をサブセットとして同梱。ロゴの文字間隔と入力文字サイズはプロジェクトの可読性条件を優先。

## 表示確認

- PC 1440px、スマホ390pxでHero・CTA・お便り・フォーム・作品詳細を目視。
- 小画面320px、タブレット768pxで全4ページを確認。documentElementのscrollWidthとclientWidthが一致し、画像の読み込み失敗は0。
- 最小幅のニュースレターではグリッドの子要素がはみ出していたため修正。
- Heroの「もう一度」の途中改行を修正。
- レイアウト変更後はURLクエリを変えて再読み込みし、旧DOMが残っていないことを確認。

## 操作確認

- モバイルメニュー開閉、Escapeで閉じる。
- Worksの全カテゴリ：すべて3件、インテリア2件、バッグ1件。
- 作品詳細の開閉、Escape、閉じるボタン。
- 詳細の相談ボタンからContactへ作品名・相談種別を引き継ぐ。
- Contactの確認画面、修正ボタン、入力値の保持。
- Newsletterの入力確認メッセージ。
- 最終WorksのFAQはClaudeと同じ常時表示の説明3列。旧版のアコーディオン操作は廃止。
- 送信・登録・保存は行わないサンプル。

## 静的確認

- python3 scripts/check-design-files.py: 18ページの相対URL・画像・アンカーが存在。
- shared.js / proposal.js の構文検査。
- git diff --check。

実機端末での検証は未実施。

## 公開確認

- サイト実装コミット: 2ea63ff24a771a699888dacadf31cb6c0f209ae0
- GitHub Actions: 34103268320、success。
- 公開した比較ページ・Design 04の4ページ・CSS・フォントがHTTP 200。
- 公開版をComputer Useで開き、お問い合わせCTA・お便りの新構造、背景色、フォント読込、画像失敗0を確認。
- 公開URL: https://yuearmy.github.io/mock-up/designs/design04/
