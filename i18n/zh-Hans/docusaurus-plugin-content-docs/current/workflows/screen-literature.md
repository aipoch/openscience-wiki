---
title: 用智能集合筛选文献
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 用智能集合筛选文献

<p className="example-label"><strong>案例演示</strong> 为 CO₂ 电还原组会筛选单原子催化原始研究</p>

用纳入和排除标准，将候选文献整理成经过复核的阅读集。本例检索八篇论文，对标题和摘要进行智能筛选，复核判断，再导出五篇原始研究。这是有明确主题的组会选文，不是穷尽式系统综述，也不是全文质量评价。

## 1. 检索并接受候选文献 {/* #screening-inputs */}

创建 **Single-Atom Catalysis Screening** 项目，打开模型可用的会话。本次使用 **Codex subscription**。启用相应文献 Connector，按需配置[服务凭证](../guides/connectors.md)，发送：

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

打开 **Library → Inbox**，核对每条标题、DOI 和来源，只选择这八篇，点击 **Accept**，确认它们关联到本项目。收件箱中的其他记录应单独审核，不要为了清空收件箱一并接受。

保存的<ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">候选清单</ExampleDownload>记录五篇原始研究、三篇综述／Account，并说明在线发表年与期刊卷期年的差异。若要使用完全相同的输入，将清单里的八个 DOI 加入项目；重新按主题检索可能得到不同候选。

## 2. 绑定筛选模型 {/* #screening-model */}

打开 **Settings → Model → Classification models**，在 **Smart collections** 下选择已配置的分类服务及模型。点击服务卡片的 **Check model**，确认 **Check passed**。本例使用 **TypeSafe AI / Jev Latest**，主会话继续使用 Codex。

![为 Smart collections 单独绑定分类模型](/img/open-science/v0330/classification-smart.webp)

智能集合没有默认模型。**Automatic capability selection** 是另一项功能，不能代替此绑定。所有智能集合共用筛选绑定，详见[分类模型设置](../guides/models.md#smart-collection-model)。

## 3. 设置范围与规则 {/* #screening-rules */}

在文献库选择 **New collection**，填写 **CO2 Reduction - Primary Studies**，开启 **Smart collection**。将 **Scope** 设为 **Single-Atom Catalysis Screening**，只评估项目中的八篇文献。

| 字段 | 本例填写内容 |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

规则要求满足全部纳入条件，且不触发任何排除条件。本次只筛选标题和摘要，保持 **Use available full text**、**Update automatically** 关闭，再选择 **Create collection**。下图是通过 **Collection rule → Edit rule** 重新打开的已保存规则。

![已保存的筛选标准、项目范围和证据选项](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview** 可辅助调整草稿，但不会保存结果。**Use available full text** 会将可用的 PDF 文本发送给分类服务；长文档使用相关片段，PDF 不可用时回退到标题和摘要。应检查每条判断实际使用的证据，再决定能否把它视为全文评价。

## 4. 先执行小规模试筛 {/* #screening-trial */}

打开 **Collection actions → Trial run (up to 20 references)**，核对范围后选择 **Start trial run**。试运行会保存决定，并进入 **Screening process**。观察已处理数量、待处理候选和逐步出现的结果；**AI matches** 只表示本轮模型判断，人工决定仍决定最终集合成员。

需要中断时选择 **Pause**（提示为 **Pause analysis**），等界面显示 **Paused**，再用 **Resume analysis** 继续。规则、候选文献或保存进度变化后，原运行可能无法续跑，应核对当前规则再发起新一轮。选择 **Back to results** 返回纳入、待复核、排除和未评估视图；**Run details** 可查看本轮信息。

![同一组八篇候选的 Screening process 完成界面](/img/open-science/v0331/smart-completed.webp)

| 视图 | 处理方式 |
| --- | --- |
| Included | 阅读匹配文献并确认是否符合标准 |
| Needs review | 对照真实来源解决不确定或过期的判断 |
| Excluded | 检查排除理由是否符合规则 |
| Not evaluated | 先检查缺失证据或评估错误，再决定是否重试；它不表示排除 |

点击行内 **Evaluation details**，查看决定、匹配分数、证据和模型历史。分数描述规则匹配程度，不衡量研究质量或效应大小。

![实际的不确定判断、标题摘要证据及模型分数](/img/open-science/v0330/screening-review.webp)

## 5. 复核并确认阅读集 {/* #screening-review */}

打开论文标题，阅读摘要，必要时沿 DOI 或来源链接核对。逐项比较发表时间、研究类型、催化剂和反应是否符合规则，再选择 **Include** 或 **Exclude**。

本例首轮排除了两篇综述，将五篇原始研究列为 **Needs review**，另有一篇因可读证据不足未评估。复核后手动纳入五篇原始研究；检查来源确认最后一篇为综述后，手动排除。最终纳入的五篇均由人工确认。

![对照摘要与规则后，一篇原始研究显示 Manually included](/img/open-science/v0330/screening-manual-decision.webp)

| 复核记录 | 最终决定 | 依据 |
| --- | --- | --- |
| Ju，2017 · [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | 纳入 | 实验比较金属–氮–碳 CO₂ 电催化剂 |
| Zhang，2019 · [10.1002/anie.201906079](https://doi.org/10.1002/anie.201906079) | 纳入 | 制备 FeN₅ 位点并进行电化学测试 |
| Cai，2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | 纳入 | Cu 位点催化 CO₂ 制甲烷的实验研究 |
| Li，2022 · [10.1021/acs.nanolett.1c04382](https://doi.org/10.1021/acs.nanolett.1c04382) | 纳入 | 通过磷调节 Fe 单原子催化剂的实验研究 |
| Zhang，2021 · [10.1002/anie.202014718](https://doi.org/10.1002/anie.202014718) | 纳入 | 负载 Ag 位点的实验制备与 CO₂ 催化测试 |
| Su，2019 · [10.1021/acs.accounts.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | 排除 | Account，不符合原始研究规则 |
| Li，2020 · [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | 排除 | 综述，可单独保留作背景阅读 |
| Wang，2022 · [10.1002/smm2.1101](https://doi.org/10.1002/smm2.1101) | 排除 | 核对来源后人工确认为综述 |

集合更新会保留人工决定。**Use model decision** 撤销单条人工覆盖；集合菜单中的 **Reset manual decisions** 范围更大，使用前应核对。

## 6. 导出并使用入选论文 {/* #screening-export */}

确认 **Included 5**、**Excluded 3**，且 **Needs review**、**Not evaluated** 均为零。本例纳入行应显示 **Manually included**；重新运行时，模型首轮分数可能不同。

![五篇人工纳入论文与最终 5/3 分类结果](/img/open-science/v0330/screening-included.webp)

选择 **Collection actions → Export included references → BibTeX** 或 **RIS**，保存后检查文件包含五条 DOI 记录。<ExampleDownload path="/examples/v0330/screened-primary-studies.bib">示例 BibTeX</ExampleDownload>保留导出的引用信息，为便于再分发已移除摘要。它是书目文件，不包含筛选决定日志或 PDF 全文。交接时可同时保留<ExampleDownload path="/examples/v0330/screening-decisions.csv">复核决定表</ExampleDownload>。

将入选文献用于[组会资料包](journal-club.md)。提取详细结果或比较催化性能前，先取得并阅读全文。**Update automatically** 可评估所选范围内新增或变化的记录，并可能产生服务费用；它不会去外部数据库检索新论文。
