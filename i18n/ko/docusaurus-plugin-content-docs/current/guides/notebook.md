---
title: "Notebook 및 실행 증거"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook 및 실행 증거 {/* #notebook-and-execution-evidence */}

Notebook을 사용하여 실행 코드를 검사하고 현재 커널에서 명령을 실행하고 배경 작업을 수행하십시오. 저장된 파일을 위해, 그 파일 버젼과 관련된 실행 및 증거를 검사하기 위해 **Provenance**을 엽니다.

Python 또는 R, [호환 실행 시간 활성화](runtimes.md)를 실행하기 전에. 완전한 데이터 분석 예제의 경우, [공공데이터 워크플로우](../workflows/data-quality.md)을 사용합니다.

<span id="open-the-session-notebook" />
<span id="open-the-producing-sessions-notebook" />
<span id="produce-an-artifact" />

<PlatformGuide />

## 세션 Notebook 열기 {/* #open-a-session-notebook */}

1. 검사하려는 계산을 포함하는 프로젝트와 대화를 엽니 다. 신선한 시작이라면 **세션 Notebook**에서 작은 계산을 먼저 수행해야 합니다.
2. **Open notebook**을 선택하거나 대화 메뉴 **View notebook**을 사용하십시오.
3. 파일 미리보기가 활성화되면 **Notebook** 탭을 선택합니다.
4. **Agent** 을 사용하여 실행 소유자를 선택하고 **Python / R / 배쉬** 을 선택하고 언어를 선택하십시오.
5. 번호 실행을 열고 출력 및 완료 상태를 읽으십시오. 복사된 활동은 **code shown**에 표시된 부호를 포함합니다; 실행 기록에 대한 원래 생성 세션을 검사합니다.

<PlatformContent platform="macos">

