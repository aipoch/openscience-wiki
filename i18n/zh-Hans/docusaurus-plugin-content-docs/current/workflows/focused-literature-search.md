---
title: 限定期刊与时间范围检索文献
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 限定期刊与时间范围检索文献

<p className="example-label"><strong>案例演示</strong> 检索两种期刊在 2019–2025 年发表的正念干预试验</p>

精准检索需要明确范围，并记录每一条候选文献的筛选依据。本例通过 PubMed 检索 **JAMA Psychiatry** 和 **Behaviour Research and Therapy** 中与正念相关的论文，再区分随机试验报告和其他文章，产出完整筛选表与检索说明，不提供治疗建议，也不构成系统综述。

## 1. 确定问题与纳入规则

打开项目并选择已连接的模型。在 **Settings → Connectors** 中确认 **PubMed** 可用；如提示需要联系信息，在该设置中填写。开始本例前不需要下载论文。

日期范围使用**发表日期 2019-01-01 至 2025-12-31**，不是数据库收录日期。纳入设有明确正念干预组、报告参与者结果的原始随机研究。对混合干预、原始或二次发表身份不清、日期冲突的记录，单列为 **uncertain**。研究机制性结局本身不代表论文是二次分析。

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![Open-Science 中实际发送的精准检索请求](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. 核对检索式与覆盖范围

本次提交的主题与期刊检索式如下，另行传入发表日期过滤条件：

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

打开 **Notebook** 或展开 PubMed 活动，确认期刊字段、起止日期和返回数量。2026 年 9 月 16 日的检索返回 **62 条记录**，实际取回 62 条，`has_more = false`。PubMed 更新索引后，数量可能变化。如果结果被截断，应先取回剩余分页，再声称已筛完全部命中记录。

这个较宽的主题检索会保留非试验论文，是否满足试验要求由后续筛选决定。文献类型索引可能不完整；摘要提到既往随机试验，也不代表该文章报告了一项新试验。

## 3. 检查并修正筛选表

回答完成后，在 **Generated** 中打开 **mindfulness-search-audit.csv**。表中应保留全部检索到的 PMID，包括排除和待确认记录。通过 PubMed 链接核对标题、期刊、DOI 和日期，再把筛选结论与摘要逐项对照。

![保留待确认和排除记录的候选文献表](/img/open-science/workflow-extensions/focused-search-table.webp)

逐条对照摘要检查排除理由。PMID **38837133** 是更广义心理治疗的原始随机试验，示例表将其是否符合正念干预范围标为 **uncertain**；PMID **34009273** 是荟萃分析，因此排除。需要纠正决定时，点明记录和具体问题，要求 Agent 修改 CSV，再重新打开保存的文件。

本例复核后的表格有 **20 条纳入、37 条排除、5 条待确认**，合计 **62 条**。这些是依据摘要作出的筛选判断，不代表已经完整评估了 20 项独立试验。同一试验也可能有多篇报告。
![Notebook 中的实际筛选修订和保存文件检查](/img/open-science/workflow-extensions/focused-search-notebook.webp)


## 4. 保留未解决的疑点

PMID **41418645** 被 PubMed 的 2019–2025 年发表日期条件检出，但返回元数据中的印刷日期为 **2026-01**。应保留这一差异，检查发表历史后再决定是否符合日期要求，不能悄悄修改年份以满足检索范围。

打开 **mindfulness-search-notes.md**，检查其中的计数、筛选规则和限制是否与 CSV 一致。同时保留原始元数据快照，便于追溯每项决定的来源。

![修订后的检索说明及 20/37/5 筛选数量](/img/open-science/workflow-extensions/focused-search-notes.webp)

下载<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">复核后的候选表</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">检索说明</ExampleDownload>。Wiki 不重新分发完整摘要，可通过来源链接查看。

开展正式证据综述前，还需解决待确认记录、取得全文、关联同一试验的不同报告，并安排适当的独立筛选。需要建立文献集合时，继续阅读[核心阅读文献库](core-reading-list.md)；来源范围和访问条件明确后，再进行[证据提取](literature-review.md)。
