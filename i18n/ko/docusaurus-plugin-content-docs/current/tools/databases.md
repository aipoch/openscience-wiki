---
title: "과학 데이터베이스"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# 과학 데이터베이스 {/* #scientific-databases */}

응용 프로그램 번들 **23 데이터 소스 커넥터**, 플러스 별도의 오프라인 Molecule Connector. 전체 레지스트리에는 Molecule의 두 개의 작업을 포함하여 **246 공구 가동**이 있습니다. 아래 데이터 소스 카탈로그는 244을 포함합니다. 설정에서 관련 Connector을 활성화하면 올바른 식별자 유형과 경계 된 질문을합니다.

<span id="actual-local-queries" />

## Data-source 카탈로그 {/* #data-source-catalog */}

식별자 및 연구 문제로 선택하십시오. 근원 적용은 다릅니다; 정확한 필드에 대한 작업 참조를 참조하십시오.

| 커넥터 | 출처 | 작업 | 이용하기  |
| --- | --- | --- | ---  |
| 화학 · `chemistry` | PubChem, ChEBI, Rhea, 바인딩DB | 12 | PubChem, ChEBI, Rhea 및 BindingDB를 통해 소형 molecule 화학.  |
| 문학 그래프 · `literature` | OpenAlex, arXiv, Crossref, 데이터 시트 | 13 | 논문, 저자, 인용, DOI 업데이트 및 dataset/software 레코드. |
| PubMed · `pubmed` | PubMed, PMC, 유럽 PMC | 7 | NCBI E-utilities, PMC ID 변환기 및 유럽 PMC를 통해 생물 의학 문학 - 검색, 메타 데이터, 관련 기사, 인용 조회, ID 변환, 전체 텍스트 및 저작권.  |
| 유전자 및 종양학 · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler의 장점 | 9 | 유전자/단백 정체성 및 투과율 — mygene.info, UniProt, OLS4 ontologies, GO annotations, Reactome pathways.  |
| 게놈 · `genomes` | NCBI, UCSC, NCBI | 14 | 게놈 주석, 변종, 균질학, 순서 및 브라우저 트랙 - Ensembl REST 및 UCSC 게놈 브라우저.  |
| · · `variants` | gnomAD, 클라리바르, dbSNP | 15 | 인간 유전 변형 - gnomAD 인구 frequencies/constraint, ClinVar 기록 / 연구 (direct NCBI), dbSNP, 구조 및 mitochondrial 변형.  |
| 임상시험 · `clinical-trials` | 임상시험.gov | 6 | ClinicalTrials.gov의 임상 시험 - 검색, 세부 사항, 스폰서, 조사, endpoints 및 자격.  |
| 임상 Genomics · `clinical-genomics` | ClinGen, CIViC, 열린 대상 | 20 | 임상 genomics 지식 기초: ClinGen 치료, CIViC 임상 증거, 그리고 열린 표적 플랫폼.  |
| 구조 및 상호 작용 · `structures` | PDB, AlphaFold, EMDB, 복합 포털, IntAct | 16 | 구조 및 분자 상호 작용 — PDB 구조, AlphaFold 예측, EMDB cryo-EM 항목, Complex Portal complexes, IntAct 상호 작용 네트워크.  |
| ChEMBL · `chembl` | 주 메뉴 | 6 | 생물 활성 화합물, 약물, 표적, 생물 활성성, 그리고 메커니즘을 통해 ChEMBL REST API.  |
| BioRxiv · `biorxiv` | BioRxiv, medRxiv, ROR, medRxiv, medRxiv, medRxiv, ROR, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv, ROR, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv, medRxiv | 7 | bioRxiv/medRxiv preprints — 날짜/category, DOI, 저널-publication 링크, 펀더 목록 및 플랫폼 통계에 의해 검색.  |
| 의약품 규제 · `drug-regulatory` | 오픈FDA | 7 | Drugs@FDA 신청, 상표 및 openFDA를 통해 corpus 통계.  |
| 인간 유전학 · `human-genetics` | GWAS 카탈로그, eQTL 카탈로그, PheWeb | 14 | 인간 유전학 협회 증거 - GWAS 카탈로그, eQTL 카탈로그 및 PheWeb PheWAS 포털 (FinnGen, BioBank Japan).  |
| 표현 · `expression` | GTEx 정보 | 12 | GTEx Portal을 통해 인간의 조직 표현과 eQTLs.  |
| 단백질 Annotation · `protein-annotation` | InterPro, Pfam, 인간 단백질 아틀라스, STRING | 13 | 단백질 도메인 아키텍처, 가족 / 클랜 회원, InterPro / Pfam, Human Protein Atlas 및 STRING을 통해 표식 아틀라스 및 상호 작용 네트워크.  |
| 암 모델 · `cancer-models` | cBio포털 | 6 | 암 genomics 연구는 cBioPortal REST API을 통해 기록합니다.  |
| RNA · `rna` | Rfam 소개 | 9 | 비 코딩 RNA 제품군 데이터 (metadata, 정렬, 모델, 구조) Rfam을 통해.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, 메타보라이트, MGnify, PRIDE, ENA | 19 | Omics 데이터 아카이브 - 표현 (ArrayExpress, GEO), metabolomics (MetaboLights), metagenomics (MGnify) 및 proteomics (PRIDE).  |
| CellGuide · `cellguide` | CELLxGENE의 장점 | 5 | Cell-type identity, 마커 유전자, 소스 데이터 세트 및 CELLxGENEGuide Cell을 통해 조직.  |
| 규제 · `regulation` | ENCODE, JASPAR, 유니버셜 | 16 | 유전자 조절 기능 genomics - ENCODE 실험 / 생물 샘플 / 파일, JASPAR TF 바인딩 프로파일 및 UniBind ChIP-seq TFBS.  |
| 연구 자료 · `research-resources` | Grants.gov, 항체 레지스트리 | 5 | Funding-opportunity search (Grants.gov) 및 항체 카탈로그 조회 (Antibody Registry).  |
| BioMart · `biomart` | Ensembl 바이오마트 | 8 | Ensembl BioMart 속성 쿼리 및 식별자 번역.  |
| · · `zinc` | 사이트맵 | 5 | ZINC22 purchasable 화학 공간 (CartBlanche22) - ZINC id, SMILES에 의하여 화합물 보기 정확한/similarity 수색, 공급자 부호 해결책, 무작위 표본 추출, 선창을 위한 3D 구조 위치.  |

