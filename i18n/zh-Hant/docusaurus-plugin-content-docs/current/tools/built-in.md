---
title: "內建研究工具"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 內建研究工具 {/* #内置研究工具 */}

內建操作把對話連線到專案檔案、Notebook、文獻記錄和儲存結果。不同 Agent 框架展示方式不同，若干操作可能合併到 **Agent SDK** 或 **Notebook** 活動卡中。

## 按研究任務分類 {/* #按研究任务分类 */}

| 類別 | 提供什麼 | 操作和可見結果 | 使用結果前檢查 |
| --- | --- | --- | --- |
| 檔案發現與讀取 | 專案/會話及準確輸入 | 列出檔案或讀取支援內容 | 名稱、來源、當前版本；目錄條目不等於讀取內容 |
| Notebook 執行 | Python/R、環境和有效輸入引用 | 程式碼單元、輸出、耗時、狀態 | 實際語言與環境、錯誤、完整資料檢查 |
| 結果釋出 | 支援的工作路徑或內聯內容 | 對話/Files 中的版本化結果卡 | 開啟檔案檢查維度/內容並保留版本 |
| 文獻檢索/匯入 | 問題、DOI/PMID、引用檔案 | 檢索記錄、Inbox 候選、文獻庫條目 | 來源 ID、重複、稽核決定、全文訪問 |
| 計劃操作 | 階段與完成條件 | Session Plan 步驟狀態 | 狀態是否有實際輸出支撐 |
| Memory | 需要複用的事實或指令 | 對應範圍中的記憶 | 內容與範圍；區別於專案檔案 |
| 載入 Skill | 可用包 ID | 指令和支援資源 | 是否讀取準確包；載入不是計算 |
| Specialist 委派 | 角色、任務、輸入 | 子任務和 Subagents 對話 | 是否真正開始、執行並報告限制 |
| Review | 可複核回覆及設定 | 檢查、問題和糾正狀態 | 對應回覆/版本和可用證據 |

<span id="从请求追踪到结果文件" />

## 從操作追蹤到結果 {/* #从操作追踪到结果 */}

1. 請求中寫明輸入和目標輸出。[首次專案](../guides/first-project.md)提供一個從小表格到報告的任務。
2. 展開活動卡，檢查操作、輸入和權限範圍。
3. 執行後閱讀工具結果。若有錯誤，先處理錯誤，再使用模型對結果的總結。
4. 開啟生成檔案卡並核對內容。涉及計算時，開啟 Notebook 檢查生成結果的程式碼與執行環境。

完整科研示例見[資料質量工作流](../workflows/data-quality.md)，環境控制元件見 [Notebook](../guides/notebook.md) 和[執行環境](../guides/runtimes.md)。

## 閱讀工具活動 {/* #阅读工具活动 */}

| 元素 | 使用方式 |
| --- | --- |
| 活動分組 | 展開本輪包含的操作 |
| Tool / Agent SDK / Notebook run | 檢視可提供的輸入、返回和錯誤，不能只看分組名稱 |
| Copy code / 程式碼展開 | 複製或展示已提交程式碼，不代表再次執行 |
| Allow / 授權範圍 / Deny | 控制當前操作及範圍，核對請求 Agent |
| 生成檔案卡 | 開啟實際儲存結果 |
| Open notebook | 檢視會話執行記錄和變數 |
| 子任務入口 | 開啟真實委派對話 |

## 區分輸入和輸出身份 {/* #区分输入和输出身份 */}

上傳檔案、Notebook 工作檔案、結果版本不是同一個概念。某個列表裡可見的檔案不一定已掛載到子任務核心。使用應用提供的當前引用，不能猜路徑或把版本 ID 替換為檔名。

Connector 生成的檔案可能沒有 Python 生產程式碼。**No producer block**、**No review for this version**、**partial** 環境與 **bounded** 證據均為有效狀態，不應使用生成文字補成完整。準確錯誤和恢復方式參見[故障排除](../guides/troubleshooting.md)。

實現依據: [notebook.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artifacts.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [WorkspaceMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx)。

適用的長時間執行操作見[後臺任務與結果送達](../guides/notebook.md)。結果送達後檢查實際執行和儲存輸出。Environment & Packages、Compute Environment Setup、Remote Compute (SSH) 保持啟用，但執行時、網路和主機要求仍然有效。

查詢公開網頁時，使用內建 Open-Science Agent 的[網頁搜尋與來源閱讀](web-search.md)。
