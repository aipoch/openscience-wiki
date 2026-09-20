---
title: ".science 研究包"
description: "將會話、檔案和證據一起匯出，再匯入專案檢視與交接研究記錄。"
last_update:
  date: '2026-09-20'
---

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

以下截圖使用匯總 [GSE60450 樣本質控表](../reference/example-data.md)的會話。在匯出預覽中比較 **Essential export** 和 **Full export**，檢視預計大小，再選擇 **Export**。具體內容和大小取決於你的會話。

![研究包匯出預覽，包含 Essential export、Full export 和 Customize contents](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## 匯入到專案 {/* #import-and-inspect-a-package */}

1. 開啟目標 Project 選單，選擇 **Import Session package…**，或將一個 `.science` 檔案拖入該專案。直接開啟關聯檔案時，需要另選目標專案。
2. 檢查包預覽、目標位置以及包含或省略的內容，再確認匯入。
3. 等待完成，選擇 **Open imported Session**。
4. 檢視會話分支，並開啟交接所需檔案，確認能找到下一項工作涉及的輸入和結果。

## 使用收到的研究記錄 {/* #使用收到的研究记录 */}

匯入會話本身仍為只讀。在桌面端開啟該會話的選單，選擇 **Fork**；等待 **Fork completed**，進入新會話，檢查繼承的檔案後再傳送後續任務。原會話保持不變，程式碼不會自動執行。詳細步驟和檢查方法見[複製已有會話繼續研究](sessions.md#fork-session)。匯入的用量不會計入本機活動總量。

隨包收到的驗證記錄描述傳送方提供的檢查，不代表這臺電腦已經重新執行。閱讀它對應的檔案版本、比較條件和結果；檢查方式見[可復現性](reproducibility.md)。

## 取消與重試傳輸 {/* #取消与重试传输 */}

**Run in background** 隱藏進度視窗並繼續傳輸；需要停止時使用 **Cancel**。關閉進度視窗不等於取消操作。

清理未完成時，先處理 **Retry cleanup** 再重試。失敗後的 **Try again** 重試原檔案和目標位置；需要換包時另行選擇。再次匯入前先檢查已有操作，完成後回讀匯入的會話與檔案。
