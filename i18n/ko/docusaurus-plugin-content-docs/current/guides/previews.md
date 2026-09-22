---
title: "파일 열기 및 미리보기"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 파일 열기 및 미리보기 {/* #opening-and-previewing-files */}

선택한 버전을 검사하기 위해 저장된 결과를 엽니다. 이 페이지는 공유된 보고 통제 및 정규적인 문서 체재를 포함합니다. 순서와 구조 통제를 위한 자료 해석 그리고 [과학 뷰어](../tools/viewers.md)를 위한 [사이트맵](../tools/tables.md)를 사용하십시오.

## 열기, 확대 및 반환 {/* #open-enlarge-and-return */}

생성된 파일 카드는 미리보기를 엽니다. **오픈 ... 세션 옆에 분할보기**은 대화를 볼 수 있습니다. 다른 탭을 선택하여 파일을 전환, **전체 화면 미리보기를 엽니 다 ...** 하나 확대, 그리고 **닫기 미리보기 ...**는 그 표면을 닫습니다. **Collapse preview panel**는 개방된 파일을 삭제하지 않고 패널을 숨깁니다. 풀 스크린 미리보기 및 풀 스크린 파일 라이브러리는 다른 전망입니다.

| Header 통제 | 이름 &#42; |
| --- | --- |
| 파일명 및 버전 | 다운로드하거나 인용하기 전에 선택한 결과를 확인합니다. |
| 다운로드 | 그 결과의 사본을 저장 |
| 파일 작업 → Provenance | 관리된 artifact 버전에 붙어 있는 증거를 검열하십시오 |
| 컨텍스트에서 보기 | artifact를 생산하는 세션으로 돌아가기 |
| 이전 / 다음 파일 버전 | 사용할 때 Navigate immutable 저장된 개정 |
| 편집 / 비교 | 지원된 관리된 내용을 위해 유효한; 은 은 [파일](files.md) |
| 닫기 | 전망이 떨어졌다; 이것은 삭제되지 않습니다. |

위의 닫힌 동작은 파일 미리보기에 적용됩니다. [Side Chat 탭](delegation.md)은 별도의 확인을 가지고 있습니다: 측면 토론을 닫고 대화를 제거합니다. 전체 응용 프로그램 재시작은 또한 나머지 사이드 채팅을 삭제합니다. 이미 Main에 전달된 메시지는 저장됩니다.

자신을위한 독서 위치를 저장하려면 텍스트 또는 PDF 지역을 선택하고 **For me**을 선택하십시오. [독서 bookmarks](bookmarks.md) 참조.

## 형식의 파일 읽기 {/* #read-files-by-format */}

### 결과 표 읽기 {/* #read-a-result-table */}

<p className="example-label"><strong>실습 예제</strong> RNA-seq QC 테이블, 수치 및 보고서 읽기</p>

`rnaseq-sample-qc.csv`을 엽니다. 이 예에서 **12 행 · 6 열**을 표시하고 헤더로 첫 번째 행을 사용합니다. 수평 스크롤은 긴 소스 명명과 오른쪽에 미터를 노출합니다. 테이블의 행 번호는 표시 위치, 유전자 또는 샘플 ID입니다.

