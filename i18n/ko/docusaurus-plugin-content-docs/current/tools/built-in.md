---
title: "내장 연구 도구"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 내장 연구 도구 {/* #built-in-research-tools */}

내장 작업은 프로젝트 파일, Notebook 실행, 문학 기록 및 저장된 결과에 대한 대화를 연결합니다. 그들은 활성 에이전트 프레임 워크를 통해 노출; 인터페이스는 **Agent SDK** 또는 **Notebook** 활동 카드의 밑에 몇몇 가동을 그룹화할지도 모릅니다.

## 연구 업무에 의한 운영 {/* #operations-by-research-task */}

| 이름 &#42; | 제품 정보 | 가동과 눈에 보이는 결과 | 그것을 relying하기 전에 체크 |
| --- | --- | --- | --- |
| 파일 발견 및 읽기 | Project/session 및 정확한 입력 | 접근 가능한 파일 목록 또는 지원된 내용을 읽으십시오 | 이름, 근원 및 현재 버전; 카탈로그 행은 file-content 검사가 되지 않습니다. |
| Notebook 실행 | Python/R 코드, 런타임 및 유효한 입력 참조 | Code cell, output, 타이밍 및 실행 상태 | 실제 언어 / 실행 시간, 오류 및 전체 데이터 검사 |
| 아티팩트 게시 | 지원된 출력 경로 또는 인라인 내용 | 대화/파일의 결과 카드 | 산출을 열고, 차원/내용을 비교하고 그것의 버전을 유지하십시오 |
| 문학 검색/import | Query, DOI/PMID 또는 참조 파일 | 레코드 검색, Inbox 후보자 및 라이브러리 항목 | 소스 식별자, 중복, 검토 결정 및 전체 텍스트 액세스 |
| 계획 작업 | 연구 단계 및 완료 기준 | 단계별 세션 계획 | 상태는 출력을 실제로 생산합니다. |
| 메모리 | reuse를 위해 예정된 사실 또는 지시 | 설정된 범위에서 저장된 메모리 | 콘텐츠 및 범위, 프로젝트 파일 저장에서 별도 |
| Skill 로딩 | 유효한 포장 ID | 방법 지침 및 지원 리소스 | 예정된 포장은 읽었습니다; 적재는 computation 없습니다 |
| Specialist 위임 | 역할, 작업 및 허용 입력 | 어린이 활동 및 시약 성적 | 아이들은 실제로 시작되고, 요청한 체크 및 보고한 제한을 ran습니다 |
| 종설 | Eligible 응답 및 리뷰 구성 | Reviewer 검사, 발견 및 교정 상태 | 어떤 응답 / 버전 검토 및 증거가 유효하다 |

<span id="follow-one-calculation-from-request-to-file" />

## 결과에 따라 작업 수행 {/* #follow-an-operation-through-to-its-result */}

1. 입력 및 원하는 출력으로 요청을 보냅니다. 작은 테이블에 포트 작업에 [첫 번째 프로젝트](../guides/first-project.md)을 따르십시오.
2. 활동 카드를 확장하고 요청된 작동, 입력 및 권한 범위를 확인합니다.
3. 실행 후, 도구 결과를 읽으십시오. 요약에 의존하기 전에 오류를 해결합니다.
4. 생성된 파일 카드를 열고 내용을 확인합니다. 계산을 위해, 생성 부호와 런타임을 검열하기 위하여 Notebook를 엽니다.

[Data-quality 워크플로우](../workflows/data-quality.md)는 완전한 과학적인 예를 공급합니다. 환경 제어는 [Notebook](../guides/notebook.md) 및 [런타임](../guides/runtimes.md)에서 설명됩니다.

## 검색 툴 활동 {/* #read-tool-activity */}

| UI 요소 | 사용 방법 |
| --- | --- |
| 활동 그룹 | 실행중인 작업 그룹을 확장합니다. |
| 도구 / 에이전트 SDK / Notebook 실행 | 사용 가능한 작업 정보를 엽니다. 입력, 응답 및 오류를 그룹 라벨보다 읽으십시오. |
| 복사 코드 / 코드 disclosure | 복사 또는 제출 된 코드를 공개; 두 번째 실행을 실행하지 않습니다. |
| 허용 / 허가 범위 / Deny | 표시된 가동 및 선택된 범위를 통제하십시오. 대리인이 그것을 요구하는 검사. |
| 생성된 파일 카드 | 실제 저장된 결과를 엽니다. |
| Notebook 열기 | 세션 실행 기록 및 변수를 엽니다. |
| 아이 작업 칩 | 실제 위임 작업을 엽니 다; 자신의 성적표를 검사합니다. |

## 일반적인 입력/출력 혼란을 피하십시오 {/* #avoid-common-inputoutput-confusion */}

업로드된 파일, Notebook 작업 파일 및 artifact 버전은 관련이 있지만 명백합니다. 한 목록에서 볼 수있는 파일은 아직 아이 커널에 장착되지 않을 수 있습니다. 현재 신청 입증된 참고를 사용하십시오; 경로를 추측하거나 파일 이름과 artifact 버전 ID를 대체하여 사용할 수없는 입력을 복구하지 마십시오.

Connector-created 파일에는 캡처되지 않은 Python 프로듀서 블록이 없습니다. **생산 블록 없음**, **No review for this version**, **partial** 환경 및 **뚱 베어** 증거는 의미있는 상태이며, 생성 된 번식을 채우기 위해 공백이 없습니다. 정확한 오류 및 복구 단계에 대한 [관련 링크](../guides/troubleshooting.md)을 사용하십시오.

구현 참조 : [노트북.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [팟캐스트](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [작업 공간MessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx).

지원되는 장시간 일을 위해, [배경 작업 및 결과 납품](../guides/notebook.md#background-tasks-and-result-delivery)를 따르십시오. 납품 후에 실제적인 뛰기 및 저장된 산출을 검열하십시오. 환경 및 패키지, Compute Environment Setup 및 Remote Compute (SSH)가 활성화되었지만 런타임, 네트워크 및 호스트 요구 사항이 여전히 적용됩니다.

공공 웹 페이지의 경우, 내장 Open-Science 에이전트와 [웹 검색 및 소스 읽기](web-search.md)을 사용하십시오.
