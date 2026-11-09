---
title: "연구 필름 만들기"
last_update:
  date: '2026-11-09'
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

1. 기타 **Session actions → Generate research film**· 재생에서, 같은 활동은 아래에서 사용할 수 있습니다. **더 많은 작업**.
2. 모든 준비 메시지를 읽으십시오. 재발급하기 전에 누락된 모델, 자격 또는 재발급 리소스를 해결합니다. narration가 준비되면, 세대는이 작업을 시작합니다.
3. 글과 미디어 세대를 따르십시오. 계속되는 동안 대화 상자를 닫을 수 있습니다. **View generation progress**. **Cancel** 영화 작업을 중지, 소스 대화.
4. 시간 : **Research film ready** 표시, 제목 및 기간을 검사, 다음 선택 **Play research film**.
5. 전체 영화보기. 번호, 단위, 설명, 시각, 문헌 및 소스 세션에 대한 명시된 한계를 확인합니다. 갑상선 예제 또는 예비 결과가 여전히 같은 것과 같이 설명되는지 여부에 대한 특정주의를 지불하십시오.

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

## 검토 된 필름 수출 {/* #export-film */}

생성된 플레이어를 미리보기에서 엽니다. **More actions → Download**를 선택하면 브라우저에서 재생할 수 있는 휴대용 HTML 플레이어를 저장할 수 있습니다. 동영상 파일을 만들려면 미리보기에서 **Export MP4**를 선택합니다. 구성 요소 설치가 필요하면 **Install and export**를 선택한 다음 데스크톱 저장 대화상자에서 저장 위치를 지정합니다. 내레이션 리소스와 MP4 내보내기 구성 요소는 별도로 다운로드됩니다.

수출을 위해 끝내기 위하여, 그 후에 저장한 파일을 Open-Science 밖에 다시 엽니다. 재생, 소리, 캡션 및 종료를 확인합니다. 저장 대화 상자를 취소하면 수출 된 파일을 생성하지 않습니다. 원래 세션을 유지하거나 [`.science` 연구 패키지](research-packages.md) 수의자는 불완전한 증거를 검사해야 할 때; MP4 혼자는 발표입니다.

![연구 영화 선수와 MP4 수출 통제](/img/open-science/v120/film-player.webp)

## 재생 또는 복구 {/* #film-recovery */}

- 세대가 모델을 선택하거나 자격 증명을 확인하려면, 그 요구 사항을 수정 **Settings → Model**, 다음 세션에 반환.
- narration 다운로드가 실패한 경우, 사용 **Retry** 자주 묻는 질문 **Installed** 다시 생성하기 전에.
- 제품 정보 **View research film → Generate again** 세션을 변경하거나 결과가 다른 시도를 필요로 할 때. 새로운 세대를 확인; 그것은 몇 분 걸릴 수 있고 모델 용량을 다시 사용.
- 영화 대화 상자 사용 **More actions → Delete research film** 이 지점의 로컬 필름 파일을 제거 할 때만. 확인은 대화 내용과 별도의 저장된 복사가 보관됩니다.

이름 * [세션 재생](session-replay.md) 유지 단계 및 검사 [관련 제품](reproducibility.md) 별도의 검증을 실행합니다.
