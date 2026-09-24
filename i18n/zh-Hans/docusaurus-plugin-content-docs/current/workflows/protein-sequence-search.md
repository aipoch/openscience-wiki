---
title: "从基因名称获取蛋白序列并完成 BLAST 比对"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 从基因名称获取蛋白序列并完成 BLAST 比对

<p className="example-label"><strong>案例演示</strong> 查找经过审阅的人血红蛋白 α 亚基条目并获取序列</p>

从人 HBA1 基因名称出发，找到已审阅的 UniProt 蛋白及标准 FASTA 序列，提交 BLAST 检索并检查完成后的报告。本例使用已知蛋白，演示序列获取与比对方法。

开始前，按[科学数据库](../tools/databases.md#connect-database)启用所需 Connector，选择已连接的模型，并确保 [Notebook 运行环境](../guides/runtimes.md)可用。

## 1. 找到蛋白并获取 FASTA 序列 {/* #sequence-search */}

还不知道登录号时，**Genes & Ontologies** 可先发现 UniProt 条目。向 `search_uniprot_entries` 提供基因名、蛋白名称短语或物种。`organism_id` 匹配指定分类单元；`reviewed: true` 选择 Swiss-Prot，`false` 选择未审阅的 TrEMBL 条目，省略则包含两者。续查时使用 `next_cursor`，保持筛选条件和每页大小不变。

启用 **Genes & Ontologies**，打开已连接模型且 Notebook 运行环境可用的会话，发送：

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

使用 FASTA 前先打开 JSON。本次返回 **P69905 / HBA_HUMAN**，物种为 **Homo sapiens**，长度 **142 个氨基酸**，基因名称包含 **HBA1 和 HBA2**。响应标明 UniProt 版本 **2026_03**、`total_results: 1` 和 `has_more: false`。FASTA 标题行保留登录号和物种，序列包含 142 个残基。按基因名查询可能返回关联多个基因的蛋白条目，不能据此假定基因与条目一一对应。

![UniProt 查询条件与返回的已审阅人类蛋白条目](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">UniProt 查询与 FASTA 响应</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">标准 FASTA 序列</ExampleDownload>

## 2. 提交并跟踪 BLAST 任务 {/* #blast-jobs */}

需要检索相似序列时，启用 **Genomes**，使用其中的三个 BLAST 操作。序列会发送至公共 NCBI 服务，请使用公开或已获授权的输入。

1. 使用序列、`molecule_type` 和兼容数据库调用一次 `blast_submit`，保存返回的 `rid` 与轮询提示。对于上面的蛋白，`molecule_type: protein` 和 `database: swissprot` 表示进行蛋白检索。
2. 针对该 RID 调用 `blast_status`。同一 RID 的请求至少间隔 **60 秒**，所有 BLAST 请求至少间隔 **10 秒**；服务要求更长等待时，按更长间隔执行。`WAITING` 表示仍在排队或运行，应保留 RID 继续查询，不要重复提交。
3. 出现 `READY` 后，仍按同样的间隔调用 `blast_results`。可选格式为 `json2`、`xml2`、`text` 和 `tabular`。报告大小上限为 2 MiB，必要时减少命中数量。表格格式可能带注释，不能直接当作 CSV 表。
4. 从实际报告核对查询长度、实际数据库、命中登录号、比对范围、相同残基比例和 E-value。序列相似性本身不能证明功能；已知血红蛋白序列适合学习操作，不能当作发现未知蛋白的案例。

如果提交返回 `blast_submission_unknown`，表示无法确定是否已被接受，不要自动重复提交，应保留响应和已有 RID。提交回执或 `WAITING` 状态都不是完成后的比对结果。具体输入和返回条件见 [BLAST 参考](../reference/connector-operations.md#blast_submit)。

## 3. 打开并解读完成后的报告 {/* #blast-report */}

在上面的同一会话中继续蛋白序列案例。保留提交回执，后续请求才能接着查询同一个任务。发送：

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![BLAST 提交回执中显示 RID 和最短查询间隔](/img/open-science/v0320/blast-submitted.webp)

报告就绪后，打开 **hba1-blast-results.md**，把结果表与 **hba1-blast-raw.json** 对照。本例报告记录的程序为 **BLASTP 2.17.0+**，实际数据库为 **swissprot**，查询序列长 **142 个氨基酸**，返回 **5 个命中**：

| 登录号 | 相同残基数 / 比对长度 | 查询覆盖率 | E-value |
|---|---:|---:|---:|
| P69905 | 142/142 (100%) | 100% | 1.99033e-100 |
| P01923 | 140/141 (99.29%) | 99.30% | 1.06845e-98 |
| Q9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98 |
| P06635 | 139/142 (97.89%) | 100% | 3.57742e-98 |
| P01924 | 138/141 (97.87%) | 99.30% | 3.00466e-97 |

![已完成的 BLAST 报告展示五个真实命中、查询覆盖率和一致率的计算方法](/img/open-science/v0320/blast-results.webp)

这里按每个命中的第一个 HSP 计算：一致率是相同残基数除以比对长度；查询覆盖率是包含首尾位置的查询跨度除以 142。以 P01923 为例，查询位置为 2–142，因此覆盖率为 141/142 = 99.30%，一致率则为 140/141 = 99.29%。两者回答的问题不同，也都不是功能判断正确的概率。

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">完整结果报告</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">五个命中的结果表</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">NCBI JSON2 报告</ExampleDownload>

第一项 P69905 就是输入序列本身，100% 的一致率和覆盖率用于核对已知序列。其他命中展示序列相似性，不代表发现了新功能。保留原始报告和查询序列；数据库更新后，命中列表可能变化。

要比较三条或更多已知序列，继续[多序列比对与保守位点检查](multiple-sequence-alignment.md)。

## 用 HMMER 检查蛋白质结构域 {/* #hmmer-domain */}

<p className="example-label"><strong>案例演示</strong> 将人 P69905 与 Pfam 比对</p>

取得 P69905 规范蛋白质序列后，在 **Settings → Connectors** 中向 Main 开启 **HMMER**。在同一会话中发送：

```text
Use the HMMER Connector to scan the same human P69905 sequence against
Pfam with hmmscan. Keep the job ID, retrieve the completed domain
annotations, and save the raw result and a concise English interpretation
with coordinates and significance values. Preserve an unavailable
result as unavailable.
```

1. 核对提交回执中的任务 ID，使用同一个 ID 查询 **status**。
2. 完成后获取 **results** 并保存原始响应。解释命中前，先检查 `ready` 和结果状态。
3. 检查每个命中的家族编号、查询序列坐标、E-value 和纳入标记。返回一个片段不等于发现一个显著结构域。

![P69905 的 HMMER 完成报告，包含结构域坐标和显著性数值](/img/open-science/v0331/hmmer-result.webp)

本次结果为 **Globin · PF00042.28**：纳入的结构域位于查询序列 **27–137** 位（从 1 开始，包含两端），得分 **115.572 bits**，独立结构域 E-value 为 **2.2781 × 10⁻³³**。**10–20** 位的短片段未被纳入且不显著，不能算作第二个结构域。坐标对应提交的规范序列，不是成熟蛋白的编号。E-value 受搜索范围影响，不直接表示某个生物学解释正确的概率。

<ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_raw.json">HMMER 原始响应</ExampleDownload> · <ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_interpretation.md">结构域解释</ExampleDownload>

HMMER 的输入随程序变化。本例使用蛋白质序列与 **hmmscan**，其他程序见[操作参考](../reference/connector-operations.md#family-26)。**InterProScan** 则用于查询已有任务状态并获取 TSV 结果，不提供提交任务的操作。
