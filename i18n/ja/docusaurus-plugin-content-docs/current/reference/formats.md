---
title: "ファイルフォーマットと制限"
last_update:
  date: '2026-11-19'
---

# ファイルフォーマットと制限 {/* #file-formats-and-limits */}

ファイルのルーティングと制限をここに表示します。 ファイルをアップロードし、それをプレビューし、ツールでそれを解析し、モデルにそれを送信することは別々の機能です。 受信したアップロードは、インラインビューアまたはモデル理解の約束ではありません。

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## プレビュールーティング {/* #preview-routing */}

| コンテンツ | 認識された延長 | 行動と境界 |
| --- | --- | --- |
| ラスター/ベクトル画像 | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | 画像プレビュー。モデル入力はイメージサポートに依存します |
| ツイート | `tif`, `tiff` | ファイル、ピクセルおよびメモリ制限付き専用のデコーダー |
| 区切りテーブル | `csv`, `tsv` | 最初の行はヘッダとして扱われます; 境界線/列 |
| シーケンス | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | FASTA 検査; 閲覧は解析法を検証しません |
| コンテンツ | `pdb` | 構造ビューア;予測の品質評価ではなく |
| 分子/反応 | `mol`, `sdf`, `smi`, `smiles`, `rxn` | 専用の分子プレビュー; 想定しない `mol2` 同じルーティングを持っています |
| サイトマップ | `pdf` | ページコントロール付きの専用のドキュメントリーダー |
| キーワード | `docx` | オフィスのレンダリング; 遺産 `doc` DOCX 解析にルーティングされていない |
| スプレッドシート | `xls`, `xlsx` | オフィスのスプレッドシートのプレビュー;モデルの実行は別の操作です |
| プレゼンテーション | `pptx` | プレゼンテーションプレビューと [スライド編集](../guides/presentation-editing.md); レガシー `ppt` PPTXの解析にルーティングされていない |
| マークダウン | `md`, `markdown` | サポートされているテキストバージョンアクションでレンダリングされた文書 |
| アーカイブ | `htm`, `html` | 隔離された HTML のプレビュー; アプリケーション特権を受信しません |
| ジェソン | `json` | 認定計画JSONを含む構造プレビュー |
| コードコード | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | ハイライトされたソース; スクリプトを開くと実行されません |
| プレーンテキスト | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | 境界テキストプレビュー |
| その他のファイル | 認識されていない拡張子/コンテンツ | 利用できるフォールバック/ダウンロード; `.ipynb` エクスポートは専用のファイルプレビューエディタではありません |

ルータには、MIME のフォールバックが狭くなり、拡張子のないファイルでも使用できます。 Mis一流のOffice MIMEメタデータは、OOXMLレンダラーと互換性のあるレガシーフォーマットを作りません。

