---
title: "네트워크, 프록시 및 패키지 미러"
last_update:
  date: '2026-11-19'
---

# 네트워크, 프록시 및 패키지 미러 {/* #network-proxies-and-package-mirrors */}

모델, Notebook 요청 또는 패키지 다운로드가 대상에 도달 할 수 없을 때 **Settings → Network**을 엽니 다. 이 페이지는 연결 상태를 분리, Notebook 허용 도메인, 프로세스 프록시 및 패키지 미러. 녹색 연결 체크는 모든 보호된 Notebook 요구가 성공한다는 것을 증명하지 않습니다.

실패 작업 시작 : 공급자 요청, Notebook 네트워크 액세스 및 패키지 설치 프로그램은 다른 루트를 사용할 수 있습니다. 이 설정을 변경하면서 호스트 이름과 정확한 오류를 유지하십시오.

## 네트워크 상태 읽기 {/* #read-network-status-first */}

상태는 네트워크 링크 정보와 패키지 레지스트리 프로브를 결합합니다. **READY · 패키지 등록은 도달 할 수 있습니다.**은 프로브가 성공한 것을 나타냅니다. **【특징】**, 제한이 없는 또는 오프라인 상태는 다른 검사 또는 연결 수선이 필요하다는 것을 나타냅니다. 연결 변경 후 **Check again**을 사용할 수 있습니다.

네트워크가 **Ready**을 보고 있지만 도구가 실패하면 도구의 오류가 확장됩니다. 상태 조사는 그것의 자신의 목적지를 검사합니다; 실패한 요청의 호스트 이름과 메시지가 영향을받는 루트를 진단합니다.

| 실패하다 | 다음 검사 | 이 실수로 결론을 피하십시오 |
| --- | --- | --- |
| 공급자 로그인 실패 | 공급자 인증 및 모델 연결 확인 | Notebook 도메인 설정은 모델 자격 증명을 공급합니다. |
| 하나의 연구 hostname은 denied입니다. | **Manage access** 그리고 요청에 있는 정확한 hostname | 광범위한 관련 도메인을 추가하면 수정할 수 있습니다. |
| 패키지 호스트는 이미 허용되지만 CONNECT가 실패합니다. | 설치 로그, 프록시 및 DNS 해상도 | 다른 동일한 허용 클릭은 모든 네트워크 실패를 해결합니다. |
| 인증서 검증 실패 | 구성 된 CA 번들 및 조직의 신뢰 요구 사항 | 인증서 검증을 해제해야 합니다. |
| Package Index는 연결 오류 후 일치하는 배포를 반환합니다. | Earlier 네트워크 메시지 및 선택 Python/platform | 패키지는 존재하지 않아야 합니다 |

<span id="configure-notebook-domains" />

## Relaxed 또는 Strict 네트워킹 선택 {/* #public-network-rules */}

**Settings → Network → Manage access**를 엽니다. 모드는 프로젝트 전반에 걸쳐 보호된 노트북 연결에 적용됩니다. 편집 규칙의 앞에 **Current: Relaxed** 또는 **Current: Strict**를 읽으십시오.

| 주요 특징 | 관련 링크 | 목적지가 허용되지 않을 때 |
| --- | --- | --- |
| **Relaxed** (과태) | HTTPS hostnames, 개인 또는 루프백 서비스에 대한 hostnames를 포함; 저장된 예외는 프로토콜, host/IP 및 포트와 일치 | HTTP 및 직접 IP 연결은 허가를 요구합니다 |
| **Strict** | 프로토콜, 호스트명 또는 IP, 포트로 수동 백리스트와 일치하는 대상 | 권한없이 차단; 수동으로 필요한 규칙을 추가 |

모드를 변경하려면 **Strict** 또는 **Relaxed**를 선택한 다음 설명을 읽고 **Switch to Strict mode** 또는 **Switch to Relaxed mode**를 사용하십시오. 옵션 선택 **Not yet applied** 활성 모드를 변경하지 않습니다.

![엄격한 형태 설명 및 whitelist 그룹](/img/open-science/v130/network-strict.webp)

### Strict 화이트리스트 규칙 추가 {/* #strict-whitelist */}

1. **Strict whitelist**에서 **Add rule**를 선택하십시오.
2. **Network protocol**, **Hostname, IP or pattern** 및 **Port**를 실제 서비스로 설정합니다. 호스트 이름 또는 IP를 사용하여 URL 경로가 아닙니다.
3. **Group**, 또는 **New group…** 및 **Group name**를 선택하고, 다음 **Confirm**를 선택하십시오.
4. 저장된 규칙과 활성 모드를 검사합니다. 예정된 작은 요청을 복원하고 응답을 검사합니다.

![Strict 규칙에 대한 프로토콜, 호스트 및 포트 필드의 예](/img/open-science/v130/network-rule.webp)

