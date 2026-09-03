---
sidebar_position: 7
title: Permissions 与 Runtimes
---

# Permissions 与 Runtimes

## Permissions（权限）

![Permissions 面板](/img/open-science/settings-permissions.png)

`Default permission mode` 选择 Ask for approval、Auto-approve edits、Full access，语义与 Composer 相同。下面按 Registry writes、Local compute、Connectors、File operations、Skills、Built-in tools 显示持久 grant。

- `Filter permissions by scope`：All、Global、Project、Session。
- Grant 行：capability、qualifier、scope label；session scope 可点击 `Open Session: …`。
- Connector policy hint：点击进入相关 Connector。
- `Revoke <capability>`：弹出确认后撤销该 grant；被更宽 global/project grant 覆盖时会提示。
- Refresh/加载错误：某些 store 不完整时显示警告，避免误以为列表完整。

撤销只影响后续请求；已经执行的操作不会回滚。Full access 等价于命令和网络也不提示，除隔离环境外不建议长期作为默认。

## Runtimes（运行时）

![Runtimes 面板](/img/open-science/settings-runtimes.png)

`Notebook runtimes` 下分 Python 与 R。每种语言包含 App-managed 环境和用户解释器：

| 控件 | 行为 |
| --- | --- |
| `Enable <environment>` | 让 agent 可以选择该环境 |
| `Add interpreter` | 浏览/填写已有 Python 或 R executable |
| `Download and set up` | 安装应用管理环境并显示进度 |
| `Allow package install` | 允许 Open Science 向该用户环境安装包；明确改变用户环境 |
| `Packages` | 打开包列表与管理器 |
| `Filter packages…` | 按名称过滤已安装包 |
| Add/Install package | 输入包名/版本并安装；完成后按提示重启 kernel |
| Remove/Uninstall | 确认后卸载包或非活动 runtime |
| Repair/Retry | 重新检测失败的应用管理环境 |

用户解释器的 package install 会写入你自己的环境，而非应用管理存储。不要在 Notebook cell 里绕过界面运行 `%pip`、`!pip`、`install.packages()` 或系统 installer；这样会破坏可追踪环境选择。R runtime 可按需延迟初始化，首次执行可能需要更长时间。
