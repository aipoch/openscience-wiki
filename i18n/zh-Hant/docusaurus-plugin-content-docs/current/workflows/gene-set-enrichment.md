---
title: "對候選基因集進行功能富集分析"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 對候選基因集進行功能富集分析 {/* #对候选基因集进行功能富集分析 */}

<p className="example-label"><strong>案例演示</strong> 人工選定的人類 DNA 損傷相關基因集</p>

把明確的基因列表轉成生物過程與通路富集結果表，同時保留識別符號對映、統計背景和資料來源版本。

開始前，按[科學資料庫](../tools/databases.md#connect-database)啟用所需 Connector，選擇已連線的模型，並確保 [Notebook 執行環境](../guides/runtimes.md)可用。

前半部分演示 g:Profiler；後半部分在 v0.33.3 中用相同的 11 個公開基因符號[比較 Enrichr 與 STRING](#enrichr-string)。這些基因按已知生物學功能選定，出現富集符合預期；它們不是 GSE60450 專案的差異表達結果，也不能當作無偏發現的證據。

## 1. 確定基因列表和分析設定 {/* #gene-set-enrichment */}

1. 在 **Settings → Connectors** 中確認 **Genes & Ontologies** 對 Agent 可用，開啟已連線模型且 Notebook 執行環境可用的會話。
2. 指定物種、基因標識、資料來源和統計背景。真實實驗應根據哪些基因有機會被實驗篩選來確定背景；本例明確使用全部已註釋基因，沒有提交自定義的實測基因背景。
3. 傳送下方提示詞，在同一會話中查詢來源版本並執行富集，儲存實際結果。

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

## 2. 核對識別符號及資料來源版本 {/* #identifier-check */}

開啟生成的說明，核對查詢與對映數量。本次 **11/11** 個標識對映成功，未對映、歧義和重複標識均為 **0**。記錄的版本為 **GRCh38.p14**、g:Profiler **e114_eg62_p19_27110d83**、GO 類別 **2026-01-23**、Reactome 類別 **2026-03-20**。後續服務更新可能返回不同條目。

![儲存的英文查詢、背景、來源版本及標識核對](/img/open-science/v0311/enrichment-notes.webp)

## 3. 檢查富集結果表 {/* #enrichment-results */}

開啟 CSV 並與完整 JSON 比較。本次按 FDR 0.05 返回 **891 條**。預覽只顯示前 100 行，這個顯示上限不是結果總數。解釋條目時保留 `source`、`native`、已校正的 `p_value`、`intersection_size`、`query_size` 和 `effective_domain_size`。

![實際富集結果表及校正機率、背景大小](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">分析說明</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">全部 891 行結果</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">完整響應</ExampleDownload>

`background_size: null` 表示沒有提交自定義背景列表，不代表統計總體有零個基因；應檢查每個條目的有效背景大小。富集不能確定因果、差異表達或上調、下調方向。[操作引數](../reference/connector-operations.md#enrich_gene_set)

## 4. 比較 Enrichr 與 STRING 網路富集 {/* #enrichr-string */}

Enrichr 檢查提交的基因在哪些註釋集合中過度出現；STRING PPI 富集檢查這些蛋白之間的網路互作是否多於預期。這是兩個不同的檢驗，結果一致也不等於獨立重複驗證了某個生物學結論。

1. 在 **Settings → Connectors** 中啟用 **Genes & Ontologies** 和 **Protein Annotation**，供 Agent 使用。
2. 建立 **DNA Damage Gene Set** 專案並開啟新會話。本例使用 Codex 和 Session Notebook。
3. 先查詢可用的 Enrichr 庫。本次固定選擇 **GO_Biological_Process_2025**，讓儲存的結果有明確的註釋版本；改用較新的庫可能得到不同結果。
4. 傳送下方提示詞，執行完成後開啟生成的說明：

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

### 核對輸入與完整響應 {/* #enrichr-inputs */}

開啟 **analysis_notes.md**，與 **raw_connector_responses.json** 對照。9 月 28 日的執行列出 **228** 個庫，所選庫返回 **305/305** 個條目，`truncated: false`。`max_results` 預設為 100，返回 100 行不一定表示結果完整；應檢查響應中的數量和截斷標記，必要時提高上限，最大為 500。

STRING 成功對映全部 **11** 個基因，沒有未對映項，記錄的版本為 **12.0**、物種為 **9606**、分數閾值為 **700**。Enrichr 返回 `mapping_status: not_reported_by_enrichr`，不能把 STRING 的對映結果寫成 Enrichr 的結果。本次沒有提交自定義背景；Enrichr 庫的基因覆蓋數 14,674 是後設資料，不是服務報告的精確統計背景大小。

![實際輸入、庫版本、完整結果數量和識別符號核對](/img/open-science/v0333/enrichment-inputs.webp)

### 分別解釋兩種結果 {/* #enrichr-comparison */}

開啟說明中的結果部分，完整列表見 CSV 或原始 JSON。Enrichr 排名第一的條目為 **Cellular Response to Ionizing Radiation (GO:0071479)**，校正後 P 值約為 **3.60 × 10⁻¹¹**。STRING 在 **11 個節點**之間返回 **44 條實際互作**，背景預期為 **6 條**。其 P 值返回為 `0`，這是服務輸出的數值，不能解釋成機率嚴格為零。

![Enrichr 條目與單獨呈現的 STRING 網路富集結果](/img/open-science/v0333/enrichment-results.webp)

CSV 包含 **305 行 Enrichr 結果和 6 行 STRING 彙總**，後者是網路統計量，不是額外的富集條目。Enrichr 的 GO 條目存在重疊；STRING 綜合了多種證據，一條網路邊不一定代表直接物理結合。這組刻意選定的輸入主要用於演示工具及其結果記錄。

<ExampleDownload path="/examples/v0333/analysis_notes.md">比較說明</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">完整比較表</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">原始 Connector 響應</ExampleDownload>

引數說明：[Enrichr 庫列表](../reference/connector-operations.md#list_enrichr_libraries)、[Enrichr 富集](../reference/connector-operations.md#enrich_gene_set_enrichr)、[STRING PPI 富集](../reference/connector-operations.md#get_string_ppi_enrichment)。需要一起保留會話和證據時，可[匯出 .science 研究包](../guides/research-packages.md#export-the-session)。
