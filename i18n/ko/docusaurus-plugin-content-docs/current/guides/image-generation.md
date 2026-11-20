---
title: "이미지 생성 및 편집"
last_update:
  date: '2026-11-20'
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

이미지 편집 작업을 열고 소스 버전을 선택하고 집중된 변화를 설명합니다. 선택한 서비스가 지원할 때만 사용 가능한 지역 및 매개 변수 제어를 사용합니다. 편집을 제출하고 새로운 출력을 기다립니다. 편집은 새 버전을 만들기 때문에 이전 변형은 사용할 수 있습니다.

소스와 함께 후보를 비교: 요청된 지역을 확인하고 unchanged를 유지해야하는 부품. 이미지의 역사를 사용하여 버전을 재시동하거나 계속 편집합니다. 최종 버전을 다운로드하고 프레젠테이션에 배치하기 전에 파일을 다시 엽니다. 정확한 캡션 식별을 유지하십시오.

숫자 검사를 필요로 하는 기존의 도형을 위해, [Notebook](notebook.md)와 [회사연혁](reproducibility.md)를 사용하십시오. 슬라이드 텍스트 및 포맷을 위해 [공지사항](presentation-editing.md)를 참조하십시오.
## 저장하기 전에 이미지 서비스를 시험하십시오 {/* #test-service */}

v1.3.1에서 이미지 서비스 양식은 필요한 필드와 모델이 채워진 후 **Test generation**을 제공합니다. 확인을 검토하십시오: 그것은 1개의 이미지를 생성하고 제공업체가 요청에 대해 요금을 청구할 수 있습니다. 통과한 시험은 그 정확한 윤곽에 적용합니다; 모델, 엔드포인트 또는 자격 변경은 새로운 테스트가 필요합니다. 실행하지 않고도 저장할 수 있습니다.

새로운 서비스를 저장 한 후, 첫 번째 모델은 이미지 생성 모델이 이미 선택되지 않을 때에만 기본이됩니다. 첫 번째 요청 전에 선택 검사. Main은 별도로 구성됩니다.

![저장하기 전에 이미지 서비스를 시험하십시오](/img/open-science/v1.3.1/image-service-test.webp)
