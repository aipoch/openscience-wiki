---
title: "키보드 단축키"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# 키보드 단축키 {/* #keyboard-shortcuts */}

키보드 작업은 초점에 달려 있습니다. Composer에서 텍스트를 편집하는 핵심은 결과 목록을 탐색하거나 다른 제어가 집중될 때 미리보기를 닫을 수 있습니다. 이 작업을 실행하기 전에 눈에 띄는 단축키 및 선택된 표면을 읽으십시오.

<PlatformGuide />

## 검색 및 탐색 {/* #search-and-navigate */}

| (주) | macOS | Windows/Linux | 초점과 결과 |
| --- | --- | --- | --- |
| 앱 검색 | ₢ 킹 | Ctrl + K를 | 프로젝트, 세션, 메시지, 파일 및 문학 검색; 은 은 [검색 범위](navigation.md) |
| 설정에서 검색 | ₢ 킹 | Ctrl + K를 | 설정이 열리면서 헤더 검색에 초점을 맞추고 있습니다. 은 은 [설정 개요](../settings/overview.md) |
| 검색 결과 이동 | 위로 / 아래로 | 위로 / 아래로 | 명령 팔레트: 하이라이트 이동 |
| 첫 번째 / 마지막 결과 | 집 / 끝 | 집 / 끝 | palette에 의해 처리 될 때 검색 결과 탐색 |
| 선택된 결과 | 이름 &#42; | 이름 &#42; | 결과 세부 사항을 검사하고, 일치하는 메시지를 열고, 파일 또는 기록 |
| 검색/menu 닫기 | (주) | (주) | 활성 오버레이를 무시; unsaved 형태는 그들의 자신의 확인이 있을 수 있습니다 |
| 이동 초점 | 탭 / Shift+Tab | 탭 / Shift+Tab | 지원되는 통제를 통해 Forward/backward |

플랫폼에 대한 단축키로 앱 검색을 열고 구문, 제목 또는 파일 이름을 입력합니다. 결과를 선택하면 세부적인 팬에 컨텍스트를 확인한 다음 매칭 콘텐츠를 엽니다. 파일의 맥락을 찾기 위해 source-message Entry를 사용합니다. 필터 및 검색 범위에 대한 [네비게이션](navigation.md) 참조; Wiki's 별도의 검색에는 문서 본문이 포함되어 있습니다.

## Compose 및 참조 입력 {/* #compose-and-reference-inputs */}

| 입력 | 그것을 사용하는 곳 | 자주 묻는 질문 |
| --- | --- | --- |
| `@` | 채용 정보 | 실제 파일/artifact/reference 제안을 선택하십시오; 일반 텍스트는 혼자 파일을 바인딩하지 않습니다 |
| `/` | 채용 정보 | 유효한 Skill를 선택하십시오; 그것의 외관은 모든 runtime prerequisites를 설치하지 않습니다 |
| `#` | 채용 정보 | 발표된 세션 성적표 |
| 위로 / 아래로 | 시작에 빈 Composer | 복원 된 신속한 역사와 첨부 파일을 resending |
| ⌘Z / Ctrl + Z | 집중된 텍스트 편집기 | undo the 초안 편집 handled 로 그 편집기 |
| ⌘Shift+Z/Ctrl+Shift+Z를 곱합니다 | 집중된 Composer | Redo 지원되는 초안 편집 |
| 표시된 전송 shortcut | 채용 정보 | 그것은 요청을 제출; Multiline 초안에 대해 불확실한 경우 Send 버튼을 사용하십시오. |

<PlatformContent platform="windows">

Windows 데스크톱 앱에서 **Ctrl + Z를**을 사용하여 통일 또는 **Ctrl + 시프트 + Z**를 재사용하기 전에 Composer 초안을 클릭하십시오. 계속 또는 전송하기 전에 결과 텍스트를 확인합니다. **탭 / Shift+Tab**을 사용할 때, 아래의 첨부 파일 버튼과 같은 집중 제어의 개요를 찾습니다. 패널을 열거나 통제의 국가를 바꾸기 후에 다시 초점을 확인하십시오; keypresses의 고정 번호에 의존하지 마십시오.

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="연결 단추에는 Windows Composer에 있는 눈에 보이는 키보드 초점 윤곽이 있습니다"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="완벽한 Windows 스크린 샷을 열고 첨부 파일 버튼 초점"
/>

