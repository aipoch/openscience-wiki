---
title: .science 研究包
description: 将会话、文件和证据一起导出，再导入项目查看与交接研究记录。
last_update:
  date: '2026-10-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# .science 研究包

**.science 研究包** 将会话分支、文件和已记录的证据放在一起，供同事交接与查看。接收方可以将其导入项目，检查研究记录。导入会话仍为只读。从 v0.31.0 起，可以在桌面应用中使用 **Fork** 创建可编辑的副本，继续研究。

## 选择要分享的内容

| 接收方需要什么 | 使用哪种导出 |
| --- | --- |
| 阅读或编辑对话文字 | [对话 PDF 或 Markdown](sessions.md) |
| 使用选定的原始文件 | [文件下载或产物 ZIP](files.md) |
| 一起查看会话分支、文件和证据 | `.science` 研究包 |

研究包可能包含上传的研究材料、对话文字和生成结果。分享前先检查内容。导出是独立副本，删除本地工作不会移除已经发送给他人的包。

Side Chat 对话、私人[阅读书签](bookmarks.md)及备注不会包含在研究包中。同事需要的信息，应在导出前写入保存的报告或对话。

## 确认接收方版本 {/* #package-compatibility */}

**v0.33.0** 导出的研究包在 `ro-crate-metadata.json` 中包含 **RO-Crate 1.1** 元数据，描述最终导出快照与选定的不可变文件，包括文件名、媒体类型及相互关系。再次导出时，会为新快照重新生成这些引用。

使用 **v0.33.0 或后续兼容的读取器** 打开新导出的研究包：它们声明了必需的 `ro-crate` 能力。接收方版本较旧时，先更新应用再导入；改名或删除元数据不能解决兼容问题。原有旧研究包仍可读取，无需迁移。

这些元数据随 `.science` 研究包保存，不会重新执行计算、授予凭证，也不替代[针对产物版本的可复现性检查](reproducibility.md)。

## 导出研究包 {/* #export-the-session */}

1. 完成或停止会话中的工作，打开会话菜单，选择 **Export → Export Session package**。
2. 检查导出范围，以及省略内容和大小限制。
3. 确认导出，将 `.science` 文件保存到目标文件夹。
4. 等待进度完成，再用 **Show in folder** 找到文件。

| 导出选项 | 如何选择 |
| --- | --- |
| Essential export | 保留必要记录和文献元数据，不含可选的文献 PDF |
| Full export | 包含可用的文献 PDF 及预览中显示的更多内容 |
| Customize contents | 逐项选择文献 PDF、可选文件和版本；必需证据仍会包含 |

文献元数据始终保留。如果某份文献 PDF 是必需证据，**Essential export** 会不可用，应使用 **Full export** 或 **Customize contents** 并保留该文件。导出不会替你获取缺失的全文；确认前检查列出的 PDF 和大小，**Full export** 仍受内容及大小限制。

<p className="example-label"><strong>案例演示</strong> 交接样本质控会话</p>

本例在 Open-Science v0.31.1 中，将汇总 [GSE60450 样本质控表](../reference/example-data.md)的会话导出，导入同一台 Mac 的另一个项目，再使用 **Codex subscription** 从 Fork 继续分析。起点是已经生成 `gse60450-qc-summary.csv` 的会话；单独的输入表格不是研究包。

选择 **Essential export**，检查内容和预计大小，再选择 **Export**。本例预览估计为 **805.6 KiB**。等待 **Package operation completed** 后再导入保存的文件；你的会话大小可能不同。

![实际质控会话的导出选项与预计大小](/img/open-science/v0311/package-export.webp)

## 导入到项目 {/* #import-and-inspect-a-package */}

在项目的 **New conversation** 空白页，点击 **Import previous research** 选择 `.science` 文件，或把文件拖到该页面。选择已有会话中的附件入口不会替代研究包导入。打开导入预览后，检查目标项目和内容，再确认导入；等待完成后打开只读记录。

![新会话中的 Import previous research 入口](/img/open-science/v0341/package-entry.webp)

