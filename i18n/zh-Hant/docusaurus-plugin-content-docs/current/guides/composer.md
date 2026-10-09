---
title: "對話與排隊請求"
last_update:
  date: '2026-10-09'
---

# 對話與排隊請求 {/* #对话与排队请求 */}

Composer 向當前會話傳送指令與輸入引用，並允許在執行期間準備後續請求。**Queue · Not saved** 表示排隊請求尚未成為已儲存的對話指令。

## 從研究任務建議開始 {/* #research-starters */}

空白會話頁在輸入區旁提供 **Analyze data**、**Compare papers**、**Find literature**、**Create charts** 等任務建議。使用箭頭可以檢視更多選項。

1. 在目標專案中點選 **New**。
2. 選擇 **Explain a paper** 等建議。它會把可編輯的請求填入輸入區，不會直接傳送。
3. 附上實際論文或資料，等待上傳完成，再把通用請求改成自己的問題和預期輸出。
4. 檢查模型、附件及請求後傳送。收到回答後，開啟來源和結果檔案核對。

![新會話中的研究任務建議與緊湊的研究包匯入入口](/img/open-science/v0351/new-conversation.webp)

**Import previous research** 是獨立的 `.science` 研究包匯入入口。選擇任務建議不會匯入研究包，也不會自動提供示例資料。

## 準備可驗收的請求 {/* #准备可验收的请求 */}

在目標專案中選擇 **New**，於 **Ask anything** 輸入請求，說明輸入、希望得到的檔案及方法約束。完整起步示例見[第一個專案](first-project.md)。

| 入口 | 操作 | 傳送前檢查 |
| --- | --- | --- |
| + → Attach files | 選本地檔案並等待上傳 | 目標附件存在且傳輸結束 |
| 附件 chip | 預覽待發輸入 | 名稱與內容正確 |
| 移除附件 | 取消草稿引用 | 不刪除本地原檔案 |
| + → Your files | 選擇已有專案檔案 | 精確檔案/版本，不只看類似名稱 |
| `@` | 選檔案、產物或文獻 | 從建議中選擇實際引用 |
| `/` | 選可用 Skill | 方法相關且前提具備 |
| `#` | 引用本次所需會話歷史 | 不保證包含該會話全部檔案和核心 |
| + → Save as skill | [把已完成分支整理為可複用 Skill](../skills/create.md) | 先結束當前活動；不可用時讀具體提示，完成後核對實際儲存的包 |
| + → Context | 檢視上下文 | 新建未傳送會話可能禁用 |
| + → Review | 在滿足條件時請求審查 | 需已有結果和相容審查能力 |

超過 10,000 字元或 300 行的長純文字貼上會轉為託管附件；出現 **Show in text field** 時可恢復到輸入框。空輸入開頭按上/下瀏覽歷史，重新傳送前檢查附件。

## 選擇開始方式 {/* #选择开始方式 */}

模型選擇器使用已配置模型，推理檔位取決於模型/框架。更改影響後續請求，不改變正在執行的輪次。**Agent controls** 中權限、Auto-review、Specialist、Delegation 各有獨立作用。

| 傳送控制元件 | 用途 | 結果/邊界 |
| --- | --- | --- |
| Send message | 空閒會話中的完整請求 | 儲存使用者訊息並開始 |
| More send options → Plan first | 執行前審閱步驟 | 回應計劃後才繼續批准工作 |
| Side chat | 在獨立標籤中討論，工具受限 | 新草稿繼承會話模型與推理強度，傳送前檢查旁聊中的選擇，見 [Side Chat](delegation.md) |
| Branch | 支援時獨立延續 | 核對繼承歷史與檔案，見[會話](sessions.md) |
| Add message to queue | 執行中準備後續指令 | 送達前仍是 Not saved |
| Cancel run | 停止當前執行 | 等待停止，已儲存結果不自動撤銷 |

## 傳送明確反饋 {/* #发送明确反馈 */}

<p className="example-label"><strong>示例</strong> 要求計劃補充輸入與輸出檢查</p>

需要計劃補充輸入完整性與結果重開檢查時，可以使用下面的反饋，並按自己的任務調整輸出要求：

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

透過 **Respond to Plan → Send Plan feedback** 傳送，再批准修改後的計劃。這是計劃反饋，不是佇列送達演示。控制元件與截圖見[計劃](planning.md)。

執行中的任務可用佇列修改下一步，明確變更與保留要求。傳送修正不等於授權新安裝或更大目錄範圍。

## 管理執行中佇列 {/* #管理运行中队列 */}

1. 執行時在 Ask anything 填追問。
2. 點選 **Add message to queue**，展開數量檢視待發內容。
3. **Edit queued message** 恢復到 Composer；若已有草稿，按提示先保留/清空。
4. **Remove queued message** 移除待發項，不取消已送達指令。
5. 拖動手柄，或聚焦後用上下鍵調整順序。
6. **Send now** 請求按框架支援的方式送達。
7. 確認它成為使用者訊息，Agent 已理解更改。