정확한 hostname은 subdomains를 포함하지 않습니다. `*.example.org` 경기 하위 도메인 하지만 `example.org` 하지. 프로토콜 및 포트는 규칙의 일부입니다. 포트 443의 HTTPS 규칙은 HTTP 또는 다른 포트를 부여하지 않습니다. Strict는 요청된 hostname과 일치합니다. DNS 결과가 공개, 개인 또는 루프백인지 확인하지 않습니다. 룰을 추가하는 대상에 대한 당신은 코드를 접촉합니다.

**Built-in**와 **Manual**는 규칙 입증을 확인합니다. 내장 그룹은 한 번에 씨앗을 내고, 나중에 편집이 유지됩니다. Neither는 승인 또는 전체 액세스 우회 엄격한 모드를 기억. 네트워크 규칙은 보호된 연결을 재설정하고 전송을 중단할 수 있습니다; 활동적인 이동 끝 후에 변화를 적용합니다.

## Relaxed-mode 예외 저장 {/* #trusted-private-services */}

**Trusted unsafe networks**의 밑에, **Add address**를, 그 후에 **Network protocol**, **Hostname** 또는 IP, **Port** 및 적당한 그룹을 지정하십시오. retrying 전에 저장된 범위를 확인하십시오. 이 예외는 Relaxed 모드에서 일치하는 목적지에 대한 반복 된 허가를 피합니다. 그들은 Strict 모드에서 액세스 권한을 부여하지 않습니다. Strict whitelist는 Relaxed가 선택된 동안 비활성입니다.

규칙은 연결, 성공적인 로그인 또는 유효한 응답을 허용한다. 서비스 자격 및 실제 결과를 별도로 확인합니다. 이 설정은 이전의 public-domain/private-service 형태를 대체합니다. 이전 스크린 샷을 따라 현재 모드와 규칙 필드를 사용합니다.

## 프록시 모드 선택 {/* #choose-a-proxy-mode */}

**Configure proxy**을 선택합니다. 자신의 네트워크 구성에 의해 공급된 프록시 주소를 사용하십시오; 스크린 샷의 포트는 그 컴퓨터에 특정합니다.

| 모드 | 뚱 베어 | 필수 입력 |
| --- | --- | --- |
| **System** | 앱 요청은 장치 프록시를 따릅니다; Agent Process는 앱 시작에서 프록시 환경을 상속합니다. | 명시된 서버 필드 없음 |
| **Manual** | 새 앱 요청 및 고정 프록시 처리 | **Proxy server** URL |
| **Direct** | 새로운 프로세스를 위한 구성된/inherited proxy 없이 연결 | 서버 필드 없음 |

수동 모드는 HTTP, HTTPS, SOCKS, SOCKS4 및 SOCKS5 URL을 허용합니다. URL의 임베디드 자격은 지원되지 않습니다. **Bypass rules**는 직접 연결해야 하는 호스트의 선택적 필수 목록입니다; localhost는 항상 우회됩니다.

1. **Manual**을 선택하십시오.
2. 네트워크에 의해 사용되는 작업 프록시 주소를 입력 **Proxy server**.
3. 관련 목적지가 직접 연결해야 하는 경우에만 우회 규칙을 추가하십시오.
4. **Save**을 선택하고 **Proxy settings saved.**을 기다립니다.
5. 새로운 요청/처리를 시작하고 본래 실패 가동을 시험하십시오. Existing 에이전트 세션, 커널 및 설치자는 기존의 연결을 유지할 수 있습니다.

수동 모드가 **프록시 서버 URL을 입력하십시오.**을 보고하면, 작업 프록시 주소를 입력하거나 **Done**과 함께 초안을 디카운트합니다. 유효한 주소를 저장하는 것은 자체가 프록시가 실패 요청을 수행 할 수 있다는 것을 확인하지 않습니다.

### DNS 또는 프록시 실패 확인 {/* #observed-fake-ip-failure */}

실패 요청에서 정확한 오류를 유지하십시오. timeout, 인증서 오류 또는 프록시 거부는 규칙이 목적지를 허용 한 후 여전히 발생할 수 있습니다. 사용하려는 서비스에 대한 hostname, Protocol, port 및 프록시 경로 확인. 이전 버전의 비-public-address 오류를 현재 Strict-mode matching 규칙으로 치료하지 마십시오. 엄격한 요청된 이름 / IP 및 포트를 확인하고 DNS 주소 클래스가 아닙니다.

원인을 수정 한 후 작은 요청을 복원합니다. 패키지 작업에 대해 설치 및 가져 오기를 확인합니다. 저장된 설정 또는 준비 해석기는 혼자 다운로드가 성공하지 않습니다. 공유 로그에서 자격 증명을 유지하고 지속적 실패를 위해 [문제 해결](troubleshooting.md)를 사용합니다.


## 패키지 미러 및 인증서 신뢰 구성 {/* #configure-package-mirrors-and-certificate-trust */}

패키지 미러 아래 **Configure** 또는 **Edit**을 선택하십시오.

