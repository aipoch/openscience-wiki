---
title: "Reviewer 與自動複核"
last_update:
  date: '2026-09-17'
---

# Reviewer 與自動複核 {/* #reviewer-与自动复核 */}

內建 Reviewer 根據請求及可獲得的證據檢查已完成回覆。它不同於名稱帶 Reviewer 的自建 Specialist，也不同於操作授權。

需要透過重新執行比較輸出時，使用[復現檢查](../guides/reproducibility.md)。Reviewer 稽核與輸出復現是兩種獨立記錄。

## 會話複核與檔案版本複核 {/* #会话复核与文件版本复核 */}

對話複核和檔案溯源面板的 **Review** 標籤是不同記錄。分享前檢查準確版本；若顯示 **No review for this version**，即使其他回覆被複核，也必須保留該狀態。環境記錄 **partial**、證據 **bounded** 也不會因為模型表示有信心就變成完整。

輸入錯誤應透過應用提供當前可訪問附件或準確版本。本地檔案存在不代表所有子任務和 Reviewer 核心都能讀取。參見 [Notebook](../guides/notebook.md)、[委派](./delegate.md)和[排錯](../guides/troubleshooting.md)。

實現依據: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [ComposerAgentControlsMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx)。

重新開啟歷史審查時，核對選中的產物版本。取消審查或修正後，閱讀最終狀態與已保留髮現，再決定是否重新執行；取消不會產生審查透過記錄。

## 選擇能夠核對的結果 {/* #选择能够核对的结果 */}

首次審查可以使用[內聯表格檢查](delegate.md#实操十二个样本约束)：提供完整樣本 QC 表，要求逐樣本給出算術結果。判據明確為十二個唯一樣本標識、十二行結果，以及每行的零計數基因數加檢出基因數等於基因總數。

先自行開啟子任務結果與 Notebook 輸出，再對該回答發起審查。將審查條目與上述判據對照；如果缺少某行或執行結果，先處理該問題再使用結論。審查結果取決於回答及可用證據，本練習不保證得到零問題狀態。

## 請求複核 {/* #请求复核 */}

1. 使用可用模型完成一輪對話。
2. 開啟輸入框 **+ 菜单 → Request review**，執行時顯示 **Reviewing…**。
3. 開啟 **Reviewer** 卡片，檢視問題和檢查數量，展開每項說明。
4. 點選 **Go to transcript** 進入 **Session Reviewer**，檢查模型、時間、PASS/FAIL、證據引用與 **Reviewer log**。
5. 若請求糾正，檢查 Main Agent 後續及子任務授權；複核不會自動授予操作權限。
6. 處理問題後使用 **Re-run review**。必要輸入或操作仍不可用時，保留未解決結論。

<p className="example-label"><strong>案例演示</strong> 閱讀仍有未解決問題的審查結果</p>

<details>
<summary>檢視檢查結果與未解決問題</summary>

Codex 訂閱、gpt-5.6-sol 下，人工複核返回 **四項檢查、一項問題**：

| 檢查 | 實際結果 |
| --- | --- |
| Specialist 是否執行內聯 CSV 複核 | PASS，引用了交接和算術記錄 |
| 自定義 MCP 成功與失敗是否準確報告 | PASS，指標和連線錯誤與執行輸出一致 |
| 分子呼叫是否產生所述檔案和屬性 | PASS，識別了準確檔案版本及返回值 |
| 模型是否按要求檢查已儲存的結構預覽 | FAIL，目錄查詢沒有讀取結構內容 |

圖中的 **fix limit reached / Issues found** 表示結構檢查所需的託管輸入無法被模型讀取。開啟對應問題，確認並提供缺少的輸入，再請求複核。在檢視器中手動開啟結構，不會更新模型的檢查記錄。

</details>

## 自動複核控制 {/* #自动复核控制 */}

在 **Agent controls → Auto-review** 設定後續回覆自動複核。這是會話偏好，與 **Ask for approval**、**Delegation** 分開。Settings 中內建 Reviewer 沒有普通編輯、刪除、啟用控制元件，也不在正常 Specialist 選擇器中。

| 狀態或控制元件 | 含義 |
| --- | --- |
| Request review 不可用 | 檢查當前是否仍執行、是否有可複核的完成回覆、模型是否可用 |
| Reviewing… | 尚在複核，不能當成完成 |
| Reviewer · n findings · n checks | 開啟檢查與證據；零問題也僅覆蓋實際檢查範圍 |
| Corrections requested | Main Agent 可能進行糾正；需檢視新操作與結果 |
| Issues found / fix limit reached | 尚有未解決問題，閱讀最新說明後再決定下一步 |
| Go to transcript | 進入專用 Session Reviewer 頁面 |
| Expand / Collapse Reviewer log | 展開或收起操作日誌；截斷日誌不是完整證據 |
| Re-run review | 再次請求複核，不是接受全部結論 |

<span id="本地实际检查" />

### 使用獨立模型自動複核 {/* #使用独立模型自动复核 */}

1. 在 **Settings → Model → Reviewer** 選擇可用的固定模型。例如，Main 為 `gpt-5.6-sol`，Reviewer 為 `gpt-5.6-luna`。
2. 在目標會話開啟 **Agent controls → Auto-review**，確認顯示 **On**，再提交下一條請求。
3. 回覆完成後，展開自動出現的 **Reviewer** 卡片。核對模型、檢查內容、證據及結果。
4. 出現 **Corrections requested** 時，等待主任務的糾正操作和後續複核，再判斷問題是否解決。

從 v0.30.2 起，啟動會話時會保留 Auto-review 設定，關聯的糾錯輪次也會保留糾錯所需的審閱反饋。傳送前啟用它，再檢查實際的 Reviewer 卡片與 Main 修改後的輸出。保留上下文不等於問題已經修正，仍需閱讀後續審閱和剩餘發現。

### resolved 說明了什麼 {/* #resolved-说明了什么 */}

某項檢查可以因為“按要求嘗試了操作，並準確報告權限失敗”而被標為 resolved。應將檢查判據、工具結果和剩餘問題一起閱讀。

最終 **No issues found · 1 check / Disposition: resolved** 表示這一項“是否嘗試後續檢查並如實報告結果”的問題已解決。它不表示檔案可讀、樣本計算透過或科研結論正確。必須閱讀具體檢查內容，不能只看綠色狀態。
