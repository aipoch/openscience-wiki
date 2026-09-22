---
title: "PDF 批註與文件筆記"
description: "標記文獻段落，整理閱讀筆記，搜尋返回原文，並匯出帶批註的閱讀副本。"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# PDF 批註與文件筆記 {/* #pdf-批注与文档笔记 */}

閱讀 PDF 時，可以在段落旁記錄問題、標記組會要討論的圖，或為整篇論文整理筆記。批註屬於應用管理的**檔案版本**，重新開啟該版本仍可檢視。儲存批註不會向 Agent 傳送訊息，也不會改寫原始 PDF 檔案。

## 選擇合適的閱讀工具 {/* #选择合适的阅读工具 */}

| 工具 | 儲存什麼 | 在哪裡檢視 |
| --- | --- | --- |
| PDF 的 **Notes & Annotations** | 某個 PDF 版本的高亮、區域標記、頁面筆記和文件筆記 | PDF 的筆記頁或側欄；筆記與引用文字也可在全域搜尋的 **Library** 中找到 |
| **For me** 私人書籤 | 屬於某個會話的閱讀位置和可選備註 | 該會話的 **Bookmarks** 列表，見[私人閱讀書籤](bookmarks.md) |
| **To Agent** 標註 | 準備交給 Agent 的問題或指令材料 | 目標訊息的草稿，檢查後再傳送 |

## 標記段落並記錄問題 {/* #annotate-passage */}

<p className="example-label"><strong>案例演示</strong> 為單原子催化組會整理閱讀筆記</p>

本例使用 Lang 等人的開放獲取論文 [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3)，它也是[組會工作流](../workflows/journal-club.md)中的文獻。先從出版社取得 PDF，匯入[文獻庫](library.md)，再從文獻行開啟 PDF 附件。本例圍繞論文如何支援其穩定化機制提出閱讀問題；給摘要加高亮本身不等於獨立驗證該機制。

1. 在 **Original PDF** 中找到段落並核對頁碼，文字太小時先調整縮放。
2. 選擇 **Annotate selected text**，拖選文字。**Mark style** 用於選擇文字標記樣式。本例高亮第一頁摘要的開頭部分。
3. 開啟 **Annotation note**，輸入問題或閱讀提醒，再選擇 **Save**。本例提醒讀者比較缺陷穩定化與論文提出的共價金屬—載體相互作用，並核對實驗依據。
4. 點選 **Show notes sidebar**，讓已儲存的筆記顯示在原文旁。使用 **Add tag** 新增已有標籤，本例選擇 **Favorites**。
5. 標記結束後切回 **Select**。需要調整最近的批註操作時，使用 **Undo annotation change** 和 **Redo annotation change**，無需修改源 PDF。

![原始 PDF 旁顯示已儲存的高亮和閱讀筆記](/img/open-science/v0320/pdf-highlight-sidebar.webp)

處理圖表或掃描頁時，可以使用 **Select area to annotate** 框選目標區域。區域標記用於保留位置，本身不會提取文字或驗證圖表；無法選中文字時，仍可用它標記需要回看的部分。

## 整理頁面筆記和整篇筆記 {/* #document-notebook */}

1. 開啟 **Notes & Annotations**，或從側欄選擇 **Open full notes view**。
2. 對整篇論文的問題，使用 **Add note → Add document note**；針對某一頁的問題，使用 **Add page note**，儲存前核對頁碼欄位。
3. 輸入筆記並點選 **Save**。本例的整篇筆記詢問：加熱後，哪些顯微、光譜和催化測量證據能夠區分孤立原子與奈米顆粒。
4. 透過 **Search & filter** 按筆記文字、型別或標籤篩選。側欄中的 **All notes** 和 **Current page** 用於切換全部批註與當前頁批註。
5. 點選段落或區域筆記的 **Show annotation source** 返回儲存的位置。**Edit annotation note** 修改評論；**Delete annotation** 刪除該批註，不會刪除 PDF。

![完整筆記頁中的文件筆記、原文引用和帶標籤的高亮](/img/open-science/v0320/pdf-notebook.webp)

## 從其他頁面找回筆記 {/* #find-notes */}

按 **Cmd/Ctrl+K** 開啟全域搜尋，輸入筆記中的短語，再選擇 **Library**。本例搜尋 `covalent metal-support`。選中結果後，分別檢視 **Notes** 中的筆記和 **Quoted text** 中的原文引用，再點選 **Show annotation source** 開啟 PDF 並返回標記段落。

![全域搜尋分別顯示閱讀筆記和引用的 PDF 原文](/img/open-science/v0320/pdf-search-details.webp)

回看時核對檔名、檔案版本和頁碼。PDF 筆記不會自動成為給 Main 的新訊息或指令；需要向 Agent 提問時，使用 **To Agent**，並在傳送前檢查草稿。

## 匯出筆記或閱讀副本 {/* #export-notes */}

| 輸出 | 操作方法 | 檢查內容 |
| --- | --- | --- |
| Markdown 或 CSV 筆記 | 在 **Notes & Annotations** 選擇 **Markdown** 或 **CSV**，再點選 **Export notes** | 開啟匯出檔案，檢查引用、評論、頁碼和標籤；篩選後出現的 **Export filtered notes** 只匯出當前子集，需要全部筆記時先清除篩選 |
| 帶批註的 PDF | 開啟 PDF 下載選單，選擇 **Download PDF with annotations** | 另存為獨立檔案，用 PDF 閱讀器開啟，檢查高亮和筆記內容，不能只確認檔案存在 |
| 原始 PDF | 選擇 **Download original PDF** | 儲存原始檔，不把文件筆記中的標記寫入原始檔案 |

![原始 PDF 與帶批註 PDF 使用不同的下載入口](/img/open-science/v0320/pdf-export-options.webp)

本例儲存了兩條筆記：一條附有評論的高亮，以及一條整篇文件筆記。二者均保留在 <ExampleDownload path="/examples/v0320/lang2019-notes.md">Markdown 匯出</ExampleDownload>和 <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV 匯出</ExampleDownload>中。帶批註 PDF 保留論文的十頁內容並加入高亮和筆記，原始下載檔案則單獨保留。原文摘錄來自 Lang 等人的論文，遵循該論文的 [CC BY 4.0 許可](https://creativecommons.org/licenses/by/4.0/)；評論是本例的閱讀問題。

## 筆記的共享範圍 {/* #笔记的共享范围 */}

**文獻庫附件**在使用同一受管理檔案版本的文獻記錄、專案和會話之間共享筆記。**專案上傳檔案和產物**在所屬專案的會話之間共享筆記。新檔案版本是不同的批註物件；閱讀修訂稿前，應先確認標記對應哪個版本。

這些筆記儲存在本機，不會跨裝置同步。交接時匯出筆記或帶批註 PDF，並檢查接收者實際拿到的內容。這不會改變私人會話書籤的規則，也不代表所有閱讀筆記都會包含在 [.science 研究包](research-packages.md)中。
