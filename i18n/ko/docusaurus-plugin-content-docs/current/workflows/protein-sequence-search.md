---
title: "단백질 시퀀스를 찾아 BLAST 검색 완료"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 단백질 시퀀스를 찾아 BLAST 검색 완료 {/* #find-a-protein-sequence-and-complete-a-blast-search */}

<p className="example-label"><strong>실습 예제</strong> 검토 된 인간 hemoglobin 알파 항목을 찾아서 시퀀스를 검색하십시오</p>

인간 HBA1 유전자 이름과 함께 시작, 검토 UniProt 단백질과 그것의 canonical FASTA를 검색하고 완성 된 보고서를 검사합니다. 이 예제는 알려진 단백질을 사용하여 시퀀스 검색 및 비교를 가르칩니다.

시작하기 전에 필요한 커넥터를 활성화하려면 [과학 데이터베이스](../tools/databases.md#connect-database)을 따르십시오. 연결된 모델과 사용 가능한 [Notebook 런타임](../guides/runtimes.md)을 사용합니다.

## 1. 단백질을 찾아 FASTA를 검색 {/* #sequence-search */}

**유전자 및 종양학**은 Accession을 알고 있기 전에 UniProt 항목을 발견 할 수 있습니다. `search_uniprot_entries`을 유전자 이름, 단백질 이름 구문 또는 생물과 함께 사용하십시오. `organism_id`은 지정된 세무와 일치하지만 `reviewed: true`은 스위스 프로트와 `false`를 선택하여 비검토된 TrEMBL 항목을 선택합니다. Omit `reviewed`는 둘 다를 포함하기 위하여. 필터를 변경하지 않고 `next_cursor`을 따르거나, 쿼리를 계속할 때 페이지 크기가 변경됩니다.

**유전자 및 종양학**을 활성화하면 연결된 모델과 사용 가능한 Notebook 런타임으로 세션을 엽니다.

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

FASTA를 사용하기 전에 JSON을 엽니다. 이 쿼리는 **P69905 / HBA_HUMAN의 경우**, **호모 사파이어**, **142 아미노산**를 반환, 유전자 이름 **HBA1 및 HBA2**. 응답은 UniProt 릴리스 **2026_03**, `total_results: 1` 및 `has_more: false`를 확인했습니다. FASTA 헤더는 접근과 생물을 보존합니다. 순서는 142 잔류물을 포함합니다. 유전자 이름 쿼리는 1 개 이상의 유전자와 관련된 단백질 항목을 반환 할 수 있으므로 하나의 매핑을 삽입하지 마십시오.

![UniProt 쿼리 필터 및 반환 검토 된 인간 단백질 항목](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">UniProt 쿼리 및 FASTA 응답</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">Canonical FASTA의 특징</ExampleDownload>

## 2. 제출 및 BLAST 작업을 따르십시오 {/* #blast-jobs */}

유사성 검색을 위해 **한국어 (Korean)**을 활성화하고 3 BLAST 작업을 사용합니다. 순서는 대중적인 NCBI 서비스에 보내집니다; 공공 또는 기타 권한 입력을 사용하십시오.

1. 순서, 그것의 `molecule_type` 및 호환성 데이타베이스에 한 번 `blast_submit`를 호출하십시오. 반환된 `rid` 및 투표 지도 유지. 위의 단백질의 경우, `molecule_type: protein` 및 `database: swissprot`은 단백질 검색을 선택합니다.
2. `blast_status`을 RID로 호출합니다. 동일한 RID에 대한 요청은 적어도 **60 초 출발**이어야하며 적어도 **10 초 출발**의 모든 BLAST 요청을해야합니다. 서비스에 의해 더 긴 지연을 따르십시오. `WAITING`은 여전히 퀴즈 또는 실행을 의미합니다. 다시 제출할 때 RID를 유지하십시오.
3. `READY` 후, `blast_results` 이전의 동일한 간격을 존중합니다. 유효한 체재는 `json2`, `xml2`, `text` 및 `tabular`입니다. 보고서는 2 MiB에 바인딩됩니다; 필요한 경우 몇 번 조회할 수 있습니다. 탭 출력은 코멘트를 포함 하 고 자동으로 CSV 테이블.
4. 쿼리 길이, 효과적인 데이터베이스, 일치 액세스, 정렬 경간, 정체성 및 E-value 실제 보고서. Sequence 유사성은 혼자 기능을 설치하지 않습니다. 알려진 hemoglobin 순서는 통제를 학습하는 데 유용합니다, 알 수없는 단백질의 발견을 해독하지.

제출이 `blast_submission_unknown`을 반환하면 합격은 불확실하지 않습니다. 응답 및 RID를 보존합니다. 제출 영수증 또는 `WAITING` 상태를 완료된 정렬으로 취급하지 마십시오. 정확한 입력 및 반환 조건은 [BLAST 참고](../reference/connector-operations.md#blast_submit)에 있습니다.

## 3. 완료된 보고서 열기 및 해석 {/* #blast-report */}

위의 세션에서 동일한 단백질 예제를 계속합니다. 제출 영수증을 유지하십시오. 나중에 요청은 동일한 작업을 다시 시작할 수 있습니다. 지불 조건:

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![RID 및 최소 오염 간격으로 BLAST 제출 영수증](/img/open-science/v0320/blast-submitted.webp)

보고서가 준비되면 **hba1-blast-results.md**을 열고 **hba1-blast-raw.json**로 테이블을 비교합니다. 이 예제는 **BLASTP 2.17.0 +**, **스카프**과 함께 보고서에 의해 확인, **142-아미노 산** 쿼리 및 **조회수 5** :

| 오시는 길 | ID/W/W/W/W/W/W | Query 적용 | E 가치 |
|---|---:|---:|---:|
| 전화기:+86-10-62565666 팩스:+86-10-62565666 | 142/142 (100%) | 100% | 1.99033e-100의 특징 |
| 전화기:+86-10-8339999 팩스:+86-10-8339999 | 140/141 (99.29%) | 99.30% | 1.06845e-98의 |
| 모델: Q9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98의 |
| 전화기:+86-10-62565666 팩스:+86-10-62565666 | 139/142 (97.89%) | 100% | 3.57742e-98의 |
| 전화기:+86-21-666666666 팩스:+86-21-666666 | 138/141 (97.87%) | 99.30% | 3.00466e-97의 |

![5개의 실제적인 조회, 쿼리 적용 및 정체성 계산을 가진 완성되는 BLAST 보고](/img/open-science/v0320/blast-results.webp)

각 첫번째 HSP를 위해, ID는 정렬 길이에 의해 분할된 동일한 residue 조사입니다. Query 적용은 142에 의해 분할 된 포괄적 인 쿼리 좌표입니다. P01923를 위해, 조회 경간은 2–142: 적용은 141/142 = 99.30%이고, 정체성은 140/141 = 99.29%입니다. 두 백분율은 다른 질문에 응답; 함수 할당이 정확하다는 확률은 없다.

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">완료된 보고서</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">다섯 자리 테이블</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">NCBI JSON2 보고서</ExampleDownload>

상위 히트 P69905은 입력 순서 자체이므로 100% 정체성과 적용은 알려진 순서 검사를 제공합니다. 다른 히트는 비슷한 순서, 새로운 기능 발견하지. 결과 표에 대한 원시 보고서 및 쿼리를 유지; 나중에 데이터베이스 릴리스는 hit list를 변경할 수 있습니다.
