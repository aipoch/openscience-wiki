---
title: "대화와 대기 중인 요청"
last_update:
  date: '2026-10-08'
---

# 대화와 대기 중인 요청 {/* #conversations-and-queued-requests */}

Composer는 현재 세션에 대한 지침 및 입력 참조를 보내고 실행 중 후속을 준비 할 수 있습니다. **Queue · 저장되지 않음**은 누락된 요청이 아직 저장되지 않았습니다.

## 연구 아이디어에서 시작 {/* #research-starters */}

빈 대화 페이지는 Composer 옆에 **Analyze data**, **Compare papers**, **Find literature**, **Create charts** 및 다른 연구 시작자를 제공합니다. 더 많은 선택을 볼 수 화살표를 사용합니다.

1. 예정된 프로젝트에서 **New**을 엽니다.
2. **Explain a paper**과 같은 시동기를 선택하십시오. 편집 가능한 요청을 가진 Composer를 채웁니다; 메시지를 보낼 수 없습니다.
3. 실제 용지 또는 데이터를 첨부하고 업로드를 기다리며 일반적인 요청을 질문 및 예상 출력으로 대체하십시오.
4. 모델, 첨부 파일 및 요청을 확인한 다음 보내주세요. 결과를 받아들일 전에 반환된 소스 및 파일을 엽니다.

![연구 시작자와 새로운 대화에서 컴팩트 한 연구 패키지 수입 항목](/img/open-science/v0351/new-conversation.webp)

**Import previous research**은 `.science` 패키지에 별도의 항목입니다. 연구 시작자를 선택하면 패키지 또는 공급 예제 데이터를 가져올 수 없습니다.

## checkable outcome와 요청을 준비하십시오. {/* #prepare-a-request-with-a-checkable-outcome */}

**New**을 선택한 후 **Ask anything**의 요청을 입력합니다. 입력, 원한 산출 및 어떤 방법 constraints를 이름. 완전한 시작 예시, [첫 번째 프로젝트](first-project.md)을 따르십시오.

| 이름 &#42; | (주) | 자주 묻는 질문 |
| --- | --- | --- |
| + → 첨부 파일 | 로컬 파일을 선택하고 업로드를 기다립니다. | 출석 칩 현재; 전송은 유효하다 |
| 부착 칩 | 단계 입력을 미리보기 | 이름과 내용 일치한 자료 |
| 첨부 파일 제거 | 그것의 초안 참고를 제거 | 원래 로컬 파일을 삭제하지 않습니다. |
| + → 파일 | 기존 프로젝트 파일 선택 | 부정확한 artifact/version, 다만 유사한 이름 |
| `@` | 파일/artifact 또는 유효한 문학 참고를 선정하십시오 | 참조를 바인딩하는 실제 제안을 선택하십시오. |
| `/` | 사용 가능한 Skill 선택 | 방법은 관련 및 필수품입니다. |
| `#` | 이 차례의 세션 성적표 | 그 세션의 파일/커널을 포함할 것을 약속하지 않습니다 |
| + → 기술로 저장 | [완료된 지점을 재사용할 수 있는 Skill로 설정](../skills/create.md) | 끝 현재 활동; unavailable가 없는 경우에 tooltip를 검열하고 저장된 포장을 확인하십시오 |
| + → 콘텍스트 | Inspect 현재 컨텍스트 사용 | 새로운 무결성 세션은 장애인 입장이 가능합니다. |
| + → 검토 | 자격이 된 업무가 존재하는 경우의 요청 검토 | 결과 및 호환 리뷰 경로가 필요합니다. |

10,000 문자 또는 300 라인 위의 긴 일반 텍스트 페이스트가 관리 된 첨부 파일이됩니다. **Show in text field**는 에디터에 텍스트를 제공 할 때 복원합니다. 빈 작곡가의 시작에서, Up/Down는 신속한 역사를 찾아냅니다; 복원 된 첨부 파일을 resending 전에 검사합니다.

## 어떻게 작업 시작을 선택 {/* #select-how-work-begins */}

모델 선택기는 형성된 모델 중 선택한다. 그것의 reasoning 선택권은 모형/framework에 달려 있습니다. 변경은 다음 요청에 적용, 이미 실행되지 않습니다. **Agent controls**는 허가 형태, 자동 검토, Specialist 선택 및 위임을 드러냅니다; 각에는 별도의 효력이 있습니다.

