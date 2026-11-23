---
sidebar_position: 1
title: "설정 개요"
last_update:
  date: '2026-11-23'
---

# 설정 개요 {/* #settings-overview */}

작업 공간의 왼쪽 모서리에서 **Settings**을 엽니 다. **17 패널**은 **System**, **Intelligence**, **Connections** 및 **Workspace**로 구성됩니다. Skills, 커넥터 및 전문가는 별도의 [리소스 센터](../guides/navigation.md#resource-center)에서 관리됩니다. 설정 패널을 선택하거나 헤더 검색을 사용합니다.

| 글로벌 제어 | 뚱 베어 |
| --- | --- |
| `Back` / `Forward` | 주요 설정 패널과 그 세부 사항, 추가, 또는 가져오기 subviews 사이 이동 |
| Breadcrumb 뒤 단추 | 메인 패널에 subview에서 반환 |
| `Maximize` / `Restore` | 큰 대화 상자와 풀 스크린 설정 사이 전환 |
| `Close settings` | 성공적으로 저장된 설정을 잃지 않고 원래의 프로젝트 및 세션으로 돌아 |
| `Dismiss settings error` | 오류 배너 닫기; 실패한 가동은 자동적으로 retried |
| 모바일 탐색 버튼 | 설정 탐색 서랍을 열고 닫습니다 |

## 설정 찾기 {/* #find-a-setting */}

1. 설정 및 초점 **Search settings** 헤더에. **₢ 킹**에 macOS 또는 **Ctrl + K를**에 Windows / Linux는 설정이 활성화되는 동안이 검색에 초점을 맞추고 있습니다.
2. `Package mirror`, `Main model` 또는 `Diagnostics`와 같은 패널 이름 또는 작업을 입력하십시오.
3. **위/아래**을 사용하여 결과 및 **이름 &#42;**을 선택하고 패널을 열거나 결과를 클릭합니다. 대상 패널은 간단히 강조됩니다; 이름 설정이 있습니다.
4. **Back**을 반환합니다. 다른 설정에 대한 검색에 대한 쿼리를 삭제합니다. 패널의 자체 검색 필터는 모든 설정을 검색하는 것보다 오히려 목록입니다.

이 검색은 각 패널의 대표 설정을 다루고, 모든 필드 또는 연구 문서가 아닙니다. 용어가 일치하지 않는 경우, 패널 이름 또는 내비게이션 그룹을 사용하십시오. 대화 또는 파일을 검색하려면 설정 및 [글로벌 검색](../guides/navigation.md)을 사용하십시오.

## 17 메인 패널 {/* #the-17-main-panels */}

| 그룹 | (주) | 어떤 관리 |
| --- | --- | --- |
| 시스템 | [일반](../guides/appearance.md#help-center) | 앱 버전, 업데이트, 진단, CLI 설치, 창 동작 및 도움 |
|  | [외관](../guides/appearance.md) | 테마, 언어, 데스크탑 인터페이스 규모 및 지원되는 앱 아이콘 선택 |
|  | [알림](../guides/appearance.md) | 작업 경고, 알림 내용, 시스템 상태 및 테스트 알림 |
| 인텔리전스 | [모델](../guides/models.md) | 공급자와 시나리오 모델, 포함 [이미지 서비스](../guides/image-generation.md) |
|  | [에이전트](../guides/frameworks.md) | Agent Framework 설치, 전환 및 수리 |
|  | [메모리](../guides/memory.md) | 글로벌 및 프로젝트 노트 |
| 연결 | [네트워크](../guides/network.md) | 프록시, 패키지 미러 및 Notebook Relaxed/Strict 액세스 규칙 |
|  | [원격](../guides/remote-access.md) | 브라우저 액세스, 페어링 및 신뢰할 수있는 장치 |
|  | [Lab](../guides/providers.md#lab-account) | 데스크톱 조직 로그인, 할당 된 모델 및 사용 |
|  | [자격 증명](../tools/credentials.md) | 키, 토큰, OAuth 및 자격 복구 |
|  | [컴퓨팅](../guides/remote-compute.md) | SSH · Slurm · 쿠버네티스 · Hugging Face Jobs · Modal · Ray |
| 워크스페이스 | [태그](../guides/tags.md) | 태그 및 즐겨찾기 주문 |
|  | [권한](../guides/approval-modes.md) | 기본 모드 및 저장된 보조금 |
|  | [런타임](../guides/runtimes.md) | Python/R 환경 및 패키지 |
|  | [저장소](../guides/storage.md) | 데이터 위치, 액세스 및 디스크 사용 쓰기 |
|  | [사용량](../guides/usage.md) | 토큰, 통화 및 연구 활동 통계 |
|  | [보관됨](../guides/storage.md) | 저장소 또는 영구적으로 archived 작업을 삭제 |

**Feedback**은 설정의 하단에 별도의 항목이 남아 있습니다.

:::info&#91;설정이 저장되는 방법&#93; 일부 스위치는 즉시 저장됩니다. 더 긴 모양 사용 `Save`, `Add`, 또는 `Import`. `Saving…`, `Testing…` 또는 `Installing…`가 표시된 동안 응용 프로그램을 닫지 마십시오. 마이그레이션, 제거, 삭제 및 넓은 권한 작업은 확인이 필요합니다. :::

## 모델 설정 탭 {/* #model-tabs */}

내 계정 **Model**, 사용 **Conversation models** 공급자와 업무 모형을 위해, **Classification models** 옵션 기능 선택 및 스마트 컬렉션 및 **Local capabilities** PDF 추출, OCR 및 연구 narration에 대 한. 이 모델 내에서 탭, 추가 설정 패널이 없습니다. 이름 * [지역 자원](../guides/models.md#local-capabilities).

헤더 검색은 **⌘K / Ctrl + K**을 사용합니다. 현재 패널 또는 대화 상자의 자신의 검색에 초점을 맞추려면 필드가 사용할 때 **&lt;unk>K/Ctrl+Alt+K**을 사용하십시오. [검색 단축키](../guides/shortcuts.md#local-settings-search) 참조.

## 설정에서 설치 된 리소스 {/* #resource-shortcuts */}

설정에서 **Skills**, **스페셜리스트** 또는 **Connectors** 단축키를 사용하여 리소스 센터에 설치된 범주를 엽니다. 이전 설정 위치를 다시 시작합니다. 이것은 자원 관리에 단축, 3 개의 추가 설정 패널이 아닙니다. Marketplace discovery 및 설치 리소스 구성은 별도의 레이아웃을 유지.
