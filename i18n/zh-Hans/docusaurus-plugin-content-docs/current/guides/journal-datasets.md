---
title: "期刊数据集与文献属性"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 期刊数据集与文献属性

通过 **Library → Journals** 导入期刊目录、指标或分类，并在匹配的文献旁显示。每个数据集保留 **Source** 和 **Metric year**。Open-Science 不附带商业排名数据库的订阅；请导入有权使用的数据并保留来源。期刊属性描述期刊本身，不能代替对单篇论文质量和结论的判断。

## 准备小型数据集 {/* #prepare-dataset */}

<p className="example-label"><strong>案例演示</strong> 为已有论文添加出版方信息</p>

下载<ExampleDownload path="/examples/journals/journal-publisher-directory.csv">三种期刊的 CSV</ExampleDownload>，其中包含 Nature Communications、PLOS Medicine 和 The BMJ 的电子 ISSN、出版方及网址。来源为 [Nature Communications](https://www.nature.com/ncomms/)、[PLOS Medicine](https://journals.plos.org/plosmedicine/) 和 [The BMJ 订阅说明](https://www.bmj.com/about-bmj/resources-subscribers)。这是 **2026** 年的出版方目录快照，使用文本属性，不虚构影响因子或分区。

用于匹配的文献是 Ju 等人的 **Understanding activity and selectivity of metal-nitrogen-doped carbon catalysts for electrochemical reduction of CO₂**，DOI 为 **10.1038/s41467-017-01035-z**。如果库中尚无此文献，先[添加书目记录](library.md)，并对照来源核对期刊和 ISSN。显示期刊属性不需要取得论文全文。

支持 CSV、TSV、XLSX 和 journal bundle，文件上限为 **32 MB**。**Download template** 提供起始模板。标识列与属性列应分开；ISSN 按文本保存，保留连字符及可能出现的末位 X。

## 导入并匹配列 {/* #import-columns */}

1. 打开 **Library → Journals → Import attributes**，或点击上传区域。已有数据集时，打开 **Journal dataset** 选择器并选择 **New dataset**，再选择 CSV。
2. 检查 **Header row** 和 **Preview**。本文件第 **1** 行为列名；只有源文件把期刊横向排列时才使用 **Transpose**。
3. 将 **Source** 设为 `Publisher websites`，**Metric year** 设为 `2026`。检查自动建议值：文件中类似年份的数字可能被误识别。导入真正的指标数据时，应填指标所属年份，不能直接把文件发布年份当成指标年份。
4. 按下表匹配四列。各属性的保存名称应不同；**Skip** 表示不保存该列。
5. 点击 **Review import**，逐行核对后选择 **Import attributes**。本例显示 **3 ready; 0 need attention**，完成后出现 **Journal attributes imported**。

| 原始列 | Import as | Value type |
| --- | --- | --- |
| Journal name | Journal name | 标识字段 |
| ISSN | ISSN | 标识字段 |
| Publisher | Journal attribute | Text |
| Journal website | Journal attribute | Text |

![设置期刊标识、出版方属性及明确的来源和年份](/img/open-science/v0340/journal-column-mapping.webp)

还可使用 **Abbreviation** 和 **External journal ID** 作为标识。外部 ID 需要填写所属命名空间，不同目录的 ID 不能混用。属性类型包括 **Text**、**Number**、**Single choice** 和 **Multiple choices**。数值指标可选 Number，ISSN 和分区类别不应作为数值处理。

行状态可能为 **Matched**、**New**、**Ambiguous match**、**Invalid** 或 **Duplicate**。导入前检查冲突标识和重复行。可返回 **Edit mapping** 修改列角色；提供相应入口时，导出问题行或明确跳过需要处理的行。New 创建的是期刊条目，不是在文献库中新增论文。

## 在文献中显示属性 {/* #show-attributes */}

1. 确认选中 **Publisher websites 2026**，并开启 **Show in literature**。
2. 返回 **All references**，搜索 `Understanding activity`。
3. 打开论文，在 **Journal attributes** 中查看 **Publisher → Springer Nature** 和期刊网址。点击属性的信息入口可查看来源和年份。
4. 将文献的 **ISSN 2041-1723** 与导入期刊对照。论文发表年份 **2017** 与数据集快照年份 **2026** 是两个不同字段。

![导入后的期刊表，已开启 Show in literature](/img/open-science/v0340/journal-dataset.webp)

![已有 Nature Communications 文献显示出版方属性](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** 影响共享文献库、项目、集合和文献详情。同一来源一次只显示**一个年份**；启用同来源另一年份时，会替换此前显示的年份。缺失属性不会从其他年份补值。文献列表中可通过 **Customize** 选择显示哪些可用期刊列。

## 处理期刊匹配并维护数据集 {/* #journal-matches */}

从 Journals 的 **More actions → Journal alignment** 进入，通过 **Check library / Recheck library** 查看匹配、未匹配和歧义记录。该检查读取文献库，不会静默改写书目元数据。处理不匹配前，先对照原始出版物确认期刊名称和 ISSN。

提供相应入口时，使用 **Find journal candidates → Choose journal → Confirm journal association**，将选中的文献关联到正确期刊。它只作用于这一条文献，不会批量影响名称相似的论文。移除人工确认后恢复自动匹配；修改文献的期刊标识也可能使原关联失效。

先选择目标数据集，再使用 **Update dataset**。重新检查来源、年份和列映射，导入后核对受影响文献。其他年份应保留为单独数据集，不要覆盖原有年份的含义。数据集操作可修改名称、来源、年份，或导出保留数据及列设置的 journal bundle。同时保存原始文件及其使用条件。
