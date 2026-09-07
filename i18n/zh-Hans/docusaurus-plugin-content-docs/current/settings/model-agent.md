---
sidebar_position: 6
title: Model 与 Agent
---

# Model 与 Agent

## Model（模型）

![Model 面板](/img/open-science/settings-model-full.png)

| 区域 | 控件与行为 |
| --- | --- |
| Active model | 下拉选择新 session/后续请求使用的 Provider + model |
| Reasoning effort | Default、Low、Medium、High、XHigh、Max；只影响后续请求 |
| Subagent model | `Same as main model` 或独立模型；Delegation 开启时使用 |
| Subagent effort | 与主模型相同或独立设置；不支持时禁用 |
| Providers | 每项 `Test connection`、`Edit`、`Delete`；当前唯一/活动项可能不可删除 |
| `Add provider` | 打开 Provider 表单 |

Provider 表单包含 Provider type/name、Base URL/Endpoint、API format、API key、Model、Context window、Images、Reasoning support/levels/request format，以及 Provider 特有的 auth/区域选项。`Test connection` 验证配置；`Cancel`、`Save/Add` 完成。已保存 key 以圆点显示，编辑时不回显明文。

切换模型时应用会尽量保持相对 reasoning 强度。兼容性 alert 表示当前 agent framework 不能可靠承载所选模型/格式，应按建议改 Provider 或 Agent。

v0.26.0 新增内置 **Apodex** provider，提供 `apodex-1.1` 与 `apodex-1.1-mini`，并在 OpenAI/Anthropic 内置目录加入 GPT-6 Astra 与 Claude Fable 5.1。目录元数据描述 context 和 reasoning 控件，并不代表账号已有访问资格。配置所需 credential，执行 `Test connection`，并以已安装版本的 picker 为准。

## Agent（代理框架）

![Agent 面板](/img/open-science/settings-agent.png)

Agent Framework 卡展示 OpenCode、Claude Agent、Codex 等的安装状态、版本和 Active 状态。点击非活动且 Ready 的卡启动 Switch dialog：切换会开始新的后端 session，已有开放对话会把 transcript replay 给新后端。

主要操作：

- `Install`：选择安装来源后显示 progress/log；可取消或重试。
- `Repair <framework>`：重新检查并修复受管理 runtime。
- `Import`/Agent home：检查或导入外部 agent 配置；先预览影响。
- Sign in/auth：Claude/Codex 等按各自认证流程登录，token 不应写入对话。
- `Uninstall`：只能卸载非 Active runtime；确认对话框说明将删除的受管理组件。
- Framework card：切换 Active。

若安装中断，先查看 `Install log`，再 Retry/Repair；不要在安装进程运行时手工删除 runtime 目录。

## Scenario models 与 CodeBuddy

Model 面板把 main model 与 Subagent、Reviewer、Vision、Session details 策略放在一起。`Follow active model` 跟随主选择；pinned 策略必须指定兼容的 provider、model 与 reasoning effort。只有 active backend 不支持图片时，Vision 才 relay 图片证据。Session-details generation 使用受限的 no-tools call，也可禁用。

CodeBuddy 是与 Claude Code、OpenCode、Codex 并列的第四个 app-managed、无需单独登录的 framework，但仍需要兼容的已配置 model provider。切换 framework 不能迁移 in-flight tool state；应等待当前操作完成或明确停止。
