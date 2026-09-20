---
title: .science 研究包
description: 将会话、文件和证据一起导出，再导入项目查看与交接研究记录。
last_update:
  date: '2026-09-20'
---

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

以下截图使用汇总 [GSE60450 样本质控表](../reference/example-data.md)的会话。在导出预览中比较 **Essential export** 和 **Full export**，查看预计大小，再选择 **Export**。具体内容和大小取决于你的会话。

![研究包导出预览，包含 Essential export、Full export 和 Customize contents](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## 导入到项目 {/* #import-and-inspect-a-package */}

1. 打开目标 Project 菜单，选择 **Import Session package…**，或将一个 `.science` 文件拖入该项目。直接打开关联文件时，需要另选目标项目。
2. 检查包预览、目标位置以及包含或省略的内容，再确认导入。
3. 等待完成，选择 **Open imported Session**。
4. 查看会话分支，并打开交接所需文件，确认能找到下一项工作涉及的输入和结果。

## 使用收到的研究记录

导入会话本身仍为只读。在桌面端打开该会话的菜单，选择 **Fork**；等待 **Fork completed**，进入新会话，检查继承的文件后再发送后续任务。原会话保持不变，代码不会自动运行。详细步骤和检查方法见[复制已有会话继续研究](sessions.md#fork-session)。导入的用量不会计入本机活动总量。

随包收到的验证记录描述发送方提供的检查，不代表这台电脑已经重新运行。阅读它对应的文件版本、比较条件和结果；检查方式见[可复现性](reproducibility.md)。

## 取消与重试传输

**Run in background** 隐藏进度窗口并继续传输；需要停止时使用 **Cancel**。关闭进度窗口不等于取消操作。

清理未完成时，先处理 **Retry cleanup** 再重试。失败后的 **Try again** 重试原文件和目标位置；需要换包时另行选择。再次导入前先检查已有操作，完成后回读导入的会话与文件。
