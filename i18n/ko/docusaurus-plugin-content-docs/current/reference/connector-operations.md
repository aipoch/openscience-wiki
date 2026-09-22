---
title: "Connector 가동 참고"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connector 가동 참고 {/* #connector-operation-reference */}

정확한 작동 이름, 필수 필드, 기본 및 예 호출을 찾습니다. 데이터 소스를 선택하려면 [데이터베이스 카탈로그](../tools/databases.md)로 시작하십시오. 전화를 할 Connector 가족을 확장; 가용성 및 자격은 별도로 구성해야합니다.

## 예를 들어 호출이 실행되는 곳 {/* #where-the-example-calls-run */}

`host` 객체는 Open-Science의 에이전트 실행 환경에 의해 공급됩니다. 아래 JavaScript는 **에이전트 사이드 콜 파편**이며 독립 Node.js 프로그램이 아니라 Public Task SDK 클라이언트의 메소드가 아닙니다. 관련 Connector 지침을로드하고 일치하는 작업을 사용합니다. 이 JavaScript 양식 대신 Python 브리지를 노출 할 수 있습니다.

먼저 [설정 → 커넥터](../guides/connectors.md)에서 Connector을 활성화하고 [필수 자격](../tools/credentials.md)를 구성하고, 해당 Specialist에 대한 권한을 부여합니다. 통화는 여전히 대화의 허가 정책을 따릅니다. Public Node.js 통합은 [작업 SDK](api.md)과 Connector 설정을 관리할 수 있지만 클라이언트를 가져 오기 위해 `host`를 얻을 수 없습니다.

### chaining 호출 전에 결과를 읽으십시오 {/* #read-a-result-before-chaining-calls */}

<p className="example-label"><strong>예시</strong> pubMed ID를 메타데이터 조회로 반환</p>

예를 들어, 요청 : **PubMed를 사용하여 PRISMA 보고 지도를 검색; 총 경기 수와 5 PMIDs을 반환합니다.** 작업 `search_articles`은 총 및 식별자의 페이지를 반환합니다. PMIDs 을 `get_article_metadata` 에 반환하여 제목, 저자 및 DOI 링크를 얻을 수 있습니다. 빈 페이지, truncated 결과 및 인증 오류는 다른 처리가 필요합니다.

| 자주 묻는 질문 | 이용하기 |
| --- | --- |
| 총 경기 수와 반환 행 | 완전한 결과 설정에서 작은 페이지를 구별 |
| `truncated`, `records_truncated` 또는 가족별 완전 플래그 | 페이지, 좁은 쿼리 또는 나머지 검색 여부를 결정하십시오. |
| `not_found`, `missing`, `not_processed` | 해결되지 않은 입력 및 retry 만 적절한 항목 식별 |
| DOI, 액세스, 소스 URL 및 릴리스 / 빌드 | 후속 쿼리에 필요한 정체성과 소스를 유지합니다. |
| Full-text 상태 또는 라이센스 노트 | 텍스트가 retrieved 여부를 결정하고 재사용 할 수 있음 |

반환 필드 이름은 작업에 따라 다릅니다. 아래 설명 및 다운로드 가능한 스키마는 각 계약을 지정합니다. 테이블은 보편적 인 JSON 응답이 아닙니다. 올바른 손 가족 목록을 사용하여 점프 할 수 있으며 가족의 매개 변수를 확장합니다. 작업 이름 검색 또한 포함 된 그룹을 엽니다.

**빈 결과에서 별도의 실패를 읽으십시오.** v0.30.2, CellGuide 마커/source/tissue 요청 표면 fetch 실패 대신 빈 증거로 치료; a absent 선택적인 자료 파일은 아직도 빈 일 수 있습니다. OLS 관계 쿼리는 불완전한 질 및 잘못된 응답을 거부합니다. 서비스 오류는 셀 유형이 마커가 없거나 투과율이 관련되지 않은 것을 증명하지 않습니다.

## 작업 입력 {/* #operation-inputs */}

한 번에 Connector을 확장합니다. 필수 필드는 **필수** 표시; 이 참조 및 다운로드는 Open-Science **v0.32.0** 스키마를 사용합니다. 배열된 `input.required` 명부는 권위입니다; 레거시 최고 수준의 `required` 목록은 absent 될 수 있습니다. JSON 스키마, 전체 반품 설명 및 에이전트 사이드 호출 예제를 배열 <ExampleDownload path="/examples/capabilities/connector-catalog-v0.32.0.json">완전한 다운로드 레지스트리</ExampleDownload>을 상담하십시오. 도구가 `id`, `accessions`, `cids` 또는 다른 네임스페이스 별 필드를 기대할 때 일반 `rs_id`을 통과하지 마십시오.


## 뚱 베어 {/* #family-1 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

화학 식별자 (이름, SMILES, InChIKey, 또는 CID)를 PubChem CIDs에 해결하고, 선택적으로 최고 히트에 대한 핵심 계산 속성과 함께.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `namespace` | 문자열 | 선택 사항; 기본: "name"; 줌: &#91;"name", "smiles", "inchikey", "cid"&#93; |
| `max_cids` | 정수 | 선택 사항; 기본: 25; 최소: 1; 최대: 100 |
| `with_properties` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

Full computed-property record for batch of PubChem CIDs, 옵션 capped synonym lists.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cids` | 정수 배열 | **필수**; 최소품목: 1; 최대품목: 50 |
| `include_synonyms` | 불리언 | 선택 사항; 기본값: false |
| `max_synonyms` | 정수 | 선택 사항; 기본: 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

2D Tanimoto 유사성 쿼리 SMILES에 대한 PubChem의 모든 검색 (동시적인 fastsimilarity_2d 경로, 작업 오염 없음).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `smiles` | 문자열 | **필수** |
| `threshold` | 정수 | 선택 사항; 기본: 90; 최소: 1; 최대: 100 |
| `max_records` | 정수 | 선택 사항; 기본: 50; 최소: 1; 최대: 200 |
| `with_properties` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

Bioassay 활동 요약 한 PubChem 화합물 — assays 테스트, 어떤 목표와, 어떤 결과와 힘.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cid` | 정수 | **필수** |
| `active_only` | 불리언 | 선택 사항; 기본값: false |
| `max_rows` | 정수 | 선택 사항; 기본: 100; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

GHS 안전 분류 한 PubChem 화합물 (PUG-View 'GHS Classification' heading), 보고 소스에 걸쳐 집계.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cid` | 정수 | **필수** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

ChEBI entities (name, synonyms, Formulae, InChIKeys)에 대한 전체 텍스트 검색.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `term` | 문자열 | **필수** |
| `max_results` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 100 |
| `page` | 정수 | 선택 사항; 기본: 1; 최소: 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

전체 ChEBI 법인 기록 : 이름, 구조, 화학 데이터, 역할 및 상호 참조.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chebi_id` | 문자열 | **필수** |
| `max_synonyms` | 정수 | 선택 사항; 기본: 30 |
| `max_xrefs` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

ChEBI entity의 종양 관계 - 그것이 무엇인지 (outgoing: /는 역할 / conjugate acid...) 그리고 그에 어떤 점 (incoming: children/derivatives).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chebi_id` | 문자열 | **필수** |
| `relation_type` | 문자열 | 옵션 정보 |
| `max_relations` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

방정식 텍스트, participant ChEBI id, 또는 EC 번호 (커키 유형 자동 감지)에 의한 Rhea 마스터 반응을 검색합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `limit` | 정수 | 선택 사항; 기본: 50; 최소: 1; 최대: 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

1개의 Rhea 반응을 위한 가득 차있는 기록: ChEBI ids와 stoichiometry, EC 연결, 방향 가족 및 문학을 가진 방정식, 참가자.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rhea_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

모든 BindingDB ligands의 Ki/Kd/IC50/EC50 (Ki/Kd/IC50/EC50)는 UniProt 접근법에 의해 1개의 단백질 표적에 대하여 묶습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `uniprot` | 문자열 | **필수** |
| `affinity_cutoff_nm` | 숫자 | 선택 사항; 기본: 10000 |
| `max_rows` | 정수 | 선택 사항; 기본: 100; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

화합물 2D-similar를 위한 측정된 친화도를 가진 단백질 표적은 조회 SMILES에 — "what 이 분자 (또는 그것의 가까운 아날로그) bind?"를 붙입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `smiles` | 문자열 | **필수** |
| `similarity` | 숫자 | 선택 사항; 기본: 0.85; 최소: 0.5; 최대: 1 |
| `max_rows` | 정수 | 선택 사항; 기본: 100; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## 문학 그래프 {/* #family-2 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `openalex_search_works` {/* #openalex_search_works */}

검색 OpenAlex scholarly 작품 (모든 분야, ~250M 레코드) 년/type/OA/venue 필터. Args : 쿼리 ( title+abstract+fulltext에 무료 텍스트; 필터가 설정된 경우 선택 사항), year_from, year_to (포함 년), work_type (문자 / 리뷰 / 사전 인쇄 / 책 - 차터 / 데이터 세트 / 디저레이션), open_access_only, 장소 (S-id, openalex.org URL, ISSN, 또는 일반 이름은 venue_resolved에서 표면; 정확한 ID를 건너 뛰기 해결책에 전달하십시오), 종류 (역량/cited_by_count/publication_date), max_records (과태 50의 단단한 천장 500를 분류하십시오; 200의 페이지), include_abstracts (논문 인덱스에서 재구성, 그러나 확인 오픈 라이센스에 대한 만 - cc-by/cc-by-sa/cc0/public-domain; 다른 사람은 추상적인 =null + abstract_policy 주 + abstract_license를 얻습니다; 대량 추가). &#123;query, 필터, 정렬, api_total, n_records_returned, records_truncated, record&#125;; 각 기록은 야윈 일 모양입니다 (openalex_id, doi, pmid, 제목, publication_year/date, 유형, 언어, is_retracted, 저자&#91;...&#93;, Source&#123;... &#125;, biblio, cited_by_count, fwci, referenced_works_count, open_access&#123;... &#125;, best_oa_pdf_url, primary_topic, 키워드).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |
| `year_from` | 정수 | 옵션 정보 |
| `year_to` | 정수 | 옵션 정보 |
| `work_type` | 문자열 | 옵션 정보 |
| `open_access_only` | 불리언 | 옵션 정보 |
| `venue` | 문자열 | 옵션 정보 |
| `sort` | 문자열 | 선택 사항; 기본: "relevance"; 한국어 (ko)"관련 상품"· "cited_by_count"· "publication_date"· |
| `max_records` | 정수 | 선택 사항; 기본: 50 |
| `include_abstracts` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

전체에서 하나의 OpenAlex 작업 - 메타 데이터, 추상 (로그 인덱스에서 재구성, openalex_search_works에서 라이센스), OA 위치, referenced_works (W-ids - openalex_references과 counts_by_year와 함께 수화. Args: work_id (W-id, openalex.org URL, bare DOI 또는 doi.org URL). DOI 조회는 주장 필터를 통해 해결; 몇 가지가 하나의 DOI을 공유 할 때 가장 인용 된 것은 선택되고 doi_claimants + doi_resolution_note가 포함되어 있습니다. 알 수없는 ID / DOIs에 대해 찾을 수 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `work_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

목록은 OpenAlex's 인용 그래프를 통해 주어진 작업 (incoming citations)가 작동한다. Args: work_id (W-id/URL/DOI — DOIs는 1개의 추가 해결책 요구), 종류 (cited_by_count 과태/publication_date/재고), max_records (과태 50의 천장 500), include_abstracts를 요합니다. &#123;work_id, api_total (진정한 인용 작품), n_records_returned, records_truncated, record&#125; (란 작업 기록).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `work_id` | 문자열 | **필수** |
| `sort` | 문자열 | 선택 사항; 기본: "cited_by_count"; 크기: "cited_by_count", "publication_date", "relevance" |
| `max_records` | 정수 | 선택 사항; 기본: 50 |
| `include_abstracts` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

CITES (outgoing references)를 작성하여 참조 목록 순서에 전체 메타 데이터에 수분을 공급합니다. Args: work_id (W-id/URL/DOI), max_records (과태 100의 천장 500; 수화 배치된 50/request). &#123;work_id, n_references, n_records_returned, records_truncated, references_not_hydrated (IDs OpenAlex에는 기록이 없습니다. - 절대 침묵으로 떨어졌다), reference_ids (ALL outgoing W-ids), record&#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `work_id` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

OpenAlex 저자 프로필을 이름으로 검색합니다. Args: 쿼리 (매트 표시 이름 + 대안; 기대 균질 — 체크 친화/topics/ORCID), max_records (과태 25의 천장 500). &#123;query, api_total, n_records_returned, records_truncated, record&#125;를 반환합니다; 각 기록 &#123;author_id, 이름, 오용, works_count, cited_by_count, h_index, i10_index, 제휴&#91;&#123;institution, years&#125;&#93;, last_known_institutions, top_topics&#125;. openalex_get_author과 author_id을 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

