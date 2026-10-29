---
title: "无界面服务与浏览器访问"
last_update:
  date: '2026-10-29'
---

# 无界面服务与浏览器访问

本地服务提供无界面后端和 localhost 浏览器入口，与 SSH Compute 主机、Remote.It 浏览器配对不同。连接客户端前，应配置主机所需的认证与凭据存储方式。

## 目标和发现规则

v0.37.0 起，共享后端在普通 Node 进程运行，桌面应用作为原生客户端连接；CLI 启动不再依赖隐藏的 Electron 主机。

| 选择器 | 范围 |
| --- | --- |
| `--port PORT` | localhost 端口，整数 1–65535；指定端口被占用时会报错 |
| `--config-root PATH` / `--profile PATH` | CLI 的独立配置目录；整个流程使用同一绝对路径 |
| `OPEN_SCIENCE_CONFIG_ROOT` | 以环境变量明确指定配置目录；命令参数优先 |
| 自动发现 | 查找本地服务状态，确认连接的配置、端口与版本 |

桌面后端未指定端口时会选择空闲端口，CLI 启动默认使用 44100。不要根据窗口是否打开来猜端口；先执行 `status --json`。同一配置已有兼容服务时可连接它，版本不兼容时应先结束工作并按提示更新。旧的 `--app-path` 选项不能将 Electron 可执行文件当成新版后端启动。

状态文件为 `web-service.json`。认证失败不意味着可以删除状态文件或终止其中的 PID；先检查实际服务与诊断信息，避免误操作其他进程。

## 初始化与检查就绪状态 {/* #readiness */}

