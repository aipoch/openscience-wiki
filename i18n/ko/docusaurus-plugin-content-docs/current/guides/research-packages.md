---
title: ".science 연구 패키지"
description: "파일 및 증거와 함께 세션을 내보내고 다른 프로젝트에 대한 연구 기록을 검사합니다."
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# .science 연구 패키지 {/* #science-research-packages */}

**.science** 연구 패키지는 대화 지점, 파일 및 기록 된 증거를 복부에 제공합니다. colleague는 프로젝트로 가져올 수 있으며 연구 기록을 검사합니다. 수입된 세션은 읽기 전용입니다. v0.31.0에서 데스크톱 앱에서 **Fork**을 사용하여 writable 복사를 만들고 연구를 계속합니다.

## 공유하기 {/* #choose-what-to-share */}

| 수신자는 무엇을 필요로합니까? | 수출입 |
| --- | --- |
| 대화 텍스트 읽기 또는 편집 | [대화 PDF 또는 Markdown](sessions.md). |
| 선택된 원본 파일 사용 | [파일 다운로드 또는 artifact ZIP](files.md). |
| 대화 지점, 파일 및 증거를 검사 | ₢ 킹 `.science` 연구 패키지. |

패키지는 업로드 된 연구 자료, 대화 텍스트 및 생성 된 결과를 포함 할 수 있습니다. 공유하기 전에 내용을 검토하십시오. 그것은 독립적 인 사본입니다 : 로컬 작업을 삭제하는 것은 다른 사람에게 이미 전송 된 패키지를 제거하지 않습니다.

Side Chat 대화, 개인 [독서 bookmarks](bookmarks.md) 및 메모는 패키지에서 제외됩니다. 수신자는 저장된 보고서 또는 수출하기 전에 대화에 필요한 정보를 입력합니다.

## 연구 패키지 수출 {/* #export-the-session */}

1. 종료 또는 세션에서 작업을 중지합니다. 메뉴를 열고 **Export → Export Session package**을 선택합니다.
2. 수출 범위와 어떤 omitted 내용 또는 크기 제한을 검토하십시오.
3. 수출을 확인하고 `.science` 파일을 임의 폴더에 저장하십시오.
4. 완료 될 때까지 진행 상황을 따라 **Show in folder** 파일을 찾습니다.

| 수출 옵션 | 선택 방법 |
| --- | --- |
| 필수 항목 내보내기 | 필수 기록과 문학 메타데이터 유지; omit 옵션 문학 PDF. |
| 전체 내보내기 | 사용할 수 있는 문학 PDF 및 미리보기에 표시된 추가 내용이 포함되어 있습니다. |
| 콘텐츠 사용자 지정 | 개별 문학 PDF, 옵션 파일 및 버전 선택; 필수 증거가 포함되어 있습니다. |

문학 메타데이터는 항상 포함되어 있습니다. 문학 PDF이 필요한 경우 **Essential export**은 사용할 수 없습니다. **Full export** 또는 **Customize contents**을 사용하며 필요한 파일을 유지합니다. 수출업자는 전체 텍스트를 검색하지 않습니다. 확인하기 전에 나열된 PDF 및 크기를 확인합니다; **Full export**은 모든 크기 또는 콘텐츠 제한을 제거하지 않습니다.

<p className="example-label"><strong>실습 예제</strong> 표본 QC 회의에 손</p>

Open-Science v0.31.1의 이 예는 [GSE60450 샘플 QC 테이블](../reference/example-data.md)를 합산하는 세션을 내보내고 동일한 Mac에서 다른 프로젝트로 가져올 수 있으며, **Codex subscription**를 사용하여 포크에서 계속됩니다. `gse60450-qc-summary.csv`을 포함하는 완료된 세션으로 시작; 입력 테이블은 혼자 연구 패키지가 아닙니다.

**Essential export**을 선택하면 내용과 예상 크기, **Export**을 확인하십시오. 이 세션의 미리보기 추정 **805.6 키B**. 저장 된 파일을 가져 오기 전에 **Package operation completed**에 대한 대기; 세션의 크기는 다를 것입니다.

![실제 QC 세션 수출 옵션 및 예상 크기](/img/open-science/v0311/package-export.webp)

