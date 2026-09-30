---
title: "Journal datasets 및 참고 속성"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Journal datasets 및 참고 속성 {/* #journal-datasets-and-reference-attributes */}

**Library → Journals**을 사용하여 저널 디렉토리, 메트릭스 또는 분류를 가져오고 해당 참조 옆에 표시하십시오. 데이터 세트는 **Source** 및 **Metric year**을 유지합니다. Open-Science은 상업 순위 데이터베이스에 가입을 제공하지 않습니다; 사용 및 검증을 유지 할 수 있는 데이터를 가져옵니다. 저널 속성은 저널을 설명, 품질 또는 개별 종이의 발견.

## 작은 dataset 준비 {/* #prepare-dataset */}

<p className="example-label"><strong>실습 예제</strong> 기존 종이에 게시자 정보를 추가</p>

다운로드 <ExampleDownload path="/examples/journals/journal-publisher-directory.csv">3주 CSV</ExampleDownload>. 그것은 자연 통신, PLOS 의학 및 BMJ, 그들의 전자 ISSNs, 출판사 및 웹 사이트 주소를 포함. 소스는 [회사 소개](https://www.nature.com/ncomms/), [PLOS 약](https://journals.plos.org/plosmedicine/) 및 [BMJ의 가입자 정보](https://www.bmj.com/about-bmj/resources-subscribers)입니다. 이것은 **2026**에 대한 출판사-directory 스냅 샷이며, 발명 된 충격 요소 또는 quartiles보다는 텍스트 속성이 있습니다.

일치하는 참고를 위해, 사용 Ju 외.의 종이 **CO2의 전기화학 감소를 위한 금속 질소 도핑 탄소 촉매의 활동 그리고 선택성**, DOI **10.1038/s41467-017-01035-z**. 라이브러리에 이미 있지 않은 경우 [bibliographic 기록을 추가하십시오](library.md) 및 자료에 대한 저널 및 ISSN을 확인하십시오. 저널 속성을 표시 할 수있는 전체 텍스트가 필요하지 않습니다.

CSV, TSV, XLSX 및 저널 번들은 **32 메가바이트**까지 지원됩니다. **Download template**는 시작 레이아웃을 제공합니다. 속성에서 별도의 정체성 열을 유지하십시오. ISSNs를 텍스트로 보존, 하이픈과 모든 최종 X를 포함.

## 가져 오기 및지도 열 {/* #import-columns */}

1. **Library → Journals → Import attributes**을 열고 업로드 영역을 클릭합니다. 이미 존재하는 경우, **Journal dataset** selector를 열고 **New dataset**을 선택합니다. CSV을 선택합니다.
2. **Header row** 및 **Preview**을 확인하십시오. 이 파일은 열 이름으로 줄 **1**을 사용합니다. 소스가 열을 가로지르면 **Transpose**만 사용하십시오.
3. **Source**을 `Publisher websites` 및 **Metric year**로 `2026`로 설정하십시오. 제안 된 값 : 파일에서 다른 년과 같은 번호는 1 년 동안 실수가 될 수 있습니다. 실제 메트릭 데이터 세트를 위해, 파일의 출판 연도와 다를 수 있는 값 설명 년을 사용합니다.
4. 아래에로 4개의 란을 지도하십시오. 각 저장된 속성을 구별합니다. **Skip**는 열을 나타냅니다.
5. **Review import** 선택, 각 행을 확인, 다음 **Import attributes**. 이 예제는 **3 준비; 0는 주의합니다**, 다음 **Journal attributes imported**을 보여줍니다.

| 원본 열 | 으로 가져오기 | 가치 유형 |
| --- | --- | --- |
| 학술지 이름 | 학술지 이름 | Identity 필드 |
| ISSN | ISSN | Identity 필드 |
| 출판사 | Journal 속성 | 텍스트 |
| 홈페이지 | Journal 속성 | 텍스트 |

![저널 정체성 및 출판사 속성을 명시된 소스 및 년](/img/open-science/v0340/journal-column-mapping.webp)

**Abbreviation** 및 **External journal ID**은 추가 정체성 옵션입니다. 외부 ID는 네임스페이스를 필요로 합니다; 다른 카탈로그에서 식별자는 교환 할 수 없습니다. 속성 유형에는 **텍스트**, **이름 &#42;**, **Single choice** 및 **Multiple choices**가 포함됩니다. ISSNs 또는 categorical quartiles에 대한 수치를 사용할 수 있습니다.

줄은 **Matched**, **New**, **Ambiguous match**, **Invalid** 또는 **Duplicate**일 수 있습니다. 충돌 식별자와 반복된 행을 확인하기 전에 가져 오기. 열 역할을 수정하려면 **Edit mapping**로 돌아가십시오. 수출 문제 행 또는 명시적으로 제공 할 때주의를 기울입니다. 새로운 줄은 저널 항목, 당신의 전기에 새로운 종이를 만듭니다.

## 참고문헌에 표시 속성 {/* #show-attributes */}

1. 선택한 데이터 세트는 **게시자 웹 사이트 2026** 및 **Show in literature**입니다.
2. **All references**로 돌아와 `Understanding activity`을 검색합니다.
3. 종이를 엽니 다. **Journal attributes**에서 **Publisher → Springer Nature** 및 저널 웹 사이트를 확인하십시오. 속성의 정보 제어를 선택하여 소스/년을 검사합니다.
4. 수입한 저널을 가진 참고 **모델 번호: ISSN 2041-1723**를 비교하십시오. 논문 게재 연도 **2017**은 dataset의 **2026** 스냅샷과 분리되어 있습니다.

![문학의 표시와 함께 가져온 저널 dataset](/img/open-science/v0340/journal-dataset.webp)

![기존의 Nature Communications Reference에 대한 출판물 속성](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature**은 공용 도서관, 프로젝트 전망, 수집 및 참조 세부 사항에 적용됩니다. **근원 당 1 년**은 한 번에 표시됩니다. 같은 소스에서 다른 해를 활성화 이전 표시 년을 대체합니다. 속성을 미끄러운 것은 다른 년의 값으로 채워지지 않습니다. 참조 테이블에서 **Customize**을 사용하여 표시 할 수있는 저널 열을 선택하십시오.

## 저널 일치를 해결하고 dataset를 유지 {/* #journal-matches */}

**More actions → Journal alignment** 항목 및 **도서관 / Recheck 라이브러리**을 사용하여 일치하고 일치하지 않고 주변 기록을 검사합니다. 이 체크는 도서관을 읽습니다; 그것은 조용히 참조 메타 데이터를 다시 작성하지 않습니다. 학술지 이름과 ISSNs를 잘못 해결하기 전에 원본 출판물에 대해 확인합니다.

**Find journal candidates → Choose journal → Confirm journal association**은 선택한 논문에 대한 참조를 링크합니다. 그것은 그 참고에 적용, 유사한 제목을 가진 각 종이. 확인 제거 자동 일치에 반환; 참고 저널 정체성을 변경하면 협회가 유효하게 될 수 있습니다.

**Update dataset**을 사용하기 전에 의도한 데이터셋을 선택하십시오. 소스, 년 및 매핑을 다시 검토 한 다음 수입 후 영향을받는 참조를 확인합니다. 다른 해의 데이터를 별도의 데이터 세트로 유지하십시오. dataset 작업을 사용하여 이름/출원/년을 편집하거나 data 및 열 설정을 유지한 저널 번들을 수출합니다. 원본 소스 파일과 그 액세스 약관의 사본을 유지하십시오.
