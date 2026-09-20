---
title: "网络、代理与包镜像"
last_update:
  date: '2026-09-20'
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
| 单个研究域名被拒绝 | **Configure domains** 中的精确域名 | 添加无关的大范围域名就能修复 |
| 软件源已允许但 CONNECT 失败 | 安装日志、代理和 DNS 解析 | 再点一次相同授权就能解决所有连接问题 |
| 证书校验失败 | CA bundle 和组织信任要求 | 必须关闭证书校验 |
| 连接报错后显示找不到包版本 | 更早的网络错误、Python 与平台 | 该软件包一定不存在 |

## 配置 Notebook 域名

1. 选择 **Configure domains**。
2. 查看当前设备是否启用 Notebook 网络保护。
3. 展开科学服务分组，检查域名。分组开关控制对应目的地；本版本软件源/源码分组已开启且锁定。
4. 在 **Domain hostname** 输入额外来源的精确主机名，选择 **Add**。
5. 检查新增草稿行，使用 **Remove [hostname]** 撤销。
6. 选择 **Save changes** 保存预期清单。

![通配符被域名校验拒绝](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

填写 `data.example.org` 这样的主机名，不带协议、路径、端口、通配符或 IP 地址。若显示 **Enter a hostname only, without a scheme, path, port, or wildcard.**，去掉这些部分后再保存。

按名称允许的域名仍可能在其他连接检查中失败。例如，`pypi.org` 即使已在允许范围内，解析为 `198.18.*` 时仍会被判定为非公网目的地。这与“域名未授权”是不同问题。

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
