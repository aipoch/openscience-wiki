---
sidebar_position: 5
title: Compute 与 Network
---

# Compute 与 Network

## Compute（计算）

![Compute 面板](/img/open-science/settings-compute.png)

Compute 管理本地与 SSH 远程主机。列表显示状态、资源与默认/启用情况，`Add host` 打开连接表单，卡片进入详情，开关控制 agent 是否可选用。

Add form 通常包括 Display name、Host、Port、Username、认证方式/SSH 配置以及信任确认。保存后执行 probe；失败可 `Retry probe`。不要把私钥正文粘进普通说明字段，优先使用系统 SSH 配置/agent。

Host detail 提供：

- `Resources`：检测 CPU、内存、GPU/调度环境等。
- `Details`：查看、编辑、复制或删除连接配置。
- `Scratch root`：点击 Edit 后在 `Scratch root path` 填远程临时工作目录，Save/Cancel。
- `Concurrent job limit`：Edit 后输入正整数，限制同一主机并发任务，Save/Cancel。
- Probe/Refresh：重新检测在线状态与资源。
- Remove/Delete：确认后移除配置，不等于删除远程主机文件。

Agent 请求远程执行时会弹出 Compute approval：`Deny`、`Allow once`、`Allow for session`、project、global；项目/全局 scope 需要额外确认。长任务可以提交、跟踪、harvest 结果并把输出带回项目。

## Network（网络）

![Network 面板](/img/open-science/settings-network.png)

`Network status` 结合本机 link 和端到端探测显示 Checking、reachable、unreachable 或 offline；异常时 `Check again` 重试，并提示检查 Wi-Fi/网线、proxy/VPN/firewall 和 mirror。

### Package mirror

`Configure`/`Edit` 打开以下输入：

| 输入 | 示例/作用 |
| --- | --- |
| `Conda channel mirror` | Conda-forge 镜像根地址 |
| `Python package index (pip)` | 以 `/simple` 结尾的 pip index |
| `CA bundle path` | 可选 PEM，供企业 TLS proxy 的 Conda、pip、R 下载信任 |

`Cancel` 放弃草稿，`Save` 保存，`View available mirrors` 打开帮助链接。镜像只改变包下载来源，不是通用 Provider proxy；填写错误会导致 runtime/package 安装失败。
