---
title: "서비스 및 브라우저 액세스"
last_update:
  date: '2026-10-29'
---

# 서비스 및 브라우저 액세스 {/* #headless-service-and-browser-access */}

로컬 서비스는 headless backend와 localhost 브라우저 인터페이스를 제공합니다. SSH Compute 호스트와 Remote.It 브라우저 페어링과 구별됩니다. 클라이언트를 연결하기 전에 호스트에 대한 인증 및 자격 증명 설정을 선택하십시오.

## 대상 선택 및 발견 {/* #target-selection-and-discovery */}

v0.37.0에서 일반 Node 프로세스에서 공유된 서비스는 기본 클라이언트로 연결됩니다. CLI 시작은 더 이상 숨겨지은 Electron 주인을 필요로 하지 않습니다.

| 회사 소개 | 범위 |
| --- | --- |
| `--port PORT` | Localhost 포트, 정수 1–65535; 점유된 명시된 포트는 오류를 발생시킵니다. |
| `--config-root PATH` / `--profile PATH` | 휴대용 CLI 구성 디렉토리; 전반적으로 동일한 절대 경로 유지 |
| `OPEN_SCIENCE_CONFIG_ROOT` | 환경을 통해 Explicit 구성 디렉토리; 명령 옵션은 precedence를 가지고 |
| 자동 발견 | 로컬 서비스 상태를 확인하고 프로필, 포트 및 버전을 확인 |

데스크탑 백엔드는 지정되지 않을 때 무료 포트를 선택합니다; CLI 시작 기본값은 44100입니다. 오픈 창에서 포트를 삽입하는 대신 `status --json`을 사용하십시오. 동일한 윤곽을 위한 호환성 기존하는 서비스는 재사용될 수 있습니다; 버전이 일치하지 않을 때 활성 작업을 완료하고 업데이트 지침을 따르십시오. 레거시 `--app-path` 옵션은 새로운 Node 백엔드로 Electron 실행을 턴하지 않습니다.

국가 파일은 `web-service.json`입니다. 인증 실패는 그 기록을 삭제하거나 PID를 죽이는 권한이 없습니다. 실제 서비스 및 진단을 검사하여 다른 프로세스에 영향을 미치는 것을 방지합니다.

## 초기화 및 체크 readiness {/* #readiness */}

