---
title: "문학 도서관 및 인용"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 문학 도서관 및 인용 {/* #literature-library-and-citations */}

온라인에서 새 논문을 찾으려면 대화에 주제, 연도 범위, 선정 기준을 입력한 다음 **Library → Inbox** 에서 후보 기록을 검토하세요. [저널 클럽 주제 검색 워크플로](../workflows/journal-club.md)를 참고하세요. **Search references** 는 Library 에 이미 있는 기록을 필터링하며 온라인 문헌 검색을 실행하지 않습니다.

이 도서관은 공동 지역 전기입니다. 프로젝트 및 컬렉션은 기록에 대한 링크; 다른 컬렉션에 동일한 종이를 추가하면 다른 복사본이 필요하지 않습니다. 이 가이드는 [Core-reading 워크플로우](../workflows/core-reading-list.md)에서 3개의 진짜 PRISMA 종이를 사용합니다. 그 워크플로는 연구 목표와 합격 체크리스트를 소유합니다. 이 페이지는 도서관의 통제와 기록 수명주기를 설명합니다.

첨부된 PDF에서 그림 또는 테이블을 재사용하려면 [PDF 추출](previews.md#pdf-extraction)을 따르십시오. Metadata 수입품과 자동적인 가득 차있 원본 retrieval는 스스로 숫자 또는 테이블을 추출하지 않습니다.

## 정확한 보기를 선택하십시오. {/* #choose-the-correct-view */}

홈 또는 작업 공간에서 **Library**을 엽니 다. **Back to Home** 프로젝트 네비게이션에 반환합니다. 라이브러리의 **Settings**은 글로벌 모델 설정이 아닌 인용 스타일을 엽니다.

| 보기 | 제품정보 | 이용하기 |
| --- | --- | --- |
| 받은 편지함 | 당신의 검토를 기다리고 Agent-discovered 후보 | 합격하기 전에 identities and source를 확인하십시오. |
| 모든 문헌 | 자주 묻는 질문 | 검색, 편집 및 정리 당신의 생물학 |
| 중복 문헌 | suspected 식별자/metadata 일치 그룹 | merging의 앞에 비교 |
| 휴지통 | 제거된 참고 기록 | 저장소 또는 deliberately 영구적으로 삭제 |
| 프로젝트 | 해당 프로젝트와 연계된 참조 | 연구 문제와 관련된 생물학적 유지 |
| 컬렉션 | 배열된 컬렉션을 포함한 주제 그룹 | 프로젝트 전반에 걸쳐 읽기 설정 사용 |

![실제 PRISMA 컬렉션에서 3 개의 허용 용지](/img/open-science/guides-walkthrough/51-library-collection.webp)

## 기록 추가 또는 가져 오기 {/* #add-or-import-a-record */}

**Add**을 선택하고 소스를 선택합니다. 1 PDF 선택은 메타데이터 편집기를 엽니다. 여러 오픈 **Import PDFs**을 선택합니다.

| 이름 &#42; | 입력 | 자주 묻는 질문 |
| --- | --- | --- |
| 문헌 추가 | 수동으로 bibliography 입력 | 필수 제목, 참조 유형 및 식별자 |
| PDF 가져오기 | 1개 또는 몇몇 지역 PDF | 각 종이에 대한 추출 된 메타 데이터; Multi-file 선택은 아래에 배치 교류를 이용합니다 |
| 문헌 가져오기 | BibTeX, RIS 또는 NBIB | 유효/무효한 항목, 목적지 및 식별자 일치 |

<ToolOperationGroup>
<summary>폴더의 선택된 PDF 가져 오기</summary>

### 폴더의 선택된 PDF 가져 오기 {/* #import-a-folders-selected-pdfs */}

1. 읽는 세트를 위한 PDF를 선택하십시오. metadata 추출에 대 한 대기; 검출된 DOI는 bibliographic 분야를 완료하기 위하여 사용될 수 있습니다. 종이에 대한 결과를 확인합니다.
2. **Import to** 외에 표시된 목적지를 확인; 가져 오기를 시작하는 라이브러리보기에서 온다. **When identifiers match**에서 아래 표에서 정책을 선택합니다.
3. 이 배치를 선택하는 각 checkbox 또는 **Select all**를 사용하십시오. **Show more**은 추가 목록 파일들을 나타냅니다.
4. **Import selected**을 선택합니다. 전체적인 진행 상황을 읽고 각 파일의 상태; 실패한 파일은 완료된 수입이 아닙니다.
5. 정지하려면 **Stop**을 선택하고 **Stopping…**을 기다립니다. Already에 의하여 투입되는 참고는 남아 있습니다; in-flight 가동은 끝낼지도 모릅니다.
6. 중지 후, 나머지 준비 파일을 선택하고 **Import selected**을 사용하십시오. 대화 상자가 실패한 후 **Retry unfinished**을 제공한다면, 불완전한 선택을 위해 사용하십시오. 신선한 수입을 시작하기 전에 유지 된 참조를 검사, 특히 PDF 업로드가 중단 된 경우.
7. **Done** 또는 **Close**을 사용하여 대화 상자가 제공되면 목적지를 열고 레코드와 PDF를 확인합니다. **Cancel** 가져 오기 전에 준비를 포기합니다.

| Identifier-match 정책 | 결과 |
| --- | --- |
| 기존 문헌 재사용 | 다른 생물학적 항목 만들기 대신 일치하는 기록을 재사용 |
| 별도 문헌으로 유지 | 나중에 비교 및 중복 검토에 대한 명백한 기록 유지 |
| 빈 필드 채우기 | 기존/conflicting 값을 유지하면서 누락된 필드를 채우십시오. |

배치는 **Pending**, **Reading…**, **Ready**, **Importing…**, **Completed**, **Failed** 또는 **Skipped**를 보여줄 수 있습니다. 선택, 메타데이터 읽기 및 수입 완료는 별도의 상태입니다. 앱이 **PDF upload cancelled. The reference was kept.**을 보고 있다면, 레코드의 첨부 파일을 유지 확인; 업로드 취소는 bibliography 입력을 제거하지 않았다.

![2개의 진짜 PRISMA PDFs는 수입품을 준비했습니다](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

**Reuse existing reference**과 함께, 제목이나 DOI를 추출한 PDF은 별도의 기록을 만들 수 없습니다. 수입 후, 각 종이를 열고 제목과 DOI을 확인합니다. [merging 중복](#resolve-duplicates-and-recover-references)의 앞에 정확한 mismatches. **Completed**은 수입을 확인하며 정확한 식별이 아닙니다.

![완료된 배치 및 per-file 결과](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>완료 작업을 잃지 않고 배치를 중지</summary>

### 완료 작업을 잃지 않고 배치를 중지 {/* #stop-a-batch-without-losing-completed-work */}

**Stop** 요청은 현재 항목을 완료 할 수 있습니다. 각 행 검사: **Completed** 항목은 유지되고 다시 선택될 수 없습니다; 나머지 **Ready** 행을 선택하고 **Import selected**을 사용하십시오. 실패가 **Retry unfinished**을 노출하면 재발행하기 전에보고 된 원인을 수정하고 완료 된 레코드가 복제되지 않았습니다.

![Stopped PDF 가져오기 완료된 줄을 유지](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.**은 전기를 저장했지만 첨부 파일이 완성되지 않았습니다. 원래 PDF이 선택한 위치에 여전히 사용할 수 있으며 일반적으로 열리면 **Retry unfinished**을 선택하십시오. retrying 후, 목적지 수집에 반환하고 내용을 확인하기 위해 PDF을 엽니 다. 결과가 확인되지 않을 경우, 다른 수입을 시작하기 전에 라이브러리를 검사합니다.


</ToolOperationGroup>

<ToolOperationGroup>
<summary>다른 참조 관리자에서 bibliography 가져 오기</summary>

### 다른 참조 관리자에서 bibliography 가져 오기 {/* #bring-a-bibliography-from-another-reference-manager */}

<p className="example-label"><strong>실습 예제</strong> PRISMA 레코드를 세 개의 일치하는 정책 가져 오기</p>

목적지 수집을 먼저 열고 **Import references** 및 `.bib`, `.ris` 또는 `.nbib` 파일을 선택하십시오. 미리보기는 검출 된 형식, 목적지, 새로운 / existing / skipped 카운트 및 일치하는 레코드를보고합니다. **View details**을 확장하여 수입하기 전에 제목 및 저자를 검사합니다. Bibliographic 수입품은 PDFs를 다운로드하지 않습니다.

| 제품 정보 | PRISMA 구문을 확인한 결과 |
| --- | --- |
| 별도 문헌으로 유지 | BibTeX는 1개의 기록을 창조했습니다; 중복 다음 하나의 매칭-DOI 그룹 포함 |
| 기존 문헌 재사용 | RIS는 0개의 레코드를 재사용하고, 생성하고, 건너뛰거나 실패했습니다 |
| 빈 필드 채우기 | 더 많은 정보 [PubMed NBIB 기록](https://pubmed.ncbi.nlm.nih.gov/19621072/) 추가 PMID `19621072` 그리고 PMCID `PMC2707599`; 기존 타이틀과 5개의 제작자가 남아있었습니다. |

**Import references**을 클릭하고, **Import complete**을 기다리고, Created/Reused/Skipped/Failed를 검사하고, **Done**를 선택하십시오. 레코드를 엽니다: 혼자 가져 오기 카운트는 올바른 metadata를 설정하지 않습니다. 채우기 빈 필드는 식별자 및 전체 저널 제목을 대체하지 않고 약어 저널 이름을 추가 할 수 있습니다.

![BibTeX는 명시된 중복 정책을 가져 오기](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![NBIB 수입은 누비질 필드를 채웁니다.](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Inbox 증거 검토 {/* #review-inbox-evidence */}

<p className="example-label"><strong>실습 예제</strong> 3개의 PRISMA 후보자 검토</p>

후보 제목 또는 **View details**을 엽니 다. 공급자, 소스 링크 및 DOI / 기타 식별자를 검사 한 다음 출판사와 년, 저자 주문 및 출판 비교하십시오. **Accept**는 도서관에 그것을 승진시킵니다; **Dismiss**은 리뷰 큐에서 제거합니다. 일괄 작업 전에 행 선택을 확인합니다.

![3 정품 PRISMA 후보자는 검토를 기다리고](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

이 예에서 세 명의 후보자는 개별적으로 허용되었으며 Inbox는 명확하게되었습니다. 공급자 경기는 시작 기록, bibliographic 검증을 완료하지 않습니다. 2020 문 간행년도는 **2021**입니다. 2개의 2009 종이에는 명백한 DOIs 및 저자 명부가 있습니다.

## Metadata 검사 및 수정 {/* #inspect-and-correct-metadata */}

참조를 열고, **More actions → Edit metadata**. **Complete metadata**을 사용하기 전에 현재 값을 검토하고, 순수 로컬 편집보다는 룩업을 수행한다.

![저장된 조직 저자 필드 reopened](/img/open-science/v0.27.0/04-organization-author.webp)

| 분야/제어 | 입력 및 효과 |
| --- | --- |
| 문헌 유형 | bibliographic 종류를 선택하십시오: 기사, 검토, 선행, 책, dataset 및 다른 지원되는 종류 |
| 제목 | 요구 사항; 출판물 보존 |
| 연도 / 출판물 | 출판 년 및 저널/컨테이너; 제목에 내장 된 1 년은 다를 수 있습니다. |
| 고급 설정 | 볼륨, 문제, 페이지, 출판사, 장소 및 판 |
| 제작자 추가 / 제작자 제거 | 초안에서 제작자 행 추가 또는 제거 |
| 기여자 역할 | 저자, 편집자 또는 번역자를 선택하여 소스에 일치 |
| 이름 유형 → 사람 | 입력 Given 이름과 가족 이름 |
| 이름 유형 → 조직 | 완전한 조직 이름을 입력하십시오; 발명 된 사람 이름에 분할하지 마십시오 |
| 식별자 추가 | 유형과 가치: DOI, PMID, PMCID, ARXIV, ISBN, ISSN 또는 다른 사람 |
| DOI / ISSN 등 선호 | 그 유형 내에서 선호되는 식별자를 선택하십시오; 선택은 모든 유형의 글로벌 플래그가 아닙니다. |
| 식별자 제거 | 초안 식별자를 제거 |
| URL / 초록 | 소스 주소 및 bibliographic 요약 |
| 저장 | Persist 유효한 편집 |
| 자주 묻는 질문 | 초안을 덮어 |

<p className="example-label"><strong>실습 예제</strong> PRISMA 그룹을 조직 저자로 보존</p>

**PRISMA 그룹**을 추가하려면 **Add creator → Creator role: Author → Name type: Organization**을 선택하고 전체 이름과 **Save**를 입력하십시오. 기록을 다시 열고 조직이 4 명의 개인 저자를 따르는 것을 확인합니다. [출판사의 저자 목록](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097)과 생성된 인용 비교.

![APA 참고는 조직 저자를 보존합니다.](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2는 PubMed 저자 이름 파싱을 수정하여 성, 초기 및 suffixes를 포함한 수정합니다. metadata를 가져 오거나 완료하면 제작자 필드를 검사하고 연결된 소스에 대한 생성 된 인용을 검사합니다. 업데이트가 라이브러리에 저장 된 메타데이터를 다시 작성하는 것을 가정하지 마십시오.

## 허용된 레코드를 구성 {/* #organize-the-accepted-records */}

수집 만들기 **New collection**, 채 **Name** 그리고 선택 **Description**, 다음 **Create collection**... 설명은 조직 텍스트, 에이전트 Context하지 않습니다. 취소 / 취소는 초안을 삭제합니다. 모든 참조 및 사용 **Add to collection** 또는 **Add to project**의 레코드를 선택하십시오. 선택은 가동 후에 명확합니다; 다른 목적지를 추가하면 다시 선택.

상세보기에서, 프로젝트 및 수집 체크 박스는 링크를 보여줍니다. **Manage Tags**은 조직 태그를 추가합니다. 테이블의 1-to-five-star 등급은 자동적인 증거 질 점수가 아닌 당신의 annotation입니다. **Clear selection**는 기록이 변경되지 않았습니다.

| 테이블 통제 | 관련 상품 |
| --- | --- |
| 문헌 검색 | 제목, 작성자, 출판, 식별자, 요약 및 메모를 포함한 Bibliographic 필드 |
| 문헌 정렬 | 표시된 순서를 선택하십시오 |
| 필터 | 유효한 유형, 년, 꼬리표 및 가득 차있 원본 상태에 의하여 좁은 |
| 사용자 정의 | 선택/주문 표시 열 |
| 페이지당 문헌 수 | 25, 50 또는 100 행 |
| 행 체크박스 / 모두 선택 | 사용 가능한 대량 작업의 대상을 설정합니다. |
| 내보내기 | 수출 선택된 bibliographic 기록; 모든 PDF를 자동으로 포장하지 않습니다. |

총 라이브러리 수는 현재 검색/filter 결과의 독립적입니다. 표시된보기 및 선택 카운트를 일괄 작업 전에 읽으십시오; 더 작은 필터링 결과는 기록이 제거되지 않습니다.

기록이 사라지기 전에 명확한 검색 및 필터. Project/collection 링크는 각 목적지에 대한 독립적 인 메타 데이터 버전을 만들지 않습니다.

## 전체 텍스트를 읽고 읽기 {/* #add-and-read-full-text */}

**Find full-text PDF**는 적용 가능한 공공 공급자를 검사합니다: 유럽 PMC/PMC, OpenAlex, Unpaywall 및 arXiv. 유효한 식별자 및 형성된 접촉/credentials는 applicability를 결정합니다. **Add attachment**의 앞에 소스, 버전 상표 및 URL을 검사하십시오.

<p className="example-label"><strong>실습 예제</strong> 게시자 PDF를 PRISMA 2020 레코드에 첨부</p>

**Add attachment**이 소스가 발견 된 후 실패하면 게시자에서 공개적으로 PDF을 다운로드하고 동일한 레코드에서 **Add PDF**를 사용합니다. 첨부된 PDF을 열고 게시자 기록과 제목과 DOI을 비교합니다. 이 예에서 **프리즘 2020-statement.pdf**은 PRISMA 2020 용지와 일치합니다. **806.1 KB 및 15 페이지**.

![성공적으로 부착 된 게시자 PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

소스 결과는 저장 된 첨부 파일이 아닙니다. 붙어 있던 PDF는 대리인 독서의 증거가 아닙니다. **Read with agent**은 후속 요청에 대한 컨텍스트를 공급합니다. Composer `@` 참조는 정확한 기록, 프로젝트 라이브러리 또는 컬렉션을 선택할 수 있습니다. 수집 보조금은 모든 종이의 전체 텍스트를 자동 포함하지 않습니다. PDF 독서 통제는 [뉴스 레터](previews.md)에서 입니다.

공개 사본이 발견되지 않은 경우, 체크 된 메타 데이터를 유지하고 적절한 경우 합법적으로 사용할 수있는 로컬 PDF을 사용하십시오. 배경 조회 / 다운로드 작업은 일시 중지 후 현재, 이력서, 검토 및 취소 제어를 노출 할 수 있습니다; 취소는 이전 항목이 undone을 완료하지 못합니다.

<ToolOperationGroup>
<summary>일괄 처리에서 전체 텍스트를 검색하고 나중에 이력서</summary>

### 일괄 처리에서 전체 텍스트를 검색하고 나중에 이력서 {/* #retrieve-full-text-in-batches-and-resume-later */}

1. 라이브러리의 의도된 레코드를 선택하고 선택의 **More actions → Find full-text PDF**을 엽니다.
2. 검색이 시작되면 **Pause**을 선택해야합니다. 현재 항목은 작업 일시 중지 전에 완료됩니다.
3. **【특전】** 및 **Pending**을 확인한 후 **Continue search**를 선택하십시오. 패널을 닫으면 **Background tasks → Open**을 통해 동일한 작업을 반환합니다.
4. 각 후보자 소스 및 경고를 선택 항목 및 **Add selected**을 클릭하기 전에.
5. 또한 일시 중지 및 **Continue download**을 지원합니다. 최종 **추가 / 실패 / Skipped** 상태를 검사하고 성공적으로 첨부 파일을 다시 열 수 있습니다.
6. 원치 않는 검토 읽기 작업을 discard하려면 **Background tasks**에서 **Remove task**을 사용하십시오. 제거 후 작업이 사라지고 그 참조 및 첨부 파일이 여전히 열려 있음을 확인합니다. 작업 제거는 삭제하지 않습니다.

![현재 항목 후 일시 중지 된 검색, 보류 기록을 유지](/img/open-science/priority-completion/14-literature-batch-paused.webp)

사용 된 검색은 체크 및 종료 기록을 유지합니다. 작업을 계속하거나 다시 열면 최종 수와 각 항목의 결과를 검사합니다. 후보 발견 및 성공적인 PDF 첨부 파일은 별도의 결과입니다.

![완료된 5-record 검색을 백그라운드 작업에서 다시 시작](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>소스는 존재하지만 PDF은 추가 할 수 없습니다</summary>

### 소스는 존재하지만 PDF은 추가 할 수 없습니다 {/* #a-source-exists-but-the-pdf-cannot-be-added */}

**PDF could not be added**의 경우, 소스 서명 조건, 링크 유효성, 표시된 크기 제한 및 현재 프록시 / DNS 구성을 확인하십시오. retry 기계장치로 duplicate 참고를 창조하지 마십시오.

PDF 소스가 `198.18.x.x`과 같은 예약 된 주소로 해결되면 다운로드자는 그것을 거부합니다. [네트워크](network.md)을 따르고 검증 가능한 공개 해상도를 복원하십시오. 주소 확인을 비활성화하지 마십시오. 이미 합법적으로 다운로드 한 PDF이 있다면 **Add PDF**을 사용하며 제목, DOI 및 페이지 수를 확인합니다.


</ToolOperationGroup>

## 형식 및 복사 인용 {/* #format-and-copy-citations */}

**More actions → Citation**을 엽니다. **Citation style**를 선택하면 참조 및 인텍스트 양식을 검사하고 **Copy reference**, **Copy in-text citation**, **Copy BibTeX** 또는 **Copy RIS**를 필요에 따라 선택하십시오. 재사용하기 전에 소스에 대한 이름, 년, punctuation 및 DOI을 확인하십시오. 해당 표현은 불완전한 기록을 고치지 않습니다.

**Manage citation styles…**는 작풍 관리를 엽니다. 번들 세트에는 APA, MLA, Chicago Author-date, Vancouver, IEEE, Nature, AMA 및 Harvard가 포함됩니다. **Preview**은 스타일 샘플, **Browse styles**은 외부 스타일 카탈로그를 열고 **Import CSL**는 로컬 스타일 파일을 가져옵니다. PLOS CSL 수입품과 그것의 신청은 아래에 확인됩니다. 복사 및 수출은 별도의 작업입니다; 전기를 이동할 때 둘 다 검사하십시오.

<ToolOperationGroup>
<summary>저널 스타일을 수입 한 후 실제 인용 확인</summary>

### 저널 스타일을 수입 한 후 실제 인용 확인 {/* #check-a-real-citation-after-importing-a-journal-style */}

<p className="example-label"><strong>실습 예제</strong> PLOS 인용 스타일을 PRISMA 레코드에 적용</p>

**Library → Settings → Import CSL**에서 [CSL 스타일 저장소](https://github.com/citation-style-language/styles/blob/master/plos.csl)의 독립적 인 `plos.csl` 파일을 선택하십시오. 이 예에서 **Imported styles**은 0에서 1로 증가했으며 **과학의 공공 도서관**을 보여주었습니다. 실제 PRISMA 레코드의 **Citation** 패널로 돌아가 **Citation style** 아래 스타일을 선택하십시오. 번호 참조 및 `[1]` 인 텍스트 인용을 확인하십시오. 스타일 관리 미리보기는 샘플 문서를 사용합니다; 인용을 복사하기 전에 실제 기록을 검사합니다.

![진짜 PRISMA 기록에 적용되는 수입된 PLOS 작풍](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>인용 또는 수출 재사용 가능한 레코드 복사</summary>

### 인용 또는 수출 재사용 가능한 레코드 복사 {/* #copy-a-citation-or-export-reusable-records */}

<p className="example-label"><strong>실습 예제</strong> 복사 및 라운드 스트립 PRISMA 인용 기록</p>

4 인용 복사 버튼은 클립보드에 다른 표현을 작성합니다. 의도 된 편집기로 붙여 넣고 패널을 떠나기 전에 결과를 검사합니다.

| 이름 &#42; | 결과 PRISMA 2009에 대해 확인 |
| --- | --- |
| 참고 문헌 복사 | APA는 4개의 개인적인 저자, PRISMA 그룹, 년 및 DOI를 유지했습니다 |
| 본문 내 인용 복사 | `(Moher et al., 2009)` |
| BibTeX 복사 | 이름 &#42; `@article` 기관 저자와 함께 항목은 braces에서 동봉 |
| RIS 복사 | ₢ 킹 `TY  - JOUR` 저자, 제목, 년 및 DOI 필드와 기록 |

![실제 PRISMA 레코드에 대한 인용 복사 제어](/img/open-science/local-todo-batch/01-citation-copy.webp)

파일에 대한, 가까운 인용, 필요한 테이블 행을 선택하고 **Export → BibTeX** 또는 **RIS**을 선택합니다. 시스템의 위치를 선택하여 대화 상자를 저장하고 **Saved**을 기다립니다. 이 파일은 bibliographic 기록, PDF 부착 번들을 포함합니다. **Reuse existing reference**을 사용하여 저장된 파일에 저장하고 일치 수를 확인합니다. 둘 다 수출된 PRISMA 파일은 reimported 및 다른 기록을 창조하지 않고 기존 DOI를 재사용했습니다.

BibTeX 상점 년과 달 여기에서, 그래서 그것의 둥근 여행은 `2009-7`를 돌려보냅니다; RIS는 `2009-07-21`을 유지했습니다. 날짜 정밀도를 검사하십시오. 일반 RIS 저자 필드는 다른 관리자에서 별도의 조직 이름 유형을 보존 할 수 없습니다; 수입 된 제작자 편집기를 검사 할 때 그 구별 문제.


</ToolOperationGroup>

## 중복을 해결하고 참조를 복구 {/* #resolve-duplicates-and-recover-references */}

<p className="example-label"><strong>실습 예제</strong> 합병 및 첨부 파일이있는 PRISMA 레코드 복원</p>

<ToolOperationGroup>
<summary>1개의 기록 및 그것의 부착을 지키십시오</summary>

### 1개의 기록 및 그것의 부착을 지키십시오 {/* #keep-one-record-and-its-attachments */}

1. **Duplicates → Review duplicates**을 엽니다. 전망은 활성 라이브러리 레코드를 스캔, 뿐만 아니라 현재 컬렉션.
2. **Keep reference**의 밑에, 확인한 ID를 가진 기록을 선택하십시오. DOI, 제작자, 첨부 파일 및 날짜를 추가 비교하십시오. **Show all fields**은 충돌 중심의 전망에 의해 숨겨지는 필드를 나타냅니다.
3. 각 분쟁 분야의 경우, 그 소스를 선택합니다. 으로 PRISMA BibTeX 비교, 전체를 선택 `2009-07-21` 관련 글 `2009-7`... 빈 필드는 다른 기록에서 채울 수 있습니다.
4. **After merging** 및 그 첨부 파일, 수집 및 프로젝트 수를 읽으십시오. 다음 **Merge references**을 선택; **Cancel**은 별도의 레코드를 나타냅니다.
5. survivor를 열고 metadata, 링크 및 PDF 내용을 확인합니다. 합병증 기록은 **Merged duplicate**로 Trash에서 나타납니다.

![survivor 및 분쟁 게시 날짜 비교](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

A PDF는 제목의 장소에 추출 된 파일 이름을 중복 그룹에 입력 할 수 없습니다. 게시자 레코드를 사용하여 제목과 DOI을 수정한 다음 매칭 그룹을 검토합니다. 합병 후, 유지 된 PDF 열리고 컬렉션 / 프로젝트 협회가 여전히 존재합니다.

![합병 기록은 PDF 및 조직 링크를 유지합니다.](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>실수로 삭제 된 참조 복원</summary>

### 실수로 삭제 된 참조 복원 {/* #restore-an-accidentally-removed-reference */}

행의 **More actions → Move to Trash**을 사용하십시오. 그것은 활성 라이브러리, 프로젝트 및 컬렉션보기에서 사라집니다. **Trash**에서 제목이나 식별자가 검색하면 행 메뉴를 열고 **Restore**을 선택합니다. 편집, 미리보기 또는 내보내기 전에 복원 :이 제어는 쓰레기에서 비활성화됩니다. 복원 된 링크를 확인하기 위해 원래의 프로젝트 및 컬렉션을 엽니다. 이 예에서 PRISMA 레코드를 복원 PDF 및 모든 3 링크.

![Trash 행 메뉴에서 참조를 복원](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>영구적으로 원치 않는 중복 제거</summary>

### 영구적으로 원치 않는 중복 제거 {/* #permanently-remove-an-unwanted-duplicate */}

쓰레기에서 **More actions → Delete permanently**을 선택하고 확인을 읽으십시오. **Cancel**은 행을 보존합니다. 확인은 선택한 참조 및 메타데이터를 제거합니다. unshared 첨부 파일은 뒤에 정리됩니다. 역사 출력은 유지되고 검색 인덱스는 별도로 만료됩니다, 그래서 이것은 안전한 지우개입니다. 삭제하기 전에 필요한 모든 것을 수출하십시오.

삭제 후, 선택한 기록이 Trash를 왼쪽하고 유지 된 참조는 여전히 첨부 파일로 열립니다. 수집 링크를 제거, Trash에 기록을 이동하고 영구적으로 다른 범위를 제거.

![정확한 영구 삭제 범위를 읽으십시오](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## 첨부 변경 및 동시 편집 {/* #attachment-changes-and-concurrent-edits */}

첨부 파일을 제거하기 전에 삭제 확인을 읽고 대상 파일/버전을 확인합니다. 이전 첨부 파일을 검사하기 위해 사용 가능한 버전 역사를 사용합니다. PDF 제거, Trash에 대한 참조를 이동하고 영구적으로 참조는 다른 범위를 삭제; 유지 대화 증거는 정리를 제한할 수 있습니다.

다른 클라이언트가 컬렉션을 변경하면 편집기가 열리면 stale save가 거부 될 수 있습니다. 최신 컬렉션을 다시 열고, 그 상태에 대한 예정된 변경 및 재시동으로 저장된 값을 비교합니다. 저장 후에 새로 고침 또는 정리 오류는 자동적으로 저장 실패를 의미하지 않습니다: 동작을 반복하기 전에 현재 기록을 검사합니다.


소스: [일괄 수입](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [metadata 편집기](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx), [첨부파일/출발](https://github.com/aipoch/open-science/commit/f4a82d4a), [concurrent 편집](https://github.com/aipoch/open-science/commit/dbb9560a).

## PDF 읽기 노트 유지 {/* #keep-pdf-reading-notes */}

참고 PDF 첨부 파일을 열고 주석, 페이지 질문 및 문서 메모에 **Notes & Annotations**을 사용하십시오. 동일한 라이브러리 파일 버전은 프로젝트와 세션에 걸쳐 이러한 노트를 공유합니다. 글로벌 검색에서 **Library** 아래 메모를 찾으면 **Show annotation source**을 선택하여 PDF로 돌아가십시오. 단계와 수출을 위해 [PDF 주석 및 문서 노트](pdf-notes.md)를 보십시오.
