---
title: "权限与控制"
last_update:
  date: '2026-09-28'
---

# 权限与控制

本页用于判断哪个规则导致了权限决定。权限卡处理和撤销步骤见[权限与审批](../guides/approval-modes.md)。

## 权限层次

| 层次 | 值或范围 | 控制内容 |
| --- | --- | --- |
| 会话权限模式 | `ask`、`auto`、`full` | 当前会话中代理的审批行为 |
| 选定模式与实际生效模式 | 取决于运行时 | 框架可能无法提供所选模式要求的全部能力，应阅读解释 |
| 记住的能力授权 | 会话、项目、全局 | 对应能力和限定条件匹配的后续调用 |
| Connector 工具策略 | Always allow、Ask each time、Block | 指定工具；Block 会在查询授权记录之前拒绝调用 |
| 文件系统访问 | 指定路径和访问模式 | 操作可以访问哪些外部位置 |
| Notebook 网络策略 | 允许的目标和连接检查 | 运行时能否连接请求的目标 |
| Specialist 能力 | 分配的 Skills 和 Connectors | 该角色可使用的能力 |

这些层次不能互相替代。Full access 改变代理是否询问，并不会安装工具、提供凭据、让服务器变得可达，也不能证明运行时的网络保护允许该连接。

## 模式与授权范围

| 界面值 | 接口值 | 含义 |
| --- | --- | --- |
| **Ask for approval** / **Ask** | `ask` | 对需要审批的操作询问，同时遵守已有授权及应用自身的特定例外 |
| **Auto-approve edits** / **Auto** | `auto` | 支持的工作区编辑和应用识别的内置文献库操作可自动通过；不代表任意命令或 MCP 请求都被允许，见[文献库规则](../guides/approval-modes.md#library-auto) |
| **Full access** | `full` | 在运行时支持的范围内，无需手动提示即可允许代理权限请求 |
| **Once** | `once` | 仅当前调用，不保存长期授权 |
| **This conversation** | `session` | 当前会话中匹配的调用，重启后仍保留 |
| **This project** | `project` | 当前项目中匹配的调用，需要较宽范围确认 |
| **Global** | `global` | 跨项目匹配的调用，需要较宽范围确认 |

权限卡只提供当前请求支持的范围。通常优先选会话范围，其次是本次。请阅读完整按钮标签，不能根据位置判断是“一次”。命令前缀或类别限定的覆盖面，可能比重复一次完全相同的调用更大。

**Default permission mode** 只影响新会话，已有会话保留自己的设置。**Auto-review** 是单独的结果审核选项，不等于 `auto` 权限模式。

## Connector 的判断顺序

Connector 授权处理顺序如下：

1. 工具匹配 **Block** 时拒绝。
2. 否则应用 Connector 的允许／询问配置。Connector 级自动允许记录可以放行；要求审批的工具进入下一步。
3. 根据能力及当前项目、会话查询匹配的已保存授权。
4. 没有匹配授权时，显示支持的范围；无法审批或用户拒绝时，调用失败。
5. 在释放操作前保存需要记住的授权；调用方明确将保存延迟到自己的授权步骤时除外。

已有授权不能覆盖 **Block**。反过来，撤销一条授权后，如果允许策略或更宽范围仍然覆盖该调用，也可能不会出现提示。应查看界面中的策略和覆盖说明。

## 默认全局授权

源码定义了 20 项基线授权。这个数字是当前版本的默认集合，不是每个用户的界面都应显示的数量。

| 分类 | 默认能力 | 数量 |
| --- | --- | ---: |
| 自定义能力 | 创建／更新 Specialist；发布／编辑 Skill；为 Specialist 添加／移除 Skills 和 Connectors | 8 |
| Skills | 调用 Skill | 1 |
| 文献读取 | `read_document` | 1 |
| Notebook 检查 | 列出运行时、读取状态、列出 Memory 分类、检索记忆、检查包 | 5 |
| 计划进度 | `update_step_status` | 1 |
| 文献库 | 检索、读取摘要、读取 PDF、格式化参考文献 | 4 |

默认授权中包含自定义能力的写入，不能统称为“只读权限”。**Restore defaults** 只补回缺少的基线全局授权，保留其他授权，不会重置所有权限设置或撤销已经完成的操作。

列表外还有应用自身的特定例外：通过准确的产物能力保存已有或内联结果、显示交互问题、声明活动组时，可以不再显示额外权限卡。这些例外依赖经过核实的工具身份，而不是听起来安全的工具标题。

## 撤销与不完整状态

| 现象 | 含义 |
| --- | --- |
| 行提示仍被全局或项目授权覆盖 | 删除较窄授权后，更宽的权限仍生效 |
| 策略提示被阻止 | 即使有授权记录，策略仍禁止调用 |
| 存储不完整警告 | 可见列表可能不是全部授权；完整集合未知时禁用批量撤销 |
| 版本已过期或记录不存在 | 其他修改使该行失效，应刷新并检查当前状态 |
| Undo 提示 | 在界面提供的有效期内恢复对应撤销；不会逆转工具已经产生的影响 |

技术参考：[模式定义](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/permission-profiles.ts) · [Connector 授权处理](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/connector-broker.ts) · [默认授权](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/defaults.ts) · [代理策略](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/acp/permission-policy.ts).
