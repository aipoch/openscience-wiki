---
title: "Skill、专家与 MCP 格式"
last_update:
  date: '2026-09-08'
---

# Skill、专家与 MCP 格式

Skill、Specialist 和 Connector 模板具有不同打包边界。本页集中列出字段与导入预算。导入前查看压缩包预览，导入后检查安装结果。

## Skill 文档和资源

Skill 根目录包含 `SKILL.md`，引用文件和脚本位于同一包根目录下。YAML 元数据之后是 Markdown 指令。

<p className="example-label"><strong>示例</strong> 最小 SKILL.md 文档</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

解析器分离 `name`、`description` 和其他元数据，规范换行并将标量元数据保留为字符串。发布包前检查导入/编辑器的校验结果。

| 内容 | 用途 | 边界 |
| --- | --- | --- |
| `name` | 稳定调用身份 | 与包引用保持一致 |
| `description` | 何时选择此 Skill | 不会自行执行 |
| Markdown 正文 | 调用后加载的指令 | 指令可用不代表外部依赖已存在 |
| 相对资源 | 脚本、模板、参考资料和数据 | 引用路径应符合包目录结构 |
| 根目录 `.source.json`、`.specialist-package.json` | 应用拥有的元数据 | 不计入用户内容预算，不自行编造或挪用 |

### Skill 导入预算

| 限制 | 数值 |
| --- | ---: |
| 单 Skill 文件数 | 16,384 |
| 单个解压文件 | 50 MiB |
| 单 Skill 解压总量 | 128 MiB |
| 单次预览原始 SKILL.md 总量 | 4 MiB |
| 目录深度 | 8 层 |
| 每次 GitHub 导入请求 | 512 |
| 内层 Skill 压缩包 | 64 MiB |
| 外层上传包 | 256 MiB |
| 每包 Skill 数 | 256 |
| 外层包条目 | 32,768 |

各预算作用层级不同。外层包合规，内部某个 Skill 仍可能超限。逐项检查候选诊断，不把部分导入视为全部成功。个人编辑器的引用文件额度为 SKILL.md 预留一个包条目。

[解析器](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts)、[导入限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts)。

## Specialist 包

可移植包包含 `manifest.json` 和 `specialist.json`。附带 Skill 位于 `skills/<skill-name>/<file>`，每个 Skill 根目录包含 `SKILL.md`，其 frontmatter 名称必须与目录名一致。

| 文件/字段 | 约束 |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | 包身份，贡献 ID 使用小写字母、数字和连字符，避开 `os-` / `mcp-` 保留前缀 |
| `version` | 语义版本 |
| `exported_with_app_version` | 导出应用版本 |
| `specialist.json → name` | 稳定 profile 名 |
| `display_name` | 可选展示名 |
| `description` | 角色描述 |
| `system_prompt` | 指令，包边界采用 snake_case |
| `skill_ids` | 非空 Skill 名称数组，不重复 |
| `connector_ids` | 非空 Connector 名称数组，不重复 |

未知或禁止字段会被拒绝。内存对象使用 camelCase（`systemPrompt`、`skillIds`、`connectorIds`），不要与可移植 JSON 拼写混淆。Connector 可移植名称在导入时解析为本机 ID，包引用不携带本机凭据。

| Specialist 压缩包限制 | 数值 |
| --- | ---: |
| 压缩大小 | 50 MiB |
| 解压总量 | 200 MiB |
| 文件数 | 2,000 |
| 单文件 | 25 MiB |
| 压缩比 | 1,000 |
| 路径深度 | 32 |

预览报告诊断、可安装状态和每个 Skill 的安装/复用/冲突/替换决定。覆盖需要明确确认，候选过期或状态变化后应重新预览，不能盲目重放旧 token。冲突需要明确选择已安装或传入版本。

导出使用期望修订和勾选的 Skill。删除也根据预览/修订执行，并保护内置、主代理启用、共享或被引用的 Skill。删除某个 Specialist 不等于删除其全部能力包。

[类型与预算](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts)、[包校验](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts)。

## Connector 模板与 MCP 客户端格式

Open-Science Connector 模板不是 MCP 客户端 `mcpServers` JSON 的同一种文档。

| 模板字段 | 约束 |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | 稳定自定义名，最多 64 字符，小写字母/数字/连字符，唯一且非内置保留名 |
| `display_name` | 展示标签 |
| `description` | 可选说明 |
| `transport` | `stdio`、`streamable_http` 或 `sse` |
| `command`、`args` | 本地 stdio 程序及参数数组 |
| `url` | 远程 HTTP/SSE 地址 |
| `required_secrets.environment` | stdio 环境秘密的名称，不是值 |
| `required_secrets.headers` | HTTP 秘密请求头名称，不是值 |
| `required_secrets.oauth_client_secret` | 是否需要在本地提供 OAuth client secret |
| `oauth` | 支持的注册、issuer、scope、client、redirect 元数据 |

传输类型有各自校验：远程传输不接受环境秘密要求；OAuth 不能与必需秘密请求头同时配置。预注册 client 需要 authorization server；client metadata 注册和明确 client ID 是两种模式。redirect/client-secret 元数据需要对应 client ID。

可移植导出拒绝 URL 或命令参数中的内嵌凭据。MCP 客户端格式使用 `mcpServers`，stdio 提供 `command`/`args`/`env`，远程提供 `type`/`url`/`headers`，秘密以占位符表示。OAuth 注册和 token 不包含在客户端格式中，导出会提示这一限制。

导入配置不等于安装外部服务器、登录服务或成功调用工具。通过应用补充凭据后，还需确认连接状态和实际公布的工具。

[模板解析及两种导出](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts)、[自定义身份](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts)。
