---
title: "파일 형식 및 제한"
last_update:
  date: '2026-11-19'
---

# 파일 형식 및 제한 {/* #file-formats-and-limits */}

파일 라우팅 및 제한을 여기에서 확인하세요. 파일 업로드, 미리보기, 도구에서 파싱하고 모델에 전송은 별도의 기능입니다. 수신된 업로드는 인라인 뷰어 또는 모델 이해의 약속이 아닙니다.

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## 미리보기 routing {/* #preview-routing */}

| 이름 &#42; | 인식된 확장 | Behavior와 경계 |
| --- | --- | --- |
| Raster/vector 이미지 | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | 이미지 미리보기; 모델 입력은 여전히 이미지 지원에 달려 있습니다. |
| 공지사항 | `tif`, `tiff` | 파일, 픽셀 및 메모리 제한이있는 전용 디코더 |
| 한정된 테이블 | `csv`, `tsv` | 첫번째 줄은 우두머리로 대우됩니다; 결합된 줄/columns |
| 이름 &#42; | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | FASTA 검사; 보기는 분석 방법을 검증하지 않습니다 |
| 회사연혁 | `pdb` | 구조 구경꾼; 예측의 질 평가 없음 |
| Molecule / 반응 | `mol`, `sdf`, `smi`, `smiles`, `rxn` | 전용 분자 미리보기; 가정하지 마십시오 `mol2` 같은 여정이 있습니다. |
| PDF 파일 | `pdf` | Dedicated 문서 리더 페이지 제어 |
| 이름 &#42; | `docx` | 사무실 연출자; 유산 `doc` DOCX 파싱에 대한 경로가 없습니다. |
| 스프레드시트 | `xls`, `xlsx` | Office spreadsheet 미리보기; 모델 실행은 별도의 작업입니다 |
| 주요연혁 | `pptx` | 발표 미리보기 및 [슬라이드 편집](../guides/presentation-editing.md); 유산 `ppt` PPTX 파싱에 대한 경로가 없습니다. |
| 옵션 정보 | `md`, `markdown` | 문서 렌더링, 지원된 텍스트 버전 작업 |
| 사이트맵 | `htm`, `html` | 고립 된 HTML 미리보기; 응용 권한을받지 않습니다 |
| JSON 파일 | `json` | 지정된 플랜 JSON을 포함한 구조 미리보기 |
| 이름 &#42; | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | Highlighted 소스; 스크립트를 열고 실행하지 않습니다. |
| 일반 텍스트 | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | Bounded 텍스트 미리보기 |
| 다른 파일 | 인식된 확장/content | 사용할 수있는 Fallback/download; `.ipynb` 수출은 전용 파일-preview 편집기가 아닙니다. |

라우터는 또한 적당한 extensionless 파일을 위한 좁은 MIME fallback가 있습니다. Misleading Office MIME metadata는 OOXML 렌더링기와 호환되는 유산 형식을하지 않습니다.