세부사항은 부착 단추의 초점 따로 잇기 및 연장통을 보여줍니다. 전체 스크린 샷을 열려면 이미지를 선택하십시오.

</PlatformContent>

삭제 된 artifact를 복원하거나 실행 코드를 반전하기위한 대체로 일반적인 undo shortcut을 사용하지 마십시오. 제공 할 때 아카이브 Undo notice는 text-editor undo에서 별도의 동작입니다. [보관됨](storage.md)을 사용하여 통지가 사라지면 유지 작업을 복원합니다.

## 미리보기 및 큐와 함께 작업 {/* #work-with-previews-and-queues */}

**왼쪽 / 오른쪽**을 사용하여 탭 또는 **홈/끝** 중 이동하기 전에 미리보기 탭을 집중하여 첫 번째 / 마지막 탭을 선택합니다. **삭제/Backspace**에 초점을 맞춘 미리보기 탭은 그 탭을 닫습니다; 소스 파일을 삭제하지 않습니다. 편집 가능한 보고서 내부, 그 키 대신 텍스트를 편집합니다. 초점이 불확실한 때 눈에 보이는 가까운 통제를 사용하십시오.

A 초점 **Side Chat** 탭에는 destructive-close 확인이 있습니다. 채팅 및 저장된 대화를 삭제하는 중지를 확인합니다. **Cancel**을 사용하거나 미리보기 영역을 축소하십시오. [Side Chat](delegation.md) 참조.

퀴즈드 요청에 따라, 주문 핸들을 집중하고 **- 연혁**을 눌러 픽업, **위/아래**을 사용하여 이동하고, **- 연혁**를 다시 눌러 드롭하십시오. 전송하기 전에 resulting 순서를 읽으십시오. 검색 결과 또는 검색 기록과 동일하지 않습니다. Queue 편집/제거 및 지연된 납품은 [회사연혁](composer.md)에서 설명됩니다.

### 열린 파일을 잃지 않고 크기 {/* #resize-without-losing-open-files */}

미리보기 옆에 배당자를 드래그하여 너비를 변경합니다. **Collapse preview panel**는 그것을 숨깁니다; **Expand preview panel**은 열린 탭을 복원합니다. 열린 탭은 붕괴 / 폭발 후 사용할 수 있습니다. 항법 열쇠를 위한 집중된 탭을 사용하십시오; 파일 편집기 안쪽에 태핑 다른 효과.

## 단축키가 응답하지 않는 것 {/* #if-a-shortcut-seems-unresponsive */}

어떤 필드 또는 대화 상자가 초점을 소유하고, 관련 오버레이를 닫고, 눈에 보이는 버튼을 시도하십시오. macOS에, 몇몇 가정/끝 열쇠는 키보드의 Fn 조합을 요구합니다. OS/browser 단축키는 앱이 보기 전에 키를 가로챌 수 있습니다. 바탕 화면 창 및 브라우저 항목 포인트 따라서 모든 키를 동일하게 처리 할 필요가 없습니다.

소스: [글로벌 검색 keyboard handling](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx), [탭 미리보기](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx), [쿼크](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx).

## 현재 설정 패널 내에서 검색 {/* #local-settings-search */}

설정에서 **⌘K's 수** (macOS) 또는 **Ctrl+K로** (Windows/Linux)는 설정에서 헤더 검색에 중점을 둡니다. **&lt;unk>** 또는 **Ctrl+Alt+K로**는 현재 패널 또는 대화 상자에서 자격이 된 검색 필드를 초점을 맞추고 있습니다. 로컬 단축키는 사용 가능한 로컬 검색 필드를 필요로합니다. 응용 프로그램 전체 검색 또는 PDF 텍스트 검색을 열지 않습니다.
