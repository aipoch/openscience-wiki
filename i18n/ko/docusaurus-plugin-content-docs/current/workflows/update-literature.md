---
title: "기존 문학 컬렉션 업데이트"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 기존 문학 컬렉션 업데이트 {/* #update-an-existing-literature-collection */}

<p className="example-label"><strong>실습 예제</strong> 2개의 간행물 창구에 걸쳐 민물 microplastic 수송</p>

업데이트는 원래 검색 규칙을 유지하고 정확히 무엇을 추가했는지 보여줍니다. 이 역사적인 재생은 **2020–2022** 수집을 처음 구축하고, 같은 쿼리 및 필터와 **2023–2025**을 검색합니다. 실제 라이브러리는 **7에 14 참조**에서 성장합니다. 이것은 설명서, 경계 검색입니다; 그것은 계획된 감시 또는 철저한 검토가 아닙니다.

## 1. 정의하고 baseline을 저장 {/* #1-define-and-save-the-baseline */}

연결된 모델로 프로젝트를 엽니다. **Resource center → Connectors**에서 **문학 그래프**을 활성화하고 필요한 경우 OpenAlex를 구성합니다. 지불 조건:

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

**12의 3,643 경기**을 반환하고 **7**을 유지하고 **5**를 제외합니다. **freshwater-search-plan.md** 을 열고 계속하기 전에 기준을 확인하고 날짜를 확인하십시오. 저장된 계획은 갱신의 앞에 국가를 설명합니다.

![Saved 기본 검색 사양 및 유지 기록](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

증거 수준을 검토: 일부 후보자는 제목 / 메타 데이터 만 제공, 다른 사람은 라이센스를 포함. Broad 수송 경로 리뷰는 상황에 따라 포함되어 있습니다; 그들의 포함은 민물 특정 실험 결과를 증명하지 않습니다.

## 2. 창조하고 수집을 Populate {/* #2-create-and-populate-the-collection */}

다운로드 <ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">기본 RIS</ExampleDownload>. **Library → New collection**에서 **민물 Microplastic 수송**을 만들고, **Import references**를 선택합니다. RIS를 선택하여 수입하기 전에 목적지와 일치한 행동을 확인하십시오.

![Baseline import는 수집을 위한 미리보기를 가져옵니다](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

**7 생성, 0 재사용, 0 Skipped, 0 실패**로 완료된 기록적인 수입. **Done**을 클릭하고 수집을 확인 7 참조. 다른 라이브러리의 기존 일치는 생성 / 재사용 된 분할을 변경할 수 있습니다.

![7가지 기본 컬렉션](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. 같은 대화에서 다음 날짜 창을 검색 {/* #3-search-the-next-date-window-in-the-same-conversation */}

프로젝트 대화로 돌아가기. 기본 파일을 변경하고 명시된 비교를 요청하십시오:

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

이 업데이트는 **12의 7,600 경기**, **7 추가, 0 기본 오버랩 및 5 제외**로 반환됩니다. 두 검색은 12 후보에 따라 결정됩니다. 데이터베이스 순위 및 적용을 변경할 수 있습니다; 카운트는 9 월 16, 2026 실행을 설명합니다.

![추가 및 제외로 저장 된 업데이트 감사](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

실제 DOI 세트를 빼기 보다는 오히려 총을 검사하십시오. 기본 라인에 따라 dated <ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">업데이트 감사</ExampleDownload> 및 <ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">업데이트 노트</ExampleDownload>을 저장하십시오.

## 4. 기존 컬렉션에 추가 {/* #4-import-additions-into-the-existing-collection */}

다운로드 <ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">추가 RIS</ExampleDownload>. 라이브러리에서 **민물 Microplastic 수송**을 선택하고 **Import references**을 선택합니다. **Reuse existing reference**을 유지하면 이미 존재하는 아이템을 안전하게 재사용할 수 있습니다.

![업데이트 가져오기 미리보기 7 추가 표시](/img/open-science/workflow-extensions/freshwater-import-update.webp)

실제 업데이트 가져오기 완료 **7 생성, 0 재사용, 0 Skipped, 0 실패**. 컬렉션에는 **14 참조**이 포함되어 있습니다. 이것은 2개의 유지한 세트의 정상적인 DOI 조합에 동의합니다.

![업데이트 된 컬렉션 4teen 참조](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

기본 자체는 rewritten하지 않았습니다. 그 날짜 범위와 검색 기록을 보존하기 때문에 나중에 독자는 업데이트에서 원본 증거 기초를 구별 할 수 있습니다. 제안이나 과학적 주장을 지원하기 위해, 검색하고 다음 관련 전체 텍스트를 읽으십시오; metadata 포함은 단지 증거 appraisal 아닙니다. overlapping 조회 배치를 위해, [결합 검색 배치](merge-literature-searches.md)를 보십시오.

다운로드 가능한 감사 사본 omits 전체 요약 및 라이센스 필드; 식별자, 결정 및 이유가 보존됩니다. 연결된 소스에서 요약 검사.