![12 샘플 QC 테이블](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

열 라벨 및 전체 식별자는 읽기 할 수 있습니다. 필드 정의와 공유 기본에 대한 체크는 [테이블 및 데이터 세트](../tools/tables.md)입니다.

소스 `.txt`은 탭 분리 된 매트릭스입니다; 텍스트 뷰어는 CSV 그리드보다 오히려 텍스트로 표시 할 수 있습니다. 파일의 확장명을 바꾸지 않고 delimiter 또는 과학적 의미를 변경하지 마십시오. 아주 큰 시사는 경계될 수 있습니다; 모든 표시된 행/열 한계를 전체 데이터 세트로 눈에 보이는 subset 대우하기 전에 읽으십시오. 체재 한계는 [참고 자료](../reference/formats.md)에서 입니다.

### 그림 검사 {/* #inspect-the-figure */}

`rnaseq-library-sizes.png`을 엽니다. **Zoom in**, **Zoom out** 및 **Reset zoom**를 사용하십시오; 축 라벨이 너무 작을 때 전체 화면을 엽니 다. Zoom은 전망 만 변경합니다. 그것은 소스 매트릭스 또는 통계 결과를 업데이트하지 않습니다.

![전체 화면 미리보기에서 실제 원시 총 수치](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

CSV/report에서 모든 12 개의 샘플 라벨과 매핑을 읽으십시오. 다른 막대기 고도는 혼자서 차별 표정을 설치하지 않습니다. 예제는 정상적인화 또는 hypothesis 테스트 없이 descriptive pre-analysis 체크입니다.

### 방법을 읽고 함께 입증 {/* #read-methods-and-provenance-together */}

Markdown는 headings, 목록, 코드 및 링크를 렌더링합니다. 보고서의 체크섬과 방법을 읽어서 플로팅 결과를 받아 보세요. 저자의 링크는 해당 소스 검토 또는 외부 브라우저 행동을 통해 목적지를 엽니 다. 증거로 치료하기 전에 전체 hostname을 검사합니다. 실패하거나 차단 된 소스 미리보기는 내용이 읽었는지 확인하지 않습니다.

**Provenance**을 사용하여 선택한 artifact의 코드, 실행 로그, 메시지, 환경 및 검토를 검사합니다. [Notebook 및 실행 증거](notebook.md)를 사용하여 **partial**, **뚱 베어** 또는 **No review for this version** 라벨을 읽으십시오.

### Office 파일 및 다중 페이지 수치 읽기 {/* #read-office-files-and-multi-page-figures */}

<p className="example-label"><strong>실습 예제</strong> QC 결과의 Office 및 TIFF 판독 사본 검사</p>

<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Word 보고서</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Excel 작업 책</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">PowerPoint 슬라이드</ExampleDownload> 및 <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">2 페이지 TIFF</ExampleDownload>는 동일한 저장된 GSE60450 QC 결과를 선물합니다. 이 글은 새 분석이 아닙니다.

| 형식 | 단계와 확인하는 것 |
| --- | --- |
| · DOCX | 첨부 및 보고서를 엽니 다. 두 페이지를 통해 스크롤; 첫 번째 샘플 행과 방법 / 해석 텍스트를 확인합니다. 풀 스크린 미리보기는 긴 줄을 더 공간을 제공합니다. Word 편집 리본이 없습니다. |
| XLSX의 장점 | workbook을 열고, 다음 선택 **의논하기** 또는 **제품 설명** 하단에. 마지막 열을 위해 수평으로 스크롤하십시오. 샘플은 12 데이터 행과 헤더, 간격 및 소스 노트를 포함합니다. 구경꾼은 17에 의하여 사용된 줄, 17 생물학 표본 보고합니다. 값은 저장된 작업 책의 미리보기이며 신선한 계산의 증거가 아닙니다. |
| PPTX 파일 | 슬라이드를 열고 QC 요약에서 방법 및 해석에 수직으로 스크롤하십시오. 두 슬라이드는 로컬 예제에서 렌더링. 이 판독 표면은 프리젠 테이션 편집기 또는 슬라이드 쇼 컨트롤러가 아닙니다. |
| 공지사항 | 그림과 사용 열기 **다음 페이지 / 이전 페이지**. 두 페이지는 원시 라이브러리 크기와 감지 된 생성 된 미디어를 보여줍니다. **/ Zoom 아웃 / 리셋 줌** 전망 변경; .... **의논문 1 의 특징 2** 또는 **의논문 2 의 특징 2** 그림 해석하기 전에. |
| JSON | 열기 <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">자주 묻는 질문</ExampleDownload> 소스 텍스트, 식별자 및 값을 검사합니다. 확장 가능한 객체 트리보다는 코드로 표시됩니다. |
| HTML | 열기 <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">독서 테이블</ExampleDownload>. **Source** HTML를 보여줍니다; **Render** 포맷 된 문서를 복원합니다. Neither 형태는 QC를 재회합니다. |

![실제 작업 책 미리보기에서 샘플 선택](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![실제 TIFF의 두 번째 페이지](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

**Preview unavailable → Open this Office file in your default app to view it.**이 나타나면 로컬 파일에 **Open**을 사용하거나 관리 업로드를 위해 **Download**를 사용하면 호환되는 응용 프로그램에서 열 수 있습니다. 이 fallback는 내장 미리보기가 표시할 수 없을 때 사용할 수있는 원본 파일을 유지합니다.

### 다른 지원 뷰어 {/* #other-supported-viewers */}

다음 테이블 목록 미리보기 모드 및 지원된 파일 유형에 대한 제어.

| 이름 &#42; | 검사하는 방법 | 제어 및 경계 |
| --- | --- | --- |
| PDF | 페이지 번호, 읽기 쉬운 텍스트, 소스 PDF | Thumbnails, 개요, 문서 검색, 페이지 탐색, 급상승 및 선택 영역; 스캔된 페이지는 검색 텍스트가 부족할 수 있습니다. |
| 코드 / 일반 텍스트 | 관련 블록 및 언어 | 라인 번호, 구문 표시, 복사 / 다운로드; 대형 콘텐츠는 제한될 수 있습니다 |
| JSON / HTML | 구조 또는 렌더링 된 문서 | Rendering은 애플리케이션 권한으로 코드를 실행하는 권한이 없습니다. |
| 이미지 / TIFF | 해결 및 선택된 이미지 | 이미지 급상승/팬; TIFF는 전용 렌더링 경로가 있습니다. |
| Office 파일 | 관리 렌더링자가 성공 여부 | DOCX / XLSX / PPTX 미리보기가 사용되지 않는 경우 외부로 다운로드 / 오픈; 미리보기는 풀 오피스 편집이 아닙니다. |
| 생물학적 순서 | 정체성 및 범위 | 지원되는 FASTA 입력을 위한 Sequence 지향적인 전망 |
| 분자 구조 | Parsed 모델 및 선택된 표현 | 자전, 급상승, 팬 및 지원되는 만화/Stick/Sphere/Surface/Line 표현; 누락된 구조상 자료는 표현할 수 있습니다 |
| Unknown 또는 지원되지 않은 파일 | 이름, 크기 및 fallback 메시지 | 적당한 외부 구경꾼을 위한 다운로드; 확장에서 유효하지 마십시오. |

PDF 컨텍스트의 경우 현재 작업과 관련된 종이만 연결하여 다음 작업을 사용하지 않아야 합니다. 앱은 세션당 3개의 연결된 PDF를 지원합니다. 첨부 된 PDF없이 문학 기록은 metadata를 제공하지 않으며 전체 텍스트가 읽지 않은 증거는 없습니다. [라이브러리](library.md) 참조.

### 다이어그램 소스 및 형식 별 컨트롤 {/* #diagram-source-and-format-specific-controls */}

대화에서 렌더링 된 Mermaid 다이어그램의 경우, 아래의 다이어그램 텍스트를 읽을 수있는 액션 바에서 **View source**을 선택하십시오. **View diagram**는 렌더링을 반환합니다. toggle는 렌더링 후 사용할 수 있으며 오류가 다이어그램을 대체하면서 비활성화됩니다. 분석 또는 소스 파일이 아닌 보기를 변경합니다.

<p className="example-label"><strong>예시</strong> Mermaid 다이어그램과 그 소스 사이의 전환</p>

새로운 대화에서 요청: **Show a Mermaid flowchart with three steps: Attach a file → Inspect the preview → Save a report. Do not include file links.** 일단 렌더링되면, 다이어그램을 통해 hover, **View source**을 선택하고, 세 노드를 확인합니다. **View diagram**을 돌려보내기 위하여 선택하십시오; 사용 **전체 화면보기** 레이블이 너무 작으면.

다이어그램은 요청한 단계를 표시합니다. 저장된 파일을 검사하기 위해, 실제 파일 카드를 엽니 다; 다이어그램 노드는 artifact 참고문헌이 아닙니다.

| 형식 | 자주 묻는 질문 |
| --- | --- |
| 단일 페이지 PDF | 다중 페이지 읽기 항목 없음; PDF의 정규 미리보기 컨트롤 사용 |
| CSV | 표시된 범위를 검열하십시오; 경계표는 완전한 입력/export로 대우되어야 합니다 |
| 사무실 workbook | 선택된 표시된 작업표 및 렌더링 오류를 확인; unsupported 편집을 위한 원본 파일을 사용하십시오 |
| 공지사항 | 선택된 페이지를 확인하고 pixel/sample 값을 해석하기 전에 결과를 렌더링하십시오 |
| JSON | 양식을 작성할 때 보존 된 소스 텍스트를 상담하십시오. |
| Markdown 테이블 | 키보드로 복사 / 다운로드 / 풀 스크린 컨트롤을 사용하는 테이블 작업을 집중하십시오. |

구현 참조 : [Mermaid 통제](https://github.com/aipoch/open-science/commit/5f6e7995), [PDF 상태](https://github.com/aipoch/open-science/commit/2722da2a), [CSV](https://github.com/aipoch/open-science/commit/9275c2c0), [(주)](https://github.com/aipoch/open-science/commit/0291871f), [공지사항](https://github.com/aipoch/open-science/commit/52152ed4).

## PDF 수치 및 테이블 추출 {/* #pdf-extraction */}

그림 또는 문학 PDF에서 재사용 가능한 테이블이 필요할 때 이것을 사용하십시오. [라이브러리](library.md)에서 PDF을 먼저 추가하고 검사; bibliographic metadata는 혼자서 적출 입력이 아닙니다.

1. PDF 미리보기를 열고 **Figures and tables**을 **Original PDF** 옆에 선택합니다.
2. 첫 번째 사용에서 필요한 모델 리소스를 설치하려면 **Download and continue**을 선택하십시오. 설치 및 무결성 검사를 기다리고 있습니다. 리소스가 준비되면 **Analyze PDF**을 사용하십시오.
3. 페이지 진행을 따르십시오. 완료 후, 후보자를 선택하고 **Show in PDF**을 사용하여 소스 페이지, 캡션 및 주변 텍스트와 비교하십시오.
4. 그림의 경우 이미지 미리보기를 열고 **Copy image** 또는 **Download image**을 사용하십시오. 테이블의 경우 **Table**을 선택하면 **TSV**, **HTML** 또는 **Markdown**를 선택하고 복사 / 다운로드 작업을 사용하십시오. 소스 작물을 검사할 필요가 있을 때 **Image**를 선택하십시오.
5. 수출된 파일을 엽니다. 분석 또는 보고서에서 사용하기 전에 행 / 열 정렬, 병합 헤더, 단위, 발주 및 크로스 페이지 콘텐츠를 확인하십시오.

Extraction은 모델 리소스가 다운로드 된 후 로컬로 실행됩니다. 동일한 PDF를 다시 닫을 수 있습니다; **Analyze again** 리런트 추출 필요한 경우. 중지해야 할 경우 진행 제어를 통해 취소하십시오. 분석이 불완전한 경우에, 완전한 문서로 눈에 보이는 후보자를 대우하기 보다는 실패한 페이지 고시를 검사하십시오.

**Unplaced table text** 및 **Table notes** 리뷰가 필요한 콘텐츠를 보존합니다. 구조 세포가 사용할 수없는 경우 소스 작물과 원래 PDF을 사용하십시오. 누락된 세포를 사용하지 마십시오. 스캔 및 회전된 페이지는 이 추출 작업 흐름에 의해 지원되지 않습니다. PDF은 추출이 불가능할 때도 읽을 수 있습니다.

### 추출된 그림이나 테이블에 대한 대리인에게 문의하십시오. {/* #pdf-agent-evidence */}

1. PDF을 열고 **Read with agent**을 사용하여 현재 세션에 연결하고 관련 페이지에 **Figures and tables** 분석을 완료하십시오. 귀하의 질문에 보내기 전에 PDF이 Composer의 읽기 컨텍스트에 남아 있음을 확인하십시오. 자체의 라이브러리 레코드는 링크 된 PDF이 아니며 혼자 링크는이 분석을 실행하지 않습니다.
2. 특정 인물, 테이블 또는 알고리즘에 대해 문의하십시오. 라벨이나 페이지 및 질문에 답해야 합니다.
3. 도구 활동 검사: **list_pdf_elements**는 유효한 추출한 성분을 찾아냅니다; **read_pdf_element**은 선택한 증거를 읽습니다. 소스 페이지에 대한 질문과 답변에 누락 또는 불확실한 내용.
4. 헤더, 단위 및 노트를 포함하여 원본 그림 또는 테이블과의 응답을 비교합니다. 적출이 부유하거나 불완전한 경우, 누락된 페이지를 분석하고 재발합니다; 캡션은 트렌드 또는 정확한 테이블 값을 설정할 수 없습니다.

<p className="example-label"><strong>예시</strong> 연결된 종이에서 표 증거 요청</p>

> 연결된 PDF의 추출 된 요소에서 테이블 1을 읽으십시오. 물리적인 PDF 페이지, 열 헤더 및 내 질문에 관련된 값들을 보고 있습니다. 보존 단위와 발주, 그리고 어떤 누락된 세포 또는 불완전한 적출을 확인합니다.

이 도구는 기존의 추출 결과를 읽는다; 그들은 PDF 분석을 시작하지 않습니다. 테이블 출력은 여러 배치에 도착 할 수 있으며 그림 / 알고리즘 증거는 이미지로 전달 될 수 있습니다. 선택한 모델은 필수 이미지 입력을 지원한다; 혼자 전달 된 이미지는 제대로 해석되지 않았습니다.

## 먼 매체 deliberately 적재하십시오 {/* #remote-media */}

이미지, 오디오 및 비디오는 모델 응답 대기에서 연결하여 로딩을 활성화합니다. 진행하기 전에 통제에 의해 표시된 목적지 별명을 읽으십시오. 승인은 표시된 요소와 URL에 적용되며, 모든 미래 응답 또는 전체 도메인이 아닙니다. 미리보기를 닫지 않는 요청이 이미 전송되지 않습니다.

먼 이미지를 포함하는 Mermaid 도표는 적재하기 전에 막을 수 있습니다; 필요한 경우 임베디드 이미지없이 정규 다이어그램을 요청합니다. Open-Science은 모델 입력 복사본에서 임의의의 메타데이터를 제거하여 원본 파일을 보존합니다. 이 이미지에서 눈에 띄는 콘텐츠를 제거하지 않습니다.

## 다운로드된 파일 검증 {/* #verify-the-downloaded-file */}

예정된 미리보기를 열고 **Download**을 선택하고 시스템의 파일 이름과 위치를 확인한 후 저장합니다. 다운로드된 복사본을 열고 그 내용을 확인합니다. 다운로드는 원본 파일을 저장합니다; TIFF 페이지 또는 Excel 시트를 변환하는 것은 그 페이지 또는 시트에 다운로드를 제한하지 않습니다.

## 미리보기가 실패할 때 {/* #when-a-preview-fails */}

파일이 성공적으로 저장되면 정확한 버전과 형식을 확인합니다. unavailable 파일에서 뷰어 제한을 구별하는 다운로드를 시도하십시오. 앱 밖에서 로컬 파일이 변경된 경우, Reload를 사용할 수 있습니다. 렌더링 문제를 복구하기 위해 입력을 덮지 마십시오. filename, type, size, app version 및 표시 오류를 보고하십시오. 진단을 필요로 하지 않는 한 개인 파일 내용을 제외합니다.

## PDF에 주석 {/* #annotate-a-pdf */}

강조 표시, 영역 표, 페이지 노트 및 문서 메모를 관리하기 위해 **Notes & Annotations**을 엽니 다. **Show notes sidebar**은 원래 페이지 옆에 메모를 유지합니다. 다운로드 메뉴는 **Download PDF with annotations**에서 **Download original PDF**을 분리합니다. 완전한 독서, 검색 및 내보내기 연습을 위해 [PDF 주석 및 문서 노트](pdf-notes.md)을 따르십시오.

**그림 및 표**를 위해, 첫번째 현지 모형 임명은 1 차적인 근원이 허용될 때 승인된 다운로드 거울을 시도할 수 있습니다. **Analyze PDF**을 선택하기 전에 다운로드 및 무결성 검사를 기다립니다. Mirrors는 이러한 리소스를 설치 할 필요가 없습니다; 캐시 된 결과는 신선한 분석없이 다시 열 수 있습니다.
