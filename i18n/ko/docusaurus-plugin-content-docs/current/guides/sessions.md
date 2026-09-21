---
title: "세션 및 지점"
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 세션 및 지점 {/* #sessions-and-branches */}

프로젝트 그룹 관련 소스 및 작업. 세션은 하나의 대화입니다. 별도의 질문에 대한 새로운 세션을 사용, 새로운 질문이 선택한 대화 기록을 유지해야 할 분지. Neither는 파일 및 실행이 새로운 대화를 실제로 액세스 할 수 있는지 확인하기위한 교체입니다.

## 만들기, 이름 및 세션으로 돌아가기 {/* #create-name-and-return-to-a-session */}

프로젝트 열기, 세션 아래 **New**을 선택, 요청을 입력하고 보내주세요. 프로젝트 이름을 먼저 확인: 새로운 세션은 그 프로젝트에 속합니다. 세션 행을 선택하여 반환합니다. 작업이 완료되기 전에 상태를 읽으십시오.

<p className="example-label"><strong>예시</strong> RNA-seq 품질 검사 세션 이름</p>

완료된 GSE60450 실행을 위해, 우리는 **Edit…**을 사용하여이 정보를 저장합니다:

| (주) | 예제 값 | 옵션 정보 |
| --- | --- | --- |
| 제목 | `RNA-seq count matrix - validation and sample QC` | 80 문자까지; 편집기는 계산을 보여줍니다 |
| 설명 | `Validate the public GSE60450 matrix and retain descriptive QC outputs with source integrity checks.` | 최대 1,000 문자 |
| 저장 | Persist 변경 사항 | 닫은 후에 sidebar 제목을 검사하십시오 |
| 자주 묻는 질문 | 초안을 적용하지 않고 | 이 연구 실행을 취소하지 않습니다. |

![세션 제목 및 설명 편집기](/img/open-science/guides-walkthrough/40-session-edit.webp)

행 메뉴에서 **Pin**을 선택하여 Pinned 그룹에서 세션을 유지하십시오. **Unpin**은 정규 리스트에 반환합니다. Pinning는 접근을 편성합니다; 커널을 살아나거나 삭제에서 세션을 보호하지 않습니다.

세션을 통해 해당 번호와 그 제목과 프로젝트를 확인할 수 있습니다. 숫자는 비슷한 대화를 구별하는 데 도움이; 편집하거나 삭제하기 전에 선택한 행을 확인합니다.

## 독서 책갈피를 저장 {/* #save-a-reading-bookmark */}

[개인 독서 bookmarks](bookmarks.md)을 사용하여 통행 또는 PDF 지역을주의로 저장하고, 다음이 세션에서 **Bookmarks**에서 반환합니다. 책갈피를 저장하는 것은 대리인에 통행을 보내지 않습니다.

## 세션 메뉴를 올바르게 읽으십시오. {/* #read-the-session-menu-correctly */}

![RNA-seq 세션에 속하는 작업](/img/open-science/guides-walkthrough/41-session-actions.webp)

| (주) | 결과 | 【특전】 |
| --- | --- | --- |
| 편집… | 제목/도문 변경 | 정확한 행 및 저장된 상표 |
| 모든 아티팩트 다운로드 | artifact 선택/다운로드 흐름을 여십시오 | 이 세션의 저장된 파일 및 요청된 선택 |
| Notebook 보기 | 세션 실행보기 열기 | 소유자, 언어 및 실제 실행 |
| 대화 내보내기… | 제안된 형식/옵션을 통해 대화 내보내기 | Transcript 수출은 artifact/Notebook 뭉치에서 명백합니다 |
| 보관 | 활동 탐색에서 세션을 숨기기 | 설정에서 복구 가능 → Archived |
| 삭제 | 영구 삭제 확인을 엽니다. | 데이터가 영향을받는 것을 정확히 읽으십시오. 저장 취소 |



## 완료된 결과 후 분기 {/* #branch-after-a-completed-result */}

<p className="example-label"><strong>실습 예제</strong> Sample annotation을 위한 완성되는 QC 회의를 지키십시오</p>

완성 된 원시 QC 대화 intact를 유지하면서 다운스트림 샘플 annotation을 논의하고 싶습니다.

