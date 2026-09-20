---
title: "远程浏览器访问"
last_update:
  date: '2026-09-20'
---

# 远程浏览器访问

远程浏览器访问让另一设备操作本机正在运行的工作区。项目、Agent、文件和 Notebook 仍在本机执行；它与把计算发送到远程主机的 [SSH/Slurm](./remote-compute.md) 不同。

:::caution[连接状态]
Remote.It 可能已经接受服务变更，但后台代理尚未报告就绪。还需要在你的设备上完成浏览器配对并成功打开工作区。下方 Off 状态截图用于说明控件，不代表已经连接的远程会话。
:::

## 前置条件和模式

在本机桌面打开 Settings → Remote。启用相关模式前需单独安装并登录 Remote.It 桌面应用。Open-Science 调用其已安装的 CLI，不代建账号或捆绑第三方服务。

| 模式 | 用途 |
| --- | --- |
| Off | 暂停远程访问，保留 Provider 设置和可信浏览器记录 |
| App access | 通过已登录的移动应用访问，并完成两步验证 |
| Browser access | 通过持久 HTTPS 链接访问，并完成两步验证 |

![实查的 Off 页面](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

访问模式只能在本机桌面窗口修改。有权限的已连接浏览器可管理配对/信任，但不能代替本机修改模式。

## 环境就绪后的配对步骤

1. 选择模式，等待 ready/running。错误或 Changing access mode 不代表可用。
2. Browser access 使用 Copy、Open 或二维码；App access 按移动端说明并使用同一 Remote.It 账号。
3. 比对请求设备与批准设备的六位码，核对浏览器、平台、时间和地址。
4. 选择 Reject、Allow for up to 12 hours 或 Trust this browser for 180 days。临时允许不等于永久信任。
5. 打开目标工作区，完成一个小的只读操作，不能用“链接已复制”代替连通验证。

请妥善保管访问链接，只向目标设备提供连接，并在建立信任前确认配对请求。

## 撤销和停止

Trusted browsers 显示设备和上次使用时间。Revoke [browser] 撤销其后续受保护访问/重连资格。Off 暂停访问但保留信任，设备丢失时需单独撤销。

若提示关闭未完成，使用 Retry turning off 并确认已保存。源码提示 Off 未保存时，重启后访问可能重新开启，所以只看到选中按钮不够。

### 服务变更已接受，代理仍在重启

若提示 **Remote.It accepted the service changes, but its background agent is still restarting**，新的 Service IDs 已保存。等待几秒后点击 **Detect** 或 **Detect again**。不要重新添加设备或反复切换模式，应复用已接受的服务配置。

页面给出浏览器链接和配对控件后再继续。若持续检测失败，请确认 Remote.It 桌面应用已登录、后台代理正在运行，保留准确报错并按[故障排查](troubleshooting.md)反馈。子面板显示 **Ready**，但页面仍有错误时，不能据此确认远程访问成功。

## 按阶段排查

| 阶段 | 排查 |
| --- | --- |
| Provider 未发现 | Remote.It 是否安装、登录，检测结果是什么 |
| 模式切换失败 | 当前错误，本机应用和 Provider 是否仍运行 |
| 链接可开但无工作区 | 配对码、有效期、信任和授权设备 |
| 原有设备被拒绝 | 是否撤销、过期或已 Off |
| 工作区可开但任务失败 | 本机模型、运行时和工具权限，远程入口不会自动配置这些 |

本地无界面/浏览器服务命令见[服务参考](../reference/server.md)，与此处 Remote.It 模式分开。

源码：[Remote 页面](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/RemoteControlPanel.tsx)。

Linux headless 没有可用系统密钥环时，见 [凭据存储选项](../reference/server.md)。该选项改变适用秘密的本地存储方式，不会配置 Remote.It、配对浏览器或授权远程访问。

## v0.31.1 的配对与撤销 {/* #pairing-v0311 */}

待处理配对请求显示在 **Trusted browsers** 前方，并提供剩余时间和临近到期提示。授权前核对请求设备显示的配对码；到期后需要重新发起请求。受信任浏览器可以撤销自身信任，此后受保护访问会结束；再次访问时需要重新配对。**Off**、临时访问和撤销信任仍是不同操作。
