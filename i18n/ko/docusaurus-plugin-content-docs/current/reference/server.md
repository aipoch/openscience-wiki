---
title: "서비스 및 브라우저 액세스"
last_update:
  date: '2026-10-22'
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

## Lifecycle 명령 {/* #lifecycle-commands */}

| 명령 | 결과 | 옵션 및 경계 |
| --- | --- | --- |
| `open-science start` | 백엔드를 시작하고 브라우저를 엽니다. | 기본 포트 44100 |
| `open-science start --no-open` | 브라우저를 열지 않고 시작 | 의도적인 현지 서비스 세션 사용 |
| `open-science status --json` | 인쇄 기계 읽기 쉬운 서비스 국가 | 누락된 서비스 반환 `{"running":false}` 및 종료 코드 1 |
| `open-science url` | 인증된 브라우저 URL을 인쇄 | 지역 접근 권한을 포함합니다; 출판된 예시로 붙여넣지 마십시오. |
| `open-science stop` | 인증된 우아한 폐쇄 | stale state 파일에서 PID를 장님으로 신호하지 않습니다. |
| `open-science stop --json` | 종료 결과를 보고 | 아래 결과 표 참조 |

이 명령 중, **상태 및 중지 지원 `--json`; 시작 및 URL은하지 않습니다**. 로컬 `start --json` 체크는 `invalid_cli_usage`을 종료 코드 2로 반환합니다. 스크립트 실행을 위해, `start --no-open`을 실행, 다음 `status --json`.

### 폐쇄 outcomes {/* #shutdown-outcomes */}

| JSON `result` | 이름 &#42; |
| --- | --- |
| `already-stopped` | 라이브 서비스 기록이 없습니다 |
| `daemon-stopped` | 정통 Node 백엔드 종료; 첨부된 클라이언트는 백엔드 연결을 잃습니다 |
| `web-service-stopped` | Legacy Electron web-service outcome, 새로운 독립 Node 백엔드가 아닌 |

거절된 요청 또는 놓인 종료 마감 기한은 실패를 반환합니다. 오류를 읽고 실제 대상 상태를 검사합니다. 명령이 반환되기 때문에 중지된대로 서비스를 보고하지 마십시오.

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

## 소유권 및 폐쇄 {/* #backend-ownership */}

| .... | 백엔드의 효과 |
| --- | --- |
| 브라우저 탭 닫기 | 백엔드가 실행 |
| 백엔드를 시작 하는 데스크탑을 Quit | 그것의 소유한 백엔드는 그것으로 멈추지 않습니다 |
| 기존 CLI 백엔드에 부착된 데스크탑을 고정하십시오. | 클라이언트 detaches만; CLI 백엔드가 실행 유지 |
| `open-science stop` | 선택한 백엔드를 중지, 모든 클라이언트에 영향을 미치는 |

창을 닫을 때 특히 트레이에 남아있을 때 앱을 종료하는 것과 다를 수 있습니다. 공유 백엔드를 멈추기 전에 효과적인 연구, 그 후에 `status --json`를 가진 실제적인 국가를 검열합니다.

분리된 데스크톱은 **다시 연결** 및 **앱 종료**을 제공합니다. Reconnect는 원래의 라이브 백엔드를 새로 고침하고 재조달하지 않습니다. 그 후반이 사라지면 종료 및 재개. 단선된 Quit는 클라이언트만 닫을 수 있으므로, 서비스 중단 전에 선택한 프로필 상태를 검사합니다. [연결 복구](../guides/troubleshooting.md#connection-recovery)을 따르십시오. 응답이 잃어버린 작업을 검사합니다.
### 중단된 탁상용 폐쇄 후에 Reconnect {/* #desktop-service-recovery */}

데스크톱이 예기치 않게 종료되면 백엔드가 살아남을 때 동일한 버전의 데스크톱을 다시 열 수 있으므로 오래된 컨트롤러와 찢어짐이 정착된 후 데스크톱 출시 서비스로 채택할 수 있습니다. CLI-launched 서비스는 대여를받습니다. 데스크탑이 연결되기 때문에 평범한 데스크탑 Quit는 멈추지 않습니다.

준비를 종료하면 창이 열립니다. 공지 사항 보기를 읽고, 불균형 작업을 보존하고 원래 실행 및 파일을 검사하기 전에 복구 할 대화를 기다립니다. 열린 창은 작업이 취소되지 않습니다. 시작하면 이전의 독립 서비스 차단을보고 명시된 정지 동작을 선택하기 전에 프로필 및 버전을 확인하십시오. 그 서비스 실행을 취소; 실패한 정지는 자물쇠 파일을 삭제하지 않고 rechecked 할 수 있습니다.

## 앱 업데이트 행동 {/* #application-update-behavior */}

v1.0.0는 CLI 신청 갱신자를 제거합니다; `open-science update --json`을 사용하지 마십시오. 데스크탑 업데이트 컨트롤 또는 원래 설치자 / 패키지 관리자를 사용하여 [현재 방출 가용성](../guides/installation.md#standalone-cli)을 관찰하십시오.

- **데스크탑 앱:**는 갱신 검사하기 전에 활동적인 연구를 완료합니다. CLI 서비스에 첨부된 동안 updating가 중단하고 데스크탑 관리로 전환하도록 요청하면, 동의하기 전에 프로파일 및 영향을받는 작업을 확인하십시오. 원래 서비스 실행을 취소합니다. 이 스위치는 본래 독립 CLI 프로그램 파일을 격상시키지 않습니다.
- **독립 CLI 임명:**은 모든 프로파일을 사용하여 원래 채널을 통해 실제로 게시 된 패키지를 설치합니다. 파일 실행을 덮거나 새로운 데스크톱이 작성한 후 오래된 백엔드 프로파일을 다시 열지 마십시오.
- **직업 또는 회복 통지:**은 활성 인스턴스 및 설치 상태에 대한 표시된 체크를 따릅니다. 잠금을 삭제하지 마십시오, 구성 또는 복구 레코드를 강제로 업데이트가 종료되지 않습니다.

업그레이드 후, 버전 및 원래 데이터를 확인 한 다음 `status --json` 및 `doctor --json`을 사용하여 서비스 상태 및 읽음을 검사합니다. credential 상점 형태를 보존하십시오. [1.x 호환성](../guides/installation.md#version-compatibility)은 혼합 데스크톱 / 백엔드 버전을 약속하지 않습니다.

[공식 런타임 가이드](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md), [CLI](cli.md) 및 [작업 SDK](api.md)를 참조하십시오.

## 웹 작업공간의 Compute {/* #web-compute */}

독립 실행 웹 작업공간은 **Compute** 를 제공합니다. 단, 백엔드가 필요한 Notebook·Compute API를 지원해야 합니다. 연결된 작업공간에서 패널을 확인하고 기존 SSH/Slurm 설정 절차를 따르세요. 패널이 보인다고 원격 인증 정보가 제공되거나 작업 실행이 보장되지는 않습니다.
