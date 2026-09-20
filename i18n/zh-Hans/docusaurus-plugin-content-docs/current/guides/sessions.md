---
title: "会话与分支"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 会话与分支

项目组织相关输入和研究工作，会话是项目中的一段对话。独立问题使用新会话，需要继承指定历史时使用分支。无论哪种方式，都要检查新对话实际能够访问哪些文件和执行记录。

## 新建、命名与返回

打开项目，在 Sessions 下选择 **New**，输入并发送请求。先核对项目名，新会话属于该项目。点击会话行可返回，阅读状态后再判断是否完成。

<p className="example-label"><strong>示例</strong> 为 RNA-seq 质控会话命名</p>

GSE60450 实际运行完成后，通过 **Edit…** 保存了以下内容：

| 字段 | 示例值 | 限制 |
| --- | --- | --- |
| Title | `RNA-seq count matrix - validation and sample QC` | 最多 80 字符，显示计数 |
| Description | `Validate the public GSE60450 matrix and retain descriptive QC outputs with source integrity checks.` | 最多 1,000 字符 |
| Save | 保存更改 | 关闭后核对侧栏标题 |
| Cancel / Close | 不应用草稿 | 不取消科研任务 |

![会话名称与说明编辑器](/img/open-science/guides-walkthrough/40-session-edit.webp)

会话行菜单 **Pin** 将会话放入 Pinned，**Unpin** 返回普通列表。固定仅便于访问，不维持内核运行，也不防止删除。

将鼠标移到会话上，可以同时查看编号、标题及所属项目。编号有助于区分同名对话，编辑或删除前仍需确认选中的行。

## 保存阅读书签

使用[私人阅读书签](bookmarks.md) 为段落或 PDF 区域添加备注，再从该会话的 **Bookmarks** 返回原处。保存书签不会把段落发送给 Agent。

## 区分会话菜单操作

![RNA-seq 会话操作菜单](/img/open-science/guides-walkthrough/41-session-actions.webp)

| 操作 | 结果 | 检查 |
| --- | --- | --- |
| Edit… | 修改标题/说明 | 选中正确会话并保存 |
| Download all artifacts | 打开产物选择/下载流程 | 范围是该会话及所选文件 |
| View notebook | 打开执行视图 | 执行归属、语言和实际记录 |
| Export conversation… | 按界面选项导出对话 | 不等于产物或 Notebook 打包 |
| Archive | 从活跃导航中隐藏 | 可在 Settings → Archived 恢复 |
| Delete | 打开永久删除确认 | 阅读影响范围；Cancel 保留数据 |



## 从完成结果创建分支

<p className="example-label"><strong>案例演示</strong> 从已完成的质控会话创建样本注释分支</p>

如果要讨论后续样本注释，同时保留原始计数质控对话：

1. 打开原会话已完成的回答。
2. 点击回答下的 **Branch in new session**。
3. 确认出现新会话行，初始名称可能与原会话相同。
4. 通过 **Edit…** 改名为 `GSE60450 - follow-up interpretation`。
5. 检查继承历史，后续请求需要原结果时明确引用项目文件。

![单独命名的分支与固定的原会话](/img/open-science/guides-walkthrough/57-session-branch.webp)

分支保留所选对话历史，但不会重建原来的实时内核。复制活动标为 **code shown** 或旧链接不可用时，从项目 Files 打开原产物，并检查其产出会话。

