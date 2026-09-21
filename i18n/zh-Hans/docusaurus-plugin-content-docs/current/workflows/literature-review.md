---
title: 提取文献证据表
last_update:
  date: '2026-09-17'
---

# 提取文献证据表

<p className="example-label"><strong>案例演示</strong> 口罩与呼吸道感染的十项试验</p>

本流程从明确的十篇论文出发，产出能追溯来源的证据表和不确定性说明，用于演示公共卫生文献综述中的证据提取。这里的论文集是教学选题，不代表完整检索或已经完成的系统综述。

## 准备范围明确的来源集

下载<a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>十篇论文来源清单</a>，其中包含社区、家庭和医疗场景试验的 DOI、PMCID 与原文链接。按来源说明的访问条件获取并阅读原文。

如需使用与本例相同的文本输入，下载<a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>来源准备脚本</a>，在本地工作文件夹中用 Python 3 运行：

```bash
python3 prepare-mask-sources.py
```

脚本下载指定的十份 Europe PMC XML，保留来源身份、章节标题和表格，生成 **mask-trials-fulltext.md**。某篇失败时会报告错误，不会悄悄跳过。Wiki 不重新分发这些论文全文；下载失败时，先通过来源链接取得该论文，再把来源集视为完整。

在 Open-Science 项目中选择可用模型，通过 **+ → Attach files** 添加生成的 Markdown 文件。核对来源清单确实包含十项不同研究。文本版便于提取；涉及排版、图片或含义不清的表格时，仍需回到原文。

点击附件打开预览。每篇研究以标题、DOI 和原始来源链接开头，后面保留正文分节和表格。将十篇身份与来源清单逐一对照；重复的章节标题不代表多了一项研究。

![实际附加的全文包保留论文身份和正文分节](/img/open-science/research-workflows/mask-trials-input.webp)

将论文用作证据前，先在来源检查更正或撤稿。自 v0.30.2 起，`literature-review` Skill 的 `verify_dois` 辅助方法会检查 Crossref 两个方向的更新关系。`retracted: true` 可能标记被撤稿论文，也可能标记撤稿通知，应打开关联记录区分；`false` 只表示未发现所检查的标记，不能证明论文从未撤稿。

## 要求每项试验占一行

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

允许预期的来源读取请求。确认代理读到了十项研究的相应章节，而不是只读第一篇摘要，也不要仅凭标题相似就认定两篇论文重复。

## 审阅提取结果

回答完成后打开 CSV，将十个 DOI 与来源清单对照，再逐篇核对结果章节或表格中的效应估计和分析人群。

![Open-Science 中的十项试验证据表](/img/open-science/research-workflows/mask-trials-evidence.webp)

重点保留以下区别：

- **随机分配单位：** 村庄、家庭、帐篷或病区不等于单个参与者随机分组。
- **结局指标：** 有症状血清阳性、实验室确诊感染和流感样疾病是不同结局。
- **分析方式：** 按依从性或早期干预筛选的亚组结果，不能替代主要随机比较。
- **不确定性：** 保留置信区间和不确定的结果；统计不显著不能改写成已经证明无效。

可下载<a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>示例证据表</a>和<a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>综合说明</a>查看格式。它们是供审阅的起点，科学解释仍取决于原始来源、研究质量和你要回答的问题。

除 CSV 外，也打开 **mask-trials-reading-notes.md**。本次最终表为 **10 rows · 12 columns**。可展开预览或下载文件阅读长单元格；单元格被截断不等于原文缺失。说明文件保留十篇研究身份，并解释为何不能自动合并不同结局与人群。

![保存后的阅读说明及已完成的十行结果](/img/open-science/research-workflows/mask-trials-notes.webp)

某行错误或不完整时，指出论文及具体章节/表格，要求同时修订**两份文件**，然后重新打开。例如 Cowling 2008 的随机分配家庭流程与实际分析子集应分别保留。回答文字更新不代表保存的表格也已更新。

## 继续形成综述

将审阅后的表格、来源和提取决策一起保存。正式综述还需要记录检索方法、纳入标准、筛选过程、独立重复提取以及适当的偏倚评估。来源核实可参考[核心阅读清单工作流](core-reading-list.md)；需要深入检查某个结论时，参考[论断核查](pdf-evidence.md)。
