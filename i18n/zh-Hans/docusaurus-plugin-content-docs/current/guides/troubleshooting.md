---
title: "故障排查与常见问题"
last_update:
  date: '2026-09-24'
---

# 故障排查与常见问题

先查找下面的报错文字，按对应操作检查，再重试原步骤。问题仍存在时，可[提交缺陷或向社区求助](#提交问题或向社区求助)，附上报错和触发步骤。

<span id="agent-无法启动或会话停住" />

<span id="provider-测试失败" />

<span id="pythonr-或包安装失败" />

<span id="文件不能预览" />

<span id="权限一直等待" />

<span id="remote-control-无法访问" />

<span id="storage-迁移异常" />

<span id="收集问题证据" />

## 按失败位置排查

| 症状 | 先检查 | 操作与成功条件 |
| --- | --- | --- |
| 打开后工作区为空 | 数据位置、配置档、Archived | 返回正确根目录/项目，不要立即新建替代项目 |
| 没有可用模型 | 登录、Agent、兼容性 | 按[接入](providers.md)配置并完成实际小请求 |
| 显示已连接但任务失败 | Provider 报错和选中模型 | 检查认证、账号权限与标识符；界面出现不等于可调用 |
| 任务似乎停住 | 计划、权限、交互卡片 | 回答当前请求，授权前阅读范围 |
| 队列修正没执行 | Not saved / Sending / 延后状态 | 见[输入](composer.md)，确认成为用户消息 |
| Module not found | 解释器和包清单 | 按[运行环境](runtimes.md)在相同环境验证导入 |
| 安装已授权仍失败 | 首条网络/代理/证书错误 | 按[网络](network.md)修复后重试原操作 |
| Notebook 无法读文件 | 托管路径、附件、授权、版本引用 | 使用指定可访问输入，不扩大无关目录权限 |
| 保存服务拒绝工作路径 | 是否登记为可发布文件 | 使用支持的产物保存方式并重新打开 |
| 表格数值不一致 | 校验和、分隔符、元数据列、分母 | 从同一输入重算，不先改预期值 |
| 文件可见但无法预览 | 格式/大小、版本、渲染错误 | 按[预览](previews.md)下载以区分显示与文件缺失 |
| 文献看似消失 | 视图、筛选、Inbox、Trash | 清除筛选，在对应生命周期恢复 |
| 找到全文但添加失败 | 下载结果和 PDF 校验 | 使用另一合法来源/本地 PDF 并实际打开 |
| Side Chat 禁用 | 框架/Provider 提示 | 见[委派](delegation.md)，检查当前框架显示的兼容性限制 |
| 远程任务不可运行 | 主机、认证、调度器和环境 | 见[远程计算](remote-compute.md) |

## HTTP 错误：400、403、429 与 5xx

HTTP 状态码来自模型服务、Connector 服务、本地浏览器服务或代理的响应。**先确认是谁返回了错误，再修改设置。** 同时复制状态码和响应中的详细说明：单看 `403`，无法判断是 API 权限、代理策略还是资源访问限制。

### 请求、认证与访问权限

| 状态码 | 含义 | 在 Open-Science 中检查什么 |
| --- | --- | --- |
| **400 Bad Request** | 服务拒绝当前请求 | 阅读报错指出的字段或参数，检查服务端点、模型标识符及支持的请求功能。工具调用则检查输入格式；涉及附件或可选功能时，先用小型纯文本请求定位 |
| **401 Unauthorized** | 缺少有效认证 | 确认失败服务使用哪个账号或凭证。重新连接对应订阅/OAuth 账号，或在[模型接入](providers.md)、[Connector 凭证](connectors.md)中修正 API key |
| **403 Forbidden** | 服务拒绝访问 | 检查模型/资源权限、组织/项目授权，以及服务提示的访问限制。若报错为 **HTTP CONNECT 403**，先检查[代理或网络策略](network.md)，不要直接判定模型密钥错误 |
| **404 Not Found** | 该地址下的端点或资源不可用 | 检查 Base URL、API 路径及模型/资源 ID。网站地址不一定是 API 端点；服务也可能用 404 隐藏无权访问的资源 |
| **405 Method Not Allowed** | 端点不支持当前请求方法 | 对照服务文档检查 API 协议和 Connector transport。稳定复现的集成不匹配应反馈，不要随意猜测请求方法 |
| **407 Proxy Authentication Required** | 代理要求认证 | 与网络管理员核对代理配置，模型 API 凭证不能替代代理认证 |
| **413 Content Too Large** | 请求体超过限制 | 减少附件或批量输入大小，或使用受支持的较小输入；确认限制来自哪个服务 |
| **422 Unprocessable Content** | 服务无法处理当前内容 | 阅读字段校验消息，修正工具或模型请求的类型、必填字段及不支持的值 |

**400 与 403 的处理重点不同：** 400 明确指出不支持某个参数时，应修正请求功能；403 指出某模型受限时，应检查该模型的访问权限。没有明确原因时，保留响应和 request ID 求助，不要仅凭数字判断原因。

### 额度与临时服务故障

| 状态码 | 含义 | 接下来怎么做 |
| --- | --- | --- |
| **402 Payment Required** | 服务商自定义的支付/访问处理，HTTP 未规定统一的计费含义 | 阅读该服务的错误详情与账号页面，不要仅凭数字认定必须充值 |
| **429 Too Many Requests** | 请求限流；部分模型 API 也用它表示额度耗尽 | 频率限制时，减少并发，按 **Retry-After** 或文档中的重置时间等待；额度错误则检查对应服务的可用额度/计费。订阅限制与 API 余额分别管理 |
| **500 Internal Server Error** | 返回响应的服务内部失败 | 查看服务状态；适合重试的操作可稍后用小请求验证，持续失败时携带 request ID 反馈 |
| **502 Bad Gateway** | 网关收到无效的上游响应 | 确认对应网关/服务商，检查状态与上游配置；自定义网关持续失败时联系其管理员 |
| **503 Service Unavailable** | 服务暂时不可用 | 有 Retry-After 时按提示等待。本地端点则检查模型服务是否启动并就绪 |
| **504 Gateway Timeout** | 网关等待上游超时 | 重试前确认操作是否已经开始或完成；分析、任务提交、产物写入应先检查原结果，避免重复执行 |

部分内置 Connector 请求会对 429、500、502、503、504 进行有限自动重试。这不适用于全部模型或框架，也不表示可以反复手动提交；仍以对应服务的响应为准。

### 没有 HTTP 响应，或问题持续存在

`ECONNREFUSED`、`ENOTFOUND`、`ETIMEDOUT` 和证书错误属于连接/TLS 问题，不是 HTTP 状态码。请求超时也不自动等于 HTTP 408 或 504，先按[网络](network.md)排查。

修改后，用同一模型服务或 Connector 完成小请求，再重试原操作。仍失败时，按[反馈流程](#提交问题或向社区求助)提供服务名称、去除秘密信息的端点主机名/路径、状态码、错误正文、可用的 request ID、时间与时区。不要在公开报告中粘贴 Authorization 请求头或含令牌的 URL。

来源：[HTTP 语义规范](https://www.rfc-editor.org/rfc/rfc9110.html#section-15)、[429 与 Retry-After](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)、[OpenAI 的限流与额度错误](https://developers.openai.com/api/docs/guides/error-codes)、[Connector 重试策略](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts)。

## 按报错信息定位

从失败的工具、弹窗或日志中复制完整错误码和附带说明。**错误码、Python 异常名、系统错误文本**属于不同来源，Open-Science 没有为所有故障统一分配数字编号。同一报错也可能有多个原因。远程作业请查[SSH 与计算错误表](remote-compute.md#处理-ssh-与作业错误)。

| 错误码或文本 | 含义与处理 | 恢复后的检查 |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | 所选 Python 解释器无法导入该模块。检查[运行环境](runtimes.md)，通过该环境支持的包管理方式安装所需包，并遵循重启提示 | 在同一 Notebook 环境导入模块，再运行失败的单元格 |
| `ENOENT` / `No such file or directory` | 找不到请求的路径。检查文件名和来源位置；引用失效时重新附加实际存在的文件 | 在同一任务中预览或读取目标输入 |
| `EACCES` / `EPERM` / `Permission denied` | 操作缺少文件权限。同时检查系统权限与项目目录授权，按[项目](projects.md)仅授权任务需要的目录。SSH 的 `Permission denied (publickey)` 应检查身份认证 | 在预期权限范围内重试原读写操作 |
| `ENOTDIR` / `Not a directory` | 目录操作收到文件路径，或父路径不是目录。选择实际所属目录 | 目录列表正常打开 |
| `EISDIR` / `Is a directory` | 文件操作收到目录路径。选择具体文件 | 文件正常打开或下载 |
| 包请求因非公网目标地址被拒绝 | 检查被拒绝的主机名及解析 IP；代理或 DNS 可能返回网络策略阻止的地址。按[网络](network.md)修正解析，不要盲目扩大访问范围 | 原包请求成功，随后在同一环境成功导入 |

### 数据库启动错误

应用无法安全打开数据时会报告以下错误码。保留原数据文件夹，阅读详细说明后再重试，不要通过删除数据库排障。

| 错误码 | 含义 | 接下来怎么做 |
| --- | --- | --- |
| `database_runtime_unavailable` | 内置数据库引擎加载失败 | 重新安装匹配系统的官方应用包，保留独立存放的数据目录 |
| `database_open_failed` | 数据库无法打开，可能被另一应用实例占用、磁盘已满或位置只读 | 关闭其他实例，检查可用空间与目录权限，再重试 |
| `database_newer_than_app` | 数据格式由较新应用版本写入 | 安装兼容的新版本，重新打开原数据目录；不要自行降级数据结构 |
| `database_history_invalid` | 数据迁移历史与应用预期不一致 | 保留目录并反馈错误码。有可用备份时，先确认恢复步骤再替换数据 |
| `database_migration_failed` | 数据库更新未完成 | 检查空间、其他实例与权限；有 Retry 时重试。再次失败时一并提供 migration ID |
| `database_validation_failed` | 保存的数据不符合所需结构 | 更新应用后重启；仍失败时反馈错误码，不要自行修改数据库记录 |
| `database_startup_unavailable` | 数据库启动服务未响应或未完成检查 | 先重试；持续失败时完全退出并重新启动应用，再反馈 |

启动错误消失、原项目能够打开，才算恢复。如果界面提供 **Still stuck? Create an issue for help**，按[下方流程](#提交问题或向社区求助)检查后提交。上述含义依据 [启动错误处理](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx)。

如果启动页只显示 **Quit**，先退出应用，排除报错指出的原因后再重新启动；不要寻找页面未提供的 Retry 按钮。恢复后确认原项目和文件可打开。

![数据库无法打开时的启动提示](/img/open-science/local-acceptance/startup-database-error.webp)

### 恢复提示

| 现象 | 下一步 |
| --- | --- |
| 存储恢复后 Compute 作业持续排队 | 阅读受影响会话提示，保留列出的文件，恢复有效副本后选择 **Recheck saved conversations**；重新提交前检查原作业 |
| PDF 上传取消但文献条目保留 | 打开已保存条目检查附件状态；批量窗口提供时使用 **Retry unfinished** |
| 另一客户端编辑后，集合保存被拒绝 | 重新打开最新集合，核对并合并修改后再保存 |
| Windows 更新提示拒绝访问 | 阅读具体路径及 Windows 错误，按提示使用官方安装程序以管理员身份更新 |
| Windows 更新提示文件被占用 | 关闭占用所指安装文件的进程后选择 **Retry**，或 **Cancel** 停止更新 |

Windows 错误属于操作系统代码，与 HTTP 状态码不同。恢复失败时，按[反馈流程](#提交问题或向社区求助)提供安装版本、完整提示及去除秘密信息后的文件/作业标识。

## Windows 本地数据重置 {/* #windows-data-reset */}

只有明确打算丢弃本地应用数据并从头开始时，才使用独立重置工具。**它会永久删除列出的数据和已保存凭据，不会修复或备份它们。** 先把需要保留的科研文件及备份复制到所有待清理目录之外；单纯重装应用会保留这些数据。

1. 从[官方重置说明](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md)分别通过 **Download raw file** 下载 `reset-open-science.cmd` 和 `reset-open-science.ps1`，放在同一文件夹，且该文件夹不在应用数据目录内。
2. 退出 Open-Science 及托盘进程，完成并关闭代理、Notebook、无界面服务和 WSL 进程。使用平时运行应用的 Windows 账号，无需管理员模式。
3. 在下载文件夹中打开命令提示符，运行 `reset-open-science.cmd -Preview`，逐项检查计划清理的数据、配置、应用配置档案及运行缓存路径。预览不会删除数据。
4. 只有检查并备份这些位置后，才双击 `reset-open-science.cmd`。删除前必须准确输入 `RESET OPEN SCIENCE`，其他输入都会取消。
5. 阅读最终结果后再打开应用。重置完成后，需要重新选择数据位置、配置提供方并安装托管运行环境。

遇到正在运行或无法检查的进程、不安全路径等情况，应先处理提示中的原因，不要绕过拒绝。配置损坏或涉及自定义数据位置时，按照官方说明使用明确的 `-DataRoot` 参数。删除中途报错可能已清理部分文件，不能假定完全没有变化。工具不会撤销外部提供方账号，也不会删除独立安装的 Python/R 环境。

## 收集有效诊断

1. 记录版本、系统、Agent/模型、项目/会话与发生时间。
2. 复制首条相关工具错误及触发操作，说明预期与实际。
3. 输入问题提供公开来源、文件名、大小和校验和；最小可复现输入优于无关截图。
4. 必要时在 **Settings → General → Diagnostics** 用 **Open / Reveal** 打开运行日志。
5. 分享前去掉令牌、私有源内容和无关路径；打开日志不会自动发送。
6. 记录修改后原操作是否实际成功，按钮可用不是成功条件。

准确技术消息见[诊断参考](../reference/diagnostics.md)。

### 导出单个会话的诊断信息 {/* #session-diagnostics */}

1. 打开受影响的会话，选择页头 **Export diagnostics…**，或会话菜单 **Export → Export diagnostics…**。
2. 检查可选来源。**session.json** 和 **Session database records** 对应所选会话；**main.log** 及历史应用日志也可能包含其他会话的元数据，只在相关时选择。
3. 点击 **Export** 并选择本地保存位置，等待 **Diagnostics exported.**，使用 **Show in folder** 定位归档。
4. 分享前检查其中的清单与导出日志。缺失或损坏的来源可能只留下摘要或被省略，归档存在不代表每个来源都已完整收集。

![选择当前会话的诊断来源并准备本地导出](/img/open-science/v0330/session-diagnostics.webp)

常规元数据导出会排除隐私内容字段。若 .science 导出触发敏感内容检查，来源列表还可能出现已脱敏的扫描证据和触发检查的原始文件。**原始敏感文件默认不勾选，主动勾选会将原始字节写入诊断归档**；只选择确实需要的来源，分享前检查归档和截图。导出仅保存在本地，不自动上传或发送给模型。这是诊断证据，不是研究备份；研究交接应使用 [.science 研究包](research-packages.md)。

## 提交问题或向社区求助

| 需要什么帮助 | 对应渠道 |
| --- | --- |
| 不确定如何设置，或想了解某条报错 | [加入 AIPOCH Official Discord](https://discord.gg/zxQAYjReRv)，说明操作、版本和错误 |
| 可复现的应用故障，需要跟踪修复 | 先搜索[已有 Issue](https://github.com/aipoch/open-science/issues)，再填写 [Bug report](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml) |
| 新功能或改进建议 | 提交[功能建议](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml)，说明希望解决的研究任务 |

### 向 GitHub 提交有效反馈

1. 用错误码或有辨识度的报错文字搜索已有 Issue。同一问题已存在时，在原 Issue 补充复现信息。
2. 登录 GitHub，打开 **Bug report**。标题可参考 `[Bug]: database_open_failed when reopening a project`，替换为实际错误。
3. 填写 **What happened?**（发生了什么）、**Steps to reproduce**（复现步骤）、**Operating system** 和 **App version**。涉及模型时补充 **Provider / model** 及当前 Agent 框架。
4. 在 **Relevant logs or screenshots** 提供首条报错和少量上下文。问题依赖输入数据时，附公开或最小复现样本。
5. 检查内容后提交，保留 Issue 链接，并在原 Issue 回复后续检查结果。如果当前账号没有创建 Issue 的入口，可在 Discord 求助确认反馈渠道。

准备 Issue 或 Discord 提问时，可复制以下清单：

```text
Open-Science 版本与安装方式：
操作系统与芯片架构：
Agent 框架 / Provider / 模型（如相关）：
页面与操作：
复现步骤：
预期结果：
实际结果：
完整错误码与报错文本：
发生时间与时区：
公开或最小复现输入（如需要）：
已尝试的方法及结果：
相关日志片段或截图：
```

远程故障另附执行模式、应用 job ID、有则提供调度器 job ID、退出码及相关 stdout/stderr。私有主机使用中性别名。不要提交密码、令牌、SSH 私钥、患者数据或完整私有研究目录；以去除敏感内容的最小样本复现。

<span id="从启动错误界面反馈" />

### 从错误提示准备反馈

点击会话错误旁的 **Report this error**。启动页也可能提供 **Still stuck? Create an issue for help** 入口。

1. 检查 **Error details**，分享前去掉私有路径、标识符和敏感输入。
2. 核对 **Also included** 中的应用版本、操作系统、Agent 框架、提供方/模型和运行时版本。
3. **Copy details** 复制编辑后的错误文字和环境信息。**Reveal log file** 定位本机运行日志；日志不会自动附加，分享前需要另外检查。
4. 勾选公开分享确认，启用 **Open GitHub issue**。修改错误文字后，需要重新阅读并确认更新后的内容。
5. 打开 GitHub 表单，检查预填字段，补充有效的复现步骤，准备好后再提交。仅打开报告预览不会提交 Issue。

![可编辑的错误详情及公开分享确认](/img/open-science/sept11-completion/report-preview.webp)

## 常见问题

**所有操作都要模型账号吗？** 不需要。浏览本地文件、整理及很多设置无需模型；Agent 回答、计划与模型审查需要兼容接入。

**本地存储表示全部处理留在电脑吗？** 不表示。使用配置模型/服务时，选中的请求、文件或检索内容可能发送给它。本地保存位置与模型运行位置不同。

**能离线使用吗？** 已有本地文件和本地视图可继续使用；托管模型、在线数据库及缺失包下载需要对应连接。本地端点也需要服务正在运行。

**Usage 是账单或订阅余额吗？** 不是。它展示可用遥测，缺失不等于零；服务计费和额度另行管理。

**恢复归档会重跑吗？** 不会，只恢复保留工作入口。内核与失败操作可能还需显式重启/重跑。

**SSH 测试成功就能运行分析吗？** 不能据此判断。还要检查执行模式、调度权限、运行环境和资源请求，再运行小任务并检查输出。见[远程计算](remote-compute.md)。

源码：[队列恢复提示](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx)、[PDF 批量处理](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx)、[集合冲突](https://github.com/aipoch/open-science/commit/dbb9560a)、[Windows 安装程序](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh)。

源码：[缺陷表单字段](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml)、[启动反馈弹窗](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx)。
