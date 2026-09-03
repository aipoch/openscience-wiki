---
sidebar_position: 1
title: 主页、项目与导航
---

# 主页、项目与导航

Open Science 的导航层级是 **主页 → 项目 → 会话**。项目保存长期上下文和文件；会话保存某次对话、执行、Notebook、权限事件与 artifact 版本。

## 工作区侧边栏

![空工作区](/img/open-science/workspace-empty.png)

| 控件 | 行为 |
| --- | --- |
| `All projects` | 返回主页；未发送的草稿按当前 session 保存 |
| 项目名按钮 | 打开项目菜单/项目上下文入口 |
| `Collapse sidebar panel` | 收起左栏，为对话和预览腾出空间；再次点击展开 |
| `New` | 新建空 session；不会删除或覆盖当前 session |
| `Customize` | 以定制意图启动对话，用于创建/修改 Skill 或 Specialist |
| `Files` | 打开/关闭右侧项目文件面板 |
| Session 行 | 切换会话；状态可为 Idle、Running、Waiting for permission 等 |
| Session `…` | Pin、Rename、View notebook、Archive、Delete |
| `Messages` | 打开通知中心；角标是未读数量 |
| `Settings` | 打开设置中心 |
| GitHub 星标 | 在浏览器打开官方仓库 |

分隔条 `Resize left panel` 与 `Resize right panel` 可拖动；右边缘 `Collapse/Expand preview panel` 单独控制预览区。窄屏下同样内容会转为抽屉或 sheet。

## Session 状态与操作

![Session 操作菜单](/img/open-science/session-actions-menu.png)

- `Pin`：固定在 Active 列表前部；再次操作可取消固定。
- `Rename…`：打开名称输入框；确认后只修改显示名，不改变消息。
- `View notebook`：打开本会话的 Python、R、shell 执行集合。
- `Archive`：从 Active 移至 Settings → Archived，可恢复。
- `Delete`：永久删除前弹出确认；运行中或有待处理权限时可能不可用。

切换项目/会话前，Open Science 会协调正在运行的 agent、草稿和待确认操作。若看到 Pending switch 或 interrupted 提示，应先处理权限/计划或确认中止。

## 搜索与通知

全局 Search 可匹配项目、session 和文件。选择结果会跳到所属项目或打开文件预览。输入为空时显示最近项；`Esc` 关闭。通知中心汇总完成、权限、失败和后台任务消息；单项可进入关联 session，顶部操作可处理已读状态。
