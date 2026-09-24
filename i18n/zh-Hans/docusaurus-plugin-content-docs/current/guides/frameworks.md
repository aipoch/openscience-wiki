---
title: "安装与切换代理框架"
last_update:
  date: '2026-09-24'
---

# 安装与切换代理框架

选择 Agent 框架来执行对话和工具。安装后配置兼容的[模型提供方](providers.md)。可以同时保留多个框架。**Settings → Agent** 中的活动框架是所有项目共享的应用级设置，影响后续对话轮次和工作流。

## 读懂 Agent 页面

打开 **Settings → Agent**，先区分 Installed 和 Available，再检查已安装卡片的版本、路径和 Active 标识。

![重新检测后的 Codex](/img/open-science/local-acceptance/agent-codex-active.webp)

| 控件或状态 | 含义与操作 |
| --- | --- |
| 已安装卡片 | 选择可用但未激活的卡片申请切换；仍需兼容的模型配置 |
| Active | 应用级选中的后端，其 Uninstall 禁用 |
| Re-detect | 安装或路径变更后重新发现，短暂显示 Detecting；不负责安装缺失软件 |
| Not installed | 未发现可用运行时 |
| Install 菜单 | 选择该后端实际提供的安装来源并查看进度 |
| Install log / Retry | 先读失败步骤，解决原因后重试 |
| Repair | 管理的安装需要修复时出现，先检查影响对象 |

实查页面提供 Codex、Claude Agent、OpenCode、CodeBuddy。安装来源和认证方式随后端不同，不应把某一后端的流程套到所有后端。

## 安装后的核验顺序

1. 选择 **Install [framework]** 并核对来源。应用管理的安装保存在受管目录；手动安装必须能被应用发现。
2. 查看安装进度和日志，先解决环境或网络前置条件。
3. 手动安装后执行 **Re-detect**，确认版本和路径，不能仅凭另一个终端能运行命令判断就绪。
4. 选择就绪卡片，阅读切换提示并确认目标后端。
5. 检查 **Settings → Model**，执行小请求，核验实际回答或工具结果。

Codex 原生运行时与 ACP adapter 必须成对通过检测，只装其中一个不等于就绪。订阅认证见[模型接入](./providers.md)。

OpenCode 的 **Install → App-managed download (recommended)** 会下载自包含运行时。界面依次显示 Resolving、下载进度和带版本、路径的 Installed 卡片。点击卡片，确认 **Switch to OpenCode?**，再选择兼容模型。本地连接例已正常返回回复，接口格式与 token 设置见[本地提供方配置](./providers.md#连接本地模型端点)。

v0.33.0 的 **Claude Agent** 要求 Claude CLI **2.1.118 或更高版本**。若检测提示版本不受支持，按原安装方式更新卡片实际指向的安装，再使用 **Re-detect** 确认就绪后启动会话。更新另一份 CLI 不会修复卡片所指的安装。

## 更新应用管理的 Codex 运行时 {/* #update-codex */}

打开 **Settings → Agent**，分别查看 Codex 卡片上的 **Codex CLI** 和 **ACP** 版本。有经过测试的组合更新时，先完成或关闭正在使用该运行时的会话，再选择更新并等待检测完成。确认新版本和就绪状态后，在会话中发送一个小请求。

应用管理的更新只替换应用拥有的运行时；外部 CLI 应使用原安装方式更新，再选择 **Re-detect**。应用启动的 Codex 进程仍在使用目标时，会拒绝替换。这项操作不会更新 Open-Science 应用本身，也不会迁移正在执行的任务。

## 切换时保留什么

切换前先完成或停止当前操作。活动框架的变更作用于各项目后续的对话轮次和工作流；已经运行的任务继续使用原运行时直到完成，空闲会话在再次使用时重新连接。保留对话历史不代表转移了正在执行的工具进程，也不保证解释器变量仍然存在。继续计算前检查文件、Notebook 和权限。

切换后检查会话所选模型。Codex 订阅支持 [Side Chat](./delegation.md)；待处理的会话操作或恢复状态可能暂时阻止打开旁聊，按入口显示的提示处理。

## 修复与卸载

受管安装损坏时使用修复流程，不要在安装期间手动删除目录。外部安装需先修复对应环境，再重新检测。卸载受管后端前先激活另一个可用后端，打开 **Uninstall** 并阅读将删除的组件。仅切换模型不需要卸载后端。


### 卸载并重装应用管理的运行时

1. 保持另一个后端处于 **Active**。本例卸载 OpenCode 时，Codex 仍是活动后端。
2. 在未激活的 OpenCode 卡片上点击 **Uninstall**。确认框只针对本应用下载并管理的副本，不影响另行安装的副本。
3. 确认 **Uninstall**，然后点击 **Re-detect**。OpenCode 应移到 **Available**，显示 **Not installed**。
4. 选择 **Install OpenCode → App-managed download (recommended)**。等待 **Installed** 卡片出现，再点击卡片并确认 **Switch**。
5. 检查 **Active**、运行时路径及兼容模型。重装后端不会替你配置模型提供方。

![应用管理的 OpenCode 卸载范围](/img/open-science/priority-completion/01-opencode-uninstall.webp)

移除后端前先切换到其他可用后端；当前活动后端不能通过该控件卸载。重装后重新检测并激活，再打开已有项目执行一个小请求，检查连接。

![重新安装并选中的 OpenCode](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

安装按钮禁用时检查是否已有安装或切换进行中，以及页面的前置条件错误。检测成功但请求失败时，分别检查模型认证和后端/API 兼容性。

源码：[Agent 页面](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx)、[后端卡片](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx)。

设置范围与切换行为：[设置存储](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts)、[运行时切换](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts)。
