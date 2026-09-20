---
title: "執行前規劃"
last_update:
  date: '2026-09-20'
---

# 執行前規劃 {/* #执行前规划 */}

使用 **Plan first**，在執行前稽核輸入、方法、產物和驗收標準。計劃批准與工具權限是兩項獨立決定。截圖輸入見[示例資料](../reference/example-data.md)。

## 提交計劃請求 {/* #提交计划请求 */}

<p className="example-label"><strong>案例演示</strong> 稽核並修訂原始計數質控計劃</p>

1. 附加輸入，在 Composer 寫清目標、方法、產物和限制。
2. More send options → Plan first。必須有文字請求，僅附件草稿不能啟用。
3. 如出現 Plan control 權限卡，檢查後批准適當範圍或拒絕。這是計劃建立/決定記錄權限，不是所有執行權限。
4. 等待 Plan ready for review；普通回覆中的計劃段落不等於結構化審批卡。

![Plan first 入口](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![單獨的計劃記錄權限](/img/open-science/guides-walkthrough/22-plan-permission.webp)

本任務限定保留原始計數、區分 ID/長度、計算樣本質控、交付三個受管產物、不聲稱差異表達。初始要求明確，計劃才容易核驗。

## 審核計劃 {/* #审核计划 */}

Open 在對話旁開啟階段、步驟、執行者、預期輸出和可行性說明。長計劃可 Enter full screen，Download Plan 儲存。置信度是計劃評估，不代表程式碼已執行。

![分階段計劃和輸出](/img/open-science/guides-walkthrough/23-plan-review.webp)

| 控制元件或狀態 | 操作 |
| --- | --- |
| Open | 只開啟，不批准 |
| Approve | 批准當前計劃繼續，仍可能需要工具審批 |
| Respond to Plan | 寫明輸入、方法、輸出或驗收條件的具體修改 |
| Send Plan feedback | 傳送非空反饋，等待修訂 |
| 審批預覽中的 Dismiss | 拒絕/撤回該待審計劃，與只關閉預覽不同 |
| 新版本/已替換警告 | 當前快照已過期，不能批准新計劃，需開啟當前卡片 |

## 反饋與修訂 {/* #反馈与修订 */}

在 **Respond to Plan** 中明確需要修改的內容。例如要求檢查輸入完整性、重新開啟全部輸出，並保留圖表短標籤到原始標識的對映。點選 **Send Plan feedback**，等待修訂版，再逐項核對要求是否已納入。

![提交前的計劃反饋](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

審查修訂版後點選其 Approve。舊預覽可能仍顯示，並提示已被替換；舊步驟不是當前計劃最新進度。應重新開啟當前計劃。

## 跟蹤執行並驗收 {/* #跟踪执行并验收 */}

排隊追問見[輸入框佇列控制元件](composer.md#管理运行中队列)。編輯佇列不會批准計劃。

批准後會話開始執行計劃。Ask 模式仍可能出現單獨的工具權限卡；核對命令、目標和範圍。操作失敗時，先定位輸入、環境或訪問錯誤再重試，計劃批准不會自動解決這些條件。

步驟可顯示未開始、進行中、完成、阻塞、跳過、未執行。計劃完成不等於科研結論正確。需開啟實際 CSV、圖和報告，與驗收條件對照。數值檢查方法見[資料質量工作流](../workflows/data-quality.md)。

後續見[檔案與版本](./files.md)、[Notebook 證據](./notebook.md)、[權限](./approval-modes.md)。

原始碼：[計劃審批和預覽](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx)。

## 上下文重建後繼續計劃 {/* #resume-plan */}

從 v0.31.0 起，代理重建上下文後可以恢復當前 Session Plan、修訂版本及待審批狀態。繼續前重新開啟當前計劃，檢查哪些步驟實際完成。待審批的事項仍需審批；恢復計劃不會自動批准，也不會把沒有記錄結果的操作變成已完成。