閱讀 **Sending… / Stopping… / Queued message will send after the current run finishes**；部分框架狀態會延後。**Not saved** 還不是持久對話記錄，關閉/重新整理前保留重要文字。分支提示表示佇列屬於另一訊息路徑。傳送失敗先處理原專案，不要重複加入副本。

### 在報告生成期間編輯和排序追問 {/* #在报告生成期间编辑和排序追问 */}

修改多條排隊訊息時，先編輯目標請求，再調整順序，最後刪除不再需要的請求：

1. 點選目標條目旁的 **Edit queued message**，該條移入輸入框，並暫時離開佇列。
2. 修改文字後點選 **Add message to queue**，重新核對位置；編輯後的請求可能回到隊尾。
3. 需要提前傳送時，聚焦該條的 **Reorder queued message** 手柄，按 **Space**，用方向鍵移動，再按 **Space** 確認。
4. 對不再需要的提醒或指令，點選旁邊的 **Remove queued message**。
5. 送達後核對已儲存對話中的最終文字和順序。被移除的請求不應作為已傳送指令出現。

![編輯和排序後保留的兩條請求](/img/open-science/local-todo-batch/14-queue-reordered.webp)

檢查已送達請求的內容和順序。標為 **Not saved** 的條目尚未進入已儲存對話，關閉或重啟前請複製重要的未傳送文字。

**Exit queued editing** 結束佇列編輯，文字仍留在輸入框。開始編輯時原條目已經離開佇列，退出不會自動放回。要保留請求，請檢查草稿並重新入隊；要放棄，則清空草稿。

### 編輯時保留附件 {/* #编辑时保留附件 */}

排隊請求包含檔案時，每次重新開啟編輯器，都要確認附件標籤仍在。修改指令後點選 **Add message to queue**。送達後，核對已儲存使用者訊息中的檔案是否為目標輸入；需要確認準確檔案身份時，可以要求計算檔案校驗值。

![編輯後的附件請求已送達，並返回檔案校驗值](/img/open-science/sept11-completion/queue-result.webp)

### 佇列附件提示不可用 {/* #队列附件提示不可用 */}

編輯後的佇列訊息若報 **Managed file or its Session is deleted.**，先檢查附件標籤與 Files 中的原檔案。保留請求文字，在新普通訊息裡重新附加當前檔案，再嘗試執行。不要反覆傳送同一個失效附件引用。新附件也失敗時，保留錯誤和檔案身份，用於診斷反饋。

## 閱讀活動和完成狀態 {/* #阅读活动和完成状态 */}

展開工具卡片檢視引數、程式碼和輸出。完成後開啟請求中指定的結果；如果某步失敗，根據首條錯誤到[故障排查](troubleshooting.md)選擇處理方法。

**Show more** 展開長請求，**Copy message** 和程式碼複製各自內容，**Scroll to end** 返回最新事件，桌面 run-marks 導航長對話中的請求。修改歷史使用者訊息會建立修訂，路徑關係見[會話](sessions.md)。

| 故障 | 檢查 |
| --- | --- |
| Send 禁用 | 文字為空、上傳未完成、會話狀態不可用 |
| 佇列無法編輯 | 先保留/清空現有草稿 |
| 舊分析仍繼續 | 核對已送達還是延後狀態 |
| 計劃批准後仍等待 | 可能另有工具權限 |
| 模型說完成但工具失敗 | 檢查首個故障和實際產物 |

## 複製、下載或放大回答表格 {/* #复制下载或放大回答表格 */}

懸停或聚焦回答表格，顯示 **Copy table**（Markdown、CSV、TSV）、**Download table**（CSV、Markdown）與 **View fullscreen**。選擇所需格式，確認儲存位置並重開檔案，檢查行與表頭。這些操作匯出現有回答，不會重新呼叫 Connector 或建立託管產物版本。

![回答後設資料表的全屏檢視](/img/open-science/guides-walkthrough/60-response-table.webp)

長時間執行的工作可透過[後臺任務](notebook.md)開啟或取消指定執行。佇列中的追問是待送達指令，後臺任務則是已接收執行的工作。收起任務列表不會停止執行。

原始碼：[佇列控制元件](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx)、[送達邏輯](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts)。

## 拖入會話附件 {/* #conversation-drop */}

可把本地檔案拖到整個會話區域，無需只對準輸入框。等待附件標籤出現、上傳完成，核對檔名後再傳送請求；拖入檔案不會自動傳送訊息。匯入 `.science` 研究包時，使用空白會話頁的 **Import previous research**，詳見[研究包](research-packages.md)。

## 拖拽檔案建立引用 {/* #drag-file-mention */}

從 **Files** 拖動檔案卡片，或把已開啟產物的檔案標題拖入 Composer。確認草稿中出現了正確檔案的引用，補充問題後再傳送。拖入只會新增草稿上下文，不會直接發起請求；新會話也可從 Files 面板引用檔案。傳送前核對專案與檔案。
