---
title: "開啟與預覽檔案"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 開啟與預覽檔案 {/* #打开与预览文件 */}

開啟儲存結果，檢查所選版本。本頁說明通用檢視控制元件與普通文件格式。資料解釋見[表格](../tools/tables.md)，序列與結構專用控制元件見[科學檢視器](../tools/viewers.md)。

## 開啟、放大和返回 {/* #打开放大和返回 */}

點選生成檔案卡片開啟預覽。**Open … in split view beside the session** 將檔案放在對話旁。切換標籤檢視其他檔案，**Open full screen preview of …** 放大單個檔案，**Close preview of …** 關閉相應檢視。**Collapse preview panel** 隱藏面板，不刪除檔案。檔案預覽全屏與 Files 檔案庫全屏是不同檢視。

| 標題欄控制元件 | 含義 |
| --- | --- |
| 檔名與版本 | 下載或引用前確認目標 |
| Download | 儲存該結果的副本 |
| File actions → Provenance | 檢視託管產物版本的證據 |
| View in context | 返回產出會話 |
| Previous / Next file version | 切換已有不可變版本 |
| Edit / Compare | 僅適用於支援的託管內容，見[檔案](files.md) |
| Close | 關閉檢視，不是刪除 |

以上關閉行為適用於檔案預覽。[Side Chat 標籤](delegation.md)會另行要求確認：關閉後停止該旁聊並移除對話。完整重啟應用也會清除其餘旁聊；已經送達 Main 的訊息仍會保留。

想為自己儲存閱讀位置時，選中文字或 PDF 區域後選擇 **For me**，參閱[閱讀書籤](bookmarks.md)。

## 按格式閱讀檔案 {/* #按格式阅读文件 */}

### 閱讀結果表 {/* #阅读结果表 */}

<p className="example-label"><strong>案例演示</strong> 閱讀 RNA-seq 質控表、圖表與報告</p>

開啟 `rnaseq-sample-qc.csv`，本例顯示 **12 rows · 6 columns**，首行作為表頭。橫向滾動可檢視較長的原始列名及右側指標。行號是顯示位置，不是基因或樣本編號。

