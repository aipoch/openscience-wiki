---
title: "종, 참조 genome 및 크롬 식별자 확인"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 종, 참조 genome 및 크롬 식별자 확인 {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>실습 예제</strong> 인간적인 GRCh38.p14 크롬 1를 확인하십시오</p>

유기체, 버전 조립 및 염색체 별칭을 확인하여 다른 데이터베이스에서 레코드를 결합하기 전에. 산출은 본래 근원 응답과 더불어 1개의 chromosome를 위한 ID 테이블입니다.

시작하기 전에 필요한 커넥터를 활성화하려면 [과학 데이터베이스](../tools/databases.md#connect-database)을 따르십시오. 연결된 모델과 사용 가능한 [Notebook 런타임](../guides/runtimes.md)을 사용합니다.

## 1. 생물, 집합 및 염색체를 조회하십시오 {/* #reference-genome */}

1. **한국어 (Korean)**에서 **Settings → Connectors**을 활성화하십시오. 연결된 모델과 사용 가능한 Notebook 런타임으로 세션을 엽니다. 이 v0.31.1 예제는 **Codex subscription**을 사용했습니다.
2. 생물, **이름 &#42;** 집합 및 순서에 조회하십시오. 지불 조건:

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. 반환된 식별자를 비교 {/* #compare-identifiers */}

노트를 열고 3 JSON 파일에서 반환된 ID를 비교합니다. 이 예에서 성공한 모든 3개의 통화.

![세 가지 실제 NCBI 통화 및 반환된 세세논 및 집합 정체성](/img/open-science/v0311/ncbi-notes.webp)

| 【특전】 | 이 예제의 결과 |
| --- | --- |
| 학회소개 | Homo sapiens, 세금 **9606**; 1개의 경기, `ambiguous: false` |
| 요청/현재 집합 | **GCF_000001405.40**, **모델: GRCh38.p14**, UCSC 이름 **hg38의** |
| 쌍 GenBank 집합 | **GCA_000001405.29**; 반환된 기록 보고서는 RefSeq의 차이를 보여줍니다. |
| Chromosome 1 별칭 | **1**, **한국어 (ko)**, RefSeq의 **NC_000001.11**, 젠뱅크 **모델 번호: CM0006632** |
| 선택된 순서 | **248956422의 bp**, 1 차적인 회의; 1개의 경기, `matches_truncated: false` |

![aliases 및 일치 카운트와 Original chromosome-1 응답](/img/open-science/v0311/ncbi-aliases.webp)

## 3. 정체 테이블과 소스 레코드를 유지 {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Query 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identity 테이블</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">세금 응답</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">회의 응답</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequence 응답</ExampleDownload>

이 예에서는 **선택된 크로노섬**의 조회를 완료했습니다. 어셈블리의 모든 서열을 내보낸 것은 아닙니다. 쿼리를 바꿀 때도 모호한 일치와 잘림 표시를 유지하세요. 어셈블리 이름은 버전이 포함된 접근번호를 대신할 수 없습니다. 현재 접근번호가 반환되어도 요청한 과거 버전을 알리지 않고 바꾸면 안 됩니다. 서열 별칭은 같은 어셈블리 안의 이름 대응이며, 어셈블리 간 좌표 변환을 수행하지 않습니다. [Exact 입력](../reference/connector-operations.md#ncbi_get_assembly_info)
