---
title: "Python 與 R 執行環境"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Python 與 R 執行環境 {/* #python-与-r-运行环境 */}

在 **Settings → Runtimes** 選擇 Notebook 和代理可使用的 Python、R 環境。**Ready** 表示直譯器已檢測或準備就緒，**Enable** 開關單獨決定代理能否選擇該環境。

可以選擇應用管理的環境或已有直譯器。使用前核對路徑、版本、Ready 狀態和 Enable 開關。系統 R 與應用管理的 R 可以並存。

<span id="在重新安装前检查影响" />

<span id="尚需分别验证的操作" />

<PlatformGuide />

## 為專案選擇執行環境 {/* #为项目选择运行环境前 */}

記錄直譯器名稱、路徑和版本。首次 Python 分析可優先使用應用託管環境，避免修改其他研究依賴的環境。請求安裝軟體包前先在 **Packages** 中確認依賴是否已存在。檢視軟體包列表是隻讀操作，不會自動授予代理修改外部直譯器的權限。

執行失敗時，分別判斷直譯器不可用、缺少依賴、請求被拒絕或程式碼本身出錯。只有託管執行環境確實損壞時才考慮重灌，不能把所有分析錯誤都歸因於環境。復現結果時同時保留輸入版本、程式碼和執行環境資訊。

## 主頁面控制元件 {/* #主页面控件 */}

| 控制元件 | 用途與邊界 |
| --- | --- |
| **Recheck** | 重新發現直譯器並檢測狀態，更新最後檢查時間；衝突的安裝任務進行時不可用 |
| **Network settings** | 開啟 Notebook 網路保護配置。提示條說明會話和包下載是否僅能訪問批准的域名 |
| **Let the Agent create environments** | 控制代理是否可建立環境及準備缺失執行時；關閉後仍可由使用者主動安裝或修復 |
| **Add interpreter…** | 開啟系統可執行檔案選擇器。選擇實際可執行檔案後，確認檢測到的路徑與 Ready 狀態 |
| **Download and set up** | 環境缺失時，準備應用管理的環境 |
| 安裝期間的 **Cancel** | 請求取消安裝，等待狀態結束後再啟動其他操作 |
| **Retry setup** | 解決錯誤原因後重試 |
| **Enable &#91;environment&#93;** | 允許代理選擇該環境。禁用正在使用的環境時可能需要確認影響 |
| **Allow package install** | 已啟用的外部 Python 或 R 環境提供的單獨安裝授權；R 授權限定在選定的個人庫。檢視包列表不需要安裝授權 |
| **Packages &#91;count&#93;** | 開啟該直譯器的已安裝包清單 |
| **Reinstall** | 在重建應用管理環境前開啟確認 |

## 安裝應用管理的環境 {/* #安装应用管理的环境 */}

<PlatformContent platform="windows">

在 **Settings → Runtimes** 分別檢查兩種語言的卡片。每張卡片都有獨立的 **Ready** 狀態、版本、**Enable** 開關和 **Packages** 按鈕。下圖中的 Python 與 R 均已啟用；上方警告針對單獨配置的 Notebook 網路保護。截圖中的個人路徑已隱藏，請在自己的電腦上核對完整路徑。

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Windows 託管 Python 與 R 卡片，均顯示 Ready 且已啟用" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="開啟完整 Windows 截圖" />

</PlatformContent>

### 安裝應用管理的 Python {/* #安装应用管理的-python */}

<PlatformContent platform="macos">

