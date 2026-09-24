---
title: "Connector 操作参数参考"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connector 操作参数参考

查询具体操作名、必填字段、默认值与调用示例。选择数据源请先看[科学数据库目录](../tools/databases.md)，再展开需要调用的 Connector。参数正确不代表服务已连接或凭据已配置。

## 示例调用在哪里运行

`host` 由 Open-Science 的 Agent 执行环境提供。下方 JavaScript 是 **Agent 侧调用片段**，不是独立 Node.js 程序，也不是公共 Task SDK 客户端的方法。让 Agent 加载对应 Connector 说明并使用相应操作；某些框架会使用 Python 桥接，而不是这里的 JavaScript 形式。

先在 [Settings → Connectors](../guides/connectors.md) 启用连接，配置[所需凭据](../tools/credentials.md)；使用 Specialist 时还需分配该能力。调用仍遵循会话权限策略。公共 Node.js 集成可用 [Task SDK](api.md) 管理 Connector 配置，但导入该客户端不会得到这里的 `host`。

### 先读返回结果，再串联调用

<p className="example-label"><strong>示例</strong> 使用 PubMed 返回的 PMID 查询元数据</p>

例如请求：**用 PubMed 搜索 PRISMA 报告规范，返回匹配总数及五个 PMID。** `search_articles` 返回总数和一页标识，再将其中的 PMID 传给 `get_article_metadata` 获取标题、作者和 DOI 链接。空结果、截断结果与认证失败需要分别处理。

| 返回信息 | 用途 |
| --- | --- |
| 匹配总数与返回行数 | 区分一页数据与完整结果集 |
| `truncated`、`records_truncated` 或各数据源的完整性标志 | 判断是否翻页、缩小条件或继续获取 |
| `not_found`、`missing`、`not_processed` | 找出未解决输入，只重试适当条目 |
| DOI、登录号、来源 URL、数据发布或组装 | 保留下次查询需要的身份与来源 |
| 全文状态或许可说明 | 判断是否取得文本、是否允许复用 |

各操作返回字段不同，下方描述与可下载 schema 定义对应契约；此表不是统一 JSON 格式。可从右侧数据源目录跳转，再展开该类参数。搜索具体操作名也会展开其所在分组。

**区分查询失败与空结果。**v0.30.2 中，CellGuide 的标记、来源和组织查询会报告获取失败，不再把它当作空证据；可选数据文件确实不存在时仍可能为空。OLS 关系查询会拒绝分页不完整或无效响应。服务错误不能证明某细胞类型没有标记，或某本体术语没有关联项。

## 操作输入

每次展开一个 Connector。必填项标为 **必填**，本页与下载目录依据 Open-Science **v0.33.1** 的结构定义。以嵌套的 `input.required` 为准；旧式顶层 `required` 可能不存在。<ExampleDownload path="/examples/capabilities/connector-catalog-v0.33.1.json">完整注册表下载</ExampleDownload>提供嵌套 JSON、完整返回说明和准确 Agent 侧调用示例。工具要求 `accessions`、`cids`、`rs_id` 等专用字段时，不要统一改为 `id`。


## 化学 {/* #family-1 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `pubchem_search_compounds`

将化合物名称、SMILES、InChIKey 或 CID 解析为 PubChem CID，可同时返回前几项结果的核心计算属性。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `namespace` | 字符串 | 可选; 默认值： &quot;name&quot;; 枚举： [&quot;name&quot;, &quot;smiles&quot;, &quot;inchikey&quot;, &quot;cid&quot;] |
| `max_cids` | 整数 | 可选; 默认值： 25; 最小值： 1; 最大值： 100 |
| `with_properties` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds`

批量获取 PubChem CID 对应的完整计算属性，可附带有数量上限的同义词列表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cids` | 整数数组 | **必填**; 最少项数： 1; 最多项数： 50 |
| `include_synonyms` | 布尔值 | 可选; 默认值： false |
| `max_synonyms` | 整数 | 可选; 默认值： 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search`

根据 SMILES 在 PubChem 中进行二维 Tanimoto 相似性检索。使用同步 fastsimilarity_2d 接口，无需轮询任务。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `smiles` | 字符串 | **必填** |
| `threshold` | 整数 | 可选; 默认值： 90; 最小值： 1; 最大值： 100 |
| `max_records` | 整数 | 可选; 默认值： 50; 最小值： 1; 最大值： 200 |
| `with_properties` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary`

获取一个 PubChem 化合物的生物测定活动汇总，包括测定项目、靶标、结果与效力。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cid` | 整数 | **必填** |
| `active_only` | 布尔值 | 可选; 默认值： false |
| `max_rows` | 整数 | 可选; 默认值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety`

获取一个 PubChem 化合物的 GHS 安全分类，汇总 PUG-View 中各报告来源的信息。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cid` | 整数 | **必填** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search`

按名称、同义词、分子式或 InChIKey 全文检索 ChEBI 实体。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `term` | 字符串 | **必填** |
| `max_results` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 100 |
| `page` | 整数 | 可选; 默认值： 1; 最小值： 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity`

获取 ChEBI 实体的名称、结构、化学数据、角色和交叉引用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chebi_id` | 字符串 | **必填** |
| `max_synonyms` | 整数 | 可选; 默认值： 30 |
| `max_xrefs` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology`

获取 ChEBI 实体的本体关系，包括指向父类、角色或共轭酸等关系，以及指向该实体的子类与衍生物关系。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chebi_id` | 字符串 | **必填** |
| `relation_type` | 字符串 | 可选 |
| `max_relations` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions`

按反应方程文本、参与物 ChEBI ID 或 EC 编号检索 Rhea 主反应，自动识别查询类型。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `limit` | 整数 | 可选; 默认值： 50; 最小值： 1; 最大值： 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction`

获取一个 Rhea 反应的方程、带化学计量的参与物、EC 关联、方向家族及文献。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `rhea_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target`

按 UniProt 登录号获取 BindingDB 中针对该蛋白靶标测得的配体亲和力，包括 Ki、Kd、IC50 和 EC50。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `uniprot` | 字符串 | **必填** |
| `affinity_cutoff_nm` | 数值 | 可选; 默认值： 10000 |
| `max_rows` | 整数 | 可选; 默认值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound`

查找与输入 SMILES 在二维结构上相似的化合物，以及这些化合物具有实测亲和力的蛋白靶标。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `smiles` | 字符串 | **必填** |
| `similarity` | 数值 | 可选; 默认值： 0.85; 最小值： 0.5; 最大值： 1 |
| `max_rows` | 整数 | 可选; 默认值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## 文献关系 {/* #family-2 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `openalex_search_works`

检索 OpenAlex 学术成果，可按年份、类型、开放获取状态和发表来源筛选。query 可在已有其他筛选条件时省略；venue 接受来源 ID、URL、ISSN 或名称，名称解析结果见 venue_resolved。返回 api_total、n_records_returned、records_truncated 和 records。摘要仅在明确开放许可（cc-by、cc-by-sa、cc0、public-domain）下重建；其他记录的 abstract 为 null，并说明许可策略。记录包含标识、作者、来源、引用数、开放全文地址与主题。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |
| `year_from` | 整数 | 可选 |
| `year_to` | 整数 | 可选 |
| `work_type` | 字符串 | 可选 |
| `open_access_only` | 布尔值 | 可选 |
| `venue` | 字符串 | 可选 |
| `sort` | 字符串 | 可选; 默认值： &quot;relevance&quot;; 枚举： [&quot;relevance&quot;, &quot;cited_by_count&quot;, &quot;publication_date&quot;] |
| `max_records` | 整数 | 可选; 默认值： 50 |
| `include_abstracts` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work`

获取一个 OpenAlex 成果的完整元数据、按许可提供的摘要、开放获取位置、参考文献 ID 和逐年统计。work_id 支持 W-ID、URL 或 DOI。多个记录声明同一 DOI 时选择被引最多者，并返回 doi_claimants 和 doi_resolution_note；未知标识报未找到。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `work_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations`

获取引用某篇成果的入向文献。work_id 支持 W-ID、URL 或 DOI；DOI 需要额外解析。返回实际引用总数 api_total、返回数量、截断标志和精简成果记录。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `work_id` | 字符串 | **必填** |
| `sort` | 字符串 | 可选; 默认值： &quot;cited_by_count&quot;; 枚举： [&quot;cited_by_count&quot;, &quot;publication_date&quot;, &quot;relevance&quot;] |
| `max_records` | 整数 | 可选; 默认值： 50 |
| `include_abstracts` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references`

获取某篇成果引用的出向文献，并按原参考文献顺序补齐元数据。返回完整 reference_ids、已补齐 records 和 references_not_hydrated；无法补齐的 ID 不会被静默丢弃。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `work_id` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors`

按姓名检索 OpenAlex 作者，返回作者 ID、ORCID、所属机构、主题和被引指标。同名结果需要结合机构、主题和 ORCID 区分，再用 author_id 获取详情。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author`

获取 OpenAlex 作者详情、逐年统计和高被引成果。author_id 支持 A-ID、URL 或 ORCID；ORCID 可能指向稀疏重复档案，优先使用作者搜索返回的 A-ID。works_sample 为 0 时不额外检索成果。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `author_id` | 字符串 | **必填** |
| `works_sample` | 整数 | 可选; 默认值： 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info`

查询 OpenAlex 期刊或资料库的开放获取、DOAJ、APC 与引用指标。精确 S-ID、URL 或 ISSN 返回一个来源及逐年统计；名称查询返回带总数和截断标志的来源列表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `venue` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search`

通过 arXiv Atom API 检索预印本。query 支持 ti:、au:、abs:、布尔操作；分类和提交日期范围与查询组合。start 从 0 开始，日期包含边界。返回实际查询、总数、页偏移、截断标志及带版本、作者、摘要和链接的记录。分页请求需遵守服务节奏；错误订阅源会作为错误报告。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |
| `category` | 字符串 | 可选 |
| `date_from` | 字符串 | 可选 |
| `date_to` | 字符串 | 可选 |
| `start` | 整数 | 可选; 默认值： 0 |
| `max_results` | 整数 | 可选; 默认值： 25 |
| `sort_by` | 字符串 | 可选; 默认值： &quot;relevance&quot;; 枚举： [&quot;relevance&quot;, &quot;submittedDate&quot;, &quot;lastUpdatedDate&quot;] |
| `sort_order` | 字符串 | 可选; 默认值： &quot;descending&quot;; 枚举： [&quot;descending&quot;, &quot;ascending&quot;] |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers`

批量获取最多 100 篇 arXiv 预印本元数据。接受新旧 ID、带版本 ID、arXiv 前缀及 abs/pdf URL；无版本 ID 解析到最新版。结果按请求顺序排列，并列出 duplicates、not_found。撤稿仍可能返回元数据，应查看 comment。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `arxiv_ids` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work`

查询 Crossref DOI 的出版方登记元数据，可输入裸 DOI、doi: 前缀或 doi.org 地址，无需 API key。DOI 属于其他注册机构时应改用相应服务；Crossref 返回 404 不代表 DOI 无效。核对返回的 DOI、标题和 source_url。

| 字段 | 类型 | 要求与限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates`

读取登记的更正、撤稿及其他更新关系。updated_by 指向更新本文的通知，update_to 指向当前 DOI 所更新的作品。保留关系方向和来源标签；空列表不能证明论文可靠，也不能证明从未撤稿。

| 字段 | 类型 | 要求与限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records`

搜索公开的 DataCite 数据集/软件 DOI 元数据。query、related_doi 至少提供一项，可同时提供；query 使用 DataCite 查询语法。按 next_page 翻页时保持筛选和 page_size 一致。页码检索最多覆盖前 10,000 条，需要时缩小查询。核对 related_identifiers、rights 和落地页，元数据不保证文件可下载或允许复用。

| 字段 | 类型 | 要求与限制 |
| --- | --- | --- |
| `query` | string | 可选; minLength: 1; maxLength: 2000 |
| `related_doi` | string | 可选; minLength: 1; maxLength: 2048 |
| `resource_type` | string | 可选; default: &quot;dataset&quot;; enum: [&quot;dataset&quot;, &quot;software&quot;] |
| `page_size` | integer | 可选; default: 20; minimum: 1; maximum: 100 |
| `page` | integer | 可选; default: 1; minimum: 1; maximum: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record`

查询一条公开 DataCite DOI 记录，包括标题、作者、资源类型、权利信息、关联标识符及可用版本。接受裸 DOI、doi: 前缀或 doi.org 地址。使用关联数据集或软件前，核对标识符和关系方向。

| 字段 | 类型 | 要求与限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search_articles`

通过 NCBI esearch 检索 PubMed 生物医学与生命科学文献，返回匹配总数和一页 PMID。支持字段标签、布尔操作、日期和排序；不应将其当作覆盖所有学科的通用文献库。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `max_results` | 整数 | 可选; 默认值： 20 |
| `retstart` | 整数 | 可选; 默认值： 0 |
| `sort` | 字符串 | 可选; 枚举： [&quot;relevance&quot;, &quot;pub_date&quot;, &quot;author&quot;, &quot;journal_name&quot;, &quot;title&quot;] |
| `date_from` | 字符串 | 可选 |
| `date_to` | 字符串 | 可选 |
| `datetype` | 字符串 | 可选; 默认值： &quot;pdat&quot;; 枚举： [&quot;pdat&quot;, &quot;edat&quot;, &quot;mdat&quot;] |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata`

按 PMID 批量获取 PubMed 详细元数据，包括 DOI/PMCID、标题、摘要、期刊、作者与机构、日期、MeSH、类型、语言和引文。使用结果时注明 PubMed 来源，并链接返回的 DOI。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pmids` | ['字符串', '数组'] | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles`

通过 NCBI elink 获取 PMID 的相关内容。默认 pubmed_pubmed 是按标题、摘要和 MeSH 相似度排序的相似文献，并非引用关系；其他模式可取得 PMC 全文或基因、蛋白、核酸记录链接。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pmids` | ['字符串', '数组'] | **必填** |
| `link_type` | 字符串 | 可选; 默认值： &quot;pubmed_pubmed&quot;; 枚举： [&quot;pubmed_pubmed&quot;, &quot;pubmed_pmc&quot;, &quot;pubmed_nucleotide&quot;, &quot;pubmed_protein&quot;, &quot;pubmed_gene&quot;] |
| `max_results` | 整数 | 可选 |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation`

