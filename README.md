# onlyyuuka — ホームページのデザイン3案

リメイクアーティスト onlyyuuka の作品・作り手を紹介する、クライアント提案用サイトです。

## 提出先

**[3案を見比べる](https://yuearmy.github.io/mock-up/designs/)**

| 案 | コンセプト | 主役 | ページ |
|---|---|---|---|
| 01 | 布の小さなギャラリー — 展示室 | 写真とタイトルが一体のHero | [開く](https://yuearmy.github.io/mock-up/designs/design04/) |
| 02 | 作り手のアトリエ | 手元・制作の視点・親しみ | [開く](https://yuearmy.github.io/mock-up/designs/atelier/) |
| 03 | 布をめぐる編集誌 | 素材から作品への変化 | [開く](https://yuearmy.github.io/mock-up/designs/journal/) |

各案は Home / About / Works / Contact の4ページ。色だけでなく、トップの情報順とレイアウトを変えています。

**[HPに載せる内容と準備するもの](https://yuearmy.github.io/mock-up/designs/preparation.html)** に、掲載内容、写真の種類・枚数、原稿、確認担当、問い合わせ・ニュースレター・更新の運用を整理しています。

## 提案書

提案資料はClaude Design版へ移行中です。旧PDF・Wordは公開対象から削除しました。

Design 01（旧Design 04）は[Claude DesignのUI](https://claude.ai/design/p/fe7dba6d-9b76-4643-88a8-3609a8484c1a)を基に静的HTMLへ実装しました。画像生成したUI参照をClaudeへ添付し、実作品には既存資料の写真を使用しています。生成プロンプトは `plans/20260907-design04-image-prompt.txt`、実装・検証記録は `plans/20260907-design04-claude-ui.md` を参照してください。

## 動くところ

- PC・タブレット・スマホに合わせたレイアウト、モバイルメニュー
- 作品カテゴリの切り替え、作品詳細ダイアログ、Escapeで閉じる操作
- 作品名を引き継ぐお問い合わせ
- 必須・メール形式・空白のみの検証、入力内容の確認と修正
- ニュースレターの入力確認、FAQ、提案資料の印刷

**提案用の画面サンプルです。問い合わせの送信・メルマガ登録・保存・購入・決済は行いません。**

## 素材について

- 作品画像は既存の資料画像を使用。実物の高解像度版と、寸法・制作年・受付状況は正式公開前に確認します。
- A案の布の展示画像はAI生成したイメージ写真です。
- 手元・机上写真は既存リポジトリのイメージ素材で、本人や実際のアトリエと確認できていません。
- 未確認の経歴・実績・費用・納期・SNS URLは追加していません。
- 画像はローカルWebPで配信。外部フォント・外部画像・トラッカーに依存しません。
- noindexは検索抑制のための設定で、アクセス制限ではありません。

## ローカル確認

    python3 -m http.server 4197 --bind 127.0.0.1 --directory site

[ローカル比較ページ](http://127.0.0.1:4197/designs/) を開きます。依存パッケージ不要。HTMLを直接開くこともできます。

## 構成

- `site/designs/` — 今回の3案、比較、準備リスト
- `scripts/build-design04.py` — Claude Design版の4ページを生成
- `scripts/build-designs.py` — 各案の4ページを生成するテンプレート
- `scripts/check-design-files.py` — 相対リンク・画像・アンカーの静的確認
- `scripts/verify-designs.cjs` — 1案目完成時に実行したブラウザ検証（Playwrightが必要）
- `scripts/build-proposal-docx.py` — 旧提案書の生成スクリプト（現在の提出対象外）
- `scripts/export-design-pdfs.cjs` — Web版比較・準備リストの印刷（Playwrightが必要）
- `verification/20260907-ui-review.md` — Computer Useによる確認結果
- `plans/20260907-design-proposals-implementation.md` — 制作順序と確認記録
- `site/` 直下 — 以前の提案を保持。トップの案内から今回の3案へ移動可能

## 再生成とチェック

    python3 scripts/build-designs.py atelier journal
    python3 scripts/build-design04.py
    python3 scripts/check-design-files.py
    node --check site/designs/shared.js
    node --check site/designs/proposal.js

Computer Useで320 / 390 / 768 / 1024 / 1440pxを確認しました。表示崩れの修正と操作結果は検証記録を参照してください。

## 公開

mainへのsite/の変更で、既存GitHub ActionsがGitHub Pagesを更新します。配信対象はsite/のみです。契約・本番フォーム接続を伴う本サイトの公開は、別途クライアントと要件を確認します。

表示番号とURL：Design 01は既存の `/designs/design04/` を維持しています。旧ギャラリー版は削除済みです。
