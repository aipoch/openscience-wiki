---
title: "Gene-count matrix의 샘플 품질을 확인"
last_update:
  date: '2026-09-16'
---

# Gene-count matrix의 샘플 품질을 확인 {/* #check-sample-quality-in-a-gene-count-matrix */}

<p className="example-label"><strong>실습 예제</strong> GSE60450에서 샘플 품질을 확인</p>

다른 압축 분석을 실행하기 전에, 카운트 매트릭스가 구조적으로 유용하고 그 샘플 라벨이 추적 할 수 있는지 확인하십시오. 이 walkthrough는 진짜 대중적인 **GEO의 GSE60450** 쥐 mammary RNA-seq 모체를 이용합니다. 그것은 12 샘플 QC 테이블, 원시 라이브러리 크기 플롯 및 Open-Science의 방법 보고서를 생산합니다.

**연구 결정**:은 내부적으로 일정한 파일을 샘플 주석 및 별도의 설계 통계 분석으로 진행할 수 있는 파일입니다. 아래 체크는 주소 파일 무결성 및 descriptive counts. 그들은 생물학적 comparability, 정상적인화, 배치 개정 또는 차별 표정을 설치하지 않습니다.

아래 치수 및 수치 결과는이 예 입력에 속합니다. 자신의 매트릭스로, 샘플 열을 정의하고 체크를 recompute.

## 소스 및 입력 계약 {/* #source-and-input-contract */}

[예제 데이터 및 예상 결과](../reference/example-data.md)에서 원래 행렬을 다운로드합니다. 업로드하기 전에 checksum, sample columns 및 metadata 필드를 확인하십시오. 이 작업 흐름을 통해 기본 값에 대한 페이지 사용.

## 1. 그것을 실행하기 전에 작업을 정의 {/* #1-define-the-work-before-running-it */}

프로젝트 작성 및 예 페이지에서 원래 행렬을 첨부합니다. 지원하다 Python 으로 `csv`· `statistics` 으로 `hashlib` (표준 라이브러리) 및 설치 `matplotlib` 을 통해 [런타임](../guides/runtimes.md) 그것이 복부인 경우에. Notebook 코드를 실행할 수 있는 연결된 모델을 사용합니다.

이 요청을 보내거나 열 정의를 보존하는 동안 출력 이름을 입력하십시오.

```text
Inspect the attached public GEO GSE60450 gene-count matrix in the Session
Notebook using Python csv/statistics/hashlib and matplotlib. Do not install
packages during the analysis. Preserve the input. Exclude EntrezGeneID and
Length from the 12 sample-count columns. Validate unique IDs, row widths,
nonnegative integer counts and missing entries. Save rnaseq-sample-qc.csv
with exactly six columns: compact_sample, original_column_name, total_raw_counts,
zero_count_genes, detected_genes_count_gt_0, median_count_among_detected_genes. Retain the complete original sample
identifier in original_column_name; compact_sample is only a compact display label.
For each sample compute the raw-count sum, count of zeros, count > 0,
and median of positive counts. Save rnaseq-library-sizes.png with all sample
labels and a raw-count axis, plus rnaseq-qc-report.md describing the source,
input SHA-256 before and after, method, label mapping and limitations.
Save all three outputs in English; I will reopen them to check the results.
Do not perform differential-expression testing or delegate.
```

전송하기 전에 헤더를 확인하기 위해 첨부 파일을 클릭하십시오 : 두 개의 메타 데이터 열은 12 개의 샘플 열에 의해 따랐습니다. 텍스트 미리보기는 큰 파일의 일부만로드합니다. Notebook은 전체 매트릭스를 읽을 수 있어야 합니다. 이 실행은 직접 계산을 보냈습니다. 먼저 플랜에 동의하고 싶다면 별도의 [회사연혁](../guides/planning.md) 흐름을 사용하십시오.

![실제 부착 된 매트릭스 및 열 정의](/img/open-science/research-workflows/rnaseq-qc-input.webp)

## 2. 샘플 계산에서 metadata를 유지 {/* #2-keep-metadata-out-of-sample-calculations */}

계산은 Entrez ID를 보존하고 일관성있는 행 너비를 검증하고 비 부정적 인 정수로 계산합니다. `Length`은 유전자 메타데이터이며, 제 15의 샘플이 아닙니다. 0 개는 측정 된 항목이며 누락 된 값이 아닙니다. 0으로 공백을 교체하거나 0-count 유전자를 침묵으로 제거하지 마십시오.

각 샘플의 경우, 총 원수, 제로 카운트 유전자 수, 숫자는 0보다 큰 수, 그리고 미디어 카운트 **검출된 유전자 중**. denominator를 기록합니다. 정확한 입력 란을 사용하십시오; `MCL1-DG`과 같은 컴팩트 라벨은 명시적 인 매핑으로 라벨을 표시하고 새로 인장 된 생물학 그룹이 아닙니다.

