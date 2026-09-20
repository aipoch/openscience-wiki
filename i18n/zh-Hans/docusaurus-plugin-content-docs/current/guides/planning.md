---
title: "执行前规划"
last_update:
  date: '2026-09-20'
---

# 执行前规划

使用 **Plan first**，在执行前审核输入、方法、产物和验收标准。计划批准与工具权限是两项独立决定。截图输入见[示例数据](../reference/example-data.md)。

## 提交计划请求

<p className="example-label"><strong>案例演示</strong> 审核并修订原始计数质控计划</p>

1. 附加输入，在 Composer 写清目标、方法、产物和限制。
2. More send options → Plan first。必须有文字请求，仅附件草稿不能启用。
3. 如出现 Plan control 权限卡，检查后批准适当范围或拒绝。这是计划创建/决定记录权限，不是所有执行权限。
4. 等待 Plan ready for review；普通回复中的计划段落不等于结构化审批卡。

![Plan first 入口](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![单独的计划记录权限](/img/open-science/guides-walkthrough/22-plan-permission.webp)

本任务限定保留原始计数、区分 ID/长度、计算样本质控、交付三个受管产物、不声称差异表达。初始要求明确，计划才容易核验。

## 审核计划

Open 在对话旁打开阶段、步骤、执行者、预期输出和可行性说明。长计划可 Enter full screen，Download Plan 保存。置信度是计划评估，不代表代码已运行。

![分阶段计划和输出](/img/open-science/guides-walkthrough/23-plan-review.webp)

| 控件或状态 | 操作 |
| --- | --- |
| Open | 只打开，不批准 |
| Approve | 批准当前计划继续，仍可能需要工具审批 |
| Respond to Plan | 写明输入、方法、输出或验收条件的具体修改 |
| Send Plan feedback | 发送非空反馈，等待修订 |
| 审批预览中的 Dismiss | 拒绝/撤回该待审计划，与只关闭预览不同 |
| 新版本/已替换警告 | 当前快照已过期，不能批准新计划，需打开当前卡片 |

## 反馈与修订

在 **Respond to Plan** 中明确需要修改的内容。例如要求检查输入完整性、重新打开全部输出，并保留图表短标签到原始标识的映射。点击 **Send Plan feedback**，等待修订版，再逐项核对要求是否已纳入。

![提交前的计划反馈](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

审查修订版后点击其 Approve。旧预览可能仍显示，并提示已被替换；旧步骤不是当前计划最新进度。应重新打开当前计划。

## 跟踪执行并验收

排队追问见[输入框队列控件](composer.md#管理运行中队列)。编辑队列不会批准计划。

批准后会话开始执行计划。Ask 模式仍可能出现单独的工具权限卡；核对命令、目标和范围。操作失败时，先定位输入、环境或访问错误再重试，计划批准不会自动解决这些条件。

步骤可显示未开始、进行中、完成、阻塞、跳过、未运行。计划完成不等于科研结论正确。需打开实际 CSV、图和报告，与验收条件对照。数值检查方法见[数据质量工作流](../workflows/data-quality.md)。

后续见[文件与版本](./files.md)、[Notebook 证据](./notebook.md)、[权限](./approval-modes.md)。

源码：[计划审批和预览](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx)。

## 上下文重建后继续计划 {/* #resume-plan */}

从 v0.31.0 起，代理重建上下文后可以恢复当前 Session Plan、修订版本及待审批状态。继续前重新打开当前计划，检查哪些步骤实际完成。待审批的事项仍需审批；恢复计划不会自动批准，也不会把没有记录结果的操作变成已完成。
