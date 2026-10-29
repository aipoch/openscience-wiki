---
title: "CLI 與結構化輸出"
last_update:
  date: '2026-10-29'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI 與結構化輸出 {/* #cli-与结构化输出 */}

使用 `open-science` 檢視應用狀態、執行任務、管理 Connector 與憑據，以及操作本地服務。先安裝命令入口，再確認它連線的是預期本地例項。

<PlatformGuide />

**應用更新命令已移除：** v1.0.0 不再接受 `open-science update` 或其 `--json` 形式。使用桌面更新控制元件，或原安裝器／包管理器；原更新專用退出碼 5 和 6 不再屬於當前 CLI 表。升級步驟見[安裝與更新](../guides/installation.md#version-compatibility)。

## 從終端完成首次設定 {/* #terminal-setup */}

可安裝桌面版命令入口、使用 v1.0.5 獨立壓縮包，或按 [npm 安裝步驟](../guides/installation.md#npm-cli)操作。獨立壓縮包包含 Node、後端和 Web UI；下面的解壓步驟適用於這些壓縮包。

1. 選擇與主機匹配的 macOS／Linux arm64 或 x64 包，或 Windows x64 包。
2. 完整解壓到可寫目錄，保留啟動器、`backend` 與 `node-runtime` 的相對位置；只複製啟動器會導致無法啟動。
3. 在該目錄中，macOS/Linux 執行 `./open-science --help`，PowerShell 執行 `./open-science.cmd --help`。將該目錄加入 PATH 後，重新開啟終端，即可使用下方的 `open-science` 命令。
4. 啟動本地後端並檢查就緒狀態。服務啟動本身不會完成模型配置。

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init` 只建立配置目錄，不啟動應用。`--profile` 是 `--config-root` 的別名，可為 CLI 指定獨立配置。init、start 與後續命令應始終使用同一絕對配置目錄；獨立配置需要各自完成設定。`runtime list` 顯示檢測到的框架就緒狀態、版本和應用管理/外部來源，不暴露可執行檔案路徑。

尚未配置 Codex 時：

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

按提示完成登入。此流程準備或修復應用管理的 Codex 執行時，並透過應用登記訂閱，不會匯入外部 Codex 登入檔案。首次設定目前針對 Codex，即使執行時列表還顯示其他框架。已有配置發生衝突時會報錯，不會直接覆蓋。

改用 OpenAI API key 時，使用 `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`，填入受支援的模型 ID，並透過已有金鑰管理方式提供環境變數。配置 OpenAlex 時使用 `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`。這兩條命令前均加 `open-science`。不要把金鑰本身放進命令引數。憑據檢查成功不代表科研查詢已完成，也不保證仍有配額。

檢視 `doctor` 的 **ready**、逐項 **checks** 和建議的 **next** 操作。命令成功退出時 `ready` 仍可能為 false；後端未啟動時會明確報告並以 3 退出。完成提示中的前置條件，再次檢查，然後在目標專案中[執行任務](#运行输入与控制参数)。

透過 Homebrew 或 Linux `.deb`／`.rpm` 安裝時，先按[安裝包說明](../guides/installation.md#standalone-cli)操作。Linux 發行包提供 `open-science-cli`；在本頁示例中使用該命令，避免誤用另一套桌面啟動器。

## 入口 {/* #入口 */}

| 入口 | 條件 | 命令 |
| --- | --- | --- |
| 應用安裝的啟動器 | **Settings → General → Command line tool → Install command** | `open-science --help` |
| 原始碼倉庫 | 已構建應用並準備倉庫依賴 | `node packages/open-science/cli.mjs --help` |
| 獨立 CLI 壓縮包 | 匹配系統與架構，保留完整解壓目錄 | `./open-science --help` 或 `./open-science.cmd --help` |
| npm 客戶端／SDK | Node.js 22.13+ 與相容的執行中後端；安裝前確認包要求 | 包名 `@aipoch/open-science` |

應用啟動器使用隨應用附帶的執行時。目錄不在 PATH 時，按 General 頁面顯示的指令配置並開啟新終端。不要為了展示名稱而修改命令名。

<PlatformContent platform="windows">

點選 **Install command** 後，新開一個 PowerShell 視窗，執行：

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

檢查 **Source** 是否指向 General 顯示的啟動器，通常是使用者目錄下的 `open-science.cmd`。幫助輸出成功說明啟動器可以執行。如果狀態返回 `{"running":false}`，表示 CLI 沒有報告執行中的後端，不代表桌面視窗已經關閉。提交任務或下載檔案前，按[服務端模式](server.md)檢查預期例項。

</PlatformContent>

## 完成一個小型命令列任務 {/* #完成一个小型命令行任务 */}

<p className="example-label"><strong>示例</strong> 透過命令列儲存說明檔案</p>

1. 按上方入口安裝命令。透過桌面應用或 `start --no-open` 保持後端執行，並確認模型可用。
2. 執行 `open-science status --json`，再執行 `open-science project list --json`。確認目標例項並複製返回的專案 ID。
3. 建立 `task.md`，內容為：**儲存 project-note.md，寫一段簡短的連線檢查說明。不要讀取其他檔案或訪問網路。**
4. 按下方“執行輸入與控制引數”的命令依次操作；每次先取得返回 ID，再替換下一條命令的佔位符。
5. 若任務等待權限，在對應的桌面或已認證瀏覽器會話中回應。`--wait` 超時時任務可能仍在繼續，重新提交前先用 `run status RUN_ID --json` 檢查。
6. 選擇返回的 Markdown 產物 ID，下載到一個新的本地檔名並開啟。若任務完成但沒有指定檔案，應在同一會話繼續請求儲存。產物已存在但下載失敗時，按[產物下載恢復步驟](./api.md#任务已完成但文件下载失败)處理。

Plan first 任務可使用 `--return-on-attention`，閱讀返回計劃，再透過應用或下方計劃命令回應。JSON 整合應區分 running、completed、failed 和 cancelled，不能將 HTTP 請求成功直接當作任務完成。

## 命令分類 {/* #命令分类 */}

| 命令 | 引數 | 作用 |
| --- | --- | --- |
| `project list` | `--json` | 列出專案 |
| `project create` | 名稱、可選描述、兩種 Agent Context 輸入之一 | 建立專案 |
| `project update` | ID 或精確名稱，以及要修改的欄位 | 僅修改提供的值，清空上下文使用 `--clear-agent-context` |
| `project session-defaults show/update` | 專案、會話選項 | 讀取或更新新會話預設值，帶併發編輯保護 |
| `run` | 專案、提示詞、可選會話與等待選項 | 開始或繼續工作 |
| `run status/cancel` | Run ID | 檢視或顯式取消 |
| `session status` | Session ID | 讀取會話狀態 |
| `session config show/update` | 會話、修改時提供 `--revision` | 讀取配置或更新之後的輪次 |
| `settings agent-routing show/update` | 框架和 Reviewer/Subagent 路由 | 讀取或原子更新全域配置 |
| `plan show/approve/reject/revise` | 會話，決定時提供精確產物版本和修訂 | 讀取或回應計劃 |
| `artifacts list` | Session ID | 列出產物 |
| `artifacts download` | Artifact ID、`--output` | 儲存外部副本 |

指令碼優先使用專案 ID。CLI 可把唯一的精確名稱解析為 ID，重名會產生歧義；SDK/HTTP 直接要求 ID。Project Agent Context 上限為 16,000 字元，專案輸出返回 `hasAgentContext`，不返回上下文正文。

`artifacts download` 返回 HTTP 500 時，舊版應用先更新，再使用原來返回的產物 ID 重試。[下載恢復步驟](api.md)區分任務完成和檔案傳輸失敗，不要只為取得已有輸出而重跑研究任務。

## 管理 Connector 與憑據 {/* #管理-connector-与凭据 */}

這些命令使用正在執行的後端及已儲存 Settings。編輯前確認目標例項。自定義 Connector 和憑據寫入需要本地認證連線；伺服器場景應在伺服器本機執行 CLI，也可經 SSH 登入後執行。

| 命令 | 輸入或結果 |
| --- | --- |
| open-science connector list --json | 讀取 Connector 的安全設定檢視 |
| open-science connector show CONNECTOR_ID --json | 檢視返回 ID 對應的配置和狀態 |
| open-science connector enable CONNECTOR_ID | 設定啟用偏好 |
| open-science connector disable CONNECTOR_ID | 關閉啟用偏好 |
| open-science connector add --json | 從 JSON 標準輸入讀取新建自定義 MCP 配置 |
| open-science connector update CONNECTOR_ID --json | 從 JSON 標準輸入讀取修改 |
| open-science connector remove CONNECTOR_ID | 刪除自定義 MCP 配置 |
| open-science connector test CONNECTOR_ID --json | 單獨建立連線、發現工具後關閉 |
| open-science credential list --json | 讀取憑據後設資料，不返回原始秘密 |
| open-science credential add --json | 從 JSON 標準輸入讀取新憑據 |
| open-science credential update CREDENTIAL_ID --json | 從 JSON 標準輸入更新 displayName 和/或 secret |

<p className="example-label"><strong>示例</strong> 提交本地 Connector 配置</p>

可使用以下命令提交已準備的本地配置檔案：

~~~bash
open-science connector add --json < connector.json
~~~

| 配置欄位 | 要求 |
| --- | --- |
| name / displayName | 新建必填；更新時 name/ID 保持穩定 |
| transport | stdio、streamable_http 或 sse；更新也必須提供 |
| command / args | stdio 的本地可執行程式和可選引數 |
| url | HTTP/SSE 端點 |
| envCredentialIds / headerCredentialIds | 將環境變數/請求頭名稱繫結到已儲存憑據 ID |
| oauthCredentialId | 繫結已有共享 OAuth 憑據 |
| 省略憑據繫結 | 更新時保留已儲存值；空的環境變數/請求頭繫結物件清空對應對映 |

只有自定義 MCP 可以新增、修改、刪除。**Enabled** 是選擇偏好，不證明連線成功，也不等於撤銷所有 Specialist 的訪問。

**test** 不會啟用 Connector 或執行業務工具，返回 success、可選 toolCount 和 message。發現階段上限十秒，失敗返回非零退出碼；不支援對內建 Connector 做此實時診斷。測試可能重新整理已有 OAuth 令牌，但不會完成首次瀏覽器登入。

秘密透過 JSON 標準輸入寫入，不要放進命令引數或 Shell 歷史。token 輸入包含 displayName、kind: token、secret，也支援 api_key。把返回的 createdCredential.id 繫結到 Connector。舊後端沒有這些端點時返回錯誤，不會退回直接編輯 Settings 檔案。

## 執行輸入與控制引數 {/* #运行输入与控制参数 */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

將大寫佔位符替換成實際返回的 ID。示例沒有假定本機存在某個虛構 Skill 或提供方。

| 引數 | 約束 |
| --- | --- |
| `--prompt` / `--prompt-file` | 內聯文字或 UTF-8 檔案；省略時可從 stdin 讀取 |
| `--session` | 繼續指定會話 |
| `--cwd` | 外部工作目錄，CLI 解析相對路徑，服務端校驗規範路徑 |
| `--approval-profile` | `ask`、`auto`、`full`，預設 `ask` |
| `--provider` 與 `--model` / `--provider-default-model` | 配置過的提供方及明確或預設模型 |
| `--reasoning-effort` | CLI 幫助列出 `default`、`low`、`medium`、`high`、`xhigh`、`max`，UI 模型選項可能不同 |
| `--skill` | 可重複的已安裝 Skill ID，不負責安裝 |
| `--plan-first` | 計劃得到回應後才執行 |
| `--auto-review` / `--no-auto-review` | 設定會話自動審查 |
| `--memory` / `--no-memory` | 設定會話記憶，互斥 |
| `--specialist` | 新會話繫結 UUID 或穩定 profile 名，展示名稱不是路由 ID |
| `--delegation allow/deny` | 控制新委派准入，deny 不取消已有子任務 |
| `--compute-host` | 可重複的已配置主機 ID；選擇目標，不配置 SSH |
| `--enable-compute-host` / `--clear-compute-hosts` | 新會話訪問與預設值；現有會話訪問修改走配置更新 |

外部 `cwd` 仍歸呼叫者所有。已有會話再次提供 `--cwd` 時必須對應同一規範目錄，不會藉此遷移會話。省略主機引數保留既有選擇，清空應使用明確操作。

## 等待、需要處理和取消 {/* #等待需要处理和取消 */}

| 選項/狀態 | 結果 |
| --- | --- |
| 不加 `--wait` | Run 被接納後返回，儲存 `id`、`sessionId` 供查詢 |
| `--wait` | 等待終態 |
| `--wait --return-on-attention` | 計劃需要審批時也可返回；普通權限請求不是同一種 attention |
| `--timeout-ms` | 到時停止客戶端等待，伺服器任務仍繼續 |
| `--cancel-on-timeout` | 超時後顯式取消，命令仍報告超時 |
| `run cancel RUN_ID` | 等待取消和收尾，保留已經完成儲存的產物 |

審批前先讀取 `plan show`，同時提交 `--artifact-version` 和 `--revision`，避免舊決定應用到新計劃。會話更新同樣使用 `session config show` 返回的 revision，過期值返回 `session_revision_conflict`。正在執行的主代理、子代理或 Notebook 可使修改返回 `session_busy`。

## 結構化輸出和退出碼 {/* #结构化输出和退出码 */}

`--json` 輸出一個結果，`run --wait --jsonl` 輸出逐行事件，最後輸出 Run 結果；兩者不能同時使用。結構化錯誤位於 stderr，應檢查 `error.code`，不只看退出碼。

本地復現的非法引數錯誤：

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| 退出碼 | 含義 |
| ---: | --- |
| 0 | 命令成功，仍應檢查返回的 Run/attention 狀態 |
| 1 | 通用/任務失敗、超時、衝突，或 status 表示無執行服務 |
| 2 | CLI 引數無效 |
| 3 | 本地 daemon 不可用 |
| 4 | 指定專案、Run、會話、產物或 Specialist 不存在 |

JSONL 可能包含 `run.progress` 和 `stream.resync-required`。重連後無法重放時，重新讀取權威 Run 狀態，不把事件流當作永久歷史。服務命令另有引數限制，見[無介面服務](./server.md)。

[CLI 實現](https://github.com/aipoch/open-science/blob/v1.0.5/packages/open-science/cli.mjs)、[上游命令指南](https://github.com/aipoch/open-science/blob/v1.0.5/packages/open-science/CLI.md)。

技術參考：[CLI 約定](https://github.com/aipoch/open-science/blob/v1.0.5/packages/open-science/CLI.md).

## 無人值守執行 {/* #unattended-runs */}

給 `run` 新增 `--permission-prompts none`，可讓任務拒絕尚需人工處理的互動，避免一直等待。它保留選定審批配置和已記住的授權；剩餘權限請求會被拒絕，使用者提問會被謝絕，需要人工審閱的 Plan 也會被拒絕。這不是自動批准所有操作。

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

選項只針對本次呼叫，不儲存為會話偏好。不能與 `--plan-first` 同用。檢查最終狀態和錯誤；任務不等待人工，不等於任務必然完成。客戶端會檢查主機是否支援 `permission-prompts-none`，舊主機返回 `unsupported_capability` 時應先更新配套客戶端與應用。

## Windows 啟動器路徑 {/* #windows-launcher-paths */}

v0.37.1 修復含非 ASCII 字元的桌面啟動器路徑。更新後開啟新終端，檢查 `Get-Command open-science` 與 `open-science --help`。若仍指向舊安裝，使用 **Settings → General** 顯示的入口。獨立壓縮包應保留完整目錄。幫助命令成功不代表模型已就緒，之後執行 `doctor --json` 檢查。

## 不啓動服務，檢查本地 CLI {/* #local-information */}

```bash
open-science version --json
open-science help run
open-science paths --json
open-science paths --profile /ABSOLUTE/PATH/TO/PROFILE --json
```

這些命令不要求後端運行。`version` 顯示實際調用的安裝版本，不是已連接服務的版本。`paths` 返回 `cliPath`、`nodePath`、`startupConfigRoot` 和 `discoveryConfigRoots`；它不代表活動服務或研究數據目錄。顯式指定配置目錄會選擇啓動／發現位置，但不會創建該目錄。路徑可能包含本機用戶名，分享前先檢查輸出。

## 連接外部 MCP 客戶端 {/* #external-mcp */}

v1.0.4 的獨立 CLI 通過 **stdio** 提供科研工具。先啓動目標配置對應的服務；適配器不會自動啓動服務。將客戶端配置中的兩個絕對路徑替換爲實際路徑：

```bash
open-science start --no-open --config-root /absolute/path/to/profile
open-science mcp --help
```

```json
{
  "mcpServers": {
    "open-science": {
      "command": "/absolute/path/to/open-science",
      "args": ["mcp", "--config-root", "/absolute/path/to/profile"]
    }
  }
}
```

由客戶端啓動適配器。先用 **list_projects** 獲取項目 ID，再交給 **start_run** 提交任務，通過 **get_run** 查看進度，使用 **list_artifacts** 查看文件。僅能發現工具不代表服務可用；實際調用需要運行中的已認證本地服務，這不是遠程 HTTP MCP 入口。

客戶端沿用該配置已有的權限，可以創建持久項目、修改配置，併發起會寫文件或產生模型費用的任務。審批仍可能需要你在 Open-Science 中處理。請求超時後，先檢查當前狀態再重複寫操作。關閉客戶端或取消請求不會取消已接受的研究任務；需要停止任務時明確調用 **cancel_run**。詳見[官方 MCP 工具與權限說明](https://github.com/aipoch/open-science/blob/v1.0.4/packages/open-science/CLI.md#external-agents-through-mcp)。

研究包命令見 [CLI 導入與導出](../guides/research-packages.md#local-package-transfer)。

## 讓服務持續運行以完成自動化 {/* #persistent-service */}

若 CLI、瀏覽器或 SDK 工作需要在退出桌面應用後繼續，請先對目標配置執行 `open-science start --no-open --json`。從 v1.0.5 起，這會設置一次持續運行狀態；重複啓動不會累加。普通 `stop` 解除該設置，但仍有 App 連接時服務會保留。判斷服務是否停止前，請讀取[生命週期結果](server.md#lifecycle-commands)，不要只看命令成功與否。
