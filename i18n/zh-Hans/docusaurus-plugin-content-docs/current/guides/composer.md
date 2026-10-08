---
title: "对话与排队请求"
last_update:
  date: '2026-10-08'
---

# 对话与排队请求

Composer 向当前会话发送指令与输入引用，并允许在执行期间准备后续请求。**Queue · Not saved** 表示排队请求尚未成为已保存的对话指令。

## 准备可验收的请求

在目标项目中选择 **New**，于 **Ask anything** 输入请求，说明输入、希望得到的文件及方法约束。完整起步示例见[第一个项目](first-project.md)。

| 入口 | 操作 | 发送前检查 |
| --- | --- | --- |
| + → Attach files | 选本地文件并等待上传 | 目标附件存在且传输结束 |
| 附件 chip | 预览待发输入 | 名称与内容正确 |
| 移除附件 | 取消草稿引用 | 不删除本地原文件 |
| + → Your files | 选择已有项目文件 | 精确文件/版本，不只看类似名称 |
| `@` | 选文件、产物或文献 | 从建议中选择实际引用 |
| `/` | 选可用 Skill | 方法相关且前提具备 |
| `#` | 引用本次所需会话历史 | 不保证包含该会话全部文件和内核 |
| + → Save as skill | [把已完成分支整理为可复用 Skill](../skills/create.md) | 先结束当前活动；不可用时读具体提示，完成后核对实际保存的包 |
| + → Context | 查看上下文 | 新建未发送会话可能禁用 |
| + → Review | 在满足条件时请求审查 | 需已有结果和兼容审查能力 |

超过 10,000 字符或 300 行的长纯文本粘贴会转为托管附件；出现 **Show in text field** 时可恢复到输入框。空输入开头按上/下浏览历史，重新发送前检查附件。

## 选择开始方式

模型选择器使用已配置模型，推理档位取决于模型/框架。更改影响后续请求，不改变正在执行的轮次。**Agent controls** 中权限、Auto-review、Specialist、Delegation 各有独立作用。

| 发送控件 | 用途 | 结果/边界 |
| --- | --- | --- |
| Send message | 空闲会话中的完整请求 | 保存用户消息并开始 |
| More send options → Plan first | 执行前审阅步骤 | 回应计划后才继续批准工作 |
| Side chat | 在独立标签中讨论，工具受限 | 新草稿继承会话模型与推理强度，发送前检查旁聊中的选择，见 [Side Chat](delegation.md) |
| Branch | 支持时独立延续 | 核对继承历史与文件，见[会话](sessions.md) |
| Add message to queue | 运行中准备后续指令 | 送达前仍是 Not saved |
| Cancel run | 停止当前执行 | 等待停止，已保存结果不自动撤销 |

## 发送明确反馈

<p className="example-label"><strong>示例</strong> 要求计划补充输入与输出检查</p>

需要计划补充输入完整性与结果重开检查时，可以使用下面的反馈，并按自己的任务调整输出要求：

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

通过 **Respond to Plan → Send Plan feedback** 发送，再批准修改后的计划。这是计划反馈，不是队列送达演示。控件与截图见[计划](planning.md)。

运行中的任务可用队列修改下一步，明确变更与保留要求。发送修正不等于授权新安装或更大目录范围。

## 管理运行中队列

1. 运行时在 Ask anything 填追问。
2. 点击 **Add message to queue**，展开数量查看待发内容。
3. **Edit queued message** 恢复到 Composer；若已有草稿，按提示先保留/清空。
4. **Remove queued message** 移除待发项，不取消已送达指令。
5. 拖动手柄，或聚焦后用上下键调整顺序。
6. **Send now** 请求按框架支持的方式送达。
7. 确认它成为用户消息，Agent 已理解更改。

阅读 **Sending… / Stopping… / Queued message will send after the current run finishes**；部分框架状态会延后。**Not saved** 还不是持久对话记录，关闭/刷新前保留重要文字。分支提示表示队列属于另一消息路径。发送失败先处理原项目，不要重复加入副本。

