---
title: "パブリックオミクスデータを見つけてファイル在庫をビルドする"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# パブリックオミクスデータを見つけてファイル在庫をビルドする {/* #find-public-omics-data-and-build-a-file-inventory */}

既知のアクセスや研究トピックから始めて、パブリックランメタデータを調べ、ソースの場所と利用可能なチェックサムでファイル在庫を保存します。 以下の例は、在庫を生成します。 データのダウンロードと分析は、別々のタスクです。

開始する前に、[科学データベース](../tools/databases.md#connect-database) に従って、必要なコネクタを有効にします。 接続されたモデルと利用可能な[Notebook ランタイム](../guides/runtimes.md)を使用します。

## 1. 既知の実行を解決し、ファイルを検査する {/* #ena-runs */}

1. **Omics アーカイブ** で **Settings → Connectors** を有効にします。 PRJ の勉強や SRR の実行など、`ena_search_runs` への公開 ENA/INSDC へのアクセスを提供します。 GEO `GSE` 識別子は、最初に INSDC の勉強にリンクする必要があります。 キーワードは受け付けていません。
2. `run_accession`、生物、図書館戦略/レイアウトおよび`truncated`を点検して下さい。 1,000 は最大です。 オフセットや継続トークンはありません。 応答が中断されている場合、アクセスが狭くなります。
3. `ena_get_run_files` に返された実行を 1 つ渡して下さい。 `found`、`fastq_available`、`fastq_files`の各エントリをチェックします。 在庫はURL、圧縮ファイルサイズ、および上流MD5を供給します; ファイルをダウンロードしたり、コンテンツを検証したりしません。
4. 別のダウンロードの前に、ストレージを確認し、マニフェストを保持します。 ダウンロードしたバイトをリストされたチェックサムに対して確認します。 ペアリングされたライブラリは、まったく2つのファイルを必要としません。 `file_index` から読み取りメイトの ID を差し込みません。

<p className="example-label"><strong>実践例</strong> SRR037073のためにマニフェストファイルを作成する</p>

このv0.31.1の例では、**Codex subscription**と有効な**Omics アーカイブ** Connectorを使用します。 利用可能なNotebookランタイムでセッションを開き、次のコマンドを実行します。

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

生成されたメモを開きます。 実際の検索が返された **1 実行**, , **Caenorhabditisのelegans**, 研究 **PRJNA123835の特長**, , **RNA-Seq の特長**, , **スイングル**と、 `truncated: false`. . . . ファイルを使用する前に、生物とレイアウトを確認します。

![ENA のクエリ入力、生成されたノートで ID と完全性フラグを実行します。](/img/open-science/v0311/ena-notes.webp)

CSV を開き、`ena-files.json` で比較します。 この実行には `found: true`, , `fastq_available: true` そして、 **1ファイル**, サイズ **25,154,397バイト**. . . . マニフェストは、FTP URL と上流 MD5 を保持します。 プレビュー列がクリップされている場合は、ダウンロード可能なファイルから完全な値をコピーします。

![実際の1つのファイル ENAは、URL、サイズ、および上流チェックサムで現れます](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">クエリノート</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ マニフェスト</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">応答を実行します</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">ファイル応答</ExampleDownload>

2 件のクエリとファイル一覧の生成が完了しました。本例では **FASTQファイルがダウンロードされていないか、チェックサムが検証されていない**。ダウンロードは別の手順です。[正確なパラメータ](../reference/connector-operations.md#ena_search_runs)

## 2. トピックで実行を発見し、プロジェクトファイルを調べる {/* #omics-discovery */}

研究トピックが、アクセスされていないときに、`ena_query_runs`を使用してください。 生物、図書館戦略、キーワードフィルタを AND と組み合わせる。 少なくとも1つのフィルターは要求されます; `tax_id`には、子孫のタキサが含まれています。 デフォルト制限は100で、最大値は1,000です。 truncated 応答には、継続カーソルがありません。データセットの合計として返されたカウントを処理する代わりに、クエリを絞り込みます。

<p className="example-label"><strong>実践例</strong> 人間RNA-Seqが5台を走らせ、ENAとPRIDEのファイル在庫を調べる</p>

1. **Settings → Connectors**で**Omics アーカイブ**を有効にし、接続されたモデルと利用可能なNotebookランタイムでセッションを開きます。 この例では、**Codex subscription** を使用します。
2. メタデータをリクエストするには、以下のプロンプトを使用します。 ENA クエリと PRIDE プロジェクトは別々の例です。 1つの研究からサンプルと一致していません。
3. `ena-discovery.json` を開き、ファイルを選択する前に、クエリ、生物、アクセスを実行し、`truncated` を検査します。

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![ENAおよびPRIDEの在庫の結果を照会し、観察される条件](/img/open-science/v0320/omics-discovery-notes.webp)

4. 選択したENAランのインベントリと比較します。 この例では、クエリは`truncated: true`で**5 を実行します。**を返します。 **SRR077868の特長**は、**1アーカイブFASTQ**、**462,508,712バイト**、および上流MD5を持っています。 `found: true` と `submitted_available: false` と **0ファイル** の元の在庫があります。 そのため、既存の実行では、両方の在庫を提供する必要はありません。
5. PRIDEのページを調べる **PXD000001の特長**は**5 ページのレコード 0**と**4のページで1**を、`api_total: 9`と最終`next_page: null`で返します。 CSV は、9 個の PRIDE ファイルが 1 つの ENA FASTQ 行と共に 2 つの場所を供給するので、**19行** を結合しました。 ダウンロード場所とは別にファイルアクセス数をカウントします。

![生成された在庫表のENAとPRIDEエントリ](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">クエリノート</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">在庫を組み合わせる</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">ENAの発見</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">ENAファイルインベントリ</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">PRIDEページ</ExampleDownload>

出力は、シーケンシングやプロテオミクスデータをダウンロードしないように、ファイルインベントリです。 BAM/CRAMなどのFASTQやオリジナル作品の投稿は、異なる商品です。 ENA のオリジナル FTP パスを 文字通り、`#` 文字を含む。 PRIDE では、`next_page` と返されたメタデータを使用します。 `api_total` は他のプロジェクトに対して欠損する可能性があり、チェックサムのテキストはアルゴリズムを常に識別しません。 別のダウンロードの前に、必要な形式を選択し、ストレージを確認し、上流チェックサムが利用可能なときにバイトを確認します。 正確な入力については、[操作の参照](../reference/connector-operations.md#ena_query_runs) を参照してください。
