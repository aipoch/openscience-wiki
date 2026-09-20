---
title: "科学数据库"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# 科学数据库

应用内置 **23 个数据源 Connector**，另有离线 Molecule Connector。完整注册表包含 **246 个工具操作**，其中 Molecule 有 2 个，本页数据源覆盖其余 244 个。先启用相关 Connector，再使用正确编号类型进行小范围查询。

<span id="本地实际查询" />

## 数据源目录

根据标识类型与研究问题选择数据源。各来源覆盖范围不同，具体字段见操作参数参考。

| Connector | 来源 | 操作数 | 用途  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | 小分子、化学标识符、反应及结合数据  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 文献、作者、引用、DOI 更新及数据集/软件记录 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | PubMed 文献检索与记录  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 9 | 基因符号与标识符映射  |
| Genomes · `genomes` | Ensembl, UCSC, NCBI | 14 | 基因组注释与序列  |
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
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 19 | GEO 等组学归档和研究记录  |
| CellGuide · `cellguide` | CELLxGENE | 5 | 细胞类型参考信息  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 调控与功能组学记录  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 研究项目、资助等资源  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 数据集与字段查询  |
| ZINC · `zinc` | ZINC | 5 | ZINC 化合物记录  |

## 获取记录并核对身份

1. 打开 **Settings → Connectors**，搜索来源并确认目标 Agent 可使用。
2. 打开详情，阅读 **Tools**、输入、示例与第三方要求。
3. 明确查询词/编号和条数上限，整理文献或证据时保留准确查询。
4. 核对返回 ID 和来源字段。空结果、截断结果和错误不是同一种状态。
5. 按需要明确保存到项目/文献库。查询返回不表示所有论文已入库或全文已下载。

### 从一个已知标识开始

<p className="example-label"><strong>案例演示</strong> 解析人 TP53 基因标识</p>

