---
title: .science 研究包
description: 将会话、文件和证据一起导出，再导入项目查看与交接研究记录。
last_update:
  date: '2026-09-20'
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

## 取消与重试传输

**Run in background** 隐藏进度窗口并继续传输；需要停止时使用 **Cancel**。关闭进度窗口不等于取消操作。

清理未完成时，先处理 **Retry cleanup** 再重试。失败后的 **Try again** 重试原文件和目标位置；需要换包时另行选择。再次导入前先检查已有操作，完成后回读导入的会话与文件。
