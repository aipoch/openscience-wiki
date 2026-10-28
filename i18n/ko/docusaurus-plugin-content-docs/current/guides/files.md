---
title: "파일, artifacts 및 버전"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# 파일, artifacts 및 버전 {/* #files-artifacts-and-versions */}

원본 파일을 유지, 업로드 된 복사 및 생성 된 artifact 명백. 이 페이지는 소유권, 파일 및 저장된 개정을 포함합니다. [뉴스 레터](previews.md)을 참조하여 보정 제어 및 [세션](sessions.md) 내보내기 번들.

<PlatformGuide />

## 입력을 첨부하거나 폴더를 참조 {/* #attach-an-input-or-reference-a-folder */}

**Composer → + → Attach files**을 사용하여 `GSE60450_Lactation-GenewiseCounts.txt`을 선택하고 첨부 파일을 기다립니다. 표시 이름은 인식할 수 있습니다; 관리 입력 경로는 checksum suffix를 포함할 수 있습니다. 칩 제거는 초안의 포함을 취소, 디스크의 원래 파일이 아닙니다. **Your files**은 다시 업로드 대신 기존 프로젝트 파일을 선택합니다.

여러 입력이 디스크에 남아있을 때 폴더 참조가 유용합니다. **Files → Filter project files → This computer → Add folder…**에서 특정 하위 폴더로 이동하고 **Read-only** 또는 **Read & write**를 선택하십시오. **Grant this folder** 전에 커널 스톱 확인을 검토합니다. Notebook 파일 액세스는 활성 커널을 중지하므로 권한이 다시 생성 될 수 있습니다. 제안 된 보조금을 취소하십시오. 폴더 선택 및 권한은 [프로젝트](projects.md)에 상세합니다.

| 로컬 파일 관리 | 행동과 결과 상태 |
| --- | --- |
| 디렉터리 경로 | 허용 된 디렉토리를 입력 한 다음 이동 |
| 상위 디렉터리로 이동 | 브라우저의 액세스 규칙 내에서 하나의 디렉토리를 이동합니다. |
| 이동 | 저장된 위치를 선택하십시오. |
| 디렉터리 새로 고침 | 디렉토리 목록을 다시로드 |
| 이 폴더 고정 | 위치 단축키를 추가하십시오; 폴더를 삭제하지 않습니다. |
| 파일 행 | 파일 열기 미리보기 |
| 파일 새로고침 | 변경 후 외부 파일을 다시 |
| 더 많은 작업 → 복사 경로 | 외부 파일 경로 복사 |
| 더 많은 작업 → artifact로 저장 | 관리 된 프로젝트 복사; Saved를 위한 대기 |
| 다운로드 | 플랫폼의 저장 흐름을 통해 외부 복사를 저장 |

읽기 전용 보조금은 외부 디렉토리를 보호하면서도 프로젝트 작업 공간 내부의 출력을 허용한다. 소스를 새로 고침하고 관리 된 사본을 저장하기 위해 위의 로컬 파일 컨트롤을 사용하십시오.

<PlatformContent platform="windows">

기존 폴더의 경우 **Files**을 열고 **Artifacts** 드롭다운을 선택한 다음 **This computer → Add folder…**를 선택합니다. 앱의 **Grant folder access** 대화 상자에서 특정 하위 폴더와 **Read-only**을 선택하고 **Grant this folder**를 선택합니다. user-profile root는 사용할 수 없습니다; 대신 연구 subfolder를 선택하십시오. Notebook-kernel 충격 확인을 읽으십시오. 파일로 돌아가면 선택한 폴더와 파일을 확인합니다.

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="공개 스크립트와 CSV을 보여주는 Windows 폴더 부여" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

Windows **Attach files** 대화 상자에서 중국 문자 또는 공백을 포함하는 경로에서 파일을 선택하거나 **File name** 필드의 전체 경로에 입력하고 엽니 다. 앱에서 첨부된 이름을 확인하고 테이블 크기와 내용을 미리 볼 수 있습니다. 선택을 포기하려면 **Cancel**을 선택하고 새 첨부 파일을 초안에 추가하지 확인하십시오.

</PlatformContent>

## 입력 및 생성된 결과 찾기 {/* #find-inputs-and-generated-results */}

1. **Files**을 열고 **Filter project files → All artifacts**을 선택합니다.
2. **Your uploads**을 세션에 의해 그룹화 **Generated files**에서 별도로 읽으십시오.
3. 제품정보 **List view** 이름과 크기, 또는 **Grid view** 시각적 카드.
4. `rnaseq`과 같은 **Search project files**의 파일명 파편을 입력합니다. 일치하는 이름을 확인하고 세션을 소유합니다.
5. 해당 필터에 의해 제외된 파일을 표시하는 검색을 취소합니다.
6. **Expand files**는 더 큰 도서관을 엽니다; **Exit full screen files**은 작업 공간에 반환합니다.

<PlatformContent platform="macos">

