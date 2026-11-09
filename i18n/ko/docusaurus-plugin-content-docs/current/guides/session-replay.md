---
title: "재생 및 기록 된 세션에 대해"
last_update:
  date: '2026-11-09'
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

1. 관련 단계에 일시 및 선택 **Ask about this step**· 더 넓은 질문을 위해, 선택하십시오 **Ask about this research**.
2. 토론 초안을 확인하고 **Discuss** 첨부파일 선택한 세션, 지점 및 단계는 논의 된 증거를 확인합니다. 선택한 노트북은 현재 뷰포트 밖에 있을 때도 기록된 컨텍스트를 포함합니다.
3. 집중된 질문을 입력하고 연결된 모델을 선택하고 선택 **Send**· 토론을 열거나 컨텍스트 추가는 자동으로 질문을 보내지 않습니다.
4. 수입 연구의 경우 토론은 연결된 어린이 대화입니다. 부모 기록으로 돌아가 원본 단계 확인; 토론은 읽기 전용 역사 writable하지 않습니다. 제품 정보 **Fork to continue** 대신 continuation를 위해.
5. 모든 도구 승인 검사 및 기록 된 증거와 응답 비교. 모델 설명은 소스 링크가 정확 할 때 실수를 포함 할 수 있습니다.

위의 TP53 예제의 경우:

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

예 답변은 식별 `tp53_mdm2_cdkn1a_readable_interactions.tsv` 그리고 생물 결론에서 평평한 수출을 분리하십시오. 스크린 샷은 기록 된 토론을 보여줍니다. 현재 링크 된 처리 제어는 다를 수 있습니다.

![기록된 TP53 분석 옆에 완료된 Codex 토론](/img/open-science/v0350/replay-answer.webp)

완료된 세션의 narrated 프레젠테이션을 만들기 위해, 따르십시오 [연구 필름](research-films.md)· 재생, 토론 및 영화 각 재사용 기록; 그들 중 아무도 분석을 중단.

## 증거는 사용할 수 없습니다 {/* #replay-evidence */}

기록된 도구 통화는 원래 실행 환경이 사용할 수 없을 때도 눈에 띄게 유지될 수 있습니다. 유지된 부호 및 산출을 읽으십시오; 새로운 실행 결과로 환경 경고를 대우하지 마십시오.

파일이 **미리보기를 사용할 수 없음** 또는 **The recorded evidence is unavailable**을 보고하면, 원래 세션의 파일 카드와 선택된 버전을 확인할 수 있습니다. 또한 열 수 없는 경우, 별도의 유지된 원본 파일을 사용하거나 저자의 전체 연구 패키지를 얻을 수 있습니다. 파일명과 완료된 재생 타임라인은 파일 내용이 사용할 수 없다는 것을 증명하지 않습니다. 실제로 검사 할 수있는 증거 만 토론하십시오.

신선한 계산을 위해, [fork 세션](sessions.md#fork-session)는, 필요한 파일/환경을 공급하고 분석을 실행합니다. 저장된 artifact로 새로운 실행을 비교하기 위해, 재생의 **Completed** 지표가 아닌 [reproducibility 검증](reproducibility.md)을 사용하십시오.
