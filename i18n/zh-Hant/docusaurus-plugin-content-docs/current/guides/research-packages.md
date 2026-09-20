---
title: ".science 研究包"
description: "將會話、檔案和證據一起匯出，再匯入專案檢視與交接研究記錄。"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# .science 研究包 {/* #science-研究包 */}

**.science 研究包** 將會話分支、檔案和已記錄的證據放在一起，供同事交接與檢視。接收方可以將其匯入專案，檢查研究記錄。匯入會話仍為只讀。從 v0.31.0 起，可以在桌面應用中使用 **Fork** 建立可編輯的副本，繼續研究。

## 選擇要分享的內容 {/* #选择要分享的内容 */}

| 接收方需要什麼 | 使用哪種匯出 |
| --- | --- |
| 閱讀或編輯對話文字 | [對話 PDF 或 Markdown](sessions.md) |
| 使用選定的原始檔案 | [檔案下載或產物 ZIP](files.md) |
| 一起檢視會話分支、檔案和證據 | `.science` 研究包 |

研究包可能包含上傳的研究材料、對話文字和生成結果。分享前先檢查內容。匯出是獨立副本，刪除本地工作不會移除已經傳送給他人的包。

Side Chat 對話、私人[閱讀書籤](bookmarks.md)及備註不會包含在研究包中。同事需要的資訊，應在匯出前寫入儲存的報告或對話。

## 匯出研究包 {/* #export-the-session */}

1. 完成或停止會話中的工作，開啟會話選單，選擇 **Export → Export Session package**。
2. 檢查匯出範圍，以及省略內容和大小限制。
3. 確認匯出，將 `.science` 檔案儲存到目標資料夾。
4. 等待進度完成，再用 **Show in folder** 找到檔案。

| 匯出選項 | 如何選擇 |
| --- | --- |
| Essential export | 保留必要記錄和文獻後設資料，不含可選的文獻 PDF |
| Full export | 包含可用的文獻 PDF 及預覽中顯示的更多內容 |
| Customize contents | 逐項選擇文獻 PDF、可選檔案和版本；必需證據仍會包含 |

文獻後設資料始終保留。如果某份文獻 PDF 是必需證據，**Essential export** 會不可用，應使用 **Full export** 或 **Customize contents** 並保留該檔案。匯出不會替你獲取缺失的全文；確認前檢查列出的 PDF 和大小，**Full export** 仍受內容及大小限制。

<p className="example-label"><strong>案例演示</strong> 交接樣本質控會話</p>

本例在 Open-Science v0.31.1 中，將彙總 [GSE60450 樣本質控表](../reference/example-data.md)的會話匯出，匯入同一臺 Mac 的另一個專案，再使用 **Codex subscription** 從 Fork 繼續分析。起點是已經生成 `gse60450-qc-summary.csv` 的會話；單獨的輸入表格不是研究包。

選擇 **Essential export**，檢查內容和預計大小，再選擇 **Export**。本例預覽估計為 **805.6 KiB**。等待 **Package operation completed** 後再匯入儲存的檔案；你的會話大小可能不同。

![實際質控會話的匯出選項與預計大小](/img/open-science/v0311/package-export.webp)

## 匯入到專案 {/* #import-and-inspect-a-package */}

1. 開啟目標 Project 選單，選擇 **Import Session package…**，或將一個 `.science` 檔案拖入該專案。直接開啟關聯檔案時，需要另選目標專案。
2. 檢查包預覽、目標位置以及包含或省略的內容，再確認匯入。
3. 等待完成，選擇 **Open imported Session**。
4. 檢視會話分支，並開啟交接所需檔案，確認能找到下一項工作涉及的輸入和結果。

本例選擇目標專案 **Public Genomics Examples**，匯入預覽顯示 **1 個分支、3 條訊息、13 個檔案**，並說明不包含賬戶憑據、權限授權和提供方的會話續接身份。確認這些內容後選擇 **Import**。

![匯入目標專案前的質控研究包預覽](/img/open-science/v0311/package-import-preview.webp)

開啟匯入的會話及彙總 CSV。**Imported research history** 提示確認這份記錄為只讀，不能直接執行程式碼或繼續對話。

![匯入的質控記錄、繼承的彙總檔案和 Fork to continue 按鈕](/img/open-science/v0311/package-import-readonly.webp)

## 使用收到的研究記錄 {/* #使用收到的研究记录 */}

1. 在匯入會話中選擇 **Fork to continue**，或從會話選單選擇 **Fork**。等待 **Fork completed**，進入新會話；程式碼不會自動執行。
2. 檢查繼承的彙總檔案，選擇可用模型，確認 Python 執行環境就緒。本例使用 **Codex subscription / gpt-5.6-sol**。原安裝中的憑據與權限不會隨包成為接收端的授權。
3. 傳送下方提示詞。如果出現 Python 執行審批，先檢查計算內容，再批准繼續。

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

4. 開啟兩個新檔案。本次得到 **12** 個樣本、原始計數總和 **269027617**，平均值為 **22418968.08333333333333333333**。這是輸入質控表的彙總，不是標準化表達量或差異表達結果。

![Fork 完成後，Codex 實際建立的新計算檔案](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">繼承的彙總表</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">新計算結果</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">計算說明</ExampleDownload>

計算後，原會話、匯入會話和 Fork 中的彙總檔案 SHA-256 完全一致，兩個新檔案屬於 Fork。本例驗證了**同一臺 Mac 的不同專案間**匯出 → 匯入 → Fork → 繼續分析，沒有據此驗證跨裝置環境恢復、文獻與批註完整轉移或自動重放。通用操作見[複製已有會話繼續研究](sessions.md#fork-session)。匯入的用量不會計入本機活動總量。

隨包收到的驗證記錄描述傳送方提供的檢查，不代表這臺電腦已經重新執行。閱讀它對應的檔案版本、比較條件和結果；檢查方式見[可復現性](reproducibility.md)。

## 取消與重試傳輸 {/* #取消与重试传输 */}

**Run in background** 隱藏進度視窗並繼續傳輸；需要停止時使用 **Cancel**。關閉進度視窗不等於取消操作。

清理未完成時，先處理 **Retry cleanup** 再重試。失敗後的 **Try again** 重試原檔案和目標位置；需要換包時另行選擇。再次匯入前先檢查已有操作，完成後回讀匯入的會話與檔案。
