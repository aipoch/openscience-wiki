---
title: "編輯 PowerPoint 演示文稿"
last_update:
  date: '2026-11-19'
---

# 編輯 PowerPoint 演示文稿 {/* #编辑-powerpoint-演示文稿 */}

使用桌面應用，在項目預覽中打開 `.pptx`，直接修改幻燈片文字及格式。保留原始文件，分享前檢查保存結果。舊版 `.ppt` 不會交給 PPTX 編輯器處理。

## 打開並選擇幻燈片內容 {/* #open */}

1. 將 `.pptx` 附加到會話併發送消息，或從項目文件打開已有演示文稿。瀏覽器端無法使用桌面 Office 預覽時，會提供下載入口。
2. 在預覽中選擇一張幻燈片，先閱讀現有標題和內容。
3. 點擊鉛筆 **Edit** 入口，雙擊要修改的文字元素。已經合併到圖片中的文字不屬於可編輯文本框。

## 修改文字並保存版本 {/* #edit */}

修改文字，按需調整字號、粗體、斜體、下劃線、鏈接和顏色。點擊 **Apply**，檢查整張幻燈片沒有溢出、截斷或不合適的換行後，再點擊 **Save**（**Save changes** 操作）。保存會創建新的文件版本。編輯器保留演示文稿的 OOXML 結構，但這不代表所有 PowerPoint 高級效果都能完全一致地呈現。

<p className="example-label"><strong>案例演示</strong> 明確 QC 演示文稿的標題</p>

打開 [GSE60450 QC 演示文稿](/examples/gse60450/office/GSE60450-qc-overview.pptx)，將首頁標題從 `GSE60450 sample QC` 改爲 `GSE60450: descriptive sample QC`，然後應用並保存。本例只修改標題，沒有重新分析原始數據。

![修改標題文字，檢查實時預覽並應用](/img/open-science/v130/pptx-edit.webp)

![新標題保存在 v2，版本歷史中保留 v1 原版](/img/open-science/v130/pptx-history.webp)

誤改時可使用 **Undo** 或 **Redo**。編輯界面還提供 **Add text box**、**Add slide**、**Duplicate slide**、**Move slide earlier**、**Move slide later** 和 **Edit speaker notes** 等幻燈片與形狀操作。調整結構前先確認當前選中的幻燈片。

如果 Agent 提出演示文稿修改，打開 **Review edits** 查看對比，再選擇 **Accept** 或 **Reject**。標爲 **AI suggested edits** 的內容屬於建議草稿，尚未接受爲正式版本。如果源文件同時發生變化，重新加載後基於當前源文件檢查建議，再決定是否應用。

## 比較與導出 {/* #export */}

打開版本歷史，檢查保存的修改並比較目標版本。下載準備分享的演示文稿，在演示軟件中重新打開，檢查幻燈片順序、備註、字體、圖形位置和數據標籤。同事需要覈對幻燈片背後的證據時，應保留對應的[研究包](research-packages.md)。

其他文件格式見[文件預覽](previews.md)；爲幻燈片製作示意配圖，見[圖像生成](image-generation.md)。
