---
title: "Task SDK 与本地 API"
last_update:
  date: '2026-09-22'
---

# Task SDK 与本地 API

`@aipoch/open-science` Node.js 客户端连接经过认证的本地应用服务，用于管理任务、会话、Connector 和共享凭据。公共 SDK 方法与 Electron preload 调用、Agent 内部 `host` API 分开。

<span id="连接并使用真实-id" />

## 连接、运行任务并下载结果

<p className="example-label"><strong>示例</strong> 保存并下载连接检查说明</p>

使用 Node.js 22.5 或更高版本。在同一台电脑打开桌面应用，完成模型设置并保持运行。SDK 通过本地服务发现及保存的本地令牌连接。独立守护进程的准备见[无界面服务](server.md)。

在一个空工作文件夹安装客户端：

```bash
npm init -y
npm install @aipoch/open-science
```

将下方保存为 `connection-check.mjs`。先运行 `node connection-check.mjs` 列出项目 ID，再运行 `node connection-check.mjs PROJECT_ID`，将占位符换成返回的 ID。第一次调用在列出项目后主动停止；第二次才会创建小任务。

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

保持桌面会话打开。如果 **Ask for approval** 暂停任务，在应用中回应。等待超时只停止客户端轮询，不会取消任务。用输出的 run ID 调用 `getRun` 检查，处理请求后继续等待；需要停止时才调用 `cancelRun`。只有找到匹配的已保存产物才会下载，打开下载的 Markdown 即完成检查。

此程序说明公共 API 契约，不假设模型总能保存指定文件。如果无法安装 npm 包，可使用匹配源码中附带的 SDK 文件夹作为本地包；安装前确认其包元数据。

### 任务已完成，但文件下载失败

已完成 Task 记录丢失产物版本身份导致的一类错误，已在[下载更新](../changelog/v0.29.0.md)中修复。旧版应用应先更新，再重试同一保存文件；其他 HTTP 500 原因仍需排查。

任务完成与产物下载是两项独立检查。如果 `downloadArtifact` 返回 HTTP **500** / `internal_error`，先用 `getRun` 和 `listArtifacts` 确认任务状态，保留准确的返回产物 ID。不要为了重试下载而重新运行整个研究任务。

在应用内打开产物，检查内容是否可用。预览正常不代表 SDK 下载成功。通过[故障反馈](../guides/troubleshooting.md)提供 run ID、artifact ID 和下载错误，去掉认证 token。同一故障也可能影响 CLI 的 `artifacts download` 命令。

## 检查就绪状态并准备 Codex {/* #runtime-api */}

| SDK 方法 | HTTP 资源 | 用途 |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | 检查就绪状态和后续操作 |
| `listRuntimes()` | `GET /api/v1/runtimes` | 列出框架、状态、可用版本和应用管理/外部来源 |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | 检查首次设置状态 |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | 通过受支持的首次设置流程，准备或修复应用管理的 Codex 运行时 |
| `installCli()` | `POST /api/v1/cli/install` | 安装本地 PATH 命令入口 |

