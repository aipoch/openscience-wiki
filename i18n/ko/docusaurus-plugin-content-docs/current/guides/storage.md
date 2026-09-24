---
title: "저장과 아카이브 작업"
last_update:
  date: '2026-09-24'
---

# 저장과 아카이브 작업 {/* #storage-and-archived-work */}

**Settings → Storage**을 사용하여 관리 된 데이터 위치 및 디스크 사용을 검사합니다. **Settings → Archived**을 사용하여 비활성 프로젝트 및 세션을 구성합니다. Archiving은 데이터 루트를 이동하거나 디스크 공간 복구를 약속하지 않습니다.

## 디스크 사용법을 읽고 새로 고침 {/* #read-and-refresh-disk-usage */}

![연구 예 후 실제 관리 된 저장](/img/open-science/local-acceptance/storage-installed-location.webp)

**Data location**을 백업하거나 누락 된 파일을 진단하기 전에 읽어보십시오. 이것은 프로젝트에 부여 된 외부 소스 폴더에서 분리 된 앱의 관리 루트입니다. **Refresh** rescans 사용법; 측정을 비교하기 전에 마지막 스캔 시간을 확인합니다.

| 분류 | 계정 만들기 | 회사연혁 |
| --- | --- | --- |
| 아티팩트 | 관리된 연구 산출 및 그들의 유지된 자료 | 작은 최신 보고서는 여전히 이전 버전이있을 수 있습니다 |
| 업로드 | 관리된 입력 사본 | 외부 소스 파일을 제거하지 않습니다 이 복사 |
| 런타임 | 관리된 해석기 및 의존성; 자세히 보기 | 작은 예 dataset 보다는 보통 더 큰 |
| Notebook | 세션 실행 저장 | 자체 작업을 삭제하기 전에 필요한 Notebook 내보내기 |
| 실행 증거 | 캡처 된 버전 증거 | 현재 라이브 커널에서 다른 |
| 세션 워크스페이스 | 대화를 위한 작업 파일 | 모든 작업 파일이 게시 된 artifact가되지 않았습니다. |
| Compute 캐시 / 시약 작업 공간 | 의거 또는 위임 작업 데이터 | assuming 전에 실제 범주를 읽으십시오. 일회용 |
| 전체 / 이용 가능한 공간 | 현재 관리된 합계 및 장치 자유로운 공간 | 측정, 설치 요구 사항 없음 |

Disk 사용은 파일 및 실행 시간과 함께 변경됩니다. 관리 제어를 사용하기 전에 각 범주를 검사; 사용 범주는 그 내용이 안전하게 한 행동에서 삭제 될 수 없다는 사실이 아닙니다.

<span id="review-relocation-before-submitting" />

## 데이터 위치 이동 {/* #move-the-data-location */}

### 이동하기 전에 {/* #before-moving */}

중요한 입력, 산출 및 실행 기록의 수출을 완료하십시오. 현재 위치 및 필수 패키지를 기록합니다. 연구 데이터는 구성 위치에 남아있는 모든 응용 프로그램 설정 또는 대화 기록을 이동하지 않습니다.

### 자주 묻는 질문 {/* #choose-and-submit-the-destination */}

1. **Change location**을 선택하고 마이그레이션 통지를 읽으십시오.
2. **Continue**을 선택하여 목적지 양식을 엽니다.
3. **New location**을 입력하고 **Browse…**을 사용하거나 **기본 위치로 돌아가기**를 선택하십시오.
4. 소스, 목적지, 사용 가능한 공간 및 재건 통지를 확인하십시오.
5. **Change location**는 유효한 이동을 제출합니다; **Cancel**는 현재 위치를 변경하지 않았습니다.

![runtime rebuild 필요조건을 가진 이전 모양](/img/open-science/local-acceptance/storage-destination-form.webp)

앱은 기존 연구 데이터를 이동합니다. Python/R 환경은 **다시 시작 후에 재건해, copied**입니다. 공유 런타임 패키지 캐시는 오프라인 재건을 지원하기 위해 복사되지만 pip- 또는 CRAN-only 패키지는 복원되지 않습니다. 추가 재건 공간은 믿을 수 없을 것으로 예측할 수 없습니다. 실제 이동 전에 환경/패키지 필요조건을 기록하고 필요한 가동 시간을 후에 시험하십시오.

### 재시작 후 목적지 확인 {/* #check-the-destination-after-restart */}

