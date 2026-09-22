---
title: "對候選基因集進行功能富集分析"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 對候選基因集進行功能富集分析 {/* #对候选基因集进行功能富集分析 */}

<p className="example-label"><strong>案例演示</strong> 人工選定的人類 DNA 損傷相關基因集</p>

把明確的基因列表轉成生物過程與通路富集結果表，同時保留識別符號對映、統計背景和資料來源版本。

開始前，按[科學資料庫](../tools/databases.md#connect-database)啟用所需 Connector，選擇已連線的模型，並確保 [Notebook 執行環境](../guides/runtimes.md)可用。

本例在 v0.31.1 使用 11 個公開基因符號演示 g:Profiler。這些基因按已知生物學功能選定，出現富集符合預期；它們不是 GSE60450 專案的差異表達結果，也不能當作無偏發現的證據。

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
