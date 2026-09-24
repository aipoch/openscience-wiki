---
title: "설치 및 전환 에이전트"
last_update:
  date: '2026-09-24'
---

# 설치 및 전환 에이전트 {/* #installing-and-switching-agents */}

대화와 도구 실행에 사용할 Agent 프레임워크를 선택하고, 설치 후 호환되는 [모델 제공자](providers.md)를 설정하세요. 여러 프레임워크를 설치할 수 있습니다. **Settings → Agent**의 활성 프레임워크는 모든 프로젝트가 공유하는 앱 전체 설정이며, 변경 사항은 이후 대화와 워크플로에 적용됩니다.

## 에이전트 페이지를 읽으십시오 {/* #read-the-agent-page */}

**Settings → Agent**을 엽니다. 페이지는 **Available**에서 **Installed**을 분리합니다. 모든 것을 바꾸기 전에 설치된 카드에 버전, 경로 및 **Active** 감적을 읽으십시오.

![앱 관리 Codex 탐지](/img/open-science/local-acceptance/agent-codex-active.webp)

| 통제/status | 의미와 행동 |
| --- | --- |
| 설치된 카드 | 스위치를 요청할 수 있는 자격이 있는 비활성 카드를 선택하십시오. 목록으로 만들어진 임명은 아직도 호환성 모형 접근을 필요로 합니다. |
| 활성 | 응용 프로그램 전체 선택 백엔드. 그것의 제거 활동은 비활성화됩니다. |
| 재감지 | 설치 또는 경로 변경 후 검색을 새로 고침합니다. 그것은 일시적으로 검출을 보여줍니다; 그것은 누락된 소프트웨어를 설치하지 않습니다. |
| 설치되지 않음 | 사용 가능한 실행 시간은 그 프레임 워크에 대해 감지되었습니다. |
| 메뉴 설치 | 그 프레임 워크를 위해 제공되는 소스를 선택하고, 설치 진행 상황을 검사합니다. |
| 로그 설치 / Retry | 그 원인을 해결 한 후 실패 단계와 재발을 읽으십시오. |
| 복구 | 관리된 임명이 수리할 때 Appears; 확인하기 전에 영향을받는 실행 시간을 검사합니다. |

검사된 페이지는 Codex, Claude Agent, OpenCode 및 CodeBuddy를 제안했습니다. 사용 가능한 소스 및 인증 요구 사항이 다릅니다. 모든 프레임 워크가 동일한 설치자 또는 로그인 방법을 제공하지 않습니다.

## 설치 및 검증 {/* #install-and-verify */}

1. **설치 &#91;framework&#93;**을 선택하고 제안 된 소스를 검토하십시오. 관리된 설치는 app 통제된 저장의 밑에 체재합니다; 수동 설치는 앱에 의해 발견되어야 합니다.
2. 진행 상황을 따르고 단계가 실패한 경우 설치 로그를 읽으십시오. retrying 전에 환경/네트워크 prerequisites를 해결하십시오.
3. 수동 설치 후 **Re-detect**을 사용하십시오. 다른 터미널에서 명령의 존재에 의존하지 않는 예상된 버전과 경로 확인.
4. 준비되어 있는 카드를 선택하십시오. Switch 대화 상자를 검토하고, 의도한 백엔드를 확인합니다.
5. **Settings → Model**을 확인하고, 작은 요청을 실행하고 실제 응답/툴 결과를 검사합니다.