1. 打开目标 Project 菜单，选择 **Import Session package…**，或将一个 `.science` 文件拖入该项目。直接打开关联文件时，需要另选目标项目。
2. 检查包预览、目标位置以及包含或省略的内容，再确认导入。
3. 等待完成，选择 **Open imported Session**。
4. 查看会话分支，并打开交接所需文件，确认能找到下一项工作涉及的输入和结果。

本例选择目标项目 **Public Genomics Examples**，导入预览显示 **1 个分支、3 条消息、13 个文件**，并说明不包含账户凭据、权限授权和提供方的会话续接身份。确认这些内容后选择 **Import**。

![导入目标项目前的质控研究包预览](/img/open-science/v0311/package-import-preview.webp)

打开导入的会话及汇总 CSV。**Imported research history** 提示确认这份记录为只读，不能直接执行代码或继续对话。

![导入的质控记录、继承的汇总文件和 Fork to continue 按钮](/img/open-science/v0311/package-import-readonly.webp)

## 使用收到的研究记录

1. 在导入会话中选择 **Fork to continue**，或从会话菜单选择 **Fork**。等待 **Fork completed**，进入新会话；代码不会自动运行。
2. 检查继承的汇总文件，选择可用模型，确认 Python 运行环境就绪。本例使用 **Codex subscription / gpt-5.6-sol**。原安装中的凭据与权限不会随包成为接收端的授权。
3. 发送下方提示词。如果出现 Python 执行审批，先检查计算内容，再批准继续。

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. 打开两个新文件。本次得到 **12** 个样本、原始计数总和 **269027617**，平均值为 **22418968.08333333333333333333**。这是输入质控表的汇总，不是标准化表达量或差异表达结果。

