---
title: "探索工具"
last_update:
  date: '2026-11-20'
---

# 探索工具 {/* #探索工具 */}

按需要的結果選擇工具：獲取記錄、檢視檔案、執行計算或連線外部服務。這些能力整合在應用裡，但準備條件和驗證方式不同。

## 選擇工具大類 {/* #选择工具大类 */}

| 需要 | 入口 | 準備條件 | 完成後檢查 |
| --- | --- | --- | --- |
| 讀取檔案、規劃、計算、儲存結果 | [內建研究工具](./built-in.md) | 可訪問專案輸入與操作授權 | 工具返回、檔案和執行記錄 |
| 查詢公開網頁並閱讀來源正文 | [網頁搜尋](./web-search.md) | 內建 Open-Science Agent、Main 模型和網路 | 來源 URL、返回正文及截斷提示 |
| 查詢方法依賴的科學軟體 | [科學工具目錄](./catalog.md) | 軟體、權重與 Skill 安裝分開檢查 | 實際可執行程式或匯入及版本 |
| 執行 Python、R 或科學任務 | [科學工具](./scientific.md) | 所選環境、包或 Compute Host | 程式碼、錯誤、結果檢查與溯源 |
| 查詢生物醫學和科學記錄 | [科學資料庫](./databases.md) | Connector、網路與必要憑據 | 來源 ID、返回欄位和截斷資訊 |
| 檢視 CSV、TSV 或表格檔案 | [表格與資料集](./tables.md) | 支援的檔案和當前輸入 | 可見範圍、分隔符和完整維度 |
| 檢視論文、序列、結構等結果 | [科學檢視器](./viewers.md) | 支援的格式 | 內容及預覽限制 |
| 接入 MCP 服務 | [Connectors 與 MCP](./mcp.md) | 伺服器配置和信任 | 連線狀態與真實呼叫 |
| 設定服務身份或金鑰 | [服務憑據](./credentials.md) | 對應服務的可用賬號 | 校驗結果或小範圍查詢 |
| 為本地資料提供自定義工具 | [自定義 MCP](./custom.md) | 可執行服務及輸入結構 | 發現、成功呼叫與真實錯誤行為 |

## 區分不同可用狀態 {/* #区分不同可用状态 */}

**Listed** 表示應用知道該資源，**Enabled** 表示所選 Agent 可以使用。**Connected** 證明建立了連線，不保證某個查詢引數正確。**Executed** 表示真實呼叫返回了結果或錯誤。**Verified** 表示對照任務檢查了結果。

本地示例採用真實 GSE60450 RNA-seq 計數、只讀 QC 服務、阿司匹林結構及公開序列/結構檔案，中英文均使用英文應用截圖。沒有在本機完成的遠端 GPU/SSH 和憑據相關操作會明確標出。

![應用中已連線的 QC Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## 提出範圍明確的請求 {/* #提出范围明确的请求 */}

說明來源、操作和預期輸出。資料庫查詢應包括編號型別和小範圍條數限制；計算應說明輸入、語言和檢查要求。工具不可用時要求真實錯誤，模型憑記憶回答不等於呼叫成功。

[Skill](../skills/overview.md) 提供方法，[Specialist](../specialists/overview.md) 提供角色；兩者都不會自動安裝軟體、提供憑據或使不可訪問檔案變得可讀。

實現依據: [ConnectorsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [preview-support.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts)。
