---
sidebar_position: 9
title: Remote control 与 Archived
last_update:
  date: '2026-08-13'
---

# Remote control 与 Archived

## Remote control

![Remote control 面板](/img/open-science/settings-remote-control.png)

Remote control 让浏览器访问正在运行的 Open Science。入口受短期 token/配对与本机进程保护；它不是把整个数据目录发布成公开网站。

主要区域与控制：

- Local/Browser access 状态：Start/Stop/Refresh（按当前状态显示）。
- `Browser link is ready`：`Copy` 复制访问 URL，`Open` 在浏览器打开；QR `Scan to open` 供另一设备访问。
- 访问步骤：保持桌面应用运行、确认网络/服务可达、在新设备完成配对。
- Remote.It：检测用户自行安装的 desktop CLI，进行 Setup/Retry/Disconnect 等；Open Science 不捆绑、不注册第三方账号。
- `Trusted browsers`：显示 browser、platform、Last used；`Revoke <browser>` 使其下次请求/WebSocket 重连失效。
- `Pairing requests (n)`：核对浏览器、平台、地址和六位 code，选择 `Reject`、`Allow once`、`Always trust this browser`。

不要把带 token 的访问 URL 发到公开频道。永久信任只适用于你控制的设备；设备丢失后立即 Revoke，并停止/重新建立远程入口。

## Archived

![Archived 面板](/img/open-science/settings-archived.png)

归档页分 Projects 与单独归档 Sessions。项目行显示归档时间与 `Manage`；进入后列出项目 Sessions。

| 控件 | 行为 |
| --- | --- |
| 项目行/`Manage` | 打开归档项目详情 |
| `Restore project` | 恢复项目；其被项目隐藏的 sessions 随之可见 |
| `Delete project` | 确认后永久删除项目及相关 session 记录 |
| `Restore` session | 恢复单独归档 session；项目仍归档时禁用并提示先恢复项目 |
| `Delete` session | 确认后永久删除该 session |

归档是整理，删除是不可逆清理。删除对话框显示 session 数量/目标名称；确认前下载 artifact 和 Notebook。