[正確なルーティングテーブル](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [レンダーレジストリ](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## サイズおよび表示限界 {/* #size-and-display-limits */}

以下の単位はバイナリ単位です: 1 MiB = 1,048,576バイト; 1 GiB = 1,073,741,824バイト。 インターフェイスは、これらの値のMBまたはGBをラベル付けすることができます。

| バウンダリー | ソース制限 | 制限が適用されるもの |
| --- | ---: | --- |
| 1つのプロジェクトアップロード | 10 ジブ | プレビューやモデルのコンテキスト予算ではなく、入学をアップロードする |
| 1つのアップロードチャンク | 8のMiB | チャンクのサイズを移して下さい; ユーザーのファイルごとの制限を強制しない |
| コンポーザーアタッチメント | 10 | メッセージごとの添付ファイル数 |
| コンポーザーアーティファクトの言及 | 10 | メッセージごとの明示的なアーティファクト参照 |
| デフォルトのテキストプレビュー読み取り | 1のMiB | 初期の境界コンテンツの読み込み |
| 最高の要求された一般的なプレビュー読み取り | 10のMiB | 一般的な読者の天井; 専門リーダーは独自の限界を持っています |
| CSV/TSV 可視データ | 100行×24列 | 最初の/ヘッダーの行の後に表示されたデータ; ソースのデータセットのサイズではなく |
| オフィスファイルプレビュー | 40のMiB | オフィスプレビュー入場 |
| TIFFファイルプレビュー | 40のMiB | 専用TIFFファイル制限 |
| TIFFデコードピクセル | 25,000,000 | プレビューデコードピクセル予算 |
| TIFF のデコードされた割り当て | 256のMiB | プレビューデコーダーメモリ予算 |
| TIFFページカウント | 512 | プレライトページキャップ; 他の構造の帽子はまた適用します |
| 自動PDF抽出/acquisition | 50のMiB | 自動 PDF テキスト/機器パス; 一般的なプロジェクト・アップロードの限界としてそれを扱いません |

関連する操作にリストされた制限を適用します。: プレビューの制限、アップロードの制限、パッケージの予算は別です。 特大ファイルの場合は、元のファイルと互換性のある外部リーダーを使用して、または方法に応じて入力を分割します。

**100行を表示** というテーブルには、より多くのソース列が含まれている場合があります。 Notebookで解析したファイルを使用して、そのサイズを確立します。 GSE60450 ケースでは、ソースは 27,179 遺伝子の行を持っていますが、サンプル QC CSV には 12 列があります。2 つのファイルが異なる単位を要約します。

[アップロード制限](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [CSV 境界線](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [テキストリーダーの境界](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [オフィスの制限](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [TIFF制限](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [PDF抽出限界](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## 文学の輸入および引用の出力 {/* #literature-import-and-citation-output */}

| アイテム | 契約条件 | 免責事項 |
| --- | --- | --- |
| リファレンスレコードのインポート | BibTeX、RIS、NBIB | バイブリグラフのレコードをインポートします。 添付されたテキストを保証するものではありません。 |
| インポートコンテンツ | 32 MiBまで、1,000レコード境界付き | より大きなコレクションを見直したバッチに分割 |
| シテーションスタイルのインポート | CSL、1 MiBまで | スタイル定義、文献収集ではなく |
| Bibliographicの記録の輸出 | BibTeX または RIS | NBIBの輸入はNBIBの輸出を意味します仮定しません |
| locale のシテーションフォーマット | `en-US`, `zh-CN` | アプリケーションUIの言語とは異なる引用のロケール |
| コレクション名 | 200 文字 | コレクションラベル |
| コレクションの説明 | 1,000 文字 | コレクションを記述する。 プロジェクトエージェントのコンテキストを置き換えない |

DOIメタデータ結果はPDFをダウンロードしていません。 付属のPDFは、エージェントが完全なテキストを読み込むという証拠ではありません。 添付ファイルと実際の実行/証拠記録の両方を確認します。

[文学のスキーマと限界](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [インポート/エクスポートフォーマッタ](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## バージョンとダウンロードID {/* #version-and-download-identity */}

| 識別子 | 利用条件 | 代替しないでください |
| --- | --- | --- |
| 表示名 | インターフェイスでファイルを見つける | 名前だけでは不変な内容が特定されない |
| ファイル/アーティファクト ID | 管理されたオブジェクトを特定する | ダウンロードしたパスは、オブジェクトのアイデンティティではない |
| バージョンID / `vN` | 正確な保存されたリビジョンとその実績を調べる | 最新のコンテンツは、結果のために使用されるバージョンと異なる場合があります |
| チェックサム | ソースと保存されたコピー間のバイトを比較する | マッチング名はマッチングチェックサムを確立しません。 |
| 目的地をダウンロード | 外部コピーの検索 | コピーが自動的に管理されたバージョンを更新しない編集 |

操作手順については、[Notebookと証拠](../guides/notebook.md)と[パブリックデータワークフロー](../workflows/data-quality.md)を使用します。 この参照は、これらのガイドがタスクに集中できるように、境界を集中化します。

フォーマット固有の制御については、[プレビューコントロール](../guides/previews.md#diagram-source-and-format-specific-controls)を参照してください: 人魚のソース/レンダリングされた切り替え、単一ページのPDF読み取り条件、境界テーブル、ワークシートの選択およびTIFFページの処理。 プレビューサポートは、成功したモデルの入力またはエクスポートを確立しません。
