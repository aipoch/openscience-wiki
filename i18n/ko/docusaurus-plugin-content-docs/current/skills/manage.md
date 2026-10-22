---
title: "Skills 관리 및 검증"
last_update:
  date: '2026-10-22'
---

# Skills 관리 및 검증 {/* #manage-and-validate-skills */}

로컬 파일 또는 GitHub, 수출 사본 및 설치 Skills에서 테스트 방법을 가져옵니다. 현재 버전을 유지해야하는 경우 먼저 방법을 내보내십시오.

배치 관리에서, 가동을 적용하기 전에 밑바닥 활동 지역에 있는 선정한 조사를 검토하십시오. 완료 또는 실패 피드백을 읽고, 그 결과 항목을 확인합니다. 혼자 입장을 선택하면 활성화, 설치 또는 삭제할 수 없습니다.

## 시장에서 설치 {/* #marketplace */}

카탈로그 검색, 설치 및 업데이트, [Skill 시장 가이드](marketplace.md)을 따르십시오. 이 장은 로컬 및 GitHub 가져 오기, 수출 및 설치 Skills의 유지 보수를 포함합니다.

## 수출 및 수입 로컬 패키지 {/* #export-and-import-a-local-package */}

<p className="example-label"><strong>예시</strong> RNA-seq Skill 수출 및 수입</p>

1. **Settings → Skills**에서 `rnaseq-count-qc`을 찾아 **Actions → Export**를 선택하십시오. ZIP을 저장합니다.
2. **Add skill → Upload skills → Upload skill files**을 선택하고 ZIP을 선택합니다.
3. **Confirm import**에서 소스 파일명과 진단을 검사합니다. Candidates는 초기 검사되지 않습니다.
4. **미리보기 rnaseq-count-qc**을 엽니다. SKILL.md 및 파일 목록 읽기. 실제 수출은 `references/sample-metric-schema.md`을 보존했습니다.
5. 가까운 미리보기, 후보자를 선택하고 **선택된 수입 (1)**을 선택합니다.
6. 수입한 줄을 검색하고 최종 이름과 소스를 검사합니다.

