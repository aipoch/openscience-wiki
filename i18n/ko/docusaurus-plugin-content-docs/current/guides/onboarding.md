---
title: "첫 번째 시간 설정"
last_update:
  date: '2026-11-11'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 첫 번째 시간 설정 {/* #first-time-setup */}

첫 번째 실행 마법사는이 순서에 5 페이지가 있습니다 : 환경, 데이터 위치, 에이전트 실행 시간, 모델 공급자 및 Notebook 실행 시간. `Back` 및 페이지 사이에 하단 이동의 기본 동작. 현재 페이지가 요구 사항을 충족 할 때까지 기본 동작은 사용할 수 없습니다.

<PlatformGuide />

외부 Agent는 [Agent 설정](frameworks.md)에서 관리하고 업데이트할 수 있습니다. 내장 **Open-Science Agent**는 앱에 포함됩니다.

## 1. 환경 {/* #1-environment */}

**Prepare environment**에서 시작합니다. 앱은 Agent를 선택하고 모델을 연결하기 전에 컴퓨터를 검사합니다. 각 항목의 상태와 설명을 읽고 필요한 조치를 확인합니다.

| 자주 묻는 질문 | 무엇을 의미합니까? | 무엇을 할 것인가? |
| --- | --- | --- |
| 시스템 호환성 | 운영 체제 및 아키텍처 확인 | 감지 된 플랫폼이 컴퓨터와 일치하도록 확인 |
| 앱 저장소 권한 | 앱의 구성 폴더에 액세스 쓰기 | 실패하면 표시된 경로에 액세스하고 다시 확인 |
| 보안 자격 증명 저장소 | 운영 시스템 자격 증명 취약점 확인 가능 | credentials를 입력하기 전에 vault 문제를 해결 |
| 설치 네트워크 | 선택된 에이전트가 다운로드를 필요로 하는지 확인, 필요한 경우, 패키지 소스를 확인| 내장 에이전트를 사용하면 다운로드가 필요하지 않다는 것을 보고할 수 있습니다. 모델 연결을 테스트하지 않습니다 |
| `Check again` | 환경 체크를 반복합니다 | 필요조건을 고치기 후에 사용; 상표가 된다 `Checking…` 그리고 버튼은 체크 중에 비활성화됩니다. |
| `Continue` | 데이터 위치 열기 | 필요한 호스트 체크 패스 후 사용 가능; 체크가 실행되는 동안 비활성화됩니다. |

**Environment** 단계를 열고, 모든 4개의 줄을 읽고, **Check again**를 선택하고, **All required environment checks passed.**를 위해 기다리십시오 다음 **Continue**를 선택하십시오. 이 환경 체크는 API 열쇠 또는 급여받는 모형 외침을 요구하지 않습니다; 모델 인증은 나중에 구성됩니다.

충분한 무료 공간으로 안정적인 데이터 위치를 선택하십시오. 운영 체제는 응용 프로그램이 영어를 사용할 때도 자신의 언어의 기본 폴더 대화 상자를 표시 할 수 있습니다.

각 검사의 설명을 읽어 보세요. 에이전트가 이미 설치되면, 설치 네트워크 체크는 다운로드가 필요하지 않을 수 있습니다. 그것은 모든 외부 서비스에 접근을 확인하지 않습니다.

<PlatformContent platform="macos">

