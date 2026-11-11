---
title: "문학 검색 일괄"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 문학 검색 일괄 {/* #combine-literature-search-batches */}

<p className="example-label"><strong>실습 예제</strong> 고체 전해질 공용영역 및 interphases</p>

두 개의 검색은 종종 과잉 종이를 반환합니다. 각 검색의 검증을 유지, 후보를 화면, 다음 식별자 기반 재사용과 하나의 컬렉션으로 배치를 가져. 이 예제는 두 개의 정품 OpenAlex 일괄 처리를 검색하고 각 8 개의 레코드를 유지하고 라이브러리의 **15 고유 참조**과 함께 끝납니다. 그것은 메타 데이터 조직을 보여줍니다; 전체 텍스트가 검색 또는 승인되지 않았습니다.

## 1. 검색을 모두 실행하고 기록 {/* #1-run-and-record-both-searches */}

**Resource center → Connectors**에서 **문학 그래프**을 활성화하고 요청한 경우 OpenAlex 자격 증명을 구성합니다. 프로젝트를 열고 대화를 시작하고 연결된 모델을 선택하십시오. 기록 된 실행은 Open-Science **0.30.1**, **Codex 구독 / gpt-5.6-sol**를 사용했습니다. 소스 PDF가 필요하지 않습니다.

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

쿼리에 대한 실제 Connector 활동을 검사, 날짜 및 반환 카운트. 기록 된 검색은 **12 후보자**, **94,620** 및 **15,355** 경기의 총에서 반환. 모자는 이러한 바인딩 된 예제를 만들어, 배설 된 리뷰가 아닙니다. 둘 다 배치는 OpenAlex에서 옵니다; 두 개의 쿼리 포뮬레이션은 독립적 인 데이터베이스를 만들지 않습니다.

## 2. 수입하기 전에 수출 검사 {/* #2-inspect-the-exports-before-importing */}

**Generated** 아래 **electrolyte-merged.csv**을 엽니다. 유지된 타이틀, DOIs 및 소스 회원을 2개의 RIS 수출 및 후보 감사에 대하여 확인하십시오. 실제 조합에는 15 줄이 있습니다; DOI **10.1007/s41918-024-00212-1**은 일괄 처리에서 발생하며 라벨 **A&#124;B**입니다.

![검색 배치의 저장된 조합, 유지 소스 회원](/img/open-science/workflow-extensions/batches-merged.webp)

비교를 위해, 손질 DOI whitespace는, 선택적인 DOI URL 접두사를 제거하고 case-insensitively 비교합니다. 원본 식별자를 소스 레코드에 보존합니다. 혼자서 비슷한 제목은 두 개의 레코드가 동일하다는 충분한 증거입니다; unsolved 식별자 분쟁이 검토해야합니다.

다운로드 <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">배치 A</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">배치 B</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">모든 24 후보 결정</ExampleDownload> 및 <ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">15-row 조합</ExampleDownload>. 이들은 기록 된 실행에서 수출이다.

## 3. 첫 번째 배치를 이름 컬렉션으로 가져 오기 {/* #3-import-the-first-batch-into-a-named-collection */}

1. **Library → New collection**을 열고 **Solid-State Electrolyte 인터페이스**을 만듭니다.
2. **Import references**을 선택하기 전에 사이드바에서 수집을 선택합니다.
3. `electrolyte-batch-a.ris`을 선택하십시오. **Import to**이 의도한 컬렉션을 이름을 지정합니다.
4. **When identifiers match → Reuse existing reference**을 선택 해제하십시오. **View details** 검사, 다음 **Import references**을 선택합니다.

![First-batch 가져오기 미리보기: 선택된 컬렉션의 8개의 새로운 기준](/img/open-science/workflow-extensions/batches-import-a.webp)

기록된 라이브러리에서, **8 생성, 0 재사용, 0 Skipped, 0 실패**로 완료된 첫 번째 가져오기. **Done**을 클릭하고 수집을 확인합니다. 라이브러리가 이미 일치하는 레코드를 포함하면 생성 된 / 재사용 된 분할이 다를 수 있습니다.

## 4. 두번째 배치를 수입하고 overlap를 재사용하십시오 {/* #4-import-the-second-batch-and-reuse-the-overlap */}

선택한 동일한 컬렉션으로 `electrolyte-batch-b.ris`을 가져옵니다. 미리보기는 import를 커밋하기 전에 기존 레코드를 식별해야 합니다. 이 실행에서 **7 새로운 참고, 1 기존, 0 Skipped**을 보여주었습니다.

![Second-batch 미리보기는 Existing으로 공유된 종이를 식별합니다.](/img/open-science/workflow-extensions/batches-import-b.webp)

**Reuse existing reference** 유지, 공유 제목을 검사, 다음 가져 오기. 실제 완료 요약 읽기 : **7 생성, 1 재사용, 0 Skipped, 0 실패**. Reuse는 기존 메타 데이터를 유지하고 목적지에 일치하는 참조를 추가합니다. 두 번째 사본을 만들거나 PDF을 다운로드하지 않습니다.

![7개의 생성한 1개의 재사용을 가진 2개의 수입품을 완료했습니다](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. 결과 수집 확인 {/* #5-check-the-resulting-collection */}

**Done**을 클릭합니다. 컬렉션에는 **15 참조**이 포함되어 있으며 DOI 조합으로 제공됩니다. 2개의 오리지널 수출과 검증된 CSV을 유지하므로 각 후보가 어디에서 왔는지 재구성할 수 있습니다.

![15개의 문헌을 가진 최종 수집](/img/open-science/workflow-extensions/batches-collection.webp)

카운트 일치는 유용한 검사, 과잉 DOI 및 대표 제목을 검사하기위한 교체가 아닙니다. 나중에 게시 된 창을 추가하려면 baseline을 보존하고 [기존 문학 컬렉션 업데이트](update-literature.md)을 계속하십시오.
