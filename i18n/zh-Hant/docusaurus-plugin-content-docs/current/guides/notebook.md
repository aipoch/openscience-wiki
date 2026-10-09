---
title: "Notebook 與執行證據"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook 與執行證據 {/* #notebook-与执行证据 */}

透過 Notebook 檢視已執行程式碼、在當前核心執行命令，並跟蹤後臺工作。檢查儲存檔案時，開啟 **Provenance**，檢視對應檔案版本的執行與證據。

執行 Python 或 R 前，先[啟用相容環境](runtimes.md)。完整資料分析示例見[公開資料工作流](../workflows/data-quality.md)。

<span id="打开原产出会话的-notebook" />

<PlatformGuide />

## 開啟會話 Notebook {/* #打开会话-notebook */}

1. 開啟包含目標計算的專案和會話。新會話可先要求代理在 **Session Notebook** 執行一次小計算。
2. 點選 **Open notebook**，或使用會話選單 **View notebook**。
3. 檔案預覽處於活動狀態時，切換到 **Notebook** 標籤。
4. 用 **Agent** 選擇執行者，再用 **Python / R / Bash** 選擇語言。
5. 開啟帶編號的執行，閱讀輸出與完成狀態。複製活動中的 **code shown** 表示展示的程式碼；執行記錄應到原產出會話檢視。

<PlatformContent platform="macos">

