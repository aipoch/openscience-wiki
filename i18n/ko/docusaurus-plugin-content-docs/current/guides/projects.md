---
title: "프로젝트 및 소스 폴더"
last_update:
  date: '2026-11-11'
---

# 프로젝트 및 소스 폴더 {/* #projects-and-source-folders */}

프로젝트는 연구 질문을위한 작업 컨테이너입니다 : 그룹 세션, 소스 파일 및 생성 된 결과. **Agent Context**은 그 프로젝트에서 모든 세션에 대한 내구성 지침을 제공합니다. 연구 질문이나 허가 된 소스 자료가 변경 될 때 별도의 프로젝트를 시작합니다.

<span id="example-prepare-a-systematic-review-reading-pack" />

이 프로젝트에 기존의 연구 기록을 가져 오기 위해 [세션 패키지 가져오기](research-packages.md)을 사용하십시오. 수입된 회의는 읽기 전용입니다; 새로운 작업을 위한 정상적인 세션을 만듭니다.

## 프로젝트 만들기 {/* #create-a-project */}

<p className="example-label"><strong>실습 예제</strong> 체계적인 검토 독서 팩을 준비하십시오</p>

우리의 예 프로젝트는 **PRISMA - Systematic review reading pack**입니다. 그것은 verifiable bibliographic 기록과 독서 순서를 유지하는 목표와 더불어 간행한 보고 가이드라인 종이를 이용합니다. 이 컬렉션 제작 작업은 완료된 체계적인 검토가 아닙니다.

1. 홈에서 **New project**을 선택합니다. 기존의 작업 공간에서 프로젝트 이름 메뉴는 동일한 항목을 제공합니다.
2. 아래 필드를 입력합니다. **Agent Context**의 생물학적 및 증거 규칙을 유지하십시오.
3. **Create project**을 선택합니다. 왼쪽 사이드바가 프로젝트 이름을 표시하고 메인 패널은 **New conversation**을 엽니다.
4. 프로젝트 이름 메뉴와 **Project settings**을 열고 저장된 값을 확인합니다. 성공적인 프로젝트 득점방해는 모형 readiness에서 분리됩니다.

![명시된 연구 목적과 Agent Context를 가진 PRISMA 프로젝트](/img/open-science/local-acceptance/prisma-project-form.webp)

| 필드 또는 버튼 | 예 또는 작업 | 어떤 변화 |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | 필수 표시 이름; 최대 200 문자. 빈 또는 whitespace-only 입력은 제출할 수 없습니다. |
| **Description** | `Build a source-checked reading collection for researchers preparing a systematic review.` | 1,000 문자까지 선택 가능 프로젝트 목록에서 Appears; 그것은 대리인 지시로 보내지 않습니다. |
| **Agent Context** | 아래 지침을 사용하십시오. | 16,000 문자까지 선택 가능 신규 및 재시작 에이전트 세션에 포함 하 고 선택한 모델 공급자에 전송. |
| **Create project** | 유효한 양식을 저장합니다. | 프로젝트 생성 및 작업 공간을 엽니다. 저장 오류는 양식에서 볼 수 있습니다. |
| **Cancel**, **Close** | 초안을 없애라. | 프로젝트가 생성되지 않습니다. 제출이 끝나는 동안 허용되지 않습니다. |
| **Save** 프로젝트 설정 | 편집 된 프로젝트를 저장합니다. | 기존 프로젝트 업데이트; 세션을 중복하지 않습니다. |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

## 소스 파일에 대한 프로젝트 접근 {/* #give-a-project-access-to-source-files */}

프로젝트는 자동으로 컴퓨터의 폴더를 노출하지 않습니다. **Files**을 열고 기존 디렉토리에서 작업 할 때 로컬 폴더 항목을 선택합니다. 폴더 선택은 위치를 선택합니다; 후속 권한 프롬프트는 허용된 접근을 결정합니다. 선택된 경로 및 액세스 모드를 확인하기 전에.