![Python 실행 및 출력 Notebook](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| (주) | (주) | 결과 |
| --- | --- | --- |
| 에이전트 | Main 또는 어린이 에이전트 선택 | 소유자의 기록 표시; 에이전트는 별도의 커널을 가질 수 있습니다. |
| 언어 | 사용 가능한 언어 선택 | 기록 및 콘솔 변경; Runtimes에서 누락된 언어 설치 |
| 관련 링크 | 기록된 실행을 선택하십시오. | 코드, 출력 및 상태를 엽니다. |
| 클립보드에 복사 | 선택된 코드 복사 | 외부 경로 및 종속성 유지 |
| 출력/쇼 출력 숨기기 | 붕괴 또는 확장 산출 | rerunning 부호 없는 전망 변경 |
| 이 커널에서 코드를 실행 ... | 입력 및 제출 | 선택한 라이브 커널에서 실행 |
| 닫기 / 축소 미리보기 | 대화로 돌아가기 | 기록된 실행 기록 유지 |

현재 **입력 데이터 / 입력**을 체크하십시오. 표시된 파일과 버전을 요청합니다. 참고가 사용되지 않은 경우 재개 또는 재개 전에 응용 프로그램을 통해 의도 된 입력을 첨부합니다.

## 실행하기 전에 코드 검토 {/* #execution-review */}

v0.36.0에서 Agent-submitted Notebook 코드는 파견 전에 검사됩니다. 지원된 일반 읽기 및 분석은 추가 위험이 없는 진행합니다. 비할 수없는 변경을 만들 수있는 작업, 또는 완전히 분석 할 수없는, 한 번의 결정을 필요로한다. 수동 콘솔에 직접 입력 된 코드는이 에이전트 승인 단계에 의해 커버되지 않습니다; 제출하기 전에 자신을 검사합니다.

1. **Review risky code**이 나타나면 환경과 작업이 요청됩니다. 계산은 당신의 결정에 기다리고 있습니다.
2. **Line**을 선택하여 전체 코드의 위치를 검사합니다. 분석이 해결되지 않을 수 있는 모든 작업을 포함하여 경로, 영향을받는 파일 및 명령을 확인합니다.
3. 행동이 불필요하거나 대상이 잘못되면, 쇠퇴하고 안전한 개정을 위해 대리인을 요청합니다. 표시된 작동을 계획할 때만 접근하십시오; 요청은 향후 위험 코드에 대한 영구 허가를 부여하지 않습니다.
4. 결정 후, 기록 된 결정과 Notebook 실행 상태를 검사합니다. 혼자 승인은 완료의 증거가 아닙니다. 쇠약한 요청은 그 코드를 실행하지 않습니다.

<p className="example-label"><strong>실습 예제</strong> 외부 Python 프로세스 요청 검사</p>

그림 계산은 숫자를 추가하지만 `subprocess.run`을 통해 다른 해석기를 시작합니다. 그 배열된 실행은 완전히 검사될 수 없습니다, 그래서 검토를 위한 요구 pauses. 이 통지는 코드가 악화되지 않습니다. 이 예제는 **Deny**을 선택합니다. 실행은 다음 자식 프로세스를 실행하지 않고 중단으로 기록됩니다.

![Notebook 검토 카드 환경, 소스 라인, 한 번 허용 하 고 Deny](/img/open-science/v0360/notebook-risk-review.webp)

이 화면은 실행 위험을 확인합니다; 통계적인 방법 또는 결과가 유효하지 않습니다. **Auto-review** 및 [리뷰어](../specialists/reviewer.md)은 별도로 완료된 작업을 평가합니다. v0.36.0는 또한 Python/R 의존성 붙잡음을 개량합니다; [Provenance 및 재런 검증](reproducibility.md)을 사용하여 결과의 실제 입력 및 출력을 확인합니다.

## 라이브 커널에서 일하기 {/* #work-in-the-live-kernel */}

### 라이브 커널에서 직접 확인하기 {/* #run-a-check-yourself-in-the-live-kernel */}

**Python**을 선택하면 **이 커널에서 코드를 실행 ...**을 클릭하고, 다음의 자체 유지 명령을 입력합니다. 이전 대화에서 dataset, 타사 패키지 또는 변수가 필요하지 않습니다.

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

**이름 &#42;**을 눌러 실행; 새로운 라인에 **Shift+엔터**을 사용합니다. 제출하기 전에 **뚱 베어**과 함께 열린 자동 완성 메뉴를 꺼내십시오. 출력된 **· ·** 항목 및 해석 정보를 확인합니다. executable은 선택한 runtime에 속해야 합니다.

R의 경우 **R**을 선택하고 제출하십시오.

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

기록된 R 입장 및 그것의 산출을 검열하십시오. Python 및 R에는 별도의 변수가 있습니다. `NameError` 또는 `object not found`은 일반적으로 그 커널에서 생성되지 않은 객체를 의미합니다. 다른 세션에서 명령을 재사용하기 전에 코드를 검사합니다.

해석기 및 저장된 결과의 일련 검사를 위해, [Python 및 R 실행 시간](runtimes.md)를 열고 페이지의 정상에 **Windows**를 선택합니다.

<span id="variables-dependency-state-and-network-boundaries" />

### Inspect 라이브 변수 {/* #inspect-live-variables */}

1. **Inspect variables** 을 선택한 후 변수를 생성한다.
2. **Name**, **Type**, **Size / Shape** 및 **Preview**를 읽으십시오.
3. **Filter variables**의 자체 코드에서 이름을 입력하십시오. 스크린 샷 예의 경우, `sha` 필터 목록의 해시 변수; 자신의 커널에 존재하는 이름을 선택합니다.
4. **Refresh variables**을 사용하여 현재 네임스페이스를 읽으려면 **Show private variables** 을 사용하세요.
5. **Close**을 선택하여 Notebook로 돌아갑니다.

<PlatformContent platform="macos">

![name에 의해 변수 목록 필터링](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

미리보기는 값을 약화 할 수 있습니다; 콘솔에서 필요한 필드를 인쇄하여 완전히 검사합니다. **Variable tracking is limited**은 의존성 그래프가 불완전하다는 것을 의미합니다. 추적 된 결과를 위해 **뚱 베어**은 의존성을 변경합니다. **unknown**은 관계를 설치할 수 없습니다. 결과를 사용하기 전에 Rerun 영향을받는 코드.

### 커널 변경 후 계속 {/* #continue-after-a-kernel-change */}

런타임을 변경하거나 재구성하면 커널을 중지할 수 있습니다. 파일 저장 및 실행 기록은 in-memory 변수에서 분리됩니다. 변경 후, 위의 해석 검사를 실행하고, 생성 코드를 다시 실행하여 필요한 변수를 다시 작성하고 필요한 저장된 파일을 다시 엽니다.

설정 취소 및 재설치를 위해 [런타임](runtimes.md#maintain-and-repair-environments)을 사용하십시오. 런타임 재건, 정상적인 커널 재시작 및 배경 작업의 복구는 다른 작업이다; 동일한 상태를 복원하는 것과 같이 관련 작업의 상태를 확인합니다.

## R에서 동일한 유전자 검사를 실행 {/* #run-the-same-gene-count-check-in-r */}

<p className="example-label"><strong>실습 예제</strong> GSE60450 유전자를 R에서 확인</p>

1. [설치 및 활성화 R](runtimes.md#install-app-managed-r).
2. [원본 matrix](../reference/example-data.md)을 첨부합니다. Python 결과를 비교하면 CSV과 같은 대화에 연결됩니다.
3. **Session Notebook → R** 실행 및 [Data-quality 워크플로우](../workflows/data-quality.md)의 입력 / 출력 요구 사항에 대해 문의하십시오. 완전한 식별자 및 별도의 출력 파일 보존을 지정합니다.
4. **Change notebook runtime?**이 나타나면 **언어: R**과 의도한 해석기를 확인합니다. 이후 **Run R code?** 요청에서 환경을 확인하십시오.
5. **Notebook → R**을 열고, 실행 기록을 읽고, 저장 CSV, 그림 및 보고서를 엽니다.

<PlatformContent platform="macos">

![R 표본 QC 산출은 신청에서 열었습니다](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

[공유 baseline](../reference/example-data.md#sample-qc-baseline)을 사용하여 전체 샘플 식별자에 의해 측정을 비교합니다. 미터가 포함되거나 0 개를 제외한 원본 소스 및 레코드를 유지하십시오. Raw-count QC는 별도의 설계 통계 분석을 위한 데이터를 준비합니다.

### R 결과 및 그 증거를 함께 유지하십시오. {/* #keep-the-r-result-and-its-evidence-together */}

저장된 CSV의 **Provenance → Execution Log → Download notebook**를 엽니다. 입력 및 결과와 함께 수출을 유지하십시오. 한 파일 버전의 수출은 나중에 수동 콘솔 명령을 omit 할 수 있습니다.

<PlatformContent platform="macos">

![R 결과 캡처 환경](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

Runtimes 패키지 재고는 설치 된 환경을 설명합니다. Provenance은 특정 파일에 대해 캡처 한 환경 증거를 설명합니다. **partial** 또는 캐시 인벤토리 통지를 읽으면 패키지가 동일한 목록으로 계산됩니다.

## 배경 작업 및 결과 납품 {/* #background-tasks-and-result-delivery */}

지원되는 Python, R, 지속적 REPL 또는 쉘 작업이 계속 진행될 때 배경 실행에 대해 문의하십시오. 입력, 출력 및 중지 조건을 포함하십시오.

1. 입학 후 대화의 **Background tasks** 입장을 엽니다. 그것은 그룹 로컬 실행 및 원격 컴퓨터 작업; 작업없이 대화가 표시되지 않을 수 있습니다.
2. 작업 정체성, 환경, 상태 및 탈출 시간 읽기.
3. **Open**을 선택하여 해당 Notebook 실행 또는 컴퓨터 작업을 검사합니다.
4. 작업을 중지하려면 **Cancel** 제어를 선택하고 상태를 유지하십시오. 이미 저장된 모든 파일을 사용하거나 삭제하기 전에 검사하십시오.
5. 완료 후, 배달 된 결과 메시지를 검사하고 저장된 출력을 엽니 다.
6. 중단 또는 앱 재시작 후 다른 복사본을 제출하기 전에 기존 작업 및 복구 메시지를 검사합니다.

<PlatformContent platform="macos">

![배경 작업 상태 및 개방 제어](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| 상태 | 자주 묻는 질문 |
| --- | --- |
| Queued / 실행 | 선정된 환경 및 진전; Shell 작업은 실행 슬롯을 기다릴 수 있습니다. |
| 취소 / 취소 | 취소는 여전히 처리되거나 정착 된 것 |
| 완료 | 종료 결과 및 저장된 출력 파일 |
| 실패 / 중단 / 중단 | 첫 번째 오류, 유지 출력 및 제안 복구 작업 |
| 결과를 읽을 수 없음 | Existing job 기록 및 복구 세부 사항 |

작업 목록이 실행되는 작업을 종료합니다. 결과 메시지의 계산 및 배송의 완료는 별도의 단계입니다. 원격 작업은 또한 [먼 compute](remote-compute.md)의 호스트 및 스케줄러 상태를 필요로 합니다.

<span id="open-provenance" />
<span id="execution-log" />
<span id="messages" />
<span id="environment" />
<span id="review" />

## 1개의 저장된 버전의 증거를 검열하십시오 {/* #inspect-one-saved-versions-evidence */}

저장된 파일을 열고 **File actions → Provenance** 또는 **오픈 Provenance**을 확대 미리보기에서 선택합니다. 선택된 파일 버젼을 첫번째로 확인합니다.

<PlatformContent platform="macos">

![저장된 결과에 대해 캡처 한 Producer 코드](/img/open-science/provenance-code.webp)

</PlatformContent>

| 탭 또는 제어 | 검사에 그것을 사용 |
| --- | --- |
| 코드 | Captured 프로듀서 코드, 입력 참조, 복사 / 다운로드 및 생성 스크립트 |
| 실행 로그 | 실행 기록 선택된 버전에 대한 냉동 |
| 메시지 | 캡처 된 요청 및 결과와 관련된 결정 |
| 환경 | Interpreter, 패키지 정보 및 캡처 상태; 은 은 [관련 상품](runtimes.md#conditional-restore). |
| 재현성 | 캡처된 입력, 재런 체크, 출력 비교 및 검증 기록. |
| 종설 | 이 정확한 파일 버전과 관련된 리뷰 |
| 이전 / 다음 Artifact 버전 | 다른 저장된 버전을 위한 증거; 아무도 존재하지 않을 때 사용할 수 없습니다 |
| 출처 닫기 | 본문 바로가기 |

| 이름 &#42; | 의미와 다음 활동 |
| --- | --- |
| 뚱 베어 | 유지된 증거는 제한된 범위를 다룹니다. 수출된 부호와 결과를 가진 범위를 지키십시오. |
| 부분적인 | 몇몇 환경 정보는 누락되거나 unconfirmed입니다. 외부 재사용 전에 필요한 의존도를 기록합니다. |
| 이 버전에 대한 리뷰가 없습니다. | 이 파일 버전은 관련 리뷰가 없습니다. 제품 정보 [리뷰어](../specialists/reviewer.md) 대화 및 artifact 검토를 이해합니다. |
| 자주 묻는 질문 | 재고가 재사용되었습니다. 환경이 변화할 때 실제 해석기/패키지를 검사하십시오. |

보고서 편집은 다른 파일 버젼을 만듭니다; 별도의 CSV을 생산하는 계산을 다시 실행하지 않습니다. [파일 및 버전](files.md) 참조.

검토를 검사하려면 필요한 버전의 **Review**을 선택하여 체크를 확장하고 인용 된 활동을 검사하기 위해 **Go to transcript**을 사용합니다. **No issues found**은 그 체크와 그 버전에 적용됩니다; 누락된 실행 또는 환경 증거를 채우지 않습니다. 검토가 중단 된 경우 **Review error** 항목을 열고 **Re-run review**을 선택합니다. 완료 후, 파일의 **Review** 탭으로 돌아가 새로운 결과를 확인합니다. 이전 실패 시도는 대화에서 볼 수 있습니다.

## 재현성 {/* #reproducibility */}

캡처 된 결과를 다시 실행하려면 출력을 비교하고 검증 기록을 저장하고 [Reproducibility 가이드](reproducibility.md)을 따르십시오. 이 장은 Notebook 실행, 검증 검사 및 코드 수출을 포함합니다.

## 수출 및 재사용 코드 {/* #export-and-reuse-code */}

당신의 목표에 일치하는 수출을 선택하십시오:

| 이름 &#42; | 이름 &#42; | 이름 &#42; |
| --- | --- | --- |
| 기록 된 제작자 코드를 읽으십시오 | **Code → Captured producer block → Download** | 원본 경로와 의존성으로 캡처 된 소스 |
| 기록된 Notebook 세포 | **Execution Log → Download notebook** | 선택한 결과/버전의 Notebook 수출 |
| 휴대용 스크립트 준비 | **Code → Generate script** | 검사 및 시험에 대한 모델링 된 재건축 |

<PlatformContent platform="windows">

### Windows에 캡처 된 Python 코드를 다운로드 {/* #download-captured-python-code-on-windows */}

1. 저장된 보고서의 의도 된 버전을 열고, **Provenance → Code**.
2. **Captured producer block**의 밑에, **Download**를 선택하십시오. 저장 대화 상자에서 `.py` 파일명과 목적지를 확인하고 **Save**을 선택합니다.
3. 저장된 파일을 열고 표시된 코드와 비교합니다. PowerShell에서 동일한 Python 해석기로 실행하십시오; `&` 호출 연산자를 사용하여 인용된 실행 가능한 경로 전에.
4. Notebook 및 저장된 보고서로 출력 비교. 코드를 따라 필요한 입력 파일을 유지하십시오.

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows 캡처 프로듀서 코드 및 다운로드 컨트롤" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

이것은 기록 된 코드를 다운로드합니다. **Generate script**은 별도의 재건축 작업입니다. 세대가 실패하면 전체 오류를 유지하십시오. 캡처 된 코드를 다운로드하면 재건축이 성공하지 않습니다.

</PlatformContent>

### 독립 스크립트 생성 {/* #generate-a-standalone-script */}

1. 의도된 버전의 **Provenance → Code**을 엽니다. **Inputs** 및 **Execution Log**을 확인하십시오.
2. **Settings → Model → Main model**의 호환 기본 모델을 선택하십시오. 이 보조 기능은 대화의 모델 선택과 다를 수 있는 정책을 사용합니다.
3. **Generate script**을 선택하고 **Generating…**을 기다립니다.
4. **LLM-generated 재구성** 라벨을 읽으십시오. **Download script**을 선택하기 전에 입력 경로, 의존성 및 출력 위치를 확인합니다.
5. 시스템에서 대화 상자를 저장하고 별도의 디렉토리를 선택하고 `.py` 파일 이름을 확인하고 **Save**을 확인합니다. 저장 된 파일을 열고 표시된 코드를 포함합니다.
6. 스크립트에 의해 예상되는 정확한 파일 이름을 사용하여 입력을 공급하고, 의존성을 준비하고, 그 밖에 앱을 실행합니다. 출력 필드와 입력 체크섬을 저장한 결과와 비교합니다. 완료된 다운로드만으로 계산을 확인할 수 없습니다.

<PlatformContent platform="macos">

![Generated script 미리보기 및 다운로드 컨트롤](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>실습 예제</strong> 수출 된 RNA-seq 체크 아웃 앱</p>

실행 가능한 다운로드 예의 경우 <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>팟캐스트</a>, <a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>입력 CSV</a> 및 <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>예상 JSON</a>를 하나의 폴더로 저장하십시오. 그 폴더에서 `python3 GSE60450-portable-check.py`을 실행합니다. 스크립트는 Python의 표준 라이브러리를 사용합니다. 다운로드 된 예상 JSON을 `expected.json`로 이름을 변경하기 전에 실행 : 스크립트는 `GSE60450-portable-check.json`를 작성합니다. `expected.json`과 같은 생성된 파일 비교하여 스크립트를 새 데이터에 적용하기 전에.

### 스크립트 생성이 사용되지 않을 때 코드 다운로드 {/* #download-code-when-script-generation-is-unavailable */}

앱이 **Artifact 코드 재건축은 Codex 구독 인증을 사용할 수 없습니다.**을 반환하면 이 보조 작업에 대한 호환 공급자를 사용하거나 캡처 된 프로듀서 코드를 다운로드합니다. 이 오류 문제 스크립트 재구성, 일반 Codex Notebook 실행.

**RECONSTRUCTION_UNAVAILABLE(주)에 대하여**의 경우, 누락된 입력 또는 실행 증거를 검사합니다. 캡처 된 코드 다운로드는 사용할 수있는 코드를 보존; 캡처하지 않은 단계를 복구 할 수 없습니다.

### 기록 된 Notebook 내보내기 및 재사용 {/* #export-and-reuse-the-recorded-notebook */}

**Provenance → Execution Log → Download notebook** 선택, 위치 선택 및 저장. 수출을 열고 그것의 언어, 세포 및 산출을 검사하십시오.

외부 rerun의 앞에, 입력 파일, 기록된 Dependencies 및 writable 산출 디렉토리를 준비하십시오. Application-managed 경로만 작업 복사에서, 원래 수출 intact 유지. 수출은 credentials 또는 완전한 신청 환경을 묶지 않습니다. 예 수출은 [예시자료](../reference/example-data.md)에서 가능합니다.

<PlatformContent platform="windows">

Windows Notebook 수출에는 연장이 없습니다, 첫번째 텍스트로 사본을 열고 `nbformat`, `cells` 및 예상된 부호/출력을 가진 Notebook JSON를 포함합니다. 원본을 보존하고, `.ipynb` 확장을 작업 복사합니다. 다른 프로그램이 파일을 열지 않는 변경; 그것은 그것의 내용을 개조하지 않거나 그것의 세포를 다시 실행하지 않습니다.

</PlatformContent>

## Interpret 오류 및 경고 {/* #interpret-errors-and-warnings */}

| 관련 기사 | 다음 작업 |
| --- | --- |
| Missing 변수 | 선택한 언어 / 커널에서 정의하는 코드를 다시 실행 |
| Missing 패키지 | 런타임 패키지를 검사하고 따르는 [런타임](runtimes.md) |
| 입력된 버전 unavailable | 현재 입력을 열거나 첨부하십시오; 적용을 통한 정체성을 해결 |
| PermissionError / 액세스 거부 | 요청된 파일 및 권한 범위를 검사; persistent 접근 실패 보고 [문제 해결](troubleshooting.md) |
| Network/installer 오류 | 이름 &#42; [네트워크](network.md) 영향을받는 hostname 및 전체 오류를 사용하여 |
| 완료된 실행으로 경고 | 경고가 영향을받는 것을 읽으십시오, 그 후에 rerun를 결정하기 전에 저장된 산출을 검열하십시오 |

문제를 보고할 때, 첫 번째 실패 줄을 유지, 선택된 실행 시간, 파일 정체성 및 작업 상태. Link는 그것의 실제적인 생성 뛰기에 산출을 저장했습니다.
