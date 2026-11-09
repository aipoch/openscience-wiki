---
title: "首次設定"
last_update:
  date: '2026-11-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 首次設定 {/* #首次设置 */}

首次啟動的步驟順序為：Environment、Data location、Agent runtime、Model provider、Notebook runtime。底部 `Back` 和主操作按鈕負責移動步驟；只有當前步驟達到可繼續條件時，主操作才可用。

<PlatformGuide />

首次設定完成後，較舊的應用管理 Codex 執行時可在 [Agent 設定](frameworks.md#update-codex)更新。這與選擇模型提供方是兩項操作。

## 1. Environment {/* #1-environment */}

首次啟動進入 **Prepare environment**。應用先檢查電腦環境，再讓你安裝智慧體或連線模型。每一行都有狀態和解釋；某項失敗時，應先根據該行資訊定位原因。

| 檢查項或控制元件 | 含義 | 操作方法 |
| --- | --- | --- |
| System compatibility | 檢查作業系統和處理器架構 | 確認識別結果與你的電腦一致 |
| App storage permission | 檢查應用配置目錄的寫入權限 | 失敗時處理所示路徑的權限，再重新檢查 |
| Secure credential storage | 檢查作業系統憑據庫是否可用 | 先解決憑據庫存取問題，再填寫金鑰 |
| Installation network | 檢查受支援的軟體包來源並顯示可訪問來源 | 閱讀來源與延遲；實際結果隨網路環境變化 |
| `Check again` | 重新執行環境檢查 | 檢查期間變為 `Checking…` 並禁用，避免重複發起 |
| `Continue` | 進入資料位置設定 | 必需檢查透過後可用，檢查過程中禁用 |

開啟 **Environment** 步驟，閱讀四項結果，點選 **Check again**，等待底部出現 **All required environment checks passed.**，再點選 **Continue**。這一步環境檢查不需要 API key 或付費模型呼叫；模型認證在後續步驟配置。

選擇空間充足的穩定資料位置，不要把截圖中的臨時路徑用於長期儲存。應用使用英文時，系統原生檔案選擇器仍可能使用作業系統語言。

閱讀每行檢查的結果和說明。若某項標為 Ready，仍需閱讀說明；例如使用已有代理時，安裝網路檢查可能無需下載檔案，並不代表所有外部服務都已連通。

<PlatformContent platform="macos">

![macOS 首次設定中的環境檢查已完成](/img/open-science/macos/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Windows 首次設定中的環境檢查](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Linux 首次設定中四項環境檢查均已透過](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. Data location {/* #2-data-location */}

<PlatformContent platform="macos">

![選擇資料夾前的資料位置頁面](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
在安裝執行時之前確定大型檔案的存放位置。產物、Notebook 和環境使用資料目錄；配置和歷史記錄留在配置位置。頁面顯示的路徑是隻讀摘要，不能直接在其中輸入。

| 控制元件 | 操作和結果 |
| --- | --- |
| `Location`／路徑顯示 | 展示預設資料目錄，或你剛選定的目標目錄 |
| `Browse…` | 開啟系統目錄選擇器；選擇父資料夾後，回到頁面檢查最終的應用管理路徑 |
| 系統選擇器 `Cancel` | 取消本次選擇，保留此前路徑 |
| `Use default location instead` | 選過自定義目錄後出現；清空自定義選擇及相關錯誤 |
| `Back` | 返回 Environment |
| 保持預設位置時點選 `Continue` | 進入 Agent runtime |
| 選過新位置後點選 `Continue` | 開啟 `Restart to set up your data?`，不會靜默切換目錄 |
| `Retry` | 預設位置讀取失敗時出現，用於重新讀取 |

<PlatformContent platform="macos">

![選擇父資料夾後顯示最終應用資料路徑](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
點選 **Browse…**，在空間充足的磁碟上選擇空父資料夾，檢查嚮導顯示的完整受管理路徑。選擇 **Continue** 並閱讀重啟確認。研究資料應放在穩定位置，不要使用臨時目錄。

<PlatformContent platform="macos">

![資料位置重啟確認](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| 確認框控制元件 | 結果 |
| --- | --- |
| 關閉按鈕 `×` | 返回位置頁，並保留剛選的路徑 |
| `Keep default` | 清除剛選的路徑，以預設位置繼續下一步 |
| `Restart` | 啟用所選資料位置並重啟應用；重啟後繼續 Agent runtime |

應用會先檢查目標資料夾。已有且可識別的資料目錄可以原地接管，頁面會說明沒有搬移資料；不可用目錄會顯示錯誤。啟用或重啟失敗時可顯示錯誤，並允許重試或使用預設位置。不要手動搬動或改名應用管理的資料資料夾。

### 接管已有資料目錄 {/* #接管已有数据目录 */}

1. 選擇 **Browse…**，選中包含已識別應用資料目錄的父資料夾。
2. 確認提示 **This folder already contains Open Science data — it will be used as-is (nothing is moved).**，核對完整路徑後選擇 **Continue → Restart**。
3. 重啟後向導續接到 **Agent runtime**，所選資料位置保留，再完成後續設定。

接管後開啟代表性檔案，確認所需資料仍在。接管針對大檔案儲存，不會匯入另一安裝的設定、會話資料庫或憑據。**Keep default** 清除擬用位置並繼續使用原生效位置。

### 資料位置無法儲存時如何恢復 {/* #数据位置无法保存时如何恢复 */}

若提示 **Could not finish setting up storage: EACCES: permission denied**，先看報錯指向的路徑。配置目錄同樣需要可寫；只選擇可寫的資料目標目錄未必能解決問題。恢復受影響的應用專用配置位置訪問權限後，可重試，或選擇 **Use default location instead → Continue**。

<PlatformContent platform="macos">

![實際配置寫入失敗與恢復入口](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
如果重啟在新位置生效前失敗，恢復應用配置目錄的寫入權限後重新開啟向導。先核對當前生效路徑並開啟已有檔案，再決定是否重試切換位置。具體檢查見[儲存與歸檔內容](storage.md)。

## 3. Agent runtime {/* #3-agent-runtime */}

選擇運行會話的 Agent。全新的 v1.2.0 配置默認使用內置 **Open-Science Agent**，選擇它時無需另行安裝 Agent，但需要兼容的 API 提供方。如果使用 **Codex subscription**，則應選擇並準備 **Codex**；下方演示的是這條路徑。確認預期運行時就緒後繼續。

<PlatformContent platform="macos">

![Codex 安裝來源選單](/img/open-science/walkthrough-2026-09-08/05-agent-install-menu.webp)

</PlatformContent>
1. 開啟 **Install Codex**。
2. 選擇選單推薦的應用管理安裝來源；另一種來源使用全域 npm 安裝。
3. 等待安裝完成，期間不要啟動另一個安裝任務。
4. 確認 Codex 顯示版本號和 **Active**。
5. 選擇 **Continue** 進入 Model provider。

<PlatformContent platform="macos">

![Codex 安裝完成併成為活動執行時](/img/open-science/walkthrough-2026-09-08/06-agent-codex-ready.webp)

</PlatformContent>
版本標籤指的是已安裝代理或介面卡，不是所選模型；核對實際安裝值，無需與截圖版本完全相同。

<PlatformContent platform="windows">

已有相容代理時，選擇其卡片並確認 **Active**，再繼續。下方 Windows 介面使用已有 Codex 安裝；無需為了完成嚮導而重新安裝它。

![Windows 設定嚮導中已有 Codex 代理被選為 Active](/img/open-science/windows/setup-agent-active.webp)

</PlatformContent>

| 控制元件或狀態 | 行為 |
| --- | --- |
| 框架卡片 | 顯示安裝狀態、版本、執行時路徑和活動狀態 |
| **Install…** | 展示該框架支援的安裝來源 |
| 安裝進度 | 顯示準備狀態；安裝期間不能啟動衝突的安裝操作或重新檢測 |
| **Re-detect** | 重新整理執行時檢測資訊，檢查期間變為 **Detecting…**。也可在 Settings → Agent 中重新檢測 |
| **Uninstall** | 活動執行時不可解除安裝；需先切換到另一個已安裝框架 |
| **Back** | 沒有阻塞的安裝操作時，返回 Data location |
| **Continue** | 活動執行時就緒後進入下一步 |

各框架的安裝來源、切換、修復和解除安裝方法見[安裝與切換代理框架](frameworks.md)。

## 4. Model provider {/* #4-model-provider */}

表單會根據 **Provider type**、活動代理和認證方式變化。使用 Codex 訂閱時，**Import existing Codex sign-in** 會將本機已有登入複製到 Open-Science。需要連線該賬號時選擇匯入，再等待連線檢查。

<PlatformContent platform="macos">

![尚未認證的英文 Codex 訂閱表單](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

</PlatformContent>
使用 API 提供商時，選擇型別，填寫其要求的端點和模型資訊，然後選擇 **Test & continue**。嚮導先檢查必填欄位，再執行連線測試。測試成功後推進嚮導；輸入或連線錯誤會保留在表單中供修改。

<PlatformContent platform="macos">

![Custom Gateway 必填欄位校驗](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
認證方式、高階欄位及連線失敗的處理見[提供方設定](providers.md)。

API Key 只填寫在專用憑據欄位中，不放入截圖、專案指令或對話訊息。

## 5. Notebook runtime {/* #5-notebook-runtime */}

最後一步為可選設定，複用完整的 **Settings → Runtimes** 介面。預設使用應用管理的 Python，也可以選擇已檢測到的直譯器，或稍後配置其他環境。

| 嚮導控制元件或狀態 | 操作結果 |
| --- | --- |
| **Back** | 返回 Model provider。執行時準備中或正在完成設定時禁用 |
| **Finish** | 儲存初始設定完成狀態。Notebook 配置可選，不要求先準備好自定義直譯器 |
| 已啟動環境準備 | 等待完成或先取消準備任務；期間 **Back** 與 **Finish** 禁用，避免遺留半成品環境 |
| 完成失敗 | 顯示錯誤，並允許重試 |

選擇 **Finish**，確認首頁開啟，再按[首次專案](first-project.md)建立小專案並儲存結果。重新開啟應用，確認專案仍可訪問。若向導意外重新出現，先檢查資料位置和配置寫入錯誤，不要立即新建另一套配置。

<PlatformContent platform="windows">

Windows 的 **Notebook runtime** 頁面還可能顯示 **Local Shell · WSL2 Bash Preview**。閱讀底部 **Optional — nothing here is required to finish setup.**：暫不配置 Python/R、沒有安裝 WSL2 時，也可以點選 **Finish**。請求程式碼執行前仍需準備相應執行環境；完成嚮導不會自動安裝這些可選環境。

![Windows 可選 Notebook 與 WSL2 設定，Finish 按鈕可用](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## 設定後的驗收清單 {/* #设置后的验收清单 */}

| 檢查項 | 應看到的證據 | 失敗時處理 |
| --- | --- | --- |
| Environment | 必需檢查透過 | 解決具體要求後重新檢查 |
| Data location | 最終託管路徑符合預期 | 回到路徑頁檢查，不能只憑選擇器裡的父目錄判斷 |
| Agent | 已安裝版本與 Active 狀態 | 檢視安裝日誌並重新檢測 |
| Provider | 連線已驗證，主模型已選擇 | 檢查登入或提供方專有欄位 |
| Notebook | 需要程式碼執行時，執行時 Ready 且已啟用 | 先配置 **Settings → Runtimes** |
| 首個任務 | 有代理回覆與可開啟的儲存結果 | 分別檢查權限、工具錯誤和模型連線 |

<span id="完整设置后的实际结果" />

## 重新配置 {/* #重新配置 */}

完成引導後不需要重新執行 wizard：Model、Agent、Runtimes、Storage 分別對應上述設定。若資料目錄損壞或應用配置目錄不可寫，Settings → Storage 會顯示修復入口。

## 原始碼依據 {/* #源码依据 */}

[OnboardingWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironmentStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [LocationStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
