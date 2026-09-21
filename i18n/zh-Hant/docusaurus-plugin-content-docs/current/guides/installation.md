---
title: "安裝與更新"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 安裝與更新 {/* #安装与更新 */}

普通使用者應優先使用 GitHub Releases 提供的桌面安裝包。貢獻者或需要除錯最新版功能的使用者可以從原始碼啟動。Open-Science 是 Electron 應用，渲染層同時支援受令牌保護的本地 Web 訪問。

<PlatformGuide />

## 選擇安裝方式 {/* #选择安装方式 */}

### 下載安裝包 {/* #桌面安装 */}

1. 開啟 [Open-Science Releases](https://github.com/aipoch/open-science/releases)。
2. 選擇與你的作業系統和 CPU 架構對應的安裝包。
3. 閱讀安裝器顯示的許可說明並完成安裝，再啟動應用；首次執行會進入五步 Onboarding。
4. 若系統攔截未簽名應用，請只從 AIPOCH 官方 GitHub 倉庫重新下載，並按作業系統安全提示確認來源。

在發行頁 **Assets** 中選擇安裝包，不要把自動生成的原始碼 ZIP 當成桌面安裝包。可下載格式以該次發行實際提供的檔案為準。

<PlatformContent platform="macos">

| 電腦 | 確認架構 | 檔案選擇與安裝 |
| --- | --- | --- |
| macOS，Apple Silicon | “關於本機”顯示 Apple M 系列晶片 | 選擇 `mac-arm64.dmg`，開啟後將應用拖入 Applications，再從該目錄啟動 |
| macOS，Intel | “關於本機”顯示 Intel 處理器 | 選擇 `mac-x64.dmg`，安裝到 Applications；應用要求 macOS 12 或更高版本 |

**透過 Homebrew 安裝**

也可以透過 Homebrew 安裝：

~~~bash
brew install --cask open-science
~~~

Homebrew 自動選擇 Apple Silicon 或 Intel。安裝後在 **Settings → General → About** 檢查實際版本，包管理器可能安裝比文件基線更新的版本。[標籤版本安裝說明](https://github.com/aipoch/open-science/blob/v0.27.0/README.md)。

</PlatformContent>

<PlatformContent platform="windows">

| 電腦 | 確認架構 | 檔案選擇與安裝 |
| --- | --- | --- |
| Windows | 設定 → 系統 → 關於 → 系統型別 | 選擇匹配的 `win-…-setup.exe`，執行當前使用者安裝器，按提示選擇安裝位置 |

1. 雙擊下載的 Windows 安裝包，按安裝嚮導進入安裝位置頁面。
2. 保留預設安裝位置，或透過 **瀏覽…** 選擇存放應用程式的資料夾，然後點選 **安裝**。
3. 等待出現安裝完成頁面。保留“執行”選項並點選 **完成**，開啟 Open-Science。
4. 首次啟動後，按照[首次設定](onboarding.md)完成環境檢查、資料位置、代理和模型配置。

</PlatformContent>

<PlatformContent platform="linux">

| 電腦 | 確認架構 | 檔案選擇與安裝 |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`：`x86_64` 對應 x64，`aarch64` 對應 ARM64 | 選擇匹配的 `.deb`，用系統軟體安裝器開啟，再從應用選單啟動 |
| 其他受支援的 Linux 發行版 | 檢視 `uname -m` | 選擇匹配的 `.AppImage`，在檔案權限中允許執行，再開啟；若系統提示缺少依賴，按報錯補齊 |

</PlatformContent>

安裝位置用於存放應用程式；設定精靈中的 **Data location** 用於科研檔案和執行環境，兩者分別設定。安裝後繼續[首次設定](onboarding.md)。

### 從原始碼執行 {/* #从源码运行 */}

要求：Git、Node.js 22、npm，以及 Electron 在當前平臺的構建前提。代理框架可在應用中安裝或選擇。倉庫會在安裝階段生成 Prisma Client、應用補丁並準備 Electron 原生依賴。

需要復現原始碼安裝時，先從 [Changelog](../changelog/v0.31.1.md) 確定目標釋出標籤，再安裝依賴。預設克隆跟隨分支，不會固定到某個釋出版本。記錄所選標籤、原始碼提交及執行時版本，便於他人復現環境。

將下方 `RELEASE_TAG` 替換為所選發行頁的完整標籤（包括開頭的 `v`）。如果需要跟隨開發分支，省略 `--branch RELEASE_TAG --depth 1`；這條路線會使用預設分支。

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

構建生產包前先執行：

```bash
npm run build
```

`npm run build` 會依次完成 TypeScript 檢查以及 renderer、preload、main 三個 Electron 構建目標。若只想驗證 Web/headless 入口，應使用倉庫已有的 headless 引數和單獨的資料目錄，避免測試資料進入預設儲存。

## 完成首次配置 {/* #完成首次配置 */}

### 首次執行需要的外部能力 {/* #首次运行需要的外部能力 */}

| 能力 | 是否必需 | 用途 |
| --- | --- | --- |
| OpenCode、Claude Agent、Codex 或 CodeBuddy | 至少一個 | 驅動對話式 agent session |
| 模型接入 | 執行代理請求時必需 | 可用支援的訂閱或 API 提供方；訂閱無需單獨 API 金鑰 |
| Python / R | 可選 | Notebook 程式碼執行；可以使用檢測到的系統環境或應用管理環境 |
| 網路 | 推薦 | 安裝執行時、連線 Provider、GitHub、遠端服務和 MCP Connectors |
| SSH 主機 | 可選 | Compute 面板中的遠端任務與結果回收 |

### 本地資料 {/* #本地数据 */}

首次設定顯示用於產物、Notebook 檔案和執行環境等大型科研檔案的託管資料位置。應用設定和對話歷史仍儲存在配置位置，遷移科研資料目錄不等於完整備份應用。不要與原始碼倉庫混用；需要遷移時使用[儲存](storage.md)，不要在應用執行時手動移動內部檔案。

## 確認安裝可用 {/* #如何确认安装可用 */}

應用能夠開啟、Environment 必需檢查透過、代理已安裝、模型連線透過，才能執行代理請求。模型接入可以使用支援的訂閱或 API；Codex 訂閱不要求另行購買 API 金鑰。需要執行 Python/R 時還要準備相應執行時，能預覽 CSV 或 PDF 並不表示 Notebook 可執行。

接著閱讀[首次設定](./onboarding.md)與[提供方及本地模型設定](./providers.md)。

## 檢查應用更新 {/* #固定复现版本与检查更新 */}

在 **Settings → General → About** 檢查安裝版本，點選 **Check now** 查詢更新。安裝前確認目標版本並完成正在執行的任務。原始碼開發版與打包安裝版的更新表現可能不同。更新前保留重要輸出的匯出副本，不要手動重新命名應用內部資料目錄。

<PlatformContent platform="macos">

出現 **Install Open-Science before updating** 時，應用正在只讀位置執行。選擇 **Install in Applications**，或透過 Finder 將應用移入 Applications。安裝完成後使用 **Restart**，或退出當前副本、從 Applications 重新開啟，再檢查更新。**Continue using** 只會繼續使用當前副本，不會讓該位置變為可更新。安裝失敗時先按顯示的錯誤處理。

</PlatformContent>

<PlatformContent platform="windows">

重新安裝會保留已有資料。如果資料損壞後明確需要從頭開始，可參閱 [Windows 本地資料重置](troubleshooting.md#windows-data-reset)。這個獨立工具會刪除資料，不屬於普通更新步驟。

</PlatformContent>

## 排查安裝與啟動問題 {/* #启动失败的第一轮检查 */}

| 失敗位置 | 首先檢查 |
| --- | --- |
| 安裝包或應用啟動 | 核對下載來源、作業系統與 CPU 架構，再閱讀系統提示 |
| 原始碼安裝 | 確認 `node --version`、`npm --version` 可用，`npm install` 已完成；依賴下載中斷時重試 |
| 首次配置 | 閱讀 Environment 中未透過的檢查，解決其提示的具體要求 |
| 首次代理請求 | 確認 Agent 為 Active/Ready，並在 Model 頁面執行 **Test connection** |
| 提供方或本地瀏覽器連線 | 檢查報錯中的埠、代理或證書資訊，參見[故障排查](troubleshooting.md) |

## v0.31.0 之後的產品名稱 {/* #product-name */}

當前介面和新安裝包統一使用 **Open-Science**。升級會保留已有安裝名稱與位置、研究資料、憑據和設定。舊安裝路徑仍包含 `Open Science`，本身不代表升級失敗；不要為了匹配新的顯示名稱而重新命名或移動資料目錄。