使用 `open-science init` 准备默认配置目录，不会启动应用。需要隔离配置时，init、start 和后续命令均指定同一 `--profile` 绝对路径。Debian 安装包随应用安装 CLI。Codex 准备和登录见[终端设置](cli.md#terminal-setup)。

明确需要启动服务时执行 `start --no-open`，之后运行 `open-science doctor --json`。查看整体 `ready`、逐项检查和建议操作，不能只凭退出码判断就绪。继续使用已有的本地认证接口；启动无界面服务不会配置 Remote.It，也不会发布公网入口。

## 生命周期命令 {/* #lifecycle-commands */}

从 v1.0.5 起，App 连接或显式 CLI 启动会保持服务运行。所有命令应使用同一个绝对配置路径。

| 命令 | 结果 |
| --- | --- |
| `open-science start` | 启动或复用服务，显式保持其运行，并打开浏览器 |
| `open-science start --no-open --json` | 设置相同的持续运行状态但不打开浏览器；返回 `started` 或 `already-running`、服务信息和 `lifetime` |
| `open-science status --json` | 检查目标服务；没有服务时返回 `{"running":false}`，退出码为 1 |
| `open-science url` | 输出带认证信息的浏览器地址；不要公开分享 |
| `open-science stop --json` | 解除显式持续运行状态；仅在没有 App 连接时停止服务 |
| `open-science stop --force --json` | 请求停止整个服务，包括仍连接 App 的情况；可能中断任务 |

重复执行 `start` 不会累加持续运行次数。**start**、**status**、**stop** 支持 `--json`，**url** 不支持。JSON 启动结果不会暴露带认证信息的浏览器地址。旧服务可能返回未知生命周期状态；依赖新规则前先确保版本匹配。

### 停止结果

| JSON `result` | 含义 |
| --- | --- |
| `already-stopped` | 没有找到存活的服务记录 |
| `keep-alive-revoked` | 已解除显式持续运行状态，但仍连接的 App 使服务继续运行 |
| `stopped` | 本次请求对应的服务实例已退出并释放所有权 |
| `shutdown-requested` | 旧服务接受了请求，但尚未确认退出；命令返回非零退出码 |

读取 `result` 和 `lifetime`；仅凭成功退出码无法判断服务已停止。旧的 `daemon-stopped` 和 `web-service-stopped` 结果名称不再输出。`--force` 要求新版生命周期协议，面对旧服务会明确报错。应检查错误与当前状态，不要通过删除状态文件或终止记录中的 PID 强行处理。

## 认证与浏览器访问

SDK 发现本地服务并读取其本地 token，通过请求头发送。普通人类可读输出、JSON、JSONL 不打印 token；`url` 是显式生成带认证浏览器入口的例外。

localhost 服务不会自动让其他电脑访问。远程浏览器功能有独立访问模式、配对和可信浏览器管理；SSH Compute 则向配置过的远程主机提交任务。

Remote.It 配对见[远程浏览器访问](../guides/remote-access.md)，SSH 作业见[远程计算](../guides/remote-compute.md)。按对应功能的设置流程配置连接。

### Linux 无界面服务的凭据存储

默认仍使用操作系统保护存储。Linux headless 后端没有可用密钥环时，可显式选择：

<p className="example-label"><strong>示例</strong> 使用文件凭据存储启动 Linux 无界面服务</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| 选择 | 行为 |
| --- | --- |
| 不传选项 / --credential-store=os | 要求操作系统保护存储 |
| --credential-store=file | 仅 Linux headless 允许未加密的 Settings 凭据文件存储 |
| 桌面端、macOS、Windows | 不支持文件模式 |
| 已有运行中的后端 | 拒绝显式选择模式，不改变已有进程 |
| 下次启动 | 需要再次指定，不是保存的偏好 |

文件模式在配置根目录使用 settings.json 和 credentials.json，通过原子写入及 POSIX 0600 权限保存。file:v1: 值只是 base64 编码，**没有加密**；能读取文件的人可以还原秘密，不应放入仓库、镜像或支持报告。

此选择作用于新建/更新的 Settings Provider 密钥、应用管理的订阅令牌、GitHub/文献密钥、共享 MCP/OAuth 秘密。Compute 密码及受保护 Compute 数据仍有独立的 OS 存储要求，外部 Agent 框架登录存储遵循各自规则。此选项不会关闭沙箱。

已有加密值不会自动迁移，仍需原操作系统密钥库读取。无法读取时，通过正常表单重新填写凭据。文件引用需要显式文件模式才能读取，旧版本不兼容。返回 OS 存储时，应以 OS 模式重启，在密钥库可用时明确替换凭据。

配置需要在更换容器后保留时，使用持久存储。关闭应用会保留配置，但替换临时容器文件系统可能移除配置。参见[凭据存储约定](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md)。

## 后台服务的保持与停止 {/* #backend-ownership */}

| 操作 | 对后台服务的影响 |
| --- | --- |
| 未显式执行 CLI 启动时，退出最后一个连接的 App | 服务停止 |
| 执行 CLI `start` 后退出全部 App | 服务因显式持续运行设置而保持运行 |
| 关闭浏览器标签页或 SDK 客户端 | 不会解除显式持续运行设置 |
| 执行普通 CLI、Web 或 SDK 任务 | 不会单独让服务在全部 App 退出后继续运行 |
| 仍有 App 连接时执行 `open-science stop` | 解除显式持续运行设置；服务继续供已连接 App 使用 |
| 执行 `open-science stop --force` | 请求停止整个服务，可能中断工作 |

若浏览器或自动化任务需要在退出桌面应用后继续，请先显式启动同一配置的服务。将窗口关闭到托盘不等于退出。停止整个服务前结束活跃研究，之后用 `status --json` 检查状态。

断开连接的桌面应用提供 **Reconnect** 和 **Quit app**。Reconnect 不会重新提交工作。按[连接恢复](../guides/troubleshooting.md#connection-recovery)处理；重试前检查那些响应丢失的操作是否已经完成。

### 桌面退出中断后重新连接 {/* #desktop-service-recovery */}

重新打开相同版本的桌面应用，连接原配置。App 连接与显式 CLI 持续运行设置共同决定服务是否保留；浏览器标签页本身不能替代这两者。

退出准备失败时，窗口会保留。保存未保存的工作，恢复后检查原任务。若启动提示旧服务阻塞，先确认配置、版本及活跃客户端，再选择明确的停止操作。取消会保留服务；停止失败可以重试或重新检查，不要删除锁文件。

## 应用更新行为 {/* #application-update-behavior */}

CLI 应用更新命令仍已移除，不要使用 `open-science update --json`。请通过[桌面更新控件或原安装渠道](../guides/installation.md#manual-update)更新。

替换独立 CLI 文件前，先结束使用该安装的每个配置中的工作。退出连接的 App，并对各配置执行 `stop --json` 解除显式持续运行设置。确认返回 `stopped` 或 `already-stopped`；`keep-alive-revoked` 表示仍有 App 保持服务运行。只有确实要停止全部客户端工作时，才使用 `stop --force`。不要覆盖正在运行的程序文件。

桌面更新可能要求停止已连接的 CLI 服务并转为桌面管理。确认配置和受影响任务后再同意；取消会让原服务继续运行。这不会更新原独立 CLI 程序文件。按占用与恢复提示操作，不要删除锁或配置。

升级后确认版本及原有数据，再检查 `status --json` 和 `doctor --json`。保留凭据存储模式。[1.x 兼容政策](../guides/installation.md#version-compatibility)不保证桌面与后台混用不同版本。另见[官方运行说明](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md)、[CLI](cli.md) 和 [Task SDK](api.md)。

## 网页工作区中的 Compute {/* #web-compute */}

独立网页工作区的后端具备所需 Notebook 和 Compute API 时，会开放 **Compute**。打开已连接的工作区，确认面板可用，再按原有 SSH／Slurm 配置步骤操作。面板可用不代表已提供远程凭据，也不证明作业能够执行。

## 研究包与外部工具客户端 {/* #local-research-tools */}

经过身份验证的本地 Web 会话可以[上传和下载研究包](../guides/research-packages.md#local-package-transfer)；远程 Web 会话不因此获得传输能力。同一台机器上的外部工具客户端可配置 [stdio MCP 适配器](cli.md#external-mcp)。它使用已运行的本地服务及该配置的权限，不会建立远程 MCP 地址。
