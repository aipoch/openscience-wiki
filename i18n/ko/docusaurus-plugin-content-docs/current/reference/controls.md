---
title: "제어 및 키보드 참조"
last_update:
  date: '2026-09-24'
---

# 제어 및 키보드 참조 {/* #controls-and-keyboard-reference */}

이 인덱스를 사용하여 제어의 canonical 설명을 찾을 수 있습니다. 전체 작업 연습을 반복하지 않고 필드 제한 및 단축키를 유지합니다. 라벨은 영어 인터페이스를 참조합니다.

## 작업에 의해 제어 {/* #controls-by-task */}

| 당신은 필요 | 입장 또는 통제 | 상세한 행동 |
| --- | --- | --- |
| 프로젝트 작성 또는 설명 | **New project**, 프로젝트 메뉴 → **Project settings** | [회사연혁](../guides/projects.md) |
| 자주 묻는 질문 | 선택 → **For me → Bookmark**, 작곡가 **Bookmarks** | [독서 bookmarks](../guides/bookmarks.md) |
| 모델 연결 구성 | **Settings → Model** | [공급자 설정](../guides/providers.md) |
| 소스를 첨부, 보내기 또는 요청을 큐 | 채용 정보 **+**, 부착 칩, **Send**, 큐 컨트롤 | [대화와 대기 중인 요청](../guides/composer.md) |
| 런타임 또는 설치 패키지 검사 | **Settings → Runtimes**, 해석기 및 포장 통제 | [Python 및 R 실행 시간](../guides/runtimes.md) |
| Inspect 계산 및 변수 | **View notebook**, **Variables**, artifact **Provenance** | [Notebook 및 실행 증거](../guides/notebook.md) |
| Grant or revoke 액세스 | 승인 카드, **Settings → Permissions** | [권한 및 승인](../guides/approval-modes.md) |
| 패키지 연결 진단 | **Settings → Network** | [도메인, 프록시 및 미러](../guides/network.md) |
| 먼 compute를 형성하십시오 | **Settings → Compute → Add SSH host** | [SSH 및 Slurm 설정](../guides/remote-compute.md) |
| 연구 산출을 검증 | 생성된 파일 카드, 미리보기, **Provenance** | [공공데이터 분석](../workflows/data-quality.md) |
| 제한을 봐 | 형식 또는 구성 필드 | [파일 제한](formats.md), [구성](configuration.md), [패키지 형식](packages.md) |

[완전한 통제 색인](control-index.md) 목록은 응용 프로그램 페이지에 의해 제어; 이 페이지 그룹 일반적인 작업 및 키보드 단축키. 둘 다 동일한 상세한 튜토리얼에 연결.

## 키보드 참고 {/* #keyboard-reference */}

| (주) | macOS | Windows/Linux | 조건 및 범위 |
| --- | --- | --- | --- |
| 회사연혁 | `⌘K` | `Ctrl+K` | Home/workspace 검색; 설정에서 헤더 검색에 초점을 맞추다 |
| 설정 | `⌘,` | `Ctrl+,` | 현재 오버레이가 단축될 때 설정 열기 |
| 신규 대화 | `⌘N` | `Ctrl+N` | 작업 공간; 메시지와 기존 대화를 필요로 합니다; 차단 대화 상자가 열려있는 동안 무시 |
| 사이트 맵 | `⌘B` | `Ctrl+B` | 작업 공간; 좁은 스크린 서랍 또는 탁상용 sidebar를 견인하십시오 |
| 작곡가 텍스트 | `Enter` | `Enter` | 전송할 때 사용할 수 있습니다; 열린 언급 피커는 Enter를 소유합니다; IME 조성은 제출하지 않습니다. |
| 새로운 라인 | `Shift+Enter` | `Shift+Enter` | Composer 텍스트 |
| 이전/다음의 신속한 초안 | `↑` / `↓` | `↑` / `↓` | 시작과 선택에 주의와 역사 탐색 시작; 열린 언급 피커가 우선합니다. |
| Undo 초안 | `⌘Z` | `Ctrl+Z` | Composer 초안 역사 |
| Redo 초안 | `⌘Shift+Z` | `Ctrl+Shift+Z` | Composer 초안 역사 |
| 가까운 능동태 | `⌘W` | `Ctrl+W` | 데스크톱 앱: 적용 가능한 첫 번째 일시적인 미리보기, 다음 탭/팬, 다음 창; 브라우저 액세스는 브라우저 단축키를 사용할 수 있습니다 |
| 오류 오버레이 | `Esc` | `Esc` | 지원되는 곳; 저장 또는 차단 확인은 dismissal 행동을 변경할 수 있습니다 |

파일을 숨기려면 가까운 단축키를 반복하지 마십시오. 미리보기가 닫히는 후, 다음 invocation는 응용 프로그램을 닫을 수 있습니다 창. 창 폐쇄 및 프로세스 종료는 별도의 플랫폼 의존 행동입니다.

Side Chat 탭을 닫으면 확인 및 중지 / 삭제는 측면 토론; file-preview 폐쇄는 파일을 삭제하지 않습니다. [Side Chat](../guides/delegation.md) 참조.

## Composer 참고 방아쇠 {/* #composer-reference-triggers */}

| 더 큰 | 제품정보 | 자주 묻는 질문 |
| --- | --- | --- |
| `/` | 지원 Skill | 의도한 방법을 확인하고 의존성을 지원하십시오. |
| `@` | 유효한 파일/artifact 또는 문학 참고/스코프 | 선택한 소스 및 버전 확인 |
| `#` | 세션 참조 | 예정된 대화를 확인 |

제안을 선택하면 구조화된 참조를 삽입합니다. 익숙한 파일 이름을 입력하거나 Skill 이름은 해당 참조가 첨부 된 증거가 아닙니다. 삽입된 칩 및 요구를 검사하십시오.

## 검색 범위 {/* #search-scope */}

앱 글로벌 검색은 프로젝트, 세션, 메시지 텍스트, 업로드 / 생성 된 파일, 라이브러리 레코드 및 수집 및 지원 된 업로드의 색인 된 내용을 포함합니다. 생성된 파일은 이름으로 검색됩니다; unindexed 내용이 검색되지 않습니다. 결과를 좁히기 위해 범주를 선택하고, 그 결과의 컨텍스트를 수정하기 전에 검사합니다. 이것은 모든 PDF, 이미지 또는 다른 바이너리 파일에는 검색 가능한 전체 텍스트 인덱스가 없습니다. 완전한 워크플로우를 위해 [탐색 및 검색](../guides/navigation.md)을 참조하십시오.

wiki's Search는 별도입니다. 현재 언어의 문서 제목, 제목 및 신체 통행을 색인합니다. "Inbox"와 같은 용어는 응용 프로그램의 세션 제목에서 부패되는 경우에도 단락과 일치 할 수 있습니다.

기술 참조 : [신청 바인딩](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [composer 키보드 취급](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [닫기 행동](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [글로벌 검색](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

설정 패널/dialog 검색 용도 **&lt;unk>** 으로 macOS 으로 **Ctrl+Alt+K로** 으로 Windows/ / /Linux... **⌘K / Ctrl + K**은 설정 헤더 검색에 초점을 맞추고 있습니다. [단축 범위](../guides/shortcuts.md#local-settings-search) 참조.
