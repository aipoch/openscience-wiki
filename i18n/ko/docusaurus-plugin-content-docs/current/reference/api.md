---
title: "작업 SDK 및 로컬 API"
last_update:
  date: '2026-09-22'
---

# 작업 SDK 및 로컬 API {/* #task-sdk-and-local-api */}

`@aipoch/open-science` Node.js 클라이언트는 작업, 세션, 커넥터 및 공유 자격 증명을 관리하기 위해 인증된 로컬 애플리케이션 서비스에 연결됩니다. Public SDK 메서드는 Electron preload 호출과 에이전트의 내부 `host` API에서 분리됩니다.

<span id="connect-and-select-real-ids" />

## 연결, 작업을 실행하고 출력을 다운로드 {/* #connect-run-a-task-and-download-its-output */}

<p className="example-label"><strong>예시</strong> 연결 확인 메모 저장 및 다운로드</p>

Node.js 22.5 이상을 사용하십시오. 동일한 기계에 설치된 탁상용 신청을 열고, 모형 체제를 완료하고 그것을 달리십시오. SDK은 로컬 서비스 발견과 로컬 스토리지 토큰을 사용합니다. 별도의 데몬을 위해 먼저 [Headless 서비스](server.md)을 따르십시오.

빈 작업 폴더에서 클라이언트를 설치:

```bash
npm init -y
npm install @aipoch/open-science
```

`connection-check.mjs`로 다음을 저장합니다. `node connection-check.mjs`을 목록 프로젝트 ID로 실행하고, `node connection-check.mjs PROJECT_ID`을 한 반환 ID로 설정합니다. 첫 번째 invocation deliberately는 목록 프로젝트 후 중지합니다. 두 번째는 작은 작업을 만듭니다.

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

데스크탑 세션을 엽니다. **Ask for approval**이 작업을 일시 중지하는 경우 응답합니다. 대기 타임 아웃은 클라이언트 투표를 중지; 실행을 취소하지 않습니다. `getRun`과 인쇄된 실행 ID를 검사하고, 요청을 다시 해결하거나, `cancelRun`을 호출하여 중지 할 때 기다리십시오. 다운로드는 일치하는 저장된 artifact가 존재할 때만 성공합니다; 확인을 완료하기 위해 다운로드 된 Markdown을 엽니다.

이 프로그램은 공개 API 컨트랙트를 보여줍니다. 모델이 항상 요청한 파일을 저장한다는 것을 가정하지 않습니다. npm 패키지가 설치될 수 없는 경우, 해당 소스 체크 아웃과 함께 제공되는 SDK 폴더를 로컬 패키지로 사용하십시오. 설치하기 전에 패키지 메타데이터를 확인합니다.

### 파일이 다운로드되지 않는 완성 된 작업 {/* #a-completed-task-whose-file-will-not-download */}

이 오류의 원인은 완료된 작업 레코드에서 artifact 버전 정체성을 제거하고 [다운로드 update](../changelog/v0.29.0.md)에 고정됩니다. 이전 앱에서 동일한 저장된 파일을 복원하기 전에 업데이트하십시오. 다른 HTTP 500는 여전히 진단을 요구합니다.

작업 완료 및 artifact 다운로드는 별도의 체크입니다. `downloadArtifact`가 HTTP **500** / `internal_error`을 반환하면 `getRun` 및 `listArtifacts`를 호출하여 작업 상태를 확인하고 정확한 반환된 artifact ID를 유지합니다. 같은 연구 작업을 다시 다시 시작하지 마십시오. 다운로드를 복원합니다.

응용 프로그램에서 artifact를 열고 내용이 사용할 수 있는지 확인하십시오. 작업 미리보기는 SDK 다운로드가 성공한 것을 설정하지 않습니다. 실행 ID, artifact ID 및 [진단 보고](../guides/troubleshooting.md)에서 오류를 다운로드 포함; omit 인증 토큰. 동일한 실패는 CLI의 `artifacts download` 명령에 영향을 미칠 수 있습니다.