1. **Settings → Storage**을 열고 **Location**을 선택한 대상입니다.
2. 기존 프로젝트, 저장된 보고서 및 이전 보고서 개정을 엽니다. 도서관, 수집, 프로젝트 링크 및 PDF 첨부 파일을 확인뿐만 아니라.
3. Notebook을 열고, 유효한 런타임을 검사하고 기존 입력으로 작은 읽기 전용 계산을 다시 실행합니다. 성공적인 사본은 단독으로 재건된 런타임을 확인하지 않습니다.
4. 이 체크 패스까지 원본 데이터와 수출을 유지하십시오. 보존된 파일 내용이나 체크섬과 비교하여 라이브러리 참조, 수집, 프로젝트 링크, 첨부 파일 및 인용 설정을 확인합니다. 새로운 위치가 writable임을 확인하기 위해 1개의 새로운 결과를 저장하고 다시 엽니다.

외부 R 해석기를 위해, 선택된 실행 가능한 아직도 존재한다는 것을 확인하고 Notebook는 그것에 경계를 남아 있다는 것을 확인합니다. 당신의 분석 요구를 적재하고, 작은 계산을 다시 실행하고, 저장된 결과를 다시 엽니다. 외부 해석기 및 기존 패키지는 재건이 필요할 수 있는 앱 관리 환경에서 분리됩니다.

### 기본 위치로 돌아가기 {/* #return-to-the-default-location */}

