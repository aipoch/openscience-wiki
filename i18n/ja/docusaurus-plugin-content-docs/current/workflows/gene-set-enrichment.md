---
title: "候補遺伝子セットのための機能強化を実行"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 候補遺伝子セットのための機能強化を実行 {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>実践例</strong> 意図的に選択されたヒトDNA損傷遺伝子リスト</p>

定義された遺伝子リストを、豊富な生物学的プロセスと経路の表に変え、識別子マッピング、統計的背景、およびソースバージョンを保持します。

開始する前に、[科学データベース](../tools/databases.md#connect-database) に従って、必要なコネクタを有効にします。 接続されたモデルと利用可能な[Notebook ランタイム](../guides/runtimes.md)を使用します。

このv0.31.1の例では、11パブリック遺伝子のシンボルを使用して、g:Profilerを実証します。 既知の生物学的役割で選ばれたので、豊かさが期待されています。 GSE60450プロジェクトや偏見のない発見の証拠から差圧結果は異なります。

## 1. 遺伝子リストと解析の設定を定義する {/* #gene-set-enrichment */}

1. **Settings → Connectors** では、**ジャンルとオノトロジー** を代理店に利用できるようにします。 接続されたモデルと利用可能なNotebookランタイムでセッションを開きます。
2. 生物、遺伝子識別子、データソース、統計的な背景を指定します。 実際の実験データでは、実験で選択した遺伝子を使用して背景を正当化します。 このチュートリアルでは、カスタム測定遺伝子の宇宙ではなく、すべてのアノテーション遺伝子を明示的に使用しています。
3. 下記のプロンプトを送信してください。 ソースバージョンのクエリとエンリッチメントコールを同じセッションで保持し、実際の結果を保存します。

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

## 2. 識別子とソースバージョンをチェックする {/* #identifier-check */}

生成されたメモを開き、クエリとマッピングのカウントを確認します。 これは、マップされた**11/11**識別子を実行します。, **0**非マップ, あいまいなまたは重複識別子. **GRCh38.p14の特長**、g:Profiler **e114_eg62_p19_27110d83**、GOクラス**2026-01-23**およびReactomeクラス**2026-03-20**を記録しました。 後続のサービスバージョンは異なる条件を返す場合があります。

![保存された英語のクエリ、背景、ソースバージョン、識別子チェック](/img/open-science/v0311/enrichment-notes.webp)

## 3. 濃縮テーブルを調べる {/* #enrichment-results */}

CSV を開き、JSON をフルで比較します。 FDR 0.05 で返された **891 用語** を実行します。 プレビューは最初の100行のみを示しています。 表示限界は合計の結果の計算ではないです。 `source`、`native`、修正された`p_value`、`intersection_size`、`query_size`および`effective_domain_size`を条件を解釈するとき保持して下さい。

![正しい確率とドメインサイズの実際のエンリッチメントテーブル](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">解析ノート</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">すべての891結果の列</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">完全な応答</ExampleDownload>

`background_size: null`はカスタム背景リストが提出されていないことを意味します。 遺伝子ゼロの統計的な宇宙とは意味しません。 永久有効ドメインサイズを使用してください。 エンゲージメントは、原因の関与、差異的な表現、またはアップ/ダウン規制を確立しません。 [操作パラメータ](../reference/connector-operations.md#enrich_gene_set) を参照してください。
