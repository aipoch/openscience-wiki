---
title: "會話與分支"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 會話與分支 {/* #会话与分支 */}

專案組織相關輸入和研究工作，會話是專案中的一段對話。獨立問題使用新會話，需要繼承指定歷史時使用分支。無論哪種方式，都要檢查新對話實際能夠訪問哪些檔案和執行記錄。

## 新建、命名與返回 {/* #新建命名与返回 */}

開啟專案，在 Sessions 下選擇 **New**，輸入併傳送請求。先核對專案名，新會話屬於該專案。點選會話行可返回，閱讀狀態後再判斷是否完成。

<p className="example-label"><strong>示例</strong> 為 RNA-seq 質控會話命名</p>

GSE60450 實際執行完成後，透過 **Edit…** 儲存了以下內容：

| 欄位 | 示例值 | 限制 |
| --- | --- | --- |
| Title | `RNA-seq count matrix - validation and sample QC` | 最多 80 字元，顯示計數 |
| Description | `Validate the public GSE60450 matrix and retain descriptive QC outputs with source integrity checks.` | 最多 1,000 字元 |
| Save | 儲存更改 | 關閉後核對側欄標題 |
| Cancel / Close | 不應用草稿 | 不取消科研任務 |

![會話名稱與說明編輯器](/img/open-science/guides-walkthrough/40-session-edit.webp)

會話行選單 **Pin** 將會話放入 Pinned，**Unpin** 返回普通列表。固定僅便於訪問，不維持核心執行，也不防止刪除。

將滑鼠移到會話上，可以同時檢視編號、標題及所屬專案。編號有助於區分同名對話，編輯或刪除前仍需確認選中的行。

## 儲存閱讀書籤 {/* #保存阅读书签 */}

使用[私人閱讀書籤](bookmarks.md) 為段落或 PDF 區域新增備註，再從該會話的 **Bookmarks** 返回原處。儲存書籤不會把段落髮送給 Agent。

## 區分會話選單操作 {/* #区分会话菜单操作 */}

![RNA-seq 會話操作選單](/img/open-science/guides-walkthrough/41-session-actions.webp)

| 操作 | 結果 | 檢查 |
| --- | --- | --- |
| Edit… | 修改標題/說明 | 選中正確會話並儲存 |
| Download all artifacts | 開啟產物選擇/下載流程 | 範圍是該會話及所選檔案 |
| View notebook | 開啟執行檢視 | 執行歸屬、語言和實際記錄 |
| Export conversation… | 按介面選項匯出對話 | 不等於產物或 Notebook 打包 |
| Archive | 從活躍導航中隱藏 | 可在 Settings → Archived 恢復 |
| Delete | 開啟永久刪除確認 | 閱讀影響範圍；Cancel 保留資料 |



## 從完成結果建立分支 {/* #从完成结果创建分支 */}

<p className="example-label"><strong>案例演示</strong> 從已完成的質控會話建立樣本註釋分支</p>

如果要討論後續樣本註釋，同時保留原始計數質控對話：

1. 開啟原會話已完成的回答。
2. 點選回答下的 **Branch in new session**。
3. 確認出現新會話行，初始名稱可能與原會話相同。
4. 透過 **Edit…** 改名為 `GSE60450 - follow-up interpretation`。
5. 檢查繼承歷史，後續請求需要原結果時明確引用專案檔案。

![單獨命名的分支與固定的原會話](/img/open-science/guides-walkthrough/57-session-branch.webp)

分支保留所選對話歷史，但不會重建原來的實時核心。複製活動標為 **code shown** 或舊連結不可用時，從專案 Files 開啟原產物，並檢查其產出會話。

