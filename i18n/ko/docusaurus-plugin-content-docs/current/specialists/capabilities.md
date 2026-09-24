---
title: "할당 Skills 및 커넥터"
last_update:
  date: '2026-09-24'
---

# 할당 Skills 및 커넥터 {/* #assign-skills-and-connectors */}

Specialist의 기능 목록은 Skills 및 커넥터가 도달 할 수 있음을 결정합니다. 글로벌 활성화 Connector은 모든 제한 Specialist에 자동으로 사용할 수 없습니다.

## 명시된 액세스 설정 {/* #configure-explicit-access */}

<p className="example-label"><strong>예시</strong> RNA-seq QC Reviewer에 할당 기능</p>

1. **Settings → Specialists**을 열고 **RNA-seq QC 검토자**을 편집합니다.
2. **Full access**을 끄십시오.
3. **Skills**에서 **기술 추가**을 선택하고 `rnaseq-count-qc`를 검색하고 저장된 개인 패키지를 추가하십시오. **Skills 1**을 확인합니다.
4. **Connectors**에서 **연결관 추가**을 선택하고 **Omics 아카이브**를 선택하십시오. **연결관 1**을 확인합니다.
5. 해당 리소스를 선택한 것으로 확인하는 기능의 세부 사항을 엽니다. Persistence를 확인하기 위해 역할을 저장하고 다시 시작합니다.

![Specialist는 명시된 기능 선택으로](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| (주) | 제품 정보 |
| --- | --- |
| 전체 액세스 | 상속된 기능 범위를 명시된 각 자원 배당과 함께 사용하십시오. 변경 후 해결된 목록을 확인합니다. **Manage access**. |
| 자주 묻는 질문 | 명시된 리스트를 사용하십시오; 누락된 바인딩은 단지 프롬프트에 있는 공구를 naming에 의해 공급될 수 없습니다. |
| 기술 추가 / 커넥터 추가 | 해당 기능 유형에 대한 선택기를 엽니다. |
| Capability 세부사항 | 리소스를 검사; 그것은 과학적 워크플로를 실행하지 않습니다. |
| 제거 | 리소스를 제거하지 않고이 바인딩을 제거하십시오. |
| 변경사항 저장 | 선택된 범위. |

Application-required Skills은 전 세계적으로 활성화됩니다. 이것은 Specialist 기능 목록을 대체하거나 전체 액세스를 켜지 않습니다. 사용자 정의가이 역할에 사용할 수없는 경우, 바인딩 및 해결 된 리소스를 검사합니다. [Skill 활성화](../skills/overview.md#why-some-switches-cannot-be-turned-off) 참조.

## 리소스에서 액세스 조정 {/* #resource-access */}

**Settings → Skills** 또는 **Connectors** 아래는 Main 에이전트와 Specialist 협회를 함께 검사하기 위해 자원의 **Manage access** 팝업을 엽니 다. 선택한 역할의 바인딩을 업데이트, 역할의 활성화 상태는 아닙니다. 가득 차있 접근 역할은 per-resource exclusions가 있을 수 있습니다; 제한된 역할은 명시된 선택을 사용합니다. Marketplace 바인딩은 이 팝업에서만 읽을 수 있습니다. [illustrated 접근 제한](../guides/connectors.md#resource-access) 참조.

바인딩을 변경한 후, 역할이 활성화된 것을 확인한 후, 서비스 자격 증명이 준비되어 있고 그 의도한 가동은 허용됩니다. **Used by**은 완료된 실행보다 할당을 보여줍니다.

## 4개의 별도의 읽음 검사 {/* #four-separate-readiness-checks */}

| (주)엠씨 | 자주 묻는 질문 | 예 실패 |
| --- | --- | --- |
| 제품정보 | 설치, 활성화, 설정 완료 | 수입한 역할은 설치가 저장될 때까지 비활성화 남아 있습니다. |
| 공급 능력 | 예정된 자원은 runtime에 의해 할당되고 해결됩니다 | 표시 이름/짧은 이름은 할당된 카탈로그 자원에 해결하지 않습니다. |
| 서비스/시간 | 연결된 서버, 필수 자격 증명, 사용 가능한 커널/자산 | 필수 서비스 자격 또는 패키지를 미스. |
| 작업 | 현재 입력 버전 및 승인 된 작업 | 사용 가능한 파일 handoff는 어린이 실행 전에 실패합니다. |

로컬 역할은 생성 및 패키지 가져 오기 후 Skill 및 Omics Archives 바인딩을 유지합니다. 첫 번째 위임 된 아이는 짧은 이름으로 Skill을 해결하지 않았지만 Python에서 명시적으로 공급 된 테이블 체크를 완료했습니다. 그것은 delegation과 arithmetic, 성공적인 아이 Skill 부하를 검증한다. 이 일이 발생하면, 에이전트가 사용 가능한 카탈로그를 검사하고 정확한 할당 된 리소스 ID를 사용합니다. naming 문제를 은폐하기 위해서만 Full Access를 넓지 마십시오.

## 책임 접근은 권한 형태가 아닙니다 {/* #capability-access-is-not-permission-mode */}

전체 액세스는 "모든 작업을 묻지 않고도 허용하지 않습니다." [승인 형태](../guides/approval-modes.md), filesystem/network 경계 및 런타임 규칙은 여전히 적용됩니다. 자녀는 부모 대화에서 자신의 허가 요청을 표면 할 수 있습니다; 응답하기 전에 요청 역할 및 작동을 검사합니다.

역할을 내보내면 Connector ID는 휴대용 연결이나 비밀이 아닙니다. 선택된 Skill 파일은 명시적으로 포함될 수 있습니다. 다른 장치에서 각 바인딩을 확인하고, credentials를 구성하고 역할에 의존하기 전에 하나의 작은 검사를 실행하십시오. [관리 및 공유](./manage.md) 참조.

구현 참조 : [전문가Editor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [전문가Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
