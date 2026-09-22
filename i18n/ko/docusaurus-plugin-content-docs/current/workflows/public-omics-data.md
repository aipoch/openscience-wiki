---
title: "공공 omics 데이터를 찾아 파일 재고를 구축"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 공공 omics 데이터를 찾아 파일 재고를 구축 {/* #find-public-omics-data-and-build-a-file-inventory */}

알려진 액세스 또는 연구 주제로 시작, 공공 실행 메타 데이터를 검사, 소스 위치와 함께 파일 재고를 저장하고 가능한 체크섬. 아래 예제는 inventories를 생성합니다. 데이터 다운로드 및 분석은 별도의 작업입니다.

시작하기 전에 필요한 커넥터를 활성화하려면 [과학 데이터베이스](../tools/databases.md#connect-database)을 따르십시오. 연결된 모델과 사용 가능한 [Notebook 런타임](../guides/runtimes.md)을 사용합니다.

## 1. 알려진 실행을 해결하고 파일을 검사 {/* #ena-runs */}

1. **Omics Archives - 오믹스**의 밑에 활성화된 **Settings → Connectors**. PRJ 연구 또는 SRR 실행과 같은 `ena_search_runs`에 대한 공공 ENA / INDC 액세스 공급. GEO `GSE` 식별자는 INSDC 연구에 처음 연결되어야 합니다. 키워드는 허용되지 않습니다.
2. `run_accession`, 생물, 도서관 전략/레이아웃 및 `truncated`를 검사하십시오. 최대는 1,000 실행입니다. 상쇄 또는 continuation 토큰이 없습니다; 응답이 truncated 경우에 접근을 좁은.
3. `ena_get_run_files`에 반환된 한 번에 전달합니다. `found`, `fastq_available` 및 `fastq_files`의 모든 항목 확인. 재고 공급 URL, 압축 파일 크기 및 업스트림 MD5; 파일을 다운로드하지 않거나 내용을 확인하지 않습니다.
4. 별도의 다운로드 전에 저장을 확인하고 나타날을 유지하십시오. 목록된 checksum에 대한 다운로드된 바이트를 검증합니다. 쌍의 라이브러리는 정확히 두 개의 파일이 필요하지 않습니다; `file_index`에서 읽기-메이트 ID를 사용하지 마십시오.

<p className="example-label"><strong>실습 예제</strong> SRR037073에 대한 파일 표시</p>

이 v0.31.1 예제는 **Codex subscription** 및 활성화 **Omics Archives - 오믹스** Connector를 사용합니다. 사용할 수 있는 Notebook 런타임과 세션을 열고, 다음을 보냅니다:

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

생성된 노트를 엽니다. 실제 검색은 **1 실행**, **Caenorhabditis 엘건**, **PRJNA123835의 장점**, **RNA-Seq는**, **싱글**를 `truncated: false`로 반환했습니다. 파일을 사용하기 전에 생물과 레이아웃을 확인합니다.

![ENA 쿼리 입력, 생성 된 노트에 ID 및 완전 플래그를 실행](/img/open-science/v0311/ena-notes.webp)

CSV을 열고 `ena-files.json`과 비교하십시오. 이런에는 `found: true`, `fastq_available: true` 및 **1 파일**, 크기 **25,154,397 바이트**가 있습니다. 은 FTP URL과 업스트림 MD5를 유지합니다. 미리보기 컬럼이 클립된 경우 다운로드 가능한 파일에서 전체 값을 복사합니다.

![URL, 크기 및 업스트림 체크섬과 실제 파일 ENA가 나옵니다.](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Query 노트</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ는 나타납니다</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">빠른 연결</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">파일 응답</ExampleDownload>

두 쿼리와 파일 목록 생성이 완료되었습니다. 이 예에서는 **FASTQ 파일이 다운로드 또는 체크섬 인증되지 않았습니다**. 다운로드는 별도 단계입니다. [Exact 모수](../reference/connector-operations.md#ena_search_runs)

## 2. 디스커버리는 주제에 의해 실행되고 프로젝트 파일을 검사합니다 {/* #omics-discovery */}

`ena_query_runs`을 사용하면 연구 주제가 있지만 액세스가 없습니다. 그것은 생물, 도서관 전략 및 키워드 필터와 결합합니다. 적어도 1개의 여과기는 요구됩니다; `tax_id` 후속 세금 포함. 기본 제한은 100이며 최대는 1,000입니다. truncated 응답에는 continuation 커서가 없습니다: dataset 합계로 반환된 조사를 대우하는 대신 쿼리를 좁은.

<p className="example-label"><strong>실습 예제</strong> 5개의 인간적인 RNA-Seq를 발견하고 ENA와 PRIDE 파일 재고를 검사하십시오</p>

1. **Settings → Connectors**에서 **Omics Archives - 오믹스**을 활성화하면 연결 된 모델과 사용할 수있는 Notebook 실행 시간으로 세션을 엽니다. 이 예제는 **Codex subscription**을 사용합니다.
2. 메타데이터를 요청하기 위해 아래 프롬프트를 사용하십시오. ENA 쿼리 및 PRIDE 프로젝트는 별도의 예입니다. 그들은 하나의 연구에서 일치하지 않습니다.
3. `ena-discovery.json`을 열고 쿼리, 생물을 검사, 파일 선택하기 전에 액세스 및 `truncated`을 실행합니다.

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![Query 조건 및 ENA 및 PRIDE 재고 결과 관찰](/img/open-science/v0320/omics-discovery-notes.webp)

4. 선택한 ENA 런에 대한 모든 재고를 비교합니다. 이 예제에서 쿼리는 **5 실행**을 `truncated: true`로 반환합니다. 첫 번째 실행, **전화기:+86-21-666666666 팩스:+86-21-666688**, **1 아카이브**, 크기 **462,508,712 바이트**, 업스트림 MD5. 원래 제출 재고는 `found: true`하지만 `submitted_available: false` 및 **0 파일**가 있습니다. 기존 실행을 위해서는 불편을 끼쳐 버리지 않아도 됩니다.
5. PRIDE 페이지 검사. **PXD000001의**는 **5 페이지에 기록 0**과 **4 페이지에 1**를 `api_total: 9`와 최종 `next_page: null`로 반환합니다. CSV에는 각각 9개의 PRIDE 파일이 ENA FASTQ 행과 함께 두 개의 위치를 공급하기 때문에 **19 행**이 있습니다. 다운로드 위치에서 별도의 파일 액세스.

![ENA 및 생성 된 재고 테이블에 PRIDE 항목](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">Query 노트</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">통합 재고</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">ENA 발견</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">ENA 파일 재고</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">PRIDE 페이지</ExampleDownload>

출력은 파일 재고이며, sequencing 또는 proteomics 데이터를 다운로드하지 않았습니다. 아카이브 FASTQ 및 BAM / CRAM과 같은 원본 제출은 다른 제품입니다. ENA의 원래 FTP 경로는 말 그대로 유지, 어떤 `#` 문자를 포함. PRIDE의 경우 `next_page` 및 반환된 메타데이터를 사용하십시오. `api_total`은 다른 프로젝트에 대한 부패 될 수 있으며, 체크섬 텍스트는 항상 알고리즘을 식별하지 않습니다. 별도의 다운로드 전에 필요한 형식을 선택하고 저장을 확인하고 업스트림 체크섬을 사용할 때 바이트를 확인합니다. 정확한 입력을 위해 [및 다운로드 가능한 레지스트리는 이제 v0.31.1 :](../reference/connector-operations.md#ena_query_runs)를 보십시오.
