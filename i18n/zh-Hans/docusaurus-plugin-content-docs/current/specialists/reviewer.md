---
title: "Reviewer 与自动复核"
last_update:
  date: '2026-09-17'
---

# Reviewer 与自动复核

内置 Reviewer 根据请求及可获得的证据检查已完成回复。它不同于名称带 Reviewer 的自建 Specialist，也不同于操作授权。

需要通过重新执行比较输出时，使用[复现检查](../guides/reproducibility.md)。Reviewer 审核与输出复现是两种独立记录。

## 会话复核与文件版本复核

对话复核和文件溯源面板的 **Review** 标签是不同记录。分享前检查准确版本；若显示 **No review for this version**，即使其他回复被复核，也必须保留该状态。环境记录 **partial**、证据 **bounded** 也不会因为模型表示有信心就变成完整。

输入错误应通过应用提供当前可访问附件或准确版本。本地文件存在不代表所有子任务和 Reviewer 内核都能读取。参见 [Notebook](../guides/notebook.md)、[委派](./delegate.md)和[排错](../guides/troubleshooting.md)。

实现依据: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [ComposerAgentControlsMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx)。

重新打开历史审查时，核对选中的产物版本。取消审查或修正后，阅读最终状态与已保留发现，再决定是否重新运行；取消不会产生审查通过记录。

## 选择能够核对的结果

首次审查可以使用[内联表格检查](delegate.md#实操十二个样本约束)：提供完整样本 QC 表，要求逐样本给出算术结果。判据明确为十二个唯一样本标识、十二行结果，以及每行的零计数基因数加检出基因数等于基因总数。

先自行打开子任务结果与 Notebook 输出，再对该回答发起审查。将审查条目与上述判据对照；如果缺少某行或执行结果，先处理该问题再使用结论。审查结果取决于回答及可用证据，本练习不保证得到零问题状态。

## 请求复核

1. 使用可用模型完成一轮对话。
2. 打开输入框 **+ 菜单 → Request review**，运行时显示 **Reviewing…**。
3. 打开 **Reviewer** 卡片，查看问题和检查数量，展开每项说明。
4. 点击 **Go to transcript** 进入 **Session Reviewer**，检查模型、时间、PASS/FAIL、证据引用与 **Reviewer log**。
5. 若请求纠正，检查 Main Agent 后续及子任务授权；复核不会自动授予操作权限。
6. 处理问题后使用 **Re-run review**。必要输入或操作仍不可用时，保留未解决结论。

<p className="example-label"><strong>案例演示</strong> 阅读仍有未解决问题的审查结果</p>

<details>
<summary>查看检查结果与未解决问题</summary>

Codex 订阅、gpt-5.6-sol 下，人工复核返回 **四项检查、一项问题**：

| 检查 | 实际结果 |
| --- | --- |
| Specialist 是否执行内联 CSV 复核 | PASS，引用了交接和算术记录 |
| 自定义 MCP 成功与失败是否准确报告 | PASS，指标和连接错误与执行输出一致 |
| 分子调用是否产生所述文件和属性 | PASS，识别了准确文件版本及返回值 |
| 模型是否按要求检查已保存的结构预览 | FAIL，目录查询没有读取结构内容 |

图中的 **fix limit reached / Issues found** 表示结构检查所需的托管输入无法被模型读取。打开对应问题，确认并提供缺少的输入，再请求复核。在查看器中手动打开结构，不会更新模型的检查记录。

</details>

## 自动复核控制

在 **Agent controls → Auto-review** 设置后续回复自动复核。这是会话偏好，与 **Ask for approval**、**Delegation** 分开。Settings 中内置 Reviewer 没有普通编辑、删除、启用控件，也不在正常 Specialist 选择器中。

| 状态或控件 | 含义 |
| --- | --- |
| Request review 不可用 | 检查当前是否仍运行、是否有可复核的完成回复、模型是否可用 |
| Reviewing… | 尚在复核，不能当成完成 |
| Reviewer · n findings · n checks | 打开检查与证据；零问题也仅覆盖实际检查范围 |
| Corrections requested | Main Agent 可能进行纠正；需查看新操作与结果 |
| Issues found / fix limit reached | 尚有未解决问题，阅读最新说明后再决定下一步 |
| Go to transcript | 进入专用 Session Reviewer 页面 |
| Expand / Collapse Reviewer log | 展开或收起操作日志；截断日志不是完整证据 |
| Re-run review | 再次请求复核，不是接受全部结论 |

<span id="本地实际检查" />

### 使用独立模型自动复核

1. 在 **Settings → Model → Reviewer** 选择可用的固定模型。例如，Main 为 `gpt-5.6-sol`，Reviewer 为 `gpt-5.6-luna`。
2. 在目标会话打开 **Agent controls → Auto-review**，确认显示 **On**，再提交下一条请求。
3. 回复完成后，展开自动出现的 **Reviewer** 卡片。核对模型、检查内容、证据及结果。
4. 出现 **Corrections requested** 时，等待主任务的纠正操作和后续复核，再判断问题是否解决。

从 v0.30.2 起，启动会话时会保留 Auto-review 设置，关联的纠错轮次也会保留纠错所需的审阅反馈。发送前启用它，再检查实际的 Reviewer 卡片与 Main 修改后的输出。保留上下文不等于问题已经修正，仍需阅读后续审阅和剩余发现。

### resolved 说明了什么

某项检查可以因为“按要求尝试了操作，并准确报告权限失败”而被标为 resolved。应将检查判据、工具结果和剩余问题一起阅读。

最终 **No issues found · 1 check / Disposition: resolved** 表示这一项“是否尝试后续检查并如实报告结果”的问题已解决。它不表示文件可读、样本计算通过或科研结论正确。必须阅读具体检查内容，不能只看绿色状态。