## 검사 준비 Codex {/* #runtime-api */}

| SDK 방법 | HTTP 자원 | 제품정보 |
| --- | --- | --- |
| `doctor()` | `GET /api/v1/doctor` | Inspect readiness 및 다음 작업. |
| `listRuntimes()` | `GET /api/v1/runtimes` | 목록 프레임 워크, 상태, 옵션 버전 및 관리 / 외부 소스. |
| `bootstrap({action: "status"})` | `POST /api/v1/bootstrap` | 첫 번째 실행 설정 상태를 검사합니다. |
| `bootstrap({action: "runtime"})` | `POST /api/v1/bootstrap` | 지원된 부트 스트랩 흐름을 통해 관리된 Codex 런타임을 준비하거나 수리하십시오. |
| `installCli()` | `POST /api/v1/cli/install` | 로컬 PATH 발사기를 설치합니다. |

Setup mutations는 정통 현지 서비스를 요구합니다. 반환된 `ok` 및 오류 코드 확인; 구성 분쟁은 재발송하기 전에 해결되어야 합니다. 클라이언트 타임아웃은 허용된 설치가 취소되었는지 설정하지 않습니다. 다른 설치를 시작하기 전에 recheck readiness. 구독 로그인 또는 name-environment-variable credential 입력을 위해, [터미널 설정 흐름](cli.md#terminal-setup)를 사용하십시오.

## 방법 및 HTTP 자원 {/* #methods-and-http-resources */}

| SDK 방법 | HTTP 자원 | 제품정보 |
| --- | --- | --- |
| `listProjects`, `createProject` | 구매/배송 `/api/v1/projects` | 읽기 / 만들기 프로젝트 |
| `updateProject` | 파트치 `/api/v1/projects/:id` | 프로젝트 metadata/context를 업데이트하십시오 |
| `getProjectSessionDefaults`, `updateProjectSessionDefaults` | 구매/배송 `/api/v1/projects/:id/session-defaults` | 새로 생성된 세션의 기본값 |
| `listSessions` | 이름 &#42; `/api/v1/sessions?project=ID` | 세션 요약 읽기 |
| `getSession` | 이름 &#42; `/api/v1/sessions/:id` | 한 세션을 읽으십시오 |
| `getSessionConfiguration`, `updateSessionConfiguration` | 구매/배송 `/api/v1/sessions/:id/config` | Read/update 세션 구성 |
| `getAgentRouting`, `updateAgentRouting` | 구매/배송 `/api/v1/settings/agent-routing` | 글로벌 프레임워크/리뷰어/Subagent routing |
| `getSessionPlan` | 이름 &#42; `/api/v1/sessions/:id/plan` | Active 계획 상태 읽기 |
| `respondSessionPlan` | POST 소개 `/api/v1/sessions/:id/plan/respond` | 정확한 결정/version/revision에 응답 |
| `startRun` | POST 소개 `/api/v1/runs` | 런을 광고 |
| `getRun`, `cancelRun` | 이름 &#42; `/api/v1/runs/:id`의 POST `/api/v1/runs/:id/cancel` | Inspect/cancel 실행 |
| `listArtifacts` | 이름 &#42; `/api/v1/sessions/:id/artifacts` | 관리 산출 descriptors를 읽으십시오 |
| `downloadArtifact` | Artifact 다운로드 응답 | 저장된 산출을 시내하십시오; 반환된 응답 몸을 소비하십시오 |
| `waitForRun` | 실행 상태에 SDK polling | 취소 / 취소 옵션 |
| `events` | SDK 이벤트 iterator | 지정된 활동 및 reconnect/resync 신호를 관찰하십시오 |

[방법 정의 및 정확한 경로](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs)은 요청 시그널을 위한 권한이 있는 조회입니다. 테이블은 arbitrary Electron/internal endpoints를 호출하는 권한이 없습니다.

### Connector 관리 방법 {/* #connector-management-methods */}

| SDK 방법 | HTTP 자원 |
| --- | --- |
| 목록커넥터() | /api/v1/connectors 받기 |
| getConnector(id) | GET /api/v1/connectors/:id |
| setConnectorEnabled(id, 활성화) | PUT /api/v1/connectors/:id/enabled |
| addConnector(복구) | POST /api/v1/connectors |
| updateConnector(id, 요청) | PATCH /api / v1 / 연결기 /:id |
| removeConnector (id)를 제거하십시오 | 종료 /api/v1/connectors/:id |
| testConnector (id)를 | POST /api/v1/connectors/:id/test |
| 목록Credentials() | /api/v1/credentials 받기 |
| createCredential(복사) | POST /api/v1/credentials에 관하여 |
| updateCredential(id, 요청) | 포장 /api/v1/credentials/:id |

메서드는 최종 인수로 요청 옵션을 수락합니다. 반환된 안정 ID를 사용하십시오. 사용자 정의 MCP 정의 지원 create/edit/remove; 업데이트는 수송을 요구하고 omitted credential 바인딩을 보존합니다. mutation을 건설하기 전에 정확한 요청 유형을 읽으십시오.

<p className="example-label"><strong>예시</strong> 형성된 Connector를 시험하십시오</p>

~~~js
const connectors = await client.listConnectors();
console.log(connectors);
// Use an actual returned custom Connector ID:
const result = await client.testConnector(connectorId);
console.log(result.success, result.toolCount, result.message);
~~~

`testConnector`는 격리된 연결, 공구를 발견하고 그것을 닫습니다. 연구 도구를 호출하지 않고 Connector 또는 처음 OAuth Sign-in을 시작합니다. MCP/credential 변화는 국부적으로 입증을 요구합니다; credential metadata omits 익지않는 비밀.

## 실행 및 구성 ID {/* #run-and-configuration-identity */}

<p className="example-label"><strong>예시</strong> 계획 승인에 대한 일시 중지</p>

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

대기 계획은 `attention.kind === 'plan-approval'`과 여전히 실행 객체를 반환 할 수 있습니다. 응답하기 전에 활성 계획 및 버전 / 개정을 읽으십시오. 시각적으로 검토하려면 응용 프로그램에서 인쇄 된 세션을 열고, 응용 프로그램 또는 계획을 수정, 다음 `waitForRun(run.id)`을 다시 시작합니다. API 전용 결정의 경우 `getSessionPlan` 및 `respondSessionPlan`를 사용하여 정확한 버전 / 개정; [계획 명령](cli.md) 참조. 일반 권한 프롬프트는 동일한 구조주의 상태가되지 않습니다.

| 입력/전류 | 【특전】 |
| --- | --- |
| `cwd` | SDK/HTTP를 통해 공급되는 경우에, 절대되어야 합니다; 서버 canonicalizes 및 기존 readable/writable 디렉토리를 확인 |
| 기존 `sessionId` + `cwd` | 해당 세션의 기록된 디렉토리에 해결해야 합니다. |
| 지원하다 `cwd` | Application-managed 작업 공간 사용 |
| 외부 작업 공간 | Remains caller 소유하고 응용 프로그램에 의해 삭제되지 않습니다. |
| 세션 설정 쓰기 | 기타 제품 `expectedRevision`; reject stale 쓰기 |
| Project-default 쓰기 | 기타 제품 `expectedUpdatedAt` 더 보기 `patch`; reject 동시 편집 |
| 신조정신 | Explicit run request → 프로젝트 기본값 → 애플리케이션 설정 → 공급자 기본값 |
| 변경된 프로젝트 기본값 | 새로운 세션; 기존 세션을 다시 작성하지 마십시오. |

편집하기 전에 구성을 읽으십시오. 공급자/model/effort 변화는 화합물 윤곽이고, 참고된 자원은 선택된 기구에 유효해야 합니다. 불쾌하게 하지 않는 설정을 보존합니다.

## Deadlines and retry 정체성 {/* #deadlines-and-retry-identity */}

클라이언트 요청 마감은 30 초로 기본값이며 응답체를 소모하면서 활성화됩니다. `requestTimeoutMs`을 연결/클라이언트 설정 또는 `{signal, timeoutMs}`에서 지원되는 방법의 최종 옵션 인수로 설정합니다. `downloadArtifact`은 반환된 바디 스트림 동안 마감 시간을 유지합니다.

`waitForRun`에는 자체 전체적인 타임아웃 및 신호가 있으며, 투표 요청 및 지연에 적용됩니다. 대기 시간은 서버 실행을 취소하지 않습니다. `cancelRun(run.id)`을 명시적으로 호출하면 취소가 예정되고 정착 된 것과 같은 artifact를 치료하기 전에 최종화를 기다립니다.

retry-safe 프로젝트 생성 및 입학을 위해, 최종 옵션 인수에서 `idempotencyKey`을 통과하고 동일한 신체와 동일한 키를 재사용합니다. Replay는 24 시간까지 유지하고 프로세스 로컬에 바인딩되어 daemon가 실행되는 동안. 변경된 몸 반환 `idempotency_conflict`; 배기 재생 레지스트리는 `idempotency_unavailable`을 반환 할 수 있습니다. daemon 재시작은 튼튼한 cross-restart 재생 보증이 아닙니다.

## 이벤트 스트림 경계 {/* #event-stream-boundaries */}

구독하고 `events.ready`을 기다리고 있습니다. 초기 실행 이벤트가 필요한 경우. iterator는 순서와 run/session/project 식별자를 나릅니다. `run.progress`에는 공급자 중립 단계 및 첫번째 눈에 보이는 공급자 산출의 앞에 10 초 liveness 갱신을 포함합니다; 등록을 실행하기 전에 세션 준비는 스트림 밖에있다.

| (주) | 회사연혁 | 관련 기사 |
| --- | --- | --- |
| `events.ready` 관련 제품 | 연결은 usable liveness의 앞에 실패했습니다 | 원인을 해결 한 후 재연결 |
| 기본 30-second idle 타임아웃 | 이벤트/제어 heartbeat 없음 도착 | 연결 확인; 이것은 모델 실행 timeout이 아닙니다 |
| `event_stream_invalid_message` | Malformed 이벤트 프레임 | 스트림 및 세 가지 설정 상태 유지 |
| `event_stream_overflow` | 소비자 backlog는 1,024 이벤트를 초과합니다. | 손잡이 backpressure와 reread 권한 상태 |
| `stream.resync-required` | Replay suffix 만료 또는 스트림 변경 | HTTP를 통해 Fetch 현재 Run/Session |

연결 heartbeats는 통제 구조이고 정규적인 연구 사건으로 산출되지 않습니다. Reconnect replay는 경계되고 현재 과정에 속합니다. 자신의 통합에 필요한 artifact ID 및 최종 실행 상태를 주장합니다.

[SDK 소스](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/index.mjs), [SDK 계약 노트](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/README.md). 쉘 자동화 및 [Headless 서비스](./server.md)에 대한 [CLI](./cli.md)을 참조하십시오.

출처: [계정 관리](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.d.ts), [오시는 길](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/index.mjs). 구성 및 진단 경계를 위한 [CLI 관리 분야](cli.md#manage-connectors-and-credentials)를 보십시오.

## 실패한 작업 {/* #unattended-runs */}

CLI `--permission-prompts none`에 대응하는 `startRun` 입력에 `permissionPrompts: 'none'`을 설정합니다. 적절한 `permissionProfile` 유지: 이 옵션은 해결되지 않은 인간의 상호 작용을 감소시키고 허가를 확장하지 않습니다. `planFirst: true`과 결합하지 마십시오.

호스트는 `permission-prompts-none` 기능을 선언해야합니다; 그렇지 않으면 클라이언트가 실행을 만들기 전에 `unsupported_capability`을보고합니다. 이 정책은 현재 주장에만 적용됩니다. 런의 실제 상태와 오류를 평소처럼 취급합니다. [무인 CLI 실행](cli.md#unattended-runs) 참조.
