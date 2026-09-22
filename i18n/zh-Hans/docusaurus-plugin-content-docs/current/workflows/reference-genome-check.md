---
title: "分析前核对物种、参考基因组与染色体编号"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 分析前核对物种、参考基因组与染色体编号

<p className="example-label"><strong>案例演示</strong> 核对人类 GRCh38.p14 的 1 号染色体</p>

合并不同数据库的记录前，先确认物种、带版本的参考组装和染色体别名。最终保留一个染色体的身份核对表及原始响应。

开始前，按[科学数据库](../tools/databases.md#connect-database)启用所需 Connector，选择已连接的模型，并确保 [Notebook 运行环境](../guides/runtimes.md)可用。

## 1. 查询物种、组装与染色体 {/* #reference-genome */}

1. 在 **Settings → Connectors** 中启用 **Genomes**，打开已连接模型、Notebook 运行环境可用的会话。本例在 v0.31.1 使用 **Codex subscription**。
2. 按物种、**带版本号**的组装、序列的顺序查询，发送：

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

## 2. 对照返回的标识符 {/* #compare-identifiers */}

打开说明，对照三个 JSON 中返回的标识。本例三次调用均成功。

![三次实际 NCBI 调用及返回的物种、组装身份](/img/open-science/v0311/ncbi-notes.webp)

| 核对项 | 本例结果 |
| --- | --- |
| 物种 | Homo sapiens，TaxID **9606**；一个匹配，`ambiguous: false` |
| 请求与当前组装 | **GCF_000001405.40**，**GRCh38.p14**，UCSC 名称 **hg38** |
| 配对的 GenBank 组装 | **GCA_000001405.29**；返回记录说明其与 RefSeq 存在差异 |
| 1 号染色体别名 | **1**、**chr1**、RefSeq **NC_000001.11**、GenBank **CM000663.2** |
| 选定序列 | **248956422 bp**，Primary Assembly；一个匹配，`matches_truncated: false` |

![1 号染色体原始响应中的带版本别名与匹配数量](/img/open-science/v0311/ncbi-aliases.webp)

## 3. 保存身份核对表和来源记录 {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">查询说明</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">身份对照表</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">物种响应</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">组装响应</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">序列响应</ExampleDownload>

这里完成的是**一条选定染色体**的查询，不是全部组装序列的导出。更换查询时，仍需保留歧义匹配和截断标记。组装名称不能替代带版本号的登录号；响应中出现当前登录号，也不能据此默默替换历史版本。序列别名描述同一组装内的命名关系，不会执行跨组装坐标转换。[准确输入](../reference/connector-operations.md#ncbi_get_assembly_info)
