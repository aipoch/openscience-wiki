---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Skill는 에이전트를 반복 가능한 방법을 제공합니다: 그것을 사용할 때, 그것은 필요한 입력, 무엇을 할, 그리고 그것의 산출을 확인하는 방법. Open-Science는 필요할 때 그것의 지시를 적재합니다. Skill 설치는 내부에 기술 된 과학 소프트웨어를 설치하지 않습니다.

[Skill 마켓플레이스](marketplace.md)을 통해 추가 방법을 찾아 사용하기 전에 입력 및 의존도를 검토하십시오.

## 기능의 올바른 종류를 선택하십시오. {/* #choose-the-right-kind-of-capability */}

| 당신은 필요 | 제품 정보 | 예시 |
| --- | --- | --- |
| Data를 반환하거나 코드를 실행하는 작업 | ₢ 킹 [(주)제이](../tools/overview.md) | 읽기 GEO 메타 데이터; 실행 Python |
| 그 운영을 조정하는 방법 | Skill에 대한 정보 | raw gene-count matrix의 유효성 검사 |
| 자신의 지시와 능력에 대한 재사용 가능한 역할 | ₢ 킹 [스페셜리스트](../specialists/overview.md) | 독립적으로 샘플-QC 테이블을 확인 |

[Skill 디렉토리](./directory.md)로 시작해서, 또는 [제품 정보](./recipes.md)는 연구 상황에서 선택할 수 있습니다.

## Skill 찾기 및 검사 {/* #find-and-inspect-a-skill */}

1. **Settings → Skills**을 엽니다.
2. **Search skills**을 사용하여 이름을 검색하거나 설명합니다. [예제 만들기](./create.md) 후 `rnaseq-count-qc`을 입력하십시오.
3. 좁은 **Filter skills by source**, **Filter Skills by agent**, 또는 **Filter by Tag** 목록이 오래 유지되면.
4. 결과 열기. 설명, 지침, **Files**, 라이센스 및 **Availability**을 읽으십시오. 표시 이름은 패키지 ID와 다를 수 있습니다.
5. 목록으로 돌아와 **Used by**을 검사합니다. 그것은 어떤 대리인이 포장을 사용할 수 있는지 식별합니다; 완료된 실행을 나열하지 않습니다.

![저장된 RNA-seq Skill 검색](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| (주) | 어떤 변화 |
| --- | --- |
| 추천 / 수입 / 개인 헤드 | 소스 그룹을 확장합니다. 앱을 가진 추천된 배; 수입된 포장 또는 저장소에서 옵니다; 개인은 현지에서 생성됩니다. |
| Main 대리인 스위치/열 toggle | 사용자 제어 Skills에 대한 가용성 변경; Application-required Skills 체재 활성화. 파일이 설치됩니다. |
| 사용자 | Main Agent와 Specialists의 가용성을 보여줍니다. 제품 정보 **Manage access** Main Agent와 Specialist 협회를 조정하는 자원에. |
| 태그 관리 / 태그 칩 제거 | 조직 라벨을 추가하거나 제거하십시오. 실행 권한을 변경하지 않습니다. |
| 스킬 추가 | Agent-assisted Creation, 직접 작성, 로컬 업로드, GitHub 가져 오기, 또는 설치 폴더 검색. |
| 대화 **+ → Save as skill** | 완료된 활성 분지에서 재사용 가능한 방법을 추출; 은 은 [생성 단계 및 장애 상태 이유](./create.md). |
| 관리 | 개인 및 수입 패키지에 대한 대량 관리를 엽니 다. |
| 대화 수입 → Skill 패키지 | 에이전트가 첨부 된 ZIP /`.skill` 패키지 및 요청 가져오기 승인. 패키지를 첨부하면 설치하지 않습니다. |

### 어떤 스위치가 꺼지지 않는 이유 {/* #why-some-switches-cannot-be-turned-off */}

**환경 및 패키지**, **Compute 환경 설정**, **원격 컴퓨터 (SSH)** 및 **Customize** 지원 핵심 응용 기능 및 체재 활성화. 그들의 스위치는 검사하고 무능합니다. Hover 또는 **This built-in Skill supports core application features and is always enabled.**을 읽는 설명에 초점을 맞추십시오

이 활성화 규칙은 종속을 설치하지 않으며, 자격 증명 또는 보조 작업 권한을 제공합니다. Specialist 할당은 별도의 범위입니다: **Used by**과 역할의 기능 목록을 검사합니다.

디렉토리는 여전히 23 공개 번들 Skills이 포함되어 있습니다. 내부 지원 Skills은 추가 방법을 선택하지 않습니다. [필수 스위치 구현](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx).

스크린 샷은 **Customize**에 대한 설명을 보여줍니다. 이 필요한 Skills은 다른 옵션 방법을 비활성화 할 때도 활성화됩니다.

![숙박을 사용자 정의하고 이유를 설명](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

per-agent 팝업 및 읽기 전용 바인딩을 위해 [관련 링크](../guides/connectors.md#resource-access)을 참조하십시오.

## 대화에서 사용 {/* #use-it-in-a-conversation */}

<p className="example-label"><strong>예시</strong> rnaseq-count-qc로 확인하기</p>

대리인에게 입력, 요구된 Skill, deliverable 및 constraints를 주십시오. 예를 들면:

> 첨부된 GSE60450의 rnaseq-count-qc Skill을 사용하십시오. EntrezGeneID 및 Metadata로 길이를 유지하십시오. 유효한 차원과 비 부정 정수 조사는, 본래 표본 ID를 보존하고, 입력 SHA-256의 앞에/after를 가진 분리되는 방법 보고를 저장합니다. 기존 Python Notebook을 사용하십시오.

승인이 요구될 때, 완전한 지시 및 가동을 검열하십시오. 실행 후, 보고서를 다시 열고 Notebook 기록과 [예시자료](../reference/example-data.md)에 대한 비교. 나중에 Specialist 체크는 분리된 가동입니다; Specialist 의 이름을 따서 위임이 발생하지 않습니다.

### versus Notebook 기능 지침 {/* #instructions-versus-notebook-functions */}

우리의 `rnaseq-count-qc` 포장은 지시와 1개의 참고 파일을 포함합니다. 그것은 **아니다.** 기록기 호출할 수 있는 Notebook 기능입니다. 대리인은 지시를 읽고, 그 후에 정규적인 Python 또는 R를 쓰십시오.

일부 번들 Skills도 커널 기능을 제공합니다. 그들의 자신의 지시 이름은 기능 및 필요한 `kernelSkillIds`. 필드에 모든 설치 Skill ID를 추가하지 마십시오 : 지시 전용 패키지는 커널 헬퍼가 아닙니다. 로드 된 Skill 또한 파일 시스템, 네트워크 또는 도구 권한을 부여 할 수 없습니다.

Skill이 피셔에서 누락되면, 소스 필터를 체크하고, 상태 및 에이전트 할당을 활성화하십시오. 그것의 지시 짐 그러나 계산이 실패한 경우에, [과학 도구](../tools/scientific.md)로 계속하십시오; 그것은 runtime 또는 입력 문제이며, 패키지가 설치되지 않았는 증거가 아닙니다.

구현 참조 : [기술Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [기술DetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx).
