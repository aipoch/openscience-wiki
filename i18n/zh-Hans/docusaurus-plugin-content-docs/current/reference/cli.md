---
title: "CLI 与结构化输出"
last_update:
  date: '2026-09-22'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI 与结构化输出

使用 `open-science` 查看应用状态、运行任务、管理 Connector 与凭据，以及操作本地服务。先安装命令入口，再确认它连接的是预期本地实例。

<PlatformGuide />

## 从终端完成首次设置 {/* #terminal-setup */}

先安装桌面应用，并让 `open-science` 命令可用。CLI 使用应用后端，不是独立的 npm 服务。Debian 安装包包含该命令；缺少命令入口时，按平台说明准备启动器，或使用已安装的 CLI 入口，再执行 `open-science cli install`。

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` 只创建配置目录，不启动应用。`--profile` 是 `--config-root` 的别名，用于支持该覆盖选项的开发配置；打包应用启动时拒绝这些覆盖参数。整个流程应使用同一目标配置。`runtime list` 显示检测到的框架就绪状态、版本和应用管理/外部来源，不暴露可执行文件路径。

尚未配置 Codex 时：

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

按提示完成登录。此流程准备或修复应用管理的 Codex 运行时，并通过应用登记订阅，不会导入外部 Codex 登录文件。首次设置目前针对 Codex，即使运行时列表还显示其他框架。已有配置发生冲突时会报错，不会直接覆盖。

改用 OpenAI API key 时，使用 `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`，填入受支持的模型 ID，并通过已有密钥管理方式提供环境变量。配置 OpenAlex 时使用 `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`。这两条命令前均加 `open-science`。不要把密钥本身放进命令参数。凭据检查成功不代表科研查询已完成，也不保证仍有配额。

查看 `doctor` 的 **ready**、逐项 **checks** 和建议的 **next** 操作。命令成功退出时 `ready` 仍可能为 false；后端未启动时会明确报告并以 3 退出。完成提示中的前置条件，再次检查，然后在目标项目中[运行任务](#运行输入与控制参数)。

## 入口

| 入口 | 条件 | 命令 |
| --- | --- | --- |
| 应用安装的启动器 | **Settings → General → Command line tool → Install command** | `open-science --help` |
| 源码仓库 | 已构建应用并准备仓库依赖 | `node packages/open-science/cli.mjs --help` |
| npm 客户端 | Node.js 22.5+ 和已安装应用；安装前确认包可用 | 包名 `@aipoch/open-science` |

应用启动器使用随应用附带的运行时。目录不在 PATH 时，按 General 页面显示的指令配置并打开新终端。不要为了展示名称而修改命令名。

<PlatformContent platform="windows">

点击 **Install command** 后，新开一个 PowerShell 窗口，运行：

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

检查 **Source** 是否指向 General 显示的启动器，通常是用户目录下的 `open-science.cmd`。帮助输出成功说明启动器可以运行。如果状态返回 `{"running":false}`，表示 CLI 没有报告运行中的后端，不代表桌面窗口已经关闭。提交任务或下载文件前，按[服务端模式](server.md)检查预期实例。

</PlatformContent>

## 完成一个小型命令行任务

<p className="example-label"><strong>示例</strong> 通过命令行保存说明文件</p>

1. 按上方入口安装命令。保持桌面应用运行，并确认模型可用。
2. 运行 `open-science status --json`，再运行 `open-science project list --json`。确认目标实例并复制返回的项目 ID。
3. 创建 `task.md`，内容为：**保存 project-note.md，写一段简短的连接检查说明。不要读取其他文件或访问网络。**
4. 按下方“运行输入与控制参数”的命令依次操作；每次先取得返回 ID，再替换下一条命令的占位符。
5. 若任务等待权限，在桌面会话中回应。`--wait` 超时时任务可能仍在继续，重新提交前先用 `run status RUN_ID --json` 检查。
6. 选择返回的 Markdown 产物 ID，下载到一个新的本地文件名并打开。若任务完成但没有指定文件，应在同一会话继续请求保存。产物已存在但下载失败时，按[产物下载恢复步骤](./api.md#任务已完成但文件下载失败)处理。

Plan first 任务可使用 `--return-on-attention`，阅读返回计划，再通过应用或下方计划命令回应。JSON 集成应区分 running、completed、failed 和 cancelled，不能将 HTTP 请求成功直接当作任务完成。

## 命令分类

| 命令 | 参数 | 作用 |
| --- | --- | --- |
| `project list` | `--json` | 列出项目 |
| `project create` | 名称、可选描述、两种 Agent Context 输入之一 | 创建项目 |
| `project update` | ID 或精确名称，以及要修改的字段 | 仅修改提供的值，清空上下文使用 `--clear-agent-context` |
| `project session-defaults show/update` | 项目、会话选项 | 读取或更新新会话默认值，带并发编辑保护 |
| `run` | 项目、提示词、可选会话与等待选项 | 开始或继续工作 |
| `run status/cancel` | Run ID | 查看或显式取消 |
| `session status` | Session ID | 读取会话状态 |
| `session config show/update` | 会话、修改时提供 `--revision` | 读取配置或更新之后的轮次 |
| `settings agent-routing show/update` | 框架和 Reviewer/Subagent 路由 | 读取或原子更新全局配置 |
| `plan show/approve/reject/revise` | 会话，决定时提供精确产物版本和修订 | 读取或回应计划 |
| `artifacts list` | Session ID | 列出产物 |
| `artifacts download` | Artifact ID、`--output` | 保存外部副本 |

脚本优先使用项目 ID。CLI 可把唯一的精确名称解析为 ID，重名会产生歧义；SDK/HTTP 直接要求 ID。Project Agent Context 上限为 16,000 字符，项目输出返回 `hasAgentContext`，不返回上下文正文。

`artifacts download` 返回 HTTP 500 时，旧版应用先更新，再使用原来返回的产物 ID 重试。[下载恢复步骤](api.md)区分任务完成和文件传输失败，不要只为取得已有输出而重跑研究任务。

## 管理 Connector 与凭据

这些命令使用正在运行的后端及已保存 Settings。编辑前确认目标实例。自定义 Connector 和凭据写入需要本地认证连接；服务器场景应在服务器本机运行 CLI，也可经 SSH 登录后运行。

| 命令 | 输入或结果 |
| --- | --- |
| open-science connector list --json | 读取 Connector 的安全设置视图 |
| open-science connector show CONNECTOR_ID --json | 查看返回 ID 对应的配置和状态 |
| open-science connector enable CONNECTOR_ID | 设置启用偏好 |
| open-science connector disable CONNECTOR_ID | 关闭启用偏好 |
| open-science connector add --json | 从 JSON 标准输入读取新建自定义 MCP 配置 |
| open-science connector update CONNECTOR_ID --json | 从 JSON 标准输入读取修改 |
| open-science connector remove CONNECTOR_ID | 删除自定义 MCP 配置 |
| open-science connector test CONNECTOR_ID --json | 单独建立连接、发现工具后关闭 |
| open-science credential list --json | 读取凭据元数据，不返回原始秘密 |
| open-science credential add --json | 从 JSON 标准输入读取新凭据 |
| open-science credential update CREDENTIAL_ID --json | 从 JSON 标准输入更新 displayName 和/或 secret |

<p className="example-label"><strong>示例</strong> 提交本地 Connector 配置</p>

可使用以下命令提交已准备的本地配置文件：

~~~bash
open-science connector add --json < connector.json
~~~

| 配置字段 | 要求 |
| --- | --- |
| name / displayName | 新建必填；更新时 name/ID 保持稳定 |
| transport | stdio、streamable_http 或 sse；更新也必须提供 |
| command / args | stdio 的本地可执行程序和可选参数 |
| url | HTTP/SSE 端点 |
| envCredentialIds / headerCredentialIds | 将环境变量/请求头名称绑定到已保存凭据 ID |
| oauthCredentialId | 绑定已有共享 OAuth 凭据 |
| 省略凭据绑定 | 更新时保留已保存值；空的环境变量/请求头绑定对象清空对应映射 |

只有自定义 MCP 可以新增、修改、删除。**Enabled** 是选择偏好，不证明连接成功，也不等于撤销所有 Specialist 的访问。

**test** 不会启用 Connector 或执行业务工具，返回 success、可选 toolCount 和 message。发现阶段上限十秒，失败返回非零退出码；不支持对内置 Connector 做此实时诊断。测试可能刷新已有 OAuth 令牌，但不会完成首次浏览器登录。

秘密通过 JSON 标准输入写入，不要放进命令参数或 Shell 历史。token 输入包含 displayName、kind: token、secret，也支持 api_key。把返回的 createdCredential.id 绑定到 Connector。旧后端没有这些端点时返回错误，不会退回直接编辑 Settings 文件。

## 运行输入与控制参数

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

将大写占位符替换成实际返回的 ID。示例没有假定本机存在某个虚构 Skill 或提供方。

| 参数 | 约束 |
| --- | --- |
| `--prompt` / `--prompt-file` | 内联文字或 UTF-8 文件；省略时可从 stdin 读取 |
| `--session` | 继续指定会话 |
| `--cwd` | 外部工作目录，CLI 解析相对路径，服务端校验规范路径 |
| `--approval-profile` | `ask`、`auto`、`full`，默认 `ask` |
| `--provider` 与 `--model` / `--provider-default-model` | 配置过的提供方及明确或默认模型 |
| `--reasoning-effort` | CLI 帮助列出 `default`、`low`、`medium`、`high`、`xhigh`、`max`，UI 模型选项可能不同 |
| `--skill` | 可重复的已安装 Skill ID，不负责安装 |
| `--plan-first` | 计划得到回应后才执行 |
| `--auto-review` / `--no-auto-review` | 设置会话自动审查 |
| `--memory` / `--no-memory` | 设置会话记忆，互斥 |
| `--specialist` | 新会话绑定 UUID 或稳定 profile 名，展示名称不是路由 ID |
| `--delegation allow/deny` | 控制新委派准入，deny 不取消已有子任务 |
| `--compute-host` | 可重复的已配置主机 ID；选择目标，不配置 SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | 新会话访问与默认值；现有会话访问修改走配置更新 |

外部 `cwd` 仍归调用者所有。已有会话再次提供 `--cwd` 时必须对应同一规范目录，不会借此迁移会话。省略主机参数保留既有选择，清空应使用明确操作。

## 等待、需要处理和取消

| 选项/状态 | 结果 |
| --- | --- |
| 不加 `--wait` | Run 被接纳后返回，保存 `id`、`sessionId` 供查询 |
| `--wait` | 等待终态 |
| `--wait --return-on-attention` | 计划需要审批时也可返回；普通权限请求不是同一种 attention |
| `--timeout-ms` | 到时停止客户端等待，服务器任务仍继续 |
| `--cancel-on-timeout` | 超时后显式取消，命令仍报告超时 |
| `run cancel RUN_ID` | 等待取消和收尾，保留已经完成保存的产物 |

审批前先读取 `plan show`，同时提交 `--artifact-version` 和 `--revision`，避免旧决定应用到新计划。会话更新同样使用 `session config show` 返回的 revision，过期值返回 `session_revision_conflict`。正在运行的主代理、子代理或 Notebook 可使修改返回 `session_busy`。

## 结构化输出和退出码

`--json` 输出一个结果，`run --wait --jsonl` 输出逐行事件，最后输出 Run 结果；两者不能同时使用。结构化错误位于 stderr，应检查 `error.code`，不只看退出码。

本地复现的非法参数错误：

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| 退出码 | 含义 |
| ---: | --- |
| 0 | 命令成功，仍应检查返回的 Run/attention 状态 |
| 1 | 通用/任务失败、超时、冲突，或 status 表示无运行服务 |
| 2 | CLI 参数无效 |
| 3 | 本地 daemon 不可用 |
| 4 | 指定项目、Run、会话、产物或 Specialist 不存在 |
| 5 | 活动工作阻止应用更新 |
| 6 | 更新需要手动安装步骤 |

JSONL 可能包含 `run.progress` 和 `stream.resync-required`。重连后无法重放时，重新读取权威 Run 状态，不把事件流当作永久历史。服务命令另有参数限制，见[无界面服务](./server.md)。

[CLI 实现](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs)、[上游命令指南](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md)。

技术参考：[CLI 约定](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## 无人值守运行 {/* #unattended-runs */}

给 `run` 添加 `--permission-prompts none`，可让任务拒绝尚需人工处理的交互，避免一直等待。它保留选定审批配置和已记住的授权；剩余权限请求会被拒绝，用户提问会被谢绝，需要人工审阅的 Plan 也会被拒绝。这不是自动批准所有操作。

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

选项只针对本次调用，不保存为会话偏好。不能与 `--plan-first` 同用。检查最终状态和错误；任务不等待人工，不等于任务必然完成。客户端会检查主机是否支持 `permission-prompts-none`，旧主机返回 `unsupported_capability` 时应先更新配套客户端与应用。