启用 **Genes & Ontologies**，请求：**使用 query_genes 解析 TP53，scopes="symbol"、species="human"、fields="symbol,name,entrezgene"。返回输入 query 及未匹配记录。** 本例返回的人 TP53 记录对应 Entrez Gene **7157**，名称为 **tumor protein p53**。使用映射 ID 前，核对返回记录的 `query` 与 `symbol`。符号可能多重匹配，应保留全部结果，直到确认物种与目标记录。[准确字段](../reference/connector-operations.md#query_genes)。

## 选择查询并检查结果

<p className="example-label"><strong>示例</strong> 小范围数据库查询与返回值</p>

下表记录这些示例查询的返回，实时检索结果可能不同。

| Connector / 工具 | 输入 | 实际结果 |
| --- | --- | --- |
| Omics Archives / geo_get_series | `accessions: ["GSE60450"]` | 返回系列及 12 个样本元数据，不代表重算上传矩阵 |
| Genes / query_genes | TP53、symbol、human | Entrez Gene ID 7157，TP53，tumor protein p53 |
| PubMed / search_articles | GSE60450，上限 2 | PMID 38059347、37306301；是查询匹配，不自动等于数据集原始论文 |
| Chemistry / pubchem_search_compounds | aspirin，上限 1 CID | CID 2244、C9H8O4、分子量 180.16 |
| Literature / openalex_search_works | `CRISPR base editing`；2020 年起；开放获取；上限 2 | 两条成果记录，包含 OpenAlex ID、来源字段及完整性标记 |

### 连接 OpenAlex 并追踪引用关系

1. 打开 **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**。
2. 输入自己的 API key，点击 **Validate**，验证成功后点击 **Save**。
3. 按主题检索，并设置较小的 `max_records`。检查 `n_records_returned` 和 `records_truncated`，再判断结果是否完整。
4. 将返回的成果 ID 交给 `openalex_get_work` 获取详情。`openalex_citations` 查询引用该成果的文献；`openalex_references` 查询该成果引用的文献，两者方向不同。
5. 按作者检索时，先核对机构和 ORCID，再获取作者档案。查询期刊时可用来源 ID 或 ISSN 区分同名结果。

筛选条件和返回字段见 [OpenAlex 操作参数](../reference/connector-operations.md#openalex_search_works)。
<span id="空结果部分结果与错误" />

### 查询 DOI 及关联研究记录

启用 **Literature Graph**。出版方元数据使用 `crossref_get_work`，登记的更正/撤稿关系使用 `crossref_get_updates`。通过 `datacite_search_records` 查找数据集或软件 DOI，再用 `datacite_get_record` 检查选定条目。这四个公开方法不需要 OpenAlex key。下载或引用前核对 DOI 身份、关系方向和复用条件，准确字段见[操作参数参考](../reference/connector-operations.md#family-2)。

Rfam 序列搜索现在使用官方批量端点。旧安装返回已停用端点错误时，先更新应用，再重试目标操作。尚在等待的作业不等于搜索完成且无命中。

## 查询结果与报错怎么处理

检查数量、分页游标、`truncated`/`may_be_truncated`、未找到的 ID 和逐项错误。返回条数上限不能证明没有更多记录。按资源保留基因组版本、物种、组织、单位及编号版本。

400/422 检查字段、类型和编号体系；401/403 检查服务凭据与范围；429 按服务响应等待并缩小批次。

使用结果前检查返回状态。示例及其有限范围的响应记录保留在[操作参数参考](../reference/connector-operations.md)。

| 实际遇到的结果 | 下一步 |
| --- | --- |
| `found: false`、零条记录、研究者或供应商匹配为空 | 检查标识符、物种、范围和筛选条件，保留空结果，不能写成已取得记录 |
| OpenAlex 的 `credential_required` | 打开请求的凭据表单，绑定自己的密钥后重试 |
| 直接访问 NCBI 的变异查询返回 `contact_email_required` | 前往 **Settings → Connectors → Manage credentials → Literature access**，填写 **Contact email** 并点击 **Save**，再重试失败的查询。NCBI API key 为可选项。核对返回的标识符、匹配数量和截断标记；空结果与连接错误不同 |
| eQTL 返回 HTTP `410` | 保留来源 URL、操作和响应，先检查服务状态，不要为了消除报错修改科学输入 |
| Connector request timed out after `30000ms` | 缩小请求后重试。仅提高外层 Notebook 超时不会改变 Connector 自身的截止时间 |
| Notebook execution timed out after `60000ms` | 本次执行未取得结果。逐项重试，不能据此认定批次内所有上游服务均失效 |
| BioMart 返回 HTML 维护页面；PRIDE 返回 `Unexpected end of JSON input` | 未获得预期结构化响应。稍后重试，并保留响应类型或错误以便反馈 |
| ZINC task did not complete in time | 保留返回的任务与结果 URL，检查原任务；反复新建任务不能恢复它的结果 |

通过[故障排查](../guides/troubleshooting.md)反馈时，提供操作名、限定输入、错误原文和时间；分享前移除凭据与私有数据。


## 查询 ENA 测序运行与 FASTQ 文件 {/* #ena-runs */}

1. 在 **Settings → Connectors** 中启用 **Omics Archives**。向 `ena_search_runs` 提供公开的 ENA/INSDC 登录号，如 PRJ 项目或 SRR 运行。GEO 的 `GSE` 标识需要先找到关联的 INSDC 项目；本工具不接受关键词搜索。
2. 检查 `run_accession`、物种、文库策略与布局，以及 `truncated`。最多返回 1,000 个运行，没有偏移量或续页标记；结果截断时应缩小登录号范围。
3. 将返回的某个运行传给 `ena_get_run_files`，检查 `found`、`fastq_available` 和全部 `fastq_files` 条目。清单提供地址、压缩文件大小和上游 MD5，本身不会下载或校验文件。
4. 单独下载前检查存储空间并保存清单，下载后按列出的校验值核对文件。双端文库未必恰有两个文件，不能把 `file_index` 当作 R1/R2 标记。

以上说明 v0.31.1 的操作契约，不代表已经完成测序文件下载。[具体参数](../reference/connector-operations.md#ena_search_runs)

## 执行并检查基因集富集 {/* #gene-set-enrichment */}

<p className="example-label"><strong>案例演示</strong> 人工选定的人类 DNA 损伤相关基因集</p>

本例在 v0.31.1 使用 11 个公开基因符号演示 g:Profiler。这些基因按已知生物学功能选定，出现富集符合预期；它们不是 GSE60450 项目的差异表达结果，也不能当作无偏发现的证据。

1. 在 **Settings → Connectors** 中确认 **Genes & Ontologies** 对 Agent 可用，打开已连接模型且 Notebook 运行环境可用的会话。
2. 指定物种、基因标识、数据来源和统计背景。真实实验应根据哪些基因有机会被实验筛选来确定背景；本例明确使用全部已注释基因，没有提交自定义的实测基因背景。
3. 发送下方提示词，在同一会话中查询来源版本并执行富集，保存实际结果。

```text
Use Genes & Ontologies through Session Notebook for an English g:Profiler
tutorial. The deliberately selected gene list is TP53, ATM, ATR, CHEK1,
CHEK2, BRCA1, BRCA2, RAD51, CDKN1A, GADD45A, MDM2.
First call list_enrichment_sources with organism hsapiens.
Then call enrich_gene_set with these genes, organism hsapiens,
sources GO:BP and REAC, domain_scope annotated,
correction_method fdr, and user_threshold 0.05.
Save the full response as dna-damage-enrichment.json, all returned terms
as dna-damage-enrichment.csv, and query, source versions, mappings,
background and limitations as dna-damage-enrichment-notes.md.
Retain unmapped, ambiguous and duplicate identifiers. Treat mapped_genes
as the returned mapping object. Report errors instead of inventing results.
This is not differential-expression evidence or evidence of regulation direction.
```

4. 打开生成的说明，核对查询与映射数量。本次 **11/11** 个标识映射成功，未映射、歧义和重复标识均为 **0**。记录的版本为 **GRCh38.p14**、g:Profiler **e114_eg62_p19_27110d83**、GO 类别 **2026-01-23**、Reactome 类别 **2026-03-20**。后续服务更新可能返回不同条目。

![保存的英文查询、背景、来源版本及标识核对](/img/open-science/v0311/enrichment-notes.webp)

5. 打开 CSV 并与完整 JSON 比较。本次按 FDR 0.05 返回 **891 条**。预览只显示前 100 行，这个显示上限不是结果总数。解释条目时保留 `source`、`native`、已校正的 `p_value`、`intersection_size`、`query_size` 和 `effective_domain_size`。

![实际富集结果表及校正概率、背景大小](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">分析说明</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">全部 891 行结果</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">完整响应</ExampleDownload>

本次记录中，两次服务调用都成功了；随后生成说明时，Agent 曾将 `mapped_genes` 当成数组而报错。修正读取方式后，它使用已有响应保存了全部三个文件。上面的下载文件是最终完成的输出，不能据此宣称自动重放或环境捕获也已完整验证。

`background_size: null` 表示没有提交自定义背景列表，不代表统计总体有零个基因；应检查每个条目的有效背景大小。富集不能确定因果、差异表达或上调、下调方向。[操作参数](../reference/connector-operations.md#enrich_gene_set)

## 核对参考基因组身份 {/* #reference-genome */}

通过 **Genomes** 分三步查询：用 `ncbi_resolve_taxon` 核对物种，用 `ncbi_get_assembly_info` 核对**带版本号**的 GCF/GCA 组装，再用 `ncbi_get_sequence_aliases` 查找 `chr1` 等序列别名。保留歧义匹配和截断标记；这些是查询说明，不是已完成的跨来源分析。

例如参考调用使用 `GCF_000001405.40`，不能只用一个组装名称替代其版本身份。响应中出现当前登录号，不代表可以默默替换请求的历史版本。序列别名描述同一组装内的命名关系；转换染色体标签不等于跨组装的坐标转换。[准确输入](../reference/connector-operations.md#ncbi_get_assembly_info)

## 读取 gnomAD 人群与 STRING 网络 {/* #string-network */}

需要人群细节时，对 `get_variant` 设置 `include_populations: true`，保留数据集与参考组装。外显子组与基因组观察应分开；不可用值为 `null`，不等于零；相互重叠的人群或性别分层不能相加。这些是观察频率，不是过滤等位基因频率。[gnomAD 参数](../reference/connector-operations.md#get_variant)

从 v0.31.0 起，`get_string_network.nodes` 包含返回的邻居及孤立的已映射输入。单个映射输入会请求邻居，多个映射输入不扩展。只需输入节点时筛选 `is_query`，全部输入别名使用 `queries`。`n_nodes` 是网络节点数，`n_mapped` 是输入映射数；复用旧脚本前修正将两者等同的逻辑。[STRING 参数](../reference/connector-operations.md#get_string_network)

## 查找操作参数

需要必填字段、可接受的值与调用示例时，查阅 [Connector 操作参数参考](../reference/connector-operations.md)。先在本页选择来源，再按具体操作查参数。

实现依据: [ConnectorsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx)。

目录来源: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).