![macOS 첫 번째 설정에서 완료된 환경 체크](/img/open-science/v121/onboarding-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Windows 처음으로 설정 중 환경 체크](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Linux 처음 설정 중에 통과 한 모든 4 개의 환경 체크](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. 데이터 위치 {/* #2-data-location */}

<PlatformContent platform="macos">

![폴더 선택하기 전에 데이터 위치](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
runtimes를 설치하기 전에 큰 파일에 대한 위치를 선택하십시오. Artifacts, 노트북 및 환경은 자료 위치를 사용합니다; 설정 및 역사는 구성 위치에 남아. 표시된 경로는 텍스트 필드가 아닌 읽기 전용 요약입니다.

| (주) | 활동 및 결과 |
| --- | --- |
| `Location` / 데이터 위치 경로 | 효과적인 기본 또는 제안 된 데이터 폴더 표시 |
| `Browse…` | 시스템 디렉토리 선택기를 엽니다. 부모 폴더를 선택하십시오; 반환 후 최종 앱 관리 경로 검사 |
| 시스템 선택기 `Cancel` | 현재 선택을 대체하지 않고 선택기를 닫습니다. |
| `Use default location instead` | 사용자 정의 선택 후 Appears; 그 선택과 관련 오류를 명확하게 |
| `Back` | 환경으로 돌아가기 |
| `Continue` 기본 위치로 | 에이전트 런타임에 대한 사전 |
| `Continue` 주문 위치를 선택한 후에 | 기타 제품 `Restart to set up your data?`; 새 폴더를 조용히 활성화하지 않습니다. |
| `Retry` | 기본 위치 정보가 로드되지 않을 경우 Appears; 다시 읽기 |

<PlatformContent platform="macos">

![사용자 정의 부모 선택 및 최종 앱 관리 경로 표시](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
**Browse…** 선택, 충분한 공간과 디스크에 빈 부모 폴더를 선택하고 마법사에 의해 표시된 완전한 관리 방법을 검사합니다. **Continue**을 선택하고 재시작 확인을 읽으십시오. 임시 폴더가 아닌 안정적인 연구 데이터 위치를 사용합니다.

<PlatformContent platform="macos">

![선택한 데이터 위치에 대한 Restart 확인](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| 자주 묻는 질문 | 결과 |
| --- | --- |
| 닫기 (`×`) | 데이터 위치에 돌아와 제안 된 경로를 유지 |
| `Keep default` | 제안 된 위치를 정리하고 기본을 사용하여 사전 |
| `Restart` | 선택한 데이터 위치를 활성화하고 앱을 다시 시작; wizard는 에이전트 실행 시간에 이력서 |

앱은 허용하기 전에 폴더를 검사합니다. 기존의 인식된 데이터 폴더는 장소에서 채택될 수 있습니다; 페이지는 아무 것도 이동하지 않다는 설명합니다. unusable 선택은 오류를 표시합니다. 활성화 또는 재시작이 실패한 경우, 페이지는 오류를 표시하고 리트리 또는 기본 위치를 제공합니다. 수동으로 이동하거나 앱 관리 폴더를 이름을 변경하지 마십시오.

### 기존 데이터 폴더를 채택 {/* #adopt-an-existing-data-folder */}

1. **Browse…**을 선택하고 인식 된 앱 관리 데이터 폴더를 포함하는 부모를 선택하십시오.
2. **This folder already contains Open Science data — it will be used as-is (nothing is moved).** 전체 목적지 확인, 다음 **Continue → Restart**을 선택합니다.
3. 다시 시작 후, 마법사는 **Agent runtime**에서 재개합니다. 선택한 데이터 위치는 유지됩니다; 나머지 설정 단계를 계속합니다.

채택 후, 다시 열 대표 파일을 다시 시작 예상 데이터가 현재 확인. Adoption는 큰 파일 저장을 변화합니다; 또 다른 설치 설정, 대화 데이터베이스 또는 자격 증명을 가져올 수 없습니다. **Keep default**는 제안된 위치를 명확하게하고 이전 효과적인 위치로 계속합니다.

### 위치가 저장될 수 없을 때 복구 {/* #recover-when-the-location-cannot-be-saved */}

페이지가 **스토리지를 설정할 수 없습니다: EACCES: 권한 거부**을 보고하면 오류의 경로를 검사합니다. 구성 디렉토리는 또한 writable해야합니다; 단독으로 쓸 수 없는 데이터 목적지를 선택하면 해결되지 않을 수 있습니다. 영향을받는 앱 소유 구성 위치에 대한 액세스를 복원 한 다음 가동을 재 복원하거나 **Use default location instead → Continue**을 선택하십시오.

<PlatformContent platform="macos">

![실제 구성 쓰기 실패 및 복구 제어](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
다시 시작하면 위치 변경 전에 실패, 설정 쓰기 액세스를 복원하고 마법사를 다시 엽니다. 이동을 재발하기 전에 활성 경로 및 기존 파일을 확인합니다. [저장소](storage.md) 참조.

## 3. 에이전트 런타임 {/* #3-agent-runtime */}

새 설정에서는 앱에 포함된 **Open-Science Agent**를 기본으로 사용합니다. 호환되는 API 제공자와 **Codex subscription**을 지원하며, 이 단계를 완료하기 위해 다른 Agent를 설치할 필요는 없습니다.

1. **Installed**에서 **Open-Science Agent**를 찾아 카드에 **Active**가 표시되는지 확인합니다.
2. **All required environment checks passed.**가 표시될 때까지 기다립니다. 검사에 실패하면 화면에 표시된 문제를 해결한 뒤 **Re-detect**를 선택합니다.
3. **Continue**를 선택하여 **Model provider**로 이동합니다. 요청을 보내기 전에 다음 단계에서 모델을 연결하고 테스트합니다.

<PlatformContent platform="macos">

![내장 Open-Science Agent가 Active이며 외부 런타임 다섯 개가 설치되지 않은 상태에서 Continue가 활성화된 화면](/img/open-science/v121/onboarding-builtin-agent.webp)

</PlatformContent>

카드의 버전은 런타임 또는 어댑터 버전이며 모델 버전이 아닙니다. **Active**는 선택된 런타임을 뜻하며 모델 연결을 확인해 주지는 않습니다. 다음 페이지에서 **Codex subscription**을 선택해도 별도의 **Codex** 런타임을 설치할 필요가 없습니다.

<details>
<summary>외부 Agent 선택하기(선택 사항)</summary>

**Codex**, **Claude Agent**, **OpenCode**, **CodeBuddy** 또는 **Pi**의 제공자 지원이나 동작이 필요하면 해당 런타임을 선택합니다. 이미 설치했다면 **Re-detect**를 선택한 뒤 해당 카드를 선택합니다. 설치하지 않았다면 **Install**을 열고 지원되는 설치 원본을 선택한 후 완료될 때까지 기다립니다. **Active** 상태와 필수 검사 통과를 확인한 후 계속합니다.

설치 원본, 전환 및 복구 방법은 [Agent 프레임워크](frameworks.md)를 참조하세요. 설정을 마친 후에도 **Settings → Agent**에서 런타임을 변경할 수 있습니다.

</details>

## 4. 모델 제공업체 {/* #4-model-provider */}

양식은 **Provider type**, 선택한 Agent 및 인증 방식에 따라 달라집니다. 내장 Agent에서 Codex 구독을 사용하려면 **Codex subscription**을 선택합니다. 이 컴퓨터에 기존 Codex 로그인이 있으면 **Codex authentication**에서 **Import existing Codex sign-in**을 선택하고 **Test & continue**를 누릅니다. 사용할 수 있는 로그인이 없으면 지원되는 로그인 방식을 선택하고 안내를 따릅니다. [제공자 설정](providers.md#builtin-codex-subscription)도 참조하세요. 연결 검사를 통과한 후 계속합니다.

<PlatformContent platform="macos">

![인증하기 전에 영어 Codex 구독 양식](/img/open-science/v121/onboarding-codex-provider.webp)

</PlatformContent>
API 공급자를 위해, 그것의 유형을 선정하고, 그 공급자에 의해 요구된 endpoint와 모형 세부사항을 입력하고, **Test & continue**를 이용합니다. 테스트 보내기 전에 wizard validates 필수 필드. 성공적인 시험은 마법사를 전진합니다; 유효성 또는 연결 오류가 보정을 위해 볼 수 있습니다.

<PlatformContent platform="macos">

![필요한 현장 오류를 보여주는 Custom Gateway](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
[공급자 설정](providers.md) 인증 선택, 고급 필드 및 연결 오류에서 복구를 참조하십시오.

전용 자격 필드에 API 키를 유지하십시오. 스크린 샷, 프로젝트 지침 또는 대화 메시지에 포함하지 마십시오.

## 5. Notebook 런타임 {/* #5-notebook-runtime */}

이 옵션 최종 페이지는 완전한 **Settings → Runtimes** 인터페이스를 재사용합니다. 기본적으로 노트북은 앱 관리 Python을 사용합니다. 감지 된 해석기를 선택하거나 나중에 다른 환경을 준비 할 수 있습니다.

| 마법사 제어 또는 상태 | 뚱 베어 |
| --- | --- |
| **Back** | 모델 공급자로 돌아가기. 런타임 프로비저닝 중에 비활성화 또는 설정 완료 중. |
| **Finish** | 설치 완료를 저장합니다. Notebook 설정은 선택 사항이므로, 준비된 사용자 정의 해석기는 필요하지 않습니다. |
| 이미 진행중인 설정 | 출발하기 전에 설치를 완료하거나 취소 할 수 있습니다. **Back** 그리고, **Finish** 부분적인 환경을 피할 수 없습니다. |
| Completion 오류 | 실패를 표시하고 다른 시도를 허용한다. |

**Finish** 후, 홈이 열리면 [첫 번째 프로젝트](first-project.md)을 사용하여 작은 결과를 저장할 수 있습니다. 응용 프로그램을 다시 열고 프로젝트가 사용할 수 있는지 확인. 설정 reappears 경우, 다른 프로파일을 만들기 전에 데이터 위치 및 구성 쓰기 오류를 검사합니다.

<PlatformContent platform="windows">

Windows **Notebook runtime** 페이지는 **Local Shell · WSL2 Bash Preview**를 보여줄 수 있습니다. 읽음 **Optional — nothing here is required to finish setup.** 선택할 수 있습니다. **Finish** 의 특징 Python/ / /R 설정은 deferred 및 WSL2 사용할 수 없습니다. 코드 실행을 요청하기 전에 필요한 실행 시간을 준비; 마법사를 완료하면 해당 옵션 환경을 설치하지 않습니다.

![Windows 옵션 Notebook 및 WSL2 설정 완료 가능](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## 최종 설정 체크리스트 {/* #final-setup-checklist */}

| 【특전】 | 예상된 증거 | 실패한 경우 |
| --- | --- | --- |
| 환경 | 자주 묻는 질문 | 표시된 필요조건을 해결한 후에 Recheck. |
| 데이터 위치 | 최종 관리 경로는 예정된 위치입니다. | 위치 페이지로 돌아가기; 픽업에서 최종 경로는 없습니다. |
| Agent | 선택한 런타임이 준비되어 있고 **Active**로 표시됨. 내장 Agent는 별도 설치 불필요 | 표시된 문제를 해결하고 **Re-detect** 선택 |
| 모델 제공업체 | 검증된 연결 및 선택된 메인 모델. | Recheck sign-in 또는 공급자 특정한 분야. |
| Notebook | 코드 실행이 필요한 경우 준비 및 활성화. | 구성 **Settings → Runtimes** 요청 분석하기 전에. |
| 첫 번째 작업 | 대리인 응답 및 inspectable 저장된 산출. | Inspect 권한 및 도구 오류는 모델 연결에서 별도로. |





## 나중에 설정 변경 {/* #change-the-setup-later */}

마법사를 다시 실행할 필요가 없습니다. Model, Agent, Runtimes 및 스토리지 맵을 동일한 선택으로 설정합니다. 데이터 루트가 손상되거나 응용 프로그램 구성 디렉토리가 writable, 설정 → 저장 복구 작업을하지 않는 경우.

## 소스 참조 {/* #source-reference */}

[온보딩Wizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [환경Step.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [위치Step.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
