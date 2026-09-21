---
title: "네트워크, 프록시 및 패키지 미러"
last_update:
  date: '2026-09-20'
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
| 1개의 연구 hostname는 denied입니다 | **Configure domains** 그리고 요청에 있는 정확한 hostname | 광범위한 관련 도메인을 추가하면 수정할 수 있습니다. |
| 패키지 호스트는 이미 허용되지만 CONNECT가 실패합니다. | 설치 로그, 프록시 및 DNS 해상도 | 다른 동일한 허용 클릭은 모든 네트워크 실패를 해결합니다. |
| 인증서 검증 실패 | 구성 된 CA 번들 및 조직의 신뢰 요구 사항 | 인증서 검증이 필요한 경우 |
| 패키지 인덱스는 연결 오류 후 일치하는 배포를 반환하지 않습니다. | Earlier 네트워크 메시지 및 선택 Python/platform | 패키지는 존재하지 않아야합니다. |

## Notebook 도메인 구성 {/* #configure-notebook-domains */}

1. **Configure domains**을 선택합니다.
2. Notebook 네트워크 보호가이 장치에 능동적 인지 여부를 읽어보십시오.
3. 과학 서비스 그룹을 확장하여 호스트명을 검사합니다. 그룹 스위치 제어 포함 된 목적지. Package-registry/source-code 그룹이 활성화되어 이 빌드에서 잠겨 있습니다.
4. 추가 소스의 경우 **Domain hostname**의 정확한 호스트 이름을 입력한 다음 **Add**을 선택합니다.
5. 새로운 초안 행을 검토합니다. **&#91;hostname&#93; 제거**을 사용하지 않도록 사용하십시오.
6. **Save changes**을 선택하여 의도된 리스트를 지속합니다.

![Exact-hostname 검증은 와일드카드를 거부합니다.](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

`data.example.org`과 같은 호스트명을 입력하고, 계획, 경로, 포트, 와일드 카드 또는 IP 주소가 없습니다. **Enter a hostname only, without a scheme, path, port, or wildcard.**의 경우, 그 부분을 제거하고 hostname을 저장합니다.

이름에 의해 허용되는 도메인은 여전히 다른 연결 확인을 실패 할 수 있습니다. 예를 들어, `pypi.org`은 허용되지만 `198.18.*`에 해결하면 비공개 목적지로 거부 할 수 있습니다. 이것은 unapproved 도메인에서 구별됩니다.

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

### 도메인이 비공개 주소로 해결될 때 {/* #observed-fake-ip-failure */}

설치가 `destination resolves to a non-public network address`을 보고하면 짧은 오류가 `conda install failed` 또는 `pip install failed`라고 할 때도 상세한 설치 로그를 검사합니다.

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. 영향을받는 호스트 이름과 그 해결 된 주소를 확인합니다. `198.18.*`과 같은 주소는 공공 대상이 아닙니다.
2. 대상 체크에서 도메인 목록 결정 분산. `alreadyAllowed`은 해결된 주소를 허용하지 않습니다.
3. 공용 DNS 해상도를 확인하고 네트워크 소유자와 함께 프록시 루트를 확인 한 다음 원래의 작은 요청을 다시합니다. 도메인 보호 기능을 유지하십시오.
4. 설치를 검증하고 별도로 가져올 수 있습니다. 저장된 프록시, Ready 해석기 또는 기존 패키지의 성공적인 사용은 충분합니다.

같은 오류가 발생하면 호스트명을 유지하고, 설치자 로그와 주소와 프록시 모드를 해결하고 [문제 해결](troubleshooting.md)을 따르십시오. 성공적인 설정 저장은 성공적인 다운로드가 아닙니다.


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

구성 Conda, PyPI 및 CRAN 미러 호스트 이름은 패키지 관리 작업에 대한 임시 액세스를받습니다. 이것은 영구적인 Notebook 도메인 목록에 추가하거나 일반 Notebook 코드를 동일한 액세스를 부여하지 않습니다. 다른 호스트에 Redirects는 여전히 네트워크 승인 흐름을 따릅니다.

지원된 HTTP(S) 미러 URL을 사용하여 임베디드 크리덴셜, 화이트스페이스, 로컬 호스트 또는 원시 IP 주소를 사용하지 않습니다. 허용 된 미러 설정은 사용할 수없는 서버 또는 예약 된 주소로 호스트 이름의 해결을 수정하지 않습니다. 설치가 실패하면 가동의 실제 목적지 및 오류가 재발하기 전에 검사합니다. 원격 **model** 엔드포인트는 별도의 [HTTPS 필요조건](providers.md#custom-gateway-every-visible-field)을 가지고 있습니다.

## 요청이 실패했을 때 유지되는 정보 {/* #information-to-keep-when-a-request-fails */}

앱 버전, 작동, 실행 시간/환경, 패키지 또는 호스트 이름, 프록시 모드 및 첫 번째 유용한 오류를 기록합니다. 원래 설치자 출력을 보존 : 최종 "No matching Distribution"라인은 이전 연결 실패를 숨길 수 있습니다. 공유된 진단에서 토큰 및 프록시 자격 제외.

성공적인 연결 후 누락 된 Python 모듈을 위해 [런타임 및 패키지 체크](./runtimes.md)을 계속하십시오. 원격 호스트 설정은 [컴퓨팅](remote-compute.md)에서 별도로 적용됩니다.

[Network 설정 소스](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Notebook 네트워크 경계](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts).

## HTTP 오류 조회 {/* #http-error-lookup */}

400, 401, 403, 404, 429 또는 5xx 응답을 위해, [HTTP 문제 해결 테이블](troubleshooting.md#http-errors-400-403-429-and-5xx)를 사용하십시오. 응답 서비스 및 상태 코드와 상세한 메시지 유지.

프록시, 미러 또는 Notebook 도메인 설정을 변경한 후, 값을 persisted 확인한 다음 같은 실행 시간에 원래 작업을 다시 시도하십시오. 다운로드 및 패키지 가져 오기 모두 확인; 성공적인 설정은 설치 오류를 해결하지 않습니다.

## R 셀은 실행하기 전에 차단되었습니다. {/* #r-network-warning */}

v0.31.1에서, Notebook는 네트워크 보호가 R를 실행할 때 인라인 경고를 보여줍니다. 설정 링크를 따라 요청된 액세스를 검사합니다. 경고는 세포가 실행되지 않았다는 것을 의미합니다; 그것은 과학적인 결과 또는 완료된 달리지 않습니다. 특정한 필요조건을 해결한 후에, 세포를 다시 실행하고 그것의 산출을 검열하십시오. Windows 표준 모드 R 지원은 네트워크 보호를 가능하게 하지 않습니다.
