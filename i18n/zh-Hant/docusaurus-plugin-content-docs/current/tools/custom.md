---
title: "連線自定義 MCP 工具"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# 連線自定義 MCP 工具 {/* #连接自定义-mcp-工具 */}

<p className="example-label"><strong>案例演示</strong> 透過本地 MCP 查詢公開 QC 表</p>

本例透過小型本地 MCP 服務提供公開 RNA-seq QC 表。它讀取固定 CSV，提供兩個操作，不聯網、不安裝包、不修改資料。

<PlatformGuide />

## 下載真實示例 {/* #下载真实示例 */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-server.py</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-sample-qc.csv</ExampleDownload>

儲存到本地並記下完整路徑。服務只用 Python 標準庫，啟動時讀取 CSV；替換輸入後應明確重啟/重連。

## 在應用中新增 {/* #在应用中添加 */}

1. **Settings → Connectors → Add connector → Local command**。
2. **Display name** 填 `GSE60450 QC`。
3. **Command** 選擇 **python3 — script file**；Windows 也可選擇 **Other…** 並填寫實際 Python 程式路徑。
4. 展開 **Advanced settings**，名稱/ID 填 `gse60450-qc`，描述為只讀訪問 QC 表。
5. **Arguments** 第一行寫指令碼絕對路徑，第二行寫 CSV 絕對路徑。每行是一個引數，路徑有空格也不要額外新增 Shell 引號。
6. 本例 Environment 留空，檢查指令碼後勾選 **I trust this connector**，點選 **Add**。
7. 搜尋 `GSE60450`，確認 **Connected** 及 Main Agent 可用性。

<PlatformContent platform="macos">

![實際本地 MCP 配置](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

這是路徑模板，不能原樣貼上。若應用找不到 `python3`，選擇 Other 填實際直譯器路徑；啟動器必須在當前電腦存在。

<PlatformContent platform="windows">

Windows 可透過 **Other…** 填寫已安裝 `python.exe` 的完整路徑；選中 `python3` 預設不代表本機存在該命令。先在[執行環境](../guides/runtimes.md)核對直譯器路徑。指令碼與 CSV 路徑分別放在 **Arguments** 的兩行，資料夾名含空格也一樣。不要將程式和引數合成一條 Shell 命令。

</PlatformContent>

## 工具輸入與實際輸出 {/* #工具输入与实际输出 */}

| 工具 | 輸入 | 實際內容 |
| --- | --- | --- |
| get_dataset_summary | 空物件 | GSE60450、來源 URL、檔名、12 行與完整樣本 ID |
| get_sample_qc | `sample_id` 字串 | 指定樣本的四個 QC 指標 |

可以請求：

> Use the connected gse60450-qc Connector. Call get_dataset_summary, then get_sample_qc for MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1. Report only actual responses and preserve the CSV.

本例中，原生應用返回該樣本**總計數 23,227,641、零基因 8,664、檢出基因 18,515、中位數 237**，彙總返回 12 行，與儲存的 QC 表一致。

<PlatformContent platform="macos">

![成功連線的自定義 Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

開啟兩次工具呼叫的 Notebook 活動，再重開儲存的 JSON，對照 CSV 檢查樣本 ID 和指標。下方 Windows 執行使用聯結器 ID `gse60450-qc-win`，發出請求時應使用你自己配置的 ID。

![Windows 本地 MCP 呼叫，包含儲存的 JSON 與 Notebook 輸出](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## 服務與錯誤行為 {/* #服务与错误行为 */}

指令碼透過 stdio 實現 MCP 初始化、ping、工具發現與呼叫，兩個工具結構都在下載原始碼中。標準輸出是協議通道，普通除錯列印可能破壞連線，診斷應寫入標準錯誤。

**錯誤提示：** 無效樣本名可能在應用中顯示為 **connector_unavailable**，即使自定義服務返回的是具體業務錯誤。先檢視服務日誌並核對樣本標識，再決定是否重新連線。提示與原因持續不符時，按[故障排查](../guides/troubleshooting.md)反饋。

應用在連線時會發現服務工具。透過 `host.mcp` 呼叫時，使用發現的業務操作名稱；協議方法 `tools/list` 不是業務工具。輸入結構可檢視下載指令碼中的定義。

## 匯出與遷移 {/* #导出与迁移 */}

選擇 **Actions → Export**，檢查格式與預覽。實際匯出提示兩個引數為本地路徑。**Save configuration** 只儲存配置，不包含 Python、指令碼或 CSV。單獨複製檔案、更新路徑、確認本地信任，再複測兩個正常操作。

<PlatformContent platform="windows">

選擇 **MCP client config** 時，檢查 `mcpServers`：本例匯出一個服務，包含 `command` 和兩個 `args`。Windows 路徑中的反斜槓在 JSON 中會被轉義。換電腦後，將這三個路徑改為實際檔案位置，再重試兩個呼叫。配置匯出成功不能證明目標電腦已連通。

</PlatformContent>

| 失敗 | 檢查 |
| --- | --- |
| 命令無法啟動 | 直譯器、指令碼路徑及權限 |
| CSV 不可讀 | 第二引數和真實檔案位置 |
| 已連線但工具不可用 | Agent 分配、當前目錄和操作名 |
| 輸入錯誤 | 必填 `sample_id` 和完整原始 ID，不使用繪圖短標籤替代 |
| 失敗後出現 Connector 錯誤 | 檢查應用/服務詳情，按情況重連 |
| 終端可用、應用不可用 | 應用可見環境及 stdout 是否只輸出協議 |

擴充套件時定義範圍明確的輸入，返回來源編號，驗證正常、空結果和錯誤輸入，讓使用者能檢查每次讀取或修改什麼。

實現依據: [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts)。

需要在指令碼中管理同一份自定義 MCP 配置時，使用 [Connector CLI](../reference/cli.md) 或 [SDK 方法](../reference/api.md)。連線測試成功只證明工具發現，仍需單獨完成一個有邊界的業務呼叫。
