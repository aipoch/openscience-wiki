---
title: "服務憑據"
last_update:
  date: '2026-09-20'
---

# 服務憑據 {/* #服务凭据 */}

在 **Settings → Credentials** 為實際發起請求的服務配置憑據。Codex 訂閱提供模型訪問，不提供 OpenAlex、GitHub 或自定義 MCP 賬號。

## 內建服務 {/* #内置服务 */}

| 服務 | 欄位與用途 | 驗證方式 |
| --- | --- | --- |
| GitHub | Skill 發現/匯入用 Personal access token | Connect/Manage 後使用目標倉庫操作驗證 |
| Literature access | 聯絡郵箱及可選 NCBI API key | 儲存真實聯絡資訊；支援的 NCBI 請求中金鑰可選 |
| OpenAlex | Literature 中 OpenAlex 操作的 API key | Validate、儲存，再執行小查詢 |
| Unpaywall | 查詢全文位置所需聯絡郵箱 | 使用文獻聯絡郵箱，不填寫虛構地址 |

**Connect** 開啟未配置服務，**Manage** 管理已有配置，**Desktop only** 表示需要桌面環境。已儲存標記不是金鑰明文。

## 補充缺失的 OpenAlex 金鑰 {/* #openalex-实际缺密钥流程 */}

1. 未配置金鑰時請求 OpenAlex 查詢。
2. 對話出現 **Add your OpenAlex API key** 和 **API key** 輸入框。
3. **Save key** 成功儲存後繼續等待中的呼叫；**Not now** 保持未配置。
4. 檢查最終狀態。選擇 **Not now** 可返回 **credential_required**；配置金鑰後再重試。

![英文應用中的 OpenAlex 憑據請求](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

介面說明金鑰在本機加密並只傳送到 `api.openalex.org`。Settings 表單另有 **Validate、Save、Remove key**（已有金鑰時）和 **Cancel**。替換欄位不顯示舊金鑰；安全儲存不可用時需先解決系統鑰匙串狀態。

## 自定義 Connector 憑據 {/* #自定义-connector-凭据 */}

在此建立憑據，再到 [Connector 配置](../guides/connectors.md)選擇其名稱。修改或移除共享憑據前先核對使用者。

### New credential 表單 {/* #new-credential-表单 */}

| 欄位或按鈕 | 操作 |
| --- | --- |
| Name | 為憑據設定便於識別的本地名稱 |
| Type | 選擇 **API key**、**Access token**、**OAuth** |
| Value | key/token 的遮罩輸入框；必填項為空時 Save 禁用 |
| OAuth → Resource URL | 填寫準確資源地址，Connector 按資源 URL、傳輸方式和註冊配置匹配 |
| Advanced → Transport | 選擇服務要求的傳輸方式，當前預設是 Streamable HTTP |
| Scopes | 用空格或逗號分隔作用域 |
| Use a pre-registered client | 展開 **Authorization server URL**、**Client ID**、**Callback URL**、**Client secret** |
| Callback URL / Copy | 當前預設 `http://127.0.0.1/oauth/callback`，可複製用於服務註冊，也可展開自定義回撥選項 |
| Discovery | 適用時發現伺服器後設資料；發現成功本身不是登入成功 |
| Cancel / Save | 放棄草稿或儲存有效配置 |

![OAuth 高階註冊欄位](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

在自定義 Connector 中，將命名憑據繫結到請求頭、環境變數或 OAuth 選擇器。名稱用於引用，不應把金鑰放進描述或專案指令。匯出的可移植配置以佔位符替換金鑰；儲存憑據後仍需實際服務測試才能確認可用。

## 驗證與排錯 {/* #验证与排错 */}

儲存後執行一次小範圍操作，讀取實際響應。`credential_required` 表示缺少已配置憑據；401 需檢查認證，403 需檢查權限/策略，不能一律靠換金鑰解決。429 涉及限流或用量。保留服務正文，參見[排錯](../guides/troubleshooting.md)。

移除憑據可能影響所有繫結的 Connector。Connector 和 Specialist 匯出不會攜帶現成金鑰/信任，接收端應重新配置。不要將金鑰寫入 Skill、提示詞、截圖或 issue。

OpenAlex 查詢需要有效的 OpenAlex 金鑰；OAuth Connector 需要完成對應服務登入。處理顯示的認證錯誤後，再重試同一小請求。

實現依據: [CredentialsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx)。

可透過本地認證的 [CLI/SDK 憑據管理](../reference/cli.md)建立/更新共享憑據。Linux headless 可顯式選擇[未加密檔案儲存](../reference/server.md)，桌面憑據仍遵循正常 OS 儲存行為；此選項不解決 Compute 密碼儲存，也不發起首次 OAuth 登入。

## 開啟官方 API Key 頁面 {/* #official-api-key-page */}

從 v0.31.0 起，OpenAlex 和 NCBI 的憑據提示包含官方 API Key 頁面連結。開啟連結時，表單草稿和等待中的 Connector 呼叫會保留。在服務方完成賬戶操作後，返回憑據表單，驗證並儲存所需金鑰，再重試查詢。僅開啟獲取金鑰的頁面，不會自動儲存金鑰或完成查詢。
