---
title: "Python 및 R 실행 시간"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Python 및 R 실행 시간 {/* #python-and-r-runtimes */}

**Settings → Runtimes**을 열고 노트북 및 에이전트에 사용할 수있는 Python 및 R 환경을 선택하십시오. 환경의 **Ready** 상태는 성공적인 탐지/setup를 나타냅니다; **Enable** 스위치는 별도로 에이전트에 대한 가용성을 제어합니다.

앱 관리 환경 또는 기존 해석기를 선택하십시오. Inspect 그것의 경로, 버전, 준비된 국가 및 사용의 앞에 Enable 스위치. 시스템 R 및 앱 관리 R는 coexist 할 수 있습니다.

<span id="verification-still-required" />

<PlatformGuide />

## 당신의 프로젝트에 대한 환경을 선택하십시오. {/* #before-choosing-an-environment-for-a-project */}

해석기 이름, 경로 및 버전 기록. 첫 번째 Python 분석의 경우 격리 된 앱 관리 환경을 선호하므로 패키지 변경은 관련 연구 환경을 변경하지 않습니다. 설치를 요청하기 전에 필요한 라이브러리를 위해 **Packages**을 검사합니다. 성공적인 패키지 목록은 읽기 전용 체크입니다; 외부 해석자를 수정할 수 있는 에이전트 권한을 부여하지 않습니다.

실행 실패 후, 사용할 수없는 해석기, 누락 된 패키지, denied 요청 및 코드 오류를 구분합니다. 재설치는 모든 실패 분석에 대한 깨진 관리 런타임에 적합하다. 결과를 재현해야 하는 경우, 입력된 버전과 코드를 runtime 세부 사항으로 유지하십시오.

## 주요 통제를 이해하십시오 {/* #understand-the-main-controls */}

| (주) | 목적과 경계 |
| --- | --- |
| **Recheck** | 발견된 해석기 및 그들의 상태를 상쾌하게 합니다. 패널은 마지막 검사 시간을 보여줍니다. 분쟁 해결 작업 중에 사용할 수 없습니다. |
| **Network settings** | Notebook 네트워크 보호를위한 구성을 엽니 다. 배너는 세션 및 패키지 다운로드가 승인 된 도메인에 제한되는지 설명합니다. |
| **Let the Agent create environments** | 에이전트가 환경을 만들고 누락된 런타임을 설정할 수 있는지 여부를 제어합니다. 이 꺼짐은 명시된 사용자 설정 또는 수리 컨트롤을 제거하지 않습니다. |
| **Add interpreter…** | 기존의 해석기를 위한 시스템 실행 가능한 선택기를 엽니다. 실제 실행을 선택하면 검출된 경로와 준비 상태를 확인합니다. |
| **Download and set up** | 앱 관리 환경이 누락되면 준비합니다. |
| **Cancel** 설정 중 | 실행 설정의 취소. 다른 것을 시작하기 전에 해결하기 위해 가동을 기다립니다. |
| **Retry setup** | 그 원인을 해결 한 후 불안정한 설치를 중단하십시오. |
| **Enable &#91;환경&#93;** | 에이전트 선택에 사용할 수있는 환경을 만드십시오. 사용환경을 비활성화하면 충격 확인이 필요할 수 있습니다. |
| **Allow package install** | 사용 가능한 외부 Python 또는 R 환경에 대한 별도의 동의. R 동의는 선택된 개인 도서관에 한정됩니다. 목록 패키지는 설치 동의가 필요하지 않습니다. |
| **패키지 &#91;count&#93;** | 그 해석기에 대한 설치 패키지 재고를 엽니 다. |
| **Reinstall** | app-managed 환경을 재건하기 전에 확인을 엽니 다. |

## 앱 관리 환경 설치 {/* #install-an-app-managed-environment */}

<PlatformContent platform="windows">

**Settings → Runtimes**의 언어 카드 모두 확인. 각각 자체 **Ready** 상태, 버전, **Enable** 스위치 및 **Packages** 버튼이 있습니다. 아래의 카드는 Python 및 R 활성화; Notebook 네트워크 보호에 대한 경고는 별도로 구성됩니다. 개인 경로는이 스크린 샷에 숨겨져 있습니다; 자신의 컴퓨터에서 완전한 경로를 검사.

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Windows 런타임 카드 관리 Python 및 R 준비 및 활성화" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

