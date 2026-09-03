---
sidebar_position: 1
title: 设置中心总览
---

# 设置中心总览

从工作区左下 `Settings` 打开。左侧导航分为 Capabilities、Workspace、Remote access 与 Archived；顶部提供浏览历史、最大化和关闭。

| 全局控件 | 行为 |
| --- | --- |
| `Back` / `Forward` | 在设置主面板与 Detail/Add/Import 等子视图间导航 |
| 面包屑返回 | 从子视图返回所在主面板 |
| `Maximize` / `Restore` | 在大对话框和全屏设置间切换 |
| `Close settings` | 返回原项目/session，不丢失已成功保存的设置 |
| `Dismiss settings error` | 关闭顶部错误提示；不会自动重试失败操作 |
| 移动端导航按钮 | 打开/关闭 Settings 导航抽屉 |

![最大化的 Model 设置](/img/open-science/settings-model-maximized.png)

## 13 个主面板

| 分组 | 面板 | 管理内容 |
| --- | --- | --- |
| Capabilities | Skills | Skill 包、开关、搜索、导入/创建 |
|  | Connectors | 内置与自定义 MCP connector、OAuth、导入导出 |
|  | Specialists | 专家身份、提示词、Skills/Connectors 能力 |
|  | Compute | 本地/SSH 计算主机、资源、scratch、并发限制 |
|  | Network | 联网状态与 Conda/pip package mirror |
| Workspace | Model | Provider、active/subagent model、reasoning effort |
|  | Agent | OpenCode/Claude/Codex runtime 与切换/安装/修复 |
|  | Permissions | 默认模式与已持久化的 scope grants |
|  | Runtimes | Python/R 环境、包安装与环境管理 |
|  | Storage | 应用配置可写性、数据根目录迁移、磁盘占用 |
|  | General | 通知、主题、图标、关闭行为、GitHub token、版本 |
| Remote access | Remote control | 浏览器入口、配对、Remote.It、信任设备 |
| — | Archived | 恢复或永久删除归档项目/session |

:::info[保存方式]
部分开关即时保存；复杂表单使用 `Save/Add/Import`。操作中出现 `Saving…`、`Testing…`、`Installing…` 时不要关闭应用。涉及迁移、卸载、删除或宽权限会有二次确认。
:::
