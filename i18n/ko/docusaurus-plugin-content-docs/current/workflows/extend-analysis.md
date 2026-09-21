---
title: "설치 된 Specialist 분석 확장"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 설치 된 Specialist 분석 확장 {/* #extend-an-analysis-with-an-installed-specialist */}

<p className="example-label"><strong>실습 예제</strong> 관찰 된 노출 메트릭스와 함께 theophylline 농도 플로트를 확장</p>

**Pharmacometrics PK/PD 디자인 Specialist**을 사용하여 농도 시간 데이터를 확인하고 프로파일을 그리며 노출 메트릭을 계산합니다. 전달 가능한 것은 12 서브젝트 테이블, 농도 플롯, runnable R 스크립트 및 방법 보고서입니다. 이 예제는 공공 연구 데이터를 설명합니다; 치료 또는 투약을 권장하지 않습니다.

입력은 R의 공개 [Theoph 데이터셋](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html): 12개의 주제에서 132 관측입니다. 시간은 시간, mg/L에 있는 농도, kg에 있는 무게 및 mg/kg에 있는 복용량에서 입니다. 계산은 기본 R, 추가 패키지 또는 데이터베이스 자격 없이 사용.

## 1. Specialist 설치 및 선택 {/* #1-install-and-select-the-specialist */}

1. **Settings → Specialists → Browse Marketplace**을 엽니다. **Pharmacometrics PK/PD 디자인 Specialist** 찾기, 그것의 기능을 검사, 그것을 설치. 이 예제는 Open-Science **0.30.1**의 패키지 **1.0.0**을 사용합니다.
2. **Settings → Runtimes**에서 R이 **Ready**이고 활성화된다는 것을 확인합니다. 기록 된 실행은 R **4.4.3**을 사용했습니다.
3. 연구 프로젝트에 새로운 대화를 엽니다. 유효한 모형을, 그 후에 **Agent controls → Specialist → pharmacometrics-pkpd-designer** 선택하십시오. 기록된 실행은 **Codex 구독 / gpt-5.6-sol**을 사용했습니다.
4. **각 분석 메시지**의 시작에서 `/pkpd`을 입력한 다음 제안에서 **pkpd 모델**를 선택하십시오. 프롬프트를 지나기 전에 Skill 칩이 됩니다.

**버전 참고:** 스크린 샷은 v0.30.1을 사용하여 Skill가 각 분석 메시지에 명시적으로 선택됩니다. v0.30.2에서 Skills을 바인딩하면 Specialist의 회전 및 위임 작업을 준비합니다. Specialist을 먼저 선택; Skill이 사용할 수 없는 경우 요청을 보내기 전에 `/pkpd-modeling`을 명시적으로 선택하십시오.

![Pharmacometrics Specialist 및 그 기능 설치](/img/open-science/theoph-specialist/installed.webp)

