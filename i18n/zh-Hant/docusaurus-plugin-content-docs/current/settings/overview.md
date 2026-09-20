---
sidebar_position: 1
title: "設定中心總覽"
last_update:
  date: '2026-09-20'
---

# 設定中心總覽 {/* #设置中心总览 */}

從工作區左下開啟 **Settings**。17 個面板按用途分為 **Intelligence、Connections、Workspace、System** 四組，也可以透過頂部搜尋定位。本教程中的 **Settings → Model** 等路徑，指對應分組內的面板；例如 Model 位於 Intelligence 中。

| 全域控制元件 | 行為 |
| --- | --- |
| `Back` / `Forward` | 在設定主面板與 Detail/Add/Import 等子檢視間導航 |
| 麵包屑返回 | 從子檢視返回所在主面板 |
| `Maximize` / `Restore` | 在大對話方塊和全屏設定間切換 |
| `Close settings` | 返回原專案/session，不丟失已成功儲存的設定 |
| `Dismiss settings error` | 關閉頂部錯誤提示；不會自動重試失敗操作 |
| 移動端導航按鈕 | 開啟/關閉 Settings 導航抽屜 |

## 查詢設定 {/* #查找设置 */}

1. 開啟 Settings，點選頂部 **Search settings**。設定視窗處於活動狀態時，macOS 的 **⌘K** 或 Windows/Linux 的 **Ctrl+K** 會聚焦此搜尋框。
2. 輸入面板名稱或任務，例如 `Package mirror`、`Main model`、`Diagnostics`。
3. 用 **上/下方向鍵** 選擇結果，按 **Enter** 或點選結果開啟所屬面板。面板會短暫高亮，再在其中找到對應設定。
4. 使用 **Back** 返回；清空查詢後可以繼續查詢。面板自身的搜尋用於篩選當前列表，不搜尋全部設定。

搜尋覆蓋各面板中的代表性設定，不包含每個欄位或研究文件。找不到某個詞時，改用面板名稱或下方導航分組。查詢對話或檔案，應關閉設定後使用[全域搜尋](../guides/navigation.md)。

## 17 個主面板 {/* #17-个主面板 */}

| 分組 | 面板 | 管理內容 |
| --- | --- | --- |
| Intelligence | [Model](../guides/models.md) | 提供商與各任務場景的模型 |
|  | [Agent](../guides/frameworks.md) | 代理框架的安裝、切換與修復 |
|  | [Skills](../skills/overview.md) | 可複用科研方法及其可用狀態 |
|  | [Specialists](../specialists/overview.md) | 專家角色與能力訪問 |
|  | [Memory](../guides/memory.md) | 按需啟用的全域與專案記憶 |
| Connections | [Connectors](../guides/connectors.md) | 資料服務、自定義 MCP 連線及匯入 |
|  | [Network](../guides/network.md) | 代理、軟體包映象與 Notebook 域名訪問 |
|  | [Remote](../guides/remote-access.md) | 瀏覽器訪問、配對與可信裝置 |
|  | [Credentials](../tools/credentials.md) | 金鑰、令牌、OAuth 與憑據恢復 |
| Workspace | [Tags](../guides/tags.md) | 標籤與收藏排序 |
|  | [Permissions](../guides/approval-modes.md) | 預設模式與已儲存授權 |
|  | [Runtimes](../guides/runtimes.md) | Python/R 環境與軟體包 |
|  | [Storage](../guides/storage.md) | 資料位置、寫入權限與磁碟用量 |
|  | [Compute](../guides/remote-compute.md) | 本地與 SSH 計算資源 |
|  | [Usage](../guides/usage.md) | Token、呼叫與研究活動統計 |
|  | [Archived](../guides/storage.md) | 恢復或永久刪除歸檔內容 |
| System | [General](../guides/appearance.md) | 外觀、通知、診斷與版本 |

**Feedback** 保留在設定底部，作為獨立反饋入口。

:::info&#91;儲存方式&#93;
部分開關即時儲存；複雜表單使用 `Save/Add/Import`。操作中出現 `Saving…`、`Testing…`、`Installing…` 時不要關閉應用。涉及遷移、解除安裝、刪除或寬權限會有二次確認。
:::

## 模型設定中的標籤頁 {/* #model-tabs */}

在 **Model** 內，**Conversation models** 管理提供方與任務模型，**Classification models** 配置可選的 Skill/Connector 選擇服務，**Local parsing models** 管理本地解析資源。分類模型是模型設定中的標籤頁，不是新增的頂層設定面板。詳見[分類模型配置](../guides/models.md#classification-models)。