分支入口取決於訊息和框架狀態。[Side Chat](delegation.md#side-chat-可用范围) 是獨立功能。新旁聊繼承當前會話的模型與推理強度，也可以為旁聊的下一次傳送另選模型。

## 修改歷史訊息 {/* #修改历史消息 */}

歷史使用者訊息的 **Edit message** 建立修訂，不會抹去全部歷史。提交前檢查文字與附件；有 **Previous/Next message revision** 時可切換版本。後續上下文取決於所選路徑，舊回答不能當作新修訂問題的答案。

<p className="example-label"><strong>案例演示</strong> 修改質控指標定義的請求</p>

本例在已完成的質控指標提問上點選 **Edit message**，把“一句話列出指標”改為“四條定義”，點選 **Send**。回答生成期間修訂切換按鈕不可用；完成後，用 **Previous message revision** 回到 `1/2` 檢查原問題和原回答，再用 **Next message revision** 返回新回答。再次修正欄位名稱後顯示 `3/3`。在此次 Codex 訂閱會話中，之前儲存的兩個研究報告仍保留，下載內容沒有變化。

在 OpenCode 中，修改請求後可用 Previous 檢視原回答、Next 檢視修改後的回答。切換回答版本不會撤銷已經完成的工具操作或外部變化。

![歷史訊息的修訂切換控制元件](/img/open-science/local-todo-batch/18-message-revision.webp)

**Cancel** 退出編輯而不提交；**Send** 請求新回答，繼續前應檢查結果。修正下一步用追問，需要獨立命名的研究則建立分支。

## 研究包 {/* #research-packages */}

需要一起交接會話分支、檔案和證據時，使用 [.science 研究包](research-packages.md)。獨立教程介紹匯出範圍、匯入與回讀、只讀會話和傳輸恢復。

## 匯出對話與研究檔案 {/* #导出对话与研究文件 */}

分享研究討論時，在會話行選單選擇 **Export → Export conversation…**。建議先用 **Edit…** 給會話起一個簡潔的標題：PDF 使用會話標題，過長的自動標題會佔據大量首頁空間。

| 控制元件 | 操作與結果 |
| --- | --- |
| Format → PDF / Markdown | PDF 適合閱讀和列印；Markdown 適合繼續編輯 |
| Entire conversation | 匯出當前分支的全部對話 |
| Selected | 顯示輪次核取方塊；從零開始勾選，計數隨選擇變化 |
| Select all | 選擇全部列出的輪次 |
| Export PDF / Export Markdown | 開啟系統儲存視窗；未選任何輪次時不可用 |
| Cancel | 關閉匯出視窗，不建立檔案 |

<p className="example-label"><strong>案例演示</strong> 只匯出 GSE60450 的最後一輪質控指標問答</p>

![選擇最後一輪質控指標問答，匯出 PDF](/img/open-science/local-todo-batch/20-selected-conversation-export.webp)

在 **GSE60450 — Methods and claim audit** 中，選擇最後一輪四項質控指標定義，匯出的單頁 PDF 只包含該請求與對應回答，更早的討論沒有出現。整段對話 PDF 也已重新開啟核對。此前選段 Markdown 已確認從所選追問開始。一輪可以含多條助手訊息，選中一輪不一定只匯出兩條訊息。

對話匯出不替代研究檔案下載。結果連結可能指向應用內部記錄，接收方不一定能開啟；需要 CSV、圖或報告原檔案時，應另行下載並一起提供。

### 下載會話產物 {/* #下载会话产物 */}

在會話選單選擇 **Download all artifacts**，勾選所需檔案，點選 **Download N artifacts**，然後選擇儲存資料夾。此入口儲存獨立檔案。下載後逐個開啟，確認名稱、內容及數量與所選產物一致。

![選擇會話內的兩個已儲存報告](/img/open-science/local-todo-batch/21-session-artifact-selection.webp)

### 下載專案檔案包 {/* #下载项目文件包 */}

點選左上角專案名稱 → **Download artifacts…**。列表按 **Generated** 和 **Uploads** 分組；預設全選，用 **Uncheck all** 後只勾選需要交付的檔案，再儲存 ZIP。

![從專案中選擇報告、質控表與原始計數輸入](/img/open-science/local-todo-batch/22-project-artifact-selection.webp)

在系統儲存視窗點選 **Cancel** 可取消本次儲存，返回後檔案選擇仍保留。寫入開始後，應用會禁用取消和關閉操作；等待結果，不要把關閉儲存視窗與中途停止寫盤混為一談。

如果提示只下載了部分檔案，先恢復不可讀取的原始檔，再重新選擇完整的交付範圍並下載。再次儲存到同名 ZIP 時會替換原檔案包；只選擇失敗檔案會得到僅包含這些檔案的新包，不會自動補入之前的 ZIP。

開啟下載的 ZIP，將 `generated/` 和 `uploads/` 的檔案數量、名稱及內容與選擇清單比較，確認完整後再分享。該檔案包不等於整個專案、會話歷史、Notebook 核心或執行環境備份。

## 歸檔並恢復完成的分支 {/* #归档并恢复完成的分支 */}

在目標分支選擇 **Archive**，然後開啟 **Settings → Archived → Sessions**。核對專案和歸檔時間後點選 **Restore**，確認分支回到活躍導航且內容可開啟；原會話是獨立記錄。

歸檔專案透過 **Manage** 檢視內部會話。歸檔、恢復、刪除和資料遷移的區別見[儲存](storage.md)。會話從活躍列表消失不代表已釋放磁碟空間。

原始碼：[會話編輯器](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/EditSessionDialog.tsx)、[工作區實現](https://github.com/aipoch/open-science/tree/v0.26.0/src/renderer/src/pages/workspace)。

## 複製已有會話繼續研究 {/* #fork-session */}

需要本地會話或匯入會話的獨立工作副本時，使用 **Fork**。**Branch in new session** 從選定訊息建立分支；Fork 則複製整個會話已儲存的研究記錄，包括分支、Notebook 記錄、檔案版本、文獻、批註和私人書籤。原會話保持不變。複製記錄不會重新執行程式碼，也不代表當前電腦的執行環境已經準備好。

1. 在桌面應用中完成或停止當前任務，並等待正在進行的研究包傳輸結束。
2. 開啟會話列表中該會話的選單，選擇 **Fork**。應用會顯示傳輸進度；**Run in background** 只隱藏視窗，不會取消任務。
3. 等待 **Fork completed**，開啟新會話。點選標題，核對 **Source session** 和新的會話編號。
4. 開啟一個繼承的檔案，檢查內容。繼續前核對當前模型和執行環境；舊電腦的路徑或權限可能需要重新處理。
5. 在副本中傳送後續任務，檢查新輸出。保留原會話作為對照記錄。

![會話選單中的 Fork 入口](/img/open-science/v0311/fork-menu.webp)

![新會話資訊卡中的來源會話及繼承的 QC 檔案](/img/open-science/v0311/fork-info.webp)

Fork 目前在桌面端提供。匯入會話仍為只讀，應在其副本中繼續工作。專案設定和記憶不會變成另一個獨立複製的專案。舊的審閱或驗證記錄只描述原記錄版本；使用前檢查是否已經過期。

### 在 QC 副本中繼續計算 {/* #在-qc-副本中继续计算 */}

<p className="example-label"><strong>案例演示</strong> v0.31.1 本地會話 Fork</p>

在 GSE60450 專案中，將已有 QC 會話 Fork 後，開啟繼承的 `gse60450-qc-summary.csv`，確認樣本數為 **12**、原始計數合計為 **269,027,617**。在副本中讓 Agent 用 Python 讀取該檔案，核對兩項數值，計算每個樣本的平均計數，並另存為 `fork-qc-check.csv`。結果為 **22,418,968.083333…**；原始檔與副本中繼承檔案的內容相同，新計算另存為獨立檔案。這個平均數僅演示如何繼續計算，不是表達量歸一化。

![Fork 副本中執行 Python 並儲存新結果](/img/open-science/v0311/fork-result.webp)

<ExampleDownload path="/examples/v0311/fork-qc-check.csv">下載示例計算結果</ExampleDownload>。收到 `.science` 包後繼續研究的方法見[研究包](research-packages.md)。

## 檢視會話資訊卡 {/* #session-information */}

點選會話標題，檢視編號、描述、來源、建立與更新時間、當前分支訊息數及檔案數。使用 **Pin** 固定會話，或透過 **Edit session** 修改標題和描述。**Continued from chat** 分隔條可返回記錄的來源訊息。


## 匯出會話診斷 {/* #session-diagnostics */}

使用會話頁頭 **Export diagnostics…**，或會話選單 **Export → Export diagnostics…**，將所選診斷來源收集到本地歸檔。應用日誌可能包含所選會話之外的後設資料，分享前檢查來源列表、完成提示和歸檔內容，見[診斷匯出步驟](troubleshooting.md#session-diagnostics)。
