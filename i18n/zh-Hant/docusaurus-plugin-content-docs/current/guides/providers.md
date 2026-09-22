---
title: "提供商與本地模型配置"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 提供商與本地模型配置 {/* #提供商与本地模型配置 */}

## 選擇訪問方式 {/* #选择访问方式 */}

![英文首次設定中的 Codex 訂閱連線](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type` 用來選擇訂閱登入、官方 API 或 `Custom Gateway`。訂閱選項受當前智慧體框架影響。Codex 的提供方選項包括 Codex subscription、xAI OAuth、官方 API 和 Custom Gateway；其他框架不一定顯示完全相同的選項。

| 選擇 | 需要準備 | 繼續前檢查 |
| --- | --- | --- |
| Codex subscription | 相容的 Codex 登入 | 檢查 `Codex authentication`；匯入現有登入會將認證複製到 Open-Science |
| 官方 API | 提供方賬號及具體模型訪問權限 | 確認提供方、適用區域和 API 憑據 |
| Custom Gateway | 相容端點、準確的模型標識，以及服務要求的 API key | 向閘道器維護者確認 API 格式及模型能力 |

選擇 **Import existing Codex sign-in**，將本機可用的登入複製到 Open-Science。匯入可包含相容的非秘密本地迴環路由，其他全域配置、Skills 和會話保持獨立。在 **Advanced settings → Transport** 保留 **Auto (recommended)**，除非連線需要其他傳輸方式。

## 選擇提供商區域或免費目錄模型 {/* #provider-regions */}

使用 **SenseNova** 時，先在提供商表單中選擇 **China** 或 **Global**，再選擇模型。填寫該區域對應的 API key，核對模型列表，點選 **Save**，等待連線驗證成功後提交修改。切換區域可能同時改變地址和可選模型，另一區域的金鑰或模型名未必可用。

使用 **OpenRouter**、**OpenCode Zen** 等閘道器時，只選擇當前框架目錄中實際提供的免費模型條目，並按服務要求配置賬號和憑據。免費條目仍可能有用量限制，也不代表支援全部工具或圖片輸入。不要給任意模型 ID 自行新增 `:free`。先傳送一個小請求，核對返回模型和結果，再用於研究任務。

## 接入已有 Codex 訂閱 {/* #接入已有-codex-订阅已实操路径 */}

1. 開啟 **Settings → Model → Add provider**。
2. 將 **Provider type** 設為 **Codex subscription**。
3. 在 **Codex authentication** 中選擇 **Import existing Codex sign-in**。電腦需要已有可用登入。該操作複製認證到應用配置，不匯入其他 Codex 會話和 Skills。
4. 點選 **Save**。提供方顯示 **Testing…** 時等待檢查結束；僅出現一行配置不代表已連通。
5. 確認提供方顯示 **Connection verified** 和認證已匯入的提示。已釋出版本的介面名稱可能尚未使用連字元。
6. 在 **Main model** 選擇訂閱可用模型。例如，賬號提供 **gpt-5.6-sol** 時可選擇該條目。有多個提供方時，同時核對模型名稱和提供方。
7. 開啟專案傳送範圍明確的請求。連線測試檢查認證，實際回覆檢查請求鏈路。確認該會話中出現回覆及適用的工具審批請求。

![訂閱連線已驗證，並選定主模型](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| 提供方行操作 | 使用時機 | 檢查結果 |
| --- | --- | --- |
| **Check Codex login** | 懷疑已儲存登入過期 | 等待顯示已驗證或具體失敗狀態 |
| **Re-import Codex login** | 外部登入更新後，希望更新應用中的副本 | 重新匯入並檢查認證 |
| **Edit** | 檢查認證方式或傳輸設定 | 點選 Save，等待驗證成功後提交修改 |
| **Delete** | 移除不再使用的提供方 | 取決於是否仍被依賴；仍被使用的提供方可能無法刪除 |

**Testing…** 不表示失敗，**Connection verified** 也不表示所有模型與工具均已執行成功。匯入失敗時，先完成支援的 Codex 登入流程再重試；不要將認證 JSON 貼上到提示詞或文件中。


智慧體執行時負責執行任務，模型提供方負責提供模型。安裝 Codex 不會自動完成模型連線。首次設定中，本頁位於 Agent runtime 之後；完成設定後可透過 **Settings → Model** 管理模型訪問。

如果匯入提示缺少儲存在檔案中的 Codex 登入，應透過受支援的 Codex 登入流程完成登入，再重試 **Re-import Codex login**。僅儲存在外部憑據庫中的登入不一定能作為檔案匯入。

## 更新或移除 API 憑據 {/* #更新或移除-api-凭据 */}

服務端更換金鑰後，在 **Settings → Model** 找到對應提供方，點選 **Edit**，將新金鑰填入 **API key** 並點選 **Save**。編輯時留空會保留舊金鑰，不表示清除。先等待連線驗證成功，再提交修改；若顯示認證失敗，先核對服務地址、金鑰所屬賬號和有效期，再重試。

確認 **Connection verified** 後，用該提供方完成一個小請求。只移除不再被使用的提供方：點選 **Delete** 並核對確認框名稱。刪除應用中的配置不會替你撤銷服務端金鑰。

## Custom Gateway：逐項填寫 {/* #custom-gateway逐项填写 */}

![自定義閘道器的必填項錯誤](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

先選擇 `Custom Gateway`。切換型別時，顯示名稱可能保留上一型別的值，因此需要手動檢查名稱。

| 欄位或控制元件 | 填寫方式與行為 |
| --- | --- |
| `Provider type` | 選擇提供方型別，並改變後續表單 |
| `Name`／`Provider name` | 可選顯示名，例如 `Lab gateway`，不是模型標識 |
| `Base URL` | 必填的閘道器基礎地址。遠端模型端點必須使用 HTTPS；localhost 和迴環地址可以使用 HTTP。填寫運營方提供的真實地址，不要使用不可連線的 `https://gateway.example` 佔位地址 |
| `API format` | 選擇 Chat Completions、Messages 或 Responses，旁邊的路由幫助識別協議 |
| `API key` | 遠端閘道器需要填寫；無需認證的本地迴環閘道器可留空。如果本地服務啟用了認證，仍需填寫真實憑據 |
| 眼睛／`Show API key` | 切換當前輸入的可見性；截圖和分享前保持隱藏 |
| `Model` | 必填端點接受的準確模型標識；截圖中的 `demo-model` 僅為佔位示例 |
| `Context window` | 可選上下文上限；留空使用提供方預設值 |
| 上下文預設 | 32K、64K、128K、200K、256K、1M；選擇 128K 時填入 `128000` |
| `Advanced settings` | 展開或收起能力與詞元限制欄位 |
| `More information`（i） | 檢視相鄰欄位的幫助說明 |
| `Back` | 返回 Agent runtime；表單草稿由引導流程儲存，可在返回時保留 |
| `Test & continue` | 先檢查必填項，再在輸入有效時儲存並測試；有效且成功的驗證結果才允許進入下一步 |

API 格式選單包含：

- **Chat Completions**：`/v1/chat/completions`。
- **Messages**：`/v1/messages`。
- **Responses**：`/v1/responses`。

這些路由用於區分協議，不是要求把所有路由都拼進 Base URL。閘道器支援一種格式不等於支援另外兩種。

<ToolOperationGroup>
<summary>高階欄位與條件顯示</summary>

舊的遠端 HTTP 配置仍可編輯，但不能傳送請求。向服務運營方取得 HTTPS 地址，儲存後重新測試。本機迴環地址的模型服務可以繼續使用 HTTP；區域網中的遠端伺服器仍需 HTTPS。

### 高階欄位與條件顯示 {/* #高级字段与条件显示 */}

| 欄位或控制元件 | 設定方法 |
| --- | --- |
| `Image input` | 只有閘道器和模型都接受圖片輸入時才啟用 |
| `Thinking mode` | 只有閘道器和模型接受思考或推理強度控制時才啟用 |
| `Supported effort levels` | 啟用思考後顯示；選擇實際支援的檔位，不要僅憑模型名稱判斷 |
| `Reasoning request format` | 使用 Chat Completions 且思考已啟用時出現；按閘道器要求選擇引數格式 |
| `Maximum input tokens` | 獨立的最大輸入詞元數；留空使用預設值。預設為 32K、64K、128K、200K、256K、1M |
| `Maximum output tokens` | 獨立的最大輸出詞元數。預設為 4K、8K、16K、32K、64K、128K |

啟用 **Thinking mode** 後可配置支援的推理強度。使用 **Chat Completions** 時，還應選擇端點支援的推理請求格式。這些宣告需要與提供方 API 能力一致。


</ToolOperationGroup>

### 測試閘道器配置 {/* #跟着操作 */}

1. 選擇 Custom Gateway，展開 Advanced settings。
2. 填入提供方給出的 Base URL 和準確模型 ID，並按要求填寫 API key。缺少必填項時會出現行內錯誤，並留在當前頁。
3. 填寫可識別的顯示名。準備真實連線時，使用提供方給出的真實端點和模型；演示佔位值不能透過連線測試。
4. 選擇一個上下文預設，檢查輸入框中的數值。
5. 僅在實際支援時啟用 Thinking mode，觀察新增欄位；切換 API format 可能改變欄位集合。
6. 需要金鑰時私下填寫並保持隱藏，準備向提供方發起請求時點選 `Test & continue`。
7. 等待結果。驗證期間顯示 `Testing connection…` 並阻止重複提交。適用的訂閱流程會顯示 `Sign in & continue`、`Waiting for sign-in…` 和 `Cancel sign-in`。

## 連線本地模型端點 {/* #连接本地模型端点 */}

<p className="example-label"><strong>示例</strong> 透過 Ollama 接入本地 Qwen 模型</p>

本地模型服務獨立於 Open-Science 執行。使用 **Custom Gateway** 接入相容端點，並選擇支援該 API 格式的 Agent。下例使用 Ollama 和 OpenCode；安裝 Python Notebook 直譯器不會同時安裝模型服務。

### 啟動服務並下載模型 {/* #启动服务并下载模型 */}

安裝 [Ollama](https://ollama.com/download)，在終端啟動僅限本機訪問的測試服務：

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

保持該終端執行，在另一個終端下載模型：

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

等待下載完成。服務已啟動但模型尚不存在時，應用可能提示 **Test failed: the configured model was not found.** 完成下載、確認模型 ID 後，再點選 **Test connection**。

### 填寫提供方設定 {/* #填写提供方设置 */}

開啟 **Settings → Model → Add provider**，填寫：

| 欄位 | 本地連線示例 |
| --- | --- |
| Provider type | Custom Gateway |
| Name | Local Qwen demo |
| Base URL | `http://127.0.0.1:11435` |
| API format | Chat Completions（`/v1/chat/completions`） |
| API key | 本例無需認證的迴環端點可留空；有認證的閘道器必須填寫實際憑據 |
| Model | `qwen3:0.6b` |
| Context window | `32768`，與執行中的服務一致 |
| Advanced settings → Maximum output tokens | `4096` |
| Image input / Thinking mode | 此文字示例保持關閉；只有模型和閘道器支援時才啟用 |

![本地地址、介面格式與準確模型 ID](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

表單會在閘道器根地址後補充 `/v1`。Open-Science 允許 `localhost`、`127.0.0.1`、`[::1]` 等迴環地址的 API key 留空，舊截圖中可能仍顯示佔位值。遠端或區域網閘道器仍需要 HTTPS 和 API key；API 格式應與本地服務支援的格式一致。

輸出預算需要為輸入和會話歷史留下空間。Maximum output tokens 留空時，OpenCode 會自行預留輸出預算；對於較小的上下文視窗，過大的預留可能造成反覆壓縮。表單中的上下文大小也應與模型服務實際分配一致，僅修改表單不會改變 Ollama 的執行配置。

### 選擇相容 Agent 並檢查實際回覆 {/* #选择兼容-agent-并检查实际回复 */}

在 **Settings → Agent** 中，若未安裝 OpenCode，選擇 **OpenCode → App-managed download**。安裝後點選其卡片並確認 **Switch**，再回到 **Model** 選擇本地模型。先新建會話傳送簡短的連線檢查，再用於研究任務。確認請求實際結束；儲存配置或連線測試成功，不代表科學推理、工具呼叫或影象輸入已經可靠。

本例透過配置的本地端點和 OpenCode 正常完成請求，返回 **Local model connected.**，驗證的是文字連線，不是生物醫學分析。

![本地模型連線檢查正常完成](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

使用期間保持模型服務執行。Agent 在另一臺主機執行時，`localhost` 指向那臺主機；瀏覽器可以訪問某個地址，不代表 Agent 同樣可以訪問。

### 核對真實工具呼叫 {/* #核对真实工具调用 */}

<p className="example-label"><strong>示例</strong> 檢查本地模型的 Notebook 工具呼叫</p>

連線成功後，用結果已知的小任務檢查工具路徑。可要求 Agent 透過 Python Notebook 實際執行以下程式碼，而不是直接給出算術答案：

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

這些數字對應 GSE60450 第一個樣本的零計數與檢出基因數。檢查權限面板中的程式碼，批准後開啟 **Notebook**，核對輸出 **27179 / True**。

![本地模型發起的 Notebook 程式碼與真實輸出](/img/open-science/priority-completion/21-local-model-python-result.webp)

如果本地模型提出不存在的輔助模組，先檢查程式碼，再明確提供上方無依賴程式碼。確認 Notebook 實際執行並返回預期結果後，才繼續較複雜任務；一次小計算不能保證完整分析可靠。

## 無法繼續時 {/* #无法继续时 */}

| 現象 | 檢查方向 |
| --- | --- |
| 必填提示 | 補齊提示指出的欄位，僅有顯示名不夠 |
| 安全儲存不可用 | 解鎖或授權系統憑據庫，恢復後才能儲存金鑰 |
| 連線或認證失敗 | 檢查憑據、端點、協議，以及當前賬號對該模型的權限 |
| 提供方在測試中改變 | 檢查當前選擇後重新測試；過時結果不能完成設定 |
| 登入被取消 | 準備好後重新開始，取消不等於連線成功 |
| 執行時已安裝但模型不可用 | 繼續完成模型連線；安裝執行時和授權模型是兩個步驟 |

### 查詢 HTTP 報錯 {/* #查询-http-报错 */}

遇到 400、401、403、404、429 或 5xx 響應時，檢視 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同時記錄返回錯誤的服務與詳細訊息。

原始碼：[ProviderForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx)、[ProviderStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx)。

## v0.31.0 及後續版本如何儲存提供方修改 {/* #validated-provider-save */}

提供方修改先經過連線驗證，透過後才提交儲存。點選 **Save** 後等待結果，確認成功再關閉表單。驗證失敗不會替換原有可用配置。已儲存的連線在請求中被拒絕時，可用狀態會更新；檢查憑據和端點後重新測試。**Conversation models**、**Classification models** 和 **Local parsing models** 用途不同，詳見[模型設定](models.md#classification-models)。

## StepFun 與區域選擇 {/* #stepfun-regions */}

在提供方目錄選擇 **StepFun**，先確認 **China** 或 **Global** 區域，再選擇模型並填寫該區域的憑證。v0.32.0 加入 **Step-5 Preview**，目錄標記為支援多模態和 1M 上下文。實際可用模型、額度和輸入能力仍以提供方賬戶及所選 Agent 的相容性為準。

儲存並檢查連線後，才在需要使用它的會話中選擇該模型。已有提供方保留原先端點；應用升級不會替你切換區域或主模型。