通过 NCBI ecitmatch 将书目引文解析为 PMID。每条提供期刊、年份、卷、首页、作者或 key 等字段，至少两到三个有效字段有助于可靠匹配。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `citations` | 对象数组 | **必填** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids`

通过 NCBI/PMC ID Converter 在 PMID、PMCID 与 DOI 之间转换。同次调用中的 ID 类型应一致，并与 id_type 匹配；可先确认是否存在 PMCID，再请求全文。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `ids` | ['字符串', '数组'] | **必填** |
| `id_type` | 字符串 | 可选; 默认值： &quot;pmid&quot;; 枚举： [&quot;pmid&quot;, &quot;pmcid&quot;, &quot;doi&quot;] |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article`

通过 Europe PMC 获取 PMC 开放获取子集文章的结构化全文和许可。接受带或不带 PMC 前缀的 ID；不可获取时查看 fulltext_status。使用结果时注明来源并链接 DOI。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pmc_ids` | ['字符串', '数组'] | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status`

结合 PubMed 版权字段、PMC ID 转换和权限元数据，查询每个 PMID 的版权声明、许可类型、许可 URL 与年份，供内容复用前核对。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pmids` | ['字符串', '数组'] | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## 基因与本体 {/* #family-4 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `query_genes`

通过 mygene.info 批量映射基因符号或标识，每次最多 1000 项。scopes 指定输入命名空间，fields 指定返回字段，species 指定物种；单个 term 不支持逗号。返回 not_found 与 records；多重匹配保留 query，并按输入顺序及 _id 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `terms` | 字符串数组 | **必填** |
| `scopes` | 字符串 | 可选 |
| `fields` | 字符串 | 可选; 默认值： &quot;symbol,name,taxid,entrezgene,ensembl.gene&quot; |
| `species` | 字符串 | 可选 |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies`

列出 OLS4 本体。给出 ontology_ids 时获取对应元数据并列出 not_found；省略时完整分页获取目录，并核对总数。返回版本、状态、词条数等信息。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `ontology_ids` | 字符串数组 | 可选 |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms`

按标签、同义词或标识搜索 OLS4 词条，可限制本体、精确匹配或是否包含废弃词条。返回总数、返回数、截断状态以及 CURIE、IRI、标签和说明。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `ontologies` | 字符串数组 | 可选 |
| `exact` | 布尔值 | 可选; 默认值： false |
| `include_obsolete` | 布尔值 | 可选; 默认值： false |
| `max_results` | 整数 | 可选; 默认值： 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term`

获取本体词条详情或完整关联词条集合。relation 为空时返回标签、同义词、废弃状态和直接父类；指定 parents、children、ancestors、descendants 等关系时完整分页，并核对服务总数。ontology 使用小写 ID，term_id 支持 CURIE 或 IRI。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `ontology` | 字符串 | **必填** |
| `term_id` | 字符串 | **必填** |
| `relation` | 字符串 | 可选; 枚举： [&quot;parents&quot;, &quot;children&quot;, &quot;ancestors&quot;, &quot;descendants&quot;, &quot;hierarchicalParents&quot;, &quot;hierarchicalChildren&quot;, &quot;hierarchicalAncestors&quot;, &quot;hierarchicalDescendants&quot;] |
| `include_parents` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations`

从 QuickGO 获取 UniProt 基因产物的 GO 注释，并核对完整集合。可按功能类别、物种和证据筛选。证据须用预设或 ECO 编码，不能把 IDA/IEA 等三字母代码当作 ECO 参数。max_records 仅限制返回行；complete、truncated 和 total_annotations 说明覆盖范围。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `uniprot_accession` | 字符串 | **必填** |
| `aspect` | 字符串 | 可选; 枚举： [&quot;biological_process&quot;, &quot;molecular_function&quot;, &quot;cellular_component&quot;] |
| `evidence` | 字符串 | 可选 |
| `taxon_id` | 整数 | 可选 |
| `include_term_names` | 布尔值 | 可选; 默认值： false |
| `max_records` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `search_uniprot_entries`

按精确基因名（含同义名）、蛋白名称短语和／或精确 NCBI 物种 ID 检索活跃 UniProtKB 条目，组合条件按 AND 匹配。至少提供一个检索条件。reviewed 为 true 时只查 Swiss-Prot；不指定则包含已审阅与未审阅条目。返回一个按登录号排序的页面，不返回序列。继续分页时，传回 next_cursor，并保持筛选条件与 page_size 不变；游标不代表持久快照。按返回的 accession 调用 get_uniprot_entries 获取序列。

至少提供一个列出的检索条件；完整组合约束见下载的 schema。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `gene` | string | 可选; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `protein_name` | string | 可选; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `organism_id` | integer | 可选; minimum: `1`; maximum: `2147483647` |
| `reviewed` | boolean | 可选 |
| `page_size` | integer | 可选; default: `25`; minimum: `1`; maximum: `500` |
| `cursor` | string | 可选; minLength: `1`; maxLength: `4096`; pattern: `"^[^\\s\\u0000-\\u001f\\u007f]+$"` |

```javascript
const result = await host.mcp("genes", "search_uniprot_entries", {"gene": "TP53", "organism_id": 9606, "reviewed": true, "page_size": 25})
```

### `get_uniprot_entries`

按 UniProt 登录号批量获取条目或序列，支持 JSON、FASTA 和 TXT。次级登录号会映射到当前主条目；检查输入映射及未找到项，不要将当前主登录号误当作另一个输入。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |
| `format` | 字符串 | 可选; 枚举: [&quot;fasta&quot;, &quot;txt&quot;] |
| `fields` | 字符串数组 | 可选 |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `submit_uniprot_id_mapping`

向 UniProt 提交最多 100000 个标识符的批量映射。from_db 与 to_db 必须是 UniProt API 支持的准确数据库名称，支持组合见其 configure/idmapping/fields。仅 from_db=Gene_Name 可指定 taxon_id，用于限定物种。每个 ID 独立成项，不含空白或分隔符；保留大小写和版本，精确重复项只提交一次。保存返回的 job_id，再查询状态和分页结果。此操作不自动重试或轮询；若提交响应丢失，远端任务可能已存在，不要盲目重提。结果最长保留约 7 天；关闭应用或取消本地请求不会取消远端任务。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `from_db` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z][A-Za-z0-9_-]*$&quot; |
| `to_db` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z][A-Za-z0-9_-]*$&quot; |
| `ids` | array of string | **必填**; minItems: 1; maxItems: 100000 |
| `taxon_id` | integer | 可选; minimum: 1; maximum: 2147483647 |

```javascript
const result = await host.mcp("genes", "submit_uniprot_id_mapping", {"from_db":"Gene_Name","to_db":"UniProtKB","ids":["TP53","BRCA1"],"taxon_id":9606})
```

### `get_uniprot_id_mapping_status`

查询一次已有 UniProt 映射任务。NEW／RUNNING 时至少间隔 3 秒再查询；FINISHED 后分页获取全部结果。上游 ERROR 规范化为 FAILED，表示任务失败，不等于标识符未匹配。保留 messages 中的错误，未知或过期任务的 HTTP 错误会向上传递。此操作不创建任务，也不自动轮询。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z0-9_-]+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_status", {"job_id":"ecuuh9h0Md"})
```

### `get_uniprot_id_mapping_results`

获取已完成 UniProt 映射任务的一页 from/to 对。保持 job_id 和 page_size 不变，使用 next_cursor 继续，直到 has_more=false。一对多映射必须保留；同一输入的结果可能跨页，汇总全部页面后再判断。收集各页明确返回的 failed_ids，不要因某页没有输入项就推断其未匹配。total_results 是映射行数，不是成功输入 ID 数；one_to_many_in_page 仅反映当前页。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^[A-Za-z0-9_-]+$&quot; |
| `page_size` | integer | 可选; default: 100; minimum: 1; maximum: 500 |
| `cursor` | string | 可选; minLength: 1; maxLength: 4096; pattern: &quot;^[^\\s\\u0000-\\u001f\\u007f]+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_results", {"job_id":"ecuuh9h0Md","page_size":100})
```

### `map_reactome_pathways`

将基因符号或 UniProt 登录号映射到 Reactome 通路。id_type 与输入类型匹配，标识不得重复。compact 返回每项低层通路及 Reactome 发布信息；完整模式增加实体、反应统计和 identifiers_not_found。物种及分子资源视图应与研究输入一致。 按请求的物种映射通路，不会把标识投影到人类。使用受支持的学名，例如 `Homo sapiens` 或 `Mus musculus`；完整名单见下载的结构定义。空值、不支持的物种或返回物种不匹配均会报错。`found` 和 `n_found` 表示标识被识别，不保证该物种中存在通路；识别成功也可能返回零条通路。compact 模式只返回低层通路。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `identifiers` | 字符串数组 | **必填** |
| `id_type` | 字符串 | **必填**; 枚举： [&quot;symbol&quot;, &quot;uniprot&quot;] |
| `species` | 字符串 | 可选; 默认值： &quot;Homo sapiens&quot; |
| `resource` | 字符串 | 可选; 默认值： &quot;TOTAL&quot; |
| `include_disease` | 布尔值 | 可选; 默认值： true |
| `compact` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources`

查询指定物种可用的 g:Profiler 富集数据源及当前版本。物种使用明确代码，如 hsapiens；此操作不提交基因列表。g:Profiler 为服务运行保留有限查询元数据。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `organism` | string | **必填**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set`

对指定物种的基因集执行 g:Profiler 富集，支持 GO、Reactome 等可用来源、统计背景、欠代表检验和多重检验校正。结果保留未映射、歧义及重复标识，不能将它们静默丢弃。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `genes` | 字符串数组 | **必填**; 最少项数: 1; 最多项数: 5000 |
| `organism` | string | **必填**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |
| `sources` | 字符串数组 | 可选; 最多项数: 100 |
| `background_genes` | 字符串数组 | 可选; 最少项数: 1; 最多项数: 20000 |
| `domain_scope` | 字符串 | 可选; 枚举: [&quot;annotated&quot;, &quot;known&quot;, &quot;custom&quot;, &quot;custom_annotated&quot;] |
| `correction_method` | 字符串 | 可选; 默认值: &quot;g_SCS&quot;; 枚举: [&quot;g_SCS&quot;, &quot;bonferroni&quot;, &quot;fdr&quot;] |
| `user_threshold` | 数值 | 可选; 最大值: 1; 排除最小值: 0 |
| `all_results` | 布尔值 | 可选; 默认值: false |
| `ordered` | 布尔值 | 可选; 默认值: false |
| `measure_underrepresentation` | 布尔值 | 可选; 默认值: false |
| `no_iea` | 布尔值 | 可选; 默认值: false |
| `no_evidences` | 布尔值 | 可选; 默认值: false |
| `numeric_ns` | 字符串 | 可选; 最短长度: 1; 最长长度: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## 基因组 {/* #family-5 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `blast_submit`

向公共 NCBI BLAST 服务提交一条核酸或蛋白序列。必须明确 molecule_type；序列会发送给 NCBI。保存返回的 RID，至少等候 60 秒再查询状态；同一 RID 的请求至少间隔 60 秒，所有 BLAST 请求至少间隔 10 秒。提交回执丢失时会报告 blast_submission_unknown，不要自动重复提交。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `sequence` | string | **必填**; minLength: `1`; maxLength: `100000` |
| `molecule_type` | string | **必填**; enum: `["nucleotide", "protein"]` |
| `database` | string | 可选; enum: `["nt", "core_nt", "refseq_rna", "nr", "refseq_protein", "swissprot"]` |
| `evalue` | number | 可选; exclusiveMinimum: `0`; maximum: `1000` |
| `hitlist_size` | integer | 可选; minimum: `1`; maximum: `100` |
| `megablast` | boolean | 可选 |

```javascript
const result = await host.mcp("genomes", "blast_submit", {"sequence": "ATGCGTACGTAGCTAG", "molecule_type": "nucleotide", "database": "nt"})
```

### `blast_status`

查询 NCBI BLAST RID 的状态，保留 READY、WAITING、FAILED 或 UNKNOWN 状态及服务返回的重试间隔。READY 后再取结果；同一 RID 的请求至少间隔 60 秒，不要把 WAITING 当作提交失败后重新提交。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `rid` | string | **必填**; minLength: `1`; maxLength: `128` |

```javascript
const result = await host.mcp("genomes", "blast_status", {"rid": "AYEFB4DT014"})
```

### `blast_results`

获取 BLAST RID 的有界报告，支持 json2、xml2、text 或 tabular，最多 2 MiB。等待 blast_status 返回 READY，并距同一 RID 上次请求至少 60 秒后再调用。仍在计算时返回 ready=false。tabular 是 NCBI 的文本表格报告，可能含 HTML 注释、PRE 标签及报告头，不是纯 TSV／CSV；保留原始响应后再解析。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `rid` | string | **必填**; minLength: `1`; maxLength: `128` |
| `format` | string | 可选; enum: `["json2", "xml2", "text", "tabular"]` |

```javascript
const result = await host.mcp("genomes", "blast_results", {"rid": "AYEFB4DT014", "format": "json2"})
```

### `ensembl_lookup`

按稳定标识或基因符号查询 Ensembl。query_type 可为 auto、id 或 symbol；auto 先查标识，仅在明确未找到且不是规范 ENS/LRG 标识时回退到符号。支持带版本 ENS、FlyBase、WormBase 和酵母标识。species 仅用于符号查询，默认 homo_sapiens，不会从符号推断；expand 可展开转录本、外显子和翻译。无效请求与服务失败会报错。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `query_type` | 字符串 | 可选; 默认值: &quot;auto&quot;; 枚举: [&quot;auto&quot;, &quot;id&quot;, &quot;symbol&quot;] |
| `species` | 字符串 | 可选; 默认值: &quot;homo_sapiens&quot; |
| `expand` | 布尔值 | 可选; 默认值: false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs`

