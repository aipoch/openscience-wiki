---
title: "Skill、專家與 MCP 格式"
last_update:
  date: '2026-09-08'
---

# Skill、專家與 MCP 格式 {/* #skill专家与-mcp-格式 */}

Skill、Specialist 和 Connector 模板具有不同打包邊界。本頁集中列出欄位與匯入預算。匯入前檢視壓縮包預覽，匯入後檢查安裝結果。

## Skill 文件和資源 {/* #skill-文档和资源 */}

Skill 根目錄包含 `SKILL.md`，引用檔案和指令碼位於同一包根目錄下。YAML 後設資料之後是 Markdown 指令。

<p className="example-label"><strong>示例</strong> 最小 SKILL.md 文件</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

解析器分離 `name`、`description` 和其他後設資料，規範換行並將標量後設資料保留為字串。釋出包前檢查匯入/編輯器的校驗結果。

| 內容 | 用途 | 邊界 |
| --- | --- | --- |
| `name` | 穩定呼叫身份 | 與包引用保持一致 |
| `description` | 何時選擇此 Skill | 不會自行執行 |
| Markdown 正文 | 呼叫後載入的指令 | 指令可用不代表外部依賴已存在 |
| 相對資源 | 指令碼、模板、參考資料和資料 | 引用路徑應符合包目錄結構 |
| 根目錄 `.source.json`、`.specialist-package.json` | 應用擁有的後設資料 | 不計入使用者內容預算，不自行編造或挪用 |

### Skill 匯入預算 {/* #skill-导入预算 */}

| 限制 | 數值 |
| --- | ---: |
| 單 Skill 檔案數 | 16,384 |
| 單個解壓檔案 | 50 MiB |
| 單 Skill 解壓總量 | 128 MiB |
| 單次預覽原始 SKILL.md 總量 | 4 MiB |
| 目錄深度 | 8 層 |
| 每次 GitHub 匯入請求 | 512 |
| 內層 Skill 壓縮包 | 64 MiB |
| 外層上傳包 | 256 MiB |
| 每包 Skill 數 | 256 |
| 外層包條目 | 32,768 |

各預算作用層級不同。外層包合規，內部某個 Skill 仍可能超限。逐項檢查候選診斷，不把部分匯入視為全部成功。個人編輯器的引用檔案額度為 SKILL.md 預留一個包條目。

[解析器](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts)、[匯入限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts)。

## Specialist 包 {/* #specialist-包 */}

可移植包包含 `manifest.json` 和 `specialist.json`。附帶 Skill 位於 `skills/<skill-name>/<file>`，每個 Skill 根目錄包含 `SKILL.md`，其 frontmatter 名稱必須與目錄名一致。

| 檔案/欄位 | 約束 |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | 包身份，貢獻 ID 使用小寫字母、數字和連字元，避開 `os-` / `mcp-` 保留字首 |
| `version` | 語義版本 |
| `exported_with_app_version` | 匯出應用版本 |
| `specialist.json → name` | 穩定 profile 名 |
| `display_name` | 可選展示名 |
| `description` | 角色描述 |
| `system_prompt` | 指令，包邊界採用 snake_case |
| `skill_ids` | 非空 Skill 名稱陣列，不重複 |
| `connector_ids` | 非空 Connector 名稱陣列，不重複 |

未知或禁止欄位會被拒絕。記憶體物件使用 camelCase（`systemPrompt`、`skillIds`、`connectorIds`），不要與可移植 JSON 拼寫混淆。Connector 可移植名稱在匯入時解析為本機 ID，包引用不攜帶本機憑據。

| Specialist 壓縮包限制 | 數值 |
| --- | ---: |
| 壓縮大小 | 50 MiB |
| 解壓總量 | 200 MiB |
| 檔案數 | 2,000 |
| 單檔案 | 25 MiB |
| 壓縮比 | 1,000 |
| 路徑深度 | 32 |

預覽報告診斷、可安裝狀態和每個 Skill 的安裝/複用/衝突/替換決定。覆蓋需要明確確認，候選過期或狀態變化後應重新預覽，不能盲目重放舊 token。衝突需要明確選擇已安裝或傳入版本。

匯出使用期望修訂和勾選的 Skill。刪除也根據預覽/修訂執行，並保護內建、主代理啟用、共享或被引用的 Skill。刪除某個 Specialist 不等於刪除其全部能力包。

[型別與預算](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts)、[包校驗](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts)。

## Connector 模板與 MCP 客戶端格式 {/* #connector-模板与-mcp-客户端格式 */}

Open-Science Connector 模板不是 MCP 客戶端 `mcpServers` JSON 的同一種文件。

| 模板欄位 | 約束 |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | 穩定自定義名，最多 64 字元，小寫字母/數字/連字元，唯一且非內建保留名 |
| `display_name` | 展示標籤 |
| `description` | 可選說明 |
| `transport` | `stdio`、`streamable_http` 或 `sse` |
| `command`、`args` | 本地 stdio 程式及引數陣列 |
| `url` | 遠端 HTTP/SSE 地址 |
| `required_secrets.environment` | stdio 環境秘密的名稱，不是值 |
| `required_secrets.headers` | HTTP 秘密請求頭名稱，不是值 |
| `required_secrets.oauth_client_secret` | 是否需要在本地提供 OAuth client secret |
| `oauth` | 支援的註冊、issuer、scope、client、redirect 後設資料 |

傳輸型別有各自校驗：遠端傳輸不接受環境秘密要求；OAuth 不能與必需秘密請求頭同時配置。預註冊 client 需要 authorization server；client metadata 註冊和明確 client ID 是兩種模式。redirect/client-secret 後設資料需要對應 client ID。

可移植匯出拒絕 URL 或命令引數中的內嵌憑據。MCP 客戶端格式使用 `mcpServers`，stdio 提供 `command`/`args`/`env`，遠端提供 `type`/`url`/`headers`，秘密以佔位符表示。OAuth 註冊和 token 不包含在客戶端格式中，匯出會提示這一限制。

匯入配置不等於安裝外部伺服器、登入服務或成功呼叫工具。透過應用補充憑據後，還需確認連線狀態和實際公佈的工具。

[模板解析及兩種匯出](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts)、[自定義身份](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts)。
