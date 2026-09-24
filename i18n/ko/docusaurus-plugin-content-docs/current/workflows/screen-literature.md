---
title: "스마트 컬렉션으로 논문 선별하기"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 스마트 컬렉션으로 논문 선별하기 {/* #screen-papers-with-a-smart-collection */}

<p className="example-label"><strong>실습 예제</strong> CO2 전기 감응작용을 위한 단일 종양 촉매 촉매에 1 차적인 학문을 선택하십시오</p>

후보 목록을 inclusion 및 exclusion 표준을 사용하여 검토 된 읽기 세트로 켭니다. 이 예제는 8 개의 종이를 검색하고 제목과 요약에 대한 스마트 컬렉션을 실행하고 결정과 수출 5 가지 주요 연구를 확인합니다. 타겟팅 그룹을 선택, 배기 체계적인 검토 또는 전체 텍스트 품질 평가하지 않습니다.

## 1. 자주 묻는 질문 {/* #screening-inputs */}

프로젝트 **단 하나 원자 Catalysis 검열**을 만들고 작업 모델과 대화를 엽니다. 이 실행은 **Codex subscription**을 사용했습니다. 관련 문헌 커넥터를 활성화하고 필요한 경우 [자격 증명](../guides/connectors.md)을 구성합니다. 지불 조건:

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

**Library → Inbox**을 열고, 각 제목, DOI 및 소스를 확인하고, 이 8개의 레코드를 선택하고 **Accept**를 선택합니다. 이 프로젝트에 연결되는 것을 확인합니다. 다른 pending Inbox 레코드는 자신의 리뷰를 필요로; Inbox를 지우기 위해 그들을 받아 들일 수 없습니다.

저장된 <ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">후보자 목록</ExampleDownload>는 온라인 첫 번째 및 저널 조직 년 간의 차이를 포함하여 5 가지 주요 연구 및 3 개의 리뷰 / 계정 기록을 기록합니다. 정확한 반복을 위해, 그 목록에 있는 8개의 DOIs를 프로젝트에 추가하십시오. 새로운 주제 검색은 다른 후보자를 반환 할 수 있습니다.

## 2. 스크리닝 모델 {/* #screening-model */}

**Settings → Model → Classification models**을 엽니다. **Smart collections**의 밑에, 형성된 분류 서비스 및 그것의 모형을 선정하십시오. 서비스 카드에 **Check model**을 사용하고 **테스트 성공**을 확인합니다. 이 예제는 **TypeSafe AI / Jev 최신 정보**을 사용합니다. Main은 Codex과 함께 계속됩니다.

![Smart 컬렉션에 대한 별도의 모델 바인딩](/img/open-science/v0330/classification-smart.webp)

