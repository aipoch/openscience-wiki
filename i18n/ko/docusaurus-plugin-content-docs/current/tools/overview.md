---
title: "도구 살펴보기"
last_update:
  date: '2026-11-20'
---

# 도구 살펴보기 {/* #explore-tools */}

필요한 결과에 의해 도구를 선택: 레코드를 검색, 파일을 검사, 계산을 실행하거나 외부 서비스를 연결. 응용 프로그램은 이러한 기능을 결합하지만, 그들은 다른 설정과 증거 요구 사항이 있습니다.

## 도구 가족 선택 {/* #choose-a-tool-family */}

| 지원하다 | 이태리 | 준비해야 할 사항 | 검사 후의 |
| --- | --- | --- | --- |
| 파일 읽기, 계획 작업, 계산 또는 게시 결과 | [내장 연구 도구](./built-in.md) | 접근 가능한 프로젝트 입력 및 작업 권한 | 도구 응답, 출력 파일 및 실행 기록 |
| 공공 웹 페이지 및 읽기 소스 텍스트 찾기 | [웹 검색](./web-search.md) | 내장 Open-Science 에이전트, Main 모델 및 네트워크 | 소스 URL, 검색 텍스트 및 어떤 truncation |
| 어떤 과학 소프트웨어를 찾는 방법 | [과학 도구 카탈로그](./catalog.md) | Skill 설치에서 별도의 패키지/무게 확인 | 실제 실행/import 및 버전 |
| Python, R 또는 과학적 워크로드를 실행 | [과학 도구](./scientific.md) | 선택된 런타임, 패키지 또는 Compute Host | 코드, 오류, 출력 체크 및 검증 |
| Query 생물 의학/과학성 기록 | [과학 데이터베이스](./databases.md) | Connector, 네트워크 및 필요한 자격 증명 | 소스 ID, 반환 필드 및 truncation |
| CSV, TSV 또는 스프레드 시트 데이터 검사 | [테이블 및 데이터 세트](./tables.md) | 지원된 파일 및 현재 입력 | 가시성 행 / 열, delimiter 및 전체 데이터 치수 |
| 종이, 순서, 구조 및 다른 산출을 읽으십시오 | [과학 뷰어](./viewers.md) | 지원된 체재 | Rendered 콘텐츠 및 모든 미리보기 제한 |
| MCP 서버 연결 | [커넥터 및 MCP](./mcp.md) | 서버 구성 및 신뢰 | 연결된 상태 및 실제 도구 응답 |
| 서비스 ID/key 구성 | [서비스 자격](./credentials.md) | 정확한 서비스 및 사용 가능한 계정 | 유효성 검사 결과 또는 바인딩 된 라이브 쿼리 |
| 툴을 통해 자신의 로컬 데이터를 노출 | [사용자 정의 MCP 도구](./custom.md) | 입력 schema를 가진 작업 서버 | 디스커버리, 성공적인 전화 및 실제 실패 행동 |

## Availability에는 몇몇 의미가 있습니다 {/* #availability-has-several-meanings */}

**이름 &#42;**은 응용 프로그램을 리소스를 알고 있습니다. **Enabled**은 선택한 에이전트가 사용할 수 있음을 의미합니다. **Connected**은 Connector 세션을 확인하지만 특정 쿼리가 유효하다는 것을 증명하지 않습니다. **계정 관리**은 도구가 실제로 결과 또는 오류를 반환합니다. **인증 및 인증**은 그 결과가 작업에 대해 검사되었다는 것을 의미합니다.

로컬 예제는 실제 GSE60450 RNA-seq 카운트, 사용자 정의 읽기 전용 QC 서버, aspirin 분자 artifact 및 공공 시퀀스 / 구조 입력이 포함되어 있습니다. 그들은 언어 판에서 영어 응용 프로그램 스크린 샷을 사용합니다. 리모트 GPU/SSH 실행 및 credentials는 이 장치에 유효하지 않습니다 완료한 국부적으로 가동에서 명시적으로 구별합니다.

![신청에서 연결되는 관례 QC Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## 에이전트에게 경계 요청을주십시오 {/* #give-the-agent-a-bounded-request */}

소스, 작동 및 예상 출력을 지정합니다. 데이터베이스 쿼리의 경우 식별자 네임스페이스와 작은 결과 제한이 있습니다. 계산을 위해 입력, 선택한 언어 및 체크 이름을 입력합니다. 도구가 실행할 수 없는 경우 실제 오류에 대한 질문; 모델 메모리에서 다시 재구성 된 대답은 성공적인 도구 호출이 아닙니다.

[스킬](../skills/overview.md)는 방법을 공급합니다; [스페셜리스트](../specialists/overview.md)은 재사용 가능한 역할을 합니다. Neither는 소프트웨어를 자동으로 설치하고, credentials를 제공하거나 액세스 가능한 파일을 만들 수 있습니다.

구현 참조 : [커넥터Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [미리보기 지원.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts).
