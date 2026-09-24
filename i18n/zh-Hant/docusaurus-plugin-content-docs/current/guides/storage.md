---
title: "儲存與歸檔內容"
last_update:
  date: '2026-09-24'
---

# 儲存與歸檔內容 {/* #存储与归档内容 */}

**Settings → Storage** 檢視託管資料位置和用量，**Settings → Archived** 管理不活躍的專案/會話。歸檔不會遷移資料根目錄，也不保證釋放空間。

## 檢視與重新整理磁碟用量 {/* #查看与刷新磁盘用量 */}

![研究示例執行後的實際託管儲存](/img/open-science/local-acceptance/storage-installed-location.webp)

備份或排查檔案丟失前先確認 **Data location**。它是應用託管根目錄，與專案授權訪問的外部源目錄不同。**Refresh** 重新掃描，比較數值前檢查最近掃描時間。

| 類別 | 統計內容 | 如何理解 |
| --- | --- | --- |
| Artifacts | 託管研究產物及保留資料 | 最新報告很小，仍可能保留舊版本 |
| Uploads | 上傳輸入副本 | 刪除外部原檔案不刪除此副本 |
| Runtime | 託管直譯器及依賴，可展開 | 通常大於小型示例資料 |
| Notebooks | 會話執行儲存 | 刪除所屬工作前匯出所需 Notebook |
| Execution evidence | 版本捕獲證據 | 與當前活躍核心不同 |
| Session workspaces | 對話工作檔案 | 工作檔案未必已釋出為產物 |
| Compute cache / Subagent workspaces | 快取或子任務工作資料 | 先識別用途，不能一概視作可刪除 |
| Total / Available space | 託管總量與裝置剩餘空間 | 是測量值，不是最低安裝要求 |

磁碟佔用隨檔案與執行環境變化。讀取各類別的實際佔用，再使用對應管理入口；統計類別不意味著該類內容可以安全地一鍵清理。

<span id="提交迁移前检查" />

## 遷移資料位置 {/* #迁移数据位置 */}

### 遷移前準備 {/* #迁移前准备 */}

結束活動任務，匯出重要輸入、輸出和執行記錄。記下當前資料位置及所需軟體包。遷移科研資料不會一併遷移所有應用設定和對話歷史；它們仍儲存在配置位置。

### 選擇目標並提交 {/* #选择目标并提交 */}

1. 點選 **Change location** 閱讀遷移說明。
2. **Continue** 開啟目標目錄表單。
3. 填寫 **New location**，用 **Browse…** 選擇，或選 **Move back to the default location**。
4. 核對源、目標、可用空間和環境重建提示。
5. **Change location** 提交有效遷移，**Cancel** 保留原位置。

![遷移表單與執行環境重建提示](/img/open-science/local-acceptance/storage-destination-form.webp)

應用移動已有科研資料，但 Python/R 環境在**重啟後重建，而非複製**。共享包快取會複製以支援離線重建，僅透過 pip/CRAN 安裝的包不保證恢復。額外重建空間無法可靠預估。實際遷移前記錄環境依賴，之後測試所需執行環境。

### 重啟後檢查目標位置 {/* #重启后检查目标位置 */}

1. 開啟 **Settings → Storage**，確認 **Location** 已變為選擇的目標。
2. 重開已有專案、儲存的報告及歷史修訂，同時檢查文獻庫、集合、專案關聯和 PDF 附件。
3. 開啟 Notebook，檢查可用執行環境，並用已有輸入重新執行一項小型只讀計算。複製成功不代表執行環境已經可用。
4. 完成檢查前保留原資料與匯出檔案。比較檔案內容或校驗和，並核對文獻、集合、專案關聯、附件和引用設定。另儲存並重開一份新結果，確認目標位置可寫。

使用外部 R 直譯器時，確認所選程式仍存在，Notebook 也繫結到該直譯器。載入分析所需的包，重新執行一個小計算，再開啟儲存的結果。外部直譯器及其已有包與應用託管環境分開；託管環境可能仍需重建。

### 移回預設位置 {/* #移回默认位置 */}

