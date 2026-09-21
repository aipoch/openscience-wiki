---
title: "실행하기 전에 계획"
last_update:
  date: '2026-09-20'
---

# 실행하기 전에 계획 {/* #planning-before-execution */}

**Plan first**을 사용하여 입력, 방법, 출력 및 합격 기준을 실행하기 전에 사용하십시오. 계획 승인 및 도구 권한은 별도의 결정입니다. 스크린 샷 입력은 [예시자료](../reference/example-data.md)에 있습니다.

## 계획 요청 제출 {/* #submit-a-planning-request */}

<p className="example-label"><strong>실습 예제</strong> 원시적 QC 계획 검토 및 개정</p>

1. 입력 파일을 첨부하고, 목표, 방법, 배달 및 제한을 설명합니다.
2. **More send options → Plan first**을 엽니다. 텍스트 요청이 필요합니다; 첨부 파일 전용 초안은이 옵션을 활성화하지 않습니다.
3. 계획의 기대. **Plan control** 허가 카드가 나타나면, 검사하고 의도한 범위를 허용하거나 그것을 deny. 이 계획 작성 / 결정 기록, 모든 미래 실행되지 않습니다.
4. **Plan ready for review**에 대한 대기. 정상적인 단락을 대우하지 마십시오 “그것이 나의 계획입니다” 구조화된 승인 카드가 존재한다는 증거로.

![메뉴에서 첫번째 계획](/img/open-science/guides-walkthrough/21-plan-first-entry.webp)

![별도의 권한을 생성하고 계획을 기록](/img/open-science/guides-walkthrough/22-plan-permission.webp)

지정된 비 교환 된 원시 카운트, 별도의 ID / 길이 메타 데이터, per-sample QC, 세 개의 관리 된 출력 및 비 차압 주장. 정확한 초기 요청은 판결을 쉽게 할 수 있습니다.

## approving의 앞에 검사 {/* #inspect-before-approving */}

**Open**을 선택하여 대화 옆에 구조된 계획을 볼 수 있습니다. Inspect 단계, 단계 순서, 실행 소유자, 원하는 출력 및 feasibility 노트. **Enter full screen**을 사용하여 긴 계획을 읽고 **Download Plan**을 유지하십시오. 신뢰 라벨은 계획의 평가이며, 코드가 이미 실행되었는지 증거가 아닙니다.

![단계와 원하는 출력을 가진 구조화된 계획](/img/open-science/guides-walkthrough/23-plan-review.webp)

| 통제/전류 | 무엇을 할 것인가? |
| --- | --- |
| 열기 | 전체 계획을 읽으십시오; 오프닝은 승인되지 않습니다. |
| 허용 | 현재 계획이 진행 중입니다. 도구 별 승인은 여전히 나타날 수 있습니다. |
| 계획에 응답 | 입력, 방법, 출력 또는 합격 기준에 작용할 수 있는 개정을 설명하십시오. |
| 계획 피드백 보내기 | 비범한 피드백을 제출하고 개정된 계획을 기다립니다. |
| Dismiss, 승인 미리보기에 표시 할 때 | 계획이 끝나는 것을 거부/해제하십시오; 그것은 단지 미리보기를 닫는 것에서 명백합니다. |
| 대체/새로운 계획 경고 | 이 스냅 샷은 stale이며 현재 계획을 승인 할 수 없습니다. 현재 카드를 다시 엽니다. |

## 요청 변경 및 교체 검토 {/* #request-changes-and-review-the-replacement */}

**Respond to Plan**에서, 정확히 무슨 변화가 있는지. 예를 들어, 입력-integrity 체크를 요청하고, 각 출력을 다시 열고, 단축된 플로우 라벨과 고유 식별자 간의 매핑을 합니다. **Send Plan feedback**을 선택하면 교체를 기다립니다.

![제출하기 전에 입력된 피드백](/img/open-science/guides-walkthrough/24-plan-feedback.webp)

교체를 읽고 **Approve** 버튼을 사용하십시오. 이미 오래된 미리보기가 교체 된 경고로 볼 수 있습니다. 표시된 단계는 활성 계획의 최신 진행이 아닙니다. 이전 스크린 샷을 승인하는 것보다 적극적인 계획을 재개합니다.

## 실행 및 검증 결과 {/* #follow-execution-and-verify-results */}

queued follow-ups를 위해, 사용 [Composer 큐 컨트롤](composer.md#manage-a-running-tasks-queue). queue를 편집하는 것은 계획을 승인하지 않습니다.

승인 후, 세션은 계획을 실행합니다. Ask 모드에서는 별도의 도구 권한 카드가 나타날 수 있습니다. 명령, 대상 및 범위를 검사합니다. 작업이 실패하면 실제 입력, 환경 또는 액세스 오류가 재발하기 전에 확인합니다. 플랜을 개선하면 그 요구 사항을 해결할 수 없습니다.

단계 상태는 시작되지 않습니다, 진행 중, 완료, 차단, 건너뛰고 실행되지 않습니다. 완료된 계획은 스스로 과학적 검증이 아닙니다. 실제 CSV, 그림 및 보고서를 엽니 다. 합격 기준을 가진 그들의 내용을 비교하십시오. 이 예에서 12 샘플 summaries는 원래 매트릭스에서 독립적 인 계산을 일치했습니다.

[파일 및 버전](./files.md), [Notebook 증거](./notebook.md) 및 [권한](./approval-modes.md)로 계속됩니다.

근원: [계획 승인 및 미리보기 컨트롤](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/session-plan/SessionPlanSurfaces.tsx).

## 컨텍스트 재건축 후 재건축 {/* #resume-plan */}

v0.31.0에서 에이전트는 현재 세션 플랜을 복구 할 수 있습니다, 그것의 수정 및 종료 승인 후 컨텍스트를 재건. 활동 계획을 다시 열고 계속하려면 먼저 완료 한 단계를 확인합니다. 대출 승인은 여전히 종료됩니다; 계획을 복구하거나 결과를 확인하지 않는 작업을 확인하지 않습니다.
