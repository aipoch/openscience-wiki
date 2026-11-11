---
title: "전문가 및 사용 가능한 역할"
last_update:
  date: '2026-11-11'
---

# 전문가 및 사용 가능한 역할 {/* #specialists-and-available-roles */}

Specialist는 저장된 연구 역할입니다: 정체성, 지시 및 허용된 Skills/Connectors. 반복 책임이 일관된 범위 또는 별도의 subtask를 필요로 할 때 하나를 사용하십시오. 혼자의 역할은 전문 지식이나 검증을 수립하지 않습니다.

## 사용 가능한 역할 이해 {/* #understand-the-available-roles */}

| 역할 또는 소스 | 사용 방법 | 구성할 수 있는 것 |
| --- | --- | --- |
| 메인 에이전트 | 대화를 처리하고 위임 작업을 조정할 수 있습니다. | 세션 모델, 에이전트 컨트롤 및 사용 가능한 기능 |
| 주문 Specialist | 정의된 연구 작업에 대한 현지화 | Identity, 지침, 명시된 Skills/커넥터 또는 전체 액세스 |
| 수입 / 시장 Specialist | 패키지에서 설치 한 다음이 장치에서 구성 | 로컬 설정 및 허용 기능; 출판사 및 패키지 버전 검사 |
| 내장 리뷰어 | 앱의 검토 워크플로우 수행 | 대화를 통해 방아쇠 검토; 일반 편집 / 델가테이블 Specialist이 아닙니다. |

**Marketplace**을 열고 게시된 역할을 찾습니다. 온라인 카탈로그는 독립적으로 설치된 앱을 변경할 수 있습니다. 각 역할의 출판사, 지시 및 종속성을 검사합니다.

## 자주 묻는 질문 {/* #find-a-role */}

**Resource center → Specialists**을 엽니다. **Installed**은 지역 등록 된 역할을 계산합니다. Reviewer를 포함한. **Search specialists** 및 **Filters → Filter specialists by category**을 사용하여 검사 할 줄을 엽니다. **Marketplace**는 다른 카탈로그를 엽니다; 목록으로 만들어진 시장 입장은 패키지/setup 흐름을 완료할 때까지 설치되지 않습니다.

![RNA-seq QC 검토자는 국부적으로 설치했습니다](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## 시장의 역할 관찰 {/* #marketplace-roles-observed */}

| 제품정보 | 연구 범위 |
| --- | --- |
| 자동 연구 Specialist | 생물 의학 증거, 분석, 검증 및 쓰기 |
| Cryo-EM 구조 검증 Specialist | Half-map, 기하학 및 맵 모델 검증 계획 |
| Pharmacometrics PK/PD 디자인 Specialist | PK/PD 연구 디자인과 불확실한 검사 |
| Multimodal Neuroimaging Connectomics 건축 | MRI/fMRI/diffusion 워크플로우 및 네트워크 분석 제어 |
| 합성 경로 및 반응 최적화 Specialist | 반응 계획 및 최적화 증거 |
| Aerodynamics CFD 검증 및 검증 Specialist | Numerical 융합 및 실험적인-comparison 계획 |
| 대기 화학 운송 모델링 Specialist | Emissions, 수송 및 근원 본질 연구 |
| 높은 처리량 DFT 검열 Specialist | Convergence 및 thermodynamic-consistency 검사 |
| 천문학적인 광측정과 시간 명목상 분석 Specialist | 구경측정, photometry 및 variability 분석 |
| 정밀 농업 Phenotyping 및 처방 설계 Specialist | UAV 페니핑 및 공간 유효성 워크플로우 |

이러한 관찰 된 카탈로그 설명, 10 완료 된 과학 워크플로우의 증거. 제품의 검토는 또한 이 장에서 사용된 관례 **RNA-seq QC 검토자**에서 다릅니다.

## 오시는 길 {/* #choose-a-route */}

- [생성 및 파기](./identity.md): 로컬 연구 역할 정의.
- [Assign 기능](./capabilities.md): 그것을 사용할 수 있는 것을 결정하십시오.
- [Delegate 및 검증](./delegate.md) : 실제 아이가 실행하고 그 증거를 검사합니다.
- [리뷰 및 이용 후기](./reviewer.md): 앱의 내장 리뷰 프로세스를 사용합니다.
- [관리 및 공유](./manage.md): 패키지, 수입, 분쟁 해결 및 로컬 설정 완료.

구현 참조 : [나.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [전문가Panel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
