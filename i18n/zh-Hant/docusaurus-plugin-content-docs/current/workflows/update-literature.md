---
title: "更新已有文獻集合"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 更新已有文獻集合 {/* #更新已有文献集合 */}

<p className="example-label"><strong>案例演示</strong> 兩個發表時間段的淡水微塑膠遷移文獻</p>

更新文獻庫時，應保留原檢索規則，並說明具體增加了什麼。本例按歷史時間段重放：先建立 **2020—2022 年**的集合，再用相同檢索詞與條件查詢 **2023—2025 年**，實際將集合從 **7 篇增加到 14 篇**。這是有數量上限的手動檢索，不是定時監控，也不是窮盡綜述。

## 1. 定義並儲存基線 {/* #1-定义并保存基线 */}

開啟專案，選擇可用模型。在 **Resource center → Connectors** 中啟用 **Literature Graph**，按需配置 OpenAlex，傳送：

```text
Search OpenAlex for freshwater microplastic transport.
Use publication dates 2020-01-01 through 2022-12-31, type article,
relevance sort and a limit of 12 candidates. Retain DOI-bearing records
about freshwater transport, fate, deposition, or transport pathways
that can deliver microplastics to freshwater systems. Exclude work
focused on human health, soil alone or biological effects without
transport. Inspect titles and only the abstracts actually returned.
Save freshwater-baseline.ris, freshwater-baseline.csv,
freshwater-baseline-source.json and freshwater-search-plan.md.
Record every exclusion, exact arguments, retrieval time and truncation.
Do not retrieve full text or run the later update yet. Use English.
```

本次從 **3,643 條命中中取回 12 條**，保留 **7 條**、排除 **5 條**。先開啟 **freshwater-search-plan.md**，核對篩選條件和日期，再繼續。此時儲存的計劃記錄的是更新前的狀態。

![已儲存的基線檢索條件和保留記錄](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

注意證據層級：部分候選只返回標題和後設資料，部分提供許可允許返回的摘要。本例將相關遷移路徑的綜述作為背景材料納入，不代表它們都提供淡水環境中的實驗結論。

## 2. 建立並填充集合 {/* #2-创建并填充集合 */}

下載<ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">基線 RIS</ExampleDownload>。開啟 **Library → New collection**，建立並選中 **Freshwater Microplastic Transport**，再點選 **Import references**。選取 RIS，核對目標集合和匹配方式後匯入。

![基線文獻匯入目標集合的預覽](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

本次實際完成 **7 Created、0 Reused、0 Skipped、0 Failed**。點選 **Done**，確認集合包含 7 篇。若你的文獻庫已經存在匹配記錄，新增與複用的數量可能不同。

![包含七篇文獻的基線集合](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. 在同一會話中檢索後續時間段 {/* #3-在同一会话中检索后续时间段 */}

返回專案會話，保持基線檔案不變，明確要求比較新舊記錄：

```text
Continue the saved freshwater microplastic transport search.
Change only the publication dates to 2023-01-01 through 2025-12-31.
Keep the same query, type article, relevance sort, candidate limit 12
and screening criteria. Preserve the baseline files.
Compare normalized DOIs with freshwater-baseline.ris; do not assume
separate date windows guarantee unique records. Classify every returned
candidate as addition, baseline overlap or excluded, with reasons.
Save additions only as freshwater-update.ris, plus
freshwater-update-audit.csv, freshwater-update-source.json and
freshwater-update-notes.md. State counts and missing evidence.
Use only returned metadata/abstracts, not invented full-text findings.
Write in English and reopen the outputs.
```

後續檢索從 **7,600 條命中中取回 12 條**，其中 **7 條新增、0 條與基線重疊、5 條排除**。兩次都只取前 12 條候選。排名和收錄會變化，這些數字對應 2026 年 9 月 16 日的實際結果。

![儲存後的更新稽核表，區分新增與排除記錄](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

應比較實際 DOI 集合，不能只拿總數相減。將註明日期的<ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">更新稽核表</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">更新說明</ExampleDownload>與基線一起儲存。

## 4. 將新增記錄匯入原集合 {/* #4-将新增记录导入原集合 */}

下載<ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">新增文獻 RIS</ExampleDownload>。在 Library 中選中 **Freshwater Microplastic Transport**，點選 **Import references**，保持 **Reuse existing reference**，便於複用已存在的匹配項。

![更新匯入預覽顯示七條新增文獻](/img/open-science/workflow-extensions/freshwater-import-update.webp)

本次更新實際完成 **7 Created、0 Reused、0 Skipped、0 Failed**，集合最終為 **14 篇**，與兩組保留記錄按 DOI 合併後的數量一致。

![更新後的集合包含十四篇文獻](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

基線檔案沒有被重寫。保留它的日期範圍與檢索記錄，後續讀者才能區分原有材料和新增材料。用於開題或支撐科研論斷前，還需要取得並閱讀相關全文；後設資料入庫不等於完成證據評價。重疊檢索詞的合併方式見[合併多批檢索結果](merge-literature-searches.md)。

下載版稽核表省略全文摘要及其許可欄位，保留識別符號、篩選決定與理由；摘要請在來源連結中檢視。
