---
title: "리뷰 및 이용 후기"
last_update:
  date: '2026-09-17'
---

# 리뷰 및 이용 후기 {/* #reviewer-and-auto-review */}

내장 된 작성자는 요청에 대한 완료 된 응답을 확인하고 증거를 사용할 수 있습니다. 사용자 정의 Specialist에서 별도의 이름은 "Reviewer,"및 허가 승인으로 분리됩니다.

실행 기반 출력 비교를 위해, [재현성](../guides/reproducibility.md)을 사용합니다. Reviewer 평가 및 재제작된 출력은 별도의 기록입니다.

## 세션 리뷰 versus artifact review {/* #session-review-versus-artifact-review */}

대화 검토 및 artifact의 검증 패널의 **Review** 탭은 다른 레코드입니다. 공유하려는 정확한 artifact 버전을 검사합니다. **No review for this version**이 말하면 다른 응답이 검토 된 경우에도 라벨을 보존합니다. 마찬가지로 **partial** 환경 캡처 및 **뚱 베어** 증거는 부분적으로 유지하고 모델이 신뢰를 표현 한 후 경계.

입력 오류에 대한 액세스 가능한 현재 입력을 첨부하거나 응용 프로그램을 통해 실제 버전을 해결하십시오. 로컬 파일의 존재는 모든 아이/리커 커널이 읽을 수 있다는 것을 보증하지 않습니다. [Notebook](../guides/notebook.md), [위임](./delegate.md) 및 [문제 해결](../guides/troubleshooting.md)를 참조하십시오.

과거의 검토를 다시 열 때 선택한 artifact 버전 검사. 검토 또는 보정을 취소 한 후, 마지막 상태를 읽고 중단 여부를 결정하기 전에 발견을 유지. 취소는 성공적인 리뷰를 만들지 않습니다.

## 확인 할 수있는 결과를 선택하십시오. {/* #choose-a-result-you-can-check */}

