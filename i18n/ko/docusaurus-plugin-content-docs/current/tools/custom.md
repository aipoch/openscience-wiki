---
title: "사용자 정의 MCP 도구를 연결"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# 사용자 정의 MCP 도구를 연결 {/* #connect-a-custom-mcp-tool */}

<p className="example-label"><strong>실습 예제</strong> 로컬 MCP 서버를 통해 공용 QC 테이블을 쿼리</p>

이 예제는 작은 로컬 MCP 서버를 통해 기존의 공공 RNA-seq QC 테이블을 노출합니다. 그것은 고정 CSV을 읽고 두 개의 작업을 제공; 그것은 네트워크, 패키지를 설치하거나 dataset을 수정하지 않습니다.

<PlatformGuide />

## 실제 예제 다운로드 {/* #download-the-actual-example */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-server.py 파일 형식</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-샘플-qc.csv</ExampleDownload>

모든 파일을 로컬로 저장하고 전체 경로에주의하십시오. 서버는 Python의 표준 라이브러리를 사용합니다. 그것은 시작에 선택한 CSV을 읽습니다, 그래서 다시 시작/reconnect it deliberately if you replace that input.

## Open-Science에 추가 {/* #add-it-in-open-science */}

1. **Settings → Connectors → Add connector → Local command**을 엽니다.
2. **Display name**을 `GSE60450 QC`로 설정하십시오.
3. **Command** 또는 **Other…**로 **python3 — script file**을 Windows에서 실제 Python 실행 가능한 경로로 선택하십시오.
4. **Advanced settings**을 엽니다. `gse60450-qc`에 연결관 이름/ID를 놓고 저장한 QC 테이블에 읽기 전용 접근으로 설명하십시오.
5. **Arguments**에서 첫 번째 라인과 CSV의 절대 경로에 스크립트의 절대 경로를 두십시오. 각 라인은 단일 인수입니다. 공백을 포함하기 때문에 경로를 따라 쉘을 추가하지 마십시오.
6. 이 예제에 대한 환경 빈을 남겨. 서버 스크립트를 검토, **I trust this connector**을 확인, 다음 **Add**.
7. `GSE60450`을 검색하고 **Connected**을 확인하고 Main Agent에 대한 가용성을 확인하십시오.

<PlatformContent platform="macos">

