---
title: "CLI 및 구조 출력"
last_update:
  date: '2026-09-22'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


# CLI 및 구조 출력 {/* #cli-and-structured-output */}

`open-science`을 사용하여 애플리케이션 상태를 검사하고 작업을 실행하고 커넥터 및 자격 증명을 관리하고 로컬 서비스를 운영합니다. 설치 실행기로 시작하고 로컬 인스턴스가 연결되도록 확인합니다.

<PlatformGuide />

## 터미널에서 설정 {/* #terminal-setup */}

데스크톱 응용 프로그램을 먼저 설치하고 `open-science` 명령을 사용할 수 있습니다. CLI은 응용 프로그램의 백엔드를 사용합니다. 별도의 npm daemon이 아닙니다. Debian 패키지에는 명령이 포함되어 있습니다. 발사기가 누락된 곳에, 플랫폼 발사기를 따르거나 설치한 CLI 입장을 사용하십시오, 그 후에 `open-science cli install`.

```bash
open-science init
open-science start --no-open
open-science runtime list --json
open-science doctor --json
```

`init`은 응용 프로그램을 시작하지 않고 구성 디렉토리를 만듭니다. `--profile`는 지원된 발달 단면도를 위한 `--config-root`를 위한 별명으로 입니다; 포장된 시작은 이 overrides를 거부합니다. 1개의 예정된 단면도를 일관되게 사용하십시오. `runtime list`는 실행 실행 가능한 경로 없이 프레임 워크 읽기, 버전 및 관리/외부 소스를 검출합니다.

unconfigured Codex 설정을 위해:

```bash
open-science runtime install codex --json
open-science codex login
open-science doctor --json
```

로그인 흐름을 따르십시오. 관리된 Codex 런타임을 준비하거나 수리하고 응용 프로그램을 통해 구독을 등록합니다. 외부 Codex 로그인 파일을 가져올 수 없습니다. First-run bootstrap은 현재 Codex을 대상으로 하며, 실행시간 목록에는 다른 프레임워크가 포함되어 있습니다. 기존의 충돌 구성은 침묵적으로 대체된 것보다 오히려 보고됩니다.

대신 OpenAI API 키를 사용하는 경우, 지원된 모델 ID와 함께 `provider add --type official --vendor openai --model MODEL_ID --api-key-env OPENAI_API_KEY --json`을 사용하며, 비밀 관리 환경을 통해 이미 공급된 키입니다. OpenAlex를 위해, `connector configure literature --openalex-key-env OPENALEX_API_KEY --json`를 사용하십시오. `open-science`과 명령을 모두 접목합니다. 명령의 인수에서 키 자체를 넣지 마십시오. 성공적인 자격 검사는 연구 쿼리 완료 또는 할당량은 유지되지 않습니다.

**뚱 베어**, 개별 **기타 제품**을 읽고 `doctor`에서 **이름 &#42;** 작업을 제안했습니다. `ready`이 false인 경우 보고서를 성공적으로 종료할 수 있습니다. 백엔드가 복부되면 의사가 3을 종료합니다. 보고된 우선권을 완료하고, 다시 확인한 후, [작업 실행](#run-input-and-control-flags)은 예정된 프로젝트에서 확인할 수 있습니다.

## 관련 항목 {/* #entry-points */}

| 이름 &#42; | 자주 묻는 질문 | 명령 |
| --- | --- | --- |
| Installed 응용 프로그램 실행기 | **Settings → General → Command line tool → Install command** | `open-science --help` |
| 소스 체크 아웃 | 내장된 응용 및 저장소 의존성 | `node packages/open-science/cli.mjs --help` |
| npm 클라이언트 | Node.js 22.5+ 및 설치 응용 프로그램; 설치하기 전에 패키지 가용성 확인 | 패키지 식별자 `@aipoch/open-science` |

설치된 발사기는 신청의 번들된 런타임을 사용합니다. 그 디렉토리가 PATH에서 absent 인 경우, 일반 패널의 표시 명령을 따르고 새로운 터미널을 엽니 다. 표시 브랜딩과 일치하는 실행할 수 없습니다.

