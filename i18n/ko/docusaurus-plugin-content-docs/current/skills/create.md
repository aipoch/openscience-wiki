---
title: "Skill 및 지원 파일 만들기"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Skill 및 지원 파일 만들기 {/* #create-a-skill-and-its-supporting-files */}

[public 예제 입력](../reference/example-data.md)을 사용하여 재사용 가능한 방식으로 반복된 RNA-seq을 확인합니다. 이 방법 체크 익지않는 조사; 차별 압축 테스트를 수행하지 않습니다.

예제는 두 개의 독립적 인 패키지 이름을 사용합니다.

| 창조 노선 | 저장 Skill ID | 그것과 쉼 |
| --- | --- | --- |
| **Save as skill** 완료된 대화에서 | `rnaseq-descriptive-qc` | 새로운 대화에서 개인 Skill을 게시한 것을 선택하십시오. |
| 밑에 수동 포장 | `rnaseq-count-qc` | 수동으로 만든 Skill을 사용하여 정확한 ID를 선택하십시오. |

게시, 검색 및 재사용을 통해 경로 중 하나를 따르십시오. 실제로 저장된 이름을 사용하십시오; 두 ID는 별칭이 아닙니다. 패키지 이름을 바꾸면 다음 요청에 새로운 저장된 정체성을 사용합니다.

## 창조 경로를 선택 {/* #choose-a-creation-route */}

| 시작점 | 이 항목 사용 | 자주 묻는 질문 |
| --- | --- | --- |
| 완료된 대화는 반복적인 절차가 포함되어 있습니다. | 대화 **+ → Save as skill** | 에이전트는 활성 지점을 증류하고 재사용 가능한 패키지를 준비하기 위해 사용자 정의 / Skill Creator를 사용합니다. |
| 새로운 방법 대화를 설명하고 싶습니다. | 설정 **Add skill → Chat with agent**, 또는 **Customize** | 방법을 초래하는 대리인과 일하고 간행하기 전에 검사하십시오. |
| 이미 지침 및 지원 파일이 있습니다. | 설정 **Add skill → Write from scratch** | 아래 편집기를 사용하여 직접 패키지를 입력합니다. |
| 이미 패키지 또는 저장소가 있습니다. | **GitHub에서 기술 / 가져 오기 / 설치 된 기술** | Inspect 및 기존 리소스를 가져 오기; 은 은 [Skills 관리](./manage.md). |

## 기술로 저장: 완료된 대화를 방법으로 바꾸기 {/* #save-as-skill-turn-a-completed-conversation-into-a-method */}

반복 가능한 절차가 실제로 일한 후에 이것을 사용하십시오 — 예를 들면, 익지않는 RNA-seq 조사 모체를 검사하고, 그것의 식별자, 계산 표본 미터를 보존하고 산출을 재개하십시오. **Save as skill**은 목표, 도구, 단계 및 사용자 보정을 포함하여 **Active 대화 지점**을 사용합니다. 그것은 reusable 절차를 추출 하는 대리인을 요청, transcript를 복사 하지. 분기가 거부되는 절차가없는 경우, 에이전트는 Skill을 생성하지 않고 그와 중지를 설명 할 수 있습니다.

