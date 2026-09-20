---
title: "서비스 자격"
last_update:
  date: '2026-09-20'
---

# 서비스 자격 {/* #service-credentials */}

서비스의 **Settings → Credentials**에 대한 자격 증명을 실제로 요청합니다. Codex 구독 공급 모델 액세스; OpenAlex, GitHub 또는 사용자 정의 MCP 계정을 제공하지 않습니다.

## 내장 서비스 항목 {/* #built-in-service-entries */}

| (주) | 현장 및 목적 | 자주 묻는 질문 |
| --- | --- | --- |
| GitHub | Skill discovery/imports에 대한 개인 액세스 토큰 | Connect/Manage와 토큰 컨트롤을 사용하십시오. 그런 다음 의도 된 저장소 작업을 테스트합니다. |
| 문헌 접근 | 이메일 및 선택 사항 NCBI API 키 | 연락처 정보; NCBI 키는 지원되는 요청에 대한 옵션입니다. |
| OpenAlex | 문학의 OpenAlex 작업을위한 API 키 | 입력된 키를 검증하고 저장하고 바인딩 된 쿼리를 만듭니다. |
| Unpaywall | 전체 텍스트 위치 검색에 대한 연락처 이메일 | 설정된 문헌 접촉 이메일; 발명 된 주소. |

**Connect**은 구성되지 않은 서비스를 엽니다; **Manage**은 기존의 하나가 열립니다. **Desktop only**은 credential 작업이 데스크탑 컨텍스트를 필요로한다는 것을 의미합니다. 저장된 키 표시기는 비밀 값 자체가 아닙니다.

## 누락된 OpenAlex 열쇠 추가 {/* #openalexs-actual-missing-key-flow */}

1. OpenAlex 검색을 요청하면 키가 구성되지 않습니다.
2. 대화는 **API key** 필드와 **Add your OpenAlex API key**을 표시합니다.
3. **Save key**는 입력된 열쇠를 저장하고 성공적인 때 대기 통화를 재개합니다. **Not now**는 credential unconfigured를 떠납니다.
4. 마지막 도구 상태를 읽으십시오. **Not now**를 선택하면 **credential_required**을 반환할 수 있습니다. retrying의 앞에 열쇠를 구성하십시오.

![OpenAlex 영어 앱의 자격 요청](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

이 컴퓨터에서 키가 암호화되고 `api.openalex.org`에서만 전송되는 신속한 상태. 설정에서 OpenAlex 양식도 제공 **Validate**· **Save**· **Remove key** 1개가 존재할 때, **Cancel**... 교체 분야는 저장된 열쇠를 계시하지 않습니다. Secure-storage 오류는 비밀을 저장하기 전에 시스템 키 체인 상태를 해결해야합니다.

## 주문 연결관을 위한 Credentials {/* #credentials-for-custom-connectors */}

여기에서 자격 증명을 작성한 다음 [커넥터 구성](../guides/connectors.md)의 이름을 선택합니다. 변화를 바꾸거나 공유된 자격 제거하기 전에 소비자를 검사하십시오.

### 새 자격 증명 {/* #new-credential */}

| 필드 또는 버튼 | 작업 |
| --- | --- |
| 이름 | 인식 가능한 로컬 라벨을 제공합니다. |
| 유형 | 제품 정보 **API key**, **Access token**, 또는 **OAuth**. |
| 값 | Key/token을 위한 마스크 필드에 비밀을 입력합니다. 빈 필수 필드는 저장을 계속합니다. |
| OAuth → 자원 URL | 정확한 리소스 엔드포인트를 공급합니다. Connector 일치는 자원 URL, 수송 및 등록에 달려 있습니다. |
| 고급 → 운송 | OAuth 서비스에 의해 요구되는 수송을 선택하십시오; Streamable HTTP은 검사된 기본이었다. |
| 범위 | 공백 또는 commas에 의해 분리되는 범위를 입력하십시오. |
| 사전등록된 클라이언트 사용 | 표시 **Authorization server URL**, **Client ID**, **콜백 URL**, 및 **Client secret**. |
| 콜백 URL / 복사 | 검사된 기본값은 `http://127.0.0.1/oauth/callback`; 서비스 등록을 위해 복사하거나 custom-callback 옵션을 확장하십시오. |
| 팟캐스트 | 적용 가능한 경우, 서버 메타데이터를 발견; 이것은 성공적인 로그인이 아닙니다. |
| 취소 / 저장 | 초안을 훼손하거나 유효한 자격 증명 구성을 저장합니다. |

![OAuth 고급 등록 필드](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

사용자 정의 Connector에서, 헤더, 환경 변수, 또는 OAuth selector에 credential을 바인딩합니다. 이름은 참고입니다; 설명 또는 프로젝트 지침에 비밀 값을 배치하지 마십시오. 수출된 휴대용 윤곽은 placeholders로 비밀을 대체합니다. 저장된 자격 증명은 여전히 실제 서비스 / Connector 테스트가 작동하도록해야합니다.

## 검증 및 문제 해결 {/* #verify-and-troubleshoot */}

저장 후에, 1개의 작은 가동을 반복하고 그것의 응답을 검열하십시오. `credential_required` 을 사용하여 누락 된 비밀, 401 인증 실패에 대한 조사, 그리고 403 를 위해 denied access/policy 를 조사; 403는 열쇠를 대체해서 보편적으로 고쳐지지 않습니다. 429 문제율/사용 제한. 서비스의 실제 몸을 읽고 [문제 해결](../guides/troubleshooting.md)을 참조하십시오.

자격 제거는 모든 Connector에 영향을 미칠 수 있습니다. Connector 및 Specialist 수출은 준비된 비밀/신탁을 제외합니다; 수신 장치에서 다시 구성하십시오. Skill, 프롬프트, 스크린 샷 또는 문제 보고서에 비밀을 붙여 넣지 마십시오.

OpenAlex 쿼리는 유효한 OpenAlex 열쇠를 요구합니다. OAuth 연결관은 지명한 서비스의 표시에서 완료해야 합니다. 동일한 작은 쿼리를 복원하기 전에 표시된 인증 오류를 해결합니다.

구현 참조 : [이메일: sales@tsx.com](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [커넥터AddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx).

[CLI/SDK 자격 관리](../reference/cli.md#manage-connectors-and-credentials)은 인증된 로컬 액세스를 통해 공유된 자격 증명을 만들 수 있습니다. Linux 헤드리스 설치는 [암호화된 파일 저장](../reference/server.md#credential-storage-on-headless-linux)을 명시적으로 선택할 수 있습니다; 데스크톱 자격은 정상적인 OS-storage 동작을 유지합니다. 이 옵션은 Compute 암호 저장을 해결하지 않거나 처음 OAuth 로그인을 시작하지 않습니다.

## 공식 API 키 페이지 열기 {/* #official-api-key-page */}

v0.31.0에서, OpenAlex 및 NCBI 자격 증명 프롬프트는 공식 API 키 페이지에 대한 링크가 포함되어 있습니다. 양식 초안을 열고 Connector 통화를 대기합니다. 서비스로 계정 단계 완료, 자격 양식에 반환, 다음 유효성 검사 및 쿼리를 복원하기 전에 의도 된 키를 저장. 키 페이지를 열어서 키를 저장하지 않고 대기 질의를 완료합니다.