Fetch one OpenAlex 저자 프로필과 그들의 최고 인용 작품. Args: author_id (A-id, openalex.org URL, 또는 ORCID; CAVEAT: OpenAlex's ORCID 포인터는 스퍼 중복으로 해결할 수 있습니다 - openalex_search_authors), works_sample (기본 10, 최대 200에서 A-id를 선호합니다. 0은 추가 요청을 건너 뛰습니다. 저자 레코드를 counts_by_year, top_works_total (총 작품 수) 및 top_works (표현에 의해 일 기록) 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `author_id` | 문자열 | **필수** |
| `works_sample` | 정수 | 선택 사항; 기본: 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

OpenAlex - OA 상태, DOAJ 목록, APC, 인용 미터에서 저널 / 저장소 ('sources')를 찾습니다. Args : 장소 (exact S-id, openalex.org URL, 또는 ISSN 단일 레코드; 다른 사람은 이름 수색입니다), max_records (과태 10의 천장 500; 이름 연구 단지). 반환: 정확한 -> 1개의 근원 기록 + counts_by_year; 이름 검색 -> &#123;query, api_total, n_records_returned, records_truncated, 레코드&#125;. 소스 기록: &#123;source_id, display_name, 유형, issn_l, issn, host_organization, country_code, homepage_url, is_oa, is_in_doaj, is_core, apc_usd, works_count, cited_by_count, h_index, two_year_mean_citedness, first/last_publication_year, top_topics&#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `venue` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

검색 arXiv preprints (물리학, 수학, CS, 통계, q-bio, ...) 공식 Atom API을 통해. Args: 쿼리 (arXiv 쿼리 문자열; 일반 조건 모든 필드를 검색, 필드 접두사 ti:/au:/abs: and booleans AND/OR/ANDNOT work; 카테고리 또는 날짜 범위가 설정된 경우 선택 사항, 범주 (arXiv 코드 및 - 에, 예를 들어. q-bio.GN, cs.LG, stat.ML), date_from / date_to (출금일 YYYY-MM-DD, 포함), 시작 (0-기반 피징 상쇄; API은 요청시 ~3s를 움직입니다. max_results (기본 25, 최대 100), sort_by (부속 기본 / 제출일 / LastUpdatedDate), sort_order (부속 기본 / 종료). &#123;search_query (보통된 정확한 쿼리), api_total (arXiv's 총 경기 수), start_index, n_records_returned, records_truncated, sort_by, sort_order, record&#125;; 각 기록 &#123;arxiv_id, 버전, id_versioned, 제목, 요약, 저자, 출판, 업데이트, primary_category, 카테고리, 도이, journal_ref, 댓글, abs_url, pdf_url&#125;. doi/journal_ref는 전표 간행물 후에만 나타납니다. Malformed 쿼리는 오류를 제기 (arXiv's HTTP-200 오류 피드는, 데이터로 반환).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |
| `category` | 문자열 | 옵션 정보 |
| `date_from` | 문자열 | 옵션 정보 |
| `date_to` | 문자열 | 옵션 정보 |
| `start` | 정수 | 선택 사항; 기본: 0 |
| `max_results` | 정수 | 선택 사항; 기본: 25 |
| `sort_by` | 문자열 | 선택 사항; 기본: "relevance"; 한국어 (ko)"관련 상품"· "제출일자"· "최근 업데이트"· |
| `sort_order` | 문자열 | 선택 사항; 기본: "descending"; koum : &#91;"descending", "ascending"&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

Batch-fetch arXiv 종이 메타 데이터 (포함. ) ID에 의해 - 100 용지에 대한 한 번의 클릭 요청. Args: arxiv_ids (모든 일반적인 형태에 있는 100 ID까지 — 2103.14030, 버전 2103.14030v2, 오래된 작풍 q-bio/0601001, arXiv:-prefixed, 또는 abs/pdf URL; unversioned IDs는 최신 버전에 해결합니다). &#123;n_requested, n_found, duplicates (이 이미 반환된 종이로 해결되는 입력), not_found (알고 변형 된 ID — arXiv 침묵으로 비명하고 변형 된 것들에 전체 배치를 거부; 이 도구는 하지 않습니다), record&#125; — 요청된 순서에 있는 기록, arxiv_search 기록과 동일한 모양. 인출 용지는 여전히 메타데이터를 반환합니다 (예금 메모에 대한 코멘트를 확인).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `arxiv_ids` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

Crossref DOI에 대한 출판사-deposited 메타데이터를 검색합니다. bare DOI, doi: 접두사 또는 doi.org URL이 허용됩니다. API 키가 필요하지 않습니다. DOI이 다른 등록 기관에 속한 경우, 일치하는 서비스를 사용하십시오; Crossref 404은 DOI이 유효하지 않습니다. 반환된 DOI, 제목 및 source_url을 확인합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `doi` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

입금 된 보정, 재전력 및 기타 업데이트 관계 읽기. updated_by 포인트는 이 작업을 업데이트; update_to 포인트는 이 DOI에 의해 업데이트됩니다. 보존 관계 방향 및 소스 라벨. 빈 배열은 신뢰성을 설치하지 않거나 retraction가 존재하지 않는다는 것을 증명합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `doi` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

DataCite dataset/software DOI 메타데이터를 검색합니다. 공급 질문, related_doi 또는 둘 다; 쿼리는 DataCite 쿼리 구문을 사용합니다. 같은 필터와 page_size을 유지하면 next_page을 따르십시오. Page-number retrieval은 첫 번째 10,000 레코드에 제한됩니다. 필요한 경우 쿼리를 좁은. related_identifiers, 권리 및 방문 URL을 확인하십시오. metadata는 다운로드할 수 있는 자료 또는 재사용 권한을 보장하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 선택 사항; 최소 길이: 1; 최대 길이: 2000 |
| `related_doi` | 문자열 | 선택 사항; 최소 길이: 1; 최대 길이: 2048 |
| `resource_type` | 문자열 | 선택 사항; 기본: "dataset"; 한국어 (ko)"데이터셋"· "소프트웨어"· |
| `page_size` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 100 |
| `page` | 정수 | 선택 사항; 기본: 1; 최소: 1; 최대: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

제목, 제작자, 자원 유형, 권리, 관련 식별자 및 사용 가능한 버전을 포함하여 하나의 공개 DataCite DOI 레코드를 검색하십시오. bare DOI, doi: 접두사 또는 doi.org URL을 허용한다. 연결된 데이터셋 또는 소프트웨어 패키지를 사용하기 전에 식별자 및 관계 방향을 확인하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `doi` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## 팟캐스트 {/* #family-3 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `search_articles` {/* #search_articles */}

검색 PubMed (바이오 의학 & NCBI esearch를 통해 생명 과학 문학) 쿼리를 일치시키는 기사. PMIDs 페이지의 총 매치 카운트를 반환합니다. PubMed 필드 태그 (&#91;Title&#93;, &#91;Author&#93;, &#91;Journal&#93;, &#91;MeSH Terms&#93;, ...), Boolean 연산자, 날짜 필터링 및 정렬을 지원합니다. PubMed는 물리학 / CS / 수학 / 순수 화학 용지를 색인하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `max_results` | 정수 | 선택 사항; 기본: 20 |
| `retstart` | 정수 | 선택 사항; 기본: 0 |
| `sort` | 문자열 | 선택 사항; 한국어 (ko)"관련 상품"· "pub_date"· "이름 &#42;"· "journal_name"· "이름 &#42;"· |
| `date_from` | 문자열 | 옵션 정보 |
| `date_to` | 문자열 | 옵션 정보 |
| `datetype` | 문자열 | 선택 사항; 기본: "pdat"; 한국어 (ko)"뚱 베어"· "칫"· "뚱 베어"· |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

pubMed의 상세한 기사 메타 데이터를 검색 PMID (bulk, efetch를 통해): 식별자 (pmid/pmc/doi), 제목, 요약, 저널, 소속 저자, 출판 날짜, MeSH 용어, 문서 유형, 언어 및 인용. 모든 사용에서 PubMed를 인용하고 링크로 반환 된 기사 DOIs (identifiers.doi)를 포함합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **필수** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

NCBI elink를 통해 한 개 이상의 소스 PMIDs에 대한 관련 PubMed 콘텐츠를 찾습니다. `pubmed_pubmed` (과태)는 제목 / astracts/MeSH (NOT 인용);의 단어 무게를 다는 유사성에 의해 순위를 매긴 유사한 기사를 반환합니다. `pubmed_pmc`은 전체 텍스트 PMC 링크를 반환; `pubmed_gene`/`pubmed_protein`/`pubmed_nucleotide`는 연결되는 순서/gene 기록을 돌려보냅니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **필수** |
| `link_type` | 문자열 | 선택 사항; 기본: "pubmed_pubmed"; 크기: "pubmed_pubmed", "pubmed_pmc", "pubmed_nucleotide", "pubmed_protein", "pubmed_gene" |
| `max_results` | 정수 | 옵션 정보 |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

NCBI ecitmatch를 통해 PMIDs에 대한 bibliographic 인용을 해결하십시오. 각 인용은 &#123;journal, 년, 양, first_page, 저자, key&#125;의 몇몇을 공급합니다; 2-3+ 필드를 신뢰할 수 있는 매칭으로 제공합니다. 참조 목록과 PMIDs을 필요로 할 때 사용.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `citations` | 객체 배열 | **필수** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

NCBI/PMC ID 변환기를 통해 PMID, PMCID 및 DOI 사이 변환. 통화 당 균류 입력 에이즈 (`id_type` 을 일치). PMID이 PMCID(i.e.)인지 확인하기 위해 일반적으로 사용됩니다. PMC에서 전체 텍스트) get_full_text_article 호출하기 전에.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `ids` | ['string', 'array'] | **필수** |
| `id_type` | 문자열 | 선택 사항; 기본: "pmid"; 한국어 (ko)"뚱 베어"· "뚱 베어"· "뚱 베어"· |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

유럽 PMC를 통해 PubMed Central의 오픈 액세스 전체 텍스트를 검색 PMC ID ("PMC12345" 또는 " 12345". Structured 섹션 텍스트와 라이센스를 반환; 풀 텍스트가 사용할 수없는 경우 이유가 명시적으로보고됩니다 (fulltext_status). OA-subset 기사는 전체 텍스트를 검색 할 수 있습니다. 모든 사용에서 PubMed를 인용하고 링크로 반환 된 기사 DOIs를 포함한다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pmc_ids` | ['string', 'array'] | **필수** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

PubMed 저작권정보, PMC ID 변환기 (PMID ->)를 결합하여 PMID의 저작권 및 라이센스 상태를 보고하십시오. PMCID/DOI) 및 PMC &lt;permissions> 블록 (라이센스 타입, ALI 라이센스 URL, 저작권 성명/년). reproducing 내용의 앞에 open-access reuse 권리를 검사하는 사용.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pmids` | ['string', 'array'] | **필수** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## 유전자 & 관련 기사 {/* #family-4 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `query_genes` {/* #query_genes */}

mygene.info를 통해 유전자 식별자/symbols를 해결하십시오 (1000 기간/request까지 일괄 처리). Ensembl gene IDs, Entrez IDs, name, 그리고 다른 mygene.info 필드에 맵 유전자 기호를 사용하여 (`scopes`을 입력 조건의 네임스페이스에 설치하십시오. 예. "entrezgene", "ensembl.gene", "symbol, 별칭"). Args : 용어 (커리 용어, 예.g. &#91;"TP53","BRCA1"&#93;; commas 포함 된 용어는 지원되지 않습니다.); 범위 (comma-separated 식별자 네임스페이스를 사용하여 조건에 맞출 수 있음); 필드 (귀하의 유전자 필드, 또는 "all"); 종 (일반 이름 "human"/"mouse" 또는 NCBI 택시). &#123;n_input, n_records, not_found, record&#125;를 반환합니다. 여러 유전자를 매칭하는 용어는 여러 레코드를 산출합니다 (각은 `query`을 운반합니다). 기록은 deterministically 명령합니다 (입력 순서, 그 후에 _id).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `terms` | 문자열 배열 | **필수** |
| `scopes` | 문자열 | 옵션 정보 |
| `fields` | 문자열 | 선택 사항; 기본: "symbol, 이름,taxid,entrezgene,ensembl.gene" |
| `species` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

EBI Ontology Lookup Service (OLS4)의 ontologies 목록. `ontology_ids` (예를들면) &#91;"efo","cl","chebi","go","mondo"&#93;): 다만 그 ontologies를 위한 구조화된 메타데이터 기록; 알 수없는 ID는 `not_found`에서보고됩니다. 없는: 완전한 OLS4 카탈로그 (~250 ontologies, 완전히 그리고 수 검증된). 반환: &#123;records:&#91;&#123;ontology_id, 제목, 버전, 상태, num_terms, ...&#125;&#93;, not_found:&#91;...&#93;&#125; ID 리스트 또는 &#123;records:&#91;...&#93;, total_elements, Complete&#125; 전체 카탈로그.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `ontology_ids` | 문자열 배열 | 옵션 정보 |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

하나 이상의 OLS4 ontologies를 통해 라벨/합니마에 의해 투과율 검색. 전형적인 용도 : 질병 이름 (ontologies=&#91;"efo"&#93;), 세포 종양 세포 유형 (&#91;"cl"&#93;), 화학 (&#91;"chebi"&#93;)의 ChEBI 용어, 이름 (&#91;"go"&#93;)에 의한 GO 용어를 찾아 한 번에 모든 종양을 검색하십시오. Args: 쿼리 (term 레이블, synonym, 또는 식별자); ontologies (lowercase ID는 제한합니다; 없음은 각 투과학을 검색합니다; 정확한 (전체 문자열 일치); include_obsolete (과태 False); max_results (OLS relevance에 의해 붙인). &#123;query, total_found, n_returned, truncated, 용어:&#91;&#123;curie, iri, 레이블, short_form, 투과, 설명, 유형, is_defining_ontology&#125;&#93;&#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `ontologies` | 문자열 배열 | 옵션 정보 |
| `exact` | 불리언 | 선택 사항; 기본값: false |
| `include_obsolete` | 불리언 | 선택 사항; 기본값: false |
| `max_results` | 정수 | 선택 사항; 기본: 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

Fetch one tology term's 세부사항, 또는 그것의 완전한 관련 맨끝 세트. `relation=None`: 전체 기간 기록 (표, 동의어, 묘사, 쓸모 없는 깃발, 직접적인 부모). 관계 : COMPLETE, 완전히 관련 용어의 질화 세트 - 예. 관계="hierarchicalChildren" 직접 아이들을 위한 incl. part_of 등, "descendants"/"hierarchicalDescendants" 전체 서브 트리에 대한, "ancestors"/"hierarchicalAncestors", "parents", "children". Retrieval은 API's 자신의 합계에 대해 계산됩니다. Args : 투과율 (lowercase, 예를 들어) "efo", "go", "cl", "chebi"; term_id (커리 "EFO: 0000305"/"GO: 0006281" 또는 가득 차있는 IRI); 관계 ( 나열된 중 하나 또는 하나); include_parents (관계가 없을 때 직접 부모를 거부하십시오). 반환: 관계 = 아무도 &#123;curie, iri, 상표, 투과, short_form, synonyms, 묘사, is_obsolete, has_children, Parent&#125;; &#123;root, 관계, total_elements, term_count, 용어:&#91;...&#93;&#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `ontology` | 문자열 | **필수** |
| `term_id` | 문자열 | **필수** |
| `relation` | 문자열 | 선택 사항; 한국어 (ko)"엄마의 아들"· "아이 들과"· "의 역사"· "뚱 베어"· "hierarchical특허"· "의료기관"· "hierarchical아세터"· "히어로즈"· |
| `include_parents` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

QuickGO (complete, count-verified)에서 UniProt 유전자 제품에 대한 GO 주석을 검색합니다. 아르그: uniprot_accession (예: ) "P04637"의 선택 접두사); 종횡비 (모든 측면, 또는 biological_process/molecular_function/cellular_component)의 하나; 증거 (None/all의 미리 설치 "experimental_manual"=manually 할당된 실험적인 증거, "automatic_iea"=electronic/IEA, 또는 "ECO 같이 명시한 ECO 부호: 0000314"; IDA/IEA와 같은 세 개의 테터 GO 증거 코드는 허용되지 않습니다. - QuickGO는 침묵적으로 GoEvidence를 무시하며, 필터는 ECO 코드를 사용해야합니다.); taxon_id (선택적인 NCBI 세세논, 예를들면. 9606); include_term_names (1개의 배치된 투과율 보기를 통해 GO 기간 이름/aspect/oused를 가진 각 기록; max_records (기록에 캡; 가득 차있는 세트는 아직도 retrieved와 summarized; `truncated`는 캡을 플래그로 합니다. &#123;gene_product, total_annotations, n_record, 완전한, truncated, distinct_go_ids (모든 주석을 건너), 기록:&#91;&#123;go_id, go_aspect, 정량제, go_evidence, eco_id, 참고, assigned_by, 날짜, ...&#125;&#93;&#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `uniprot_accession` | 문자열 | **필수** |
| `aspect` | 문자열 | 선택 사항; 한국어 (ko)"biological_process"· "molecular_function"· "cellular_component"· |
| `evidence` | 문자열 | 옵션 정보 |
| `taxon_id` | 정수 | 옵션 정보 |
| `include_term_names` | 불리언 | 선택 사항; 기본값: false |
| `max_records` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `search_uniprot_entries` {/* #search_uniprot_entries */}

정확한 유전자명( synonyms 포함), 단백질 이름 구문 및/또는 정확한 organism_id(NCBI taxonomy ID, 후손자 제외)에 의한 활성 UniProtKB 단백질 항목을 발견하십시오. 이 필터의 적어도 하나가 요구됩니다; 공급된 필터와 결합됩니다. 선택 reviewed=true 선택 Swiss-Prot, false 선택 TrEMBL; 모두 포함 omitting. 생물 없음 또는 기본적으로 검토. 텍스트 사용 UniProt 토큰화 구문 일치, arbitrary substring 일치 또는 raw query syntax; 인용, backslashes, wildcards 및 제어 문자가 거부됩니다. 액세스 주문에 한 개의 경계 페이지를 반환, 완전한 단백질 세트하지. 다음 페이지의 경우 next_cursor을 동일한 필터와 page_size로 전달합니다. Cursors는 opaque, 상쇄 또는 튼튼한 스냅 샷; UniProt가 stale cursor를 거부하면 다시 시작합니다.

적어도 1개의 목록으로 만들어진 검색 필터 공급; 완전한 조합 규칙을 위한 다운로드 가능한 schema를 상담하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | 선택 사항; 최소 길이: `1`; 최대 길이: `200`; 패턴 : `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `protein_name` | 문자열 | 선택 사항; 최소 길이: `1`; 최대 길이: `200`; 패턴 : `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `organism_id` | 정수 | 선택 사항; 최소: `1`; 최대: `2147483647` |
| `reviewed` | 불리언 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본 : `25`; 최소: `1`; 최대: `500` |
| `cursor` | 문자열 | 선택 사항; 최소 길이: `1`; 최대 길이: `4096`; 패턴 : `"^[^\\s\\u0000-\\u001f\\u007f]+$"` |

```javascript
const result = await host.mcp("genes", "search_uniprot_entries", {"gene": "TP53", "organism_id": 9606, "reviewed": true, "page_size": 25})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

Fetch UniProtKB는 1 차 또는 2 차 액세스 목록의 레코드를 기록합니다. unsolved 별명으로 직접적인 per-accession fallback를 이용합니다. 세 가지 모드 : `fields` 주어진 → 토큰 - 랑 탭의 검색은 UniProt 필드 (예를 들어. &#91;"accession","id","protein_name","gene_names","organism_name","length","sequence"&#93;); `format`은 무시됩니다. format="fasta" → per-accession FASTA 순서. format="txt" → per-accession 전체 UniProt 플랫 파일 텍스트 (완전 주석; `fields`을 선호하는 매우 큰 수 있습니다. Args : 액세스 (예 :) &#91;"P04637", P38398"&#93;); 형식 ( "fasta"/ "txt", `fields`이 부여 될 때 무시); 필드 (선택적인 UniProt REST 필드 이름 탭 모드). 반환: 필드 모드 &#123;accessions, 필드, n_records, 레코드:&#91;&#123;&lt;column>:value&#125;&#93;&#125;; fasta/txt 모드 &#123;accessions, 형식, n_found, 누락, 기록:&#123;accession:text&#125;&#125; — `missing` 목록 액세스 UniProt는 레코드를 반환하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |
| `format` | 문자열 | 선택 사항; koum : &#91;"fasta", "txt"&#93; |
| `fields` | 문자열 배열 | 옵션 정보 |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

Reactome Pathways (AnalysisService Token 워크플로우)에 대한 Map 유전자 기호 또는 UniProt 액세스. Args: 식별자 (id_type="symbol", "uniprot"가 있는 경우 UniProt Accessions ; 중복 없음); id_type ("symbol"/"uniprot"); 종 (과태 "Homo sapiens"); 자원 (AnalysisService 분자 자원 전망 "TOTAL" 기본; "UNIPROT"의 특징 단백질 수준 매핑에 제한); include_disease (서비스 기본 True); 콤팩트 (True → per-identifier 저수준 통로만 &#123;stId의 이름, species&#125; + reactome 릴리스 버전; False → 전체 결정 결과 : 엔터런트 / 반응 통계 (p-value, FDR, Found / 총) 및 일괄 요약 포함의 전체 경로 세트. identifiers_not_found). 반환: 콤팩트 &#123;tool, reactome_version, id_type, 종, n_input, 유전자: &#123;identifier: &#123;found, n_lowlevel_pathways, pathways&#125;&#125;&#125;; 전체는 통로 통계 및 batch_summary을 추가합니다. 지도 식별자는 요청한 종에 통로를 식별하고, 인간에게 투구하지 않고. `Homo sapiens` 또는 `Mus musculus`와 같은 지원되는 과학적인 이름을 사용하십시오; 다운로드 가능한 스키마 목록 모두 지원되는 이름. 빈, 지원되지 않은 또는 잘못 된 종은 오류입니다. `found` 및 `n_found`은 식별자 인식을 나타내며, 경로 회원은 인식 식별자가 0 경로가있을 수 있습니다. 컴팩트 모드는 저수준 통로만 포함합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `identifiers` | 문자열 배열 | **필수** |
| `id_type` | 문자열 | **필수**; koum : &#91;"symbol", "uniprot"&#93; |
| `species` | 문자열 | 선택 사항; 기본: "Homo 사파이어" |
| `resource` | 문자열 | 선택 사항; 기본: "TOTAL" |
| `include_disease` | 불리언 | 선택 사항; 기본값: true |
| `compact` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

g:Profiler enrichment 소스와 하나의 유기체의 현재 데이터 버전을 나열합니다. 소스는 생물 의존이며 GO:BP, GO:MF, GO:CC, KEGG, Reactome 및 WikiPathways와 같은 네임스페이스를 포함합니다. g:Profiler는 서비스 가동을 위한 한정된 조회 메타데이터를 저장합니다; 이 읽기 전용 조회는 유전자 목록을 제출하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `organism` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `64`; 패턴 : `"^[a-z][a-z0-9_]*$"` |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

G를 실행:Profiler g:GOSt는 GO, Reactome, KEGG, WikiPathways 및 기타 유기 지원 소스에서 설정된 유전자에 대한 풍부. 명시된 유기체, 사용자 정의 통계 배경, 하위 대표 테스트 및 g:Profiler 다중 테스트 교정. unmapped, ambiguous, 및 중복 식별자는 침묵적으로 불멸되는 대신 메타 데이터에 반환됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `genes` | 문자열 배열 | **필수**; 최소품목: 1; 최대품목: 5000 |
| `organism` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `64`; 패턴 : `"^[a-z][a-z0-9_]*$"` |
| `sources` | 문자열 배열 | 선택 사항; 최대품목: 100 |
| `background_genes` | 문자열 배열 | 선택 사항; 최소품목: 1; 최대품목: 20000 |
| `domain_scope` | 문자열 | 선택 사항; 크기: "annotated", "known", "custom", "custom_annotated"&#93; |
| `correction_method` | 문자열 | 선택 사항; 기본: "g_SCS"; 한국어 (ko)"사이트맵"· "bonferroni, 영국"· "뚱 베어"· |
| `user_threshold` | 숫자 | 선택 사항; 최대: 1; 독점적인Minimum: 0 |
| `all_results` | 불리언 | 선택 사항; 기본값: false |
| `ordered` | 불리언 | 선택 사항; 기본값: false |
| `measure_underrepresentation` | 불리언 | 선택 사항; 기본값: false |
| `no_iea` | 불리언 | 선택 사항; 기본값: false |
| `no_evidences` | 불리언 | 선택 사항; 기본값: false |
| `numeric_ns` | 문자열 | 선택 사항; 최소 길이: 1; 최대 길이: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## 한국어 (Korean) {/* #family-5 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `blast_submit` {/* #blast_submit */}

비동기 유사성 검색을 위한 NCBI BLAST 서비스로 한 핵산 또는 단백질 시퀀스를 제출하십시오. A/C/G/T만 만든 단백질이 다른 주위이기 때문에 molecule_type를 명시적으로 설정하십시오. RID 및 서버 견적을 반환합니다. 호출 blast_status 한 분 당 한 번 이상, 다음 blast_results READY 후. 순서는 NCBI에 보내지고 로컬로 캐시되지 않습니다; 손실된 제출 응답은 blast_submission_unknown을 제기하고 자동으로 검색되지 않아야 합니다. 적어도 10 초에 의하여 모든 BLAST 요구 및 적어도 60 초에 의하여 동일한 RID를 위한 모든 요구. 재시작 후 RID를 재시작합니다. NCBI는 일반적으로 36 시간 동안 결과를 유지; 이것은 deletion 보증이 아닙니다. 취소, 앱 종료 및 로컬 요청을 제거; 이 API에는 문서화되지 않은 원격 취소 / 삭제 작업이 없습니다. 작업 레지스트리 또는 결과 캐시가 추가되지 않습니다; 정상적인 대화/노트북 persistence는 입력과 산출을 유지할지도 모릅니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `sequence` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `100000` |
| `molecule_type` | 문자열 | **필수**; 제품 이름: `["nucleotide", "protein"]` |
| `database` | 문자열 | 선택 사항; 제품 이름: `["nt", "core_nt", "refseq_rna", "nr", "refseq_protein", "swissprot"]` |
| `evalue` | 숫자 | 선택 사항; 독점적인Minimum: `0`; 최대: `1000` |
| `hitlist_size` | 정수 | 선택 사항; 최소: `1`; 최대: `100` |
| `megablast` | 불리언 | 옵션 정보 |

```javascript
const result = await host.mcp("genomes", "blast_submit", {"sequence": "ATGCGTACGTAGCTAG", "molecule_type": "nucleotide", "database": "nt"})
```

### `blast_status` {/* #blast_status */}

한 번 NCBI BLAST RID를 확인하십시오. 이것은 단일 SearchInfo 요청이며 오염 또는 대기; 체크 사이 적어도 60 초를 기다리는 NCBI 지도를 존중하십시오. WAITING, READY, FAILED, 또는 UNKNOWN (알 수 없거나 만료된 RID)를 반환합니다. 적어도 10 초에 의하여 모든 BLAST 요구 및 동일한RID 요구, 결과 retrieval를 포함하여, 적어도 60 초.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rid` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `128` |

```javascript
const result = await host.mcp("genomes", "blast_status", {"rid": "AYEFB4DT014"})
```

### `blast_results` {/* #blast_results */}

Fetch NCBI BLAST RID에 대한 결과를 바인딩했습니다. 그것은 하나의 요청을하고 ready=false를 반환 할 때 작업은 여전히 대기; json2, xml2, 텍스트, 또는 blast_status이 READY를 보고한 후 탭 출력을 선택합니다. 결과는 2 MiB에서 캡핑되며 동사태를 반환합니다. tabular는 NCBI Text + ALIGNMENT_VIEW=Tabular를 의미하며 HTML 코멘트, PRE 태그 및 보고서 헤더를 포함 할 수 있습니다. 그것은 순수한 TSV 또는 CSV가 아닙니다. blast_status을 포함한이 RID에 대한 마지막 요청 후 최소 60 초를 기다립니다. 자동적인 retries 없음.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rid` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `128` |
| `format` | 문자열 | 선택 사항; 제품 이름: `["json2", "xml2", "text", "tabular"]` |

```javascript
const result = await host.mcp("genomes", "blast_results", {"rid": "AYEFB4DT014", "format": "json2"})
```

### `ensembl_lookup` {/* #ensembl_lookup */}

안정된 ID 또는 기호에 의한 유전자, 성적, 단백질을 찾습니다. 쿼리는 ENS ID (버전 허용), FlyBase/WormBase/yeast ID, 또는 BRAF와 같은 기호를 허용한다. query_type: 자동 (과태)는 ID를 첫째로 삼고, 그 후에 입력이 canonical ENS/LRG ID인 경우에만 명시된 부재에 상징합니다; id는 ID 조회만 사용합니다; 기호는 버전 정상화 없이 단지 상징 lookup를 이용합니다. 종은 기호 파열 (기본 homo_sapiens)에만 적용되며, 불이 켜지지 않습니다. transcripts, exons 및 번역 (기본 false)를 포함합니다. 잘못된 요청 및 서비스 실패는 오류를 제기합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `query_type` | 문자열 | 선택 사항; 기본: "auto"; 크기: "auto", "id", "symbol" |
| `species` | 문자열 | 선택 사항; 기본: "homo_sapiens" |
| `expand` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

Ensembl 안정적인 ID의 외부 교차 환경 — Ensembl gene/transcript ID에서 HGNC, NCBI(EntrezGene), UniProt, OMIM, RefSeq, Expression Atlas 등 Args: stable_id (ENSG.../ENST..., 받아들여지는 버전); external_db (선택적인 정확한 상류 데이타베이스 이름 여과기, e.g. HGNC, EntrezGene, Uniprot_gn, MIM_GENE, RefSeq_mRNA;, 모든 것을 위해 omit. &#123;stable_id, external_db, n_xrefs, xrefs&#125;를 반환합니다 — COMPLETE 목록 (truncated), 정렬 (dbname, primary_id); 각 행 &#123;dbname, db_display_name, primary_id, display_id, 설명, 동의어, info_type&#125;. 알려진 ID 반환 n_xrefs:0.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `stable_id` | 문자열 | **필수** |
| `external_db` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

`variant_id`를 지정하면 ID 조회가 우선하며 `region`, `allele`, `allele_orientation`은 무시됩니다. `allele`로 ID 조회 결과를 필터링할 수 없습니다. 영역 조회는 해당 종의 현재 참조 유전체 조립본(사람은 GRCh38)을 사용합니다. 좌표는 1부터 시작하며 양 끝을 포함하고, 삽입은 `start = end + 1`로 지정합니다. `allele_orientation`의 기본값은 `forward`이며, 영역에 `:-1` 접미사가 있어도 대립유전자를 참조 유전체의 정방향 가닥으로 해석합니다. `region`을 선택한 역방향 영역의 서열 대립유전자는 요청 전에 역상보 서열로 변환됩니다. 역방향 영역에서 기호 대립유전자를 쓰려면 `forward`가 필요합니다. 모든 영역 요청은 정방향 가닥으로 전송되고 `normalization`에 원래 입력과 변환된 입력이 기록됩니다. 참조 조립본 간 좌표 변환이나 좌표 반전은 수행하지 않습니다. 유전자가 역방향 가닥에 있어도 역방향 입력이 필요한 것은 아닙니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `variant_id` | 문자열 | 옵션 정보 |
| `region` | 문자열 | 옵션 정보 |
| `allele` | 문자열 | 옵션 정보 |
| `allele_orientation` | 문자열 | 선택 사항; 기본 : `forward`; 제품 이름: `forward`, `region` |
| `species` | 문자열 | 선택 사항; 기본: "homo_sapiens" |
| `max_consequences` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

Ensembl Compara (condensed rows — no alignments/sequences)에서 유전자의 Orthologues 또는 패럴로그. Args : gene_symbol (`species`의 안정적인 ID로 해결 됨) gene_symbol/gene_id의 정확하게 하나 통과하십시오); gene_id (ENSG ...); homology_type (기본/변리사/프로젝트); target_species (하나 종에 제한); target_taxon (NCBI 세세논 서브 트리, 예) 9443 프리마트; target_species, 또는 semantics와 결합할 수 있는); 종 (출원 종, 기본 homo_sapiens); max_homologies (원격 캡 기본 200; n_total는 완전한 카운트를 운반, homologies_truncated는 모자를 발사합니다). &#123;gene_id, gene_symbol, 종, homology_type, target_species, target_taxon, n_total, homologies_truncated, homologies&#125;를 반환합니다; 정렬 된 행 (species,id) &#123;type, 종, id, protein_id, taxonomy_level, method_link_type&#125;. Quirk: the /homology/symbol route stalls — 이 도구는 항상 심볼을 해결하고 안정적인 ID로 쿼리합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |
| `homology_type` | 문자열 | 선택 사항; 기본: "orthologues"; 줌: &#91;"orthologues", "paralogues", "projections"&#93; |
| `target_species` | 문자열 | 옵션 정보 |
| `target_taxon` | 정수 | 옵션 정보 |
| `species` | 문자열 | 선택 사항; 기본: "homo_sapiens" |
| `max_homologies` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

Ensembl의 Fetch 순서 — 안정된 ID (gene/transcript/protein) 또는 genomic 지구에 의하여. EITHER stable_id 또는 지역을 통과하십시오. Args : stable_id (ENSG ... / ENST ... / ENSP ..., 승인 된 버전); 지역 (1 기반 포함 크롬 : 스타트..end 또는 크롬 : 스타트 엔드, GRCh38 인간, 최대 10Mb); 종 (지역 경로, 기본 homo_sapiens; 안정적인 ID를 무시); seq_type (ID 경로: genomic default/cdna/cds/protein; 항상 genomic을 돌려주는 지구를 무시했습니다. 이 도구는 한 번의 순서로 돌아갑니다: 유전자 수준 cdna/cds/protein 요청을 위해, 대신 transcript/protein 안정 ID를 지정하십시오; max_bytes (유료로드 가드 기본 400000 - 더 큰 순서는 `seq` omitted; length/sha256/metadata는 항상 돌려보냅니다; 전체 텍스트에 대 한 더 큰 max_bytes와 다시 호출). &#123;found, 쿼리, seq_type, ID, 설명, 분자, 길이, sha256, seq&#125;를 반환 - 분자에 의해 함침되는 단위의 길이 (Dna, 단백질을 위한 잔류물을 위한 기초); seq는 모자를 씌우는 seq_omitted에 의해 대체했습니다; 발견: Ensembl이 명시적으로 요청한 안정된 ID를 찾을 때만 null 필드와 함께 나눕니다. 다중 순서 요구, incompatible 순서 유형 및 다른 상류 실패는 과실을 올립니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `stable_id` | 문자열 | 옵션 정보 |
| `region` | 문자열 | 옵션 정보 |
| `species` | 문자열 | 선택 사항; 기본: "homo_sapiens" |
| `seq_type` | 문자열 | 선택 사항; 기본: "genomic"; 크기: "genomic", "cdna", "cds", "protein" |
| `max_bytes` | 정수 | 선택 사항; 기본: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

Ensembl은 유전자, 성적, 규제 기능 (enhancers/promoters), 반복, 변형, karyotype 밴드를 겹쳐 쌓이는 기능을 제공합니다. Args : 지역 (1 기반 포함 크롬 : 스타트 엔드 GRCh38, e.g. 7:140719327-140925199; 상류는 > 5Mb를 펼칩니다 — 더 큰 균열); 기능 (일반/직문/exon/cds/regulatory/motif/repeat/variation/structural_variation/band/simple/misc); 종 (과태 homo_sapiens); max_features (원격 캡 기본 500; n_total는 완전한 오버랩 카운트를 운반, features_truncated는 캡을 플래그). &#123;region, 종, 기능, n_total, features_truncated, features&#125; 반환 정렬 (start,id). 줄 모양은 변화합니다 — 유전자 &#123;id, external_name, 생물 유형, 묘사, 시작, 끝, 물가, canonical_transcript, ... &#125;; 규제 &#123;id, 설명, 시작, 끝, extended_start/end, ...&#125;. 빈 지역 반환 n_total: 0.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `region` | 문자열 | **필수** |
| `feature` | 문자열 | 선택 사항; 기본: "gene"; 한국어 (ko)"- 한국어"· "관련 기사"· "뚱 베어"· "cds의"· "인증 및 인증"· "뚱 베어"· "제품 설명"· "의 특징"· "structural_variation"· "팟캐스트"· "간단한 설명"· "뚱 베어"· |
| `species` | 문자열 | 선택 사항; 기본: "homo_sapiens" |
| `max_features` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

NCBI 세무성 식별자에 종 또는 세무 이름을 해결합니다. 과학/일반적인 이름 또는 숫자 TaxID를 받아들이십시오; 모든 업스트림 경기를 반환 그래서 주위 이름은 처음 결과에 할당되지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 200 |
| `max_matches` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

GCF/GCA 액세스 버전의 정확한 NCBI 게놈 어셈블리 정체성을 반환, 세금 포함, 어셈블리 이름, UCSC synonym, 상태, 및 쌍 RefSeq/GenBank 액세스. Versionless accessions는 재현성 및 종 호환성 오류를 방지하기 위해 거부됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `assembly_accession` | 문자열 | **필수**; 패턴 : `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

순서 이름과 정확한 UCSC/RefSeq/GenBank aliases 한 버전 NCBI 어셈블리. 선택적으로 1개의 순서 이름을 해결하십시오; ambiguous shared chromosome labels는 alt 또는 unlocalized 비계를 선택 대신 여러 경기로 유지됩니다. 결과는 max_sequences (과태 200);에 의해 통제되는 경계된 접두사입니다 전체 조립 보고서가 필요할 때 더 큰 캡을 사용합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `assembly_accession` | 문자열 | **필수**; 패턴 : `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |
| `sequence` | 문자열 | 선택 사항; 최소 길이: 1; 최대 길이: 200 |
| `max_sequences` | 정수 | 선택 사항; 기본: 200; 최소: 1; 최대: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

UCSC 게놈 브라우저 어셈블리에서 사용할 수있는 데이터 트랙 목록 (leaf 트랙 만 - 쿼리 가능한 한), 선택적으로 필터링. Args: genome (hg38 과태/hg19/mm39/danRer11/... ~220 집합); filter_text (이름/짧고 긴 상표, 예를들면 과민한 substring, e.g. phyloP, TFBS의 ClinVar; 모든 것을 나열하기 위해 omit - hg38는 ~24k 잎 트랙, 당신은 거의 항상 필터를 원; max_tracks (원격 캡 기본 200; n_total는 전체 경기 수를, tracks_truncated는 모자를 기치합니다)를 나릅니다. &#123;genome, filter_text, n_total, tracks_truncated, 트랙&#125; 반환 트랙 이름에 의해 정렬; 각 행 &#123;track, short_label, long_label, 유형, 그룹, parent&#125;. ucsc_track_data과 `track`을 사용하십시오. Quirk: genome 당 첫 번째 호출은 전체를 다운로드 ~17MB 목록 및 프로세스에 대 한 캐시.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `genome` | 문자열 | 선택 사항; 기본: "hg38" |
| `filter_text` | 문자열 | 옵션 정보 |
| `max_tracks` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

지역에있는 모든 UCSC 게놈 브라우저 트랙의 Fetch Raw rows — ucsc_conservation / ucsc_tfbs_clusters (진 트랙, ClinVar, GWAS 카탈로그, CpG 섬, 반복, ...). Args: 트랙 (ucsc_list_tracks, 예.g.의 이름) 알려진Gene, cpgIslandExt, clinvarMain); 크롬 (chr-prefixed, chr7/chrX — UCSC는 접두사를 요구합니다); 시작 (0 기반 반 오픈; Ensembl 1 기반 시작은 여기서 시작 1입니다. 끝 (포함); genome (과태 hg38); max_rows (API maxItemsOutput, 기본 1000; truncated는 API's 자신의 maxItemsLimit 깃발을 반영합니다. &#123;genome, 트랙, 크롬, 시작, 끝, track_type, items_returned, truncated, rows&#125;를 반환 - 업스트림 모양 (BED-like &#123;chrom, 크롬 시작, 크롬 끝, 이름, 점수, ...&#125;;의 행 wiggle &#123;start, 끝, value&#125;). 알 수없는 트랙 상승. Quirk: 일부 거대한 트랙에 대한 API 캡 출력 자체 및 dataDownloadUrl의 포인트를 출력 - 현재 경우 echoed. 좌표는 `end > start`과 더불어 비 부정적인 안전 정수이어야 합니다. 잘못된 값은 거절되지 않고, 다른 locus에 둥글거나 둥글게 되었습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `track` | 문자열 | **필수** |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `end` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `genome` | 문자열 | 선택 사항; 기본: "hg38" |
| `max_rows` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

UCSC phyloP / phastCons 트랙의 영역에 대한 진화 보수 요약 (다양한 정렬에 기초 현명한 점수). 아르그: 크롬 (chr prefixed); 시작 (0 기반 반 오픈); 끝 (exclusive; 100000 bp에서 캡핑 된 스팬 - 더 큰 분할); genome (과태 hg38); (선택; 다른 genomes를 위한 hg19와 phyloP100way를 위한 phyloP100wayAll에 과태; positive=conserved, 부정적인=fast 진화; 대안 hg38 phastCons100way, phyloP30way, phastCons30way, phyloP447way, phyloP470way; hg19 phastCons100way; include_values (또한 기초 &#123;start, 최후, value&#125;를 돌려보내십시오 max_values, values_truncated 플래그에서 캡핑 된 행 캡; default false = 요약만); max_values (기초 모자 기본 2000). &#123;genome, 트랙, 크롬, 시작, 끝, span_bp, n_bases_covered, coverage_fraction, 의미, 분, max&#125; 반환 (+values, 요청시 values_truncated). 각 행의 기초 경간에 의해 무게를 달아, 창에 자르는; coverage_fraction의 0 득점되지 않는 기초. Non-score 트랙 인상; 업스트림-truncated 행 목록도 인상.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `end` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `genome` | 문자열 | 선택 사항; 기본: "hg38" |
| `track` | 문자열 | 옵션 정보 |
| `include_values` | 불리언 | 선택 사항; 기본값: false |
| `max_values` | 정수 | 선택 사항; 기본: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

ENCODE transcription-factor 바인딩 사이트 클러스터는 지역 (세포 유형의 수백에 걸쳐 CHIP-seq 피크 클러스터)를 덮고 있습니다. TFs는 어디에 묶습니다. 아르그: 크롬 (chr prefixed); 시작 (0 기반 반 오픈); 끝 (포함); genome (hg38 기본 트랙 encRegTfbsClustered ENCODE 3, 또는 hg19 wgEncodeRegTfbsClusteredV3; 다른 집합 상승); max_rows (API maxItemsOutput 과태 1000; truncated 반사 maxItemsLimit). &#123;genome, 트랙, 크롬, 시작, 끝, items_returned, truncated, n_factors, 요소, clusters&#125; 반환 — 클러스터 정렬 (chromStart,name) &#123;name (TF 기호 예). CTCF), 크롬, 크롬 시작, 크롬 끝, 점수 (0-1000), 소스 카운터 (지원 실험) &#125;; 요인은 명백한 TF 명부입니다. Score>=~600 및 높은 소스Count ~ 강력한 바인딩. 좌표는 `end > start`과 더불어 비 부정적인 안전 정수이어야 합니다. 잘못된 값은 거절되지 않고, 다른 locus에 둥글거나 둥글게 되었습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `end` | 정수 | **필수**; 최소: 0; 최대: 9007199254740991 |
| `genome` | 문자열 | 선택 사항; 기본: "hg38" |
| `max_rows` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

Chromosome/contig 이름과 UCSC 집합의 크기 — 유효한 협조 및 iterating 지역을 위해. Args: genome (과태 hg38); filter_text (케이스에 민감한 substring, 예를 들어. chr1; 모든 것을 위해 omit — hg38에는 711 순서, 주로 alt/random/unplaced가 있습니다; 1 차적인 크롬은 첫째로 분류합니다; max_chroms (원격 캡 기본 100; n_total 전체 포스트 필터 수, chroms_truncated 플래그 캡). &#123;genome, filter_text, chrom_count (API에서 조립), n_total, chroms_truncated, 크로마일 : &#91;&#123;name, size_bp&#125;&#93;&#125; 반환 정렬 크기 하 여 내려.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `genome` | 문자열 | 선택 사항; 기본: "hg38" |
| `filter_text` | 문자열 | 옵션 정보 |
| `max_chroms` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

</ToolOperationGroup>

## 이름 &#42; {/* #family-6 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

**gnomAD 좌표 규칙:**는 참고 집합을 가진 dataset 핀을 기록합니다. R2.1/ExAC 및 GRCh38 for r3/r4; 구조 가변 유전자 쿼리 사용 `gnomad_sv_r2_1` (GRCh37) 또는 `gnomad_sv_r4` (GRCh38); 핀을 변경하면 입력 좌표를 변환하지 않습니다. `gene_constraint` 및 gnomAD ClinVar 미러는 고정 GRCh38 유전자 검사를 사용하며 dataset 인수를 허용하지 않습니다. Mitochondrial 쿼리는 또한 고정 GRCh38 부모를 찾습니다; 유전자 또는 둘 다 주문한 지역 경계를 공급하고, 형태를 결코 두지 마십시오. 지역 경계는 1에서 999,999,999에 정수가 있어야 합니다. 1 백만 기초 차이 한계는 `region_variants`에 적용합니다; 별도의 mitochondrial 제한이 없습니다. 원래 SV dataset을 사용하여 release-specific Structure-variant ID를 유지하십시오.

### `get_variant` {/* #get_variant */}

ID로 1개의 gnomAD 짧은 변종을 찾아서 전체적인 exome/genome 빈도를 반환하십시오. `variant_id`은 데이터셋의 참조 빌드 (GRCh38 for r3/r4, GRCh37 for r2.1/ExAC)에 `chrom-pos-ref-alt`입니다. `19-44908822-C-T` (APOE rs7412); `search_variants`을 사용하여 rsID를 먼저 해결합니다. ancestry-specific counts/frequencies가 개별 변종에 필요한 경우 `include_populations: true`을 설정합니다. dataset, allele counts 및 품질 필터를 유지하면 주파수를 해석 할 수 있습니다. rarity는 혼자 병렬 또는 ACMG 뇌관을 설치하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `variant_id` | 문자열 | **필수** |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_r4"; 한국어 (ko)"gnomad_r4"· "gnomad_r4_non_ukb"· "gnomad_r3"· "gnomad_r3_controls_and_biobanks"· "gnomad_r3_non_cancer"· "gnomad_r3_non_neuro"· "gnomad_r3_non_topmed"· "gnomad_r3_non_v2"· "gnomad_r2_1"· "gnomad_r2_1_controls"· "gnomad_r2_1_non_cancer"· "gnomad_r2_1_non_neuro"· "gnomad_r2_1_non_topmed"· "(주)아라"· |
| `include_populations` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

쿼리 문자열 (`rs7412`, 변형 ID 또는 접두사와 같은 rsID)와 일치하는 변형 ID에 대한 gnomAD 검색. `get_variant`의 `chrom-pos-ref-alt` ID에 rsID를 해결하기 위해 이것을 사용합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_r4"; 한국어 (ko)"gnomad_r4"· "gnomad_r4_non_ukb"· "gnomad_r3"· "gnomad_r3_controls_and_biobanks"· "gnomad_r3_non_cancer"· "gnomad_r3_non_neuro"· "gnomad_r3_non_topmed"· "gnomad_r3_non_v2"· "gnomad_r2_1"· "gnomad_r2_1_controls"· "gnomad_r2_1_non_cancer"· "gnomad_r2_1_non_neuro"· "gnomad_r2_1_non_topmed"· "(주)아라"· |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

유전자의 모든 gnomAD 짧은 변형을 나열합니다. 유전자 경계와 변조 좌표는 dataset 참고 구조 (R2.1/ExAC, R3/r4를 위한 GRCh38를 위한 GRCh37)를 이용합니다. 전체 목록은 큰 유전자의 수천을 포함 할 수 있습니다. `gene_symbol` (HGNC 기호, 예를 들어) 중 하나를 정확히 통과하십시오. `APOE`) 또는 `gene_id` (Ensembl 유전자 ID, 예를 들어. `ENSG00000130203`).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_r4"; 한국어 (ko)"gnomad_r4"· "gnomad_r4_non_ukb"· "gnomad_r3"· "gnomad_r3_controls_and_biobanks"· "gnomad_r3_non_cancer"· "gnomad_r3_non_neuro"· "gnomad_r3_non_topmed"· "gnomad_r3_non_v2"· "gnomad_r2_1"· "gnomad_r2_1_controls"· "gnomad_r2_1_non_cancer"· "gnomad_r2_1_non_neuro"· "gnomad_r2_1_non_topmed"· "(주)아라"· |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

gnomAD 유전자 제약 메트릭 : pLI, 관찰 / 탐험 LoF-missense-synonymous는 oe 비율 + 90% CI 경계, 및 per-class z-scores와 카운트를 계산합니다. Gen's를 판단하는 데 사용은 손실의 기능 (pLI >= 0.9 또는 oe_lof_upper (LOEUF) &lt; 0.6 ~ LoF-intolerant). `gene_symbol` (e.g.의 정확히 하나를 통과하십시오. `TP53`) 또는 `gene_id`.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

genomic 지역의 모든 gnomAD 짧은 변형 목록 (최대 1 Mb - 연속 창으로 더 큰 영역을 분할). `chrom`는 `1`-`22`, `X`, `Y`, 선택적인 `chr` 접두사 및 더 낮은 케이스 `x`/`y`를 받아들입니다; `start`/`stop`는 1 기반 포괄적이고 `stop - start`는 &lt;= 1,000,000이어야 합니다. dataset는 좌표 (R2.1/ExAC, R3/r4를 위한 GRCh38를 위한 GRCh37를 위한 GRCh37)의 참고 구조를 결정합니다; 입력 좌표는 이미 빌드를 사용해야하며 자동 liftover가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수**; 최소: 1; 최대: 999999999 |
| `stop` | 정수 | **필수**; 최소: 1; 최대: 999999999 |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_r4"; 한국어 (ko)"gnomad_r4"· "gnomad_r4_non_ukb"· "gnomad_r3"· "gnomad_r3_controls_and_biobanks"· "gnomad_r3_non_cancer"· "gnomad_r3_non_neuro"· "gnomad_r3_non_topmed"· "gnomad_r3_non_v2"· "gnomad_r2_1"· "gnomad_r2_1_controls"· "gnomad_r2_1_non_cancer"· "gnomad_r2_1_non_neuro"· "gnomad_r2_1_non_topmed"· "(주)아라"· |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

참조 빌드 (GRCh37 &lt;->) 사이의 변형 ID를 맵 gnomAD's liftover 테이블을 사용하는 GRCh38). `variant_id`는 `source_build`에 `chrom-pos-ref-alt`입니다. 경로는 방향입니다 : `source_build=GRCh37`과 통과 GRCh38 ID는 0 결과, 오류가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `variant_id` | 문자열 | **필수** |
| `source_build` | 문자열 | 선택 사항; 기본: "GRCh37"; 한국어 (ko)"사이트맵"· "GRCh38의 특징"· |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

gnomAD에 의해 미러링 된 유전자의 ClinVar 변형 목록, 임상 중요성, 검토 상태 및 금 별. 출력 핀 gnomAD's ClinVar 스냅 샷을 통해 `clinvar_release_date`. `gene_symbol` (e.g.의 정확히 하나를 통과하십시오. `BRCA1`) 또는 `gene_id`.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

gnomAD 구조 변형 목록 (deletions, duplications, insertions, inversions, CNVs...) 유전자를 덮어. `gene_symbol` (e.g.의 정확히 하나를 통과하십시오. `TP53`) 또는 `gene_id`. `dataset`는 SV 핀입니다 - `gnomad_sv_r4` (과태, GRCh38) 또는 `gnomad_sv_r2_1` (GRCh37); SV ID는 릴리즈 별입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_sv_r4"; 한국어 (ko)"gnomad_sv_r4"· "gnomad_sv_r2_1"· |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

릴리스 별 SV ID (e.g.에 의해 하나의 gnomAD 구조 변형을 찾습니다. `DEL_CHR17_599B1512` (gnomad_sv_r4). ID는 릴리즈를 통해 수행하지 않습니다. - `dataset` (`gnomad_sv_r4` 기본, 또는 `gnomad_sv_r2_1`)는 ID가 제공 한 릴리스와 일치해야합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `sv_id` | 문자열 | **필수** |
| `dataset` | 문자열 | 선택 사항; 기본: "gnomad_sv_r4"; 한국어 (ko)"gnomad_sv_r4"· "gnomad_sv_r2_1"· |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

gnomAD mitochondrial 변형을 나열하십시오. 이식성 인식 수 (`ac_het`, `ac_hom`, `max_heteroplasmy`) mitochondrial 유전자 또는 chrM 좌표 창. mitochondrial callset는 GRCh38 gnomAD r3/r4 dataset 핀을 통해서만 유효합니다: dataset `gnomad_r3` 또는 `gnomad_r4`를 사용하십시오. `MT-TL1`, 또는 `gene_id`와 같은 유전자 (`gene_symbol`) 또는 지역 (`region_start` + `region_stop`)를 전달하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `gene_id` | 문자열 | 옵션 정보 |
| `region_start` | 정수 | 선택 사항; 최소: `1`; 최대: `999999999` |
| `region_stop` | 정수 | 선택 사항; 최소: `1`; 최대: `999999999` |
| `dataset` | 문자열 | 선택 사항; 기본 : `"gnomad_r4"`; 제품 이름: `["gnomad_r4", "gnomad_r3"]` |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

### `clinvar_search` {/* #clinvar_search */}

ClinVar를 직접 검색하십시오 (라이브 NCBI, gnomAD's 스냅 샷) 임상 중요성, 리뷰 상태 및 금 별과 일치하는 변형 레코드를 반환합니다. NCBI E-utilities 사용 정책 당 연락처 이메일 ([Settings → Credentials → 문학 액세스 → 연락처](../tools/credentials.md))을 요구합니다. Args : 쿼리 (ClinVar Entrez 쿼리 - "TP53 R175H"과 같은 무료 텍스트 또는 HGVS 문자열 작품 및 필드된 용어는 AND/OR/NOT, e.g.로 구성합니다. BRCA1&#91;gene&#93;, pathogenic&#91;CLIN_SIG&#93;, "Lynch 증후군"&#91;dis&#93;, single_nucleotide_variant&#91;변형&#93;; rsID는 또한 작동하지만 clinvar_variant_by_rsid는 풀러 레코드를 반환), max_records (페이지 캡 1-200, 기본 50). TOTAL은 항상 보고됩니다; 총 > max_records 목록은 캡핑된 접두사 (ClinVar relevance/recency 순서)이고 truncated는 진실합니다. NCBI E-utilities intermittently 로드 하에서 HTTP 500을 반환 - 그 표면이면 몇 초 후 다시 시도.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

VCV / RCV 액세스 또는 베어 변형 ID의 배치에 대한 전체 ClinVar 기록. NCBI E-utilities 사용 정책 당 연락처 이메일 ([Settings → Credentials → 문학 액세스 → 연락처](../tools/credentials.md))을 요구합니다. Args : 액세스 (최대 50 식별자, 혼합 양식 허용 - VCV000045122 (VVV000045122.3 ok 버전; 로컬로 해결, 무료), RCV000019428 (각 RCV 비용 하나 추가 esearch), 또는 베어 ClinVar 변형 ID (45122). rsIDs는 거부 - clinvar_variant_by_rsid을 사용합니다. RCV (1개의 변이 상태 쌍)는 그것의 부모 VCV 변이 기록에 해결합니다. 절대 조용히 입력을 떨어뜨릴 수 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | ['string', 'array'] | **필수** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

모든 ClinVar 변형은 dbSNP rsID를 참조, 전체 분류와 함께 (하나 rsID는 여러 VCVs로지도 할 수 있습니다 — 교체 allele 당 하나, e.g. rs121913529 커버 KRAS G12D / G12V / G12A). NCBI E-utilities 사용 정책 당 연락처 이메일 ([Settings → Credentials → 문학 액세스 → 연락처](../tools/credentials.md))을 요구합니다. Args: rsid (dbSNP 참고 SNP ID, 예를들면. rs7412; case-insensitive, rs&lt;digits>), max_records (cap 1-200, 기본 50)와 일치해야합니다. 항상 진정한 일치 카운트를 운반하고 truncated 플래그는 캡핑 된 목록; total == 0은 ClinVar는 rsID에 대한 레코드가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rsid` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

Canonical dbSNP RefSNP는 rsIDs의 배치를 위해 기록합니다: GRCh38+GRCh37 placements, alleles, 유전자 컨텍스트, per-study allele frequencies 및 ClinVar 크로스 참조. NCBI E-utilities 사용법 정책 당 접촉 이메일 ([Settings → Credentials → 문학 액세스 → 연락처](../tools/credentials.md))을 요구합니다; 하나의 도구가 &#123;error를 반환하지 않고: 'contact_email_required', message&#125;. Args: rsids (20 rs&lt;digits>, case-insensitive로 최대) - 각 비용 한 번에 NCBI Variation 서비스 요청, 그래서 큰 배치는 rsID 당 ~1 s를 가지고. &#123;n_requested, 레코드, not_found (rs number dbSNP doesn't know), not_processed (rsIDs는 벽시 예산이 떨어지면 건너 뛰기 - 나머지는) &#125;. 각 기록: &#123;rsid의 상태, create_date, last_update_date, last_update_build_id, n_citations, citations_pmids (20에서 capped; citations_truncated는 모자를 발사합니다), variant_type, mane_select_ids의 배치, alleles&#125;. 상태는 'live', 'merged'입니다 ( 대신 merged_into을 수행 - 그 rsID를 다시 잡으십시오) 또는 'no_data' (무선/지원). 배치는 집합 (GRCh38, is_primary true) 당 ref/alts를 가진 1 근거한 색도 협조를 줍니다. 각 alt-allele 입장: &#123;allele, ref, spdi (아직)0-기반 간 기초), hgvs, 주파수: &#91;&#123;연구, study_version· allele_count· total_count, 아프&#125;&#93; (ALFA, 1000Genomes, TOPMED, gnomAD ...), clinvar : &#91;&#123;rcv_accession· clinical_significances· review_status· last_evaluated_date· disease_names&#125;&#93;, 유전자: &#91;&#123;기호, gene_id, 이름, 오리엔테이션, 결과 (SO 용어), mane_select: (주)&#123;transcript_hgvs· protein_spdi&#125;·&#125;·&#125;...

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rsids` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

genomic window의 dbSNP rsID 목록 (esearch db=snp positional index — NCBI Variation Services에는 지역 엔드포인트가 없습니다). NCBI E-utilities 사용법 정책 당 접촉 이메일 ([Settings → Credentials → 문학 액세스 → 연락처](../tools/credentials.md))을 요구합니다; 하나의 도구가 &#123;error를 반환하지 않고: 'contact_email_required', message&#125;. 아르그: 크롬 (1-22, X, Y 또는 MT; 모델 번호: 'chr' prefix tolerated), 시작 (1 기반 포함), 정지 (포함; 1 Mb에서 캡핑 된 스팬 - 연속 창으로 더 큰 영역을 분할; dense 지구는 kb 당 rsIDs의 많은 수천을 붙듭니다, 그래서 창을 작거나 max_rsids를 올리십시오), 집합 (위치 색인 — 'GRCh38' 기본 -> &#91;CPOS&#93;, 또는 'GRCh37' -> &#91;CPOS_GRCH37&#93;; 좌표는 선택된 집합에 있어야 합니다), max_rsids (표현 모자 1-1000, 과태 200). &#123;chrom, start, stop, Assembly, term (절단한 Entrez 쿼리 사용), 합계 (API's 자신의 카운트), n_returned, truncated, rsids&#125;를 반환합니다. truncated는 합계 > 때 진실합니다 n_returned - 목록은 Entrez 기본 순서 (descending rs number)의 접두사이며, 침묵 truncation은 절대로 없습니다. rsIDs (&lt;= 20 을 한 번에) 를 dbsnp_get_rsids 를 전체 레코드에 대 한 피드.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수** |
| `stop` | 정수 | **필수** |
| `assembly` | 문자열 | 선택 사항; 기본: "GRCh38"; 한국어 (ko)"GRCh38의 특징"· "사이트맵"· |
| `max_rsids` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## 임상시험 {/* #family-7 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `search_trials` {/* #search_trials */}

ClinicalTrials.gov에 대한 PRIMARY 검색. 상태, 개입, 스폰서, 위치, 상태 (예를 들어. &#91;"RECRUITING"&#93;), 단계 (&#91;"PHASE1".."PHASE4"&#93;) 및 study_type. 조건/intervention/sponsor/location은 Essie 쿼리 구문 (boolean AND/OR/NOT, "quoted 구문", 그룹화, 자동 구문)을 받아들입니다. page_token 페이지; 총 경기 수를 위해 count_total을 설정합니다. advanced_query는 필터.advanced로 원시 Essie 표현을 병합합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `condition` | 문자열 | 옵션 정보 |
| `intervention` | 문자열 | 옵션 정보 |
| `sponsor` | 문자열 | 옵션 정보 |
| `location` | 문자열 | 옵션 정보 |
| `status` | 문자열 배열 | 옵션 정보 |
| `phase` | 문자열 배열 | 옵션 정보 |
| `study_type` | 문자열 | 선택 사항; 줌: &#91;"INTERVENTIONAL", "OBSERVATIONAL", "EXPANDED_ACCESS"&#93; |
| `advanced_query` | 문자열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 1000 |
| `page_token` | 문자열 | 옵션 정보 |
| `count_total` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

NCT id (format "NCT")에 의해 하나의 평가에 대한 포괄적 인 세부 사항 얻기 + 8 손가락; bare 번호는 prefixed, case-insensitive)입니다. 전체 자격 기준을 반환, 연구 디자인, 1 차 / 2 차 / 기타 엔드 포인트, 모든 위치, 스폰서 및 공동 작업자, 날짜, 등록 및 결과 링크.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `nct_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

회사 또는 조직에 의해 후원되는 평가판 (partial name match, e.g. "Pfizer"의 특징 "Pfizer Inc")에 대한 의견 상태, 단계 및 상태에 의해 선택적으로 좁은. 스폰서의 총 수에 대한 count_total 설정. page_token 페이지.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `sponsor_name` | 문자열 | **필수** |
| `condition` | 문자열 | 옵션 정보 |
| `phase` | 문자열 배열 | 옵션 정보 |
| `status` | 문자열 배열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 1000 |
| `page_token` | 문자열 | 옵션 정보 |
| `count_total` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

상태, 기관, 위치 또는 investigator_name에 의한 주요 조사 및 연구 사이트 찾기. 현장 시설의 기관 필터 및 위치에 대한 우선 사항이 있습니다. investigator_name은 전체 공식 이름과 책임있는PartyInvestigatorFullName을 검색합니다. 사이트로 돌아가기 (이름, 역할, 소속, 시설, 도시) 시험 NCT ids로. page_size 캡 많은 평가판이 스캔되는 방법.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `condition` | 문자열 | 옵션 정보 |
| `institution` | 문자열 | 옵션 정보 |
| `location` | 문자열 | 옵션 정보 |
| `investigator_name` | 문자열 | 옵션 정보 |
| `status` | 문자열 배열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

분석 1 차 / 2 차 / 기타 결과 측정 (endpoints). ONLY nct_id (단일 트리알 모드) 또는 조건 (시험 전반에 걸쳐 총 모드); 둘 다 주어진 경우에, nct_id는 precedence를 가지고 갑니다. 총계 형태는 단계와 start_date_after (YYYYY-MM-DD)에 의해 좁힐 수 있고 page_size 예심까지 검사합니다. endpoint lists plus 분석 된 평가판의 가장 일반적인 측정 이름을 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `nct_id` | 문자열 | 옵션 정보 |
| `condition` | 문자열 | 옵션 정보 |
| `phase` | 문자열 배열 | 옵션 정보 |
| `start_date_after` | 문자열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 50; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

환자의 매칭. 상태가 설정되지 않는 한 RECRUITING 시험에 대한 DEFAULTS. min_age 또는 max_age 중 하나 환자 연령 ( "65 년", "6 개월"); 두 시험 연령 경계가 검사됩니다. 둘 다 공급되는 경우에, 예심은 전체 환자 나이 간격을 인정해야 합니다. Missing Trial age는 제한되지 않습니다. 성 MALE/FEMALE는 모든 상품 예심을 포함합니다; 모든 또는 omitted 성은 성 필터를 적용하지 않습니다. eligibility_keywords는 포함/외환 표준 텍스트를 검색합니다 (예: "HbA1c > 8", "BRCA mutation", "ECOG 0-1"). 상태의 적어도 하나, eligibility_keywords, min_age, max_age 또는 성은 요구됩니다. page_token 페이지.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `condition` | 문자열 | 옵션 정보 |
| `eligibility_keywords` | 문자열 | 옵션 정보 |
| `min_age` | 문자열 | 옵션 정보 |
| `max_age` | 문자열 | 옵션 정보 |
| `sex` | 문자열 | 선택 사항; 모델 번호: "ALL", "MALE", "FEMALE" |
| `status` | 문자열 배열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 1000 |
| `page_token` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## 임상 Genomics {/* #family-8 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

ClinGen 유전자 배제 유효성 치료 (그런 증거는 유전자의 변형이 질병을 유발한다는 것입니다. Definitive/Strong/Moderate/Limited/Disputed/Refuted/No Known Disease Relationship). 모든 3,600+ 커미션을 나열하는 Omit 유전자.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

ClinGen 노출량 감도 치료: 유전자 (선택적으로 ISCA genomic/CNV 지구)를 위한 haploinsufficiency와 triplosensitivity assertions. 유전자 기호 또는 ISCA 지역 ID 필터 정확히; 전체 테이블에 대 한 omit.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | 옵션 정보 |
| `include_regions` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

ClinGen 임상 작용성 치료 : 유전자와 관련된 장애는 사전 증상 캐리어의 초기 개입이 행동 할 수 있는지 여부 (단기, 성관계, 성관계, 효과, 성격의 발명 구성 요소 점수 및 총 점수와 함께 발명 / 외침 쌍). Gene filter는 다중화 주제의 회원과 일치합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | 옵션 정보 |
| `context` | 문자열 | 선택 사항; 기본: "both"; koum: &#91;"adult", "pediatric", "both"&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

ClinGen Evidence Repository (ERepo) 전문가 패널 변종 병원성 분류 (ACMG 기준의 VCEP 해석). 유전자 (HGNC 기호)의 EXACTLY ONE을 제공, caid (ClinGen canonical allele id, e.g. CA114360), 또는 hgvs (예를들면. NM_000277.2:c.1222C>T). 완전한 retrieval (matchLimit=none).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | 옵션 정보 |
| `caid` | 문자열 | 옵션 정보 |
| `hgvs` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

정확한 Entrez 기호에 의한 CIViC 유전자 레코드를 찾습니다 (예 : "BRAF"). 완전히 paginated, 카운트 인증. 반환된 CIViC 유전자 ID를 civic_gene_variants로 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `entrez_symbol` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

CIViC 유전자의 모든 변형 (CIViC 유전자 id에 의해), 완전히 질화 - 수백 가지 변형으로 유전자를 완료합니다. 변형 ID로 분류.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_id` | 정수 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

CIViC 변종 id (aliases, 변형 유형, 기능/진 링크, 유전자 변종에 대한 좌표)에 의해 하나의 CIViC 변종. 반환 find=false if absent.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `variant_id` | 정수 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

name substring (e.g.에 의한 CIViC 변형 검색 "V600")는 CIViC 유전자 ID에, 선택적으로 배열했습니다. 완전히 paginated; 변종 id에 의해 정렬.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `name` | 문자열 | **필수** |
| `gene_id` | 정수 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

1 CIViC 증거 항목 id : 질병 / 치료 컨텍스트의 분자 프로파일의 임상 중요성 (예 : 레벨 A-E, 유형, 방향, 중요성, 등급, 질병, 치료, 소스). 반환 find=false if absent.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `evidence_id` | 정수 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

필터의 조합으로 CIViC 증거 항목 검색; 완전히 paginated, 계산 검증, ascending 증거 ID에 의해 분류. Enum 필터는 CIViC GraphQL enum 값 verbatim (evidence_level "A".."E"를 가지고 갑니다; evidence_type PREDICTIVE&#124;프로그래틱&#124;디에이치틱&#124;PREDISPOSING&#124;ONCOGENIC&#124;FUNCTIONAL; evidence_direction 지원&#124;DOES_NOT_SUPPORT; 상태입력&#124;SubmitTED&#124;REJECTED&#124;ALL). 적어도 하나의 필터 제공 - 필터는 전체 10k + corpus를 걸 수 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `disease_name` | 문자열 | 옵션 정보 |
| `therapy_name` | 문자열 | 옵션 정보 |
| `evidence_level` | 문자열 | 옵션 정보 |
| `evidence_type` | 문자열 | 옵션 정보 |
| `evidence_direction` | 문자열 | 옵션 정보 |
| `significance` | 문자열 | 옵션 정보 |
| `variant_origin` | 문자열 | 옵션 정보 |
| `evidence_rating` | 정수 | 옵션 정보 |
| `status` | 문자열 | 옵션 정보 |
| `molecular_profile_name` | 문자열 | 옵션 정보 |
| `molecular_profile_id` | 정수 | 옵션 정보 |
| `variant_id` | 정수 | 옵션 정보 |
| `disease_id` | 정수 | 옵션 정보 |
| `therapy_id` | 정수 | 옵션 정보 |
| `phenotype_id` | 정수 | 옵션 정보 |
| `source_id` | 정수 | 옵션 정보 |
| `assertion_id` | 정수 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

1 CIViC assertion by id: 전문 치료 요약 주장 (AMP/ASCO/CAP 계층, ACMG/ClinGen 코드, FDA 동반자 테스트 플래그) 질병/치료 컨텍스트의 분자 프로파일에 대한 증거를 집계. 반환 find=false if absent.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `assertion_id` | 정수 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

필터의 조합으로 CIViC assertions 검색; 완전히 paginated, 계산 검증, ascending assertion id에 의해 분류. assertion_type PREDICTIVE&#124;PROGNOSTIC&#124;디에이티브&#124;PREDISPOSING&#124;ONCOGENIC; assertion_direction 지원&#124;DOES_NOT_SUPPORT; amp_level 예 TIER_I_LEVEL_A;에 대하여 상태입력&#124;SubmitTED&#124;REJECTED&#124;ALL. 필터가 전체 corpus를 걸 수 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `disease_name` | 문자열 | 옵션 정보 |
| `therapy_name` | 문자열 | 옵션 정보 |
| `assertion_type` | 문자열 | 옵션 정보 |
| `assertion_direction` | 문자열 | 옵션 정보 |
| `significance` | 문자열 | 옵션 정보 |
| `amp_level` | 문자열 | 옵션 정보 |
| `status` | 문자열 | 옵션 정보 |
| `molecular_profile_name` | 문자열 | 옵션 정보 |
| `molecular_profile_id` | 정수 | 옵션 정보 |
| `variant_id` | 정수 | 옵션 정보 |
| `variant_name` | 문자열 | 옵션 정보 |
| `disease_id` | 정수 | 옵션 정보 |
| `therapy_id` | 정수 | 옵션 정보 |
| `phenotype_id` | 정수 | 옵션 정보 |
| `evidence_id` | 정수 | 옵션 정보 |
| `summary` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

1 CIViC 분자 프로파일 id (증명 / 보조 첨부 파일), incl. 이름, 점수 및 구성 요소 변형. 반환 find=false if absent.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mp_id` | 정수 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

name substring (e.g.)에 의한 CIViC 분자 프로파일 검색 "BRAF V600E"). 완전히 paginated; id에 의해 정렬.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `name` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

이름 substring (e.g.에 의해 CIViC 질병 기록 검색 "melanoma"). DOIDs + 표시 이름 반환; 완전히 paginated; id에 의해 정렬.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `name` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

Name substring (e.g.)에 의한 CIViC 치료 기록 검색 "vemurafenib"). NCIt ids + 이름을 반환; 완전히 paginated; id에 의해 정렬.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `name` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

Open Targets Platform API (targets, 질병, 약, 표적 질병 협회 점수, 증거, 견인력, 안전, 알려진 약물)에 대한 중재 GraphQL 쿼리를 실행하십시오. schema discovery에 대한 소개 쿼리 작업. Note knownDrugs는 drugAndClinicalCandidates 업스트림으로 이름을 변경했습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `variables` | 객체 | 옵션 정보 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

질병 (열려있는 대상 플랫폼)에 대한 알려진 / investigational 약 - 질병 포장.drugAndClinicalCandidates. efo_id는 질병 투과 id (EFO/MONDO/etc., e.g.입니다. "MONDO_0004992").

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `efo_id` | 문자열 | **필수** |
| `size` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

질병에 대한 상위 관련 목표, Open Targets 전체 협회 점수에 의해 순위 — Wraps Disease.associatedTargets. efo_id는 질병 투과 id (EFO/MONDO/etc.)입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `efo_id` | 문자열 | **필수** |
| `size` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

ChEMBL id (Open Targets Platform)의 약물 세부 사항 - 이름, 유형, 최대 임상 단계 및 행동 메커니즘 (target + 행동 유형). chembl_id 예 "CHEMBL1201583" 니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `chembl_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## 구조 & 관련 기사 {/* #family-9 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

Fetch는 EMDB cryo-EM 3D 맵 항목에 대한 메타 데이터 레코드를 구조화했습니다. 'EMD-1234', 'emd-1234'로 액세스 권한을 수락 또는 ' 1234'. 각 기록은 제목, 구조 결정 방법 (singleParticle/helical/tomography/subtomogramAveraging/ElectronCrystallography)를, Angstrom에 있는 해결책 나르고십시오 (보고한 해결책, 예를들면 입장을 위한 null. 원시 tomograms) 및 해결책 방법, deposition/release 날짜, 표본 및 macromolecule/supramolecule 이름, 적합했던 PDB 모형 ID (모델이 적합할 때 빈 명부), 1 차적인 인용 (주, 년, 첫번째 저자, DOI, PMID), 지도 차원 및 voxel 크기 및 상태. 사용하지 않는 항목 보고서 is_obsolete=true 플러스 superseded_by 액세스. 알려진 액세스는 &#123;"emdb_id", "error"로 돌아옵니다: "not_found"&#125; — 결코 조용히 떨어졌다. Metadata만; 맵 볼륨은 다운로드되지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `emdb_ids` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

Solr-style 쿼리와 EMDB 검색; 컴팩트 한 행의 완전한 페이지를 retrieval. 쿼리 예제: 'title:"apoferritin" 해결책: 1.5에 &#91;0&#93; ', 'structure_determination_method: "singleParticle"', 'current_status: "REL" 그리고 release_date:&#91;2024-01-01T00:00:00Z에 &#42;&#93;'. Args: 쿼리 (Solr 쿼리 문자열); max_rows (마력 캡, 기본 1000). 반환 num_found_released (API's 자체 릴리스 기반 조사에서 facet 경로 — 지상 진실), rows_retrieved, rows_by_status (REL 대 OBS — 검색 경로는 사용되지 않은 항목을 반환하지만 그들은 릴리스로 계산되지 않습니다), released_complete (true iff 모든 릴리스 일치는 검색되었습니다; false는 max_rows가 스위프트 또는 카운트가 불명하게 함), 그리고 레코드를 truncated : EMD 액세스에 의해 분류 된 컴팩트 한 per-entry 행 (emdb_id, 제목, 해상도, structure_determination_method, current_status, release_date, fitted_pdbs).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `max_rows` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

EMDB 항목에 대한 자세한 메타 데이터 섹션을 Fetch하십시오. 섹션: 'publications' — 완전한 주문한 저자 명부, 보조 인용, 외부 참고 (PMID/DOI/ISSN/CSD);를 가진 1 차적인 인용 '지도' - 파일, 형식, 데이터 유형, 치수, 구명 간격, 기원, 축 순서, 세포, 구명 통계, 윤곽 레벨, 표학; ' 샘플' — per-macromolecule 레코드 (타입, 분자 무게, 복사, EC 번호, 소스 생물 + NCBI 택시, 시퀀스 크로스 레프) 및 per-supramolecule 레코드; 'imaging'에 대 한 - 현미경, 전압, 전자 소스, 검출기, 복용량, 화상 진찰 형태, defocus 범위, 확대, Cs, cryogen, 격자/buffer/vitrification 조건 (microscopy 회의 당 1개의 기록 - 항목은 몇몇을 나르는 수 있습니다). Args: emdb_ids (액세서리 목록, EMD-1234/emd-1234/1234)의 무엇이든; 섹션 (행물 /지도 / 샘플 / 노화 중 하나). 알려진 액세스는 "error" : "not_found"로보고됩니다. emdb_get_entries을 처음 사용하면 헤드 라인 레코드 만 필요합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `emdb_ids` | 문자열 배열 | **필수** |
| `section` | 문자열 | **필수**; koum: &#91;"publications", "map", "sample", "imaging"&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

EMDB 항목에 대한 Fetch numeric validation-analysis 메트릭. 항목 당 (EMDB /analysis 경로에서) : Q-score, 원자 포함, 권장 / 예측 /rawmap 윤곽 레벨, 모델 / 마스크 볼륨, 모델지도 비율, 표면 메트릭스 - 유효성 파이프라인이 그들을 계산 한 곳. available_blocks은 모든 블록의 유효성 검사를 반환합니다. sparse payloads (tomograms, model-free 또는 과거 항목)는 null을 명시했습니다. 검증 분석 보고서 has_validation_analysis=false - 결코 침묵하지 않고.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `emdb_ids` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

CPX 액세스에 의해 Fetch curated Complex Portal 레코드. 각 기록 : 복잡한 AC, 권장 / 체계적인 이름 + 동의어, 종 및 택시, 스니치오메트리 (분 / 최대 사본), 생물학적 역할 및 상호 작용자 유형, 증거 ECO 코드, GO annotations 및 크로스 환경 - 안정적인 매크로 분자 복합의 수동 curated 설명. 기록은 입력 순서에서 뒤로 옵니다; 알 수없는 액세스는 `not_found`에 거의 침묵하지 않고 나열됩니다. 이진 상호 작용 *이름 &#42;* (이 실험에서 누가 바인딩) 대신 intact_&#42; 도구를 사용합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `complex_acs` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

분자를 포함하는 복합물 검색 Complex Portal. `accession`은 참가자 액세스입니다 - UniProt (e.g. 'P04637'), ChEBI, 또는 RNAcentral. participants_only=true (기본값)로 검색은 field-qualified (pxref:&lt;accession>)이므로 실제로 curated participant로 분자를 포함시키는 복합체 만 반환됩니다. false로 bare accession은 무료 텍스트도 일치합니다 (문서, 이름), over-reports하지만 언급을 잡을 수 있습니다. 모든 결과 페이지는 검색되고 행 카운트는 서비스 허가 총 (total_reported == total_retrieved 또는 전화가 크게 실패)에 대해 확인됩니다. Hits는 컴팩트 한 레코드 (complex_ac, 이름, 종, 상호 작용기) 복잡한 접근으로 분류; complexportal_get_complexes과 함께 전체 세부 사항을 fetch합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |
| `participants_only` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

모든 IntAct 바이너리 상호 작용을 검색, MI-score 필터링. `query`은 UniProt 액세스입니다 (예 :. 'P04637'), 유전자 기호, 무료 텍스트 또는 IntAct Solr 쿼리. Retrieval은 서버가 전체(n_records == total_elements, 또는 FAILS LOUDLY)에 대해 확인된 완전한 paginated 스윕입니다. min_mi_score/max_mi_score 필터 서버 측 IntAct MI 신뢰 점수 (0.45는 일반적인 중간 confidence 바닥입니다); 종 이름 또는 택시로 interactor_species 필터 (예 : g. &#91;"Homo sapiens"&#93; 또는 &#91;" 9606"&#93;). 기록은 호리하고 구조화됩니다 : 상호 작용기 쌍 (IntAct ACs, 데이터베이스 식별자, 분자 이름, 종 / 세금), 상호 작용 유형, 검출 방법 (+MI id), 실험 역할, 호스트 생물, MI 점수, PubMed id, 첫 번째 저자, 소스 데이터베이스 - DESCENDING MI 점수에 의해 분류. 대부분의 max_records_returned 레코드에서 출력 목록 (records_truncated=true 전체 검증된 스윕이 더 크었을 때; n_records는 항상 진실한 합계를 보고합니다. 큰 쿼리 (e.g. CFTR ~10k 상호 작용)는 동안 좁습니다 — min_mi_score 또는 종으로 가능한 경우.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `min_mi_score` | 숫자 | 선택 사항; 기본: 0 |
| `max_mi_score` | 숫자 | 선택 사항; 기본: 1 |
| `interactor_species` | 문자열 배열 | 옵션 정보 |
| `max_records_returned` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

IntAct 상호 작용기 기록 (s)에 분자를 해결하십시오. `query`은 UniProt 액세스, 유전자 기호 또는 IntAct 상호 작용기 AC (예를들면)입니다. 'EBI-7090529'). 명시된 n_matches와 일치하는 모든 상호 작용기 레코드를 반환합니다. UniProt 액세스는 canonical Protein plus chain/isoform 상호 작용기로 해결할 수 있으며이 도구는 결코 침묵으로 하나를 선택하지 않습니다. 각 기록 : interactor_ac, preferred_identifier, 이름, 종, 택시, interactor_type 및 IntAct에 의해 본 interaction_count (intact_fetch_interactions 스윕을 대체).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

1개의 IntAct 상호 작용 AC (e.g.를 위한 가득 차있는 curated 세부사항 'EBI-15635490'). 상호 작용 유형, 호스트 유기체, 검출 방법, 간행, 상호 참조, annotations, kinetic/affinity 매개변수 및 신뢰, 플러스 per-participant 기록 (identifier, 종, 생물학 및 실험적인 역할, participant 탐지 방법) include_participants=false 없는. intact_fetch_interactions 레코드 (interaction_ac 필드)에서 상호 작용 AC를 가져옵니다. 알 수없는 ACs 반환 &#123; interaction_ac, 오류: 'not_found' &#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `interaction_ac` | 문자열 | **필수** |
| `include_participants` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

씨앗 단백질 주변의 깊이-1 IntAct 상호 작용 네트워크 구축. `seed_accessions`은 UniProt 액세스입니다. 단계 1: 완전한, 종자 당 측정한 MI-score-filtered 상호 작용 청소. 단계 2 : 모든 씨앗 가장자리의 파트너와 씨앗은 노드 세트를 형성합니다. 단계 3 : 파트너 파트너 파트너 인 내장은 파트너에게 자신을 쿼리하여 발견 할 수 있으므로 max_interactors_expanded 파트너가 queried (최초 연결, 식별자에 의한 관계) 및 노드 세트 내부의 BOTH 엔드 포인트와 가장자리가 유지됩니다. 확장 블록은 파트너가 / 확장되지 않은 정확히보고 (expansion.complete=false는 더 많은 파트너 파트너 파트너 인 Edge가 존재 할 수 있음). 출력 : 노드, 가장자리 (MI 점수, 감지 방법, PubMed id), 퍼시드 스위츠 통계. 몇 가지와 min_mi_score > = 0.45를 유지하십시오. 모든 확장은 전체 질의 스윕입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `seed_accessions` | 문자열 배열 | **필수** |
| `min_mi_score` | 숫자 | 선택 사항; 기본: 0.45 |
| `max_interactors_expanded` | 정수 | 선택 사항; 기본: 25 |
| `interactor_species` | 문자열 배열 | 옵션 정보 |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

속성 필터로 RCSB PDB 항목을 검색; , 모자를 씌우는 + 끌기. 모든 필터와 함께; 적어도 하나 요구됩니다. `text`는 가득 차있 원본 relevance 조회 ('p53 DNA 바인딩 domain')입니다; `organism`는 정확한 근원 조직 선량 이름입니다 ('Homo sapiens' — 어떤 선량 수준에 일치, 그래서 'Eukaryota' 일도); `taxonomy_id` NCBI 택시 (9606); `uniprot_accession`은 UniProt ('P04637')에 폴리머 엔티티티티 맵이 있는 항목을 찾습니다. -> 각 p53 구조); `experimental_method` PDB 구급차입니다 ('X-RAY 다이필레이션'· '전자 MICROSCOPY'· '솔루션 NMR', ... — case-insensitive, 전체 목록으로 알려진 값 오류); `max_resolution_angstrom`는 그 해결책의 밑에 또는 입장을 지킵니다; `ligand_comp_id`는 화학 COMP ID ('ZN', 'ATP', 'HEM')에 의해 경계 비합성 성분을 요구합니다. include_computed_models=true는 computed 구조 모형을 추가합니다 (예를들면. AlphaFold) 기본 실험 결과에. total_count (API's는 총을 소유합니다 — 지상 진실), n_retrieved, truncated (true iff total_count > n_retrieved; max_rows, 1..1000, 캡 리트리발) 및 리빙 주문에서 &#91;&#123;pdb_id, score&#125;&#93;를 기록합니다. Identifiers only — 메타데이터를 위한 pdb_get_structures에 체인.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `text` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `taxonomy_id` | 정수 | 옵션 정보 |
| `uniprot_accession` | 문자열 | 옵션 정보 |
| `experimental_method` | 문자열 | 옵션 정보 |
| `max_resolution_angstrom` | 숫자 | 옵션 정보 |
| `ligand_comp_id` | 문자열 | 옵션 정보 |
| `include_computed_models` | 불리언 | 선택 사항; 기본값: false |
| `max_rows` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

PDB 항목 (배치, 최대 25 ids)에 대한 Fetch Entry-level summaries. 4-character PDB ids를 어떤 경우에든 받아들이십시오 (' 1tup' == ' 1TUP'; 중복은 복제됩니다. 각 기록: 제목, 실험 방법, Angstrom의 해결책 (하나 없는 방법, e.g. NMR), 결심 방법론 (수직 대 computational), 예금/출판/출판 날짜 및 상태, 분자 무게 (kDa), 집합 및 법인 조사 (단백/DNA/RNA 중합체 + 비폴리머), 경계 ligand chem-comp ids, 중합체/비합성 ID 명부 (를 위한 입력) pdb_get_entities / / / pdb_get_ligands), 및 1 차 인용 (제목, 저널, 년, 저자, PubMed ID, DOI). 알려진 아이는 &#123;"pdb_id", "error"로 돌아옵니다: "not_found"&#125; — 결코 조용히 떨어졌다. Metadata만; 좌표 파일은 절대로 다운로드되지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pdb_ids` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

1개의 PDB 입장을 위한 중합체 법인 세부사항, incl. UniProt 매핑. 으로 entity_ids=null 항목의 모든 폴리머 엔터티가 fetched, capped at 25 truncated=true와 n_polymer_entities가 입력한 후's true count (Ribosomes 같이 큰 집합은 나릅니다 50+ — 전체 ID 목록을 가져옵니다 pdb_get_structures' polymer_entity_ids과 같은 명시된 하위 세트가있는 페이지 &#91;" 26", " 27"&#93;); 명시된 entity_ids과 함께 항목 총을 fetched하지 않습니다. n_polymer_entities는 null입니다. 25 오류보다 더 큰 명시적 인 entity_ids 목록. 각 기록: 묘사, 중합체 유형 (Protein/DNA/RNA), 순서 길이, mutation 조사, 증착된 사본, 사슬 ids (asym + 저자), 과세를 가진 근원 유기물, per-entity 순서 적용 (SIFTS)를 가진 UniProt 접근, 및 UniProt 정렬한 지구 (entity-seq 대 참고 sq 협조). 알려진 엔티티티 ids는 not_found에 나열되어 있습니다. 알 수없는 항목 ID 오류. include_sequences=true는 조직 당 canonical 1-letter 순서를 추가합니다; 결합된 순서가 max_bytes (과태 400000)를 초과하는 경우에 그들은 omitted이고 sequences_omitted는 왜 — metadata가 항상 살아남는지 설명합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pdb_id` | 문자열 | **필수** |
| `entity_ids` | 문자열 배열 | 옵션 정보 |
| `include_sequences` | 불리언 | 선택 사항; 기본값: false |
| `max_bytes` | 정수 | 선택 사항; 기본: 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

Bound ligands (nonpolymer 구성 요소)의 1 PDB 항목, 화학. 엔트리's 비폴리머 엔티티티를 걸어 각 화학 성분을 해결합니다. 리간드 - 엔티티티드 ID, 화학 COMP ID ('ZN', 'ATP'), 설명, 증착된 복사 수, 저자 체인 ids 및 chem_comp 블록 (이름, 공식, 공식 무게, 형식적 충전, 구성 요소 유형, InChIKey, 스테레오 SMILES). 물은 PDB 자료 모형에 있는 nonpolymer entities가 아니고 결코 나타나지 않습니다. ligands 반환 ligands에 대한 항목 : &#91;&#93;. n_nonpolymer_entities 는 엔트리's 진정한 카운트입니다. max_ligands을 초과할 때 truncated=true (1..25에 클램핑 됨) - 결코 조용히 떨어졌다. 엔티티티 / 구성 요소 데이터 API 더 이상 봉사는 "error" : "not_found"와 인라인으로보고되지 않습니다 (출발되지 않은 부분). 알 수없는 항목 ID 오류.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pdb_id` | 문자열 | **필수** |
| `max_ligands` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

AlphaFold DB 1개의 UniProt 접근을 위한 예측 구조 메타데이터. has_model, n_models 및 per-model 레코드를 반환합니다. 단일 액세스는 Google DeepMind 모노머 파이프라인을 넘어 여러 모델 (캐논ical + isoforms 같은 'P04637-9', 커뮤니티 제공 업체를 수행 할 수 있습니다 - provider_id / tool_used 그들을 식별). 각 모델: 입력 ID, UniProt 주석 (id, description, gene, Biological, taxid, reviewed flag), 순서 좌표 및 길이, 글로벌 pLDDT (global_plddt· 0- - -100) pLDDT 신뢰 궤 당 잔류물의 분수 플러스 (very_low &lt; 50, 낮은 50- - -70, 자 70- - -90· very_high > 90), 모델 버전 정보 및 생성 날짜, 및 다운로드 URL (cif/bcif/pdb 좌표, PAE JSON + 이미지, per-residue pLDDT JSON, MSA, 알파미센스 CSV 어디서 사용 가능) - URL 만, 페이로드는 다운로드되지 않습니다; 필요한 경우 스스로를 잡아라. 예측 반환없이 액세스 has_model=false ( 오류 없음); 변형된 식별자는 명시된 `error` 필드를 반환합니다. include_sequence=true는 모형 순서 (단백 하나 letter)를 추가합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `uniprot_accession` | 문자열 | **필수** |
| `include_sequence` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

배치 AlphaFold DB 적용 검사 (최대 40 고유 UniProt 액세스). 빈 항목 및 중복은 배치 캡이 적용되기 전에 벗겨지고 공개 : n_requested == n_unique + n_blank_skipped + n_duplicate_skipped 항상 reconciles. 입력 순서에서 유일한 접근 당 1개의 조밀한 기록: has_model, n_models 및 1 차 (첫째로 목록으로 만들어지는) model's model_entity_id, latest_version, global_plddt 및 sequence_length. 예측 보고서 has_model=false가없는 액세스; 변형 된 것들은 명시적 인 `error` 필드를 수행 - 결코 침묵적으로 떨어졌다. 세트의 단백질이 alphafold_get_prediction과 함께 전체 레코드를 끌어 당기 전에 예측 가능한 구조가 있음을 삼는 데 사용됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `uniprot_accessions` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## 주 메뉴 {/* #family-10 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `compound_search` {/* #compound_search */}

이름 (과태), ChEMBL ID, 또는 분자 구조에 의해 ChEMBL 화학 화합물을 검색하십시오. name: case-insensitive synonym substring match (더 선호 이름 일치로 돌아가십시오). chembl_id에 의하여: 직접적인 기록 보기. 미소로: similarity_threshold이 설정될 때 Tanimoto 유사성 검색, 다른 하위 구조 검색 (구조 산책은 캡핑되어 walk_truncated/upstream_total)를 공개합니다. 임상 단계별 max_phase 필터 선택. 이름, chembl_id 또는 미소 중 적어도 하나를 통과하십시오. drug_search 대신 치료 표시에 의해 검색 할 때.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `name` | 문자열 | 옵션 정보 |
| `chembl_id` | 문자열 | 옵션 정보 |
| `smiles` | 문자열 | 옵션 정보 |
| `similarity_threshold` | 정수 | 선택 사항; 최소: 70; 최대: 100 |
| `max_phase` | 정수 | 선택 사항; 크기: 0, 1, 2, 3, 4 |
| `limit` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

치료 표시 (EFO 용어, 부분 일치)에 의해 승인 된 의약품 및 임상 후보를 검색하십시오. drug_indication 행에 따라 다른 모체 분자에 들어가고, 그 후 분자 레코드와 인출/블랙 박스 경고로 이동합니다. only_approved은 4을 상속합니다. 선택된 포스트 필터 molecule_chembl_id, drug_name (preferred-name substring) 및 max_phase (>=)는 결합된 세트를 좁힙니다. 이름/id/structure lookups를 위한 compound_search를 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `indication` | 문자열 | **필수** |
| `drug_name` | 문자열 | 옵션 정보 |
| `molecule_chembl_id` | 문자열 | 옵션 정보 |
| `max_phase` | 정수 | 선택 사항; 크기: 0, 1, 2, 3, 4 |
| `only_approved` | 불리언 | 선택 사항; 기본값: false |
| `limit` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

ChEMBL은 1개의 분자 (ALogP, 분자량, PSA, HBA/HBD, rotatable 유대, 방향성 반지, 무거운 원자, 규칙의 5 위반, 규칙의 3 통행, QED의 분자 공식)의 약 유사성/ADMET 평가를 위한 분자 재산을 산출했습니다. 이들은 구조에서 계산되어 실험적인 측정이 아닙니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `molecule_chembl_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

화합물 표적 상호 작용을 위한 ChEMBL bioactivity 측정 (IC50, Ki, Kd, EC50, ...)를 만회하십시오. molecule_chembl_id 및 / 또는 target_chembl_id, activity_type (standard_type), pChEMBL 바닥 (min_pchembl), standard_value 범위 (min_value / max_value) 및 단위 (standard_units) 필터. activity_id에 의해 주문 한 페이지를 가장 많은 요약으로 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `molecule_chembl_id` | 문자열 | 옵션 정보 |
| `target_chembl_id` | 문자열 | 옵션 정보 |
| `activity_type` | 문자열 | 선택 사항; 모델 번호: "IC50", "EC50", "Ki", "Kd", "AC50", "GI50", "ED50", "Potency" |
| `min_pchembl` | 숫자 | 선택 사항; 최소: 0; 최대: 14 |
| `min_value` | 숫자 | 옵션 정보 |
| `max_value` | 숫자 | 옵션 정보 |
| `unit` | 문자열 | 선택 사항; 크기: "nM", "uM", "mM", "pM", "M" |
| `limit` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

승인 된 의약품 및 임상 후보에 대한 ChEMBL 메커니즘의 반응 레코드를 검색합니다. molecule_chembl_id, target_chembl_id 및/또는 action_type에 의해 필터링. 분자 ID는 아무것도 수율 할 때, 부모 분자에 대한 retries so salt-form ids 해결. mec_id에 의해 주문 한 페이지가 액션 유형 요약으로 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `molecule_chembl_id` | 문자열 | 옵션 정보 |
| `target_chembl_id` | 문자열 | 옵션 정보 |
| `action_type` | 문자열 | 선택 사항; 한국어 (ko)"채용 정보"· "제품정보"· "회사연혁"· "블럭러"· "모듈"· "(주)이엔텍"· "ACTIVATOR 소개"· "POSITIVE ALLOSTERIC 모듈"· "NEGATIVE ALLOSTERIC 모듈"· "관련 기사"· "채용 정보"· |
| `limit` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

검색 ChEMBL 생물학 대상 (단백, 복합체, 가족, 유기체). target_chembl_id, gene_symbol (exact Components-synonym match), target_name (preferred-name substring), 유기 (substring) 및 / 또는 target_type에 의한 필터. 각 결과는 UniProt Accessions, gene_symbol 및 교차 설정 목록과 함께 구성 요소를 운반합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `target_name` | 문자열 | 옵션 정보 |
| `gene_symbol` | 문자열 | 옵션 정보 |
| `target_chembl_id` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `target_type` | 문자열 | 선택 사항; 한국어 (ko)"SINGLE 프로틴"· "프로틴 COMPLEX"· "PROTEIN 가족"· "오존스M"· "팟캐스트"· "CELL 라인"· "NUCLEIC-ACID의 특징"· "수탁업체"· |
| `limit` | 정수 | 선택 사항; 기본: 20; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## BioRxiv 소개 {/* #family-11 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `get_categories` {/* #get_categories */}

모든 27 BioRxiv 주제 카테고리 및 API 호환 슬러그 (예를들면) "cancer 생물학" -> "cancer_biology"). search_preprints 이전에 사용해서 유효한 카테고리 값을 발견하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

검색 bioRxiv/medRxiv preprints 로 날짜와 (선택) 카테고리. 정확히 하나의 검색 방법을 사용합니다: date_from+date_to, recent_days (마지막 N 일), 또는 recent_count (90 일 창 내에서 가장 최근의 N); 아무도, 마지막 60 일. 키워드/텍스트 검색이 없습니다. cursor 질. DOI, 제목, 저자, 날짜, 범주, 버전 및 200-char 요약 미리보기를 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `server` | 문자열 | 선택 사항; 기본: "biorxiv"; koum : &#91;"biorxiv", "medrxiv"&#93; |
| `category` | 문자열 | 선택 사항; 한국어 (ko)"동물의 행동과 인식"· "바이오화학"· "Bioengineering의 장점"· "생물 정보학"· "생명 물리학"· "암 생물학"· "세포 생물학"· "임상시험"· "개발 biology"· "학회소개"· "학회소개"· "진화 생물학"· "학회소개"· "genomics의 장점"· "면역학"· "미생물학"· "분자 생물학"· "신경 과학"· "고추학"· "학회소개"· "약리학 및 독성학"· "생리학"· "식물 생물학"· "과학 통신 및 교육"· "합성 생물학"· "시스템 생물학"· "zoology의"· |
| `date_from` | 문자열 | 옵션 정보 |
| `date_to` | 문자열 | 옵션 정보 |
| `recent_days` | 정수 | 선택 사항; 최소: 1 |
| `recent_count` | 정수 | 선택 사항; 최소: 1 |
| `limit` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 100 |
| `cursor` | 정수 | 선택 사항; 기본: 0; 최소: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

DOI (bare " 10.1101/..." 또는 전체 [https://doi.org/](https://doi.org/) URL). 최신 버전 사용. 제목, 저자, 해당 저자 + 기관, 전체 추상, 범주, 라이센스, 버전, JATS XML, 자금, 출판 저널 DOI (연결되는 경우), PDF 및 웹 URL 및 버전 카운트를 반환합니다. Preprints는 동료 리뷰가 아닙니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `doi` | 문자열 | **필수** |
| `server` | 문자열 | 선택 사항; 기본: "biorxiv"; koum : &#91;"biorxiv", "medrxiv"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

나중에 피어드리스 저널 (preprint ->)에서 출판 된 사전 인쇄물을 찾으십시오. 학술 링크). search_preprints (date_from+date_to/recent_days/recent_count)와 같은 1개의 검색 방법. include_details=false는 컴팩트한 요약을 반환합니다. 저널 DOI 접두사 필터 (예 : g. "10.1038" 자연을 위해) bioRxiv 전용 /publisher 노선을 통해.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `server` | 문자열 | 선택 사항; 기본: "biorxiv"; koum : &#91;"biorxiv", "medrxiv"&#93; |
| `publisher` | 문자열 | 옵션 정보 |
| `include_details` | 불리언 | 선택 사항; 기본값: true |
| `date_from` | 문자열 | 옵션 정보 |
| `date_to` | 문자열 | 옵션 정보 |
| `recent_days` | 정수 | 선택 사항; 최소: 1 |
| `recent_count` | 정수 | 선택 사항; 최소: 1 |
| `limit` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 100 |
| `cursor` | 정수 | 선택 사항; 기본: 0; 최소: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

ROR id (9-char, e.g.에 의해 확인 된 펀처를 태우십시오. " 021nxhr62"의 NIH를 위해; 전체 [https://ror.org/](https://ror.org/) URL도 허용됩니다. 명시된 date_from + date_to를 요구합니다; 펀처 메타데이터는 2025-04-10를 시작합니다. 옵션 카테고리 필터. cursor 질. search_preprints과 같은 컴팩트한 결과 모양.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `funder_ror_id` | 문자열 | **필수** |
| `date_from` | 문자열 | **필수** |
| `date_to` | 문자열 | **필수** |
| `server` | 문자열 | 선택 사항; 기본: "biorxiv"; koum : &#91;"biorxiv", "medrxiv"&#93; |
| `category` | 문자열 | 선택 사항; 한국어 (ko)"동물의 행동과 인식"· "바이오화학"· "Bioengineering의 장점"· "생물 정보학"· "생명 물리학"· "암 생물학"· "세포 생물학"· "임상시험"· "개발 biology"· "학회소개"· "학회소개"· "진화 생물학"· "학회소개"· "genomics의 장점"· "면역학"· "미생물학"· "분자 생물학"· "신경 과학"· "고추학"· "학회소개"· "약리학 및 독성학"· "생리학"· "식물 생물학"· "과학 통신 및 교육"· "합성 생물학"· "시스템 생물학"· "zoology의"· |
| `limit` | 정수 | 선택 사항; 기본: 10; 최소: 1; 최대: 100 |
| `cursor` | 정수 | 선택 사항; 기본: 0; 최소: 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

BioRxiv 제출 통계 모든 역사 — 새로운 대 개정된 종이 카운트 기간 당, 실행 누적 총. 간격은 "monthly"입니다 (과태) 또는 "yearly".

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `interval` | 문자열 | 선택 사항; 기본: "monthly"; koum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

모든 역사상 생물 자원 사용 / 환경 통계 - 요약보기, 전체 텍스트보기, 및 PDF은 기간 당 다운로드, 실행 누적 총. 간격은 "monthly"입니다 (과태) 또는 "yearly".

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `interval` | 문자열 | 선택 사항; 기본: "monthly"; koum: &#91;"monthly", "yearly"&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## 의약품 규제 {/* #family-12 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `search_drug_applications` {/* #search_drug_applications */}

정확한 아세테이트 필터 (브랜드, 일반, active_ingredient, 스폰서, marketing_status, dosage_form, 루트, pharm_class)의 조합에 의해 약품을 검색하십시오. 일반 및 pharm_class은 해동된 openfda 블록을 쿼리합니다 (이전 응용 프로그램에 일관성, 그래서 조용히 거기 건너 뛰기). 넓은 검색은 진정한 합계와 truncated=true와 함께 첫 번째 max_records을 반환; ~26,000 레코드를 초과하는 페이지, submission_date_from/to로 좁은.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `brand` | 문자열 | 옵션 정보 |
| `generic` | 문자열 | 옵션 정보 |
| `active_ingredient` | 문자열 | 옵션 정보 |
| `sponsor` | 문자열 | 옵션 정보 |
| `marketing_status` | 문자열 | 선택 사항; enum: &#91;"Prescription", "Over-the-counter", "Discontinued", "None (Tentative 승인) "&#93; |
| `dosage_form` | 문자열 | 옵션 정보 |
| `route` | 문자열 | 옵션 정보 |
| `pharm_class` | 문자열 | 옵션 정보 |
| `pharm_class_type` | 문자열 | 선택 사항; 크기: "epc", "moa", "cs", "pe"&#93; |
| `search_type` | 문자열 | 선택 사항; 기본: "and"; koum : &#91;"and", "or"&#93; |
| `submission_date_from` | 문자열 | 옵션 정보 |
| `submission_date_to` | 문자열 | 옵션 정보 |
| `raw_search` | 문자열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

그 숫자로 한 Drugs@FDA 신청 (예를 들어. "NDA020702", "ANDA076543", "BLA125514"). 전체 기록 반환 — 스폰서, 제품 (브랜드, 활성 성분 + 힘, 복용량 형태, 경로, 마케팅 상태, TE 코드), 전체 제출 기록, 및 현재 할 때 조화 된 openfda 필드.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `application_number` | 문자열 | **필수** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

Aggregate Drugs@FDA Bucket은 search_drug_applications과 같은 필터에 의해 선택적으로 좁아집니다. count_field는 친절한 이름 (sponsor_name, application_number, dosage_form, 노선, marketing_status, te_code, pharm_class_epc/moa/cs/pe) 또는 익지않는 openFDA 분야 경로 (분석한 분야를 위해 .exact 자신을 추가하십시오)를 받아들입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `count_field` | 문자열 | **필수** |
| `brand` | 문자열 | 옵션 정보 |
| `generic` | 문자열 | 옵션 정보 |
| `active_ingredient` | 문자열 | 옵션 정보 |
| `sponsor` | 문자열 | 옵션 정보 |
| `marketing_status` | 문자열 | 옵션 정보 |
| `dosage_form` | 문자열 | 옵션 정보 |
| `route` | 문자열 | 옵션 정보 |
| `pharm_class` | 문자열 | 옵션 정보 |
| `pharm_class_type` | 문자열 | 선택 사항; 크기: "epc", "moa", "cs", "pe"&#93; |
| `search_type` | 문자열 | 선택 사항; 기본: "and"; koum : &#91;"and", "or"&#93; |
| `submission_date_from` | 문자열 | 옵션 정보 |
| `submission_date_to` | 문자열 | 옵션 정보 |
| `raw_search` | 문자열 | 옵션 정보 |
| `max_buckets` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

Corpus-level Drugs@FDA 통계 한 통화 — 총 응용 프로그램, 마케팅 통계 분할, 최고 복용량 형태 및 경로 (별도 조사), 및 응용 프로그램 조사에 의해 최고 스폰서.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

응용 프로그램 카운트와 약리학 클래스를 계산, 조화 openfda.pharm_class_&lt;type>에 계산 블록. Counts는 블록을 운반하는 유일한 애플리케이션을 반영합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `class_type` | 문자열 | 선택 사항; 기본: "epc"; 크기: "epc", "moa", "cs", "pe"&#93; |
| `max_buckets` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

브랜드 약물의 일반적인 동등물을 찾아보세요: 참조 응용 프로그램에 브랜드를 해결하고, 정확한 활성-유효한 이름 세트 (들)을 추출하고, 활성-유효한 세트 경기 (TE 코드 및 마케팅 상태 포함) 제품을 가진 모든 Drugs@FDA 응용 프로그램을 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `brand` | 문자열 | **필수** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

표적으로 하는 단면도 적출을 가진 성분/name/route에 의하여 FDA 약 제품 상표 (SPL)를 만회하십시오. 필터 (active_ingredient, generic_name, brand_name, 루트, product_type)는 openfda 라벨 블록을 명중; non-analyzed .exact 변형을 쿼리하기 위해 정확한 설정. 기본 구조화 레코드 대신 원시 openFDA 라벨 섹션을 추출하려면 섹션을 통과하십시오. raw_search은 mapped 필터와 상호 전용입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `active_ingredient` | 문자열 | 옵션 정보 |
| `generic_name` | 문자열 | 옵션 정보 |
| `brand_name` | 문자열 | 옵션 정보 |
| `route` | 문자열 | 옵션 정보 |
| `product_type` | 문자열 | 선택 사항; koum: &#91;"HUMAN 구조 DRUG", "HUMAN OTC DRUG"&#93; |
| `exact` | 불리언 | 선택 사항; 기본값: false |
| `raw_search` | 문자열 | 옵션 정보 |
| `sections` | 문자열 배열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## 인간 유전학 {/* #family-13 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

GWAS 카탈로그 협회는 1개의 변종 (rsID), 가장 뜻깊은 첫번째를 위해 보고했습니다. 아르그: rs_id (dbSNP rsID e.g. rs7412 APOE 또는 rs699 AGT; 카탈로그's 현재 rsID이어야한다 - 합병 / 은퇴 ID는 오류보다 0 행을 반환 할 수있다; max_records (출력 모자 과태 500; trait-hub 변형은 1000 + 협회를 수행 할 수 있습니다. 행은 p-value ascending에 의해 서버 추측됩니다, 그래서 캡핑 된 결과는 top-signal prefix입니다). &#123;rs_id, api_total, 리턴, truncated, 협회&#125;를 반환합니다. api_total는 카탈로그's 자신의 합계입니다; truncated 플래그는 캡핑 된 fetch를 나타냅니다. 각 협회 행: &#123;association_id, p_value, pvalue_mantissa· pvalue_exponent· pvalue_description· or_value, 베타, ci_lower· ci_upper, 범위, risk_frequency· snp_effect_alleles· rs_ids, 위치, mapped_genes· efo_traits:&#91;&#93;&#123;efo_id· efo_trait&#125;&#93;, bg_efo_traits· reported_trait· multi_snp_haplotype· snp_interaction· study_accession_id· pubmed_id· first_author&#125;... or_value 및 베타는 행당 상호적으로 독점적입니다 (양적 대 양적); 0.0의 p_value는 p &lt;을 의미합니다. ~1e-308 (사용 mantissa/exponent).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rs_id` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

GWAS 카탈로그 협회의 변형은 MAPPED 유전자 (catalog's Ensembl 파이프라인 매핑, 아니 저자 승인), 가장 중요한 첫 번째. Args: gene_symbol (HGNC 기호, 정확한 일치, 예를들면. PCSK9의 APOE; case-sensitive upstream – canonical uppercase를 통과; flanking 유전자에 intergenic 변종 지도, 그래서 행은 유전자 몸 밖에 앉을 수 있습니다); max_records (캡 기본 500; p-value ascending에 의해 서버 정렬). &#123;gene_symbol, api_total, 반환, truncated, 협회&#125; 반환 gwas_associations_for_variant과 같은 행 모양으로. 비판적 인 기호는 api_total = 0을 반환하며 오류가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

GWAS 카탈로그 협회는 하나의 EFO trait에 할당, 가장 중요한 첫 번째. Args: efo_id ( 카탈로그, e.g.에 의해 사용되는 종양학 용어 짧은 형태. MONDO_0005010, EFO_0004340, HP_0003124; 카탈로그는 많은 역사적인 EFO ids를 MONDO/HP에 마이그레이션 - gwas_search_traits과 함께 현재 ids를 해결; efo_id/efo_trait의 정확하게 하나 통과하십시오); efo_trait (정확한 trait LABEL 대안); max_records (캡 기본 500; p-value ascending을 행합니다. &#123;efo_id 반품&#124;efo_trait, api_total, 반품, truncated, Associations&#125; gwas_associations_for_variant과 같은 행 모양으로. 알 수없는 ID / 라벨은 api_total = 0, 오류가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `efo_id` | 문자열 | 옵션 정보 |
| `efo_trait` | 문자열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

검색 GWAS 카탈로그 EFO trait annotations by label substring — 질병/phenotype 이름을 해결하기위한 항목 gwas_associations_for_trait / gwas_search_studies 가져 오기. Args : 쿼리 (태트 라벨의 케이스 민감성 하위 문자열, e.g. "코로니어" 관상 동맥 무질서 MONDO_0005010 등 일치하십시오; 카탈로그는 EFO, MONDO, HP 및 OBA ids를 혼합합니다. - don't는 EFO_ 접두사를 가정합니다. max_records (캡 기본 500). 반환 &#123;query, api_total, 반환, truncated, efo_traits&#125;; 각 행 &#123;efo_id, efo_trait, uri&#125; 상표에 의해 분류하는. 카탈로그에 대한 카운트 인증's는 캡핑하지 않을 때 총을 소유합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

검색 GWAS 카탈로그 연구 trait annotation 또는 간행물. Args: efo_id (내과 짧은 모양, 예를들면. MONDO_0005010, gwas_search_traits을 통해 해결; 필터 결합 및 — 일반적으로 한을 통과); efo_trait (정확한 trait 상표 대안); pubmed_id (search's 출판물의 PubMed ID, 예. 38714703); max_records (캡 기본 500). &#123;filters, api_total, 반환, truncated, study&#125;; 각 연구 행 &#123;accession_id, disease_trait, efo_traits, bg_efo_traits, pubmed_id, initial_sample_size, replication_sample_size, discovery_ancestry, replication_ancestry, genotyping_technologies, 플랫폼, cohort, full_summary_stats_available, imputed, gxe, gxg&#125;. 카탈로그에 대한 계산은 캡핑되지 않을 때 합계합니다. 적어도 하나의 필터가 필요합니다 (필터링 카탈로그는 ~90k 연구입니다).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `efo_id` | 문자열 | 옵션 정보 |
| `efo_trait` | 문자열 | 옵션 정보 |
| `pubmed_id` | 문자열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

GCST 액세스에 의해 하나의 GWAS 카탈로그 연구를 Fetch. Args: accession_id (study accession, 예를 들어) GCST90841394; study_accession_id과 연구 검색 결과로 각 협회 행에 나열됩니다. &#123;found, accession_id, Study&#125;를 반환합니다. gwas_search_studies과 같은 행 모양 (근처가 알 수 없을 때 null).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

Ftch one GWAS 카탈로그 변형 기록 (위치, mapped genes, result) by rsID - 협회를 당기는 것보다 더 가벼운. 아르그: rs_id (dbSNP rsID e.g. rs7412). &#123;found, rs_id, 변형&#125;를 반환합니다; 변형은 &#123;rs_id, 합병, functional_class, most_severe_consequence, Alleles (예를들면) "C/T (앞으로) "), mapped_genes, 위치:&#91;&#123;chromosome, 위치, region&#125;&#93;, last_update_date&#125; - GRCh38 - 또는 rsID가 카탈로그에 있지 않을 때 null 위치. merged=1은 rsID가 다른 레코드 업스트림으로 합병되었다는 것을 의미합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `rs_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

eQTL 카탈로그 데이터셋 리스트(one dataset = one study xissue/cell type x quantification method). Args: study_label (확실한 연구 이름, 예를들면. GTEx, Alasoo_2018, BLUEPRINT; _ 에이치엘슈 tissue_label (확장 조직/cell 유형 상표, 예를들면. 간, macrophage, LCL — 카탈로그에 있는 더 낮은 케이스); quant_method (ge=gene expression, exon, tx, txrev, microarray, leafcutter, aptamer=plasma 단백질; 기존 유전자 수준 eQTLs 사용 ge에 대 한); max_records (캡 기본 1000; 완전 필터링 카탈로그는 ~760 데이터 세트입니다. &#123;filters, 반환, truncated, datasets&#125; 반환 정렬 dataset_id; 각 &#123;dataset_id (QTD...), study_id (QTS...), study_label, sample_group, tissue_id, tissue_label, condition_label, quant_method, sample_size&#125;. API는 총 수를 게시하지 않습니다; truncated=false는 목록이 완료됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `study_label` | 문자열 | 옵션 정보 |
| `tissue_label` | 문자열 | 옵션 정보 |
| `quant_method` | 문자열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

분자 QTL 협회는 하나의 eQTL 카탈로그 데이터 세트에서 열리고, 유전자, 변형 또는 지역으로 필터링합니다. Args: dataset_id (eqtl_list_datasets, e.g.에서 QTD 액세스. QTD000266; gene_id (unversioned Ensembl 유전자 ID e.g. ENSG00000130203 APOE; gene_id/rsid/variant/pos의 적어도 하나는 요구됩니다; rsid (dbSNP rsID); 변형 (eQTL 카탈로그 변형 문자열 chr19_44908822_C_T, chr-prefixed underscore GRCh38); pos (genomic 창 크롬:start-end GRCh38 chr prefix, e.g. 19:44900000-44920000); nlog10p_min (신호층: -log10(p) >=이로만 행할 수 있으며, 업스트림을 적용할 수 있습니다); max_records (캡 기본 1000 = 한 페이지). &#123;dataset_id, 필터, 리턴, truncated, 협회&#125;; 각 행 &#123;molecular_trait_id, gene_id, 변종, rsid, 염색, 위치, ref, alt, 유형, 베타, se, pvalue, nlog10p, maf, ac, an, r2, median_tpm&#125;. 줄은 즉시 창을 만듭니다 (각 유전자의 ±1 Mb); 빈은 "not 테스트 / Not Present"을 의미한다. 총 카운트가 게시되지 않습니다 : truncated = false는 소진을 입증, truncated = true는 캡이 히트를 의미한다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `dataset_id` | 문자열 | **필수** |
| `gene_id` | 문자열 | 옵션 정보 |
| `rsid` | 문자열 | 옵션 정보 |
| `variant` | 문자열 | 옵션 정보 |
| `pos` | 문자열 | 옵션 정보 |
| `nlog10p_min` | 숫자 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

공개 PheWeb PheWAS 포털 목록이 서버는 genome 빌드 및 기능 레지스트리와 함께 쿼리 할 수 있습니다. 반환 &#123;instances:&#123;key:&#123;label, base_url, genome_build, 기능, 메모&#125;&#125;&#125;. 함수는 endpoints를 각각 노출시킵니다: 변형 (phewas_variant), 유전자 (phewas_finngen_gene), 페형 (phewas_list_phenotypes), 자동 완성 (phewas_search_phenotypes). 빌드 분할 참고 : FinnGen R12 변형 ID는 GRCh38입니다. BioBank Japan (pheweb.jp)는 GRCh37/hg19입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

1개의 변종을 위한 PheWAS: biobank PheWeb 포털의 모든 페형에 대한 협회 통계, 가장 중요한 첫 번째. Args: 인스턴스 (finngen FinnGen R12 GRCh38 또는 bbj BioBank 일본 GRCh37; 변형 coords MUST는 인스턴스's 빌드에있을 수 있습니다. 변형 (chrom-pos-ref-alt, :/_ 분리기 및 chr 접두사 tolerated, 예를 들어. 19-44908822-C-T APOE rs7412 GRCh38/finngen 또는 1-55505647-G-T PCSK9 rs11591147 GRCh37/bbj); max_phenos (캡 기본 200; FinnGen은 ~ 2470 행을 반환합니다. 캡핑하기 전에 p-value ascending에 의해 정렬 됨). &#123;instance, genome_build, 변형, variant_meta, 총, 반환, truncated, 페형&#125;; variant_meta &#123;chrom, pos, ref, alt, rsids, nearest_genes, gnomad (FinnGen 전용) &#125;. 각 페니 타입 행 &#123;phenocode, 페니스트, 카테고리, pval, mlogp, 베타, sebeta, af&#124;maf, maf_case, maf_control, n_cases, n_controls, n_samples&#125; (unpublished 필드 null; BBJ 행에는 af, FinnGen 행에는 maf 트리플 + mlogp가 있습니다. 알 수없는 변형은 잘못된 오류를 제기합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `instance` | 문자열 | **필수**; koum : &#91;"finngen", "bbj"&#93; |
| `variant` | 문자열 | **필수** |
| `max_phenos` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

FinnGen R12의 Gene-level PheWAS : 모든 질병의 끝점, 유전자 영역에서 가장 중요한 첫 번째. Args: gene_symbol (HGNC 기호 e.g. PCSK9의 APOE; 알 수없는 기호는 잘못된 오류를 제기합니다. max_phenos (캡 기본 200; FinnGen은 ~2470 엔드 포인트, 각 행; 캡핑하기 전에 p-value ascending에 의해 정렬 됨). &#123;instance: "finngen", genome_build: "GRCh38", gene_symbol, 총, 반환, truncated, 페형&#125;; 각 행은 phewas_variant 줄 모양 플러스 변종입니다: &#123;chrom, pos, ref, alt, varid, rsids&#125; -이 gene's 영역에서 그 endpoint에 대한 최고 변형 (region != 유전자 몸; PheWeb 패드 유전자 경계). 대부분의 행은 null 결과입니다 (pval~1) - per-endpoint BEST 변형은 여전히보고; 필터에 의해 pval 자신에 대 한 중요 한 조회.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | **필수** |
| `max_phenos` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

PheWeb 인스턴스의 완전한 phenotype (disease endpoint) 카탈로그, case/control counts. Args: 인스턴스 (현재 finngen만 이 endpoint를 노출; BBJ는 사용하지 않습니다 - phewas_search_phenotypes을 사용하십시오); max_records (캡 기본 3000 > FinnGen's ~2470 엔드포인트이므로 기본은 완전한 카탈로그를 반환합니다. &#123;instance, 총, 반환, truncated, 페니 타입&#125; 반환 에 의해 정렬 페덱스; 각 행 &#123;phenocode (e.g. "T2D"), 페스트링, 범주, num_cases, num_controls, num_gw_significant (그 엔드 포인트에 대 한 게놈 폭 넓은 신호의 수) &#125;.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `instance` | 문자열 | 선택 사항; 기본: "finngen"; enum: &#91;"finngen"&#93; |
| `max_records` | 정수 | 선택 사항; 기본: 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

PheWeb 인스턴스를 검색's 페형 (및 엔티티티티티) 이름 - 페니코드에 질병 이름을 해결하기위한 항목 포인트. Args: 쿼리 (free-text 페인 타입 쿼리 e.g. "diabetes", "asthma"; 페니타입 이름/코드 일치; 일부 인스턴스는 유전자 이름과 rsIDs도 일치합니다. 인스턴스 (finngen default 또는 bbj — 모두 autocomplete 노출); max_records (캡 기본 500; autocomplete 응답은 짧은 명부, 거의 capped입니다). &#123;instance, 쿼리, 총, 반환, truncated, match&#125;; 각 경기 &#123;display, 페니코드, url&#125;. phewas_list_phenotypes 행 또는 인스턴스 웹 사이트와 페인코드를 사용하십시오. BBJ 디스플레이 문자열은 부모의 코드에 포함.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `instance` | 문자열 | 선택 사항; 기본: "finngen"; koum : &#91;"finngen", "bbj"&#93; |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## 패스워드 {/* #family-14 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

핀 GTEx 릴리스 (54 gtex_v8)에 대한 메타 데이터가있는 모든 조직 사이트 목록 : 샘플 수, eGene / sGene 카운트, 색상 코드 및 UBERON 투과 ids.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

metadata: datasetId, GENCODE version, genome build, dbSNP build 및 sample/subject/tissue count로 모든 GTEx dataset 릴리스를 나열합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `dataset_id` | 문자열 | 옵션 정보 |
| `organization_name` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

pinned GTEx 릴리스에 대 한 샘플 및 donor 메타 데이터, 선택적으로 tissue_site_detail_id에 의해 필터링, data_type (e.g. RNASEQ, WGS), 또는 subject_id. 페이지 및 카운트 인증; unfiltered 호출은 수천의 표본, 그래서 여과기 또는 세트 max_samples의 일치합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | 문자열 | 옵션 정보 |
| `data_type` | 문자열 | 옵션 정보 |
| `subject_id` | 문자열 | 옵션 정보 |
| `max_samples` | 정수 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

GENCODE ids 버전으로 된 Ensembl ids 또는 unversioned Ensembl ids를 해결했습니다. GAPDH -> - 무료 온라인 게임 ENSG00000111640.14입니다. 표현 / eQTL 도구에 ids를 먹이는.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `genes` | 문자열 배열 | **필수** | 7 / 0 / 0 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

TPM(Median gene expression, TPM)는 조직 전체에 걸쳐 1개 이상의 VERSIONED GENCODE ids (모든 조직에 대한 미미트 조직)입니다. (진, 조직) 행을 통해 페이지 및 계산.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gencode_ids` | 문자열 배열 | **필수** |
| `tissue_site_detail_ids` | 문자열 배열 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

median TPM을 내려받은 모든 조직의 유전자의 표현을 요약합니다. 기호 또는 Ensembl ID를 받아들이고 자동 용해는 GENCODE ID로 먼저 해결합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | **필수** |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

샘플 수준 (집합되지 않음) 표식 TPM arrays for one VERSIONED GENCODE id, 티슈 당 (모든을위한 미트 조직). 각 조직에 대한 전체 per-sample TPM 배열과 n_samples를 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gencode_id` | 문자열 | **필수** |
| `tissue_site_detail_ids` | 문자열 배열 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

API 측면 순위를 사용하여 한 조직에서 미디어 TPM에 의해 상위 N 유전자. filter_mt_gene (과태 true)는 순위에서 mitochondrial 유전자를 떨어뜨립니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | 문자열 | **필수** |
| `n` | 정수 | 선택 사항; 기본: 100 |
| `filter_mt_gene` | 불리언 | 선택 사항; 기본값: true |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

모든 eGenes (작성 ≥1 뜻깊은 cis-eQTL) 조직. 걷기 페이지 별 페이지 및 개수 (예를들면) Pancreas gtex_v8 = 9,660). max_genes 캡 얼마나 많은 행이 반환되는지.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tissue_site_detail_id` | 문자열 | **필수** |
| `max_genes` | 정수 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

단일 조직은 유전자 및 / 또는 변종 (precomputed)에 대한 cis-eQTL 협회. gencode_id 및/또는 variant_id 제공; 선택적으로 좁은 tissue_site_detail_id. 페이지 및 카운트 인증.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gencode_id` | 문자열 | 옵션 정보 |
| `variant_id` | 문자열 | 옵션 정보 |
| `tissue_site_detail_id` | 문자열 | 옵션 정보 |
| `max_results` | 정수 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

다중 조직 cis-eQTL 메타 분석 (METASOFT) VERSIONED GENCODE ID. variant_id는 선택적으로 1개의 변종에 좁힙니다. per-tissue m-values, NES, p-values 및 SE를 가진 per-variant 행을 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gencode_id` | 문자열 | **필수** |
| `variant_id` | 문자열 | 옵션 정보 |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

비 서명 쌍을 포함하여 한 조직에 있는 어떤 유전자 변형 쌍을 위한 비행에 eQTL를 산출하십시오. p-value, NES, t-statistic, MAF 및 per-sample genotype/expression 배열을 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gencode_id` | 문자열 | **필수** |
| `variant_id` | 문자열 | **필수** |
| `tissue_site_detail_id` | 문자열 | **필수** |
| `dataset_id` | 문자열 | 선택 사항; 기본: "gtex_v8" |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## 단백질 Annotation {/* #family-15 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

한 개 이상의 UniProt 단백질에 대한 InterPro 도메인 아키텍처를 완료 (모든 일치하는 항목, 구성원-DB 서명, 조각 좌표), API 카운트에 대해 검증 된 pagination.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

InterPro 또는 회원 데이터베이스 항목 (Pfam, SMART, PROSITE, PANTHER, CDD)를 통해 키워드 검색, API 카운트에 대한 확인을 완료하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |
| `entry_type` | 문자열 | 옵션 정보 |
| `source_db` | 문자열 | 선택 사항; 기본: "interpro" |
| `go_term` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

InterPro 항목 (IPRxxxxxx) 또는 Pfam 가족 (PFxxxxx)에 대한 세부 기록 - 액세스 접두사에 의해 선택된 경로.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

Pfam Kinds (InterPro set, Accessions CLxxxx)에서 키워드 검색.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

Pfam Kind는 완전한 분류된 회원 가족 목록을 포함하여 세부 정보를 제공합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `clan_accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

Pfam 가족의 회원 단백질 (완전한 카운트 검증된 도보 또는 계산 전용). 아주 큰 가족을 위한 count_only를 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pfam_accession` | 문자열 | **필수** |
| `reviewed_only` | 불리언 | 선택 사항; 기본값: false |
| `tax_id` | 정수 | 옵션 정보 |
| `count_only` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

Pfam 가족 구성원을 포함하는 Proteomes. count_only 기본적으로 true — upstream proteome cursor pagination은 깊은 산책을 위해 결함이 있습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `pfam_accession` | 문자열 | **필수** |
| `count_only` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

인간 단백질 아틀라스 per-gene 기록 (출판 25.x): 조직/subcellular/pathology/blood/brain 표식과 항체 정보. Ensembl 유전자 ID 또는 유전자 기호를 수락합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene` | 문자열 | **필수** |
| `full` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

인간 단백질 아틀라스 (search_download)에서 열 선택된 대량 수색.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `columns` | 문자열 | 선택 사항; 기본: "g, g, gd, up, chr, chrp, scl" |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

맵 유전자 기호 / 별표 STRING 단백질 식별자 (v12.0). 모든 입력 기호는 맵핑 또는 unmapped에 나열되어 있습니다. 두 개의 파티션 입력.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `symbols` | 문자열 배열 | **필수** |
| `species` | 정수 | 선택 사항; 기본: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

신뢰 임계 값에서 유전자 목록 (v12.0)에 대한 STRING 단백질 - 단백질 상호 작용 네트워크. 지도 기호 첫번째 (보고되지 않은), 다음 검색 노드, 가장자리, 요약 및 입증. 단일 맵 입력 요청 10 상호 작용 이웃, 일치 STRING; 여러 맵핑 입력이 확장되지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `symbols` | 문자열 배열 | **필수** |
| `species` | 정수 | 선택 사항; 기본: 9606 |
| `required_score` | 정수 | 선택 사항; 기본: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

Smith-Waterman 단백질 유사성 비트 코어 (STRING /homology). Sparse: STRING's 자료에서 absent 쌍은 목록이 아닙니다 (absence는 기록한 유사성을, 제로하지 않습니다).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `symbols` | 문자열 배열 | **필수** |
| `species` | 정수 | 선택 사항; 기본: 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

표적 종 (STRING /homology_best)에 입력 단백질 당 제일 균질 명중. target_species=null은 모든 종들에서 최고의 히트를 요청합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `symbols` | 문자열 배열 | **필수** |
| `species` | 정수 | 선택 사항; 기본: 9606 |
| `target_species` | 정수 | 옵션 정보 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## 암 모델 {/* #family-16 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

cBioPortal 암 연구 목록은, 선택적으로 자유로운 원본 키워드 (이름/description/cancer 유형) 및/또는 정확한 암 유형 ID에 의해 거르는; 연구 ID, 이름, 암 유형, 참고 genome, 인용 및 per-data-type 표본 조사를 반환하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `keyword` | 문자열 | 옵션 정보 |
| `cancer_type_id` | 문자열 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

id : metadata, per-data-type sample counts, true sample/patient counts (연구 컬렉션에서 표시 필드가 아닌) 및 그 분자 프로파일에 의해 cBioPortal 암 연구를 가져옵니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `study_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

cBioPortal 연구에서 한 유전자 (HUGO 기호)의 모든 mutations, 재발성 골재 : 총 mutations, mutated-sample count, mutation-type 및 단백질 교환 배포 및 가장 재발성 단백질 변화.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | **필수** |
| `study_id` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

여러 cBioPortal 연구 (1–12)에서 한 유전자의 돌연변이 빈도 : 선택한 돌연변이 프로필 및 샘플 목록에서 유전자를 위해 프로파일을 샘플로 구분 된 고유의 돌연변이 샘플; 가장 빠른 첫 번째 순위.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | **필수** |
| `study_ids` | 문자열 배열 | **필수**; 최소품목: 1; 최대품목: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

cBioPortal 연구에서 한 유전자의 분리 사본 번호 변경, 이벤트 유형에 의해 필터링 (기본적으로 deletion / amplification), 전체 per-sample 변경 배포.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `gene_symbol` | 문자열 | **필수** |
| `study_id` | 문자열 | **필수** |
| `event_type` | 문자열 | 선택 사항; 기본: "HOMDEL_AND_AMP"; 한국어 (ko)"HOMDEL_AND_AMP의 특징"· "제품정보"· "AMP의 장점"· "인기 카테고리"· "HETLOSS의 장점"· "사이트맵"· "의 모든 것"· |
| `max_records` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

cBioPortal 연구 (특허 및 샘플 수준 필드)에서 정의 된 임상 속성은 생존 엔드 포인트를 강조하고 전체 생존 데이터가 현재 있는지 여부를 강조합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `study_id` | 문자열 | **필수** |
| `max_records` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RNA 소개 {/* #family-17 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `get_family` {/* #get_family */}

접근 (RF00005) 또는 가족 ID (tRNA)에 대한 Rfam 가족 메타 데이터 — 모두 해결. "raw"의 전체 업스트림 JSON 플러스 평평한 기록.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

스톡홀름의 Rfam 가족의 씨앗 정렬 (기본, consensus 이차 구조 라인과) 또는 aligned gapped FASTA.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |
| `fmt` | 문자열 | 선택 사항; 기본: "stockholm"; koum : &#91;"stockholm", "fasta"&#93; |
| `max_bytes` | 정수 | 선택 사항; 기본: 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

Rfam 가족의 Infernal covariance 모델 (CM 파일), cmsearch / cmscan과 직접 사용, 및 패시드 헤더 필드.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |
| `max_bytes` | 정수 | 선택 사항; 기본: 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

Rfam 가족의 씨앗 phylogenetic 나무 (NHX / Newick 텍스트).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

순서 데이타베이스(parsed TSV)를 통해 Rfam 제품군의 모든 Full-region 조회. get_family을 통해 num_full을 먼저 확인 — rfam.org 403s 이 경로는 매우 큰 가족 (예를 들어. RF00005).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

PDB 잔류물 수준 구조 Rfam 가족의 매핑, deterministically 분류.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

Rfam Accession을 가족 ID로 변환하십시오 (예를 들어. RF00005 - > "tRNA").

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

Rfam 가족 ID를 그것의 접근 (예를들면. "tRNA"의 특징 -> RF00005).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `family_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

공식 Rfam 일괄 처리 엔드포인트를 통해 RNA 시퀀스를 검색합니다. 반환된 작업 정체성을 유지하면서; unfinished 응답은 0-hit 결과가 아닙니다. 완료된 경기 및 소스 정보를 검사합니다. 실패한 응답 후에, 반복적으로 제출하기 보다는 오히려 기존 일을 진단하거나 재시작하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `sequence` | 문자열 | **필수** |
| `max_wait_s` | 숫자 | 선택 사항; 기본: 300 |
| `poll_interval_s` | 숫자 | 선택 사항; 기본: 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## Omics 아카이브 {/* #family-18 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `ena_query_runs` {/* #ena_query_runs */}

NCBI tax_id (하단 세나 포함), library_strategy 및 / 또는 연구, 실험 또는 샘플 제목에 키워드를 검색하고 설명을 실행하십시오. 공급 필터와 결합; 적어도 하나 요구됩니다. 세법은 미생물이 미생물이 아닌 미생물이 미생물의 주인이 아닌 것을 설명합니다. 키워드는 ENA 쿼리 구문이 아닌 리터의 하위 문자열입니다. 두 배 인용, backslashes, wildcards 및 통제 특성은 거절됩니다. public metagenome 레코드를 포함합니다. 반환 경계 메타 데이터 만, truncated 때 완전한 cohort. 작은 세트를 검색 할 수있는 좁은 필터; 반복된 호출은 질이 아닙니다. 알려진 INSDC 액세스 사용 ena_search_runs.

적어도 1개의 목록으로 만들어진 검색 필터 공급; 완전한 조합 규칙을 위한 다운로드 가능한 schema를 상담하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tax_id` | 정수 | 선택 사항; 최소: `1`; 최대: `2147483647` |
| `library_strategy` | 문자열 | 선택 사항; 제품 이름: `["AMPLICON", "ATAC-seq", "Bisulfite-Seq", "CLONE", "CLONEEND", "CTS", "ChIA-PET", "ChIP-Seq", "ChM-Seq", "DNase-Hypersensitivity", "EST", "FAIRE-seq", "FINISHING", "FL-cDNA", "GBS", "Hi-C", "MBD-Seq", "MNase-Seq", "MRE-Seq", "MeDIP-Seq", "NOMe-Seq", "OTHER", "POOLCLONE", "RAD-Seq", "RIP-Seq", "RNA-Seq", "Ribo-Seq", "SELEX", "Synthetic-Long-Read", "Targeted-Capture", "Tethered Chromatin Conformation Capture", "Tn-Seq", "VALIDATION", "WCS", "WGA", "WGS", "WXS", "miRNA-Seq", "ncRNA-Seq", "snRNA-seq", "ssRNA-seq"]` |
| `keyword` | 문자열 | 선택 사항; 최소 길이: `1`; 최대 길이: `200`; 패턴 : `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `limit` | 정수 | 선택 사항; 기본 : `100`; 최소: `1`; 최대: `1000` |

```javascript
const result = await host.mcp("omics-archives", "ena_query_runs", {"tax_id": 6239, "library_strategy": "RNA-Seq", "keyword": "transcriptome", "limit": 20})
```

### `ena_get_submitted_files` {/* #ena_get_submitted_files */}

ENA가 노출되면 BAM, CRAM 또는 FASTQ를 포함하여 한 ERR / SRR / DRR 실행에 대한 원본 제출 파일 목록. FTP 위치, 제출 된 형식, 바이트 크기 및 MD5 체크섬을 메타데이터로 반환합니다. 다운로드하지 않고 형식을 변환하고, 참조 게놈을 검색하거나 체크섬을 확인합니다. 이 파일은 ena_get_run_files에 의해 반환 아카이브 생성 FASTQ가 아닌 아카이브 생성 된 SRA 컨테이너의 목록이 아닙니다. CRAM은 분석에 대한 일치하는 참조가 필요할 수 있습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `run_accession` | 문자열 | **필수**; 최소 길이: `1`; 최대 길이: `64` |

```javascript
const result = await host.mcp("omics-archives", "ena_get_submitted_files", {"run_accession": "ERR10015065"})
```

### `ena_search_runs` {/* #ena_search_runs */}

ENA / INDC 연구, 실험, 샘플 또는 액세스와 관련된 공공 sequencing 실행을 찾으십시오. PRJ/ERP/SRP/DRP, ERX/SRX/DRX, SAM/ERS/SRS/DRS 및 ERR/SRR/DRR 식별자를 수락하십시오; GEO GSE/GSM, ArrayExpress E-MTAB 및 MGnify MGYS 식별자는 연결되는 INSDC 접근을 첫째로 필요로 합니다. Accession lookup 만 키워드 검색하지 않습니다. 데이터 파일을 fetching하지 않고 유기 및 라이브러리 메타데이터를 반환합니다. 결과는 1000 실행에서 캡핑됩니다; truncated result는 완전한 cohort가 아니고, 반복된 호출은 오프셋 또는 continuation 토큰을 제공하지 않기 때문에 pagination 아닙니다. 완전한 적용이 요구될 때 더 좁은 표본 또는 실험 접근을 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 64 |
| `limit` | 정수 | 선택 사항; 기본: 100; 최소: 1; 최대: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

아카이브 생성 FASTQ 다운로드 URL, 바이트 크기 및 업스트림 MD5 체크섬 한 ERR / SRR / DRR 실행. 파일 재고 만 반환; 다운로드 또는 체크섬 검증 없음. 보고 순서에 있는 각 파일을, unpaired 또는 오래 견딘 파일을 포함하여 유지합니다; library_layout=PAIRED는 정확히 두 개의 파일을 무시하지 않습니다. file_index은 위치 만이며 R1/R2 또는 mate 식별자가 아닙니다. 일부 실행 (일부 단일 셀/native-format 제출 포함)에는 아카이브 생성 된 FASTQ가 없습니다. 제출된 BAM/CRAM/SRA 파일은 이 도구 밖에 있습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `run_accession` | 문자열 | **필수**; 최소 길이: 1; 최대 길이: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

검색 ArrayExpress 기능-genomics 실험 (BioStudies) 완료, 총 업데이트 된 검색; 필터 (query, 유기, study_type, 기술, 릴리스 날짜 범위, 추가 facets)와 결합.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `study_type` | 문자열 | 옵션 정보 |
| `technology` | 문자열 | 옵션 정보 |
| `released_after` | 문자열 | 옵션 정보 |
| `released_before` | 문자열 | 옵션 정보 |
| `extra_facets` | 객체 | 옵션 정보 |
| `max_records` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

Fetch one ArrayExpress experiment (BioStudies) as a flattened analyst record - 연구 유형, 생물, assay/sample counts, design/factors, 저자, 간행물, 프로토콜, 어레이 디자인 및 파일 요약.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

다운로드 URL을 사용하여 ArrayExpress 실험 (이름, 크기, 유형, 형식, 설명)의 모든 파일을 나열하고, /info endpoint 파일 수가 비교에 따라 수행됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

배열익스프레스 실험(MAGE-TAB headers verbatim, 반복 suffixed #2/#3)을 위한 샘플 SDRF 표기 행. SDRF 반환 &#123;"error":"no_sdrf"&#125;를 가진 Experiments.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |
| `max_rows_returned` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

검색 NCBI GEO DataSets (db=gds) 및 반환 시리즈 레벨 레코드 (trimmed esummary docs). `term`는 가득 차있는 E-utilities 구문입니다; gse&#91;ETYP&#93;를 시리즈에 제한합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `term` | 문자열 | **필수** |
| `retmax` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

샘플 포함 된 샘플이있는 GEO 시리즈 (GSE 액세스)에 대한 Fetch 구조화 된 메타 데이터 - 시리즈 제목 / 요약 / 디자인, 플랫폼, 특성 및 라이브러리 정보가있는 샘플 및 보조 파일 URL. 데이터 테이블은 결코 다운로드되지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

API's의 모든 공개 MetaboLights 연구 accession(numerically sorted)를 나열합니다. 서버 측 연구 검색이 없습니다. - 제목 / 설명자에 의한 필터 fetched 후보가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

MetaboLights 연구 (MTBLSxxx)에 대한 Fetch 구조화 된 메타 데이터는 ISA 페이로드 - 제목, 상태, 년, 유기체, 분석실험, 요소, descriptors, 샘플 수, 프로토콜; 선택적 per-sample 테이블. 알 수없는 / 개인 액세스는 not_found에서 이동합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |
| `include_samples` | 불리언 | 선택 사항; 기본값: false |
| `max_sample_rows_returned` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

공공 MetaboLights 연구를위한 전체 파일 재고 - 최상위 연구 폴더 (ISA-Tab, MAF, 폴더 항목) 및 기본으로, 반복 파일 데이터 폴더.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |
| `include_data_files` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

MetaboLights 연구's raw-data 폴더 (FILES 트리)를 통해 Glob 검색. `pattern` 파일명은 glob (e.g. '*.mzML', '*.raw'); 모든 데이터 파일을 나열하는 omit.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |
| `pattern` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

MGnify metagenomics 연구 무료 텍스트 또는 biome lineage (특히 한 것을 제공). 전체 목록은 API에 대한 완료 및 계산에 질화됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | 옵션 정보 |
| `biome_lineage` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

MGnify 연구에 대한 Fetch 구조화 된 레코드 (MGYS Accessions). include_analyses과 함께, 각 연구는 또한 그것의 완전한 분석 명부작성 플러스 by-pipeline/by-experiment 고장을 나릅니다. 알 수없는 액세스가 누락되었습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |
| `include_analyses` | 불리언 | 선택 사항; 기본값: false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

한 MGnify 연구의 모든 분석 목록 (완료, 카운트 검증 된 pagination) - 파이프라인 버전, 실험 유형, 상태 및 실행 / 조립 / 샘플 액세스와 MGYA 분석 당 하나의 레코드.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_get_project_files` {/* #pride_get_project_files */}

PXD 또는 PRD 액세스에 대한 공공 PRIDE 프로젝트 파일의 한 페이지 목록, 파일 카테고리, 바이트 크기, 업스트림 체크섬 및 다운로드 위치 (FTP, HTTP 또는 Aspera). Metadata만 다운로드하지 않거나 체크섬을 확인하지 않습니다. 페이지는 0 기반입니다. page_size을 변경하고 next_page을 null까지 따르십시오. 주문은 PRIDE에 의해 제공되며 스냅 샷이 아닙니다. 빈 목록은 프로젝트가 존재하는지 또는 공개 여부를 설정하지 않습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `project_accession` | 문자열 | **필수**; 최대 길이: `32`; 패턴 : `"^(?:PXD\|PRD)[0-9]{6,}$"` |
| `page` | 정수 | 선택 사항; 기본 : `0`; 최소: `0`; 최대: `1000000` |
| `page_size` | 정수 | 선택 사항; 기본 : `100`; 최소: `1`; 최대: `100` |

```javascript
const result = await host.mcp("omics-archives", "pride_get_project_files", {"project_accession": "PXD000001", "page": 0, "page_size": 100})
```

### `pride_search_projects` {/* #pride_search_projects */}

PRIDE Archive proteomics 프로젝트 검색 (완전한, api_total-verified retrieval); 필터 (키워드, 유기, 악기, 질병, extra_filters)과 결합. Accession ASC에 의해 정렬 - 경계 산책은 안정적인 접두사입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `keyword` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `instrument` | 문자열 | 옵션 정보 |
| `disease` | 문자열 | 옵션 정보 |
| `extra_filters` | 객체 | 옵션 정보 |
| `max_records_returned` | 정수 | 선택 사항; 기본: 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

액세스에 의해 PRIDE 프로젝트를위한 완벽한 메타 데이터 (e.g. PXD010154) — pride_search_projects와 동일한 정상화한 기록 모양, 그래서 2는 직접 비교할 수 있습니다. 알 수없는 액세스는 not_found에서 이동합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accessions` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

1개의 PRIDE affinity-proteomics 프로젝트를 위한 단백질 증거 줄 목록 (배출에 페이지). 참고 : 만 친화 - 전문 프로젝트가 여기에 제공됩니다. 고전적인 MS (PXD) 프로젝트는 대신 pride_find_projects_for_protein를 사용합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `project_accession` | 문자열 | **필수** |
| `keyword` | 문자열 | 옵션 정보 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

단백질 (MS-archive direction)을 포함하는 PRIDE 프로젝트를 찾으십시오. `protein_accession`은 UniProt 액세스입니다 (예 :. P04637). 전체 메타데이터에 대한 pride_get_projects에 대한 반환된 프로젝트 접근을 피드.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `protein_accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## 사업소개 {/* #family-19 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

CellGuide(CELLxGENE) Cell Ontology id 또는 name: name, synonyms, tology description, curated/GPT description의 셀 타입 정보.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cell_type` | 문자열 | **필수** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

셀 가이드 셀 유형 검색 이름과 동의어를 통해 무료 텍스트 (CDN에는 검색 엔드 포인트가 없습니다, 그래서 celltype_metadata.json 필터링 클라이언트 측).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `limit` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

CellGuide 마커 유전자 (id 또는 name) : computational (data-derived, scored) 또는 canonical (literature-curated).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cell_type` | 문자열 | **필수** |
| `marker_type` | 문자열 | 선택 사항; 기본: "computational"; enum: &#91;"computational", "canonical"&#93; |
| `limit` | 정수 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

CellGuide 소스 데이터 세트 및 간행물은 세포 유형 (id 또는 이름)에 공헌합니다: 수집 이름/url, 간행물 및 조직/분산물/조직 각 덮개.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cell_type` | 문자열 | **필수** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

세포 유형 (id 또는 name)이 관찰 된 원자 조직, CellGuide 소스 컬렉션의 전체 (deduplicated).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `cell_type` | 문자열 | **필수** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## 인증 및 인증 {/* #family-20 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

ENCODE 기능 게놈 실험 검색 (ChIP-seq, ATAC-seq, ...). 필터: assay_title (e.g. "TF ChIP-seq"), 대상 (단백 라벨, 예). "CTCF"), 생물 (과학적인 이름), 상태 (과태 "released"), date_released_before (ISO 날짜 — 닫히는 창), 플러스 extra_filters를 통해 임의 포털 필드 필터. 전체 결과 세트는 페이지화되고 계산됩니다; `accessions`은 모든 경기를 나열하며 대부분의 max_rows 행 요약은 반환됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `assay_title` | 문자열 | 옵션 정보 |
| `target` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `status` | 문자열 | 선택 사항; 기본: "released" |
| `date_released_before` | 문자열 | 옵션 정보 |
| `extra_filters` | 객체 | 옵션 정보 |
| `max_rows` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

ENCODE Biosamples 검색 (cell line, 조직, 주요 세포). 필터: term_name (병리학 용어, 예). "K562"), 분류 ("cell line", "tissue", ...), 생물 (과학적인 이름), 상태 (과태 "released"), date_created_before (ISO 날짜), extra_filters를 통해 중재 포털 필드 필터 플러스. 완료, 카운트 인증: `accessions`은 대부분의 max_rows 행 요약에서 전체 일치 목록입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `term_name` | 문자열 | 옵션 정보 |
| `classification` | 문자열 | 옵션 정보 |
| `organism` | 문자열 | 옵션 정보 |
| `status` | 문자열 | 선택 사항; 기본: "released" |
| `date_created_before` | 문자열 | 옵션 정보 |
| `extra_filters` | 객체 | 옵션 정보 |
| `max_rows` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

ENCODE 데이터 파일 목록 형식으로 / assay / biosample. 필터: file_format ("fastq", "bam", "bigWig", "bed", ...), assay_term_name (학술 용어 e.g. "ChIP-seq"의 특징 - "TF ChIP-seq"와 같은 디스플레이 assay_title이 아닌, 아무것도 일치; extra_filters=&#123;"assay_title": ...&#125;), biosample_term_name (e.g.를 통해 제목을 전달하십시오. "K562, 중국"), 상태 (과태 "출시 예정"), date_created_before, arbitrary 포털 필드 필터를 통해 extra_filters... 파일 쿼리는 수백만의 행 필터링을 일치 — 항상 여러 필터를 결합합니다. 완전 + 계산 검증; 대부분의 max_rows 행 요약이 반환됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `file_format` | 문자열 | 옵션 정보 |
| `assay_term_name` | 문자열 | 옵션 정보 |
| `biosample_term_name` | 문자열 | 옵션 정보 |
| `status` | 문자열 | 선택 사항; 기본: "released" |
| `date_created_before` | 문자열 | 옵션 정보 |
| `extra_filters` | 객체 | 옵션 정보 |
| `max_rows` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

Accession (e.g.에 의해 하나의 인코딩 실험을 가져옵니다. "ENCSR000AKP"). 안정된 필드 레코드를 반환: 분석실험, 표적, 생물 표본 투과 + 요약, 묘사, 실험실, 수상 프로젝트, 방출/보류 날짜, 집합, 복제 조사, 복제 유형, dbxrefs, DOI 및 uuid. 휘발성 포털 필드 (audits, 분석, 내부 상태)는 제외됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

Accession (e.g.에 의해 하나의 인코딩 파일을 가져옵니다. "ENCFF002JUR"). 안정적인 필드 레코드를 반환 : 형식, 출력 유형 / 카테고리, assay, 어셈블리, 부모 데이터 세트, 생물학 복제, 파일 크기, md5sums, 실행 유형, 읽기 길이, 실험실, 생성 날짜, 다운로드 href 및 uuid.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

Accession (e.g.에 의해 하나의 ENCODE 바이오 샘플 가져 오기 "ENCBS013JZP"). 안정된 필드 레코드를 반환: 투과율 + 분류, 생물, 요약/출문, 소스, 기부자, 치료, 유전적인 수정, 수명 단계, 나이, 성별, 실험실, 생성 날짜, 상태 및 uuid.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `accession` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

VERSIONED matrix id (e.g.에 의해 하나의 JASPAR TF 바인딩 프로파일을 가져옵니다. "MA0002.2"). 전체 레코드를 반환: 위치 주파수 매트릭스 (pfm), TF 이름 / 클래스 / 가족, 종, 데이터 유형, 문학 참조 (pubmed/medline), 순서 로고 URL. 버전 ID ("MA0002.2", "MA0002")가 필요합니다. - 버전에 jaspar_matrix_versions를 사용하십시오. Versioned matrices 이다 immutable, 그래서 결과 reproducible 이다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `matrix_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

JASPAR Base matrix id의 모든 버전 목록 (예를 들어. "MA0002"). matrix_id, 이름, 수집 및 URL로 모든 릴리스 버전을 반환합니다. - 카운트 인증. jaspar_get_matrix 이전의 정확한 버전을 핀으로 사용하거나, 릴리스에서 프로필이 변경되는 방법을 추적 할 수 있습니다. 버전 ID ("MA0002.2")는 기본으로 허용되고 감소됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `base_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

Search/list JASPAR TF 바인딩 프로파일 (전체 프로필 카탈로그). 필터 (모든 선택): 수집 ("CORE", "UNVALIDATED"), tax_group (" 척추", "plants", ...), tax_id (NCBI 세노 이드, 예. 인간을위한 9606 — 이것은 당신이 종에 의해 필터링하는 방법입니다; jaspar_list_species와 함께 에이즈를 삽입), 이름 (exact TF 이름, e.g. "FOXA1"), 검색 (무료 텍스트), version="latest" (최신 버전에만 제한). 전체 필터링 카탈로그는 paginated 및 count-verified; 대부분의 max_rows 요약 행이 반환됩니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `collection` | 문자열 | 옵션 정보 |
| `tax_group` | 문자열 | 옵션 정보 |
| `tax_id` | 정수 | 옵션 정보 |
| `name` | 문자열 | 옵션 정보 |
| `search` | 문자열 | 옵션 정보 |
| `version` | 문자열 | 옵션 정보 |
| `max_rows` | 정수 | 선택 사항; 기본: 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

JASPAR 프로필과 모든 종 목록 (NCBI tax_id + 이름); 계산된 전체 목록. tax_id 값을 사용하여 jaspar_list_matrices 필터 (예: 9606 = Homo sapiens, 10090 = Mus musculus).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

모든 JASPAR 세노믹 그룹 목록 (척추, 식물, 곰팡이, 곤충, ...); 계산된 전체 목록. jaspar_list_matrices의 tax_group 필터로 그룹 이름을 사용합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

모든 JASPAR 컬렉션 목록 (CORE, UNVALIDATED, ...); 계산된 전체 목록. jaspar_list_matrices (CORE = curated, non-redundant profiles)의 수집 필터로 수집 이름을 사용하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

모든 JASPAR 데이터베이스 릴리스 목록 (년, 릴리스 번호, 활성 플래그); 계산된 전체 목록. 재현성에 대한 motifs를 선택하거나 JASPAR 버전의 결과를 비교하기 전에 릴리스 역사를 확인하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

UniBind ChIP-seq datasets를 사용하여 높은 confidence TFBS 예측 (unibind.uio.no, 2021 릴리스; 9 종의 ~10k 데이터셋에서 직접 TF-DNA 상호 작용. 각 dataset는 1입니다 (experiment, 세포 유형, TF) 트리플. 필터 (모든 선택, 그리고 결합, 하지 않는 한 정확한 매치): tf_name (진 기호, 예를들면. "CTCF"), cell_line (버블로스 유니버셜 타이틀 - 퓨지 매칭 `search`를 선호), 종 (과학적인 이름), 수집 ("Robust" = 최고의 모델 / 높은 신뢰, 또는 "Permissive"), jaspar_id (버전, 예. "MA0139.1"), 검색 (무료 텍스트). `total`는 API's 정확한 조사입니다; 대부분의 max_rows 행은 반환됩니다 (정밀한 접두사).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tf_name` | 문자열 | 옵션 정보 |
| `cell_line` | 문자열 | 옵션 정보 |
| `species` | 문자열 | 옵션 정보 |
| `collection` | 문자열 | 선택 사항; koum : &#91;"Robust", "Permissive"&#93; |
| `jaspar_id` | 문자열 | 옵션 정보 |
| `search` | 문자열 | 옵션 정보 |
| `max_rows` | 정수 | 선택 사항; 기본: 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

UniBind dataset's 자세히 보기: per-model TFBS counts + 파일 URL. tf_id는 dataset 열쇠 "&lt;identifier>.&lt;cell_line>.&lt;TF>"입니다 unibind_search_tfbs에 의해 반환되는 것과 같이 (예를들면. "ENCSR000AUE.A549_lung_carcinoma.CTCF"). TF 이름, 소스 식별자 (ENCODE/GEO/GTRD), 셀 라인, 생물학적 조건, JASPAR 매트릭스 ids, ChIP-seq 피크 카운트 및 TFBS 예측 모델 (DAMO/PWM/...) total_tfbs, 점수/거리 임계값, 조정 CentriMo p-value 및 직접 BED/FASTA 다운로드 URL을 반환합니다. (MCP 호출되지 않음) 사이트 전체 목록.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `tf_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

TF 바인딩 사이트는 게놈 지역을 겹쳐 쌓입니다 (UniBind 2021 지도), UniBind에 대한 UCSC 허브Api를 통해 제공'등록 된 공공 트랙 허브 (UniBind)'s 자신의 REST API 지역 엔드포인트가 없습니다. 좌표는 0 기반 반 오픈입니다. genome : UCSC 어셈블리 - 튼튼한 허브 : hg38, mm10, ce11, dm6, danRer11, sacCer3, rn6, araTha1; Permissive는 spo2 (hg19 없음 — 첫째로 들어갑니다)를 추가합니다. 크롬: "chr"로 연락처 시작/끝: 간격, 끝 시작 &lt;= 1,000,000 bp. HONEST-CAP: 대부분의 20,000 항목은 통화당 스캔됩니다. region_scan_complete=false는 지역이 더 많은 사이트가 스캔되었는지 의미합니다 (창을 화살표) 그리고 tf_name 세트와 함께, 경기가 누락 될 수 있습니다. n_matching는 필터를 전달하는 스캔 된 사이트를 계산합니다; 반환/truncated는 max_sites 모자를 설명합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `genome` | 문자열 | **필수** |
| `chrom` | 문자열 | **필수** |
| `start` | 정수 | **필수** |
| `end` | 정수 | **필수** |
| `tf_name` | 문자열 | 옵션 정보 |
| `collection` | 문자열 | 선택 사항; 기본: "Robust"; koum : &#91;"Robust", "Permissive"&#93; |
| `max_sites` | 정수 | 선택 사항; 기본: 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## 연구 자료 {/* #family-21 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `search_grants` {/* #search_grants */}

Search2 API (complete, count-verified retrieval)를 통해 Grants.gov 자금 조달 기회를 검색하십시오. 적어도 하나의 선명도가 필요합니다 (keyword, opportunity_number, aln/CFDA, 기관, eligibilities, funding_categories 또는 funding_instruments). opportunity_statuses &#91;"forecasted","posted"&#93; (현재 기회); 추가 "closed"/"archived" 역사적인 것들. 기관은 &#91;"HHS-NIH11"&#93; (NIH), &#91;"HHS-FDA"&#93;, &#91;"NSF"&#93;와 같은 코드가 걸립니다. count_only 을 입력하면 히트 카운트 + 페이스트를 설정합니다. max_records 모자는 기록 (도보는 아직도 완전한 세트 및 깃발을 truncated)를 retrieves 반환했습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `keyword` | 문자열 | 옵션 정보 |
| `opportunity_number` | 문자열 | 옵션 정보 |
| `aln` | 문자열 | 옵션 정보 |
| `agencies` | 문자열 배열 | 옵션 정보 |
| `opportunity_statuses` | 문자열 배열 | 옵션 정보 |
| `eligibilities` | 문자열 배열 | 옵션 정보 |
| `funding_categories` | 문자열 배열 | 옵션 정보 |
| `funding_instruments` | 문자열 배열 | 옵션 정보 |
| `count_only` | 불리언 | 선택 사항; 기본값: false |
| `max_records` | 정수 | 선택 사항; 기본: 100 |
| `include_facets` | 불리언 | 선택 사항; 기본값: true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

전체 텍스트 검색 항체 레지스트리 (antibodyregistry.org, ~3.2M 레코드). 항체 이름/target/catalog 텍스트에 대한 토큰 기반 매칭 ("TP53" 으로 "p53의" 다른 쿼리입니다). 페이지 omitted로, 모든 페이지는 max_records 또는 익명의 깊이 캡으로 걸어 (500을 초과하는 것은 인증 업스트림을 필요로, anonymous_limit_hit로 떨어 뜨립니다 - 결코 침묵으로 떨어졌다). 단일 페이지 검색에 대한 1 기반 페이지를 통과하십시오 (page&#42;page_size는 &lt; = 500).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `query` | 문자열 | **필수** |
| `page` | 정수 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 100 |
| `max_records` | 정수 | 선택 사항; 기본: 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

Fetch Antibody Registry 세부 기록 (s) 한 항체 액세스 / RRID. 일반 번호 (" 3643095"), "AB_3643095" 또는 "RRID:AB_3643095"를 허용한다. 업스트림 루트는 목록값(accession은 여러 개의 curated 레코드, e.g로 맵을 할 수 있습니다. 멀티벤더 중복). 비효율적인 ID는 record_count 0, 오류가 없습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `antibody_id` | 문자열 | **필수** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

납품업자 카탈로그 번호 (exact, case-insensitive)에 의하여 항체를 찾아내십시오. 전체 텍스트 검색 및 카탈로그 번호 (또는 나열된 대안)에 대한 클라이언트 측 정확한 일치로 구현, 상류 열 필터 경로가 HTTP 500을 반환하기 때문에. 더 좁은 경기에 선택적인 납품업자 이름 (exact, case-insensitive)를 통과하십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `catalog_number` | 문자열 | **필수** |
| `vendor` | 문자열 | 옵션 정보 |
| `page_size` | 정수 | 선택 사항; 기본: 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

Antibody Registry 통계: 총 항체 수와 최신 날짜. 상류 /api/datainfo 페이로드를 반환합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart 소개 {/* #family-22 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `list_marts` {/* #list_marts */}

Ensembl BioMart marts (데이터베이스)를 사용할 수 있습니다. BioMart는 MART ->로 데이터를 구성합니다. DATASET -> - 차트 ATTRIBUTES/필터; 마트 이름 피드 list_datasets.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| — | 기타 제품 | 아니 분야; 빈 객체를 전달합니다. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

주어진 마트 (e.g.에서 사용할 수있는 데이터 세트 목록 인간 유전자의 hsapiens_gene_ensembl). dataset 이름은 속성/filter/query 도구를 공급합니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

dataset에 대한 통용되는 속성을 나열합니다 (높은 신호 subset). get_data의 속성을 선택하기 위해 list_all_attributes 전에 이것을 사용하십시오. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

dataset, minus dynamiclogs 및 microarray probes에 사용할 수 있는 모든 속성을 나열합니다. 큰 수 있습니다; list_common_attributes을 먼저 선호합니다. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

dataset에 사용할 수있는 필터 목록. 필터 좁은 get_data 쿼리 (예를 들어. chromosome_name, 바이오 타입) 필터로 get_data로 전달됩니다. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

BioMart 쿼리를 실행: dataset에 대한 요청된 속성을 검색, 선택적으로 필터에 의해 축소. 이것은 주요 자료-retrieval 도구입니다. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |
| `attributes` | 문자열 배열 | **필수** |
| `filters` | 객체 | 옵션 정보 |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

하나의 속성 유형에서 다른 (예를 들어,)에 단일 식별자를 번역하십시오. HGNC는 데이터셋 내에서 Ensembl 유전자 ID에 대한 상징입니다. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |
| `from_attr` | 문자열 | **필수** |
| `to_attr` | 문자열 | **필수** |
| `target` | 문자열 | **필수** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

하나의 속성 유형에서 다른 하나의 쿼리로 변환하는 많은 식별자를 번역 — 반복 get_translation 통화보다 더 효율적으로. `mart`은 서명 패리티를 위해 허용되지만 무시; `dataset`에서 쿼리 키입니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `mart` | 문자열 | **필수** |
| `dataset` | 문자열 | **필수** |
| `from_attr` | 문자열 | **필수** |
| `to_attr` | 문자열 | **필수** |
| `targets` | 문자열 배열 | **필수** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## 사이트맵 {/* #family-23 */}

<ToolOperationGroup>
<summary>작업 및 매개 변수 표시</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

ZINC 식별자에 의해 ZINC22/ZINC20에 있는 순차할 수 있는 화합물을 보십시오 — 대답 "what는 이 화합물이고 그것"를 판매하는 누구. Batched: 100 ids를 하나의 통화로 전달합니다. 동기화 업스트림 (submit + poll); timeout_s 초까지 걸릴 수 있습니다.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **필수** |
| `max_results` | 정수 | 선택 사항; 기본: 50 |
| `timeout_s` | 숫자 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

ZINC22's는 구조에 의하여 믿을 수 있는 화학 공간을 찾아냅니다 — 이 SMILES" 같이 믿을 수 있는 화합물 보기 "what 대답. 이것은 정확한 매치 및 아날로그 발견 (similarity) 도구입니다: CartBlanche22는 `dist` 매개 변수가 다양한 통해 정확하게 경간하는 하나의 구조 연구 엔드 포인트를 노출하므로 별도의 유사성 조사 도구가 없습니다. 가장 느린 ZINC 쿼리 - 느슨한 시작보다 `dist`을 점차적으로 올리십시오.

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `smiles` | 문자열 | **필수** |
| `dist` | 정수 | 선택 사항; 기본: 0 |
| `adist` | 정수 | 옵션 정보 |
| `max_results` | 정수 | 선택 사항; 기본: 50 |
| `timeout_s` | 숫자 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

ZINC 화합물에 납품업자 카탈로그 수를 해결하십시오 — "에 ZINC 물질이 공급자 부호이고, what's 그것의 Structure"는 대답합니다. Batched: 전화 당 100 공급자 부호까지. 동기화 업스트림 (submit + poll).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `supplier_codes` | ['string', 'array'] | **필수** |
| `max_results` | 정수 | 선택 사항; 기본: 50 |
| `timeout_s` | 숫자 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

ZINC22에서 순차적 화합물의 무작위 샘플을 그릴 — 건물 검열 갑판, 재산 기본, 또는 decoy 세트를 위해. `count` 이 tool's `max_results`로 두 배; re-calling는 신선한 표본을 그립니다. 동기화 업스트림 (submit + poll).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `count` | 정수 | 선택 사항; 기본: 50 |
| `subset` | 문자열 | 옵션 정보 |
| `timeout_s` | 숫자 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

ZINC 화합물을 위한 docking-ready 3D 구조를 찾아내십시오. ZINC22는 3D 컨퍼런스 (DOCK .db2.gz, .mol2.gz, .sdf.gz)를 파일 저장소에 미리 생성한 3D 컨퍼런스 (DOCK .db2.gz, .mol2.gz, .sdf.gz)를 배포합니다. 전화당 최대 50 ids (3D retrieval은 per-compound 일입니다). 동기화 업스트림 (submit + poll).

| (주) | 유형 | 필요조건 및 constraints |
| --- | --- | --- |
| `zinc_ids` | ['string', 'array'] | **필수** |
| `timeout_s` | 숫자 | 선택 사항; 기본: 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## 예제 응답 기록 {/* #example-response-records */}

<ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">예 응답 기록</ExampleDownload>은 정확한 입력, 캡핑 응답 발췌 및 작동 결과가 포함되어 있습니다. 반환된 기록, 빈 경기 및 실패한 요청을 Distinguish. 결과는 메타 데이터, 스키마 또는 식별자가 될 수 있습니다. 당신의 연구에서 그들을 사용하기 전에 소스 필드와 완성 플래그를 확인합니다.
