---
title: "문학 증거 표 추출"
last_update:
  date: '2026-09-17'
---

# 문학 증거 표 추출 {/* #extract-a-literature-evidence-table */}

<p className="example-label"><strong>실습 예제</strong> 마스크 및 호흡 감염에 대한 10 가지 평가</p>

이 워크플로우는 10개의 종이를 정의한 세트로 시작되며 소스 링크된 증거 테이블과 불확실한 주의 사항이 종료됩니다. 그것은 공공 보건 문학 검토에 대한 추출을 보여줍니다. 공급된 세트는 교육 선택, 포괄적 인 검색 또는 완성 된 체계적인 검토입니다.

## 경계 소스 세트 준비 {/* #prepare-a-bounded-source-set */}

다운로드 <a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>10 종이 소스 목록</a>. DOI, PMCID 및 원래 풀 텍스트 링크가 포함되어 있습니다. 커뮤니티, 가구 및 의료 재판. 명시된 액세스 조건 하에서 소스를 얻고 읽으십시오.

이 예제에서 사용되는 동일한 텍스트 입력을 위해 <a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>소스 준비 스크립트</a>을 다운로드하고 로컬 작업 폴더에서 Python 3로 실행하십시오.

```bash
python3 prepare-mask-sources.py
```

스크립트는 10 유럽 PMC XML 레코드를 다운로드하고 소스 정체성을 유지하고, 섹션 헤드 및 테이블을 유지하고 **mask-trials-fulltext.md**을 만듭니다. 이 연구에 의욕을 하지 않고 실패를보고. 원본 전체 텍스트는 위키에 적색하지 않습니다. 다운로드가 실패한 경우, 설정을 완료하기 전에 소스 링크를 통해 종이를 얻습니다.

Open-Science 프로젝트에서 작업 모델을 선택하고 **+ → Attach files**로 결과를 표시하십시오. 소스 목록은 10 가지 명백한 연구를 포함합니다. 텍스트 버전은 추출을 돕습니다; 레이아웃, 그림 또는 주변 테이블 구조에 대한 원본 기사로 돌아갑니다.

첨부 파일을 클릭하여 미리보기를 엽니다. 각 연구는 제목, DOI 및 원본 소스 링크로 시작되며, 섹션 텍스트 및 테이블에 따라 다릅니다. 소스 리스트와 함께 10개의 식별자를 일치합니다. 추가적인 연구로 반복된 단면도 headings를 조사하지 마십시오.

![실제 첨부된 풀 텍스트 팩은 소스 정체성 및 문서 섹션을 유지합니다.](/img/open-science/research-workflows/mask-trials-input.webp)

증거로 종이를 사용하기 전에, 그것의 근원에 보정 또는 retractions를 검사하십시오. v0.30.2에서 `literature-review` Skill의 `verify_dois` 헬퍼는 두 방향으로 크로스레프 업데이트 관계를 확인합니다. `retracted: true`는 철회된 종이 또는 retraction 고시를 확인할 수 있습니다; 관련 관계를 검사합니다. `false`는 검사한 감적이 발견되지 않았습니다, 종이가 결코 철회되지 않은 증거.

## 시험 당 한 줄에 대해 묻습니다. {/* #ask-for-one-row-per-trial */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

의도한 소스 읽기 요청을 허용한다. 에이전트는 10 가지 연구 섹션에 도달, 오히려 단지 첫 번째 추상 또는 유사한 제목의 종이를 사용 하 여 중복.

## 추출된 증거를 검토 {/* #review-the-extracted-evidence */}

응답 완료 후 CSV을 엽니 다. 소스 목록으로 10 DOI 값을 비교하면 각 종이의 결과 섹션 또는 테이블에 대한보고 된 견적 및 분석 인구를 확인하십시오.

![Open-Science의 10 대 증거 테이블](/img/open-science/research-workflows/mask-trials-evidence.webp)

이러한 구별에 대한 특정주의를 지불:

- **무작위의 단위**: 마을, 가구, 텐트 또는 병원은 개별적으로 무작위로 참가자가 아닙니다.
- **제품 정보**: symptomatic seroprevalence, 실험실 확인 감염 및 인플루엔자 같은 질병은 다른 종점입니다.
- **분석 **:는 고정된 비교에서 고정된 비교에서, 고착한 subgroup 결과에 근거를 두거나 초기 발명품 subgroup 결과를 분리해야 합니다.
- **불확실성**: 신뢰구간과 결론이 불확실한 결과를 그대로 남기세요. 통계적으로 유의하지 않은 추정치를 효과가 없다는 증거로 바꾸지 마세요.

<a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>예시 증거 표</a> 및 <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>관련 상품</a>을 사용하여 형식을 검사합니다. 이들은 검토를 위한 시작 물자입니다; 과학적 해석은 여전히 원본 소스, 연구 품질 및 질문에 응답 할 것입니다.

**mask-trials-reading-notes.md** 및 CSV을 엽니다. 이 런의 최종 테이블은 **10 행 · 12 열**이 있습니다. 미리보기를 확장하거나 긴 세포를 읽는 파일을 다운로드; truncated 세포는 소스 텍스트를 누락하지 않습니다. 노트는 10 가지 연구 식별을 유지하고 왜 그들의 결과와 인구가 자동으로 풀리지 않아 설명합니다.

![저장된 판독 노트와 완료된 10 줄 출력](/img/open-science/research-workflows/mask-trials-notes.webp)

행이 잘못되거나 불완전한 경우, 연구 및 정확한 소스 섹션/테이블을 이름, **모두 보기** 파일에 대한 개정을 요청한 다음 다시 열 수 있습니다. 예를 들어, Cowling 2008의 임의화 된 가구 흐름을 분석 된 하위 세트에서 분리하십시오. prose 대답을 업데이트하지 않는 자체가 저장된 테이블을 업데이트하지 않습니다.

## 리뷰 계속하기 {/* #continue-toward-a-review */}

검토 된 테이블을 소스 및 추출 결정으로 저장하십시오. 공식 검토는 문서화 된 검색, 자격 기준, 심사, 중복 추출 및 bias의 적절한 평가를 필요로한다. [핵심 Reading-list 워크플로우](core-reading-list.md) for source valid and [계정 관리](pdf-evidence.md) for the 결론이 더 가까운 검사를 필요로 할 때.
