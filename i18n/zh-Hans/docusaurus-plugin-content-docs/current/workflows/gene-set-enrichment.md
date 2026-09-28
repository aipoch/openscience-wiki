---
title: "对候选基因集进行功能富集分析"
toc_max_heading_level: 2
last_update:
  date: '2026-09-28'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 对候选基因集进行功能富集分析

<p className="example-label"><strong>案例演示</strong> 人工选定的人类 DNA 损伤相关基因集</p>

把明确的基因列表转成生物过程与通路富集结果表，同时保留标识符映射、统计背景和数据源版本。

开始前，按[科学数据库](../tools/databases.md#connect-database)启用所需 Connector，选择已连接的模型，并确保 [Notebook 运行环境](../guides/runtimes.md)可用。

前半部分演示 g:Profiler；后半部分在 v0.33.3 中用相同的 11 个公开基因符号[比较 Enrichr 与 STRING](#enrichr-string)。这些基因按已知生物学功能选定，出现富集符合预期；它们不是 GSE60450 项目的差异表达结果，也不能当作无偏发现的证据。

## 1. 确定基因列表和分析设置 {/* #gene-set-enrichment */}

1. 在 **Settings → Connectors** 中确认 **Genes & Ontologies** 对 Agent 可用，打开已连接模型且 Notebook 运行环境可用的会话。
2. 指定物种、基因标识、数据来源和统计背景。真实实验应根据哪些基因有机会被实验筛选来确定背景；本例明确使用全部已注释基因，没有提交自定义的实测基因背景。
3. 发送下方提示词，在同一会话中查询来源版本并执行富集，保存实际结果。

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

## 2. 核对标识符及数据源版本 {/* #identifier-check */}

打开生成的说明，核对查询与映射数量。本次 **11/11** 个标识映射成功，未映射、歧义和重复标识均为 **0**。记录的版本为 **GRCh38.p14**、g:Profiler **e114_eg62_p19_27110d83**、GO 类别 **2026-01-23**、Reactome 类别 **2026-03-20**。后续服务更新可能返回不同条目。

![保存的英文查询、背景、来源版本及标识核对](/img/open-science/v0311/enrichment-notes.webp)

## 3. 检查富集结果表 {/* #enrichment-results */}

打开 CSV 并与完整 JSON 比较。本次按 FDR 0.05 返回 **891 条**。预览只显示前 100 行，这个显示上限不是结果总数。解释条目时保留 `source`、`native`、已校正的 `p_value`、`intersection_size`、`query_size` 和 `effective_domain_size`。

![实际富集结果表及校正概率、背景大小](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">分析说明</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">全部 891 行结果</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">完整响应</ExampleDownload>

`background_size: null` 表示没有提交自定义背景列表，不代表统计总体有零个基因；应检查每个条目的有效背景大小。富集不能确定因果、差异表达或上调、下调方向。[操作参数](../reference/connector-operations.md#enrich_gene_set)

## 4. 比较 Enrichr 与 STRING 网络富集 {/* #enrichr-string */}

Enrichr 检查提交的基因在哪些注释集合中过度出现；STRING PPI 富集检查这些蛋白之间的网络互作是否多于预期。这是两个不同的检验，结果一致也不等于独立重复验证了某个生物学结论。

1. 在 **Settings → Connectors** 中启用 **Genes & Ontologies** 和 **Protein Annotation**，供 Agent 使用。
2. 创建 **DNA Damage Gene Set** 项目并打开新会话。本例使用 Codex 和 Session Notebook。
3. 先查询可用的 Enrichr 库。本次固定选择 **GO_Biological_Process_2025**，让保存的结果有明确的注释版本；改用较新的库可能得到不同结果。
4. 发送下方提示词，运行完成后打开生成的说明：

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

### 核对输入与完整响应 {/* #enrichr-inputs */}

打开 **analysis_notes.md**，与 **raw_connector_responses.json** 对照。9 月 28 日的运行列出 **228** 个库，所选库返回 **305/305** 个条目，`truncated: false`。`max_results` 默认为 100，返回 100 行不一定表示结果完整；应检查响应中的数量和截断标记，必要时提高上限，最大为 500。

STRING 成功映射全部 **11** 个基因，没有未映射项，记录的版本为 **12.0**、物种为 **9606**、分数阈值为 **700**。Enrichr 返回 `mapping_status: not_reported_by_enrichr`，不能把 STRING 的映射结果写成 Enrichr 的结果。本次没有提交自定义背景；Enrichr 库的基因覆盖数 14,674 是元数据，不是服务报告的精确统计背景大小。

![实际输入、库版本、完整结果数量和标识符核对](/img/open-science/v0333/enrichment-inputs.webp)

### 分别解释两种结果 {/* #enrichr-comparison */}

打开说明中的结果部分，完整列表见 CSV 或原始 JSON。Enrichr 排名第一的条目为 **Cellular Response to Ionizing Radiation (GO:0071479)**，校正后 P 值约为 **3.60 × 10⁻¹¹**。STRING 在 **11 个节点**之间返回 **44 条实际互作**，背景预期为 **6 条**。其 P 值返回为 `0`，这是服务输出的数值，不能解释成概率严格为零。

![Enrichr 条目与单独呈现的 STRING 网络富集结果](/img/open-science/v0333/enrichment-results.webp)

CSV 包含 **305 行 Enrichr 结果和 6 行 STRING 汇总**，后者是网络统计量，不是额外的富集条目。Enrichr 的 GO 条目存在重叠；STRING 综合了多种证据，一条网络边不一定代表直接物理结合。这组刻意选定的输入主要用于演示工具及其结果记录。

<ExampleDownload path="/examples/v0333/analysis_notes.md">比较说明</ExampleDownload> · <ExampleDownload path="/examples/v0333/enrichment_comparison_results.csv">完整比较表</ExampleDownload> · <ExampleDownload path="/examples/v0333/raw_connector_responses.json">原始 Connector 响应</ExampleDownload>

参数说明：[Enrichr 库列表](../reference/connector-operations.md#list_enrichr_libraries)、[Enrichr 富集](../reference/connector-operations.md#enrich_gene_set_enrichr)、[STRING PPI 富集](../reference/connector-operations.md#get_string_ppi_enrichment)。需要一起保留会话和证据时，可[导出 .science 研究包](../guides/research-packages.md#export-the-session)。
