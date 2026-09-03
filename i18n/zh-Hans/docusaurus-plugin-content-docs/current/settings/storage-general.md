---
sidebar_position: 8
title: Storage 与 General
---

# Storage 与 General

## Storage（存储）

![Storage 面板](/img/open-science/settings-storage.png)

`Application storage` 检查私有配置目录写权限，提供 `Reveal` 在文件管理器中显示、Repair/Continue 等状态相关操作。该目录与可选择的 Data location 不同。

`Data location` 显示 `Data root path`：

- `Change` 打开风险说明。
- 输入 `/path/to/new/location` 或 `Browse` 选择目录。
- 界面检查目标、现有 Open Science 数据、磁盘空间和访问权限。
- `Move/Migrate` 启动迁移；进度显示当前路径、elapsed，可在允许阶段 Cancel。
- 冲突时可采用现有数据（Adopt）或选择其他目录；只在确认它是完整 Open Science root 时 Adopt。
- `Cancel` 放弃新路径草稿。

迁移失败会提供 Retry/Restart/Discard 等与当前阶段相符的恢复操作。迁移进行中不要退出应用、拔盘或手工搬数据库。

`Disk usage` 按 Projects、Artifacts、Caches/其他类别显示大小，可展开子项。这里用于定位占用，不应把系统文件管理器的删除当成应用内清理。

## General（常规）

![General 面板](/img/open-science/settings-general.png)

| 区域 | 控件 |
| --- | --- |
| Notifications | `Toggle task notifications` 控制任务完成等系统通知 |
| Theme | System、Light、Dark 单选；与主页 Theme 菜单同步 |
| App icon | 支持的平台显示内置图标单选；某些 Linux 环境隐藏 |
| Window behavior | `When closing the window` 选择退出或保留后台/托盘行为，依平台可用 |
| GitHub token | 打开 token settings，输入/保存/清除；用于需要 GitHub 鉴权的功能 |
| About | 当前版本；`Check for updates`、下载/安装更新等依构建渠道显示 |

主题和通知即时生效。GitHub token 以秘密保存，不会注入普通项目文件；清除后依赖它的私有仓库/限额能力会失效。
