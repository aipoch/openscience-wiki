---
title: "权限与审批"
last_update:
  date: '2026-09-28'
---

# 权限与审批

通过 **Agent controls** 选择当前会话如何请求审批。通过 **Settings → Permissions** 设置新会话默认值、检查记住的访问权限。这两项操作分别生效：修改默认值不会重置已有会话，也不会撤销其授权。

<span id="安全判断顺序" />

<span id="权限请求" />

<span id="plan-first" />

<span id="活动行" />

## 选择会话模式

| 模式 | 适用情况 | 预期行为 |
| --- | --- | --- |
| **Ask for approval** | 希望检查请求执行的操作 | 对没有适用授权或例外的动作显示权限卡 |
| **Auto-approve edits** | 允许工作区内的常规修改 | 支持的编辑自动通过；命令、网络和 MCP 操作仍可能需要审批 |
| **Full access** | 已决定允许代理无需提示执行操作 | 命令、文件修改、网络请求可以不经手动权限卡；其他访问及服务条件仍然存在 |

打开输入框旁的 **Agent controls**，阅读当前模式和框架兼容性说明。Full access 控件有自己的确认流程。**Auto-review** 是另一个结果审核选项，不表示自动批准编辑。

![实际英文权限模式选择器](/img/open-science/walkthrough-2026-09-08/57-permission-modes.webp)

检查当前 Agent 显示的实际模式，不同框架支持的审批行为可能不同。选择前阅读当前模式的说明。

## 阅读权限卡

批准前核对操作、选定环境与代码。数据检查应读取指定输入并写入所需结果；安装缺失依赖属于另一项操作，需要单独检查其目的和影响。

![公开 GSE60450 案例中的 Python 执行授权](/img/open-science/guides-walkthrough/25-python-permission.webp)

| 控件或信息 | 检查内容或操作 |
| --- | --- |
| 工具标题和摘要 | 确认实际操作、目标和来源 |
| 可展开的代码或参数 | 检查路径、运行时、包名或服务输入 |
| **Authorization scope** 箭头 | 在当前请求支持的范围中选择 |
| **Allow once** | 仅放行本次调用 |
| **Allow for this conversation** | 记住当前会话的匹配调用，重启后仍保留 |
| **Allow for this project** | 为整个项目保存匹配授权，并确认较宽范围 |
| **Allow globally** | 跨项目保存匹配授权，并确认较宽范围 |
| **Deny** | 拒绝当前操作；选择替代方案前检查返回结果 |
| 提供方附加选项（如有） | 阅读实际标签和作用；不同请求的选项可能不同 |

请求支持时，主 Allow 按钮通常使用会话范围，请先看完整标签。命令前缀授权还应检查界面显示的前缀，后续以前缀开头的命令也可能匹配。授权某个运行时不等于授权无关的外部服务。

### 记住网页读取授权

遇到支持该范围的 **Read web pages** 请求时，可选择 **Allow for this conversation**，让同一会话后续的网页读取复用授权。这项授权可覆盖其他网站，并非只允许第一个 URL；**Allow once** 仅批准当前调用。可在 **Remembered permissions** 中查看或撤销，它不会向 Notebook 网络白名单添加域名，也不代表允许上传。

### 记住网页搜索授权 {/* #remember-web-search */}

从 v0.30.2 起，受支持的 Claude Agent 原生 **Search the web** 请求也可选择 **Allow for this conversation**。同一会话后续符合条件的搜索可以复用授权；**Allow once** 只批准当前请求。在 **Remembered permissions** 中查看或撤销 **Search the web**。搜索与 **Read web pages** 是两项独立权限；此原生搜索选项并非所有框架或 Connector 都支持，应以实际提供的范围为准。

## 管理记住的权限

打开 **Settings → Permissions → Remembered permissions**，按 **All**、**Global**、**Project** 或 **Session** 筛选。每行显示能力、范围、限定条件和更宽范围覆盖。会话链接打开对应会话；Connector 策略提示进入相关配置。

| 操作 | 结果 |
| --- | --- |
| 单行 **Revoke** | 立即删除该条记住的授权，注意查看 Undo 提示 |
| 分组 **Revoke all** | 请求撤销该组授权；使用前先确认显示的范围完整 |
| **Restore defaults** | 补回缺少的基线全局授权，保留其他授权 |
| **Defaults restored** | 基线授权已齐全，恢复按钮禁用 |
| 范围筛选 | 只改变显示行，不会增加或撤销授权 |

点击 **Revoke** 撤销目标授权。误操作时，在 **Undo** 仍可用期间撤回。**Restore defaults** 只补回缺少的默认授权，不会恢复所有曾被移除的授权。

### 判断已保存授权的实际范围

撤销授权前，核对 Connector/工具、**Global / Project / Session** 范围及 **Any call / Specific input / Command group** 限定。命令组还可显示批准摘要和日期。

**Blocked in Connectors; this permission is currently inactive** 表示已存授权不能覆盖 Connector 的禁止策略。**Allowed by Connector policy even without this permission** 表示仅撤销该授权不会取消策略层面的允许。可打开对应 Connector 检查规则。误撤销时，在 **Undo** 仍可用期间撤回，再检查恢复状态。

### 撤销当前范围的一组权限

1. 筛选目标范围，例如 **Session**。
2. 点击该组的 **Revoke all**。
3. 确认该组已清空，其他范围的授权仍保留。
4. 下次执行相同操作时，阅读新出现的审批请求再决定是否继续。

撤销影响后续审批，不会逆转已完成的编辑或网络请求；更宽范围的授权仍可能允许该操作。

![撤销会话分组后重新出现执行授权](/img/open-science/local-todo-batch/40-permission-request-renewed.webp)

权限清单不完整时，先等待加载或重试失败请求，再执行分组撤销；完成后重新检查所选范围。

## 排查不符合预期的行为

| 故障 | 检查与处理 |
| --- | --- |
| Ask 模式没有弹卡 | 检查记住的授权、工具策略和应用自身的特定例外。Ask 并不要求每次读取、保存产物或交互提问都弹卡。[权限参考](../reference/permissions.md)列出了基线授权，其中包括自定义能力写入 |
| 撤销后同一操作仍能执行 | 查找更宽的项目／全局授权或允许策略。删除一条会话授权不会删除其全局覆盖 |
| 已经允许，操作仍失败 | 批准只允许尝试。缺包、文件不可访问、凭据无效或网络目标被拒绝时，应先处理报错指出的原因，再重试。DNS 和包下载问题见[网络设置](network.md) |
| 缺少某种范围 | 卡片只显示当前请求和项目／会话上下文支持的范围。不要仅为了弥补较窄范围不可用而改用更宽授权 |

实现依据：[授权显示与撤销](https://github.com/aipoch/open-science/commit/469b593b)。

## Auto 模式下的文献库操作 {/* #library-auto */}

使用 **Auto-approve edits** 时，应用内置的一组文献库操作可自动通过本次代理批准，包括查询和阅读文献、保存到 Inbox、获取 PDF、格式化引文与准备引用文档。这样可以减少日常整理文献时的重复提示。

该规则只适用于应用识别的内置文献工具，不表示所有 MCP、命令或网络操作都自动允许；工具本身的文件、网络和资源规则仍然适用。它也不会创建一条永久授权。需要逐项检查代理请求时，选择 **Ask for approval**；文献进入 Inbox 后仍应审核再接受。
