---
title: "Skill 디렉토리"
last_update:
  date: '2026-09-24'
---

# Skill 디렉토리 {/* #skill-directory */}

응용 프로그램은 **23 번들 Skills**을 제공합니다. 이 디렉토리 그룹에 의해 작동 그들은 지원. Entries는 선적 방법을 설명합니다; 그들은 모든 외부 모델, 의존성 또는 서비스가 설치되지 않습니다.

앱을 통해 배포되는 방법에 대해서는 [시장 설치 가이드](marketplace.md)을 사용합니다. 아래의 디렉토리는 연구 방법을 선택할 수 있습니다; 그것은 시장 버전의 살아있는 재고가 아닙니다.

## 방법을 선택하기 전에 readiness를 확인 {/* #check-readiness-before-selecting-a-method */}

1. 설정에서 Skill을 열고 완전한 요구 사항과 제 3 자 통지를 읽으십시오.
2. 입력 유형과 실제 데이터를 비교합니다. 대량 RNA-seq 테이블은 단일 셀 AnnData 객체가 아닙니다. 분자 도면은 도킹 결과가 아닙니다.
3. 선택한 런타임 및 패키지를 검사합니다. 원격 작업을 위해, usable Compute Host를 선택하고 제출하기 전에 환경을 검사합니다.
4. 1개의 경계선을 요구하고, 실제적인 산출을 검열하고, 위로 스케일링하기 전에 입력/버전 참조를 유지합니다.

두 개의 추가 표시 항목, 자기 인식 및 기술 측정, 내부 프레임 워크 리소스입니다. user-facing 디렉토리 항목이 없습니다. rnaseq-count-qc를 포함하여 개인 또는 수입된 Skills는 23의 조사에서, 분리됩니다.

세 가지 환경 응용 프로그램 Skills 및 사용자 정의 숙박 활성화; [활성화 규칙](overview.md#why-some-switches-cannot-be-turned-off) 참조. [묶인 표시](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json)을 사용하여 배송 방법 및 [먼 compute](../guides/remote-compute.md)을 확인하여 호스트 설정 및 결과 전달을 확인합니다.

## 연구 작업에 의해 검색 {/* #browse-by-research-task */}

### 단백질 구조 {/* #protein-structure */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [알파폴2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | 단백질 FASTA; 모노머 또는 복합체 | ColabFold, 모델 무게, GPU; 선택적인 공공MSA 서비스 | 예측된 구조 및 신뢰 점수 |
| [볼츠](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Protein/DNA/RNA/ligand 복합 사양 | Boltz 패키지, 무게, GPU; 요청한 MSA 액세스 | 복잡한 구조 및 신뢰; 옵션 친화성 출력 |
| [모델 번호: Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | 멀티 엔터티 FASTA | chai-lab, 무게, GPU | All-atom 복합 및 신뢰 |
| [ESMFold2의 장점](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Sequences 또는 복잡한 입력 | Biohub esm 포장, 무게, CUDA; Fair-esm의 차별화된 | 구조 예측; ESMC가 요구하는 표현 |
| [오픈프레임3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | 단백질/nucleic 산/ligand 명세 | OpenFold3, 무게/액세서리, CUDA 및 구성 커널 | 복잡한 구조 및 점수 |

### 단백질 디자인 {/* #protein-design */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [DiffDock, 영국](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | 표적 PDB 플러스 ligand SMILES/SDF | DiffDock 저장소, 무게 및 GPU | ligand poses 등급; pose 신뢰는 부패하지 않습니다 |
| [단백질MPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | Backbone PDB, 설계 / 고정 체인 및 잔류물 | 저장소, 체크포인트, 토치/numpy; 작은 작업 지원 CPU | 설계된 순서 및 점수 |
| [리간드MPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | 백본 플러스 ligand/metal/nucleic-acid 컨텍스트 | 저장소와 Python 의존성; 작은 작업 지원 CPU | Sequences 및 스레드 구조 |
| [수용성MPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | 단백질 백본 | ProteinMPNN 저장소 및 수용성 체크 포인트; CPU 가능 | 이전의 용감한 모형의 밑에 Sequences |

### Sequence와 세포 {/* #sequence-and-cells */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [모델: ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | 단백질 시퀀스 | 공정한 esm 및 무게; 번들 절차는 GPU를 사용합니다 | Embeddings, 로그 또는 연락처 예측 |
| [보조이](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | genome/co 협조를 가진 DNA 창 | borzoi-pytorch, 무게 및 CUDA | 예측된 게놈 궤도 또는 참고/alternate deltas |
| [모델 번호: Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNA 시퀀스 또는 접두사 | Evo 2 무게, 호환 CUDA 및 충분한 메모리 | Sequence likelihoods, embeddings 또는 생성 된 DNA |
| [스크랩](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | 단일 셀 AnnData 유전자 어휘 매핑 | scGPT 패키지, 체크포인트 및 GPU | 세포 embeddings 또는 annotation 산출 |
| [scvi-tools의 장점](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | 단일 셀 카운트 및 배치 / 라벨 메타 데이터 | scvi-tools/scanpy/anndata; 번들 교육 워크플로우는 GPU을 기대합니다. | Latent 표현, 라벨 전송 또는 모델 기반 비교 |

### Evidence 및 쓰기 {/* #evidence-and-writing */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [문학 리뷰](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | 연구 질문, 식별자 또는 종이 | 근원 retrieval; OpenAlex 작업을위한 OpenAlex 키 | 검증된 증거 종합 및 인용 |
| [표시 Dossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | 환자 인구로 프레임 된 표시 | 연구 도구 및 소스 액세스 | Resumable 연구 방법 및 dossier |

### 환경 {/* #environment */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [환경 및 패키지](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | 패키지 또는 버전 질문 | 선택 Python/R 런타임 및 허용 패키지 소스 | 포장 검사, 관리된 임명 및 수입품 체크 |
| [Compute 환경 설정](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | SSH/Slurm 호스트의 환경 | 구성 호스트 및 사용자/admin-managed 활성화 | 설정 지침 및 유효성 기록 |
| [원격 컴퓨터 (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | 워크로드 및 자격이 된 Compute Host | SSH 자격, 호스트, 스케줄러 | 제출 작업, 수확 된 결과 및 출판 된 artifacts |

### 이름 &#42; {/* #authoring */}

| 스킬 | 입력 | 종업원 수 | 검사에 산출 |
| --- | --- | --- | --- |
| [사용자 정의](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | 요청된 Skill 또는 Specialist 변경 | 일 대리인; 기본 사용자 정의 작업 | Saved 패키지 또는 read-back 검증과 역할 |
| [그림 작풍](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | 실제 데이터와 1개의 최종 수치 | Notebook 기능 및 플로팅 의존성 | 가능한 라벨과 충실한 데이터로 검사된 도형 |
| [그림 Composer](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | 1개의 청구 및 immutable 자료 버전 참고 | Main 에이전트, 위임, 플로팅 및 리뷰 | Multi-panel 수치 및 리뷰 결과 |
| [종이 Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Manuscript/abstract, 캡션 및 주문 그림 데크 | Grounded Artifact 버전 및 리뷰 도구 | Paper Short 및 주문된 그림 인수 |



구현 참조 : [나.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
