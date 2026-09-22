---
title: PDF 批注与文档笔记
description: 标记文献段落，整理阅读笔记，搜索返回原文，并导出带批注的阅读副本。
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# PDF 批注与文档笔记

阅读 PDF 时，可以在段落旁记录问题、标记组会要讨论的图，或为整篇论文整理笔记。批注属于应用管理的**文件版本**，重新打开该版本仍可查看。保存批注不会向 Agent 发送消息，也不会改写原始 PDF 文件。

## 选择合适的阅读工具

| 工具 | 保存什么 | 在哪里查看 |
| --- | --- | --- |
| PDF 的 **Notes & Annotations** | 某个 PDF 版本的高亮、区域标记、页面笔记和文档笔记 | PDF 的笔记页或侧栏；笔记与引用文字也可在全局搜索的 **Library** 中找到 |
| **For me** 私人书签 | 属于某个会话的阅读位置和可选备注 | 该会话的 **Bookmarks** 列表，见[私人阅读书签](bookmarks.md) |
| **To Agent** 标注 | 准备交给 Agent 的问题或指令材料 | 目标消息的草稿，检查后再发送 |

## 标记段落并记录问题 {/* #annotate-passage */}

<p className="example-label"><strong>案例演示</strong> 为单原子催化组会整理阅读笔记</p>

本例使用 Lang 等人的开放获取论文 [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3)，它也是[组会工作流](../workflows/journal-club.md)中的文献。先从出版社取得 PDF，导入[文献库](library.md)，再从文献行打开 PDF 附件。本例围绕论文如何支持其稳定化机制提出阅读问题；给摘要加高亮本身不等于独立验证该机制。

1. 在 **Original PDF** 中找到段落并核对页码，文字太小时先调整缩放。
2. 选择 **Annotate selected text**，拖选文字。**Mark style** 用于选择文字标记样式。本例高亮第一页摘要的开头部分。
3. 打开 **Annotation note**，输入问题或阅读提醒，再选择 **Save**。本例提醒读者比较缺陷稳定化与论文提出的共价金属—载体相互作用，并核对实验依据。
4. 点击 **Show notes sidebar**，让已保存的笔记显示在原文旁。使用 **Add tag** 添加已有标签，本例选择 **Favorites**。
5. 标记结束后切回 **Select**。需要调整最近的批注操作时，使用 **Undo annotation change** 和 **Redo annotation change**，无需修改源 PDF。

![原始 PDF 旁显示已保存的高亮和阅读笔记](/img/open-science/v0320/pdf-highlight-sidebar.webp)

处理图表或扫描页时，可以使用 **Select area to annotate** 框选目标区域。区域标记用于保留位置，本身不会提取文字或验证图表；无法选中文字时，仍可用它标记需要回看的部分。

## 整理页面笔记和整篇笔记 {/* #document-notebook */}

1. 打开 **Notes & Annotations**，或从侧栏选择 **Open full notes view**。
2. 对整篇论文的问题，使用 **Add note → Add document note**；针对某一页的问题，使用 **Add page note**，保存前核对页码字段。
3. 输入笔记并点击 **Save**。本例的整篇笔记询问：加热后，哪些显微、光谱和催化测量证据能够区分孤立原子与纳米颗粒。
4. 通过 **Search & filter** 按笔记文字、类型或标签筛选。侧栏中的 **All notes** 和 **Current page** 用于切换全部批注与当前页批注。
5. 点击段落或区域笔记的 **Show annotation source** 返回保存的位置。**Edit annotation note** 修改评论；**Delete annotation** 删除该批注，不会删除 PDF。

![完整笔记页中的文档笔记、原文引用和带标签的高亮](/img/open-science/v0320/pdf-notebook.webp)

## 从其他页面找回笔记 {/* #find-notes */}

按 **Cmd/Ctrl+K** 打开全局搜索，输入笔记中的短语，再选择 **Library**。本例搜索 `covalent metal-support`。选中结果后，分别查看 **Notes** 中的笔记和 **Quoted text** 中的原文引用，再点击 **Show annotation source** 打开 PDF 并返回标记段落。

![全局搜索分别显示阅读笔记和引用的 PDF 原文](/img/open-science/v0320/pdf-search-details.webp)

回看时核对文件名、文件版本和页码。PDF 笔记不会自动成为给 Main 的新消息或指令；需要向 Agent 提问时，使用 **To Agent**，并在发送前检查草稿。

## 导出笔记或阅读副本 {/* #export-notes */}

| 输出 | 操作方法 | 检查内容 |
| --- | --- | --- |
| Markdown 或 CSV 笔记 | 在 **Notes & Annotations** 选择 **Markdown** 或 **CSV**，再点击 **Export notes** | 打开导出文件，检查引用、评论、页码和标签；筛选后出现的 **Export filtered notes** 只导出当前子集，需要全部笔记时先清除筛选 |
| 带批注的 PDF | 打开 PDF 下载菜单，选择 **Download PDF with annotations** | 另存为独立文件，用 PDF 阅读器打开，检查高亮和笔记内容，不能只确认文件存在 |
| 原始 PDF | 选择 **Download original PDF** | 保存源文件，不把文档笔记中的标记写入原始文件 |

![原始 PDF 与带批注 PDF 使用不同的下载入口](/img/open-science/v0320/pdf-export-options.webp)

本例保存了两条笔记：一条附有评论的高亮，以及一条整篇文档笔记。二者均保留在 <ExampleDownload path="/examples/v0320/lang2019-notes.md">Markdown 导出</ExampleDownload>和 <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV 导出</ExampleDownload>中。带批注 PDF 保留论文的十页内容并加入高亮和笔记，原始下载文件则单独保留。原文摘录来自 Lang 等人的论文，遵循该论文的 [CC BY 4.0 许可](https://creativecommons.org/licenses/by/4.0/)；评论是本例的阅读问题。

## 笔记的共享范围

**文献库附件**在使用同一受管理文件版本的文献记录、项目和会话之间共享笔记。**项目上传文件和产物**在所属项目的会话之间共享笔记。新文件版本是不同的批注对象；阅读修订稿前，应先确认标记对应哪个版本。

这些笔记保存在本机，不会跨设备同步。交接时导出笔记或带批注 PDF，并检查接收者实际拿到的内容。这不会改变私人会话书签的规则，也不代表所有阅读笔记都会包含在 [.science 研究包](research-packages.md)中。
