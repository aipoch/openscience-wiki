---
title: "网络、代理与包镜像"
last_update:
  date: '2026-11-19'
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
| 单个研究域名被拒绝 | **Manage access** 中的![Strict 规则的协议、主机和端口填写示例](/img/open-science/v130/network-rule.webp)

精确域名 | 添加无关的大范围域名就能修复 |
| 软件源已允许但 CONNECT 失败 | 安装日志、代理和 DNS 解析 | 再点一次相同授权就能解决所有连接问题 |
| 证书校验失败 | CA bundle 和组织信任要求 | 必须关闭证书校验 |
| 连接报错后显示找不到包版本 | 更早的网络错误、Python 与平台 | 该软件包一定不存在 |

<span id="配置-notebook-域名" />

## 选择 Relaxed 或 Strict 网络模式 {/* #public-network-rules */}

打开 **Settings → Network → Manage access**。模式适用于各项目中受保护的 Notebook 连接。编辑前先看 **Current: Relaxed** 或 **Current: Strict**，确认当前模式。

| 模式 | 允许的连接 | 目标未获允许时 |
| --- | --- | --- |
| **Relaxed**（默认） | HTTPS 域名，包括指向私有或回环服务的域名；已保存例外按协议、域名/IP 和端口匹配 | HTTP 与直接 IP 连接需要授权 |
| **Strict** | 仅允许手动白名单中匹配协议、域名或 IP、端口的目标 | 直接阻止，不弹出授权请求；需要的规则必须手动添加 |

切换时选择 **Strict** 或 **Relaxed**，阅读说明，再使用 **Switch to Strict mode** 或 **Switch to Relaxed mode**。只选择标为 **Not yet applied** 的选项，并不会改变当前生效模式。

![Strict 模式说明与白名单分组](/img/open-science/v130/network-strict.webp)

### 添加 Strict 白名单规则 {/* #strict-whitelist */}

1. 在 **Strict whitelist** 中选择 **Add rule**。
2. 按实际服务填写 **Network protocol**、**Hostname, IP or pattern** 和 **Port**。填写主机名或 IP，不填写 URL 路径。
3. 选择 **Group**；需要新分组时选择 **New group…** 并填写 **Group name**，然后选择 **Confirm**。
4. 检查保存的规则及当前模式，再发起目标服务的小请求，检查实际响应。

精确域名不包含子域名。`*.example.org` 匹配子域名，但不匹配 `example.org`。协议和端口都是规则的一部分：443 端口的 HTTPS 规则不会授予 HTTP 或其他端口访问。Strict 匹配请求中的主机名，不检查其 DNS 结果属于公网、私有还是回环地址；只添加确实希望代码访问的目标。

**Built-in** 和 **Manual** 表示规则来源。内置分组只在初次准备时加入，后续编辑会保留。已记住的授权与 Full access 都不会绕过 Strict。保存网络规则会重置受保护连接，可能中断传输，请在正在进行的传输结束后修改。

## 保存 Relaxed 模式的访问例外 {/* #trusted-private-services */}

在 **Trusted unsafe networks** 下选择 **Add address**，填写 **Network protocol**、**Hostname** 或 IP、**Port** 及对应分组。确认后检查保存范围，再重试请求。例外可以避免 Relaxed 模式下重复授权匹配的目标，但不会在 Strict 模式下授予访问。选择 Relaxed 时，Strict 白名单不生效。

规则允许建立连接，不等于登录成功或响应有效，还应检查服务凭据和实际结果。这些设置替代了旧的公网域名与私有服务表单；参考旧截图时，请以当前模式和规则字段为准。

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

### 检查 DNS 或代理故障 {/* #本次遇到的-fake-ip-问题 */}

保留失败请求的完整错误。即使规则允许目标，仍可能出现超时、证书错误或代理拒绝。核对实际服务的域名、协议、端口和代理路径。不要把旧版本的非公网地址错误当成当前 Strict 的匹配规则：Strict 检查请求中的名称/IP 与端口，不检查 DNS 地址类别。

修正原因后重试小请求。安装软件包时应分别确认安装与导入；设置保存成功或解释器 Ready 都不能证明下载已完成。共享日志前去掉凭据，持续失败时参见[故障排查](troubleshooting.md)。

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

已配置的 Conda、PyPI 和 CRAN 镜像主机会在本次包管理操作中获得临时访问权限。这不会将其加入永久 Notebook 域名列表，也不会授予普通 Notebook 代码相同权限。跳转到其他主机时，Strict 模式要求实际协议、主机和端口仍符合白名单；临时包安装授权不会绕过 Strict 规则。

填写受支持的 HTTP(S) 镜像地址，不包含内嵌凭据、空白字符、localhost 或纯 IP 地址。镜像设置被接受，不代表服务器可用，也不会修复域名解析到保留地址的问题。安装失败时先查看该操作真正访问的目标和错误，再重试。远程**模型**端点另外遵循[HTTPS 要求](providers.md)。

## 保留哪些排查信息

记录应用版本、操作、运行时/环境、包名或域名、代理模式和最早的有效错误。保留完整安装输出：末尾“找不到版本”可能掩盖更早的连接失败。分享诊断资料时移除 token 和代理凭据。

网络已连通但 Python 仍缺模块时，继续查看[运行时与软件包](./runtimes.md)。远程主机配置单独见 [Compute](remote-compute.md)。

[网络设置源码](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx)、[Notebook 网络边界](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts)。

## 查询 HTTP 报错

遇到 400、401、403、404、429 或 5xx 响应时，查看 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同时记录返回错误的服务与详细消息。

## R 单元格在执行前被阻止 {/* #r-network-warning */}

v0.31.1 中，网络保护阻止 R 运行时，Notebook 会显示行内提示。通过其中的设置链接检查所需访问。提示表示单元格没有执行，不能作为科研结果或已完成的运行。处理具体要求后重新运行并查看输出。Windows 支持标准模式 R，并不意味着网络保护已经启用。

## 切换授权模式后的网络访问 {/* #network-mode-changes */}

**Full access** 可以省去适用的 Agent 手动权限卡，但不会绕过 Strict Notebook 白名单。请求被拒绝时，检查 **Settings → Network → Manage access**。Relaxed 模式下，协议与目标决定是否需要授权或已保存的例外。提供商凭据和服务限制仍然适用。

修改网络规则可能关闭已有受保护连接。按最终生效模式重试，并检查实际响应。会话权限见[审批模式](approval-modes.md)。