<span id="3-inspect-the-actual-execution" />

## 3. 실행을 검사하고 실패를 처리 {/* #3-inspect-the-execution-and-handle-a-failure */}

입력 파일 및 출력 이름을 포함하여 Python 권한 요청을 읽은 다음 범위를 설정 작업을 허용합니다. 대화에서 **Notebook**을 열고 완료된 셀과 출력을 검사합니다. 차원, 본래 상표, 미터 배열 및 hash의 앞에/후를 검사하십시오; 모델의 완성 메시지는 혼자 충분합니다.

입력 버전 ID가 해결되지 않으면 에이전트가이 대화의 첨부 입력 및 복원을 읽을 수 있습니다. 계속하기 전에 파일명과 체크섬을 확인합니다.

![차원을 가진 성공적인 Notebook 산출, hashes 및 계산된 표본 미터](/img/open-science/research-workflows/rnaseq-qc-rerun-notebook.webp)

예를 들어, **27,179 유전자 행 및 12 샘플 열**이 포함되어 있지 않은 행, 중복 ID, 누락 된 항목 또는 잘못된 수. **Generated**의 밑에 모든 3개의 산출 파일을 저장한 결과를 검열하기 위하여 여십시오.

## 4. 표본 테이블을 받아들이십시오 {/* #4-accept-the-sample-table */}

`rnaseq-sample-qc.csv`을 열고 **12 행 · 6 열**을 확인하십시오. 그것은 각 가득 차있는 본래 란 이름을 유지합니다. 아래 표는 모두 4 미터를 나열합니다; 다운로드 가능한 CSV에는 매핑 컬럼이 포함되어 있습니다.

[Baseline 테이블](../reference/example-data.md#sample-qc-baseline)과 모든 샘플 메트릭스를 비교하여 전체 샘플 식별자가 일치합니다.

![저장된 12 줄 표본 QC 테이블](/img/open-science/research-workflows/rnaseq-qc-rerun-table.webp)

이 입력을 위해, 0-count 플러스 각 행에 있는 검출된 유전자는 **27,179**와 동등해야 합니다. **48** 샘플 메트릭을 독립적 인 기본으로 비교하십시오. 계약은 공급된 입력에 대한 이러한 계산을 확인합니다; downstream assumptions는 여전히 자신의 평가를 필요로합니다.

## 5. 그것을 overinterpreting 없이 도형을 읽으십시오 {/* #5-read-the-plot-without-overinterpreting-it */}

`rnaseq-library-sizes.png`을 열고 확대합니다. 모든 12 개의 샘플 라벨, 원시 카운트 축 및 값이 정상화되지 않는 메모를 확인하십시오. 총 수는 **20,015,386**에서 **24,723,827**에 배열합니다.

![저장된 원본 라이브러리 크기 플로트](/img/open-science/research-workflows/rnaseq-qc-rerun-plot.webp)

더 큰 라이브러리 합계는 자체가 유전자가 다르게 표현된다는 것을 의미하지 않습니다. 다운스트림 분석 전에, 샘플 특성과 GSM 식별자는 GEO 메타데이터를 사용하여 매트릭스 컬럼에 따라 디자인, 대조, 정상화 및 필터링 규칙을 지정합니다. metadata를 검색하려면 [연결관](../guides/connectors.md)을 참조하십시오.

## 6. 방법 및 증거 유지 {/* #6-retain-the-methods-and-evidence */}

입력 체크섬, 치수, 유효성 검사, 정확한 라벨 매핑, runtime/library 버전 및 해석 제한을 포함하는 보고서를 유지하십시오. 값 비교 후 독립적 인 체크 섹션을 추가하십시오. 보고서 개정을 저장하지 않습니다 테이블 또는 숫자를 recompute.

기본으로 모든 **48** 샘플 메트릭을 비교하고 입력 SHA-256이 `128d2411f3169de0cac9963c30152bb5c9a3083ac80fd25651b97cf4b7304691` 남아 있는지 확인하십시오. 예를 들어, Python 3.12.14과 matplotlib 3.11.1를 기록합니다. 자신의 실행에 사용 된 버전을 기록합니다.

<a href="/docs/examples/gse60450/rerun-20260916/rnaseq-sample-qc.csv" download>QC 테이블</a>, <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-library-sizes.png" download>팟캐스트</a> 및 <a href="/docs/examples/gse60450/rerun-20260916/rnaseq-qc-report.md" download>- 연혁</a>를 다운로드하십시오. 출력을 따라 원래 입력 및 세션 Notebook을 유지합니다. [Reproducibility 검사](../guides/reproducibility.md)을 사용하여 환경을 준비하고 계산을 다시 실행합니다.
