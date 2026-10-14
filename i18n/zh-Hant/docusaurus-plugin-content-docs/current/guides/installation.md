---
title: "安裝與更新"
last_update:
  date: '2026-10-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 安裝與更新 {/* #安装与更新 */}

普通使用者應優先使用 GitHub Releases 提供的桌面安裝包。貢獻者或需要除錯最新版功能的使用者可以從原始碼啟動。Open-Science 的 Electron 桌面客戶端連線共享 Node 後端，後端也提供經過認證的本地瀏覽器介面。

<PlatformGuide />

**v1.0.0 釋出範圍：** [本次發行頁](https://github.com/aipoch/open-science/releases/tag/v1.0.0)僅提供桌面安裝包，不包含獨立 CLI 壓縮包或 Linux CLI `.deb`／`.rpm`。從該頁下載並對照同頁的 `SHA256SUMS.txt` 校驗；網站下載和自動更新通道單獨釋出，檢查結果可能暫未顯示 1.0。已有桌面安裝可繼續使用 **Settings → General → Command line tool → Install command**。

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

從 v0.33.2 起，官方 Windows 安裝程式帶程式碼簽名；v0.33.3 將簽名覆蓋到隨應用分發的可執行檔案。請透過[官方下載頁](https://aipoch.com/open-science/download)或 [GitHub Releases](https://github.com/aipoch/open-science/releases) 獲取安裝包，並按官方校驗說明核對來源。


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

v1.0.0 提供 Linux **x64 和 ARM64** 安裝包。ARM64 選擇 `aipoch-open-science-1.0.0-linux-arm64.AppImage` 或 `aipoch-open-science_1.0.0_arm64.deb`；x64 對應 `aipoch-open-science-1.0.0-linux-x86_64.AppImage` 或 `aipoch-open-science_1.0.0_amd64.deb`。從所選版本的官方 Assets 下載，與 `uname -m` 的結果對應。

</PlatformContent>

安裝位置用於存放應用程式；設定精靈中的 **Data location** 用於科研檔案和執行環境，兩者分別設定。安裝後繼續[首次設定](onboarding.md)。

### 使用獨立 CLI {/* #standalone-cli */}

**以下獨立包步驟適用於提供這些檔案的歷史版本，例如 [v0.37.2](https://github.com/aipoch/open-science/releases/tag/v0.37.2)，不是 v1.0.0 的安裝包。** 僅在有意使用該版本時下載；保持桌面與後端版本匹配，不要讓舊後端直接開啟由新版寫入的資料。需要 1.0 命令列入口時，使用其桌面附帶的啟動器，再按 [CLI 首次設定](../reference/cli.md#terminal-setup)操作。

#### Homebrew CLI {/* #homebrew-cli */}

已有 Homebrew CLI 可透過原來的 formula 管理：`brew install aipoch/tap/open-science`，與桌面 cask 不同。先檢視 Homebrew 實際提供的版本，不要由 GitHub 已釋出 1.0 推斷 formula 已更新。安裝不會啟動系統服務。命令衝突時用 `type -a open-science` 檢查，並使用 `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` 指定該安裝。

#### Linux CLI 安裝包 {/* #linux-cli-packages */}

下表保留 **v0.37.2** 的 Linux CLI 安裝方法；v1.0.0 沒有釋出這些 CLI 安裝包。`open-science-cli` 與桌面包 `aipoch-open-science` 不同。需要此舊版時，從 [v0.37.2 Assets](https://github.com/aipoch/open-science/releases/tag/v0.37.2) 下載對應檔案及 `CLI-PACKAGE-SHA256SUMS.txt`，先校驗再安裝。

| 發行版／架構 | v0.37.2 CLI 安裝包 |
| --- | --- |
| Debian / Ubuntu，x64 | `open-science-cli_0.37.2_amd64.deb` |
| Debian / Ubuntu，ARM64 | `open-science-cli_0.37.2_arm64.deb` |
| Fedora，x64 | `open-science-cli-0.37.2-1.x86_64.rpm` |
| Fedora，ARM64 | `open-science-cli-0.37.2-1.aarch64.rpm` |

透過對應的包管理器安裝已下載的檔案。下例使用 x64；ARM64 裝置應替換為表中的相應檔名。

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_0.37.2_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-0.37.2-1.x86_64.rpm
```

執行 `open-science-cli start --no-open`，再執行 `open-science-cli status --json`。確認執行後，用 `open-science-cli url` 開啟帶認證的本地 Web 介面；不要公開此地址。繼續按 [CLI 首次設定](../reference/cli.md#terminal-setup)配置模型並執行 `doctor` 檢查，將其中的 `open-science` 替換為 `open-science-cli`。

安裝包包含 Node、後端和 Web UI，不會安裝 Python／R，也不會建立自動啟動的系統服務。系統憑據儲存和沙箱前提仍適用，參見[無介面 Linux 的憑據儲存](../reference/server.md)。同時安裝了桌面啟動器時，明確使用 `open-science-cli`。

升級或解除安裝前，結束工作並停止**所有由該安裝包啟動的配置例項**。下載下一版安裝包後再透過 apt／dnf 安裝；此安裝方式不會配置 AIPOCH apt／dnf 軟體源。解除安裝保留研究資料和憑據。命令衝突與平臺要求見[官方安裝包說明](https://github.com/aipoch/open-science/blob/v0.37.2/docs/standalone-runtime.md#linux-cli-distribution-packages)。

### 從原始碼執行 {/* #从源码运行 */}

要求：Git、Node.js 24、npm，以及 Electron 在當前平臺的構建前提。代理框架可在應用中安裝或選擇。倉庫會在安裝階段生成 Prisma Client、應用補丁並準備 Electron 原生依賴。

需要復現原始碼安裝時，先從 [Changelog](../changelog/v1.0.0.md) 確定目標釋出標籤，再安裝依賴。預設克隆跟隨分支，不會固定到某個釋出版本。記錄所選標籤、原始碼提交及執行時版本，便於他人復現環境。

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

構建目標與依賴應以所選標籤的 package.json 和[獨立執行說明](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md)為準。僅開發 Node 與 Web 入口可使用 `npm run dev:web`；`npm run dev` 同時準備桌面客戶端。使用獨立配置目錄，避免測試資料進入日常配置。

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

從 1.0 起，`open-science update` 已移除。應用更新使用桌面提供的更新控制元件或官方安裝包；CLI 安裝透過原安裝器或包管理器更新。釋出頁有新版而 **Check now** 暫未顯示時，直接核對官方發行頁，不要刪除配置或反覆重置應用。

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

## 升級到 1.0 與相容範圍 {/* #version-compatibility */}

1. 結束活動研究，備份配置目錄以及另行設定的資料位置；只匯出一個 `.science` 包不等於備份整個配置。
2. 關閉使用同一安裝的桌面與後端例項，再透過官方安裝器完成升級。保留原配置、資料和系統憑據儲存。
3. 重新開啟，確認版本、專案、會話、檔案、模型和執行環境，再繼續工作。降級程式不會回滾資料；舊程式未必能讀取新版儲存的資料。

1.0 沿用現有歷史資料升級和匯入路徑，不因版本號變化要求清空配置。官方 [1.x 相容政策](https://github.com/aipoch/open-science/blob/v1.0.0/docs/compatibility.md)覆蓋已記錄的 CLI／SDK、Task 自動化介面、有效 `.science` 包的向前匯入，以及受支援的配置升級。它不保證模型回答、外部資料庫可用性或整段科研會話的確定性復現，也不承諾跨平臺遷移系統保護的憑據。安全修復面向最新穩定版。
