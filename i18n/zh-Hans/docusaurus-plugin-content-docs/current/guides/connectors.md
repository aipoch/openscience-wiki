---
title: "连接器与凭据"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 连接器与凭据

Connector 让服务工具可供 Agent 使用，Credential 在服务要求时提供认证。安装 Skill 或分配标签不等于连接服务。

批量管理时，先在底部操作区核对选中数量，再执行操作。在同一位置阅读完成或失败反馈，并检查条目的最终状态；仅选中条目不会启用、安装或删除它。

## 使用内置 Connector

### 为基因表达项目寻找工具

打开 **Settings → Connectors**，搜索 **Omics Archives** 并进入详情。该内置分类包含 GEO、ArrayExpress、MetaboLights、MGnify 和 PRIDE，使用前展开工具说明。

![GEO 元数据工具及明确的下载边界](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` 返回 GEO 系列元数据、样本、平台及补充文件 URL。需要计算时，从返回的来源下载数据表，再将其附加到项目。

为 Omics Archives 分配 **Transcriptomics** 标签后，可通过 **Settings → Tags → Transcriptomics → Search tagged resources: Omics** 找到它。标签只帮助整理与导航，不改变服务访问和审批。

| 状态 | 证明什么 | 后续检查 |
| --- | --- | --- |
| Directory 中存在 | 应用知道该定义 | 阅读具体工具说明 |
| Used by | Agent 可用范围 | 核对角色和能力绑定 |
| 已选 Credential | 存在命名绑定 | 对目标服务验证认证 |
| 工具策略 | 允许、询问或阻止调用 | 检查记忆权限优先级 |
| 工具实际成功 | 这次调用完成 | 核对返回标识符、数据与来源 |

### 内置 Connector 控件实操

**Search connectors** 搜索 PubMed 后在 **Directory** 组找到结果；列表还包含 **Featured**、**Custom**。搜索按组显示结果，因此其他分组可能显示 **No connectors match your search**，下方仍有匹配项。

组合使用 **Filter connectors by group**、**Filter Connectors by agent**、**Filter by Tag** 和搜索。**Manage credentials** 打开共享的联系邮箱与凭证设置。**Used by** 显示关联的代理；**Manage Tags** 用于整理标签。使用资源旁的 **Manage access** 统一查看和调整 Main Agent 与 Specialist 的访问。

#### 按代理管理资源访问 {/* #resource-access */}

1. 在 **Settings → Connectors** 找到 Connector，打开它的 **Manage access** 控件。
2. 查看 **Main Agent** 和列出的 Specialist；列表支持搜索时，可按角色名称筛选。只调整所需关联；角色编辑器仍可管理该角色的能力列表。
3. 重新打开弹窗并检查 **Used by**。已禁用的 Specialist 仍可能保留绑定；分配资源不会启用该角色。

![分别查看 Main Agent 和各 Specialist 的 Connector 访问](/img/open-science/v0330/resource-access.webp)

对于开启 **Full access** 的角色，排除该 Connector 会形成单项例外；选择访问模式使用明确的资源列表。市场角色的绑定在这里可能只读。凭证、服务就绪状态和操作批准与这些关联分开管理，分配 Connector 不会完成这些步骤。

#### 批量启用或禁用 Connectors

打开 **Settings → Connectors**，筛选列表，在相应组选择 **Select multiple** 并勾选需要操作的 Connector。启用或禁用前检查选中数量，完成后核对各项状态，只保留当前工作需要的服务。批量切换可用性不会补充凭据、更改各工具的审批策略，也不会授予 Specialist 访问权限，这些设置需分别配置。

#### PubMed：可用性、工具与审批

1. 搜索 **PubMed** 并打开详情。
2. 展开 **search_articles** 阅读说明。它返回匹配总数及一页 PMID，支持 PubMed 字段标签、布尔运算、日期和排序。
3. 根据所需访问范围选择 **Require approval**、**Block** 或 **Always allow**。Require approval 显示 **Ask when no Session, Project, or Global permission applies.**，即没有适用的已记忆权限时才询问。
4. 通过 **Manage access** 为 PubMed 启用 **Main Agent**，再检查 **Used by**。在同一弹窗中单独核对需要使用它的 Specialist。

![PubMed 工具说明与审批控件](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

详情列出 `search_articles`、`get_article_metadata`、`find_related_articles`、`lookup_article_by_citation`、`convert_article_ids`、`get_full_text_article` 和 `get_copyright_status`。每个工具可设为 **Always allow / Require approval / Block**。Connector 整体的 **Skip approvals** 是另一项设置，启用前先确认范围；打开描述只会查看工具说明。

列表将 PubMed 放在 **Directory**，详情却显示 **Featured** 标签；分类标签不代表账号连接状态。

<ToolOperationGroup>
<summary>实际运行一次 GEO 元数据查询</summary>

### 实际运行一次 GEO 元数据查询

<p className="example-label"><strong>案例演示</strong> 查询 GSE60450 的 GEO 样本信息</p>

1. 返回研究会话，确认模型可用且 Omics Archives 已提供给 Agent。
2. 请求：`Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. 授权前核对 Connector、方法和参数。该工具要求 `accessions` 数组，猜测的单数参数名不正确。
4. 检查实际结果：本例返回 **GSE60450**、**Mus musculus**、**12 个样本**，系列标题为 “Transcriptome analysis of luminal and basal cell subpopulations in the lactating versus pregnant mammary gland”。
5. 保留 GSM 编号及其特征，不凭名称相似就推断与矩阵 MCL1 列名的对应。

![Connector 实际返回的 GEO 样本特征](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

返回编号范围 **GSM1480291–GSM1480302**，包含 luminal/basal 细胞群及 virgin、18.5-day pregnancy、2-day lactation 阶段。这些来自元数据，不是从总计数推断。十二行回答表格实际下载为 <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a>；它是对话表格导出，与托管质控产物分开。

如果 Connector 说明文件无法读取，请保留 EPERM 报错并检查已启用连接与当前会话。重试前在[Connector 参数](../reference/connector-operations.md)核对字段。元数据查询返回结构化记录，不会自动下载底层数据表或执行分析。


</ToolOperationGroup>

## Add connector：共同身份字段

**Add connector** 提供 **Local command**、**Remote server**、**Import configuration**。前两项进入可切换类型的编辑器，**Advanced settings** 展开更多字段。保存前填写真实可用的命令或服务地址。

| 字段 | 作用 |
| --- | --- |
| Connector type | 在本地进程与远程端点之间切换 |
| Display name | 界面显示的名称 |
| Advanced → Connector name | 用于 `host.mcp`、Specialist 绑定及自动生成 MCP Skill 的调用名，尽可能根据显示名生成 |
| Connector ID | 可选稳定标识，尽可能自动生成；创建前可改，创建后不可变 |
| Description | 可选的数据与操作说明 |
| I trust this connector | 添加自定义 Connector 前必需的信任勾选；勾选不等于服务验证成功或代码安全 |
| Cancel / Back to connectors | 离开表单，放弃未保存的草稿 |
| Add connector / Add and sign in | 保存有效配置，OAuth 会进入登录；必填项、绑定或信任缺失时禁用 |

### Local command

**Command** 提供 `npx — Node package`、`uvx — Python (uv)`、`node — script file`、`python3 — script file`、`docker — container`、**Other…**。Other 展开 **Custom command**，填写可执行文件的绝对路径。

| 高级输入 | 操作 |
| --- | --- |
| Arguments | 每行一个参数，空格与空行都会保留；清空字段删除全部参数，不应认为一行以空格分隔的 shell 命令会自动拆分 |
| Variable name | 输入环境变量名，然后选择或创建对应 Credential |
| Add variable / Remove variable | 增加或移除命名绑定 |
| Fields / Text | 按行编辑，或每行输入一个 `KEY=`；密钥值保存在 Credentials |
| 命令预览 | 检查绑定区域之后显示的启动器 |

![本地命令与环境变量凭据绑定](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

选择启动器前确认对应可执行文件、包、容器或服务已安装。下方示例说明如何导入并验证本地 MCP 连接。

### Remote server

**Server URL** 应使用服务方提供的真实地址。截图中的 `https://example.org/mcp` 是保留示例域名，不是可用 MCP 服务。

**Advanced → Transport** 默认 **Streamable HTTP**；**Authentication** 可选 **None**、**OAuth (browser sign-in)**、**Static headers**。

#### Static headers

当前编辑器绑定命名凭据，并非直接粘贴密钥的普通文本框。

1. 选择 **Static headers**。
2. 填写 **Header name**，例如 `Authorization`。
3. 选择或创建对应 **Credential**，名称为空时选择器禁用。
4. **Add header** 增加一行，**Remove header** 移除一行。
5. **Fields / Text** 切换名称录入方式；Text 每行以 `Name:` 填写一个请求头名称，值由 Credentials 单独管理。

![请求头名称与凭据选择器](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth 绑定

选择与资源 URL、传输方式和注册配置匹配的 **OAuth credential**。**New credential** 打开[凭据编辑器](../tools/credentials.md)。当前空配置实际提示 **No OAuth credential matches this Connector's resource URL, transport, and registration.**，底部操作变为 **Add and sign in**。

![OAuth 凭据匹配](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## 导入、导出与连接验证

已有 MCP 客户端配置时，选择 **Add connector → Import configuration**，选取一个不超过 256 KB 的 JSON 文件。支持 Open-Science Connector 配置及包含 `mcpServers` 的客户端配置。

1. 多服务文件会显示 **MCP server** 下拉框。一次只审查、添加一个服务；切换后核对名称、ID、传输方式和启动参数。
2. 查看诊断。本机绝对路径需要在另一台电脑上调整；文件中的凭据值不会自动导入。
3. 点击 **Use configuration** 进入预填表单。导入尚未完成：仍需核对字段、选择本机凭据并勾选 **I trust this connector**。
4. 点击 **Add connector**，返回列表检查连接状态，再实际调用一个只读工具。

![多服务配置的条目选择与凭据提示](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

导入的服务引用 `QC_EXAMPLE_TOKEN` 等环境变量时，将该名称绑定到本机保存的凭据。必需绑定完成后才能 **Add**。添加后检查 **Connected** 并调用所需工具；保存绑定本身不能验证远程认证。

调用 `get_dataset_summary`，将返回的一个完整样本 ID 传给 `get_sample_qc`，再与 [QC 基准](../reference/example-data.md)比较。该服务返回已保存汇总值，不重新计算原始矩阵。服务实现见[创建自定义工具](../tools/custom.md)。

### 导出与重新导入

在 Connector 行的 **Actions → Export** 中选择 **Open Science Connector** 或 **MCP client config**，检查预览后点击 **Save configuration**。

![导出只保留凭据名称，并提示本机路径](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

实际导出的配置包含 `required_secrets.environment` 中的变量名，没有演示凭据值，也不包含本地信任与权限。重新导入仍需选择凭据并确认信任。

如果相同 ID 已存在，预览显示 **A custom Connector with ID … is already installed**，**Use configuration** 不可用。要修改现有连接，返回 **Edit**；不要把导入当作覆盖更新。

![重复 ID 阻止重新添加](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

恢复导出的连接时，检查预填字段并重新绑定所需命名凭据。完成信任确认，再用小型调用核对。导入不会覆盖相同 ID 的现有 Connector。

## 凭据：服务与可复用密钥

在[服务凭据](../tools/credentials.md)创建和管理密钥，再在环境变量、请求头或 OAuth 绑定中选择其名称。换设备后重新绑定并完成服务登录，再测试连接。导出文件包含配置引用，不包含可直接使用的秘密或本地信任。

## 查询 HTTP 报错

遇到 400、401、403、404、429 或 5xx 响应时，查看 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同时记录返回错误的服务与详细消息。
