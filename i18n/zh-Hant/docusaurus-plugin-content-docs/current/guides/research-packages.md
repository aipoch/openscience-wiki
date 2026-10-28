---
title: ".science 研究包"
description: "將會話、檔案和證據一起匯出，再匯入專案檢視與交接研究記錄。"
last_update:
  date: '2026-10-27'
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

## 確認接收方版本 {/* #package-compatibility */}

**v0.33.0** 匯出的研究包在 `ro-crate-metadata.json` 中包含 **RO-Crate 1.1** 後設資料，描述最終匯出快照與選定的不可變檔案，包括檔名、媒體型別及相互關係。再次匯出時，會為新快照重新生成這些引用。

使用 **v0.33.0 或後續相容的讀取器** 開啟新匯出的研究包：它們宣告瞭必需的 `ro-crate` 能力。接收方版本較舊時，先更新應用再匯入；改名或刪除後設資料不能解決相容問題。原有舊研究包仍可讀取，無需遷移。

這些後設資料隨 `.science` 研究包儲存，不會重新執行計算、授予憑證，也不替代[針對產物版本的可復現性檢查](reproducibility.md)。

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

在專案的 **New conversation** 空白頁，點選 **Import previous research** 選擇 `.science` 檔案，或把檔案拖到該頁面。選擇已有會話中的附件入口不會替代研究包匯入。開啟匯入預覽後，檢查目標專案和內容，再確認匯入；等待完成後開啟只讀記錄。

![新會話中的 Import previous research 入口](/img/open-science/v0341/package-entry.webp)

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

兩個新檔案儲存在 Fork 中，原會話和匯入會話的彙總檔案保持不變。通用操作見[複製已有會話繼續研究](sessions.md#fork-session)。匯入的用量不會計入本機活動總量。

隨包收到的驗證記錄描述傳送方提供的檢查，不代表這臺電腦已經重新執行。閱讀它對應的檔案版本、比較條件和結果；檢查方式見[可復現性](reproducibility.md)。

## 調整傳輸速度並檢視後臺進度 {/* #transfer-settings */}

匯出前，選擇 **Customize contents → Transfer settings**；匯出或匯入執行中，展開 **Transfer details**。透過 **Disk activity limit** 選擇 **Auto** 自動調整，或指定一個固定上限。降低上限會減少磁碟佔用，也會延長傳輸時間；該上限由讀取和寫入共同使用，不是網路上傳速度。

選擇 **Run in background** 後，研究包操作繼續執行。透過視窗中的後臺進度入口重新開啟詳情，檢視當前檔案、進度和磁碟活動。確認操作完成後再檢查匯出的檔案或開啟匯入會話。

![研究包的磁碟活動上限和傳輸設定](/img/open-science/v0333/package-transfer.webp)

## 匯出提示敏感內容時 {/* #sensitive-export */}

如果匯出停在敏感內容檢查，展開 **Sensitive-content evidence**，檢查觸發提示的檔案。不應交接的憑據或私密資料應先從來源中移除，再發起新的匯出。

若這些內容確實屬於獲准交接的資料，可在失敗的匯出中勾選 **I understand the risk and want to export anyway**，再點選 **Export anyway**。這會**原樣包含已標記內容，不做脫敏**，不是隱私過濾功能。確認僅適用於這次匯出嘗試，失敗後需重新勾選；分享前仍應檢查生成的研究包。只需排查問題時，使用[診斷匯出](troubleshooting.md#session-diagnostics)。

## 取消與重試傳輸 {/* #取消与重试传输 */}

**Run in background** 隱藏進度視窗並繼續傳輸；需要停止時使用 **Cancel**。關閉進度視窗不等於取消操作。

清理未完成時，先處理 **Retry cleanup** 再重試。失敗後的 **Try again** 重試原檔案和目標位置；需要換包時另行選擇。再次匯入前先檢查已有操作，完成後回讀匯入的會話與檔案。

## 回放收到的研究記錄 {/* #replay-import */}

匯入完成後，選擇 **View replay** 檢視記錄步驟，或用 **Discuss** 在可寫會話中提問。匯入的源會話仍保持只讀，討論引用不會恢復原執行環境；需要工作副本時使用 **Fork to continue**。詳見[會話回放](session-replay.md)。

## 匯入新專案 {/* #new-project-import-recovery */}

舊版本接納研究包到新專案目錄時失敗，可更新至 v0.37.0 或更高版本，先檢查目標專案是否已存在，再使用匯入對話方塊的恢復操作，避免重複匯入。完成後核對會話與檔案。這項修復不會讓匯入會話變成可寫；繼續分析仍需使用 **Fork**。

## 從網頁導入研究包 {/* #browser-import */}

瀏覽器和已安裝的桌面應用需要位於**同一臺電腦**。網頁必須提供 Open-Science 研究包傳輸功能；普通下載鏈接本身不具備這個功能。

1. 在可信的研究包頁面選擇 Open-Science 導入／打開入口，允許瀏覽器打開桌面應用。如果瀏覽器請求本地網絡訪問，只授權給你打算使用的網站。
2. 應用顯示 **Receiving package…** 和 **Validating package…** 時，保持網頁打開。網頁顯示已接收，只表示文件已送達應用。
3. 在應用中核對研究包，選擇目標項目並確認導入。等待完成後打開導入的會話。
4. 檢查文件與證據。研究記錄仍爲只讀；需要繼續研究時選擇 **Fork to continue**。修改標題不會讓導入的研究記錄變爲可寫。

如果網頁傳輸不可用或被阻止，先下載 `.science` 文件，再使用現有導入入口；也可以把它拖到項目首頁。向 Composer 拖入普通文件夾不會導入研究包。導入報告部分失敗時，先檢查目標項目中是否已存在該會話，再決定是否重試，不要爲重複傳輸另建項目。

網站開發者可參考[瀏覽器導入 SDK 指南](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/BROWSER_IMPORT.md)：需要 HTTPS（或本機迴環開發地址）、同機桌面應用，以及非空且不超過 2 GiB 的研究包。本地接收不替代用戶最後的導入確認。

## 從 CLI 或本地網頁使用研究包 {/* #local-package-transfer */}

從 v1.0.3 起，CLI 和已認證的本地網頁可使用會話研究包。在本地網頁中使用會話導出或項目導入入口，並按提示填寫運行服務的計算機上的路徑。遠程網頁會話不支持任意路徑的研究包傳輸。上面的“網站傳給桌面應用”屬於另一種流程。

使用 CLI 前，先啓動目標本地配置對應的服務，等待源會話空閒。將以下 ID 和路徑替換爲自己的值：

```bash
open-science session export SESSION_ID --project PROJECT_ID --output ./session.science --json
open-science session import ./session.science --new-project "Restored research" --non-interactive --json
```

導出必須明確提供 `.science` 輸出路徑。導入必須帶 **--non-interactive**，它會代替你確認預覽，因此先檢查研究包來源和目標位置。使用 **--project** 選擇已有項目，或使用 **--new-project** 創建項目，兩者不能同時使用。均未指定時，按研究包中的項目名稱創建新項目。默認請求時限爲一小時，大文件傳輸可調整 **--timeout-ms**。

檢查結果中的保存路徑或導入會話。導入記錄仍爲只讀，繼續研究請使用 **Fork**。v1.0.4 還修復了選擇保存位置後導出仍可能停留在等待狀態的問題。
