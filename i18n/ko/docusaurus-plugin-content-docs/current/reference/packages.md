---
title: "Skill, Specialist 및 MCP 형식"
last_update:
  date: '2026-09-08'
---

# Skill, Specialist 및 MCP 형식 {/* #skill-specialist-and-mcp-formats */}

Skills, 전문가 및 Connector 템플릿에는 다른 패키지 경계가 있습니다. 이 참조는 필드와 수입 예산을 나열합니다. 가져오기 전에 아카이브 미리보기를 검사, 다음 설치 결과를 확인.

## Skill 문서 및 리소스 {/* #skill-document-and-resources */}

Skill 뿌리는 `SKILL.md`를 포함합니다; 참고 및 스크립트는 동일한 패키지 루트 아래 라이브. 그것의 메타데이터 블록은 Markdown 지침에 따라 YAML입니다.

<p className="example-label"><strong>예시</strong> 최소 SKILL.md 문서</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

파서는 다른 메타데이터에서 `name` 및 `description`을 분리하고 라인 종료를 정상화하고 문자열로 scalar 메타데이터 값을 유지한다. 패키지 발행하기 전에 import/editor validation 결과를 확인합니다.

| 패키지 요소 | 제품 정보 | 언어: 영어 |
| --- | --- | --- |
| `name` | 안정적인 invocation 정체성 | 패키지에 대한 참조와 일관성 유지 |
| `description` | 대리인이 Skill를 선정해야 할 때 | 자체로 아무것도 실행하지 않습니다. |
| Markdown 몸 | invocation에 적재되는 지시 | 지원되는 지시는 그것의 외부 의존성 존재한다는 증거가 아닙니다 |
| 관련 자료 | 스크립트, 템플릿, 참조 및 데이터 | 포장 구조 안쪽에 참고된 경로 유지 |
| `.source.json`, `.specialist-package.json` 뚱 베어 | App-owned 메타데이터 | user-authored 패키지 예산에서 제외; 이 파일을 발명하거나 재구성하지 마십시오. |

### Skill 수입 예산 {/* #skill-import-budgets */}

| 최대 개수 | 값 |
| --- | ---: |
| 하나의 Skill 파일 | 16,384 |
| 개인 decompressed 파일 | 50 미B |
| 총 압착 Skill | 128 미B |
| Aggregate raw SKILL.md content 에 한 미리보기 응답 | 4 미B |
| 디렉토리 배열 | 8 수준 |
| 가져 오기 당 GitHub 요청 | 512 |
| 압축된 Skill 아카이브 | 64 미B |
| 외부 업로드 번들 | 256 미B |
| 뭉치 당 Skills | 256 |
| 외부 뭉치 항목 | 32,768 |

예산은 다른 수준에 적용됩니다. 외부 한계의 밑에 뭉치는 여전히 내부 한계를 초과하는 Skill를 포함할 수 있습니다. 각 후보자의 진단을 검토; 모든 후보가 성공함에 따라 부분 수입을 해석하지 마십시오. Personal-editor reference-file counts는 SKILL.md를 위한 1개의 패키지 항목을 예약합니다.