1. 관련 대화를 열고 유지하려는 절차가 포함 된 지점을 선택하십시오.
2. 현재 응답과 어떤 subagent 일을 완료하십시오. 탁월한 승인, 중단된 회전 또는 세션 오류를 해결합니다. 지점은 완료된 에이전트 응답으로 종료해야 합니다.
3. 작곡가의 **+ menu → Save as skill**을 엽니다. 장애 품목을 통해 특정한 이유를 읽으십시오.
4. 에이전트가 작동하는 동안 **Saving as skill…**의 항목 변경. 이 대화에서 모델 보조 작업을 시작합니다; 수동 이름 / 설명 편집기를 열고 즉시 ZIP을 저장하지 않습니다.
5. 제안된 Skill의 이름을 검사하고, 묘사, 단계, 지원 파일 및 검증 결과를 방아쇠를 당기. 표시된 경우 명확 또는 작업 승인에 응답합니다. **Customize**는 활성화됩니다; 활성 역할은 여전히 적절한 기능 액세스가 있어야합니다.
6. 출판물을 받아들일 전에 초안을 검토하십시오. 연구별 경로, 임시 ID, 자격 및 지원되지 않은 결론을 제거하십시오; 재사용 가능한 입력 요구 사항 및 확인을 유지하십시오. 기존의 개인 Skill은 명시적인 교체 결정 없이 과잉하지 않아야 합니다.
7. 출판 후 **Resource center → Skills**을 열고 보고된 이름을 검색하고 **Files**을 검사하고 저장된 SKILL.md 및 Main 에이전트 가용성을 검사합니다. 전체 패키지를 확인하려면 그것을 수출하십시오.
8. 저장된 Skill과 분리된 바인딩된 요청을 실행합니다. 성공적으로 저장된 포장은 두번째 dataset 또는 나중에 invocation가 통과한 것을 증명하지 않습니다.

### 연구 방법 저장 {/* #save-the-research-method */}

<p className="example-label"><strong>실습 예제</strong> Skill로 RNA-seq 메소드를 저장하십시오.</p>

새로운 세션에서 GSE60450 QC를 마친 후 **+ → Save as skill**을 선택하고 기존 패키지를 보존하는 별도의 **rnaseq-descriptive-qc에 대한 의견** 패키지를 요청하십시오. 네이티브 워크플로우는 하나의 **SKILL.md**을 포함하는 초안을 만들었습니다. 유효성 검사는 오류 또는 경고를 반환하지 않습니다.

