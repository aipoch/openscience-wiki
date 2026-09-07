---
sidebar_position: 5
title: Compute 与 Network
last_update:
  date: '2026-09-07'
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

### Direct SSH 与 Slurm

每个 host 都有 `Execution mode`。**Direct SSH** 通过 SSH 连接直接启动 workload；**Slurm** 提交到集群调度器，并通过持久 job receipt 轮询、恢复、取消和清理。所选模式按 host 保存。

![SSH host 的 Slurm execution mode](/img/open-science/v0.26.0/compute-slurm-mode.png)

选择 Slurm 前，确认集群按需提供 `sbatch`、`squeue`、`sacct` 和 `scancel`，并核对登录节点规则、account/partition/QoS、wall time、scratch 路径、modules 与环境激活。可用 **Compute Environment Setup** Skill 生成该 host 的 setup/repair 指令，再与集群管理员一起审核。该 Skill 不会授予调度权限，不应直接照抄执行。

提交失败时展开 job activity 并保留 scheduler job ID；重试前检查 account/partition 规则和远程存储。尽量通过 Open Science 取消，使调度器状态与 staging-file cleanup 保持同步；恢复状态仍不确定时，用集群自身工具确认。

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

### 全局 proxy 与 runtime domain

Proxy 提供 System、Manual 与 Direct。Manual 会作用于 Electron 及之后启动的 agents、notebooks、compute helper 与 installer；含内嵌 credential 的 URL 会被拒绝，loopback 始终 bypass。Direct 会清除 child process 继承的 proxy 变量。修改后应测试 provider 与 package connectivity。

Notebook network domains 控制 Notebook 与 compute runtime 可访问的目标。对话中的 blocked-domain approval 需要核对；`Allow once` 只针对当前 command，`Always allow` 持久范围更大。Windows 会显示一次性管理员 sandbox setup 是否完成。这是 runtime boundary，不是整机 firewall。
