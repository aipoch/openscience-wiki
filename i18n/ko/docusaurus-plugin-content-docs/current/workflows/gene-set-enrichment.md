---
title: "후보 유전자 세트에 대한 기능적 enrichment 실행"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 후보 유전자 세트에 대한 기능적 enrichment 실행 {/* #run-functional-enrichment-for-a-candidate-gene-set */}

<p className="example-label"><strong>실습 예제</strong> 의도적으로 선택된 인간 DNA-damage 유전자 목록</p>

정의 된 유전자 목록을 농축 생물학 과정과 통로의 테이블에 켭니다. 식별자 매핑, 통계 배경 및 소스 버전 유지.

시작하기 전에 필요한 커넥터를 활성화하려면 [과학 데이터베이스](../tools/databases.md#connect-database)을 따르십시오. 연결된 모델과 사용 가능한 [Notebook 런타임](../guides/runtimes.md)을 사용합니다.

이 v0.31.1 예제는 11 공개 유전자 기호를 사용하여 g:Profiler를 보여줍니다. 그들은 그들의 알려진 생물학적 역할을 선택했다, 그래서 풍성한 예상된다. 그들은 GSE60450 프로젝트 또는 비난 발견의 증거에서 차별 압축 결과가 아닙니다.

## 1. 유전자 목록 및 분석 설정 정의 {/* #gene-set-enrichment */}

1. **Settings → Connectors**에서 에이전트에 **유전자 및 종양학**을 사용. 연결된 모델과 사용할 수 있는 Notebook 실행 시간으로 세션을 엽니다.
2. 생물, 유전자 식별자, 데이터 소스 및 통계 배경을 지정합니다. 실제 실험 데이터의 경우 실험에 의해 선택된 유전자를 사용하여 배경을 단화합니다. 이 튜토리얼은 명시적으로 모든 annotated 유전자를 사용하여 사용자 정의 측정 된 유전자 우주가 아닙니다.
3. 다음 프롬프트를 보냅니다. 같은 세션에서 소스 버전 쿼리 및 enrichment 호출을 유지하고 실제 결과를 저장하십시오.

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

## 2. 식별자 및 소스 버전 확인 {/* #identifier-check */}

생성된 노트를 열고 쿼리 및 매핑 카운트를 확인합니다. **11/11** unmapped, ambiguous 또는 중복 식별자와 함께 맵핑 된 **0** 식별자를 실행합니다. **모델: GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO 클래스 **2026-01-23** 및 Reactome 클래스 **2026-03-20**를 기록했습니다. 나중에 서비스 버전은 다른 용어를 반환 할 수 있습니다.

![Saved English 쿼리, 배경, 소스 버전 및 식별자 체크](/img/open-science/v0311/enrichment-notes.webp)

## 3. 풍성한 테이블 검사 {/* #enrichment-results */}

CSV을 열고 전체 JSON과 비교하십시오. 이 런은 FDR 0.05에서 **891 기간**을 반환합니다. 미리보기는 첫 번째 100 행만 보여줍니다. 그 표시 제한은 총 결과 수 없습니다. `source`, `native`, `p_value`, `intersection_size`, `query_size` 및 `effective_domain_size`를 제한하여 용어를 해석 할 때.

![정확한 확률과 도메인 크기를 가진 실제적인 enrichment 테이블](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">분석 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">모든 891 결과 행</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">전체 응답</ExampleDownload>

`background_size: null`은 사용자 정의 배경 목록이 제출되지 않습니다. 그것은 0 유전자의 통계 우주를 의미하지 않습니다. per-term 효과적인 도메인 크기를 사용하십시오. Enrichment는 causal involvement, 차별 표식, 또는 up/down 규칙을 설치하지 않습니다. [작업 매개 변수](../reference/connector-operations.md#enrich_gene_set) 참조.
