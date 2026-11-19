---
title: "编辑 PowerPoint 演示文稿"
last_update:
  date: '2026-11-19'
---

# 编辑 PowerPoint 演示文稿

使用桌面应用，在项目预览中打开 `.pptx`，直接修改幻灯片文字及格式。保留原始文件，分享前检查保存结果。旧版 `.ppt` 不会交给 PPTX 编辑器处理。

## 打开并选择幻灯片内容 {/* #open */}

1. 将 `.pptx` 附加到会话并发送消息，或从项目文件打开已有演示文稿。浏览器端无法使用桌面 Office 预览时，会提供下载入口。
2. 在预览中选择一张幻灯片，先阅读现有标题和内容。
3. 点击铅笔 **Edit** 入口，双击要修改的文字元素。已经合并到图片中的文字不属于可编辑文本框。

## 修改文字并保存版本 {/* #edit */}

修改文字，按需调整字号、粗体、斜体、下划线、链接和颜色。点击 **Apply**，检查整张幻灯片没有溢出、截断或不合适的换行后，再点击 **Save**（**Save changes** 操作）。保存会创建新的文件版本。编辑器保留演示文稿的 OOXML 结构，但这不代表所有 PowerPoint 高级效果都能完全一致地呈现。

<p className="example-label"><strong>案例演示</strong> 明确 QC 演示文稿的标题</p>

打开 [GSE60450 QC 演示文稿](/examples/gse60450/office/GSE60450-qc-overview.pptx)，将首页标题从 `GSE60450 sample QC` 改为 `GSE60450: descriptive sample QC`，然后应用并保存。本例只修改标题，没有重新分析原始数据。

![修改标题文字，检查实时预览并应用](/img/open-science/v130/pptx-edit.webp)

![新标题保存在 v2，版本历史中保留 v1 原版](/img/open-science/v130/pptx-history.webp)

误改时可使用 **Undo** 或 **Redo**。编辑界面还提供 **Add text box**、**Add slide**、**Duplicate slide**、**Move slide earlier**、**Move slide later** 和 **Edit speaker notes** 等幻灯片与形状操作。调整结构前先确认当前选中的幻灯片。

如果 Agent 提出演示文稿修改，打开 **Review edits** 查看对比，再选择 **Accept** 或 **Reject**。标为 **AI suggested edits** 的内容属于建议草稿，尚未接受为正式版本。如果源文件同时发生变化，重新加载后基于当前源文件检查建议，再决定是否应用。

## 比较与导出 {/* #export */}

打开版本历史，检查保存的修改并比较目标版本。下载准备分享的演示文稿，在演示软件中重新打开，检查幻灯片顺序、备注、字体、图形位置和数据标签。同事需要核对幻灯片背后的证据时，应保留对应的[研究包](research-packages.md)。

其他文件格式见[文件预览](previews.md)；为幻灯片制作示意配图，见[图像生成](image-generation.md)。
