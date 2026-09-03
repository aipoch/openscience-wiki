---
sidebar_position: 2
title: 对话与输入区
---

# 对话与输入区

工作区中部包含 Conversation log 和 Composer。消息发送后，agent 的文本、计划、工具调用、搜索、文件与 provenance 结果都会按时间进入同一条可审计时间线。

## Composer 输入

`Ask anything` 支持多行文本。输入为空且光标位于开头时，`↑`/`↓` 浏览历史提示词；`/` 触发 Skill 建议，`@` 引用项目文件/artifact，`⌘K`/`Ctrl+K` 搜索。发送中输入区会禁用或切换为停止控制，防止并发修改同一 active turn。

### 左侧 `+` 菜单

![添加菜单](/img/open-science/composer-add-menu.png)

- `Attach files`：从操作系统选择新文件并上传到项目。
- `Your files`：从本项目已有上传与生成文件中选择；支持搜索/筛选。
- `Review`：在存在可复核运行时请求 reviewer；不可用时显示禁用。
- `Context`：查看上下文窗口组成与趋势；没有 session 时禁用。

### Agent controls

![Agent controls](/img/open-science/composer-agent-controls.png)

该菜单集中配置权限模式、Auto-review 和 Specialist/Delegation 能力。选择只影响后续请求；运行中的请求仍按启动时策略完成。

![权限模式](/img/open-science/composer-permission-modes.png)

| 模式 | 行为 |
| --- | --- |
| `Ask` | 高风险工具执行前显示 Allow/Deny，是默认与推荐模式 |
| `Auto-approve edits` | 自动批准受管理工作区内的编辑，其余敏感操作仍询问 |
| `Full access` | 尽可能自动授权；只应在可恢复、隔离项目中短时使用 |

### 模型与推理强度

![模型选择器](/img/open-science/composer-model-picker.png)

模型按钮显示当前模型和推理强度。模型列表来自 Settings → Model；改变后用于后续请求。若模型与 agent framework 不兼容，界面会警告或阻止选择。

![推理强度](/img/open-science/composer-reasoning-effort.png)

可选 `Default`、`Low`、`Medium`、`High`、`XHigh`、`Max`；实际支持级别取决于 Provider，某些 framework 会近似不支持的级别。

### 发送按钮

主箭头立即发送；旁边 `More send options` 打开：

![发送选项](/img/open-science/composer-send-options.png)

- `Plan first`：要求 agent 先给出可审批计划，再进入执行。
- `Side chat`：在不改变主线的旁路会话中发送；没有可分支上下文时禁用。
- `Branch`：从当前消息/修订创建新分支；新会话或不支持的状态下禁用。

## 消息操作

![完成的对话](/img/open-science/conversation-completed.png)

用户消息提供 `Copy message`、`Edit message`。编辑并确认后生成修订，不直接抹除旧版本；`Previous/Next message revision` 与 `2/2` 指示器用于回看。

![编辑消息](/img/open-science/message-editing.png)
![消息修订](/img/open-science/message-revisions.png)

助手消息显示完成时间、Elapsed 和 `Usage`。Usage 有数据时展示 token/上下文使用；fixture 或 Provider 未返回 usage 时按钮会标记 unavailable。长对话底部的 `Scroll to end` 回到最新事件。

## 运行活动

时间线可展示工具名称、命令/代码、参数详情、diff、输出、Web search、计划进度、context compaction、handoff、subagent 与 elicitation。折叠行点击后展开；复制按钮复制代码或输出；错误行可进入 `Report error`。在执行结果不确定时，应先展开详情，再决定授权下一步。
