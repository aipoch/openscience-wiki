---
title: "種、参照のゲノムおよび染色体識別子をチェックして下さい"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 種、参照のゲノムおよび染色体識別子をチェックして下さい {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>実践例</strong> 人間のGRCh38.p14染色体1を識別します</p>

異なるデータベースからレコードを組み合わせる前に、生物、バージョンアセンブリ、染色体エイリアスを確認します。 出力は、元のソース応答で1つの染色体のためのアイデンティティテーブルです。

開始する前に、[科学データベース](../tools/databases.md#connect-database) に従って、必要なコネクタを有効にします。 接続されたモデルと利用可能な[Notebook ランタイム](../guides/runtimes.md)を使用します。

## 1. 生物、アセンブリおよび染色体を照会して下さい {/* #reference-genome */}

1. **ゲノム**で**Settings → Connectors**を有効にします。 接続されたモデルと利用可能なNotebookランタイムでセッションを開きます。 このv0.31.1の例では、**Codex subscription**が使われています。
2. その順序で生物、**バージョンアップ**アセンブリおよび順序を照会して下さい。 送信:

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. 返された識別子を比較する {/* #compare-identifiers */}

メモを開き、返されたIDを3つのJSONファイル全体で比較します。 この例では3つの呼び出しが成功しました。

![実際のNCBIコールと返された納税者とアセンブリIDの3つ](/img/open-science/v0311/ncbi-notes.webp)

| 使い方 | この例の結果 |
| --- | --- |
| 組織図 | ホモ・サピアン、税理士事務所 **9606**; 1つのマッチ、 `ambiguous: false` |
| 要求される/currentアセンブリ | **GCF_000001405.40の特長**, **GRCh38.p14の特長**、UCSCの名前 **hg38の特長** |
| 組まれたGenBankアセンブリ | **GCA_000001405.29**; RefSeqの返されたレコードレポートの違い |
| Chromosome 1 エイリアス | **1**, **chr1の特長**, RefSeqの **NC_000001.11**, GenBank , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , **CM000663.2** |
| 選択されたシーケンス | **248956422のbp**、第一次アセンブリ; 1つのマッチ、 `matches_truncated: false` |

![元の染色体-1 応答とバージョンアップされたエイリアスとマッチカウント](/img/open-science/v0311/ncbi-aliases.webp)

## 3. アイデンティティテーブルとソースレコードを保持する {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">クエリノート</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">アイデンティティテーブル</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">税制上の対応</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">アセンブリ応答</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">シーケンス応答</ExampleDownload>

本例では **1つの選択された染色体**の照会が完了しました。アセンブリの全配列をエクスポートしたわけではありません。クエリを変更する際も、曖昧な一致と打ち切りフラグを保持してください。アセンブリ名はバージョン付きアクセッションの代わりにはなりません。現在のアクセッションが返されても、要求した旧版を無断で置き換えてはいけません。配列の別名は同じアセンブリ内の名前の対応であり、アセンブリ間の座標変換ではありません。[正確な入力](../reference/connector-operations.md#ncbi_get_assembly_info)
