---
title: "모델 및 작업 정책"
last_update:
  date: '2026-09-24'
---

# 모델 및 작업 정책 {/* #models-and-task-policies */}

작업을 위해 모델을 선택하면 수행해야합니다. 그런 다음 설정이 상속됩니다. **Provider** 공급 모형 접근; **Agent**은 대화와 도구를 실행합니다. **Specialist**은 재사용 가능한 역할과 선택된 기능을 제공합니다. 하나를 변경하거나 다른 사람을 구성하지 않습니다.

Main, Subagent, Reviewer, Vision 또는 Session 세부 사항이 다른 모델이 필요할 때 아래의 작업 정책을 사용하십시오. 결과 작업에서 공급자와 모델을 확인, 특히 여러 공급자가 동일한 모델 이름을 제공 할 때.

## 주요 모델 선택 {/* #select-the-main-model */}

1. **Settings → Model**을 엽니다. 작업 공간에서 Composer의 **Select model** 항목은 모델 선택도 노출합니다.
2. **Main model**을 열고 구성된 공급자의 밑에 유효한 모형을 선택하십시오. 카탈로그 항목은 계정을 사용할 수 없다는 증거가 아닙니다.
3. **Reasoning effort**을 선택합니다. 그 모델에 대해 실제로 표시된 선택을 사용합니다. 이 검사된 모형은 과태, 낮은, 중간, 높은, XHigh 및 매우 제안했습니다; 다른 모형에는 다른 사다리가 있습니다.
4. 저장된 선택을 검사하기 위하여 닫히고 reopen 모형. 작은 요청을 시작하고 긴 분석 전에 결과를 검사합니다.

![Main 모델 및 연결 공급자](/img/open-science/guides-walkthrough/10-model-main.webp)

변경은 후속 요청에 적용됩니다. 그들은 기존의 대답 뒤에 모델을 개조하지 않습니다. 모델을 변경할 때, 앱은 상대적인 이유를 보존하려고 시도; 백엔드는 지원되지 않는 노력에 대해 대략적인 영향을 줄 수 있습니다. 더 높은 노력은 시간과 토큰 사용을 증가시킬 수 있으며 정확한 보증이 아닙니다.

## 특정 작업에 할당 된 모델 {/* #assign-models-to-specific-tasks */}

확장하기 위해 시나리오 행을 선택합니다. 다른 행을 열어 이전을 붕괴합니다. 변경 후 붕괴 된 요약을 읽으십시오 : 상속, 고정 모델 및 사용 가능한 선택을 구별합니다.

| 언어: English | 모형 선택 | 자주 묻는 질문 |
| --- | --- | --- |
| **Subagent** | 주요 모형과 같, 또는 호환이 되는 분리되는 모형 | Main을 따르는 동시에 일치하는 노력 통제는 무능합니다. 위임도 가능합니다. |
| **Reviewer** | 주요 모델을 따르거나, 구성 된 검토자 모델 | 혼자 모델 정책은 Auto-review를 활성화하거나 검토 기록을 만들 수 없습니다. |
| **Vision** | 구성 된 이미지 캡블 모델 | 구성되지 않는 의미는 전용 Vision 선택이 없습니다. 릴레이가 필요한지 여부는 활성 백엔드의 이미지 지원에 달려 있습니다. |
| **Session details** | Main을 따르거나 호환 모델 선택; 그 노력과 활성화를 검사 | 제한된 통화를 사용하여 세션 제목 / 구독을 생성합니다. 그것은 과학적인 작업과 그것의 artifacts에서 분리됩니다. |