## 레코드를 검색하고 ID를 확인합니다. {/* #retrieve-a-record-and-verify-its-identity */}

1. **Settings → Connectors**을 열고 필요한 소스를 검색하고 대상 에이전트에 대한 가용성을 확인합니다.
2. 더 자세히 보기 **Tools**, 입력, 예 및 타사 요구 사항을 읽어보십시오.
3. 명시된 쿼리/액세서리 및 결과 제한을 공급합니다. 문학 수집 또는 증거 테이블을 만들 때 정확한 쿼리를 유지합니다.
4. Inspect는 ID 및 소스 필드를 반환합니다. 빈 결과, truncated 배치 및 오류는 다른 결과입니다.
5. 프로젝트/library deliberately에 필요한 레코드를 저장하십시오. 검색 응답은 자동으로 모든 종이가 문학 라이브러리 또는 다운로드 된 전체 텍스트에 추가되지 않습니다.

### 알려진 식별자로 시작 {/* #start-with-one-known-identifier */}

<p className="example-label"><strong>실습 예제</strong> 인간 TP53 유전자 식별자를 해결</p>

**유전자 및 종양학** 및 요청 가능: **범위를 가진 TP53를 해결하기 위하여 query_genes를 이용하십시오 ="symbol", 종 ="human" 및 field="symbol, 이름, entrezgene". 입력 쿼리와 일치하지 않는 레코드를 반환합니다.** 이 예에서, 인간 TP53 레코드는 Entrez Gene **7157** 및 이름 **종양 단백질 p53**를 식별합니다. 맵핑 ID를 사용하기 전에 기록의 `query` 및 `symbol`을 확인하십시오. 기호는 여러 경기를 반환 할 수 있으므로 의도 된 생물과 기록을 확인 할 때까지 모든 결과를 유지하십시오. [Exact 필드](../reference/connector-operations.md#query_genes).

## 쿼리를 선택하고 결과를 검사 {/* #choose-a-query-and-inspect-the-result */}

<p className="example-label"><strong>예시</strong> Bounded 데이터베이스 쿼리 및 응답</p>

테이블은 이러한 예 응답을 기록합니다; 살아있는 쿼리 결과는 다를 수 있습니다.

| Connector / 도구 | 입력 | 현재 위치 |
| --- | --- | --- |
| Omics Archives / geo_get_series | `accessions: ["GSE60450"]` | 12 샘플과 시리즈 / 샘플 메타 데이터; metadata retrieval은 업로드 된 수를 recompute하지 않았습니다. |
| 유전자 / query_genes | TP53; 상징 범위; - 한국어 | Entrez 유전자 ID 7157, 기호 TP53, 이름 종양 단백질 p53. |
| pubMed / search_articles에 대해 | GSE60450, 최대 2 | PMIDs 38059347 및 37306301. 이 쿼리 일치는 자동으로 dataset의 원래 출판물입니다. |
| 화학 / pubchem_search_compounds | aspirin, 최대 1 CID | CID 2244, 공식 C9H8O4 및 분자량 180.16. |
| 문학 / openalex_search_works | `CRISPR base editing`; 2020에서; 열려있는 접근; 최대 2 | OpenAlex ID, 소스 필드 및 완성 플래그와 함께 두 개의 작업 레코드. |

### OpenAlex를 연결하고 인용 링크를 따르십시오 {/* #connect-openalex-and-follow-citation-links */}

1. **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**을 엽니다.
2. API 키를 입력하면 **Validate**을 선택한 다음 유효성 검사가 성공한 후 **Save**를 선택합니다.
3. 작은 `max_records` 한계와 주제에 대한 검색. `n_records_returned` 및 `records_truncated`을 확인하기 전에 결과를 완료합니다.
4. `openalex_get_work`과 반환된 작업 ID를 사용합니다. 사용 `openalex_citations` 종이 인용 그 작업 및 `openalex_references` 작동에 대 한 인용. 이것은 반대 방향입니다.
5. 저자 검색을 위해, 저자 프로필을 검색하기 전에 기관 및 ORCID를 확인합니다. 소스 ID 또는 ISSN를 사용하여 저널 이름을 분리합니다.

필터 및 리턴 필드에 [OpenAlex 가동 모수](../reference/connector-operations.md#openalex_search_works)을 참조하십시오.

### DOI 및 관련 연구 기록 보기 {/* #look-up-a-doi-and-its-related-research-records */}

**문학 그래프** 사용 발행인 메타데이터 및 `crossref_get_updates`의 `crossref_get_work`을 사용하여 증착/재선 관계에 대한 `datacite_search_records`을 사용하여 dataset/software DOIs를 찾을 수 있으며, `datacite_get_record`은 선택한 레코드를 검사합니다. 이 4개의 공공 방법은 OpenAlex 열쇠를 요구하지 않습니다. 다운로드하기 전에 DOI 정체성, 관계 방향 및 재사용 조건을 검증하거나 리소스를 인용합니다. 정확한 필드는 [가동 참고](../reference/connector-operations.md#family-2)에 있습니다.

Rfam 순서는 지금 공식적인 배치 엔드포인트를 사용합니다. 이전 설치가 retired-endpoint 오류를 반환하면 앱을 업데이트하고 의도한 작업을 재개합니다. 끝나는 작업은 안타깝게도 완료된 검색이 아닙니다.

## 반환된 기록, 빈 경기 또는 오류 처리 {/* #handle-a-returned-record-empty-match-or-error */}

결과를 사용하기 전에 반환된 상태를 검사합니다. [가동 참고](../reference/connector-operations.md)을 사용하여 필드와 완성 플래그를 해석합니다.

| 전망 outcome | 다음을 할 것 |
| --- | --- |
| `found: false`, 제로 기록, 빈 investigators 또는 공급자 경기 | 식별자, 생물, 쿼리 범위 및 필터를 확인하십시오. 빈 결과 보존; 검색 결과를 찾을 수 없습니다. |
| `credential_required` OpenAlex에 대한 | 요청된 자격 양식을 열고 구출하기 전에 자신의 키를 바인딩합니다. |
| `contact_email_required` 직접 NCBI 변형 쿼리 | 열기 **Settings → Connectors → Manage credentials → Literature access**, 입력 **Contact email** 선택하기 **Save**. 실패한 쿼리를 복원합니다. NCBI API 열쇠는 선택적입니다. 반환된 식별자, 일치 카운트 및 truncation 플래그를 확인; 빈 결과가 연결 오류에서 구별됩니다. |
| HTTP `410` eQTL에서 | 소스 URL, 작동 및 응답을 유지하고 과학 입력을 변경하기 전에 서비스 가용성을 확인합니다. |
| Connector 요청 후 `30000ms` | 더 작은 요청을 구합니다. 외부 Notebook 타임아웃만 증가하는 것은 Connector의 자신의 마감일을 변경하지 않습니다. |
| Notebook 실행 후 `60000ms` | 실행은 결과없이 종료됩니다. 개별 재량 작업; 모든 업스트림 서비스는 실패하지 않습니다. |
| BioMart HTML 유지 보수 페이지; - 연혁 `Unexpected end of JSON input` | 예상된 구조의 응답은 사용할 수 없습니다. 나중에 다시 시도하고 문제에 대한 응답 유형 / 오류를 유지합니다. |
| ZINC 작업은 시간에 완료하지 않았다 | 반환된 작업/result URL을 보존하고 그 일을 확인; 새로운 작업을 반복적으로 시작하면 그 결과를 복구하지 않습니다. |

보고서의 경우, 작업, 경계 입력, 오류 텍스트 및 타임스탬프를 [문제 해결](../guides/troubleshooting.md)을 통해 첨부합니다. 공유하기 전에 자격 및 개인 데이터를 제거하십시오.

## ENA 실행 및 FASTQ 파일 해결 {/* #ena-runs */}

1. **Settings → Connectors**의 밑에 활성화된 **Omics Archives**. PRJ 연구 또는 SRR 실행과 같은 `ena_search_runs`에 대한 공공 ENA / INDC 액세스 공급. GEO `GSE` 식별자는 INSDC 연구에 처음 연결되어야 합니다. 키워드는 허용되지 않습니다.
2. `run_accession`, 생물, 도서관 전략/레이아웃 및 `truncated`를 검사하십시오. 최대는 1,000 실행입니다. 상쇄 또는 continuation 토큰이 없습니다; 응답이 truncated 경우에 접근을 좁은.
3. `ena_get_run_files`에 반환된 한 번에 전달합니다. `found`, `fastq_available` 및 `fastq_files`의 모든 항목 확인. 재고 공급 URL, 압축 파일 크기 및 업스트림 MD5; 파일을 다운로드하지 않거나 내용을 확인하지 않습니다.
4. 별도의 다운로드 전에 저장을 확인하고 나타날을 유지하십시오. 목록된 checksum에 대한 다운로드된 바이트를 검증합니다. 쌍의 라이브러리는 정확히 두 개의 파일이 필요하지 않습니다; `file_index`에서 읽기-메이트 ID를 사용하지 마십시오.

<p className="example-label"><strong>실습 예제</strong> SRR037073에 대한 파일 표시</p>

이 v0.31.1 예제는 **Codex subscription** 및 활성화 **Omics Archives** Connector를 사용합니다. 사용할 수 있는 Notebook 런타임과 세션을 열고, 다음을 보냅니다:

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

생성된 노트를 엽니다. 실제 검색은 **1 실행**, **Caenorhabditis elegans**, **PRJNA123835**, **RNA-Seq**, **SINGLE**를 `truncated: false`로 반환했습니다. 파일을 사용하기 전에 생물과 레이아웃을 확인합니다.

![ENA 쿼리 입력, 생성 된 노트에 ID 및 완전 플래그를 실행](/img/open-science/v0311/ena-notes.webp)

CSV을 열고 `ena-files.json`과 비교하십시오. 이런에는 `found: true`, `fastq_available: true` 및 **1 파일**, 크기 **25,154,397 바이트**가 있습니다. 은 FTP URL과 업스트림 MD5를 유지합니다. 미리보기 컬럼이 클립된 경우 다운로드 가능한 파일에서 전체 값을 복사합니다.

![URL, 크기 및 업스트림 체크섬과 실제 파일 ENA가 나옵니다.](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Query 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ는 나타납니다</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">빠른 연결</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">파일 응답</ExampleDownload>

두 쿼리와 파일 목록 생성이 완료되었습니다. 이 예에서는 **FASTQ 파일 다운로드와 체크섬 검증을 수행하지 않았습니다**. 다운로드는 별도 단계입니다. [정확한 매개변수](../reference/connector-operations.md#ena_search_runs)

## 실행 및 검사 유전자 세트 enrichment {/* #gene-set-enrichment */}

<p className="example-label"><strong>실습 예제</strong> 의도적으로 선택된 인간 DNA-damage 유전자 목록</p>

이 v0.31.1 예제는 11 공개 유전자 기호를 사용하여 g:Profiler를 보여줍니다. 그들은 그들의 알려진 생물학적 역할을 선택했다, 그래서 풍성한 예상된다. 그들은 GSE60450 프로젝트 또는 비난 발견의 증거에서 차별 압축 결과가 아닙니다.

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

4. 생성된 노트를 열고 쿼리 및 매핑 카운트를 확인합니다. **0** unmapped, ambiguous 또는 중복 식별자와 함께 맵핑 된 **11/11** 식별자를 실행합니다. **GRCh38.p14**, g:Profiler **e114_eg62_p19_27110d83**, GO 클래스 **2026-01-23** 및 Reactome 클래스 **2026-03-20**를 기록했습니다. 나중에 서비스 버전은 다른 용어를 반환 할 수 있습니다.

![Saved English 쿼리, 배경, 소스 버전 및 식별자 체크](/img/open-science/v0311/enrichment-notes.webp)

5. CSV을 열고 전체 JSON과 비교하십시오. 이 런은 FDR 0.05에서 **891 기간**을 반환합니다. 미리보기는 첫 번째 100 행만 보여줍니다. 그 표시 제한은 총 결과 수 없습니다. `source`, `native`, `p_value`, `intersection_size`, `query_size` 및 `effective_domain_size`를 제한하여 용어를 해석 할 때.

![정확한 확률과 도메인 크기를 가진 실제적인 enrichment 테이블](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">분석 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">모든 891 결과 행</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">전체 응답</ExampleDownload>

`background_size: null`은 사용자 정의 배경 목록이 제출되지 않습니다. 그것은 0 유전자의 통계 우주를 의미하지 않습니다. per-term 효과적인 도메인 크기를 사용하십시오. Enrichment는 causal involvement, 차별 표식, 또는 up/down 규칙을 설치하지 않습니다. [작업 매개 변수](../reference/connector-operations.md#enrich_gene_set) 참조.

## 참고-genome ID 확인 {/* #reference-genome */}

<p className="example-label"><strong>실습 예제</strong> 인간적인 GRCh38.p14 크롬 1를 확인하십시오</p>

1. **Settings → Connectors**에서 **Genomes**을 활성화하십시오. 연결된 모델과 사용 가능한 Notebook 런타임으로 세션을 엽니다. 이 v0.31.1 예제는 **Codex subscription**을 사용했습니다.
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

3. 노트를 열고 3 JSON 파일에서 반환된 ID를 비교합니다. 이 예에서 성공한 모든 3개의 통화.

![세 가지 실제 NCBI 통화 및 반환된 세세논 및 집합 정체성](/img/open-science/v0311/ncbi-notes.webp)

| 【특전】 | 이 예제의 결과 |
| --- | --- |
| 학회소개 | Homo sapiens, 세금 **9606**; 1개의 경기, `ambiguous: false` |
| 요청/현재 집합 | **GCF_000001405.40**, **GRCh38.p14**, UCSC 이름 **hg38** |
| 쌍 GenBank 어셈블리 | **GCA_000001405.29**; 반환된 기록 보고서는 RefSeq의 차이를 보여줍니다. |
| Chromosome 1 별칭 | **1**, **chr1**, RefSeq의 **NC_000001.11**, 젠뱅크 **CM000663.2** |
| 선택된 순서 | **248956422의 bp**, 1 차적인 회의; 1개의 경기, `matches_truncated: false` |

![aliases 및 일치 카운트와 Original chromosome-1 응답](/img/open-science/v0311/ncbi-aliases.webp)

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Query 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Identity 테이블</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">세금 응답</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">회의 응답</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Sequence 응답</ExampleDownload>

이 예에서는 **선택한 염색체 한 개**의 조회를 완료했습니다. 어셈블리의 모든 서열을 내보낸 것은 아닙니다. 쿼리를 바꿀 때도 모호한 일치와 잘림 표시를 유지하세요. 어셈블리 이름은 버전이 포함된 접근번호를 대신할 수 없습니다. 현재 접근번호가 반환되어도 요청한 과거 버전을 알리지 않고 바꾸면 안 됩니다. 서열 별칭은 같은 어셈블리 안의 이름 대응이며, 어셈블리 간 좌표 변환을 수행하지 않습니다. [정확한 입력](../reference/connector-operations.md#ncbi_get_assembly_info)

## gnomAD 인구와 STRING 네트워크 읽기 {/* #string-network */}

`get_variant`의 경우, `include_populations: true`을 인구 세부 정보를 필요로 할 때 설정하십시오. dataset 및 참고 빌드를 유지하십시오. Exome 및 게놈 관측은 분리되어 있습니다. 사용할 수없는 값은 `null`, 0이 아닙니다. overlapping 인구 또는 성 strata는 정상적이지 않아야 합니다. 이 관찰된 빈도, allele 빈도를 거르지 않는. [gnomAD 매개 변수](../reference/connector-operations.md#get_variant)

v0.31.0에서 `get_string_network.nodes`은 이웃과 고립 된 맵핑 입력을 반환합니다. 단일 맵 입력 요청 이웃; 여러 맵핑 입력이 확장되지 않습니다. 입력 노드를 복구하는 `is_query` 필터를 필터링하고, 모든 mapped aliases에 `queries`을 사용합니다. `n_nodes`는 그래프를 계산합니다; `n_mapped`는 입력 매핑을 계산합니다. 두 가지를 재사용하기 전에 업데이트 스크립트를 업데이트합니다. [STRING 모수](../reference/connector-operations.md#get_string_network)

<span id="empty-partial-and-failed-responses" />

## 작업 매개변수 찾기 {/* #find-operation-parameters */}

필요한 필드에 [Connector 가동 참고](../reference/connector-operations.md)을 사용, 허용 값과 정확한 통화. 여기에서 소스를 선택하십시오. 특정 작업을 준비 할 때 참조를 사용합니다.

genome 빌드, 생물, 조직, 단위 및 접근 버전이 반환된 데이터를 유지하십시오. 일반 HTTP 의미 및 복구를 위해 [문제 해결](../guides/troubleshooting.md)을 사용하십시오. 데이터베이스 기록, 예측 및 생성된 요약은 다른 증거 유형입니다; 연구 청구를 사용하기 전에 인용 된 소스를 확인하십시오.


구현 참조 : [커넥터Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx).

카탈로그 소스: [사이트맵](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [레지스트리.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).
