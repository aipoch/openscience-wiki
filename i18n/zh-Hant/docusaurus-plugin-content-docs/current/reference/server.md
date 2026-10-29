---
title: "無介面服務與瀏覽器訪問"
last_update:
  date: '2026-10-29'
---

# 無介面服務與瀏覽器訪問 {/* #无界面服务与浏览器访问 */}

本地服務提供無介面後端和 localhost 瀏覽器入口，與 SSH Compute 主機、Remote.It 瀏覽器配對不同。連線客戶端前，應配置主機所需的認證與憑據儲存方式。

## 目標和發現規則 {/* #目标和发现规则 */}

v0.37.0 起，共享後端在普通 Node 程序執行，桌面應用作為原生客戶端連線；CLI 啟動不再依賴隱藏的 Electron 主機。

| 選擇器 | 範圍 |
| --- | --- |
| `--port PORT` | localhost 埠，整數 1–65535；指定埠被佔用時會報錯 |
| `--config-root PATH` / `--profile PATH` | CLI 的獨立配置目錄；整個流程使用同一絕對路徑 |
| `OPEN_SCIENCE_CONFIG_ROOT` | 以環境變數明確指定配置目錄；命令引數優先 |
| 自動發現 | 查詢本地服務狀態，確認連線的配置、埠與版本 |

桌面後端未指定埠時會選擇空閒埠，CLI 啟動預設使用 44100。不要根據視窗是否開啟來猜埠；先執行 `status --json`。同一配置已有相容服務時可連線它，版本不相容時應先結束工作並按提示更新。舊的 `--app-path` 選項不能將 Electron 可執行檔案當成新版後端啟動。

狀態檔案為 `web-service.json`。認證失敗不意味著可以刪除狀態檔案或終止其中的 PID；先檢查實際服務與診斷資訊，避免誤操作其他程序。

## 初始化與檢查就緒狀態 {/* #readiness */}