获取 Ensembl 稳定 ID 到 HGNC、EntrezGene、UniProt、OMIM、RefSeq 等数据库的完整交叉引用。external_db 是精确数据库名筛选；结果按 dbname、primary_id 排序，未知 ID 返回 n_xrefs 为 0。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `stable_id` | 字符串 | **必填** |
| `external_db` | 字符串 | 可选 |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant`

提供 `variant_id` 时优先按 ID 查询，忽略 `region`、`allele` 和 `allele_orientation`，也不会用 `allele` 筛选 ID 结果。区域查询使用该物种当前组装，人类为 GRCh38；坐标从 1 开始且两端包含，插入时 `start = end + 1`。`allele_orientation` 默认为 `forward`，即使区域后缀为 `:-1`，等位基因也按参考正链解释；设为 `region` 时，负链区域中的序列等位基因会先反向互补。负链区域的符号等位基因必须使用 `forward`。区域请求统一按正链发送，`normalization` 保留原输入与规范化结果；不转换参考组装，也不反转坐标。基因位于负链不意味着必须提供负链输入。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `variant_id` | 字符串 | 可选 |
| `region` | 字符串 | 可选 |
| `allele` | 字符串 | 可选 |
| `allele_orientation` | 字符串 | 可选; 默认值：`forward`; 枚举：`forward`、`region` |
| `species` | 字符串 | 可选; 默认值： &quot;homo_sapiens&quot; |
| `max_consequences` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology`

从 Ensembl Compara 查询直系同源、旁系同源或投影关系。gene_symbol 与 gene_id 二选一；符号先解析到稳定 ID。target_species 与 target_taxon 同时给出时为 OR 关系。返回精简记录、完整 n_total 和截断标志，不返回比对或序列。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | 可选 |
| `gene_id` | 字符串 | 可选 |
| `homology_type` | 字符串 | 可选; 默认值： &quot;orthologues&quot;; 枚举： [&quot;orthologues&quot;, &quot;paralogues&quot;, &quot;projections&quot;] |
| `target_species` | 字符串 | 可选 |
| `target_taxon` | 整数 | 可选 |
| `species` | 字符串 | 可选; 默认值： &quot;homo_sapiens&quot; |
| `max_homologies` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence`

获取 Ensembl 标识对应的序列，保留请求类型和身份。CDS 或蛋白序列不支持的标识、无效请求和服务失败会报告错误，不能一概当作空序列或未找到。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `stable_id` | 字符串 | 可选 |
| `region` | 字符串 | 可选 |
| `species` | 字符串 | 可选; 默认值: &quot;homo_sapiens&quot; |
| `seq_type` | 字符串 | 可选; 默认值: &quot;genomic&quot;; 枚举: [&quot;genomic&quot;, &quot;cdna&quot;, &quot;cds&quot;, &quot;protein&quot;] |
| `max_bytes` | 整数 | 可选; 默认值: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region`

列出与 Ensembl 区域重叠的基因、转录本、调控元件、重复或变异等特征。区域是从 1 开始的闭区间，超过 5 Mb 需拆分。返回完整 n_total、按起点和 ID 排序的特征及 features_truncated；空区域返回 0 项。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `region` | 字符串 | **必填** |
| `feature` | 字符串 | 可选; 默认值： &quot;gene&quot;; 枚举： [&quot;gene&quot;, &quot;transcript&quot;, &quot;exon&quot;, &quot;cds&quot;, &quot;regulatory&quot;, &quot;motif&quot;, &quot;repeat&quot;, &quot;variation&quot;, &quot;structural_variation&quot;, &quot;band&quot;, &quot;simple&quot;, &quot;misc&quot;] |
| `species` | 字符串 | 可选; 默认值： &quot;homo_sapiens&quot; |
| `max_features` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon`

将物种名称、常用名或数字 TaxID 解析为 NCBI Taxonomy 标识；保留多个匹配及截断状态，不能自动将第一项当作唯一物种。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填**; 最短长度: 1; 最长长度: 200 |
| `max_matches` | 整数 | 可选; 默认值: 20; 最小值: 1; 最大值: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info`

核对带版本号的 GCF/GCA 组装身份，包括物种、组装名、UCSC 别名、状态与配对的 RefSeq/GenBank 登录号。拒绝无版本登录号；历史版本不会被默默替换成最新版。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `assembly_accession` | string | **必填**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases`

查询指定版本组装的 UCSC、RefSeq 和 GenBank 序列别名，可限定一个序列名。共享染色体标签可能对应多条序列，应保留歧义；max_sequences 限制返回前缀，需检查 matches_truncated。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `assembly_accession` | string | **必填**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |
| `sequence` | 字符串 | 可选; 最短长度: 1; 最长长度: 200 |
| `max_sequences` | 整数 | 可选; 默认值: 200; 最小值: 1; 最大值: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks`

列出 UCSC 指定组装的可查询叶级轨道，可按名称或标签进行不区分大小写的筛选。返回轨道名称、类型、所属组、完整匹配数及截断状态。首次访问某组装会加载并缓存完整目录，建议先用 filter_text 缩小结果。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `genome` | 字符串 | 可选; 默认值： &quot;hg38&quot; |
| `filter_text` | 字符串 | 可选 |
| `max_tracks` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data`

获取 UCSC 指定轨道在区域中的原始记录。chrom 须含 chr 前缀，start/end 使用从 0 开始的半开区间；Ensembl 起点需减 1。返回行结构取决于轨道，truncated 反映上游限制；若提供 dataDownloadUrl，可用它获取大规模数据。坐标须为非负安全整数，并满足 `end > start`；无效值会报错，不会被取整或截到另一个位置。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `track` | 字符串 | **必填** |
| `chrom` | 字符串 | **必填** |
| `start` | 整数 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `end` | 整数 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `genome` | 字符串 | 可选; 默认值： &quot;hg38&quot; |
| `max_rows` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation`

