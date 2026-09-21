---
title: "지정된 저널 및 날짜 내에서 검색"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 지정된 저널 및 날짜 내에서 검색 {/* #search-within-specified-journals-and-dates */}

<p className="example-label"><strong>실습 예제</strong> 두 개의 저널에 대한 불안정한 개입 시험, 2019–2025</p>

집중된 검색은 명시된 한계와 어떤 스크린의 기록이 필요합니다. 이 예제는 PubMed를 사용하여 **JAMA 정신과** 및 **Behaviour 연구 및 치료**의 심리적 관련 출판물을 검색 한 다음 다른 출판물에서 무작위로 시험 보고서를 분리합니다. 완전한 검열 테이블과 검색 노트를 생산, 치료 권고 또는 체계적인 검토하지.

## 1. 질문과 자격 규칙 설정 {/* #1-set-the-question-and-eligibility-rule */}

프로젝트를 열고 연결된 모델을 선택하십시오. **팟캐스트** Connector를 **Settings → Connectors**에서 확인하십시오; 요청한 경우 연락처 정보를 구성합니다. 이 예제를 시작하려면 다운로드 된 종이가 필요하지 않습니다.

게시 날짜 **2019-01-01를 통해 2025-12-31**, 데이터베이스 레코드가 추가 된 날짜가 아닙니다. 정의된 심리적 개입 팔을 가진 1 차적인 무작위 보고를 포함하고 participant outcomes를 보고했습니다. 혼합 개입, 불분명 발행 상태 또는 충돌 날짜에 대한 별도의 **이름 &#42;** 범주를 유지하십시오. Mechanistic outcomes 혼자서는 이차 분석 보고서를 만들지 않습니다.

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![Open-Science의 실제 초점 연구 요청](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. 자주 묻는 질문 {/* #2-check-the-query-and-coverage */}

이 개념 및 주체 쿼리를 제출 한 실행은 별도로 제공 된 출판 날짜 필터와 함께:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

**Notebook**을 열고 PubMed 활동을 확장합니다. 저널 필드를 확인, 날짜와 반환된 수. 9 월 16, 2026, 검색은 **62 기록**를 반환; 모든 62은 `has_more = false`과 함께 재생되었습니다. 카운트는 PubMed로 변경할 수 있습니다. 결과가 truncated 경우, 모든 검색 결과가 표시된 것을 주장하기 전에 남아있는 페이지를 검색합니다.

넓은 개념 쿼리 deliberately 유지 비-trials. Trial eligibility는 별도의 심사 결정입니다. 간행물 유형 색인 혼자는 불완전할 수 있고, 이전 무작위 시험이라고 언급하는 종이는 반드시 새로운 것을 보고하지 않습니다.

## 3. 심사 및 수정 screening 테이블 {/* #3-review-and-correct-the-screening-table */}

응답이 완료되면 **Generated** 아래 **mindfulness-search-audit.csv**을 엽니다. 모든 검색 PMID, 제외 및 불확실한 레코드를 포함. 제목을 확인, 저널, DOI 및 연결된 PubMed 레코드에 대한 날짜, 다음 요약과 결정을 비교.

![uncertain 및 제외된 레코드를 포함한 저장된 후보자 표](/img/open-science/workflow-extensions/focused-search-table.webp)

추상적인 것에 대한 각 예외를 확인합니다. PMID **38837133**는 더 넓은 정신 요법의 1 차 무작위 시험입니다; 예를 들어, 마음의 불안정성 **이름 &#42;**을 표시한다. PMID **34009273**은 메타 분석이며 제외됩니다. 결정이 보정 될 때, 기록 및 특정 문제 이름을 입력하고 에이전트가 CSV을 업데이트하려면 저장 된 파일을 다시 열 수 있습니다.

![Notebook의 실제 상영 개정 및 저장된 파일 체크](/img/open-science/workflow-extensions/focused-search-notebook.webp)

검토 된 예 테이블은 **20 포함, 37 제외 및 5 불확실한 기록**, 모든 **62**에 대한 회계가 포함되어 있습니다. 이들은 20의 명백한 시험이 완전히 승인되었는지 선언하지 않는 요약 수준 검열 결정입니다. 다수 간행물은 동일한 underlying 재판을 걱정할 수 있습니다.

## 4. 눈에 띄지 않는 {/* #4-keep-uncertainty-visible */}

PMID **41418645**는 2019–2025 PubMed 출판 날짜 필터에 의해 반환되었으며, 그 메타 데이터는 **2026-01** 인쇄 날짜를 보여줍니다. 최종 날짜 결정하기 전에 공개 역사를 확인하십시오. 검색 창에 맞는 해를 조용히 교체하지 마십시오.

**mindfulness-search-notes.md**을 열고 계산, 자격 규칙 및 제한이 CSV과 일치한다는 것을 확인하십시오. 이 파일을 따라 원래 메타 데이터 스냅 샷을 유지하므로 각 결정은 소스로 추적 할 수 있습니다.

![20/37/5 스크린 카운트와 함께 검색 노트를 수정](/img/open-science/workflow-extensions/focused-search-notes.webp)

<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">관련 기관</ExampleDownload> 및 <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">관련 기사</ExampleDownload> 다운로드. 전체 요약은 여기에 적색되지 않습니다; 소스 링크를 따라 검사합니다.

공식적인 증거 검토를 위해, 불확실한 기록을 해결하고, 전체 텍스트를 얻고, 그들의 재판관에 연결 동반자 보고하고 적절한 독립적 인 검열을 배열하십시오. [읽기 목록 워크플로우](core-reading-list.md)을 사용하여 수집, 또는 소스 설정 및 액세스가 설치 된 후 [증거 추출](literature-review.md)을 구축하십시오.
