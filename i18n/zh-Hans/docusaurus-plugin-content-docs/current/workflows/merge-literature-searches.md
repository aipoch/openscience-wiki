---
title: 合并多批文献检索结果
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 合并多批文献检索结果

<p className="example-label"><strong>案例演示</strong> 固态电解质界面与界面相</p>

多次检索经常找到同一篇论文。先保留各批来源与筛选记录，再利用标识符匹配导入同一集合。本例实际执行两次 OpenAlex 检索，每批保留 8 篇，最终在文献库得到 **15 条唯一记录**。本例整理的是文献元数据，未获取或评估全文。

## 1. 执行并记录两批检索

在 **Resource center → Connectors** 中启用 **Literature Graph**，按提示配置 OpenAlex 凭据。打开项目，新建会话并选择可用模型。本例使用 Open-Science **0.30.1** 和 **Codex subscription / gpt-5.6-sol**，开始时不需要准备 PDF。

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

展开实际 Connector 调用，检查检索词、日期和返回数量。本例两批各返回 **12 条候选**，对应总命中数为 **94,620** 和 **15,355**。由于设置了数量上限，这不是穷尽检索。两批都来自 OpenAlex，不应因检索词不同就称为两个独立数据库。

## 2. 导入前检查导出文件

在 **Generated** 中打开 **electrolyte-merged.csv**，对照两个 RIS 文件与候选审核表，核对保留的标题、DOI 和来源。本例合并表为 15 行；DOI **10.1007/s41918-024-00212-1** 在两批中均出现，来源标为 **A|B**。

![保存后的合并表保留了各条记录的检索来源](/img/open-science/workflow-extensions/batches-merged.webp)

比较 DOI 时去掉首尾空格和可选的 DOI 网址前缀，忽略大小写；来源记录仍保留原始标识。仅凭相似标题不能认定为同一条记录，标识符冲突需要进一步核查。

下载本次实际导出的 <ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-a.ris">第一批 RIS</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-batch-b.ris">第二批 RIS</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/electrolyte-search-provenance.csv">24 条候选的筛选记录</ExampleDownload>与<ExampleDownload path="/examples/workflow-extensions/electrolyte-merged.csv">15 行合并表</ExampleDownload>。

## 3. 将第一批导入命名集合

1. 打开 **Library → New collection**，创建 **Solid-State Electrolyte Interfaces**。
2. 在侧栏选中该集合，再点击 **Import references**。
3. 选择 `electrolyte-batch-a.ris`，确认 **Import to** 是目标集合。
4. 保持 **When identifiers match → Reuse existing reference**，检查 **View details**，再点击 **Import references**。

![第一批导入预览：目标集合中将新增八条文献](/img/open-science/workflow-extensions/batches-import-a.webp)

本次第一批实际完成 **8 Created、0 Reused、0 Skipped、0 Failed**。点击 **Done** 后查看集合。如果你的文献库已经有匹配记录，新增与复用的数量可能不同。

## 4. 导入第二批并复用重复项

保持同一集合选中，导入 `electrolyte-batch-b.ris`。导入前先看重复识别结果：本例显示 **7 New references、1 Existing、0 Skipped**。

![第二批导入预览中，共同论文被识别为 Existing](/img/open-science/workflow-extensions/batches-import-b.webp)

保持 **Reuse existing reference**，核对共同论文的标题后导入。实际完成结果为 **7 Created、1 Reused、0 Skipped、0 Failed**。复用保留已有元数据，并将匹配记录加入目标集合；它不会新建第二份记录，也不会下载 PDF。

![第二批完成后实际新增七篇、复用一篇](/img/open-science/workflow-extensions/batches-import-result.webp)

## 5. 检查最终集合

点击 **Done**，集合中应有 **15 篇**，与 DOI 合并表一致。保留原始两批 RIS 与来源 CSV，便于同事追溯每条候选来自哪次检索。

![最终集合包含十五篇文献](/img/open-science/workflow-extensions/batches-collection.webp)

数量一致只是检查的一部分，还需核对重复 DOI 和代表性标题。要在保留基线的前提下加入后续年份文献，继续阅读[更新已有文献集合](update-literature.md)。
