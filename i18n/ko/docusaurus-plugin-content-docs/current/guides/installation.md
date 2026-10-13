---
title: "설치 및 업데이트"
last_update:
  date: '2026-10-13'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 설치 및 업데이트 {/* #installation-and-updates */}

대부분의 사용자는 GitHub 릴리스에서 데스크탑 패키지를 설치해야 합니다. 기여자 또는 최신 코드를 테스트하는 사람이 소스에서 앱을 실행할 수 있습니다. Electron 데스크톱 클라이언트는 공용 Node 백엔드에 연결하여 정통 로컬 브라우저 인터페이스를 제공합니다.

<PlatformGuide />

## 설치방법 선택 {/* #choose-an-installation-method */}

### 데스크톱 설치 프로그램 다운로드 {/* #install-the-desktop-app */}

1. [Open-Science 출시](https://github.com/aipoch/open-science/releases)을 엽니다.
2. 운영 체제 및 CPU 아키텍처와 일치하는 패키지를 다운로드하십시오.
3. installer와 complete installation에 의해 표시된 라이센스를 읽어, 그 다음 앱을 시작합니다. 5 단계 설정 마법사가 첫 번째 실행에 열립니다.
4. 운영 체제가 서명되지 않은 응용 프로그램을 차단하면 공식 AIPOCH GitHub 저장소에서 다시 다운로드하고 소스를 검사 한 후 플랫폼의 보안 프롬프트를 따르십시오.

릴리스에 첨부된 **투자정보**에서 선택하면 자동으로 생성된 소스 코드 ZIP이 아닙니다. Availability는 해당 공개 자산에 달려 있습니다.

<PlatformContent platform="macos">

| (주)아이디 | 건축의 식별 | 패키지 및 설치 |
| --- | --- | --- |
| macOS, 애플 실리콘 | 이 맥에 대해 Apple M-series 칩을 보여줍니다. | 제품 정보 `mac-arm64.dmg`; 응용 프로그램에 응용 프로그램을 드래그 한 다음 그것을 실행 |
| macOS, 인텔 | 이 맥에 대해 인텔 프로세서를 보여줍니다 | 제품 정보 `mac-x64.dmg`; 적용분야 응용 프로그램은 macOS 12 이상 필요 |

**Homebrew로 설치**

Homebrew로도 설치할 수 있습니다:

~~~bash
brew install --cask open-science
~~~

Homebrew는 Apple Silicon 또는 Intel을 자동으로 선택합니다. 설치 후, **Settings → General → About**을 열고 설치 된 버전을 확인; 패키지 관리자는 문서 기본보다 더 새로운 릴리스를 해결할 수 있습니다. [태그 설치 지침](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

공식 Windows 설치자는 v0.33.2에서 부호 서명됩니다; v0.33.3은 번들로 실행할 수 있는 서명을 확장합니다. [공식 다운로드 페이지](https://aipoch.com/open-science/download) 또는 [GitHub 출시](https://github.com/aipoch/open-science/releases)에서 다운로드하고 패키지 소스를 확인하기위한 공식 검증 노트를 따르십시오.


| (주)디지 | 건축의 식별 | 패키지 및 설치 |
| --- | --- | --- |
| Windows | 설정 → 시스템 → 시스템 유형에 대해 | 일치하는 것을 선택하십시오 `win-…-setup.exe`; 현재 사용자 설치 프로그램을 실행하고 위치 프롬프트를 따르십시오 |

1. 다운로드 Windows 설치 프로그램을 열고 설치 위치 페이지로 이동합니다.
2. 기본 위치를 유지하거나 응용 프로그램에 대한 폴더를 선택하려면 **Browse…**을 선택하십시오. 다음 **Install**을 선택하십시오.
3. 완료 페이지가 기다립니다. **Finish**을 선택하여 Open-Science을 엽니다.
4. [첫 번째 시간 설정](onboarding.md)을 따라 환경을 확인하고 데이터 위치, 에이전트 및 모델을 구성합니다.

</PlatformContent>

<PlatformContent platform="linux">

| (주)아이디 | 건축의 식별 | 패키지 및 설치 |
| --- | --- | --- |
| 우분투 / 데비안 | `uname -m`: `x86_64` x64를 의미한다. `aarch64` 의미 ARM64 | 일치하는 것을 선택하십시오 `.deb`, 시스템 패키지 설치자와 함께, 다음 응용 프로그램 메뉴에서 실행 |
| 다른 지원되는 Linux 배급 | 【특전】 `uname -m` | 일치하는 것을 선택하십시오 `.AppImage`, 파일의 권한에서 실행을 허용, 다음 그것을 엽니 다; 배포에 의해보고 된 모든 의존성 오류를 해결 |

v0.34.0는 Linux **x64와 ARM64** 패키지를 제공합니다. ARM64의 경우 `aipoch-open-science-0.34.0-linux-arm64.AppImage` 또는 `aipoch-open-science_0.34.0_arm64.deb`을 선택하십시오. x64는 `aipoch-open-science-0.34.0-linux-x86_64.AppImage` 및 `aipoch-open-science_0.34.0_amd64.deb`입니다. 선택한 릴리스의 공식 자산에서 다운로드하고 `uname -m`의 결과를 일치합니다.

</PlatformContent>

설치 위치에는 애플리케이션을 저장하고, 설정 마법사의 **Data location**에는 연구 파일과 실행 환경을 저장합니다. 두 위치는 별도로 설정합니다. 설치 후 [초기 설정](onboarding.md)을 진행하세요.

### 독립 CLI 사용 {/* #standalone-cli */}

데스크톱 창없이 작동하려면 [공식 출시](https://github.com/aipoch/open-science/releases/tag/v0.37.2)에서 일치 독립 CLI 아카이브를 다운로드하십시오. 그것은 Node, 백엔드 및 웹 UI를 묶습니다. 완전한 디렉토리를 추출 한 다음 [CLI 설정](../reference/cli.md#terminal-setup)을 따르고 모델을 구성하고 readiness를 확인합니다. 데스크톱 사용자는 여전히 **Settings → General → Install command**을 사용할 수 있습니다.

#### 홈 양조장 CLI {/* #homebrew-cli */}

macOS 또는 Linux에서 `brew install aipoch/tap/open-science`로 CLI 공식을 설치하십시오. 이것은 데스크탑 케이스에서 분리됩니다. 그것은 Node과 로컬 웹 UI를 포함합니다; 설치는 서비스를 시작하지 않습니다. 또 다른 발사자가 `open-science`을 소유하면 `type -a open-science`을 검사하고 다른 설치 링크 대신 `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"`를 사용합니다.

#### Linux CLI 패키지 {/* #linux-cli-packages */}

맨끝/브로셔 임명을 위해, **개방 과학 - cli**를, **aipoch-open-과학** 탁상용 포장 아닙니다 선택합니다. 동일한 릴리스에서 일치하는 자산과 `CLI-PACKAGE-SHA256SUMS.txt`을 다운로드 한 다음 SHA256 체크섬을 비교하십시오.

| 유통/건축 | v0.37.2 CLI 자산 |
| --- | --- |
| 데비안 / 우분투, x64 | `open-science-cli_0.37.2_amd64.deb` |
| 데비안 / 우분투, ARM64 | `open-science-cli_0.37.2_arm64.deb` |
| 페도라, x64 | `open-science-cli-0.37.2-1.x86_64.rpm` |
| 페도라, ARM64 | `open-science-cli-0.37.2-1.aarch64.rpm` |

적절한 패키지 관리자로 다운로드 된 파일을 설치합니다. 이 예제는 x64를 사용합니다. 적절한 경우 ARM64 파일명을 사용합니다.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_0.37.2_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-0.37.2-1.x86_64.rpm
```

`open-science-cli start --no-open`을 실행하고 `open-science-cli status --json`을 실행합니다. 일단 실행되면, 정통 로컬 웹 인터페이스를 열려면 `open-science-cli url`을 사용하십시오. URL을 개인적으로 유지하십시오. [CLI 설정](../reference/cli.md#terminal-setup) 모델 구성 및 `doctor` 체크를 위해 계속하여 `open-science`를 `open-science-cli`로 대체합니다.

패키지 번들 Node, 백엔드 및 웹 UI. Python/R을 설치하지 않거나 자동으로 시스템 서비스를 시작하지 않습니다. OS credential 상점과 sandbox prerequisites는 아직도 적용합니다; [헤드리스 Linux 자격](../reference/server.md) 참조. 데스크톱 발사기가 설치되면 `open-science-cli`을 명시적으로 사용하십시오.

격상시키기 전에 또는 포장을 제거하기 전에, 끝 일 및 정지 **모든 프로파일은 그 패키지에 의해 시작**. apt/dnf를 통해 다음 다운로드 패키지를 설치; 이 설치에 의해 구성 된 AIPOCH apt/dnf 저장소가 없습니다. 포장 제거는 연구 자료와 credentials를 보존합니다. [공식 패키지 가이드](https://github.com/aipoch/open-science/blob/v0.37.2/docs/standalone-runtime.md#linux-cli-distribution-packages)은 명령 충돌과 플랫폼 요구 사항을 설명합니다.

### 소스에서 실행 {/* #run-from-source */}

당신은 Git, Node.js 24, npm 및 Electron에 대한 플랫폼 빌드 prerequisites가 필요합니다. 응용 프로그램에서 에이전트 프레임 워크를 설치 또는 선택. 설치 중에 저장소는 Prisma Client를 생성하고 앱 패치를 적용하고 Electron native Dependencies를 준비합니다.

재현 가능한 소스 설치를 위해, 의존성을 설치하기 전에 [관련 링크](../changelog/v0.37.2.md)에서 의도한 릴리스 태그를 선택하십시오. 기본적으로 clone은 고정 릴리스보다는 분기를 따릅니다. 선택된 태그, 소스 커밋 및 런타임 버전을 기록하므로 다른 사람이 환경을 재현 할 수 있습니다.

선택된 릴리즈에 표시된 정확한 태그로 아래 `RELEASE_TAG`을 대체하십시오. (`v`)를 포함합니다. 지속적인 개발을 따르기 위하여 대신, omit `--branch RELEASE_TAG --depth 1`; 체크 아웃은 기본 지점을 따라합니다.

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

포장하기 전에 생산 빌드, 실행 :

```bash
npm run build
```

선택한 태그의 package.json 및 [독립 실행 시간 안내](https://github.com/aipoch/open-science/blob/v0.37.2/docs/standalone-runtime.md)을 사용하여 빌드 대상과 종속성을 제공합니다. `npm run dev:web`는 Node/Web 항목 포인트를 개발; `npm run dev`은 데스크톱 클라이언트를 준비합니다. 격리된 구성 디렉토리를 사용하여 테스트 데이터를 분리합니다.

## 첫 번째 시간 설정 완료 {/* #complete-first-time-setup */}

### 외부 서비스 및 실행 시간 {/* #external-services-and-runtimes */}

| 공급 능력 | 견적 요청 | 제품정보 |
| --- | --- | --- |
| OpenCode, Claude Agent, Codex 또는 CodeBuddy | 적어도 하나 | 대화 에이전트 세션을 실행 |
| 모델 접근 | 에이전트 요청에 필요한 | 지원되는 구독 또는 API 공급자; 구독 액세스는 별도의 API 키가 필요하지 않습니다. |
| Python 또는 R | 옵션 정보 | 노트북 코드를 실행; 감지 시스템 환경 또는 앱 관리 환경 사용 |
| 네트워크 액세스 | (주) | 런타임을 설치하고 공급자, GitHub, 원격 서비스 및 MCP 커넥터를 연결 |
| SSH 호스트 | 옵션 정보 | Compute panel을 통해 원격 작업 및 검색 결과를 실행합니다. |

### 지역 정보 {/* #local-data */}

설정 마법사는 artifacts, Notebook 파일 및 환경과 같은 큰 연구 파일에 대한 관리 된 데이터 위치를 보여줍니다. Application 설정 및 대화 기록은 구성 위치에 남아 있습니다. 연구 데이터 위치가 전체 애플리케이션 백업이 아닙니다. 소스 저장소에서 분리 유지; [저장소](storage.md)을 사용하여 앱이 실행되는 동안 수동으로 내부 파일을 이동 대신 재구성합니다.

## 앱이 준비되어 있는지 확인하십시오. {/* #installation-is-complete-when */}

신청은, 필수 환경 체크 통행, 대리인 설치되고, 모형 접근은 확인됩니다. Python/R 설정은 해당 언어를 실행하는 작업에만 추가적으로 필요합니다. CSV 또는 PDF 미리보기를 열고 Notebook 실행 시간을 유효하지 않습니다. [첫 번째 시간 설정](./onboarding.md), [공급자 및 지역 모델 설정](./providers.md)을 따르십시오.

## 자주 묻는 질문 {/* #choose-a-reproducible-version-and-update-deliberately */}

**Settings → General → About**에서 설치 된 버전을 읽고 **Check now**을 사용하여 업데이트 가용성을 확인하십시오. 설치하기 전에 나열된 버전을 검사하고 활성 작업을 먼저 완료합니다. 개발 소스 빌드는 패키지 설치에서 다르게 업데이트 할 수 있습니다. 갱신의 앞에 중요한 수출한 결과의 사본을 지키십시오; 애플리케이션의 내부 데이터 디렉토리를 변경하지 마십시오.

<PlatformContent platform="macos">

**업데이트하기 전에 Open-Science를 설치하세요**이 나타나면 앱이 읽기 전용 위치에서 실행됩니다. **응용 프로그램에 설치**을 선택하거나 Finder에서 앱을 이동하십시오. 설치 후, **다시 시작**을 사용하거나이 복사를 종료하고 응용 프로그램에서 하나를 다시 열면 다시 업데이트를 확인합니다. **계속 사용**는 현재 사본을 엽니다 지킵니다; 그것은 그 위치 업데이 트 할 수 없습니다. 설치가 실패한 경우, 다시 시도하기 전에 표시된 오류를 따르십시오.

</PlatformContent>

<PlatformContent platform="windows">

Reinstalling은 기존 데이터를 유지합니다. 데이터 문제 후 신선한 시작을 거부하면 [로컬 Windows 데이터를 재설정](troubleshooting.md#windows-data-reset)을 참조하십시오. 이 별도의 도구 삭제 데이터; 그것은 일반 업데이트의 일부가 아닙니다.

</PlatformContent>

## 문제 해결 설치 및 시작 {/* #first-checks-when-startup-fails */}

| 그것이 실패하는 곳 | 첫 번째 체크 |
| --- | --- |
| 데스크톱 설치자 또는 앱 출시 | 패키지 소스, OS 및 CPU 아키텍처를 확인 한 다음 운영 체제를 읽습니다. |
| 소스 설치 | 이름 &#42; `node --version` 으로 `npm --version`, 그리고 그 `npm install` 완료. 중단된 의존성 임명을 재기하십시오. |
| 초기 설정 | 실패한 환경 검사를 읽고 계속하기 전에 명시된 요구 사항을 해결하십시오. |
| 첫 번째 에이전트 요청 | Active/Ready Agent를 확인하고 실행하십시오. **Test connection** 모형 페이지에. |
| 공급자 또는 지역 브라우저 연결 | 보고된 항구, 프록시 또는 증명서 과실을 검열하십시오; 은 은 [문제 해결](troubleshooting.md). |

## v0.31.0 후에 제품 naming {/* #product-name */}

현재 인터페이스 및 새로운 패키지 사용 **Open-Science** 지속적으로. Upgrading는 기존의 설치 이름과 위치, 연구 자료, 자격 및 설정을 보존합니다. `Open Science`을 포함하는 오래된 임명 경로는 격상 실패 자체에 의해 아닙니다; 새 디스플레이 이름과 일치하는 데이터 폴더를 변경하지 마십시오.
