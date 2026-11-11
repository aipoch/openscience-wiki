---
title: "과학 도구 카탈로그"
last_update:
  date: '2026-11-11'
---

# 과학 도구 카탈로그 {/* #scientific-tool-catalog */}

이 카탈로그를 사용하여 Open-Science 엔트리 포인트 및 런타임 요구 사항을 과학 방법. 문서 인덱스는 각 목록의 프로그램을 설치하는 응용 프로그램 페이지가 아닙니다.

## 소프트웨어 가족과 그들이 달리는 곳 {/* #software-families-and-where-they-run */}

| 소프트웨어 가족 | Open-Science 항목 | 확인하기 | 자주 묻는 질문 |
| --- | --- | --- | --- |
| Python 표준 라이브러리 및 플로팅 | 세션 Notebook | 선택된 Python 해석기; 관련 상품 | 실제 QC CSV을 읽고 작은 플롯을 생성 |
| R / 기본 R | 세션 Notebook; 설정 → 실행 → R | 앱 관리 또는 감지 된 해석기 | 인쇄 R 버전과 reproduce 표본 summaries |
| 구조 예측 프레임 | 관련 번들 Skill, 보통 컴퓨터 | 양립한 GPU, 포장, 무게, 입력 체재 및 외부 MSA 접근을 사용하는 경우에 | 1개의 작은 유효한 순서/complex 및 그것의 산출 신뢰 |
| MPNN 시퀀스 디자인 프로그램 | 단백질MPNN/LigandMPNN/SolubleMPNN Skills | 저장소/체크 포인트 및 Python 의존성; 작은 CPU 작업은 이러한 지침에 의해 지원됩니다. | 명시된 고정/디자인 포지션을 가진 1개의 백본 |
| 단일 셀 프레임 워크 | scGPT / scvi-tools Skills | AnnData, cell/gene labels, 패키지 및 적당한 compute | 유효한 입력 차원 및 훈련의 앞에 필요한 층 |
| 분자 구조 렌더링 | Molecule Connector/분자 구경꾼 | 내장 오프라인 OpenChemLib 노선 | 저장 및 다시 오픈 aspirin.mol |
| 파일 렌더링기 | 파일 미리보기 | 지원 확장 및 미리보기 크기 제한 | 실제 다운로드 된 파일을 엽니 다 |
| 원격 배치 소프트웨어 | Compute 호스트 및 원격 통신 Skills | 호스트 액세스, 스케줄러 및 이름 환경 | 호스트 프로브는 경계 작업에 따라 |

24-Skill 방법 테이블을 완료하려면 [Skill 디렉토리](../skills/directory.md)을 참조하십시오. 이 페이지는 소프트웨어 readiness를 설명합니다; Skill의 절차마다 중복되지 않습니다.

## 선택된 환경 검사 {/* #inspect-the-selected-environment */}

유효한 Python/R 해석기를 검열하기 위하여 **Settings → Runtimes**를 사용하십시오. 런타임을 선택하면 실제로 세션에 바인딩된 다음 패키지를 검사합니다. 컴퓨터에서 다른 곳에서 실행 가능한 설치는 자동으로 활성 Notebook 해석기입니다.

[런타임](../guides/runtimes.md)을 사용하여 해석기와 [Notebook](../guides/notebook.md)을 준비하여 계산을 확인합니다. 추가 패키지가 필요한 경우, 설치 및 그 환경에서 가져 오기. 다운로드 실패의 경우, 영향을받는 호스트 이름과 오류를 사용하여 [네트워크](../guides/network.md)을 따르십시오.

## 모델의 설치 명령을 따르기 전에 {/* #before-following-a-models-install-command */}

설치 Skill의 정확한 요구 사항 및 선택한 환경의 지원 설정 경로를 읽으십시오. 패키지 이름 충돌 확인 : **회사 소개** 및 Biohub **₢ 킹** 구현은 `esm` 네임스페이스를 공유하면서도 구별됩니다. 다운로드한 모형의 부호 및 무게는 또한 다른 버전 및 접근 조건이 있을 수 있습니다.

로컬 Notebook은 [과학 도구](./scientific.md)의 지원 패키지 관리 흐름을 사용합니다. 원격 호스트의 경우 [먼 compute](../guides/remote-compute.md). PDB를 표시하는 렌더링자는 구조를 볼 수 있다는 것을 증명합니다. AlphaFold 또는 다른 예측 프로그램이 설치되지 않습니다.

구현 참조 : [나.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md의 특징](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [노트북-런타임.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts).

지원되는 장시간 일을 추적하기 위하여 [백그라운드 작업](../guides/notebook.md#background-tasks-and-result-delivery)를 이용하고 배달한 결과를 검사하십시오. 과학 패키지는 여전히 선택한 런타임에서 사용할 수 있습니다.