1. 結束正在執行的任務，選擇 **Change location → Continue → Or move it back to the default location**。
2. 核對來源、預設目標、可用空間與執行環境重建提示，提交後等待 **Data copied**。
3. 點選 **Restart now**。重啟後到 **Settings → Storage** 檢查 **Location**；複製完成但未切換位置時，按[遷移恢復](#数据已复制但切换失败)處理。
4. 重新開啟原專案及儲存檔案。在 **Runtimes** 檢查託管 Python/R，需要時執行 **Download and setup**，再用原輸入做一次小型只讀計算。

移回後，開啟一個已有專案，檢查原始輸入和已儲存報告能否讀取。確認託管執行環境已就緒，再執行一個小任務並儲存新結果；重新開啟該結果，確認應用使用的是預設資料位置。

![返回預設位置後重新開啟的 R 結果](/img/open-science/local-acceptance/r-default-chart.webp)

如果顯示 **A different folder named OpenScience already exists here. Choose another location.**，應用會阻止覆蓋。取消並保留衝突目錄；確認它的歸屬、內容及備份後再處理，不要直接刪除同名目錄。只有目標透過校驗後才重新提交遷移。

### 資料已複製，但切換失敗 {/* #数据已复制但切换失败 */}

**Data copied** 表示複製與檢查完成，仍需 **Restart now** 完成資料位置切換。如果出現 **Could not prepare the app to switch data locations safely. Please try again.**，不要把遷移視為成功，也不要手動更改內部路徑。

1. 記下錯誤和原始、目標位置，確認原專案與檔案仍可開啟。
2. 再次開啟 **Change location**。檢測到未完成複製時，選擇 **Resolve unfinished move**。
3. **Finish move** 嘗試完成已有複製的切換；**Discard copy** 放棄未完成遷移的副本，保留原位置。先閱讀確認範圍。
4. 若出現 **Conversation storage needs attention**，處理未完成遷移後選擇 **Retry**，然後重開原專案和報告。

![未完成遷移的恢復選項](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

如果最終切換反覆失敗，先結束活動任務，退出並重新開啟應用，再重試遷移。仍報錯時，保留原位置和錯誤詳情，先排查原因，再決定是否重新遷移。


## 歸檔並恢復會話 {/* #归档并恢复会话 */}

先選擇準備歸檔的會話，完成或停止其中的活動任務。需要比較恢復狀態時，保留另一份已完成會話。

1. 會話行選單選擇 **Archive**。
2. 確認它離開活躍列表。
3. 開啟 **Settings → Archived**。
4. 在 **Sessions** 下核對標題、專案和歸檔時間。
5. 點選該行 **Restore**。
6. 返回專案確認會話重新可見。

恢復歸檔會話應點選**條目行的 Restore**，視窗級 Restore 只調整設定佈局。歸檔專案從 **Projects → Manage** 檢視其會話後再恢復或刪除。

## 歸檔並恢復整個專案 {/* #归档并恢复整个项目 */}

1. 在首頁專案卡片選單選擇 **Archive**。
2. 開啟 **Settings → Archived → Projects**，進入該專案的 **Manage** 行。
3. 核對專案及會話列表。會話可能顯示 **Hidden because its project is archived**，這不等於每個會話都被單獨歸檔。
4. 選擇 **Restore project**。
5. 重開專案、對話和已儲存報告。

![管理已歸檔的 GSE60450 專案](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

恢復後重新開啟儲存報告及其修訂。歸檔用於整理專案，不會重新執行分析或刪除報告的版本歷史。

<span id="删除可丢弃的测试项目" />

## 永久刪除專案 {/* #永久删除项目 */}

**Delete project** 會開啟永久刪除確認。確認前閱讀影響範圍：託管產物與上傳檔案不同於外部工作目錄檔案，後者不會被刪除。檢查哪些任務和核心將停止，以及 Storage 中保留哪些託管 Session 工作區。歸檔與刪除的結果不同。

![單獨建立的空專案的刪除範圍](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

學習刪除流程時，使用單獨的空專案。刪除包含研究工作的專案之前，核對確認框列出的受影響記錄。

## 區分移除操作 {/* #区分移除操作 */}

| 操作 | 恢復性與影響 |
| --- | --- |
| Unpin | 僅更改會話排序位置 |
| Archive | 可恢復的整理，保留工作 |
| Restore | 恢復使用，不重新執行科研任務 |
| 移除目錄授權 | 更改外部目錄訪問，不刪除目錄 |
| 刪除專案/會話 | 經確認永久刪除，先閱讀涉及記錄與檔案 |
| 文獻 Move to Trash | 獨立的文獻生命週期，在文獻 Trash 恢復 |

永久刪除前，匯出需要保留的輸入、輸出和執行記錄，檢查其他工作是否仍引用它們。確認範圍包含應保留內容時，請取消操作。

## 儲存或恢復失敗 {/* #存储或恢复失败 */}

下載失敗檢查目標目錄和空間；託管檔案不可用先核對資料位置和配置檔，不要立即新建替代專案；遷移後缺包檢查重建環境，不要直接判斷研究資料丟失。如何收集版本和首條有效錯誤見[排查](troubleshooting.md)。

原始碼：[儲存面板](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx)、[遷移表單](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx)。 [文獻庫遷移檢查](https://github.com/aipoch/open-science/commit/d00c722d)。

## 升級後重新開啟已有資料 {/* #historical-data-location */}

應用優先使用已儲存的資料位置。舊安裝已完成初始化、但沒有明確儲存位置時，Open-Science 會保留歷史位置並儲存該選擇。已儲存的資料夾不可用時，先重新連線，再啟動。若多個歷史位置都含有研究資料，應用會要求選擇或恢復原資料夾，不會靜默選一個。核對專案與檔案前保留各份資料，不要用新建空目錄處理看似丟失的資料。