![현재 메시지에 대한 정품 pkpd-modeling Skill 선택](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. 데이터를 확인하고 농도 곡선을 그리십시오. {/* #2-check-the-data-and-draw-the-concentration-curves */}

선택된 Skill로, 보내:

```text
Use the public R dataset datasets::Theoph in the enabled R Notebook.
Use base R only. Check rows, subjects, observations per subject,
missing values, duplicate subject-time records and the documented units.
Keep all observed time-zero concentrations unchanged.
Save theoph-input.csv, theoph-concentration-time.png and theoph-data-check.md.
Plot all 12 subjects with labelled axes and a legend.
Execute the code, reopen the saved files and report the actual checks.
Stop after this descriptive baseline. Do not calculate NCA metrics yet.
Do not install packages or delegate. Keep everything in English.
```

**Run R code?**이 표시될 때 코드를 검사하고 계산을 승인합니다. 실행 출력을 볼 **Notebook**을 엽니다. 기록된 입력에는 **132 행, 12 주제 및 11 주제별 관측**가, 누락된 값 또는 중복된 제목 시간 기록이 없습니다.

생성 된 CSV 및 플로트를 엽니 다. 주제 1, 7 및 10는 시간 0에 비소 농도가 있습니다; 이것들은 유지됩니다. dataset의 주제 요인은 최대 농도에 의해 주문됩니다, 그래서 그것의 표시된 순서는 숫자가 아닙니다.

CSV 미리 보기에는 처음 100개 행이 표시됩니다. 저장된 입력 파일에는 132개 관측값이 모두 포함되어 있습니다.

![Open-Science의 저장된 입력 테이블](/img/open-science/theoph-specialist/input.webp)

![실행된 기본과 12개의 농도 시간 곡선](/img/open-science/theoph-specialist/baseline.webp)

참조 파일 : <ExampleDownload path="/examples/theoph/theoph-input.csv">입력 CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-concentration-time.png">팟캐스트</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-data-check.md">데이터 검사</ExampleDownload>.

## 3. 노출 메트릭 추가 {/* #3-add-the-exposure-metrics */}

<ExampleDownload path="/examples/theoph/nca-conventions.md">NCA 방법 참고</ExampleDownload>을 다운로드하고 **+ → Attach files**을 통해 추가하십시오. 그래서 Notebook는 그것을 읽을 수 있습니다. 예를 들어이 참조를 사용하십시오. Cmax / Tmax 및 all-linear 사다리 사다리꼴 AUC를 관찰 할 수 있으며 터미널 슬로프를 자극하지 않습니다.

동일한 대화에서 `/pkpd-modeling`을 다시 선택하면 다음을 보내주십시오.

```text
Read the attached reviewed nca-conventions.md methods reference.
Extend the baseline using the same theoph-input.csv and base R Notebook.
For each subject calculate observed Cmax (mg/L), earliest observed Tmax (h),
linear-trapezoidal AUC from time zero to the last observation (mg*h/L),
and the actual last-observation time (h).
Retain all observed time-zero values. Preserve the input hash.
Save theoph-nca-summary.csv, theoph-nca.R and theoph-nca-report.md.
The standalone script must read the CSV. Execute it, reread all 12 rows,
and compare its results with a separate Notebook calculation.
Explain the method, units, differing observation windows and limitations.
Register the three saved outputs as project files.
Do not estimate AUC to infinity, half-life, clearance or dosing advice.
Do not install packages, change permissions or delegate. Use English.
```

Inspect 및 파일 읽기 및 R 계산을 승인. 지원 파일이 누락된 경우, 계속하기 전에 첨부합니다. Notebook이 오류를 보고 실패한 세포를 열고 재발동하기 전에 이름을 입력 또는 의존성을 수정합니다.

## 4. 결과보기 및 확인 {/* #4-open-and-check-the-results */}

생성된 파일에서 **theoph-nca-summary.csv**을 엽니다. 12개의 주제 각각을 위한 행이 있어야 합니다. 단위와 마지막 보존 시간 및 메트릭 값 확인.

![저장된 주제 수준 노출 미터](/img/open-science/theoph-specialist/results.webp)

| 이름 &#42; | Cmax (mg/L)를 | Tmax (시간) | AUC0-마지막 (mg·h/L) | 마지막 관측 (h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

함께 **theoph-nca-report.md** 및 **theoph-nca.R**을 엽니 다. 이 보고서는 실행된 스크립트와 일치해야 합니다: 각 주제의 관측을 시간별로 정렬하고, 관찰된 최대 및 그 가장 이른 시간을 가지고, 그 다음에 인접한 관측에 `(C1 + C2) × (t2 - t1) / 2`을 요약합니다. 위의 첫번째 2개의 줄은 빠른 비교를 제공합니다; rerun를 받아들이기 전에 모든 12의 줄을 검사하십시오.

이 관찰된 미터입니다. 마지막 표본 추출 시간은 주제와 다릅니다, 선형 사다리꼴 규칙은 명시적인 대략입니다. 결과는 인피니티에 노출을 설정하지 않습니다, 장착 된 pharmacokinetic 모델 또는 측정 uncertainty.

기록 된 <ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">요약 CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-nca.R">R 스크립트</ExampleDownload> 및 <ExampleDownload path="/examples/theoph/theoph-nca-report.md">방법 보고서</ExampleDownload> 다운로드. 앱 밖에 다시 실행할 때 입력 및 스크립트를 유지하십시오.

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
