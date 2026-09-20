---
title: "설치 및 업데이트"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 설치 및 업데이트 {/* #installation-and-updates */}

대부분의 사용자는 GitHub 릴리스에서 데스크탑 패키지를 설치해야 합니다. 기여자 또는 최신 코드를 테스트하는 사람이 소스에서 앱을 실행할 수 있습니다. Open-Science는 전자 신청입니다; 그것의 렌더는 또한 토큰 보호된 로컬 브라우저 접근을 지원합니다.

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

| (주)아이디 | 건축의 식별 | 패키지 및 설치 |
| --- | --- | --- |
| Windows | 설정 → 시스템 → 소개 → 시스템 유형 | 일치하는 것을 선택하십시오 `win-…-setup.exe`; 현재 사용자 설치 프로그램을 실행하고 위치 프롬프트를 따르십시오 |

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

</PlatformContent>

설치 위치에는 애플리케이션을 저장하고, 설정 마법사의 **Data location**에는 연구 파일과 실행 환경을 저장합니다. 두 위치는 별도로 설정합니다. 설치 후 [초기 설정](onboarding.md)을 진행하세요.

### 소스에서 실행 {/* #run-from-source */}

Git, Node.js 22, npm 및 Electron을 위한 플랫폼 빌드가 필요합니다. 응용 프로그램에서 에이전트 프레임 워크를 설치하거나 선택합니다. 설치 중에 저장소는 Prisma Client를 생성하고 앱 패치를 적용하고 Electron native Dependencies를 준비합니다.

재현 가능한 소스 설치를 위해, 의존성을 설치하기 전에 [관련 링크](../changelog/v0.31.1.md)에서 의도한 릴리스 태그를 선택하십시오. 기본적으로 clone은 고정 릴리스보다는 분기를 따릅니다. 선택된 태그, 소스 커밋 및 런타임 버전을 기록하므로 다른 사람이 환경을 재현 할 수 있습니다.

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

`npm run build`는 TypeScript를 검사하고 Electron 렌더링기, 사전 로드 및 주요 대상을 구축합니다. 웹 또는 헤드리스 항목 포인트를 테스트 할 필요가 있다면, 저장소의 기존 헤드리스 인수를 별도의 데이터 디렉토리로 사용하십시오. 그것은 기본 저장소에서 테스트 데이터를 유지합니다.

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
