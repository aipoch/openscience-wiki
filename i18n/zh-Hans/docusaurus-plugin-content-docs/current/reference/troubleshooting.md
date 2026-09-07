---
sidebar_position: 5
title: 故障排查
last_update:
  date: '2026-08-13'
---

# 故障排查

## Agent 无法启动或会话停住

1. Settings → Agent 确认 Active runtime 为 Ready，并查看版本/Install log。
2. 必要时 `Repair`；若要卸载，先切换到另一个 runtime。
3. Settings → Model 对活动 Provider 执行 `Test connection`。
4. 检查 session 是否为 `Waiting for permission`、等待 Plan 或 elicitation。
5. 网络正常但 Provider 不通时检查 proxy/VPN/firewall 和 Base URL/API format。

## Provider 测试失败

- 核对 API key 是否属于该 endpoint/区域。
- Custom Base URL 与 API format 是否匹配；不要把 Chat Completions 当 Responses。
- Model ID 是否真实存在且账号有权限。
- 本地 mock/自签名服务需正确 CA；不要通过关闭 TLS 验证长期绕过。
- Context window、Images、Reasoning 声明不会修复认证失败。

## Python/R 或包安装失败

- Runtimes 中环境是否 Enabled 且 executable 仍存在。
- App-managed setup 是否完整；失败用 Retry/Repair。
- 用户环境安装必须打开 `Allow package install`。
- Network → Package mirror 与 CA bundle 是否正确。
- 安装后重启 kernel；不要混用 UI package manager 和 Notebook 内 pip/install.packages。
- 磁盘空间不足时先检查 Storage → Disk usage。

## 文件不能预览

- 确认上传完成、扩展名/MIME 正确。
- 尝试模态预览与 split view；失败仍可 Download。
- 大型/未知二进制可能只有 fallback。
- Office/PDF renderer 失败时关闭预览重开；仍失败则下载用原生应用。
- 图片被 Composer 拒绝时换用支持 Images 的 model 后重新附加。

## 权限一直等待

- 查看底部 Permission panel 是否被窗口高度遮挡；拖动 Resize。
- 处理主 agent 与 subagent 的所有 pending 请求。
- 选择 Allow once 或 Deny；只关弹层不会给 agent 答案。
- 若 grant 应已存在，Settings → Permissions 检查 scope 是否只覆盖别的 project/session。

## Remote control 无法访问

- 桌面应用必须保持运行。
- 从面板重新 Copy 当前 URL，旧 token/地址可能失效。
- 本机可打开但其他设备不可打开时检查网段、防火墙或 Remote.It 状态。
- 新浏览器需要在 Pairing requests 核对六位 code 并批准。
- 被 Revoke 的浏览器要重新配对。

## Storage 迁移异常

- 不要手动继续搬动部分目录。
- 保持原/目标磁盘在线，按 modal 提供的 Retry/Restart/Discard 操作。
- Adopt 前确认目标是完整 Open Science 数据根目录。
- Application storage 不可写与 Data location 是两个问题，分别修复。

## 收集问题证据

记录应用版本、操作系统、active model/framework、失败 session、准确时间、错误文本与相关截图。可公开 issue 前移除 API key、访问 token、绝对用户名路径、研究敏感数据。仓库：[aipoch/open-science](https://github.com/aipoch/open-science/issues)。