| 관련 제품 | 제품 정보 | 결과/바운드 |
| --- | --- | --- |
| 메시지 보내기 | Idle 세션, 준비 요청 | 사용자 메시지를 저장하고 실행 시작 |
| 더 많은 전송 옵션 → 계획 먼저 | 실행하기 전에 단계 검토 | 승인 된 작업이 진행되기 전에 계획에 응답 |
| 사이드 채팅 | 제한된 도구와 독립적 인 탭에 대한 토론 | 새로운 초안은 대화 모델을 상속하고 노력하는 것을 상속합니다. 전송하기 전에 Side Chat 선택을 확인합니다. 이름 &#42; [Side Chat](delegation.md) |
| 팟캐스트 | 자주 묻는 질문 | 상속된 역사/파일을 검사하십시오; 은 은 [세션](sessions.md) |
| 대기열에 메시지 추가 | 실행 중에 후속을 준비하십시오. | 대출 요청은 배달 될 때까지 저장되지 않습니다 |
| 실행 취소 | 현재 실행 중지 | 취소에 대 한 대기; 이미 저장된 결과는 자동으로 undone이 아닙니다. |

## 정확한 의견 보내기 {/* #send-precise-feedback */}

<p className="example-label"><strong>예시</strong> 계획에서 입력 및 출력 체크 요청</p>

플랜 omits가 소스-integrity 또는 출력 체크를 받으면 승인하기 전에 요청하십시오. 작업의 밑에 산출 필요조건을 적응시키십시오:

```text
Add an explicit before/after SHA-256 check and reopen all three saved
outputs. Use compact sample labels in the plot, and include their exact
original column-name mapping in the CSV/report.
```

**Respond to Plan → Send Plan feedback**을 통해 제출 된 개정 계획의 승인에 따라. 그것은 큐 납품의 데모 되지 않았습니다.. 실제 제어 및 스크린 샷에 [회사연혁](planning.md)을 참조하십시오.

실행 작업의 경우 다음 명령을 변경해야 할 때 큐를 사용하십시오. 어떤 변화와 어떤 남아 있는지. 메시지 업데이트는 새로 요청된 패키지 설치 또는 더 넓은 파일 액세스를 승인하지 않습니다.

## 실행 작업의 큐를 관리 {/* #manage-a-running-tasks-queue */}

1. 실행이 활성화되어있는 동안 Ask에서 후속을 입력하십시오.
2. **Add message to queue**을 선택하면 보류 텍스트를 읽을 수 있습니다.
3. **Edit queued message**을 사용하여 Composer로 돌아갑니다. 앱이 요청한 경우 Preserve/clear가 기존의 초안을 먼저 지웁니다.
4. **Remove queued message**는 이미 전달된 지시가 아닙니다.
5. 주문 손잡이를 드래그하십시오. 키보드 주문에 대 한, 초점을 맞추고, **- 연혁** 항목을 선택 하기 위해, **위/아래** 이동, 그 다음 **- 연혁** 그것을 드롭.
6. **Send now**는 프레임 워크의 지원된 후속 경로를 통해 배송을 요청합니다.
7. 텍스트는 사용자 메시지로 표시되며 에이전트는 변경 사항을 인정합니다.

**Sending…**, **Stopping…** 또는 **Queued 메시지는 현재 뛰기 끝 후에 보낼 것입니다**를 읽으십시오. 일부 프레임 워크는 배달을 중단합니다. **저장되지 않음**은 텍스트가 아직 튼튼한 성적표 메시지가 아닙니다. 닫히기 전에 중요한 종료 텍스트를 보존하십시오. 분기 경고는 큐가 다른 메시지 경로에 속한다는 것을 의미합니다. 중복을 추가하기 전에 기존 항목에 보내는 오류를 해결합니다.

### 보고서가 작성된 동안 편집 및 주문 후속 조치 {/* #edit-and-reorder-follow-ups-while-a-report-is-being-written */}

몇 가지 누적 된 메시지를 수정하려면, 예정된 요청을 편집하고, 주문을 조정하고, 더 이상 필요한 모든 요청을 제거하십시오.

1. **Edit queued message** 을 선택하여 대상 아이템에 따라 선택해주세요. 그것은 Composer로 이동하고 일시적으로 큐를 나눕니다.
2. 텍스트를 개정하고 **Add message to queue**을 선택합니다. 그 위치를 다시 검사하십시오; 편집된 요청은 끝에서 반환할 수 있습니다.
3. 요청을 이전으로 이동하려면 **주문 수량 메시지** 핸들을 집중시키려면 **- 연혁**을 눌러 화살표 키를 사용하여 **- 연혁**를 다시 누릅니다.
4. 더 이상 필요로 하지 않는 알림 또는 지시 옆에 **Remove queued message**를 사용하십시오.
5. 납품 후, 최종 텍스트 및 주문에 대한 저장된 성적표를 확인합니다. 제거된 요청은 전달된 지시로 나타나지 않아야 합니다.

![편집 및 재주문 후 두 가지 나머지 요청](/img/open-science/local-todo-batch/14-queue-reordered.webp)

전달 된 답변 확인은 편집 된 내용과 순서를 따릅니다. **저장되지 않음**은 저장된 성적표에 입력하지 않았습니다; 닫히거나 재시작하기 전에 중요한 필수 텍스트를 복사합니다.

