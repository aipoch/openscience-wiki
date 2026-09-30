---
title: "检查通路及其互作网络"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 检查通路及其互作网络

<p className="example-label"><strong>案例演示</strong> 通过 Pathway Commons 查看 Reactome 人类 p53 信号通路</p>

从整理过的通路记录出发，查看 **TP53**、**MDM2** 和 **CDKN1A** 在网络中的关系，保存来源响应、互作表和研究说明。本流程查询已有通路连接，不做富集检验，也不测量样本中的通路活性。针对基因列表的统计问题，参见[基因集富集](gene-set-enrichment.md)。

## 1. 准备项目 {/* #prepare */}

1. 创建 **Pathway Commons Research** 项目并新建会话。
2. 在 **Settings → Connectors** 中向当前代理开放 **Pathway Commons**。它连接公共服务，本例不需要上传私人研究文件。
3. 选择已配置的主模型。本例使用 **Codex subscription**；若 Codex 显示 **Update required**，先[更新运行时](../guides/frameworks.md#update-codex)，再发送任务。

## 2. 检索并保留返回的准确标识 {/* #search */}

发送：

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

打开会话旁的 **Notebook**，检查查询和返回记录。本例搜索 `p53 signaling`，限定类型 `Pathway`、物种 `9606`、来源 `reactome`，并通过 `top_pathways` 查询 `p53`。搜索报告**总计 1,309 条命中**；第一页不等于全部结果。

![英文研究请求和 Notebook 中真实执行的 Pathway Commons 查询](/img/open-science/v0340/pathway-query.webp)

本例选择 **Transcriptional Regulation by TP53**，准确 URI 为 `http://bioregistry.io/reactome:R-HSA-3700989`，来源为 `pc14:reactome`。保留查询实际返回的 URI，不要根据名称拼接标识。来源更新后，命中顺序和数量可能变化。

## 3. 导出选中的通路 {/* #export */}

要求代理对选中的 URI 导出，并**包含子通路**。本例保存 SIF、TXT 和 JSON-LD 响应。SIF 提供展平的互作记录，TXT 还包含节点，JSON-LD 保留更丰富的模型结构。选择格式或子通路范围时可查阅[操作参考](../reference/connector-operations.md#pathway_commons_export)。

先检查保留的响应，再阅读总结。本例 SIF 有 **3,318 条互作记录**，TXT 有 **387 个节点**。这些数字对应所选通路和导出范围，不代表人类全部 p53 互作。

## 4. 打开并检查结果 {/* #inspect */}

1. 点击回复或生成文件卡片中的 **tp53_mdm2_cdkn1a_readable_interactions.tsv**。列宽不足时打开全屏预览。
2. 将 `source`、`interaction`、`target` 与原始响应对照。九行阅读表是节选，不是完整网络。
3. 打开 **tp53_pathway_research_note.md**，确认保存了通路 URI、来源、日期和解释边界。
4. 下载需要的文件；做汇报时，应把完整网络和原始响应与节选一起保留。

![在应用内打开九条选定互作记录](/img/open-science/v0340/pathway-interactions.webp)

实际返回记录包括 `TP53 controls-expression-of MDM2`、`MDM2 controls-state-change-of TP53` 和 `MDM2 in-complex-with TP53`。CDKN1A 出现在六条记录中，但此 SIF 导出没有直接的 TP53 到 CDKN1A 连边。所选通路展平后缺少某条边，不能作为该生物学关系不存在的证据。

![保留通路标识及解释边界的英文研究说明](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` 本身不区分激活或抑制；`in-complex-with` 不能证明两个分子直接结合。仅凭该网络无法确定组织特异性、突变影响、互作强度、样本活性或因果关系。这些问题还需要查看原始通路反应和实验文献。

## 本例结果文件 {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">原始 Connector 响应，ZIP 压缩包</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">完整导出互作表</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">九行阅读表</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">英文研究说明</ExampleDownload>

若要研究基因邻域或基因集合之间的路径，可使用 **pathway_commons_graph**，明确方向、路径模式和步数限制。它与本例按 URI 导出准确通路是不同查询。来源能力和连接方式见[科学数据库](../tools/databases.md#pathway-expression-clinical)。
