---
title: "Task SDK 與本地 API"
last_update:
  date: '2026-09-22'
---

# Task SDK 與本地 API {/* #task-sdk-与本地-api */}

`@aipoch/open-science` Node.js 客戶端連線經過認證的本地應用服務，用於管理任務、會話、Connector 和共享憑據。公共 SDK 方法與 Electron preload 呼叫、Agent 內部 `host` API 分開。

<span id="连接并使用真实-id" />

## 連線、執行任務並下載結果 {/* #连接运行任务并下载结果 */}

<p className="example-label"><strong>示例</strong> 儲存並下載連線檢查說明</p>

使用 Node.js 22.5 或更高版本。在同一臺電腦開啟桌面應用，完成模型設定並保持執行。SDK 透過本地服務發現及儲存的本地令牌連線。獨立守護程序的準備見[無介面服務](server.md)。

在一個空工作資料夾安裝客戶端：

```bash
npm init -y
npm install @aipoch/open-science
```

將下方儲存為 `connection-check.mjs`。先執行 `node connection-check.mjs` 列出專案 ID，再執行 `node connection-check.mjs PROJECT_ID`，將佔位符換成返回的 ID。第一次呼叫在列出專案後主動停止；第二次才會建立小任務。

```js
import {connectToOpenScience} from '@aipoch/open-science';
import {writeFile} from 'node:fs/promises';

const client = await connectToOpenScience();
const projects = await client.listProjects();
const projectId = process.argv[2];
if (!projects.some((project) => project.id === projectId)) {
  console.table(projects.map(({id, name}) => ({id, name})));
  console.log('Run again with a project ID from this list. Create a project in the app if the list is empty.');
  process.exit(projectId ? 1 : 0);
}
const run = await client.startRun({
  project: projectId,
  prompt: 'Save a short Markdown file named project-note.md explaining that this is a connection check. Do not read project inputs or use the network.',
  permissionProfile: 'ask',
});
console.log('Run:', run.id, 'Session:', run.sessionId);
const result = await client.waitForRun(run.id, {timeoutMs: 120000});
console.log(result.status, result.output ?? result.error ?? '');
if (result.status !== 'completed') {
  throw new Error('Inspect the run in the application before continuing.');
}
const artifacts = await client.listArtifacts(run.sessionId);
console.table(artifacts.map(({id, name, path}) => ({id, name, path})));
const artifact = artifacts.find((item) =>
  item.name === 'project-note.md' || item.path.endsWith('/project-note.md'));
if (!artifact) throw new Error('No matching saved artifact; inspect the response.');
const response = await client.downloadArtifact(artifact.id);
await writeFile('project-note.download.md', new Uint8Array(await response.arrayBuffer()));
console.log('Saved project-note.download.md; open and check its contents.');
```

保持桌面會話開啟。如果 **Ask for approval** 暫停任務，在應用中回應。等待超時只停止客戶端輪詢，不會取消任務。用輸出的 run ID 呼叫 `getRun` 檢查，處理請求後繼續等待；需要停止時才呼叫 `cancelRun`。只有找到匹配的已儲存產物才會下載，開啟下載的 Markdown 即完成檢查。

此程式說明公共 API 契約，不假設模型總能儲存指定檔案。如果無法安裝 npm 包，可使用匹配原始碼中附帶的 SDK 資料夾作為本地包；安裝前確認其包後設資料。

### 任務已完成，但檔案下載失敗 {/* #任务已完成但文件下载失败 */}

已完成 Task 記錄丟失產物版本身份導致的一類錯誤，已在[下載更新](../changelog/v0.29.0.md)中修復。舊版應用應先更新，再重試同一儲存檔案；其他 HTTP 500 原因仍需排查。

任務完成與產物下載是兩項獨立檢查。如果 `downloadArtifact` 返回 HTTP **500** / `internal_error`，先用 `getRun` 和 `listArtifacts` 確認任務狀態，保留準確的返回產物 ID。不要為了重試下載而重新執行整個研究任務。

在應用內開啟產物，檢查內容是否可用。預覽正常不代表 SDK 下載成功。透過[故障反饋](../guides/troubleshooting.md)提供 run ID、artifact ID 和下載錯誤，去掉認證 token。同一故障也可能影響 CLI 的 `artifacts download` 命令。

## 檢查就緒狀態並準備 Codex {/* #runtime-api */}