**Exit queued editing**는 큐 편집 모드를 종료하고 Composer의 텍스트를 나눕니다. 편집은 큐에서 원래 항목을 제거, 그래서 종료는 다시 넣어하지 않습니다. 그것을 유지하려면 초안을 확인하고 다시 큐에 추가하십시오. 그것을 discard에, 초안을 지우십시오.

### 편집할 때 첨부 파일 {/* #preserve-attachments-when-editing */}

누적 요청이 파일을 포함 할 때, 첨부 파일 칩이 여전히 편집기를 다시 열 때마다 존재한다는 것을 확인합니다. 지침을 변경하면 **Add message to queue**을 선택합니다. 납품 후, 지정된 입력으로 저장된 사용자 메시지에 표시된 파일을 비교합니다. 정확한 파일 정체성 사정이 있을 때 파일 체크섬을 요청합니다.

![파일 및 체크섬으로 전달된 편집된 첨부 요청](/img/open-science/sept11-completion/queue-result.webp)

### 할당된 첨부 파일은 사용할 수 없습니다. {/* #a-queued-attachment-becomes-unavailable */}

편집 된 누적 된 메시지가 **관리 파일 또는 세션은 삭제됩니다.**로 중지되면 첨부 파일 칩과 파일에 원본 파일을 검사합니다. 요청 텍스트를 보존하고 새로운 정규 메시지 및 재스트에 현재 파일을 다시 배치하십시오. 반복적으로 동일한 stale 부착 참고를 보내지 마십시오. 새로운 첨부 파일이 실패한 경우 진단 보고서의 오류 및 파일 ID를 유지하십시오.

## 활동 및 완료 {/* #read-activity-and-completion */}

도구 카드를 확장하여 인수, 코드 및 출력을 검사합니다. 완료 후, 각 요청한 결과를 엽니다. 단계가 실패한 경우, [문제 해결](troubleshooting.md)에서 복구 작업을 선택하기 위해 첫 번째 오류를 사용합니다.

**Show more**은 긴 사용자 요청을 확장합니다. **Copy message** 및 코드 복사 컨트롤은 해당 콘텐츠를 복사합니다. **Scroll to end**는 최신 이벤트로 돌아갑니다; 데스크탑 런 마크 레일은 긴 대화에서 프롬프트 중 점프합니다. 이전 사용자 메시지 편집은 개정을 만듭니다; 선택된 경로를 이해하기 위해 [세션](sessions.md)을 사용합니다.

| 문제 | 다음 검증 |
| --- | --- |
| 사용 방법 | 빈 텍스트, incomplete 업로드 또는 사용할 수없는 세션 상태 |
| Queue 편집 거부 | 기존의 Composer 초안은 보존 / 취소되어야 합니다. |
| Original analysis는 계속됩니다. | 갱신 납품 versus deferred 국가를 확인하십시오 |
| 계획 승인 후 작업 대기 | 별도의 도구 권한은 여전히 종료 될 수 있습니다. |
| 모형은 Done 그러나 공구 실패합니다 | 합격 전에 첫번째 실패 및 실제적인 저장된 artifacts를 검열하십시오 |

## 복사, 다운로드 또는 답변 테이블 확대 {/* #copy-download-or-enlarge-an-answer-table */}

Hover 또는 **복사 테이블** (Markdown, CSV 또는 TSV), **다운로드 테이블** (CSV 또는 Markdown) 및 **전체 화면보기**를 계시하는 응답 테이블을 초점. 필요한 형식을 선택하고 목적지를 확인하고 줄과 헤더를 확인하기 위해 파일을 다시 엽니다. 이 작업은 기존의 대답을 수출; 그들은 Connector을 다시 실행하지 않거나 관리 된 artifact 버전을 만들 수 없습니다.

![전체 화면보기에서 반환 된 메타 데이터 테이블](/img/open-science/guides-walkthrough/60-response-table.webp)

긴 실행 작업을 위해 [백그라운드 작업](notebook.md#background-tasks-and-result-delivery)을 열고 특정 실행을 취소합니다. 누적된 후속은 구속 명령입니다. 배경 작업은 이미 인정 된 작품입니다. 작업 목록은 실행을 중지하지 않습니다.

출처: [queue 통제](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx), [납품 관제사](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/workspace-message-queue-controller.ts).

## 드롭 파일로 대화 {/* #conversation-drop */}

대화 영역에서 로컬 파일을 드래그 할 수 있습니다. Composer는 없습니다. 첨부 파일 칩 및 마무리에 업로드를 기다리면 파일 이름을 검사하고 요청을 보내주십시오. 삭제 파일은 메시지를 보낼 수 없습니다. `.science` 연구 패키지를 가져 오기 위해 빈 대화 페이지에 **Import previous research**을 사용하십시오. [연구 패키지](research-packages.md) 참조.
