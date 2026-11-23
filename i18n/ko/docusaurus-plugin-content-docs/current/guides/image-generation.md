---
title: "이미지 생성 및 편집"
last_update:
  date: '2026-11-23'
---

# 이미지 생성 및 편집 {/* #generate-and-edit-images */}

선명한 삽화를 만들고, 이전 버전을 유지하면서 선택한 이미지를 정제합니다. explanatory 도표 또는 발표 삽화를 위해 이것을 사용하십시오. 생성된 이미지는 실험적인 증거가 아닙니다; 그것을 공유하기 전에 과학적인 상표, 구조 및 시각적인 주장을 확인하십시오.

## 이미지 서비스 구성 {/* #configure */}

1. **Settings → Model**를 열고 **Image generation**를 찾으십시오. **Image services → Add image service**를 엽니다.
2. **Provider type**를 선택하십시오. **Custom HTTP service**를 위해, **Name**, **Base URL** 및 **API key**를 입력하고, 그 후에 정확한 **Model ID** 및 **공용영역 preset** 서비스를 지원했습니다. 사용자 정의 엔드포인트의 경우 **API format**와 서비스의 이미지 API와 일치합니다.
3. 서비스를 저장 한 다음 **Image generation model**에서 그것을 선택합니다. **Not configured**는 이미지 생성이 준비되어 있지 않습니다.
4. 1개의 작은 이미지 요구로 시작하고 반환된 이미지를 검열하십시오. 새로운 이미지 설정은 다음 차례로 적용됩니다.

![endpoint, API 형식, credential 및 모델 필드가있는 이미지 서비스 설정](/img/open-science/v130/image-service.webp)

Main, Vision, Image generation은 역할이 다릅니다. Main은 대화를 진행하고, Vision은 이미지를 읽으며, Image generation은 이미지를 생성하거나 편집합니다. Main에 Codex 구독을 사용해도 이미지 생성 API나 해당 사용량이 자동으로 제공되지는 않습니다. 현재 작동하는 Main 모델은 유지하고 이미지 서비스를 별도로 설정하세요.

## 첫 번째 이미지를 생성 {/* #generate */}

프로젝트 대화에서 이미지의 목적, 내용, 레이아웃 및 라벨을 설명합니다. 저장된 이미지에 대한 질문. 이미지 생성 도구 카드는 요청 및 진행 상황을 보여줍니다. 미리 열기 전에 완료된 출력을 기다립니다.

<p className="example-label"><strong>예시</strong> 개념 작업 흐름을 요청</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

실제 라벨, 주문 및 화살표 방향을 검사합니다. 요청이 실패하면, 이미지 서비스, 모델 및 오류를 변경하지 않고 관련 공급자에게. Prompts 및 소스 이미지 생성 또는 편집에 사용되는 선택된 이미지 서비스에 전송됩니다. 취소는 이미 전송된 데이터를 검색할 수 없습니다.

## 편집, 비교 및 재사용 {/* #edit */}

1. 미리보기에서 이미지가 열립니다. 그것을 넘어서 또는 그것의 통제에 키보드 초점을 이동하고, 그 후에 **Edit image**를 선택합니다. 지시를 입력하기 전에 소스 이미지 및 버전을 확인합니다.
2. 대화 작곡가에서 집중적인 변화를 설명합니다. 표시된 소스에 묶인 요청을 유지하십시오; 편집을 입력하지 않습니다. 지역을 선택하면 강조된 지역과 그 지시를 확인하십시오. 사용 가능한 도구 및 매개 변수는 이미지 및 서비스에 달려 있습니다.
3. **Send image edit**을 선택하고 새로운 출력을 기다립니다. 제어가 사용할 수없는 경우 표시된 이유와 [image-service 설정](#configure)을 확인하십시오. 실패한 요청은 새로운 완성 된 버전이 아닙니다.
4. **Compare with input image** 또는 **Compare**을 사용할 때 제공되며 변경된 영역과 내용을 모두 검사하여 변경되지 않습니다. **Image history**을 사용하여 이전 버전 또는 **Continue editing**을 다시 시작합니다.
5. 선택된 버전을 다운로드하고, 다시 열리고, 공유하기 전에 라벨과 과학적 주장을 확인합니다. 이미지 세부사항은 편집을 생성한 Notebook 커널을 확인할 수 있습니다; 그 기록은 과학적인 정확도를 설치하지 않습니다.

편집 컨트롤이 작곡가를 사용하면서 대화가 남아 있습니다. 정확한 캡션 식별을 유지하십시오. 음모에 대한 수치 검사, 사용 [Notebook](notebook.md) 및 [출처](reproducibility.md); 슬라이드 텍스트의 경우 [발표 편집](presentation-editing.md)을 참조하십시오.

## 저장하기 전에 이미지 서비스를 시험하십시오 {/* #test-service */}

v1.3.1에서 이미지 서비스 양식은 필요한 필드와 모델이 채워진 후 **Test generation**을 제공합니다. 확인을 검토하십시오: 그것은 1개의 이미지를 생성하고 제공업체가 요청에 대해 요금을 청구할 수 있습니다. 통과한 시험은 그 정확한 윤곽에 적용합니다; 모델, 엔드포인트 또는 자격 변경은 새로운 테스트가 필요합니다. 실행하지 않고도 저장할 수 있습니다.

새로운 서비스를 저장 한 후, 첫 번째 모델은 이미지 생성 모델이 이미 선택되지 않을 때에만 기본이됩니다. 첫 번째 요청 전에 선택 검사. Main은 별도로 구성됩니다.

![저장하기 전에 이미지 서비스를 시험하십시오](/img/open-science/v1.3.1/image-service-test.webp)

## 이미지 모델 카탈로그를 새로 고침 {/* #image-model-catalog */}

**Settings → Model → Image services**에서 공식 **오픈AI**, **미니 맥스**, **Bailian** 또는 **Volcengine Ark** 서비스를 추가하거나 편집하십시오. 연결 필드를 채우고 저장하기 전에 **Refresh model list**을 선택하십시오. 새로 고침은 그 공급자에 구성 된 자격 증명을 보냅니다. 이미지를 생성하지 않습니다.

새로 고침된 목록 일치 공급자는 Open-Science에 의해 지원된 이미지 모형에 대하여 결과, 그래서 공급자 제안을 제안하는 각 모형이 아닙니다. 현재 기본값은 유지되며, 반환된 카탈로그에서 누락될 때 마커와 함께 유지됩니다. 모델에 의존하기 전에 마커를 검토하십시오. 실패한 새로 고침은 이전 명부를 지킵니다; 표시된 원인과 재발견을 확인합니다. **Save**은 형태를 커밋하고, [생성 테스트](#test-service)은 별도의 잠재적으로 청구 가능한 이미지 요청입니다.

Bailian의 경우, credential과 일치하는 workspace URL 및 지역을 사용하십시오. 중국 연결 자격 증명 사용 중국 카탈로그. 연결 또는 작업 공간 변경은 카탈로그를 다시 확인해야합니다. 다른 지역에서 볼 수있는 모델은 여기에 액세스의 증거가 없습니다.

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
