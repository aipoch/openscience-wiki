---
title: "건축과 진단"
last_update:
  date: '2026-11-25'
---

# 건축과 진단 {/* #architecture-and-diagnostics */}

작업을 소유하는 구성 요소에 의해 실패를 찾습니다. 성공적인 모델 응답, 성공적인 계산 및 검증 된 저장된 artifact는 다른 관측; 실패한 단계에 대한 증거를 수집합니다.

## 건축 및 소유권 {/* #architecture-and-ownership */}

```mermaid
flowchart LR
  UI[Desktop or browser interface] --> MAIN[Shared Node backend]
  MAIN --> STORE[Settings, database and managed files]
  MAIN --> AGENT[Agent framework and model provider]
  MAIN --> NB[Notebook runtime]
  MAIN --> SERVICES[Connectors and Compute Hosts]
  AGENT --> EVENTS[Messages and tool events]
  NB --> EVENTS
  SERVICES --> EVENTS
  EVENTS --> UI
  MAIN --> ART[Artifact versions and provenance]
  ART --> UI
```

| 회사연혁 | 이름 &#42; | 검사에 대한 증거 |
| --- | --- | --- |
| Renderer 및 미리보기 | 표시 상태, 제어, 렌더링 된 파일 내용 | 페이지, 선택한 project/session, filename, 미리보기 오류 |
| Node 백업 | Persistent 운영, 응용 서비스 및 액세스 경계 | 가동 과 관련 진단 |
| 에이전트 프레임 워크/provider | 모델 연결, 작업 실행 프로토콜 및 응답 스트림 | Framework/provider/model, 연결 테스트, 실패 도구 또는 회전 |
| Notebook | Interpreter, 코드 실행, 출력 및 실시간 변수 | Runtime ID/version, 실패 셀, stdout/stderr 및 실행 기록 |
| 커넥터 | 외부 서비스 요청 | Connector/tool 이름, sanitized 입력, 서비스에서 상태/error |
| 원격 Compute 호스트 | SSH 액세스 및 직접 / 일정한 작업 | 호스트 / 모드, 프로브 결과, 작업 ID 및 원격 로그 |
| Artifact 저장소 | 관리 된 버전, 체크섬 및 캡처 된 증거 | File/version ID, 콘텐츠 상태, Code/Environment/Review 탭 |

데스크톱 경로는 사전 로드 API 경계를 교차합니다. 브라우저 액세스는 애플리케이션의 보호 된 로컬 서비스 수송을 사용합니다. [서비스 및 브라우저 액세스](server.md) 참조. 브라우저는 두 번째 독립적 인 연구 데이터베이스가 아닙니다.

## 증거로부터 구별되는 내용 {/* #distinguish-content-from-evidence */}

| 국가 또는 메시지 | 회사연혁 | 다음 검증 |
| --- | --- | --- |
| Artifact 콘텐츠 제공 | 선택한 버전의 바이트가 읽기 쉽고 적용 가능한 무결성 체크를 전달합니다. | 과학적 결과가 정확하다는 것을 검사 |
| 콘텐츠 사용 불가: 누락 | 예상된 내용은 찾을 수 없습니다. | 버전 정체성을 보존하고 저장 가용성을 조사 |
| 콘텐츠 사용 불가: checksum mismatch | 콘텐츠는 기록된 무결성 값과 일치하지 않습니다. | 진단을 유지하십시오; 은밀하게 바이트를 대체하고 같은 버전을 호출하지 마십시오 |
| Partial 환경 캡처 | 환경 기록은 불완전합니다 | 캡처 경고를 읽고 독립적으로 해석기 / 포장 세부 정보를 유지 |
| Bounded 실행 로그 | 묶인 immutable 실행 증거는 유지되었습니다 | Inspect gap 경고와 유효한 살아있는 Notebook |
| 이 버전에 대한 리뷰가 없습니다. | 적용 가능한 Reviewer 결과가 붙어 있습니다. | 리뷰로 그 버전을 보고하지 마십시오. |

이 국가는 coexist 할 수 있습니다. 콘텐츠 무결성, 실행 증거 및 검토 상태는 별도로.

## 오류 조회 {/* #error-lookup */}

