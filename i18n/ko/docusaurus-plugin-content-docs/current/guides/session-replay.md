---
title: "재생 및 기록 된 세션에 대해"
last_update:
  date: '2026-10-08'
---

# 재생 및 기록 된 세션에 대해 {/* #replay-and-discuss-a-recorded-session */}

세션 재생은 세션에 유지 된 메시지, 도구 단계 및 파일 버전을 제공합니다. 분석을 따르기 위해 그것을 사용하여 증거를 찾아 집중된 질문을하십시오. Playback는 rerun 부호가 아니며 분석이 재현 할 수 있다는 것을 설정하지 않습니다. [reproducibility 검증](reproducibility.md)을 사용하여 별도의 작업에 사용할 수 있습니다.

## 재플레이 열기 {/* #open-replay */}

1. 사이드바에서 세션의 동작 메뉴를 열고 **View replay**을 선택합니다. 수입된 `.science` 회의를 위해, **Imported research history** 패널은 또한 **View replay**를 제공합니다.
2. 세션 제목과 지점을 확인합니다. **Replay branch**이 제공될 때, 검사를 계획하는 분지를 선택하십시오.
3. 더 많은 공간을 위해 **Enter full screen**를 사용하십시오. **Exit full screen**는 작업 공간에 반환; 미리보기를 닫지 않는 세션.

수입된 연구는 읽기 전용 남아 있습니다. 당신은 그것을 검사하고 토론할 수 있습니다; **Fork to continue**을 선택하면 writable continuation이 필요합니다. 재생을 열기 전에 [연구-패키지 수입](research-packages.md#import-and-inspect-a-package)을 따르십시오.

## 기록된 단계를 따르십시오 {/* #playback-controls */}

| 제품정보 | .... |
| --- | --- |
| Play replay / Pause replay | 저장된 순서의 시작 또는 일시적인 발표 |
| Previous step / Next step | 인접한 녹화 단계로 이동 |
| Replay progress | 녹음에 또 다른 점에 Seek |
| Playback speed | 변화 발표 속도; 이것은 계산을 가속화하지 않습니다. |
| Browse steps | 라벨에 의해 메시지, 도구 단계 또는 파일 버전 이벤트를 선택 |
| Notebook / View files | 기록 된 Notebook 재료 또는 그 시점에서 파일 목록 검사 |
| Watch again | 재생 후 나머지는 완료 |

유지된 입력 및 출력을 읽는 도구 카드를 확장합니다. 결과를 사용하기 전에 파일명과 버전 번호를 검사합니다. 재생 위치는 동일한 기록에 돌려보내도록 유지됩니다. 이전 세션은 아카이브 레코드에서 타임 라인 재구성 할 수 있습니다; 그것의 발표 기간은 본래 계산의 벤치 마크가 아닙니다.

<p className="example-label"><strong>실습 예제</strong> TP53 경로 분석에 대한 증거</p>

이 예제는 Reactome **TP53에 의한 Transcriptional 규정**를 선택한 [Pathway Commons 분석](../workflows/inspect-pathway.md)의 기록을 엽니다. 그것의 수출은 3,318 상호 작용 기록과 387 노드를 포함합니다. 이러한 저장된 분석 결과, 모든 미래 쿼리에서 기대할 수 없습니다.

**Browse steps**에서, 수출한 네트워크, 본래 응답, 연구 주 및 작은 TP53–MDM2–CDKN1A 상호 작용 테이블을 찾아내십시오. 예에는 12이 기록된 단계가 있습니다. 테이블의 파일 변환 단계 선택, 다음 네트워크의 범위의 preceding 설명을 읽습니다.

![실제 TP53는 기록된 단계, 파일 버전 및 재생 통제로 재생합니다](/img/open-science/v0350/replay-step-list.webp)

## 자주 묻는 질문 {/* #discuss-replay */}

1. 관련 단계에서 일시 중지하고 **Ask about this step**을 선택합니다. 더 넓은 토론을 위해, 헤더에 **Ask about this research**을 사용합니다.
2. **Ask in a conversation**에서, 쓸 수 있는 대화 또는 **New conversation**를 선택하십시오. 행동은 초안에 대한 맥락을 추가합니다; 그것은 스스로 질문을 보내지 않습니다.
3. **Discuss** 첨부 파일과 세션/단계 라벨을 확인합니다. 귀하의 질문을 입력하고 연결 된 모델을 선택하고 **Send**을 선택하십시오. 예를 들어 **Codex subscription**을 사용합니다.
4. 도구 승인이 요청되면 필요한 작업을 허용하기 전에 제안 된 액세스를 검사합니다. 그런 다음 저장된 증거와 소스 컨텍스트와 응답을 비교합니다.

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

대답은 `tp53_mdm2_cdkn1a_readable_interactions.tsv`을 식별하고 평평한 수출이 생물학적 결론에서 포함되는 것을 구별합니다. 선택된 소스 세션, 지점 및 단계로 포인트. 해석을 채택하기 전에 그 소스를 다시 읽으십시오; 연결된 기록은 모든 모델의 청구를 수정하지 않습니다.

![완료된 Codex 토론은 기록된 TP53 분석 옆에](/img/open-science/v0350/replay-answer.webp)

## 증거는 사용할 수 없습니다 {/* #replay-evidence */}

기록된 도구 통화는 원래 실행 환경이 사용할 수 없을 때도 눈에 띄게 유지될 수 있습니다. 유지된 부호 및 산출을 읽으십시오; 새로운 실행 결과로 환경 경고를 대우하지 마십시오.

파일이 **미리보기를 사용할 수 없음** 또는 **The recorded evidence is unavailable**을 보고하면, 원래 세션의 파일 카드와 선택된 버전을 확인할 수 있습니다. 또한 열 수 없는 경우, 별도의 유지된 원본 파일을 사용하거나 저자의 전체 연구 패키지를 얻을 수 있습니다. 파일명과 완료된 재생 타임라인은 파일 내용이 사용할 수 없다는 것을 증명하지 않습니다. 실제로 검사 할 수있는 증거 만 토론하십시오.

신선한 계산을 위해, [fork 세션](sessions.md#fork-session)는, 필요한 파일/환경을 공급하고 분석을 실행합니다. 저장된 artifact로 새로운 실행을 비교하기 위해, 재생의 **Completed** 지표가 아닌 [reproducibility 검증](reproducibility.md)을 사용하십시오.