![十二樣本質控表](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

檢查列名與完整標識是否可讀。欄位解釋與公共基準核對見[表格與資料集](../tools/tables.md)。

原 `.txt` 是製表符分隔矩陣，可能以文字而非 CSV 網格顯示。改副檔名不會自動改變分隔符或資料含義。大檔案預覽可能受限，應閱讀顯示的行列限制，不能把可見部分當作全部資料。格式限制見[參考](../reference/formats.md)。

### 檢查圖表 {/* #检查图表 */}

開啟 `rnaseq-library-sizes.png`，使用 **Zoom in / Zoom out / Reset zoom**。標籤太小時開啟全屏。縮放只改變顯示，不重新取樣，也不更新統計結果。

![全屏顯示實際原始計數總量圖](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

核對原始計數座標軸、十二個樣本標籤以及 CSV/報告中的名稱對應。柱高不同不能單獨證明差異表達。本例只做分析前的描述性檢查，沒有歸一化或假設檢驗。

### 結合方法與溯源閱讀 {/* #结合方法与溯源阅读 */}

Markdown 渲染標題、列表、程式碼和連結。接受圖表前檢查校驗和及方法。連結透過相應來源預覽或外部瀏覽器開啟，先核對完整域名。載入失敗不等於已閱讀來源。

透過 **Provenance** 檢查所選產物的程式碼、執行日誌、訊息、環境及審查。出現 **partial / bounded / No review for this version** 時，按 [Notebook 與執行證據](notebook.md)理解其範圍。

### 閱讀 Office 檔案與多頁影象 {/* #阅读-office-文件与多页图像 */}

<p className="example-label"><strong>案例演示</strong> 檢視質控結果的 Office 與 TIFF 閱讀副本</p>

<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Word 報告</ExampleDownload>、<ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Excel 工作簿</ExampleDownload>、<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">PowerPoint 幻燈片</ExampleDownload>和<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">雙頁 TIFF</ExampleDownload>整理了同一份 GSE60450 QC 結果，屬於閱讀副本，不是新的分析。

| 格式 | 操作與檢查重點 |
| --- | --- |
| DOCX | 附加並開啟報告，滾動閱讀兩頁，檢查首個樣本的數值及方法與解釋。全屏預覽能容納較長行；這裡沒有 Word 編輯工具欄 |
| XLSX | 開啟工作簿，在底部選擇 **Summary** 或 **Samples**。橫向滾動檢視最後一列。Samples 有 12 行樣本，加上表頭、間隔和來源說明共 17 個已用行；預覽顯示 17 行不表示有 17 個生物樣本。已儲存的單元格數值也不證明重新計算過公式 |
| PPTX | 從 QC 摘要向下滾動到 Methods and interpretation。兩頁幻燈片均已在本地渲染；此處是閱讀檢視，不是編輯器或放映控制檯 |
| TIFF | 用 **Next page / Previous page** 切換。兩頁分別顯示原始文庫大小和有計數基因的中位數。**Zoom in / Zoom out / Reset zoom** 只改變檢視；解釋影象前確認 **Page 1 of 2** 或 **Page 2 of 2** |
| JSON | 開啟<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">摘要檔案</ExampleDownload>檢查原始碼、識別符號和數值。它以程式碼顯示，不是可展開的物件樹 |
| HTML | 開啟<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">閱讀表格</ExampleDownload>，**Source** 檢視 HTML，**Render** 返回排版檢視，兩者都不會重跑 QC |

![實際工作簿中選擇 Samples](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![實際 TIFF 的第二頁](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

出現 **Preview unavailable → Open this Office file in your default app to view it.** 時，本地檔案可使用 **Open**，託管上傳檔案可使用 **Download**，再透過相容應用開啟。內建預覽無法顯示時，仍可用這條路徑檢視原檔案。

### 其他受支援的預覽 {/* #其他受支持的预览 */}

下表列出各類檔案可用的預覽方式與控制入口。

| 型別 | 檢查重點 | 控制元件與邊界 |
| --- | --- | --- |
| PDF | 頁碼、可讀文字、原始檔 | 縮圖、目錄、文件搜尋、翻頁、縮放、文字/區域選擇；掃描頁可能沒有可搜尋文字 |
| 程式碼/文字 | 所需程式碼塊是否完整、語言 | 行號、語法顯示、複製/下載；超大內容可能受限 |
| JSON / HTML | 結構或渲染內容 | 渲染不代表允許以應用權限執行程式碼 |
| 影象 / TIFF | 解析度與目標圖 | 縮放/平移；TIFF 使用專用渲染流程 |
| Office | 託管渲染是否成功 | DOCX/XLSX/PPTX 不可預覽時下載後外部開啟；不等於完整 Office 編輯 |
| 生物序列 | 序列身份和範圍 | 支援的 FASTA 使用序列檢視 |
| 分子結構 | 解析模型和表現方式 | 旋轉、縮放、平移及支援的 Cartoon/Stick/Sphere/Surface/Line；缺少結構資訊可能禁用某種表現 |
| 未知格式 | 檔名、大小、回退提示 | 下載到合適軟體檢視；副檔名不證明內容有效 |

PDF 上下文只關聯當前任務需要的論文，後續不應使用時取消關聯。每會話最多關聯三份 PDF。沒有附全文的文獻條目提供後設資料，不代表模型已閱讀全文，見[文獻庫](library.md)。

### 圖表原始碼與不同格式的控制元件 {/* #图表源码与不同格式的控件 */}

對話中的 Mermaid 圖渲染完成後，可在操作欄點選 **View source** 檢視圖表原文，**View diagram** 返回圖形。渲染前不提供此切換；圖表被錯誤面板替代時，切換不可用。切換僅改變顯示，不修改分析或原始檔。

<p className="example-label"><strong>示例</strong> 切換 Mermaid 圖表與原始碼</p>

在新會話請求：**显示一个 Mermaid 流程图，包含三个步骤：附加文件 → 检查预览 → 保存报告，不要加入文件链接。** 渲染完成後，將指標移到圖上，選擇 **View source**，核對三個節點。選擇 **View diagram** 返回；標籤過小時使用 **View fullscreen**。

流程圖展示請求中的步驟。檢查已儲存檔案時，請開啟實際檔案卡片；流程圖節點本身不是產物引用。

| 格式 | 應檢查的行為 |
| --- | --- |
| 單頁 PDF | 不顯示多頁 Reading 入口，使用普通 PDF 預覽控制元件 |
| CSV | 檢查顯示範圍，有限預覽不能當作完整輸入或匯出 |
| Office 工作簿 | 檢查所選可見工作表及渲染錯誤，不支援的編輯使用原檔案 |
| TIFF | 先檢查選中頁和渲染結果，再解釋畫素或樣本值 |
| JSON | 格式重要時核對保留的源文字 |
| Markdown 表格 | 聚焦表格操作，使用鍵盤訪問複製、下載和全屏控制元件 |

## 提取 PDF 圖片與表格 {/* #pdf-extraction */}

需要從文獻 PDF 取得圖片或可複用表格時，使用此功能。先在[文獻庫](library.md)新增並檢查 PDF；只有文獻後設資料不能作為提取輸入。

1. 開啟 PDF 預覽，選擇 **Original PDF** 旁的 **Figures and tables**。
2. 首次使用時選擇 **Download and continue**，安裝所需模型資源，並等待安裝和完整性檢查。資源就緒後使用 **Analyze PDF**。
3. 檢視逐頁進度。完成後選擇候選圖表，用 **Show in PDF** 對照原文頁面、圖注及周圍文字。
4. 圖片可在影象預覽中使用 **Copy image** 或 **Download image**。表格選擇 **Table**，再選擇 **TSV**、**HTML** 或 **Markdown**，使用對應複製/下載操作；需要檢查原始裁圖時選擇 **Image**。
5. 重新開啟匯出檔案，檢查行列對應、合併表頭、單位、腳註和跨頁內容，再用於分析或報告。

模型資源下載後，提取在本地執行。重新開啟同一 PDF 可以複用快取結果；需要重新提取時使用 **Analyze again**。需要停止時使用進度中的取消控制元件。分析未完成時，先檢查失敗頁提示，不要把當前可見候選項當作整篇文件的全部圖表。

**Unplaced table text** 和 **Table notes** 保留需要人工核對的內容。結構化單元格不可用時，對照原始裁圖和 PDF，不要推測缺失單元格。此提取流程暫不支援掃描頁和旋轉頁；提取不可用不等於 PDF 本身不能閱讀。

### 讓 Agent 讀取已提取的圖表 {/* #pdf-agent-evidence */}

1. 開啟目標 PDF，使用 **Read with agent** 將它連結到當前會話，並在 **Figures and tables** 完成相關頁面的分析。傳送問題前，確認輸入框中仍有該 PDF 的閱讀上下文。只有文獻庫記錄不等於已連結 PDF，連結本身也不會啟動這項分析。
2. 提問時指明具體的圖、表或演算法，提供編號或頁碼，以及要回答的問題。
3. 檢視工具活動：**list_pdf_elements** 列出可用的提取元素，**read_pdf_element** 讀取所選證據。要求回答標明來源頁碼，以及缺失或不確定的內容。
4. 對照原圖或原表，核對表頭、單位和註釋。若尚未提取或結果不完整，先分析缺失頁面再重試；只有圖注不能證明趨勢或精確表值。

<p className="example-label"><strong>示例</strong> 要求讀取已連結論文的表格證據</p>

> 從已連結 PDF 的提取元素中讀取 Table 1，報告物理 PDF 頁碼、列標題和與我的問題有關的數值。保留單位與腳註，明確說明缺失單元格或提取不完整的地方。

這些工具讀取已有提取結果，不會自行啟動 PDF 分析。表格可能分批返回，圖和演算法內容可能以圖片提供。需要圖片證據時，確認所選模型支援相應輸入；圖片已送達不等於已正確解讀。

## 主動載入遠端媒體 {/* #remote-media */}

模型回覆引用的遠端圖片、音訊和影片，需要你主動載入。操作前閱讀控制元件顯示的目標主機。授權只針對當前媒體元素及其地址，不覆蓋所有後續回覆或整個域名；關閉預覽也不能撤回已經發出的請求。

含遠端圖片的 Mermaid 圖可能在載入前被阻止；需要時可要求生成不含嵌入圖片的普通圖。圖片傳送給模型時，Open-Science 會移除模型輸入副本的附加後設資料，原檔案保留。這不會移除圖片畫面中直接可見的敏感內容。

## 下載後核對原檔案 {/* #下载后核对原文件 */}

開啟目標預覽，選擇 **Download**，在系統儲存視窗確認檔名和位置，然後儲存。重新開啟下載副本，檢查內容。下載儲存的是原檔案；TIFF 翻到第二頁或 Excel 切換工作表不會把下載限制為當前頁或工作表。

## 預覽失敗時 {/* #预览失败时 */}

先確認儲存成功，再核對版本和格式。嘗試下載，區分渲染器限制與檔案不可用。本地檔案在外部修改後，可用 Reload 重新讀取。不要為修復顯示而覆蓋輸入。排查時記錄檔名、型別、大小、應用版本和報錯，不必分享無關私有內容。

實現依據：[Mermaid](https://github.com/aipoch/open-science/commit/5f6e7995)、[PDF 條件](https://github.com/aipoch/open-science/commit/2722da2a)、[CSV](https://github.com/aipoch/open-science/commit/9275c2c0)、[Office](https://github.com/aipoch/open-science/commit/0291871f)、[TIFF](https://github.com/aipoch/open-science/commit/52152ed4)。

專業格式的入口、控制元件和檔案要求見[科學檢視器](../tools/viewers.md)。

## 批註 PDF {/* #批注-pdf */}

開啟 **Notes & Annotations** 管理高亮、區域標記、頁面筆記和文件筆記。**Show notes sidebar** 可以把筆記顯示在原文旁。下載選單區分 **Download original PDF** 與 **Download PDF with annotations**。完整的閱讀、搜尋與匯出步驟見 [PDF 批註與文件筆記](pdf-notes.md)。

首次使用 **Figures & Tables** 安裝本地模型時，如果主下載源無法訪問，應用可以嘗試受認可的備用映象。等待下載和完整性檢查完成後，再選擇 **Analyze PDF**。映象不會省去本地資源安裝；已有快取結果可以直接重新開啟。
