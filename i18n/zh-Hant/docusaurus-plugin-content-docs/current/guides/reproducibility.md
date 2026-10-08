---
title: "可復現性"
description: "根據捕獲的研究步驟重新執行、比較儲存結果，並保留驗證記錄。"
last_update:
  date: '2026-10-08'
---

# 可復現性 {/* #可复现性 */}

**Reproducibility** 按儲存結果所記錄的過程重新執行，並將新輸出與選定檔案版本比較。它將輸入、執行記錄、環境資訊和輸出比較聯絡起來，幫助你檢查結果是如何產生的。

## 什麼時候使用 {/* #什么时候使用 */}

- 分享結果前，檢查捕獲的過程能否產生一致的輸出。
- 複核結果時，檢視儲存檔案與重新執行所得輸出之間的差異。
- 向同事交接工作時，將驗證記錄與相關檔案、版本一起保留。

根據要解決的問題選擇操作：

| 操作 | 用途 |
| --- | --- |
| Reproducibility | 重新執行捕獲的過程，並與儲存版本比較輸出 |
| [Review](../specialists/reviewer.md) | 稽核選定證據並給出審查結果 |
| [Generate script](notebook.md) | 重建可在原 Notebook 之外使用的程式碼 |

## 開始前檢查 {/* #开始前检查 */}

開啟儲存的結果，選擇要檢查的檔案版本。進入 **File actions → Provenance → Reproducibility**，檢視捕獲的輸入檔案、Notebook 執行和環境鎖檔案。

先處理 **Areas needing attention**。檢查依賴該版本已經記錄的證據。若早期執行失敗或必需證據缺失，應成功執行所需程式碼並生成新的結果版本；舊版本缺少的記錄不會被事後自動補齊。

發起檢查需要桌面介面，並且要有受支援的執行記錄。此功能不會重放整個對話，也不覆蓋所有檔案型別。

### 準備檢查所需的環境 {/* #prepare-environment */}

第一次檢查建議使用應用管理的 Python 或 R 環境。Open-Science 會在執行程式碼時捕獲受支援的依賴鎖。僅有包清單或 `pip freeze` 輸出，還不足以恢復精確的軟體包來源。

