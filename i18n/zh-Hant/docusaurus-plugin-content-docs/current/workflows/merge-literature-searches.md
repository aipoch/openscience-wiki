---
title: "合併多批文獻檢索結果"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 合併多批文獻檢索結果 {/* #合并多批文献检索结果 */}

<p className="example-label"><strong>案例演示</strong> 固態電解質介面與介面相</p>

多次檢索經常找到同一篇論文。先保留各批來源與篩選記錄，再利用識別符號匹配匯入同一集合。本例實際執行兩次 OpenAlex 檢索，每批保留 8 篇，最終在文獻庫得到 **15 條唯一記錄**。本例整理的是文獻後設資料，未獲取或評估全文。

## 1. 執行並記錄兩批檢索 {/* #1-执行并记录两批检索 */}

在 **Resource center → Connectors** 中啟用 **Literature Graph**，按提示配置 OpenAlex 憑據。開啟專案，新建會話並選擇可用模型。本例使用 Open-Science **0.30.1** 和 **Codex subscription / gpt-5.6-sol**，開始時不需要準備 PDF。

```text
Use OpenAlex through Literature Graph to build two search batches:
A: solid state electrolyte interface
B: solid state battery interphase
For both use publication dates 2020-01-01 through 2025-12-31,
work type article, explicit relevance sort, and 12 candidates.
Keep all returned titles, DOIs, OpenAlex IDs, source URLs and ranks.
Screen for solid-state battery electrolyte interfaces or interphases;
retain up to eight relevant DOI-bearing records per batch.
Save electrolyte-batch-a.ris and electrolyte-batch-b.ris separately.
Keep an overlap in both RIS files. Save all candidate decisions in
electrolyte-search-provenance.csv and a DOI-normalized union in
electrolyte-merged.csv with source_membership A, B or A|B.
Use absolute HTTPS source URLs. Do not invent missing fields or findings.
Write in English and reopen the saved files.
```

展開實際 Connector 呼叫，檢查檢索詞、日期和返回數量。本例兩批各返回 **12 條候選**，對應總命中數為 **94,620** 和 **15,355**。由於設定了數量上限，這不是窮盡檢索。兩批都來自 OpenAlex，不應因檢索詞不同就稱為兩個獨立資料庫。

## 2. 匯入前檢查匯出檔案 {/* #2-导入前检查导出文件 */}

在 **Generated** 中開啟 **electrolyte-merged.csv**，對照兩個 RIS 檔案與候選稽核表，核對保留的標題、DOI 和來源。本例合併表為 15 行；DOI **10.1007/s41918-024-00212-1** 在兩批中均出現，來源標為 **A&#124;B**。

![儲存後的合併表保留了各條記錄的檢索來源](/img/open-science/workflow-extensions/batches-merged.webp)

比較 DOI 時去掉首尾空格和可選的 DOI 網址字首，忽略大小寫；來源記錄仍保留原始標識。僅憑相似標題不能認定為同一條記錄，識別符號衝突需要進一步核查。

下載本次實際匯出的 <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">第一批 RIS</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">第二批 RIS</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">24 條候選的篩選記錄</ExampleDownload>與<ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">15 行合併表</ExampleDownload>。

## 3. 將第一批匯入命名集合 {/* #3-将第一批导入命名集合 */}

1. 開啟 **Library → New collection**，建立 **Solid-State Electrolyte Interfaces**。
2. 在側欄選中該集合，再點選 **Import references**。
3. 選擇 `electrolyte-batch-a.ris`，確認 **Import to** 是目標集合。
4. 保持 **When identifiers match → Reuse existing reference**，檢查 **View details**，再點選 **Import references**。

![第一批匯入預覽：目標集合中將新增八條文獻](/img/open-science/workflow-extensions/batches-import-a.webp)

本次第一批實際完成 **8 Created、0 Reused、0 Skipped、0 Failed**。點選 **Done** 後檢視集合。如果你的文獻庫已經有匹配記錄，新增與複用的數量可能不同。

## 4. 匯入第二批並複用重複項 {/* #4-导入第二批并复用重复项 */}

保持同一集合選中，匯入 `electrolyte-batch-b.ris`。匯入前先看重複識別結果：本例顯示 **7 New references、1 Existing、0 Skipped**。

![第二批匯入預覽中，共同論文被識別為 Existing](/img/open-science/workflow-extensions/batches-import-b.webp)

保持 **Reuse existing reference**，核對共同論文的標題後匯入。實際完成結果為 **7 Created、1 Reused、0 Skipped、0 Failed**。複用保留已有後設資料，並將匹配記錄加入目標集合；它不會新建第二份記錄，也不會下載 PDF。

![第二批完成後實際新增七篇、複用一篇](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. 檢查最終集合 {/* #5-检查最终集合 */}

點選 **Done**，集合中應有 **15 篇**，與 DOI 合併表一致。保留原始兩批 RIS 與來源 CSV，便於同事追溯每條候選來自哪次檢索。

![最終集合包含十五篇文獻](/img/open-science/workflow-extensions/batches-collection.webp)

數量一致只是檢查的一部分，還需核對重複 DOI 和代表性標題。要在保留基線的前提下加入後續年份文獻，繼續閱讀[更新已有文獻集合](update-literature.md)。
