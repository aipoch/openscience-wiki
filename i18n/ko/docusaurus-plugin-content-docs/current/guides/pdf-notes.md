---
title: "PDF 주석 및 문서 노트"
description: "마크 패스, 문서 노트를 수집, 다시 찾아 읽고 읽기 사본을 수출."
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# PDF 주석 및 문서 노트 {/* #pdf-annotations-and-document-notes */}

PDF 메모를 사용하여 패스 옆에 질문을 기록하고 그룹 회의에 대한 그림을 표시하거나 전체 논문에 대한 의견을 수집합니다. Annotations는 관리 **파일 버전**에 속하므로 버전이 메모를 다시 가져옵니다. 에이전트에 메시지를 보내거나 원래 PDF 바이트를 변경하지 않습니다.

## 올바른 읽기 도구를 선택하십시오. {/* #choose-the-right-reading-tool */}

| 도구 | 무엇을 유지 | 그것을 찾는 곳 |
| --- | --- | --- |
| PDF **Notes & Annotations** | Highlights, 지역 표, 페이지 노트 및 문서 노트 관리 PDF 버전 | PDF의 노트보기 또는 사이드 바; 메모 및 인용 된 텍스트는 또한 검색 할 수 있습니다. **Library** |
| **For me** 책갈피 | 세션에 속하는 개인 독서 위치 및 선택 사항 | 그 세션 **Bookmarks** 목록; 은 은 [개인 읽기 북마크](bookmarks.md) |
| **To Agent** 이름 &#42; | 질문이나 지시에 대해 준비된 자료 | 의 메시지 초안; 전송하기 전에 그것을 검토 |

## 패스를 표시하고 질문을 유지 {/* #annotate-passage */}

<p className="example-label"><strong>실습 예제</strong> 단일 atom 촉매 그룹 회의에 대한 읽기 노트 준비</p>