1. **Change location → Continue → Or move it back to the default location**을 선택하면 활성 작업을 완료합니다.
2. 소스, 기본 목적지, 무료 공간 및 runtime-rebuild 공지를 확인하십시오. **Data copied**에 대한 제출 및 대기.
3. **Restart now**을 선택합니다. 재시작 후 **Settings → Storage → Location**을 확인합니다. 성공했지만 전환하지 않았다면 [의정부 복구](#the-data-copied-but-switching-failed)을 사용하십시오.
4. 원본 프로젝트 및 저장된 파일을 엽니다. **Runtimes**에서 관리된 Python/R를 검사하고, 필요한 경우 **다운로드 및 설정**를 사용하고, 기존 입력에 대한 작은 읽기 전용 계산을 실행합니다.

반환 후, 기존 프로젝트, 입력 및 저장된 보고서를 다시 엽니다. 관리 실행 시간을 확인 한 다음 작은 계산을 실행하고 새로운 결과를 저장합니다. 기본 데이터 위치가 사용중인지 확인하기 위해 다시 엽니다.

![저장 R 결과가 기본 위치로 돌아가기 후에 다시 열었습니다.](/img/open-science/local-acceptance/r-default-chart.webp)

**OpenScience라는 다른 폴더는 여기에 있습니다. 다른 위치를 선택하십시오.**이 나타나면 앱 블록이 겹쳐집니다. 그 디렉토리를 취소하고 보존합니다. 분쟁 해결하기 전에 소유권, 내용 및 백업을 설치하십시오. 같은 이름의 폴더를 삭제하지 마십시오. 목적지 유효성 통과 후 재입국 만.

### 데이터 복사, 하지만 전환 실패 {/* #the-data-copied-but-switching-failed */}

**Data copied**는 사본과 검사를 확인합니다; **Restart now**은 여전히 활성 데이터 위치를 전환해야합니다. **데이터를 안전하게 전환 할 수있는 앱을 준비 할 수 없습니다. 다시 시도하십시오.**을 보고하면 이동이 완료되지 않습니다. 내부 경로를 수동으로 리디렉션하지 마십시오.

1. 오류 및 위치 모두 유지. 원래 프로젝트 및 파일이 여전히 열려 있는지 확인하십시오.
2. **Change location**을 엽니다. unfinished 사본이 검출될 때, **Resolve unfinished move**를 선택하십시오.
3. **Finish move**는 기존 사본을 완료하려고 시도합니다. **Discard copy**은 원본 위치를 유지하면서 완성된 복사본을 포기합니다. 확인 범위를 먼저 읽으십시오.
4. **Conversation storage needs attention**이 나타나면, 불완전한 움직임을 해결하고 **Retry**을 선택하고, 원래 프로젝트와 보고서를 다시 열 수 있습니다.

![unfinished 저장 이동을 위한 회복 선택](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

반복적으로 실패한 마지막 스위치를 재시동하는 경우에, 활동적인 일을 끝내고, 종료하고 앱을 재개하고, 그 후에 움직임을 재시동하십시오. 오류가 발생하면 원래 위치를 유지하고 다른 변경을하기 전에 실패 세부 정보를 수집합니다.


## 세션을 보관하고 다시 가져 오기 {/* #archive-a-session-and-bring-it-back */}

세션을 선택하면 아카이브 및 완료 또는 활성 작업을 중지합니다. 복원된 상태를 비교해야 하는 경우 별도의 완료 세션을 유지하십시오.

1. 세션 행 메뉴를 열고 **Archive**을 선택합니다.
2. Active session list를 남겨 주세요.
3. **Settings → Archived**을 엽니다.
4. **Sessions**에서 제목, 프로젝트 및 아카이브 시간을 식별합니다.
5. 그 행의 **Restore**을 선택합니다.
6. 프로젝트로 돌아가서 세션을 다시 확인할 수 있습니다.

**행의 복원**을 선택하여 아카이브 세션을 복원합니다. window-level Restore만 설정 레이아웃을 변경합니다. 아카이브 프로젝트의 경우, **Projects → Manage**을 열어서 세션을 복원하거나 삭제하기 전에 검사합니다.

## 아카이브 및 프로젝트를 복원 {/* #archive-and-restore-a-project */}

1. 홈에서 프로젝트 카드의 작업을 열고 **Archive**을 선택합니다.
2. **Settings → Archived → Projects**을 열고, 프로젝트의 **Manage** 행을 엽니다.
3. 프로젝트 및 세션 목록 읽기. 세션은 개별적으로 아카이브되지 않고 **프로젝트가 아카이브되기 때문에 숨겨진**을 보여줄 수 있습니다.
4. **Restore project**을 선택하십시오.
5. 프로젝트, 대화 및 저장된 보고서를 다시 엽니다.

![아카이브 GSE60450 프로젝트 관리](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

저장 된 보고서와 복원 후의 개정을 엽니다. 프로젝트 구성; 분석이 중단되지 않거나 보고서의 버전 기록을 제거하지 않습니다.

<span id="delete-a-disposable-project" />

## 영구적으로 프로젝트 삭제 {/* #permanently-delete-a-project */}

**Delete project**은 영구 삭제 확인을 엽니다. 확인하기 전에 범위를 읽으십시오: 관리된 artifacts 및 업로드는 삭제되지 않는 외부 작업 폴더 파일에서 분리됩니다. 작업 및 커널이 중지되고 관리되는 세션 작업 공간은 저장소에 남아 있습니다. 건축과 deleting에는 다른 outcomes가 있습니다.

![별도의 빈 프로젝트를 위한 Deletion 범위](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

삭제 흐름을 학습하는 경우 빈 일회용 프로젝트를 사용합니다. 연구가 포함 된 프로젝트를 삭제하기 전에 확인의 영향을받는 레코드를 검사합니다.

## Distinguish 제거 가동 {/* #distinguish-removal-operations */}

| 작업 | 복구 및 효과 |
| --- | --- |
| 고정 해제 | 세션 배치만 변경 |
| 보관 | Reversible 조직; 보관된 작업은 Archived에 나타납니다. |
| 복원 | 보관된 아이템을 반환합니다. 그것은 연구하지 않습니다 |
| source-folder 보조금 제거 | 외부 폴더에 액세스 변경; 그 폴더의 삭제 |
| 프로젝트/제휴 | 신청의 확인 후에 영원한 제거; 진행하기 전에 영향을받는 기록/파일을 읽으십시오 |
| 문학 → 쓰레기로 이동 | 별도의 참조-library 수명주기; 거기 복원, Archived에서 |

영구 삭제 전에 입력, 출력 및 실행 레코드를 내보내려면 유지해야합니다. 다른 작업이 여전히 참조 여부를 확인하고, 확인이 유지하려는 내용이 포함 된 경우 취소.

## 저장 또는 복구가 실패한 경우 {/* #if-storage-or-recovery-fails */}

실패한 다운로드를 위해, 선택된 목적지 및 자유로운 공간을 검사하십시오. 사용 가능한 관리 파일에 대해서는 교체 프로젝트를 만들기 전에 선택한 데이터 위치 및 프로파일을 확인하십시오. 이전 후 누락된 패키지에 대해서는, 연구 데이터가 손실된 것보다 재건축된 런타임을 확인합니다. [문제 해결](troubleshooting.md)을 사용하여 첫 번째 유용한 오류 및 버전 정보를 수집합니다.

출처: [공급 업체](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx), [의논문](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx). [도서관 이전 체크](https://github.com/aipoch/open-science/commit/d00c722d).

## 업그레이드 후 데이터를 다시 엽니다. {/* #historical-data-location */}

기존의 저장된 데이터 위치는 우선순위입니다. 명시된 저장된 위치없이 완성 된 이전 설치를 위해 Open-Science은 역사적인 위치를 유지하고 그 선택을 저장합니다. 저장된 폴더가 사용되지 않은 경우 재연결하기 전에 다시 연결하십시오. 여러 역사적인 위치가 연구 데이터를 포함한다면, 앱은 선택하거나 침묵적으로 선택 한 대신 원래 폴더를 복구하도록 요청합니다. 프로젝트와 파일을 검사 할 때까지 두 사본을 보관하십시오. 데이터의 명백한 손실을 해결하기 위해 새로운 빈 위치를 만들지 마십시오.
