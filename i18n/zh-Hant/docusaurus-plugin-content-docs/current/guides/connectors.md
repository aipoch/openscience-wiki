---
title: "聯結器與憑據"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 聯結器與憑據 {/* #连接器与凭据 */}

Connector 讓服務工具可供 Agent 使用，Credential 在服務要求時提供認證。安裝 Skill 或分配標籤不等於連線服務。

批次管理時，先在底部操作區核對選中數量，再執行操作。在同一位置閱讀完成或失敗反饋，並檢查條目的最終狀態；僅選中條目不會啟用、安裝或刪除它。

## 使用內建 Connector {/* #使用内置-connector */}

### 為基因表達專案尋找工具 {/* #为基因表达项目寻找工具 */}

開啟 **Settings → Connectors**，搜尋 **Omics Archives** 並進入詳情。該內建分類包含 GEO、ArrayExpress、MetaboLights、MGnify 和 PRIDE，使用前展開工具說明。

![GEO 後設資料工具及明確的下載邊界](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` 返回 GEO 系列後設資料、樣本、平臺及補充檔案 URL。需要計算時，從返回的來源下載資料表，再將其附加到專案。

為 Omics Archives 分配 **Transcriptomics** 標籤後，可透過 **Settings → Tags → Transcriptomics → Search tagged resources: Omics** 找到它。標籤只幫助整理與導航，不改變服務訪問和審批。

| 狀態 | 證明什麼 | 後續檢查 |
| --- | --- | --- |
| Directory 中存在 | 應用知道該定義 | 閱讀具體工具說明 |
| Used by | Agent 可用範圍 | 核對角色和能力繫結 |
| 已選 Credential | 存在命名繫結 | 對目標服務驗證認證 |
| 工具策略 | 允許、詢問或阻止呼叫 | 檢查記憶權限優先順序 |
| 工具實際成功 | 這次呼叫完成 | 核對返回識別符號、資料與來源 |

### 內建 Connector 控制元件實操 {/* #内置-connector-控件实操 */}

**Search connectors** 搜尋 PubMed 後在 **Directory** 組找到結果；列表還包含 **Featured**、**Custom**。搜尋按組顯示結果，因此其他分組可能顯示 **No connectors match your search**，下方仍有匹配項。

組合使用 **Filter connectors by group**、**Filter Connectors by agent**、**Filter by Tag** 和搜尋。**Manage credentials** 開啟共享的聯絡郵箱與憑證設定。**Used by** 顯示關聯的代理；**Manage Tags** 用於整理標籤。使用資源旁的 **Manage access** 統一檢視和調整 Main Agent 與 Specialist 的訪問。

#### 按代理管理資源訪問 {/* #resource-access */}

1. 在 **Settings → Connectors** 找到 Connector，開啟它的 **Manage access** 控制元件。
2. 檢視 **Main Agent** 和列出的 Specialist；列表支援搜尋時，可按角色名稱篩選。只調整所需關聯；角色編輯器仍可管理該角色的能力列表。
3. 重新開啟彈窗並檢查 **Used by**。已禁用的 Specialist 仍可能保留繫結；分配資源不會啟用該角色。

![分別檢視 Main Agent 和各 Specialist 的 Connector 訪問](/img/open-science/v0330/resource-access.webp)

對於開啟 **Full access** 的角色，排除該 Connector 會形成單項例外；選擇訪問模式使用明確的資源列表。市場角色的繫結在這裡可能只讀。憑證、服務就緒狀態和操作批准與這些關聯分開管理，分配 Connector 不會完成這些步驟。

#### 批次啟用或禁用 Connectors {/* #批量启用或禁用-connectors */}

開啟 **Settings → Connectors**，篩選列表，在相應組選擇 **Select multiple** 並勾選需要操作的 Connector。啟用或禁用前檢查選中數量，完成後核對各項狀態，只保留當前工作需要的服務。批次切換可用性不會補充憑據、更改各工具的審批策略，也不會授予 Specialist 訪問權限，這些設定需分別配置。

#### PubMed：可用性、工具與審批 {/* #pubmed可用性工具与审批 */}

1. 搜尋 **PubMed** 並開啟詳情。
2. 展開 **search_articles** 閱讀說明。它返回匹配總數及一頁 PMID，支援 PubMed 欄位標籤、布林運算、日期和排序。
3. 根據所需訪問範圍選擇 **Require approval**、**Block** 或 **Always allow**。Require approval 顯示 **Ask when no Session, Project, or Global permission applies.**，即沒有適用的已記憶權限時才詢問。
4. 透過 **Manage access** 為 PubMed 啟用 **Main Agent**，再檢查 **Used by**。在同一彈窗中單獨核對需要使用它的 Specialist。

![PubMed 工具說明與審批控制元件](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

詳情列出 `search_articles`、`get_article_metadata`、`find_related_articles`、`lookup_article_by_citation`、`convert_article_ids`、`get_full_text_article` 和 `get_copyright_status`。每個工具可設為 **Always allow / Require approval / Block**。Connector 整體的 **Skip approvals** 是另一項設定，啟用前先確認範圍；開啟描述只會檢視工具說明。

列表將 PubMed 放在 **Directory**，詳情卻顯示 **Featured** 標籤；分類標籤不代表賬號連線狀態。

<ToolOperationGroup>
<summary>實際執行一次 GEO 後設資料查詢</summary>

### 實際執行一次 GEO 後設資料查詢 {/* #实际运行一次-geo-元数据查询 */}

<p className="example-label"><strong>案例演示</strong> 查詢 GSE60450 的 GEO 樣本資訊</p>

1. 返回研究會話，確認模型可用且 Omics Archives 已提供給 Agent。
2. 請求：`Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. 授權前核對 Connector、方法和引數。該工具要求 `accessions` 陣列，猜測的單數引數名不正確。
4. 檢查實際結果：本例返回 **GSE60450**、**Mus musculus**、**12 個樣本**，系列標題為 “Transcriptome analysis of luminal and basal cell subpopulations in the lactating versus pregnant mammary gland”。
5. 保留 GSM 編號及其特徵，不憑名稱相似就推斷與矩陣 MCL1 列名的對應。

![Connector 實際返回的 GEO 樣本特徵](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

返回編號範圍 **GSM1480291–GSM1480302**，包含 luminal/basal 細胞群及 virgin、18.5-day pregnancy、2-day lactation 階段。這些來自後設資料，不是從總計數推斷。十二行回答表格實際下載為 <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a>；它是對話表格匯出，與託管質控產物分開。

如果 Connector 說明檔案無法讀取，請保留 EPERM 報錯並檢查已啟用連線與當前會話。重試前在[Connector 引數](../reference/connector-operations.md)核對欄位。後設資料查詢返回結構化記錄，不會自動下載底層資料表或執行分析。


</ToolOperationGroup>

## Add connector：共同身份欄位 {/* #add-connector共同身份字段 */}

**Add connector** 提供 **Local command**、**Remote server**、**Import configuration**。前兩項進入可切換型別的編輯器，**Advanced settings** 展開更多欄位。儲存前填寫真實可用的命令或服務地址。

| 欄位 | 作用 |
| --- | --- |
| Connector type | 在本地程序與遠端端點之間切換 |
| Display name | 介面顯示的名稱 |
| Advanced → Connector name | 用於 `host.mcp`、Specialist 繫結及自動生成 MCP Skill 的呼叫名，儘可能根據顯示名生成 |
| Connector ID | 可選穩定標識，儘可能自動生成；建立前可改，建立後不可變 |
| Description | 可選的資料與操作說明 |
| I trust this connector | 新增自定義 Connector 前必需的信任勾選；勾選不等於服務驗證成功或程式碼安全 |
| Cancel / Back to connectors | 離開表單，放棄未儲存的草稿 |
| Add connector / Add and sign in | 儲存有效配置，OAuth 會進入登入；必填項、繫結或信任缺失時禁用 |

### Local command {/* #local-command */}

**Command** 提供 `npx — Node package`、`uvx — Python (uv)`、`node — script file`、`python3 — script file`、`docker — container`、**Other…**。Other 展開 **Custom command**，填寫可執行檔案的絕對路徑。

| 高階輸入 | 操作 |
| --- | --- |
| Arguments | 每行一個引數，空格與空行都會保留；清空欄位刪除全部引數，不應認為一行以空格分隔的 shell 命令會自動拆分 |
| Variable name | 輸入環境變數名，然後選擇或建立對應 Credential |
| Add variable / Remove variable | 增加或移除命名繫結 |
| Fields / Text | 按行編輯，或每行輸入一個 `KEY=`；金鑰值儲存在 Credentials |
| 命令預覽 | 檢查繫結區域之後顯示的啟動器 |

![本地命令與環境變數憑據繫結](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

選擇啟動器前確認對應可執行檔案、包、容器或服務已安裝。下方示例說明如何匯入並驗證本地 MCP 連線。

### Remote server {/* #remote-server */}

**Server URL** 應使用服務方提供的真實地址。截圖中的 `https://example.org/mcp` 是保留示例域名，不是可用 MCP 服務。

**Advanced → Transport** 預設 **Streamable HTTP**；**Authentication** 可選 **None**、**OAuth (browser sign-in)**、**Static headers**。

#### Static headers {/* #static-headers */}

當前編輯器繫結命名憑據，並非直接貼上金鑰的普通文字框。

1. 選擇 **Static headers**。
2. 填寫 **Header name**，例如 `Authorization`。
3. 選擇或建立對應 **Credential**，名稱為空時選擇器禁用。
4. **Add header** 增加一行，**Remove header** 移除一行。
5. **Fields / Text** 切換名稱錄入方式；Text 每行以 `Name:` 填寫一個請求頭名稱，值由 Credentials 單獨管理。

![請求頭名稱與憑據選擇器](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth 繫結 {/* #oauth-绑定 */}

選擇與資源 URL、傳輸方式和註冊配置匹配的 **OAuth credential**。**New credential** 開啟[憑據編輯器](../tools/credentials.md)。當前空配置實際提示 **No OAuth credential matches this Connector's resource URL, transport, and registration.**，底部操作變為 **Add and sign in**。

![OAuth 憑據匹配](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## 匯入、匯出與連線驗證 {/* #导入导出与连接验证 */}

已有 MCP 客戶端配置時，選擇 **Add connector → Import configuration**，選取一個不超過 256 KB 的 JSON 檔案。支援 Open-Science Connector 配置及包含 `mcpServers` 的客戶端配置。

1. 多服務檔案會顯示 **MCP server** 下拉框。一次只審查、新增一個服務；切換後核對名稱、ID、傳輸方式和啟動引數。
2. 檢視診斷。本機絕對路徑需要在另一臺電腦上調整；檔案中的憑據值不會自動匯入。
3. 點選 **Use configuration** 進入預填表單。匯入尚未完成：仍需核對欄位、選擇本機憑據並勾選 **I trust this connector**。
4. 點選 **Add connector**，返回列表檢查連線狀態，再實際呼叫一個只讀工具。

![多服務配置的條目選擇與憑據提示](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

匯入的服務引用 `QC_EXAMPLE_TOKEN` 等環境變數時，將該名稱繫結到本機儲存的憑據。必需繫結完成後才能 **Add**。新增後檢查 **Connected** 並呼叫所需工具；儲存繫結本身不能驗證遠端認證。

呼叫 `get_dataset_summary`，將返回的一個完整樣本 ID 傳給 `get_sample_qc`，再與 [QC 基準](../reference/example-data.md)比較。該服務返回已儲存彙總值，不重新計算原始矩陣。服務實現見[建立自定義工具](../tools/custom.md)。

### 匯出與重新匯入 {/* #导出与重新导入 */}

在 Connector 行的 **Actions → Export** 中選擇 **Open Science Connector** 或 **MCP client config**，檢查預覽後點選 **Save configuration**。

![匯出只保留憑據名稱，並提示本機路徑](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

實際匯出的配置包含 `required_secrets.environment` 中的變數名，沒有演示憑據值，也不包含本地信任與權限。重新匯入仍需選擇憑據並確認信任。

如果相同 ID 已存在，預覽顯示 **A custom Connector with ID … is already installed**，**Use configuration** 不可用。要修改現有連線，返回 **Edit**；不要把匯入當作覆蓋更新。

![重複 ID 阻止重新新增](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

恢復匯出的連線時，檢查預填欄位並重新繫結所需命名憑據。完成信任確認，再用小型呼叫核對。匯入不會覆蓋相同 ID 的現有 Connector。

## 憑據：服務與可複用金鑰 {/* #凭据服务与可复用密钥 */}

在[服務憑據](../tools/credentials.md)建立和管理金鑰，再在環境變數、請求頭或 OAuth 繫結中選擇其名稱。換裝置後重新繫結並完成服務登入，再測試連線。匯出檔案包含配置引用，不包含可直接使用的秘密或本地信任。

## 查詢 HTTP 報錯 {/* #查询-http-报错 */}

遇到 400、401、403、404、429 或 5xx 響應時，檢視 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同時記錄返回錯誤的服務與詳細訊息。