读取 UCSC phyloP／phastCons 保守性轨道的区域统计。chrom 使用 chr 前缀，start/end 为从 0 开始的半开区间，跨度最多 100000 bp。默认 genome=hg38；默认轨道分别为 hg19: phyloP100wayAll、hg38: phyloP100way、mm10: phyloP60wayAll、mm39: phyloP35way。其他基因组保留 phyloP100way 回退，但轨道可能不存在，应先用 ucsc_list_tracks 核对。include_values 可返回受 max_values 限制的逐碱基数据。统计按覆盖的碱基跨度加权并裁剪到窗口；未覆盖位置降低 coverage_fraction，不作为零分处理。上游结果截断或非数值轨道会报错。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `chrom` | string | **必填** |
| `start` | integer | **必填**; minimum: 0; maximum: 9007199254740991 |
| `end` | integer | **必填**; minimum: 0; maximum: 9007199254740991 |
| `genome` | string | 可选; default: &quot;hg38&quot; |
| `track` | string | 可选 |
| `include_values` | boolean | 可选; default: false |
| `max_values` | integer | 可选; default: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters`

获取指定区域重叠的 ENCODE 转录因子结合位点聚类。支持 hg38 或 hg19 对应轨道；坐标从 0 开始、右端不含。返回因子集合、聚类位置、分数、支持实验数和截断状态，便于进一步检查支持证据。坐标须为非负安全整数，并满足 `end > start`；无效值会报错，不会被取整或截到另一个位置。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chrom` | 字符串 | **必填** |
| `start` | 整数 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `end` | 整数 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `genome` | 字符串 | 可选; 默认值： &quot;hg38&quot; |
| `max_rows` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes`

获取 UCSC 组装的染色体与 contig 名称、长度，可按名称筛选。返回组装总数、筛选后数量和截断标志；长度用于校验坐标，不能把备用或未定位序列误作主染色体。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `genome` | 字符串 | 可选; 默认值： &quot;hg38&quot; |
| `filter_text` | 字符串 | 可选 |
| `max_chroms` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

### `clustalo_submit`

向 EMBL-EBI Clustal Omega 提交至少三条蛋白质、DNA 或 RNA FASTA 序列，记录名称必须唯一；最多 4000 条或 4 MiB。返回 job_id 后保存并查询状态，再获取结果。默认 outfmt=clustal_num，包含位置编号。需在 Settings → Privacy → Share contact email with research data services 配置有效联系邮箱。序列会发送到 EMBL-EBI，输入和结果可能保存在会话或 Notebook 中。响应丢失不等于未提交，不要自动重提。结果保留期由提供方控制，文档说明最长约一周；应用退出仅停止本地请求，不取消远端任务。每批最多 30 个任务，等处理或获取结果后再提交下一批；连接器不跨调用限流。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `sequence` | string | **必填**; minLength: 1; maxLength: 4194304 |
| `stype` | string | **必填**; enum: [&quot;protein&quot;, &quot;dna&quot;, &quot;rna&quot;] |
| `outfmt` | string | 可选; enum: [&quot;clustal_num&quot;] |
| `title` | string | 可选; minLength: 1; maxLength: 200 |
| `dealign` | boolean | 可选 |
| `order` | string | 可选; enum: [&quot;aligned&quot;, &quot;input&quot;] |

```javascript
const result = await host.mcp("genomes", "clustalo_submit", {"sequence": ">human\nMKT\n>mouse\nMRT\n>rat\nMRT\n", "stype": "protein"})
```

### `clustalo_status`

查询一次已有 Clustal Omega 任务，不自动轮询或等待。至少间隔 10 秒再查，直到 FINISHED、ERROR、FAILURE 或 NOT_FOUND。重启后保留原 job_id 继续查询。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 128 |

```javascript
const result = await host.mcp("genomes", "clustalo_status", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m"})
```

### `clustalo_results`

获取已完成任务的 clustal_num 原始比对文件，使用提交返回的相同 outfmt。返回比对内容与建议文件名，需由调用者保存。结果上限 8 MiB；QUEUED／RUNNING 时返回 ready:false 与重试提示，失败保留 job_id 供诊断，不自动重试或重提。结果可能在约一周内过期，应及时保存；应用退出不取消远端任务。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 128 |
| `outfmt` | string | **必填**; enum: [&quot;clustal_num&quot;] |

```javascript
const result = await host.mcp("genomes", "clustalo_results", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m", "outfmt":"clustal_num"})
```

</ToolOperationGroup>

## 变异 {/* #family-6 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

**gnomAD 坐标规则**：同时记录数据集固定标识与参考组装。短变异的基因/区域查询中，r2.1/ExAC 使用 GRCh37，r3/r4 使用 GRCh38；结构变异的基因查询使用 `gnomad_sv_r2_1`（GRCh37）或 `gnomad_sv_r4`（GRCh38）；修改数据集不会转换输入坐标。`gene_constraint` 和 gnomAD 的 ClinVar 镜像固定使用 GRCh38 查询基因，不接收 dataset 参数。线粒体查询的父级定位也固定为 GRCh38；必须选择基因或成对且有序的区域边界，不能混用。区域边界须为 1—999,999,999 的整数。百万碱基差值上限属于 `region_variants`，不是另一个线粒体限制。结构变异 ID 必须与其所属的 SV 数据集配套。

### `get_variant`

按 chrom-pos-ref-alt 查询 gnomAD 短变异。坐标必须对应数据集组装：r3/r4 为 GRCh38，r2.1/ExAC 为 GRCh37；rsID 先经 search_variants 解析。include_populations 为 true 时附加可用人群计数与频率。保留数据集、等位基因计数和质量过滤；罕见本身不能确定致病性。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `variant_id` | 字符串 | **必填** |
| `dataset` | 字符串 | 可选; 默认值: &quot;gnomad_r4&quot;; 枚举: [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |
| `include_populations` | 布尔值 | 可选; 默认值: false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants`

在 gnomAD 中按 rsID、变异 ID 或前缀搜索，返回可供 get_variant 使用的 chrom-pos-ref-alt 标识。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `dataset` | 字符串 | 可选; 默认值： &quot;gnomad_r4&quot;; 枚举： [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants`

列出一个基因内的全部 gnomAD 短变异。基因边界与变异坐标使用所选数据集的参考组装：r2.1/ExAC 为 GRCh37，r3/r4 为 GRCh38。大基因可能返回数千行。`gene_symbol`（HGNC 符号，如 `APOE`）和 `gene_id`（Ensembl ID，如 `ENSG00000130203`）必须二选一。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | 可选 |
| `gene_id` | 字符串 | 可选 |
| `dataset` | 字符串 | 可选; 默认值： &quot;gnomad_r4&quot;; 枚举： [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint`

获取 gnomAD 基因约束指标，包括 pLI、功能缺失/错义/同义变异的观测期望比、90% 置信区间和 z 分数。gene_symbol 与 gene_id 二选一；结合指标定义与数据集解释基因对变异的耐受性。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | 可选 |
| `gene_id` | 字符串 | 可选 |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants`

列出指定区域内的全部 gnomAD 短变异。`chrom` 接受 1—22、X、Y，也接受可选的 chr 前缀和小写 x/y。`start`/`stop` 为从 1 开始的闭区间整数，范围 1—999,999,999；必须满足 start ≤ stop 且 stop − start ≤ 1,000,000。r2.1/ExAC 使用 GRCh37，r3/r4 使用 GRCh38。输入坐标必须已采用相应组装；选择数据集不会自动进行 liftover。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chrom` | 字符串 | **必填** |
| `start` | 整数 | **必填**; 最小值： 1; 最大值： 999999999 |
| `stop` | 整数 | **必填**; 最小值： 1; 最大值： 999999999 |
| `dataset` | 字符串 | 可选; 默认值： &quot;gnomad_r4&quot;; 枚举： [&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;] |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant`

通过 gnomAD 映射表在 GRCh37 与 GRCh38 间转换变异 ID。source_build 必须匹配输入坐标；方向错误可能得到零结果，而非报错。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `variant_id` | 字符串 | **必填** |
| `source_build` | 字符串 | 可选; 默认值： &quot;GRCh37&quot;; 枚举： [&quot;GRCh37&quot;, &quot;GRCh38&quot;] |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants`

获取 gnomAD 镜像中的基因 ClinVar 变异，包含临床意义、审核状态和星级。clinvar_release_date 标识所用快照；gene_symbol 与 gene_id 二选一。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | 可选 |
| `gene_id` | 字符串 | 可选 |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants`

列出 gnomAD 中与基因重叠的结构变异。gene_symbol 与 gene_id 二选一；dataset 需选择对应的 SV 数据发布，且组装与变异 ID 均随发布变化。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | 可选 |
| `gene_id` | 字符串 | 可选 |
| `dataset` | 字符串 | 可选; 默认值： &quot;gnomad_sv_r4&quot;; 枚举： [&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;] |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant`

按发布专属 SV ID 查询 gnomAD 结构变异。dataset 必须与该 ID 的来源发布一致，不能跨发布直接复用 ID。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `sv_id` | 字符串 | **必填** |
| `dataset` | 字符串 | 可选; 默认值： &quot;gnomad_sv_r4&quot;; 枚举： [&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;] |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants`

按线粒体基因或 chrM 坐标区间查询 gnomAD 线粒体变异，保留异质性相关计数。只支持 GRCh38 的 gnomad_r3 和 gnomad_r4，不能使用 r2.1 或 ExAC。基因与区间二选一；未知基因返回 gene_id=null、原查询和空列表。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `gene_symbol` | string | 可选 |
| `gene_id` | string | 可选 |
| `region_start` | integer | 可选; minimum: `1`; maximum: `999999999` |
| `region_stop` | integer | 可选; minimum: `1`; maximum: `999999999` |
| `dataset` | string | 可选; default: `"gnomad_r4"`; enum: `["gnomad_r4", "gnomad_r3"]` |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

NCBI 联系邮箱在 [Settings → Credentials → Literature access → Contact email](../tools/credentials.md) 中保存，下方 ClinVar/dbSNP 查询使用此配置。

### `clinvar_search`

直接检索 NCBI ClinVar，返回变异、临床意义、审核状态和星级。须配置供科研数据服务使用的联系邮箱。query 支持 Entrez 字段与布尔语法；返回总数及截断标志。上游繁忙出现 HTTP 500 时，可稍后重试一次。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records`

批量获取 ClinVar VCV、RCV 或裸 variation ID 的完整记录，最多 50 项，支持带版本 VCV。需要联系邮箱；RCV 会解析到父 VCV。rsID 应使用 clinvar_variant_by_rsid；未找到输入会明确列出。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | ['字符串', '数组'] | **必填** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid`

按 dbSNP rsID 获取所有关联的 ClinVar variation 记录。需要联系邮箱；一个 rsID 可能对应多个替代等位基因的 VCV。total 是实际匹配总数，truncated 标记截断；零结果表示未找到关联记录。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `rsid` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids`

批量获取 dbSNP RefSNP 记录，最多 20 个 rsID。需要联系邮箱，否则返回 contact_email_required。包含组装定位、等位基因、群体频率和 ClinVar 关联；not_found 与超时未处理的 not_processed 分开列出。merged 状态应继续查询 merged_into。定位为从 1 开始的坐标，SPDI 使用从 0 开始的碱基间坐标。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `rsids` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region`

按区域查询 dbSNP rsID。需要联系邮箱；坐标从 1 开始且包含终点，最长 1 Mb，必须匹配 assembly。返回总数、返回数、截断状态及实际 Entrez 查询；取得 ID 后可每批最多 20 项调用 dbsnp_get_rsids。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chrom` | 字符串 | **必填** |
| `start` | 整数 | **必填** |
| `stop` | 整数 | **必填** |
| `assembly` | 字符串 | 可选; 默认值： &quot;GRCh38&quot;; 枚举： [&quot;GRCh38&quot;, &quot;GRCh37&quot;] |
| `max_rsids` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## 临床试验 {/* #family-7 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search_trials`

检索 ClinicalTrials.gov，可按疾病、干预、申办方、地点、状态、阶段和研究类型筛选。文本字段支持 Essie 查询语法；page_token 用于翻页，count_total 请求总数，advanced_query 可补充高级表达式。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `condition` | 字符串 | 可选 |
| `intervention` | 字符串 | 可选 |
| `sponsor` | 字符串 | 可选 |
| `location` | 字符串 | 可选 |
| `status` | 字符串数组 | 可选 |
| `phase` | 字符串数组 | 可选 |
| `study_type` | 字符串 | 可选; 枚举： [&quot;INTERVENTIONAL&quot;, &quot;OBSERVATIONAL&quot;, &quot;EXPANDED_ACCESS&quot;] |
| `advanced_query` | 字符串 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 10; 最小值： 1; 最大值： 1000 |
| `page_token` | 字符串 | 可选 |
| `count_total` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details`

按 NCT ID 获取临床试验的资格条件、研究设计、终点、地点、申办方、日期、入组人数和结果链接。ID 为 NCT 加八位数字，裸数字会补前缀。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `nct_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor`

按申办公司或机构名称部分匹配试验，可进一步限制疾病、阶段和状态。用 page_token 翻页，count_total 获取匹配总数。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `sponsor_name` | 字符串 | **必填** |
| `condition` | 字符串 | 可选 |
| `phase` | 字符串数组 | 可选 |
| `status` | 字符串数组 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 10; 最小值： 1; 最大值： 1000 |
| `page_token` | 字符串 | 可选 |
| `count_total` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators`

按疾病、机构、地点或姓名查找研究者和研究中心。institution 优先于 location；返回联系人、角色、机构、地点及 NCT ID。page_size 限制扫描的试验数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `condition` | 字符串 | 可选 |
| `institution` | 字符串 | 可选 |
| `location` | 字符串 | 可选 |
| `investigator_name` | 字符串 | 可选 |
| `status` | 字符串数组 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints`

分析主要、次要及其他终点。nct_id 对应单试验路线，condition 对应跨试验汇总；同时给出时优先 nct_id。汇总可限制阶段和起始日期，结果范围受 page_size 限制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `nct_id` | 字符串 | 可选 |
| `condition` | 字符串 | 可选 |
| `phase` | 字符串数组 | 可选 |
| `start_date_after` | 字符串 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 50; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility`

按 ClinicalTrials.gov 纳入条件搜索临床试验，核对年龄边界与生物学性别筛选。返回记录需继续阅读原始纳入与排除条件，搜索匹配不能代替实际入组判断。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `condition` | 字符串 | 可选 |
| `eligibility_keywords` | 字符串 | 可选 |
| `min_age` | 字符串 | 可选 |
| `max_age` | 字符串 | 可选 |
| `sex` | 字符串 | 可选; 枚举: [&quot;ALL&quot;, &quot;MALE&quot;, &quot;FEMALE&quot;] |
| `status` | 字符串数组 | 可选 |
| `page_size` | 整数 | 可选; 默认值: 10; 最小值: 1; 最大值: 1000 |
| `page_token` | 字符串 | 可选 |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## 临床基因组学 {/* #family-8 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `clingen_gene_validity`

查询 ClinGen 基因与疾病关系有效性评估，涵盖 Definitive、Strong、Moderate、Limited、Disputed 等等级。省略 gene 时列出全部评估。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity`

查询 ClinGen 剂量敏感性评估，包括单倍剂量不足和三倍剂量敏感性，可包含 ISCA 区域。基因符号或 ISCA ID 精确筛选；省略则返回全表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | 可选 |
| `include_regions` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability`

查询 ClinGen 临床可干预性评估，包括疾病、干预与结局，以及严重性、可能性、有效性和干预性质评分。基因筛选可匹配多基因主题中的任一成员。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | 可选 |
| `context` | 字符串 | 可选; 默认值： &quot;both&quot;; 枚举： [&quot;adult&quot;, &quot;pediatric&quot;, &quot;both&quot;] |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications`

获取 ClinGen ERepo 专家组依据 ACMG 标准给出的变异分类。gene、caid、hgvs 必须且只能提供一项；完整获取匹配记录。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | 可选 |
| `caid` | 字符串 | 可选 |
| `hgvs` | 字符串 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes`

按精确 Entrez 符号查找 CIViC 基因，完整分页并核对数量。返回的 CIViC gene ID 可用于 civic_gene_variants。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `entrez_symbol` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants`

按 CIViC gene ID 获取该基因全部变异，完整分页并按变异 ID 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_id` | 整数 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant`

按 CIViC variant ID 获取别名、类型、基因关联及适用的坐标；不存在时 found 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `variant_id` | 整数 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants`

按名称子串检索 CIViC 变异，可限定 CIViC gene ID；完整分页并按变异 ID 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `name` | 字符串 | **必填** |
| `gene_id` | 整数 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item`

获取一个 CIViC 证据条目，包含疾病/治疗背景、证据等级 A–E、类型、方向、临床意义、评分和来源；不存在时 found 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `evidence_id` | 整数 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence`

按筛选条件检索 CIViC 证据，完整分页并核对数量。枚举值必须原样使用 GraphQL 定义，如 SUPPORTS、DOES_NOT_SUPPORT、ACCEPTED。至少给出一个条件，避免无条件遍历整个证据库。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `disease_name` | 字符串 | 可选 |
| `therapy_name` | 字符串 | 可选 |
| `evidence_level` | 字符串 | 可选 |
| `evidence_type` | 字符串 | 可选 |
| `evidence_direction` | 字符串 | 可选 |
| `significance` | 字符串 | 可选 |
| `variant_origin` | 字符串 | 可选 |
| `evidence_rating` | 整数 | 可选 |
| `status` | 字符串 | 可选 |
| `molecular_profile_name` | 字符串 | 可选 |
| `molecular_profile_id` | 整数 | 可选 |
| `variant_id` | 整数 | 可选 |
| `disease_id` | 整数 | 可选 |
| `therapy_id` | 整数 | 可选 |
| `phenotype_id` | 整数 | 可选 |
| `source_id` | 整数 | 可选 |
| `assertion_id` | 整数 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion`

获取一个 CIViC 专家断言，包含分子谱在疾病/治疗背景下的证据汇总、AMP/ASCO/CAP 分级、ACMG/ClinGen 代码及适用的伴随诊断标志；不存在时 found 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `assertion_id` | 整数 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions`

检索 CIViC 专家断言，支持类型、方向、等级和状态组合筛选；完整分页、核对数量并按 ID 排序。无筛选条件会遍历整个集合。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `disease_name` | 字符串 | 可选 |
| `therapy_name` | 字符串 | 可选 |
| `assertion_type` | 字符串 | 可选 |
| `assertion_direction` | 字符串 | 可选 |
| `significance` | 字符串 | 可选 |
| `amp_level` | 字符串 | 可选 |
| `status` | 字符串 | 可选 |
| `molecular_profile_name` | 字符串 | 可选 |
| `molecular_profile_id` | 整数 | 可选 |
| `variant_id` | 整数 | 可选 |
| `variant_name` | 字符串 | 可选 |
| `disease_id` | 整数 | 可选 |
| `therapy_id` | 整数 | 可选 |
| `phenotype_id` | 整数 | 可选 |
| `evidence_id` | 整数 | 可选 |
| `summary` | 字符串 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile`

按 ID 获取 CIViC 分子谱，包括名称、评分和组成变异；证据与断言关联到该变异组合。不存在时 found 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mp_id` | 整数 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles`

按名称子串检索 CIViC 分子谱，完整分页并按 ID 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `name` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases`

按名称子串检索 CIViC 疾病，返回 DOID 与名称，完整分页并按 ID 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `name` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies`

按名称子串检索 CIViC 治疗，返回 NCIt ID 与名称，完整分页并按 ID 排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `name` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql`

向 Open Targets Platform 提交 GraphQL 查询，可查询靶标、疾病、药物、关联、证据、可成药性与安全性。支持内省查询；上游 knownDrugs 字段已改名为 drugAndClinicalCandidates。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `variables` | 对象 | 可选 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs`

按疾病本体 ID 获取 Open Targets 的已知或在研药物，封装 Disease.drugAndClinicalCandidates。efo_id 可为 EFO、MONDO 等 ID。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `efo_id` | 字符串 | **必填** |
| `size` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets`

按 Open Targets 综合关联分数，获取疾病关联排名靠前的靶标。efo_id 使用疾病本体 ID。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `efo_id` | 字符串 | **必填** |
| `size` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug`

按 ChEMBL ID 获取 Open Targets 药物详情，包括名称、类型、最高临床阶段及靶标/作用机制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `chembl_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## 结构与相互作用 {/* #family-9 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `emdb_get_entries`

获取 EMDB 冷冻电镜条目元数据，接受 EMD-1234 或数字形式。包含方法、分辨率、日期、样本、拟合 PDB、引文及体素信息；未报告值为 null。废弃记录含 is_obsolete 和 superseded_by，未知 ID 明确报 not_found。仅取元数据，不下载密度图体数据。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `emdb_ids` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries`

用 Solr 语法检索 EMDB，分页获取精简记录。num_found_released 为服务报告的已发布数量；搜索也可能包含 OBS 废弃记录。released_complete 说明是否取得全部发布匹配，受 max_rows 和数量一致性影响。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `max_rows` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section`

获取 EMDB 指定元数据章节：publications、map、sample 或 imaging。包括完整作者、密度图参数、分子组成或显微镜实验条件。未知条目明确返回 not_found；只需摘要时先用 emdb_get_entries。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `emdb_ids` | 字符串数组 | **必填** |
| `section` | 字符串 | **必填**; 枚举： [&quot;publications&quot;, &quot;map&quot;, &quot;sample&quot;, &quot;imaging&quot;] |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation`

获取 EMDB 验证分析的数值指标，如 Q-score、原子包含率、等值面和模型/密度图比例。仅返回上游实际计算的项目；缺失值为 null，无分析时 has_validation_analysis 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `emdb_ids` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes`

按 CPX 登录号获取 Complex Portal 人工整理的复合物，包含名称、物种、参与物、化学计量、角色、ECO/GO 和交叉引用。按输入顺序返回，未知 ID 列入 not_found。二元相互作用实验依据应查 IntAct。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `complex_acs` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant`

按 UniProt、ChEBI 或 RNAcentral 参与物 ID 检索 Complex Portal。participants_only 为 true 时仅匹配已整理的实际参与物；false 也匹配自由文本。完整分页并核对数量，取得 ID 后用 complexportal_get_complexes 查详情。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |
| `participants_only` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions`

获取匹配查询的 IntAct 二元相互作用，支持 UniProt、符号、自由文本或 Solr 语法，并可按 MI 分数与物种筛选。完整获取并核对总数后，max_records_returned 仅限制输出行；records_truncated 标明输出截断。记录包含互作双方、检测方法、实验角色、分数和文献。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `min_mi_score` | 数值 | 可选; 默认值： 0 |
| `max_mi_score` | 数值 | 可选; 默认值： 1 |
| `interactor_species` | 字符串数组 | 可选 |
| `max_records_returned` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor`

将分子解析为全部匹配的 IntAct interactor 记录。一个 UniProt 登录号可能对应标准蛋白、链或亚型，返回 n_matches，不自动只选一个。记录含标识、物种、类型和相互作用数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details`

按 IntAct interaction AC 获取一条互作的完整整理信息，包括方法、文献、动力学/亲和力、可信度和参与物角色。可关闭参与物详情；未知 AC 返回 not_found。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `interaction_ac` | 字符串 | **必填** |
| `include_participants` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network`

围绕 UniProt 种子蛋白构建一层 IntAct 网络。先完整获取每个种子的互作，再在节点集合内扩展有限数量的伙伴；expansion.complete 为 false 时仍可能遗漏伙伴之间的边。返回节点、边和每个种子的获取统计。种子较多会增加完整分页请求量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `seed_accessions` | 字符串数组 | **必填** |
| `min_mi_score` | 数值 | 可选; 默认值： 0.45 |
| `max_interactors_expanded` | 整数 | 可选; 默认值： 25 |
| `interactor_species` | 字符串数组 | 可选 |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures`

按属性组合检索 RCSB PDB，至少提供一个条件，各条件为 AND。默认只检索实验结构，可用 include_computed_models 纳入预测结构。返回 ID、相关性分数、总数和截断状态；需用 pdb_get_structures 获取元数据。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `text` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `taxonomy_id` | 整数 | 可选 |
| `uniprot_accession` | 字符串 | 可选 |
| `experimental_method` | 字符串 | 可选 |
| `max_resolution_angstrom` | 数值 | 可选 |
| `ligand_comp_id` | 字符串 | 可选 |
| `include_computed_models` | 布尔值 | 可选; 默认值： false |
| `max_rows` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures`

批量获取最多 25 个 PDB 条目的标题、方法、分辨率、日期、状态、实体/组装数量、配体与引文。ID 不区分大小写并去重；未知 ID 返回 not_found。仅返回元数据，不下载坐标文件。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pdb_ids` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities`

获取 PDB 聚合物实体、链、序列长度、物种和 UniProt 映射。每次最多 25 个实体，大组装应从完整 ID 列表分批指定；明确子集时条目总数为 null。可加入序列，超出 max_bytes 时省略序列并说明原因，保留元数据。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pdb_id` | 字符串 | **必填** |
| `entity_ids` | 字符串数组 | 可选 |
| `include_sequences` | 布尔值 | 可选; 默认值： false |
| `max_bytes` | 整数 | 可选; 默认值： 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands`

获取 PDB 条目的非聚合物配体及化学属性，不包括水。返回实际实体总数及截断标志，每次上限 25 个配体；部分缺失实体/组分单独标为 not_found，无配体时返回空列表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pdb_id` | 字符串 | **必填** |
| `max_ligands` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction`

按 UniProt 登录号获取 AlphaFold DB 预测结构元数据。一个登录号可有多个模型或提供方；检查 provider_id、tool_used、序列范围、模型版本、pLDDT 与置信区间比例。返回坐标、PAE、MSA 等可用下载 URL，不直接下载内容。无预测时 has_model 为 false。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `uniprot_accession` | 字符串 | **必填** |
| `include_sequence` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage`

批量检查最多 40 个不同 UniProt 登录号的 AlphaFold DB 覆盖。空值和重复项单独计数，结果按输入顺序返回，每项包含是否有模型及首个模型摘要；无模型和标识错误分别报告。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `uniprot_accessions` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## ChEMBL {/* #family-10 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `compound_search`

按名称、ChEMBL ID 或 SMILES 检索化合物，至少提供一种输入。SMILES 配合 similarity_threshold 为相似性检索，否则为子结构检索；结构遍历受上限约束并标注截断。按适应证找药物应使用 drug_search。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `name` | 字符串 | 可选 |
| `chembl_id` | 字符串 | 可选 |
| `smiles` | 字符串 | 可选 |
| `similarity_threshold` | 整数 | 可选; 最小值： 70; 最大值： 100 |
| `max_phase` | 整数 | 可选; 枚举： [0, 1, 2, 3, 4] |
| `limit` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search`

按 EFO 适应证检索已批准药物或临床候选物，将适应证关联到母体分子及撤市/黑框警告。only_approved 限制为 phase 4；可再按分子 ID、药名和临床阶段筛选。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `indication` | 字符串 | **必填** |
| `drug_name` | 字符串 | 可选 |
| `molecule_chembl_id` | 字符串 | 可选 |
| `max_phase` | 整数 | 可选; 枚举： [0, 1, 2, 3, 4] |
| `only_approved` | 布尔值 | 可选; 默认值： false |
| `limit` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet`

获取 ChEMBL 结构计算属性用于类药性/ADMET 初筛，包括 ALogP、分子量、PSA、氢键供受体、旋转键、规则违反数和 QED。这些是计算属性，不是实验 ADMET 测量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity`

检索 ChEMBL 化合物与靶标的生物活性测量，如 IC50、Ki、Kd、EC50。可按分子、靶标、类型、pChEMBL、数值范围和单位筛选；返回按 activity_id 排序的一页及效力摘要。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字符串 | 可选 |
| `target_chembl_id` | 字符串 | 可选 |
| `activity_type` | 字符串 | 可选; 枚举： [&quot;IC50&quot;, &quot;EC50&quot;, &quot;Ki&quot;, &quot;Kd&quot;, &quot;AC50&quot;, &quot;GI50&quot;, &quot;ED50&quot;, &quot;Potency&quot;] |
| `min_pchembl` | 数值 | 可选; 最小值： 0; 最大值： 14 |
| `min_value` | 数值 | 可选 |
| `max_value` | 数值 | 可选 |
| `unit` | 字符串 | 可选; 枚举： [&quot;nM&quot;, &quot;uM&quot;, &quot;mM&quot;, &quot;pM&quot;, &quot;M&quot;] |
| `limit` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism`

获取 ChEMBL 药物或临床候选物的作用机制。可按分子、靶标和 action_type 筛选；盐形式无结果时尝试母体分子。返回按 mec_id 排序的一页及作用类型汇总。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字符串 | 可选 |
| `target_chembl_id` | 字符串 | 可选 |
| `action_type` | 字符串 | 可选; 枚举： [&quot;INHIBITOR&quot;, &quot;AGONIST&quot;, &quot;ANTAGONIST&quot;, &quot;BLOCKER&quot;, &quot;MODULATOR&quot;, &quot;OPENER&quot;, &quot;ACTIVATOR&quot;, &quot;POSITIVE ALLOSTERIC MODULATOR&quot;, &quot;NEGATIVE ALLOSTERIC MODULATOR&quot;, &quot;PARTIAL AGONIST&quot;, &quot;INVERSE AGONIST&quot;] |
| `limit` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search`

检索 ChEMBL 生物靶标，包括蛋白、复合物、家族和物种。支持 ID、精确基因符号、名称、物种或类型筛选；结果包含组成部分的 UniProt ID 和有上限的交叉引用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `target_name` | 字符串 | 可选 |
| `gene_symbol` | 字符串 | 可选 |
| `target_chembl_id` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `target_type` | 字符串 | 可选; 枚举： [&quot;SINGLE PROTEIN&quot;, &quot;PROTEIN COMPLEX&quot;, &quot;PROTEIN FAMILY&quot;, &quot;ORGANISM&quot;, &quot;TISSUE&quot;, &quot;CELL-LINE&quot;, &quot;NUCLEIC-ACID&quot;, &quot;SUBCELLULAR&quot;] |
| `limit` | 整数 | 可选; 默认值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## bioRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `get_categories`

列出 bioRxiv 学科类别及 API 使用的 slug，例如 cancer biology 对应 cancer_biology。检索前用此操作确认合法类别。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints`

按日期和可选类别检索 bioRxiv/medRxiv 预印本。日期范围、recent_days、recent_count 三选一；都不提供时取最近 60 天。没有关键词检索；用 cursor 翻页。返回 DOI、标题、作者、日期、类别、版本和短摘要。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `server` | 字符串 | 可选; 默认值： &quot;biorxiv&quot;; 枚举： [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `category` | 字符串 | 可选; 枚举： [&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;] |
| `date_from` | 字符串 | 可选 |
| `date_to` | 字符串 | 可选 |
| `recent_days` | 整数 | 可选; 最小值： 1 |
| `recent_count` | 整数 | 可选; 最小值： 1 |
| `limit` | 整数 | 可选; 默认值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整数 | 可选; 默认值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint`

按 DOI 获取最新预印本的完整元数据，包括作者、机构、摘要、许可、版本、资助、JATS XML 及 PDF/网页链接；有期刊发表记录时提供期刊 DOI。预印本本身未经同行评审。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `doi` | 字符串 | **必填** |
| `server` | 字符串 | 可选; 默认值： &quot;biorxiv&quot;; 枚举： [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints`

查找后续发表于同行评审期刊的预印本及关联 DOI。日期选择规则同 search_preprints；include_details 可控制详细程度。publisher 使用期刊 DOI 前缀筛选，仅用于 bioRxiv 的该路线。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `server` | 字符串 | 可选; 默认值： &quot;biorxiv&quot;; 枚举： [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `publisher` | 字符串 | 可选 |
| `include_details` | 布尔值 | 可选; 默认值： true |
| `date_from` | 字符串 | 可选 |
| `date_to` | 字符串 | 可选 |
| `recent_days` | 整数 | 可选; 最小值： 1 |
| `recent_count` | 整数 | 可选; 最小值： 1 |
| `limit` | 整数 | 可选; 默认值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整数 | 可选; 默认值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder`

按资助方 ROR ID 或 URL 查找预印本。必须给出明确日期范围；资助元数据自 2025-04-10 起提供。可限制类别并用 cursor 翻页。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `funder_ror_id` | 字符串 | **必填** |
| `date_from` | 字符串 | **必填** |
| `date_to` | 字符串 | **必填** |
| `server` | 字符串 | 可选; 默认值： &quot;biorxiv&quot;; 枚举： [&quot;biorxiv&quot;, &quot;medrxiv&quot;] |
| `category` | 字符串 | 可选; 枚举： [&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;] |
| `limit` | 整数 | 可选; 默认值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整数 | 可选; 默认值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics`

按月或年获取 bioRxiv 历史投稿统计，包括新增、修订和累计数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `interval` | 字符串 | 可选; 默认值： &quot;monthly&quot;; 枚举： [&quot;monthly&quot;, &quot;yearly&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics`

按月或年获取 bioRxiv 摘要浏览、全文浏览、PDF 下载及累计使用统计。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `interval` | 字符串 | 可选; 默认值： &quot;monthly&quot;; 枚举： [&quot;monthly&quot;, &quot;yearly&quot;] |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## 药品监管 {/* #family-12 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search_drug_applications`

按品牌、通用名、成分、申办方、上市状态、剂型、途径或药理类别检索 Drugs@FDA 申请。generic 和 pharm_class 依赖旧记录可能缺少的 openfda 字段。返回实际总数和截断标志；大范围检索应按提交日期缩小窗口。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `brand` | 字符串 | 可选 |
| `generic` | 字符串 | 可选 |
| `active_ingredient` | 字符串 | 可选 |
| `sponsor` | 字符串 | 可选 |
| `marketing_status` | 字符串 | 可选; 枚举： [&quot;Prescription&quot;, &quot;Over-the-counter&quot;, &quot;Discontinued&quot;, &quot;None (Tentative Approval)&quot;] |
| `dosage_form` | 字符串 | 可选 |
| `route` | 字符串 | 可选 |
| `pharm_class` | 字符串 | 可选 |
| `pharm_class_type` | 字符串 | 可选; 枚举： [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `search_type` | 字符串 | 可选; 默认值： &quot;and&quot;; 枚举： [&quot;and&quot;, &quot;or&quot;] |
| `submission_date_from` | 字符串 | 可选 |
| `submission_date_to` | 字符串 | 可选 |
| `raw_search` | 字符串 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application`

按 NDA、ANDA 或 BLA 申请号获取 Drugs@FDA 完整记录，包括申办方、产品、成分/强度、剂型、给药途径、上市状态、TE code 和提交历史。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `application_number` | 字符串 | **必填** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications`

按一个字段汇总 Drugs@FDA 申请数量，可使用与检索相同的筛选条件。count_field 支持便捷名称或原始 openFDA 字段路径；分析型字段需要时自行添加 .exact。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `count_field` | 字符串 | **必填** |
| `brand` | 字符串 | 可选 |
| `generic` | 字符串 | 可选 |
| `active_ingredient` | 字符串 | 可选 |
| `sponsor` | 字符串 | 可选 |
| `marketing_status` | 字符串 | 可选 |
| `dosage_form` | 字符串 | 可选 |
| `route` | 字符串 | 可选 |
| `pharm_class` | 字符串 | 可选 |
| `pharm_class_type` | 字符串 | 可选; 枚举： [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `search_type` | 字符串 | 可选; 默认值： &quot;and&quot;; 枚举： [&quot;and&quot;, &quot;or&quot;] |
| `submission_date_from` | 字符串 | 可选 |
| `submission_date_to` | 字符串 | 可选 |
| `raw_search` | 字符串 | 可选 |
| `max_buckets` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics`

获取 Drugs@FDA 全库统计，包括申请总数、上市状态、主要剂型/途径和申办方数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes`

列出药理类别及申请数量。统计仅覆盖含对应 openfda.pharm_class 字段的记录。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `class_type` | 字符串 | 可选; 默认值： &quot;epc&quot;; 枚举： [&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;] |
| `max_buckets` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents`

根据品牌药的参考申请解析准确活性成分集合，再查找成分集合匹配的 Drugs@FDA 产品，返回 TE code 和上市状态供核对。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `brand` | 字符串 | **必填** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels`

按成分、名称或给药途径获取 FDA SPL 药品标签，可选择标签章节。exact 使用精确字段；raw_search 与映射筛选条件互斥。返回内容用于核对来源标签。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `active_ingredient` | 字符串 | 可选 |
| `generic_name` | 字符串 | 可选 |
| `brand_name` | 字符串 | 可选 |
| `route` | 字符串 | 可选 |
| `product_type` | 字符串 | 可选; 枚举： [&quot;HUMAN PRESCRIPTION DRUG&quot;, &quot;HUMAN OTC DRUG&quot;] |
| `exact` | 布尔值 | 可选; 默认值： false |
| `raw_search` | 字符串 | 可选 |
| `sections` | 字符串数组 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## 人类遗传学 {/* #family-13 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `gwas_associations_for_variant`

获取 GWAS Catalog 中一个 rsID 的关联，按 p 值从小到大返回。须使用当前 rsID，合并或退役 ID 可能零结果。api_total 为总数，truncated 标记上限；OR 与 beta 按结局类型分别提供。p_value 为 0 可能是浮点下溢，应读取尾数和指数。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `rs_id` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene`

按基因符号获取 GWAS Catalog 映射到该基因的变异关联。映射来自目录的 Ensembl 流程，并非作者报告；基因间变异可能映射到侧翼基因。使用规范大写符号，结果按 p 值排序并标记截断。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait`

按当前性状 ID 或精确标签获取 GWAS 关联，两者二选一。历史 EFO ID 可能已迁移到 MONDO/HP，先用 gwas_search_traits 解析。未知 ID/标签返回零结果。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `efo_id` | 字符串 | 可选 |
| `efo_trait` | 字符串 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits`

按标签子串检索 GWAS 性状，返回名称、ID、URI、总数和截断状态。目录混合 EFO、MONDO、HP、OBA 等命名空间，不能假设所有 ID 都以 EFO 开头。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies`

按性状注释或 PubMed ID 检索 GWAS 研究，至少提供一个筛选条件，多个条件为 AND。返回研究 ID、样本规模、祖源、分型平台、队列及汇总统计可用性，并核对总数。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `efo_id` | 字符串 | 可选 |
| `efo_trait` | 字符串 | 可选 |
| `pubmed_id` | 字符串 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study`

按 GCST 登录号获取一个 GWAS 研究详情；未知 ID 时 found 为 false、study 为 null。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant`

按 rsID 获取 GWAS Catalog 变异的位置、映射基因与后果，位置使用 GRCh38。merged 为 1 表示上游合并记录；未收录时 variant 为 null。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `rs_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets`

列出 eQTL Catalogue 数据集，每项对应研究、组织/细胞类型及定量方法。可按精确研究名、组织标签或 quant_method 筛选。返回 QTD ID 及元数据；上游不提供总数，truncated 为 false 表示已遍历完毕。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `study_label` | 字符串 | 可选 |
| `tissue_label` | 字符串 | 可选 |
| `quant_method` | 字符串 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations`

查询一个 QTD 数据集的分子 QTL，至少指定 gene_id、rsid、variant 或 pos。使用 GRCh38；variant 含 chr 前缀和下划线，pos 区域不带 chr 前缀。仅覆盖数据集实际检验的 cis 窗口；空结果可表示未检验或未收录。检查 truncated 后再判断完整性。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `dataset_id` | 字符串 | **必填** |
| `gene_id` | 字符串 | 可选 |
| `rsid` | 字符串 | 可选 |
| `variant` | 字符串 | 可选 |
| `pos` | 字符串 | 可选 |
| `nlog10p_min` | 数值 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances`

列出可查询的 PheWeb 门户、参考组装和各自支持的接口。FinnGen 使用 GRCh38，BioBank Japan 使用 GRCh37/hg19；跨门户比较前先转换坐标。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant`

获取一个变异在 PheWeb 生物库中的表型关联，按显著性排序。变异坐标必须匹配所选门户组装；返回总数、截断状态、变异元数据与效应/频率/样本数。上游未公布的字段为 null，未知变异报未找到。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `instance` | 字符串 | **必填**; 枚举： [&quot;finngen&quot;, &quot;bbj&quot;] |
| `variant` | 字符串 | **必填** |
| `max_phenos` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene`

获取 FinnGen 基因区域的 PheWAS：每个疾病终点选出区域内关联最强变异。该区域可超出基因边界；每个终点都有最优变异并不代表其显著，应按 p 值筛选。结果按显著性排序并标记截断。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | **必填** |
| `max_phenos` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes`

获取 PheWeb 门户的表型目录及病例/对照数量。此接口目前支持 FinnGen；BBJ 应使用 phewas_search_phenotypes。检查返回数量与 truncated。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `instance` | 字符串 | 可选; 默认值： &quot;finngen&quot;; 枚举： [&quot;finngen&quot;] |
| `max_records` | 整数 | 可选; 默认值： 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes`

按名称或代码检索 PheWeb 表型，也可能匹配基因或 rsID。支持 FinnGen 和 BBJ，返回 phenocode、显示名称及 URL；可用代码继续查看门户数据。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `instance` | 字符串 | 可选; 默认值： &quot;finngen&quot;; 枚举： [&quot;finngen&quot;, &quot;bbj&quot;] |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## 表达 {/* #family-14 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `gtex_tissue_sites`

获取指定 GTEx 数据发布的全部组织类型及样本数、eGene/sGene 数量、颜色和 UBERON ID。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info`

列出 GTEx 数据发布，包含 datasetId、GENCODE/组装/dbSNP 信息，以及样本、受试者和组织数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `dataset_id` | 字符串 | 可选 |
| `organization_name` | 字符串 | 可选 |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info`

获取固定 GTEx 数据发布的样本与供体元数据，可按组织、数据类型或受试者筛选。分页并核对总数；无筛选结果较大，建议限定条件或 max_samples。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字符串 | 可选 |
| `data_type` | 字符串 | 可选 |
| `subject_id` | 字符串 | 可选 |
| `max_samples` | 整数 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes`

将基因符号或无版本 Ensembl ID 解析为该 GTEx 数据发布使用的带版本 GENCODE ID，供表达和 eQTL 操作使用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `genes` | 字符串数组 | **必填** | 7 / 0 / 0 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression`

获取一个或多个带版本 GENCODE ID 在各组织的表达中位数 TPM；省略组织表示全部组织。按基因/组织行分页并核对数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gencode_ids` | 字符串数组 | **必填** |
| `tissue_site_detail_ids` | 字符串数组 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary`

汇总一个基因在全部组织中的表达，按中位 TPM 降序排列。接受符号或 Ensembl ID，并先解析为带版本 GENCODE ID。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | **必填** |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression`

按带版本 GENCODE ID 获取各组织逐样本 TPM 数组及样本数，不是聚合表达值；省略组织表示全部组织。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gencode_id` | 字符串 | **必填** |
| `tissue_site_detail_ids` | 字符串数组 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes`

获取一个组织按中位 TPM 排名前 n 的基因，排序由上游 API 完成；filter_mt_gene 默认排除线粒体基因。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字符串 | **必填** |
| `n` | 整数 | 可选; 默认值： 100 |
| `filter_mt_gene` | 布尔值 | 可选; 默认值： true |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes`

获取一个组织全部 eGene，即至少有一个显著 cis-eQTL 的基因。完整分页并核对数量，max_genes 限制输出行数。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字符串 | **必填** |
| `max_genes` | 整数 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls`

获取基因和/或变异的预计算显著单组织 cis-eQTL，可进一步限定组织；分页并核对数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gencode_id` | 字符串 | 可选 |
| `variant_id` | 字符串 | 可选 |
| `tissue_site_detail_id` | 字符串 | 可选 |
| `max_results` | 整数 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls`

按带版本 GENCODE ID 获取 METASOFT 多组织 cis-eQTL 元分析，可限制变异。返回各变异的逐组织 m-value、NES、p 值和标准误。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gencode_id` | 字符串 | **必填** |
| `variant_id` | 字符串 | 可选 |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl`

为某个组织中的基因/变异组合即时计算 eQTL，包括非显著组合。返回 p 值、NES、t 统计量、MAF 及逐样本基因型和表达数组。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gencode_id` | 字符串 | **必填** |
| `variant_id` | 字符串 | **必填** |
| `tissue_site_detail_id` | 字符串 | **必填** |
| `dataset_id` | 字符串 | 可选; 默认值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## 蛋白注释 {/* #family-15 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `get_domain_architecture`

获取 UniProt 蛋白的完整 InterPro 结构域架构，包括成员数据库签名和片段坐标；分页结果与服务数量核对。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries`

按关键词检索 InterPro 或 Pfam、SMART、PROSITE、PANTHER、CDD 等成员数据库条目，完整遍历游标并核对数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |
| `entry_type` | 字符串 | 可选 |
| `source_db` | 字符串 | 可选; 默认值： &quot;interpro&quot; |
| `go_term` | 字符串 | 可选 |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry`

获取 InterPro IPR 或 Pfam PF 条目的详情，依据登录号前缀选择接口。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans`

按关键词检索 Pfam clan，即登录号以 CL 开头的家族集合。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan`

获取 Pfam clan 详情及完整、已排序的成员家族列表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `clan_accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins`

获取 Pfam 家族的成员蛋白，支持完整分页核对或仅返回数量。大型家族优先使用 count_only。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pfam_accession` | 字符串 | **必填** |
| `reviewed_only` | 布尔值 | 可选; 默认值： false |
| `tax_id` | 整数 | 可选 |
| `count_only` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes`

获取包含 Pfam 家族成员的蛋白质组。由于上游深层游标分页存在缺陷，count_only 默认开启。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `pfam_accession` | 字符串 | **必填** |
| `count_only` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene`

按 Ensembl gene ID 或符号获取 Human Protein Atlas 基因记录，包括组织、亚细胞、病理、血液、脑表达和抗体信息。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene` | 字符串 | **必填** |
| `full` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas`

通过 Human Protein Atlas search_download 批量检索，并选择所需返回列。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `columns` | 字符串 | 可选; 默认值： &quot;g,gs,eg,gd,up,chr,chrp,scl&quot; |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids`

将基因符号/别名映射为 STRING 蛋白 ID。每项输入均进入映射结果或 unmapped 列表，便于核对遗漏。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `symbols` | 字符串数组 | **必填** |
| `species` | 整数 | 可选; 默认值： 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network`

按物种和置信阈值获取 STRING 蛋白相互作用网络。先映射输入符号并报告未映射项；单个映射输入请求 10 个邻居，多个映射输入不扩展。nodes 包含完整返回网络；只需输入节点时筛选 is_query，全部输入别名在 queries 中。n_nodes 不是输入数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `symbols` | 字符串数组 | **必填** |
| `species` | 整数 | 可选; 默认值: 9606 |
| `required_score` | 整数 | 可选; 默认值: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores`

获取基因集合中的 STRING Smith-Waterman 蛋白相似性 bitscore。结果是稀疏的；缺少一对记录表示未记录相似性，不等于分数为零。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `symbols` | 字符串数组 | **必填** |
| `species` | 整数 | 可选; 默认值： 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits`

为每个输入蛋白获取目标物种中的最佳同源命中；target_species 为 null 时在所有物种中查找最佳命中。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `symbols` | 字符串数组 | **必填** |
| `species` | 整数 | 可选; 默认值： 9606 |
| `target_species` | 整数 | 可选 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## 肿瘤模型 {/* #family-16 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `cbioportal_list_studies`

列出 cBioPortal 肿瘤研究，可按关键词和/或精确癌种 ID 筛选。返回研究 ID、名称、癌种、参考组装、文献和各数据类型样本数。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `keyword` | 字符串 | 可选 |
| `cancer_type_id` | 字符串 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study`

按 ID 获取 cBioPortal 研究详情，包括各数据类型样本数、从集合读取的样本/患者数，以及分子谱。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `study_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene`

按 HUGO 符号获取 cBioPortal 研究中某基因的全部突变及复发汇总，包括突变数量、突变样本数、类型与蛋白变化分布。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | **必填** |
| `study_id` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency`

查询 cBioPortal 基因突变频率。分母使用该基因确实完成相应分子检测的样本数，而不是研究中的所有样本；保留研究、分子数据集、样本与缺失信息后再比较频率。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | **必填** |
| `study_ids` | 字符串数组 | **必填**; 最少项数: 1; 最多项数: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene`

获取 cBioPortal 研究中一个基因的离散拷贝数变化，默认筛选深度缺失与扩增，并返回完整逐样本变化分布。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `gene_symbol` | 字符串 | **必填** |
| `study_id` | 字符串 | **必填** |
| `event_type` | 字符串 | 可选; 默认值： &quot;HOMDEL_AND_AMP&quot;; 枚举： [&quot;HOMDEL_AND_AMP&quot;, &quot;HOMDEL&quot;, &quot;AMP&quot;, &quot;GAIN&quot;, &quot;HETLOSS&quot;, &quot;DIPLOID&quot;, &quot;ALL&quot;] |
| `max_records` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes`

列出 cBioPortal 研究的患者级和样本级临床属性，突出显示生存终点及总生存数据是否存在。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `study_id` | 字符串 | **必填** |
| `max_records` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RNA {/* #family-17 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `get_family`

按 RF 登录号或家族名称获取 Rfam 元数据，返回扁平记录及 raw 中的完整上游 JSON。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment`

获取 Rfam 种子比对，默认 Stockholm（含共识二级结构行），也可返回含 gap 的比对 FASTA。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |
| `fmt` | 字符串 | 可选; 默认值： &quot;stockholm&quot;; 枚举： [&quot;stockholm&quot;, &quot;fasta&quot;] |
| `max_bytes` | 整数 | 可选; 默认值： 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model`

获取 Rfam 家族 Infernal 协方差模型 CM 文件及解析的头字段，可供 cmsearch/cmscan 使用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |
| `max_bytes` | 整数 | 可选; 默认值： 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree`

获取 Rfam 家族种子系统发育树，格式为 NHX/Newick 文本。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions`

获取 Rfam 家族在序列数据库中的全部区域命中并解析 TSV。先检查 get_family 的 num_full；极大家族的该上游接口可能返回 403。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping`

获取 Rfam 家族到 PDB 的残基层级结构映射，并按确定顺序排序。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id`

将 Rfam 登录号转换为家族名称，例如 RF00005 转为 tRNA。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession`

将 Rfam 家族名称转换为登录号，例如 tRNA 转为 RF00005。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `family_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence`

通过 Rfam 官方批量端点搜索 RNA 序列。等待期间保留返回的作业身份，尚未完成的响应不代表零匹配。完成后检查命中结果和来源信息；响应失败时先诊断或恢复已有作业，不要反复提交。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `sequence` | 字符串 | **必填** |
| `max_wait_s` | 数值 | 可选; 默认值： 300 |
| `poll_interval_s` | 数值 | 可选; 默认值： 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## 组学档案 {/* #family-18 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `ena_query_runs`

按 tax_id、library_strategy 或 keyword 发现公开 ENA 运行；至少提供一个条件，组合条件按 AND 匹配。返回查询表达式、元数据、实际返回数与 truncated。物种条件包含分类后代；关键词查询标题和描述，不接受任意 ENA 查询语法。最多返回 1000 条，无分页游标；截断时缩小条件。n_runs_returned 不是全部匹配数。

至少提供一个列出的检索条件；完整组合约束见下载的 schema。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `tax_id` | integer | 可选; minimum: `1`; maximum: `2147483647` |
| `library_strategy` | string | 可选; enum: `["AMPLICON", "ATAC-seq", "Bisulfite-Seq", "CLONE", "CLONEEND", "CTS", "ChIA-PET", "ChIP-Seq", "ChM-Seq", "DNase-Hypersensitivity", "EST", "FAIRE-seq", "FINISHING", "FL-cDNA", "GBS", "Hi-C", "MBD-Seq", "MNase-Seq", "MRE-Seq", "MeDIP-Seq", "NOMe-Seq", "OTHER", "POOLCLONE", "RAD-Seq", "RIP-Seq", "RNA-Seq", "Ribo-Seq", "SELEX", "Synthetic-Long-Read", "Targeted-Capture", "Tethered Chromatin Conformation Capture", "Tn-Seq", "VALIDATION", "WCS", "WGA", "WGS", "WXS", "miRNA-Seq", "ncRNA-Seq", "snRNA-seq", "ssRNA-seq"]` |
| `keyword` | string | 可选; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `limit` | integer | 可选; default: `100`; minimum: `1`; maximum: `1000` |

```javascript
const result = await host.mcp("omics-archives", "ena_query_runs", {"tax_id": 6239, "library_strategy": "RNA-Seq", "keyword": "transcriptome", "limit": 20})
```

### `ena_get_submitted_files`

查询某个 ERR/SRR/DRR 运行的原始提交文件清单，包括上游路径、格式、大小和 MD5；与 ena_get_run_files 的归档生成 FASTQ 分开。found=true 但 submitted_available=false 表示没有列出提交文件，不表示运行不存在。ftp_location 保留上游路径，可能没有协议前缀，文件名可能含字面 #，不能当作已经编码的 URL 直接解析。此操作不下载或校验文件。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `run_accession` | string | **必填**; minLength: `1`; maxLength: `64` |

```javascript
const result = await host.mcp("omics-archives", "ena_get_submitted_files", {"run_accession": "ERR10015065"})
```

### `ena_search_runs`

按 ENA/INSDC 的项目、实验、样本或运行登录号查找公开测序运行，返回物种、平台与文库元数据，不下载文件。GEO GSE/GSM、E-MTAB 和 MGYS 需先找到关联的 INSDC 登录号。本工具不是关键词检索；最多返回 1000 条，无分页游标，重复调用不能补齐截断队列。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填**; 最短长度: 1; 最长长度: 64 |
| `limit` | 整数 | 可选; 默认值: 100; 最小值: 1; 最大值: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files`

查询一个 ERR/SRR/DRR 运行的归档生成 FASTQ 清单，包括 URL、字节数及上游 MD5，不下载或校验文件。PAIRED 不保证恰有两个文件；file_index 仅代表报告顺序，不代表 R1/R2。已找到运行但未列出 FASTQ，与未找到运行不同；提交的 BAM/CRAM/SRA 不在本工具范围。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `run_accession` | 字符串 | **必填**; 最短长度: 1; 最长长度: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments`

检索 ArrayExpress/BioStudies 功能基因组实验。关键词、物种、研究类型、技术、发布日期和额外分面组合为 AND；完整获取并按 totalHits 核对。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `study_type` | 字符串 | 可选 |
| `technology` | 字符串 | 可选 |
| `released_after` | 字符串 | 可选 |
| `released_before` | 字符串 | 可选 |
| `extra_facets` | 对象 | 可选 |
| `max_records` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment`

获取一个 ArrayExpress 实验的整理元数据，包括类型、物种、样本/测定数量、设计、因子、作者、文献、方案、阵列和文件摘要。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files`

列出一个 ArrayExpress 实验的全部文件、名称、大小、类型、格式、说明与下载 URL，并附带 /info 报告的文件数供对照。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples`

获取 ArrayExpress 实验逐样本 SDRF 注释，保留 MAGE-TAB 原始表头，重复列添加序号。无 SDRF 时返回 error 为 no_sdrf。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |
| `max_rows_returned` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series`

搜索 GEO DataSets 并返回系列级元数据。term 使用 E-utilities 语法，可加入 gse[ETYP] 限制为 Series。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `term` | 字符串 | **必填** |
| `retmax` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series`

按 GSE 登录号获取 GEO 系列结构化元数据，包括设计、平台、样本特征、建库信息和补充文件 URL。此操作不会下载数据表。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies`

列出全部公开 MetaboLights 登录号并按数字排序，附服务报告总数。上游没有研究搜索接口，应在候选元数据中筛选标题或描述。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies`

按 MTBLS 登录号获取 MetaboLights 的 ISA 元数据，包括标题、状态、年份、物种、测定、因子、样本数和方案；可附逐样本表。未知或私有项目列入 not_found。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |
| `include_samples` | 布尔值 | 可选; 默认值： false |
| `max_sample_rows_returned` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files`

获取公开 MetaboLights 研究的完整文件清单，包括顶层 ISA-Tab、MAF、目录项，默认递归获取 FILES 数据目录。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |
| `include_data_files` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files`

在 MetaboLights 研究的 FILES 目录中按 glob 匹配原始数据文件，如 *.mzML；省略 pattern 时列出全部数据文件。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |
| `pattern` | 字符串 | 可选 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies`

按自由文本或 biome 谱系查找 MGnify 宏基因组研究，两种输入必须二选一。完整分页并核对服务数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | 可选 |
| `biome_lineage` | 字符串 | 可选 |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies`

按 MGYS 登录号获取 MGnify 研究记录；include_analyses 可附完整分析列表及按流程/实验类型的汇总。未知 ID 列入 missing。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |
| `include_analyses` | 布尔值 | 可选; 默认值： false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses`

完整列出一个 MGnify 研究的全部 MGYA 分析，包含流程版本、实验类型、状态和 run/assembly/sample ID，并核对分页数量。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_get_project_files`

按 PXD／PRD 项目登录号分页列出 PRIDE 文件，page 从 0 开始。保留文件类别、大小、校验文本与传输位置，并根据 next_page 继续查询。api_total 为空时不能推断总量；缺失值保留 null。不要猜测校验算法或把 Aspera 地址当作 HTTP 下载地址；返回文件清单不等于完成下载。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `project_accession` | string | **必填**; maxLength: `32`; pattern: `"^(?:PXD\|PRD)[0-9]{6,}$"` |
| `page` | integer | 可选; default: `0`; minimum: `0`; maximum: `1000000` |
| `page_size` | integer | 可选; default: `100`; minimum: `1`; maximum: `100` |

```javascript
const result = await host.mcp("omics-archives", "pride_get_project_files", {"project_accession": "PXD000001", "page": 0, "page_size": 100})
```

### `pride_search_projects`

检索 PRIDE 蛋白质组项目。关键词、物种、仪器、疾病与额外条件组合为 AND；完整获取并核对 api_total，按登录号升序返回。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `keyword` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `instrument` | 字符串 | 可选 |
| `disease` | 字符串 | 可选 |
| `extra_filters` | 对象 | 可选 |
| `max_records_returned` | 整数 | 可选; 默认值： 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects`

按 PXD 等登录号获取 PRIDE 项目完整元数据，与搜索结果使用相同记录结构。未知 ID 列入 not_found。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accessions` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins`

完整获取一个 PRIDE 亲和蛋白质组项目的蛋白证据行。此接口仅服务亲和蛋白质组；传统质谱 PXD 项目应使用 pride_find_projects_for_protein。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `project_accession` | 字符串 | **必填** |
| `keyword` | 字符串 | 可选 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein`

按 UniProt 登录号查找包含该蛋白的 PRIDE 质谱项目，再将返回的项目 ID 交给 pride_get_projects 获取详情。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `protein_accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## CellGuide {/* #family-19 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `get_cell_type_info`

按 Cell Ontology ID 或名称获取 CellGuide 细胞类型详情，包含同义词、本体定义及人工/GPT 描述。解读描述时注意来源类型。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cell_type` | 字符串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types`

按名称和同义词自由文本搜索 CellGuide 细胞类型；工具在下载的元数据目录中筛选。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `limit` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes`

获取 CellGuide 细胞类型的标记基因，可选择计算得到并带分数的标记，或文献整理的经典标记。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cell_type` | 字符串 | **必填** |
| `marker_type` | 字符串 | 可选; 默认值： &quot;computational&quot;; 枚举： [&quot;computational&quot;, &quot;canonical&quot;] |
| `limit` | 整数 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data`

获取 CellGuide 某细胞类型的来源数据集与文献，包括集合 URL 及其覆盖组织、疾病和物种。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cell_type` | 字符串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues`

汇总 CellGuide 来源集合中观察到某细胞类型的组织，并对组织去重。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `cell_type` | 字符串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## 调控 {/* #family-20 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `encode_search_experiments`

检索 ENCODE 功能基因组实验，可按 assay_title、靶标、物种、状态、发布日期及额外门户字段筛选。完整分页核对；accessions 保留全部匹配 ID，摘要行受 max_rows 限制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `assay_title` | 字符串 | 可选 |
| `target` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `status` | 字符串 | 可选; 默认值： &quot;released&quot; |
| `date_released_before` | 字符串 | 可选 |
| `extra_filters` | 对象 | 可选 |
| `max_rows` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples`

检索 ENCODE 细胞系、组织或原代细胞样本，可按本体名称、分类、物种、状态和创建日期筛选。完整核对匹配数；accessions 为完整列表，摘要行有上限。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `term_name` | 字符串 | 可选 |
| `classification` | 字符串 | 可选 |
| `organism` | 字符串 | 可选 |
| `status` | 字符串 | 可选; 默认值： &quot;released&quot; |
| `date_created_before` | 字符串 | 可选 |
| `extra_filters` | 对象 | 可选 |
| `max_rows` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files`

按格式、测定和样本检索 ENCODE 文件。assay_term_name 使用本体名称（如 ChIP-seq），显示名称 TF ChIP-seq 应通过 extra_filters 的 assay_title 传递。无筛选结果极大，应组合多个条件；摘要行受 max_rows 限制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `file_format` | 字符串 | 可选 |
| `assay_term_name` | 字符串 | 可选 |
| `biosample_term_name` | 字符串 | 可选 |
| `status` | 字符串 | 可选; 默认值： &quot;released&quot; |
| `date_created_before` | 字符串 | 可选 |
| `extra_filters` | 对象 | 可选 |
| `max_rows` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment`

按 ENCSR 登录号获取 ENCODE 实验的稳定字段，包括测定、靶标、样本、实验室、项目、日期、组装、重复数和 DOI。易变门户审核/内部状态不在记录中。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file`

按 ENCFF 登录号获取 ENCODE 文件的格式、输出类型、测定、组装、数据集、重复、大小、MD5、读长和下载地址。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample`

按 ENCBS 登录号获取 ENCODE 生物样本的本体、分类、物种、供体、处理、遗传修饰、年龄、性别、实验室及状态等信息。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `accession` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix`

按带版本的 JASPAR matrix ID 获取 TF 结合谱、PFM、分类、物种、文献和 logo URL。必须使用 MA0002.2 这样的完整版本 ID；先用 jaspar_matrix_versions 确认版本。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `matrix_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions`

列出 JASPAR 基础矩阵 ID 的全部版本，返回 matrix_id、名称、集合和 URL 并核对数量。带版本输入会归并到基础 ID，可据此固定后续查询版本。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `base_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices`

检索 JASPAR 结合谱，可按集合、分类群、NCBI tax_id、TF 名称或自由文本筛选，version=latest 可仅取最新版本。完整分页核对；摘要行受 max_rows 限制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `collection` | 字符串 | 可选 |
| `tax_group` | 字符串 | 可选 |
| `tax_id` | 整数 | 可选 |
| `name` | 字符串 | 可选 |
| `search` | 字符串 | 可选 |
| `version` | 字符串 | 可选 |
| `max_rows` | 整数 | 可选; 默认值： 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species`

列出有 JASPAR 结合谱的全部物种与 NCBI tax_id，核对数量；tax_id 可供矩阵查询使用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa`

列出 JASPAR 分类群，如 vertebrates、plants、fungi；名称可用于 tax_group 筛选。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections`

列出 JASPAR 集合及名称，供 collection 筛选。CORE 表示整理后的非冗余结合谱。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases`

列出 JASPAR 数据发布的年份、编号和 active 标志。选择 motif 时记录所用发布，以便后续比较。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs`

检索 UniBind ChIP-seq 高置信 TFBS 数据集，每项对应实验、细胞类型与 TF。条件组合为 AND，除 search 外主要为精确匹配；collection 区分 Robust 与 Permissive。total 是实际总数，max_rows 限制返回摘要。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `tf_name` | 字符串 | 可选 |
| `cell_line` | 字符串 | 可选 |
| `species` | 字符串 | 可选 |
| `collection` | 字符串 | 可选; 枚举： [&quot;Robust&quot;, &quot;Permissive&quot;] |
| `jaspar_id` | 字符串 | 可选 |
| `search` | 字符串 | 可选 |
| `max_rows` | 整数 | 可选; 默认值： 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset`

按搜索返回的 tf_id 获取 UniBind 数据集详情，包括来源、TF、条件、JASPAR ID、峰数及逐模型 TFBS 数量/阈值。完整结合位点通过返回的 BED/FASTA URL 下载，而非另一次 MCP 调用。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `tf_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region`

通过 UCSC hubApi 获取与区域重叠的 UniBind TFBS。使用支持的 UCSC 组装、chr 前缀及从 0 开始的半开区间；窗口不超过 1000000 bp。每次最多扫描 20000 项，region_scan_complete 为 false 时应缩小窗口，尤其不能将筛选后未命中解释为没有位点。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `genome` | 字符串 | **必填** |
| `chrom` | 字符串 | **必填** |
| `start` | 整数 | **必填** |
| `end` | 整数 | **必填** |
| `tf_name` | 字符串 | 可选 |
| `collection` | 字符串 | 可选; 默认值： &quot;Robust&quot;; 枚举： [&quot;Robust&quot;, &quot;Permissive&quot;] |
| `max_sites` | 整数 | 可选; 默认值： 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## 科研资源 {/* #family-21 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search_grants`

检索 Grants.gov 资助机会，至少提供一个条件。默认状态为 forecasted 和 posted；历史机会需加入 closed/archived。count_only 只取数量与分面，max_records 限制输出行，完整获取与截断状态分别报告。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `keyword` | 字符串 | 可选 |
| `opportunity_number` | 字符串 | 可选 |
| `aln` | 字符串 | 可选 |
| `agencies` | 字符串数组 | 可选 |
| `opportunity_statuses` | 字符串数组 | 可选 |
| `eligibilities` | 字符串数组 | 可选 |
| `funding_categories` | 字符串数组 | 可选 |
| `funding_instruments` | 字符串数组 | 可选 |
| `count_only` | 布尔值 | 可选; 默认值： false |
| `max_records` | 整数 | 可选; 默认值： 100 |
| `include_facets` | 布尔值 | 可选; 默认值： true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies`

全文检索 Antibody Registry，按抗体名称、靶标和目录文本进行词项匹配，TP53 与 p53 是不同查询。匿名访问深度受限，超出 offset 500 会标记 anonymous_limit_hit；指定页时从 1 开始并遵守该上限。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `query` | 字符串 | **必填** |
| `page` | 整数 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 100 |
| `max_records` | 整数 | 可选; 默认值： 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody`

按数字、AB_ 或 RRID:AB_ 标识获取抗体详情。一个登录号可能对应多个整理记录；不存在时 record_count 为 0，不作为异常。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `antibody_id` | 字符串 | **必填** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog`

按供应商目录号精确匹配抗体，不区分大小写；可加供应商名称缩小结果。工具使用全文候选加本地精确筛选，以处理上游列筛选接口错误。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `catalog_number` | 字符串 | **必填** |
| `vendor` | 字符串 | 可选 |
| `page_size` | 整数 | 可选; 默认值： 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats`

获取 Antibody Registry 抗体总数及最近更新日期，返回上游统计内容。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart {/* #family-22 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `list_marts`

列出 Ensembl BioMart 数据库。查询层级为 mart → dataset → attributes/filters，返回的 mart 名用于 list_datasets。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| — | 对象 | No fields; pass an empty 对象. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets`

列出指定 mart 的数据集，返回名称可用于字段、筛选与数据查询。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes`

列出数据集常用字段的精选子集，建议在请求完整字段表前使用。mart 参数仅为签名兼容而保留，实际查询由 dataset 决定。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes`

列出数据集可用字段，排除体量较大的同源与芯片探针字段。结果可能很大，优先使用 list_common_attributes；mart 不参与实际查询。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters`

列出数据集可用筛选字段，如染色体和 biotype，可作为 get_data 的 filters 字典。实际查询由 dataset 决定，mart 不参与。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data`

执行 BioMart 数据查询，返回指定 attributes，可由 filters 限定范围。实际使用 dataset 定位数据，mart 参数不参与查询。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |
| `attributes` | 字符串数组 | **必填** |
| `filters` | 对象 | 可选 |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation`

在一个 BioMart 数据集中，将单个标识从一种属性类型映射为另一种；实际查询由 dataset 决定，mart 不参与。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |
| `from_attr` | 字符串 | **必填** |
| `to_attr` | 字符串 | **必填** |
| `target` | 字符串 | **必填** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate`

在同一次 BioMart 查询中批量映射多个标识，比逐次 get_translation 更高效。实际查询由 dataset 决定，mart 不参与。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `mart` | 字符串 | **必填** |
| `dataset` | 字符串 | **必填** |
| `from_attr` | 字符串 | **必填** |
| `to_attr` | 字符串 | **必填** |
| `targets` | 字符串数组 | **必填** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## ZINC {/* #family-23 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `zinc_search_by_id`

批量按最多 100 个 ZINC ID 查询可购买化合物及供应来源。上游采用提交加轮询，耗时受 timeout_s 限制。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `zinc_ids` | ['字符串', '数组'] | **必填** |
| `max_results` | 整数 | 可选; 默认值： 50 |
| `timeout_s` | 数值 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles`

按 SMILES 检索 ZINC22 可购买化学空间，dist 控制从精确到相似结构的范围；无需单独相似性工具。此查询较慢，建议逐步增大 dist。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `smiles` | 字符串 | **必填** |
| `dist` | 整数 | 可选; 默认值： 0 |
| `adist` | 整数 | 可选 |
| `max_results` | 整数 | 可选; 默认值： 50 |
| `timeout_s` | 数值 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier`

批量将最多 100 个供应商目录号解析为 ZINC 化合物及结构。上游使用提交加轮询。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `supplier_codes` | ['字符串', '数组'] | **必填** |
| `max_results` | 整数 | 可选; 默认值： 50 |
| `timeout_s` | 数值 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample`

从 ZINC22 随机抽取可购买化合物，用于筛选集合、属性基线或诱饵集。count 同时为结果上限；再次调用会重新抽样。上游使用提交加轮询。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `count` | 整数 | 可选; 默认值： 50 |
| `subset` | 字符串 | 可选 |
| `timeout_s` | 数值 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d`

为 ZINC 化合物定位适合对接的预生成三维构象文件，如 db2.gz、mol2.gz、sdf.gz。按 tranche 返回下载位置，每次最多 50 个 ID；此操作解析地址，后续仍需下载并准备对接输入。

| 字段 | 类型 | 要求与约束 |
| --- | --- | --- |
| `zinc_ids` | ['字符串', '数组'] | **必填** |
| `timeout_s` | 数值 | 可选; 默认值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## 示例响应记录

<ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">示例响应记录</ExampleDownload>提供准确输入、截短的响应片段和逐项状态。请区分返回记录、空匹配和请求失败。结果可能是元数据、结构说明或标识符；用于研究前，先核对来源字段与完整性标记。

## GDC {/* #family-24 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `gdc_list_projects`

分页列出 GDC 癌症项目及病例、文件汇总。筛选条件和结果数量有明确边界，此操作只发现元数据，不下载文件。页码从 1 开始，最多 10000 页；next_page 为空也可能因为总量未知或达到页数上限，不能单独证明已获取全部结果。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `project_ids` | string / array | 可选 |
| `disease_type` | string | 可选; minLength: 1; maxLength: 200 |
| `primary_site` | string | 可选; minLength: 1; maxLength: 200 |
| `page` | integer | 可选; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可选; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_projects", {"project_ids": "TCGA-BRCA", "page_size": 5})
```

### `gdc_list_cases`

分页列出 GDC 病例（样本提供者）的项目和疾病元数据，不读取或下载受控数据。页码从 1 开始，最多 10000 页；结合 total、total_relation 与 next_page 判断范围，达到分页上限时缩小筛选条件。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `project_ids` | string / array | 可选 |
| `submitter_ids` | string / array | 可选 |
| `case_ids` | string / array | 可选 |
| `page` | integer | 可选; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可选; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_cases", {"project_ids": ["TCGA-BRCA"], "page_size": 5})
```

### `gdc_search_files`

检索 GDC 文件清单，逐项标明 open 或 controlled。只返回元数据，不下载文件或授予访问权限；受控文件不提供可下载 URL，状态为 requires_authorization。access_summary 只描述当前页。project_id 是单个关联项目摘要，不代表完整关联集合。next_page 为空不一定表示全部匹配已取完。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `project_ids` | string / array | 可选 |
| `access` | string | 可选; default: &quot;all&quot;; enum: [&quot;all&quot;, &quot;open&quot;, &quot;controlled&quot;] |
| `data_category` | string | 可选; minLength: 1; maxLength: 200 |
| `data_type` | string | 可选; minLength: 1; maxLength: 200 |
| `data_format` | string | 可选; minLength: 1; maxLength: 50 |
| `file_name` | string | 可选; minLength: 1; maxLength: 500 |
| `page` | integer | 可选; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可选; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_search_files", {"project_ids": ["TCGA-BRCA"], "access": "open", "page_size": 10})
```

### `gdc_get_file`

按一个 GDC 文件 UUID 获取元数据和 open／controlled 访问类别，不下载文件，也不保证当前用户可下载。只有公开文件返回 download_url；受控文件需在此元数据查询之外取得 GDC 授权及相应令牌。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `file_id` | string | **必填**; pattern: &quot;^[0-9a-fA-F]&#123;8&#125;-[0-9a-fA-F]&#123;4&#125;-[1-5][0-9a-fA-F]&#123;3&#125;-[89abAB][0-9a-fA-F]&#123;3&#125;-[0-9a-fA-F]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("gdc", "gdc_get_file", {"file_id": "cb92f61d-041c-4424-a3e9-891b7545f351"})
```

### `gdc_get_manifest`

为最多 100 个文件 UUID 生成 GDC Data Transfer Tool 清单文本。清单不下载文件，也不绕过受控访问授权。按 UUID 对应返回行，不依赖请求顺序。任一 UUID 不存在时请求以 HTTP 404 失败，而非返回部分成功清单。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `file_ids` | array of string | **必填**; minItems: 1; maxItems: 100; uniqueItems: true |

```javascript
const result = await host.mcp("gdc", "gdc_get_manifest", {"file_ids": ["cb92f61d-041c-4424-a3e9-891b7545f351"]})
```

</ToolOperationGroup>

## Zenodo {/* #family-25 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search_records`

使用 Zenodo 查询语法检索公开记录，单次最多 25 条，无需认证。默认仅列出最新版本，all_versions 可包含旧版本。翻页时保持 query、page_size、sort 和 all_versions 不变。检索窗口最多 10000 条，pagination_limited 为 true 时需缩小查询。公开元数据不代表文件开放下载；total_relation 区分精确总量 eq 与下界 gte。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `query` | string | **必填**; minLength: 1; maxLength: 1000; pattern: &quot;\\S&quot; |
| `page` | integer | 可选; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可选; default: 10; minimum: 1; maximum: 25 |
| `sort` | string | 可选; default: &quot;bestmatch&quot;; enum: [&quot;bestmatch&quot;, &quot;mostrecent&quot;] |
| `all_versions` | boolean | 可选; default: false |

```javascript
const result = await host.mcp("zenodo", "search_records", {"query": "title:climate", "page_size": 5})
```

### `get_record`

按十进制记录 ID 获取 Zenodo 公开元数据及可见文件清单，不接受 DOI 或 URL。概念 ID 可能解析到最新版本，应保存返回的版本级 record_id，区分 requested_record_id 与 concept_record_id。description_html 为未经净化的上游 HTML。文件链接和校验值仅为元数据，不代表已下载、校验或探测访问。文件清单为 null 表示缺失，空数组表示明确返回空清单；受限记录的公开元数据不保证文件可访问。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `record_id` | string | **必填**; maxLength: 20; pattern: &quot;^[1-9][0-9]*$&quot; |

```javascript
const result = await host.mcp("zenodo", "get_record", {"record_id": "8435696"})
```

</ToolOperationGroup>

## HMMER {/* #family-26 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `search` {/* #hmmer-search */}

提交一次异步 EMBL-EBI HMMER3 搜索。program 可选 phmmer（蛋白序列对序列库）、hmmscan（蛋白序列对 Pfam 模型）、hmmsearch（profile HMM／比对对序列库）或 jackhmmer（迭代远缘同源检索）。input 使用该程序支持的 FASTA、profile HMM 或比对文本，database 为提供方数据库名。阈值使用 HMMER 参数 incE/incdomE、E/domE、incT/incdomT、T/domT；iterations 控制 jackhmmer 轮数。保存返回的 job_id，再查询 status。提交不等于完成；响应丢失可能已有远端任务，不要自动重提。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `program` | string | **必填**; enum: [&quot;phmmer&quot;, &quot;hmmscan&quot;, &quot;hmmsearch&quot;, &quot;jackhmmer&quot;] |
| `database` | string | **必填**; enum: [&quot;refprot&quot;, &quot;uniprot&quot;, &quot;swissprot&quot;, &quot;pdb&quot;, &quot;rp15&quot;, &quot;rp35&quot;, &quot;rp55&quot;, &quot;rp75&quot;, &quot;pfam&quot;] |
| `input` | string | **必填**; minLength: 1; maxLength: 200000 |
| `incE` | number | 可选; exclusiveMinimum: 0; maximum: 10 |
| `incdomE` | number | 可选; exclusiveMinimum: 0; maximum: 10 |
| `incT` | number | 可选; exclusiveMinimum: 0 |
| `incdomT` | number | 可选; exclusiveMinimum: 0 |
| `E` | number | 可选; exclusiveMinimum: 0; maximum: 10 |
| `domE` | number | 可选; exclusiveMinimum: 0; maximum: 10 |
| `T` | number | 可选; exclusiveMinimum: 0 |
| `domT` | number | 可选; exclusiveMinimum: 0 |
| `popen` | number | 可选; minimum: 0 |
| `pextend` | number | 可选; minimum: 0 |
| `mx` | string | 可选; enum: [&quot;BLOSUM45&quot;, &quot;BLOSUM62&quot;, &quot;BLOSUM90&quot;, &quot;PAM30&quot;, &quot;PAM70&quot;] |
| `iterations` | integer | 可选; minimum: 1; maximum: 9 |

```javascript
const result = await host.mcp("hmmer", "search", {"program":"hmmscan","database":"pfam","input":">query\nMKTIIALSYIFCLVFADYKDDDDK"})
```

### `status` {/* #hmmer-status */}

查询一次已有 HMMER 任务，不自动轮询或重提。SUCCESS 表示可获取结果，PENDING／RUNNING 表示等待后再查；ERROR／FAILURE／NOT_FOUND 是终止状态，不等于零命中。保留准确 job_id。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 36; pattern: &quot;^[A-Fa-f0-9]&#123;8&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "status", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

### `results` {/* #hmmer-results */}

先查询一次状态，仅 SUCCESS 时读取包含结构域注释的全部结果页。等待或失败时不返回结果载荷；jackhmmer 迭代记录保留提供方数组结构。结果保留期有限，应保存到 Notebook 产物。成功后的空匹配列表是零命中，不能与等待或失败混淆。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 36; pattern: &quot;^[A-Fa-f0-9]&#123;8&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;4&#125;-[A-Fa-f0-9]&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "results", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

</ToolOperationGroup>

## InterProScan {/* #family-27 */}

<ToolOperationGroup>
<summary>展开操作与参数</summary>

### `status` {/* #interproscan-status */}

通过已有 job_id 查询一次 InterProScan 注释任务，至少间隔 10 秒再查。FINISHED 后可获取结果；ERROR／FAILURE 表示失败，NOT_FOUND 表示未知或过期，不是零命中。此连接器不提交或重提任务。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 200; pattern: &quot;^[A-Za-z0-9][A-Za-z0-9_-]&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "status", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

### `results` {/* #interproscan-results */}

先查询一次状态，仅 FINISHED 时获取完整 TSV 报告，上限 2 MiB，超限报错而不截断。不自动重试、轮询或重提。及时保存报告，避免提供方结果过期。每行对应一个 signature 匹配；坐标从 1 开始且包含两端，分数含义由各分析程序决定，可选列含 InterPro、GO 与通路注释。FINISHED 后的空报告表示没有返回匹配，不证明蛋白没有功能。

| 字段 | 类型 | 必填与约束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 200; pattern: &quot;^[A-Za-z0-9][A-Za-z0-9_-]&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "results", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

</ToolOperationGroup>
