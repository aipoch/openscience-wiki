---
title: "模型與任務策略"
last_update:
  date: '2026-09-22'
---

# 模型與任務策略 {/* #模型与任务策略 */}

先按任務選擇模型，再核對哪些設定會繼承主模型。**Provider** 提供模型訪問，**Agent** 執行對話和工具，**Specialist** 提供可複用角色與指定能力。更改其中一項不會自動安裝或配置其他項。

Main、Subagent、Reviewer、Vision 和 Session details 需要不同模型時，使用下方任務策略。結果任務中應檢查提供方和模型，尤其是多個提供方使用相同模型名稱時。

## 選擇主模型 {/* #选择主模型 */}

1. 開啟 **Settings → Model**；工作區輸入框的 **Select model** 也提供模型入口。
2. 展開 **Main model**，在已配置的 Provider 下選擇可用模型。目錄中出現某個名稱，不代表賬號必然有權限使用。
3. 選擇 **Reasoning effort**，以當前模型顯示的選項為準。例如部分模型提供 Default、Low、Medium、High、XHigh、Ultra，其他模型可能不同。
4. 關閉並重新開啟設定，確認儲存狀態；先執行一個小請求，再開始長分析。

![主模型與已連線的 Provider](/img/open-science/guides-walkthrough/10-model-main.webp)

更改影響後續請求，不會改變歷史回答使用的模型。切換模型時，應用嘗試保持相近推理強度；後端可能近似對映不支援的檔位。更高強度可能增加耗時和用量，不代表結果一定正確。

## 配置不同任務的模型 {/* #配置不同任务的模型 */}

點選場景行展開；開啟另一行會收起前一行。更改後檢查收起行中的摘要，區分繼承、固定模型和不可用狀態。

| 場景 | 模型選擇 | 需要核對 |
| --- | --- | --- |
| Subagent | Same as main model 或單獨的相容模型 | 跟隨主模型時獨立推理控制元件不可用；仍需啟用 Delegation |
| Reviewer | Follow main model 或指定模型 | 設定模型不等於開啟 Auto-review，也不等於已有審查記錄 |
| Vision | 支援影象輸入的已配置模型 | Not configured 表示未指定專用 Vision 模型；是否需要轉交影象取決於當前後端能力 |
| Session details | 跟隨主模型或指定相容模型；檢查強度與啟用狀態 | 用受限呼叫生成會話標題和說明，與科研任務和產物分開 |

