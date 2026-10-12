---
title: "無介面服務與瀏覽器訪問"
last_update:
  date: '2026-10-12'
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

## 服務命令 {/* #服务命令 */}

| 命令 | 結果 | 選項與邊界 |
| --- | --- | --- |
| `open-science start` | 啟動後端並開啟瀏覽器 | 預設埠 44100 |
| `open-science start --no-open` | 啟動但不開啟瀏覽器 | 用於有意開啟的本地服務 |
| `open-science status --json` | 輸出結構化狀態 | 無服務時返回 `{"running":false}`，退出碼 1 |
| `open-science url` | 輸出帶認證的瀏覽器 URL | 含本地訪問憑據，不放進公開示例 |
| `open-science stop` | 請求經過認證的優雅停止 | 不盲目向陳舊狀態檔案裡的 PID 發訊號 |
| `open-science stop --json` | 輸出停止結果 | 見下表 |

這些命令中，**status 和 stop 支援 `--json`，start 和 url 不支援**。本地 `start --json` 檢查在啟動前返回 `invalid_cli_usage`、退出碼 2。指令碼應先執行 `start --no-open`，再執行 `status --json`。

### 停止結果 {/* #停止结果 */}

| JSON `result` | 含義 |
| --- | --- |
| `already-stopped` | 未找到活動服務記錄 |
| `daemon-stopped` | 經過認證的 Node 後端已退出；連線它的客戶端失去後端連線 |
| `web-service-stopped` | 舊版 Electron Web 服務結果，不適用於新版獨立 Node 後端 |

停止請求被拒絕或超過截止時間時返回失敗。應檢查錯誤和實際狀態，不能僅憑命令返回就聲稱服務已停止。

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

## 服務歸屬與關閉 {/* #backend-ownership */}

| 操作 | 對後端的影響 |
| --- | --- |
| 僅關閉瀏覽器標籤頁 | 後端繼續執行 |
| 退出啟動了後端的桌面應用 | 該桌面應用擁有的後端隨之停止 |
| 退出連線到已有 CLI 後端的桌面應用 | 只斷開該客戶端，CLI 後端繼續執行 |
| `open-science stop` | 停止目標配置的後端，所有連線它的客戶端都會受影響 |

關閉視窗與退出應用可能不同，特別是在應用仍駐留托盤時。停止共享後端前先結束活動研究，再檢查 `status --json` 的實際狀態。

## 應用更新 {/* #应用更新 */}

桌面應用的原生更新入口與獨立 CLI 包的更新方式不同。普通 Node 後端不能執行桌面安裝器替換；其 `update --json` 會報告需要手動更新及 `package-manager` 模式，應按返回說明處理。

- **桌面應用**：使用應用內更新。若連線的是先前由 CLI 啟動的後端，先結束任務並停止該後端，再更新桌面應用。
- **獨立 CLI 壓縮包**：結束工作、停止目標後端，將新版本解壓到新目錄，保留原配置資料，更新所用啟動器或 PATH；不要覆蓋執行中的包。
- **npm 安裝**：按包管理器流程更新對應包，並確認客戶端與後端相容。

更新後重新啟動，執行 `status --json` 與 `doctor --json`，確認版本、配置目錄與就緒狀態。保留原有憑據儲存方式；不要為了更新刪除憑據或配置目錄。

參見[官方獨立執行說明](https://github.com/aipoch/open-science/blob/v0.37.1/docs/standalone-runtime.md)、[CLI](cli.md)與 [Task SDK](api.md)。