1. 원래 세션에서 완성 된 답변을 엽니 다.
2. 아래 **Branch in new session**을 선택합니다.
3. 새로운 세션 행을 확인합니다. 초기 소유권을 공유할 수 있습니다.
4. **Edit…**로 `GSE60450 - follow-up interpretation`로 이름을 변경합니다.
5. 다음 요청을 제출하기 전에 상속된 성적표를 검사합니다. 필요한 경우 원본 프로젝트 artifacts를 명시적으로 참조하십시오.

![핀 원본 옆에 독립적으로 지명 된 지점](/img/open-science/guides-walkthrough/57-session-branch.webp)

지점은 선택한 대화 기록을 보존하지만, 원래의 라이브 커널을 재현하지 않습니다. 복사된 활동을 위해 **code shown** 또는 차단된 역사적인 연결은 프로젝트의 파일 패널에서 본래 artifact를 열고 그것의 생성 회의를 검열합니다.

Branch 가용성은 메시지 및 프레임 워크 상태에 따라 다릅니다. [Side Chat](delegation.md#side-chat-availability)은 별도입니다. 새로운 측면 토론은이 대화의 현재 모델과 이유를 상속합니다. 다음 전송에 대한 다른 모델을 선택할 수 있습니다.

## 이전 메시지에 대한 {/* #revise-an-earlier-message */}

이전 사용자 요청에 **Edit message**은 전체 역사를 지우는 것보다 메시지 개정을 만듭니다. 제출하기 전에 수정 된 텍스트 및 첨부 파일을 읽으십시오. 대안을 검사할 수 있는 **이전/다음 메시지 개정**를 사용하십시오. 나중에 볼 수 있는 컨텍스트는 선택한 경로에 따라 달라집니다. 오래된 대답은 새로 편집 된 요청에 응답으로 처리되지 않아야합니다.

<p className="example-label"><strong>실습 예제</strong> QC 미터 정의에 대한 요청을 개정</p>

이 QC 예의 경우 완료된 질문에 **Edit message**을 선택하고 4개의 정의를 가진 1개의 sentence 요구를 대체하고 **Send**를 선택하십시오. Revision 제어는 새로운 응답이 실행되는 동안 사용할 수 없습니다. 완료되면 **Previous message revision**은 원래 질문과 답변으로 `1/2`로 돌아갑니다. **Next message revision**는 개정된 대답에 반환합니다. 정확한 CSV 필드 이름은 `3/3`을 생산하는 것에 대한 추가 보정. 이 Codex-subscription 세션에서는 개정된 메시지가 사용되기 전에 저장된 두 개의 보고서와 다운로드된 바이트가 변경되지 않았습니다.

동일한 개정 경로는 OpenCode과 로컬 모델과 연습했습니다. 개정된 요청은 새로운 구문을 생산하고, 이전은 원래의 대답을 복원하고, 다음 개정 된 대답을 복원했습니다. 이 연결 전용 예는 도구 상태 또는 외부 부작용이 반전되지 않습니다.

![역사적인 메시지 개정을 전환하기위한 제어](/img/open-science/local-todo-batch/18-message-revision.webp)

**Cancel**는 편집을 제출하지 않고 나뭇잎. **Send**는 새로운 대답을 요구합니다; 계속하기 전에 체크하십시오. 다음 작업을 수정하거나 별도로 지명 된 조사에 대한 지점을 수정하는 후속 작업을 사용합니다.

## 연구 패키지 {/* #research-packages */}

대화 지점, 파일 및 증거를 통해 손으로 [.science 연구 패키지](research-packages.md)을 사용합니다. 가이드 커버 수출 옵션, 수입 및 검사, 읽기 전용 세션 및 전송 복구.

## 수출 대화 및 연구 파일 {/* #export-conversations-and-research-files */}

세션 행 메뉴에서 **Export → Export conversation…**을 선택하여 연구 토론을 공유합니다. 첫 번째 사용 **Edit…** 세션을 제공하는 concise 제목 : PDF 수출은 제목을 사용하며 긴 자동 제목은 첫 페이지의 다량을 소비 할 수 있습니다.

| (주) | 활동 및 결과 |
| --- | --- |
| 체재 → PDF/Markdown | 독서와 인쇄를 위한 PDF; 더 많은 편집을 위한 Markdown |
| 전체 대화 | 현재 대화 지점 수출 |
| 선택됨 | 표시 턴 체크 박스, 처음 빈; 카운터는 당신의 선택을 따릅니다 |
| 모두 선택 | 각 목록 회전 선택 |
| 수출 PDF/수출 Markdown | 시스템 저장 대화 상자를 엽니다; 선택되지 않은 경우 사용하지 않음 |
| 취소 | 수출을 창조하지 않고 닫기 |

<p className="example-label"><strong>실습 예제</strong> 최종 GSE60450 QC 정의만 내보내기</p>

![최종 QC 정의는 PDF 수출을 위해 돌립니다](/img/open-science/local-todo-batch/20-selected-conversation-export.webp)

**GSE60450 — Methods and claim audit**에서 최종 회전을 선택한 것은 요청과 4 미터 정의 만 포함하는 한 페이지 PDF을 생산합니다. Earlier 토론은 복종되었습니다. 전체 대화 PDF도 재개 및 체크되었습니다. 앞서 선정된 Markdown 수출은 선택한 후속으로 시작되었습니다. 턴은 몇 개의 보조 메시지를 포함 할 수 있으므로, 한 번의 턴을 선택하면 정확히 두 개의 메시지를 수출 할 필요가 없습니다.

대화 수출은 연구 파일 다운로드를 대체하지 않습니다. 결과 링크는 수신자가 열 수 없다는 내부 응용 레코드를 참조 할 수 있습니다. CSV, 그림 또는 보고서를 다운로드하면 해당 파일이 Handover의 일부입니다.

### 세션 아티팩트 다운로드 {/* #download-session-artifacts */}

**Download all artifacts**을 선택하고 파일을 선택하고 **다운로드 N artifacts**을 선택하고 대상 폴더를 선택하십시오. 이 항목은 별도의 파일을 저장합니다. 두 개의 다운로드 방법 및 클레오짓 Markdown 파일이 다시 열리고 바이트에 저장된 artifacts 바이트를 일치했다.

![세션에서 두 개의 저장된 보고서 선택](/img/open-science/local-todo-batch/21-session-artifact-selection.webp)

### 프로젝트 파일 번들 다운로드 {/* #download-a-project-file-bundle */}

왼쪽 상단의 프로젝트 이름 메뉴 열기 → **Download artifacts…**. 파일은 **Generated** 및 **Uploads** 아래에 그룹화됩니다. 모든 것이 처음 선택됩니다; **Uncheck all**을 사용하여 파일을 손으로 선택하고 ZIP을 저장하십시오.

![보고서 선택, 프로젝트에서 QC 테이블 및 원래 카운트 입력](/img/open-science/local-todo-batch/22-project-artifact-selection.webp)

시스템에서 **Cancel**을 선택하여 저장을 포기하려면 대화 상자를 저장하십시오. 파일 선택은 사용할 수 있습니다. 쓰기 시작하면 앱이 취소 및 마감을 비활성화합니다. 결과에 대 한 기대; 대상 대화 상자를 취소하는 것은 진행 상황을 멈추지 않고 다릅니다.

일부 파일이 다운로드된 경우, 사용 가능한 소스 파일에 대한 액세스를 복원 한 다음 완전한 의도 된 수로를 선택하고 다시 다운로드하십시오. 동일한 ZIP 이름에 저장은 이전 아카이브를 대체합니다. 유일한 실패한 파일을 선정하는 것은 그 파일만 포함하는 새로운 뭉치를 창조합니다; 이전 ZIP에 추가하지 않습니다.

다운로드된 ZIP을 열고 파일 수, 이름 및 내용을 `generated/` 및 `uploads/` 아래에 비교하여 공유하기 전에 선택. 이 번들은 전체 프로젝트, 대화 기록, Notebook 커널 또는 실행 시간의 백업이 아닙니다.

## 보관 및 완료 지점 복원 {/* #archive-and-restore-a-finished-branch */}

**Archive**을 도입한 후 **Settings → Archived → Sessions**을 엽니다. **Restore**을 선택하기 전에 프로젝트 및 아카이브 시간을 확인하십시오. 분기가 활성 탐색 및 저장된 내용에 반환한다는 것을 확인; 원래 대화는 별도입니다.

아카이브 프로젝트의 경우 **Manage** 항목을 사용하여 프로젝트의 세션을 검사합니다. 아카이브, 복원, 삭제 및 저장 이전의 차이에 대한 [저장과 아카이브 작업](storage.md) 참조. 활성 목록에서 세션의 사라짐은 디스크 공간이 재발견되지 않은 증거입니다.

출처: [세션 편집기](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/EditSessionDialog.tsx), [workspace 구현](https://github.com/aipoch/open-science/tree/v0.26.0/src/renderer/src/pages/workspace).

## 현재 세션 {/* #fork-session */}

로컬 또는 수입 세션의 독립적 인 작업 복사본이 필요할 때 **Fork**을 사용하십시오. **Branch in new session**은 선택한 메시지에서 시작합니다. Fork는 세션의 완전한 저장된 연구 역사를 복사하여 지점, Notebook 레코드, 파일 버전, 문학, 주석 및 개인 책갈피를 포함한. 소스 세션은 변경되지 않습니다. 기록 복사는 재시작하지 않거나 이 컴퓨터에서 환경이 준비되어 있다는 것을 설정하지 않습니다.

1. 데스크톱 앱에서, 완료하거나 현재 작업을 중지합니다. 끝으로 어떤 포장 이동든지를 위해 기다리십시오.
2. 세션 행의 동작을 열고 **Fork**을 선택합니다. 앱은 이동 진행 상황을 보여줍니다; **Run in background**은 취소하지 않고 창을 숨깁니다.
3. **Fork completed**을 기다리며 새로운 세션을 엽니다. **Source session**과 새로운 세션 번호를 검사하는 제목을 엽니다.
4. 상속된 파일을 열고 그 내용을 확인합니다. 선택된 모델을 검사하고 계속하기 전에 실행 시간; 오래된 기계 경로 또는 허가는 주의해야 할 수 있습니다.
5. 사본에 다음 작업을 보내고 새로운 출력을 확인합니다. 참고 기록으로 원본을 지키십시오.

![세션 작업 메뉴의 포크](/img/open-science/v0311/fork-menu.webp)

![새로운 세션 정보 소스를 표시하고 QC 파일을 상속](/img/open-science/v0311/fork-info.webp)

Fork는 데스크톱 앱에서 사용할 수 있습니다. 수입 세션은 포크에서 작업 할 때까지 읽기 전용 남아. 프로젝트 설정 및 메모리는 별도의 copied 프로젝트가 아닙니다. 오래된 검토 또는 검증 기록은 기록 된 버전을 설명합니다; 현재 체크로 치료하기 전에 모든 결과를 검사합니다.

### 복사에 QC 계산을 계속 {/* #continue-a-qc-calculation-in-the-copy */}

<p className="example-label"><strong>실습 예제</strong> v0.31.1의 현지 세션</p>

GSE60450 프로젝트에서 기존의 QC 세션을 포크하고 `gse60450-qc-summary.csv` 상속을 엽니다. **12** 샘플 및 **269,027,617** 총 원시 카운트를 확인하십시오. 복사에서 Python 파일을 읽고 에이전트를 요청하고, 두 값을 확인하고, 샘플 당 평균 카운트를 계산하고 별도의 `fork-qc-check.csv`을 저장합니다. 결과는 **22,418,968.083333…**입니다. 소스와 상속된 파일은 동일한 내용이 있습니다; 새로운 계산은 별도의 파일입니다. 이 의미는 continuation, 표식 정상적인화를 보여줍니다.

![Python 계산 및 위조 세션에 저장된 새로운 결과](/img/open-science/v0311/fork-result.webp)

<ExampleDownload path="/examples/v0311/fork-qc-check.csv">산출된 결과를 다운로드</ExampleDownload>. 수신된 `.science` 패키지에서 계속하려면 [연구 패키지](research-packages.md)을 따르십시오.

## 세션 정보 카드 읽기 {/* #session-information */}

세션 제목을 선택하여 번호, 설명, 소스, 생성/업데이트 시간, 현재 지점 및 artifact 카운트에 대한 메시지 수를 참조하십시오. **Pin**을 사용하여 세션을 쉽게 찾을 수 있도록, 또는 **세션 편집**은 제목과 설명을 변경합니다. **채팅에서 계속** 배당자는 기록 된 소스 회전으로 다시 연결합니다.