이 예제는 Lang et al., [비 결함 안정된 열으로 안정되어 있는 단 하나 atom 촉매](https://doi.org/10.1038/s41467-018-08136-3), [Group-meeting 작업 흐름](../workflows/journal-club.md)에서 사용되는 오픈 액세스 용지를 사용합니다. 출판사에서 PDF을 획득하고 [라이브러리](library.md)로 가져 오기. 참조 행에서 PDF 첨부 파일을 엽니 다. 예를 들어 종이가 안정화 메커니즘을 지원하는 방법을 묻습니다. 추상 강조는 그 메커니즘의 독립적 인 검증이 아닙니다.

1. **Original PDF**에서, 통행을 찾아 페이지 번호를 검사하십시오. 텍스트가 너무 작으면 줌을 사용하십시오.
2. **Annotate selected text**을 선택한 다음 텍스트를 드래그하십시오. **Mark style**은 텍스트 표시 스타일을 선택합니다. 이 예에서, 페이지 하나 요약의 첫 번째 부분은 강조.
3. **Annotation note**을 열고, 질문이나 독서 알림을 작성하고 **Save**을 선택합니다. 예를 들어, 독자가 제안 된 동성 금속 지원 상호 작용으로 결함 안정화를 비교하고 지원 실험을 확인하십시오.
4. **Show notes sidebar**을 선택하여 PDF에 저장된 메모를 유지하십시오. **Add tag**과 기존 태그 추가; 이 예제는 **Favorites**을 사용합니다.
5. **Select**로 돌아가면 표시 텍스트를 완성합니다. **Undo annotation change** 및 **Redo annotation change**을 사용하여 최근 주석 편집을 위해 소스 PDF를 변경하는 것보다.

![원래 PDF 옆에 저장 된 하이라이트 및 독서 노트](/img/open-science/v0320/pdf-highlight-sidebar.webp)

그림 또는 스캔 된 페이지를 위해 **Select area to annotate**을 사용하고 의도 된 지역을 표시하십시오. 지역 표는 영역을 식별; 텍스트를 추출하거나 그림을 확인하지 않습니다. 텍스트가 선택될 수 없는 경우, 지역표는 여전히 재방문해야 할 위치를 보존할 수 있습니다.

## 페이지 및 문서 메모를 수집 {/* #document-notebook */}

1. **Notes & Annotations**을 열고, 또는 사이드바에서 **Open full notes view**을 선택합니다.
2. **Add note → Add document note**을 사용하여 전체 종이에 대한 질문을합니다. 특정 페이지에 **Add page note**을 사용하고 저장하기 전에 페이지 필드를 확인하십시오.
3. 노트를 입력하고 **Save**을 선택합니다. 이 문서는 마이크로 검사, 분광 검사 및 촉매 측정이 가열 후 나노 입자에서 격리 된 원자를 구별하는 것을 요구합니다.
4. **Search & filter**을 사용하여 텍스트, 유형 또는 태그로 메모를 찾을 수 있습니다. 사이드바에서 **All notes** 및 **Current page** 변경은 주석이 표시됩니다.
5. **Show annotation source**을 통과 또는 지역으로 저장한 위치로 돌아갈 수 있습니다. **Edit annotation note** 코멘트를 변경; **Delete annotation**은 주석이 PDF이 아닌 제거한다.

![문서 메모 및 태그 전체 노트 및 주석보기에 강조](/img/open-science/v0320/pdf-notebook.webp)

## 다른 보기에서 주의 사항 찾기 {/* #find-notes */}

**Cmd/Ctrl+K의 경우**과 글로벌 검색을 열고, 메모에서 구문을 입력하고 **Library**을 선택합니다. 이 예제는 `covalent metal-support`에 대한 검색입니다. **Quoted text**에서 **Notes**을 별도로 읽으려면 **Show annotation source**를 선택하여 PDF를 표시하여 표시된 패스로 엽니다.

![글로벌 검색은 인용 된 PDF 텍스트에서 저장된 읽기 메모를 분리합니다.](/img/open-science/v0320/pdf-search-details.webp)

filename, file version, 페이지는 참고를 수정할 때. PDF 참고는 Main의 새로운 메시지 또는 지시를 자동적으로 하지 않습니다. **To Agent**을 사용하여 재료에 대한 대리인을 요청할 때 초안을 검사합니다.

## 수출 노트 또는 판독 사본 {/* #export-notes */}

| 출력 | 의붓기 | 다중 페이지 읽기 항목 없음; PDF의 정규 미리보기 컨트롤 사용 |
| --- | --- | --- |
| Markdown 또는 CSV 노트 | 으로 **Notes & Annotations**을 선택하면 **Markdown** 또는 **CSV**또는 **Export notes** | 저장된 파일을 열고 견적, 의견, 페이지 및 태그를 확인합니다. subset 여과기로, **Export filtered notes** 하위 세트 수출. 모든 메모를 필요로 할 때 명확한 필터. |
| 주석 PDF | PDF의 다운로드 메뉴를 열고 선택 **Download PDF with annotations** | 별도의 파일을 저장하고 PDF 리더에서 다시 열 수 있습니다. 강조 표시 및 메모 내용 확인, 그 파일이 존재하지 않습니다. |
| 원문 | 그림과 뒤에 자료에 대한 질문 **Download original PDF** | 이 문서 노트북의 표시를 추가하지 않고 소스 바이트를 저장합니다. |

![별도의 Original-PDF 및 annotated-PDF 다운로드 작업](/img/open-science/v0320/pdf-export-options.webp)

예제는 두 가지 노트를 저장합니다. 코멘트와 하나의 문서 노트와 하나의 강조. 둘 다 <ExampleDownload path="/examples/v0320/lang2019-notes.md">Markdown 수출</ExampleDownload>와 <ExampleDownload path="/examples/v0320/lang2019-notes.csv">CSV 수출</ExampleDownload>에서 나타납니다. annotated PDF는 종이의 10 페이지를 보존하고 하이라이트와 메모를 추가합니다. 원본 다운로드는 별도 남아 있습니다. Paper excerpts는 Lang et al에서 입니다. 종이의 [CC BY 4.0 라이센스](https://creativecommons.org/licenses/by/4.0/)의 밑에; 이 예제에 대한 의견은 다음과 같습니다.

## 메모가 공유되는 곳 {/* #where-notes-are-shared */}

**도서관 첨부**은 동일한 관리 파일 버전을 사용하는 참조, 프로젝트 및 세션에 걸쳐 노트북을 공유합니다. **프로젝트 업로드 및 artifact**은 자체 프로젝트 내에서 세션을 통해 노트북을 공유합니다. 새로운 파일 버전은 다른 주석 대상입니다: 마크가 개정된 문서에 속하기 전에 버전을 확인 합니다.

이 노트는 로컬에 저장하고 기계 전체에 동기화하지 않습니다. 손전등의 경우, 노트 또는 annotated PDF을 내보내고 수신자가 수신되는 것을 확인합니다. 이 개인 세션 북마크를 변경하지 않거나 [.science 연구 패키지](research-packages.md)의 모든 읽기 메모 부분을 만들 수 없습니다.
