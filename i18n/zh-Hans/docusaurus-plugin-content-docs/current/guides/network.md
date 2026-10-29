---
title: "网络、代理与包镜像"
last_update:
  date: '2026-10-29'
---

# 网络、代理与包镜像

模型、Notebook 或依赖下载无法连接时，打开 **Settings → Network**。页面分别管理连接状态、Notebook 域名白名单、进程代理和软件包镜像。连接检查为绿色，不代表所有受保护的 Notebook 请求都能成功。

先确认失败的是提供方请求、Notebook 网络访问还是包安装，它们可能使用不同连接路径。修改设置时保留失败主机名和完整错误。

## 先读 Network status

该状态结合本地网络连接与软件源探测。**READY · Package registries are reachable** 表示该次探测成功；Checking、不可达或离线状态则需要等待检查或修复连接。网络变化后，可在入口可用时选择 **Check again**。

Network 显示 **Ready** 但工具失败时，展开该工具的错误。状态探测检查自己的目标地址，请根据失败请求的主机名和提示排查对应路径。

| 现象 | 下一项检查 | 不应据此得出的结论 |
| --- | --- | --- |
| 模型登录失败 | 提供方认证和模型连接检查 | Notebook 域名设置会提供模型凭据 |
| 单个研究域名被拒绝 | **Manage access** 中的精确域名 | 添加无关的大范围域名就能修复 |
| 软件源已允许但 CONNECT 失败 | 安装日志、代理和 DNS 解析 | 再点一次相同授权就能解决所有连接问题 |
| 证书校验失败 | CA bundle 和组织信任要求 | 必须关闭证书校验 |
| 连接报错后显示找不到包版本 | 更早的网络错误、Python 与平台 | 该软件包一定不存在 |

<span id="配置-notebook-域名" />

## 配置公网访问规则 {/* #public-network-rules */}

1. 打开 **Settings → Network → Manage access**，阅读 **Public internet access** 并检查 **Built-in services**；标为 **Required** 的分组保持启用。
2. 在 **Custom public domains** 的 **Domain hostname** 中输入主机名、HTTP(S) URL 或以通配符开头的规则，然后选择 **Add to list**。
3. 检查规范化后的规则，再选择 **Save changes**，重试原请求。已保存的批准会在重启后保留。

精确主机名不包含子域名。`*.example.org` 覆盖其子域名，但不包含 `example.org` 本身。`https://example.org/path` 这样的 URL 会转换为主机名规则，路径和端口不会限制访问范围。规则允许向匹配的主机发送数据。输入不接受 IP 字面值、localhost 或嵌有账号密码的 URL。主机名若解析到私有地址，仍需经过私有服务审核，公网规则不会授予该权限。


## 信任私有服务 {/* #trusted-private-services */}

仅在研究代码确实需要访问已知内网服务时使用此项。该控件位于桌面应用中。仅支持私有服务地址；localhost、本机和保留地址仍会被阻止。输入框不接受原始 IP 地址或通配符。

1. 在 **Trusted private services** 中选择 **Add service**，填写 **Hostname** 和 **Port**。核对具体服务，默认端口为 443。
2. 选择 **Review service**，检查解析得到的 **Approved addresses**，确认后选择 **Add to trusted services**。
3. 检查列表并选择 **Save changes**。保存前会再次检查 DNS；地址变化后需要重新审核。
4. 向该服务发起一个小请求并检查实际响应。地址审核本身不验证登录凭据或服务是否可用。

授权绑定完整的主机名、端口和已审核地址，允许所有项目中的受保护 Notebook 和 Shell 代码向该服务发送数据。只添加任务需要的权限。保存网络规则会重置受保护连接，可能中断正在进行的传输，请在传输结束后应用变更。

## 选择代理模式

选择 **Configure proxy**。代理地址应来自自己的网络配置，截图中的端口仅适用于演示电脑。

| 模式 | 行为 | 必填内容 |
| --- | --- | --- |
| **System** | 应用请求遵循系统代理；代理进程继承应用启动时的代理环境 | 不填服务器 |
| **Manual** | 为之后的应用请求和进程提供固定代理 | **Proxy server** URL |
| **Direct** | 新进程直接连接，不使用配置或继承的代理 | 不填服务器 |

Manual 支持 HTTP、HTTPS、SOCKS、SOCKS4、SOCKS5 URL，不支持 URL 内嵌凭据。**Bypass rules** 可填写逗号分隔的直连主机列表，localhost 始终绕过代理。