`open-science init`을 사용하여 앱을 시작하지 않고 기본 구성 디렉토리를 준비하십시오. 격리된 구성을 위해, init에 동일한 절대적인 `--profile` 경로, 시작 및 후속 명령을 통과하십시오. 데비안 패키지는 CLI을 응용 프로그램에 따라 설치합니다. Codex 준비 및 로그인에 대한 [터미널 설정](cli.md#terminal-setup) 참조.

의도적인 `start --no-open` 후, `open-science doctor --json`을 실행합니다. 전반적인 `ready`, 개인적인 검사 및 제안된 다음 활동을 검열하십시오; 프로세스 종료 코드는 혼자 읽을 수 없습니다. 기존의 정통 로컬 인터페이스에서 서비스를 유지하십시오. 이 헤드리스 서비스를 시작하려면 Remote.It을 구성하거나 공개 엔드포인트를 게시하지 않습니다.

## 수명 주기 명령 {/* #lifecycle-commands */}

v1.0.5에서는 App 연결 또는 명시적인 CLI 시작이 서비스를 유지합니다. 모든 명령에 동일한 절대 프로필 경로를 사용합니다.

| 명령 | 결과 |
| --- | --- |
| `open-science start` | 서비스를 시작하거나 재사용하고 지속 실행을 설정한 뒤 브라우저를 엶 |
| `open-science start --no-open --json` | 브라우저를 열지 않고 같은 설정 적용. `started` 또는 `already-running`, 서비스 정보 및 `lifetime` 반환 |
| `open-science status --json` | 대상 확인. 서비스가 없으면 `{"running":false}` 및 종료 코드 1 |
| `open-science url` | 인증 URL 출력. 공개하지 말 것 |
| `open-science stop --json` | 명시적 지속 실행 해제. 연결된 App이 없을 때만 중지 |
| `open-science stop --force --json` | App 연결 중에도 전체 중지 요청. 진행 작업을 중단할 수 있음 |

`start` 반복 실행으로 설정 횟수가 늘지 않습니다. **start**, **status**, **stop**은 `--json`을 지원하고 **url**은 지원하지 않습니다. JSON 시작 결과에는 인증 URL이 없습니다. 구버전 서비스는 수명 상태가 불명확할 수 있으므로 새 규칙을 사용하기 전에 버전을 맞춥니다.

### 중지 결과

| JSON `result` | 의미 |
| --- | --- |
| `already-stopped` | 실행 중인 서비스 기록 없음 |
| `keep-alive-revoked` | 명시적 지속 실행은 해제했으나 연결된 App 때문에 계속 실행 중 |
| `stopped` | 요청 대상 서비스가 종료되고 소유권을 해제함 |
| `shutdown-requested` | 구버전이 요청을 받았으나 종료는 확인되지 않음. 종료 코드는 0이 아님 |

`result`와 `lifetime`을 읽으세요. 성공 종료 코드만으로 중지 완료를 판단할 수 없습니다. 이전 `daemon-stopped`, `web-service-stopped` 명칭은 더 이상 출력되지 않습니다. `--force`는 새 프로토콜이 필요하며 구버전에서는 명시적으로 실패합니다. 상태 파일 삭제나 기록된 PID 강제 종료 대신 오류와 현재 상태를 확인합니다.

## 인증 및 브라우저 접근 {/* #authentication-and-browser-access */}

SDK은 로컬 서비스를 발견하고 로컬 인증 토큰을 읽고 요청 헤더에 전송합니다. 정규 인간/JSON/JSONL 작업 출력은 그 토큰을 인쇄하지 않습니다. `url`은 정통 브라우저 항목을 생산하는 의도적 예외입니다.

localhost 서비스는 다른 컴퓨터에서 자동으로 액세스 할 수 없습니다. 원격 브라우저 액세스는 자체 설정된 액세스 모드, 페어링 및 신뢰할 수 있는 브라우져 수명주기를 사용합니다. SSH Compute 대신 원격 실행 호스트를 구성하기 위해 작업을 보냅니다.

Remote.It 쌍용 [원격 브라우저 액세스](../guides/remote-access.md), SSH 작업용 [먼 compute](../guides/remote-compute.md)를 사용하십시오. Neither Flow는 로컬 서비스 문서 URL을 변경하여 구성됩니다.

### 헤드리스 Linux에 대한 Credential 저장 {/* #credential-storage-on-headless-linux */}

기본값은 OS-protected 저장입니다. Linux 헤드리스 백엔드에서 사용 가능한 키링없이, 명시적인 대안을 선택하십시오.

<p className="example-label"><strong>예시</strong> 파일 credential 저장을 가진 Linux headless 서비스 시작</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| 제품 정보 | 뚱 베어 |
| --- | --- |
| Omitted 옵션 / --credential-store=os | OS-protected 상점을 요구하십시오 |
| --credential-store=파일 | Linux 헤드리스에서만 설정 관리된 비밀을 암호화할 수 있음 |
| 데스크탑, macOS 또는 Windows 출시 | 파일 모드는 지원되지 않습니다. |
| Already-running 백엔드 | Explicit 형태 선택은 거절됩니다; 프로세스의 모드를 변경하지 않습니다. |
| 다음 시작 | 형태를 다시 지정하십시오; 그것은 저장 된 선호도 없습니다 |

파일 모드는 구성 루트에서 settings.json 및 credentials.json을 사용하여 원자 쓰기 및 POSIX 모드 0600을 작성합니다. 파일:v1: 값은 base64-encoded, **암호화되지 않음**입니다. 그것을 읽을 수있는 사람은 비밀을 복구 할 수 있습니다; 저장소, 이미지 및 지원 보고서에서 이러한 파일을 제외합니다.

선택은 새로운/업데이트 관리된 공급자 열쇠, 앱 관리된 구독 토큰, GitHub/literature 열쇠 및 공유된 MCP/OAuth 비밀에 적용합니다. Compute passwords/protected Compute 자료는 그들의 분리된 OS 저장 필요조건을 지킵니다; 외부 에이전트 프레임 워크 로그인 매장은 자신의 규칙을 따릅니다. sandbox는이 옵션에 의해 비활성화되지 않습니다.

암호화 된 값은 자동으로 마이그레이션되지 않으며 여전히 원래 OS vault가 필요합니다. 사용할 수없는 경우, 정상적인 지원 양식을 통해 자격 증명을 다시 입력합니다. File ref는 명시된 파일 모드를 사용하여 이전 릴리스와 호환됩니다. OS 스토리지에 대한 자격 증명을 반환하려면 OS 모드에서 다시 시작하고 vault가 사용할 수 있는 동안 명시적으로 교체하십시오.

구성이 컨테이너 교체를 살아야 할 때 persistent 저장을 사용하십시오. Shutdown는 윤곽을 유지합니다; 처분할 수 있는 콘테이너 filesystem를 대체해서 그것을 제거할 수 있습니다. [credential 저장 계약](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md) 참조.

## 백엔드 유지 및 종료 조건 {/* #backend-ownership */}

| 작업 | 백엔드에 미치는 영향 |
| --- | --- |
| 명시적 CLI 시작 없이 마지막 App 종료 | 서비스 중지 |
| CLI `start` 후 모든 App 종료 | 명시적 지속 실행 설정에 따라 유지 |
| 브라우저 탭 또는 SDK 클라이언트 닫기 | 명시적 설정이 해제되지 않음 |
| 일반 CLI, Web 또는 SDK 작업 실행 | 모든 App 종료 후 서비스를 단독으로 유지하지 않음 |
| App 연결 중 `open-science stop` 실행 | 명시적 설정 해제. App을 위해 계속 실행 |
| `open-science stop --force` 실행 | 전체 중지 요청. 작업이 중단될 수 있음 |

데스크톱 종료 후에도 브라우저 또는 자동화 작업을 계속하려면 같은 프로필을 명시적으로 시작합니다. 창을 트레이로 닫는 것은 앱 종료가 아닙니다. 전체 중지 전 작업을 마치고 `status --json`으로 확인합니다.

연결이 끊긴 데스크톱에는 **Reconnect**와 **Quit app**이 있습니다. 재연결은 작업을 다시 제출하지 않습니다. [연결 복구](../guides/troubleshooting.md#connection-recovery)에 따라 처리하고 응답을 잃은 작업은 재시도 전에 결과를 확인합니다.

### 데스크톱 종료가 중단된 후 재연결 {/* #desktop-service-recovery */}

같은 버전의 데스크톱을 열고 원래 프로필에 연결합니다. App 연결과 명시적 CLI 설정이 서비스 유지 여부를 결정합니다. 브라우저 탭만으로 대체할 수 없습니다.

종료 준비에 실패하면 창이 남습니다. 미저장 작업을 보존하고 복구 후 원래 작업을 확인합니다. 이전 서비스가 시작을 막으면 프로필, 버전, 연결된 클라이언트를 확인한 뒤 중지를 선택합니다. 취소하면 서비스는 계속 실행됩니다. 잠금 파일을 삭제하지 말고 중지 결과를 다시 확인합니다.

## 애플리케이션 업데이트 동작 {/* #application-update-behavior */}

CLI 앱 업데이터는 제거된 상태입니다. `open-science update --json` 대신 [데스크톱 업데이트 또는 원래 설치 경로](../guides/installation.md#manual-update)를 사용합니다.

독립 CLI 파일 교체 전 해당 설치를 사용하는 모든 프로필의 작업을 마칩니다. 연결된 App을 종료하고 각 프로필에서 `stop --json`으로 지속 실행 설정을 해제합니다. `stopped` 또는 `already-stopped`인지 확인하세요. `keep-alive-revoked`는 App이 서비스를 유지하고 있다는 뜻입니다. 모든 클라이언트의 작업을 중지하려는 경우에만 `stop --force`를 사용합니다. 실행 중인 프로그램 파일을 덮어쓰지 마세요.

데스크톱 업데이트에서 CLI 서비스 중지 및 관리 방식 변경을 요청하면 대상과 작업을 확인합니다. 취소하면 원래 서비스가 계속 실행됩니다. 이 작업은 독립 CLI 프로그램 파일을 갱신하지 않습니다. 점유 및 복구 안내를 따르고 잠금 파일이나 설정을 삭제하지 마세요.

업그레이드 후 버전과 원래 데이터, `status --json`, `doctor --json`을 확인합니다. 인증 정보 저장 모드를 유지합니다. [1.x 호환성](../guides/installation.md#version-compatibility)은 서로 다른 데스크톱/백엔드 버전 혼용을 보장하지 않습니다. [공식 런타임 안내](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md), [CLI](cli.md), [Task SDK](api.md)를 참고하세요.

## 웹 작업공간의 Compute {/* #web-compute */}

독립 실행 웹 작업공간은 **Compute** 를 제공합니다. 단, 백엔드가 필요한 Notebook·Compute API를 지원해야 합니다. 연결된 작업공간에서 패널을 확인하고 기존 SSH/Slurm 설정 절차를 따르세요. 패널이 보인다고 원격 인증 정보가 제공되거나 작업 실행이 보장되지는 않습니다.

## 패키지 및 외부 도구 클라이언트 {/* #local-research-tools */}

인증된 로컬 Web에서는 [연구 패키지를 업로드 및 다운로드](../guides/research-packages.md#local-package-transfer)할 수 있습니다. 원격 Web에는 이 기능이 추가되지 않습니다. 같은 컴퓨터의 외부 클라이언트에는 [stdio MCP 어댑터](cli.md#external-mcp)를 설정합니다. 이미 실행 중인 로컬 서비스와 프로필 권한을 사용하며 원격 MCP URL을 생성하지 않습니다.