![수입하기 전에 전체 패키지를 검사](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

이 예에서 원래 개인 Skill이 이미 존재했습니다. 미리보기는 **Name exists**을 표시하고, 별도의 **가져옴 `rnaseq-count-qc-2`**을 생성했습니다. 원래 Specialist 바인딩이 남아 있습니다. 기존 패키지를 업데이트하는 모든 수입을 가정하지 마십시오; 후보자의 근원 및 갱신/replace 진단을 검열하십시오.

![수입된 사본 및 본래 개인적인 Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| 수입 통제 | 제품정보 |
| --- | --- |
| 모든 선택 / Invert / 후보 체크 박스 | 패키지를 가져올 수 있는 선택; 하나의 아카이브는 여러 Skills을 포함 할 수 있습니다. |
| 미리보기 / 닫기 미리보기 | 설치하기 전에 지침 및 파일을 읽으십시오. |
| 이름은/진단 존재합니다 | 정체성 또는 콘텐츠 문제에 대한 경고. importing 후 resulting name 을 확인합니다. |
| 다른 파일 선택 | 현재 후보를 대체합니다. |
| 선택 항목 가져오기 | 선택한 수입을 수행하고 성공, 변경되지 않은 패키지 또는 실패를보고합니다. |

Markdown 업로드는 YAML `name` 및 `description`가 필요합니다. ZIP/`.skill` 번들 필요 SKILL.md. 로컬 업로드는 지침에 내장 된 URL에서 누락 된 파일을 fetch하지 않습니다. 지원되지 않은 형식, 누락 된 메타 데이터, 아카이브 크기 제한 및 안전 아카이브 경로는 유효성 검사를 비활성화하는 이유가 아닙니다.

## 이미 로컬 Skill을 설치 {/* #import-an-already-installed-local-skill */}

<p className="example-label"><strong>예시</strong> 로컬 피어 리뷰 패키지 가져 오기</p>

**Add skill → Import installed skills**는 `~/.agents/skills`와 `~/.codex/skills`를 검사합니다. 이 예에서 로컬 스캔은 68 후보를 발견했습니다. Clear **Select all installed skills**, 다음 특정 방법을 선택; **Invert**만 사용 가능.

1. **프리뷰 피어-리뷰**을 열고 소스 폴더, 지침 및 참조 된 파일을 검사합니다.
2. **Close preview**을 선택하면 `peer-review`만 선택하면 **선택된 수입 (1)**만 선택합니다.
3. **수입된 1 기술**에 대한 대기. 후보자는 **Imported**을 라벨링하고 다시 동일한 수입을 선택할 수 없습니다.
4. Skills로 돌아와 `peer-review`을 검색하고 수입 된 행을 검사합니다. 소스 폴더는 장소에 머물; Open-Science는 수입한 사본을 이용합니다.
5. 설치 폴더를 변경한 후 **Rescan**을 사용하십시오. 다시 수입하기 전에 원산지, 선택 및 상태를 확인합니다.

![로컬에 설치된 피어 리뷰 패키지 미리보기](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![Skills 목록에서 가져온된 패키지 찾기](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

가져 오기 후, Skill 세부 사항에 템플릿 및 참조 파일을 검사합니다. 다른 조수에서 방법을 사용하기 전에 필요한 도구와 실행 기능이 세션에서 사용할 수 있는지 확인하십시오.

## GitHub에서 가져 오기 및 업데이트 {/* #import-and-update-from-github */}

<p className="example-label"><strong>예시</strong> ESM-2 Skill 가져오기 및 업데이트</p>

1. **Add skill → Import from GitHub**을 선택하십시오. 키워드를 입력, `owner/repo`, `owner/repo@ref` 또는 GitHub URL, 다음 **Find skills**를 선택합니다. reproducible 포장 근원을 위한 조정 ref를 사용하십시오.
2. 저장소 및 후보 수를 읽으십시오. 이 스캔은 처음 선택된 모든 후보자; 필요한 방법을 선택하기 전에 명확한 **Select all**. 확인되지 않은 ZIP 확인 화면과 다릅니다.
3. **Preview**을 열고 해결된 커밋, 폴더, 지침 및 파일을 확인합니다. 저장소 검사는 내부 폴더뿐만 아니라 Skills을 사용자 인터페이스 할 수 있습니다; 그것의 조사는 앱의 번들 Skill 조사가 아닙니다.
4. Close 미리보기를 선택하고, 의도한 후보자를 선택하고 **선택된 수입 (1)**을 선택합니다. 결과를 기대하고 **Imported skills**의 이름을 확인합니다.
5. Skills로 돌아가 그 이름을 검색합니다. 그것을 사용하기 전에 소스와 가용성을 검사합니다.

![GitHub Skill 및 수입하기 전에 핀 소스를 검토](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

제품 저장소에서 `fair-esm2` 가져 오기가 이미 존재했기 때문에 **`fair-esm2-2`**을 만들었습니다. 내장 패키지가 남아 있습니다. 수입 지시는 모형 무게를 설치하지 않거나 그 inference 일을 설치하지 않습니다.

### 업스트림 개정 적용 {/* #apply-an-upstream-revision */}

새로운 정제를 가진 동일한 저장소를 검사하십시오. 기존 후보자는 **Update available**을 보여줄 수 있습니다. 그 후보자 만 선택하고 가져 오기; 기존의 수입 행과 미리보기를 검사합니다. ESM-2 체크에서, 동일한 `fair-esm2-2` 사본은 개정되고, 다시 **Imported**를 보여주는 스캐닝. 업데이트 된 지시 몸은 저장소 소스 일치. importer는 frontmatter와 충돌 안전 이름을 씁니다. 그래서 전체 파일 바이트는 원래 SKILL.md와 일치하지 않습니다.

![상류 개정은 수입한 사본을 위해 유효합니다](/img/open-science/local-todo-batch/16-github-update-available.webp)

### GitHub 속도 제한에서 복구 {/* #recover-from-github-rate-limiting */}

**GitHub 요청은 rate-limited**의 경우 **Manage GitHub credential**을 열고 사용 가능한 토큰을 입력하고 **Verify and save**를 선택합니다. **토큰 검증 및 저장** 후 스캔을 재개합니다. 저장하지 않고 **Cancel** 잎. 스크린 샷 및 문제 보고서에서 토큰을 유지하십시오.

## 비활성화 및 삭제 {/* #enable-disable-and-delete */}

**Manage**, 소스/status 필터를 열고 특정 방법을 검색합니다. 행동을 적용하기 전에 결과를 선택합니다. **선정 (n)**는 선택을 보여줍니다; **Clear selection**는 그것을 empties. 필터 변경시 전체 선택된 세트를 검토합니다.

![대량 관리에서 수입된 복사본 사용](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

가용성을 변경한 후, Skill 세부 사항을 다시 열 수 있습니다. 그것을 삭제하기 전에 필요한 방법의 수출을 유지하십시오.

| (주) | 예상 결과 |
| --- | --- |
| 선택 사항 | 선택한 대상 패키지를 다시 사용할 수 있습니다. 행 상태를 확인합니다. |
| 선택 해제 | 자격이 된 사용자 통제 패키지를 유지하지만 나중에 요청을 위해 Main 에이전트 가용성을 제거합니다. 신청 필요 Skills는 무능할 수 없습니다. |
| 자주 묻는 질문 | 정확한 선택된 이름과 탈수성 결과를 가진 확인을 엽니다. |
| n Skills 삭제 | 확인 후 해당 지역 패키지를 제거하십시오. Skill trash/restore 워크플로우가 없습니다. |
| 취소 | 패키지를 설치합니다. |

추천 및 Specialist 연결 패키지는 삭제에서 보호 될 수 있습니다. 사용되지 않은 바인딩을 제거하거나 적절한 경우 사용자 제어 패키지를 비활성화하십시오. 신청 필요 Skills 체재 활성화; [활성화 규칙](overview.md#why-some-switches-cannot-be-turned-off) 참조. 삭제 후, 선택한 패키지를 필터링 목록에서 absent 확인합니다.

## 업데이트 및 진단 {/* #update-and-diagnose */}

| 관련 기사 | 확인 및 다음 작업 |
| --- | --- |
| 목록에서 수입되었지만 absent | 명확한 근원, 대리인 및 꼬리표 여과기; suffixes를 포함한 결과 이름을 검색합니다. |
| 파일 가져 오기 후 누락 | 패키지 파일 목록 및 재 수출 검사; 단일 Markdown 파일은 별도의 참조 파일을 자동으로 포함 할 수 없습니다. |
| 편집 중의 개정 | 최신 버전을 다시 열고 변경을 비교하고 deliberately 저장합니다. |
| Skill로드하지만 기능은 사용할 수 없습니다 | 패키지가 실제로 커널 헬퍼를 제공하는지 확인; 정규적인 지시는 Notebook 기능 아닙니다. |
| 미스링 패키지 / runtime | 제품 정보 [과학 도구](../tools/scientific.md) 선택된 런타임 패키지 관리자. |
| GitHub/authentication 오류 | 실제 HTTP 상태 및 위생 소스 URL을 유지; 은 은 [문제 해결](../guides/troubleshooting.md). |

구현 참조 : [기술업로드View.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [기술BulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [기술ImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx).

## Skill을 안전하게 가져오고 편집하기 {/* #import-batches */}

많은 설치 Skill은 일괄 단위로 가져옵니다. 최종 결과와 가져온 목록을 확인한 뒤 재시도하세요. 예약 접두사가 있는 외부 Skill에는 안전한 로컬 이름이 부여되므로 로컬 목록에 표시된 이름을 사용합니다. 본문을 저장한 뒤 별도로 편집한 이름과 설명이 유지되는지 확인하세요. 현재 메시지의 첨부 이미지도 Skill 선택에 활용되므로 실행 전에 선택된 Skill의 범위를 확인하세요.
