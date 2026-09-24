---
title: "安裝與切換代理框架"
last_update:
  date: '2026-09-24'
---

# 安裝與切換代理框架 {/* #安装与切换代理框架 */}

選擇 Agent 框架來執行對話和工具。安裝後配置相容的[模型提供方](providers.md)。可以同時保留多個框架。**Settings → Agent** 中的活動框架是所有專案共享的應用級設定，影響後續對話輪次和工作流。

## 讀懂 Agent 頁面 {/* #读懂-agent-页面 */}

開啟 **Settings → Agent**，先區分 Installed 和 Available，再檢查已安裝卡片的版本、路徑和 Active 標識。

![重新檢測後的 Codex](/img/open-science/local-acceptance/agent-codex-active.webp)

| 控制元件或狀態 | 含義與操作 |
| --- | --- |
| 已安裝卡片 | 選擇可用但未啟用的卡片申請切換；仍需相容的模型配置 |
| Active | 應用級選中的後端，其 Uninstall 禁用 |
| Re-detect | 安裝或路徑變更後重新發現，短暫顯示 Detecting；不負責安裝缺失軟體 |
| Not installed | 未發現可用執行時 |
| Install 選單 | 選擇該後端實際提供的安裝來源並檢視進度 |
| Install log / Retry | 先讀失敗步驟，解決原因後重試 |
| Repair | 管理的安裝需要修復時出現，先檢查影響物件 |

實查頁面提供 Codex、Claude Agent、OpenCode、CodeBuddy。安裝來源和認證方式隨後端不同，不應把某一後端的流程套到所有後端。

## 安裝後的核驗順序 {/* #安装后的核验顺序 */}

1. 選擇 **Install &#91;framework&#93;** 並核對來源。應用管理的安裝儲存在受管目錄；手動安裝必須能被應用發現。
2. 檢視安裝進度和日誌，先解決環境或網路前置條件。
3. 手動安裝後執行 **Re-detect**，確認版本和路徑，不能僅憑另一個終端能執行命令判斷就緒。
4. 選擇就緒卡片，閱讀切換提示並確認目標後端。
5. 檢查 **Settings → Model**，執行小請求，核驗實際回答或工具結果。

Codex 原生執行時與 ACP adapter 必須成對透過檢測，只裝其中一個不等於就緒。訂閱認證見[模型接入](./providers.md)。

OpenCode 的 **Install → App-managed download (recommended)** 會下載自包含執行時。介面依次顯示 Resolving、下載進度和帶版本、路徑的 Installed 卡片。點選卡片，確認 **Switch to OpenCode?**，再選擇相容模型。本地連線例已正常返回回覆，介面格式與 token 設定見[本地提供方配置](./providers.md#连接本地模型端点)。

v0.33.0 的 **Claude Agent** 要求 Claude CLI **2.1.118 或更高版本**。若檢測提示版本不受支援，按原安裝方式更新卡片實際指向的安裝，再使用 **Re-detect** 確認就緒後啟動會話。更新另一份 CLI 不會修復卡片所指的安裝。

## 更新應用管理的 Codex 執行時 {/* #update-codex */}

開啟 **Settings → Agent**，分別檢視 Codex 卡片上的 **Codex CLI** 和 **ACP** 版本。有經過測試的組合更新時，先完成或關閉正在使用該執行時的會話，再選擇更新並等待檢測完成。確認新版本和就緒狀態後，在會話中傳送一個小請求。

應用管理的更新只替換應用擁有的執行時；外部 CLI 應使用原安裝方式更新，再選擇 **Re-detect**。應用啟動的 Codex 程序仍在使用目標時，會拒絕替換。這項操作不會更新 Open-Science 應用本身，也不會遷移正在執行的任務。

## 切換時保留什麼 {/* #切换时保留什么 */}

切換前先完成或停止當前操作。活動框架的變更作用於各專案後續的對話輪次和工作流；已經執行的任務繼續使用原執行時直到完成，空閒會話在再次使用時重新連線。保留對話歷史不代表轉移了正在執行的工具程序，也不保證直譯器變數仍然存在。繼續計算前檢查檔案、Notebook 和權限。

切換後檢查會話所選模型。Codex 訂閱支援 [Side Chat](./delegation.md)；待處理的會話操作或恢復狀態可能暫時阻止開啟旁聊，按入口顯示的提示處理。

## 修復與解除安裝 {/* #修复与卸载 */}

受管安裝損壞時使用修復流程，不要在安裝期間手動刪除目錄。外部安裝需先修復對應環境，再重新檢測。解除安裝受管後端前先啟用另一個可用後端，開啟 **Uninstall** 並閱讀將刪除的元件。僅切換模型不需要解除安裝後端。


### 解除安裝並重灌應用管理的執行時 {/* #卸载并重装应用管理的运行时 */}

1. 保持另一個後端處於 **Active**。本例解除安裝 OpenCode 時，Codex 仍是活動後端。
2. 在未啟用的 OpenCode 卡片上點選 **Uninstall**。確認框只針對本應用下載並管理的副本，不影響另行安裝的副本。
3. 確認 **Uninstall**，然後點選 **Re-detect**。OpenCode 應移到 **Available**，顯示 **Not installed**。
4. 選擇 **Install OpenCode → App-managed download (recommended)**。等待 **Installed** 卡片出現，再點選卡片並確認 **Switch**。
5. 檢查 **Active**、執行時路徑及相容模型。重灌後端不會替你配置模型提供方。

![應用管理的 OpenCode 解除安裝範圍](/img/open-science/priority-completion/01-opencode-uninstall.webp)

移除後端前先切換到其他可用後端；當前活動後端不能透過該控制元件解除安裝。重灌後重新檢測並啟用，再開啟已有專案執行一個小請求，檢查連線。

![重新安裝並選中的 OpenCode](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

安裝按鈕禁用時檢查是否已有安裝或切換進行中，以及頁面的前置條件錯誤。檢測成功但請求失敗時，分別檢查模型認證和後端/API 相容性。

原始碼：[Agent 頁面](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx)、[後端卡片](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx)。

設定範圍與切換行為：[設定儲存](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts)、[執行時切換](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts)。
