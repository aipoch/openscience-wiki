---
title: "연구 필름 만들기"
last_update:
  date: '2026-11-25'
---

# 연구 필름 만들기

그룹 회의 또는 프로젝트 Handoff에 대한 짧은 월별 발표로 완료 대화를 켭니다. Open-Science는 세션의 언 레코드에서 영화를 구축하고 현지의 영어 narration를 생성합니다. 영화 제작자는 아직도 당신의 형성한 모형을 사용합니다. 결과는 기존 작업을 설명합니다. 분석이 다시 실행되지 않거나 결론을 증명하지 않습니다.

## 세션과 달 준비 {/* #prepare-film */}

1. 사용 방법 **데스크탑 앱** 현재 원하는 세션과 지점을 엽니다. 현재 응답을 첫째로 완료하십시오. 블랭크 세션 또는 여전히 응답을 기다리고 영화 생성 할 수 없습니다.
2. 기록된 입력, 결과 및 제한을 확인합니다. 시작 전에 공유하려는 소스에서 민감한 자료를 제거하십시오. 배포하기 전에 생성 된 필름을 별도로 검토하십시오.
3. 내 계정 **Settings → Model**, 호환성 주요 모형 및 작동 credentials를 확인하십시오. Codex 구독은 Codex runtime으로 선택될 수 있습니다.
4. 기타 **Local capabilities → Research narration → Install**· 오시는 길 **Installed**· 이 자료는 영어 연설을 제공하고 나중에 영화에 재사용됩니다. 대안으로, 영화 대화 상자 제안 **Install and generate** narration가 누락될 때.

연설 엔진은 설치 후 로컬로 실행되지만, 모델 기반 영화 제작자는 선택한 공급자를 사용합니다. 컴퓨터 실행 및 생성 된 미디어에 사용할 수있는 충분한 무료 저장을 유지합니다.

## 생성 및 시계 {/* #generate-film */}

1. **Session actions → Generate research film**를 엽니다. 재생에서는, 동일한 활동은 **더 많은 작업**의 밑에 유효합니다.
2. **Film mode → Research explanation**를 선택하여 문제, 방법 및 발견, 또는 **Operation replay**를 설명하여 대화 행동과 결과를 순서로 표시합니다. 모델 사용 설명, 어떤 누락 된 모델, 자격 또는 narration 리소스를 해결, 다음 **Start generation**를 선택.
3. 글과 미디어 세대를 따르십시오. 당신은 계속 세대 동안 대화를 닫을 수 있습니다, 다음 **View generation progress**를 다시 열 수 있습니다. **Cancel**는 영화 작업을 중지, 소스 대화.
4. **Research film ready**가 나타나면 제목과 기간을 검사하고 **Play research film**를 선택하십시오.
5. 전체 영화보기. 번호, 단위, 설명, 시각, 문헌 및 소스 세션에 대한 명시된 한계를 확인합니다. 갑상선 예제 또는 예비 결과가 여전히 같은 것과 같이 설명되는지 여부에 대한 특정주의를 지불하십시오.

![시작하기 전에 연구 설명 또는 가동 재생을 선택하십시오](/img/open-science/v130/film-mode.webp)

각 대화 지점은 자체 필름 출력을 유지합니다. 필름을 생성하거나보고하기 전에 의도 된 지점을 엽니 다. 한 분기에 필름은 다른 필름을 자동으로하지 않습니다. narration가 로컬로 실행되는 경우에도 모델 토큰을 소모합니다.

<p className="example-label"><strong>작업 예</strong> 다섯 숫자 가르침 예제 설명</p>

Codex와 대화를 시작해서:

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

완료된 답변은 의미와 미디어를 제공합니다. **6** 정의 된 인구 또는 샘플링 디자인의 부재를 설명합니다. 선택하기 전에 그 점을 확인 **Generate research film**· 이것은 교육 예입니다, empirical 연구.

![완성된 교육 대화에서 연구 필름 생성](/img/open-science/v120/film-progress.webp)

![English narration 및 playback 액션을 가진 준비된 연구 영화](/img/open-science/v120/film-ready.webp)

v1.2.1에서 다른 세션으로 전환하는 것은 영화 발생을 멈추지 않습니다. 앱 실행을 유지하고 소스 세션의 반환 **View generation progress** 또는 **View research film** 결과 검사. 영화 작업은 여전히 세대를 중지.

## 검토 된 필름 수출 {/* #export-film */}

생성된 플레이어를 미리보기에서 엽니다. **More actions → Download**를 선택하면 브라우저에서 재생할 수 있는 휴대용 HTML 플레이어를 저장할 수 있습니다. 동영상 파일을 만들려면 미리보기에서 **Export MP4**를 선택합니다. 구성 요소 설치가 필요하면 **Install and export**를 선택한 다음 데스크톱 저장 대화상자에서 저장 위치를 지정합니다. 내레이션 리소스와 MP4 내보내기 구성 요소는 별도로 다운로드됩니다.

수출을 위해 끝내기 위하여, 그 후에 저장한 파일을 Open-Science 밖에 다시 엽니다. 재생, 소리, 캡션 및 종료를 확인합니다. 저장 대화 상자를 취소하면 수출 된 파일을 생성하지 않습니다. 원래 세션을 유지하거나 [`.science` 연구 패키지](research-packages.md) 수의자는 불완전한 증거를 검사해야 할 때; MP4 혼자는 발표입니다.

![연구 영화 선수와 MP4 수출 통제](/img/open-science/v120/film-player.webp)

## 재생 또는 복구 {/* #film-recovery */}

연구 영화가 생성되는 동안, 영화 상태가 눈에 보이는 **Active**의 대화 체재. 다른 대화의 세대에 의해 차단 된 영화 대화 상자가 있다면, **Go to conversation**을 선택하여 소유자를 열고 다른 일을 시작하기 전에 진행 상황을 검사합니다.

영화가 중단되고 대화 상자가 **Retry**을 제공 할 때, 유효 장면을 재사용 할 수 있습니다, 달레이션 및 타이밍. Checkpoints는 프로세스 재시작을 살아남습니다. **Generate again**는 대신 신선한 시도를 시작합니다; 의도한 내용을 변경하거나 이전 시도를 무시할 때 그것을 사용하십시오. 진행 상황을 검사하고 완료 한 후 영화.

- 세대가 모델을 선택하거나 자격 증명을 확인하려면 **Settings → Model**의 요구 사항을 수정 한 다음 세션으로 돌아갑니다.
- narration 다운로드가 실패하면 **Retry**을 사용하고 다시 생성하기 전에 **Installed**을 기다립니다.
- 세션 변경 후 **View research film → Generate again**을 사용하거나 결과가 다른 시도를 필요로 할 때. 새로운 세대를 확인; 그것은 몇 분을 가지고 다시 모델 용량을 사용할 수 있습니다.
- 이 지점의 로컬 필름 파일을 제거 할 때만 영화 대화 상자의 **More actions → Delete research film**을 사용하십시오. 확인은 대화 내용과 별도로 저장된 사본이 보관된다는 것을 설명합니다.

유지된 단계와 [관련 제품](reproducibility.md)를 검사하기 위해 [세션 재생](session-replay.md)을 참조하십시오.
