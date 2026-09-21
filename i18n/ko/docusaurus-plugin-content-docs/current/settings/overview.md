---
sidebar_position: 1
title: "설정 개요"
last_update:
  date: '2026-09-20'
---

# 설정 개요 {/* #settings-overview */}

작업 공간의 왼쪽 모서리에서 **Settings**을 엽니 다. 17 패널은 4개 그룹으로 구성됩니다: **Intelligence**, **Connections**, **Workspace** 및 **System**. 목적에 의해 패널을 선택, 또는 헤더에서 검색. 이 가이드에서 **Settings → Model**, 예를 들어, 인텔리전스 내부 모델 패널을 참조합니다.

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

| 이름 &#42; | 회사연혁 | 어떻게 관리합니까? |
| --- | --- | --- |
| 인텔리전스 | [모델](../guides/models.md) | 공급자 및 시나리오 모델 |
|  | [에이전트](../guides/frameworks.md) | Agent Framework 설치, 전환 및 수리 |
|  | [Skills](../skills/overview.md) | 재사용 가능한 연구 방법 및 그 가용성 |
|  | [스페셜리스트](../specialists/overview.md) | Specialist 역할 및 기능 액세스 |
|  | [메모리](../guides/memory.md) | Opt-in 글로벌 및 프로젝트 노트 |
| 연결 | [커넥터](../guides/connectors.md) | 데이터 서비스, 사용자 정의 MCP 연결 및 수입 |
|  | [네트워크](../guides/network.md) | 프록시, 패키지 미러 및 Notebook 도메인 액세스 |
|  | [원격](../guides/remote-access.md) | 브라우저 액세스, 페어링 및 신뢰할 수있는 장치 |
|  | [자격 증명](../tools/credentials.md) | 열쇠, 토큰, OAuth 및 credential 회복 |
| 워크스페이스 | [태그](../guides/tags.md) | 태그 및 즐겨찾기 주문 |
|  | [권한](../guides/approval-modes.md) | 기본 모드 및 저장된 보조금 |
|  | [런타임](../guides/runtimes.md) | Python/R 환경 및 패키지 |
|  | [저장소](../guides/storage.md) | 데이터 위치, 액세스 및 디스크 사용 쓰기 |
|  | [컴퓨팅](../guides/remote-compute.md) | 지역 및 SSH compute 자원 |
|  | [사용량](../guides/usage.md) | 토큰, 통화 및 연구 활동 통계 |
|  | [보관됨](../guides/storage.md) | 저장소 또는 영구적으로 archived 작업을 삭제 |
| 시스템 | [일반](../guides/appearance.md) | 외관, 알림, 진단 및 버전 |

**Feedback**은 설정의 하단에 별도의 항목이 남아 있습니다.

:::info&#91;설정이 저장되는 방법&#93; 일부 스위치는 즉시 저장됩니다. 더 긴 모양 사용 `Save`, `Add`, 또는 `Import`. `Saving…`, `Testing…` 또는 `Installing…`가 표시된 동안 응용 프로그램을 닫지 마십시오. 마이그레이션, 제거, 삭제 및 넓은 권한 작업은 확인이 필요합니다. :::

## 모델 설정 탭 {/* #model-tabs */}

**Model** 내에서, 공급자 및 작업 모델에 대한 **Conversation models**을 사용, **Classification models** 옵션 Skill/Connector 선택, 및 **Local parsing models** 로컬 파싱 리소스. Classification는 모델 설정 내에서 탭이며, 추가 최상위 설정 패널이 아닙니다. [분류 설정](../guides/models.md#classification-models) 참조.