[Skill 파서](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [공유 수입 제한](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Specialist 패키지 {/* #specialist-package */}

휴대용 Specialist 패키지에는 `manifest.json` 및 `specialist.json`가 포함되어 있습니다. Skill 자원 사용 `skills/<skill-name>/<file>`, 각 Skill 루트에서 `SKILL.md`와 함께. frontmatter 이름은 디렉토리 이름과 일치해야합니다.

| 파일 / 필드 | 회사연혁 |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | 패키지 정체성; 기여 ID 사용 하 여 더 낮은 케이스 문자/디지털/hyphens 및 피 예약 `os-` / `mcp-` 연락처 |
| `version` | Semantic 버전 |
| `exported_with_app_version` | 수출 신청 버전 |
| `specialist.json → name` | Stable Specialist 프로필 이름 |
| `display_name` | 선택된 발표 이름 |
| `description` | 역할 설명 |
| `system_prompt` | Specialist 지시; 패키지 경계에 snake_case |
| `skill_ids` | 중복 없는 Skill 이름의 배열 |
| `connector_ids` | 중복 없는 Connector 이름의 배열 |

unknown 또는 forbidden 필드가 거부됩니다. In-memory payloads 사용 camelCase (`systemPrompt`, `skillIds`, `connectorIds`), 휴대용 JSON 필드 맞춤법과 혼동하지 않아야합니다. 휴대용 Connector 이름은 수입에 기계 지역 ID에 해결할 수 있습니다; 포장 참고는 기계 credentials를 나르지 않습니다.

| Specialist 아카이브 제한 | 값 |
| --- | ---: |
| 압축 크기 | 50 미B |
| Uncompressed 크기 | 200 미B |
| 파일 개수 | 2,000 |
| 개인 파일 | 25 미B |
| 압축 비율 | 1,000 |
| 경로 깊이 | 32 |

가져 오기 미리보기는 설치 및 각 Skill 분해 여부 진단을보고합니다. 설치, 재사용, 충돌 또는 교체. overwrite는 명시된 확인을 요구합니다. stale 또는 만료 된 후보는 다시 미리보기해야합니다. 토큰을 블라인드로 재생하지 마십시오. Skill 충돌은 명시된 설치 / 들어오는 선택이 필요합니다.

수출은 예상 개정을 사용하고 선택한 Skills을 사용합니다. Deletion은 미리보기/revision을 사용하며 내장, 기본 사용 가능, 공유 또는 참조된 Skills을 보호합니다. Specialist을 제거하면 모든 Skill을 삭제할 수 없습니다.

[패키지 유형 및 아카이브 예산](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [패키지 유효성](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## Connector 템플릿 및 MCP 클라이언트 수출 {/* #connector-template-and-mcp-client-export */}

Open-Science Connector 템플릿은 MCP 클라이언트의 `mcpServers` 구성과 같은 JSON 문서가 아닙니다.

| 템플릿 필드 | 회사연혁 |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | 안정되어 있는 주문 이름, 64 특성, 더 낮은 케이스 편지/디지털/hyphens까지; 고유하지 않은 내장 된 이름 |
| `display_name` | 인간 읽기 쉬운 상표 |
| `description` | 옵션 설명 |
| `transport` | `stdio`, `streamable_http`, 또는 `sse` |
| `command`, `args` | 로컬 stdio executable 및 인수 목록 |
| `url` | 먼 HTTP/SSE 엔드포인트 |
| `required_secrets.environment` | stdio를 위한 환경 비밀의 이름; 그들의 가치 |
| `required_secrets.headers` | HTTP 헤더 비밀의 이름; 그들의 가치 |
| `required_secrets.oauth_client_secret` | OAuth 클라이언트 비밀이 로컬로 공급되어야 함 |
| `oauth` | 지원되는 등록/issuer/scopes/client/redirect 메타데이터 |

운송 별 유효성 적용 : 원격 운송은 필수 환경 비밀을 포함하지 않습니다. OAuth 및 필수 헤더 비밀은 결합 할 수 없습니다. 사전 등록 된 OAuth 클라이언트는 승인 서버가 필요합니다. 클라이언트 메타데이터 등록 및 명시된 클라이언트 ID는 별도의 모드입니다. Redirect/client-secret 메타데이터는 해당 클라이언트 ID를 요구합니다.

휴대용 수출은 URL 및 명령 인수에 내장 된 자격 증명을 거부합니다. MCP 고객 수출 용도 `mcpServers`· `command`/ / /`args`/ / /`env` stdio 또는 `type`/ / /`url`/ / /`headers` 원격 수송을 위해, secret placeholders로. OAuth 등록 및 토큰은 그 클라이언트 형식으로 제외되며 수출은 제한을 보여줍니다.

Importing Configuration은 외부 서버를 설치하지 않으며 서비스에 로그인하거나 성공적인 도구 실행을 설정하지 않습니다. 연결 상태를 확인하고 응용 프로그램을 통해 자격 증명을 공급 한 후 광고 도구를 검사합니다.

[템플릿 파서 및 내보내기 형식 모두](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [사용자 정의 Connector ID](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