소스 자료를 검토 할 때 읽기 전용 액세스를 사용합니다. 프로젝트로 유지되는 소스가 필요한 경우 관리 된 프로젝트 복사를 저장하십시오. 로컬 파일 미리보기 및 관리 업로드에는 다른 수명주기가 있습니다. 외부 파일을 이동하면 원래 경로가 끊을 수 있습니다. 관리 된 복사는 응용 프로그램 저장소에 남아 있습니다.

액세스 변경은 활성 커널이 이전 구성에서 액세스 할 수 있기 때문에 Notebook 확인을 취소 할 수 있습니다. 완료 또는 커널 재시작을 허용하기 전에 관련 작업을 중지합니다. 폴더를 선택하면 모든 파일이 모델에 의해 읽었는지 증거가 없습니다.

## 변경 또는 계속 프로젝트 {/* #change-or-continue-a-project */}

Project-name 메뉴를 사용하여 프로젝트를 전환합니다. 다음 조사가 자신의 성적표를 필요로 할 때 **New**과 세션을 시작하면서 동일한 프로젝트 컨텍스트를 유지하면서. **Project settings**을 사용하여 내구성을 개선하십시오. 수정된 규칙에 대한 다음 요청을 확인, 이미 생성 된 결과가 자동으로 업데이트되지 않기 때문에.

**Download artifacts…**는 산출 가동입니다. 프로젝트가 생성 된 artifacts가 없을 때 비활성화 될 수 있습니다. 소스 파일을 혼자 업로드하면 생성 된 결과를 만들 수 없습니다. **Settings → Archived**을 통해 복구를 유지하면서 활성 탐색에서 제거 할 때 보관 완료 작업.

## 결과 확인 및 문제에서 복구 {/* #confirm-the-result-and-recover-from-problems */}

| 오시는 길 | 해석과 다음 단계 |
| --- | --- |
| 프로젝트 이름 표시, 하지만 전송은 사용할 수 없습니다 | 프로젝트 생성 성공. 【특전】 **Settings → Agent** 그리고, **Settings → Model** 별도. |
| 에이전트는 설명에서 작성된 지침을 무시합니다. | 자주 묻는 질문 **Agent Context** 그리고 새로운, 명시된 요청을 보냅니다. 묘사는 조직적인 metadata입니다. |
| Folder opens 하지만 쓰기 이다 denied | Read-only permission은 검사, 수정하지 않습니다. 파생된 artifact를 저장하거나 요청한 쓰기 범위를 검토하십시오. |
| 자주 묻는 질문 | 공백 전용 이름과 체크 필드 길이를 제거하십시오; 다른 저장이 종료되면 대기합니다. |
| 다른 프로젝트는 선택 | 문서에 첨부하거나 요청을 보내기 전에 프로젝트 제목을 확인하십시오. |

## 질문 최적화 템플릿 설정 {/* #optimization-template */}

프로젝트 이름 메뉴 열기 → **Project settings → Advanced agent options → Optimization prompt**· 이 프로젝트의 질문에 대한 답변을 입력하고 저장하십시오. 내장 기본을 사용하려면 빈을 두십시오. 동일한 분야는 아래에 유효합니다 **New project → Advanced agent options**.

이 필드는 선택할 때만 실행됩니다. **Optimize question**· 그것은 분리됩니다 **Agent Context**프로젝트의 에이전트 세션에 대한 지침을 공급하는 , 및 **Description**당신의 참고를 위해 인 .

<p className="example-label"><strong>이름 *</strong> 교육 질문의 한계를 보존</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![프로젝트의 고급 에이전트 옵션 아래 사용자 정의 최적화 신속한](/img/open-science/v121/optimization-template.webp)

Composer로 돌아가기 [초안 최적화](composer.md#optimize-question)· 보내기 전에 rewritten 텍스트를 검토하십시오. 템플릿은 서면 지침이며 과학 검증 규칙이 아닙니다.