![file library에서 실제 RNA-seq 결과 필터링](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
카운트는 현재 필터를 설명합니다. 일치하지 않는 검색은 파일을 삭제하지 않습니다. **No more**은 그룹이 로딩을 완료했습니다. 그룹을 머리로 움직입니다. modal, 또는 **오픈 ... 세션 옆에 분할보기**에 대한 파일 몸의 미리보기 작업을 사용하여 대화를 유지하십시오. 그 표면에 의해 선택된 파일 / 버전에 대한 다운로드 행위.

### 로컬 폴더로 돌아가서 독서 복사 저장 {/* #return-to-a-local-folder-and-save-a-reading-copy */}

1. **Files → Filter project files → This computer**을 열고 **Directory path**에서 허용된 소스 디렉토리를 입력하십시오.
2. **Pin this folder**을 선택합니다. 다른 곳에 Navigate, 다음 **Go to → Pinned**을 돌려보내십시오. **Remove bookmark**, 또는 핀 행의 **Unpin**, 단축키 만 제거.
3. **Refresh directory**을 선택하여 새로 추가된 파일 이름을 볼 수 있습니다. 이미 오픈 파일이 앱 밖에서 변경된 경우, **Reload file**을 사용하여 내용을 다시 보시기 바랍니다.
4. 로컬 미리보기에서 **More actions → Save as artifact**을 선택하고 **Saved**을 기다립니다.
5. **All artifacts → Your uploads**로 돌아가 저장된 복사를 다시 엽니다. 그것은 관리 된 버전 제어 및 헤더의 로컬 소스 경로.

관리된 복사를 열고 로컬 소스로 콘텐츠를 비교합니다. 나중에 소스 변경은 저장된 복사를 자동으로 업데이트하지 않습니다. 관리된 콘텐츠를 편집할 때 아래 버전 conflict 단계를 사용하십시오.

## 보고서를 편집하고 버전 비교 {/* #edit-a-report-and-compare-versions */}

<p className="example-label"><strong>실습 예제</strong> 읽는 메모를 추가하고 보고서 개정 비교</p>

지원된 관리 텍스트 또는 Markdown 파일을 엽니다. 아래 예제는 기존 보고서에 대한 읽기 메모를 추가합니다. 저장은 본래 입력을 바꾸지 않고 새로운 개정을 창조하거나 분석을 재시작합니다.

1. 관리된 Markdown 파일을 열고 **rnaseq-qc-report.md를 편집합니다.**을 선택합니다.
2. 소스 필드를 편집합니다. 기존의 방법 및 검증된 텍스트를 유지하십시오.
3. **Save changes**을 선택합니다. **v1의**에서 **v2의**로 헤드러가 전합니다.
4. **비교 ... 소스 버전으로**을 선택합니다. 추가 텍스트는 차이보기에 나타납니다.
5. **자주 묻는 질문**을 사용하여 렌더링 된 보고서로 돌아갑니다.
6. **Previous file version**을 선택하여 v1을 검사하고 **Next file version**을 v2로 돌려줍니다.

<PlatformContent platform="macos">

![원본 버전과 비교된 v2 보고](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| 통제/상태 편집 | 무엇을 할 것인가? |
| --- | --- |
| 변경 사항 없음 | 유효한 변화를 만드십시오; unchanged 텍스트는 저장하지 않습니다. |
| 취소 | 현재 편집 초안을 Discard |
| 버전 arrows 비활성화 | 그 방향으로 이전 / 새로운 버전이 존재하지 않습니다. |
| 법적 고지 | 지원되는 소스 버전 비교는 유효하지 않습니다 |
| 회사 소개 | 현재 버전을 다시로드하고 변경을 재구성; 당신의 초안을 다루지 마십시오. |
| 관련 기사 | 이 파일 유형 또는 소스는 그 뷰어에서 편집 할 수 없습니다; 스프레드 시트 편집기가 될 바이너리 파일 또는 CSV 테이블을 기대하지 마십시오 |

관리된 텍스트/코드 및 Markdown 파일이 편집을 노출할 수 있습니다. 입증 된 CSV은 읽기 전용 테이블을 유지; 이미지 및 기타 바이너리 형식은이 기능을 통해 텍스트 편집을 취득하지 않습니다. 수동 편집은 파일 개정을 만듭니다; Notebook을 다시 실행하지 않거나 모델 리뷰를 만들 수 없습니다. 버전의 생산 역사를 인용하기 전에 [Notebook 증거](notebook.md)에 대한 참조.

### 잃지 않고 저장 충돌을 해결 {/* #resolve-a-save-conflict-without-losing-either-edit */}

또 다른 작가가 보고서를 저장하면 편집기가 열릴 때 **Save changes**은 **이 파일에 더 최신 버전이 있습니다. 최신 버전 보기**을 반환할 수 있습니다. 당신의 초안은 더 새로운 버전을 대체하지 않았습니다.

1. 변경하기 전에 당신의 잘못된 텍스트를 보존합니다.
2. **View latest version**을 선택합니다. **Discard unsaved changes?**이 나타나면, 취소할 때까지 당신은 당신이 필요로 하는 변경을 유지.
3. 최신 저장된 보고서를 열고 다른 작가의 추가를 검사합니다.
4. **Edit** 선택, 최신 텍스트와 저장에 대한 변경을 다시 승인.
5. 결과를 다시 열고 이전 개정을 검사하는 버전 화살표를 사용합니다.

<PlatformContent platform="macos">

![다른 버전이 존재하기 때문에 차단 된 저장](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
저장 후, 최신 개정은 다른 작가의 변경과 유지 된 초안을 모두 포함합니다. Earlier 파일 개정은 버전 통제를 통해 유효합니다; 이러한 대화의 개정에서 분리됩니다.

캡처 된 결과를 다시 실행하고 출력을 비교하려면 [재현성](reproducibility.md)을 사용하십시오. 대화 지점, 파일 및 증거의 휴대용 복사를 위해 [.science 연구 패키지](research-packages.md)을 사용하십시오.

## 연구기록을 잃지 않고 수출 {/* #export-without-losing-the-research-record */}

파일의 **Download**을 사용하여 한 결과를 저장할 수 있습니다. 세션 **Download all artifacts** 폴더에 선택된 파일을 저장; 프로젝트 **Download artifacts…**는 별도의 `generated` 및 `uploads` 경로로 ZIP을 만듭니다. 두 개의 노출 선택 컨트롤. 확인하기 전에 범위, 파일명 및 목적지를 읽으십시오. Conversation **Export**는 다운로드 연구 파일에서 명백한 성적 가동입니다. [세션](sessions.md)을 연습한 선택과 재개된 다운로드를 참조하십시오. 다운로드된 사본은 완전한 살아있는 신청 국가, credentials 또는 외부 입력을 나르지 않습니다.

원래 카운트 매트릭스를 유지, CSV, 그림과 방법은 재사용을 위해보고. [데이터 워크플로우](../workflows/data-quality.md)은 테스트된 파일과 정확한 합격 값을 제공합니다. 다운로드가 실패한 경우, 목적지 권한 및 무료 디스크 공간, 다음 재시; 일부 외부 파일은 저장된 관리 버전을 변경하지 않습니다.

### 다운로드 된 보고서 열기 {/* #open-a-downloaded-report */}

보고서 버전을 선택하고 **Download**을 선택하십시오. 텍스트 편집기에서 저장된 `.md` 파일을 열고 헤더, 단락 및 데이터를 확인하십시오. 포맷 된 보고서에 대한 앱 미리보기로 돌아가십시오.

<PlatformContent platform="windows">

Notepad에서 다운로드 된 `.md` 파일을 엽니 다. Notepad 디스플레이 Markdown 소스 : `##` 및 backticks와 같은 헤드링 마커는 문자를 포맷합니다. 제목, 단락 및 테이블 내용을 확인하십시오. 앱 미리보기로 돌아가 포맷 된 보고서를 읽습니다.

</PlatformContent>

### 복사 및 수출을 통한 선택한 파일 보존 {/* #preserve-the-selected-file-through-copies-and-exports */}

관리된 참고를 가진 메시지를 복사할 때, 의도한 대화로 풀고 보내기 전에 각 결과 첨부 파일/참고를 검사하십시오. readable filename은 충분하지 않습니다. 참고를 열고 현재의 소유자와 버전을 확인합니다.

선택된 artifacts 또는 뭉치를 수출하기 전에, 완전한 선택을 확인하고, outcome를 기다리고 다운로드한 파일을 다시 엽니다. 편집, 새로 고침 또는 수출 실패하면 실제 저장된 결과를 검사하는 동안 초안 및 소스 버전을 보존합니다. 실패한 새로 고침은 preceding 득점방해 실패한 것을 설치하지 않습니다.

구현 참조 : [복사된 참고](https://github.com/aipoch/open-science/commit/f0c0e081), [완전한 수출 선택](https://github.com/aipoch/open-science/commit/f0468f35) 및 [미리보기 편집](https://github.com/aipoch/open-science/commit/8763f9aa). 첨부 파일이 **관리 파일 또는 세션은 삭제됩니다.**을 보고 있다면, 앱을 통해 의도한 현재 입력을 다시 입력하고 소유권을 검사합니다. [문제 해결](troubleshooting.md) 참조.

출처: [프로젝트 파일 라이브러리](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx), [로컬 파일 작업](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx).

## 승인된 로컬 파일을 산출물로 저장하기 {/* #import-local-artifact */}

**This computer**의 승인된 폴더에서 파일을 열고 미리보기의 **… → Save as artifact**를 선택합니다. 완료 후 대화에 생성된 산출물을 열어 내용을 확인하세요. Open-Science는 변경 불가능한 관리 사본을 보관합니다. 나중에 원본 파일을 수정해도 사본은 바뀌지 않습니다. 미리보기만으로는 파일을 가져오지 않습니다.
