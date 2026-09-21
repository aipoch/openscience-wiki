---
title: "限定期刊與時間範圍檢索文獻"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 限定期刊與時間範圍檢索文獻 {/* #限定期刊与时间范围检索文献 */}

<p className="example-label"><strong>案例演示</strong> 檢索兩種期刊在 2019–2025 年發表的正念干預試驗</p>

精準檢索需要明確範圍，並記錄每一條候選文獻的篩選依據。本例透過 PubMed 檢索 **JAMA Psychiatry** 和 **Behaviour Research and Therapy** 中與正念相關的論文，再區分隨機試驗報告和其他文章，產出完整篩選表與檢索說明，不提供治療建議，也不構成系統綜述。

## 1. 確定問題與納入規則 {/* #1-确定问题与纳入规则 */}

開啟專案並選擇已連線的模型。在 **Settings → Connectors** 中確認 **PubMed** 可用；如提示需要聯絡資訊，在該設定中填寫。開始本例前不需要下載論文。

日期範圍使用**發表日期 2019-01-01 至 2025-12-31**，不是資料庫收錄日期。納入設有明確正念干預組、報告參與者結果的原始隨機研究。對混合干預、原始或二次發表身份不清、日期衝突的記錄，單列為 **uncertain**。研究機制性結局本身不代表論文是二次分析。

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![Open-Science 中實際傳送的精準檢索請求](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. 核對檢索式與覆蓋範圍 {/* #2-核对检索式与覆盖范围 */}

本次提交的主題與期刊檢索式如下，另行傳入發表日期過濾條件：

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

開啟 **Notebook** 或展開 PubMed 活動，確認期刊欄位、起止日期和返回數量。2026 年 9 月 16 日的檢索返回 **62 條記錄**，實際取回 62 條，`has_more = false`。PubMed 更新索引後，數量可能變化。如果結果被截斷，應先取回剩餘分頁，再聲稱已篩完全部命中記錄。

這個較寬的主題檢索會保留非試驗論文，是否滿足試驗要求由後續篩選決定。文獻型別索引可能不完整；摘要提到既往隨機試驗，也不代表該文章報告了一項新試驗。

## 3. 檢查並修正篩選表 {/* #3-检查并修正筛选表 */}

回答完成後，在 **Generated** 中開啟 **mindfulness-search-audit.csv**。表中應保留全部檢索到的 PMID，包括排除和待確認記錄。透過 PubMed 連結核對標題、期刊、DOI 和日期，再把篩選結論與摘要逐項對照。

![保留待確認和排除記錄的候選文獻表](/img/open-science/workflow-extensions/focused-search-table.webp)

逐條對照摘要檢查排除理由。PMID **38837133** 是更廣義心理治療的原始隨機試驗，示例表將其是否符合正念干預範圍標為 **uncertain**；PMID **34009273** 是薈萃分析，因此排除。需要糾正決定時，點明記錄和具體問題，要求 Agent 修改 CSV，再重新開啟儲存的檔案。

本例複核後的表格有 **20 條納入、37 條排除、5 條待確認**，合計 **62 條**。這些是依據摘要作出的篩選判斷，不代表已經完整評估了 20 項獨立試驗。同一試驗也可能有多篇報告。
![Notebook 中的實際篩選修訂和儲存檔案檢查](/img/open-science/workflow-extensions/focused-search-notebook.webp)


## 4. 保留未解決的疑點 {/* #4-保留未解决的疑点 */}

PMID **41418645** 被 PubMed 的 2019–2025 年發表日期條件檢出，但返回後設資料中的印刷日期為 **2026-01**。應保留這一差異，檢查發表歷史後再決定是否符合日期要求，不能悄悄修改年份以滿足檢索範圍。

開啟 **mindfulness-search-notes.md**，檢查其中的計數、篩選規則和限制是否與 CSV 一致。同時保留原始後設資料快照，便於追溯每項決定的來源。

![修訂後的檢索說明及 20/37/5 篩選數量](/img/open-science/workflow-extensions/focused-search-notes.webp)

下載<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">複核後的候選表</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">檢索說明</ExampleDownload>。Wiki 不重新分發完整摘要，可透過來源連結檢視。

開展正式證據綜述前，還需解決待確認記錄、取得全文、關聯同一試驗的不同報告，並安排適當的獨立篩選。需要建立文獻集合時，繼續閱讀[核心閱讀文獻庫](core-reading-list.md)；來源範圍和訪問條件明確後，再進行[證據提取](literature-review.md)。
