---
title: "커넥터 및 자격"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 커넥터 및 자격 {/* #connectors-and-credentials */}

A Connector은 에이전트에 사용할 수있는 서비스 도구입니다. 그 서비스가 필요할 때 Credential 공급 인증. Skill을 설치하거나 태그를 할당하는 것은 서비스를 연결하지 않습니다.

배치 관리에서, 가동을 적용하기 전에 밑바닥 활동 지역에 있는 선정한 조사를 검토하십시오. 완료 또는 실패 피드백을 읽고, 그 결과 항목을 확인합니다. 혼자 입장을 선택하면 활성화, 설치 또는 삭제할 수 없습니다.

## 내장 Connector 사용 {/* #use-a-built-in-connector */}

### Gene-expression 프로젝트를 위한 도구 찾기 {/* #find-tools-for-a-gene-expression-project */}

**Settings → Connectors**을 열고 **Omics 아카이브**을 검색하고 세부 정보를 엽니다. 이 내장 제품군에는 GEO, ArrayExpress, MetaboLights, MGnify 및 PRIDE 도구가 포함되어 있습니다. 선택하기 전에 도구 행을 확장합니다.

![GEO 메타데이터 도구 및 명시된 다운로드 경계](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series`는 GEO 시리즈 메타데이터, 샘플, 플랫폼 및 보충 파일 URL을 반환합니다. 반환된 소스에서 필요한 데이터 테이블을 다운로드하고 계산을 요청하기 전에 프로젝트에 부착하십시오.

**Transcriptomics의 특징**과 같은 태그를 Connector에 할당하면 **Settings → Tags** 아래에서 찾을 수 있습니다. 액세스 또는 도구 승인없이 리소스를 구성합니다.

| 상태 | 설치 방법 | 다음 검증 |
| --- | --- | --- |
| 자주 묻는 질문 | 앱은 Connector 정의를 알고 있습니다. | 실제 도구 설명 읽기 |
| Used by | 에이전트 가용성 | 의도한 대리인 및 기능 바인딩을 확인하십시오 |
| 선택 사항 | 이름의 바인딩 존재 | 적용된 서비스에 대한 테스트 인증 |
| 공구 정책 | 전화가 허용 여부, 요청 또는 차단 | Inspect는 사전 허가를 기억했습니다 |
| Successful 도구 결과 | 그 특정 호출 완료 | 반환된 식별자/데이터 및 소스를 검증합니다. |

### 내장 Connector 제어 {/* #built-in-connector-controls */}


**Search connectors**을 사용하여 PubMed를 **Directory** 아래; 목록은 또한 **Featured** 및 **Custom** 그룹을 포함합니다. 필터링 그룹 당 적용, 그래서 다른 그룹은 **연결관은 당신의 수색에 일치합니다**을 말할 수 있습니다 일치 결과 아래에서 볼 수 있습니다.

**Filter connectors by group**, **Filter Connectors by agent** 및 **Filter by Tag**를 사용하여 검색합니다. **Manage credentials**은 공유 연락처-email/credential 설정을 엽니다. **Used by**는 가용성을 보여줍니다; **Manage Tags**는 Connector을 구성합니다. 리소스의 **Manage access** 제어를 사용하여 Main 에이전트 및 전문가에 대한 액세스를 검토하고 조정할 수 있습니다.

#### 각 에이전트에 대한 액세스 관리 {/* #resource-access */}

1. **Settings → Connectors** 아래 Connector을 찾아 **Manage access** 컨트롤을 선택하십시오.
2. **메인 에이전트** 및 나열된 전문가를 검토하십시오. 사용할 때 역할 목록을 검색합니다. 단지 의도 된 협회를 변경; 역할 편집기는 또 다른 방법을 유지하여 기능 목록을 관리합니다.
3. 팝업을 열고 **Used by**을 확인합니다. 바인딩은 비활성화 Specialist에 할당 될 수 있습니다; 그 역할을 할 수 없습니다.

![Connector Main 에이전트 및 개별 전문가에 대한 액세스](/img/open-science/v0330/resource-access.webp)

**Full access**의 역할에 대해, 이 Connector을 제외한 모든 리소스 예외를 만듭니다. 선택한 액세스와 역할은 명시된 목록을 사용합니다. Marketplace 역할 바인딩은 여기에서 읽기 전용일 수 있습니다. Credentials, 서버 읽기 및 가동 승인은 이 협회에서 분리됩니다; Connector을 할당하는 것은 그 단계를 완료하지 않습니다.

#### 몇몇 연결관을 활성화하거나 비활성화하십시오 {/* #enable-or-disable-several-connectors */}

**Settings → Connectors**을 열고, 목록을 필터링하고, 관련 그룹에서 **Select multiple**을 선택하고 대상 커넥터를 선택하십시오. 선택한 카운트를 활성화하거나 비활성화하기 전에, 다음 각 반환 상태 확인. 작업에 필요한 서비스만 유지하십시오. 대량 가용성 변화는 credentials를 공급하지 않으며, 공구 승인 정책 당 변화하거나 Specialist 접근 권한을 부여하지 않습니다; 그를 따로 설정한다.

#### PubMed : 가용성, 도구 및 승인 정책 {/* #pubmed-availability-tools-and-approval-policy */}

1. **팟캐스트**을 검색하고 세부 사항을 엽니다.
2. **search_articles**을 확장하여 설명을 읽습니다. PMIDs의 카운트와 페이지를 반환하고 PubMed 쿼리 태그, Boolean 연산자, 날짜 및 정렬을 지원합니다.
3. **Require approval**, **Block** 또는 **Always allow**를 선택하십시오. Require 승인 표시 **Ask when no Session, Project, or Global permission applies.**
4. **Manage access**에서 PubMed의 **Main Agent**를 활성화한 다음 **Used by**를 확인합니다. 같은 팝업에서 이 기능을 사용할 각 Specialist의 설정을 개별적으로 확인합니다.

![PubMed 도구 설명 및 승인 관리](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

상세 목록 `search_articles`, `get_article_metadata`, `find_related_articles`, `lookup_article_by_citation`, `convert_article_ids`, `get_full_text_article` 및 `get_copyright_status`. 공구 당 **Always allow**, **Require approval** 또는 **Block**를 선택하십시오. 별도의 Connector-wide **Skip approvals** 스위치를 검토하여 활성화하십시오. 설명을 열기 만 도구의 지시를 표시합니다.

디렉토리는 **Directory** 아래 PubMed를 배치, 그 세부 사항은 **Featured** 배지를 표시하면서. 디렉토리 배치 및 배지는 계정 연결 상태를 나타내지 않습니다.

<ToolOperationGroup>
<summary>작은 GEO 메타 데이터 검색을 실행</summary>

### 작은 GEO 메타 데이터 검색을 실행 {/* #run-a-small-geo-metadata-lookup */}

<p className="example-label"><strong>실습 예제</strong> GEO에서 GSE60450 샘플 메타 데이터를 찾습니다</p>

1. 연구 세션으로 돌아가고 작업 모델과 Omics Archives 가용성을 확인합니다.
2. 질문: `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. 요청된 Connector/method 및 인수를 검사하기 전에. 도구는 `accessions` 배열을 기대합니다; 추측한 단면적은 잘못되어 있습니다.
4. 실제 결과를 검토합니다. 이 접근을 위해, 반환된 **GSE60450**, **musculus의 장점**, **12 샘플**를 검사하고, “문자 및 분대 세포 subpopulations의 성적 분석은 모유 임신한 mammary 동맥에 있는”라는 제목의 “문자 분석.
5. 자신의 특성을 가진 반환된 GSM 식별자를 지키십시오. 모체의 MCL1 열 이름에 매핑하지 마십시오.

![실제 GEO 샘플 특성은 Connector을 통해 반환](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

반환된 샘플 범위는 **GSM1480291–GSM1480302**, luminal/basal 인구와 처녀, 18.5 일 임신 및 2-day lactation 단계 덮음이었다. 이것들은 메타데이터를 반환하고, 카운트 합계에서 인페레드를 표시하지 않습니다. 전체 12 줄 응답 테이블은 <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>지오 샘플-metadata.csv</a>로 다운로드되었습니다. 이것은 관리한 QC artifacts에서 분리되는 대화 테이블 수출입니다.

Connector 명령 파일이 읽을 수 없다면 EPERM 오류를 유지하고 활성화 된 Connector 및 현재 세션을 확인하십시오. retrying하기 전에 [Connector 모수](../reference/connector-operations.md)에서 작동 필드를 확인합니다. 유효한 metadata 질문은 구조화된 기록을 돌려줍니다; 그것은 underlying 소스 테이블을 다운로드하지 않거나 분석 수행.


</ToolOperationGroup>

## 커넥터 추가: shared identity 필드 {/* #add-connector-shared-identity-fields */}

**Add connector**는 **Local command**, **Remote server** 및 **Import configuration**를 제공합니다. 첫 번째 두 개의 편집기를 입력 selector, 그리고 **Advanced settings**은 추가 필드를 노출. 스크린 샷은 환상적 인 엔드 포인트를 사용합니다. 서버를 연결하면 실제로 사용할 것입니다.

| (주) | 제품정보 |
| --- | --- |
| 커넥터 유형 | 로컬 프로세스와 원격 엔드포인트 사이의 전환. |
| 표시 이름 | UI에 표시된 이름. |
| 고급 → Connector 이름 | 사용 가능한 이름 `host.mcp`, Specialist 바인딩 및 생성 된 MCP Skill; 가능한 디스플레이 이름에서 생성됩니다. |
| 커넥터 아이디 | 선택적 안정된 ID, 가능한 한 생성. 창조의 앞에 편집 가능한, 뒤에 immutable. |
| 설명 | 제공된 데이터/actions의 선택적 설명. |
| 이 커넥터를 신뢰합니다 | 사용자 정의 Connector을 추가하기 전에 필요한 신뢰 acknowledgment. 그것은 서비스를 유효하지 않거나 코드를 안전합니다. |
| 취소 / 연결관으로 돌아가기 | 자주 묻는 질문 그것은 초안을 저장하지 않습니다. |
| 연결관/추가 및 표시를 추가하십시오 | 유효한 윤곽을 저장하고, OAuth를 위해, 표시에서 시작하십시오. 버튼은 필수 필드, 바인딩, 또는 신뢰가 누락된 동안 사용되지 않습니다. |

### 로컬 명령 {/* #local-command */}

**Command**는 `npx — Node package`, `uvx — Python (uv)`, `node — script file`, `python3 — script file`, `docker — container` 및 **Other…**를 제안합니다. 다른 것은 절대 실행 가능한 경로에 **Custom command** 노출.

| 고급 입력 | 작업 |
| --- | --- |
| 인수 | 선 당 1개의 인수; 공간과 빈 라인은 보존됩니다. 모든 인수를 제거하기 위해 필드를 지우십시오. space-separated shell 명령어는 여러 인수로 파싱되지 않습니다. |
| 변수 이름 | 환경 변수를 이름을 지정하고, Credential을 지정합니다. |
| 변수 추가 / 변수 제거 | 이름 바인딩을 추가하거나 제거하십시오. |
| 현장/텍스트 | 구조 행 또는 하나로 이름을 입력하십시오. `KEY=` 선 당; Credentials에 살고있는 비밀 값. |
| 명령 미리보기 | 바인딩 후에 보이는 발사기를 검열하십시오. |

![로컬 명령 편집기 및 credential-bound 환경 변수](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

실행자 항목은 실행할 수 없거나 서비스가 운영되는 것을 증명하지 않습니다. 수입한 로컬 명령을 확인하기 위해 아래의 invocation를 사용하십시오.

### 원격 서버 {/* #remote-server */}

서버 운영자가 제공하는 실제 **Server URL**을 입력하십시오. 이 스크린 샷의 `https://example.org/mcp`은 MCP 엔드 포인트가 작동하지 않는 환상적 예약 도메인 주소입니다.

**Advanced → Transport**는 **Streamable HTTP**로 기본값입니다. **Authentication**는 **None**, **OAuth (browser sign-in)** 및 **Static headers**를 제공합니다.

#### 정적 헤더 {/* #static-headers */}

현재 편집기는 credentials 이름을 묶습니다; 그것은 일반 비밀 값 텍스트 영역이 아닙니다.

1. **Static headers**을 선택하십시오.
2. `Authorization`과 같은 **Header name**을 입력합니다.
3. **Credential**을 선택하거나 만들 수 있습니다. selector는 헤더가 이름을 가질 때까지 비활성화됩니다.
4. 다른 행 또는 **Remove header**을 위해 **Add header**을 사용하여 행을 디버깅합니다.
5. **현장/텍스트**은 이름이 입력되는 방법을 변경합니다. 텍스트 모드는 줄 당 하나의 헤더 이름을 `Name:`로 예상한다; 자격 증명 값은 별도로 관리됩니다.

![정체되는 우두머리 이름과 credential selector](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### OAuth 바인딩 {/* #oauth-binding */}

리소스 URL, 수송, 등록과 일치하는 **OAuth credential**를 선택하십시오. **New credential**는 [credential 편집기](../tools/credentials.md#new-credential)을 엽니다. 이 빈 프로파일에서, 양식은 **No OAuth credential matches this Connector's resource URL, transport, and registration.**을보고 최종 행동은 **Add and sign in**로 변경됩니다.

![OAuth 자격 일치](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## 수입, 수출 및 연결 시험 {/* #import-export-and-connection-tests */}

**Add connector → Import configuration**을 선택하고 JSON 파일을 256 KB로 선택합니다. importer는 Open-Science Connector 구성 또는 MCP 클라이언트 파일을 `mcpServers` 포함.

1. 멀티 서버 파일의 경우 **MCP server**의 입력을 선택합니다. 한 번에 하나의 서버를 검토하고 추가합니다. 항목 전환 후 이름, ID, 수송 및 명령 인수를 확인합니다.
2. 진단을 읽으십시오. 절대 경로는 다른 컴퓨터에서 변경할 수 있습니다; credential 값은 수입에서 제외됩니다.
3. **Use configuration**을 선택하여 사전 작성된 편집기를 엽니다. 모든 필드를 검토하고 필요한 로컬 자격 증명을 결합하고 **I trust this connector**을 선택합니다.
4. **Add connector**을 선택하면 목록의 연결 상태를 검사 한 다음 작은 읽기 전용 도구를 호출합니다.

![서버 선택 및 필요한 자격 증명을 검토](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

수입된 서버가 `QC_EXAMPLE_TOKEN`과 같은 환경 변수를 참조할 때, 이 장치에 저장된 자격 증명에 이름을 바인딩합니다. **Add**은 필수 바인딩이 완료 될 때까지 사용할 수 없습니다. 추가 후 **Connected**을 확인하고 의도한 도구를 실행하십시오. 저장된 바인딩은 원격 인증을 유효하지 않습니다.

`get_dataset_summary`을 호출하면 `get_sample_qc`에 전체 샘플 ID를 반환합니다. [QC 기준](../reference/example-data.md)과의 응답을 비교합니다. 이 서버는 저장된 요약 값을 반환합니다; 그것은 원래 matrix를 recompute하지 않습니다. 서버 구현은 [사용자 정의 도구 만들기](../tools/custom.md)에 덮여있다.

### 수출 및 reimport {/* #export-and-reimport */}

행의 **Actions → Export**을 선택, **Open Science Connector** 또는 **MCP client config**를 선택, 미리보기를 검사하고 **Save configuration**를 선택합니다.

![수출 유지 credential 이름 및 현지 경로보고](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

실제 수출된 파일은 `required_secrets.environment`의 변수 이름을 유지했습니다. 그것은 데모 자격 증명 값, 로컬 신뢰 또는 권한이 없습니다. Reimport는 지역 자격 선택과 신뢰를 다시 요구합니다.

같은 ID가 이미 존재할 때 미리보기는 **ID가있는 사용자 정의 Connector ... 이미 설치** 및 **Use configuration**이 사용할 수 없습니다. 기존 연결을 변경하려면 **Edit**을 사용하십시오. import는 중복 동작이 아닙니다.

![기존 ID 블록 중복 수입](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

수출 연결을 복원 할 때, 미리 채워진 필드를 검사하고 자격 증명을 다시 바인딩합니다. 신뢰를 완료하고 연구에서 사용하기 전에 경계 전화를 테스트합니다. 기존 Connector을 동일한 ID로 덮어쓰지 않습니다.

## Credentials: 서비스 및 재사용 가능한 비밀 {/* #credentials-services-and-reusable-secrets */}

[서비스 자격](../tools/credentials.md)에서 비밀을 만들고 관리하고, 환경, 헤더 또는 OAuth 바인딩의 이름을 선택합니다. 새로운 장치에서 이러한 바인딩을 복원하고 연결 테스트를하기 전에 서비스의 서명을 완료하십시오. 수출은 구성 참조, 쓸모없는 비밀 또는 현지 신뢰를 포함합니다.

## HTTP 오류 조회 {/* #http-error-lookup */}

400, 401, 403, 404, 429 또는 5xx 응답을 위해, [HTTP 문제 해결 테이블](troubleshooting.md#http-errors-400-403-429-and-5xx)를 사용하십시오. 응답 서비스 및 상태 코드와 상세한 메시지 유지.
