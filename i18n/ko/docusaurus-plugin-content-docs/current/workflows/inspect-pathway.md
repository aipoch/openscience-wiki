---
title: "경로 및 상호 작용 네트워크 검사"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 경로 및 상호 작용 네트워크 검사 {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>실습 예제</strong> Pathway Commons을 통해 Reactome에서 인간적인 p53 신호</p>

**자료: TP53**, **MDM2를** 및 **CDKN1A를**가 네트워크에 표시되는 방법을 검사하는 큐레이터 경로를 사용합니다. 결과는 저장된 소스 기록, 상호 작용 테이블 및 연구 주입니다. 이 검색은 연결성을 조정; 샘플의 enrichment 또는 측정 통로 활동을 테스트하지 않습니다. 통계적 유전자 목록 질문에 대한 [유전자 세트 enrichment](gene-set-enrichment.md)을 사용하십시오.

## 1. 프로젝트 준비 {/* #prepare */}

1. **Pathway Commons 연구**이라는 프로젝트를 작성하고 대화를 시작합니다.
2. **Settings → Connectors**에서 활성 에이전트에 **Pathway Commons**을 사용할 수 있습니다. 그것은 공중 서비스를 사용합니다; 이 예제는 개인 연구 파일이 필요하지 않습니다.
3. 형성된 Main 모형을 선택하십시오. 이 예제는 **Codex subscription**을 사용했습니다. Codex이 **Update required**, [런타임 업데이트](../guides/frameworks.md#update-codex)로 표시된 경우 작업 보내기 전에 표시됩니다.

## 2. 검색 및 반환된 정체성을 유지 {/* #search */}

지불 조건:

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

대화 옆에 **Notebook**을 열고 쿼리 및 반환된 레코드를 검사합니다. `Pathway`, 유기 `9606` 및 데이터 소스 `reactome`를 입력하여 검색된 `p53 signaling`을 실행합니다. 또한 `p53`과 `top_pathways`을 사용합니다. 검색은 **1,309 총 조회수**을보고; 첫 번째 페이지는 전체 결과가 설정되지 않습니다.

![Notebook의 영어 연구 요청 및 실제 Pathway Commons 쿼리](/img/open-science/v0340/pathway-query.webp)

선택된 기록은 **TP53에 의한 Transcriptional 규정**, 정확한 URI로 `http://bioregistry.io/reactome:R-HSA-3700989` 및 소스 `pc14:reactome`... URI를 라벨에서 재구성하는 것보다 쿼리에 의해 반환합니다. 검색 결과 및 수는 소스 업데이트로 변경할 수 있습니다.

## 3. 선택된 통로 수출 {/* #export */}

선택된 URI에 대한 질문은 **subpathways 포함**로 수출됩니다. 이 실행에서는, 대리인은 SIF, TXT 및 JSON-LD 응답을 저장했습니다. SIF 공급 flattened 상호 작용 기록; TXT는 노드 레코드를 추가합니다. JSON-LD는 풍부한 모델 구조를 유지합니다. 형식 또는 동향 범위를 선택할 때 [및 다운로드 가능한 레지스트리는 이제 v0.31.1 :](../reference/connector-operations.md#pathway_commons_export)을 참조하십시오.

요약을 읽기 전에 유지 된 응답을 검사합니다. 예를 들어 SIF 수출은 **3,318 상호 작용 기록** 및 TXT 수출이 포함 된 **387 노드**. 이 카운트는이 선택된 경로와 수출 범위를 설명합니다., 모든 인간 p53 상호 작용.

## 4. 결과를 열고 검사합니다 {/* #inspect */}

1. 답변 또는 생성 파일 카드에서 **tp53_mdm2_cdkn1a_readable_interactions.tsv를**을 선택하십시오. 열이 좁은 경우 풀 스크린 미리보기를 엽니 다.
2. `source`, `interaction` 및 `target`를 원시 응답에 체크하십시오. 9 줄 독서 테이블은 전체 네트워크가 아닌 선택입니다.
3. **tp53_pathway_research_note.md**을 엽니다. pathway URI, 소스, 날짜 및 제한을 유지하십시오.
4. 필요한 파일을 다운로드합니다. 발표에 사용되는 모든 발췌와 함께 완전한 네트워크 및 원래 응답을 보존합니다.

![Nine 선택한 상호 작용 기록은 앱에서 열립니다.](/img/open-science/v0340/pathway-interactions.webp)

반환된 기록은 `TP53 controls-expression-of MDM2`, `MDM2 controls-state-change-of TP53` 및 `MDM2 in-complex-with TP53`를 포함합니다. CDKN1A는 6개의 기록에서 나타납니다, 그러나 이 SIF 수출에는 직접적인 TP53-to-CDKN1A 가장자리가 없습니다. 선택된, 평평한 통로에 있는 absent 가장자리는 생물학적 관계가 absent인 증거가 아닙니다.

![Pathway ID와 해석 제한으로 영어를 저장](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` 자체는 활성화 versus 금지를 지정하지 않습니다; `in-complex-with`는 직접적인 이진 바인딩을 설치하지 않습니다. 네트워크는 조직 특성, 돌연변이 효력, 상호 작용 힘, 표본 수준 활동 또는 가성성을 설치할 수 없습니다. 원래 통로 반응 및 기본 실험을 사용하여 그 질문을 조사합니다.

## Saved 예제 파일 {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">원래 Connector 응답, 압축 ZIP</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">수출된 상호 작용 테이블을 완료하십시오</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Nine-row 판독 테이블</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">한국어 연구</ExampleDownload>

선택된 경로 대신 유전자 세트 사이에 유전자 동성 또는 경로를 탐험하기 위해 **pathway_commons_graph**을 사용하고 방향, 경로 모드 및 한계를 결정하십시오. 이 URI 기반 수출에서 다른 쿼리입니다. 소스 및 설정은 [과학 데이터베이스](../tools/databases.md#pathway-expression-clinical)에 설명됩니다.