첫 번째 검토를 위해 [inline 테이블 체크](delegate.md#verified-example-twelve-sample-invariants)을 완료하십시오 : 완벽한 샘플 - QC 테이블을 제공하고 샘플 당 1 개의 arithmetic 결과를 요청하십시오. 이것은 정확한 크리에이터를 공급합니다: 12개의 유일한 표본 식별자, 12의 줄 및 0 표는 각 줄을 위한 유전자 합계와 동등한 유전자를 검출했습니다.

검토하기 전에, 아이 결과를 열고 Notebook는 자신을 출력했습니다. 그런 응답을 요청합니다. 해당 기준을 가진 리뷰의 체크를 비교하십시오; 행이거나 실행된 결과가 누락되면, 결과를 사용하기 전에 그 결과를 확인한다. 검토 결과는 응답과 유효한 증거에 달려 있습니다; 이 운동은 Zero-finding 배지를 약속하지 않습니다.

## 자주 묻는 질문 {/* #request-a-review */}

1. 작업 모델과 대화를 완료합니다.
2. 작곡가 **+ menu → Request review**을 엽니다. **Reviewing…**의 메뉴가 변경되는 동안 리뷰가 실행됩니다.
3. **Reviewer** 카드의 결과를 엽니다. 발견과 검사의 수를 읽고, 그 후에 각 검사의 설명을 확장하십시오.
4. **Go to transcript**을 선택하여 **Session Reviewer**을 엽니다. 모델, 타임스탬프, PASS/FAIL 문, 증거 참조 및 **Reviewer log**을 확인하십시오.
5. 보정이 요청되면 Main Agent의 후속 및 모든 어린이 허가 요청을 검사합니다. 리뷰는 자동으로 해당 작업을 부여하지 않습니다.
6. 확인된 문제점을 해결한 후에 **Re-run review**를 사용하십시오. 필요한 입력 또는 작업이 여전히 사용할 수 없는 경우 오염된 결과를 보존합니다.

<p className="example-label"><strong>실습 예제</strong> 해결되지 않은 발견과 리뷰를 읽으십시오</p>

<details>
<summary>체크 및 해결되지 않은 검색보기</summary>

gpt-5.6-sol, 수동 검토와 Codex 구독 인증을 사용하여 **4개의 체크 및 1개의 찾아내기**를 반환 :

| 【특전】 | 실제 결과 |
| --- | --- |
| Specialist는 인라인 CSV 리뷰를 실행 | 패스; 리뷰는 어린이 손전등과 arithmetic 결과를 인용했습니다. |
| 사용자 정의 MCP 결과 및 실패가 정확하게보고되었습니다. | 패스; 유효한 미터 및 연결관 과실 일치한 실행 산출. |
| 분자 호출은 명시된 artifact/descriptors를 생산 | 패스; 반환된 artifact 버전과 값이 식별되었습니다. |
| 모델은 요청대로 저장된 분자 미리보기를 검사했습니다. | 담당자: Ms. 그것의 카탈로그 조회는 구조 내용을 읽지 않았습니다. |

예를 들어 모델이 구조 체크에 필요한 관리 입력에 액세스 할 수 없기 때문에 **해결 한계 도달 / 발견 된 문제**과 끝. 누락된 입력을 식별하고 다른 리뷰를 요청하기 전에 제공합니다. 뷰어의 구조를 수동으로 열면 모델의 검사 기록을 업데이트하지 않습니다.

</details>

## Auto-review 제어 {/* #auto-review-controls */}

**Agent controls → Auto-review**을 열고, 향후 응답 후 검토를 구성합니다. 이것은 대화 선호입니다; **Ask for approval** 및 **Delegation**과 구별됩니다. 설정에 내장 된 작성자 행에는 일반 편집 / 삭제 / 비활성화 제어가 없으며 정상 Specialist 피커에서 제외됩니다.

| UI 상태 또는 통제 | 이름 &#42; |
| --- | --- |
| 자주 묻는 질문 | 활성 응답 / 리뷰, 누락 된 자격이 완료 된 응답 또는 사용 가능한 모델 설정 확인. |
| 검토 중… | 리뷰는 여전히 실행됩니다; 완전한로 그것을 대우하지 마십시오. |
| 작성자 · n 찾기 · n 체크 | 체크와 그 증거를 엽니다. Zero-finding 결과는 여전히 확인 된 것에 의해 경계됩니다. |
| 수정 요청됨 | Main 에이전트는 후속 교정 사이클을 실행할 수 있습니다. 새로운 작업 및 결과 검사. |
| 발견 된 문제 / 해결 제한 도달 | 리뷰는 모든 발견을 해결하지 않았습니다. 새로운 시도를 시작하기 전에 최신 설명을 읽으십시오. |
| 대화 기록으로 이동 | 전용 세션 작성자 페이지를 엽니다. |
| 확장 / 축소 작성자 로그 | 작동 로그를 수정하거나 숨기십시오; truncated 로그는 증거를 완료하지 않습니다. |
| 검토 재실행 | 다른 리뷰 요청; 그것은 "모든 발견을 받아들이지" 버튼입니다. |

<span id="what-the-local-review-checked" />

### 별도의 모델로 Auto-review를 실행 {/* #run-auto-review-with-a-separate-model */}

1. **Settings → Model → Reviewer**의 밑에, 유효한 조정 모형을 선택하십시오. 사용 된 운동 설정 `gpt-5.6-sol` 을 위해 Main 으로 `gpt-5.6-luna` 리뷰 작성자
2. 대상 대화에서 **Agent controls → Auto-review**을 열고 **On**을 확인하고 다음 요청을 보내주십시오.
3. 응답 후에, 자동적으로 **Reviewer** 카드를 창조했습니다. 모델, 선임, 증거 및 결과 확인.
4. **Corrections requested**이 나타나면 Main의 보정과 결과가 해결되는지 여부를 결정하기 전에 후속 검토를 검사합니다.

v0.30.2에서 자동검토는 대화가 시작될 때 조정을 보존하고, 연결 보정은 개정 주기를 위해 필요한 검토 의견을 유지합니다. 전송하기 전에 그것을 켜고 실제 작성자 카드와 Main의 개정된 산출을 검사하십시오. Context 보전은 발견이 정확하지 않습니다; 후속 검토 및 나머지 발견을 읽으십시오.

### “resolved” 설정 {/* #what-resolved-establishes */}

요청한 시도가 만들어졌기 때문에 체크가 해결될 수 있습니다. 허가 실패는 정확하게 보고되었습니다. 파일이 읽기 또는 그 계산이 통과 된 것을 설정하지 않습니다. criterion, 도구 결과 및 나머지 발견을 함께 읽으십시오. 액세스가 차단되면 다른 리뷰를 시작하기 전에 [파일-handoff 알려진 문제](delegate.md)을 따르십시오.


구현 참조 : [세션ReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [컴파일러AgentControlsMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx).
