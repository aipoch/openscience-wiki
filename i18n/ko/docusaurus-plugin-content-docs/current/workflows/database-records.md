---
title: "과학 데이터베이스에서 구조화 된 레코드를 검색"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 과학 데이터베이스에서 구조화 된 레코드를 검색 {/* #retrieve-structured-records-from-a-scientific-database */}

<p className="example-label"><strong>실습 예제</strong> PubChem의 7 개의 직선 체인 carboxylic 산</p>

검증된 식별자 및 속성의 테이블과 함께 화합물 이름과 마감을 시작합니다. 이 예제는 옥타노산을 통해 아세트산을 검색하고, 2 ~ 8 탄소 원자로 7 명 균질 시리즈. 소스 레코드는 테이블에 따라 사용할 수 있으므로 각 값이 얻은 방법을 확인할 수 있습니다.

## 1. 화합물 및 속성 정의 {/* #1-define-the-compounds-and-properties */}

**Resource center → Connectors**에서 **뚱 베어**을 사용할 수 있는지 확인하십시오. 프로젝트를 열고 대화를 시작하고 연결된 모델을 선택하십시오. 이것은 Open-Science 0.30.1와 화학/PubChem Connector를 사용했습니다; 입력 스프레드 시트가 필요하지 않았습니다.

**중립, 직선 체인, 포화 monocarboxylic 산**을 지정합니다. 비슷한 이름은 분지 된 이노머, 소금 또는 conjugate베이스를 참조 할 수 있습니다. 혼자 공식은 모든 그 구조를 구별 할 수 없습니다.

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![합성 범위 및 실제 대화에서 요청된 파일](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. 실제 데이터베이스 호출 확인 {/* #2-check-the-actual-database-calls */}

전송 후, 도구 활동을 확장하거나 **Notebook**을 엽니 다. 실행은 `pubchem_search_compounds`과 7 이름을 해결, 다음 `pubchem_get_compounds`과 레코드를 검색. 반환된 CID와 구조를 검사하기 전에 각 이름에 대한 행을 받아. 이름이 여러 백수성 식별을 반환하면, 그 주변을 먼저 해결합니다.

예를 들어 정확한 산 이름과 첫 번째 반환 CID를 사용, 다음 배치 속성을 확인. 이것은 이 unambiguous 이름을 위해 적당합니다; 첫 번째 히트를 복용하는 것은 일반적인 식별 규칙이 아닙니다.

![실제 쿼리 활동 및 Notebook에서 저장 파일 readback](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. 저장된 테이블을 엽니다 {/* #3-open-the-saved-table */}

응답이 완료 될 때까지 기다립니다 및 파일은 **Generated** 아래 나타납니다. **pubchem-homologs.csv**을 열고 미리보기를 확대합니다. 이 실행은 **7 행 · 8 열**을 생산한다.

| 제품정보 | 팟캐스트 | 팟캐스트 | 분자량, g/mol |
|---|---:|---|---:|
| Acetic 산 | 176 | 모델 번호: C2H4O2 | 60.05 |
| Propanoic 산 | 1032 | 모델 번호: C3H6O2 | 74.08 |
| Butanoic 산 | 264 | 모델 번호: C4H8O2 | 88.11 |
| Pentanoic 산 | 7991 | 모델 번호: C5H10O2 | 102.13 |
| Hexanoic 산 | 8892 | 모델 번호: C6H12O2 | 116.16 |
| Heptanoic 산 | 8094 | 모델 번호: C7H14O2 | 130.18 |
| Octanoic 산 | 379 | 모델 번호: C8H16O2 | 144.21 |

![재개된 7 압축 CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

**₢ 킹**의 일치 행은, 그들의 전시 순서 아닙니다. 공식 및 선형 SMILES를 함께 확인하십시오. 예를 들어 반환 필드 이름, `SMILES` 및 `ConnectivitySMILES` 모두 유지; 그들의 문자열은 이러한 화합물에 대 한 일치 하는 것. 다른 식별자 또는 infer 실험적인 입체 음향으로 이름을 바꾸지 마십시오.

## 4. 수출에 소스 레코드를 유지 {/* #4-keep-the-source-records-with-the-export */}

**pubchem-homologs-source.json**을 열고 8개의 가동, 정확한 조회 입력 및 익지않는 응답을 검열하십시오. 절차 및 검사에 대한 **pubchem-homologs-notes.md**을 엽니 다. 저장 된 CSV은 원본 레코드와 비교되었습니다. 7개의 identities, 공식 및 선형 구조는 동의했습니다.

![저장된 절차, 검증 결과 및 해석 제한](/img/open-science/workflow-extensions/pubchem-notes.webp)

미리보기의 **Download** 버튼을 사용하여 로컬 복사를 유지하십시오. 이 완료된 실행을 위해, <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">소스 기록</ExampleDownload> 및 <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</ExampleDownload>를 다운로드하십시오. PubChem 레코드는 변경할 수 있습니다; 소스 스냅샷을 분석합니다.

이 데이터베이스에 입력 또는 표준화 된 속성, 새로운 실험적인 측정. 분자량은 정확한 monoisotopic 질량이 아닙니다, 이 테이블은 순수성, 독성 또는 생물학 활동을 설치하지 않습니다. 분쟁 소스 레코드를 비교하려면 [과학적 기록 Cross-checking](cross-check-records.md)을 계속하십시오.