分支入口取决于消息和框架状态。[Side Chat](delegation.md#side-chat-可用范围) 是独立功能。新旁聊继承当前会话的模型与推理强度，也可以为旁聊的下一次发送另选模型。

## 修改历史消息

历史用户消息的 **Edit message** 创建修订，不会抹去全部历史。提交前检查文字与附件；有 **Previous/Next message revision** 时可切换版本。后续上下文取决于所选路径，旧回答不能当作新修订问题的答案。

<p className="example-label"><strong>案例演示</strong> 修改质控指标定义的请求</p>

本例在已完成的质控指标提问上点击 **Edit message**，把“一句话列出指标”改为“四条定义”，点击 **Send**。回答生成期间修订切换按钮不可用；完成后，用 **Previous message revision** 回到 `1/2` 检查原问题和原回答，再用 **Next message revision** 返回新回答。再次修正字段名称后显示 `3/3`。在此次 Codex 订阅会话中，之前保存的两个研究报告仍保留，下载内容没有变化。

在 OpenCode 中，修改请求后可用 Previous 查看原回答、Next 查看修改后的回答。切换回答版本不会撤销已经完成的工具操作或外部变化。

![历史消息的修订切换控件](/img/open-science/local-todo-batch/18-message-revision.webp)

**Cancel** 退出编辑而不提交；**Send** 请求新回答，继续前应检查结果。修正下一步用追问，需要独立命名的研究则创建分支。

## 研究包 {/* #research-packages */}

需要一起交接会话分支、文件和证据时，使用 [.science 研究包](research-packages.md)。独立教程介绍导出范围、导入与回读、只读会话和传输恢复。

## 导出对话与研究文件

分享研究讨论时，在会话行菜单选择 **Export → Export conversation…**。建议先用 **Edit…** 给会话起一个简洁的标题：PDF 使用会话标题，过长的自动标题会占据大量首页空间。

| 控件 | 操作与结果 |
| --- | --- |
| Format → PDF / Markdown | PDF 适合阅读和打印；Markdown 适合继续编辑 |
| Entire conversation | 导出当前分支的全部对话 |
| Selected | 显示轮次复选框；从零开始勾选，计数随选择变化 |
| Select all | 选择全部列出的轮次 |
| Export PDF / Export Markdown | 打开系统保存窗口；未选任何轮次时不可用 |
| Cancel | 关闭导出窗口，不创建文件 |

<p className="example-label"><strong>案例演示</strong> 只导出 GSE60450 的最后一轮质控指标问答</p>

![选择最后一轮质控指标问答，导出 PDF](/img/open-science/local-todo-batch/20-selected-conversation-export.webp)

在 **GSE60450 — Methods and claim audit** 中，选择最后一轮四项质控指标定义，导出的单页 PDF 只包含该请求与对应回答，更早的讨论没有出现。整段对话 PDF 也已重新打开核对。此前选段 Markdown 已确认从所选追问开始。一轮可以含多条助手消息，选中一轮不一定只导出两条消息。

对话导出不替代研究文件下载。结果链接可能指向应用内部记录，接收方不一定能打开；需要 CSV、图或报告原文件时，应另行下载并一起提供。

### 下载会话产物

在会话菜单选择 **Download all artifacts**，勾选所需文件，点击 **Download N artifacts**，然后选择保存文件夹。此入口保存独立文件。下载后逐个打开，确认名称、内容及数量与所选产物一致。

![选择会话内的两个已保存报告](/img/open-science/local-todo-batch/21-session-artifact-selection.webp)

### 下载项目文件包

点击左上角项目名称 → **Download artifacts…**。列表按 **Generated** 和 **Uploads** 分组；默认全选，用 **Uncheck all** 后只勾选需要交付的文件，再保存 ZIP。

![从项目中选择报告、质控表与原始计数输入](/img/open-science/local-todo-batch/22-project-artifact-selection.webp)

在系统保存窗口点击 **Cancel** 可取消本次保存，返回后文件选择仍保留。写入开始后，应用会禁用取消和关闭操作；等待结果，不要把关闭保存窗口与中途停止写盘混为一谈。

如果提示只下载了部分文件，先恢复不可读取的源文件，再重新选择完整的交付范围并下载。再次保存到同名 ZIP 时会替换原文件包；只选择失败文件会得到仅包含这些文件的新包，不会自动补入之前的 ZIP。

打开下载的 ZIP，将 `generated/` 和 `uploads/` 的文件数量、名称及内容与选择清单比较，确认完整后再分享。该文件包不等于整个项目、会话历史、Notebook 内核或运行环境备份。

## 归档并恢复完成的分支

在目标分支选择 **Archive**，然后打开 **Settings → Archived → Sessions**。核对项目和归档时间后点击 **Restore**，确认分支回到活跃导航且内容可打开；原会话是独立记录。

归档项目通过 **Manage** 查看内部会话。归档、恢复、删除和数据迁移的区别见[存储](storage.md)。会话从活跃列表消失不代表已释放磁盘空间。

源码：[会话编辑器](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/EditSessionDialog.tsx)、[工作区实现](https://github.com/aipoch/open-science/tree/v0.26.0/src/renderer/src/pages/workspace)。

## 复制已有会话继续研究 {/* #fork-session */}

需要本地会话或导入会话的独立工作副本时，使用 **Fork**。**Branch in new session** 从选定消息建立分支；Fork 则复制整个会话已保存的研究记录，包括分支、Notebook 记录、文件版本、文献、批注和私人书签。原会话保持不变。复制记录不会重新执行代码，也不代表当前电脑的运行环境已经准备好。

1. 在桌面应用中完成或停止当前任务，并等待正在进行的研究包传输结束。
2. 打开会话列表中该会话的菜单，选择 **Fork**。应用会显示传输进度；**Run in background** 只隐藏窗口，不会取消任务。
3. 等待 **Fork completed**，打开新会话。点击标题，核对 **Source session** 和新的会话编号。
4. 打开一个继承的文件，检查内容。继续前核对当前模型和运行环境；旧电脑的路径或权限可能需要重新处理。
5. 在副本中发送后续任务，检查新输出。保留原会话作为对照记录。

![会话菜单中的 Fork 入口](/img/open-science/v0311/fork-menu.webp)

![新会话信息卡中的来源会话及继承的 QC 文件](/img/open-science/v0311/fork-info.webp)

Fork 目前在桌面端提供。导入会话仍为只读，应在其副本中继续工作。项目设置和记忆不会变成另一个独立复制的项目。旧的审阅或验证记录只描述原记录版本；使用前检查是否已经过期。

### 在 QC 副本中继续计算

<p className="example-label"><strong>案例演示</strong> v0.31.1 本地会话 Fork</p>

在 GSE60450 项目中，将已有 QC 会话 Fork 后，打开继承的 `gse60450-qc-summary.csv`，确认样本数为 **12**、原始计数合计为 **269,027,617**。在副本中让 Agent 用 Python 读取该文件，核对两项数值，计算每个样本的平均计数，并另存为 `fork-qc-check.csv`。结果为 **22,418,968.083333…**；源文件与副本中继承文件的内容相同，新计算另存为独立文件。这个平均数仅演示如何继续计算，不是表达量归一化。

![Fork 副本中执行 Python 并保存新结果](/img/open-science/v0311/fork-result.webp)

<ExampleDownload path="/examples/v0311/fork-qc-check.csv">下载本次计算结果</ExampleDownload>。此处实测的是本地会话 Fork；收到 `.science` 包时的只读与继续使用方式见[研究包](research-packages.md)。

## 查看会话信息卡 {/* #session-information */}

点击会话标题，查看编号、描述、来源、创建与更新时间、当前分支消息数及文件数。使用 **Pin** 固定会话，或通过 **Edit session** 修改标题和描述。**Continued from chat** 分隔条可返回记录的来源消息。
