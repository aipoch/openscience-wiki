---
title: "웹을 검색하고 소스를 읽으십시오"
last_update:
  date: '2026-11-20'
---

# 웹을 검색하고 소스를 읽으십시오 {/* #search-the-web-and-read-sources */}

내장된 **Open-Science Agent**을 사용하여 공공 웹 페이지를 찾아 대화에서 텍스트를 읽습니다. 이것은 보고 지침, 소프트웨어 문서 및 연구 발표를 찾는 데 유용합니다. bibliographic 기록과 가득 차있 원본 종이를 위해, 또한 [과학적인 데이터베이스](databases.md)와 [라이브러리](../guides/library.md)를 이용합니다.

## 자주 묻는 질문 {/* #start */}

1. **Settings → Agent**에서 **Open-Science Agent**을 선택합니다. **Settings → Model**에서 지원되는 Main 모형을 연결하십시오; Codex 구독은 모델을 공급할 수 있습니다.
2. 프로젝트 대화를 엽니다. 당신이 찾고 싶은 상태, 어떤 소스 우선 순위 및 날짜 제한. 응답하기 전에 관련 페이지를 읽는 에이전트에게 문의하십시오.
3. 승인이 나타나면 검색 쿼리, 시간 범위, 결과 제한 및 도메인 필터를 검사합니다. 만의 요청을 승인합니다. 페이지 읽기 승인은 목적지 URL에 대한 우려.
4. 도구 활동을 확장하고 반환 된 소스를 검사합니다. 그 주장을 사용하기 전에 증거에 대한 답변의 인용을 따르십시오.

다음과 같이 요청할 수 있습니다.

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

내장 검색은 Exa 계정이 필요없는 **엑사스**에 쿼리를 보냅니다. 페이지를 읽는 것은 웹 사이트로 연락합니다. 귀하의 권한 모드는 여전히 적용되며 취소는 이미 전송된 요청을 수행 할 수 없습니다. 공공 검색 쿼리에 은밀한 연구 데이터를 포함하지 마십시오.

## 증거를 읽으십시오, 그냥 스니펫 {/* #read-sources */}

검색 결과는 발췌문입니다. Agent에게 선택한 페이지를 읽고 답변을 뒷받침하는 부분을 인용하도록 요청하세요. 페이지 읽기는 공개 HTML, Markdown 및 일반 텍스트를 지원합니다. 로그인하거나 브라우저 쿠키를 사용하거나 사이트의 JavaScript를 실행하지 않습니다. 논문과 첨부 파일에는 PDF 및 Library 절차를 사용하고, HTML 소개 페이지를 논문 전체 본문으로 취급하지 마세요.

반환된 텍스트가 truncated 때, 드로잉 결론을 그리기 전에 저장된 페이지 발췌를 계속 읽는 에이전트를 요청합니다. 저장 된 소스는 그 시간에 retrieved 것을 반영합니다. 현재 단어를 쓰는 경우 신선한 fetch에 대해 물어보십시오. 유지된 소스는 세션 분지와 자격이 된 연구 패키지 수출을 따를 수 있습니다; 이것은 전체 웹 사이트를 아카이브하지 않습니다.

## 소스가 읽을 수 없는 경우 {/* #recover */}

- 비율 제한을 위해, retrying의 앞에 표시된 간격을 기다리십시오. 반복적으로 동일한 실패한 조회를 보냅니다.
- 필요한 필터가 지원되지 않은 경우, 그 요구 사항을 유지하고 다른 소스 또는 검색 경로를 선택하십시오. 자주 묻는 질문
- 로그인 벽, 차단된 페이지 또는 지원되지 않은 파일 형식을 위해, 공식 소스를 직접 열고 적절한 경우 접근 가능한 파일 제공. 확인된 증거로 읽지 않은 페이지를 설명하지 마십시오.

연구 논문을 찾고 심사하려면 [문학 검색](../workflows/focused-literature-search.md)을 계속하십시오.