| 실패 표면 | Canonical 구경 |
| --- | --- |
| 모형/API, Connector 또는 프록시 HTTP 응답 | [HTTP 상태 코드](../guides/troubleshooting.md#http-errors-400-403-429-and-5xx) |
| 앱은 데이터베이스를 열 수 없습니다. | [Database 시작 코드](../guides/troubleshooting.md#database-startup-errors) |
| Notebook 가져 오기, 파일 경로 및 권한 | [오류 메시지](../guides/troubleshooting.md#match-the-error-message) |
| SSH 수송, 먼 경로 및 일 상태 | [원격 오류](../guides/remote-compute.md#resolve-ssh-and-job-errors) |
| 문제 제출 및 커뮤니티 도움 | [버그를보고 또는 커뮤니티에 요청](../guides/troubleshooting.md#report-a-bug-or-ask-the-community) |

식별자의 오류 소스를 유지하십시오. OS errno, Python 예외, 원격 작업 오류 코드 및 공급자의 HTTP 상태는 교환할 수 없습니다. 동반된 메시지를 복사하고 사용할 때 배열된 원인을 복사; 1개의 식별자는 몇몇 실패 경로를 커버할 수 있습니다.

## 유용한 진단 기록 보존 {/* #preserve-a-useful-diagnostic-record */}

앱 버전, 운영 체제, 영향을받는 프로젝트 / 세션, 작동, 예상 결과, 정확한 오류 및 그 전에 즉시 발생. 계산이 관여될 때 runtime 및 input checksum을 포함하십시오; artifact 버전 또는 원격 작업 ID가 포함될 때 하나 존재합니다.

사용 가능한 **Details**, **진단 세부사항** 또는 로그보기 오류의 원인을 유지, 오히려 그것의 짧은 머리 보다는. 가능한 경우 공공 또는 최소 입력을 가진 Reproduce. 계정 토큰, 헤더, 개인 경로 및 연구 콘텐츠를 공유하는 모든 것을 검사합니다.

메인 프로세스 로거는 구조화 된 JSON 라인을 작성합니다. 기본적으로 5 MiB에서 파일을 회전하고 총 세 개의 파일을 유지합니다. 특별한 지방을 씁니다 행동은 1개의 기록에 의해 정규적인 경계를 초과할 수 있습니다. 따라서 보관 창을 가지고 있으며 영구 감사 흔적이 없습니다. 진단 분야는 또한 truncated 할 수 있습니다. 실패 후 관련 레코드를 보존하고 이벤트가 발생하지 않은 증거로부터 부재를 구별합니다.

소스: [Logger 및 유지](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/logger.ts), [진단 redaction](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/diagnostic-redaction.ts), [경계된 Notebook 실패 세부사항](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/failure-diagnostic.ts) 및 [artifact 내용 상태](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/artifacts/provenance-content-status.ts).

첫 번째는 실패한 작업에서 실패한 새로 고침/클립업 후, 그리고 결과 배달에서 배경 작업 완료를 구별합니다. Inspect는 뮤테이션을 재발하기 전에 국가를 저장합니다. [복구 테이블](../guides/troubleshooting.md#recovery-messages)의 사용자 인터페이스는 차단된 큐어 복원, 유지 PDF 참조, stale 컬렉션 편집 및 Windows 설치 메시지. [백그라운드 작업](../guides/notebook.md#background-tasks-and-result-delivery)은 실행 상태를 설명합니다. 원격 모니터링 오류는 최종 작업 결과에서 분리됩니다.


## 세션 진단 아카이브 {/* #session-diagnostic-archive */}

**Export diagnostics…**은 선택한 세션 메타데이터, 데이터베이스 레코드 및 사용 가능한 애플리케이션 로그 메타데이터를 현명하고 수출 로그와 현지 아카이브로 수집합니다. 근원은 전체적인 수출을 멈추지 않습니다; 큰 손상된 근원은 summaries를 일으킬 수 있습니다. 현재와 과거의 애플리케이션 로그는 선택한 세션 밖에 활동들을 커버할 수 있으므로 선택한 소스를 검토하고 결과를 캡처할 수 있습니다.

Ordinary metadata 소스는 개인 콘텐츠 필드를 제외합니다. 민감한 콘텐츠 패키지 수출 실패 후, 대화 상자는 또한 적층 스캐너 증거와 원본 조각 파일을 제공 할 수 있습니다. 원본 파일은 기본적으로 체크되지 않습니다. 명시적으로 선택하면 원래 바이트가 포함되어 있습니다. 수출은 업로드 또는 모델 요청을하지 않습니다. 공유하기 전에 결과 아카이브를 검사합니다. 연구 패키지 백업 또는 최소 재생산을 대체하지 않습니다. [illustrated 수출 절차](../guides/troubleshooting.md#session-diagnostics) 참조.

## 데스크톱 및 백엔드는 별도의 프로세스입니다. {/* #node-backend */}

v0.37.0에서 Electron은 일반 Node 백엔드가 공유 서비스를 소유하면서 기본 데스크탑 쉘을 소유합니다. 데스크탑, 웹 UI, CLI 및 SDK은 동일한 백엔드에 연결할 수 있습니다. 구성 디렉토리, 버전 및 실제 포트 식별 `status --json` 클라이언트가 연결할 수 없을 때. 눈에 보이는 데스크탑 창은 혼자는 backend를 증명하지 않습니다 건강합니다. 그것을 멈추기 전에 [백엔드 소유권](server.md#backend-ownership)를 따르십시오.
## 에이전트 추적 {/* #agent-tracing */}

내장 에이전트가 모델 요청과 MCP 도구를 통해 턴을 검사해야 할 때 이것을 사용하십시오. OpenTelemetry Collector Collector 또는 Langfuse와 같은 OTLP/HTTP JSON 수신기를 공급합니다. Open-Science은 앱 운영 컬렉션 서비스를 제공하지 않습니다. 엔드포인트는 전체 ingestion URL이어야 합니다. 일반적인 수집가 일반적으로 `/v1/traces`을 사용하지만, Langfuse는 `/api/public/otel/v1/traces`을 사용합니다.

백엔드를 운영하는 사람은 시작 설정에서 엔드포인트, 인증 및 캡처 스위치를 구성합니다. 설치된 앱의 경우 활성 구성 디렉토리의 `.env`이 지원됩니다 (보통 `~/.open-science/.env`). 종료 활성 작업 및 시작 그 출시 구성을 변경 한 후 백엔드. 이것은 프로젝트 설정 저장에서 분리됩니다.

<p className="example-label"><strong>예시</strong> 콘텐츠 캡처가 비활성화 된 로컬 수신기</p>

```dotenv
OPEN_SCIENCE_AGENT_OTLP_TRACES_ENDPOINT=http://127.0.0.1:4318/v1/traces
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_CONTENT=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_API_REQUEST=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_ARGUMENTS=0
OPEN_SCIENCE_AGENT_OTLP_CAPTURE_TOOL_RESULTS=0
OPEN_SCIENCE_AGENT_OTLP_DIAGNOSTICS=1
```

이 예제는 백엔드의 자신의 루프백 주소를 이미 듣는 수신기를 가정한다. 그것은 하나 설치하지 않습니다. 다른 호스트의 경우 실제 ingestion URL과 필수 인증; [공식 수신기 구성](https://github.com/aipoch/open-science/blob/v1.3.4/docs/development-quick-reference.md#open-science-agent-traces) 및 [환경 예제](https://github.com/aipoch/open-science/blob/v1.3.4/.env.example)을 참조하십시오. 수신자 비밀을 프롬프트 및 공유 스크린샷에서 유지합니다.

### 캡처 세부 정보 {/* #choose-capture-detail */}

프로젝트 추적은 **기본적으로 꺼져 있습니다**. 다만 아래의 콘텐츠 수집 설정은 생략하면 각각 **`1`(켜짐)** 로 적용됩니다. 메타데이터만 기록하려면 네 항목을 모두 명시적으로 `0`으로 설정하세요. 이는 시작 설정이며, 프로젝트 대화상자의 추가 스위치가 아닙니다.

| 후에 suffix를 놓으십시오 `OPEN_SCIENCE_AGENT_OTLP_` | 설정할 때 입력된 내용 `1` |
| --- | --- |
| `CAPTURE_CONTENT` | 프롬프트와 최종 응답의 발췌 |
| `CAPTURE_API_REQUEST` | 모델 요청 JSON, 잠재적으로 지침, 역사, 도구 데이터 및 첨부 파일을 포함 |
| `CAPTURE_TOOL_ARGUMENTS` | MCP 도구 입력 미리보기 |
| `CAPTURE_TOOL_RESULTS` | MCP 도구 출력 미리보기 |

Metadata-only 추적은 여전히 작업을 설명합니다. 개인 연구 데이터로 프로젝트를 활성화하기 전에 수신자 및 액세스 규칙을 검토하십시오.

### 결제 및 결제 {/* #enable-and-check-delivery */}

[프로젝트 설정](../guides/projects.md#agent-tracing)을 열고 **Agent tracing**을 저장합니다. 작은 요청에 대한 내장 **Open-Science Agent**을 사용하십시오. 수신기에서 서비스 `open-science-agent`을 찾고 관련 턴을 검사, 요청 및 도구는 작업이 실제로 생산하는 경향이.

`.env` 구성을 위해 활성화된 진단으로, 업로드 상태를 위해 인접한 `.env.otel-status.json`를 검사합니다. 추적이 도착하지 않은 경우, 활성 프로필, 프로젝트 스위치, 실행 시간, 전체 엔드포인트, 수신기 가용성 및 자격 증명을 확인하십시오. 납품은 비동기입니다: 완료된 대리인 대답은 성공적인 올려주기를 증명하지 않습니다. 정지 미래 캡처를 추적; 그것은 수신기에서 이미 레코드를 삭제하지 않습니다.
