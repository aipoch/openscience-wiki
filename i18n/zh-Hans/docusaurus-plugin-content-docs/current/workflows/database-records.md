---
title: 检索科学数据库并下载结构化记录
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 检索科学数据库并下载结构化记录

<p className="example-label"><strong>案例演示</strong> 检索 PubChem 中的七种直链羧酸</p>

从化合物名称出发，得到包含已核对标识符和属性的表格。本例检索乙酸到辛酸，覆盖碳原子数为 2–8 的七种同系物，同时保留原始返回记录，方便核对每个数值的来源。

## 1. 明确化合物范围和所需属性

在 **Resource center → Connectors** 中确认 **Chemistry** 可用。打开项目，新建会话并选择已连接的模型。本例使用 Open-Science 0.30.1 的 Chemistry/PubChem Connector，不需要预先准备输入表格。

明确限定为**中性、直链、饱和一元羧酸**。相近名称可能指向支链异构体、盐或共轭碱，仅凭分子式不能区分所有结构。

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

![实际会话中的化合物范围和输出要求](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. 查看实际数据库调用

发送后，展开工具活动或打开 **Notebook**。本次先使用 `pubchem_search_compounds` 解析七个名称，再通过 `pubchem_get_compounds` 获取记录。接受一行结果前，检查返回的 CID 和结构；若名称对应多个合理候选，应先解决身份歧义。

本例使用明确的酸名称，取首个返回 CID 后再核对整批属性。这适用于本例的明确名称，不能把“总取第一条”当作通用识别规则。

![真实查询活动和 Notebook 中的文件回读](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. 打开已保存的表格

等待回答结束、文件出现在 **Generated** 下，打开 **pubchem-homologs.csv** 并放大预览。本例得到 **7 rows · 8 columns**。

| 化合物 | PubChem CID | 分子式 | 分子量，g/mol |
|---|---:|---|---:|
| 乙酸 | 176 | C2H4O2 | 60.05 |
| 丙酸 | 1032 | C3H6O2 | 74.08 |
| 丁酸 | 264 | C4H8O2 | 88.11 |
| 戊酸 | 7991 | C5H10O2 | 102.13 |
| 己酸 | 8892 | C6H12O2 | 116.16 |
| 庚酸 | 8094 | C7H14O2 | 130.18 |
| 辛酸 | 379 | C8H16O2 | 144.21 |

![回读的七种化合物 CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

按 **CID** 对应记录，不要依赖显示顺序。同时核对分子式和直链 SMILES。本例保留返回字段名 `SMILES` 和 `ConnectivitySMILES`，这组化合物的两列内容恰好相同；不要把其中一列改称其他标识符，也不能由此推断实验测定的立体化学信息。

## 4. 导出时保留来源记录

打开 **pubchem-homologs-source.json**，检查八次操作、精确输入和原始响应。打开 **pubchem-homologs-notes.md** 查看操作与核对说明。本例已将保存的 CSV 与原始返回记录逐行比较，七种化合物的身份、分子式及直链结构一致。

![保存的操作步骤、核对结果与解释范围](/img/open-science/workflow-extensions/pubchem-notes.webp)

使用预览中的 **Download** 按钮保留本地副本，也可以下载本次实操的 <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">来源记录</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">说明</ExampleDownload>。PubChem 记录会更新，应把本次来源快照与分析结果一起保存。

这些属性来自数据库计算或结构标准化，不是新开展的实验测量。分子量不等于精确单同位素质量，此表也不能证明纯度、毒性或生物活性。遇到不同来源的数值不一致，可以继续阅读[科学记录交叉核对](cross-check-records.md)。