| SDK 方法 | HTTP 資源 | 用途 |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | 檢查就緒狀態和後續操作 |
| `listRuntimes()` | `GET /api/v1/runtimes` | 列出框架、狀態、可用版本和應用管理/外部來源 |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | 檢查首次設定狀態 |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | 透過受支援的首次設定流程，準備或修復應用管理的 Codex 執行時 |
| `installCli()` | `POST /api/v1/cli/install` | 安裝本地 PATH 命令入口 |

設定寫操作需要經過認證的本地服務。檢查返回的 `ok` 和錯誤碼，配置衝突處理後再重試。客戶端超時不能證明已經接受的安裝被取消，發起另一輪安裝前先重新檢查就緒狀態。訂閱登入或透過指定環境變數提供憑據，見[終端設定流程](cli.md#terminal-setup)。

## 方法與 HTTP 資源 {/* #方法与-http-资源 */}

| SDK 方法 | HTTP 資源 | 用途 |
| --- | --- | --- |
| `listProjects`、`createProject` | GET/POST `/api/v1/projects` | 讀取/建立專案 |
| `updateProject` | PATCH `/api/v1/projects/:id` | 更新後設資料/上下文 |
| `getProjectSessionDefaults`、`updateProjectSessionDefaults` | GET/PATCH `/api/v1/projects/:id/session-defaults` | 新會話預設配置 |
| `listSessions` | GET `/api/v1/sessions?project=ID` | 會話摘要 |
| `getSession` | GET `/api/v1/sessions/:id` | 單個會話 |
| `getSessionConfiguration`、`updateSessionConfiguration` | GET/PATCH `/api/v1/sessions/:id/config` | 會話配置 |
| `getAgentRouting`、`updateAgentRouting` | GET/PATCH `/api/v1/settings/agent-routing` | 全域框架和模型路由 |
| `getSessionPlan` | GET `/api/v1/sessions/:id/plan` | 活動計劃 |
| `respondSessionPlan` | POST `/api/v1/sessions/:id/plan/respond` | 以精確版本/修訂回應計劃 |
| `startRun` | POST `/api/v1/runs` | 接納任務 |
| `getRun`、`cancelRun` | GET `/api/v1/runs/:id`、POST `/api/v1/runs/:id/cancel` | 查詢/取消執行 |
| `listArtifacts` | GET `/api/v1/sessions/:id/artifacts` | 託管產物描述 |
| `downloadArtifact` | 產物下載響應 | 流式讀取 Response body |
| `waitForRun` | SDK 輪詢 Run 狀態 | 帶取消/截止時間的等待 |
| `events` | SDK 事件迭代器 | 有序活動、重連和重新同步 |

請求籤名以[方法定義與精確路由](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs)為準，表格不意味著任意 Electron 內部端點都屬於公共契約。

### Connector 管理方法 {/* #connector-管理方法 */}

| SDK 方法 | HTTP 資源 |
| --- | --- |
| listConnectors() | GET /api/v1/connectors |
| getConnector(id) | GET /api/v1/connectors/:id |
| setConnectorEnabled(id, enabled) | PUT /api/v1/connectors/:id/enabled |
| addConnector(request) | POST /api/v1/connectors |
| updateConnector(id, request) | PATCH /api/v1/connectors/:id |
| removeConnector(id) | DELETE /api/v1/connectors/:id |
| testConnector(id) | POST /api/v1/connectors/:id/test |
| listCredentials() | GET /api/v1/credentials |
| createCredential(request) | POST /api/v1/credentials |
| updateCredential(id, request) | PATCH /api/v1/credentials/:id |

最後一個引數可傳請求選項，ID 使用真實返回值。只有自定義 MCP 支援新增/編輯/刪除；更新必須提供 transport，省略的憑據繫結保持不變。構造寫入前先核對準確請求型別。

<p className="example-label"><strong>示例</strong> 測試已配置的 Connector</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` 建立獨立連線、發現工具後關閉，不呼叫研究工具、不啟用 Connector，也不發起首次 OAuth 登入。修改自定義 MCP/憑據需要本地認證，憑據後設資料不包含原始秘密。

## Run 和配置身份 {/* #run-和配置身份 */}

<p className="example-label"><strong>示例</strong> 啟動需要計劃審批的任務</p>

```js
const run = await client.startRun({
  project: projectId, // a returned ID
  prompt: 'Inspect the available project inputs and propose an analysis plan.',
  permissionProfile: 'ask',
  turnIntent: 'plan-first',
});
const state = await client.waitForRun(run.id, {
  timeoutMs: 120000,
  returnOnAttention: true,
});
console.log(state);
```

這是介面示例，不是已錄製的成功任務。等待審批的計劃可能返回仍為 running 的物件，且 `attention.kind === 'plan-approval'`。回應前讀取活動計劃和版本/修訂；普通權限請求不是同一種結構化 attention。

| 輸入/狀態 | 規則 |
| --- | --- |
| `cwd` | SDK/HTTP 提供時必須是絕對路徑，服務端校驗存在、可讀寫的規範目錄 |
| 已有 `sessionId` + `cwd` | 必須解析為該會話原工作目錄 |
| 省略 `cwd` | 使用應用託管工作區 |
| 外部工作區 | 保持呼叫者所有，不被應用刪除 |
| 會話配置寫入 | `expectedRevision`，拒絕過期值 |
| 專案預設值寫入 | `expectedUpdatedAt` 與 `patch`，拒絕併發覆蓋 |
| 新會話優先順序 | 明確 Run 請求 → 專案預設值 → 應用設定 → 提供方預設值 |
| 修改專案預設值 | 影響新會話，不重寫現有會話 |

先讀配置再修改。提供方/模型/推理強度是組合配置，引用資源還必須適用於所選框架。除明確清空外，保留省略的設定。

## 截止時間和重試身份 {/* #截止时间和重试身份 */}

客戶端請求預設 30 秒，包括讀取響應 body 的時間。可以在客戶端/連線初始化使用 `requestTimeoutMs`，或在支援的方法最後傳入 `{signal, timeoutMs}`。產物下載的截止時間在 body 流式讀取期間仍有效。

`waitForRun` 的整體超時和 signal 同時作用於輪詢請求和等待。等待超時不會取消伺服器任務。需要取消時明確呼叫 `cancelRun(run.id)`，等待收尾後再判斷產物是否穩定。

專案建立和 Run 接納的安全重試可在最後選項中提供 `idempotencyKey`，每次使用同一 key 和同一 body。重放有界且僅屬於當前程序，daemon 持續執行時最多保留 24 小時。相同 key 搭配不同 body 返回 `idempotency_conflict`；重放登錄檔耗盡可返回 `idempotency_unavailable`。這不保證跨 daemon 重啟重放。

## 事件流邊界 {/* #事件流边界 */}

需要最早事件時，先訂閱並等待 `events.ready`，再啟動任務。事件含 sequence 和 run/session/project 標識。`run.progress` 提供框架中立階段，首個可見輸出前每十秒提供活動更新；Run 註冊前的會話準備時間不在此事件流內。

| 訊號 | 含義 | 處理 |
| --- | --- | --- |
| `events.ready` 拒絕 | 可用連線建立前失敗 | 解決原因後重連 |
| 預設 30 秒空閒超時 | 沒有收到事件或控制心跳 | 檢查連線，不等同於模型執行超時 |
| `event_stream_invalid_message` | 幀格式無效 | 停止該流並重新建立狀態 |
| `event_stream_overflow` | 消費積壓超過 1,024 項 | 處理背壓，重讀權威狀態 |
| `stream.resync-required` | 重放字尾過期或流變化 | 透過 HTTP 讀取當前 Run/Session |

連線心跳屬於控制幀，不作為普通研究事件交給消費者。重連重放有界且屬於當前程序；整合側應儲存所需產物 ID 和最終 Run 狀態。

[SDK 原始碼](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs)、[契約說明](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md)。Shell 自動化見 [CLI](./cli.md)，發現與生命週期見[無介面服務](./server.md)。

原始碼：[方法簽名](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts)、[路由](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs)。配置及診斷邊界見 [CLI 管理欄位](cli.md)。

## 無人值守任務 {/* #unattended-runs */}

在 `startRun` 的輸入中設定 `permissionPrompts: 'none'`，對應 CLI 的 `--permission-prompts none`。仍需設定合適的 `permissionProfile`；此選項拒絕尚需人工處理的請求，不會擴大任務授權。不要與 `planFirst: true` 組合。

主機必須宣告 `permission-prompts-none` 能力；不支援時客戶端會在建立任務前報告 `unsupported_capability`。此策略僅限當前呼叫，執行結果仍需按狀態和錯誤處理。詳見 [CLI 無人值守執行](cli.md#unattended-runs)。
