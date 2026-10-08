---
title: "回放与讨论历史会话"
last_update:
  date: '2026-10-08'
---

# 回放与讨论历史会话

会话回放按顺序展示已保存的消息、工具步骤和文件版本，方便理解分析过程、定位证据并提出具体问题。播放不会重新执行代码，也不证明分析可以复现；重新执行与结果比较见[可复现性验证](reproducibility.md)。

## 打开回放 {/* #open-replay */}

1. 打开侧栏中该会话的操作菜单，选择 **View replay**。导入的 `.science` 会话也可从 **Imported research history** 面板选择 **View replay**。
2. 核对会话标题和分支。出现 **Replay branch** 时，选择要检查的分支。
3. 使用 **Enter full screen** 放大；**Exit full screen** 返回工作区。关闭预览不会删除会话。

导入的研究仍然只读，可以查看和讨论。需要继续执行时，选择 **Fork to continue** 建立可写分支。研究包导入步骤见[导入并检查研究包](research-packages.md#import-and-inspect-a-package)。

## 按步骤查看记录 {/* #playback-controls */}

| 控件 | 操作 |
| --- | --- |
| Play replay / Pause replay | 播放或暂停已保存的步骤序列 |
| Previous step / Next step | 移动到相邻的记录步骤 |
| Replay progress | 跳转到回放中的其他位置 |
| Playback speed | 改变展示速度，不会加速计算 |
| Browse steps | 按标签选择消息、工具步骤或文件版本事件 |
| Notebook / View files | 查看该位置可用的 Notebook 记录或文件列表 |
| Watch again | 播放到 Completed 后从头查看 |

展开工具卡片读取保留的输入和输出，使用结果前核对文件名及版本。再次进入同一回放时会保留播放位置。旧会话可能使用归档记录重建时间线，展示时长不能作为原始计算耗时的基准。

<p className="example-label"><strong>案例演示</strong> 讨论 TP53 通路分析中的证据</p>

本例打开已记录的 [Pathway Commons 分析](../workflows/inspect-pathway.md)，其中选取 Reactome 的 **Transcriptional Regulation by TP53** 通路，导出 3,318 条相互作用记录和 387 个节点。这是该次保存结果的数量，不代表之后每次查询都会得到相同数量。

打开 **Browse steps**，定位网络导出、原始响应、研究笔记和 TP53–MDM2–CDKN1A 小型相互作用表。本例共有 12 个记录步骤。选择相互作用表的文件版本步骤，并阅读前面的网络范围说明。

![TP53 实际回放中的步骤列表、文件版本与播放控件](/img/open-science/v0350/replay-step-list.webp)

## 针对步骤提问 {/* #discuss-replay */}

1. 暂停在相关步骤，选择 **Ask about this step**；需要讨论整体研究时，使用顶部的 **Ask about this research**。
2. 在 **Ask in a conversation** 中选择一个可写会话，或选择 **New conversation**。该操作把上下文加入草稿，不会自动发送问题。
3. 核对 **Discuss** 附件中的会话和步骤标签，填写问题，选择已连接的模型，再点 **Send**。本例使用 **Codex subscription**。
4. 遇到工具审批时，先检查申请的访问内容，再允许任务需要的操作。回答完成后，对照保存的证据及来源上下文。

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

回答定位到 `tp53_mdm2_cdkn1a_readable_interactions.tsv`，区分扁平化导出表中的记录与生物学结论，并指出来源会话、分支和步骤。采用解释前再次阅读来源；附带记录不代表模型的每项判断都正确。

![Codex 完成讨论，右侧保留 TP53 原始分析回放](/img/open-science/v0350/replay-answer.webp)

## 证据无法打开时 {/* #replay-evidence */}

原执行环境不可用时，记录中的工具调用仍可能显示。可以阅读保留的代码与输出，不要把环境提示当成一次新的运行结果。

文件显示 **Preview unavailable** 或 **The recorded evidence is unavailable** 时，检查原会话中的文件卡片及所选版本。原入口也无法打开时，使用另行保存的原文件，或向作者取得完整研究包。文件名和播放完成的时间线不能证明文件内容可读取，只讨论能够实际检查的证据。

需要重新计算时，[Fork 会话](sessions.md#fork-session)，准备所需文件与环境后运行。比较新运行和已保存产物时，应使用[可复现性验证](reproducibility.md)，不能依据回放中的 **Completed** 判断。