1. 选择 **Manual**。
2. 在 **Proxy server** 输入当前网络实际使用的代理地址。
3. 仅在目的地需要直连时添加 Bypass rules。
4. 选择 **Save**，等待 **Proxy settings saved.**。
5. 启动新请求或进程，重试原来的失败操作。已有代理会话、内核、安装进程可能保留旧连接。

Manual 模式提示 **Enter a proxy server URL** 时，填写可用代理地址，或通过 **Done** 放弃草稿。保存有效地址本身不能证明该代理能完成原来失败的请求。

### 域名解析为非公网地址时 {/* #本次遇到的-fake-ip-问题 */}

安装提示 `destination resolves to a non-public network address` 时，即使短错误只有 `conda install failed` 或 `pip install failed`，也要打开详细安装日志。

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. 检查受影响域名及其解析地址。`198.18.*` 等地址不属于公网目的地。
2. 区分域名名单与目标地址检查。`alreadyAllowed` 不表示解析出的地址符合要求。
3. 与网络维护者检查公网 DNS 解析和预期代理路径，再重试原来的小型请求。保持域名防护开启。
4. 分别验证安装结果和实际导入。代理已保存、解释器 Ready 或已有包能运行，都不足以证明新包安装成功。

如果同一错误持续出现，保留域名、解析地址、代理模式和安装日志，按[故障排查](troubleshooting.md)反馈。设置保存成功不等于下载成功。


## 软件包镜像与证书

在 Package mirror 下选择 **Configure** 或 **Edit**。

| 字段 | 输入与作用 |
| --- | --- |
| **Conda channel mirror** | Conda channel 下载所用镜像根地址 |
| **Python package index (pip)** | Python 包索引 URL，通常以 `/simple` 结尾 |
| **CA bundle path** | 完整 PEM 信任包路径，应包含需要的公共与组织根证书；留空使用公共证书机构 |
| **View available mirrors** | 打开外部镜像帮助 |
| **Save** | 保存，供后续软件包操作使用 |
| **Cancel** | 放弃草稿 |

![镜像与 CA bundle 字段](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

包镜像改变软件包来源。核对镜像所需的根地址或索引格式，保存后在所选环境中重试小规模安装。模型提供方代理需单独配置。

已配置的 Conda、PyPI 和 CRAN 镜像主机会在本次包管理操作中获得临时访问权限。这不会将其加入永久 Notebook 域名列表，也不会授予普通 Notebook 代码相同权限。跳转到其他主机时仍按网络审批流程处理。

填写受支持的 HTTP(S) 镜像地址，不包含内嵌凭据、空白字符、localhost 或纯 IP 地址。镜像设置被接受，不代表服务器可用，也不会修复域名解析到保留地址的问题。安装失败时先查看该操作真正访问的目标和错误，再重试。远程**模型**端点另外遵循[HTTPS 要求](providers.md)。

## 保留哪些排查信息

记录应用版本、操作、运行时/环境、包名或域名、代理模式和最早的有效错误。保留完整安装输出：末尾“找不到版本”可能掩盖更早的连接失败。分享诊断资料时移除 token 和代理凭据。

网络已连通但 Python 仍缺模块时，继续查看[运行时与软件包](./runtimes.md)。远程主机配置单独见 [Compute](remote-compute.md)。

[网络设置源码](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx)、[Notebook 网络边界](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts)。

## 查询 HTTP 报错

遇到 400、401、403、404、429 或 5xx 响应时，查看 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同时记录返回错误的服务与详细消息。

## R 单元格在执行前被阻止 {/* #r-network-warning */}

v0.31.1 中，网络保护阻止 R 运行时，Notebook 会显示行内提示。通过其中的设置链接检查所需访问。提示表示单元格没有执行，不能作为科研结果或已完成的运行。处理具体要求后重新运行并查看输出。Windows 支持标准模式 R，并不意味着网络保护已经启用。

## 切换授权模式后的网络访问 {/* #network-mode-changes */}

从 v1.0.5 起，**Full access** 对公开网络目标不再逐项弹出授权卡片，但身份验证、来源限制和私有服务检查仍然适用。切换为更严格的模式会关闭已有连接，避免继续沿用旧权限。请在新模式下重试目标请求，并检查出现的授权卡片。

全局网络授权会立即反映到 **Settings → Network**。添加新规则前先检查现有域名或私有服务列表。全局授权范围大于单次批准，只保留你需要的范围。另见[授权模式](approval-modes.md)。