| (주) | 입력 및 효과 |
| --- | --- |
| **Conda channel mirror** | Conda 채널 다운로드에 사용되는 미러 루트 |
| **Python package index (pip)** | Python 패키지 인덱스 URL, 일반적으로 종료 `/simple` |
| **CA bundle path** | 필요한 공공 및 기업 루트를 포함한 완전한 PEM 신뢰 번들에 대한 경로; 빈은 공공 인증서 당국을 사용 |
| **View available mirrors** | 외부 미러 문서 |
| **Save** | 후속 패키지 작업에 대한 구성 저장 |
| **Cancel** | 초안을 덮어 |

![포장 거울과 CA-bundle 입력](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

패키지 미러는 패키지 소스를 변경합니다. 미러의 필수 루트 / 인덱스 형식을 확인, 저장, 선택한 실행 시간에 작은 패키지 작동을 복원. Model-provider 프록시 설정은 별도입니다.

구성 Conda, PyPI 및 CRAN 미러 호스트 이름은 패키지 관리 작업에 대한 임시 액세스를받습니다. 이것은 영구 노트북 도메인 목록에 추가하거나 일반 노트북 코드를 동일한 액세스 권한을 부여하지 않습니다. Redirects는 실제 목적지에 액세스해야합니다. 엄격한 모드에서는 모든 필수 프로토콜 / 호스트 / 포트를 화이트리스트에 추가하십시오. 임시 패키지 운영 보조금은 우회하지 않습니다.

지원된 HTTP(S) 미러 URL을 사용하여 임베디드 크리덴셜, 화이트스페이스, 로컬 호스트 또는 원시 IP 주소를 사용하지 않습니다. 허용 된 미러 설정은 사용할 수없는 서버 또는 예약 된 주소로 호스트 이름의 해결을 수정하지 않습니다. 설치가 실패하면 가동의 실제 목적지 및 오류가 재발하기 전에 검사합니다. 원격 **model** 엔드포인트는 별도의 [HTTPS 필요조건](providers.md#custom-gateway-every-visible-field)을 가지고 있습니다.

## 요청이 실패했을 때 유지되는 정보 {/* #information-to-keep-when-a-request-fails */}

앱 버전, 작동, 실행 시간/환경, 패키지 또는 호스트 이름, 프록시 모드 및 첫 번째 유용한 오류를 기록합니다. 원래 설치자 출력을 보존 : 최종 "No matching Distribution"라인은 이전 연결 실패를 숨길 수 있습니다. 공유된 진단에서 토큰 및 프록시 자격 제외.

성공적인 연결 후 누락 된 Python 모듈을 위해 [런타임 및 패키지 체크](./runtimes.md)을 계속하십시오. 원격 호스트 설정은 [컴퓨팅](remote-compute.md)에서 별도로 적용됩니다.

[Network 설정 소스](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [노트북 네트워크 경계](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP 오류 조회 {/* #http-error-lookup */}

400, 401, 403, 404, 429 또는 5xx 응답을 위해, [HTTP 문제 해결 테이블](troubleshooting.md#http-errors-400-403-429-and-5xx)를 사용하십시오. 응답 서비스 및 상태 코드와 상세한 메시지 유지.

프록시, 미러 또는 Notebook 도메인 설정을 변경한 후, 값을 persisted 확인한 다음 같은 실행 시간에 원래 작업을 다시 시도하십시오. 다운로드 및 패키지 가져 오기 모두 확인; 성공적인 설정은 설치 오류를 해결하지 않습니다.

## R 셀은 실행하기 전에 차단되었습니다. {/* #r-network-warning */}

v0.31.1에서, Notebook는 네트워크 보호가 R를 실행할 때 인라인 경고를 보여줍니다. 설정 링크를 따라 요청된 액세스를 검사합니다. 경고는 세포가 실행되지 않았다는 것을 의미합니다; 그것은 과학적인 결과 또는 완료된 달리지 않습니다. 특정한 필요조건을 해결한 후에, 세포를 다시 실행하고 그것의 산출을 검열하십시오. Windows 표준 모드 R 지원은 네트워크 보호를 가능하게 하지 않습니다.

## 승인 모드 변경 후 네트워크 접근 {/* #network-mode-changes */}

**Full access**는 적용 가능한 수동 대리인 허가 카드를 제거합니다, 그러나 Strict 노트북 whitelist를 우회하지 않습니다. 요청이 거부 될 때 **Settings → Network → Manage access** 확인. Relaxed Mode에서, 프로토콜 및 대상은 허가 또는 저장된 예외가 필요한지 결정합니다. 공급자 자격 및 서비스 제한은 여전히 적용됩니다.

네트워크 규칙은 기존의 보호 연결을 닫을 수 있습니다. 결과 모드 아래에서, 다음 실제 응답을 검사합니다. [승인 모드](approval-modes.md)의 대화 허가를 참조하십시오.
