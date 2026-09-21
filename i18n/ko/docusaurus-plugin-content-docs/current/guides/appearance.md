---
title: "외관 및 알림"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# 외관 및 알림 {/* #appearance-and-notifications */}

편안한 테마를 선택하고 인터페이스 언어를 설정하고 다른 앱에서 작업하면서 작업 경고를받을 수 있습니다. **Settings → General**을 열고 이러한 설정을 조정합니다. Open-Science는 이 장치에 당신의 외관 선택을 기억합니다.

<PlatformGuide />

## 테마 및 인터페이스 언어 변경 {/* #change-theme-and-interface-language */}

1. **General → Appearance**에서 **Theme**을 찾습니다.
2. 장치를 따르기 위하여 **System**를 선택하고, 또는 조정 외관을 지키기 위하여 **Light** 또는 **Dark**를 선택하십시오. 언제든지 전환 할 수 있습니다.
3. **Language**의 밑에, 당신의 선호한 공용영역 언어, 또는 장치 언어를 사용하는 **System**를 선택하십시오.

<PlatformContent platform="macos">

![일반 외관 설정](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Windows 일반 설정에서 테마 및 언어 제어" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="완전한 Windows 일반 설정 스크린 샷을 엽니 다" />

</PlatformContent>

| 제품 정보 | 어떤 변화 |
| --- | --- |
| 테마 → 시스템 | 앱은 장치의 light/dark 설정을 따릅니다. |
| 테마 → 빛 / 어두운 | 선택한 테마는 시스템 테마가 변경 될 때 조정됩니다.  |
| 언어 → 시스템 | 앱은 시작에서 장치 언어를 읽습니다. 시스템 언어를 변경한 후 앱을 다시 엽니다. |
| 특정 언어 | 앱은 언어 인터페이스를 사용합니다. 저장 된 프롬프트, 소스 파일 및 이전 모델 답변은 원본 텍스트를 유지합니다. |

언어 및 테마 선호도는 **Settings → General → Appearance**에 있습니다. 문서 웹 사이트는 자신의 언어 선택기를 가지고; 앱의 언어가 변경되지 않는 변경. 시스템 파일 대화 상자는 운영 체제 설정을 따릅니다.

다른 언어에 대한 보고서를 요청하려면 대화를 지정하십시오. 예를 들어: "영어 보고서를 작성하고 원본 유전자 식별자를 보존합니다."

<PlatformContent platform="windows">

**Windows에서 디스플레이 스케일링 조정**

1. Windows **Settings → System → Display**을 열고 **규모 및 배치**를 찾습니다. 현재 스케일을 참고하여 복원 할 수 있습니다.
2. 예를 들어 **125%**의 편안한 텍스트 및 앱 크기를 선택하십시오.
3. Open-Science로 돌아와 Composer 및 미리보기를 확인하십시오. 더 넓은 테이블은 그것의 수평한 scrollbar를 요구할지도 모릅니다; 미리보기를 확장하거나 필요할 때 창을 확대합니다.
4. 변경을 취소하려면 디스플레이 설정으로 돌아가 원래의 스케일을 선택합니다. Windows이 앱 재시작을 요청하는 경우, 재시작하기 전에 작업을 저장합니다.

동일한 보고서는 더 큰 규모에서 읽기 가능. 현재 테이블 뷰 포트 밖에 열을 볼 수있는 수평 스크롤 바를 사용합니다. 디스플레이 스케일은 저장된 데이터가 아닌 보기를 변경합니다.

![Open-Science at 125 %는 테이블 미리보기의 수평 스크롤 바와 스케일링](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## 작업 알림 설정 {/* #set-up-task-notifications */}

실행 분석을 떠나고주의해야 할 때 경고를 활성화하십시오.

1. **General → Notifications**에서 **Task notifications**을 켜십시오.
2. **Show task content in system notifications**을 사용할 수 있는지 확인하십시오. 작업 이름 또는 요청 세부 사항이 시스템 경고에서 유지해야하는 경우 삭제하십시오.
3. **System notification status**을 읽으면 **Send test notification**을 선택하면 됩니다. 신속한 경우 운영 체제의 알림을 허용한다.
4. 반환된 테스트 상태 및 시스템의 알림 표면 확인. 작업 경고를 위해, 다른 앱으로 전환하는 동안 작업이 실행됩니다.

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| (주) | 제품 정보 |
| --- | --- |
| 작업 알림 | 작업 완료, 실패 또는 승인 요청에 대한 경고를 활성화하면 다른 응용 프로그램을 사용할 수 있습니다. 이 작업 경고를 중지합니다. |
| 시스템 알림에 작업 내용 표시 | 작업 이름과 요청 세부 사항이 포함될 때. 공급자 오류가 숨겨져 있습니다. 이 컨트롤은 작업 알림이 꺼져있을 때 비활성화됩니다. |
| 시스템 알림 상태 | 이 장치가 시스템 알림을 지원한다는 것을 나타냅니다. |
| 테스트 알림 보내기 | 시험 요청을 보냅니다. 버튼 쇼 **Sending test…** 요청 시 시스템 알림이 사용할 수 없는 경우, 장애인입니다. |
| 배달된 업무 알림 | Open-Science을 전달하고 관련 작업을 엽니 다. |

취소된 작업과 실패는 앱이 자동으로 침묵을 유지합니다. **Messages** 홈 또는 작업 공간은 인앱 항목입니다. OS 알림 권한은 별도로 관리됩니다.

### 시스템 경고에서 작업에 반환 {/* #return-to-a-task-from-a-system-alert */}

<PlatformContent platform="macos">

완료 또는 승인 경고를 선택하여 대화로 돌아갑니다. 배너를 놓친 경우 Open-Science을 macOS 알림 센터에서 찾을 수 있습니다. 그룹 스택을 먼저 확장, 다음 특정 경고를 선택합니다. 승인 경고는 작업을 엽니다; 앱 내에서 요청을 읽고 해결합니다.

</PlatformContent>

<PlatformContent platform="windows">

1. **Task notifications**을 활성화하고 시스템 권한을 확인하기 위해 테스트 알림을 사용합니다.
2. 작업을 보내면 다른 앱으로 전환합니다. **Task completed** 또는 **Approval needed** 경고를 선택하면 도착합니다.
3. Open-Science에서 다시 대화 및 원래 요청을 확인합니다. 완료 경고는 최종 결과에 납해야 합니다; 승인 경고는 **지원하다** 또는 **Deny**을 선택해야 하는 인 보류 요청을 엽니다. 알림 선택은 실행되지 않습니다.

배너를 놓으면 Windows 알림 센터에 알림을 찾을 수 있습니다. 경고가 나타나지 않으면 Windows 배너를 확인하고 설정을 방해하지 마십시오. 홈으로 돌아가면 **Recent sessions**을 통해 오리지널 대화를 엽니다. 알림 텍스트는 실제 결과의 검사를 대체하지 않습니다.

</PlatformContent>

<PlatformContent platform="macos">

![English 시스템 완료 alert with task details hidden](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
일반 경고를 사용하려면 **Show task content in system notifications**을 끄십시오. 완료 또는 승인 경고를 선택하여 대화를 다시 열 수 있습니다. 앱 내의 승인에 응답합니다.

### 알림이 나타나지 않는 경우 {/* #if-a-notification-does-not-appear */}

테스트 결과로 시작하면 해당 조건을 확인하십시오.

| 결과 또는 symptom | 다음을 확인하기 |
| --- | --- |
| **Test notification shown.** | 이 앱은 테스트가 나타났습니다. OS 알림 표면 확인; 시험 경고는 실제 작업 이벤트에서 분리됩니다. |
| **Test notification sent, but display could not be confirmed.** | 시스템 알림 권한 확인 및 OS가 배너를 억제 여부. 납품은 확인되지 않았습니다. |
| **Test notification failed.** | 시스템 설정에서 앱의 알림 권한을 확인한 다음 테스트를 다시 시도하십시오. 아직 실패하면 오류를 수집합니다. [문제 해결](troubleshooting.md). |
| **System notifications are unavailable on this device.** | 시험 통제는 사용할 수 없습니다. 작업 영역에서 작업을 모니터링합니다. |
| 시험은 작동하지만, 작업은 경고하지 않습니다. | 작업 알림을 확인하면 다른 응용 프로그램을 사용하고 있으며, 이벤트는 완료, 실패 또는 승인 요청입니다. 취소 및 자동 반송은 경고하지 않습니다. |
| 기록, 공유 또는 미러링 동안 경고 없음 | 시스템은 녹화 또는 공유 중에 경고를 허용하고, Focus를 확인하고 방해하지 마십시오. 경고를 볼 때만 사용 가능; 그들은 녹음에 나타날 수 있습니다. |
| Alert는 작업 세부 사항없이 도착합니다. | 시스템 알림에서 보기 작업 내용 확인. 당신이 그 세부 사항을 숨길 것을 선호한다면 그것을 유지하십시오. |

<PlatformContent platform="windows">

### 창문을 닫은 후 트레이에서 반환 {/* #return-from-the-tray-after-closing-the-window */}

**General → Close button behaviour → Ask every time**로 창을 닫아 **Minimize or quit?**을 열면 **Minimize to tray**를 선택하여 창을 숨기고 Open-Science 아이콘을 Windows 트레이에서 반환합니다. **자주 묻는 질문**을 선택하면 선택한 것을 유지할 수 있습니다. 나중에 일반으로 변경하십시오. Minimizing 앱을 종료하지 않습니다.

</PlatformContent>

## 관련 설정 찾기 {/* #find-related-settings */}

| 당신은... | 오시는 길 |
| --- | --- |
| 앱 업데이트 확인 | **General → About → Check now**; 이름 &#42; [설치 및 업데이트](installation.md#choose-a-reproducible-version-and-update-deliberately). |
| 버전 변경을 읽거나 도움 받기 | **About → Release notes / Help Center** 해당 외부 페이지를 엽니다. 이 위키는 또한 [관련 링크](../changelog/v0.31.1.md). |
| 진단 로그를 찾아내거나 엽니다 | **General → Diagnostics → Reveal / Open**; 은 은 [문제 해결](troubleshooting.md). 공유 할 때까지 로컬로 이동하십시오. |
| 명령줄 입력 설치 | **General → Install command**; 은 은 [CLI 참조](../reference/cli.md). 데스크톱 사용은이 명령을 요구하지 않습니다. |
| 데이터 위치 또는 아카이브 작업 관리 | [저장과 아카이브 작업](storage.md). |

<span id="verification-scope" />

## 운영 체제의 알림 설정 {/* #notification-settings-in-the-operating-system */}

통보 납품은 또한 운영 체계의 허가, 초점 형태 및 스크린 모양 조정에 달려 있습니다. 당신이 일하는 장치 위에 체크를 사용하십시오.


근원: [일반 설정](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx).
