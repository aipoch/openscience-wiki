---
title: "分配 Skills 與 Connectors"
last_update:
  date: '2026-09-24'
---

# 分配 Skills 與 Connectors {/* #分配-skills-与-connectors */}

Specialist 的能力列表決定它能訪問哪些 Skills 和 Connectors。某個 Connector 全域啟用，不代表所有受限角色都能訪問。

## 配置明確的能力範圍 {/* #配置明确的能力范围 */}

<p className="example-label"><strong>示例</strong> 為 RNA-seq QC Reviewer 分配能力</p>

1. 開啟 **Settings → Specialists**，編輯 **RNA-seq QC Reviewer**。
2. 關閉 **Full access**。
3. 在 **Skills → Add a skill** 搜尋並新增 Personal `rnaseq-count-qc`，確認 **Skills 1**。
4. 在 **Connectors → Add a connector** 新增 **Omics Archives**，確認 **Connectors 1**。
5. 開啟能力詳情核對資源，儲存後重新開啟角色確認繫結保留。

![明確分配能力的 Specialist](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| 控制元件 | 作用 |
| --- | --- |
| Full access 開啟 | 使用繼承的能力範圍，同時應用逐項排除；更改 **Manage access** 後檢查實際資源列表 |
| Full access 關閉 | 使用明確列表；提示詞提及某工具不能替代繫結 |
| Add a skill / Add a connector | 開啟相應型別的選擇器 |
| 能力詳情 | 檢查資源，不執行科學流程 |
| Remove | 移除當前角色的繫結，不解除安裝底層資源 |
| Save changes | 儲存能力範圍 |

應用必需 Skills 保持全域啟用，但不替代 Specialist 能力列表，也不會自動開啟 Full access。若此角色不能使用 Customize，應檢查繫結和實際解析的資源。見 [Skill 啟用規則](../skills/overview.md)。

## 從資源調整訪問 {/* #resource-access */}

在 **Settings → Skills** 或 **Connectors** 開啟資源的 **Manage access** 彈窗，可以一起檢視 Main Agent 和 Specialist 的關聯。此操作更新所選角色的繫結，不會啟用角色。Full access 角色可以逐項排除資源；受限角色使用明確的選擇列表。市場角色繫結在此彈窗中可能只讀。操作圖見[資源訪問控制元件](../guides/connectors.md#resource-access)。

更改繫結後，確認角色已啟用、服務憑證就緒，並允許執行所需操作。**Used by** 顯示資源分配，不表示執行記錄。

## 分開檢查四層可用性 {/* #分开检查四层可用性 */}

| 層級 | 應檢查什麼 | 失敗例子 |
| --- | --- | --- |
| 角色 | 已安裝、啟用、設定完成 | 匯入後尚未儲存本地設定，角色仍禁用 |
| 能力 | 繫結正確且執行時能解析 | 顯示名稱或短名稱未解析到已分配資源 |
| 服務/環境 | 連線、憑據、核心及依賴 | 缺少服務要求的憑據或依賴包 |
| 操作 | 當前輸入版本與實際授權 | 檔案交接失敗，子任務尚未開始 |

本地角色在建立及包匯入後保留了 Skill 和 Omics Archives 繫結。首個子任務未透過其嘗試的短名稱載入 Skill，但用 Python 完成了明確提供的表格檢查。這證明委派和算術檢查成功，不證明子任務成功載入 Skill。遇到這種情況，要求 Agent 檢視實際可用目錄並使用準確資源 ID，不應透過擴大 Full access 掩蓋名稱問題。

## 能力範圍不等於授權模式 {/* #能力范围不等于授权模式 */}

Full access 不表示“所有操作免確認”。[授權模式](../guides/approval-modes.md)、檔案/網路邊界和執行環境規則仍然生效。子任務的授權請求會顯示在父對話中，需核對請求角色與操作。

匯出角色時，Connector ID 只是引用，不包含連線配置和金鑰；Skill 檔案可以明確選擇隨包匯出。在另一臺電腦上核對繫結、配置憑據並進行小範圍測試後再使用，參見[管理與分享](./manage.md)。

實現依據: [SpecialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。
