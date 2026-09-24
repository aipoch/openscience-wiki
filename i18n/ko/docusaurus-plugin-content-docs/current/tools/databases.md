---
title: "과학 데이터베이스"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

# 과학 데이터베이스 {/* #scientific-databases */}

이 페이지를 사용하여 데이터 소스를 선택하여 반품 할 수있는 것을 이해하고 Open-Science에서 사용할 수있는 도구를 만듭니다. 스크린 샷 및 출력 파일이있는 단계별 연구 예제를 위해 [연구 워크플로](#database-workflows)을 참조하십시오.

<span id="data-source-catalog" />

## 지원된 데이터베이스 {/* #supported-databases */}

Open-Science v0.33.1에는 **27 데이터 소스 커넥터 269 작업**가 포함되어 있습니다. 별도의 오프라인 Molecule Connector은 271에 전체 레지스트리를 가져다 두 개의 작업을 추가합니다. Connector는 일치 **Settings → Connectors**의 밑에 이름; 각 가족은 몇몇 데이타베이스를 노출할 수 있습니다. 소스는 웹 사이트의 모든 기능을 의미하지 않습니다.

| 커넥터 | 출처 | 작업 | 사용하기  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | PubChem, ChEBI, Rhea 및 BindingDB를 통해 소형 molecule 화학.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 용지, 저자, 인용, DOI 업데이트 및 데이터 세트 / 소프트웨어 레코드. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | NCBI E-utilities, PMC ID 변환기 및 유럽 PMC를 통해 생물 의학 문학 - 검색, 메타 데이터, 관련 기사, 인용 조회, ID 변환, 전체 텍스트 및 저작권.  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 13 | 유전자/단백 식별자, UniProt sequence discovery, GO 및 Reactome annotations 및 g:Profiler gene-set enrichment |
| 게놈 · `genomes` | 회의, UCSC, NCBI, BLAST, 클러스터 오메가 | 20 | Genome 주석, 균질 및 순서; NCBI taxon/assembly/sequence 정체성; BLAST 검색 및 클러스터 오메가 다중 시퀀스 정렬. |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | 인간 유전 변형 - gnomAD 인구 주파수 / 제약, ClinVar 기록 / 연구 (direct NCBI), dbSNP, 구조 및 mitochondrial 변형.  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | ClinicalTrials.gov의 임상 시험 - 검색, 세부 사항, 스폰서, 조사, endpoints 및 자격.  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | 임상 genomics 지식 기초: ClinGen 치료, CIViC 임상 증거, 그리고 열린 표적 플랫폼.  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | 구조 및 분자 상호 작용 — PDB 구조, AlphaFold 예측, EMDB cryo-EM 항목, Complex Portal complexes, IntAct 상호 작용 네트워크.  |
| ChEMBL · `chembl` | ChEMBL | 6 | 비활성 화합물, 약물, 표적, 생물 활성성, 그리고 메커니즘을 통해 ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv preprints — 날짜/category, DOI, 저널-publication 링크, 펀더 목록 및 플랫폼 통계에 의해 검색.  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | Drugs@FDA 신청, 상표 및 openFDA를 통해 corpus 통계.  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | 인간 유전학 협회 증거 - GWAS 카탈로그, eQTL 카탈로그, PheWeb PheWAS 포털 (FinnGen, BioBank Japan).  |
| Expression · `expression` | GTEx | 12 | GTEx Portal을 통해 인간의 조직 표현과 eQTLs.  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | Protein Domain Architecture, 가족/실란 회원, InterPro/Pfam, Human Protein Atlas 및 STRING을 통해 표식 아틀라스 및 상호 작용 네트워크.  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | CBioPortal REST API을 통해 암 게놈 연구 기록.  |
| RNA · `rna` | Rfam | 9 | 비 코딩 RNA 제품군 데이터 (metadata, 정렬, 모델, 구조) Rfam을 통해.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | 표현, 대사학, metagenomics 및 proteomics 아카이브; ENA는 발견과 FASTQ/submission 재고를 실행합니다; PRIDE 파일 목록. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Cell-type identity, 마커 유전자, 소스 데이터 세트, 그리고 CELLxGENEGuide Cell을 통해 조직.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 유전자 조절 기능 genomics - ENCODE 실험 / 생물 샘플 / 파일, JASPAR TF 바인딩 프로파일 및 UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-opportunity search (Grants.gov) 및 항체 카탈로그 조회 (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart 속성 쿼리 및 식별자 번역.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 purchasable 화학 공간 (CartBlanche22) - ZINC id, SMILES에 의해 합성 보기 정확하고/similarity 수색, 공급자 부호 해결책, 무작위 표본 추출, 선창을 위한 3D 구조 위치.  |
| GDC · `gdc` | NCI GDC | 5 | 암 프로젝트, 케이스, 파일 메타 데이터, 오픈 / 제어 라벨 및 전송 표시; 다운로드 또는 액세스 권한을 부여하지 않습니다. |
| Zenodo · `zenodo` | Zenodo | 2 | 공공 데이터 세트, 소프트웨어 및 출판 발견, 버전 별 메타 데이터 및 파일 재고; 업로드 또는 다운로드. |
| · · `hmmer` | EMBL-EBI 헬멧3 | 3 | 프로그램별 단백질/프로필/분리 검색, 작업 상태 및 결과. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan에 대한 정보 | 2 | 상태 및 TSV는 기존의 주석 작업을 보고합니다. 제출 없음. |

오프라인 Molecule 도구는 [사이트맵](viewers.md)에 덮여 있습니다. 각 데이터 소스에 노출된 정확한 작업을 위해 [Connector 가동 참고](../reference/connector-operations.md)을 사용합니다.

<span id="choose-a-query-and-inspect-the-result" />

## 당신이 할 수있는 것 {/* #database-capabilities */}

| 연구 업무 | 계정 만들기 | 출력 전압 |
| --- | --- | --- |
| 종이 찾기, 추적 인용 및 DOI 관계 확인 | 문학 그래프, PubMed, bioRxiv | 문학 기록, 식별자, 인용 링크 및 전체 텍스트 가용성 |
| 유전자 또는 단백질을 찾아서 시퀀스 비교 | 유전자 및 종양학, 게놈 | Identifier 매핑, 단백질 기록, FASTA 및 BLAST 보고서 |
| 공공 omics 데이터를 발견하고 사용할 수 있는 파일을 검사 | Omics Archives - 오믹스 | Study/run metadata 및 file inventories with source 위치, 크기 및 사용 가능한 체크섬 |
| Interpret 유전자 목록 또는 상호 작용 네트워크를 검사 | 유전자 및 종양학, 단백질 Annotation | Enrichment 테이블, 투과학 주석 및 네트워크 기록 |
| 변형, 표식 및 규제 증거 확인 | Variants, 임상 Genomics, 인간 유전학, 표현, 규정 | 생물, 조직, 참고 구조 및 관련 증거 분야를 가진 근원 기록 |
| 화합물, 구조 또는 임상 연구 기록 | 화학, ChEMBL, 구조 및 상호 작용, 임상 시험 | 화학 식별자 / properties, 구조 기록 및 재판 metadata |

일괄 식별자 변환의 경우 **유전자 및 종양학**은 `submit_uniprot_id_mapping`, `get_uniprot_id_mapping_status` 및 `get_uniprot_id_mapping_results`을 추가합니다. 작업 ID를 저장, 적어도 세 초 떨어져 설문 조사, 다음 각 결과 페이지를 검색. 1-to-many 매핑 및 명시된 `failed_ids` 보존; 한 페이지의 누락은 일치하지 않습니다. 서비스는 100,000 식별자에게 최대 7 일 후에 결과를 만료합니다. [정확한 매핑 필드](../reference/connector-operations.md#submit_uniprot_id_mapping) 참조.

**젠도**는 인증 없이 공개 레코드 메타데이터를 노출합니다. 파일 재고가있는 버전 별 레코드 ID 및 액세스 / 라이센스 필드를 유지하십시오. **GDC 소개** 공개 메타데이터 노출; 정의는 권한 부여를 다운로드하지 않으며, 제어 된 파일은 GDC 권한이 필요합니다. [GDC 운영](../reference/connector-operations.md#family-24) · [Zenodo 운영](../reference/connector-operations.md#family-25).

데이터베이스 응답은 연구 단계를 지원할 수 있습니다; 그것은 자동으로 데이터를 다운로드하지 않습니다, 문학 라이브러리에 모든 종이를 추가하거나 완전한 분석을 실행. 저장하고 싶은 기록과 파일을 지정합니다.

## 데이터베이스를 사용하여 연결 및 시작 {/* #connect-database */}

<span id="retrieve-a-record-and-verify-its-identity" />

### 1. 내장 Connector 사용 {/* #1-enable-the-built-in-connector */}

1. **Settings → Connectors**을 열고 **Omics Archives - 오믹스**과 같은 위에 나열된 가족을 검색합니다.
2. 자세한 내용을 열고 **Tools**을 확장하십시오. 선택된 작업의 입력, 결과 제한 및 제 3 자 요구 사항을 읽어보십시오.
3. **메인 에이전트** 및 **Used by**을 위한 사용 가능한 가용성. Main 에이전트와 Specialist 협회를 조정하는 자원에 **Manage access**을 사용합니다. 가용성 및 per-tool 승인 정책은 별도의 통제입니다.

![Omics Archives 도구 세부 사항 GEO 입력 및 메타 데이터 전용 범위를 보여주는](/img/open-science/guides-walkthrough/36-omics-tools.webp)

이 연결관은 안으로 건축됩니다; 사용자 정의 서버를 추가 할 필요가 없습니다. 외부 서비스를 위해 [사용자 정의 Connector 설정](../guides/connectors.md)을 참조하십시오. 목록으로 또는 활성화 Connector는 인증 또는 쿼리가 성공하는 증거가 아닙니다.

<span id="connect-openalex-and-follow-citation-links" />

### 2. 작업이 필요할 때 credentials 추가 {/* #2-add-credentials-when-the-operation-requires-them */}

| 서비스 또는 조건 | 설정할 곳 |
| --- | --- |
| OpenAlex | 옵션 키. 하나 구성, 열기 **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**, 그것을 유효하게 하고, 그 후에 저장하십시오. |
| 연락처 정보를 요구하는 NCBI 변형 쿼리 | **Settings → Connectors → Manage credentials → Literature access**을 진행하세요. 제품정보 **Contact email** 을 선택해 주세요 **Save**을 진행하세요. NCBI API 열쇠는 선택적입니다. |
| credential 필요조건을 가진 또 다른 가동 | 그 도구의 요구 사항 및 [자격 시험](../guides/connectors.md)을 진행하세요. 의도한 서비스에 대한 자격 증명을 브랜딩합니다. |

credential 형태로 키 입력, 연구 프롬프트 또는 공유된 출력 파일에 아닙니다. 선택된 가동을 위한 필요조건을 형성하십시오; 위의 연락처 - 이메일 요구 사항은 모든 NCBI 도구가 동일한 요구 사항을 가지고 있음을 의미하지 않습니다.

<span id="look-up-a-doi-and-its-related-research-records" />

문학 그래프는 또한 `crossref_get_work`, `crossref_get_updates`, `datacite_search_records` 및 `datacite_get_record`를 제공합니다. 이 4개의 공공 방법은 OpenAlex 열쇠를 요구하지 않습니다. OpenAlex 인용 방향을 위해, `openalex_citations`는 작동을 인용하는 것을, `openalex_references`는 작동을 cites 찾아내습니다. [문학 도표 모수](../reference/connector-operations.md#family-2).

<span id="start-with-one-known-identifier" />
<span id="actual-local-queries" />

### 3. 작은 쿼리에 대한 액세스 확인 {/* #3-confirm-access-with-a-small-query */}

**유전자 및 종양학**을 활성화하고, 연결된 모델과 대화를 열고, 다음을 보냅니다.

<p className="example-label"><strong>예시</strong> 알려진 인간 유전자 식별자를 확인</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

실제 도구 결과 검사. 인간 TP53를 위해, `query`, `symbol`의 Entrez 유전자 **7157** 및 이름 **종양 단백질 p53**를 검사하십시오. 생물과 기록을 확인 할 때까지 여러 경기를 유지하십시오. 성공적인 질문은 이 특정한 가동을 확인합니다; 모든 소스에 액세스 할 수 없습니다. [Exact 필드](../reference/connector-operations.md#query_genes).

## 연구 워크플로우를 따르십시오 {/* #database-workflows */}

아래 각 문서에는 입력, 단계, 실제 영어 인터페이스 스크린 샷 및 다운로드 가능한 예 출력이 포함됩니다.

<span id="ena-runs" />
<span id="omics-discovery" />

### 공공 omics 데이터 찾기 {/* #find-public-omics-data */}

[공공 omics 데이터를 찾아 파일 재고를 구축](../workflows/public-omics-data.md): 알려진 실행 또는 주제로 시작, ENA 및 PRIDE 레코드를 검사하고 소스 위치 및 체크섬을 저장합니다. 데이터 다운로드는 별도의 단계로 유지됩니다.

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### 단백질 시퀀스 비교 {/* #compare-a-protein-sequence */}

[단백질 시퀀스를 찾아 BLAST 검색 완료](../workflows/protein-sequence-search.md): UniProt FASTA를 검색하고, BLAST 작업 ID를 유지하고, 완성된 정렬, 정체성 및 쿼리 범위를 검사합니다.

<span id="gene-set-enrichment" />

### 후보 유전자 집합 분석 {/* #analyze-a-candidate-gene-set */}

[후보 유전자 세트에 대한 기능적 enrichment 실행](../workflows/gene-set-enrichment.md): 생물, 식별자 및 배경을 선택하여 g:Profiler를 실행하고, 소스 버전으로 정확한 확률을 해석합니다.

<span id="reference-genome" />

### 참고 genome 확인 {/* #confirm-a-reference-genome */}

[종, 참조 genome 및 크롬 식별자 확인](../workflows/reference-genome-check.md): 부과, 버전 조립 및 크로노섬 별명을 수정합니다.

다른 작업을 위해 [Structured PubChem 레코드](../workflows/database-records.md), [Cross-checking 과학 기록](../workflows/cross-check-records.md) 또는 [그룹 회의에 대한 문학 발견](../workflows/journal-club.md)를 따르십시오.

<span id="handle-a-returned-record-empty-match-or-error" />
<span id="empty-partial-and-failed-responses" />

## 반환된 데이터를 올바르게 사용하십시오 {/* #database-limits */}

- 쿼리, 소스, 생물, 조직, 단위 및 접근 버전을 포함합니다. 데이터베이스 기록, 예측 및 생성 된 요약은 다른 종류의 증거입니다.
- 응답을 완료하기 전에 반환된 수, pagination 및 truncation 플래그를 확인합니다. Zero 경기, 부분 응답 및 요청 오류가 다른 후속 조치가 필요합니다.
- 파일 재고는 위치와 메타데이터를 제공합니다. 다운로드 바이트, 체크섬 확인 및 데이터를 분석하는 것은 별도의 작업입니다.
- 요청이 credentials를 필요로 하는 경우, retrying 전에 관련 양식을 완료하십시오. 비율 한계를 위해, 서비스 지연을 따르십시오; timeouts를 위해, 요구 크기를 감소시키십시오. [문제 해결](../guides/troubleshooting.md) 참조.

### 인구 빈도 및 상호 작용 네트워크 {/* #string-network */}

`get_variant`의 경우, `include_populations: true`을 인구 세부 정보를 필요로 할 때 설정하십시오. dataset 및 참고 빌드를 유지하십시오. Exome 및 게놈 관측은 분리되어 있습니다. 사용할 수없는 값은 `null`, 0이 아닙니다. overlapping 인구 또는 성 strata는 정상적이지 않아야 합니다. 이 관찰된 빈도, allele 빈도를 거르지 않는. [gnomAD 매개 변수](../reference/connector-operations.md#get_variant)

v0.31.0에서 `get_string_network.nodes`은 이웃과 고립 된 맵핑 입력을 반환합니다. 단일 맵 입력 요청 이웃; 여러 맵핑 입력이 확장되지 않습니다. 입력 노드를 복구하는 `is_query` 필터를 필터링하고, 모든 mapped aliases에 `queries`을 사용합니다. `n_nodes`는 그래프를 계산합니다; `n_mapped`는 입력 매핑을 계산합니다. 두 가지를 재사용하기 전에 업데이트 스크립트를 업데이트합니다. [STRING 모수](../reference/connector-operations.md#get_string_network)

<span id="find-operation-parameters" />

## 작동 모수를 찾아내십시오 {/* #operation-parameters */}

[Connector 가동 참고](../reference/connector-operations.md) 목록은 입력, 허용된 값 및 정확한 통화를 나열합니다. 이 페이지를 사용하여 소스를 선택하고 연결; 특정 도구의 필드에 대한 참조를 사용합니다.

카탈로그 소스: [카탈로그.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/catalog.ts), [레지스트리](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/registry.ts).

## Sequence 검색 및 정렬 {/* #sequence-tools */}

**HMMER의 장점**은 프로그램별 단백질, 프로파일-HMM 및 정렬 검색을 제공합니다. 함께 프로그램 및 데이터베이스를 선택하고 작업 ID를 유지하고 **회사 소개** 후 결과를 검색하십시오. [HMMER 운영](../reference/connector-operations.md#family-26).

**InterProScan의 장점**은 EMBL-EBI 서비스를 통해 제출된 기존 작업에 대한 주석을 검색합니다. 작업 ID를 유지하고, 상태 적어도 10 초 떨어져 검사하고, **이름 &#42;** 후에 TSV를 태치십시오. 이 Connector은 새로운 일을 제출할 수 없습니다. [InterProScan 운영](../reference/connector-operations.md#family-27).

**Genomes → Clustal Omega**는 단백질, DNA 또는 RNA FASTA 레코드를 고유하게 지명한 적어도 3개의 종류를 맞추습니다. 서비스에 의해 요청된 연락처 이메일 구성, 한 번 제출, 작업 ID를 유지, 다음 상태를 확인하고 반환 정렬을 저장. [다중 상태 정렬 워크플로](../workflows/multiple-sequence-alignment.md).
