---
title: 更新已有文献集合
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 更新已有文献集合

<p className="example-label"><strong>案例演示</strong> 两个发表时间段的淡水微塑料迁移文献</p>

更新文献库时，应保留原检索规则，并说明具体增加了什么。本例按历史时间段重放：先建立 **2020—2022 年**的集合，再用相同检索词与条件查询 **2023—2025 年**，实际将集合从 **7 篇增加到 14 篇**。这是有数量上限的手动检索，不是定时监控，也不是穷尽综述。

## 1. 定义并保存基线

打开项目，选择可用模型。在 **Resource center → Connectors** 中启用 **Literature Graph**，按需配置 OpenAlex，发送：

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

本次从 **3,643 条命中中取回 12 条**，保留 **7 条**、排除 **5 条**。先打开 **freshwater-search-plan.md**，核对筛选条件和日期，再继续。此时保存的计划记录的是更新前的状态。

![已保存的基线检索条件和保留记录](/img/open-science/workflow-extensions/freshwater-search-plan.webp)

注意证据层级：部分候选只返回标题和元数据，部分提供许可允许返回的摘要。本例将相关迁移路径的综述作为背景材料纳入，不代表它们都提供淡水环境中的实验结论。

## 2. 创建并填充集合

下载<ExampleDownload path="/examples/workflow-extensions/freshwater-baseline.ris">基线 RIS</ExampleDownload>。打开 **Library → New collection**，创建并选中 **Freshwater Microplastic Transport**，再点击 **Import references**。选取 RIS，核对目标集合和匹配方式后导入。

![基线文献导入目标集合的预览](/img/open-science/workflow-extensions/freshwater-import-baseline.webp)

本次实际完成 **7 Created、0 Reused、0 Skipped、0 Failed**。点击 **Done**，确认集合包含 7 篇。若你的文献库已经存在匹配记录，新增与复用的数量可能不同。

![包含七篇文献的基线集合](/img/open-science/workflow-extensions/freshwater-collection-baseline.webp)

## 3. 在同一会话中检索后续时间段

返回项目会话，保持基线文件不变，明确要求比较新旧记录：

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

后续检索从 **7,600 条命中中取回 12 条**，其中 **7 条新增、0 条与基线重叠、5 条排除**。两次都只取前 12 条候选。排名和收录会变化，这些数字对应 2026 年 9 月 16 日的实际结果。

![保存后的更新审核表，区分新增与排除记录](/img/open-science/workflow-extensions/freshwater-update-audit.webp)

应比较实际 DOI 集合，不能只拿总数相减。将注明日期的<ExampleDownload path="/examples/workflow-extensions/freshwater-update-review.csv">更新审核表</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/freshwater-update-notes.md">更新说明</ExampleDownload>与基线一起保存。

## 4. 将新增记录导入原集合

下载<ExampleDownload path="/examples/workflow-extensions/freshwater-update.ris">新增文献 RIS</ExampleDownload>。在 Library 中选中 **Freshwater Microplastic Transport**，点击 **Import references**，保持 **Reuse existing reference**，便于复用已存在的匹配项。

![更新导入预览显示七条新增文献](/img/open-science/workflow-extensions/freshwater-import-update.webp)

本次更新实际完成 **7 Created、0 Reused、0 Skipped、0 Failed**，集合最终为 **14 篇**，与两组保留记录按 DOI 合并后的数量一致。

![更新后的集合包含十四篇文献](/img/open-science/workflow-extensions/freshwater-collection-updated.webp)

基线文件没有被重写。保留它的日期范围与检索记录，后续读者才能区分原有材料和新增材料。用于开题或支撑科研论断前，还需要取得并阅读相关全文；元数据入库不等于完成证据评价。重叠检索词的合并方式见[合并多批检索结果](merge-literature-searches.md)。

下载版审核表省略全文摘要及其许可字段，保留标识符、筛选决定与理由；摘要请在来源链接中查看。