![安裝 Python 前的執行時設定](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. 找到 **Python → App-managed environment**。
2. 選擇 **Download and set up**。
3. 檢視進度並等待，安裝期間出現 **Cancel**。
4. 成功後確認出現 **conda: default-python**、**App-managed** 與 **Ready**。
5. 檢查直譯器路徑及 **Enable conda: default-python** 開關。

<PlatformContent platform="macos">

![正在建立應用管理的 Python 環境](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Python 安裝完成](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
確認 **Ready**、直譯器路徑和啟用狀態。包數量與版本隨安裝來源變化，不要把截圖中的臨時路徑用作長期環境位置。

### 安裝應用管理的 R {/* #安装应用管理的-r */}

1. 開啟 **Settings → Runtimes**，滾動至 **R**。
2. 在 **App-managed environment** 下選擇 **Download and set up**。本機已有系統 R 時，仍可安裝這個獨立環境。
3. 等待下載和環境建立完成，期間保持應用開啟。如出現錯誤，先閱讀錯誤資訊再重試。
4. 確認顯示 **conda: default-r**、**App-managed**、**Ready**，並已啟用。
5. 開啟 **Packages**，在 **Filter packages** 輸入 `r-base`，核對 R 版本與渠道；清空篩選可檢視全部安裝包。

<PlatformContent platform="linux">

![Linux 中應用管理的 R 已 Ready 並啟用](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![下載應用管理的 R 環境](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![應用管理的 R 已安裝並啟用](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
篩選 `r-base` 後，確認顯示已安裝 R 包及其版本、渠道。包總數取決於你的環境，可以與截圖不同。

<PlatformContent platform="macos">

![檢查 R 包清單中的 r-base](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## 接入已有直譯器 {/* #接入已有解释器 */}

<PlatformContent platform="windows">

在對應語言下點選 **Add interpreter…**，開啟 Windows 檔案選擇視窗。選擇目標環境實際安裝的 `python.exe` 或 `R.exe`，再點選 **Open**。路徑包含空格時，可在視窗中選擇檔案，或在 **File name** 輸入完整路徑。返回 Runtimes 後核對檢測到的路徑與版本，點選 **Recheck**，再啟用該環境。只開啟選擇視窗不代表已新增直譯器。

</PlatformContent>

### 使用本機已經安裝的 R {/* #使用本机已经安装的-r */}

選擇 **Recheck**，檢查發現的 R 路徑和版本。如果沒有出現目標直譯器，使用 **Add interpreter…** 選擇其可執行檔案。**Ready** 表示已檢測就緒，**Enable** 決定代理能否選擇該環境。

在 R Notebook 中檢查 `R.home()`，確認實際環境。需要安裝依賴時，按[外部 R 包安裝步驟](#external-r-packages)授權個人庫。

<PlatformContent platform="macos">

`/opt/homebrew/bin/R` 這類路徑表示系統安裝。

</PlatformContent>

### 註冊並使用外部 Python {/* #注册并使用外部-python */}

<PlatformContent platform="linux">

`/usr/bin/python3` 等系統直譯器可能已經顯示為 **Ready**。先開啟目標環境的 **Enable** 開關，再要求代理選擇它。下圖中已檢測到的 Python 直譯器尚未啟用，應用管理的 Python 也尚未準備；需要託管環境時，選擇 **Download and set up**。

![Linux 已檢測到現有 Python 直譯器並顯示 Ready，Enable 開關尚未開啟](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. 準備需要使用的 Python 環境。
2. 選擇 **Add interpreter…**，選中 Python 可執行檔案，檢查 **Ready**、路徑和版本。
3. 使用 **Recheck** 複查，再啟用該環境。
4. 要求代理為 Notebook 明確選擇這個直譯器。
5. 先輸出 `sys.executable` 和 Python 版本，確認實際環境後再使用依賴。

<PlatformContent platform="macos">

若 macOS 檔案選擇器無法選中符號連結直譯器，選擇目標環境的實際可執行檔案。繫結後檢查 `sys.executable`。使用穩定安裝路徑，不要沿用截圖中的臨時示例路徑。

</PlatformContent>

#### 包安裝授權與實際結果 {/* #包安装授权与实际结果 */}

外部 Python 環境需要安裝新包時，先檢查 **Allow package install** 授權。允許安裝後，等待操作結束，並在同一環境中驗證匯入，再繼續分析。

安裝報告 `403 Forbidden` 或 `destination resolves to a non-public network address` 時，檢查受影響域名，按[網路說明](network.md)處理後再重試。這些錯誤屬於網路訪問問題，不能據此認定軟體包不存在。保持網路防護開啟。

#### 禁用 Notebook 正在使用的環境 {/* #禁用-notebook-正在使用的环境 */}

切換 **Enable** 後，先閱讀活動與空閒核心數量再確認。禁用可能關閉核心；重新啟用後，仍需為會話選擇可用執行時。該配置提供啟用、禁用控制元件，沒有單獨的 **Remove interpreter** 操作。

## 在外部 R 環境安裝包 {/* #external-r-packages */}

已有 R 直譯器可以執行、但缺少依賴包時，使用這項功能。應用只授予一個已有個人庫的安裝權限，不授權系統庫或站點庫。

1. 在 **Settings → Runtimes** 啟用目標外部 R 環境，確認路徑和版本。
2. 在 **Personal R package library** 檢查檢測到的位置，或選擇合適的庫。沒有檢測結果時，使用 **Advanced options → Choose library folder…**，選擇該 R 直譯器可見且可寫的已有個人庫。此操作不會建立資料夾。
3. 啟用 **Allow package install**。授權前核對路徑：其他專案如果也使用這個庫，會受到包安裝變化的影響。
4. 透過應用的包管理操作請求安裝所需包，並明確指定該 R 環境。檢視安裝結果，按提示處理核心重啟。
5. 在該環境執行 `R.home()`、`.libPaths()`、`library(PACKAGE_NAME)` 和 `packageVersion("PACKAGE_NAME")`，將包名佔位符替換為實際包名。確認使用預期的庫後，再繼續分析。

關閉 **Allow package install** 可撤銷後續安裝授權，但不會解除安裝已經寫入的包。需要更換庫時先撤銷授權。沒有符合條件的資料夾時，在應用外準備個人 R 庫，或使用應用管理的環境；不要選擇系統庫來繞過檢查。

## 根據捕獲的鎖檔案恢復依賴 {/* #conditional-restore */}

開啟已儲存結果的 **Provenance → Environment**，檢視捕獲的鎖檔案。有 **Download bundle** 時可下載恢復包，先閱讀包內說明和前置條件。

外部 R 需要可用的 `renv` 和受支援的 `renv.lock`；外部 Python 需要已有、受支援且固定雜湊的 requirements 鎖檔案。只有直譯器路徑或包名列表並不足夠。恢復環境必須滿足記錄的直譯器、平臺、架構和包管理器要求。

解壓恢復包，選擇自己擁有且可寫的新目標位置，按包內說明執行 `restore-packages.py`，傳入真實的直譯器與目標路徑。指令碼先核對前置條件和校驗值，再恢復包並檢查生效的版本與路徑。檢查失敗時應處理對應條件，不要修改鎖檔案來強行透過。Open-Science 不會接管或刪除這個外部目標位置。

這屬於有條件的依賴恢復，不是完整環境克隆。需要比較輸出時，重新開啟結果，在有受支援的捕獲執行過程時使用[復現檢查](reproducibility.md)。

## 檢查安裝包 {/* #检查安装包 */}

選擇目標 Python 卡片的 **Packages**。對話方塊顯示該環境的路徑、包來源與狀態。

在 **Filter packages** 輸入 `numpy` 等包名，檢查版本與渠道，清空篩選可恢復列表，點選 **Close** 返回。

<PlatformContent platform="macos">

![篩選 Python 安裝包](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
列名為 **Name**、**Version**、**Build**、**Channel**。Build 中的橫線表示未顯示構建值。這個對話方塊用於檢視清單；沒有安裝或解除安裝包的按鈕，不應在這裡尋找 “Install package” 輸入框。

<PlatformContent platform="windows">

點選 Python 卡片的 **Packages**，篩選 `pip`；點選 R 卡片的 **Packages**，篩選 `r-base`。比較版本前，先核對對話方塊標題中的環境名稱。下圖展示已有安裝包，不表示正在安裝新包。

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Python 包清單，按 pip 篩選" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="開啟完整 Windows 截圖" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows R 包清單，按 r-base 篩選" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="開啟完整 Windows 截圖" />

</PlatformContent>

## 用真實分析驗證環境 {/* #用真实分析验证环境 */}

在所選環境執行小型計算，重新開啟輸出，與[公共基準](../reference/example-data.md)比較。執行與匯出步驟見 [R Notebook](notebook.md#用-r-检查同一份基因计数数据)。

[資料質量工作流](../workflows/data-quality.md)提供使用已有依賴的 Python 路線。計算成功不代表新增包安裝或核心重啟已經驗證。

<PlatformContent platform="macos">

![成功的真實 Notebook 計算](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
匯入包失敗時，先檢查選中的執行環境及包清單。若下載因域名解析為保留地址而被拒絕，按[網路](network.md)處理。已有包能執行，不代表額外軟體包已經可以安裝。

其他分析前檢查所選環境是否包含所需包，必要時使用支援的包管理操作，閱讀真實結果，按要求重啟並驗證匯入。授權、進度卡片或 Ready 直譯器都不能代替匯入測試。

儲存結果的環境或執行證據不完整時，開啟 **Provenance** 檢視缺少的資訊。需要生成可用於復現檢查的新版本時，按[環境準備步驟](reproducibility.md#prepare-environment)處理。數值匹配不會補齊缺失的來源證據。

### 確認實際使用的直譯器 {/* #确认实际使用的解释器 */}

準備好 Python 或 R 後，在對應語言的 Notebook 中執行下面的命令，檢查實際版本與路徑。設定頁列出的環境可能不止一個，以本次執行的輸出為準。

Python：

```python
import sys
print(sys.version)
print(sys.executable)
```

R：

```r
R.version.string
R.home()
```

然後讀取一份專案中的小表格，檢查行數並儲存結果。重新開啟應用後如需繼續分析，再執行一次檢查；歷史報告可讀取，不代表上次的記憶體變數仍在。Notebook 操作見[Notebook 與執行證據](notebook.md)。

<PlatformContent platform="windows">

<p className="example-label"><strong>案例演示</strong> 檢查 Windows 實際使用的 Python 直譯器</p>

使用研究資料前，可先要求代理在 **Session Notebook** 執行上方 Python 版本和路徑命令，並將實際輸出儲存為 Markdown 報告。若還要檢查已安裝的 `pip` 版本，加入 `import importlib.metadata` 和 `print(importlib.metadata.version("pip"))`。

開啟 Notebook 輸出，與儲存報告核對。本例使用 Windows 10、Open-Science v0.28.0，實際輸出 Python **3.12.13**、`pip` **26.1.2**。讀取包後設資料不會安裝或匯入該包。

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook 中的實際執行程式碼與版本輸出" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="開啟完整 Windows 截圖" />

遇到 Windows conda R 啟動或核心恢復失敗時，可先更新至 v0.30.2 或後續版本再重試。該版本修復環境準備後的可執行檔案查詢及 R 核心恢復。更新後重新檢查環境，並在 Notebook 中執行一段簡單的 R 計算；**Ready** 本身不是執行結果。下方截圖仍保留原實操的版本與結果。

從 v0.31.0 起，Windows R 可以在標準模式下執行，無需先配置保護模式。舊版本中的 **Enable protected mode before authorizing R access.** 提示屬於當時的版本行為。網路保護和安裝軟體包的權限仍是獨立控制。v0.31.1 中，被 Notebook 網路保護阻止的執行會顯示帶設定入口的行內提示；此時單元格並未執行。檢查所需訪問範圍後再重跑，並核對輸出。

<span id="windows-runtime-qc" />

<p className="example-label"><strong>案例演示</strong> 用樣本 QC 表檢查 Windows Python 與 R 環境</p>

下面的分析來自另一臺 Windows 11 電腦，使用其已有的 Python/R 環境。檢查自己的安裝時，應以本次執行的路徑與輸出為準。

下載<a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>樣本 QC CSV</a>，附加到專案會話。這是一份 12 行彙總表，每行對應一個樣本。下面讀取並核對表中已有的指標，不重新計算原始基因計數矩陣。輸入說明和指標定義見[示例資料](../reference/example-data.md)。

**用 Python 讀取表格。** 要求代理在 Session Notebook 中使用選定的 Python 環境，僅使用標準庫，輸出 `sys.version`、`sys.executable` 和下表中的四項檢查結果，並儲存 Markdown 報告。使用附件的實際路徑。若需確認讀取沒有改變輸入，要求在讀取前計算 SHA-256，並在重新開啟同一檔案後再計算一次。

開啟儲存的報告及其 **Provenance → Code** 檢視，核對捕獲的程式碼與報告中的直譯器和結果。本例中 Python 為 **3.12.13**，可執行檔案路徑以 `runtime\envs\.p\python.exe` 結尾；重新開啟輸入前後的雜湊一致。

下面展示 **Inputs** 與捕獲的程式碼。點選圖片可檢視包含儲存報告的完整截圖。

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Python 結果的 Provenance Code 區域性檢視，顯示 Inputs 與捕獲的產出程式碼"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="開啟包含儲存報告與捕獲程式碼的完整 Windows Python 截圖"
/>

**用 R 讀取同一張表。** 要求代理在 Session Notebook 中使用選定的 R 環境，僅使用 base R，輸出 `R.version.string`、`R.home()` 和相同的四項檢查結果，另存一份報告。展開 **Notebook run** 卡片檢視程式碼，再開啟報告核對結果。本例中 R 為 **4.4.3**，安裝目錄以 `runtime/envs/.r/Lib/R` 結尾。

![Windows R Notebook 呼叫與儲存的報告，顯示實際 R 安裝位置及樣本 QC 結果](/img/open-science/windows/runtime-r-execution.webp)

截圖中的安裝路徑屬於示例電腦；你的本機磁碟機代號、目錄和直譯器版本不同，屬於正常情況。

兩份報告對這份輸入得到相同結果：

| 檢查項 | 本例結果 |
| --- | ---: |
| 資料行數 | 12 |
| 不重複的 `original_column_name` 數量 | 12 |
| `total_raw_counts` 總和 | 269,027,617 |
| `zero_count_genes + detected_genes_count_gt_0` 等於 27,179 的行數 | 12 |

先確認本次執行的路徑對應預期環境，再將儲存的結果與上表比較。這裡使用 Python 標準庫和 base R，不需要額外軟體包，也不能據此判斷新包是否能安裝。

</PlatformContent>

## 維護和修復環境 {/* #维护和修复环境 */}

### 取消安裝後重試 {/* #取消安装后重试 */}

在 **Download and set up** 期間選擇 **Cancel**，等待出現 **Runtime setup cancelled**。選擇 **Retry setup**，等到 **Ready** 後開啟 **Packages** 檢查環境。前一個操作尚未結束時不要重複發起安裝。

<PlatformContent platform="macos">

![取消安裝與重試入口](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
### 重灌託管環境 {/* #重装托管环境 */}

1. 儲存需要保留的報告，記錄自行增加的依賴。
2. 在目標託管環境選擇 **Reinstall**。
3. 閱讀影響說明，再選擇 **Reinstall runtime**。
4. 等待 **Ready**，檢查 **Packages**。
5. 啟動新的 Notebook 單元，並重新開啟已有輸入和產出。

<PlatformContent platform="macos">

![Notebook 會話中的重灌確認](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
重灌會刪除並重建環境，正在執行的單元可能被取消並顯示 **Run cancelled: the runtime was stopped while this cell was executing.** Notebook 歷史可保留，但舊名稱空間不會恢復。重灌後先執行直譯器檢查，再重新執行產生所需變數的程式碼，並開啟已儲存檔案確認可用。

<PlatformContent platform="macos">

![核心停止後保留的 Notebook 歷史](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
檔案保留不等於記憶體變數保留。繼續分析前重新執行必要程式碼。後來新增的軟體包可能需要重灌，基礎環境恢復不能證明每個額外依賴也已恢復。

### 開發構建提示 micromamba not found {/* #开发构建提示-micromamba-not-found */}

原始碼開發版第一次安裝時，由於程序沒有找到 micromamba，在準備環境前失敗。

<PlatformContent platform="macos">

![原始碼構建缺少 micromamba 的真實錯誤](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
正式安裝包包含該程式。開發構建可在啟動程序環境中，將 `OPEN_SCIENCE_MICROMAMBA_BIN` 指向有效的 micromamba 可執行檔案，然後重啟開發例項。確認程式可執行後再重試；不要修改已安裝應用的內部檔案。

這個環境變數屬於開發啟動配置，不是 Runtimes 頁面的輸入欄位。不要透過刪除環境目錄處理此發現錯誤。

<PlatformContent platform="windows">

## 可選的 WSL2 Bash Preview {/* #wsl2-preview */}

Windows x64 可在 **Settings → Runtimes** 使用可選的 **Local Shell · WSL2 Bash Preview**。任務不需要 Linux Shell 時，繼續使用 PowerShell 即可；Windows 版 Open-Science 不要求先配置 WSL2。

選擇 WSL2 發行版及其準確的非 root **Linux user**，再選擇 **Save and check**。如需設定平臺或發行版，先按提示完成。就緒檢查和匹配的預覽資源都透過後，才能使用 **Use WSL2 Bash**；只選擇發行版不會啟用。先執行一個簡單 Shell 命令並檢查結果，再開始長任務。需要恢復預設 Shell 時，選擇 PowerShell。

檢查失敗時保留原因，在處理期間繼續使用 PowerShell。安裝 WSL 元件可能需要 Windows 管理員批准。這項預覽與選擇 Python/R Notebook 直譯器是不同設定。

</PlatformContent>
