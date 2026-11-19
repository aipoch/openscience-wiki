---
title: "연구 과제 일정"
last_update:
  date: '2026-11-19'
---

# 연구 과제 일정 {/* #schedule-a-research-task */}

정해진 시간에 수행할 작업을 예약하세요. 새로 추가한 논문 검토, 프로젝트 변경 사항 요약, 준비된 스크립트 재실행 등에 사용할 수 있습니다. 각 실행에는 열어 확인할 수 있는 기록이 남습니다. 일정을 만든 컴퓨터에서 Open-Science를 실행한 상태로 유지하세요.

## 사용자 개입 없이 실행할 작업 준비 {/* #prepare */}

먼저 프로젝트에서 원하는 작업을 한 번 수동으로 완료하세요. 입력, 모델 연결, 실행 환경, 출력 위치 및 필요한 권한을 확인합니다. 예약 작업은 누락된 인증 정보나 모든 의존성을 자동으로 보완하지 않습니다. 실행 중 새로운 사용자 확인을 기다리지 않으므로, 추가 상호작용이 필요한 단계에서 작업이 멈출 수 있습니다. 새 대화로 실행할 때는 **Settings → Model**에서 사용 가능한 **Main** 모델을 선택하거나 프로젝트의 새 대화 기본값을 설정하세요. 구독을 가져오는 것만으로 모델이 선택되지는 않습니다. 모델 기반 작업은 선택한 제공자의 사용량을 소비합니다.

## 일정 만들기 {/* #create */}

1. 프로젝트를 열고 **Schedule**로 가서 **New task**를 선택하십시오. **Start from an example**는 매일 실험 요약 또는 주간 문학 검토를 위해 초안을 채울 수 있습니다.
2. 인식 가능한 **Name**를 입력합니다. **Action → Send a message** 또는 **Run a script**를 선택하십시오.
3. 메시지를 위해, **Instructions** 아래 작업을 작성. **How to run**의 밑에, **Continue an existing conversation** 또는 **New conversation for each run**를 선택하십시오. **Target conversation**를 선택하세요.
4. 스크립트의 경우 기존 대화와 **Language**: Python, R 또는 Shell을 선택하십시오. 완전한 **Script**를 입력하십시오. 이전 커널에서 임시 변수에 의존하지 마십시오. 필요한 입력을 명시적으로로드하십시오.
5. **Repeat**를 **Once**, **Fixed interval**, **Daily** 또는 **Weekly**에 설치하십시오. 시작 시간, 간격 또는 평일을 적용 가능한 한 다음 **Time zone** 및 **Next run**를 확인하십시오.
6. **Execution permissions** 검토. 작업의 필요만 접근하십시오. 기존 대화는 대화 권한을 따를 수 있습니다. 일정의 권한 설정은 자격 증명이나 우회 엄격한 네트워크 규칙을 제공하지 않습니다.
7. **Advanced**의 밑에, 선택적으로 끝 시간 또는 최대 뛰기 조사를 놓으십시오. 스크립트의 경우, 실행 timeout을 검토합니다. **Create**를 선택하고 저장된 작업을 확인하고 다음 실행을 확인합니다.

<p className="example-label"><strong>예시</strong> 주간 문헌 요약 준비</p>

**Send a message**를 사용하여, 금요일과 당신의 자신의 현지 시간을 선택하고, 종이와 노트를 포함하는 프로젝트에 이 지시를 적응:

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

이 작업은 프로젝트에 이미 있는 자료를 검토합니다. 새로 발표된 논문을 찾으려면 검색을 명시적으로 요청하고 필요한 [문학 연결관](../tools/databases.md)를 먼저 설정하세요.

## 한 번 학습 요약을 실행 {/* #worked-example */}

<p className="example-label"><strong>실습 예제</strong> 다섯 관측값의 요약 예약</p>

**Send a message**를 사용, 작업 **Teaching summary — one run** 이름, 그리고 입력:

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

**New conversation for each run**, **Repeat → Once** 및 미래의 시간을 선택하십시오. **Existing permissions only** 사용: 이 작업은 도구가 필요하지 않습니다. **Create**를 선택하고 앱 실행을 유지하십시오.

![한 번의 메시지 작업과 그 지침, 새로운 대화 목표 및 다음 실행](/img/open-science/v130/schedule-create.webp)

예약한 시간이 되면 작업을 열고 **Results**를 확인합니다. 이 예제의 평균과 중앙값은 모두 **6**이며, 다섯 개의 가상 관측값만으로는 모집단에 대해 결론을 내릴 수 없다는 설명이 나왔습니다. **Open session**을 선택하면 대화가 열리고, 일회성 작업은 **Completed** 상태가 됩니다. 결과를 재사용하기 전에 내용을 확인하세요.

![완료 예정된 메시지와 그 가르침 결과](/img/open-science/v130/schedule-result.webp)

## 실행을 검사하고 일정 변경 {/* #run-history */}

작업의 실행 기록을 열고 파산을 선택합니다. 상태, 목적지 대화 및 결과 검사. **Run completed** 기록 그 실행의 완료; 연구 증거로 사용하기 전에 실제 대답 또는 스크립트 출력을 검사. **Failed**, **Interrupted** 및 **Skipped**는 결과가 생성되지 않은 관련 이유를 읽고 요구합니다.

**Pause**로 이후 실행을 일시 중지하고, 준비가 되면 **Resume**으로 재개합니다. 시간을 변경한 뒤에는 다음 실행 시각을 확인하세요. **Close**은 작업을 종료합니다. 완료되거나 종료된 작업이 읽기 전용이면 새 작업을 만드세요. 특히 앱을 다시 연결하거나 재시작한 후에는 수동으로 작업을 반복하기 전에 실행 기록을 확인하세요.

실행 기록 및 실행 복구를 위해, [Notebook](notebook.md)를 참조하십시오. 접근 경계를 위해, [승인 모드](approval-modes.md)와 [네트워크 규칙](network.md)를 보십시오.
