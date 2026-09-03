---
sidebar_position: 4
title: Specialists
---

# Specialists

![Specialists 面板](/img/open-science/settings-specialists.png)

Specialist 是可复用的专家角色：Identity + Instructions + Capabilities。它可以被主 agent 选择，也可参与 delegation，但不能绕过用户权限。

## 列表与入口

- `Filter specialists by category` 与 `Search specialists` 缩小列表。
- 卡片点击打开详情；开关启用/禁用。
- `Actions for <name>` 提供 Edit、Export、Duplicate/Remove 等适用操作。
- Add 菜单可创建 Personal Specialist 或 `Import a Specialist package`。

## Specialist Editor

| 区域/输入 | 用途 |
| --- | --- |
| Identity → icon/color | 在选择器、消息和 subagent 行中的视觉身份 |
| Name | 唯一清晰的专家名，如 RNA-seq Reviewer |
| Description | 列表与 picker 的短说明 |
| Instructions | 追加的专业目标、流程和边界；空白时使用 base prompt |
| `Full access` | 允许访问所有可用 capability；谨慎开启 |
| `Capability type` | 选择 Skills、Connectors 等能力集合 |
| `Search skills to add` | 搜索并加入明确 Skill |
| `Search connectors to add` | 搜索并加入明确 Connector |
| `Enable select capabilities` | 使用选择清单而非全部能力 |

`Cancel` 放弃未保存编辑，`Save/Create` 写入。若出现 `Revision conflict`，应加载最新版本或有意识地解决冲突。

## 导入与导出

Import 选择 Specialist ZIP 后显示 package preview、Skills、Archive limits 和 Diagnostics；`Select ZIP`、重新选择、Cancel、Import 控制流程。导出可把专家配置和允许的资源打包；秘密和机器专属凭据不应进入共享包。删除前会显示该 Specialist 的引用/影响，active specialist 可能需要先切换。