<PlatformContent platform="windows">

**Install command** 후, 새로운 PowerShell 창을 열고 실행:

```powershell
Get-Command open-science | Select-Object Name, Source
open-science --help
open-science status --json
```

**Source**이 일반에 표시된 발사기에 해당되는 포인트를 확인하려면, 보통 사용자 프로필에서 `open-science.cmd`이 표시됩니다. 성공적인 도움 산출은 발사기 뛰기를 확인합니다. 상태가 `{"running":false}`을 반환하면 CLI은 실행 된 백엔드를보고하지 않았습니다. 이것은 데스크탑 창이 닫히지 않습니다. 작업 또는 다운로드 파일을 제출하기 전에 [서버 모드](server.md)을 사용하여 의도한 인스턴스를 확인합니다.

</PlatformContent>

## 작은 명령 줄 작업을 완료 {/* #complete-a-small-command-line-task */}

<p className="example-label"><strong>예시</strong> 명령줄에서 주의를 저장</p>

1. 위의 입력을 사용하여 명령을 설치합니다. 작업 모델과 함께 실행되는 데스크탑 앱을 유지하십시오.
2. `open-science status --json`을 실행하고 `open-science project list --json`을 실행합니다. 예정된 인스턴스를 확인하고 반환된 프로젝트 ID를 복사합니다.
3. 저장 `task.md` 와: **간단한 연결 체크 메모를 포함하는 프로젝트-note.md를 저장하십시오. 다른 파일을 읽거나 네트워크를 사용하지 마십시오.**
4. [입력 및 제어 플래그를 실행](#run-input-and-control-flags)에서 명령을 실행합니다. 우선순위 결과에서 ID를 취득한 후 각 위주를 대체합니다.
5. 허가를 받으면 데스크탑 대화에 응답합니다. `--wait`은 작업이 계속되는 동안 시간을 할 수 있습니다. 다시 제출하기 전에 `run status RUN_ID --json`을 검사합니다.
6. 반환된 Markdown artifact ID를 선택하고, 새로운 로컬 파일명에 다운로드하고, 그것을 엽니다. 요청 된 artifact없이 완료 된 실행은 그 세션에서 후속을 요구합니다. artifact가 존재하지만 다운로드가 실패하면 [artifact 다운로드 복구](./api.md#a-completed-task-whose-file-will-not-download)을 따르십시오.

계획 첫 번째 작업을 위해 `--return-on-attention`을 사용하여 반품 된 계획을 검사하고 응용 프로그램 또는 플랜 명령을 통해 응답합니다. JSON 통합을 위해, 달리기, 완료, 실패 및 완료된 작업으로 모든 성공적인 HTTP 응답을 대우 대신 취소.

## 명령 가족 {/* #command-families */}

| 명령 | Arguments / 플래그 | 제품 정보 |
| --- | --- | --- |
| `project list` | `--json` | 자주 묻는 질문 |
| `project create` | 이름, 선택 `--description`, 중 하나 `--agent-context` / `--agent-context-file` | 프로젝트 만들기 |
| `project update` | ID 또는 정확한 이름, 공급된 metadata/context 분야 | 공급된 분야만 개조하십시오; `--clear-agent-context` 명시적으로 Clears context |
| `project session-defaults show` | 프로젝트 ID 또는 정확한 이름 | 새로운 세션에 대한 기본 읽기 |
| `project session-defaults update` | Project plus 세션 옵션 | concurrent-edit 보호와 기본 업데이트 |
| `run` | `--project`, 신속한 입력, 선택 `--session`, `--wait` | 시작 또는 계속 작업 |
| `run status` / `run cancel` | ID를 실행 | Inspect 또는 명시적으로 실행 취소 |
| `session status` | 세션 ID | 세션 상태 읽기 |
| `session config show` | 세션 ID | persisted/효과적인 구성 및 개정을 읽으십시오 |
| `session config update` | 세션 ID, `--revision`, 공급된 선택권 | 세션이 업데이트 될 때 변경 미래 회전 |
| `settings agent-routing show/update` | Framework 및 Reviewer/Subagent 라우팅 옵션 | 읽거나 atomically 업데이트 글로벌 라우팅 |
| `plan show/approve/reject/revise` | 세션 ID; 결정은 정확한 artifact 버전과 개정을 요구합니다 | 활동 계획에 대해 읽거나 응답 |
| `artifacts list` | 세션 ID | 저장된 artifacts를 읽으십시오 |
| `artifacts download` | Artifact ID는, `--output` | 외부 복사 저장 |

스크립트에서 프로젝트 ID를 사용합니다. CLI은 독특한 정확한 프로젝트 이름을 해결할 수 있습니다. 중복된 이름은 주변입니다. SDK/HTTP 여정은 ID를 직접 요구합니다. 프로젝트 컨텍스트는 16,000 문자까지 허용하며, 목록/create/update 결과는 `hasAgentContext`을 프라이빗 컨텍스트 바디보다 노출시킵니다.

`artifacts download`이 HTTP 500로 실패하면 이전 응용 프로그램을 업데이트하고 동일한 반환 된 Artifact ID를 재발시킵니다. [다운로드 복구 단계](api.md#a-completed-task-whose-file-will-not-download)은 실패한 파일 전송에서 완료된 작업을 구별합니다. 기존 출력을 얻기 위해 연구 작업을 다시 실행하지 마십시오.

## 커넥터 및 자격 관리 {/* #manage-connectors-and-credentials */}

이 명령은 실행 백엔드 및 저장된 설정을 사용합니다. 편집하기 전에 의도한 인스턴스를 확인합니다. 사용자 정의 Connector 및 자격 쓰기는 로컬 인증 연결이 필요합니다. 서버의 경우, SSH를 통해 해당 서버에서 CLI을 실행합니다.

| 명령 | 입력/결과 |
| --- | --- |
| 개방 과학 커넥터 목록 --json | 사용 가능한 커넥터의 안전한 설정보기 |
| 열린 과학 연결관 쇼 CONNECTOR_ID --json | 반환된 ID를 위한 Configuration/status |
| CONNECTOR_ID를 사용할 수 있는 개방 과학 커넥터 | 사용 가능한 설정 |
| 열린 과학 연결관 disable CONNECTOR_ID | 사용 가능한 환경 설정 |
| 개방 과학 커넥터 추가 --json | JSON stdin의 새로운 사용자 정의 MCP 정의 읽기 |
| open-science 연결관 갱신 CONNECTOR_ID --json | JSON stdin의 설정 업데이트 읽기 |
| 열린 과학 연결관은 CONNECTOR_ID를 제거합니다 | 사용자 정의 MCP 정의 제거 |
| 열린 과학 연결관 시험 CONNECTOR_ID --json | 별도의 연결을 통해 도구 발견, 다음 닫습니다. |
| 개방 과학 자격 목록 --json | raw secrets 없이 credential metadata를 읽으십시오 |
| 개방 과학 자격 추가 --json | JSON stdin의 새로운 자격 읽기 |
| 열린 과학 자격 갱신 CREDENTIAL_ID --json | JSON stdin에서 displayName 및/또는 secret를 업데이트하십시오 |

<p className="example-label"><strong>예시</strong> 로컬 Connector 구성 제출</p>

준비된 로컬 구성 파일을 제출하십시오:

~~~bash
open-science connector add --json < connector.json
~~~

| 구성 분야 | 자주 묻는 질문 |
| --- | --- |
| 이름 / displayName | 새로운 사용자 정의 Connector에 필요한; name/ID는 업데이트 중 안정적 유지 |
| (주)태국 | stdio, streamable_http 또는 sse; 또한 업데이트에 필요한 |
| 명령 / args | stdio에 대한 로컬 실행 및 옵션 인수 |
| 이름 &#42; | HTTP/SSE를 위한 엔드포인트 |
| envCredentialIds / 헤더CredentialIds | Bind 환경/헤더는 credential ID를 저장했습니다 |
| oauthCredentialId의 특징 | 기존 공유 OAuth credential |
| Omitted credential 바인딩 | 업데이트에 저장 된 값; 빈 환경/헤더 바인딩 객체는 맵을 명확하게합니다. |

사용자 정의 MCP 정의만 추가, 편집 또는 제거 할 수 있습니다. **Enabled**은 Specialist 액세스의 연결 또는 글로벌 재발급의 선택적 선호도입니다.

**제품정보**은 Connector을 활성화하거나 비즈니스 도구를 실행하지 않습니다. 그것은 성공, 옵션 도구 및 메시지; 발견은 10 초 및 실패 출구 비제로 경계됩니다. 번들된 Connector 살아있는 진단은 지원되지 않습니다. 테스트는 기존의 OAuth 토큰을 재생할 수 있지만, 첫 번째 버전의 브라우저 서명을 수행하지 않습니다.

Credential는 JSON stdin을 통해 비밀을 받아들입니다. 명령의 인수와 쉘 역사에서 그들을 유지하십시오. 토큰 입력 사용 displayName, 종류: 토큰 및 비밀; api_key도 지원됩니다. 반환된 createdCredential.id를 Connector에 Bind. 이 endpoints없이 이전 백엔드는 직접 설정 파일 편집에 떨어지지 않고 오류를 반환합니다.

## 입력 및 제어 플래그를 실행 {/* #run-input-and-control-flags */}

```bash
open-science project list --json
open-science run --project PROJECT_ID --prompt-file ./task.md --wait --json
open-science artifacts list SESSION_ID --json
open-science artifacts download ARTIFACT_ID --output ./result.csv --json
```

반환된 ID를 가진 자본화 된 위주자를 대체하십시오. 예를 들어, 설치에 존재하는 Skill 또는 공급자를 발명하지 않습니다.

| 팟캐스트 | 회사연혁 |
| --- | --- |
| `--prompt` / `--prompt-file` | 인라인 텍스트 또는 UTF-8 파일; stdin는 omitted 때 신속한 제공할 수 있습니다 |
| `--session` | 지정된 세션을 계속 |
| `--cwd` | 외부 작업 디렉토리; CLI은 상대적인 경로, 서버 canonicalizes를 해결하고 그것을 검증합니다 |
| `--approval-profile` | `ask`, `auto`, `full`; 기본 정보 `ask` |
| `--provider` + `--model` / `--provider-default-model` | 구성 공급자 및 명시적 또는 공급자 소유의 기본 모델을 선택하십시오. |
| `--reasoning-effort` | CLI 도움말 목록 `default`, `low`, `medium`, `high`, `xhigh`, `max`; UI 모델 선택은 다를 수 있습니다 |
| `--skill` | 반복 가능한 설치 Skill ID; 누락된 Skill을 설치하지 않습니다. |
| `--plan-first` | 실행하기 전에 계획 응답 필요 |
| `--auto-review` / `--no-auto-review` | 세션 자동 검토 |
| `--memory` / `--no-memory` | 세션 메모리 설정; 상호 독점 |
| `--specialist` | UUID 또는 안정적인 프로필 이름에 의해 새로운 세션을 확산; 프레젠테이션 디스플레이 이름은 routing ID가 아닙니다. |
| `--delegation allow/deny` | 새로운 delegated 일의 통제 입학; deny는 기존의 아이들을 취소하지 않습니다 |
| `--compute-host` | 반복 가능한 구성 호스트 ID; 실행 대상을 선택하면 SSH를 구성하지 않습니다. |
| `--enable-compute-host` / `--clear-compute-hosts` | 새로운 소유자 접근/과태 통제; 기존의 세션 액세스 변경 사용 구성 업데이트 |

외부 `cwd`은 콜러 소유 남아 있습니다. `--cwd`과 `--session`을 재사용하면 동일한 Canonical 디렉토리가 필요합니다. 실행 요청은 세션을 다시 찾을 수 없습니다. 호스트 옵션을 유지 기존 선택; 의도할 때 명시된 clearing operation을 사용한다.

## 대기, 주의 및 취소 {/* #waiting-attention-and-cancellation */}

| 옵션/state | 결과 |
| --- | --- |
| 이름 &#42; `--wait` | 입학 후 반환; 은둔 `id` 그리고, `sessionId` 나중에 투표하기 |
| `--wait` | 터미널 실행 상태의 대기 |
| `--wait --return-on-attention` | 구조화 된 계획 승인이 필요한 경우도 반환; 권한 프롬프트는 동일한 주의 조건이 아닙니다. |
| `--timeout-ms` | 종료 후 클라이언트 대기 중지; 서버가 계속 실행됩니다 |
| `--cancel-on-timeout` | 타임 아웃 후 Explicitly 취소; 명령은 여전히 timeout을보고 |
| `run cancel RUN_ID` | 취소 / 취소에 대 한 대기; 이미 완성 된 artifacts를 유지 |

계획 승인의 경우, 먼저 `plan show`을 읽고, 다음 `--artifact-version`과 `--revision`를 모두 공급합니다. stale 계획 결정은 더 새로운 계획에 적용 할 수 없습니다. 세션 구성 업데이트는 `session config show`에 의해 반환된 개정이 필요합니다. stale 업데이트 반환 `session_revision_conflict`. 활동적인 루트 시약, 시약 또는 Notebook 일은 `session_busy`를 가진 갱신을 막을 수 있습니다.

## Structured 산출과 출구 부호 {/* #structured-output-and-exit-codes */}

`--json`는 1개의 결과를 방출합니다. `--jsonl`는 `run --wait`, 스트림 이벤트와 실행 결과와 함께 사용할 수 있습니다. 두 가지를 결합하지 마십시오. 오류는 요청할 때 stderr에 구조화됩니다. `error.code`을 파고, 프로세스 종료 코드가 아닌.

다음 invalid-option 응답은 로컬로 재제작되었다:

```json
{"error":{"code":"invalid_cli_usage","message":"Use only one of --json or --jsonl."},"exitCode":2}
```

| 종료 코드 | 이름 &#42; |
| ---: | --- |
| 0 | 명령은 성공; 반환된 run/attention 상태를 검사합니다. |
| 1 | General/run 실패, timeout, 분쟁, 또는 상태 보고 달리는 서비스 없음 |
| 2 | 잘못된 CLI 사용 |
| 3 | 지역 daemon 사용 가능 |
| 4 | 요청된 프로젝트/런/session/artifact/Specialist 찾을 수 없습니다 |
| 5 | Active work는 응용 프로그램 업데이트 차단 |
| 6 | 신청 갱신은 수동 임명 단계 요구합니다 |

JSONL은 `run.progress` 및 `stream.resync-required`을 포함 할 수 있습니다. 재전송 후 재전송이 불가능한 경우, 재전송이 실행 상태; 이벤트 스트림은 영구적 인 역사를 가정하지 마십시오. Lifecycle 명령은 [Headless 서비스](./server.md)에 설명된 별도의 플래그 제한이 있습니다.

[CLI 구현](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/cli.mjs), [upstream 명령 가이드](https://github.com/aipoch/open-science/blob/v0.26.0/packages/open-science/CLI.md).

기술적인 참고: [CLI 계약](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## 무력한 실행 {/* #unattended-runs */}

`--permission-prompts none`을 `run`에 추가하여 무한하게 대기중인 인간 상호 작용을 중단하십시오. 선택한 승인 프로필 및 기억 보조금은 여전히 적용됩니다; 나머지 허가 요청은 거부되며, 사용자 질문은 쇠퇴하고, 인간 검토가 거부되는 계획입니다. 이것은 모든 작업을 승인하지 않습니다.

```bash
open-science run --project "Sequence and PDF Research" \
  --prompt "Summarize the existing public-data result. Do not request user input." \
  --approval-profile ask --permission-prompts none --wait --jsonl
```

옵션은 이 주장에만 적용되며 세션 선호도로 저장되지 않습니다. `--plan-first`과 결합할 수 없습니다. 최종 상태와 오류를 검사: 인간의 대기를 피하는 것은 작업 완료를 보장하지 않습니다. 호스트 기능 `permission-prompts-none`에 대한 클라이언트 체크; 이전 호스트가 `unsupported_capability`을 반환하면 일치하는 클라이언트와 앱을 업데이트합니다.