![Fork 完成后，Codex 实际创建的新计算文件](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">继承的汇总表</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">新计算结果</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">计算说明</ExampleDownload>

两个新文件保存在 Fork 中，原会话和导入会话的汇总文件保持不变。通用操作见[复制已有会话继续研究](sessions.md#fork-session)。导入的用量不会计入本机活动总量。

随包收到的验证记录描述发送方提供的检查，不代表这台电脑已经重新运行。阅读它对应的文件版本、比较条件和结果；检查方式见[可复现性](reproducibility.md)。

## 调整传输速度并查看后台进度 {/* #transfer-settings */}

导出前，选择 **Customize contents → Transfer settings**；导出或导入运行中，展开 **Transfer details**。通过 **Disk activity limit** 选择 **Auto** 自动调整，或指定一个固定上限。降低上限会减少磁盘占用，也会延长传输时间；该上限由读取和写入共同使用，不是网络上传速度。

选择 **Run in background** 后，研究包操作继续执行。通过窗口中的后台进度入口重新打开详情，查看当前文件、进度和磁盘活动。确认操作完成后再检查导出的文件或打开导入会话。

![研究包的磁盘活动上限和传输设置](/img/open-science/v0333/package-transfer.webp)

## 导出提示敏感内容时 {/* #sensitive-export */}

如果导出停在敏感内容检查，展开 **Sensitive-content evidence**，检查触发提示的文件。不应交接的凭据或私密资料应先从来源中移除，再发起新的导出。

若这些内容确实属于获准交接的资料，可在失败的导出中勾选 **I understand the risk and want to export anyway**，再点击 **Export anyway**。这会**原样包含已标记内容，不做脱敏**，不是隐私过滤功能。确认仅适用于这次导出尝试，失败后需重新勾选；分享前仍应检查生成的研究包。只需排查问题时，使用[诊断导出](troubleshooting.md#session-diagnostics)。

## 取消与重试传输

**Run in background** 隐藏进度窗口并继续传输；需要停止时使用 **Cancel**。关闭进度窗口不等于取消操作。

清理未完成时，先处理 **Retry cleanup** 再重试。失败后的 **Try again** 重试原文件和目标位置；需要换包时另行选择。再次导入前先检查已有操作，完成后回读导入的会话与文件。

## 回放收到的研究记录 {/* #replay-import */}

导入完成后，选择 **View replay** 查看记录步骤，或用 **Discuss** 在可写会话中提问。导入的源会话仍保持只读，讨论引用不会恢复原运行环境；需要工作副本时使用 **Fork to continue**。详见[会话回放](session-replay.md)。

## 导入新项目 {/* #new-project-import-recovery */}

旧版本接纳研究包到新项目目录时失败，可更新至 v0.37.0 或更高版本，先检查目标项目是否已存在，再使用导入对话框的恢复操作，避免重复导入。完成后核对会话与文件。这项修复不会让导入会话变成可写；继续分析仍需使用 **Fork**。

## 从网页导入研究包 {/* #browser-import */}

浏览器和已安装的桌面应用需要位于**同一台电脑**。网页必须提供 Open-Science 研究包传输功能；普通下载链接本身不具备这个功能。

1. 在可信的研究包页面选择 Open-Science 导入／打开入口，允许浏览器打开桌面应用。如果浏览器请求本地网络访问，只授权给你打算使用的网站。
2. 应用显示 **Receiving package…** 和 **Validating package…** 时，保持网页打开。网页显示已接收，只表示文件已送达应用。
3. 在应用中核对研究包，选择目标项目并确认导入。等待完成后打开导入的会话。
4. 检查文件与证据。研究记录仍为只读；需要继续研究时选择 **Fork to continue**。修改标题不会让导入的研究记录变为可写。

如果网页传输不可用或被阻止，先下载 `.science` 文件，再使用现有导入入口；也可以把它拖到项目首页。向 Composer 拖入普通文件夹不会导入研究包。导入报告部分失败时，先检查目标项目中是否已存在该会话，再决定是否重试，不要为重复传输另建项目。

网站开发者可参考[浏览器导入 SDK 指南](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/BROWSER_IMPORT.md)：需要 HTTPS（或本机回环开发地址）、同机桌面应用，以及非空且不超过 2 GiB 的研究包。本地接收不替代用户最后的导入确认。

## 在 CLI 或本地 Web 界面中使用研究包 {/* #local-package-transfer */}

从 v1.0.5 起，经过身份验证的**本地 Web** 工作区通过浏览器上传、下载 `.science` 研究包。远程 Web 会话不因此获得这项能力。[网站向桌面应用传包](#browser-import)仍是另一条流程。

### 在本地 Web 中上传或下载 {/* #web-package-transfer */}

1. 打开目标本地工作区，等待源会话空闲。在会话菜单选择 **Export → Export Session package**，选择包内材料，再点击 **Choose save location…** 准备研究包。
2. 等待研究包准备完成，再点击已完成包文件名旁的 **Download**，通过浏览器保存。后台准备好研究包不等于浏览器已经保存下载；分享前确认实际下载到了 `.science` 文件。
3. 导入时，使用项目的研究包导入入口，从电脑中选择一个 `.science` 文件。等待上传与校验，检查包内容和目标项目，再确认导入。
4. 打开导入后的会话并检查文件。研究记录为只读。要继续研究，在桌面版打开同一工作区，再选择 **Fork to continue**；Web 中不提供 Fork。

![研究包准备完成后显示浏览器 Download 按钮](/img/open-science/v105/package-download.webp)

上传、下载或导入失败时，先检查界面结果与目标项目再重试。收到文件或上传成功，并不等于导入已经完成。

### 使用 CLI {/* #cli-package-transfer */}

先启动目标本地配置的服务，并等待源会话空闲。将下面的标识与路径替换为实际值：

```bash
open-science session export SESSION_ID --project PROJECT_ID --output ./session.science --json
```

导出必须指定 `.science` 输出路径。默认等待时限为一小时；大型传输可用 **--timeout-ms** 调整，完成后检查返回的文件路径。在 **v1.0.5** 中，导入本地文件请使用[本地 Web 上传](#web-package-transfer)或桌面版导入入口；CLI 的 `session import` 文件路径可能在研究包校验前被拒绝。

## 从首页科研案例开始 {/* #use-case-gallery */}

在首页案例卡片中选择 **Details**，阅读对应的官方案例页面；选择 **Import** 下载研究包。留意准备、下载和校验进度；不需要的传输可用 **Cancel** 取消。若已下载的包正在等待选择目标，点击 **Continue** 重新打开导入对话框。

确认目标项目后导入。打开结果，检查输入与产物，再用 桌面版的 **Fork to continue** 研究自己的问题。下载校验检查的是包的传输，不代表已经验证案例的科学结论，也不会提供其模型凭据。

![导入前检查官方案例包和目标项目](/img/open-science/v105/package-preview.webp)
