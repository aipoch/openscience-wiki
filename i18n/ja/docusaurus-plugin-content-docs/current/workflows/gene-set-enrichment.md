---
title: "候補遺伝子セットのための機能強化を実行"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 候補遺伝子セットのための機能強化を実行 {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>実践例</strong> 意図的に選択されたヒトDNA損傷遺伝子リスト</p>

定義された遺伝子リストを、豊富な生物学的プロセスと経路の表に変え、識別子マッピング、統計的背景、およびソースバージョンを保持します。

開始する前に、[科学データベース](../tools/databases.md#connect-database) に従って、必要なコネクタを有効にします。 接続されたモデルと利用可能な[Notebook ランタイム](../guides/runtimes.md)を使用します。

最初の例では g:Profiler を使用します。 [EnrichrとSTRINGの比較](#enrichr-string) は v0.33.3 で同じ 11 パブリック ジェネラル シンボルを使用します。 既知の生物学的役割で選ばれたので、豊かさが期待されています。 GSE60450プロジェクトや偏見のない発見の証拠から差圧結果は異なります。

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

## 4. EnrichrとSTRINGネットワークの充実度を比較 {/* #enrichr-string */}

Enrichr は、指定した遺伝子にアノテーションセットが表れているかを尋ねます。 STRING PPI の強化は、タンパク質が予想以上にネットワークの相互作用を持っているかどうかを尋ねます。 これらは異なるテストです。 合意は、生物学的結果の独立的複製ではありません。

1. **Settings → Connectors**では、**ジャンルとオノトロジー**と**蛋白質のアノテーション**をエージェントに有効化します。
2. **DNAダメージ遺伝子セット**というプロジェクトを作成し、新しいセッションを開きます。 この例では、Codex とセッション Notebook を使用します。
3. 選択する前に利用可能なEnrichrライブラリをリストします。 この比較では、固定された**GO_Biological_Process_2025**ライブラリを使用して保存された結果には、識別可能なアノテーションバージョンがあります。 新しいライブラリは異なる結果をもたらすことができます。
4. このプロンプトを送信して、実行完了後に生成されたメモを開きます。

```text
Compare Enrichr functional enrichment with STRING PPI enrichment for
TP53, ATM, ATR, CHEK1, CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
Use the built-in Genes & Ontologies and Protein Annotation connectors
through Session Notebook. List the current human Enrichr libraries;
use GO_Biological_Process_2025 with max_results 500 if available.
Run STRING PPI enrichment with species 9606 and required_score 700.
Save raw_connector_responses.json, enrichment_comparison_results.csv
and analysis_notes.md in English. Retain the query, source versions,
identifier mappings, reported background, n_total_results, n_results
and truncated flag, plus raw and adjusted P values where provided.
These genes were deliberately selected for known DNA-damage roles.
Do not infer unbiased discovery, causal regulation or expression direction.
Distinguish annotation enrichment from excess network interactions.
If STRING returns a P value of 0, preserve it as returned without claiming
an exact zero probability or inventing a numerical precision threshold.
```

### 入力を確認し、応答を完了します {/* #enrichr-inputs */}

**analysis_notes.md** を開き、**raw_connector_responses.json** で比較します。 9月9日 28 リストラン **228** ライブラリと返却 **305/305** 選択したライブラリの用語, と `truncated: false`. . . . デフォルト `max_results` は 100 です; 100-row 応答は不完全です。 応答フラグを確認し、必要に応じて、500まで、より大きな制限を要求します。

STRINGは、マップされていない識別子なしで、すべての**11**遺伝子をマッピングし、録画バージョン**12.0**、生物**9606**およびスコアのしきい値**700**をマッピングしました。 Enrichrは`mapping_status: not_reported_by_enrichr`を報告します; STRINGのマッピング結果をEnrichrレコードにコピーしないでください。 カスタムの背景は供給されません。 14,674のEnrichrのライブラリの遺伝子のカバレッジは、正確な統計的背景サイズではなくメタデータです。

![実際の入力、ライブラリバージョン、完全な結果カウントと識別子チェック](/img/open-science/v0333/enrichment-inputs.webp)

### 2つの結果を別に読んで下さい {/* #enrichr-comparison */}

ノートの結果をセクションを開き、CSV または完全なリストの JSON を使用します。 Enrichrの第1用語は、**イオン化放射線に対する細胞反応(GO:0071479)**で、調整されたPは**3.60 × 10⁻¹¹**です。 STRING は **11 ノード** 間で **44はエッジを観察しました** を、 対 **6予想エッジ** 戻しました。 その報告されたP値が`0`であった。 これはサービスの数値出力で、ゼロ確率の証明ではありません。

![Enrichr 用語と別々の STRING ネットワーク強化結果](/img/open-science/v0333/enrichment-results.webp)

CSVは**305 Enrichr行と6 STRINGサマリー行**を持っています。 後者はネットワーク統計であり、追加の強化された条件ではありません。 Enrichrは言葉の重複を行きます、STRINGは複数の証拠チャネルを結合します; STRINGエッジは、必ずしも直接物理的結合を意味しません。 意図的に選択した入力は、主にツールとそのレコードを実証します。

<ExampleDownload path="/examples/v0333/analysis_notes.md">比較ノート</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">完全な比較表</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">元のコネクターの応答</ExampleDownload>

変数参照: [Enrichrライブラリ](../reference/connector-operations.md#list_enrichr_libraries)、[Enrichr 強化](../reference/connector-operations.md#enrich_gene_set_enrichr)、[STRING PPI の強化](../reference/connector-operations.md#get_string_ppi_enrichment)。 セッションと証拠を一緒に保持するために、[.scienceパッケージをエクスポートする](../guides/research-packages.md#export-the-session)。
