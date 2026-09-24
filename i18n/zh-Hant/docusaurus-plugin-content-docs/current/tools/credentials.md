---
title: "服務憑據"
last_update:
  date: '2026-09-24'
---

# 服務憑據 {/* #服务凭据 */}

在 **Settings → Credentials** 為實際發起請求的服務配置憑據。Codex 訂閱提供模型訪問，不提供 OpenAlex、GitHub 或自定義 MCP 賬號。

## 內建服務 {/* #内置服务 */}

| 服務 | 欄位與用途 | 驗證方式 |
| --- | --- | --- |
| GitHub | Skill 發現/匯入用 Personal access token | Connect/Manage 後使用目標倉庫操作驗證 |
| Literature access | 聯絡郵箱及可選 NCBI API key | 儲存真實聯絡資訊；支援的 NCBI 請求中金鑰可選 |
| OpenAlex | Literature 中 OpenAlex 操作的可選 API key | Validate、儲存，再執行小查詢 |
| Unpaywall | 查詢全文位置所需聯絡郵箱 | 使用文獻聯絡郵箱，不填寫虛構地址 |

**Connect** 開啟未配置服務，**Manage** 管理已有配置，**Desktop only** 表示需要桌面環境。已儲存標記不是金鑰明文。

## 配置可選的 OpenAlex 金鑰 {/* #openalex-实际缺密钥流程 */}

從 v0.33.1 起，OpenAlex 查詢不再強制要求 API key。可以先執行一個小查詢；服務方的限額、認證和訪問策略仍適用。應用允許不帶金鑰發起請求，不代表無限額度或保證每次請求成功。

需要使用自己的金鑰時，開啟 **Settings → Credentials → OpenAlex**（也可從 Literature Graph 的 **Manage credentials** 進入），填寫 **API key**，選擇 **Validate**，驗證成功後 **Save**。金鑰只用於 `api.openalex.org`。已有金鑰可透過 **Remove key** 移除；替換輸入框不會顯示儲存的金鑰。

遇到系統安全儲存錯誤時，先恢復憑據庫，再儲存。收到 429 時檢視服務的額度與重試資訊，不要把限流當成必須補金鑰。

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

OpenAlex 金鑰可選；OAuth Connector 仍需完成對應服務登入。處理顯示的認證錯誤後，再重試同一小請求。

實現依據: [CredentialsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx)。

可透過本地認證的 [CLI/SDK 憑據管理](../reference/cli.md)建立/更新共享憑據。Linux headless 可顯式選擇[未加密檔案儲存](../reference/server.md)，桌面憑據仍遵循正常 OS 儲存行為；此選項不解決 Compute 密碼儲存，也不發起首次 OAuth 登入。

## 開啟官方 API Key 頁面 {/* #official-api-key-page */}

OpenAlex 和 NCBI 的憑據表單提供官方金鑰頁面入口。在服務方完成賬戶操作後，返回表單，驗證並儲存所需金鑰。開啟連結不會自動儲存金鑰或執行查詢；是否需要金鑰取決於服務與具體操作。