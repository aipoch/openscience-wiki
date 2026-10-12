---
title: "无界面服务与浏览器访问"
last_update:
  date: '2026-10-12'
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

## 服务命令

| 命令 | 结果 | 选项与边界 |
| --- | --- | --- |
| `open-science start` | 启动后端并打开浏览器 | 默认端口 44100 |
| `open-science start --no-open` | 启动但不打开浏览器 | 用于有意开启的本地服务 |
| `open-science status --json` | 输出结构化状态 | 无服务时返回 `{"running":false}`，退出码 1 |
| `open-science url` | 输出带认证的浏览器 URL | 含本地访问凭据，不放进公开示例 |
| `open-science stop` | 请求经过认证的优雅停止 | 不盲目向陈旧状态文件里的 PID 发信号 |
| `open-science stop --json` | 输出停止结果 | 见下表 |

这些命令中，**status 和 stop 支持 `--json`，start 和 url 不支持**。本地 `start --json` 检查在启动前返回 `invalid_cli_usage`、退出码 2。脚本应先运行 `start --no-open`，再运行 `status --json`。

### 停止结果

| JSON `result` | 含义 |
| --- | --- |
| `already-stopped` | 未找到活动服务记录 |
| `daemon-stopped` | 经过认证的 Node 后端已退出；连接它的客户端失去后端连接 |
| `web-service-stopped` | 旧版 Electron Web 服务结果，不适用于新版独立 Node 后端 |

停止请求被拒绝或超过截止时间时返回失败。应检查错误和实际状态，不能仅凭命令返回就声称服务已停止。

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

## 服务归属与关闭 {/* #backend-ownership */}

| 操作 | 对后端的影响 |
| --- | --- |
| 仅关闭浏览器标签页 | 后端继续运行 |
| 退出启动了后端的桌面应用 | 该桌面应用拥有的后端随之停止 |
| 退出连接到已有 CLI 后端的桌面应用 | 只断开该客户端，CLI 后端继续运行 |
| `open-science stop` | 停止目标配置的后端，所有连接它的客户端都会受影响 |

关闭窗口与退出应用可能不同，特别是在应用仍驻留托盘时。停止共享后端前先结束活动研究，再检查 `status --json` 的实际状态。

## 应用更新

桌面应用的原生更新入口与独立 CLI 包的更新方式不同。普通 Node 后端不能执行桌面安装器替换；其 `update --json` 会报告需要手动更新及 `package-manager` 模式，应按返回说明处理。

- **桌面应用**：使用应用内更新。若连接的是先前由 CLI 启动的后端，先结束任务并停止该后端，再更新桌面应用。
- **独立 CLI 压缩包**：结束工作、停止目标后端，将新版本解压到新目录，保留原配置数据，更新所用启动器或 PATH；不要覆盖运行中的包。
- **npm 安装**：按包管理器流程更新对应包，并确认客户端与后端兼容。

更新后重新启动，运行 `status --json` 与 `doctor --json`，确认版本、配置目录与就绪状态。保留原有凭据存储方式；不要为了更新删除凭据或配置目录。

参见[官方独立运行说明](https://github.com/aipoch/open-science/blob/v0.37.1/docs/standalone-runtime.md)、[CLI](cli.md)与 [Task SDK](api.md)。
