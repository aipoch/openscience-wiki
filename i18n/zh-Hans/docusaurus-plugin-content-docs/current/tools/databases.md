---
title: "科学数据库"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

# 科学数据库

本页介绍支持哪些数据源、可以完成什么任务，以及如何在 Open-Science 中启用和连接。需要带操作截图与结果文件的完整案例时，进入[科研工作流](#database-workflows)。

<span id="数据源目录" />

## 目前支持哪些数据库 {/* #supported-databases */}

Open-Science v0.33.1 内置 **27 个数据源 Connector，提供 269 个操作**。独立的离线 Molecule Connector 另有两个操作，完整注册表共 271 个。下表名称对应 **Settings → Connectors** 中的条目，一个 Connector 可以包含多个数据库。支持某个数据源不表示覆盖其网站的全部功能。

| Connector | 来源 | 操作数 | 用途  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | 小分子、化学标识符、反应及结合数据  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 文献、作者、引用、DOI 更新及数据集/软件记录 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | PubMed 文献检索与记录  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 13 | 基因及蛋白标识映射、UniProt 序列查找、GO 与 Reactome 注释、g:Profiler 基因集富集 |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | 基因组注释、同源及序列信息；NCBI 物种、组装与序列身份；BLAST 提交与报告 |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | 变异频率与变异记录  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | 临床试验登记记录  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | 临床基因组证据资源  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | 结构档案与相关记录  |
| ChEMBL · `chembl` | ChEMBL | 6 | 化合物、靶标和活性记录  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | 预印本元数据  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | 药品监管及药品记录  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | 人类遗传关联资源  |
| Expression · `expression` | GTEx | 12 | 组织和基因表达资源  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | 蛋白结构域与功能注释  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | 癌症研究模型和队列资源  |
| RNA · `rna` | Rfam | 9 | RNA 家族与相关资源  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | 表达、代谢组、宏基因组与蛋白质组归档；ENA 运行发现及 FASTQ/原始提交清单；PRIDE 文件列表 |
| CellGuide · `cellguide` | CELLxGENE | 5 | 细胞类型参考信息  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 调控与功能组学记录  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 研究项目、资助等资源  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 数据集与字段查询  |
| ZINC · `zinc` | ZINC | 5 | ZINC 化合物记录  |
| GDC · `gdc` | NCI GDC | 5 | 癌症项目、病例与文件元数据，公开／受控访问类别及传输清单；不下载或授予受控访问 |
| Zenodo · `zenodo` | Zenodo | 2 | 公开数据集、软件和文献记录的检索、版本级元数据与文件清单；不上传或下载文件 |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | 按程序提交蛋白序列／profile HMM／比对检索，查询状态并获取结果 |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 2 | 查询已有注释任务并获取 TSV 报告；不支持提交任务 |

离线 Molecule 工具见[科学查看器](viewers.md)。各数据源实际提供的操作见 [Connector 操作参数参考](../reference/connector-operations.md)。

<span id="选择查询并检查结果" />

## 可以完成什么任务 {/* #database-capabilities */}

| 科研任务 | 使用的 Connector | 常见输出 |
| --- | --- | --- |
| 查找文献、追踪引用、检查 DOI 关联关系 | Literature Graph、PubMed、bioRxiv | 文献记录、编号、引用关系和全文可用信息 |
| 查找基因或蛋白并比较序列 | Genes & Ontologies、Genomes | 标识符映射、蛋白记录、FASTA 和 BLAST 报告 |
| 发现公开组学数据并检查可用文件 | Omics Archives | 项目/运行元数据，以及带来源地址、大小和可用校验值的文件清单 |
| 解释基因列表或查看相互作用网络 | Genes & Ontologies、Protein Annotation | 富集结果表、本体注释和网络记录 |
| 核查变异、表达与调控证据 | Variants、Clinical Genomics、Human Genetics、Expression、Regulation | 带物种、组织、参考基因组版本和相关证据字段的来源记录 |
| 获取化合物、结构或临床研究记录 | Chemistry、ChEMBL、Structures & Interactions、Clinical Trials | 化学标识及性质、结构档案和试验元数据 |

批量转换标识符时，**Genes & Ontologies** 提供 `submit_uniprot_id_mapping`、`get_uniprot_id_mapping_status` 和 `get_uniprot_id_mapping_results`。保存任务 ID，至少间隔三秒查询一次状态，再取完所有结果页。保留一对多映射和明确返回的 `failed_ids`，某页未出现不等于未匹配。最多可提交 100000 个标识符，结果最长保留约七天。见[映射参数](../reference/connector-operations.md#submit_uniprot_id_mapping)。

**Zenodo** 无需认证即可查询公开记录元数据，应保留版本级记录 ID、访问和许可字段。**GDC** 提供公开元数据，生成清单不等于获得下载授权，受控文件仍需 GDC 权限。[GDC 操作](../reference/connector-operations.md#family-24) · [Zenodo 操作](../reference/connector-operations.md#family-25)。

数据库响应可以支持一个科研步骤，但不会自动下载数据、把所有论文加入文献库或完成整套分析。需要保存哪些记录和文件，应在请求中明确说明。

## 如何连接并开始使用 {/* #connect-database */}

<span id="获取记录并核对身份" />

### 1. 启用内置 Connector

1. 打开 **Settings → Connectors**，搜索上表中的名称，例如 **Omics Archives**。
2. 打开详情并展开 **Tools**，阅读目标操作的输入、结果上限和第三方要求。
3. 启用 **Main** 的访问权限，检查 **Used by**。通过资源的 **Manage access** 调整 Main Agent 和 Specialist 关联。启用 Connector 与每个工具的审批策略是独立设置。

![Omics Archives 工具详情展示 GEO 输入字段和仅返回元数据的范围](/img/open-science/guides-walkthrough/36-omics-tools.webp)

这些 Connector 已内置，无需为它们添加自定义服务器。连接自己运行的外部服务时，参阅[自定义 Connector 设置](../guides/connectors.md)。出现在列表中或已启用，不等于认证通过或查询成功。

<span id="连接-openalex-并追踪引用关系" />

### 2. 按目标操作配置凭据

| 服务或使用条件 | 配置位置 |
| --- | --- |
| OpenAlex | 密钥可选。需要配置时，打开 **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**，验证后保存 |
| 要求联系邮箱的 NCBI 直接变异查询 | **Settings → Connectors → Manage credentials → Literature access**。填写 **Contact email** 并点击 **Save**；NCBI API key 为可选项 |
| 其他需要凭据的操作 | 按工具要求及[凭据指南](../guides/connectors.md)配置，并将凭据绑定到目标服务 |

密钥应填写在凭据表单中，不要放进科研提示词或共享结果文件。按所选操作配置要求；上面的联系邮箱要求不表示所有 NCBI 工具都需要同样的设置。

<span id="查询-doi-及关联研究记录" />

Literature Graph 还提供 `crossref_get_work`、`crossref_get_updates`、`datacite_search_records` 和 `datacite_get_record`，这四个公开方法不需要 OpenAlex key。OpenAlex 引用关系中，`openalex_citations` 查找引用该成果的文献，`openalex_references` 查找该成果引用的文献。具体字段见 [Literature Graph 参数](../reference/connector-operations.md#family-2)。

<span id="从一个已知标识开始" />
<span id="本地实际查询" />

### 3. 用一次小查询确认可用

启用 **Genes & Ontologies**，打开已连接模型的会话，发送：

<p className="example-label"><strong>示例</strong> 核对一个已知的人类基因标识</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

检查实际工具返回。对于人 TP53，核对 `query`、`symbol`、Entrez Gene **7157** 和名称 **tumor protein p53**。有多个匹配时，先保留全部结果，再确认物种与目标记录。一次查询成功只说明该操作可用，不代表所有来源均已连通。[准确字段](../reference/connector-operations.md#query_genes)。

## 进入完整科研工作流 {/* #database-workflows */}

以下文章包含输入材料、操作步骤、真实英文界面截图和可下载的案例结果。

<span id="ena-runs" />
<span id="omics-discovery" />

### 查找公开组学数据

[查找公共组学数据并整理文件清单](../workflows/public-omics-data.md)：从已知运行编号或研究主题出发，检查 ENA 与 PRIDE 记录，保存来源地址和校验值。下载数据是后续独立步骤。

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### 比较蛋白序列

[从基因名称获取蛋白序列并完成 BLAST 比对](../workflows/protein-sequence-search.md)：获取 UniProt FASTA，保存 BLAST 任务编号，再检查完成后的比对、一致率和查询覆盖率。

<span id="gene-set-enrichment" />

### 分析候选基因集

[对候选基因集进行功能富集分析](../workflows/gene-set-enrichment.md)：选择物种、标识符和统计背景，运行 g:Profiler，并结合来源版本解读校正后的概率。

<span id="reference-genome" />

### 核对参考基因组

[分析前核对物种、参考基因组与染色体编号](../workflows/reference-genome-check.md)：关联记录前，先核对物种、带版本的组装和染色体别名。

其他任务可参阅 [PubChem 结构化记录获取](../workflows/database-records.md)、[科学记录交叉核对](../workflows/cross-check-records.md)及[组会文献发现](../workflows/journal-club.md)。

<span id="查询结果与报错怎么处理" />
<span id="空结果部分结果与错误" />

## 使用数据时注意什么 {/* #database-limits */}

- 保存查询条件、来源、物种、组织、单位及登录号版本。数据库记录、预测和模型生成的总结属于不同证据类型。
- 检查返回数量、分页和截断标记，再判断是否完整。零条匹配、部分响应和请求错误需要分别处理。
- 文件清单提供地址与元数据。下载文件、校验内容和分析数据是独立操作。
- 请求需要凭据时，先填写对应表单再重试。触发限流时按服务要求等待，超时时缩小请求范围。具体处理见[故障排查](../guides/troubleshooting.md)。

### 人群频率与相互作用网络 {/* #string-network */}

需要人群细节时，对 `get_variant` 设置 `include_populations: true`，保留数据集与参考组装。外显子组与基因组观察应分开；不可用值为 `null`，不等于零；相互重叠的人群或性别分层不能相加。这些是观察频率，不是过滤等位基因频率。[gnomAD 参数](../reference/connector-operations.md#get_variant)

从 v0.31.0 起，`get_string_network.nodes` 包含返回的邻居及孤立的已映射输入。单个映射输入会请求邻居，多个映射输入不扩展。只需输入节点时筛选 `is_query`，全部输入别名使用 `queries`。`n_nodes` 是网络节点数，`n_mapped` 是输入映射数；复用旧脚本前修正将两者等同的逻辑。[STRING 参数](../reference/connector-operations.md#get_string_network)

<span id="查找操作参数" />

## 查找具体操作参数 {/* #operation-parameters */}

[Connector 操作参数参考](../reference/connector-operations.md)列出必填输入、可选值和准确调用方法。本页用于选择和连接数据源，参数参考用于查询某个具体工具的字段。

目录来源：[catalog.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/catalog.ts)、[registry.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/registry.ts)。

## 序列检索与多序列比对 {/* #sequence-tools */}

**HMMER** 支持按程序选择蛋白序列、profile HMM 或比对输入。将程序与数据库配对，保存任务 ID，等 **SUCCESS** 后获取结果，见 [HMMER 操作](../reference/connector-operations.md#family-26)。

**InterProScan** 获取已通过 EMBL-EBI 服务提交的注释任务。保留任务 ID，至少间隔十秒查询，等 **FINISHED** 后获取 TSV。此 Connector 不能提交新任务，见 [InterProScan 操作](../reference/connector-operations.md#family-27)。

**Genomes → Clustal Omega** 对至少三条名称唯一的蛋白质、DNA 或 RNA FASTA 记录进行比对。配置服务要求的联系邮箱，提交一次并保存任务 ID，再查询状态、保存返回的比对，见[多序列比对工作流](../workflows/multiple-sequence-alignment.md)。