![Subagent 상속 및 장애인 노력 관리](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

세션 세부 정보 selector 필터 아웃 Codex 구독 모델. Main 또는 Vision에서 볼 수 있는 모델은 따라서 여기에 부패 될 수 있습니다. 호환 로컬 공급자와 OpenCode 선택, 로컬 모델은 고정 선택으로 사용할 수 있습니다. **Not supported** 그 이유에 따라 노력은 그 노력의 통제가 사용할 수 없다는 것을 의미합니다; 그것은 모델이 텍스트 요청을받을 수 있는지에서 분리됩니다.

pinned 시나리오의 경우, 공급자 / 모델을 선택하고 지원 된 노력. 미래의 Main 변경을 원할 때 상속 옵션으로 돌아갑니다. **Unavailable** 요약은 공급자가 제거되거나 더 이상 자격이되지 않은 후에 이전 모델 이름을 유지할 수 있습니다; 유효한 교체를 선택하십시오.

### 별도의 Vision 모델로 차트를 읽으십시오. {/* #read-a-chart-with-a-separate-vision-model */}

대화의 Main 모델이 이미지를 수용할 수 없을 때 시각을 사용하십시오. 이미 이미지가 직접 읽을 수 있는 Main 모델.

<p className="example-label"><strong>실습 예제</strong> Sample-count 차트에서 라벨 확인</p>

1. **Settings → Model → Vision**을 확장하고 사용 가능한 이미지 캡블 모델을 선택하십시오. 제어가 활성화되면 지원되는 이유를 선택하십시오.
2. 대화에서 선택한 대상 텍스트 모델을 유지하십시오. 비전 변경은 Main을 대체하지 않습니다.
3. **+ → Attach files**을 사용하여 차트를 첨부합니다. 파일명은 보내기 전에 Composer에 나타납니다.
4. 특정한 눈에 보이는 정보를 위해, 제목과 같은 축선 상표, 단위 및 도형된 표본의 수를 요구하십시오. 라벨이 읽을 때 명시된 표시를 요청하십시오.
5. 원본 이미지에 대한 답변을 비교합니다. 정확한 수치 비교에 대한 소스 테이블을 사용하십시오. 이 예에서 **모형: 24.7M**에 라운드 된 두 개의 레이블이 동일하다고 증명하지 않습니다.
6. 더 이상 별도의 이미지 모델을 원할 때 **Not configured**에 대한 Vision을 반환합니다. 이 모델 공급자를 제거하지 않습니다.

![텍스트 Main 모델과 함께 비전 선택 분리](/img/open-science/sept11-completion/vision-configuration.webp)

![차트 라벨 및 라운드 값의 한계 확인](/img/open-science/sept11-completion/vision-result.webp)

현재 이미지 릴레이는 Codex 구독 제공 업체를 제외하고는 Vision selector에 나타날 수 있습니다. 텍스트 전용 Main 모델이 여전히 선택한 후 이미지를 거부하면 다른 자격을 갖춘 Vision 제공 업체 또는 이미지 캡처 가능한 Main 모델을 선택하십시오. 저장된 selector 값을 성공적인 이미지 요청으로 취급하지 마십시오.

### 해당 세션 내용이 생성되었습니다. {/* #confirm-that-session-details-were-generated */}

**Same as main model** 또는 **Session details**의 호환 고정 모델을 선택하면 대화를 만듭니다. 첫 번째 프롬프트를 기다리는 것은 간결한 제목이 될 것이며, 저장 된 설명을 검사합니다. 신속한 사본은 성공적인 세대를 설정하지 않습니다.

auxiliary 요청이 완료된 후 저장된 제목과 설명을 확인합니다. 제목이 단축 된 경우, 모델 호환성, 로컬 서버로드 및 통화의 최종 상태를 검사합니다. 보조 타임 아웃은 그 fallback을 유지할 수 있습니다. Session-title Generation은 자체 모델 정책을 사용하고 대화의 과학적 계산을 실행하지 않습니다.

## 공급자 통제 및 실패 체크 {/* #provider-controls-and-failure-checks */}

| 통제/전류 | 다음 작업 |
| --- | --- |
| **Add provider** | 이름 &#42; [공급자 설정](./providers.md)인증 및 엔드포인트 요구 사항을 포함한 . |
| **Check Codex login** | 구독 로그인 상태를 다시 확인; 이 연구 작업을 실행하지 않습니다. |
| **Re-import Codex login** | 앱의 흐름을 통해 새로 고침된 기존 로그인을 가져옵니다. |
| **Edit** | 리뷰 공급자 구성. 교체가 확인 될 때까지 작업 구성을 보존합니다. |
| 비활성화됨 **Delete** | 현재 공급자는 이 국가에서 제거될 수 없습니다; 다른 유효한 설치를 첫째로 선택하십시오. |
| 호환성 경고 | 반복적으로 retrying하기 전에 활성 에이전트 및 공급자 API 형식을 확인하십시오. |
| 시나리오 선택 없음 | 자격이 된 공급자/모형을 첫째로 구성하십시오; 빈 selector는 arbitrary 모델 이름을 입력 할 수있는 요청이 아닙니다. |

[에이전트 설정](./frameworks.md) 을 사용하여 수행 백엔드 및 [사용량](./usage.md) 을 위해 보고된 활동. 정확한 윤곽은 [참고 자료](../reference/configuration.md)에 있습니다.

출처: [모델 선택](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx), [시나리오 정책](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx).

## 은 {/* #classification-models */}

**Settings → Model → Classification models**을 엽니다. 분류 서비스는 2개의 독립적인 의무가 있습니다: **Automatic capability selection**와 **Smart collections**. 먼저 요청하기 전에 관련 Skills 및 커넥터를 선택합니다. Main을 대체하거나 채팅 모델을 추가하지 않습니다. **Use default method**에서 **Automatic capability selection**을 떠날 수 있습니다; Skills와 연결관은 아직도 그것 없이 작동합니다.

이 서비스를 통한 자동 기능 선택은 **Codex Chat Completions** 또는 **CodeBuddy**를 사용하는 주 대화에서 지원됩니다. Codex 구독 세션은 기존 기능 로딩 방식을 유지합니다. 이 기능은 현재 요청과 기능 이름 및 설명만 전송합니다. 서비스를 사용할 수 없거나 분류 결과가 불명확하면 기본 방식으로 돌아갑니다.

![기본 기능 선택 및 선택 분류 서비스 항목](/img/open-science/v0311/classification-models.webp)

1. **Add service**, **TypeSafe AI**, **OpenRouter** 또는 **Custom HTTP service**를 선택하십시오.
2. 서비스 이름을 입력하고 API 자격 증명을 공급하십시오. OpenRouter는 기존의 호환 계정 또는 새로운 키를 사용할 수 있습니다; 스크린 샷에 숨겨진 키를 유지합니다.
3. **Save**을 선택하고 유효성 검사를 기다립니다. 실패된 유효성은 이전 설정이 변경되지 않았습니다.
4. **Automatic capability selection**의 밑에, 저장된 서비스를 선정하고 그것의 카탈로그에서 제안된 모형. **Check model**을 사용하여 연결을 확인합니다.
5. 지원되는 주요 대화에서 경계 요청을 시도하고, 선택한 실제 도구를 검사합니다. 성공적인 모델 검사는 혼자 연구 결과를 확인하지 않습니다.

서비스 반환 자동 기능 선택 기본 방법 및 그 서비스 unconfigured에 관련된 모든 스마트 컬렉션을 나타낸다. 별도의 저장 서비스 키가 제거됩니다; 계정을 공유하는 서비스는 계정이나 열쇠를 삭제하지 않습니다.

대화 모델에 [공급자 설정](providers.md)을 참조하십시오. 로컬 PDF 파싱 리소스는 **Local parsing models**, 별도의 탭에서 관리됩니다.

![API 키가 여전히 빈으로 분류 서비스 양식](/img/open-science/v0311/classification-add-service.webp)

Jev를 사용할 때는 **Automatic capability selection**에서 **TypeSafe AI / Jev Latest**를 선택한 후 **Check model**을 누릅니다. **Check passed**는 서비스가 응답함을 뜻합니다. Settings를 다시 열어 선택한 설정이 유지되는지 확인합니다.

![TypeSafe AI / Jev Latest 선택 및 Check passed 표시, API 키는 숨김](/img/open-science/v0311/classification-connected.webp)

예를 들어, Codex Chat Completions 세션에서 공개 TP53 조회는 `mcp-genes`을 선택하기 위해 Jev를 사용할 수 있습니다. 활동에서 선택한 기능을 검사하고 연구 결과에 대한 데이터베이스 응답을 검사합니다. Codex 구독 세션은 기존의 기능 로드 경로를 사용합니다. 저장된 Jev 바인딩은 그 세션이 Jev를 사용하지 않습니다.

### 스마트 컬렉션의 모델 {/* #smart-collection-model */}

1. **Settings → Model → Classification models**을 열고 이미 추가하지 않은 경우 호환 서비스를 저장합니다.
2. **Smart collections**의 밑에, 그것의 제안한 모형의 서비스 그리고 하나를 선정하고, 그 후에 **Check model**를 선택합니다. 이 바인딩은 모든 똑똑한 수집에 의해 공유됩니다; **Automatic capability selection**의 독립적입니다.
3. **테스트 성공**을 확인한 후 라이브러리로 돌아가고 작은 범위의 컬렉션을 만들 수 있습니다. 스마트 컬렉션에는 **기본 모델 없음**이 있습니다. 참조를 증발하기 전에이 바인딩을 구성하십시오.

Main는 **Codex subscription**를 사용하여 계속할 수 있습니다. 자체 분류 바인딩을 사용하여 라이브러리를 방지하지 않습니다. 아래 예제는 심사를 위해 **TypeSafe AI / Jev 최신 정보**을 선택합니다.

![Smart 컬렉션과 기능 선택은 서비스 키로 분리 된 바인딩이 있습니다.](/img/open-science/v0330/classification-smart.webp)

Screening은 수집 규칙과 참조 증거를이 서비스에 보냅니다. **Use available full text**을 끄고 제목과 요약을 사용합니다. PDF 텍스트를 보낼 수 있도록 설정; 긴 문서는 관련 구문을 사용하며 사용할 수 없거나 읽을 수없는 PDF은 제목과 요약으로 돌아갑니다. 각 결정에 대한 증거를 확인합니다. [Smart Screening 워크플로우](../workflows/screen-literature.md)을 따라 실제 종이 세트를 평가하고 검토하십시오.

### 주문 분류 서비스 {/* #custom-classification */}

**Add service → Custom HTTP service**에서 서비스 이름, 엔드포인트 URL 및 모델 ID를 입력합니다. 엔드포인트는 **TypeSafe 분류 프로토콜**을 구현해야 합니다. 정규 채팅 완료 엔드포인트는 교환이 불가능합니다. 필요한 경우 서비스 API 키 공급 : 루프백 엔드 포인트는 키없이 HTTP을 사용할 수 있으며, 원격 엔드 포인트는 HTTPS 및 자격 증명이 필요합니다.

저장 후 **Automatic capability selection**에서 서비스를 선택하고 **Check model**을 실행하십시오. 그런 다음 지원되는 대화 경로에서 기능 선택을 검사합니다. 이 설정은 Main을 전환하지 않거나 Codex 구독 세션은 classifier를 사용합니다.

아래 양식은 필드를 설명합니다. 연결 확인하기 전에 실제 서비스 세부 사항과 샘플 엔드 포인트 및 `your-model-id`을 대체하십시오.

![주문 분류 엔드포인트, 모델 및 빈 키 필드](/img/open-science/v0320/classification-custom.webp)