스마트 컬렉션에는 기본 모델이 없습니다. **Automatic capability selection** 바인딩은 다른 특징이고 이 것을 대용할 수 없습니다. 모든 똑똑한 수집은 검열 바인딩을 공유합니다. [분류 설정](../guides/models.md#smart-collection-model) 참조.

## 3. 범위 및 규칙 정의 {/* #screening-rules */}

라이브러리에서 **New collection**을 선택하고 **CO2 감소 - 1 차적인 연구**을 입력하고 **Smart collection**를 켜십시오. **Scope**을 **Project**에 **단 하나 원자 Catalysis 검열**로 설정하므로 8개의 프로젝트 참조만 평가됩니다.

| (주) | 이 예제에서 사용되는 텍스트 |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

모든 포함 기준은 충족되어야하며 예외는 적용 할 수 없습니다. **Use available full text** 및 **Update automatically**을 이 제목 및 a-abstract 패스로 유지하고 **Create collection**를 선택합니다. 스크린 샷은 **Collection rule → Edit rule**을 통해 재개 된 저장된 규칙을 보여줍니다.

![저장된 기준, 경계 프로젝트 범위 및 증거 선택권](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview**은 초안을 조정하는 데 도움이 될 수 있지만 결과가 저장되지 않습니다. **Use available full text**는 분류 서비스에 유효한 PDF 원본을 보냅니다; 긴 PDF는 관련 통행을 사용하고 사용할 수 없는 PDF는 제목과 추상으로 돌아갑니다. 전체 텍스트 평가로 치료하기 전에 결정에 대한 실제 증거를 확인하십시오.

## 4. 작은 검열 패스를 실행 {/* #screening-trial */}

**Collection actions → Trial run (up to 20 references)**을 열고, 범위를 검토하고 **Start trial run**을 선택합니다. 재판은 결정과 **Screening process**을 엽니 다. 처리 된 조사를 따르고, 후보자와 들어오는 결과. **AI 일치**은이 실행의 모델 결정에 대해 설명합니다. 수동 결정은 여전히 수집 회원을 결정합니다.

실행 패스를 중단하려면 **Pause** (labelled **Pause analysis**)을 선택하십시오. **일시 정지됨**를 기다리면 **Resume analysis**를 사용하십시오. 실행은 규칙, 후보자 종이 또는 저장된 진도 변화 후에 더 이상 resumable 일지도 모릅니다; 새로운 패스를 시작하기 전에 현재 규칙을 확인합니다. **결과로 돌아가기**은 포함, 리뷰, 제외 및 평가되지 않습니다. **Run details**은 패스에 대한 정보를 보여줍니다.

![동일한 8개의 후보자를 위한 완성된 검열 과정](/img/open-science/v0331/smart-completed.webp)

| 보기 | 사용 방법 |
| --- | --- |
| 수록됨 | 일치한 종이를 읽고 eligibility를 확인합니다. |
| 검토 필요 | 불확실한 또는 실제적인 근원에 대하여 outdated 평가를 해결하십시오. |
| 제외됨 | 예외 이유가 귀하의 기준에 동의한다는 것을 확인하십시오. |
| 평가되지 않음 | 재발급하기 전에 누락된 증거 또는 보고된 평가 오류를 검사하십시오. 그것은 예외 결정이 아닙니다. |

행의 **Evaluation details**을 클릭하여 결정, 일치 점수, 증거 및 모델 기록을 검사합니다. 점수는 규칙 일치를 설명합니다; 그들은 학문 질 또는 효력 크기의 측정하지 않습니다.

![제목과 직업 증거와 실제 불확실한 결정 및 모델 점수](/img/open-science/v0330/screening-review.webp)

## 5. 리뷰 및 읽기 설정 확인 {/* #screening-review */}

서류 제목을 열고, 그 요약을 읽고 DOI/source 링크를 필요에 따라 읽으십시오. 출판일, 연구 유형, 촉매 및 반응 규칙과 비교하십시오. **Include** 또는 **Exclude**을 체크한 후만 선택하십시오.

예를 들어, 첫 번째 패스는 두 리뷰를 제외, **Needs review**에서 5 가지 주요 연구 왼쪽, 그리고 충분한 읽기 쉬운 증거로 하나의 레코드를 평가 할 수 없습니다. 다섯 가지 주요 연구는 수동으로 포함되었다; 나머지 리뷰는 연구 유형 검사 후 수동으로 제외되었습니다. 이것은 검토 단계, 5 자동 포함 결정.

![1차 연구는 초록 및 기준을 검토 한 후 수동으로 포함](/img/open-science/v0330/screening-manual-decision.webp)

| 관련 기사 | 최종 결정 | 팟캐스트 |
| --- | --- | --- |
| 주, 2017 · [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | 포함 | 금속의 실험적인 비교 – 질소 탄화수소 CO2 전기 촉매. |
| 2019 · [10.1002/anie.201906079의 특징](https://doi.org/10.1002/anie.201906079) | 포함 | FeN5 사이트의 준비 및 전기 화학 테스트. |
| Cai, 2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | 포함 | CO2-to-methane 변환에 대한 실험적인 Cu-site 촉매 연구. |
| · 2022 [10.1021/acs.nanolett.1c04382를 보십시오](https://doi.org/10.1021/acs.nanolett.1c04382) | 포함 | Fe Single-atom catalysts의 실험 인 튜닝. |
| 2021 · [10.1002/anie.202014718의 특징](https://doi.org/10.1002/anie.202014718) | 포함 | 실험 준비 및 CO2 지원 Ag 사이트 테스트. |
| · 2019 · [10.1021/acs.accounts.8b00478의](https://doi.org/10.1021/acs.accounts.8b00478) | 제외 | 계정; 1 차 학습 규칙 밖에서. |
| · 2020 [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | 제외 | 리뷰; 배경 읽기로 따로 유지하십시오. |
| 왕, 2022 · [10.1002 / smm2.1101](https://doi.org/10.1002/smm2.1101) | 제외 | 소스 검사 후 수동으로 분류. |

수동 결정은 수집 업데이트가가 될 때 남아있다. **Use model decision**는 개인 설명서 override를 제거합니다; 컬렉션 메뉴의 **Reset manual decisions**에는 더 넓은 범위가 있습니다. 사용 전에 해당 범위를 검토합니다.

## 6. 수출 및 선택된 종이 사용 {/* #screening-export */}

**포함 5**, **3 제외** 및 **Needs review** 또는 **Not evaluated** 항목에 대한 제로를 확인합니다. 포함 행은 **Manually included**이 예에 대해 말해야 합니다. 모델의 첫 번째 패스 점수는 다를 수 있습니다.

![수동으로 5개의 종이 및 마지막 5/3 쪼개지는](/img/open-science/v0330/screening-included.webp)

**Collection actions → Export included references → BibTeX** 또는 **RIS**을 선택하고 파일을 저장하고, 5 DOI 레코드를 포함하는 검사하십시오. <ExampleDownload path="/examples/v0330/screened-primary-studies.bib">예 BibTeX</ExampleDownload>은 Redistribution을 위해 제거된 초록색으로 수출된 인용을 보존합니다. 가시성 로그 또는 PDF 번들을 가리키지 않는 전기입니다. 선택에 손을 때 <ExampleDownload path="/examples/v0330/screening-decisions.csv">관련기관</ExampleDownload> 유지.

[그룹 메모리 팩](journal-club.md)의 선택된 세트를 사용합니다. 상세한 결과를 추출하기 전에 전체 텍스트를 확인하고 검사하거나 촉매 성능을 비교하십시오. **Update automatically**은 선택한 범위의 새로운 또는 변경된 레코드를 평가할 수 있으며, 서비스 비용이 발생할 수 있습니다. 그것은 새로운 종이에 대한 외부 데이터베이스를 검색하지 않습니다.