![실제 로컬 MCP 구성](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

이 두 줄은 문헌을 풀 수있는 경로 템플릿이 아닙니다. `python3`이 앱에 사용할 수 없는 경우, 다른 실행 가능한 경로 선택. 선택한 발사기는이 컴퓨터에 있어야합니다.

<PlatformContent platform="windows">

Windows에서 **Other…**을 사용하여 설치 된 `python.exe`에 전체 경로를 입력합니다. `python3` 미리 설정은 명령이 존재한다는 것을 설정하지 않습니다. [런타임](../guides/runtimes.md)의 해석 경로 확인. 두 개의 별도의 **Arguments** 라인에 스크립트 및 CSV 경로 유지, 심지어 폴더 이름이 공백을 포함 할 때. executable과 인수를 하나의 쉘 명령으로 결합하지 마십시오.

</PlatformContent>

## 도구 입력 및 검증된 출력 {/* #tool-inputs-and-verified-outputs */}

| 도구 | 입력 | 실제 예상된 내용 |
| --- | --- | --- |
| get_dataset_summary | 빈 객체 | GSE60450, 소스 URL, 입력 파일명, 12 행 및 전체 샘플 식별자 |
| get_sample_qc | `sample_id` 뚱 베어 | 선택된 표본의 4개의 숫자 QC 미터 |

대리인에게 물어보십시오:

> 연결된 gse60450-qc Connector를 사용하십시오. get_dataset_summary, MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1에 대한 get_sample_qc을 호출합니다. 실제 응답만 보고 CSV을 보존합니다.

이 예에서 네이티브 응용 프로그램은 그 샘플에 **23,227,641 총 조사, 8,664 제로 카운트 유전자, 18,515 검출 유전자 및 미디어 237**을 반환했습니다. dataset-summary 호출은 12 행을 반환합니다. 이 경기는 본래 저장된 QC 테이블에 일치합니다.

<PlatformContent platform="macos">

![성공적으로 연결되는 관례 Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

도구 통화 모두 Notebook 활동을 열고 저장 된 JSON을 다시 열고 CSV와 샘플 ID와 메트릭스를 비교합니다. Windows는 아래에 연결관 ID `gse60450-qc-win`를 사용하; 요청시 자신의 ID를 사용합니다.

![Windows 로컬 MCP 통화 저장 JSON 및 Notebook 출력](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## 서버 및 오류 동작 검사 {/* #inspect-the-server-and-error-behavior */}

서버는 MCP 초기화, ping, 도구 발견 및 stdio를 호출합니다. 두 개의 도구 스키마는 다운로드 가능한 스크립트에서 정의됩니다. 표준 산출은 의정서 수로입니다; 일반 디버그 인쇄를 추가하면 연결이 끊어질 수 있습니다. 로컬 진단은 표준 오류에 속합니다.

**알려진 오류 매핑 :** 잘못된 샘플 이름은 사용자 정의 서버가 도메인 별 오류를 반환 할 때 앱에서 **connector_unavailable**로 표면 할 수 있습니다. 서버 로그를 확인하고 재연결하기 전에 샘플 식별자를 검증합니다. [문제 해결](../guides/troubleshooting.md)을 사용하여 영구적인 mismatches를 보고하십시오.

Application은 연결 중에 서버 도구를 발견합니다. `host.mcp`을 통해 호출 할 때 발견 된 작동 이름을 사용하십시오. 프로토콜 `tools/list`은 비즈니스 도구가 아닙니다. 입력 스키마에 대한 다운로드 가능한 스크립트를 검사합니다.

## 다른 컴퓨터로 내보내고 이동 {/* #export-and-move-to-another-computer */}

행의 **Actions → Export**을 선택하고 원하는 형식을 선택하고 구성 미리보기를 검사합니다. 실제 수출은 두 인수 경로가 로컬이었다. **Save configuration**는 설정, Python 해석기, 스크립트 또는 CSV를 수출합니다. 해당 파일을 별도로 복사, 업데이트 경로, 로컬 신뢰를 확인하고 성공적인 통화를 반복하십시오.

<PlatformContent platform="windows">

**MCP client config**의 경우 `mcpServers`을 검사합니다. 이 예제는 `command` 및 `args`와 함께 하나의 서버를 수출합니다. JSON는 Windows 경로에서 탈출 된 backslashes를 표시합니다. 또 다른 컴퓨터에서, 실제 파일에 모든 세 가지 경로 업데이트 및 통화 모두 다시. 수출된 윤곽은 목적지 컴퓨터가 연결된다는 것을 설치하지 않습니다.

</PlatformContent>

| 실패하다 | 【특전】 |
| --- | --- |
| 명령은 시작할 수 없습니다. | 실행 가능한 경로, 스크립트 경로 및 파일 권한 |
| CSV는 읽을 수 없습니다 | 두 번째 인수 및 실제 파일 위치 |
| 연결하지만 도구는 사용할 수 없습니다 | 에이전트 할당, 현재 카탈로그 및 정확한 도구 이름 |
| 나쁜 입력 | 필수 `sample_id` 그리고 원래 전체 식별자, 컴팩트한 플로트 라벨이 아닌 |
| 실패한 호출 후 Connector 오류 | Inspect server/application 오류 세부 사항 및 적절한 경우 다시 연결 |
| 터미널에서 작동하지만 앱이 아닙니다. | App-visible executable/environment 및 프로토콜 전용 stdout |

예를 확장하려면 작은 입력 스키마, 반환 소스 식별자 및 테스트 정상, 빈 및 잘못된 입력 도구를 exposing하기 전에. 사용자가 전화를 읽거나 변경하는 것을 검사할 수 있는 충분한 이 가동을 지킵니다.

구현 참조 : [커넥터AddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [서비스.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts).

스크립트에서 동일한 사용자 정의 MCP 구성을 관리하려면 [Connector CLI 명령](../reference/cli.md#manage-connectors-and-credentials) 또는 [SDK 방법](../reference/api.md#connector-management-methods)를 사용하십시오. 성공적인 연결 시험은 공구를 발견합니다; 통합 운영을 호출하기 전에 별도의 바인딩 된 비즈니스 통화를 확인합니다.