设置写操作需要经过认证的本地服务。检查返回的 `ok` 和错误码，配置冲突处理后再重试。客户端超时不能证明已经接受的安装被取消，发起另一轮安装前先重新检查就绪状态。订阅登录或通过指定环境变量提供凭据，见[终端设置流程](cli.md#terminal-setup)。

## 方法与 HTTP 资源

| SDK 方法 | HTTP 资源 | 用途 |
| --- | --- | --- |
| `listProjects`、`createProject` | GET/POST `/api/v1/projects` | 读取/创建项目 |
| `updateProject` | PATCH `/api/v1/projects/:id` | 更新元数据/上下文 |
| `getProjectSessionDefaults`、`updateProjectSessionDefaults` | GET/PATCH `/api/v1/projects/:id/session-defaults` | 新会话默认配置 |
| `listSessions` | GET `/api/v1/sessions?project=ID` | 会话摘要 |
| `getSession` | GET `/api/v1/sessions/:id` | 单个会话 |
| `getSessionConfiguration`、`updateSessionConfiguration` | GET/PATCH `/api/v1/sessions/:id/config` | 会话配置 |
| `getAgentRouting`、`updateAgentRouting` | GET/PATCH `/api/v1/settings/agent-routing` | 全局框架和模型路由 |
| `getSessionPlan` | GET `/api/v1/sessions/:id/plan` | 活动计划 |
| `respondSessionPlan` | POST `/api/v1/sessions/:id/plan/respond` | 以精确版本/修订回应计划 |
| `startRun` | POST `/api/v1/runs` | 接纳任务 |
| `getRun`、`cancelRun` | GET `/api/v1/runs/:id`、POST `/api/v1/runs/:id/cancel` | 查询/取消执行 |
| `listArtifacts` | GET `/api/v1/sessions/:id/artifacts` | 托管产物描述 |
| `downloadArtifact` | 产物下载响应 | 流式读取 Response body |
| `waitForRun` | SDK 轮询 Run 状态 | 带取消/截止时间的等待 |
| `events` | SDK 事件迭代器 | 有序活动、重连和重新同步 |

请求签名以[方法定义与精确路由](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs)为准，表格不意味着任意 Electron 内部端点都属于公共契约。

### Connector 管理方法

| SDK 方法 | HTTP 资源 |
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

最后一个参数可传请求选项，ID 使用真实返回值。只有自定义 MCP 支持新增/编辑/删除；更新必须提供 transport，省略的凭据绑定保持不变。构造写入前先核对准确请求类型。

<p className="example-label"><strong>示例</strong> 测试已配置的 Connector</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector` 建立独立连接、发现工具后关闭，不调用研究工具、不启用 Connector，也不发起首次 OAuth 登录。修改自定义 MCP/凭据需要本地认证，凭据元数据不包含原始秘密。

## Run 和配置身份

<p className="example-label"><strong>示例</strong> 启动需要计划审批的任务</p>

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

这是接口示例，不是已录制的成功任务。等待审批的计划可能返回仍为 running 的对象，且 `attention.kind === 'plan-approval'`。回应前读取活动计划和版本/修订；普通权限请求不是同一种结构化 attention。

| 输入/状态 | 规则 |
| --- | --- |
| `cwd` | SDK/HTTP 提供时必须是绝对路径，服务端校验存在、可读写的规范目录 |
| 已有 `sessionId` + `cwd` | 必须解析为该会话原工作目录 |
| 省略 `cwd` | 使用应用托管工作区 |
| 外部工作区 | 保持调用者所有，不被应用删除 |
| 会话配置写入 | `expectedRevision`，拒绝过期值 |
| 项目默认值写入 | `expectedUpdatedAt` 与 `patch`，拒绝并发覆盖 |
| 新会话优先级 | 明确 Run 请求 → 项目默认值 → 应用设置 → 提供方默认值 |
| 修改项目默认值 | 影响新会话，不重写现有会话 |

先读配置再修改。提供方/模型/推理强度是组合配置，引用资源还必须适用于所选框架。除明确清空外，保留省略的设置。

## 截止时间和重试身份

客户端请求默认 30 秒，包括读取响应 body 的时间。可以在客户端/连接初始化使用 `requestTimeoutMs`，或在支持的方法最后传入 `{signal, timeoutMs}`。产物下载的截止时间在 body 流式读取期间仍有效。

`waitForRun` 的整体超时和 signal 同时作用于轮询请求和等待。等待超时不会取消服务器任务。需要取消时明确调用 `cancelRun(run.id)`，等待收尾后再判断产物是否稳定。

项目创建和 Run 接纳的安全重试可在最后选项中提供 `idempotencyKey`，每次使用同一 key 和同一 body。重放有界且仅属于当前进程，daemon 持续运行时最多保留 24 小时。相同 key 搭配不同 body 返回 `idempotency_conflict`；重放注册表耗尽可返回 `idempotency_unavailable`。这不保证跨 daemon 重启重放。

## 事件流边界

需要最早事件时，先订阅并等待 `events.ready`，再启动任务。事件含 sequence 和 run/session/project 标识。`run.progress` 提供框架中立阶段，首个可见输出前每十秒提供活动更新；Run 注册前的会话准备时间不在此事件流内。

| 信号 | 含义 | 处理 |
| --- | --- | --- |
| `events.ready` 拒绝 | 可用连接建立前失败 | 解决原因后重连 |
| 默认 30 秒空闲超时 | 没有收到事件或控制心跳 | 检查连接，不等同于模型执行超时 |
| `event_stream_invalid_message` | 帧格式无效 | 停止该流并重新建立状态 |
| `event_stream_overflow` | 消费积压超过 1,024 项 | 处理背压，重读权威状态 |
| `stream.resync-required` | 重放后缀过期或流变化 | 通过 HTTP 读取当前 Run/Session |

连接心跳属于控制帧，不作为普通研究事件交给消费者。重连重放有界且属于当前进程；集成侧应保存所需产物 ID 和最终 Run 状态。

[SDK 源码](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs)、[契约说明](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md)。Shell 自动化见 [CLI](./cli.md)，发现与生命周期见[无界面服务](./server.md)。

源码：[方法签名](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts)、[路由](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs)。配置及诊断边界见 [CLI 管理字段](cli.md)。

## 无人值守任务 {/* #unattended-runs */}

在 `startRun` 的输入中设置 `permissionPrompts: 'none'`，对应 CLI 的 `--permission-prompts none`。仍需设置合适的 `permissionProfile`；此选项拒绝尚需人工处理的请求，不会扩大任务授权。不要与 `planFirst: true` 组合。

主机必须声明 `permission-prompts-none` 能力；不支持时客户端会在创建任务前报告 `unsupported_capability`。此策略仅限当前调用，运行结果仍需按状态和错误处理。详见 [CLI 无人值守运行](cli.md#unattended-runs)。
