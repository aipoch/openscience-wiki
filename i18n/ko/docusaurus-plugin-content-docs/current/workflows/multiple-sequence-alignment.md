---
title: "Align 다중 시퀀스와 방부된 위치를 검사합니다"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Align 다중 시퀀스와 방부된 위치를 검사합니다 {/* #align-multiple-sequences-and-inspect-conserved-positions */}

<p className="example-label"><strong>실습 예제</strong> 인간, 쥐 및 bovine hemoglobin 알파 사슬 비교</p>

UniProt sequences를 검토하여 원격 클러스터 오메가 서비스로 정렬하고 열이 동일한 아미노산을 모두 세 가지로 포함합니다. 예를 들어 142-column alignment를 116로 완전히 보존 된 열을 생산했습니다. 이 작은 세 가지 특성 세트에 대한 결과, 기능적인 표기 또는 phylogenetic 나무가 아닙니다.

## 1. 세션 및 소스 준비 {/* #alignment-inputs */}

연결 설정은 [과학 데이터베이스](../tools/databases.md#connect-database)에 설명됩니다.

1. **Hemoglobin 소송 소송**을 만들고 연결된 모델과 새로운 대화를 엽니다. 이 예제는 **Codex subscription**을 사용했습니다.
2. **Settings → Connectors**에서 **유전자 및 종양학** 및 **한국어 (Korean)**를 Main로 사용할 수 있습니다. 클러스터는 게놈에 속한다; 별도의 Connector이 아닙니다.
3. **Settings → Privacy → Share contact email with research data services**의 클러스터 오메가에 의해 요청된 유효한 연구 서비스 접촉 이메일을 구성하십시오. 실제적인 접촉을 사용하여, 발명한 주소가 아닙니다. Sequence 입력은 EMBL-EBI로 전송됩니다.
4. 아래에서 프롬프트를 보냅니다. 공공 또는 다른 권한의 순서를 사용하십시오.

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

정렬 전에 반환된 레코드를 확인:

| 학회소개 | 자주 묻는 질문 | 세금 | Canonical 길이 |
| --- | --- | --- | --- |
| 인간 · Homo 사파이어 | 전화기:+86-10-62565666 팩스:+86-10-62565666 | 9606 | 142 아 |
| 쥐 · Mus musculus | 전화기:+86-10-8339999 팩스:+86-10-8339999 | 10090 | 142 아 |
| Bovine · Bos taurus | P01966, 중국 | 9913 | 142 아 |

FASTA 이름은 `human_P69905`, `mouse_P01942` 및 `bovine_P01966`입니다. 모든 이름은 독특해야합니다. 인간 P69905는 HBA1와 HBA2와 관련있습니다; 단백질 항목은 반드시 고유 한 유전자가 아닙니다. 각 순서로 접근과 생물을 지키십시오.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">3개의 입력 순서</ExampleDownload>

## 2. 한 번 제출하고 일을 따르십시오. {/* #alignment-job */}

에이전트는 결합 FASTA, `stype: protein` 및 `outfmt: clustal_num`와 **Genomes → clustalo_submit**을 호출합니다. 서비스는 적어도 3개의 기록이 요구되고 대부분의 4,000 기록 또는 4 MiB에 받아들입니다. 반환된 `job_id`, 요청된 체재 및 제출 영수증을 지키십시오.

1. Notebook 제출 응답을 검사합니다. 직업 ID와 **견적 요청**는, 완료하지 않는 받아들였습니다.
2. 동일한 ID를 위해 Query `clustalo_status`, 체크 사이 적어도 10 초를 기다리고 어떤 더 긴 서비스 지도를 따르십시오. 큐가 느리기 때문에 다른 사본을 제출하지 마십시오.
3. **이름 &#42;** 이후, 같은 ID와 형식과 `clustalo_results` 호출. `.aln` 파일로 반환된 내용을 저장; 제안 된 파일 이름을 수신하지 자체 파일을 저장하지 않습니다.
4. 세션이 중지되면, 작업 ID를 유지하고 나중에 동일한 작업을 계속합니다. 불확실한 제출 응답은 여전히 받아들일 수 있습니다; 자동적인 resubmission를 피하십시오. **엑세스**, **팟캐스트** 및 **공지사항**는 조사를 요구하고, 빈 정렬 해석이 아닙니다.

![실제 직업 ID, 할당된 체크 및 세션 Notebook의 완료 상태](/img/open-science/v0331/clustal-submission.webp)

이 예의 영수증은 처음 **견적 요청**을 기록합니다. 나중에 Notebook 결과가 **이름 &#42;**을보고 클러스터 O (1.2.4) 정렬을 반환했습니다. 결과에는 공급자 통제된 보유 기간이, 주까지 문서화했습니다; 보고서를 신속하게 저장합니다. 결과 크기 제한은 8 MiB입니다. [작업 분야](../reference/connector-operations.md#clustalo_submit) 참조.

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">원본 제출 영수증</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">원료 정렬</ExampleDownload>

## 3. 정렬 및 계산 열을 확인 {/* #alignment-results */}

생성 된 **hemoglobin_alpha_conservation_report.md**을 엽니 다. 입력 FASTA와 원시 정렬을 사용하여 액세스 및 시퀀스 길이를 비교합니다. 각 정렬 순서에서 간격을 제거하고 나머지 잔류물이 입력과 정확히 일치한다는 것을 확인합니다; 이 캐치 사고 순서 대용 또는 truncation.

![소스 식별, 정렬 수 및 제한이있는 영어 보고서](/img/open-science/v0331/clustal-report.webp)

이 실행을 위해:

| 【특전】 | 결과 |
| --- | --- |
| 입력 및 정렬 순서 | 3개의 각 142 잔류물 |
| Alignment 열 | 142 |
| Gap-containing 열 | 0 |
| 모든 3개의 순서에 있는 Identical 잔류물 | 116 열 |
| 가변 열 | 26 |
| 완전히 보존된 분수 | 116 / 142 = 81.7% |

클러스터 출력에서 `*`은 완전히 보존 된 열을 나타냅니다. `:` 및 `.`는 유사한 재산을 가진 그룹을, 동일한 잔류물 아닙니다 설명합니다. 위의 분수에 대한 동일한 비갭 열만 계산합니다. 예제는 D7, G16, H59, H88 및 R142를 포함합니다. 여기서 정렬은 gap-free이므로 열은 canonical sequence 잔류물 숫자와 동일합니다. 간격으로, 매 순서는 따로따로 지도하고 잔류물 수 또는 성숙한 단백질 번호로 alignment 란을 confuse하지 않습니다.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">결과 보고서</ExampleDownload>

## 4. 증거 내에서 해석을 유지 {/* #alignment-interpretation */}

이 3 관련 포유류의 보존은 제약에 대한 저하를 지원하지만 잔류물의 기능을 증명하지 않습니다. 접히는, 안정성, 공유된 ancestry 및 선택된 표본은 모든 사정 할 수 있습니다. Broader taxon 샘플링, 구조적 컨텍스트 및 실험적 증거는 다음 단계로 구분됩니다. 여러 순서 정렬은 BLAST 검색 또는 phylogenetic 트리가 아닙니다.

입력 FASTA를 유지, 원료 정렬, 영수증 및 보고서 함께. 알 수없는 순서로 시작하려면 [단백질 발견 및 BLAST](protein-sequence-search.md)을 사용하십시오. 프로그램별 프로필 검색을 위해 [HMMER 및 InterProScan 기능](../tools/databases.md#sequence-tools)을 참조하십시오.

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
