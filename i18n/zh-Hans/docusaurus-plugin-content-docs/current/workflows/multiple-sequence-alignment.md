---
title: 多序列比对与保守位点检查
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 多序列比对与保守位点检查

<p className="example-label"><strong>案例演示</strong> 比较人、小鼠和牛的血红蛋白 α 链</p>

获取三条经过审校的 UniProt 序列，通过远端 Clustal Omega 比对，检查哪些列在三个物种中为同一氨基酸。本例得到 142 列，其中 116 列完全保守。这是这组三物种的结果，不是功能注释或系统发育树。

连接配置见[科学数据库](../tools/databases.md#connect-database)。

## 1. 准备会话与序列来源 {/* #alignment-inputs */}

1. 创建 **Hemoglobin Sequence Alignment** 项目，打开新会话并连接模型。本例使用 **Codex subscription**。
2. 在 **Settings → Connectors** 为 Main 启用 **Genes & Ontologies** 和 **Genomes**。Clustal Omega 属于 Genomes，不是单独的 Connector。
3. 在 **Settings → Privacy → Share contact email with research data services** 配置 Clustal Omega 要求的有效联系邮箱，使用真实联系方式。序列会发送到 EMBL-EBI。
4. 发送下面的提示词，使用公开或已获授权的序列。

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

比对前先核对返回记录：

| 物种 | 已审校条目 | 分类编号 | 标准序列长度 |
| --- | --- | --- | --- |
| 人 · Homo sapiens | P69905 | 9606 | 142 aa |
| 小鼠 · Mus musculus | P01942 | 10090 | 142 aa |
| 牛 · Bos taurus | P01966 | 9913 | 142 aa |

FASTA 名称为 `human_P69905`、`mouse_P01942` 和 `bovine_P01966`，各名称必须唯一。人 P69905 同时关联 HBA1 和 HBA2，一个蛋白条目不一定对应唯一基因。每条序列都应保留 accession 与物种。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">三条输入序列</ExampleDownload>

## 2. 提交一次并跟踪任务 {/* #alignment-job */}

Agent 使用 **Genomes → clustalo_submit**，提交合并的 FASTA，并设置 `stype: protein`、`outfmt: clustal_num`。服务要求至少三条记录，最多 4000 条或 4 MiB。保存返回的 `job_id`、输出格式与提交回执。

1. 查看 Notebook 中的提交响应。得到任务 ID 和 **QUEUED** 表示已接受，不代表完成。
2. 对同一 ID 调用 `clustalo_status`，每次至少间隔十秒，并遵循服务返回的更长等待要求。排队较慢时不要另提一份。
3. 等 **FINISHED** 后，用相同 ID 和格式调用 `clustalo_results`。将返回内容保存为 `.aln`；得到建议文件名不代表文件已保存。
4. 会话停止后，保留任务 ID，稍后继续查询。提交响应不确定时，远端仍可能已接受，不要自动重提。**ERROR**、**FAILURE**、**NOT_FOUND** 需要排查，不能解释成空比对。

![Session Notebook 中的真实任务 ID、排队查询和完成状态](/img/open-science/v0331/clustal-submission.webp)

本例最初回执记录 **QUEUED**，后续 Notebook 结果返回 **FINISHED** 和 Clustal O(1.2.4) 比对。结果保存期由提供方控制，文档说明最长约一周，应及时保存。结果大小上限为 8 MiB，详见[操作参数](../reference/connector-operations.md#clustalo_submit)。

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">原始提交回执</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">原始比对</ExampleDownload>

## 3. 检查比对并统计保守列 {/* #alignment-results */}

打开生成的 **hemoglobin_alpha_conservation_report.md**，将 accession、序列长度与输入 FASTA、原始比对核对。移除每条比对序列中的空位后，剩余残基必须与对应输入完全一致，以排除序列替换或截断。

![英文报告中的来源标识、比对统计和解释限制](/img/open-science/v0331/clustal-report.webp)

本次结果：

| 检查项 | 结果 |
| --- | --- |
| 输入和比对序列 | 三条，每条 142 个残基 |
| 比对列数 | 142 |
| 含空位的列 | 0 |
| 三条序列具有相同残基 | 116 列 |
| 可变列 | 26 |
| 完全保守比例 | 116 / 142 = 81.7% |

Clustal 输出中，`*` 表示完全保守，`:` 和 `.` 表示性质相近的分组，不是残基相同。上述比例只统计相同且无空位的列。示例包括 D7、G16、H59、H88 和 R142。本例没有空位，因此比对列号与标准序列残基编号一致；存在空位时应逐条映射，也不要与成熟蛋白的编号混用。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">结果报告</ExampleDownload>

## 4. 根据证据解释结果 {/* #alignment-interpretation */}

这三个近缘哺乳动物中的保守性，可以支持有关约束的假设，不能单独证明残基功能。折叠、稳定性、共同祖先及选样都可能影响结果。更广的物种取样、结构背景和实验验证是后续工作。多序列比对不等同于 BLAST 检索，也不是系统发育树。

将输入 FASTA、原始比对、回执与报告一起保留。需要从一条未知序列开始时，参见[蛋白发现与 BLAST](protein-sequence-search.md)；基于模型的检索见 [HMMER 与 InterProScan 能力](../tools/databases.md#sequence-tools)。

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