使用 `open-science init` 準備預設配置目錄，不會啟動應用。需要隔離配置時，init、start 和後續命令均指定同一 `--profile` 絕對路徑。Debian 安裝包隨應用安裝 CLI。Codex 準備和登入見[終端設定](cli.md#terminal-setup)。

明確需要啟動服務時執行 `start --no-open`，之後執行 `open-science doctor --json`。檢視整體 `ready`、逐項檢查和建議操作，不能只憑退出碼判斷就緒。繼續使用已有的本地認證介面；啟動無介面服務不會配置 Remote.It，也不會發布公網入口。

## 生命週期命令 {/* #lifecycle-commands */}

從 v1.0.5 起，App 連接或顯式 CLI 啓動會保持服務運行。所有命令應使用同一個絕對配置路徑。

| 命令 | 結果 |
| --- | --- |
| `open-science start` | 啓動或複用服務，顯式保持其運行，並打開瀏覽器 |
| `open-science start --no-open --json` | 設置相同的持續運行狀態但不打開瀏覽器；返回 `started` 或 `already-running`、服務信息和 `lifetime` |
| `open-science status --json` | 檢查目標服務；沒有服務時返回 `{"running":false}`，退出碼爲 1 |
| `open-science url` | 輸出帶認證信息的瀏覽器地址；不要公開分享 |
| `open-science stop --json` | 解除顯式持續運行狀態；僅在沒有 App 連接時停止服務 |
| `open-science stop --force --json` | 請求停止整個服務，包括仍連接 App 的情況；可能中斷任務 |

重複執行 `start` 不會累加持續運行次數。**start**、**status**、**stop** 支持 `--json`，**url** 不支持。JSON 啓動結果不會暴露帶認證信息的瀏覽器地址。舊服務可能返回未知生命週期狀態；依賴新規則前先確保版本匹配。

### 停止結果

| JSON `result` | 含義 |
| --- | --- |
| `already-stopped` | 沒有找到存活的服務記錄 |
| `keep-alive-revoked` | 已解除顯式持續運行狀態，但仍連接的 App 使服務繼續運行 |
| `stopped` | 本次請求對應的服務實例已退出並釋放所有權 |
| `shutdown-requested` | 舊服務接受了請求，但尚未確認退出；命令返回非零退出碼 |

讀取 `result` 和 `lifetime`；僅憑成功退出碼無法判斷服務已停止。舊的 `daemon-stopped` 和 `web-service-stopped` 結果名稱不再輸出。`--force` 要求新版生命週期協議，面對舊服務會明確報錯。應檢查錯誤與當前狀態，不要通過刪除狀態文件或終止記錄中的 PID 強行處理。

## 認證與瀏覽器訪問 {/* #认证与浏览器访问 */}

SDK 發現本地服務並讀取其本地 token，透過請求頭髮送。普通人類可讀輸出、JSON、JSONL 不列印 token；`url` 是顯式生成帶認證瀏覽器入口的例外。

localhost 服務不會自動讓其他電腦訪問。遠端瀏覽器功能有獨立訪問模式、配對和可信瀏覽器管理；SSH Compute 則向配置過的遠端主機提交任務。

Remote.It 配對見[遠端瀏覽器訪問](../guides/remote-access.md)，SSH 作業見[遠端計算](../guides/remote-compute.md)。按對應功能的設定流程配置連線。

### Linux 無介面服務的憑據儲存 {/* #linux-无界面服务的凭据存储 */}

預設仍使用作業系統保護儲存。Linux headless 後端沒有可用金鑰環時，可顯式選擇：

<p className="example-label"><strong>示例</strong> 使用檔案憑據儲存啟動 Linux 無介面服務</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| 選擇 | 行為 |
| --- | --- |
| 不傳選項 / --credential-store=os | 要求作業系統保護儲存 |
| --credential-store=file | 僅 Linux headless 允許未加密的 Settings 憑據檔案儲存 |
| 桌面端、macOS、Windows | 不支援檔案模式 |
| 已有執行中的後端 | 拒絕顯式選擇模式，不改變已有程序 |
| 下次啟動 | 需要再次指定，不是儲存的偏好 |

檔案模式在配置根目錄使用 settings.json 和 credentials.json，透過原子寫入及 POSIX 0600 權限儲存。file:v1: 值只是 base64 編碼，**沒有加密**；能讀取檔案的人可以還原秘密，不應放入倉庫、映象或支援報告。

此選擇作用於新建/更新的 Settings Provider 金鑰、應用管理的訂閱令牌、GitHub/文獻金鑰、共享 MCP/OAuth 秘密。Compute 密碼及受保護 Compute 資料仍有獨立的 OS 儲存要求，外部 Agent 框架登入儲存遵循各自規則。此選項不會關閉沙箱。

已有加密值不會自動遷移，仍需原作業系統金鑰庫讀取。無法讀取時，透過正常表單重新填寫憑據。檔案引用需要顯式檔案模式才能讀取，舊版本不相容。返回 OS 儲存時，應以 OS 模式重啟，在金鑰庫可用時明確替換憑據。

配置需要在更換容器後保留時，使用持久儲存。關閉應用會保留配置，但替換臨時容器檔案系統可能移除配置。參見[憑據儲存約定](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md)。

## 後臺服務的保持與停止 {/* #backend-ownership */}

| 操作 | 對後臺服務的影響 |
| --- | --- |
| 未顯式執行 CLI 啓動時，退出最後一個連接的 App | 服務停止 |
| 執行 CLI `start` 後退出全部 App | 服務因顯式持續運行設置而保持運行 |
| 關閉瀏覽器標籤頁或 SDK 客戶端 | 不會解除顯式持續運行設置 |
| 執行普通 CLI、Web 或 SDK 任務 | 不會單獨讓服務在全部 App 退出後繼續運行 |
| 仍有 App 連接時執行 `open-science stop` | 解除顯式持續運行設置；服務繼續供已連接 App 使用 |
| 執行 `open-science stop --force` | 請求停止整個服務，可能中斷工作 |

若瀏覽器或自動化任務需要在退出桌面應用後繼續，請先顯式啓動同一配置的服務。將窗口關閉到托盤不等於退出。停止整個服務前結束活躍研究，之後用 `status --json` 檢查狀態。

斷開連接的桌面應用提供 **Reconnect** 和 **Quit app**。Reconnect 不會重新提交工作。按[連接恢復](../guides/troubleshooting.md#connection-recovery)處理；重試前檢查那些響應丟失的操作是否已經完成。

### 桌面退出中斷後重新連接 {/* #desktop-service-recovery */}

重新打開相同版本的桌面應用，連接原配置。App 連接與顯式 CLI 持續運行設置共同決定服務是否保留；瀏覽器標籤頁本身不能替代這兩者。

退出準備失敗時，窗口會保留。保存未保存的工作，恢復後檢查原任務。若啓動提示舊服務阻塞，先確認配置、版本及活躍客戶端，再選擇明確的停止操作。取消會保留服務；停止失敗可以重試或重新檢查，不要刪除鎖文件。

## 應用更新行爲 {/* #application-update-behavior */}

CLI 應用更新命令仍已移除，不要使用 `open-science update --json`。請通過[桌面更新控件或原安裝渠道](../guides/installation.md#manual-update)更新。

替換獨立 CLI 文件前，先結束使用該安裝的每個配置中的工作。退出連接的 App，並對各配置執行 `stop --json` 解除顯式持續運行設置。確認返回 `stopped` 或 `already-stopped`；`keep-alive-revoked` 表示仍有 App 保持服務運行。只有確實要停止全部客戶端工作時，才使用 `stop --force`。不要覆蓋正在運行的程序文件。

桌面更新可能要求停止已連接的 CLI 服務並轉爲桌面管理。確認配置和受影響任務後再同意；取消會讓原服務繼續運行。這不會更新原獨立 CLI 程序文件。按佔用與恢復提示操作，不要刪除鎖或配置。

升級後確認版本及原有數據，再檢查 `status --json` 和 `doctor --json`。保留憑據存儲模式。[1.x 兼容政策](../guides/installation.md#version-compatibility)不保證桌面與後臺混用不同版本。另見[官方運行說明](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md)、[CLI](cli.md) 和 [Task SDK](api.md)。

## 網頁工作區中的 Compute {/* #web-compute */}

獨立網頁工作區的後端具備所需 Notebook 和 Compute API 時，會開放 **Compute**。打開已連接的工作區，確認面板可用，再按原有 SSH／Slurm 配置步驟操作。面板可用不代表已提供遠程憑據，也不證明作業能夠執行。

## 研究包與外部工具客戶端 {/* #local-research-tools */}

經過身份驗證的本地 Web 會話可以[上傳和下載研究包](../guides/research-packages.md#local-package-transfer)；遠程 Web 會話不因此獲得傳輸能力。同一臺機器上的外部工具客戶端可配置 [stdio MCP 適配器](cli.md#external-mcp)。它使用已運行的本地服務及該配置的權限，不會建立遠程 MCP 地址。
