---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Skill 為 Agent 提供可重複使用的方法，包括適用條件、輸入要求、操作步驟和結果檢查。Open-Science 會在需要時載入這些指引。安裝 Skill 不會同時安裝指引中提到的科學軟體。

可以透過 [Skill 市場](marketplace.md)尋找更多方法，使用前檢查輸入和依賴。

## 選擇合適的能力 {/* #选择合适的能力 */}

| 需要完成的事情 | 使用什麼 | 例子 |
| --- | --- | --- |
| 獲取資料或執行程式碼 | [工具](../tools/overview.md) | 查詢 GEO 後設資料、執行 Python |
| 按固定方法組織操作 | Skill | 校驗原始基因計數矩陣 |
| 使用帶獨立指令和能力範圍的角色 | [Specialist](../specialists/overview.md) | 單獨檢查樣本 QC 表 |

透過 [Skill 目錄](./directory.md) 查詢方法，或從[場景配方](./recipes.md)選擇。

## 查詢並檢查 Skill {/* #查找并检查-skill */}

1. 開啟 **Settings → Skills**。
2. 在 **Search skills** 搜尋名稱或描述。[建立示例](./create.md)後可輸入 `rnaseq-count-qc`。
3. 使用 **Filter skills by source**、**Filter Skills by agent** 和 **Filter by Tag** 縮小範圍。
4. 開啟結果，閱讀描述、指令、**Files**、許可證和 **Availability**。顯示名稱可能與包 ID 不同。
5. 返回列表檢視 **Used by**。這裡表示哪些 Agent 可以使用，並非已完成執行次數。

![搜尋已儲存的 RNA-seq Skill](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| 控制元件 | 實際作用 |
| --- | --- |
| Featured / Imported / Personal 分組標題 | 展開來源分組。分別為應用內建、匯入和本地建立 |
| Main Agent 開關 / 行開關 | 改變可由使用者控制的 Skill 的可用性；應用必需 Skill 保持啟用，包檔案保留 |
| Used by | 檢視 Main Agent 與 Specialist 的可用性；使用資源的 **Manage access** 調整 Main Agent 和 Specialist 關聯 |
| Manage Tags / 移除標籤 | 整理資源，不改變執行權限 |
| Add skill | 透過對話建立、直接編寫、本地上傳、GitHub 匯入或掃描已安裝目錄 |
| 對話 **+ → Save as skill** | 從已完成的當前分支提煉可複用方法，見[建立步驟與不可用原因](./create.md) |
| Manage | 批次管理 Personal 和 Imported 包 |
| Conversation imports → Skill packages | 允許 Agent 識別附件中的 ZIP/`.skill` 並請求匯入批准；僅上傳附件不會安裝 |

### 為什麼有些開關不能關閉 {/* #为什么有些开关不能关闭 */}

**Environment & Packages、Compute Environment Setup、Remote Compute (SSH)、Customize** 支撐核心功能，保持啟用。其開關選中且不可操作，懸停或聚焦提示可讀到 **This built-in Skill supports core application features and is always enabled.**

啟用規則不會自動安裝依賴、提供憑據或授權操作。Specialist 分配是獨立範圍，應檢查 **Used by** 和角色能力列表。

公開目錄仍有 23 個內建 Skills，內部支援 Skill 不作為額外方法供選擇。[必需開關實現](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx)。

下圖展示 **Customize** 的原因提示。關閉其他可選方法時，這些必需 Skill 仍保持啟用。

![Customize 固定啟用及原因提示](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

逐代理訪問彈窗及其只讀繫結，見[資源訪問](../guides/connectors.md#resource-access)。

## 在對話中使用 {/* #在对话中使用 */}

<p className="example-label"><strong>示例</strong> 請求 rnaseq-count-qc 執行檢查</p>

同時說明輸入、Skill、交付物和約束。例如：

> Use the rnaseq-count-qc Skill on the attached GSE60450 raw-count matrix. Keep EntrezGeneID and Length as metadata. Validate dimensions and nonnegative integer counts, preserve the original sample IDs, and save a separate methods report with before/after input SHA-256. Use the existing Python Notebook.

出現授權請求時，檢查完整指令與操作。執行後重新開啟報告和 Notebook 記錄，按[示例資料](../reference/example-data.md)核對。後續 Specialist 檢查是另一項操作；僅在提示詞中提及角色不代表已發生委派。

### 指令與 Notebook 函式的區別 {/* #指令与-notebook-函数的区别 */}

示例 `rnaseq-count-qc` 只有指令和一個參考檔案，**沒有註冊 Notebook 函式**。Agent 閱讀方法後編寫普通 Python 或 R。

部分內建 Skill 提供核心函式，其指引會列出函式名和對應 `kernelSkillIds`。不要把所有已安裝 Skill ID 都填入該欄位。載入 Skill 也不會自動授予檔案、網路或工具權限。

找不到 Skill 時，依次檢查來源篩選、啟用狀態和 Agent 分配。指令已載入但計算失敗時，參見[科學工具](../tools/scientific.md)檢查執行環境或輸入，而不是反覆重新安裝 Skill。

實現依據: [SkillsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [SkillDetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx)。
