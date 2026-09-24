---
title: "공급자 및 지역 모델 설정"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 공급자 및 지역 모델 설정 {/* #provider-and-local-model-setup */}

## 액세스 방법 선택 {/* #choose-an-access-method */}

![영어로 Codex 구독 연결 처음으로 설정](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type`은 구독 액세스, 공식 API 또는 `Custom Gateway`를 선택합니다. 사용 가능한 구독 선택은 활성 에이전트 프레임 워크에 달려 있습니다. 캡처 된 Codex 설정은 `Codex subscription`, XAI OAuth, 공식 API 및 사용자 정의 게이트웨이를 보여줍니다. 다른 프레임 워크가 동일한 선택을 제시하지 마십시오.

| 제품 정보 | 당신이 필요로 하는 무엇을 | 자주 묻는 질문 |
| --- | --- | --- |
| Codex 구독 | 호환 Codex 로그인 | 검사하기 `Codex authentication` 선택; 기존의 액세스 복사 인증 Open-Science로 가져 오기 |
| 공식 API | 그 공급자와 요청한 모형에 접근 | 적용 가능한 경우 제공 업체, 지역 및 API 자격 |
| 커스텀 게이트웨이 | 호환 엔드포인트, 정확한 모델 ID 및 API 키 필요시 | 게이트웨이 운영자와 API 형식 및 지원 모델 기능 확인 |

**Import existing Codex sign-in**을 선택하여 Open-Science로 작업 로컬 서명을 복사합니다. 수입은 호환되지 않는 비 secret 루프백 노선을 포함 할 수 있습니다; 다른 글로벌 구성, Skills 및 세션은 별도 유지. **Advanced settings → Transport**의 밑에, 당신의 연결이 다른 수송을 필요로 하지 않는 한 **Auto (recommended)**를 지킵니다.

## 공급자 지역 또는 무료 카탈로그 모델을 선택하십시오. {/* #provider-regions */}

**SenseNova**의 경우 모델 선택 전에 공급자 형태로 **담당자: Mr. Li** 또는 **Global**를 선택하십시오. 해당 지역의 API 키를 사용하여 결과 모델 목록을 검토하고 **Save**을 선택하고 변경 전에 연결 검증을 기다립니다. 전환 지역은 endpoint와 유효한 모형을 둘 다 바꿀 수 있습니다; 다른 지역의 주요 또는 모델 이름은 작동하지 않을 수 있습니다.

**OpenRouter** 또는 **OpenCode 젠**과 같은 게이트웨이의 경우, 정확한 입력이 활성 프레임 워크를 위해 제공 될 때만 무료 모델을 선택하십시오. 서비스에 의해 요구되는 계정 및 자격. 무료 카탈로그 항목은 사용 제한을 제거하거나 모든 도구 또는 이미지 입력에 대한 지원을 설정하지 않습니다. `:free` 을 임의 모델 ID에 추가하지 마십시오. 작은 요청을 보내고 반환 된 모델을 확인하고 연구에 대한 연결을 사용하기 전에 결과를 확인합니다.

## 기존 Codex 구독 연결 {/* #connect-an-existing-codex-subscription-verified-procedure */}

1. **Settings → Model → Add provider**을 엽니다.
2. **Provider type**을 **Codex subscription**로 설정하십시오.
3. **Codex authentication**에서 **Import existing Codex sign-in**을 선택합니다. 이 컴퓨터에서 사용 가능한 로그인이 필요합니다. 응용 프로그램 프로필에 인증 복사; 다른 Codex 세션 또는 Skills을 가져올 수 없습니다.
4. **Save**을 선택합니다. 공급자 행이 **Testing…**를 보여줍니다 동안 대기; 혼자 저장된 행은 성공 체크가 아닙니다.
5. 공급자 줄에 있는 **Connection verified**와 **Open-Science에 수입된 인증**를 확인하십시오. 풀어 놓인 공용영역은 hyphen 없이 제품 이름을 표시할지도 모릅니다.
6. **Main model**에서 사용 가능한 구독 모델을 선택하십시오. 예를 들어, 계정이 제공하는 경우 **gpt-5.6 솔** 항목을 선택하십시오. 모형 이름과 공급자를 함께 검사하십시오, 특히 다수 공급자가 유사한 지명한 모형을 제안할 때.
7. 프로젝트를 열고 경계 요청을 보냅니다. 연결 테스트는 인증이 검증된 반면, 실제 응답은 요청 경로를 지정합니다. 응답을 확인하고 모든 도구 권한 요청은 해당 세션에 나타납니다.

![Codex 구독 확인 및 메인 모델 선택](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| 공급자 줄 통제 | 그것을 때 사용 | 성공 사례 |
| --- | --- | --- |
| **Check Codex login** | 저장된 연결은 만료될 수 있습니다. | 보류 검사는 표시된 확인 또는 실패한 상태로 정착합니다. |
| **Re-import Codex login** | 외부 로그인을 새로 고침하고 응용 프로그램 복사를 업데이트하고 싶습니다. | 인증은 수입되고 다시 검사됩니다. |
| **Edit** | 인증 또는 운송 설정을 검토해야합니다. | Save를 선택하고 편집하기 전에 성공적인 검증을 기다립니다. |
| **Delete** | 사용되지 않는 공급자는 제거되어야 합니다. | Availability는 공급자가 아직도 요구된다는 것을에 달려 있습니다; 활성 의존도는 삭제를 방지 할 수 있습니다. |

파일 백업 Codex 로그인이 누락되었는지 확인한 경우 지원된 Codex 흐름과 리트리 **Re-import Codex login**를 통해 로그인하십시오. 외부 자격 증명 저장소에서만 열린 로그인은 반드시 수입 가능한 파일이 아닙니다.

실패로 **Testing…**를 해석하지 마십시오, 또는 **Connection verified**는 각 목록으로 만들어진 모형 및 공구가 실행할 수 있는 증거로. 수입이 실패하면 지원되는 Codex 서명에서 흐름과 재시동을 완료하십시오. 인증 JSON을 프롬프트 또는 문서로 붙여넣지 마십시오.


에이전트 런타임은 작업을 실행; 모형 공급자는 모형을 공급합니다. Codex 설치는 자동으로 공급자를 연결하지 않습니다. 처음 설정에서이 페이지는 Agent runtime을 따릅니다. 설정 후, **Settings → Model**을 열고 공급자 액세스를 관리합니다.

## 업데이트 또는 API 자격 제거 {/* #update-or-remove-an-api-credential */}

서비스에서 키 변경 후 **Settings → Model**의 공급자를 찾아 **Edit**을 선택하고 **API key**의 교체를 입력하고 **Save**를 선택하십시오. 이 필드 공백을 Leaving 기존의 키를 유지; 그것은 그것을 명확하지 않습니다. 연결은 수정하기 전에 테스트됩니다. 인증이 실패한 경우, 엔드포인트를 확인한 후, 키가 속한 상태이며, 복원하기 전에 유효성을 확인합니다.

**Connection verified** 후, 그 공급자와 작은 요청을 완료합니다. **Delete**과 사용하지 않는 공급자를 제거하고 확인의 이름을 확인하십시오. 애플리케이션 구성 제거는 서비스에서 키를 수정하지 않습니다.

## 사용자 정의 게이트웨이: 모든 눈에 보이는 필드 {/* #custom-gateway-every-visible-field */}

![사용자 정의 게이트웨이 양식의 필수 필드 오류](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

`Custom Gateway`을 선택하여 시작하십시오. 공급자 유형을 바꾸는 것은 이전 선택에서 표시 이름을 보존할 수 있으므로 assuming 대신 이름을 검토하십시오.

| 분야 또는 통제 | 입력 및 동작 |
| --- | --- |
| `Provider type` | 공급자 가족을 선택하고 눈에 보이는 양식을 변경하십시오. |
| `Name` / `Provider name` | 선택적인 전시 이름과 같은 `Lab gateway`; 모델 식별자가 아닌 |
| `Base URL` | 필수 Gateway 기본 주소. 먼 모형 엔드포인트는 HTTPS를 요구합니다; HTTP은 localhost 및 루프백 주소로 허용됩니다. 연산자의 실제 주소를 사용, 작동하지 않는 `https://gateway.example` 회사연혁 |
| `API format` | 채팅 완료, 메시지, 또는 응답을 선택하십시오. 표시된 경로는 해당 프로토콜을 식별하는 데 도움이됩니다. |
| `API key` | 원격 게이트에 필요한; 인증이 필요없는 로컬 루프백 게이트웨이에 대한 선택. 로컬 서버가 1개가 필요한 경우 실제 자격 증명을 입력하십시오. |
| 눈 / `Show API key` | 현재 키 입력의 가시성; 화면을 캡처하거나 공유하기 전에 숨겨진 유지 |
| `Model` | endpoint에 의해 허용되는 정확한 모델 식별자; 스크린 샷 `demo-model` 단지 placeholder |
| `Context window` | 선택적인 모형 상황 한계; blank 요청 공급자 기본값 |
| Context의 사전 설정 | `32K`, `64K`, `128K`, `200K`, `256K`, `1M`; 제품정보 `128K` 제품정보 `128000` |
| `Advanced settings` | 확장 또는 붕괴 기능 및 토큰 제한 필드 |
| `More information` (`i`) | 관련 라벨 옆에 컨텍스트 도움말을 엽니다. |
| `Back` | 에이전트 실행에 반환; 마법사는 양식 초안을 소유하므로 다시 항해 할 수 있습니다. |
| `Test & continue` | 필수 필드를 유효하게, 다음 유효한 설정을 커밋하기 전에 공급자를 테스트; 성공적인 적용 가능한 검증 후 사전 |

메뉴에서 보이는 3개의 API 체재는:

- **채팅 완료** — `/v1/chat/completions`.
- **Messages** — `/v1/messages`.
- **응답** — `/v1/responses`.

이 프로토콜 선택은 기본 URL에 나열된 모든 경로에 추가하는 지침이 아닙니다. 게이트웨이는 다른 사람을 지원하지 않고 하나의 형식을 지원할 수 있습니다.

<ToolOperationGroup>
<summary>고급 필드 및 조건 제어</summary>

이전 원격 HTTP 구성은 편집 가능하지만 요청을 보낼 수 없습니다. 서비스 운영자에서 HTTPS 엔드포인트를 취득하고, 저장하고 다시 테스트합니다. 로컬 루프백 모델 서버는 HTTP 주소를 유지할 수 있습니다. 원격 LAN 서버는 여전히 HTTPS을 필요로 합니다.

### 고급 필드 및 조건 제어 {/* #advanced-fields-and-conditional-controls */}

| 분야 또는 통제 | 그것을 설정하는 방법 |
| --- | --- |
| `Image input` | 두 개의 게이트웨이와 선택한 모델이 이미지 콘텐츠를 수락하는 경우에만 사용 가능 |
| `Thinking mode` | Gateway/model가 생각이나 노력 통제를 받아들일 경우만 사용 가능 |
| `Supported effort levels` | 생각을 가진 Appears는 가능하게 합니다; 레벨을 실제로 지원, 오히려 모델 이름에서 그들을 삽입하는 것보다 |
| `Reasoning request format` | UXPA(사용자경험전문가협회)는 제품 및 서비스 UX를 리서치, 디자인, 평가한다. 게이트웨이가 어떻게 노력하는지 선택 |
| `Maximum input tokens` | 선택적인 분리되는 입력 한계; blank는 공급자를 기본으로 사용합니다. 전 세트: 32K, 64K, 128K, 200K, 256K, 1M |
| `Maximum output tokens` | 선택적인 분리되는 산출 한계. 전 세트: 4K, 8K, 16K, 32K, 64K, 128K |

지원되는 노력 수준을 구성하기 위해 **Thinking mode**을 활성화하십시오. **채팅 완료**의 경우, 또한 당신의 endpoint에 의해 지원되는 소싱 요청 형식을 선택합니다. 이 선언은 공급자의 API 기능과 일치해야 합니다.


</ToolOperationGroup>

### Gateway 설정 테스트 {/* #reproduce-the-form-walkthrough */}

1. Custom Gateway를 선택하고 고급 설정을 확장하십시오.
2. 게이트웨이 연산자에 의해 공급되는 기본 URL과 정확한 모델 ID를 입력하고 API 키가 필요한 경우. 필수 필드는 인라인 오류를 생산하고이 페이지에서 당신을 유지.
3. 인식 가능한 표시 이름을 입력합니다. 실제 연결을 위해, 당신의 공급자에 의해 공급된 실제적인 endpoint 및 모형을 입력하십시오; 시그널 홀더는 연결 테스트를 통과할 수 없습니다.
4. 컨텍스트 프리셋을 선택하고 숫자 값을 확인합니다.
5. 지원할 때만 생각 모드를 활성화할 수 있고, 새로 볼 수 있는 노력 필드를 검사합니다. API 형식을 변경할 수 있습니다.
6. 키가 필요한 경우, 개인적으로 입력하고 숨겨져 보관하십시오. `Test & continue`을 선택하면 공급자 요청을 준비할 수 있습니다.
7. 결과에 대한 기대. `Testing connection…`은 유효성 검사를 나타냅니다; 반복된 클릭은 비활성화됩니다. 대신 `Sign in & continue`, `Waiting for sign-in…` 및 `Cancel sign-in`를 사용할 수 있습니다.

## 로컬 모델 endpoint 연결 {/* #connect-a-local-model-endpoint */}

<p className="example-label"><strong>예시</strong> Ollama를 통해 로컬 Qwen 모델을 연결</p>

로컬 모델 서버는 Open-Science에서 별도로 실행됩니다. **Custom Gateway**을 호환 엔드포인트로 선택하고 API 형식을 지원하는 에이전트를 사용합니다. 아래 예제는 OpenCode과 Ollama를 사용합니다. Python Notebook 해석기는 모델 서버를 설치하지 않습니다.

### 서버를 시작하고 모델을 다운로드 {/* #start-the-server-and-download-the-model */}

[오라마](https://ollama.com/download)을 설치하면 터미널에서 로컬 전용 테스트 서버를 시작합니다.

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

터미널을 엽니다. 다른 터미널에서, 그 서버에 모델을 다운로드:

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

다운로드를 완료합니다. 서버가 실행되는 경우, 요청된 모델은 absent, Open-Science 보고서 제출 **Test failed: the configured model was not found.** 다운로드 완료, 정확한 모델 ID를 확인, 선택 **Test connection** 다시.

### 공급자 설정 입력 {/* #enter-the-provider-settings */}

**Settings → Model → Add provider**을 열고 입력:

| (주) | 이 로컬 연결 예제 |
| --- | --- |
| 모델 제공업체 유형 | 커스텀 게이트웨이 |
| 이름 | 로컬 Qwen 데모 |
| 기본 URL | `http://127.0.0.1:11435` |
| API 형식 | 채팅 완료 (Chat Completions)`/v1/chat/completions`) |
| API 키 | 이 unauthenticated 루프백 엔드 포인트에 대한 공백을 남겨; 인증된 게이트웨이에 대한 실제 자격 증명을 사용 |
| 모델 | `qwen3:0.6b` |
| 컨텍스트 창 | `32768`, 실행 서버 일치 |
| 고급 설정 → 최대 출력 토큰 | `4096` |
| 이미지 입력/씽크 모드 | 이 연결 체크를 위해 떨어져 |

![로컬 모델 주소, API 형식 및 정확한 모델 ID](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

양식은 게이트웨이 루트에 `/v1`을 추가합니다. Open-Science는 `localhost`, `127.0.0.1` 및 `[::1]`와 같은 루프백 주소를 위한 공백 API 열쇠를 받아들입니다; 이전 스크린 샷은 placeholder를 보여줄 수 있습니다. 원격 또는 LAN 게이트웨이는 여전히 HTTPS과 API 키가 필요합니다. API 형식의 로컬 서버 지원.

입력 및 대화 기록을 위한 방을 나타낸 산출 예산을 놓으십시오. OpenCode는 이 분야가 공백일 때 산출 예산을 예약합니다; 큰 예비는 작은 컨텍스트 창에서 반복된 조밀함을 일으킬 수 있습니다. 선언 된 컨텍스트 창은 또한 모델 서버의 할당과 일치해야합니다. 혼자서 양식을 변경하지 않습니다 Ollama의 실행 설정.

### 호환 에이전트를 선택하고 답장을 확인 {/* #select-a-compatible-agent-and-check-a-reply */}

**Settings → Agent**에서 **OpenCode → App-managed download**을 누락하면 카드를 선택하고 **Switch**를 확인합니다. **Model**로 돌아가서 로컬 모델을 선택하십시오. 연구를 위해 사용하기 전에 짧은 연결 전용 요청으로 새로운 대화를 시작하십시오. 요청이 실제로 완료되도록 확인; 저장된 공급자 또는 성공적인 연결 시험 혼자는 믿을 수 있는 과학적인 reasoning, 공구 사용 또는 이미지 지원을 설치하지 않습니다.

구성 로컬 엔드포인트와 OpenCode을 사용하여 **연결된 현지 모델.**과 함께 완료된 연결 체크. 그것은 텍스트 요청, 바이오 의학 분석이 아닙니다.

![로컬 모델 연결 체크 완료](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

모델을 사용하면서 서버 실행을 유지하십시오. 다른 호스트에 에이전트를 들어, `localhost`은 그 호스트를 나타냅니다. endpoint에 도달하는 브라우저는 에이전트가 도달 할 수 없다는 것을 증명하지 않습니다.

### 실제 도구 호출 확인 {/* #check-an-actual-tool-call */}

<p className="example-label"><strong>예시</strong> 로컬 모델의 Notebook 도구 호출 확인</p>

연결 확인 후, 도구 경로를 테스트하기 위해 알려진 결과와 작은 작업을 사용합니다. Python Notebook을 통해 이 작업을 수행하려면 정신적 arithmetic을 반환합니다.

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

이것은 첫번째 GSE60450 표본의 제로 표이고 검출된 유전자 조사입니다. 허가 패널에서 제안 된 코드를 검사, 그것을 승인, 다음 **Notebook**을 열고 **27179 / 진정한**을 확인합니다.

![Notebook 코드 및 로컬 모델 도구 호출에서 실제 출력](/img/open-science/priority-completion/21-local-model-python-result.webp)

로컬 `qwen2.5:7b`은 Codex 프레임 워크와 로컬 채팅 컴플릿 엔드포인트를 통해이 호출을 완료했습니다. 초기 제안은 사용할 수없는 돕기 모듈을 참조; 확인은 제안을 결정한 후 성공하고 위의 의존성없는 코드를 지정합니다. 이것은 다른 에이전트 프레임 워크에서 완전한 RNA-seq 분석 또는 동등한 행동의 신뢰할 수있는 계획이 아닌 경계 도구 작동을 검증합니다.

## 설정이 사전 작동하지 않는 경우 {/* #if-setup-does-not-advance */}

| 관련 기사 | 다음 검증 |
| --- | --- |
| 필수 필드 메시지 | 이름 필드를 완료; 혼자 표시 이름은 충분하다 |
| 보안 키 저장 가능 | 잠금 해제 또는 운영 체제 자격 증명 취약점; 키는 사용할 때까지 저장 될 수 없습니다 |
| 연결/오존 실패 | credential, endpoint, 형식 및 특정 모델에 대한 액세스 확인 |
| 공급자는 시험 도중 변화했습니다 | 현재 공급자를 검토하고 다시 시험하십시오; superseded 결과가 설정 완료하지 않아야합니다. |
| 로그인 취소 | 다시 시작 할 때 준비; 취소는 성공적인 연결이 되지 않습니다. |
| 설치 런타임하지만 사용 가능한 공급자 없음 | 끝 모형 연결; runtime 설치 및 공급자 허가는 분리됩니다 |

### HTTP 오류 조회 {/* #http-error-lookup */}

400, 401, 403, 404, 429 또는 5xx 응답을 위해, [HTTP 문제 해결 테이블](troubleshooting.md#http-errors-400-403-429-and-5xx)를 사용하십시오. 응답 서비스 및 상태 코드와 상세한 메시지 유지.

출처: [공급자Form.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx), [공급자Step.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx).

## v0.31.0과 나중에의 공급자 변경을 저장하십시오. {/* #validated-provider-save */}

공급자는 그들이 투입되기 전에 시험됩니다. **Save** 선택, 연결 결과를 기다립니다, 양식을 닫기 전에 성공을 확인합니다. 실패한 시험은 작업 저장된 윤곽을 대체하지 않습니다. 이전에 저장된 연결이 요청 중에 거부되면, 그 가용성이 업데이트됩니다. credential 및 endpoint를 확인한 다음 다시 테스트하십시오. **Conversation models**, **Classification models** 및 **Local parsing models**에는 다른 목적이 있습니다; [모델 설정](models.md#classification-models) 참조.

## StepFun 및 지역 선택 {/* #stepfun-regions */}

공급자 카탈로그에서 **StepFun**를 선택하고 **담당자: Mr. Li** 또는 **Global**를 확인하십시오. 그런 다음 모델과 공급 자격 증명을 선택하십시오. v0.32.0은 **Step-5 Preview**을 멀티모드 및 1M-context 카탈로그 메타데이터와 함께 추가합니다. 실제 모델 액세스, 할당량 및 입력 지원은 여전히 공급자 계정과 선택한 에이전트의 호환성에 따라 달라집니다.

대화에서 선택하기 전에 연결을 저장하고 확인합니다. 기존의 엔드포인트를 유지합니다. 앱을 업데이트하면 지역 또는 Main 모델을 전환하지 않습니다.

## 업데이트 된 공급자 카탈로그 {/* #provider-catalog-updates */}

v0.33.0 카탈로그는 **샤오 미모 v2.6** 모델과 **XAI Grok 4.7의 장점**를 추가하고 **OpenCode 젠** 및 **으로 이동**를 새로 고침합니다. 새로운 MiMo 구성은 `mimo-v2.6-pro`에 기본 설정; 기존 v2.5 선택이 가능합니다. Grok 4.7은 이전 모델 ID가 나열된 동안 xAI의 새로운 기본이 됩니다.

활성 에이전트에 제공 된 정확한 모델을 선택, 입력 및 이유 옵션을 확인, 작은 요청을 실행. 카탈로그 기본은 모든 기존 세션에서 모델을 변경하지 않거나 계정을 보장하는 것은 액세스가 있습니다. Codex은 Main을 유지하면서 [분류 서비스](models.md#classification-models)를 별도로 구성할 수 있습니다.

## 새로운 카탈로그 선택 {/* #catalog-models */}

v0.33.1 공급자 카탈로그는 **GPT-6에** 및 **클로드 오푸스 5.5**를 추가합니다. 공급자의 모델 목록을 열고 Active Framework 및 계정에서 지원하는 항목을 선택하십시오. 카탈로그 존재는 접근 권한을 부여하지 않거나 저장된 Main 모델을 전환하지 않습니다. 공급자를 검증하고 연구에 대한 변경 된 모델을 사용하기 전에 작은 요청을 보냅니다.