![Native Skill 초안 및 검증 결과](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

이름 확인, 설명 트리거, 입력, 미터 정의 및 개인 Skills에 게시를 확인 하기 전에 중지 조건. 그런 다음 **Resource center → Skills → Search skills**을 사용하여 저장된 지침을 열고 **Availability** 및 **Files**를 검사합니다. 실제 출판 <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.md의 특징</ExampleDownload> 다운로드.

![개인 정보 보호 정책](/img/open-science/v0.27.0/17-native-skill-published.webp)

![Reopened 지침 및 가용성](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### 왜 버튼이 사용되지 않습니다. {/* #why-the-button-is-unavailable */}

tooltip는 첫 번째 차단 상태를 식별합니다. 두 번째 상태를 볼 수 있습니다 수정. **현재 에이전트 활동에 대 한 기대.**은 세션이 idle이 아닌 오류 상태를 포함하여 나타날 수 있습니다. 혼자서 문제를 해결 할 수있는 신뢰할 수있는 약속이 아닙니다. 오류 배너를 검사하고 대화에서 상호 작용을 종료합니다. 중단된 응답을 위해, 해결하거나 신청의 제안한 활동을 사용하여 응답을 재개하고, 그 후에 방법을 저장하기 전에 완료를 기다리십시오.

| Exact 도구 끝 | 자주 묻는 질문 |
| --- | --- |
| Skill로 저장하기 전에 대화를 엽니다. | 당신이 필요로 하는 절차와 기존의 대화를 엽니다. |
| Skill 사용자 정의는 활성 Specialist에 사용할 수 없습니다. | 활성 역할과 그 기능 접근을 검사합니다. 글로벌 활성화를 사용자 정의; 이 툴팁은 현재 Specialist에 대한 문제입니다. |
| 끝내는 선적에 대화 역사를 위한 대기. | 선택된 지점 끝 선적을하자. |
| 이 대화를 Skill로 저장하기 전에 사이드 채팅을 닫습니다. | 먼저 유용한 조언. 이름 &#42; [사이드 채팅 닫기](../guides/delegation.md) 저장된 대화를 중지하고 삭제합니다; 다음 Main로 돌아갑니다. |
| 모든 서브에이전트가 완료될 때까지 기다리세요. | 탁월한 아이 작업과 그 승인. |
| 기술로 저장됩니다. | 기존의 생성 실행을 읽으십시오; 다른 것을 시작하지 마십시오. |
| 현재 세션 작업을 먼저 해결하세요. | 끝 회복, 닫히는 상황 replay/reset, 개정 반복 또는 조밀함. |
| 현재 에이전트 활동에 대 한 기대. | 활동적 일 해결, 보류 상호 작용 또는 non-idle/error 세션; 실제 상태를 검사합니다. |
| 대화 지점 동기화 오류를 먼저 해결합니다. | retrying 전에 표시된 동기화 오류를 해결합니다. |
| 대화 분기 역사는 사용할 수 없습니다. | 예정된 지점을 다시 엽니다; 역사가 로드될 수 없는 경우 오류를 보존합니다. |
| 완료된 에이전트 응답을 기다립니다. | 분기는 완료된 응답으로 끝야 합니다; 빈 지점 또는 최종 사용자 메시지가 충분합니다. |

복구 및 종료 세션 작업은 여전히 동작을 차단 할 수 있습니다; 반복적으로 새로운 생성 요청을 시작 대신 표시된 이유를 사용합니다. 그들은 서비스 인증에서 분리됩니다 : 생성이 시작되었지만 모델 요청이 실패하면 [문제 해결](../guides/troubleshooting.md)의 반환 모델 / 서비스 오류를 따르십시오.

## 스크래치에서 쓰기 : 편집기에서 생성 {/* #write-from-scratch-create-in-the-editor */}

**Write from scratch**을 사용하면 이미 방법 지침 및 지원 파일을 가지고 있습니다. 아래 단계는 `rnaseq-count-qc`을 사용합니다.

### 패키지 준비 {/* #prepare-the-package */}

<p className="example-label"><strong>예시</strong> rnaseq-count-qc 패키지 만들기</p>

실제 <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.md의 특징</ExampleDownload> 및 <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">샘플 측정-schema.md</ExampleDownload> 또는 <ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">수출된 ZIP</ExampleDownload>를 다운로드하십시오.

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

참고문헌은 샘플 메트릭과 해석을 정의합니다. 프로젝트의 연구 데이터를 유지; Skill을 사용하여 휴대용 패키지에 개인 데이터 세트를 삽입하는 것보다 재사용 가능한 규칙을 사용합니다.

<span id="create-and-publish" />

### 현장 및 출판 {/* #complete-the-fields-and-publish */}

1. **Resource center → Skills → Add skill → Write from scratch**을 엽니다.
2. 완전한 다운로드 SKILL.md를 **Skill body**로 붙여 넣으십시오. YAML frontmatter는 **Name**와 **Description**를 대중화합니다.
3. 이름은 `rnaseq-count-qc`입니다. 저장하기 전에 렌더링 / 바디 콘텐츠를 읽으십시오; 유효한 이름은 혼자 과학적인 방법을 유효하지 않습니다.
4. **Advanced settings → Add reference files**을 열고 `sample-metric-schema.md`을 선택합니다. 편집기는 `references/`의 밑에 이 리소스를 배치합니다.
5. 참조 수와 패키지 크기를 검증 한 다음 **Publish**을 선택하십시오.
6. 새로운 개인 행을 검색하고 다시 열 수 있습니다. 지침, 가용성 및 파일 확인; 패키지를 내보내기하여 두 항목 모두 검사합니다.

![RNA-seq Skill 몸과 지원 파일](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| 필드 또는 버튼 | 자주 묻는 질문 |
| --- | --- |
| 이름 | 인식 가능한 방법 식별자. 빈 입력 쇼 **Name is required.** |
| 설명 | 방법을 선택해야 할 때, 어떤 필드에 속하지 않습니다. |
| 글쓰기 / 업로드 | 텍스트를 직접 입력하거나 몸 소스로 파일을 선택하십시오. |
| 스킬 본문 | 완전한 조작적인 지시: 입력, 체크, 산출 및 정지 조건. |
| 고급 설정 | 지원 파일 컨트롤 및 패키지 사용법을 엽니다. |
| 참조 파일 추가 | 재사용 가능한 schemas, 예제 또는 스크립트를 추가합니다. 몸에서 사용된 경로는 저장된 포장에 일치합니다. |
| 참고 파일 제거 | 그 초안 자원 제거; 몸에 있는 끊긴 참고를 위한 검사 후에. |
| 자주 묻는 질문 | 편집을 남겨; 사용 취소는 초안을 삭제합니다. |
| 게시 / 저장 ... | 개인 패키지 만들기; 완료 및 저장된 행을 확인합니다. |

편집기는 **128 메가바이트** 패키지 예산 내에서 **16,383 참조 파일**까지 허용합니다. 수입은 또한 아카이브 검증을 통과해야합니다; [Skills 관리](./manage.md) 참조.

## 확인 될 수있는 지시를 작성 {/* #write-instructions-that-can-be-checked */}

예를 들어 전체 유전자 / 샘플 식별자를 보존하는 에이전트가 필요하며, 카운트에서 `EntrezGeneID` 및 `Length`을 분리하고, 변형 된 행과 누락 된 값을 거부하고, 위/후 위시를 비교합니다. 그것은 4개의 표본 미터 및 분리된 산출 파일을 지정합니다. 이 필요조건은 incorrect 또는 불완전한 결과를 눈에 보이게 합니다.

명확한 정지 조건을 포함하십시오: 근원이 읽을 수 없거나 조사가 누락될 수 없는 경우에, 입력한 문제를 보고하십시오. reusable 메서드는 조용히 dataset을 변경하거나 요청한 분석을 대체하지 않아야 합니다.

<span id="validate-the-saved-skill" />

## Skill의 검증 및 재사용 {/* #verify-and-reuse-the-skill */}

수동 `rnaseq-count-qc` 노선을 위해, [Skills](./overview.md)에서 신속한 사용. 생성 된 보고서 및 Notebook 레코드를 열고 입력, 치수, 메트릭 정의 및 [예시자료](../reference/example-data.md)에 대한 출력을 확인합니다.

나중에 편집을 위해 개인 패키지의 **Actions → Edit**을 열고, 방법을 변경, 저장, 다음 새로운 요청을 발행합니다. 이전 결과에 대한 수정 된 출력 비교. 패키지를 비활성화하거나 편집하지 않는 것은 이미 실행 차례에 읽는 지침을 다시 볼 수 없습니다.

대리인 보조 초안을 위해, **Add skill → Chat with agent** 또는 **Customize** 입장을 사용하십시오. 제안 된 지침을 검사하고 같은 체크와 게시 된 패키지를 다시 읽으십시오; Skill에 대한 채팅 응답은 저장된 패키지 자체가 아닙니다.

### 새로운 세션에서 Skill 게시를 재사용 {/* #reuse-the-published-skill-in-a-new-session */}

1. 새로운 세션을 시작하고 원래 공개 GSE60450 카운트 매트릭스를 첨부합니다.
2. 이름에 의해 **rnaseq-descriptive-qc에 대한 의견** 요청. 4개의 per-sample 메트릭, unchanged 입력, CSV 및 concise 보고서를 요청하십시오.
3. Notebook 실행을 검사하고 생성 된 파일을 엽니 다. 완료 메시지에만 의존하지 않고 원본 입력에 대한 저장된 결과를 확인합니다.

새로운 CSV 및 보고서를 다시 열고 [공유 baseline](../reference/example-data.md)과 전체 샘플 식별자에 의해 비교합니다. 입력 해시를 확인합니다. Skill을 다른 연구에 적용할 때, 그 연구의 자신의 입력 및 실험적인 디자인에 대한 이러한 검사를 반복합니다.

![별도의 재고 및 재개 QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

구현 참조 : [기술Editor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [호스트-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts).

기술 구현으로 저장 : [제품 정보](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [대화 증류](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill 크리에이터](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
