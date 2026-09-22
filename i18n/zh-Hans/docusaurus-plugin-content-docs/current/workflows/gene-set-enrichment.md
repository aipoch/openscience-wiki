---
title: "对候选基因集进行功能富集分析"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 对候选基因集进行功能富集分析

<p className="example-label"><strong>案例演示</strong> 人工选定的人类 DNA 损伤相关基因集</p>

把明确的基因列表转成生物过程与通路富集结果表，同时保留标识符映射、统计背景和数据源版本。

开始前，按[科学数据库](../tools/databases.md#connect-database)启用所需 Connector，选择已连接的模型，并确保 [Notebook 运行环境](../guides/runtimes.md)可用。

本例在 v0.31.1 使用 11 个公开基因符号演示 g:Profiler。这些基因按已知生物学功能选定，出现富集符合预期；它们不是 GSE60450 项目的差异表达结果，也不能当作无偏发现的证据。

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
