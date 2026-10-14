---
title: "설치 및 업데이트"
last_update:
  date: '2026-10-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 설치 및 업데이트 {/* #installation-and-updates */}

대부분의 사용자는 GitHub 릴리스에서 데스크탑 패키지를 설치해야 합니다. 기여자 또는 최신 코드를 테스트하는 사람이 소스에서 앱을 실행할 수 있습니다. Electron 데스크톱 클라이언트는 공용 Node 백엔드에 연결하여 정통 로컬 브라우저 인터페이스를 제공합니다.

<PlatformGuide />

**v1.0.0 가용성:** [이 릴리스](https://github.com/aipoch/open-science/releases/tag/v1.0.0)는 독립 CLI 아카이브 또는 Linux CLI `.deb`/`.rpm` 패키지없이 데스크탑 패키지 만 포함되어 있습니다. 그 페이지에서 다운로드하고 `SHA256SUMS.txt`에 대해 확인. 웹 사이트 다운로드 및 자동 업데이트 채널은 별도로 홍보됩니다, 그래서 체크는 아직 1.0을 제공 할 수 없습니다. 데스크톱 설치는 여전히 **Settings → General → Command line tool → Install command**을 제공합니다.

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

v1.0.0는 Linux **x64와 ARM64** 패키지를 제공합니다. ARM64의 경우 `aipoch-open-science-1.0.0-linux-arm64.AppImage` 또는 `aipoch-open-science_1.0.0_arm64.deb`을 선택하십시오. x64는 `aipoch-open-science-1.0.0-linux-x86_64.AppImage` 및 `aipoch-open-science_1.0.0_amd64.deb`입니다. 선택한 릴리스의 공식 자산에서 다운로드하고 `uname -m`의 결과를 일치합니다.

</PlatformContent>

설치 위치에는 애플리케이션을 저장하고, 설정 마법사의 **Data location**에는 연구 파일과 실행 환경을 저장합니다. 두 위치는 별도로 설정합니다. 설치 후 [초기 설정](onboarding.md)을 진행하세요.

### 독립 CLI 사용 {/* #standalone-cli */}

**아래 독립 포장 단계는 실제로 그(것)들을 발송하는 방출에 적용합니다 [v0.37.2](https://github.com/aipoch/open-science/releases/tag/v0.37.2), v1.0.0 자산에 아닙니다.** 이전 릴리스 만 deliberately 사용. 데스크탑/백엔드 버전이 일치하고 더 새로운 앱에 의해 작성된 데이터에서 이전 백엔드를 지적하지 마십시오. 1.0 명령행 항목의 경우, 데스크톱 앱에서 제공하는 발사기를 설치하고 [CLI 설정](../reference/cli.md#terminal-setup)을 따르십시오.

#### 홈 양조장 CLI {/* #homebrew-cli */}

기존의 Homebrew CLI 설치는 데스크톱 케이스에서 `brew install aipoch/tap/open-science`을 통해 관리됩니다. 실제로 Homebrew에서 제공하는 버전을 확인; GitHub의 1.0의 출판은 공식이 고급임을 설정하지 않습니다. 설치는 시스템 서비스를 시작하지 않습니다. 발사자 충돌이면 `type -a open-science`을 검사하고 그 설치를 위해 `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"`을 사용하십시오.

#### Linux CLI 패키지 {/* #linux-cli-packages */}

이 테이블은 **v0.37.2** Linux CLI 설치 방법을 유지합니다; v1.0.0은 이러한 CLI 패키지를 게시하지 않습니다. `open-science-cli`는 `aipoch-open-science` 데스크탑 패키지에서 분리됩니다. 이전 버전이 필요하면 [v0.37.2 자산](https://github.com/aipoch/open-science/releases/tag/v0.37.2)에서 자산과 `CLI-PACKAGE-SHA256SUMS.txt`을 얻을 수 있으며 설치하기 전에 확인합니다.

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

재현 가능한 소스 설치를 위해, 의존성을 설치하기 전에 [관련 링크](../changelog/v1.0.0.md)에서 의도한 릴리스 태그를 선택하십시오. 기본적으로 clone은 고정 릴리스보다는 분기를 따릅니다. 선택된 태그, 소스 커밋 및 런타임 버전을 기록하므로 다른 사람이 환경을 재현 할 수 있습니다.

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

선택한 태그의 package.json 및 [독립 실행 시간 안내](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md)을 사용하여 빌드 대상과 종속성을 제공합니다. `npm run dev:web`는 Node/Web 항목 포인트를 개발; `npm run dev`은 데스크톱 클라이언트를 준비합니다. 격리된 구성 디렉토리를 사용하여 테스트 데이터를 분리합니다.

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

1.0에서 `open-science update`이 제거됩니다. 데스크톱 컨트롤 또는 공식 설치 프로그램을 통해 앱을 업데이트하고, 설치자 / 패키지 관리자를 통해 CLI 설치를 업데이트하십시오. **Check now**이 아직 공개된 릴리스를 제공하지 않는 경우, 공식 릴리스 페이지를 확인하십시오. 구성을 삭제하거나 앱을 재설정하지 않습니다 업데이트 채널.

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

## 1.0로 업그레이드하고 호환성을 이해 {/* #version-compatibility */}

1. 구성 디렉토리를 다시 완료하고 별도로 구성 된 데이터 위치. 하나의 `.science` 수출은 전체 프로필의 백업이 아닙니다.
2. 설치를 사용하여 데스크톱 / 백엔드 인스턴스를 닫고, 공식 설치 프로그램을 통해 업그레이드합니다. 원본 프로파일, 데이터 및 OS 자격 저장을 보존합니다.
3. 오픈 및 버전, 프로젝트, 세션, 파일, 모델 및 런타임을 계속 확인하십시오. 이진 downgrade는 뒤 자료를 구하지 않습니다; 이전의 binaries는 더 새로운 저장된 데이터를 읽지 않을 수 있습니다.

1.0은 기존의 역사적인 업그레이드 및 수입 경로 유지; 버전 번호는 프로파일 재설정이 필요하지 않습니다. [1.x 호환성 정책](https://github.com/aipoch/open-science/blob/v1.0.0/docs/compatibility.md)은 CLI/SDK 및 작업 자동화 인터페이스를 문서화하고, 유효한 `.science` 패키지의 앞으로 수입 및 지원된 프로파일 업그레이드를 포함합니다. OS-protected credentials의 동일한 모형 대답, 제3자 가용성 또는 deterministic 재생산을 보장하지 않습니다, 또는 OS-protected credentials의 교차 플랫폼 이동. Security Fixes는 최신 안정된 릴리스를 목표로 합니다.