### 在报告生成期间编辑和排序追问

修改多条排队消息时，先编辑目标请求，再调整顺序，最后删除不再需要的请求：

1. 点击目标条目旁的 **Edit queued message**，该条移入输入框，并暂时离开队列。
2. 修改文字后点击 **Add message to queue**，重新核对位置；编辑后的请求可能回到队尾。
3. 需要提前发送时，聚焦该条的 **Reorder queued message** 手柄，按 **Space**，用方向键移动，再按 **Space** 确认。
4. 对不再需要的提醒或指令，点击旁边的 **Remove queued message**。
5. 送达后核对已保存对话中的最终文字和顺序。被移除的请求不应作为已发送指令出现。

![编辑和排序后保留的两条请求](/img/open-science/local-todo-batch/14-queue-reordered.webp)

检查已送达请求的内容和顺序。标为 **Not saved** 的条目尚未进入已保存对话，关闭或重启前请复制重要的未发送文字。

**Exit queued editing** 结束队列编辑，文字仍留在输入框。开始编辑时原条目已经离开队列，退出不会自动放回。要保留请求，请检查草稿并重新入队；要放弃，则清空草稿。

### 编辑时保留附件

排队请求包含文件时，每次重新打开编辑器，都要确认附件标签仍在。修改指令后点击 **Add message to queue**。送达后，核对已保存用户消息中的文件是否为目标输入；需要确认准确文件身份时，可以要求计算文件校验值。

![编辑后的附件请求已送达，并返回文件校验值](/img/open-science/sept11-completion/queue-result.webp)

### 队列附件提示不可用

编辑后的队列消息若报 **Managed file or its Session is deleted.**，先检查附件标签与 Files 中的原文件。保留请求文字，在新普通消息里重新附加当前文件，再尝试执行。不要反复发送同一个失效附件引用。新附件也失败时，保留错误和文件身份，用于诊断反馈。

## 阅读活动和完成状态

展开工具卡片查看参数、代码和输出。完成后打开请求中指定的结果；如果某步失败，根据首条错误到[故障排查](troubleshooting.md)选择处理方法。

**Show more** 展开长请求，**Copy message** 和代码复制各自内容，**Scroll to end** 返回最新事件，桌面 run-marks 导航长对话中的请求。修改历史用户消息会创建修订，路径关系见[会话](sessions.md)。

| 故障 | 检查 |
| --- | --- |
| Send 禁用 | 文字为空、上传未完成、会话状态不可用 |
| 队列无法编辑 | 先保留/清空现有草稿 |
| 旧分析仍继续 | 核对已送达还是延后状态 |
| 计划批准后仍等待 | 可能另有工具权限 |
| 模型说完成但工具失败 | 检查首个故障和实际产物 |

## 复制、下载或放大回答表格

悬停或聚焦回答表格，显示 **Copy table**（Markdown、CSV、TSV）、**Download table**（CSV、Markdown）与 **View fullscreen**。选择所需格式，确认保存位置并重开文件，检查行与表头。这些操作导出现有回答，不会重新调用 Connector 或创建托管产物版本。

![回答元数据表的全屏视图](/img/open-science/guides-walkthrough/60-response-table.webp)

长时间运行的工作可通过[后台任务](notebook.md)打开或取消指定运行。队列中的追问是待送达指令，后台任务则是已接收执行的工作。收起任务列表不会停止执行。

源码：[队列控件](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx)、[送达逻辑](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts)。

## 拖入会话附件 {/* #conversation-drop */}

可把本地文件拖到整个会话区域，无需只对准输入框。等待附件标签出现、上传完成，核对文件名后再发送请求；拖入文件不会自动发送消息。导入 `.science` 研究包时，使用空白会话页的 **Import previous research**，详见[研究包](research-packages.md)。
