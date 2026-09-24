---
sidebar_position: 1
title: 设置中心总览
last_update:
  date: '2026-09-24'
---

# 设置中心总览

从工作区左下打开 **Settings**。17 个面板按用途分为 **Intelligence、Connections、Workspace、System** 四组，也可以通过顶部搜索定位。本教程中的 **Settings → Model** 等路径，指对应分组内的面板；例如 Model 位于 Intelligence 中。

| 全局控件 | 行为 |
| --- | --- |
| `Back` / `Forward` | 在设置主面板与 Detail/Add/Import 等子视图间导航 |
| 面包屑返回 | 从子视图返回所在主面板 |
| `Maximize` / `Restore` | 在大对话框和全屏设置间切换 |
| `Close settings` | 返回原项目/session，不丢失已成功保存的设置 |
| `Dismiss settings error` | 关闭顶部错误提示；不会自动重试失败操作 |
| 移动端导航按钮 | 打开/关闭 Settings 导航抽屉 |

## 查找设置

1. 打开 Settings，点击顶部 **Search settings**。设置窗口处于活动状态时，macOS 的 **⌘K** 或 Windows/Linux 的 **Ctrl+K** 会聚焦此搜索框。
2. 输入面板名称或任务，例如 `Package mirror`、`Main model`、`Diagnostics`。
3. 用 **上/下方向键** 选择结果，按 **Enter** 或点击结果打开所属面板。面板会短暂高亮，再在其中找到对应设置。
4. 使用 **Back** 返回；清空查询后可以继续查找。面板自身的搜索用于筛选当前列表，不搜索全部设置。

搜索覆盖各面板中的代表性设置，不包含每个字段或研究文档。找不到某个词时，改用面板名称或下方导航分组。查找对话或文件，应关闭设置后使用[全局搜索](../guides/navigation.md)。

## 17 个主面板

| 分组 | 面板 | 管理内容 |
| --- | --- | --- |
| Intelligence | [Model](../guides/models.md) | 提供商与各任务场景的模型 |
|  | [Agent](../guides/frameworks.md) | 代理框架的安装、切换与修复 |
|  | [Skills](../skills/overview.md) | 可复用科研方法及其可用状态 |
|  | [Specialists](../specialists/overview.md) | 专家角色与能力访问 |
|  | [Memory](../guides/memory.md) | 按需启用的全局与项目记忆 |
| Connections | [Connectors](../guides/connectors.md) | 数据服务、自定义 MCP 连接及导入 |
|  | [Network](../guides/network.md) | 代理、软件包镜像与 Notebook 域名访问 |
|  | [Remote](../guides/remote-access.md) | 浏览器访问、配对与可信设备 |
|  | [Credentials](../tools/credentials.md) | 密钥、令牌、OAuth 与凭据恢复 |
| Workspace | [Tags](../guides/tags.md) | 标签与收藏排序 |
|  | [Permissions](../guides/approval-modes.md) | 默认模式与已保存授权 |
|  | [Runtimes](../guides/runtimes.md) | Python/R 环境与软件包 |
|  | [Storage](../guides/storage.md) | 数据位置、写入权限与磁盘用量 |
|  | [Compute](../guides/remote-compute.md) | 本地与 SSH 计算资源 |
|  | [Usage](../guides/usage.md) | Token、调用与研究活动统计 |
|  | [Archived](../guides/storage.md) | 恢复或永久删除归档内容 |
| System | [General](../guides/appearance.md) | 外观、通知、诊断与版本 |

**Feedback** 保留在设置底部，作为独立反馈入口。

:::info[保存方式]
部分开关即时保存；复杂表单使用 `Save/Add/Import`。操作中出现 `Saving…`、`Testing…`、`Installing…` 时不要关闭应用。涉及迁移、卸载、删除或宽权限会有二次确认。
:::

## 模型设置中的标签页 {/* #model-tabs */}

在 **Model** 内，**Conversation models** 管理提供方与任务模型，**Classification models** 配置可选的 Skill/Connector 选择服务，**Local parsing models** 管理本地解析资源。分类模型是模型设置中的标签页，不是新增的顶层设置面板。详见[分类模型配置](../guides/models.md#classification-models)。

页头搜索使用 **⌘K / Ctrl+K**。当前面板或对话框内有局部搜索框时，使用 **⌘⌥K / Ctrl+Alt+K** 聚焦该框，见[搜索快捷键](../guides/shortcuts.md#local-settings-search)。