![Notebook 中的 Python 執行與輸出](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| 控制元件 | 操作 | 結果 |
| --- | --- | --- |
| Agent | 選擇 Main 或子代理 | 顯示對應執行者記錄；不同代理可有獨立核心 |
| 語言選擇 | 選擇可用語言 | 切換記錄和控制檯；缺少語言時到 Runtimes 安裝 |
| 帶編號的執行 | 選擇執行記錄 | 開啟程式碼、輸出與狀態 |
| Copy to clipboard | 複製程式碼 | 保留原始碼中的外部路徑與依賴 |
| Hide output / Show output | 收起或展開輸出 | 調整檢視，不重新執行 |
| run code in this kernel… | 輸入並提交程式碼 | 在所選實時核心執行 |
| 關閉/收起預覽 | 返回對話 | 保留執行歷史 |

有 **Input data / Inputs** 時，核對檔案及版本是否與請求一致。引用不可用時，透過應用重新開啟或附加目標輸入，再重試。

## 執行前檢查程式碼 {/* #execution-review */}

從 v0.36.0 起，Agent 提交的 Notebook 程式碼會在執行前檢查。受支援的普通讀取與分析無需額外風險提示；可能造成不可逆變化，或無法充分分析的操作，需要一次性決定。直接在手動控制檯輸入的程式碼不經過這項 Agent 批准步驟，提交前應自行檢查。

1. 出現 **Review risky code** 時，核對執行環境和請求的操作；計算正在等待決定。
2. 點選風險項旁的 **Line**，在完整程式碼中定位相關行。檢查路徑、受影響檔案和命令，也要檢查分析無法判斷的操作。
3. 若操作沒有必要或目標不對，拒絕並要求 Agent 修改為更安全的方案。只有確實需要顯示的操作時才批准一次；這不會為以後的風險程式碼授予永久權限。
4. 決定後，檢視保留的決策記錄與 Notebook 執行狀態。批准不代表完成；被拒絕的請求不會執行該程式碼。

<p className="example-label"><strong>案例演示</strong> 檢查外部 Python 子程序請求</p>

下圖的計算只是求和，但它透過 `subprocess.run` 啟動另一個直譯器，因巢狀執行無法被充分檢查而停在審查卡片。提示不等於認定程式碼有惡意。本例選擇 **Deny**，執行記錄隨後顯示中斷，沒有執行該子程序。

![Notebook 審查卡片中的執行環境、程式碼行、Allow once 和 Deny](/img/open-science/v0360/notebook-risk-review.webp)

這項檢查針對執行風險，不驗證統計方法或結果。**Auto-review** 和 [Reviewer](../specialists/reviewer.md) 分別檢查已完成工作。v0.36.0 還改進了 Python／R 依賴記錄；核對結果的實際輸入輸出應使用[來源記錄與重新執行驗證](reproducibility.md)。

## 使用當前核心 {/* #使用当前内核 */}

### 在當前核心中手動檢查 {/* #在当前内核中手动检查 */}

選擇 **Python**，點選 **run code in this kernel…**，輸入下面這段獨立命令。它不需要資料集、第三方包或其他會話的變數：

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

按 **Enter** 執行，**Shift+Enter** 換行。自動補全選單展開時，先按 **Escape** 關閉。確認出現帶編號的 **python · you** 記錄及直譯器輸出；可執行檔案應屬於所選環境。

檢查 R 時，選擇 **R** 並提交：

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

檢查 R 執行記錄及輸出。Python 和 R 使用獨立變數。出現 `NameError` 或 `object not found`，通常說明對應物件尚未在該核心建立；從其他會話複製命令前先檢查自己的程式碼。

核對直譯器與儲存結果的操作案例，見[Python 與 R 執行環境](runtimes.md)，在頁頂選擇 **Windows** 即可檢視。

### 檢查實時變數 {/* #检查实时变量 */}

1. 執行會建立變數的程式碼後，點選 **Inspect variables**。
2. 檢視 **Name / Type / Size / Shape / Preview**。
3. 在 **Filter variables** 輸入自己程式碼中的名稱。截圖以 `sha` 為篩選詞；操作時請使用自己核心中實際存在的變數名。
4. 點選 **Refresh variables** 讀取當前名稱空間；需要檢視隱藏名稱時使用 **Show private variables**。
5. 點選 **Close** 返回 Notebook。

<PlatformContent platform="macos">

![按名稱篩選實時變數](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

預覽可能縮略數值，需要完整內容時在控制檯列印對應欄位。**Variable tracking is limited** 表示依賴圖不完整。**stale** 表示依賴發生變化，**unknown** 表示無法確定關係；使用過期結果前重新執行受影響程式碼。

### 核心變化後繼續工作 {/* #内核变化后继续工作 */}

切換或重建環境可能停止當前核心。儲存檔案、執行記錄和記憶體變數有不同生命週期。變化後先執行上方直譯器檢查，再重跑建立所需變數的程式碼，並開啟需要繼續使用的儲存檔案。

安裝取消與重灌見 [Runtimes](runtimes.md#维护和修复环境)。環境重建、常規核心重啟和後臺任務恢復是不同操作，應檢查相應狀態，不能假定它們恢復相同內容。

## 用 R 檢查同一份基因計數資料 {/* #用-r-检查同一份基因计数数据 */}

<p className="example-label"><strong>案例演示</strong> 用 R 檢查 GSE60450 基因計數</p>

1. [安裝並啟用 R](runtimes.md#安装应用管理的-r)。
2. 附加[原始計數矩陣](../reference/example-data.md)。需要比較 Python 結果時，把該 CSV 也附加到同一會話。
3. 要求透過 **Session Notebook → R** 執行，採用[資料質量工作流](../workflows/data-quality.md)的輸入/輸出要求，保留完整識別符號並另存結果。
4. 出現 **Change notebook runtime?** 時，檢查 **Language: R** 和目標直譯器，再核對後續 **Run R code?** 的環境。
5. 開啟 **Notebook → R** 閱讀執行記錄，然後開啟儲存的 CSV、圖表和報告。

<PlatformContent platform="macos">

![應用內開啟的 R 樣本質控結果](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

按完整樣本標識與[公共基準](../reference/example-data.md#样本-qc-基准)比較。保留原始來源，說明各指標是否包含零計數。原始計數質控用於準備資料，後續統計分析仍需獨立設計。

### 一起保留 R 結果與執行證據 {/* #一起保留-r-结果与执行证据 */}

在儲存 CSV 中開啟 **Provenance → Execution Log → Download notebook**，將匯出與輸入、結果儲存在一起。某個檔案版本的匯出可能不含後續手動控制檯命令。

<PlatformContent platform="macos">

![R 結果捕獲的執行環境](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

Runtimes 的包清單描述已安裝環境，Provenance 描述某個檔案所捕獲的環境證據。出現 **partial** 或快取清單提示時，應閱讀其含義，不要把兩份包數量當作同一清單比較。

## 後臺任務與結果送達 {/* #后台任务与结果送达 */}

適用的 Python、R、持久 REPL 或 Shell 工作需要在你處理其他事務時繼續，可在請求中明確後臺執行，並寫出輸入、輸出和停止條件。

1. 任務被接受後，開啟會話 **Background tasks**，其中彙總本地執行和遠端 Compute 作業；沒有任務的會話可能不顯示入口。
2. 檢視任務身份、環境、狀態和耗時。
3. 點選 **Open** 檢視對應 Notebook 執行或 Compute 作業。
4. 停止任務時，點選該任務的 **Cancel**，等待狀態確定，再檢查已儲存檔案是否需要保留。
5. 完成後檢查送達的結果訊息，並開啟儲存的輸出。
6. 中斷或重啟後先檢查已有任務和恢復提示，再決定是否重新提交。

<PlatformContent platform="macos">

![後臺任務狀態與 Open 入口](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| 狀態 | 檢查內容 |
| --- | --- |
| Queued / Running | 所選環境與進度；Shell 作業可能等待執行槽位 |
| Cancelling / Cancelled | 取消仍在處理中，還是已經結束 |
| Completed | 退出結果與儲存檔案 |
| Failed / Timed out / Interrupted | 首條錯誤、保留輸出及可用恢復操作 |
| Result unavailable | 已有作業記錄和恢復詳情 |

關閉任務列表不會停止任務。計算完成和結果訊息送達是兩個階段。遠端作業還需滿足[遠端計算](remote-compute.md)中的主機與排程條件。

## 檢查單個儲存版本的證據 {/* #检查单个保存版本的证据 */}

開啟儲存檔案，選擇 **File actions → Provenance**，或在放大預覽中點選 **Open Provenance**。先確認所選檔案版本。

<PlatformContent platform="macos">

![儲存結果捕獲的產出程式碼](/img/open-science/provenance-code.webp)

</PlatformContent>

| 標籤或控制元件 | 檢查內容 |
| --- | --- |
| Code | 捕獲的產出程式碼、輸入引用、複製/下載及 Generate script |
| Execution Log | 所選版本凍結的執行記錄 |
| Messages | 與結果關聯的請求和決定 |
| Environment | 直譯器、包資訊和捕獲狀態；參見[恢復條件](runtimes.md#conditional-restore) |
| Reproducibility | 捕獲的輸入、重新執行檢查、輸出比較和驗證記錄 |
| Review | 與這個檔案版本關聯的審查 |
| Previous / Next Artifact version | 其他儲存版本的證據；沒有其他版本時不可用 |
| Close Provenance | 返回檔案預覽 |

| 標籤 | 含義與下一步 |
| --- | --- |
| bounded | 保留證據的範圍有限；匯出程式碼和結果時保留該範圍說明 |
| partial | 部分環境資訊缺失或未確認；在應用外複用前補齊依賴要求 |
| No review for this version | 當前檔案版本沒有關聯審查；會話與產物審查的區別見 [Reviewer](../specialists/reviewer.md) |
| 快取環境 | 清單來自複用快取；環境變化會影響結果時檢查實際直譯器和包 |

編輯報告會建立另一個檔案版本，不會重跑生成其他 CSV 的計算，詳見[檔案與版本](files.md)。

檢視審查時，為所需版本選擇 **Review**，展開檢查項，使用 **Go to transcript** 檢視引用的執行活動。**No issues found** 只適用於這些檢查項和這個版本，不會補齊缺失的執行或環境證據。如果審查中斷，開啟對應的 **Review error** 條目，選擇 **Re-run review**；完成後回到檔案的 **Review** 標籤核對新結果。此前失敗的記錄仍可能保留在對話中。

## 可復現性 {/* #reproducibility */}

需要重新執行捕獲的結果、比較輸出並儲存驗證記錄時，按[可復現性](reproducibility.md)操作。本頁介紹 Notebook 執行、來源證據檢視和程式碼匯出。

## 匯出和複用程式碼 {/* #导出和复用代码 */}

按需要選擇匯出方式：

| 目的 | 入口 | 內容 |
| --- | --- | --- |
| 閱讀已記錄的產出程式碼 | **Code → Captured producer block → Download** | 捕獲的原始碼、原路徑與依賴 |
| 保留已記錄的 Notebook 單元 | **Execution Log → Download notebook** | 所選結果/版本對應的 Notebook |
| 準備可獨立執行的指令碼 | **Code → Generate script** | 需要檢查和試跑的模型重建指令碼 |

<PlatformContent platform="windows">

### 在 Windows 下載捕獲的 Python 程式碼 {/* #在-windows-下载捕获的-python-代码 */}

1. 開啟儲存報告的目標版本，再開啟 **Provenance → Code**。
2. 在 **Captured producer block** 下點選 **Download**，在儲存視窗核對 `.py` 檔名與目錄，再點選 **Save**。
3. 開啟落盤檔案，與顯示的程式碼核對。在 PowerShell 中使用同一 Python 直譯器執行；帶引號的程式路徑前使用 `&` 呼叫運算子。
4. 將輸出與 Notebook、儲存報告比較，並隨程式碼保留需要的輸入檔案。

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows 捕獲產出程式碼及其 Download 控制元件" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="開啟完整 Windows 截圖" />

此操作下載已經記錄的程式碼。**Generate script** 是另一項程式碼重建操作；生成失敗時保留完整錯誤，不能將捕獲程式碼下載成功視為重建成功。

</PlatformContent>

### 生成可獨立使用的指令碼 {/* #生成可独立使用的脚本 */}

1. 開啟目標版本 **Provenance → Code**，檢查 **Inputs** 與 **Execution Log**。
2. 在 **Settings → Model → Main model** 選擇相容的預設模型。這個輔助功能使用該策略，可能與會話輸入框中的模型不同。
3. 點選 **Generate script**，等待 **Generating…** 完成。
4. 閱讀 **LLM-generated reconstruction** 標籤，檢查輸入路徑、依賴與輸出位置，再點選 **Download script**。
5. 在系統儲存視窗選擇獨立目錄，確認 `.py` 檔名，再點選儲存。開啟落盤檔案，確認其內容與顯示的程式碼一致。
6. 按指令碼要求的準確檔名準備輸入和依賴，在應用外執行。對照儲存結果檢查輸出欄位與輸入校驗和；下載完成本身不能證明計算正確。

<PlatformContent platform="macos">

![生成指令碼預覽與下載控制元件](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>案例演示</strong> 在應用外重跑匯出的 RNA-seq 檢查指令碼</p>

可下載<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>指令碼</a>、<a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>輸入 CSV</a> 和<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>預期 JSON</a>，放在同一資料夾。在該資料夾執行 `python3 GSE60450-portable-check.py`，只需 Python 標準庫。執行前將下載的預期 JSON 重新命名為 `expected.json`，避免被指令碼生成的同名檔案覆蓋。將執行生成的 `GSE60450-portable-check.json` 與 `expected.json` 比較後，再適配其他資料。

### 無法生成指令碼時下載已有程式碼 {/* #无法生成脚本时下载已有代码 */}

顯示 **Artifact code reconstruction is unavailable with Codex subscription authentication.** 時，可為該輔助操作選擇相容提供方，或下載已捕獲產出程式碼。此錯誤針對指令碼重建，不表示 Codex 的普通 Notebook 執行不可用。

出現 **RECONSTRUCTION_UNAVAILABLE** 時，檢查缺少的輸入或執行證據。下載捕獲程式碼會保留已有內容，但無法恢復從未捕獲的步驟。

### 匯出和複用 {/* #导出和复用 */}

選擇 **Provenance → Execution Log → Download notebook**，選擇位置並儲存，再開啟匯出檢查語言、程式碼單元和輸出。

在應用外重跑前，準備輸入檔案、記錄的依賴及可寫輸出目錄。僅在工作副本中替換應用託管路徑，保留原始匯出。匯出不會打包憑據或完整應用環境。示例匯出見[示例資料](../reference/example-data.md)。

<PlatformContent platform="windows">

如果 Windows 匯出的 Notebook 沒有副檔名，先將副本作為文字開啟，確認它是包含 `nbformat`、`cells` 及預期程式碼/輸出的 Notebook JSON。保留原件，再給工作副本加上 `.ipynb` 副檔名。改名隻影響其他程式如何開啟檔案，不會轉換內容或重新執行單元。

</PlatformContent>

## 理解錯誤與警告 {/* #理解错误与警告 */}

| 現象 | 下一步 |
| --- | --- |
| 缺少變數 | 在所選語言/核心重跑定義該變數的程式碼 |
| 缺少軟體包 | 檢查該環境包清單，按 [Runtimes](runtimes.md)處理 |
| 輸入版本不可用 | 開啟或附加目標當前輸入，透過應用確定其身份 |
| PermissionError / access denied | 檢查目標檔案及權限範圍；持續失敗時按[故障排查](troubleshooting.md)反饋 |
| 網路/安裝錯誤 | 用受影響主機名和完整錯誤到[網路](network.md)排查 |
| 執行完成但有警告 | 閱讀警告影響範圍，檢查儲存輸出後決定是否重跑 |

反饋時保留首條失敗行、所選環境、檔案身份和任務狀態。儲存輸出應關聯到實際產出執行。