</PlatformContent>

### 앱 관리 Python 설치 {/* #install-app-managed-python */}

<PlatformContent platform="macos">

![Python 설정의 실행 시간 설정](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. **Python → App-managed environment** 찾기.
2. **Download and set up**을 선택합니다.
3. 진행 메시지 및 대기를 읽으십시오. **Cancel**은 설정이 실행되는 동안 사용할 수 있습니다.
4. 성공시 **conda: 기본python**, **App-managed** 및 **Ready**를 확인하십시오.
5. 해석기 경로와 **Enable conda: 기본python** 스위치를 확인하십시오.

<PlatformContent platform="macos">

![앱 관리 Python 환경 만들기](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Python 설정 완료](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
**Ready**, 선택된 해석기 경로 및 활성화된 상태를 확인합니다. 포장 조사와 버전은 임명 근원과 다를 수 있습니다; 스크린 샷의 임시 경로를 영구적으로 사용하지 마십시오.

### 앱 관리 R 설치 {/* #install-app-managed-r */}

1. **Settings → Runtimes** 및 스크롤을 **R**로 엽니다.
2. **App-managed environment**에서 **Download and set up**을 선택합니다. 기존 시스템 R은 이 별도의 환경에서 당신을 막지 않습니다.
3. 다운로드 및 환경 만들기에 대한 기대. 응용 프로그램을 열고 복원하기 전에 오류를 읽으십시오.
4. **conda: 기본 R**, **App-managed**, **Ready** 및 활성화 스위치를 확인합니다.
5. **Packages**을 엽니다. **Filter packages**에 `r-base`을 입력하여 설치 된 R 버전 및 채널을 확인하십시오. 모든 패키지를 볼 필터를 취소합니다.

<PlatformContent platform="linux">

![앱 관리 R는 Linux에서 준비하고 활성화됩니다.](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![앱 관리 R 환경 다운로드](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![앱 관리 R 설치 및 활성화](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
`r-base` 필터링을 확인하면 설치된 R 패키지를 버전과 채널로 반환합니다. 패키지 총은 환경을 반영하고 스크린 샷과는 다를 수 있습니다.

<PlatformContent platform="macos">

![R 패키지 재고에서 r-base 확인](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## 기존의 해석기 연결 {/* #connect-an-existing-interpreter */}

<PlatformContent platform="windows">

**Add interpreter…** 을 사용해서 Windows 파일 선택기를 열 수 있습니다. 설치 환경의 실제 `python.exe` 또는 `R.exe`을 선택한 다음 **Open**를 선택하십시오. 공백이 포함된 경로에 대해서는, 파일 선택기 또는 **File name** 필드를 사용하십시오. Runtimes에서, 검출된 경로 및 버전을 확인하고, **Recheck**을 선택하고, 그 환경을 활성화하십시오. 오픈 피커는 혼자서 해석자가 추가되지 않습니다.

</PlatformContent>

### R을 이미 컴퓨터에 설치 {/* #use-r-already-installed-on-your-computer */}

**Recheck**을 선택하고 검출된 R 경로 및 버전을 검사합니다. 해석자가 복부인 경우, **Add interpreter…**을 사용하여 실행할 수 있습니다. **Ready** 및 **Enable**에는 다른 의미가 있습니다. 검출은 해석기가 사용할 수 있다는 것을 확인합니다; 에이전트에서 선택할 수 있도록 합니다.

R Notebook에서 `R.home()`를 확인하여 사용환경을 확인합니다. 의존도를 설치하려면 [외부 R 임명 단계](#external-r-packages)을 사용하여 개인 라이브러리를 승인하십시오.

<PlatformContent platform="macos">

`/opt/homebrew/bin/R`과 같은 검출된 경로는 시스템 설치를 식별합니다.

</PlatformContent>

### 외부 Python 등록 및 사용 {/* #register-and-use-external-python */}

<PlatformContent platform="linux">

`/usr/bin/python3`과 같은 시스템 해석기는 이미 **Ready**로 나타날 수 있습니다. 에이전트를 선택하기 전에 사용하려는 환경을 사용할 수 있습니다. 아래 검출된 Python 해석기는 비활성화되어 있으며, 앱 관리 Python 환경이 설정되지 않았습니다. 관리 환경을 준비하려면 **Download and set up**을 사용하십시오.

![Linux은 기존 Python 해석기를 준비하여 Enable 스위치를 꺼냅니다.](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. 사용하려는 Python 환경을 준비하십시오.
2. **Add interpreter…**을 선택하면 Python 실행을 선택하고 **Ready**, 경로 및 버전을 확인하십시오.
3. **Recheck**을 사용하여 감지를 확인한 다음 특정 환경을 활성화합니다.
4. 에이전트가 Notebook에 대해 명시적으로 선택하도록 요청하십시오.
5. `sys.executable` 및 Python 버전을 설치 라이브러리에 의존하기 전에 인쇄하십시오.

<PlatformContent platform="macos">

symlink 해석기는 macOS 파일 선택기에서 선택될 수 없는 경우에, 예정된 환경의 실제 실행을 선정하십시오. 바인딩 후에 `sys.executable`를 확인하십시오. 스크린 샷의 임시 예제 경로보다 안정적인 설치 경로 사용.

</PlatformContent>

#### 패키지 권한 및 설치 outcome {/* #package-permission-and-installation-outcome */}

외부 Python 환경에서 새로운 패키지를 위해 **Allow package install**을 먼저 확인하십시오. 권한을 부여 한 후, 설치를 완료하고 계속하기 전에 동일한 환경에서 가져 오기를 확인합니다.

설치가 `403 Forbidden` 또는 `destination resolves to a non-public network address`을 보고하면 영향을 받은 호스트명을 검사하고 재시동하기 전에 [네트워크](network.md)를 따르십시오. 이 오류는 네트워크 액세스를 우려하고 패키지가 사용할 수 없다는 것을 증명하지 않습니다. 네트워크 보호 활성화를 유지하십시오.

#### Notebook에 의해 사용되는 환경 해제 {/* #disable-an-environment-used-by-a-notebook */}

**Enable** 스위치를 선택하고 확인하기 전에 Active/idle 커널 카운트를 읽으십시오. Disabling은 커널을 닫을 수 있습니다; 다시 활성화 후, 세션을 다시 사용할 수 있는 실행 시간을 선택합니다. 이 패널은 별도의 **번역자 찾기** 동작보다/disable 컨트롤을 제공합니다.

## 외부 R에 패키지 설치 {/* #external-r-packages */}

기존 R 해석기가 작동하지만 추가 패키지가 필요합니다. 앱은 시스템 또는 사이트 라이브러리가 아닌 하나의 기존 개인 라이브러리에 설치 액세스 권한을 부여합니다.

1. **Settings → Runtimes**에서는 의도한 외부 R 환경을 활성화하고 경로/버전을 확인합니다.
2. **Personal R package library**의 밑에, 검출된 위치를 검열하고 또는 자격이 된 도서관을 선정하십시오. 아무도 감지되면 **Advanced options → Choose library folder…**을 사용하여 R 해석기에 표시된 기존의 writable 개인 라이브러리를 선택하십시오. 이 동작은 폴더를 만들지 않습니다.
3. **Allow package install** 사용 제출하기 전에 선택한 경로 읽기 :이 라이브러리를 사용하여 다른 프로젝트는 설치 된 패키지 변경 사항을 볼 수 있습니다.
4. 이 R 환경을 naming 앱 패키지 관리 작업을 통해 필요한 패키지를 요청하십시오. 설치 결과와 모든 커널-restart 명령어를 따르십시오.
5. `R.home()`, `.libPaths()`, `library(PACKAGE_NAME)` 및 `packageVersion("PACKAGE_NAME")`를 실행하여 패키지 위너를 교체합니다. 분석하기 전에 의도 된 라이브러리가 사용되었는지 확인하십시오.

**Allow package install** 을 눌러 향후 설치 동의를 취소합니다. 이미 작성된 패키지를 제거하지 않습니다. 다른 라이브러리를 선택하기 전에 동의를 철회합니다. 자격이 없는 폴더가 존재하지 않는 경우, 앱 외부의 개인 R 라이브러리를 준비하거나 앱 관리 환경을 사용하십시오. 시스템 라이브러리를 선택하지 마십시오. 실패한 체크를 우회하십시오.

## 캡처 된 잠금에서 복원 패키지 {/* #conditional-restore */}

저장된 결과를 위해, **Provenance → Environment**를 열고 붙잡힌 자물쇠를 검사하십시오. **Download bundle**을 사용할 때 제공. 모든 것을 복원하기 전에 번의 지침 및 우선 순위를 읽으십시오.

외부 R는 유효한 `renv` 임명 및 지원된 `renv.lock`를 요구합니다; 외부 Python는 pinned hashes를 가진 기존하는 지원한 필요조건 자물쇠를 필요로 합니다. 해석기 경로 및 패키지 이름의 목록은 혼자 충분하지 않습니다. 캡처 된 해석기, 플랫폼, 아키텍처 및 패키지 관리자 요구 사항은 복원 환경을 일치해야합니다.

번들을 추출하고, 새로운 writable 목적지를 선택하여, 번들 지침을 따르는 실제 해석기와 목적지 경로와 함께 포함 된 `restore-packages.py`을 실행합니다. 스크립트 체크 prerequisites and checksums before restoring Package, 그 후 그들의 효과적인 버전과 경로 확인. 체크가 실패한 경우, 잠금을 강제로 편집하는 대신 조건을 해결하십시오. Open-Science는 채택하지 않거나 이 외부 목적지를 삭제하지 않습니다.

이것은 조건부 패키지 복원, 전체 환경 복제되지 않습니다. 결과를 다시 열고 [재현성](reproducibility.md)을 사용하여 지원된 캡처된 조리법이 출력을 비교할 수 있습니다.

## Inspect 설치 패키지 {/* #inspect-installed-packages */}

Python 카드에 **Packages**을 선택합니다. 대화 상자는 환경의 경로, 패키지 소스 및 상태를 보여줍니다.

**Filter packages**의 `numpy`과 같은 패키지 이름을 입력하면 버전과 채널을 검사하고, 필터를 제거하여 목록을 복원합니다. **Close**을 반환합니다.

<PlatformContent platform="macos">

![설치된 Python 패키지 필터링](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
테이블 열은 **Name**, **Version**, **Build** 및 **Channel**입니다. 빌드에서 dash는 빌드 값이 표시되지 않습니다. 이 대화 상자는 재고가 없습니다. 패키지 설치 또는 제거 버튼이 없습니다. 이 대화 상자 안에 "Install Package" 필드를 찾을 수 없습니다.

<PlatformContent platform="windows">

Python 카드에서 **Packages** 및 `pip` 필터를 선택하십시오. R 카드에서 `r-base` 용 필터. 버전 비교하기 전에 대화 상자 제목에 이름을 붙여 넣으십시오. 이 스크린 샷은 패키지를 설치; 그들은 새로운 패키지 설치를 표시하지 않습니다.

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Python 패키지 재고 필터 pip" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows R 패키지 재고 필터링 r-base" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

</PlatformContent>

## 실제 분석과 환경을 검증 {/* #verify-the-environment-with-a-real-analysis */}

선택한 환경에서 작은 계산을 실행하고 출력을 다시 열고 [공유 baseline](../reference/example-data.md)과 비교합니다. 실행 및 수출을위한 [R Notebook](notebook.md#run-the-same-gene-count-check-in-r)을 따르십시오.

[Data-quality 워크플로우](../workflows/data-quality.md)은 기존의 의존성을 사용하여 Python 경로를 제공합니다. 성공적인 계산은 새로운 패키지가 설치되거나 커널을 다시 시작할 수 있음을 보여주지 않습니다.

<PlatformContent platform="macos">

![성공적인 진짜 Notebook 계산](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
수입이 실패하면 선택한 런타임과 설치 패키지를 검사합니다. hostname이 예약된 주소로 해결하기 때문에, [네트워크](network.md)을 따르십시오. 기존 패키지와 함께 실행된 코드는 추가 패키지가 설치될 수 없다는 것을 설정하지 않습니다.

다른 분석의 앞에, 선택된 환경에 있는 그것의 필수 포장을 검열하십시오. 지원되는 포장 관리 가동을 필요하다면, 실제적인 결과를 읽고, 어떤 재시작 필요조건든지 따르고, 수입품을 확인합니다. 허가 승인, 진도 카드 또는 준비 해석기는 수입 시험이 아닙니다.

불완전한 환경 또는 실행 증거를 가진 저장된 결과를 위해, **Provenance**를 열고 누락한 정보를 검사하십시오. 재현성 검사에 대한 새로운 버전을 준비하려면 [환경준비](reproducibility.md#prepare-environment)을 따르십시오. 숫자 결과 일치는 누락된 검증을 채우지 않습니다.

### 활성 해석기 확인 {/* #confirm-the-active-interpreter */}

Python 또는 R을 준비한 후 해당 Notebook 언어의 다음 명령을 실행하여 실제 버전과 경로를 확인합니다. 설정은 여러 환경을 나열 할 수 있습니다; 현재 실행의 출력을 사용하여 사용중인 것을 식별합니다.

Python:

```python
import sys
print(sys.version)
print(sys.executable)
```

R:

```r
R.version.string
R.home()
```

다음, 작은 프로젝트 테이블을 읽고, 그것의 행 수를 확인하고 결과를 저장하십시오. 앱을 다시 열고 분석하기 전에 체크를 다시 실행하십시오. 읽을 수있는 역사적인 보고서는 이전 in-memory 변수를 여전히 존재하지 않습니다. Notebook 컨트롤에 대한 [Notebook 및 실행 증거](notebook.md) 참조.

<PlatformContent platform="windows">

<p className="example-label"><strong>실습 예제</strong> 활성 Windows Python 해석기 확인</p>

연구 데이터를 사용하기 전에 빠른 검사를 위해 에이전트가 Python 버전 / 경로 명령을 **세션 Notebook**에서 실행하고 Markdown 보고서에서 실제 출력을 저장하십시오. 설치된 `pip` 버전을 확인하려면 `import importlib.metadata` 및 `print(importlib.metadata.version("pip"))`를 추가하십시오.

Notebook의 출력을 열고 저장된 보고서와 비교하십시오. Windows 10 예 Open-Science v0.28.0 보고서 Python **3.12.13** 및 `pip` **26.1.2**. 읽기 패키지 메타데이터는 설치 또는 그 패키지를 가져올 수 없습니다.

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook는 실행 코드와 실제 버전 출력을 보여주는" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="완전한 Windows 스크린 샷을 엽니 다" />

Windows conda R 시작 또는 커널 회복 실패를 위해, 재시동하기 전에 v0.30.2 또는 나중에 사용하십시오. 이 릴리스는 환경 준비 및 R 커널 복구 후 실행 가능한 조회를 수정합니다. 업데이트 후, 환경을 다시 확인하고 Notebook에서 작은 R 계산을 실행; **Ready** 혼자는 실행 결과가 아닙니다. 아래 스크린 샷은 원래 실행의 버전과 결과를 유지합니다.

v0.31.0에서, Windows R는 첫번째 조정 보호한 형태 없이 표준 형태에서 실행할 수 있습니다. 버전별 지침으로 이전 릴리스에서 **R 액세스 권한을 부여하기 전에 보호 모드를 활성화하십시오.**을 치료하십시오. 네트워크 보호 및 패키지 설치 권한은 별도의 컨트롤을 유지. v0.31.1에서 Notebook 네트워크 보호에 의해 차단된 실행은 관련 설정에 대한 링크와 인라인 경고를 보여줍니다; 세포가 실행되지 않았습니다. 필요한 접근을 검토 한 다음 다시 실행하고 출력을 확인합니다.

<span id="windows-runtime-qc" />

<p className="example-label"><strong>실습 예제</strong> 샘플 QC 테이블을 가진 Windows Python와 R 환경을 검사하십시오</p>

다음 분석은 다른 Windows 11 컴퓨터와 기존 Python/R 환경을 사용합니다. 당신의 임명을 검사할 때 당신의 자신의 뛰기에서 경로 및 산출을 사용하십시오.

<a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>표본 QC CSV</a>을 다운로드하고 프로젝트 세션에 첨부합니다. 이것은 표본 당 1개의 줄과 더불어 12 줄 요약입니다. 아래 체크는 기존의 메트릭을 읽습니다. 그들은 원래 유전자 카운트 매트릭스를 재 계산하지 않습니다. 입력 설명과 미터 정의는 [예시자료](../reference/example-data.md)에 있습니다.

**Python로 테이블을 읽으십시오.** 세션 Notebook에서 선택한 Python 환경을 사용하려면 에이전트에게 표준 라이브러리 만 사용됩니다. `sys.version`, `sys.executable`, 아래 테이블에서 4 개의 체크 및 저장된 Markdown 보고서를 요청하십시오. 첨부 파일의 경로를 사용합니다. 입력을 바꾸지 않는 것을 읽기 위하여는, SHA-256를 읽기 전에 산출하고 파일을 다시 여는 후에 다시.

저장된 보고서와 **Provenance → Code** 보기를 엽니다. 보고된 해석기와 결과를 가진 붙잡힌 부호를 비교하십시오. 이 예에서 Python은 버전 **3.12.13** 및 `runtime\envs\.p\python.exe`에서 실행 가능한 종료를 보여줍니다. 입력 hashes 전후에 다시 닫는 경기.

아래 세부 사항은 **Inputs**과 캡처 된 코드를 보여줍니다. 저장 된 보고서와 함께 전체 스크린 샷을 열려면 이미지를 클릭하십시오.

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Python 결과의 Provenance 코드 보기의 세부 사항, 입력 및 캡처 프로듀서 코드를 보여주는"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="저장 된 보고서와 캡처 된 코드와 완전한 Windows Python 스크린 샷을 엽니 다"
/>

**R과 같은 테이블을 읽으십시오.** 선택된 에이전트에게 물어보기 R 세션의 환경 Notebook기초와 더불어, R 만.. `R.version.string`, `R.home()`, 동일한 4개의 체크 및 분리되는 저장된 보고를 요구하십시오. **Notebook run** 카드를 확장하여 코드를 검사하고 보고서를 열고 결과를 비교합니다. 이 예에서 R은 **4.4.3** 버전과 `runtime/envs/.r/Lib/R` 버전의 홈 디렉토리를 보여줍니다.

![Windows R Notebook 통화 및 저장 된 보고서 활성 R 설치 및 샘플 - QC 결과](/img/open-science/windows/runtime-r-execution.webp)

이 스크린 샷의 설치 경로는 예 컴퓨터에 속합니다. 당신의 자신의 기계에 다른 드라이브 편지, 폴더 및 해석기 버전은 정상적입니다.

둘 다 보고는 이 입력을 위한 뒤에 오는 결과를 줍니다:

| 【특전】 | 이 예에서 결과 |
| --- | ---: |
| 데이터 행 | 12 |
| 사이트맵 `original_column_name` 계정 정보 | 12 |
| 총 합계 `total_raw_counts` | 269,027,617 |
| 줄 위치 `zero_count_genes + detected_genes_count_gt_0` 27,179과 동일 | 12 |

사용하려는 환경에 대한 실행 경로 일치, 다음 테이블에 저장된 결과를 비교. 이 사용은 Python의 표준 라이브러리 및베이스 R을 실행; 그들은 추가 패키지를 요구하거나 새로운 패키지가 설치 될 수 있음을 보여줍니다.

</PlatformContent>

## 유지 및 수리 환경 {/* #maintain-and-repair-environments */}

### 설정 및 복원 취소 {/* #cancel-setup-and-retry */}

**Download and set up** 도중, **Cancel**를 선택하고 **Runtime 설정 취소**를 기다리십시오. **Retry setup**을 선택하고 **Ready**을 기다리며 환경을 검사하기 위해 **Packages**를 엽니다. 첫번째 가동이 아직도 settling 동안 두번째 체제를 시작하지 마십시오.

<PlatformContent platform="macos">

![취소된 설정 및 사용 가능한 retry](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
<span id="review-a-reinstall-before-committing-it" />

### 관리 환경 재설치 {/* #reinstall-a-managed-environment */}

1. 필요한 보고서를 저장하고 추가 패키지를 기록하십시오.
2. **Reinstall** 을 선택하여 관리된 환경에서 선택합니다.
3. 충격 통지를 읽고, 다음 **Reinstall runtime**을 선택합니다.
4. **Ready**에 대한 대기 및 **Packages** 검사.
5. 새로운 Notebook 셀을 시작하고 저장된 입력 및 출력을 다시 엽니다.

<PlatformContent platform="macos">

![Notebook 세션 중 확인 제거](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
재설치 삭제 및 재생 환경. 운동 회복에서 활성 셀은 **실행 취소 : 이 세포가 실행 된 동안 실행 시간이 중지되었습니다.**과 취소되었습니다. 오래된 Notebook 역사는 눈에 띄지 만 네임스페이스는 더 이상 존재하지 않습니다. 이전 변수가 복부되었는지 확인 된 신선한 세포; 변경되지 않은 CSV은 여전히 12 행과 269,027,617 카운트를 반환하고 저장된 보고서가 다시 열렸다.

<PlatformContent platform="macos">

![커널이 중단된 후 Notebook 역사](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
삭제된 파일 및 유지된 커널 메모리는 다릅니다. 필요한 코드를 다시 실행하여 변수를 재구성합니다. 추가 패키지는 재설치가 필요할 수 있습니다. 기초 환경의 성공적인 회복은 각 추가한 의존성의 회복을 설치하지 않습니다.

### 개발 빌드: micromamba 찾을 수 없습니다 {/* #development-build-micromamba-not-found */}

소스 빌드의 첫 번째 시도는 개발 프로세스가 micromamba를 찾을 수 없기 때문에 제공 전에 실패했습니다.

<PlatformContent platform="macos">

![소스 빌드에서 실제 누락 된 micromamba 오류](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
패키지 응용 프로그램은이 바이너리를 포함한다. 소스 빌드의 경우, 해당 프로세스의 시작 환경에서 실행 가능한 유효한 micromamba에서 `OPEN_SCIENCE_MICROMAMBA_BIN`을 포인트로 설정하고 개발 인스턴스를 다시 시작합니다. 호환 설치에서 바이너리 경로를 사용하여 relaunching 전에 실행할 수 있습니다.

이 환경 변수는 개발 설정 세부 사항이며 Runtimes 페이지의 필드가 아닙니다. 환경 디렉토리를 삭제하지 마십시오. 이 발견 오류.

<PlatformContent platform="windows">

## 옵션 WSL2 Bash 미리보기 {/* #wsl2-preview */}

Windows x64는 **Settings → Runtimes**에 있는 선택적인 **Local Shell · WSL2 Bash Preview**를 이용할 수 있습니다. 작업이 Linux 쉘을 필요로하지 않는 PowerShell 유지; WSL2은 Windows에서 Open-Science을 사용하지 않아야 합니다.

WSL2 배포 및 정확한 비 루트 **Linux user**을 선택한 다음 **Save and check**를 선택하십시오. 플랫폼 / 분산 설정 지침을 먼저 따르십시오. Readiness checks and matching 미리보기 리소스는 **Use WSL2 Bash** 이전에 전달해야 합니다. 혼자 배포를 선택하면 활성화하지 않습니다. 작은 쉘 명령을 실행하고 더 긴 작업을 시작하기 전에 결과를 검사합니다. PowerShell 옵션을 사용하여 기본 쉘으로 반환합니다.

readiness가 실패하면,보고 된 이유를 유지하고 PowerShell을 계속하여 해결합니다. 설치 WSL 구성 요소는 Windows 관리자 승인이 필요할 수 있습니다. 이 미리보기는 Python/R Notebook 해석기를 선택하여 분리됩니다.

</PlatformContent>