[Exact 라우팅 테이블](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [익스플로러](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## 크기와 전시 한계 {/* #size-and-display-limits */}

아래의 단위는 바이너리 단위입니다: 1 MiB = 1,048,576 바이트; 1 GiB = 1,073,741,824 바이트. 인터페이스는 이러한 값 MB 또는 GB를 표시 할 수 있습니다.

| 언어: 영어 | 소스 제한 | 어떤 제한이 적용됩니다. |
| --- | ---: | --- |
| 1개의 프로젝트 업로드 | 10 지브 | 입학을 업로드, 미리보기 또는 모델 컨텍스트 예산이 아닌 |
| 1개의 업로드 chunk | 8 미B | 전송 펑크 크기; 사용자 인터페이스 per-file limit |
| Composer 첨부 파일 | 10 | 메시지 당 첨부 수 |
| Composer artifact 언급 | 10 | 메시지 당 Explicit artifact 참조 |
| 과태 text-preview 읽기 | 1 미B | 초기 경계 내용 읽기 |
| 최대 요청된 일반적인 미리보기 읽기 | 10 미B | 일반적인 독자 천장; 전문 독자들은 자신의 한계가 있습니다. |
| CSV/TSV 눈에 보이는 자료 | 100 행 × 24 열 | 첫번째/머리 줄 후에 표시된 자료; 소스 dataset 크기가 아닌 |
| Office 파일 미리보기 | 40 미B | Office 미리보기 |
| TIFF 파일 미리보기 | 40 미B | 전용 TIFF 파일 제한 |
| TIFF는 화소를 decoded | 25,000,000 | 미리보기 디코드 픽셀 예산 |
| TIFF 분리 된 할당 | 256 미B | 미리보기 디코더 메모리 예산 |
| TIFF 페이지 수 | 512 | Preflight 페이지 모자; 다른 구조상 모자는 또한 적용합니다 |
| 자동 PDF 추출/액체 | 50 미B | 자동 PDF 텍스트/액체 경로; 일반 프로젝트 업로드 제한으로 치료하지 마십시오. |

관련 작업에 나열된 한계를 적용하십시오: 미리보기 제한, 업로드 한도 및 패키지 예산은 별도입니다. 대형 파일의 경우, 호환 가능한 외부 리더로 원본 파일을 사용하거나 방법에 따라 입력을 나눕니다.

테이블 말하기 **100 행 표시** 더 많은 소스 줄을 포함 할 수 있습니다. Notebook에서 실제 파일 파싱을 사용하여 크기를 설정하십시오. GSE60450 경우에, 근원에는 표본 QC CSV가 12의 줄이 있는 동안 27,179 유전자 줄이 있습니다: 2개의 파일은 다른 단위를 요약합니다.

[제한사항](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [CSV 경계](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [text-reader 경계](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [사무실 제한](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [TIFF 제한](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [PDF 추출 한계](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## 문학 수입 및 인용 산출 {/* #literature-import-and-citation-output */}

| 제품 정보 | 회사연혁 | 관련 제품 |
| --- | --- | --- |
| Reference-record 가져오기 | BibTeX, RIS, NBIB | 수입 bibliographic 기록; 첨부된 전체 텍스트를 보장하지 않습니다 |
| 수입 내용 | 32 MiB까지, 1,000-record 경계와 더불어 | 더 큰 컬렉션을 검토 한 배치로 분할 |
| Citation-style 수입품 | CSL, 최대 1 MiB | 스타일의 정의, 문학 컬렉션이 아닙니다. |
| Bibliographic 기록 수출 | BibTeX 또는 RIS | NBIB 수입은 NBIB 수출을 의미하지 않습니다. |
| 인용 formatting locale | `en-US`, `zh-CN` | Citation Locale는 애플리케이션 UI 언어에서 분리됩니다. |
| 컬렉션 이름 | 200 문자 | 컬렉션 라벨 |
| 수집 설명 | 1,000 문자 | 수집 설명; Project Agent Context를 대체하지 않습니다. |

DOI 메타데이터 결과가 다운로드되지 않았습니다. PDF. 첨부 된 PDF은 에이전트가 전체 텍스트를 읽는 증거가 아닙니다. 첨부파일과 실제 실행/유효기록을 모두 확인한다.

[문학 스키마 및 한계](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [import/export 체재기](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## 버전 및 다운로드 ID {/* #version-and-download-identity */}

| Identifier에 대하여 | 제품 정보 | 법적고지 |
| --- | --- | --- |
| 표시 이름 | 인터페이스에서 파일 찾기 | 혼자 이름은 immutable 콘텐츠를 식별하지 않습니다. |
| 파일/artifact ID | 관리 객체를 식별 | 다운로드된 경로는 object's identity가 아닙니다. |
| 버전 ID / `vN` | 정확한 저장된 개정 및 그것의 입증을 검열하십시오 | 최근 콘텐츠는 결과에 사용되는 버전과 다릅니다. |
| 체크섬 | 소스와 저장된 사본 사이 바이트 비교 | 매칭 이름은 일치하는 checksums를 설치하지 않습니다. |
| 자주 묻는 질문 | 외부 복사를 찾습니다 | 복사가 자동으로 관리 된 버전을 업데이트하지 않는 편집 |

작동 단계의 경우 [Notebook 및 증거](../guides/notebook.md) 및 [공공데이터 워크플로우](../workflows/data-quality.md)을 사용하십시오. 이 참조는 경계를 중심으로 그 가이드는 작업에 집중할 수 있습니다.

형식별 컨트롤을 위해 [미리보기 컨트롤](../guides/previews.md#diagram-source-and-format-specific-controls): Mermaid 소스/제거 전환, 단일 페이지 PDF 읽기 조건, 경계 테이블, 워크 시트 선택 및 TIFF 페이지 처리가 표시됩니다. 미리보기 지원은 성공적인 모델 입력 또는 수출을 설정하지 않습니다.
