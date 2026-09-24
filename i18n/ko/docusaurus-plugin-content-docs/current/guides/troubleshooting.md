---
title: "문제 해결 및 일반적인 질문"
last_update:
  date: '2026-09-24'
---

# 문제 해결 및 일반적인 질문 {/* #troubleshooting-and-common-questions */}

아래의 오류 텍스트를 찾아, 영향을받은 작업에 대한 체크를 따르고, 그 작업을 재개합니다. 문제가 발생하면 오류가있는 [버그를보고 또는 커뮤니티에 요청](#report-a-bug-or-ask-the-community) 및 트리거 된 단계.

<span id="provider-test-fails" />

<span id="pythonr-or-package-installation-fails" />

<span id="file-does-not-open-in-preview" />

<span id="remote-control-is-unreachable" />

## 실패의 점에 의해 진단 {/* #diagnose-by-the-point-of-failure */}

| 관련 기사 | 처음 화면 | 활동과 성공 상태 |
| --- | --- | --- |
| 앱은 빈 작업 공간을 엽니다. | 데이터 위치, 프로필 및 아카이브 | 임의 루트 / 프로젝트로 돌아가기; 즉시 교체를 만들지 마십시오 |
| 쓸모 없는 모형 | 공급자 로그인, 활성 에이전트, 모델 호환성 | [공급자 설정](providers.md): 작은 실제 응답 성공 |
| 로그인이 연결되었지만 작업이 실패합니다. | 확장된 공급자 과 선택된 모형 | Recheck 인증 / 제목 및 모델 식별자; UI 존재는 접근 증거가 없습니다 |
| 작업이 중지되었습니다. | 대출 계획, 승인 또는 상호 작용 카드 | 눈에 보이는 요청에 응답; 허용하기 전에 범위를 읽으십시오 |
| Queued 보정은 실행되지 않습니다 | 저장되지 않음 / 전송 / deferred-delivery 상태 | [채용 정보](composer.md): 사용자 메시지가 확인되었습니다. |
| 모듈을 찾을 수 없습니다 | Exact 해석기 및 포장 재고 | [런타임](runtimes.md): 선택한 환경에서 수입을 검증 |
| 승인된 포장은 아직도 실패합니다 | 첫번째 네트워크/proxy/certificate 과실 | [네트워크](network.md): 그것의 원인을 고치기 후에 실제적인 가동을 재시동합니다 |
| Notebook 파일을 읽을 수 없습니다 | 관리된 경로, 부착, 폴더 보조금 및 버전 참조 | 허용된 입력을 사용하십시오; 관련 파일시스템 접근을 확장하지 않음 |
| Saved-file 서비스는 작업 경로를 거부합니다. | 관리 간행물에 등록하는 것 | 지원되는 artifact 가동을 통해 저장하십시오; 결과 파일을 다시 열 |
| 테이블은 예상 번호와 다릅니다. | Source hash, delimiter, 메타데이터 열 및 계산 디노미네이터 | 예상값을 변경하기 전에 동일한 입력에서 계산 |
| 파일이 표시되지만 미리보기는 실패 | 파일 형식 / 크기, 버전 및 렌더링 오류 | [뉴스 레터](previews.md): 파일 부채에서 렌더링을 구별하는 다운로드 |
| 참고가 누락되었습니다. | 라이브러리보기, 필터, Inbox 또는 Trash | 명확한 필터, 상태를 검사하고 올바른 수명주기에서 복원 |
| 전체 텍스트 소스 발견하지만 첨부 파일이 실패 | 실제 다운로드 결과 및 PDF 유효성 검사 | 다른 합법적 인 소스 / 지역 PDF을 사용하여 첨부 파일을 엽니다. |
| Side Chat 사용 가능 | Agent/provider 호환성 메시지 | [위임](delegation.md): 선택한 프레임에 의해 표시된 호환성 제한 확인 |
| 원격 작업은 실행할 수 없습니다 | 실제 호스트, 인증, 스케줄러 및 실행 시간 단축 | [먼 compute](remote-compute.md) |

<span id="storage-migration-reports-an-error" />

## HTTP 오류: 400, 403, 429 및 5xx {/* #http-errors-400-403-429-and-5xx */}

HTTP 상태는 모델 공급자, Connector 서비스, 로컬 브라우저 서비스 또는 프록시의 응답을 설명합니다. **설정을 변경하기 전에 응답 서비스를 식별합니다.**은 오류 바디와 함께 상태를 복사합니다 : `403` 혼자는 API 권한, 프록시 정책 또는 자원 제한이 거부되는지 알려지지 않습니다.

<span id="permission-request-keeps-waiting" />

### 요청, 인증 및 액세스 {/* #request-authentication-and-access */}

| 상태 | 이름 &#42; | Open-Science에서 확인하는 방법 |
| --- | --- | --- |
| **400 나쁜 요구** | 서비스 요청을 거부합니다. | 이름 필드 또는 매개 변수를 읽으십시오. 공급자 endpoint, 모델 식별자 및 지원 요청 기능을 확인하십시오. 도구 통화의 경우 입력 스키마를 확인하십시오. 첨부 파일 또는 옵션 기능이 오류를 유발하는 경우 작은 텍스트 전용 요청을 시도하십시오. |
| **401 인증** | 유효한 인증은 누락됩니다. | 계정을 확인하거나 실패 서비스 사용 자격 증명. 관련 가입 / OAuth 계정을 다시 연결하거나 API 키를 수정하십시오. [공급자 설정](providers.md) 또는 [커넥터 자격 증명](connectors.md). |
| **403 포드** | 이 서비스는 접근을 거부합니다. | Model/resource entitlement, 조직/프로젝트 권한 및 서비스의 명시된 액세스 제한을 확인하십시오. 오류가 말하면 **HTTP 연결 403**, 검사합니다 [프록시 또는 네트워크 정책](network.md), 오히려 모델 키가 잘못되어있다. |
| **404 발견되지 않음** | endpoint 또는 리소스는 해당 주소에서 사용할 수 없습니다. | 기본 URL, API 경로 및 모델 / 리소스 ID를 확인하십시오. 브라우저 웹 사이트 URL은 반드시 API 엔드포인트가 아닙니다. 서비스는 404을 사용하여 접근 가능한 리소스를 숨길 수도 있습니다. |
| **405 방법 허용되지 않음** | endpoint는 이 요청 방법을 지원하지 않습니다. | 선택한 API 프로토콜과 서비스 문서에 대한 Connector 운송을 확인합니다. 다른 방법을 추측하는 것 보다는 오히려 재현 가능한 통합 mismatch를 보고하십시오. |
| **407 프록시 인증 필수** | 프록시는 인증이 필요합니다. | 네트워크 관리자와 프록시 구성을 확인합니다. 모델 API 자격은 프록시를 인증하지 않습니다. |
| **413 내용 너무 큰** | 요청 몸은 한계를 초과합니다. | 첨부 파일/배치 크기를 감소시키거나 지원되는 작은 입력을 사용하십시오. 해당 서비스에는 제한이 부과됩니다. |
| **422 처리할 수 없는 내용** | 요청 내용이 제공될 수 없습니다. | 필드 레벨 검증 메시지를 읽으십시오. 올바른 유형, 필요한 필드 또는 도구 / 프로비저 요청에서 지원되지 않은 값. |

**400 및 403 필요 다른 체크:** for 400 that names an unsupported 매개 변수, 그 요청 기능을 수정. 403의 경우 제한된 모델명을 입력하여 해당 모델에 액세스할 수 있습니다. 정확한 원인이 나타나지 않으면 응답 및 요청 ID를 보호하십시오. 혼자 번호에서 원인을 하지 마십시오.

### Quotas 및 임시 서비스 실패 {/* #quotas-and-temporary-service-failures */}

| 상태 | 이름 &#42; | 다음 작업 |
| --- | --- | --- |
| **402 지불 필수** | 공급자 특정한 지불/액세서리 취급; HTTP은 보편적 인 청구 의미없이이 상태를 예약합니다. | 공급자의 오류 몸과 계정 페이지를 읽으십시오. 혼자 번호에서 top-up을 가정하지 마십시오. |
| **429 너무 많은 요구** | 제한되는 비율; 몇몇 모형 APIs는 또한 배출한 할당량을 위해 그것을 이용합니다. | 비율 제한을 위해, 동시 요청을 감소시키고 대기 **재류 후** 또는 문서화 된 재설정. 할당된 오류의 경우, 해당 서비스의 수당/비용을 확인합니다. 구독 제한 및 API 크레딧 잔액은 별도입니다. |
| **500 내부 서버 오류** | 응답 서버가 실패했습니다. | 서비스 상태 확인. 안전한 경우 일시 중지 후 작은 요청을 복원하십시오. 요청 ID를 가진 반복된 실패를 보고하십시오. |
| **502 배 게이트웨이** | Gateway는 잘못된 업스트림 응답을 받았습니다. | Gateway/provider를 식별하고 상태를 확인하고 upstream을 구성합니다. 지속적인 사용자 정의 게이트웨이 실패는 관리자가 필요할 수 있습니다. |
| **503 서비스 사용 불가** | 이 서비스는 일시적으로 사용할 수 없습니다. | Retry-After를 따르고 복구를 기다립니다. 로컬 엔드포인트의 경우, 해당 모델 서버가 실행되고 준비된 것을 확인합니다. |
| **504 게이트웨이 타임아웃** | 대기 업스트림의 게이트웨이. | 다시 시도하기 전에 이미 시작하거나 완료했는지 확인하십시오. 분석, 작업 제출 또는 artifact 쓰기, 복제를 방지하기 위해 기존 결과를 먼저 검사합니다. |

몇몇 붙박이 Connector 요구는 429, 500, 502, 503 및 504를 위한 자동적인retries를 경계했습니다. 이 모든 모델/프레임웍에 적용되지 않거나 반복된 수동 제출을 안전하게 만들 수 없습니다. 특정 서비스의 응답을 따르십시오.

### HTTP 응답 없음, 또는 아직도 실패 {/* #no-http-response-or-still-failing */}

`ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT` 및 인증서 오류는 HTTP 상태 코드가 아닌 연결 / TLS 실패입니다. 요청 타임 아웃은 자동으로 HTTP 408 또는 504입니다. [네트워크](network.md)로 시작하십시오.

설정 변경 후, 같은 공급자 / Connector을 작은 요청으로 테스트 한 다음 영향을받는 작업을 재발시킵니다. 여전히 실패하면 [관련 기사](#report-a-bug-or-ask-the-community)을 사용합니다. 서비스 이름, 비밀, 상태, 오류 몸, 요청 ID 없이 endpoint host/path를 포함하십시오. 현재 및 시간/시간 영역. 권한 헤더 또는 토큰 비교 URL을 공개 보고서로 붙여 넣지 마십시오.

## 오류 메시지 일치 {/* #match-the-error-message */}

정확한 코드를 복사하고 실패 도구, 대화 상자 또는 로그에서 메시지를 동반합니다. **이름 &#42;**, Python 예외 이름 및 OS 메시지는 식별자의 다른 종류입니다; Open-Science은 모든 실패에 하나의 범용 숫자 코드를 할당하지 않습니다. 메시지는 몇 가지 원인을 가질 수 있습니다. 원격 작업의 경우 [SSH 및 compute 오류 테이블](remote-compute.md#resolve-ssh-and-job-errors)을 사용하십시오.

| 코드 또는 메시지 | 의미와 다음 활동 | 자주 묻는 질문 |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | 선택한 Python 해석기는 모듈을 가져올 수 없습니다. 인증현황 [런타임](runtimes.md), 지원된 패키지 관리 노선을 통해 해당 환경에서 필요한 패키지를 설치하고, 재시작 명령을 따르십시오. | 동일한 Notebook 환경에 있는 단위를 수입하고, 그 후에 실패한 세포를 재시작하십시오. |
| `ENOENT` / `No such file or directory` | 요청된 경로는 찾을 수 없습니다. 파일명과 소스 위치를 확인; 참조가 stale이라면 기존 파일을 다시 첨부합니다. | 미리보기 또는 같은 작업에서 의도 된 입력을 읽으십시오. |
| `EACCES` / `EPERM` / `Permission denied` | 작업은 파일 시스템 액세스가 부족합니다. OS 권한과 프로젝트의 폴더 권한을 모두 검사; 제품 정보 [프로젝트](projects.md) 작업이 필요한 디렉토리만 부여할 수 있습니다. SSH를 위해 `Permission denied (publickey)`, 대신 인증 확인. | 원래 읽기 / 쓰기를 반복 임의 권한 범위 내에서. |
| `ENOTDIR` / `Not a directory` | 디렉토리 작업은 파일 또는 잘못된 부모 경로를 받았습니다. 실제 포함 된 폴더를 선택하십시오. | 디렉토리 목록이 열립니다. |
| `EISDIR` / `Is a directory` | 파일 작업은 디렉토리를 받았습니다. 예정된 파일을 선택하십시오. | 파일이 열거나 다운로드됩니다. |
| 패키지 요청은 비공개 목적지를 위해 거부 | 거부된 호스트를 검사하고 IP를 해결합니다. 프록시 또는 DNS 구성은 네트워크 정책 블록을 공급할 수 있습니다. 이름 &#42; [네트워크](network.md); 블라디게이션 접근 대신 주소 해상도를 수정합니다. | 원래 패키지 요청 및 이후 수입 모두 성공. |

<span id="agent-does-not-start-or-the-session-stops-progressing" />

### Database 시작 오류 {/* #database-startup-errors */}

이 코드는 앱이 데이터를 안전하게 열 수 없을 때 나타납니다. 기존 데이터 폴더를 유지하십시오. 구출하기 전에 오류 세부 사항 읽기; 데이터베이스를 삭제하는 것은 수리 단계가 아닙니다.

| 오류 코드 | 이름 &#42; | 다음 작업 |
| --- | --- | --- |
| `database_runtime_unavailable` | 번들 된 데이터베이스 엔진은로드 실패. | 적절한 공식 앱 패키지를 제거하고 별도의 데이터 폴더를 유지합니다. |
| `database_open_failed` | 데이터베이스가 열 수 없습니다. 또 다른 앱 인스턴스, 충분한 디스크 공간 또는 읽기 전용 위치가 발생할 수 있습니다. | 다른 인스턴스를 Quit, 무료 공간 및 폴더 권한 확인, 다음 다시. |
| `database_newer_than_app` | 새로운 앱 버전은 이 데이터 형식을 썼습니다. | 호환되는 새 릴리스를 설치하고 동일한 데이터 폴더를 다시 엽니다. 스키마를 내리려고하지 마십시오. |
| `database_history_invalid` | 마이그레이션 역사는 앱의 예상된 기록과 일치하지 않습니다. | 폴더를 보존하고 코드를 보고합니다. 알려진 좋은 백업이있는 경우 데이터를 교체하기 전에 복구 절차를 모색하십시오. |
| `database_migration_failed` | 데이터베이스 업데이트가 완료되지 않았습니다. | 무료 공간, 기타 인스턴스 및 권한 확인; 사용할 때 Retry를 사용하십시오. 다시 실패하면 마이그레이션 ID를 포함. |
| `database_validation_failed` | 저장된 자료는 필수 구조를 만나지 않습니다. | 앱과 재시작을 업데이트합니다. persists가 있다면, 데이터베이스 행을 편집하는 것보다 코드를보고. |
| `database_startup_unavailable` | 데이터베이스 시작 서비스는 응답하지 않았거나 검사를 완료하지 않았습니다. | 재시동; 그것을 persists, 완전히 종료하고 앱을 다시 열면, 그 다음 그것을보고. |

복구는 시작 화면이 명확하고 예상 된 프로젝트가 열립니다. **Still stuck? Create an issue for help** 액션이 사용 가능한 경우, 검토 흐름을 사용하여 [이름 &#42;](#report-a-bug-or-ask-the-community) 설명. 이러한 의미는 [스타트업 안내](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx)을 따르고 있습니다.

시작 화면만 **Quit**을 제공한다면, 앱을 종료하고, 보고한 원인을 해결하고 다시 시작하십시오. **Retry**을 사용하시면 페이지가 제공될 때만 사용할 수 있습니다. 복구 후, 예상된 프로젝트와 파일을 다시 열 수 있습니다.

![데이터베이스가 열릴 때의 시작지도](/img/open-science/local-acceptance/startup-database-error.webp)

### 복구 메시지 {/* #recovery-messages */}

| 관련 기사 | 다음 작업 |
| --- | --- |
| Compute 작업은 저장 복구 후 누락 유지 | 영향을받는 대화 통지를 읽고, 식별 된 파일을 보존하고, 유효 사본을 복구하고 선택 **Recheck saved conversations**. 다른 제출하기 전에 동일한 작업을 검사합니다. |
| PDF 업로드 취소하지만 참조는 남아있다 | 저장된 참조를 열고 첨부 파일 상태를 확인합니다; 일괄의 사용 **Retry unfinished** 제안되는 경로. |
| 컬렉션은 다른 클라이언트가 그것을 편집 한 후 거부 | 다시 저장하기 전에 최신 컬렉션 및 재구성 변경을 엽니다. |
| Windows 업데이트 보고서 거부 액세스 | 정확한 파일 경로와 Windows 오류를 읽으십시오. 관리자로 공식 설치 프로그램을 사용하는 통지의 지시를 따르십시오. |
| Windows 업데이트는 사용중인 파일을보고 | 그 설치 파일을 사용하여 확인 된 프로세스를 닫고, 다음 선택 **Retry**, 또는 **Cancel** 업데이트 중지. |

Windows 오류는 HTTP 상태 코드의 운영 체제 코드입니다. 복구가 실패하면, 설치 된 버전, 정확한 메시지 및 질화 된 파일 / 작업 정체성을 포함 할 때 [문제 보고](#report-a-bug-or-ask-the-community).

## 로컬 Windows 데이터를 재설정 {/* #windows-data-reset */}

독립 리셋 유틸리티를 사용하면 로컬 설치의 데이터를 삭제하고 시작 할 때만 사용하십시오. **그것은 영구적으로 나열된 데이터 및 저장된 자격 증명을 삭제; 그것을 수리하지 않고 그들을 백업합니다.** 복사 필요한 연구 파일 및 백업 외부 모든 목록 디렉토리 먼저. 앱을 다시 설치하면 이 데이터를 유지합니다.

1. 으로 [공식 리셋 가이드](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md), 모두 다운로드 `reset-open-science.cmd` 으로 `reset-open-science.ps1` 의 특징 **다운로드 raw file**... 앱의 데이터 디렉토리 밖에서 함께 유지하십시오.
2. 트레이 프로세스를 포함하여 Quit Open-Science, 및 마무리 및 에이전트, Notebook, 헤드리스 및 WSL 프로세스를 닫습니다. 정상적인 Windows 계정을 사용하십시오; 관리자 모드가 필요하지 않습니다.
3. 명령 프롬프트에서 다운로드 폴더에 열렸는데, `reset-open-science.cmd -Preview`을 실행합니다. 모든 제안 된 데이터, 구성, 프로필 및 실행 시간 캐시 경로 검토. 미리보기는 데이터를 삭제하지 않습니다.
4. 그 위치를 검토하고 백업 한 후 만, 더블 클릭 `reset-open-science.cmd`. 삭제하기 전에 `RESET OPEN SCIENCE`을 정확히 입력하도록 요청합니다. 다른 응답 취소.
5. 앱을 재개하기 전에 최종 결과를 읽으십시오. 완료된 리셋 후, 데이터 위치를 선택하고 공급자를 구성하고 관리된 런타임을 다시 선택합니다.

프로세스가 실행되거나 검사 될 수없는 경우, 또는 경로는 안전하지 않습니다,보고 된 조건을 먼저 해결. 퇴거를 우회하지 마십시오. 설정이 손상되거나 사용자 정의 데이터 위치가 관여되면 공식 가이드의 명시적인 `-DataRoot` 절차를 사용하십시오. 삭제 오류는 부분 재설정을 남기 수 있으므로 변경하지 않고 오류를 읽을 수 있습니다. 이 유틸리티는 외부 공급자 계정을 수정하거나 별도로 Python/R 환경을 설치하지 않습니다.

<span id="collect-evidence-for-a-report" />

## 유용한 진단을 수집 {/* #collect-useful-diagnostics */}

1. 기록 앱 버전, OS, 활성 에이전트 / 모델, 프로젝트 / 세션 및 실패의 시간.
2. 첫 번째 관련 도구 오류 및 작동을 복사합니다. 예상된 versus는 행동을 관찰합니다.
3. 입력 문제를 위해, 공공 소스 링크, 파일 이름, 크기 및 체크섬을 포함합니다; 최소 재현 가능한 입력은 관련 스크린 샷보다 더 유용합니다.
4. **Settings → General → Diagnostics**을 열고 **오픈 / Reveal**을 사용하여 실행 시간 로그를 사용할 수 있습니다.
5. 공유하기 전에 로그 검사; omit 계정 토큰, 개인 소스 콘텐츠 및 관련 경로. 로그인이 자동으로 전송되지 않습니다.
6. 동일한 가동이 변화 후에 성공한다는 것을 국가. 활성화된 버튼은 성공 상태가 아닙니다.

기술 메시지 의미는 [진단 참고](../reference/diagnostics.md)에서 수집됩니다.

### 1개의 회의를 위한 수출 진단 {/* #session-diagnostics */}

1. 영향을 받은 세션을 열고 세션 메뉴에서 **Export diagnostics…**을 헤더 또는 **Export → Export diagnostics…**에서 선택합니다.
2. 사용 가능한 소스를 검토합니다. **session.json** 및 **Session database records**은 선택한 세션에 관심. **메인.로그** 및 역사적인 응용 프로그램 로그는 다른 세션에서 메타 데이터를 포함 할 수 있습니다; 관련할 때만 선택한다.
3. **Export**을 선택하고 로컬 목적지를 선택하고 **Diagnostics exported.** 사용 **Show in folder**를 기다리는 아카이브를 찾습니다.
4. 공유하기 전에 그것의 표시 및 수출 통나무를 검사하십시오. 누락되거나 손상된 근원은 요약되거나 손상될지도 모릅니다; 아카이브의 존재는 혼자는 모든 소스가 캡처되지 않습니다.

![지역 수출 전에 세션별 진단 소스 선택](/img/open-science/v0330/session-diagnostics.webp)

Ordinary metadata 수출은 개인적인 내용 분야를 제외합니다. .science 수출이 민감한 콘텐츠 검사를 트리거하면 소스 목록은 redacted 스캐너 증거와 원본 조각 파일이 포함될 수 있습니다. **Original 민감한 파일은 기본적으로 검사되지 않습니다. 선택은 아카이브에서 원래 바이트를 포함합니다.** 필요한 소스만 선택하고 공유하기 전에 아카이브 및 스크린 샷을 검사합니다. 수출은 지역 주민을 유지하고 업로드 또는 모델 요청을하지 않습니다. 이것은 진단 증거, 연구 백업이 아닙니다; 연구 handover를 위한 [.science 패키지](research-packages.md)를 사용하십시오.

## 버그를보고 또는 커뮤니티에 요청 {/* #report-a-bug-or-ask-the-community */}

| 당신은 필요 | 채널 |
| --- | --- |
| 설정을 선택하거나 오류를 이해하는 데 도움이 | [Discord에 AIPOCH 공식 가입](https://discord.gg/zxQAYjReRv). 작업, 버전 및 오류에 대해 다른 사람이 도움이 될 수 있습니다. |
| reproducible app 실패는 해결책에 추적했습니다 | 검색 [기존 문제](https://github.com/aipoch/open-science/issues), 다음을 엽니 다 [버그 보고서](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml). |
| 새로운 기능 또는 개선 | 공지사항 [기능 요청](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml) 그리고 연구 작업을 설명합니다. |

### 유용한 GitHub 문제 제출 {/* #submit-a-useful-github-issue */}

1. 오류 코드 또는 독특한 구문을 사용하여 기존 문제를 검색합니다. 같은 문제가 존재하는 경우, 관련 재생산 세부 정보를 추가하십시오.
2. GitHub에 로그인하고 **버그 보고서**을 엽니다. 실제 오류로 `[Bug]: database_open_failed when reopening a project`과 같은 제목을 사용하십시오.
3. **무슨 일이 있었습니까?**, **reproduce에 단계**, **운영 체계** 및 **App version**에서 채우십시오. 관련 할 때 **Provider / model** 추가, 활성 에이전트 프레임 워크.
4. **관련 로그 또는 스크린 샷**의 밑에, 첫번째 과실 및 주변 상황의 작은 총계를 포함합니다. 문제가 입력 데이터에 달려 있을 때 공공 또는 최소 샘플을 추가하십시오.
5. 보고서를 검토하고 제출하십시오. 문제 URL을 유지하고 같은 문제에서 제안 된 체크의 결과를 게시하십시오. GitHub가 계정 생성을 제공하지 않는 경우 적절한 보고 경로를 찾는 데 도움이되는 Discord를 사용하십시오.

문제 또는 Discord 질문을 준비 할 때이 체크리스트를 사용하십시오.

```text
Open-Science version and installation method:
Operating system and architecture:
Agent framework / provider / model (if relevant):
Page and action:
Steps to reproduce:
Expected result:
Actual result:
Exact error code and full message:
Time of failure and time zone:
Public/minimal input (if needed):
Checks already tried and their results:
Relevant log excerpt or screenshot:
```

원격 실패를 위해, 또한 실행 형태, 앱 작업 ID, 스케줄러 작업 ID는 현재, 종료 부호 및 관련 stdout/stderr를 포함합니다. 개인 호스트를 위한 중립 별명을 사용합니다. 암호, 토큰, SSH 개인 키, 환자 데이터 또는 전체 개인 연구 폴더를 첨부하지 마십시오. 최소 예에서 민감한 세부 사항을 대체합니다.

<span id="report-directly-from-a-startup-error" />

### 오류에서 보고서를 준비 {/* #prepare-a-report-from-an-error */}

대화 오류 옆에 **Report this error**을 선택하십시오. 시작 화면은 또한 **Still stuck? Create an issue for help**을 제공 할 수 있습니다.

1. **Error details**을 읽고 공유하기 전에 개인 경로, 식별자 또는 민감한 입력을 제거합니다.
2. 응용 프로그램 버전, 운영 체제, 에이전트 프레임 워크, 공급자 / 모델 및 실행 버전에 대한 **Also included** 확인.
3. **Copy details**을 사용하여 편집 된 텍스트 및 환경 정보를 복사합니다. **Reveal log file** 로컬 실행 로그를 찾습니다; 공유하기 전에 별도의 검토가 필요하지 않습니다.
4. **Open GitHub issue**을 활성화하려면 public-sharing acknowledgment를 확인하십시오. 오류 텍스트 편집은 다시 수정 된 내용을 검토하고 acknowledging해야합니다.
5. GitHub 양식을 열고, 사전 작성된 필드를 검사하고, 유용한 재생산 단계를 추가하고, 준비 할 때 제출하십시오. 보고서를 열어 혼자서 문제를 제출하지 않습니다.

![편집 가능한 오류 세부 사항 및 public-sharing 확인](/img/open-science/sept11-completion/report-preview.webp)

## 자주 묻는 질문 {/* #common-questions */}

**모든 작업에 대한 모델 계정이 필요합니까?** 아니. 지역 검색, 조직 및 많은 설정은 모델없이 작동 할 수 있습니다. 에이전트 응답, 분석 계획 및 모델 생성 리뷰 필요 호환 모델 액세스.

**로컬 저장소는 장치에서 모든 처리 숙박을 의미합니까?** 아니. 선택된 프롬프트, 파일 또는 검색된 콘텐츠는 사용시 구성된 모델/서비스로 전송될 수 있습니다. 로컬 파일 및 모델 실행 위치는 별도의 질문입니다.

**오프라인 작업을 할 수 있습니까?** 기존 로컬 파일 및 사용 가능한 로컬 전망은 사용 가능. Hosted 모델, 온라인 데이터베이스 및 누락 된 패키지 다운로드는 해당 연결이 필요합니다. 원격 / 로컬 엔드포인트는 자체 실행 서비스를 필요로 합니다.

**사용은 청구서 또는 구독 잔액?** 아니. 그것은 유효한 telemetry를 보고합니다. 사용법은 0이 아닙니다; 서비스 청구/제한은 별도 유지됩니다.

**아카이브를 다시 실행합니까?** 아니. 유지 작업에 대한 탐색을 복원합니다. 라이브 커널 또는 실패 작업은 여전히 명시된 재시작 / 재시작을 필요로 할 수 있습니다.

**성공적인 SSH 테스트는 분석이 실행될 수 있음을 의미합니까?** 아니. 선택한 실행 모드, 스케줄러 권한, 실행 시간 및 리소스 요청을 확인한 다음 작은 작업을 실행하고 출력을 검사합니다. [먼 compute](remote-compute.md) 참조.

소스: [HTTP 매혹적인](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), [429 및 리트리 후](https://www.rfc-editor.org/rfc/rfc6585.html#section-4), [OpenAI rate-limit versus 할당량 오류](https://developers.openai.com/api/docs/guides/error-codes), [Connector 리트리 정책](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts).

소스: [queue 복구 통지](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx), [PDF 일괄 처리](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [수집 분쟁](https://github.com/aipoch/open-science/commit/dbb9560a), [Windows 설치](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh).

출처: [버그 보고서 필드](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml), [시작 보고 대화 상자](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx).
