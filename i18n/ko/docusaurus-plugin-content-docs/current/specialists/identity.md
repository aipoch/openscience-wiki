---
title: "Specialist 생성 및 지시"
last_update:
  date: '2026-11-11'
---

# Specialist 생성 및 지시 {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>예시</strong> RNA-seq QC Reviewer 역할 만들기</p>

**RNA-seq QC 검토자** 을 생성하여 원시세 결과를 독립적으로 확인합니다. 예를 들어 식별자, 숫자의 완전성 및 arithmetic invariants에 초점을 맞추고,이 경계 체크 바깥의 생물학적 해석을 유지.

## 책임 testable {/* #make-the-responsibility-testable */}

상태 입력 및 예상 출력, 뿐만 아니라 "당신은 전문가입니다." QC 검토자는 정확히 어떤 테이블을 읽고 통과했는지보고해야합니다. metadata-only 리뷰는 원본 수를 재조정하지 않아야 합니다. 파일 handoff를 위해, 앱에 의해 반환된 현재 immutable 버전을 사용하십시오; 파일명은 버전의 ID가 아닙니다.

저장된 역할은, reopened, 수출, 복제하고 진짜 delegated 인라인 CSV 검토에서 사용되었습니다. 그것의 독립적인 arithmetic는 모든 12의 표본 invariants를 통과했습니다. [Delegate 및 검증](./delegate.md) 을 보시면 경계와 파일 핸들링 제한이 있습니다.

## 역할 만들기 {/* #create-the-role */}

1. **Resource center → Specialists → Add specialist → Write from scratch**을 엽니다.
2. **RNA-seq QC 검토자**을 이름과 **추적 가능한 공중 생물 의학 입력을 사용하여 Raw-count 무결성과 표본 미터를 검사하십시오.**로 입력하세요.
3. 아이콘과 색상을 선택하세요. 예는 **뇌 / 보라색**을 사용합니다. 라이브 미리보기는 list/picker 외관을 보여줍니다.
4. **Advanced settings**을 확장하고 생성하기 전에 생성 된 ID `rna-seq-qc-reviewer`을 검사합니다.
5. 아래 지침을 입력하십시오.
6. **Full access**을 해제하고 RNA-seq Skill 및 Omics Archives를 [기능](./capabilities.md)에서 표시된 상태에서 **Create specialist**를 지정합니다.
7. 저장된 행을 검색하고 다시 엽니다. 정확한 ID, 지시 및 2개의 기능 바인딩을 확인하십시오.

![영어 Specialist 편집기의 ID 필드](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### 에디터의 선택 {/* #editor-controls */}

| (주) | 의미와 한계 |
| --- | --- |
| 아이콘/색깔 | 외관 만; 이 변경은 모델이나 액세스를 변경하지 않습니다. |
| 이름 | 요구 사항; 최대 80 문자. |
| 설명 | 선택 사항; 최대 1,000 문자. 역할을 선택할 때 설명합니다. |
| 고급 설정 → Specialist ID | 생성하기 전에 생성; 이후 변경할 수 없습니다. 명시된 위임에 저장된 ID를 사용하십시오. |
| 지침 | 최대 32,768 문자. 기본 프롬프트에 승인; 도구 또는 액세스 규칙을 대체하지 않습니다. |
| 전체 액세스 | Inherits Main 대리인의 Skills/Connectors; 승인 모드의 독립적. |
| Skills / 커넥터 | Full Access가 꺼질 때 Explicit 바인딩. |
| 취소 | 초안을 나눕니다. |
| 스페셜리스트 만들기 | 새로운 역할을 저장합니다. |
| 표시 이름 / 패키지 버전 / 변경 저장 | 기존 / 수입 패키지를 편집 할 때 Appears. 저장한 ID는 조정 남아 있습니다. |

구현 참조 : [전문가Editor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