OpenCode의 경우 **Install → App-managed download (recommended)**은 자체 유지 실행 시간을 다운로드합니다. 페이지는 해결, 다운로드 진행 상황을 보여주고, 그 버전과 경로로 설치된 카드. 그 카드를 선택하면 **OpenCode로 전환?**을 확인하고 호환 모델을 선택하십시오. 로컬 연결 예제는 완료 응답을 반환; API과 토큰 제한을 위해 [지역 공급자 설정](./providers.md#connect-a-local-model-endpoint)을 참조하십시오.

Codex의 경우, 기본 런타임 및 ACP 어댑터는 호환 쌍으로 탐지를 통과해야합니다. 하나의 구성 요소만 설치하면 준비된 백엔드와 동일하지 않습니다. 공급자 구독 로그인은 [공급자 설정](./providers.md)에 덮여 있습니다.

v0.33.0에서 **Claude Agent**은 Claude CLI **2.1.118 이상**를 요구합니다. 탐지가 지원되지 않은 버전을 보고하면 설치 방법을 통해 검출된 설치를 업데이트하면 세션을 시작하기 전에 **Re-detect** 및 체크 읽음을 사용합니다. 경로에 다른 CLI을 업데이트하지 않습니다. 카드에 표시된 설치를 복구하지 않습니다.

## 앱 관리 Codex 실행 시간 업데이트 {/* #update-codex */}

**Settings → Agent**을 열고 Codex 카드의 **Codex CLI** 및 **ACP를** 버전을 별도로 읽으십시오. 테스트 쌍에 업데이트가 제공되면, 종료 또는 종료 세션을 사용하여 실행 시간, 업데이트 작업을 선택하고 완전한 탐지를 기다립니다. 새 버전과 읽음을 확인한 다음 세션에서 작은 요청을 보냅니다.

앱 관리 업데이트는 app-owned runtime을 대체합니다. 외부 CLI은 원래 설치 방법을 통해 업데이트되어야하며 **Re-detect**에 따라 다릅니다. 앱은 Codex 프로세스를 실행하는 동안 교체를 거부합니다. 이 작업은 Open-Science 자체를 업데이트하지 않거나 in-flight 작업을 마이그레이션하지 않습니다.

## 살아있는 국가를 가진 옹호된 역사 없이 전환 {/* #switch-without-confusing-retained-history-with-live-state */}

전환 전에 현재 작업을 완료하거나 중지하세요. 변경 사항은 모든 프로젝트의 이후 대화와 워크플로에 적용됩니다. 실행 중인 작업은 완료될 때까지 기존 런타임을 사용하며, 유휴 대화는 다시 사용할 때 연결됩니다. 대화 기록이 남아 있어도 실행 중인 도구 프로세스나 인터프리터 변수가 그대로 이어지는 것은 아닙니다. 계산을 계속하기 전에 파일, Notebook 및 권한을 확인하세요.

전환 후, 대화를 위해 선택한 모델을 확인합니다. Codex 구독 지원 [Side Chat](./delegation.md); 종료 세션 운영 또는 복구 일시적으로 그것을 차단할 수 있습니다. 자주 묻는 질문

## 수리 및 제거 {/* #repair-and-removal */}

앱의 수리 흐름을 깨진 관리 실행 시간; 실행중인 설치자 중에 그 디렉토리를 삭제하지 마십시오. 외부 설치가 표시된 경우, 설치 및 재검출을 수리합니다. 관리 백엔드를 제거하려면 먼저 다른 준비 백엔드를 활성화하고 **Uninstall**을 열고 확인 구성 요소 목록을 읽습니다. 제거는 단순히 모델을 전환하는 데 필요한 정리 단계가 아닙니다.


### 앱 관리 실행 시간 제거 및 재설치 {/* #uninstall-and-reinstall-an-app-managed-runtime */}

1. 다른 백엔드 **Active** 유지. 이 예에서 Codex은 OpenCode이 제거 된 동안 활성화되었습니다.
2. 비활동적인 OpenCode 카드에, **Uninstall**를 선택하십시오. 확인은이 응용 프로그램에 의해 다운로드 및 관리 사본에 적용; 별도의 설치 사본은 비범죄입니다.
3. **Uninstall**을 확인한 후 **Re-detect**을 선택합니다. OpenCode는 **Not installed**로 **Available**로 이동해야 합니다.
4. **Install OpenCode → App-managed download (recommended)**을 선택하십시오. **Installed** 카드의 경우 **Switch**을 선택하고 확인하십시오.
5. **Active**, 런타임 경로 및 호환 모델 선택 확인. 백엔드 제거는 모델 공급자를 구성하지 않습니다.

![앱 관리 OpenCode 제거의 범위](/img/open-science/priority-completion/01-opencode-uninstall.webp)

백엔드를 제거하기 전에, 다른 유효한 배경으로 전환하십시오; 활성 백엔드는 이 컨트롤을 통해 제거 할 수 없습니다. 재설치, 재검출 및 활성화 후 기존 프로젝트를 열고 연결을 확인하기 위해 작은 요청을 실행합니다.

![OpenCode는 다시 설치하고 선정했습니다](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

작업이 비활성화되면 진행중인 다른 설치 / 스위치를 확인하고 명시된 prerequisite 오류를 확인하십시오. 감지가 성공하지만 요청이 실패하면 모델 인증 및 프레임 워크 / API 호환성을 별도로 검사합니다.

출처: [에이전트 패널](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx), [프레임 워크 카드](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx).

범위와 스위치 동작: [설정 저장](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts), [런타임 전환](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts).