![Subagent 繼承與禁用的獨立強度控制元件](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

固定場景模型時先選 Provider/模型，再選支援的強度。希望未來主模型變更自動傳遞時，改回繼承選項。**Unavailable** 可能保留已移除或不再相容的舊模型名，需要重新選擇有效項。


Session details 選擇器不接受 Codex 訂閱模型；Main 或 Vision 中能看到的模型不一定能用於標題生成。選擇相容本地提供方和 OpenCode 後，本地模型可作為固定選項出現。推理強度旁的 **Not supported** 表示該控制項不可用，與能否傳送文字請求是兩回事。

### 使用獨立 Vision 模型讀取圖表 {/* #使用独立-vision-模型读取图表 */}

當會話的 Main 模型無法接收圖片時，可以使用 Vision。Main 本身支援圖片輸入時，也可以直接讀取。

<p className="example-label"><strong>案例演示</strong> 核對樣本計數圖的標籤</p>

1. 展開 **Settings → Model → Vision**，選擇可用的影象模型。推理強度控制元件可用時，再選擇所需強度。
2. 會話中保持所需的文字模型。更改 Vision 不會替換 Main。
3. 使用 **+ → Attach files** 附加圖表，傳送前確認輸入框中已顯示檔名。
4. 明確要求識別標題、座標軸標籤、單位和樣本數量等可見資訊；看不清的標籤應明確說明。
5. 對照原圖核對回答。精確數值比較應檢視源表格：本例中兩個標籤都四捨五入為 **24.7M**，不代表原始計數相等。
6. 不再需要獨立影象模型時，將 Vision 改回 **Not configured**；這不會刪除模型提供方。

![文字 Main 模型與獨立 Vision 配置](/img/open-science/sept11-completion/vision-configuration.webp)

![核對圖表標籤及四捨五入數值的限制](/img/open-science/sept11-completion/vision-result.webp)

當前圖片轉交邏輯排除了 Codex 訂閱提供方，但它們仍可能出現在 Vision 選擇器中。如果選擇後，文字 Main 仍拒絕接收圖片，請改用其他相容的 Vision 提供方，或選擇本身支援圖片的 Main 模型。選擇已儲存不代表圖片請求已成功。

### 確認會話標題確實由模型生成 {/* #确认会话标题确实由模型生成 */}

在 **Session details** 選擇 **Same as main model** 或指定相容模型後新建會話。等待標題從首條提示詞的截斷文字變為簡短標題，再檢查儲存的說明；只看到提示詞回退並不能證明生成成功。

輔助請求結束後檢查儲存的標題和描述。標題仍是截短的提示詞時，核對模型相容性、本地服務負載及呼叫最終狀態；輔助呼叫超時可能保留該回退標題。會話標題生成使用自己的模型策略，不會執行會話中的科學計算。

## Provider 控制元件與排查 {/* #provider-控件与排查 */}

| 控制元件或狀態 | 下一步 |
| --- | --- |
| Add provider | 按[模型接入](./providers.md)完成認證和端點配置 |
| Check Codex login | 檢查訂閱登入狀態，不會執行科研任務 |
| Re-import Codex login | 透過應用匯入已重新整理的現有登入 |
| Edit | 檢查配置；替代方案驗證成功前保留可用配置 |
| Delete 禁用 | 當前狀態不允許移除該 Provider，先準備另一套有效配置 |
| 相容性提示 | 檢查 Agent 和 API 格式，避免反覆盲目重試 |
| 場景列表為空 | 先配置符合要求的 Provider/模型，不是隨意填寫模型名 |

執行後端見 [Agent](./frameworks.md)，用量見 [Usage](./usage.md)，優先順序見[配置參考](../reference/configuration.md)。

原始碼：[主模型](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx)、[場景策略](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx)。

## 可選的分類模型 {/* #classification-models */}

開啟 **Settings → Model → Classification models**。分類服務在請求開始前輔助選擇相關 Skill 和 Connector，不會替換 Main，也不會增加一個聊天模型。可以將 **Automatic capability selection** 保持為 **Use default method**；不配置分類服務，Skill 和 Connector 仍可使用。

v0.31.1 中，該路徑用於 **Codex Chat Completions** 或 **CodeBuddy** 的主會話。不能據此認為 Codex 訂閱會話或所有框架都會使用此服務。傳送給分類服務的內容僅包括當前請求及能力名稱、描述；服務不可用或分類結果不明確時，會繼續使用預設方式。

![分類模型的預設方式與可選服務入口](/img/open-science/v0311/classification-models.webp)

1. 選擇 **Add service**，再選擇 **TypeSafe AI**、**OpenRouter** 或 **Custom HTTP service**。
2. 填寫服務名稱，並按服務要求提供 API 憑據。OpenRouter 可複用相容的已有賬戶或使用新金鑰；截圖時保持金鑰隱藏。
3. 點選 **Save**，等待驗證。驗證失敗時，原有設定保持不變。
4. 在 **Automatic capability selection** 中選擇已儲存的服務和目錄中提供的模型。透過 **Check model** 檢查連線。
5. 在受支援的主會話中傳送一個範圍明確的請求，檢視實際選擇的工具。模型連線檢查透過，本身不能證明科研結果正確。

移除服務會將其繫結恢復為預設方式。單獨儲存的服務金鑰會一併移除；複用已有賬戶的服務被移除時，不會刪除該賬戶或其金鑰。

聊天模型配置見[提供方設定](providers.md)。本地 PDF 解析資源由另一個 **Local parsing models** 標籤頁管理。

![分類服務表單，API key 尚未填寫](/img/open-science/v0311/classification-add-service.webp)

使用 Jev 時，在 **Automatic capability selection** 中選取 **TypeSafe AI / Jev Latest**，再按 **Check model**。出現 **Check passed** 表示服務可以回應；重新開啟 Settings，確認所選綁定仍然保留。

![已選取 TypeSafe AI / Jev Latest，顯示 Check passed，金鑰保持隱藏](/img/open-science/v0311/classification-connected.webp)

例如，在 Codex Chat Completions 會話中查詢公開的 TP53 資訊時，可由 Jev 選擇 `mcp-genes`。在活動記錄中檢查選中的能力，再檢視資料庫響應獲取查詢結果。Codex 訂閱會話使用原有的能力載入方式；儲存 Jev 繫結不會讓這類會話改用 Jev。

### 自定義分類服務 {/* #custom-classification */}

在 **Add service → Custom HTTP service** 中填寫服務名稱、端點 URL 和模型 ID。服務必須相容 **TypeSafe 分類協議**；普通 Chat Completions 地址不能直接替代它。按服務要求填寫 API key：本機迴環地址可以使用無金鑰 HTTP，遠端服務必須使用 HTTPS 並提供憑證。

儲存後，在 **Automatic capability selection** 中選擇該服務並執行 **Check model**。連線檢查成功後，再使用受支援的會話路線檢查能力選擇。該設定不切換 Main，也不會讓 Codex 訂閱會話改用分類服務。

下圖僅展示填寫方式：請把示例地址與 `your-model-id` 換成實際服務資訊，再檢查連線。

![自定義分類服務的端點、模型和空白金鑰欄位](/img/open-science/v0320/classification-custom.webp)