## 프로젝트로 가져 오기 {/* #import-and-inspect-a-package */}

1. 대상 프로젝트 메뉴를 열고 **Import Session package…**을 선택하거나 그 프로젝트에 하나의 `.science` 파일을 드롭합니다. 관련 파일을 직접 방문하면 대상 프로젝트를 선택할 수 있습니다.
2. 패키지 미리보기, 목적지 및 포함 또는 omitted 내용을 검토 한 다음 수입을 확인합니다.
3. 완료 및 **Open imported Session**을 선택하십시오.
4. 대화 지점을 검사하고 handover에 필요한 파일을 엽니 다. 다음 작업과 관련된 입력 및 결과를 확인할 수 있습니다.

이 예제의 경우 대상 프로젝트 **Public Genomics Examples**을 선택하십시오. 수입 미리보기 목록 **1 지점, 3 메시지 및 13 파일**. 그것은 또한 계정 자격 증명, 권한 부여 및 공급자 오염 식별은 제외됩니다. **Import**을 선택하기 전에 해당 정보를 확인하십시오.

![대상 프로젝트로 가져 오기 전에 QC 패키지 미리보기](/img/open-science/v0311/package-import-preview.webp)

수입된 세션을 열고 요약 CSV. **Imported research history** 통지는 이 복사본이 읽기 전용이며 코드를 실행하거나 직접 대화를 계속할 수 없다는 것을 확인합니다.

![그 상속 요약과 Fork를 가진 수입된 QC 기록은 단추를 계속합니다](/img/open-science/v0311/package-import-readonly.webp)

## 수신된 연구 기록 사용 {/* #use-the-received-research-record */}

1. **Fork to continue**을 수입 세션에서 선택하거나 세션 메뉴에서 **Fork**을 선택합니다. **Fork completed**을 기다리며 새로운 세션을 엽니다. 코드는 자동으로 실행되지 않습니다.
2. 상속 요약 검사, 사용 가능한 모델을 선택하고 Python 런타임을 확인합니다. 이 예제는 **Codex subscription / gpt-5.6-sol**을 사용했습니다. 수입된 자격 및 권한은 수신 임명에 허가를 제공하지 않습니다.
3. 다음 프롬프트를 보냅니다. Python 승인이 나타나면 요청된 계산을 검사하고 계속 진행할 수 있습니다.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. 새 파일을 엽니다. **12** 샘플, **269027617**의 총 원시 카운트 및 **22418968.08333333333333333333**의 의미를 반환합니다. 의미는 공급된 QC 테이블을 요약합니다; 그것은 정상화한 표식 또는 차별 압축 결과 아닙니다.

![포크 완료 및 Codex을 사용하여 생성 된 새로운 계산 파일](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">자주 묻는 질문</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">새로운 계산</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">계산 노트</ExampleDownload>

새 파일 두 개는 Fork에 저장되며, 원본 세션과 가져온 세션의 요약 파일은 변경되지 않습니다. 일반적인 사용 방법은 [기존 세션 Fork](sessions.md#fork-session)를 참고하세요. 가져온 사용량은 로컬 활동 합계에 포함되지 않습니다.

수신 확인 기록은 sender에 의해 공급된 검사를 설명합니다. 이 컴퓨터에서 검증을 다시 실행했다는 뜻은 아닙니다. 파일 버젼, 비교 기준 및 결과 읽기; [재현성](reproducibility.md)을 참조하여 확인 작업을 수행하는 방법.

## 취소 또는 송금 {/* #cancel-or-retry-a-transfer */}

**Run in background**은 이동이 계속되는 동안 진행되는 창을 숨깁니다. 정지에 **Cancel**를 사용하십시오; 창을 숨기는 것은 가동을 취소하지 않습니다.

청소가 불완전한 경우에, 다시 시도하기 전에 **Retry cleanup**를 사용하십시오. 실패 후, **Try again**는 동일한 파일과 목적지를 나타냅니다. 다른 패키지를 별도로 선택하면 intent. 두 번째 가져 오기를 시작하기 전에 기존 작업을 확인하고 완료 할 때 수입 된 세션 및 파일을 검사합니다.
