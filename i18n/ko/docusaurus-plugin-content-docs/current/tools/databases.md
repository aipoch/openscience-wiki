---
title: "과학 데이터베이스"
toc_max_heading_level: 2
last_update:
  date: '2026-10-09'
---

# 과학 데이터베이스 {/* #scientific-databases */}

이 페이지를 사용하여 데이터 소스를 선택하여 반품 할 수있는 것을 이해하고 Open-Science에서 사용할 수있는 도구를 만듭니다. 스크린 샷 및 출력 파일이있는 단계별 연구 예제를 위해 [연구 워크플로](#database-workflows)을 참조하십시오.

<span id="data-source-catalog" />

## 지원된 데이터베이스 {/* #supported-databases */}

Open-Science v0.36.0에는 **34 데이터 소스 커넥터 347 작업**가 포함되어 있습니다. 별도의 오프라인 Molecule Connector은 349에 전체 레지스트리를 가져다 두 개의 작업을 추가합니다. Connector는 일치 **Settings → Connectors**의 밑에 이름; 각 가족은 몇몇 데이타베이스를 노출할 수 있습니다. 소스는 웹 사이트의 모든 기능을 의미하지 않습니다.

| 커넥터 | 출처 | 작업 | 사용하기  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | PubChem, ChEBI, Rhea 및 BindingDB를 통해 소형 molecule 화학.  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 용지, 저자, 인용, DOI 업데이트 및 데이터 세트 / 소프트웨어 레코드. |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | NCBI E-utilities, PMC ID 변환기 및 유럽 PMC를 통해 생물 의학 문학 - 검색, 메타 데이터, 관련 기사, 인용 조회, ID 변환, 전체 텍스트 및 저작권.  |
| 유전자 및 종양학 · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler, Enrichr | 15 | 유전자/단백 식별자, UniProt 시퀀스 발견, GO 및 Reactome 주석, 그리고 g:Profiler 및 Enrichr 유전자 세트 풍부. |
| 게놈 · `genomes` | 회의, UCSC, NCBI, BLAST, 클러스터 오메가 | 22 | Genome 주석, 균질 및 순서; NCBI taxon/assembly/sequence 정체성; BLAST 검색 및 클러스터 오메가 다중 시퀀스 정렬; 인구 별 LD 및 프록시 변형. |
| Variants · `variants` | gnomAD, 크린바르, dbSNP, MaveDB | 21 | 인구 빈도, 임상 기록 및 분석실험 특정한 기능적인 점수, 매핑 및 실험. |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | ClinicalTrials.gov의 임상 시험 - 검색, 세부 사항, 스폰서, 조사, endpoints 및 자격.  |
| 임상 Genomics · `clinical-genomics` | ClinGen, CIViC, 열린 대상, ClinPGx | 30 | 임상 genomics 지식 기초: ClinGen 치료, CIViC 임상 증거, 그리고 Open Targets 플랫폼, 플러스 ClinPGx pharmacogenomic 기록. |
| 구조 및 상호 작용 · `structures` | PDB, AlphaFold, EMDB, 복합 포털, IntAct | 17 | 구조 및 분자 상호 작용 — PDB 구조, AlphaFold 예측, EMDB cryo-EM 항목, Complex Portal complexes, IntAct 상호 작용 네트워크.  |
| ChEMBL · `chembl` | ChEMBL | 6 | 비활성 화합물, 약물, 표적, 생물 활성성, 그리고 메커니즘을 통해 ChEMBL REST API.  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | bioRxiv/medRxiv preprints — 날짜/category, DOI, 저널-publication 링크, 펀더 목록 및 플랫폼 통계에 의해 검색.  |
| 의약품 규제 · `drug-regulatory` | 오픈FDA | 10 | Drugs@FDA, 상표, FAERS 불리 배출 보고와 약은 회귀합니다. |
| 인간 유전학 · `human-genetics` | GWAS 카탈로그, eQTL 카탈로그, PheWeb | 15 | 인간 유전학 협회 증거 - GWAS 카탈로그, eQTL 카탈로그, PheWeb PheWAS 포털 (FinnGen, BioBank Japan).  |
| · · `expression` | GTEx, Bgee | 16 | 인간적인 GTEx 조직 표식 및 eQTLs; Bgee 크로스 사양 기본 표현. |
| 단백질 표기 · `protein-annotation` | InterPro, Pfam, 인간 단백질 아틀라스, STRING | 14 | Protein Domain Architecture, 가족/실란 회원, 인터프로/Pfam, Human Protein Atlas 및 STRING을 통한 식각 atlas 및 상호 작용 네트워크. |
| 암 모델 · `cancer-models` | cBioPortal의 특징 | 10 | 연구, mutations, 복사 번호, 샘플, 환자, 임상 특성 및 분자 프로파일 표현. |
| RNA · `rna` | Rfam | 9 | 비 코딩 RNA 제품군 데이터 (metadata, 정렬, 모델, 구조) Rfam을 통해.  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, 메타보라이트, Metabolomics Workbench, MGnify, PRIDE, ENA | 28 | Omics 연구 / 실행 메타 데이터 및 파일 재고; metabolomics 표본, 요인, 분석 및 화합물 기록. |
| CellGuide · `cellguide` | CELLxGENE | 5 | Cell-type identity, 마커 유전자, 소스 데이터 세트, 그리고 CELLxGENEGuide Cell을 통해 조직.  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 유전자 조절 기능 genomics - ENCODE 실험 / 생물 샘플 / 파일, JASPAR TF 바인딩 프로파일 및 UniBind ChIP-seq TFBS.  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | Funding-opportunity search (Grants.gov) 및 항체 카탈로그 조회 (Antibody Registry).  |
| BioMart · `biomart` | Ensembl BioMart | 8 | Ensembl BioMart 속성 쿼리 및 식별자 번역.  |
| ZINC · `zinc` | ZINC | 5 | ZINC22 purchasable 화학 공간 (CartBlanche22) - ZINC id, SMILES에 의해 합성 보기 정확하고/similarity 수색, 공급자 부호 해결책, 무작위 표본 추출, 선창을 위한 3D 구조 위치.  |
| GDC · `gdc` | NCI GDC | 5 | 암 프로젝트, 케이스, 파일 메타 데이터, 오픈 / 제어 라벨 및 전송 표시; 다운로드 또는 액세스 권한을 부여하지 않습니다. |
| Zenodo · `zenodo` | Zenodo | 2 | 공공 데이터 세트, 소프트웨어 및 출판 발견, 버전 별 메타 데이터 및 파일 재고; 업로드 또는 다운로드. |
| · · `hmmer` | EMBL-EBI 헬멧3 | 3 | 프로그램별 단백질/프로필/분리 검색, 작업 상태 및 결과. |
| InterProScan · `interproscan` | EMBL-EBI InterProScan에 대한 정보 | 3 | 단백질 시퀀스 제출, annotation-job 상태를 확인하고 TSV 보고서를 검색하십시오. |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | Pathway 검색, 최고 통로, 그래프 쿼리 및 BioPAX 서브모델 수출. |
| Alliance Genome Resources · `alliance` | Genome 자원의 동맹 | 8 | 인간 및 모델 조직 유전자, 정형화, 질병 모델, 페형화, 알레르기 및 표현. |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | Single-cell 컬렉션 및 데이터 세트, 출판된 버전, 파일 형식, 크기 및 다운로드 URL. |
| Cellosaurus · `cellosaurus` | Cellosaurus | 2 | 셀 라인 이름과 동의를 찾기, 다음 액세스 정체성 및 품질 annotations를 검사. |
| Monarch Initiative · `monarch` | Monarch Initiative | 2 | 질병/진-to-phenotype 협회는 생물과 지원 증거를 가진다. |
| IEDB · `iedb` | Immune Epitope 데이터베이스 | 8 | Epitopes, 항원, T 세포, B 세포 및 MHC 분석실험, TCR/BCR 증거 및 근원 간행물. |
| PDC · `pdc` | NCI Proteomic 데이터 커먼즈 | 4 | 암-proteomics 연구 버전, 견본 협회 및 양적 파일 metadata; 다운로드 없음. |

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

## 단일 셀, 모델 조직 및 변형 효과 데이터 {/* #single-cell-model-organisms */}

아래 항목 검색 **Settings → Connectors**, **메인 에이전트**에 대한 가용성을 활성화, 다음 생물을 설명, 연구 질문 및 기록 당신의 대화에 유지. 이 새로운 작업은 사용자 정의 MCP 서버, API 키 또는 NCBI 연락처 이메일없이 공공 데이터를 읽습니다. 동일한 Connector에 있는 다른 서비스는 다른 필요조건이 있을 수 있습니다.

| 이름 &#42; | 할 수 있는 것 | 결과를 사용하는 방법 |
| --- | --- | --- |
| CELLxGENE Discover | 생물, 조직, 질병, 분석실험 또는 세포 유형에 의하여 단세포 datasets를 찾아내십시오; 버전 및 파일 inventories 검사 | Ontology 필터는 정확한 라벨 또는 ID를 사용하며 AND와 결합됩니다. 고정 된 출판물에 대한 dataset_version_id 유지; dataset_id는 현재 버전에 해결합니다. 파일 다운로드 또는 Census expression matrices를 쿼리하지 않고 가능한 다운로드 URL을 반환합니다. 셀 타입 설명 및 마커에 대한 별도의 CellGuide을 사용하십시오. |
| Alliance Genome Resources | Query 인간, 마우스, 쥐, 플라이, 웜, zebrafish, 효모 및 서리 유전자, 정형화, 질병 모델, 페인 유형 및 표현 | 검색 및 다음 반환된 유전자 ID 전에 유기체를 확인합니다. 증거와 정형성 끈전류를 포함합니다; 모델-편리 현상은 인간의 질병 결론이 아닙니다. |
| 잔류물 → MaveDB | 변형 효과 점수 세트, 분석실험 방법, CSV 점수 페이지 및 기존 VRS 매핑 찾기 | URN, 라이센스, 분석실험 방법 및 점수 교정을 유지하십시오. 기능적인 점수는 임상 적인 경로를 분류하지 않습니다. CSV은 start/limit pagination을 사용하고 텍스트가 여전히 파일에 저장해야합니다. Mapping retrieval은 liftover를 수행하지 않습니다. |
| Omics Archives → Metabolomics Workbench | 검색 연구; 샘플, 요소, 분석 및 ST 액세스에 의해 대사를 검사; 화합물 구조와 교차 환경 보기 | 요약, 요소, 분석 또는 metabolites를 선택하여 섹션으로 선택하십시오. PubChem을 통한 화합물의 이름을 지원되는 식별자로 먼저 해결합니다. 이 작업은 원시 측정 매트릭스를 다운로드하지 않습니다. |

CELLxGENE 필터링 및 pagination은 각 요청에 대한 업스트림 카탈로그에 로컬로 실행됩니다. 카탈로그는 요청을 변경할 수 있습니다. 출판물을 보관하는 버전 ID를 사용합니다. 허용되지 않은 파일 크기는 -1, 0 바이트입니다. MaveDB 및 Workbench 결과의 누락된 값과 assay 정의를 보존합니다.

[CELLxGENE Discover](../reference/connector-operations.md#family-30), [(주)](../reference/connector-operations.md#family-29), [MaveDB](../reference/connector-operations.md#mavedb_search_score_sets) 및 [Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies)에 대한 정확한 입력을 참조하십시오.

## 세포 선, 페인팅 및 면역 증거 {/* #cell-lines-phenotypes-immunity */}

지원하다 **Cellosaurus**· **Monarch Initiative** 또는 **IEDB** 으로 **Settings → Connectors** 그리고 그것을 사용할 수 있습니다 **메인 에이전트**... 이 작업 쿼리는 사용자 정의 서버 또는 API 키없이 공개 레코드.

| 이름 &#42; | 자주 묻는 질문 | 관광 명소 |
| --- | --- | --- |
| Cellosaurus | 셀 라인 이름 / 합성을 검색 한 다음 반환된 CVCL 액세스 또는 RRID를 검색 | Species, 정체성, 동의 및 오염/misidentification annotations. 검색은 문학 구문, 아니 raw Solr 쿼리. 품질 표기는 셀 라인의 certify하지 않습니다. |
| Monarch Initiative | Canonical CURIEs를 사용하는 질병 또는 유전자 페형 협회는 MONDO와 같은: 0007254 또는 HGNC: 11998 | 기관, 페니 타입, 소스 및 증거. Aliases는 자동으로 변환되지 않습니다; 식별자를 먼저 해결합니다. 직접적인 일치 관심사 식별자 일치, 실험적인 확인. |
| IEDB | Epitopes 또는 항원, 또는 특정 T 세포, B 세포 또는 MHC 분석실험 | 적어도 1개의 생물학/유효한 여과기는 요구됩니다; 혼자 질은 충분합니다. antigen_iri 또는 uniprot_accession을 모두 사용하세요. 보존 assay 방법, 결과, 단위 및 출판; MHC 유출 관측은 비례적인 측정이 아닙니다. |

집계된 epitope/antigen 기록은 다른 실험에서 관측을 결합할 수 있습니다. 필터는 동일한 실험에 의해 만족해야 할 때, 대응 assay 가동을 쿼리합니다. Zero match는 부정적인 생물학적 발견을 수립하지 않습니다. [Cellosaurus 모수](../reference/connector-operations.md#family-31) · [Monarch 매개 변수](../reference/connector-operations.md#family-32) · [IEDB 모수](../reference/connector-operations.md#family-33).

## GEO 매트릭스 및 시퀀스 일치 구조 찾기 {/* #geo-matrices-pdb-sequences */}

**Omics Archives → geo_get_matrix_files**는 공식 GEO 시리즈 모체와 NCBI 생성된 count/FPKM/TPM/annotation 파일을 발견합니다. 그것은 파일 위치를 반환; 그것은 자신의 바이트를 다운로드하지 않습니다. **geo_get_series**은 메타데이터 조회를 유지한다.

matrix를 얻기 후에, **geo_preflight_matrix**는 이미 읽고, 8 MiB까지 압축한 원본을 검사합니다. 그것은 네트워크 또는 파일 시스템 액세스가 없습니다. GSM 식별자 및 플랫폼 메타데이터를 유지하므로 샘플은 컬럼 포지션보다 ID로 매핑될 수 있습니다. 미리보기에 **완료: 거짓** 설정; 전체 파일에 **완료: 진실**만 전달합니다. 미리보기는 전체 파일 크기를 설정할 수 없습니다. 압축된 아카이브, sparse matrix 또는 HDF5 파일을 텍스트 검사기에 공급하지 마십시오. [matrix 발견](../reference/connector-operations.md#geo_get_matrix_files) 및 [텍스트 preflight](../reference/connector-operations.md#geo_preflight_matrix)을 참조하십시오.

**Structures & Interactions → pdb_search_sequence**는 원시 시퀀스 또는 원시 FASTA 기록으로 25-10,000 잔류물의 한 단백질 시퀀스를 허용합니다. 식별 및 쿼리 처리 임계 값은 0에서 1에 분수입니다. 반환된 쿼리 적용은 쿼리에 정렬을 설명합니다; 그것은 실험적인 구조 적용이 아닙니다. 업스트림 총은 지역 적용 필터링을 전진하고, 경계 스캔은 나중에 일치 할 수 있습니다. 작업은 좌표를 다운로드하지 않고 구조 레코드를 찾습니다. [정확한 입력 및 스캔 제한](../reference/connector-operations.md#pdb_search_sequence) 참조.

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

### 경로 네트워크 검사 {/* #inspect-a-pathway-network */}

[경로 및 상호 작용 네트워크 검사](../workflows/inspect-pathway.md): Pathway Commons를 통해 인간의 Reactome 통로를 찾아, 반환 URI를 보존하고, 상호 작용을 수출하고 경로 활동의 증거로부터 선택한 네트워크를 구별합니다.

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

카탈로그 소스: [카탈로그.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/catalog.ts), [레지스트리](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/registry.ts).

## Sequence 검색 및 정렬 {/* #sequence-tools */}

**HMMER의 장점**은 프로그램별 단백질, 프로파일-HMM 및 정렬 검색을 제공합니다. 함께 프로그램 및 데이터베이스를 선택하고 작업 ID를 유지하고 **회사 소개** 후 결과를 검색하십시오. [HMMER 운영](../reference/connector-operations.md#family-26).

**InterProScan의 장점**은 v0.35.1에서 단백질-sequence 제출, 작업 상태 및 TSV annotation retrieval을 지원합니다. 설정 및 단계에 대한 [InterProScan 제출](#interproscan-submit)을 따르십시오.

**Genomes → Clustal Omega**는 단백질, DNA 또는 RNA FASTA 레코드를 고유하게 지명한 적어도 3개의 종류를 맞추습니다. 서비스에 의해 요청된 연락처 이메일 구성, 한 번 제출, 작업 ID를 유지, 다음 상태를 확인하고 반환 정렬을 저장. [다중 상태 정렬 워크플로](../workflows/multiple-sequence-alignment.md).

## Enrichr, STRING 및 ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**: 현재 도서관 목록, 그 후에 기능, transcription 요인, perturbations, 약, 질병, 조직 또는 세포 유형을 위한 유전자 세트 enrichment를 질문하십시오. 생물과 질문에 적합한 라이브러리를 선택하고 이름을 유지하고 배경과 조정 된 P 값.
- **Protein Annotation → STRING** : 단백질 네트워크가 배경에서 예상보다 더 많은 상호 작용을 가지고 있는지 테스트합니다. 이것은 통로의 대표로부터 다른 질문을; 네트워크 P 값은 통로 테스트가 아닙니다. [Gen-set enrichment 워크플로우](../workflows/gene-set-enrichment.md#enrichr-string)을 따르십시오.
- **Clinical Genomics → ClinPGx** : 약물, 유전자 또는 변형 표기, 지침, 규제 라벨 및 인구 주파수. 식별자를 먼저 해결하고, 작업에 의해 필요한 필드를 공급하고 원본 소스와 증거 수준을 유지합니다. 이 연구 기록; 그것은 자동으로 개별 치료 계획을 생산하지 않습니다.

**Settings → Connectors**의 활성 에이전트에 대한 관련 Connector을 활성화합니다. 이 내장 항목은 사용자 정의 MCP 서버가 필요하지 않습니다. 정확한 필드 및 조건 요구 사항에 대한 [및 다운로드 가능한 레지스트리는 이제 v0.31.1 :](../reference/connector-operations.md)을 참조하십시오.

## Pathways, 표현 및 임상 데이터 {/* #pathway-expression-clinical */}

**Settings → Connectors**의 대응 가족을 활성화하고, 그 다음 유기체, 소스, 식별자 및 대상 범위를 알려줍니다. 이 추가 사용 내장 커넥터; MCP 서버가 필요하지 않습니다.

| 이름 &#42; | 할 수 있는 것 | 연결 및 해석 |
| --- | --- | --- |
| Pathway Commons | pathways, list top pathways, Genes 간 쿼리 경로 또는 submodel을 내보내기 | 공공 서비스; 반환된 URI, 생물 및 근원을 유지합니다. 그래프 쿼리는 enrichment 테스트와 다릅니다. 자주 묻는 질문 [pathway 상호 작용 워크플로우](../workflows/inspect-pathway.md). |
| 표현 → Bgee | Cross-species 선물/부정 통화, 정상화 된 점수, 경계 SPARQL 쿼리 및 다운로드 링크 | NCBI 세법 ID를 처음 발견하고 유지하십시오. SPARQL는 유전자, 종 및 조직을 요구합니다. 건강한 야생 유형 기본 전화는 차별 표식이 아닙니다; 다운로드 링크가 다운로드되지 않았습니다. |
| 암 모델 → cBioPortal | 샘플/패드 및 쿼리 임상 속성 또는 mRNA/단백 표현 | 연구 선택, 프로필을 발견하고 측정/정상화를 선택하십시오. 공급 IDs 일치 임상 샘플 / 일시적 수준; 분자 데이터는 명시된 유전자와 sample_ids 또는 sample_list_id의 정확히 하나가 필요합니다. 미스링 행은 제로가 아닙니다. |
| 약물 규제 → openFDA | Search/count FAERS 보고서 및 검색 약물 회신 | 경계 날짜 및 제품 및 유지 truncation 정보. 보고서 조사는 비공식적 또는 카우스알 증거가 아닙니다. 다 가치있는 물통은 overlap 할지도 모릅니다; 그들의 합계는 유일한 보고 아닙니다. |
| Omics Archives → MGnify | MGYA 분석 액세스에 의한 결과 파일 목록 | 반환 유형, 카테고리, 업스트림 URL 및 크기 때 보고. 파일 바이트가 다운로드되지 않습니다; 누락된 크기 또는 URL은 null을 유지합니다. |

정확한 필수 필드, 조건 및 예에 대한 [Connector 가동 참고](../reference/connector-operations.md) 참조.

## GWAS 요약 통계 파일 찾기 {/* #gwas-summary-statistics */}

**Settings → Connectors**에서 Main에 대한 **인간 유전학** 활성화. 연구의 **GCST 액세스**에 대한 요약 통계 조사에 대한 질문, 그리고 반환된 원본/출시된 파일 URL, 메타데이터 및 선언된 참조 게놈을 유지. 공개 조회는 API 키가 필요하지 않습니다.

`gwas_get_summary_statistics` 목록 연구 파일 및 사용 가능한 YAML 메타 데이터 읽기; 그것은 큰 협회 테이블을 다운로드하지 않습니다. 그것의 GWAS-SSF 란 정의는 검열된 파일 우두머리가 아닌 표준을 설명합니다. genome build, effect allele and units를 별도로 지정하고 실제 열을 확인하여 분석하기 전에 대상 파일을 다운로드하십시오. Significant 협회는 완전한 요약 통계에 대 한 대체 되지 않습니다.. [모수와 산출](../reference/connector-operations.md#gwas_get_summary_statistics).

## InterProScan에 단백질 시퀀스 제출 {/* #interproscan-submit */}

1. **Settings → Connectors**에서 Main에 대한 **InterProScan의 장점** 활성화. **Settings → Credentials → Literature access**에서 EMBL-EBI 작업에 사용되는 유효한 연락처 이메일을 저장하십시오; API 키가 필요하지 않습니다.
2. 단백질 순서 또는 독특하게 지명된 단백질 FASTA 기록 및 요구 제출을 한 번 공급하십시오. 순서와 접촉 이메일은 EMBL-EBI에 보내집니다. 1개의 요청은 순서 당 1,000 기록, 10,000 잔류물 및 4 MiB에 의하여 인코딩된 요구 몸까지 받아들입니다.
3. 반환된 **job_id**을 유지합니다. **SUBMITTED** 와 **ready: false** 은 영수증, 아니 annotation 결과입니다. **(주)** 적어도 10 초 떨어져 검사하십시오; 오염은 자동이 아닙니다.
4. **FINISHED** 후, **제품정보**을 요청하고 원격 결과가 만료되기 전에 완전한 TSV를 절약하십시오. 2 MiB 리트리발 한계에 대한 응답은 truncated 보고서를 침묵적으로 돌려보다는 실패합니다.
5. 단백질 식별자, 소스 응용 프로그램 및 1 기반 포괄적 인 좌표를 확인하십시오. 다른 회원 응용 프로그램에서 점수는 교환할 수 없습니다; hit은 단백질이 기능 부족한다는 것을 증명하지 않습니다.

timeout 후 중복 제출을 피하십시오. 알려진 작업 ID를 먼저 복구하십시오. 현지 요청에 대한 취소는 제출 된 원격 작업을 취소하지 않습니다. [제출, 상태 및 결과 매개 변수](../reference/connector-operations.md#family-27) 참조.

## TCR 및 BCR 증거 찾기 IEDB {/* #iedb-receptors */}

Main에 대한 **IEDB** 및 **search_tcrs** 또는 **search_bcrs**를 적어도 하나의 생물학적 또는 증거 필터를 요청할 수 있습니다. 혼자서 질은 충분합니다. **팟캐스트** 순서;에 대 한 `sequence` 사용 `chain1_cdr3`와 `chain2_cdr3` 필터 수용체 CDR3 순서. 이 공개 검색은 API 키가 필요하지 않습니다.

receptor-group ID, 체인을 유지, assay ID 및 소스 출판보고. 호스트 및 outcome 필터는 집단 그룹에 적용되며 다른 실험에 의해 만족할 수 있습니다. 해당 조건은 동일한 분석실험에서 발생하기 위하여, 해당 분석실험 가동으로 보고된 assay ID를 따르고 필요한 필터를 적용하십시오. Pagination 덮개 수용체 그룹은, 각 끼워넣어진 수출의 완전성 아닙니다. 이 기록은 수용체 바인딩의 예측이 아닌, 증거 retrieval입니다. [IEDB 모수](../reference/connector-operations.md#family-33).

## PDC과 함께 암 유전체학 발견 {/* #pdc */}

**Settings → Connectors**에서 **PDC**을 활성화하십시오. 대중적인 메타데이터 API는 API 열쇠를 필요로 합니다. 연구 및 버전을 찾기 위해 사용, assay와 견본 조사, 지도 상자 표본 aliquot 협회를 검사하고 **단백질 회의** 보고서와 같은 quantitative 파일을 목록으로 만드십시오. 처리/outcome 자료 또는 다운로드 파일을 반환하지 않습니다.

`PDC000127`과 같은 연구 접근을 시작하거나 연구 식별자 및 버전 이름을 검색하십시오. PDC 키워드 매칭은 임상 질병 필터가 아닙니다. 연구를 검색한 다음 `study_id` UUID를 사용하여 후속 통화를 핀으로 변환하십시오. `pdc_study_id` 최신 버전을 선택합니다. 이러한 선택자 중 하나를 정확히 제공합니다.

견본 명부를 위해, **업스트림** pagination는 케이스를 조사합니다; 표본과 aliquots를 확장하는 것은 케이스 한계 보다는 더 줄을 생성할 수 있습니다. 기본 **- 한국어** 모드 페이지는 협회를 받고 1,000-association 업스트림 캡을 가지고 있습니다. 마지막 로컬 페이지는 해당 캡이 도달했을 때 완성도를 증명하지 않습니다. PDC ID를 유지하고 외부 GDC 참조를 별도로 지명하십시오. 파일 목록에는 이름, 바이트 크기, MD5 값 및 저장 경로가 포함됩니다. 등록된 경로는 공인된 다운로드 URL이 아닙니다.

[PDC 작업 및 질](../reference/connector-operations.md#family-34) 참조. 소스를 결합하기 전에, 연구 버전, 분석실험, 견본 정체성 및 각 근원의 접근 및 인용 필요조건을 검사하십시오.

## 인구 별 LD 확인 {/* #ensembl-ld */}

**Settings → Connectors**에서 **한국어 (Korean)**을 활성화하십시오. Ensembl LD 도구는 키가없는 공공 API를 사용합니다. `ensembl_ld_pairwise`에 대한 두 가지 변형 ID를 공급, 또는 `ensembl_ld_proxies`에 대한 하나, `1000GENOMES:phase_3:KHV`와 같은 전체 인구 이름과 함께. 도구는 인구 또는 인퍼 ancestry를 발견하지 않습니다; 연구에 적합한 참조 인구를 선택하십시오.

쌍방향 결과 보고서 r2 및 D′. r2 ≥ 0.8 및 **500 kb 총 창**에 프록시 쿼리 기본, 어느 쪽에 250 kb. `max_records`는 정렬 후 반환된 목록을 캡, 업스트림 작업이 아닙니다. 결과를 가진 인구와 retrieval metadata 유지; 이 엔드포인트는 참고 집합 또는 Ensembl 방출을 보고하지 않습니다. 빈 결과가 반환되지 않는 자격이 없는 데이터, 제로 LD. 높은 LD는 카시니즘과 기능적인 평등도 설치하지 않습니다. [쌍방향 필드](../reference/connector-operations.md#ensembl_ld_pairwise) 및 [프록시 필드](../reference/connector-operations.md#ensembl_ld_proxies)을 참조하십시오.
