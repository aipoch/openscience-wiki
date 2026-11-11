---
title: "전문가 관리 및 공유"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 전문가 관리 및 공유 {/* #manage-and-share-specialists */}

구성 된 역할을 이동하기 위해 패키지를 사용하여 수입 후 로컬 설정을 완료하십시오. Skills, Connector 참조 및 로컬 권한은 다른 휴대성 규칙이 있습니다.

배치 관리에서, 가동을 적용하기 전에 밑바닥 활동 지역에 있는 선정한 조사를 검토하십시오. 완료 또는 실패 피드백을 읽고, 그 결과 항목을 확인합니다. 혼자 입장을 선택하면 활성화, 설치 또는 삭제할 수 없습니다.

## 목록 제어 {/* #list-controls */}

| (주) | 가동과 예상된 결과 |
| --- | --- |
| 검색 전문가 / 범주 필터 | 좁은 설치 행; 저장된 역할이 누락된 경우 명확한 필터. |
| 편집 / 역할 이름 | 기존 편집기를 엽니다. 변경을 저장하고 확인을 다시 시작합니다. |
| 변화 외관 | 변경 지침없이 아이콘 / 색상 변경. |
| 태그 관리 | 조직 라벨을 할당합니다. |
| (주)삼성 | 그것을 삭제하지 않고 역할을 할 수 있습니다. |
| 행동 → 중복 | 복사된 지시/빈딩 및 복사 이름을 가진 새롭 초안을 엽니다. 전문가가 여전히 필요합니다. |
| 행동 → 수출 ZIP | 수출 선택을 열고 휴대용 포장을 저장합니다. |
| 행동 → 삭제 | 영원한 삭제 확인을 엽니다; 선택 사양 Skill의 삭제를 별도로 검사합니다. |

역할을 삭제하기 전에 Skills을 삭제하는 옵션을 검사합니다. 다른 역할이 여전히 그들을 사용하는 경우 공유 Skills 유지. 중복을 삭제하는 것은 원래의 역할을 삭제하지 않습니다.

![공유 Skills을 유지하면서 일회용 역할을 삭제](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## 공유 및 패키지 가져 오기 {/* #share-and-import-a-package */}

### 필요한 Skill 파일로 내보내기 {/* #export-with-the-required-skill-files */}

<p className="example-label"><strong>예시</strong> Skill에 대한 리뷰 작성자 역할 공유</p>

1. RNA-seq QC 검토자에 **Actions → Export ZIP**를 선택하십시오.
2. **Choose Skills to include**에서 수신자가 파일을 필요로 하는 경우 `rnaseq-count-qc`을 명시적으로 선택합니다. 설치된 개인/수입 Skill 기본적으로 포함되지 않습니다.
3. 수출하고 공유하기 전에 아카이브를 검사합니다.

![Specialist 패키지에 포함하려면 Skill 선택](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

실제 <ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">Skill와 패키지</ExampleDownload>에는 `manifest.json`, `specialist.json`, `skills/rnaseq-count-qc/SKILL.md` 및 참조 스키마가 포함되어 있습니다. 최소 수출은 두 JSON 파일을 포함 할 수 있습니다. Connector ID는 참고입니다; credentials, 현지 신뢰 및 전체 액세스는 사용 허가로 전송되지 않습니다.

### 수입, 분쟁 해결, 완료 설정 {/* #import-resolve-conflicts-finish-setup */}

1. **Add specialist → Import ZIP → Choose ZIP**을 선택합니다. 1개의 포장은 정확하게 1 Specialist를 포함합니다. **Download template**은 애플리케이션 패키지 템플릿을 제공합니다.
2. 이름, immutable ID, 버전, 번들된 Skills, 아카이브 한계 및 진단을 검사하십시오.
3. 각 Skill 충돌을 위해, **Keep installed Skill** 또는 **Use package Skill**를 선택하십시오. 두 번째 선택은 Skill의 모든 현재 사용자에 대한 파일을 대체; **지금 예약**을 읽으십시오.
4. 기존 Specialist ID의 경우 **Review overwrite**을 선택하여 현재/입출판을 검사하고 필요한 경우 현재 버전을 먼저 수출합니다. **Overwrite and continue**은 별도의 확인입니다.
5. 수입된 역할은 **장애인/SETUP**를 저장됩니다. 편집기에서 지침 및 기능 바인딩을 검사하고, 의도 된 액세스 범위를 선택, 다음 **Save changes**을 완료 설정하고 활성화.
6. 설치 된 역할을 다시 열고 작은 범위를 작업 실행합니다.

![수입 중 실제 RNA-seq Skill 충돌 해결](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**버전 변경되지 않음**은 여전히 Skill 충돌을 동반 할 수 있습니다. 지정된 Skill 소스를 명시적으로 선택하고, 그 바인딩 및 액세스 범위를 확인하기 위해 수입 된 역할을 다시 엽니다.

| 미리보기 컨트롤 | 검사하는 방법 |
| --- | --- |
| 번들 Skill 확장 | 버전, 분해, 이유 및 파일 목록. |
| 보관 한도 | 50 MB 압축, 200 MB 압축, 2,000 파일, 이 UI의 파일 당 25 MB. |
| 진단 | 차단 오류, 경고 및 정보; 경고는 명시적인 선택이 필요할 수 있습니다. |
| 복사 및 다운로드 JSON | 문제 해결을위한 수출 진단. 공유하기 전에 보고서를 검토하십시오. |
| 취소 | 설치하지 않고 미리보기를 남겨주세요. |
| 다음 / 검토 overwrite | 필요한 선택과 유효성 검사를 할 때만 계속하십시오. |

**브라우저에서 가져 오기 :**은 **Import ZIP → Choose ZIP**을 선택하여 패키지를 검사하고 충돌을 해결하고 역할 활성화하기 전에 로컬 설정을 완료합니다. Credentials 및 신뢰 구성은 대상 장치에서 설정해야합니다. 업로드가 실패하면 오류를 유지하고 [문제 해결](../guides/troubleshooting.md)을 따르십시오.

## 회사 소개 {/* #browse-the-marketplace */}

**Marketplace**을 열고, 역할을 검색하고 **View details**을 선택합니다. 게시자, 소스, 버전, 라이센스, 다운로드 크기 및 포함 Skills/Connectors. **Refresh Marketplace** 카탈로그 업데이트; **Manage Marketplace sources**는 구성 소스를 제어합니다. All/Official/Community 필터 관심 카탈로그 원산지, 런타임 읽기.

![실제 자동 연구 Specialist 패키지 세부 사항](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

**Install Specialist**을 선택하면 **Marketplace**에서 역할이 나타나고 활성화 상태 및 바인딩을 검사합니다. 카탈로그 패키지는 패키지가 아닌 모든 응용 기능에 대해 설명합니다. 설치는 연구 작업을 수행하거나 모든 외부 의존도를 준비하지 않습니다; 사용 전에 필요한 설정 완료.

![Auto Research 설치 및 활성화](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## 공유하기 전에 검증 {/* #verify-before-sharing */}

수입 또는 변경 후, 할당 된 기능을 사용하여 작은 작업을 실행하고 저장된 출력을 검사합니다. 기존의 방법, PCA 및 매트릭스 예제에 대한 [설치 된 Specialist 분석 확장](../workflows/extend-analysis.md)을 따르십시오. 선택된 경로에 필요한 입력과 무해한 제한을 확인합니다.

구현 참조 : [전문가Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