1. 開啟 **Settings → Runtimes**，在所需語言下準備 **App-managed environment**，確認 **Ready** 和 **Enable**。具體操作見[執行環境設定](runtimes.md)。
2. 要求 Agent 為當前會話選擇該環境，並檢查原始碼的依賴。缺包時透過受支援的包管理流程安裝，按提示重啟核心，再在同一 Notebook 中驗證匯入。繼續前核對[實際使用的直譯器](runtimes.md#确认实际使用的解释器)。
3. 使用原輸入，重新執行必要的準備步驟和產出程式碼，儲存新的結果版本。保留原結果供比較；只修改設定不會更新舊版本已捕獲的證據。
4. 開啟新版本的 **Provenance → Environment**，檢查環境鎖和缺包診斷，再回到 **Reproducibility**。確認 **Check reproducibility** 可用、必需輸入和執行記錄齊全後，再發起檢查。

現有環境仍缺少精確鎖時，可開啟 **Settings → Runtimes → Let the Agent create environments**，要求 Agent 按原分析依賴新建一個獨立的應用管理環境。讓 Agent 選擇新環境並驗證所需包的匯入，再重複第 3–4 步。保留原環境，不要為了讓檢查可用而改變分析方法。

新版本仍顯示 **Unavailable** 時，保留 **View details**、包名稱/版本和所選執行時。如果提示[包源連線錯誤](network.md)，先處理連線再重跑；仍無法捕獲環境鎖時，停止重試，按[故障排查](troubleshooting.md)反饋，並保留未驗證狀態。

<p className="example-label"><strong>案例演示</strong> 檢查樣本質控彙總表</p>

下圖使用 Notebook 根據 [GSE60450 樣本質控表](../reference/example-data.md)生成彙總結果。開啟檔案的 **Provenance → Reproducibility**，檢視捕獲的輸入和執行記錄。圖中的 **Not verified yet** 和 **Unavailable** 表示缺少精確環境鎖。開啟 **View details** 後，按[環境準備步驟](#prepare-environment)生成新版本。該狀態不代表復現成功。

![已儲存的質控彙總表及 Reproducibility 面板，顯示捕獲證據和暫不可用的檢查](/img/open-science/feature-guides-2026-09/reproducibility-evidence.webp)

## 執行復現檢查 {/* #运行复现检查 */}

1. 在 **Reproducibility** 中核對所選結果版本及其輸入。
2. 選擇 **Check reproducibility**；再次檢查時使用 **Check again**。
3. 如果透過 **Check from here** 選擇已儲存的起點，先檢查 **Files to restore** 和 **Runs to execute**，再選擇 **Start check**。步驟依賴之前的 Notebook 狀態時，仍可能需要重跑更早的準備過程。
4. 檢視進度和日誌。檢查會在隔離環境中恢復記錄的輸入和執行環境；需要停止時使用 **Cancel**。
5. 完成後逐個開啟輸出的比較詳情，再判斷結果是否一致。

會話選單還提供 **Check session artifacts**，可以檢查多個已捕獲的結果版本。應核對可檢查的版本及逐項結果；從會話入口發起操作，不代表每個結果都已完成檢查。

## 閱讀比較結果 {/* #阅读比较结果 */}

| 結果 | 下一步 |
| --- | --- |
| Result reproduced | 檢視記錄中的比較條件，並將它們與結論一起保留 |
| Result differs | 檢視不同的檔案和比較詳情，再判斷差異是否影響本次工作 |
| Not verified yet | 當前版本還沒有完成的檢查證明輸出一致。檢查現有證據，準備好後再發起檢查 |
| Check stopped / Check cancelled | 檢視日誌，需要時處理原因，再重試。取消不代表已得出比較結論 |

執行完成本身不能證明輸出一致。位元組相同、有限範圍的圖片/表格比較和科學指標比較回答的是不同問題。輸出符合記錄中的比較條件，也不代表科學方法已獲驗證。

## 儲存與分享驗證記錄 {/* #保存与分享验证记录 */}

1. 選擇 **Export verification record**，儲存記錄。
2. 重新開啟下載檔案，核對它對應的來原始檔、版本和比較結果。
3. 將相關來原始檔與版本一起保留。清理復現輸出前，先檢查保留選項並儲存需要的檔案。

需要一起交接會話分支、檔案和證據時，使用 [.science 研究包](research-packages.md)。傳送方提供的驗證記錄，不代表接收電腦已重新執行檢查。

## 檢查無法完成時 {/* #检查无法完成时 */}

先檢視 **Areas needing attention** 和日誌中的首條相關錯誤。輸入缺失、證據不完整或操作不受支援都可能阻止驗證。大型 RDS/H5AD 檔案不會載入進行內容比較；沒有比較結果不能認定輸出一致。

v0.30.2 修復了同一輪中先前生成輸入的重放、受支援的 Python 標準庫匯入，以及 Windows 驗證環境中的 pip 入口。舊版若在這些步驟停止，可更新後對同一份已捕獲結果重試，再檢查新日誌和比較結果。這些修復不會補出缺失的環境鎖，也不代表所有歷史執行均可重放。

若準備過程依賴之前的 Notebook 狀態，檢視[執行證據](notebook.md)，重新執行必要準備步驟，再生成新結果。保留已停止或未完成檢查的實際狀態。

已有受支援的鎖檔案包、需要在應用外恢復軟體包時，按[執行環境恢復條件](runtimes.md#conditional-restore)操作。該流程不會建立缺失的鎖檔案，也不能替代上面的環境準備。依賴恢復完成本身不代表輸出已復現。

## 重新執行前先檢視研究過程 {/* #replay-vs-verification */}

用[會話回放](session-replay.md)檢視已記錄的訊息、工具活動和檔案版本順序。回放使用重新組織的播放時間展示儲存的證據，不會重新執行程式碼、再次查詢資料庫，也不能證明結果可復現。需要新的執行與結果比較時，使用本頁的 **Reproducibility**。
