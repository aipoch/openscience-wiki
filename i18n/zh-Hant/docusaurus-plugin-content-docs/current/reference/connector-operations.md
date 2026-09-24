---
title: "Connector 操作引數參考"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';
import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connector 操作引數參考 {/* #connector-操作参数参考 */}

查詢具體操作名、必填欄位、預設值與呼叫示例。選擇資料來源請先看[科學資料庫目錄](../tools/databases.md)，再展開需要呼叫的 Connector。引數正確不代表服務已連線或憑據已配置。

## 示例呼叫在哪裡執行 {/* #示例调用在哪里运行 */}

`host` 由 Open-Science 的 Agent 執行環境提供。下方 JavaScript 是 **Agent 側呼叫片段**，不是獨立 Node.js 程式，也不是公共 Task SDK 客戶端的方法。讓 Agent 載入對應 Connector 說明並使用相應操作；某些框架會使用 Python 橋接，而不是這裡的 JavaScript 形式。

先在 [Settings → Connectors](../guides/connectors.md) 啟用連線，配置[所需憑據](../tools/credentials.md)；使用 Specialist 時還需分配該能力。呼叫仍遵循會話權限策略。公共 Node.js 整合可用 [Task SDK](api.md) 管理 Connector 配置，但匯入該客戶端不會得到這裡的 `host`。

### 先讀返回結果，再串聯呼叫 {/* #先读返回结果再串联调用 */}

<p className="example-label"><strong>示例</strong> 使用 PubMed 返回的 PMID 查詢後設資料</p>

例如請求：**用 PubMed 搜尋 PRISMA 報告規範，返回匹配總數及五個 PMID。** `search_articles` 返回總數和一頁標識，再將其中的 PMID 傳給 `get_article_metadata` 獲取標題、作者和 DOI 連結。空結果、截斷結果與認證失敗需要分別處理。

| 返回資訊 | 用途 |
| --- | --- |
| 匹配總數與返回行數 | 區分一頁資料與完整結果集 |
| `truncated`、`records_truncated` 或各資料來源的完整性標誌 | 判斷是否翻頁、縮小條件或繼續獲取 |
| `not_found`、`missing`、`not_processed` | 找出未解決輸入，只重試適當條目 |
| DOI、登入號、來源 URL、資料釋出或組裝 | 保留下次查詢需要的身份與來源 |
| 全文狀態或許可說明 | 判斷是否取得文字、是否允許複用 |

各操作返回欄位不同，下方描述與可下載 schema 定義對應契約；此表不是統一 JSON 格式。可從右側資料來源目錄跳轉，再展開該類引數。搜尋具體操作名也會展開其所在分組。

&#42;&#42;區分查詢失敗與空結果。&#42;&#42;v0.30.2 中，CellGuide 的標記、來源和組織查詢會報告獲取失敗，不再把它當作空證據；可選資料檔案確實不存在時仍可能為空。OLS 關係查詢會拒絕分頁不完整或無效響應。服務錯誤不能證明某細胞型別沒有標記，或某本體術語沒有關聯項。

## 操作輸入 {/* #操作输入 */}

每次展開一個 Connector。必填項標為 **必填**，本頁與下載目錄依據 Open-Science **v0.33.1** 的結構定義。以巢狀的 `input.required` 為準；舊式頂層 `required` 可能不存在。<ExampleDownload path="/examples/capabilities/connector-catalog-v0.33.1.json">完整登錄檔下載</ExampleDownload>提供巢狀 JSON、完整返回說明和準確 Agent 側呼叫示例。工具要求 `accessions`、`cids`、`rs_id` 等專用欄位時，不要統一改為 `id`。


## 化學 {/* #family-1 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `pubchem_search_compounds` {/* #pubchem_search_compounds */}

將化合物名稱、SMILES、InChIKey 或 CID 解析為 PubChem CID，可同時返回前幾項結果的核心計算屬性。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `namespace` | 字串 | 可選; 預設值： &quot;name&quot;; 列舉： &#91;&quot;name&quot;, &quot;smiles&quot;, &quot;inchikey&quot;, &quot;cid&quot;&#93; |
| `max_cids` | 整數 | 可選; 預設值： 25; 最小值： 1; 最大值： 100 |
| `with_properties` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("chemistry", "pubchem_search_compounds", {"query": "aspirin", "max_cids": 25})
```

### `pubchem_get_compounds` {/* #pubchem_get_compounds */}

批次獲取 PubChem CID 對應的完整計算屬性，可附帶有數量上限的同義詞列表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cids` | 整數陣列 | **必填**; 最少項數： 1; 最多項數： 50 |
| `include_synonyms` | 布林值 | 可選; 預設值： false |
| `max_synonyms` | 整數 | 可選; 預設值： 30 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_compounds", {"cids": [2244, 2519], "include_synonyms": false})
```

### `pubchem_similarity_search` {/* #pubchem_similarity_search */}

根據 SMILES 在 PubChem 中進行二維 Tanimoto 相似性檢索。使用同步 fastsimilarity_2d 介面，無需輪詢任務。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `smiles` | 字串 | **必填** |
| `threshold` | 整數 | 可選; 預設值： 90; 最小值： 1; 最大值： 100 |
| `max_records` | 整數 | 可選; 預設值： 50; 最小值： 1; 最大值： 200 |
| `with_properties` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("chemistry", "pubchem_similarity_search", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "threshold": 90})
```

### `pubchem_get_bioassay_summary` {/* #pubchem_get_bioassay_summary */}

獲取一個 PubChem 化合物的生物測定活動彙總，包括測定專案、靶標、結果與效力。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cid` | 整數 | **必填** |
| `active_only` | 布林值 | 可選; 預設值： false |
| `max_rows` | 整數 | 可選; 預設值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_bioassay_summary", {"cid": 2244, "active_only": true})
```

### `pubchem_get_safety` {/* #pubchem_get_safety */}

獲取一個 PubChem 化合物的 GHS 安全分類，彙總 PUG-View 中各報告來源的資訊。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cid` | 整數 | **必填** |

```javascript
const result = await host.mcp("chemistry", "pubchem_get_safety", {"cid": 702})
```

### `chebi_search` {/* #chebi_search */}

按名稱、同義詞、分子式或 InChIKey 全文檢索 ChEBI 實體。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `term` | 字串 | **必填** |
| `max_results` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 100 |
| `page` | 整數 | 可選; 預設值： 1; 最小值： 1 |

```javascript
const result = await host.mcp("chemistry", "chebi_search", {"term": "caffeine", "max_results": 20})
```

### `chebi_get_entity` {/* #chebi_get_entity */}

獲取 ChEBI 實體的名稱、結構、化學資料、角色和交叉引用。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chebi_id` | 字串 | **必填** |
| `max_synonyms` | 整數 | 可選; 預設值： 30 |
| `max_xrefs` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_entity", {"chebi_id": "CHEBI:27732"})
```

### `chebi_get_ontology` {/* #chebi_get_ontology */}

獲取 ChEBI 實體的本體關係，包括指向父類、角色或共軛酸等關係，以及指向該實體的子類與衍生物關係。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chebi_id` | 字串 | **必填** |
| `relation_type` | 字串 | 可選 |
| `max_relations` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("chemistry", "chebi_get_ontology", {"chebi_id": "CHEBI:27732", "relation_type": "has role"})
```

### `rhea_search_reactions` {/* #rhea_search_reactions */}

按反應方程文字、參與物 ChEBI ID 或 EC 編號檢索 Rhea 主反應，自動識別查詢型別。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `limit` | 整數 | 可選; 預設值： 50; 最小值： 1; 最大值： 500 |

```javascript
const result = await host.mcp("chemistry", "rhea_search_reactions", {"query": "caffeine", "limit": 50})
```

### `rhea_get_reaction` {/* #rhea_get_reaction */}

獲取一個 Rhea 反應的方程、帶化學計量的參與物、EC 關聯、方向家族及文獻。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `rhea_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("chemistry", "rhea_get_reaction", {"rhea_id": "10280"})
```

### `bindingdb_ligands_by_target` {/* #bindingdb_ligands_by_target */}

按 UniProt 登入號獲取 BindingDB 中針對該蛋白靶標測得的配體親和力，包括 Ki、Kd、IC50 和 EC50。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `uniprot` | 字串 | **必填** |
| `affinity_cutoff_nm` | 數值 | 可選; 預設值： 10000 |
| `max_rows` | 整數 | 可選; 預設值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_ligands_by_target", {"uniprot": "P00533", "affinity_cutoff_nm": 100})
```

### `bindingdb_targets_by_compound` {/* #bindingdb_targets_by_compound */}

查詢與輸入 SMILES 在二維結構上相似的化合物，以及這些化合物具有實測親和力的蛋白靶標。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `smiles` | 字串 | **必填** |
| `similarity` | 數值 | 可選; 預設值： 0.85; 最小值： 0.5; 最大值： 1 |
| `max_rows` | 整數 | 可選; 預設值： 100; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chemistry", "bindingdb_targets_by_compound", {"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O", "similarity": 0.85})
```

</ToolOperationGroup>

## 文獻關係 {/* #family-2 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `openalex_search_works` {/* #openalex_search_works */}

檢索 OpenAlex 學術成果，可按年份、型別、開放獲取狀態和發表來源篩選。query 可在已有其他篩選條件時省略；venue 接受來源 ID、URL、ISSN 或名稱，名稱解析結果見 venue_resolved。返回 api_total、n_records_returned、records_truncated 和 records。摘要僅在明確開放許可（cc-by、cc-by-sa、cc0、public-domain）下重建；其他記錄的 abstract 為 null，並說明許可策略。記錄包含標識、作者、來源、引用數、開放全文地址與主題。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |
| `year_from` | 整數 | 可選 |
| `year_to` | 整數 | 可選 |
| `work_type` | 字串 | 可選 |
| `open_access_only` | 布林值 | 可選 |
| `venue` | 字串 | 可選 |
| `sort` | 字串 | 可選; 預設值： &quot;relevance&quot;; 列舉： &#91;&quot;relevance&quot;, &quot;cited_by_count&quot;, &quot;publication_date&quot;&#93; |
| `max_records` | 整數 | 可選; 預設值： 50 |
| `include_abstracts` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("literature", "openalex_search_works", {"query": "CRISPR base editing", "year_from": 2020, "open_access_only": true, "sort": "cited_by_count", "max_records": 25})
```

### `openalex_get_work` {/* #openalex_get_work */}

獲取一個 OpenAlex 成果的完整後設資料、按許可提供的摘要、開放獲取位置、參考文獻 ID 和逐年統計。work_id 支援 W-ID、URL 或 DOI。多個記錄宣告同一 DOI 時選擇被引最多者，並返回 doi_claimants 和 doi_resolution_note；未知標識報未找到。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `work_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("literature", "openalex_get_work", {"work_id": "W2741809807"})
```

### `openalex_citations` {/* #openalex_citations */}

獲取引用某篇成果的入向文獻。work_id 支援 W-ID、URL 或 DOI；DOI 需要額外解析。返回實際引用總數 api_total、返回數量、截斷標誌和精簡成果記錄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `work_id` | 字串 | **必填** |
| `sort` | 字串 | 可選; 預設值： &quot;cited_by_count&quot;; 列舉： &#91;&quot;cited_by_count&quot;, &quot;publication_date&quot;, &quot;relevance&quot;&#93; |
| `max_records` | 整數 | 可選; 預設值： 50 |
| `include_abstracts` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("literature", "openalex_citations", {"work_id": "W2741809807", "sort": "cited_by_count", "max_records": 50})
```

### `openalex_references` {/* #openalex_references */}

獲取某篇成果引用的出向文獻，並按原參考文獻順序補齊後設資料。返回完整 reference_ids、已補齊 records 和 references_not_hydrated；無法補齊的 ID 不會被靜默丟棄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `work_id` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("literature", "openalex_references", {"work_id": "W2741809807", "max_records": 100})
```

### `openalex_search_authors` {/* #openalex_search_authors */}

按姓名檢索 OpenAlex 作者，返回作者 ID、ORCID、所屬機構、主題和被引指標。同名結果需要結合機構、主題和 ORCID 區分，再用 author_id 獲取詳情。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("literature", "openalex_search_authors", {"query": "Jennifer Doudna", "max_records": 25})
```

### `openalex_get_author` {/* #openalex_get_author */}

獲取 OpenAlex 作者詳情、逐年統計和高被引成果。author_id 支援 A-ID、URL 或 ORCID；ORCID 可能指向稀疏重複檔案，優先使用作者搜尋返回的 A-ID。works_sample 為 0 時不額外檢索成果。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `author_id` | 字串 | **必填** |
| `works_sample` | 整數 | 可選; 預設值： 10 |

```javascript
const result = await host.mcp("literature", "openalex_get_author", {"author_id": "A5023888391", "works_sample": 10})
```

### `openalex_venue_info` {/* #openalex_venue_info */}

查詢 OpenAlex 期刊或資料庫的開放獲取、DOAJ、APC 與引用指標。精確 S-ID、URL 或 ISSN 返回一個來源及逐年統計；名稱查詢返回帶總數和截斷標誌的來源列表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `venue` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 10 |

```javascript
const result = await host.mcp("literature", "openalex_venue_info", {"venue": "Nature", "max_records": 10})
```

### `arxiv_search` {/* #arxiv_search */}

透過 arXiv Atom API 檢索預印本。query 支援 ti:、au:、abs:、布林操作；分類和提交日期範圍與查詢組合。start 從 0 開始，日期包含邊界。返回實際查詢、總數、頁偏移、截斷標誌及帶版本、作者、摘要和連結的記錄。分頁請求需遵守服務節奏；錯誤訂閱源會作為錯誤報告。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |
| `category` | 字串 | 可選 |
| `date_from` | 字串 | 可選 |
| `date_to` | 字串 | 可選 |
| `start` | 整數 | 可選; 預設值： 0 |
| `max_results` | 整數 | 可選; 預設值： 25 |
| `sort_by` | 字串 | 可選; 預設值： &quot;relevance&quot;; 列舉： &#91;&quot;relevance&quot;, &quot;submittedDate&quot;, &quot;lastUpdatedDate&quot;&#93; |
| `sort_order` | 字串 | 可選; 預設值： &quot;descending&quot;; 列舉： &#91;&quot;descending&quot;, &quot;ascending&quot;&#93; |

```javascript
const result = await host.mcp("literature", "arxiv_search", {"query": "ti:transformer", "category": "cs.LG", "max_results": 10})
```

### `arxiv_get_papers` {/* #arxiv_get_papers */}

批次獲取最多 100 篇 arXiv 預印本後設資料。接受新舊 ID、帶版本 ID、arXiv 字首及 abs/pdf URL；無版本 ID 解析到最新版。結果按請求順序排列，並列出 duplicates、not_found。撤稿仍可能返回後設資料，應檢視 comment。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `arxiv_ids` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("literature", "arxiv_get_papers", {"arxiv_ids": ["2103.14030", "1706.03762v5"]})
```

### `crossref_get_work` {/* #crossref_get_work */}

查詢 Crossref DOI 的出版方登記後設資料，可輸入裸 DOI、doi: 字首或 doi.org 地址，無需 API key。DOI 屬於其他序號產生器構時應改用相應服務；Crossref 返回 404 不代表 DOI 無效。核對返回的 DOI、標題和 source_url。

| 欄位 | 型別 | 要求與限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_work", {"doi": "10.1038/nature12968"})
```


### `crossref_get_updates` {/* #crossref_get_updates */}

讀取登記的更正、撤稿及其他更新關係。updated_by 指向更新本文的通知，update_to 指向當前 DOI 所更新的作品。保留關係方向和來源標籤；空列表不能證明論文可靠，也不能證明從未撤稿。

| 欄位 | 型別 | 要求與限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "crossref_get_updates", {"doi": "10.1038/nature12968"})
```


### `datacite_search_records` {/* #datacite_search_records */}

搜尋公開的 DataCite 資料集/軟體 DOI 後設資料。query、related_doi 至少提供一項，可同時提供；query 使用 DataCite 查詢語法。按 next_page 翻頁時保持篩選和 page_size 一致。頁碼檢索最多覆蓋前 10,000 條，需要時縮小查詢。核對 related_identifiers、rights 和落地頁，後設資料不保證檔案可下載或允許複用。

| 欄位 | 型別 | 要求與限制 |
| --- | --- | --- |
| `query` | string | 可選; minLength: 1; maxLength: 2000 |
| `related_doi` | string | 可選; minLength: 1; maxLength: 2048 |
| `resource_type` | string | 可選; default: &quot;dataset&quot;; enum: &#91;&quot;dataset&quot;, &quot;software&quot;&#93; |
| `page_size` | integer | 可選; default: 20; minimum: 1; maximum: 100 |
| `page` | integer | 可選; default: 1; minimum: 1; maximum: 10000 |

```javascript
const result = await host.mcp("literature", "datacite_search_records", {"query": "climate", "resource_type": "dataset", "page_size": 5})
```


### `datacite_get_record` {/* #datacite_get_record */}

查詢一條公開 DataCite DOI 記錄，包括標題、作者、資源型別、權利資訊、關聯識別符號及可用版本。接受裸 DOI、doi: 字首或 doi.org 地址。使用關聯資料集或軟體前，核對識別符號和關係方向。

| 欄位 | 型別 | 要求與限制 |
| --- | --- | --- |
| `doi` | string | **必填**; minLength: 1; maxLength: 2048 |

```javascript
const result = await host.mcp("literature", "datacite_get_record", {"doi": "10.14454/qdd3-ps68"})
```

</ToolOperationGroup>

## PubMed {/* #family-3 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search_articles` {/* #search_articles */}

透過 NCBI esearch 檢索 PubMed 生物醫學與生命科學文獻，返回匹配總數和一頁 PMID。支援欄位標籤、布林操作、日期和排序；不應將其當作覆蓋所有學科的通用文獻庫。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `max_results` | 整數 | 可選; 預設值： 20 |
| `retstart` | 整數 | 可選; 預設值： 0 |
| `sort` | 字串 | 可選; 列舉： &#91;&quot;relevance&quot;, &quot;pub_date&quot;, &quot;author&quot;, &quot;journal_name&quot;, &quot;title&quot;&#93; |
| `date_from` | 字串 | 可選 |
| `date_to` | 字串 | 可選 |
| `datetype` | 字串 | 可選; 預設值： &quot;pdat&quot;; 列舉： &#91;&quot;pdat&quot;, &quot;edat&quot;, &quot;mdat&quot;&#93; |

```javascript
const result = await host.mcp("pubmed", "search_articles", {"query": "CRISPR gene editing", "max_results": 10})
```

### `get_article_metadata` {/* #get_article_metadata */}

按 PMID 批次獲取 PubMed 詳細後設資料，包括 DOI/PMCID、標題、摘要、期刊、作者與機構、日期、MeSH、型別、語言和引文。使用結果時註明 PubMed 來源，並連結返回的 DOI。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pmids` | &#91;'字串', '陣列'&#93; | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_article_metadata", {"pmids": ["35486828", "33264437"]})
```

### `find_related_articles` {/* #find_related_articles */}

透過 NCBI elink 獲取 PMID 的相關內容。預設 pubmed_pubmed 是按標題、摘要和 MeSH 相似度排序的相似文獻，並非引用關係；其他模式可取得 PMC 全文或基因、蛋白、核酸記錄連結。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pmids` | &#91;'字串', '陣列'&#93; | **必填** |
| `link_type` | 字串 | 可選; 預設值： &quot;pubmed_pubmed&quot;; 列舉： &#91;&quot;pubmed_pubmed&quot;, &quot;pubmed_pmc&quot;, &quot;pubmed_nucleotide&quot;, &quot;pubmed_protein&quot;, &quot;pubmed_gene&quot;&#93; |
| `max_results` | 整數 | 可選 |

```javascript
const result = await host.mcp("pubmed", "find_related_articles", {"pmids": ["35486828"], "link_type": "pubmed_pubmed"})
```

### `lookup_article_by_citation` {/* #lookup_article_by_citation */}

透過 NCBI ecitmatch 將書目引文解析為 PMID。每條提供期刊、年份、卷、首頁、作者或 key 等欄位，至少兩到三個有效欄位有助於可靠匹配。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `citations` | 物件陣列 | **必填** |

```javascript
const result = await host.mcp("pubmed", "lookup_article_by_citation", {"citations": [{"journal": "Science", "year": 1987, "volume": "235", "first_page": "182", "author": "Palmenberg AC"}]})
```

### `convert_article_ids` {/* #convert_article_ids */}

透過 NCBI/PMC ID Converter 在 PMID、PMCID 與 DOI 之間轉換。同次呼叫中的 ID 型別應一致，並與 id_type 匹配；可先確認是否存在 PMCID，再請求全文。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `ids` | &#91;'字串', '陣列'&#93; | **必填** |
| `id_type` | 字串 | 可選; 預設值： &quot;pmid&quot;; 列舉： &#91;&quot;pmid&quot;, &quot;pmcid&quot;, &quot;doi&quot;&#93; |

```javascript
const result = await host.mcp("pubmed", "convert_article_ids", {"ids": ["PMC9046468"], "id_type": "pmcid"})
```

### `get_full_text_article` {/* #get_full_text_article */}

透過 Europe PMC 獲取 PMC 開放獲取子集文章的結構化全文和許可。接受帶或不帶 PMC 字首的 ID；不可獲取時檢視 fulltext_status。使用結果時註明來源並連結 DOI。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pmc_ids` | &#91;'字串', '陣列'&#93; | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_full_text_article", {"pmc_ids": ["PMC9046468"]})
```

### `get_copyright_status` {/* #get_copyright_status */}

結合 PubMed 版權欄位、PMC ID 轉換和權限後設資料，查詢每個 PMID 的版權宣告、許可型別、許可 URL 與年份，供內容複用前核對。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pmids` | &#91;'字串', '陣列'&#93; | **必填** |

```javascript
const result = await host.mcp("pubmed", "get_copyright_status", {"pmids": ["35891187", "34375400"]})
```

</ToolOperationGroup>

## 基因與本體 {/* #family-4 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `query_genes` {/* #query_genes */}

透過 mygene.info 批次對映基因符號或標識，每次最多 1000 項。scopes 指定輸入名稱空間，fields 指定返回欄位，species 指定物種；單個 term 不支援逗號。返回 not_found 與 records；多重匹配保留 query，並按輸入順序及 _id 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `terms` | 字串陣列 | **必填** |
| `scopes` | 字串 | 可選 |
| `fields` | 字串 | 可選; 預設值： &quot;symbol,name,taxid,entrezgene,ensembl.gene&quot; |
| `species` | 字串 | 可選 |

```javascript
const result = await host.mcp("genes", "query_genes", {"terms": ["TP53", "BRCA1"], "scopes": "symbol,alias", "fields": "symbol,name,entrezgene,ensembl.gene", "species": "human"})
```

### `list_ontologies` {/* #list_ontologies */}

列出 OLS4 本體。給出 ontology_ids 時獲取對應後設資料並列出 not_found；省略時完整分頁獲取目錄，並核對總數。返回版本、狀態、詞條數等資訊。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `ontology_ids` | 字串陣列 | 可選 |

```javascript
const result = await host.mcp("genes", "list_ontologies", {"ontology_ids": ["efo", "go", "mondo"]})
```

### `search_ontology_terms` {/* #search_ontology_terms */}

按標籤、同義詞或標識搜尋 OLS4 詞條，可限制本體、精確匹配或是否包含廢棄詞條。返回總數、返回數、截斷狀態以及 CURIE、IRI、標籤和說明。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `ontologies` | 字串陣列 | 可選 |
| `exact` | 布林值 | 可選; 預設值： false |
| `include_obsolete` | 布林值 | 可選; 預設值： false |
| `max_results` | 整數 | 可選; 預設值： 20 |

```javascript
const result = await host.mcp("genes", "search_ontology_terms", {"query": "asthma", "ontologies": ["efo"], "max_results": 20})
```

### `get_ontology_term` {/* #get_ontology_term */}

獲取本體詞條詳情或完整關聯詞條集合。relation 為空時返回標籤、同義詞、廢棄狀態和直接父類；指定 parents、children、ancestors、descendants 等關係時完整分頁，並核對服務總數。ontology 使用小寫 ID，term_id 支援 CURIE 或 IRI。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `ontology` | 字串 | **必填** |
| `term_id` | 字串 | **必填** |
| `relation` | 字串 | 可選; 列舉： &#91;&quot;parents&quot;, &quot;children&quot;, &quot;ancestors&quot;, &quot;descendants&quot;, &quot;hierarchicalParents&quot;, &quot;hierarchicalChildren&quot;, &quot;hierarchicalAncestors&quot;, &quot;hierarchicalDescendants&quot;&#93; |
| `include_parents` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("genes", "get_ontology_term", {"ontology": "go", "term_id": "GO:0006281", "relation": "children"})
```

### `get_go_annotations` {/* #get_go_annotations */}

從 QuickGO 獲取 UniProt 基因產物的 GO 註釋，並核對完整集合。可按功能類別、物種和證據篩選。證據須用預設或 ECO 編碼，不能把 IDA/IEA 等三字母程式碼當作 ECO 引數。max_records 僅限制返回行；complete、truncated 和 total_annotations 說明覆蓋範圍。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `uniprot_accession` | 字串 | **必填** |
| `aspect` | 字串 | 可選; 列舉： &#91;&quot;biological_process&quot;, &quot;molecular_function&quot;, &quot;cellular_component&quot;&#93; |
| `evidence` | 字串 | 可選 |
| `taxon_id` | 整數 | 可選 |
| `include_term_names` | 布林值 | 可選; 預設值： false |
| `max_records` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("genes", "get_go_annotations", {"uniprot_accession": "P04637", "aspect": "molecular_function", "evidence": "experimental_manual"})
```

### `search_uniprot_entries` {/* #search_uniprot_entries */}

按精確基因名（含同義名）、蛋白名稱短語和／或精確 NCBI 物種 ID 檢索活躍 UniProtKB 條目，組合條件按 AND 匹配。至少提供一個檢索條件。reviewed 為 true 時只查 Swiss-Prot；不指定則包含已審閱與未審閱條目。返回一個按登入號排序的頁面，不返回序列。繼續分頁時，傳回 next_cursor，並保持篩選條件與 page_size 不變；遊標不代表持久快照。按返回的 accession 呼叫 get_uniprot_entries 獲取序列。

至少提供一個列出的檢索條件；完整組合約束見下載的 schema。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `gene` | string | 可選; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `protein_name` | string | 可選; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `organism_id` | integer | 可選; minimum: `1`; maximum: `2147483647` |
| `reviewed` | boolean | 可選 |
| `page_size` | integer | 可選; default: `25`; minimum: `1`; maximum: `500` |
| `cursor` | string | 可選; minLength: `1`; maxLength: `4096`; pattern: `"^[^\\s\\u0000-\\u001f\\u007f]+$"` |

```javascript
const result = await host.mcp("genes", "search_uniprot_entries", {"gene": "TP53", "organism_id": 9606, "reviewed": true, "page_size": 25})
```

### `get_uniprot_entries` {/* #get_uniprot_entries */}

按 UniProt 登入號批次獲取條目或序列，支援 JSON、FASTA 和 TXT。次級登入號會對映到當前主條目；檢查輸入對映及未找到項，不要將當前主登入號誤當作另一個輸入。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |
| `format` | 字串 | 可選; 列舉: &#91;&quot;fasta&quot;, &quot;txt&quot;&#93; |
| `fields` | 字串陣列 | 可選 |

```javascript
const result = await host.mcp("genes", "get_uniprot_entries", {"accessions": ["P04637", "P38398"], "fields": ["accession", "id", "protein_name", "gene_names", "organism_name", "length"]})
```

### `submit_uniprot_id_mapping` {/* #submit_uniprot_id_mapping */}

向 UniProt 提交最多 100000 個識別符號的批次對映。from_db 與 to_db 必須是 UniProt API 支援的準確資料庫名稱，支援組合見其 configure/idmapping/fields。僅 from_db=Gene_Name 可指定 taxon_id，用於限定物種。每個 ID 獨立成項，不含空白或分隔符；保留大小寫和版本，精確重複項只提交一次。儲存返回的 job_id，再查詢狀態和分頁結果。此操作不自動重試或輪詢；若提交響應丟失，遠端任務可能已存在，不要盲目重提。結果最長保留約 7 天；關閉應用或取消本地請求不會取消遠端任務。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `from_db` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^&#91;A-Za-z&#93;&#91;A-Za-z0-9_-&#93;&#42;$&quot; |
| `to_db` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^&#91;A-Za-z&#93;&#91;A-Za-z0-9_-&#93;&#42;$&quot; |
| `ids` | array of string | **必填**; minItems: 1; maxItems: 100000 |
| `taxon_id` | integer | 可選; minimum: 1; maximum: 2147483647 |

```javascript
const result = await host.mcp("genes", "submit_uniprot_id_mapping", {"from_db":"Gene_Name","to_db":"UniProtKB","ids":["TP53","BRCA1"],"taxon_id":9606})
```

### `get_uniprot_id_mapping_status` {/* #get_uniprot_id_mapping_status */}

查詢一次已有 UniProt 對映任務。NEW／RUNNING 時至少間隔 3 秒再查詢；FINISHED 後分頁獲取全部結果。上游 ERROR 規範化為 FAILED，表示任務失敗，不等於識別符號未匹配。保留 messages 中的錯誤，未知或過期任務的 HTTP 錯誤會向上傳遞。此操作不建立任務，也不自動輪詢。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^&#91;A-Za-z0-9_-&#93;+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_status", {"job_id":"ecuuh9h0Md"})
```

### `get_uniprot_id_mapping_results` {/* #get_uniprot_id_mapping_results */}

獲取已完成 UniProt 對映任務的一頁 from/to 對。保持 job_id 和 page_size 不變，使用 next_cursor 繼續，直到 has_more=false。一對多對映必須保留；同一輸入的結果可能跨頁，彙總全部頁面後再判斷。收集各頁明確返回的 failed_ids，不要因某頁沒有輸入項就推斷其未匹配。total_results 是對映行數，不是成功輸入 ID 數；one_to_many_in_page 僅反映當前頁。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 100; pattern: &quot;^&#91;A-Za-z0-9_-&#93;+$&quot; |
| `page_size` | integer | 可選; default: 100; minimum: 1; maximum: 500 |
| `cursor` | string | 可選; minLength: 1; maxLength: 4096; pattern: &quot;^&#91;^\\s\\u0000-\\u001f\\u007f&#93;+$&quot; |

```javascript
const result = await host.mcp("genes", "get_uniprot_id_mapping_results", {"job_id":"ecuuh9h0Md","page_size":100})
```

### `map_reactome_pathways` {/* #map_reactome_pathways */}

將基因符號或 UniProt 登入號對映到 Reactome 通路。id_type 與輸入型別匹配，標識不得重複。compact 返回每項低層通路及 Reactome 釋出資訊；完整模式增加實體、反應統計和 identifiers_not_found。物種及分子資源檢視應與研究輸入一致。 按請求的物種對映通路，不會把標識投影到人類。使用受支援的學名，例如 `Homo sapiens` 或 `Mus musculus`；完整名單見下載的結構定義。空值、不支援的物種或返回物種不匹配均會報錯。`found` 和 `n_found` 表示標識被識別，不保證該物種中存在通路；識別成功也可能返回零條通路。compact 模式只返回低層通路。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `identifiers` | 字串陣列 | **必填** |
| `id_type` | 字串 | **必填**; 列舉： &#91;&quot;symbol&quot;, &quot;uniprot&quot;&#93; |
| `species` | 字串 | 可選; 預設值： &quot;Homo sapiens&quot; |
| `resource` | 字串 | 可選; 預設值： &quot;TOTAL&quot; |
| `include_disease` | 布林值 | 可選; 預設值： true |
| `compact` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("genes", "map_reactome_pathways", {"identifiers": ["TP53", "EGFR", "BRCA1"], "id_type": "symbol"})
```

### `list_enrichment_sources` {/* #list_enrichment_sources */}

查詢指定物種可用的 g:Profiler 富集資料來源及當前版本。物種使用明確程式碼，如 hsapiens；此操作不提交基因列表。g:Profiler 為服務執行保留有限查詢後設資料。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `organism` | string | **必填**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |

```javascript
const result = await host.mcp("genes", "list_enrichment_sources", {"organism": "hsapiens"})
```

### `enrich_gene_set` {/* #enrich_gene_set */}

對指定物種的基因集執行 g:Profiler 富集，支援 GO、Reactome 等可用來源、統計背景、欠代表檢驗和多重檢驗校正。結果保留未對映、歧義及重複標識，不能將它們靜默丟棄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `genes` | 字串陣列 | **必填**; 最少項數: 1; 最多項數: 5000 |
| `organism` | string | **必填**; minLength: `1`; maxLength: `64`; pattern: `"^[a-z][a-z0-9_]*$"` |
| `sources` | 字串陣列 | 可選; 最多項數: 100 |
| `background_genes` | 字串陣列 | 可選; 最少項數: 1; 最多項數: 20000 |
| `domain_scope` | 字串 | 可選; 列舉: &#91;&quot;annotated&quot;, &quot;known&quot;, &quot;custom&quot;, &quot;custom_annotated&quot;&#93; |
| `correction_method` | 字串 | 可選; 預設值: &quot;g_SCS&quot;; 列舉: &#91;&quot;g_SCS&quot;, &quot;bonferroni&quot;, &quot;fdr&quot;&#93; |
| `user_threshold` | 數值 | 可選; 最大值: 1; 排除最小值: 0 |
| `all_results` | 布林值 | 可選; 預設值: false |
| `ordered` | 布林值 | 可選; 預設值: false |
| `measure_underrepresentation` | 布林值 | 可選; 預設值: false |
| `no_iea` | 布林值 | 可選; 預設值: false |
| `no_evidences` | 布林值 | 可選; 預設值: false |
| `numeric_ns` | 字串 | 可選; 最短長度: 1; 最長長度: 64 |

```javascript
const result = await host.mcp("genes", "enrich_gene_set", {"genes": ["TP53", "EGFR", "BRCA1"], "organism": "hsapiens", "sources": ["GO:BP", "REAC"], "correction_method": "fdr"})
```

</ToolOperationGroup>

## 基因組 {/* #family-5 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `blast_submit` {/* #blast_submit */}

向公共 NCBI BLAST 服務提交一條核酸或蛋白序列。必須明確 molecule_type；序列會傳送給 NCBI。儲存返回的 RID，至少等候 60 秒再查詢狀態；同一 RID 的請求至少間隔 60 秒，所有 BLAST 請求至少間隔 10 秒。提交回執丟失時會報告 blast_submission_unknown，不要自動重複提交。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `sequence` | string | **必填**; minLength: `1`; maxLength: `100000` |
| `molecule_type` | string | **必填**; enum: `["nucleotide", "protein"]` |
| `database` | string | 可選; enum: `["nt", "core_nt", "refseq_rna", "nr", "refseq_protein", "swissprot"]` |
| `evalue` | number | 可選; exclusiveMinimum: `0`; maximum: `1000` |
| `hitlist_size` | integer | 可選; minimum: `1`; maximum: `100` |
| `megablast` | boolean | 可選 |

```javascript
const result = await host.mcp("genomes", "blast_submit", {"sequence": "ATGCGTACGTAGCTAG", "molecule_type": "nucleotide", "database": "nt"})
```

### `blast_status` {/* #blast_status */}

查詢 NCBI BLAST RID 的狀態，保留 READY、WAITING、FAILED 或 UNKNOWN 狀態及服務返回的重試間隔。READY 後再取結果；同一 RID 的請求至少間隔 60 秒，不要把 WAITING 當作提交失敗後重新提交。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `rid` | string | **必填**; minLength: `1`; maxLength: `128` |

```javascript
const result = await host.mcp("genomes", "blast_status", {"rid": "AYEFB4DT014"})
```

### `blast_results` {/* #blast_results */}

獲取 BLAST RID 的有界報告，支援 json2、xml2、text 或 tabular，最多 2 MiB。等待 blast_status 返回 READY，並距同一 RID 上次請求至少 60 秒後再呼叫。仍在計算時返回 ready=false。tabular 是 NCBI 的文字表格報告，可能含 HTML 註釋、PRE 標籤及報告頭，不是純 TSV／CSV；保留原始響應後再解析。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `rid` | string | **必填**; minLength: `1`; maxLength: `128` |
| `format` | string | 可選; enum: `["json2", "xml2", "text", "tabular"]` |

```javascript
const result = await host.mcp("genomes", "blast_results", {"rid": "AYEFB4DT014", "format": "json2"})
```

### `ensembl_lookup` {/* #ensembl_lookup */}

按穩定標識或基因符號查詢 Ensembl。query_type 可為 auto、id 或 symbol；auto 先查標識，僅在明確未找到且不是規範 ENS/LRG 標識時回退到符號。支援帶版本 ENS、FlyBase、WormBase 和酵母標識。species 僅用於符號查詢，預設 homo_sapiens，不會從符號推斷；expand 可展開轉錄本、外顯子和翻譯。無效請求與服務失敗會報錯。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `query_type` | 字串 | 可選; 預設值: &quot;auto&quot;; 列舉: &#91;&quot;auto&quot;, &quot;id&quot;, &quot;symbol&quot;&#93; |
| `species` | 字串 | 可選; 預設值: &quot;homo_sapiens&quot; |
| `expand` | 布林值 | 可選; 預設值: false |

```javascript
const result = await host.mcp("genomes", "ensembl_lookup", {"query": "BRAF", "query_type": "symbol"})
```

### `ensembl_xrefs` {/* #ensembl_xrefs */}

獲取 Ensembl 穩定 ID 到 HGNC、EntrezGene、UniProt、OMIM、RefSeq 等資料庫的完整交叉引用。external_db 是精確資料庫名篩選；結果按 dbname、primary_id 排序，未知 ID 返回 n_xrefs 為 0。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `stable_id` | 字串 | **必填** |
| `external_db` | 字串 | 可選 |

```javascript
const result = await host.mcp("genomes", "ensembl_xrefs", {"stable_id": "ENSG00000157764", "external_db": "HGNC"})
```

### `ensembl_vep_variant` {/* #ensembl_vep_variant */}

提供 `variant_id` 時優先按 ID 查詢，忽略 `region`、`allele` 和 `allele_orientation`，也不會用 `allele` 篩選 ID 結果。區域查詢使用該物種當前組裝，人類為 GRCh38；座標從 1 開始且兩端包含，插入時 `start = end + 1`。`allele_orientation` 預設為 `forward`，即使區域字尾為 `:-1`，等位基因也按參考正鏈解釋；設為 `region` 時，負鏈區域中的序列等位基因會先反向互補。負鏈區域的符號等位基因必須使用 `forward`。區域請求統一按正鏈傳送，`normalization` 保留原輸入與規範化結果；不轉換參考組裝，也不反轉座標。基因位於負鏈不意味著必須提供負鏈輸入。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `variant_id` | 字串 | 可選 |
| `region` | 字串 | 可選 |
| `allele` | 字串 | 可選 |
| `allele_orientation` | 字串 | 可選; 預設值：`forward`; 列舉：`forward`、`region` |
| `species` | 字串 | 可選; 預設值： &quot;homo_sapiens&quot; |
| `max_consequences` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("genomes", "ensembl_vep_variant", {"variant_id": "rs7412", "max_consequences": 25})
```

### `ensembl_homology` {/* #ensembl_homology */}

從 Ensembl Compara 查詢直系同源、旁系同源或投影關係。gene_symbol 與 gene_id 二選一；符號先解析到穩定 ID。target_species 與 target_taxon 同時給出時為 OR 關係。返回精簡記錄、完整 n_total 和截斷標誌，不返回比對或序列。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | 可選 |
| `gene_id` | 字串 | 可選 |
| `homology_type` | 字串 | 可選; 預設值： &quot;orthologues&quot;; 列舉： &#91;&quot;orthologues&quot;, &quot;paralogues&quot;, &quot;projections&quot;&#93; |
| `target_species` | 字串 | 可選 |
| `target_taxon` | 整數 | 可選 |
| `species` | 字串 | 可選; 預設值： &quot;homo_sapiens&quot; |
| `max_homologies` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("genomes", "ensembl_homology", {"gene_symbol": "BRAF", "target_species": "mus_musculus"})
```

### `ensembl_sequence` {/* #ensembl_sequence */}

獲取 Ensembl 標識對應的序列，保留請求型別和身份。CDS 或蛋白序列不支援的標識、無效請求和服務失敗會報告錯誤，不能一概當作空序列或未找到。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `stable_id` | 字串 | 可選 |
| `region` | 字串 | 可選 |
| `species` | 字串 | 可選; 預設值: &quot;homo_sapiens&quot; |
| `seq_type` | 字串 | 可選; 預設值: &quot;genomic&quot;; 列舉: &#91;&quot;genomic&quot;, &quot;cdna&quot;, &quot;cds&quot;, &quot;protein&quot;&#93; |
| `max_bytes` | 整數 | 可選; 預設值: 400000 |

```javascript
const result = await host.mcp("genomes", "ensembl_sequence", {"stable_id": "ENSP00000288602", "seq_type": "protein"})
```

### `ensembl_overlap_region` {/* #ensembl_overlap_region */}

列出與 Ensembl 區域重疊的基因、轉錄本、調控元件、重複或變異等特徵。區域是從 1 開始的閉區間，超過 5 Mb 需拆分。返回完整 n_total、按起點和 ID 排序的特徵及 features_truncated；空區域返回 0 項。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `region` | 字串 | **必填** |
| `feature` | 字串 | 可選; 預設值： &quot;gene&quot;; 列舉： &#91;&quot;gene&quot;, &quot;transcript&quot;, &quot;exon&quot;, &quot;cds&quot;, &quot;regulatory&quot;, &quot;motif&quot;, &quot;repeat&quot;, &quot;variation&quot;, &quot;structural_variation&quot;, &quot;band&quot;, &quot;simple&quot;, &quot;misc&quot;&#93; |
| `species` | 字串 | 可選; 預設值： &quot;homo_sapiens&quot; |
| `max_features` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("genomes", "ensembl_overlap_region", {"region": "7:140719327-140925199", "feature": "gene"})
```

### `ncbi_resolve_taxon` {/* #ncbi_resolve_taxon */}

將物種名稱、常用名或數字 TaxID 解析為 NCBI Taxonomy 標識；保留多個匹配及截斷狀態，不能自動將第一項當作唯一物種。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填**; 最短長度: 1; 最長長度: 200 |
| `max_matches` | 整數 | 可選; 預設值: 20; 最小值: 1; 最大值: 100 |

```javascript
const result = await host.mcp("genomes", "ncbi_resolve_taxon", {"query": "human"})
```

### `ncbi_get_assembly_info` {/* #ncbi_get_assembly_info */}

核對帶版本號的 GCF/GCA 組裝身份，包括物種、組裝名、UCSC 別名、狀態與配對的 RefSeq/GenBank 登入號。拒絕無版本登入號；歷史版本不會被默默替換成最新版。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `assembly_accession` | string | **必填**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |

```javascript
const result = await host.mcp("genomes", "ncbi_get_assembly_info", {"assembly_accession": "GCF_000001405.40"})
```

### `ncbi_get_sequence_aliases` {/* #ncbi_get_sequence_aliases */}

查詢指定版本組裝的 UCSC、RefSeq 和 GenBank 序列別名，可限定一個序列名。共享染色體標籤可能對應多條序列，應保留歧義；max_sequences 限制返回字首，需檢查 matches_truncated。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `assembly_accession` | string | **必填**; pattern: `"^GC[AF]_[0-9]{9}\\.[0-9]+$"` |
| `sequence` | 字串 | 可選; 最短長度: 1; 最長長度: 200 |
| `max_sequences` | 整數 | 可選; 預設值: 200; 最小值: 1; 最大值: 5000 |

```javascript
const result = await host.mcp("genomes", "ncbi_get_sequence_aliases", {"assembly_accession": "GCF_000001405.40", "sequence": "chr1"})
```

### `ucsc_list_tracks` {/* #ucsc_list_tracks */}

列出 UCSC 指定組裝的可查詢葉級軌道，可按名稱或標籤進行不區分大小寫的篩選。返回軌道名稱、型別、所屬組、完整匹配數及截斷狀態。首次訪問某組裝會載入並快取完整目錄，建議先用 filter_text 縮小結果。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `genome` | 字串 | 可選; 預設值： &quot;hg38&quot; |
| `filter_text` | 字串 | 可選 |
| `max_tracks` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("genomes", "ucsc_list_tracks", {"genome": "hg38", "filter_text": "phyloP", "max_tracks": 50})
```

### `ucsc_track_data` {/* #ucsc_track_data */}

獲取 UCSC 指定軌道在區域中的原始記錄。chrom 須含 chr 字首，start/end 使用從 0 開始的半開區間；Ensembl 起點需減 1。返回行結構取決於軌道，truncated 反映上游限制；若提供 dataDownloadUrl，可用它獲取大規模資料。座標須為非負安全整數，並滿足 `end > start`；無效值會報錯，不會被取整或截到另一個位置。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `track` | 字串 | **必填** |
| `chrom` | 字串 | **必填** |
| `start` | 整數 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `end` | 整數 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `genome` | 字串 | 可選; 預設值： &quot;hg38&quot; |
| `max_rows` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_track_data", {"track": "cpgIslandExt", "chrom": "chr7", "start": 140700000, "end": 140800000, "genome": "hg38"})
```

### `ucsc_conservation` {/* #ucsc_conservation */}

讀取 UCSC phyloP／phastCons 保守性軌道的區域統計。chrom 使用 chr 字首，start/end 為從 0 開始的半開區間，跨度最多 100000 bp。預設 genome=hg38；預設軌道分別為 hg19: phyloP100wayAll、hg38: phyloP100way、mm10: phyloP60wayAll、mm39: phyloP35way。其他基因組保留 phyloP100way 回退，但軌道可能不存在，應先用 ucsc_list_tracks 核對。include_values 可返回受 max_values 限制的逐鹼基資料。統計按覆蓋的鹼基跨度加權並裁剪到視窗；未覆蓋位置降低 coverage_fraction，不作為零分處理。上游結果截斷或非數值軌道會報錯。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `chrom` | string | **必填** |
| `start` | integer | **必填**; minimum: 0; maximum: 9007199254740991 |
| `end` | integer | **必填**; minimum: 0; maximum: 9007199254740991 |
| `genome` | string | 可選; default: &quot;hg38&quot; |
| `track` | string | 可選 |
| `include_values` | boolean | 可選; default: false |
| `max_values` | integer | 可選; default: 2000 |

```javascript
const result = await host.mcp("genomes", "ucsc_conservation", {"chrom": "chr7", "start": 140753330, "end": 140753380, "track": "phyloP100way"})
```

### `ucsc_tfbs_clusters` {/* #ucsc_tfbs_clusters */}

獲取指定區域重疊的 ENCODE 轉錄因子結合位點聚類。支援 hg38 或 hg19 對應軌道；座標從 0 開始、右端不含。返回因子集合、聚類位置、分數、支援實驗數和截斷狀態，便於進一步檢查支援證據。座標須為非負安全整數，並滿足 `end > start`；無效值會報錯，不會被取整或截到另一個位置。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chrom` | 字串 | **必填** |
| `start` | 整數 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `end` | 整數 | **必填**; 最小值： 0; 最大值： 9007199254740991 |
| `genome` | 字串 | 可選; 預設值： &quot;hg38&quot; |
| `max_rows` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("genomes", "ucsc_tfbs_clusters", {"chrom": "chr7", "start": 140699000, "end": 140760000, "genome": "hg38"})
```

### `ucsc_chrom_sizes` {/* #ucsc_chrom_sizes */}

獲取 UCSC 組裝的染色體與 contig 名稱、長度，可按名稱篩選。返回組裝總數、篩選後數量和截斷標誌；長度用於校驗座標，不能把備用或未定位序列誤作主染色體。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `genome` | 字串 | 可選; 預設值： &quot;hg38&quot; |
| `filter_text` | 字串 | 可選 |
| `max_chroms` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("genomes", "ucsc_chrom_sizes", {"genome": "hg38", "filter_text": "chr1", "max_chroms": 25})
```

### `clustalo_submit` {/* #clustalo_submit */}

向 EMBL-EBI Clustal Omega 提交至少三條蛋白質、DNA 或 RNA FASTA 序列，記錄名稱必須唯一；最多 4000 條或 4 MiB。返回 job_id 後儲存並查詢狀態，再獲取結果。預設 outfmt=clustal_num，包含位置編號。需在 Settings → Privacy → Share contact email with research data services 配置有效聯絡郵箱。序列會傳送到 EMBL-EBI，輸入和結果可能儲存在會話或 Notebook 中。響應丟失不等於未提交，不要自動重提。結果保留期由提供方控制，文件說明最長約一週；應用退出僅停止本地請求，不取消遠端任務。每批最多 30 個任務，等處理或獲取結果後再提交下一批；聯結器不跨呼叫限流。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `sequence` | string | **必填**; minLength: 1; maxLength: 4194304 |
| `stype` | string | **必填**; enum: &#91;&quot;protein&quot;, &quot;dna&quot;, &quot;rna&quot;&#93; |
| `outfmt` | string | 可選; enum: &#91;&quot;clustal_num&quot;&#93; |
| `title` | string | 可選; minLength: 1; maxLength: 200 |
| `dealign` | boolean | 可選 |
| `order` | string | 可選; enum: &#91;&quot;aligned&quot;, &quot;input&quot;&#93; |

```javascript
const result = await host.mcp("genomes", "clustalo_submit", {"sequence": ">human\nMKT\n>mouse\nMRT\n>rat\nMRT\n", "stype": "protein"})
```

### `clustalo_status` {/* #clustalo_status */}

查詢一次已有 Clustal Omega 任務，不自動輪詢或等待。至少間隔 10 秒再查，直到 FINISHED、ERROR、FAILURE 或 NOT_FOUND。重啟後保留原 job_id 繼續查詢。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 128 |

```javascript
const result = await host.mcp("genomes", "clustalo_status", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m"})
```

### `clustalo_results` {/* #clustalo_results */}

獲取已完成任務的 clustal_num 原始比對檔案，使用提交返回的相同 outfmt。返回比對內容與建議檔名，需由呼叫者儲存。結果上限 8 MiB；QUEUED／RUNNING 時返回 ready:false 與重試提示，失敗保留 job_id 供診斷，不自動重試或重提。結果可能在約一週內過期，應及時儲存；應用退出不取消遠端任務。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; minLength: 1; maxLength: 128 |
| `outfmt` | string | **必填**; enum: &#91;&quot;clustal_num&quot;&#93; |

```javascript
const result = await host.mcp("genomes", "clustalo_results", {"job_id":"clustalo-I20240923-000000-0000-0000000-p1m", "outfmt":"clustal_num"})
```

</ToolOperationGroup>

## 變異 {/* #family-6 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

**gnomAD 座標規則**：同時記錄資料集固定標識與參考組裝。短變異的基因/區域查詢中，r2.1/ExAC 使用 GRCh37，r3/r4 使用 GRCh38；結構變異的基因查詢使用 `gnomad_sv_r2_1`（GRCh37）或 `gnomad_sv_r4`（GRCh38）；修改資料集不會轉換輸入座標。`gene_constraint` 和 gnomAD 的 ClinVar 映象固定使用 GRCh38 查詢基因，不接收 dataset 引數。線粒體查詢的父級定位也固定為 GRCh38；必須選擇基因或成對且有序的區域邊界，不能混用。區域邊界須為 1—999,999,999 的整數。百萬鹼基差值上限屬於 `region_variants`，不是另一個線粒體限制。結構變異 ID 必須與其所屬的 SV 資料集配套。

### `get_variant` {/* #get_variant */}

按 chrom-pos-ref-alt 查詢 gnomAD 短變異。座標必須對應資料集組裝：r3/r4 為 GRCh38，r2.1/ExAC 為 GRCh37；rsID 先經 search_variants 解析。include_populations 為 true 時附加可用人群計數與頻率。保留資料集、等位基因計數和質量過濾；罕見本身不能確定致病性。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `variant_id` | 字串 | **必填** |
| `dataset` | 字串 | 可選; 預設值: &quot;gnomad_r4&quot;; 列舉: &#91;&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;&#93; |
| `include_populations` | 布林值 | 可選; 預設值: false |

```javascript
const result = await host.mcp("variants", "get_variant", {"variant_id": "19-44908822-C-T", "dataset": "gnomad_r4"})
```

### `search_variants` {/* #search_variants */}

在 gnomAD 中按 rsID、變異 ID 或字首搜尋，返回可供 get_variant 使用的 chrom-pos-ref-alt 標識。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `dataset` | 字串 | 可選; 預設值： &quot;gnomad_r4&quot;; 列舉： &#91;&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;&#93; |

```javascript
const result = await host.mcp("variants", "search_variants", {"query": "rs7412", "dataset": "gnomad_r4"})
```

### `gene_variants` {/* #gene_variants */}

列出一個基因內的全部 gnomAD 短變異。基因邊界與變異座標使用所選資料集的參考組裝：r2.1/ExAC 為 GRCh37，r3/r4 為 GRCh38。大基因可能返回數千行。`gene_symbol`（HGNC 符號，如 `APOE`）和 `gene_id`（Ensembl ID，如 `ENSG00000130203`）必須二選一。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | 可選 |
| `gene_id` | 字串 | 可選 |
| `dataset` | 字串 | 可選; 預設值： &quot;gnomad_r4&quot;; 列舉： &#91;&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;&#93; |

```javascript
const result = await host.mcp("variants", "gene_variants", {"gene_symbol": "APOE", "dataset": "gnomad_r4"})
```

### `gene_constraint` {/* #gene_constraint */}

獲取 gnomAD 基因約束指標，包括 pLI、功能缺失/錯義/同義變異的觀測期望比、90% 置信區間和 z 分數。gene_symbol 與 gene_id 二選一；結合指標定義與資料集解釋基因對變異的耐受性。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | 可選 |
| `gene_id` | 字串 | 可選 |

```javascript
const result = await host.mcp("variants", "gene_constraint", {"gene_symbol": "TP53"})
```

### `region_variants` {/* #region_variants */}

列出指定區域內的全部 gnomAD 短變異。`chrom` 接受 1—22、X、Y，也接受可選的 chr 字首和小寫 x/y。`start`/`stop` 為從 1 開始的閉區間整數，範圍 1—999,999,999；必須滿足 start ≤ stop 且 stop − start ≤ 1,000,000。r2.1/ExAC 使用 GRCh37，r3/r4 使用 GRCh38。輸入座標必須已採用相應組裝；選擇資料集不會自動進行 liftover。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chrom` | 字串 | **必填** |
| `start` | 整數 | **必填**; 最小值： 1; 最大值： 999999999 |
| `stop` | 整數 | **必填**; 最小值： 1; 最大值： 999999999 |
| `dataset` | 字串 | 可選; 預設值： &quot;gnomad_r4&quot;; 列舉： &#91;&quot;gnomad_r4&quot;, &quot;gnomad_r4_non_ukb&quot;, &quot;gnomad_r3&quot;, &quot;gnomad_r3_controls_and_biobanks&quot;, &quot;gnomad_r3_non_cancer&quot;, &quot;gnomad_r3_non_neuro&quot;, &quot;gnomad_r3_non_topmed&quot;, &quot;gnomad_r3_non_v2&quot;, &quot;gnomad_r2_1&quot;, &quot;gnomad_r2_1_controls&quot;, &quot;gnomad_r2_1_non_cancer&quot;, &quot;gnomad_r2_1_non_neuro&quot;, &quot;gnomad_r2_1_non_topmed&quot;, &quot;exac&quot;&#93; |

```javascript
const result = await host.mcp("variants", "region_variants", {"chrom": "1", "start": 55039475, "stop": 55064852, "dataset": "gnomad_r4"})
```

### `liftover_variant` {/* #liftover_variant */}

透過 gnomAD 對映表在 GRCh37 與 GRCh38 間轉換變異 ID。source_build 必須匹配輸入座標；方向錯誤可能得到零結果，而非報錯。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `variant_id` | 字串 | **必填** |
| `source_build` | 字串 | 可選; 預設值： &quot;GRCh37&quot;; 列舉： &#91;&quot;GRCh37&quot;, &quot;GRCh38&quot;&#93; |

```javascript
const result = await host.mcp("variants", "liftover_variant", {"variant_id": "1-55516888-G-GA", "source_build": "GRCh37"})
```

### `clinvar_variants` {/* #clinvar_variants */}

獲取 gnomAD 映象中的基因 ClinVar 變異，包含臨床意義、稽核狀態和星級。clinvar_release_date 標識所用快照；gene_symbol 與 gene_id 二選一。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | 可選 |
| `gene_id` | 字串 | 可選 |

```javascript
const result = await host.mcp("variants", "clinvar_variants", {"gene_symbol": "BRCA1"})
```

### `structural_variants` {/* #structural_variants */}

列出 gnomAD 中與基因重疊的結構變異。gene_symbol 與 gene_id 二選一；dataset 需選擇對應的 SV 資料釋出，且組裝與變異 ID 均隨釋出變化。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | 可選 |
| `gene_id` | 字串 | 可選 |
| `dataset` | 字串 | 可選; 預設值： &quot;gnomad_sv_r4&quot;; 列舉： &#91;&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;&#93; |

```javascript
const result = await host.mcp("variants", "structural_variants", {"gene_symbol": "TP53", "dataset": "gnomad_sv_r4"})
```

### `get_structural_variant` {/* #get_structural_variant */}

按釋出專屬 SV ID 查詢 gnomAD 結構變異。dataset 必須與該 ID 的來源釋出一致，不能跨釋出直接複用 ID。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `sv_id` | 字串 | **必填** |
| `dataset` | 字串 | 可選; 預設值： &quot;gnomad_sv_r4&quot;; 列舉： &#91;&quot;gnomad_sv_r4&quot;, &quot;gnomad_sv_r2_1&quot;&#93; |

```javascript
const result = await host.mcp("variants", "get_structural_variant", {"sv_id": "DEL_CHR17_A5250EA9", "dataset": "gnomad_sv_r4"})
```

### `mitochondrial_variants` {/* #mitochondrial_variants */}

按線粒體基因或 chrM 座標區間查詢 gnomAD 線粒體變異，保留異質性相關計數。只支援 GRCh38 的 gnomad_r3 和 gnomad_r4，不能使用 r2.1 或 ExAC。基因與區間二選一；未知基因返回 gene_id=null、原查詢和空列表。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `gene_symbol` | string | 可選 |
| `gene_id` | string | 可選 |
| `region_start` | integer | 可選; minimum: `1`; maximum: `999999999` |
| `region_stop` | integer | 可選; minimum: `1`; maximum: `999999999` |
| `dataset` | string | 可選; default: `"gnomad_r4"`; enum: `["gnomad_r4", "gnomad_r3"]` |

```javascript
const result = await host.mcp("variants", "mitochondrial_variants", {"gene_symbol": "MT-TL1", "dataset": "gnomad_r4"})
```

NCBI 聯絡郵箱在 [Settings → Credentials → Literature access → Contact email](../tools/credentials.md) 中儲存，下方 ClinVar/dbSNP 查詢使用此配置。

### `clinvar_search` {/* #clinvar_search */}

直接檢索 NCBI ClinVar，返回變異、臨床意義、稽核狀態和星級。須配置供科研資料服務使用的聯絡郵箱。query 支援 Entrez 欄位與布林語法；返回總數及截斷標誌。上游繁忙出現 HTTP 500 時，可稍後重試一次。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("variants", "clinvar_search", {"query": "BRCA1 pathogenic[CLIN_SIG]", "max_records": 50})
```

### `clinvar_get_records` {/* #clinvar_get_records */}

批次獲取 ClinVar VCV、RCV 或裸 variation ID 的完整記錄，最多 50 項，支援帶版本 VCV。需要聯絡郵箱；RCV 會解析到父 VCV。rsID 應使用 clinvar_variant_by_rsid；未找到輸入會明確列出。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | &#91;'字串', '陣列'&#93; | **必填** |

```javascript
const result = await host.mcp("variants", "clinvar_get_records", {"accessions": ["VCV000045122", "RCV000019428", "45123"]})
```

### `clinvar_variant_by_rsid` {/* #clinvar_variant_by_rsid */}

按 dbSNP rsID 獲取所有關聯的 ClinVar variation 記錄。需要聯絡郵箱；一個 rsID 可能對應多個替代等位基因的 VCV。total 是實際匹配總數，truncated 標記截斷；零結果表示未找到關聯記錄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `rsid` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("variants", "clinvar_variant_by_rsid", {"rsid": "rs121913529", "max_records": 50})
```

### `dbsnp_get_rsids` {/* #dbsnp_get_rsids */}

批次獲取 dbSNP RefSNP 記錄，最多 20 個 rsID。需要聯絡郵箱，否則返回 contact_email_required。包含組裝定位、等位基因、群體頻率和 ClinVar 關聯；not_found 與超時未處理的 not_processed 分開列出。merged 狀態應繼續查詢 merged_into。定位為從 1 開始的座標，SPDI 使用從 0 開始的鹼基間座標。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `rsids` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("variants", "dbsnp_get_rsids", {"rsids": ["rs7412", "rs429358"]})
```

### `dbsnp_search_by_region` {/* #dbsnp_search_by_region */}

按區域查詢 dbSNP rsID。需要聯絡郵箱；座標從 1 開始且包含終點，最長 1 Mb，必須匹配 assembly。返回總數、返回數、截斷狀態及實際 Entrez 查詢；取得 ID 後可每批最多 20 項呼叫 dbsnp_get_rsids。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chrom` | 字串 | **必填** |
| `start` | 整數 | **必填** |
| `stop` | 整數 | **必填** |
| `assembly` | 字串 | 可選; 預設值： &quot;GRCh38&quot;; 列舉： &#91;&quot;GRCh38&quot;, &quot;GRCh37&quot;&#93; |
| `max_rsids` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("variants", "dbsnp_search_by_region", {"chrom": "19", "start": 44905000, "stop": 44910000, "assembly": "GRCh38"})
```

</ToolOperationGroup>

## 臨床試驗 {/* #family-7 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search_trials` {/* #search_trials */}

檢索 ClinicalTrials.gov，可按疾病、干預、申辦方、地點、狀態、階段和研究型別篩選。文字欄位支援 Essie 查詢語法；page_token 用於翻頁，count_total 請求總數，advanced_query 可補充高階表示式。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `condition` | 字串 | 可選 |
| `intervention` | 字串 | 可選 |
| `sponsor` | 字串 | 可選 |
| `location` | 字串 | 可選 |
| `status` | 字串陣列 | 可選 |
| `phase` | 字串陣列 | 可選 |
| `study_type` | 字串 | 可選; 列舉： &#91;&quot;INTERVENTIONAL&quot;, &quot;OBSERVATIONAL&quot;, &quot;EXPANDED_ACCESS&quot;&#93; |
| `advanced_query` | 字串 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 10; 最小值： 1; 最大值： 1000 |
| `page_token` | 字串 | 可選 |
| `count_total` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("clinical-trials", "search_trials", {"condition": "lung cancer", "status": ["RECRUITING"], "phase": ["PHASE3"], "count_total": true, "page_size": 10})
```

### `get_trial_details` {/* #get_trial_details */}

按 NCT ID 獲取臨床試驗的資格條件、研究設計、終點、地點、申辦方、日期、入組人數和結果連結。ID 為 NCT 加八位數字，裸數字會補字首。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `nct_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-trials", "get_trial_details", {"nct_id": "NCT03661411"})
```

### `search_by_sponsor` {/* #search_by_sponsor */}

按申辦公司或機構名稱部分匹配試驗，可進一步限制疾病、階段和狀態。用 page_token 翻頁，count_total 獲取匹配總數。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `sponsor_name` | 字串 | **必填** |
| `condition` | 字串 | 可選 |
| `phase` | 字串陣列 | 可選 |
| `status` | 字串陣列 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 10; 最小值： 1; 最大值： 1000 |
| `page_token` | 字串 | 可選 |
| `count_total` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("clinical-trials", "search_by_sponsor", {"sponsor_name": "Pfizer", "phase": ["PHASE3"], "count_total": true})
```

### `search_investigators` {/* #search_investigators */}

按疾病、機構、地點或姓名查詢研究者和研究中心。institution 優先於 location；返回聯絡人、角色、機構、地點及 NCT ID。page_size 限制掃描的試驗數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `condition` | 字串 | 可選 |
| `institution` | 字串 | 可選 |
| `location` | 字串 | 可選 |
| `investigator_name` | 字串 | 可選 |
| `status` | 字串陣列 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("clinical-trials", "search_investigators", {"condition": "Alzheimer", "institution": "Mayo Clinic", "page_size": 20})
```

### `analyze_endpoints` {/* #analyze_endpoints */}

分析主要、次要及其他終點。nct_id 對應單試驗路線，condition 對應跨試驗彙總；同時給出時優先 nct_id。彙總可限制階段和起始日期，結果範圍受 page_size 限制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `nct_id` | 字串 | 可選 |
| `condition` | 字串 | 可選 |
| `phase` | 字串陣列 | 可選 |
| `start_date_after` | 字串 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 50; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("clinical-trials", "analyze_endpoints", {"nct_id": "NCT03661411"})
```

### `search_by_eligibility` {/* #search_by_eligibility */}

按 ClinicalTrials.gov 納入條件搜尋臨床試驗，核對年齡邊界與生物學性別篩選。返回記錄需繼續閱讀原始納入與排除條件，搜尋匹配不能代替實際入組判斷。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `condition` | 字串 | 可選 |
| `eligibility_keywords` | 字串 | 可選 |
| `min_age` | 字串 | 可選 |
| `max_age` | 字串 | 可選 |
| `sex` | 字串 | 可選; 列舉: &#91;&quot;ALL&quot;, &quot;MALE&quot;, &quot;FEMALE&quot;&#93; |
| `status` | 字串陣列 | 可選 |
| `page_size` | 整數 | 可選; 預設值: 10; 最小值: 1; 最大值: 1000 |
| `page_token` | 字串 | 可選 |

```javascript
const result = await host.mcp("clinical-trials", "search_by_eligibility", {"condition": "diabetes", "min_age": "65 Years", "sex": "FEMALE"})
```

</ToolOperationGroup>

## 臨床基因組學 {/* #family-8 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `clingen_gene_validity` {/* #clingen_gene_validity */}

查詢 ClinGen 基因與疾病關係有效性評估，涵蓋 Definitive、Strong、Moderate、Limited、Disputed 等等級。省略 gene 時列出全部評估。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_gene_validity", {"gene": "BRCA2"})
```

### `clingen_dosage_sensitivity` {/* #clingen_dosage_sensitivity */}

查詢 ClinGen 劑量敏感性評估，包括單倍劑量不足和三倍劑量敏感性，可包含 ISCA 區域。基因符號或 ISCA ID 精確篩選；省略則返回全表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | 可選 |
| `include_regions` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_dosage_sensitivity", {"gene": "TP53"})
```

### `clingen_actionability` {/* #clingen_actionability */}

查詢 ClinGen 臨床可干預性評估，包括疾病、干預與結局，以及嚴重性、可能性、有效性和干預性質評分。基因篩選可匹配多基因主題中的任一成員。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | 可選 |
| `context` | 字串 | 可選; 預設值： &quot;both&quot;; 列舉： &#91;&quot;adult&quot;, &quot;pediatric&quot;, &quot;both&quot;&#93; |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_actionability", {"gene": "BRCA1", "context": "adult"})
```

### `clingen_variant_classifications` {/* #clingen_variant_classifications */}

獲取 ClinGen ERepo 專家組依據 ACMG 標準給出的變異分類。gene、caid、hgvs 必須且只能提供一項；完整獲取匹配記錄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | 可選 |
| `caid` | 字串 | 可選 |
| `hgvs` | 字串 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "clingen_variant_classifications", {"gene": "BRCA1"})
```

### `civic_search_genes` {/* #civic_search_genes */}

按精確 Entrez 符號查詢 CIViC 基因，完整分頁並核對數量。返回的 CIViC gene ID 可用於 civic_gene_variants。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `entrez_symbol` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_genes", {"entrez_symbol": "BRAF"})
```

### `civic_gene_variants` {/* #civic_gene_variants */}

按 CIViC gene ID 獲取該基因全部變異，完整分頁並按變異 ID 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_id` | 整數 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_gene_variants", {"gene_id": 5})
```

### `civic_get_variant` {/* #civic_get_variant */}

按 CIViC variant ID 獲取別名、型別、基因關聯及適用的座標；不存在時 found 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `variant_id` | 整數 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_variant", {"variant_id": 12})
```

### `civic_search_variants` {/* #civic_search_variants */}

按名稱子串檢索 CIViC 變異，可限定 CIViC gene ID；完整分頁並按變異 ID 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `name` | 字串 | **必填** |
| `gene_id` | 整數 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_variants", {"name": "V600", "gene_id": 5})
```

### `civic_get_evidence_item` {/* #civic_get_evidence_item */}

獲取一個 CIViC 證據條目，包含疾病/治療背景、證據等級 A–E、型別、方向、臨床意義、評分和來源；不存在時 found 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `evidence_id` | 整數 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_evidence_item", {"evidence_id": 1409})
```

### `civic_search_evidence` {/* #civic_search_evidence */}

按篩選條件檢索 CIViC 證據，完整分頁並核對數量。列舉值必須原樣使用 GraphQL 定義，如 SUPPORTS、DOES_NOT_SUPPORT、ACCEPTED。至少給出一個條件，避免無條件遍歷整個證據庫。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `disease_name` | 字串 | 可選 |
| `therapy_name` | 字串 | 可選 |
| `evidence_level` | 字串 | 可選 |
| `evidence_type` | 字串 | 可選 |
| `evidence_direction` | 字串 | 可選 |
| `significance` | 字串 | 可選 |
| `variant_origin` | 字串 | 可選 |
| `evidence_rating` | 整數 | 可選 |
| `status` | 字串 | 可選 |
| `molecular_profile_name` | 字串 | 可選 |
| `molecular_profile_id` | 整數 | 可選 |
| `variant_id` | 整數 | 可選 |
| `disease_id` | 整數 | 可選 |
| `therapy_id` | 整數 | 可選 |
| `phenotype_id` | 整數 | 可選 |
| `source_id` | 整數 | 可選 |
| `assertion_id` | 整數 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_evidence", {"disease_name": "melanoma", "evidence_level": "A"})
```

### `civic_get_assertion` {/* #civic_get_assertion */}

獲取一個 CIViC 專家斷言，包含分子譜在疾病/治療背景下的證據彙總、AMP/ASCO/CAP 分級、ACMG/ClinGen 程式碼及適用的伴隨診斷標誌；不存在時 found 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `assertion_id` | 整數 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_assertion", {"assertion_id": 7})
```

### `civic_search_assertions` {/* #civic_search_assertions */}

檢索 CIViC 專家斷言，支援型別、方向、等級和狀態組合篩選；完整分頁、核對數量並按 ID 排序。無篩選條件會遍歷整個集合。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `disease_name` | 字串 | 可選 |
| `therapy_name` | 字串 | 可選 |
| `assertion_type` | 字串 | 可選 |
| `assertion_direction` | 字串 | 可選 |
| `significance` | 字串 | 可選 |
| `amp_level` | 字串 | 可選 |
| `status` | 字串 | 可選 |
| `molecular_profile_name` | 字串 | 可選 |
| `molecular_profile_id` | 整數 | 可選 |
| `variant_id` | 整數 | 可選 |
| `variant_name` | 字串 | 可選 |
| `disease_id` | 整數 | 可選 |
| `therapy_id` | 整數 | 可選 |
| `phenotype_id` | 整數 | 可選 |
| `evidence_id` | 整數 | 可選 |
| `summary` | 字串 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_assertions", {"disease_name": "melanoma"})
```

### `civic_get_molecular_profile` {/* #civic_get_molecular_profile */}

按 ID 獲取 CIViC 分子譜，包括名稱、評分和組成變異；證據與斷言關聯到該變異組合。不存在時 found 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mp_id` | 整數 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_get_molecular_profile", {"mp_id": 12})
```

### `civic_search_molecular_profiles` {/* #civic_search_molecular_profiles */}

按名稱子串檢索 CIViC 分子譜，完整分頁並按 ID 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `name` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_molecular_profiles", {"name": "BRAF V600E"})
```

### `civic_search_diseases` {/* #civic_search_diseases */}

按名稱子串檢索 CIViC 疾病，返回 DOID 與名稱，完整分頁並按 ID 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `name` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_diseases", {"name": "melanoma"})
```

### `civic_search_therapies` {/* #civic_search_therapies */}

按名稱子串檢索 CIViC 治療，返回 NCIt ID 與名稱，完整分頁並按 ID 排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `name` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "civic_search_therapies", {"name": "vemurafenib"})
```

### `open_targets_graphql` {/* #open_targets_graphql */}

向 Open Targets Platform 提交 GraphQL 查詢，可查詢靶標、疾病、藥物、關聯、證據、可成藥性與安全性。支援內省查詢；上游 knownDrugs 欄位已改名為 drugAndClinicalCandidates。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `variables` | 物件 | 可選 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_graphql", {"query": "query($id: String!){ target(ensemblId: $id){ approvedSymbol associatedDiseases{ count } } }", "variables": {"id": "ENSG00000157764"}})
```

### `open_targets_disease_drugs` {/* #open_targets_disease_drugs */}

按疾病本體 ID 獲取 Open Targets 的已知或在研藥物，封裝 Disease.drugAndClinicalCandidates。efo_id 可為 EFO、MONDO 等 ID。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `efo_id` | 字串 | **必填** |
| `size` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_drugs", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_disease_targets` {/* #open_targets_disease_targets */}

按 Open Targets 綜合關聯分數，獲取疾病關聯排名靠前的靶標。efo_id 使用疾病本體 ID。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `efo_id` | 字串 | **必填** |
| `size` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_disease_targets", {"efo_id": "MONDO_0004992", "size": 25})
```

### `open_targets_drug` {/* #open_targets_drug */}

按 ChEMBL ID 獲取 Open Targets 藥物詳情，包括名稱、型別、最高臨床階段及靶標/作用機制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `chembl_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("clinical-genomics", "open_targets_drug", {"chembl_id": "CHEMBL1201583"})
```

</ToolOperationGroup>

## 結構與相互作用 {/* #family-9 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `emdb_get_entries` {/* #emdb_get_entries */}

獲取 EMDB 冷凍電鏡條目後設資料，接受 EMD-1234 或數字形式。包含方法、解析度、日期、樣本、擬合 PDB、引文及體素資訊；未報告值為 null。廢棄記錄含 is_obsolete 和 superseded_by，未知 ID 明確報 not_found。僅取後設資料，不下載密度圖體資料。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `emdb_ids` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("structures", "emdb_get_entries", {"emdb_ids": ["EMD-11638", "emd-3061", "1234"]})
```

### `emdb_search_entries` {/* #emdb_search_entries */}

用 Solr 語法檢索 EMDB，分頁獲取精簡記錄。num_found_released 為服務報告的已釋出數量；搜尋也可能包含 OBS 廢棄記錄。released_complete 說明是否取得全部發布匹配，受 max_rows 和數量一致性影響。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `max_rows` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("structures", "emdb_search_entries", {"query": "title:\"apoferritin\" AND resolution:[0 TO 1.5]", "max_rows": 500})
```

### `emdb_get_entry_section` {/* #emdb_get_entry_section */}

獲取 EMDB 指定後設資料章節：publications、map、sample 或 imaging。包括完整作者、密度圖引數、分子組成或顯微鏡實驗條件。未知條目明確返回 not_found；只需摘要時先用 emdb_get_entries。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `emdb_ids` | 字串陣列 | **必填** |
| `section` | 字串 | **必填**; 列舉： &#91;&quot;publications&quot;, &quot;map&quot;, &quot;sample&quot;, &quot;imaging&quot;&#93; |

```javascript
const result = await host.mcp("structures", "emdb_get_entry_section", {"emdb_ids": ["EMD-11638"], "section": "imaging"})
```

### `emdb_get_validation` {/* #emdb_get_validation */}

獲取 EMDB 驗證分析的數值指標，如 Q-score、原子包含率、等值面和模型/密度圖比例。僅返回上游實際計算的專案；缺失值為 null，無分析時 has_validation_analysis 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `emdb_ids` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("structures", "emdb_get_validation", {"emdb_ids": ["EMD-11638", "EMD-3061"]})
```

### `complexportal_get_complexes` {/* #complexportal_get_complexes */}

按 CPX 登入號獲取 Complex Portal 人工整理的複合物，包含名稱、物種、參與物、化學計量、角色、ECO/GO 和交叉引用。按輸入順序返回，未知 ID 列入 not_found。二元相互作用實驗依據應查 IntAct。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `complex_acs` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("structures", "complexportal_get_complexes", {"complex_acs": ["CPX-2158", "CPX-2419"]})
```

### `complexportal_search_by_participant` {/* #complexportal_search_by_participant */}

按 UniProt、ChEBI 或 RNAcentral 參與物 ID 檢索 Complex Portal。participants_only 為 true 時僅匹配已整理的實際參與物；false 也匹配自由文字。完整分頁並核對數量，取得 ID 後用 complexportal_get_complexes 查詳情。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |
| `participants_only` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("structures", "complexportal_search_by_participant", {"accession": "P69905", "participants_only": true})
```

### `intact_fetch_interactions` {/* #intact_fetch_interactions */}

獲取匹配查詢的 IntAct 二元相互作用，支援 UniProt、符號、自由文字或 Solr 語法，並可按 MI 分數與物種篩選。完整獲取並核對總數後，max_records_returned 僅限制輸出行；records_truncated 標明輸出截斷。記錄包含互作雙方、檢測方法、實驗角色、分數和文獻。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `min_mi_score` | 數值 | 可選; 預設值： 0 |
| `max_mi_score` | 數值 | 可選; 預設值： 1 |
| `interactor_species` | 字串陣列 | 可選 |
| `max_records_returned` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("structures", "intact_fetch_interactions", {"query": "P04637", "min_mi_score": 0.45, "interactor_species": ["Homo sapiens"], "max_records_returned": 200})
```

### `intact_get_interactor` {/* #intact_get_interactor */}

將分子解析為全部匹配的 IntAct interactor 記錄。一個 UniProt 登入號可能對應標準蛋白、鏈或亞型，返回 n_matches，不自動只選一個。記錄含標識、物種、型別和相互作用數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |

```javascript
const result = await host.mcp("structures", "intact_get_interactor", {"query": "P04637"})
```

### `intact_get_interaction_details` {/* #intact_get_interaction_details */}

按 IntAct interaction AC 獲取一條互作的完整整理資訊，包括方法、文獻、動力學/親和力、可信度和參與物角色。可關閉參與物詳情；未知 AC 返回 not_found。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `interaction_ac` | 字串 | **必填** |
| `include_participants` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("structures", "intact_get_interaction_details", {"interaction_ac": "EBI-15635490", "include_participants": true})
```

### `intact_build_network` {/* #intact_build_network */}

圍繞 UniProt 種子蛋白構建一層 IntAct 網路。先完整獲取每個種子的互作，再在節點集合內擴充套件有限數量的夥伴；expansion.complete 為 false 時仍可能遺漏夥伴之間的邊。返回節點、邊和每個種子的獲取統計。種子較多會增加完整分頁請求量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `seed_accessions` | 字串陣列 | **必填** |
| `min_mi_score` | 數值 | 可選; 預設值： 0.45 |
| `max_interactors_expanded` | 整數 | 可選; 預設值： 25 |
| `interactor_species` | 字串陣列 | 可選 |

```javascript
const result = await host.mcp("structures", "intact_build_network", {"seed_accessions": ["P04637", "Q00987"], "min_mi_score": 0.45, "max_interactors_expanded": 25})
```

### `pdb_search_structures` {/* #pdb_search_structures */}

按屬性組合檢索 RCSB PDB，至少提供一個條件，各條件為 AND。預設只檢索實驗結構，可用 include_computed_models 納入預測結構。返回 ID、相關性分數、總數和截斷狀態；需用 pdb_get_structures 獲取後設資料。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `text` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `taxonomy_id` | 整數 | 可選 |
| `uniprot_accession` | 字串 | 可選 |
| `experimental_method` | 字串 | 可選 |
| `max_resolution_angstrom` | 數值 | 可選 |
| `ligand_comp_id` | 字串 | 可選 |
| `include_computed_models` | 布林值 | 可選; 預設值： false |
| `max_rows` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("structures", "pdb_search_structures", {"uniprot_accession": "P04637", "experimental_method": "X-RAY DIFFRACTION", "max_rows": 50})
```

### `pdb_get_structures` {/* #pdb_get_structures */}

批次獲取最多 25 個 PDB 條目的標題、方法、解析度、日期、狀態、實體/組裝數量、配體與引文。ID 不區分大小寫並去重；未知 ID 返回 not_found。僅返回後設資料，不下載座標檔案。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pdb_ids` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("structures", "pdb_get_structures", {"pdb_ids": ["1TUP", "1tup", "6XYZ"]})
```

### `pdb_get_entities` {/* #pdb_get_entities */}

獲取 PDB 聚合物實體、鏈、序列長度、物種和 UniProt 對映。每次最多 25 個實體，大組裝應從完整 ID 列表分批指定；明確子集時條目總數為 null。可加入序列，超出 max_bytes 時省略序列並說明原因，保留後設資料。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pdb_id` | 字串 | **必填** |
| `entity_ids` | 字串陣列 | 可選 |
| `include_sequences` | 布林值 | 可選; 預設值： false |
| `max_bytes` | 整數 | 可選; 預設值： 400000 |

```javascript
const result = await host.mcp("structures", "pdb_get_entities", {"pdb_id": "1TUP", "include_sequences": true})
```

### `pdb_get_ligands` {/* #pdb_get_ligands */}

獲取 PDB 條目的非聚合物配體及化學屬性，不包括水。返回實際實體總數及截斷標誌，每次上限 25 個配體；部分缺失實體/組分單獨標為 not_found，無配體時返回空列表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pdb_id` | 字串 | **必填** |
| `max_ligands` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("structures", "pdb_get_ligands", {"pdb_id": "1TUP"})
```

### `alphafold_get_prediction` {/* #alphafold_get_prediction */}

按 UniProt 登入號獲取 AlphaFold DB 預測結構後設資料。一個登入號可有多個模型或提供方；檢查 provider_id、tool_used、序列範圍、模型版本、pLDDT 與置信區間比例。返回座標、PAE、MSA 等可用下載 URL，不直接下載內容。無預測時 has_model 為 false。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `uniprot_accession` | 字串 | **必填** |
| `include_sequence` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("structures", "alphafold_get_prediction", {"uniprot_accession": "P04637"})
```

### `alphafold_check_coverage` {/* #alphafold_check_coverage */}

批次檢查最多 40 個不同 UniProt 登入號的 AlphaFold DB 覆蓋。空值和重複項單獨計數，結果按輸入順序返回，每項包含是否有模型及首個模型摘要；無模型和標識錯誤分別報告。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `uniprot_accessions` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("structures", "alphafold_check_coverage", {"uniprot_accessions": ["P04637", "P38398", "Q9Y6K9"]})
```

</ToolOperationGroup>

## ChEMBL {/* #family-10 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `compound_search` {/* #compound_search */}

按名稱、ChEMBL ID 或 SMILES 檢索化合物，至少提供一種輸入。SMILES 配合 similarity_threshold 為相似性檢索，否則為子結構檢索；結構遍歷受上限約束並標註截斷。按適應證找藥物應使用 drug_search。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `name` | 字串 | 可選 |
| `chembl_id` | 字串 | 可選 |
| `smiles` | 字串 | 可選 |
| `similarity_threshold` | 整數 | 可選; 最小值： 70; 最大值： 100 |
| `max_phase` | 整數 | 可選; 列舉： &#91;0, 1, 2, 3, 4&#93; |
| `limit` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "compound_search", {"name": "aspirin", "limit": 5})
```

### `drug_search` {/* #drug_search */}

按 EFO 適應證檢索已批准藥物或臨床候選物，將適應證關聯到母體分子及撤市/黑框警告。only_approved 限制為 phase 4；可再按分子 ID、藥名和臨床階段篩選。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `indication` | 字串 | **必填** |
| `drug_name` | 字串 | 可選 |
| `molecule_chembl_id` | 字串 | 可選 |
| `max_phase` | 整數 | 可選; 列舉： &#91;0, 1, 2, 3, 4&#93; |
| `only_approved` | 布林值 | 可選; 預設值： false |
| `limit` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "drug_search", {"indication": "hypertension", "only_approved": true, "limit": 10})
```

### `get_admet` {/* #get_admet */}

獲取 ChEMBL 結構計算屬性用於類藥性/ADMET 初篩，包括 ALogP、分子量、PSA、氫鍵供受體、旋轉鍵、規則違反數和 QED。這些是計算屬性，不是實驗 ADMET 測量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("chembl", "get_admet", {"molecule_chembl_id": "CHEMBL25"})
```

### `get_bioactivity` {/* #get_bioactivity */}

檢索 ChEMBL 化合物與靶標的生物活性測量，如 IC50、Ki、Kd、EC50。可按分子、靶標、型別、pChEMBL、數值範圍和單位篩選；返回按 activity_id 排序的一頁及效力摘要。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字串 | 可選 |
| `target_chembl_id` | 字串 | 可選 |
| `activity_type` | 字串 | 可選; 列舉： &#91;&quot;IC50&quot;, &quot;EC50&quot;, &quot;Ki&quot;, &quot;Kd&quot;, &quot;AC50&quot;, &quot;GI50&quot;, &quot;ED50&quot;, &quot;Potency&quot;&#93; |
| `min_pchembl` | 數值 | 可選; 最小值： 0; 最大值： 14 |
| `min_value` | 數值 | 可選 |
| `max_value` | 數值 | 可選 |
| `unit` | 字串 | 可選; 列舉： &#91;&quot;nM&quot;, &quot;uM&quot;, &quot;mM&quot;, &quot;pM&quot;, &quot;M&quot;&#93; |
| `limit` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "get_bioactivity", {"molecule_chembl_id": "CHEMBL25", "activity_type": "IC50", "limit": 10})
```

### `get_mechanism` {/* #get_mechanism */}

獲取 ChEMBL 藥物或臨床候選物的作用機制。可按分子、靶標和 action_type 篩選；鹽形式無結果時嘗試母體分子。返回按 mec_id 排序的一頁及作用型別彙總。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `molecule_chembl_id` | 字串 | 可選 |
| `target_chembl_id` | 字串 | 可選 |
| `action_type` | 字串 | 可選; 列舉： &#91;&quot;INHIBITOR&quot;, &quot;AGONIST&quot;, &quot;ANTAGONIST&quot;, &quot;BLOCKER&quot;, &quot;MODULATOR&quot;, &quot;OPENER&quot;, &quot;ACTIVATOR&quot;, &quot;POSITIVE ALLOSTERIC MODULATOR&quot;, &quot;NEGATIVE ALLOSTERIC MODULATOR&quot;, &quot;PARTIAL AGONIST&quot;, &quot;INVERSE AGONIST&quot;&#93; |
| `limit` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "get_mechanism", {"molecule_chembl_id": "CHEMBL25"})
```

### `target_search` {/* #target_search */}

檢索 ChEMBL 生物靶標，包括蛋白、複合物、家族和物種。支援 ID、精確基因符號、名稱、物種或型別篩選；結果包含組成部分的 UniProt ID 和有上限的交叉引用。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `target_name` | 字串 | 可選 |
| `gene_symbol` | 字串 | 可選 |
| `target_chembl_id` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `target_type` | 字串 | 可選; 列舉： &#91;&quot;SINGLE PROTEIN&quot;, &quot;PROTEIN COMPLEX&quot;, &quot;PROTEIN FAMILY&quot;, &quot;ORGANISM&quot;, &quot;TISSUE&quot;, &quot;CELL-LINE&quot;, &quot;NUCLEIC-ACID&quot;, &quot;SUBCELLULAR&quot;&#93; |
| `limit` | 整數 | 可選; 預設值： 20; 最小值： 1; 最大值： 1000 |

```javascript
const result = await host.mcp("chembl", "target_search", {"gene_symbol": "EGFR", "organism": "Homo sapiens", "limit": 5})
```

</ToolOperationGroup>

## bioRxiv {/* #family-11 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `get_categories` {/* #get_categories */}

列出 bioRxiv 學科類別及 API 使用的 slug，例如 cancer biology 對應 cancer_biology。檢索前用此操作確認合法類別。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("biorxiv", "get_categories", {})
```

### `search_preprints` {/* #search_preprints */}

按日期和可選類別檢索 bioRxiv/medRxiv 預印本。日期範圍、recent_days、recent_count 三選一；都不提供時取最近 60 天。沒有關鍵詞檢索；用 cursor 翻頁。返回 DOI、標題、作者、日期、類別、版本和短摘要。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `server` | 字串 | 可選; 預設值： &quot;biorxiv&quot;; 列舉： &#91;&quot;biorxiv&quot;, &quot;medrxiv&quot;&#93; |
| `category` | 字串 | 可選; 列舉： &#91;&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;&#93; |
| `date_from` | 字串 | 可選 |
| `date_to` | 字串 | 可選 |
| `recent_days` | 整數 | 可選; 最小值： 1 |
| `recent_count` | 整數 | 可選; 最小值： 1 |
| `limit` | 整數 | 可選; 預設值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整數 | 可選; 預設值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_preprints", {"recent_days": 30, "category": "neuroscience", "limit": 20})
```

### `get_preprint` {/* #get_preprint */}

按 DOI 獲取最新預印本的完整後設資料，包括作者、機構、摘要、許可、版本、資助、JATS XML 及 PDF/網頁連結；有期刊發表記錄時提供期刊 DOI。預印本本身未經同行評審。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `doi` | 字串 | **必填** |
| `server` | 字串 | 可選; 預設值： &quot;biorxiv&quot;; 列舉： &#91;&quot;biorxiv&quot;, &quot;medrxiv&quot;&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_preprint", {"doi": "10.1101/339747"})
```

### `search_published_preprints` {/* #search_published_preprints */}

查詢後續發表於同行評審期刊的預印本及關聯 DOI。日期選擇規則同 search_preprints；include_details 可控制詳細程度。publisher 使用期刊 DOI 字首篩選，僅用於 bioRxiv 的該路線。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `server` | 字串 | 可選; 預設值： &quot;biorxiv&quot;; 列舉： &#91;&quot;biorxiv&quot;, &quot;medrxiv&quot;&#93; |
| `publisher` | 字串 | 可選 |
| `include_details` | 布林值 | 可選; 預設值： true |
| `date_from` | 字串 | 可選 |
| `date_to` | 字串 | 可選 |
| `recent_days` | 整數 | 可選; 最小值： 1 |
| `recent_count` | 整數 | 可選; 最小值： 1 |
| `limit` | 整數 | 可選; 預設值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整數 | 可選; 預設值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_published_preprints", {"publisher": "10.1038", "date_from": "2024-01-01", "date_to": "2024-01-05", "limit": 10})
```

### `search_by_funder` {/* #search_by_funder */}

按資助方 ROR ID 或 URL 查詢預印本。必須給出明確日期範圍；資助後設資料自 2025-04-10 起提供。可限制類別並用 cursor 翻頁。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `funder_ror_id` | 字串 | **必填** |
| `date_from` | 字串 | **必填** |
| `date_to` | 字串 | **必填** |
| `server` | 字串 | 可選; 預設值： &quot;biorxiv&quot;; 列舉： &#91;&quot;biorxiv&quot;, &quot;medrxiv&quot;&#93; |
| `category` | 字串 | 可選; 列舉： &#91;&quot;animal behavior and cognition&quot;, &quot;biochemistry&quot;, &quot;bioengineering&quot;, &quot;bioinformatics&quot;, &quot;biophysics&quot;, &quot;cancer biology&quot;, &quot;cell biology&quot;, &quot;clinical trials&quot;, &quot;developmental biology&quot;, &quot;ecology&quot;, &quot;epidemiology&quot;, &quot;evolutionary biology&quot;, &quot;genetics&quot;, &quot;genomics&quot;, &quot;immunology&quot;, &quot;microbiology&quot;, &quot;molecular biology&quot;, &quot;neuroscience&quot;, &quot;paleontology&quot;, &quot;pathology&quot;, &quot;pharmacology and toxicology&quot;, &quot;physiology&quot;, &quot;plant biology&quot;, &quot;scientific communication and education&quot;, &quot;synthetic biology&quot;, &quot;systems biology&quot;, &quot;zoology&quot;&#93; |
| `limit` | 整數 | 可選; 預設值： 10; 最小值： 1; 最大值： 100 |
| `cursor` | 整數 | 可選; 預設值： 0; 最小值： 0 |

```javascript
const result = await host.mcp("biorxiv", "search_by_funder", {"funder_ror_id": "021nxhr62", "date_from": "2025-04-10", "date_to": "2025-05-10", "limit": 10})
```

### `get_content_statistics` {/* #get_content_statistics */}

按月或年獲取 bioRxiv 歷史投稿統計，包括新增、修訂和累計數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `interval` | 字串 | 可選; 預設值： &quot;monthly&quot;; 列舉： &#91;&quot;monthly&quot;, &quot;yearly&quot;&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_content_statistics", {"interval": "yearly"})
```

### `get_usage_statistics` {/* #get_usage_statistics */}

按月或年獲取 bioRxiv 摘要瀏覽、全文瀏覽、PDF 下載及累計使用統計。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `interval` | 字串 | 可選; 預設值： &quot;monthly&quot;; 列舉： &#91;&quot;monthly&quot;, &quot;yearly&quot;&#93; |

```javascript
const result = await host.mcp("biorxiv", "get_usage_statistics", {"interval": "yearly"})
```

</ToolOperationGroup>

## 藥品監管 {/* #family-12 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search_drug_applications` {/* #search_drug_applications */}

按品牌、通用名、成分、申辦方、上市狀態、劑型、途徑或藥理類別檢索 Drugs@FDA 申請。generic 和 pharm_class 依賴舊記錄可能缺少的 openfda 欄位。返回實際總數和截斷標誌；大範圍檢索應按提交日期縮小視窗。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `brand` | 字串 | 可選 |
| `generic` | 字串 | 可選 |
| `active_ingredient` | 字串 | 可選 |
| `sponsor` | 字串 | 可選 |
| `marketing_status` | 字串 | 可選; 列舉： &#91;&quot;Prescription&quot;, &quot;Over-the-counter&quot;, &quot;Discontinued&quot;, &quot;None (Tentative Approval)&quot;&#93; |
| `dosage_form` | 字串 | 可選 |
| `route` | 字串 | 可選 |
| `pharm_class` | 字串 | 可選 |
| `pharm_class_type` | 字串 | 可選; 列舉： &#91;&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;&#93; |
| `search_type` | 字串 | 可選; 預設值： &quot;and&quot;; 列舉： &#91;&quot;and&quot;, &quot;or&quot;&#93; |
| `submission_date_from` | 字串 | 可選 |
| `submission_date_to` | 字串 | 可選 |
| `raw_search` | 字串 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_applications", {"generic": "ATORVASTATIN CALCIUM", "marketing_status": "Prescription", "max_records": 25})
```

### `get_drug_application` {/* #get_drug_application */}

按 NDA、ANDA 或 BLA 申請號獲取 Drugs@FDA 完整記錄，包括申辦方、產品、成分/強度、劑型、給藥途徑、上市狀態、TE code 和提交歷史。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `application_number` | 字串 | **必填** |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_application", {"application_number": "NDA020702"})
```

### `count_drug_applications` {/* #count_drug_applications */}

按一個欄位彙總 Drugs@FDA 申請數量，可使用與檢索相同的篩選條件。count_field 支援便捷名稱或原始 openFDA 欄位路徑；分析型欄位需要時自行新增 .exact。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `count_field` | 字串 | **必填** |
| `brand` | 字串 | 可選 |
| `generic` | 字串 | 可選 |
| `active_ingredient` | 字串 | 可選 |
| `sponsor` | 字串 | 可選 |
| `marketing_status` | 字串 | 可選 |
| `dosage_form` | 字串 | 可選 |
| `route` | 字串 | 可選 |
| `pharm_class` | 字串 | 可選 |
| `pharm_class_type` | 字串 | 可選; 列舉： &#91;&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;&#93; |
| `search_type` | 字串 | 可選; 預設值： &quot;and&quot;; 列舉： &#91;&quot;and&quot;, &quot;or&quot;&#93; |
| `submission_date_from` | 字串 | 可選 |
| `submission_date_to` | 字串 | 可選 |
| `raw_search` | 字串 | 可選 |
| `max_buckets` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("drug-regulatory", "count_drug_applications", {"count_field": "marketing_status"})
```

### `get_drug_statistics` {/* #get_drug_statistics */}

獲取 Drugs@FDA 全庫統計，包括申請總數、上市狀態、主要劑型/途徑和申辦方數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("drug-regulatory", "get_drug_statistics", {})
```

### `list_pharmacologic_classes` {/* #list_pharmacologic_classes */}

列出藥理類別及申請數量。統計僅覆蓋含對應 openfda.pharm_class 欄位的記錄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `class_type` | 字串 | 可選; 預設值： &quot;epc&quot;; 列舉： &#91;&quot;epc&quot;, &quot;moa&quot;, &quot;cs&quot;, &quot;pe&quot;&#93; |
| `max_buckets` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("drug-regulatory", "list_pharmacologic_classes", {"class_type": "epc", "max_buckets": 50})
```

### `get_generic_equivalents` {/* #get_generic_equivalents */}

根據品牌藥的參考申請解析準確活性成分集合，再查詢成分集合匹配的 Drugs@FDA 產品，返回 TE code 和上市狀態供核對。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `brand` | 字串 | **必填** |

```javascript
const result = await host.mcp("drug-regulatory", "get_generic_equivalents", {"brand": "Lipitor"})
```

### `search_drug_labels` {/* #search_drug_labels */}

按成分、名稱或給藥途徑獲取 FDA SPL 藥品標籤，可選擇標籤章節。exact 使用精確欄位；raw_search 與對映篩選條件互斥。返回內容用於核對來源標籤。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `active_ingredient` | 字串 | 可選 |
| `generic_name` | 字串 | 可選 |
| `brand_name` | 字串 | 可選 |
| `route` | 字串 | 可選 |
| `product_type` | 字串 | 可選; 列舉： &#91;&quot;HUMAN PRESCRIPTION DRUG&quot;, &quot;HUMAN OTC DRUG&quot;&#93; |
| `exact` | 布林值 | 可選; 預設值： false |
| `raw_search` | 字串 | 可選 |
| `sections` | 字串陣列 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("drug-regulatory", "search_drug_labels", {"brand_name": "Tylenol", "max_records": 5})
```

</ToolOperationGroup>

## 人類遺傳學 {/* #family-13 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `gwas_associations_for_variant` {/* #gwas_associations_for_variant */}

獲取 GWAS Catalog 中一個 rsID 的關聯，按 p 值從小到大返回。須使用當前 rsID，合併或退役 ID 可能零結果。api_total 為總數，truncated 標記上限；OR 與 beta 按結局型別分別提供。p_value 為 0 可能是浮點下溢，應讀取尾數和指數。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `rs_id` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_variant", {"rs_id": "rs7412", "max_records": 100})
```

### `gwas_associations_for_gene` {/* #gwas_associations_for_gene */}

按基因符號獲取 GWAS Catalog 對映到該基因的變異關聯。對映來自目錄的 Ensembl 流程，並非作者報告；基因間變異可能對映到側翼基因。使用規範大寫符號，結果按 p 值排序並標記截斷。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_gene", {"gene_symbol": "PCSK9", "max_records": 100})
```

### `gwas_associations_for_trait` {/* #gwas_associations_for_trait */}

按當前性狀 ID 或精確標籤獲取 GWAS 關聯，兩者二選一。歷史 EFO ID 可能已遷移到 MONDO/HP，先用 gwas_search_traits 解析。未知 ID/標籤返回零結果。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `efo_id` | 字串 | 可選 |
| `efo_trait` | 字串 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_associations_for_trait", {"efo_id": "MONDO_0005010", "max_records": 100})
```

### `gwas_search_traits` {/* #gwas_search_traits */}

按標籤子串檢索 GWAS 性狀，返回名稱、ID、URI、總數和截斷狀態。目錄混合 EFO、MONDO、HP、OBA 等名稱空間，不能假設所有 ID 都以 EFO 開頭。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_traits", {"query": "coronary", "max_records": 50})
```

### `gwas_search_studies` {/* #gwas_search_studies */}

按性狀註釋或 PubMed ID 檢索 GWAS 研究，至少提供一個篩選條件，多個條件為 AND。返回研究 ID、樣本規模、祖源、分型平臺、佇列及彙總統計可用性，並核對總數。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `efo_id` | 字串 | 可選 |
| `efo_trait` | 字串 | 可選 |
| `pubmed_id` | 字串 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "gwas_search_studies", {"efo_id": "MONDO_0005010", "max_records": 50})
```

### `gwas_get_study` {/* #gwas_get_study */}

按 GCST 登入號獲取一個 GWAS 研究詳情；未知 ID 時 found 為 false、study 為 null。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_study", {"accession_id": "GCST90841394"})
```

### `gwas_get_variant` {/* #gwas_get_variant */}

按 rsID 獲取 GWAS Catalog 變異的位置、對映基因與後果，位置使用 GRCh38。merged 為 1 表示上游合併記錄；未收錄時 variant 為 null。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `rs_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("human-genetics", "gwas_get_variant", {"rs_id": "rs7412"})
```

### `eqtl_list_datasets` {/* #eqtl_list_datasets */}

列出 eQTL Catalogue 資料集，每項對應研究、組織/細胞型別及定量方法。可按精確研究名、組織標籤或 quant_method 篩選。返回 QTD ID 及後設資料；上游不提供總數，truncated 為 false 表示已遍歷完畢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `study_label` | 字串 | 可選 |
| `tissue_label` | 字串 | 可選 |
| `quant_method` | 字串 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_list_datasets", {"study_label": "Alasoo_2018", "quant_method": "ge"})
```

### `eqtl_associations` {/* #eqtl_associations */}

查詢一個 QTD 資料集的分子 QTL，至少指定 gene_id、rsid、variant 或 pos。使用 GRCh38；variant 含 chr 字首和下劃線，pos 區域不帶 chr 字首。僅覆蓋資料集實際檢驗的 cis 視窗；空結果可表示未檢驗或未收錄。檢查 truncated 後再判斷完整性。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `dataset_id` | 字串 | **必填** |
| `gene_id` | 字串 | 可選 |
| `rsid` | 字串 | 可選 |
| `variant` | 字串 | 可選 |
| `pos` | 字串 | 可選 |
| `nlog10p_min` | 數值 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("human-genetics", "eqtl_associations", {"dataset_id": "QTD000266", "gene_id": "ENSG00000130203", "nlog10p_min": 2})
```

### `phewas_instances` {/* #phewas_instances */}

列出可查詢的 PheWeb 門戶、參考組裝和各自支援的介面。FinnGen 使用 GRCh38，BioBank Japan 使用 GRCh37/hg19；跨門戶比較前先轉換座標。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("human-genetics", "phewas_instances", {})
```

### `phewas_variant` {/* #phewas_variant */}

獲取一個變異在 PheWeb 生物庫中的表型關聯，按顯著性排序。變異座標必須匹配所選門戶組裝；返回總數、截斷狀態、變異後設資料與效應/頻率/樣本數。上游未公佈的欄位為 null，未知變異報未找到。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `instance` | 字串 | **必填**; 列舉： &#91;&quot;finngen&quot;, &quot;bbj&quot;&#93; |
| `variant` | 字串 | **必填** |
| `max_phenos` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_variant", {"instance": "finngen", "variant": "19-44908822-C-T", "max_phenos": 50})
```

### `phewas_finngen_gene` {/* #phewas_finngen_gene */}

獲取 FinnGen 基因區域的 PheWAS：每個疾病終點選出區域內關聯最強變異。該區域可超出基因邊界；每個終點都有最優變異並不代表其顯著，應按 p 值篩選。結果按顯著性排序並標記截斷。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | **必填** |
| `max_phenos` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("human-genetics", "phewas_finngen_gene", {"gene_symbol": "PCSK9", "max_phenos": 50})
```

### `phewas_list_phenotypes` {/* #phewas_list_phenotypes */}

獲取 PheWeb 門戶的表型目錄及病例/對照數量。此介面目前支援 FinnGen；BBJ 應使用 phewas_search_phenotypes。檢查返回數量與 truncated。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `instance` | 字串 | 可選; 預設值： &quot;finngen&quot;; 列舉： &#91;&quot;finngen&quot;&#93; |
| `max_records` | 整數 | 可選; 預設值： 3000 |

```javascript
const result = await host.mcp("human-genetics", "phewas_list_phenotypes", {"instance": "finngen", "max_records": 3000})
```

### `phewas_search_phenotypes` {/* #phewas_search_phenotypes */}

按名稱或程式碼檢索 PheWeb 表型，也可能匹配基因或 rsID。支援 FinnGen 和 BBJ，返回 phenocode、顯示名稱及 URL；可用程式碼繼續檢視門戶資料。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `instance` | 字串 | 可選; 預設值： &quot;finngen&quot;; 列舉： &#91;&quot;finngen&quot;, &quot;bbj&quot;&#93; |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("human-genetics", "phewas_search_phenotypes", {"query": "diabetes", "instance": "finngen"})
```

</ToolOperationGroup>

## 表達 {/* #family-14 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `gtex_tissue_sites` {/* #gtex_tissue_sites */}

獲取指定 GTEx 資料釋出的全部組織型別及樣本數、eGene/sGene 數量、顏色和 UBERON ID。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_tissue_sites", {"dataset_id": "gtex_v8"})
```

### `gtex_dataset_info` {/* #gtex_dataset_info */}

列出 GTEx 資料釋出，包含 datasetId、GENCODE/組裝/dbSNP 資訊，以及樣本、受試者和組織數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `dataset_id` | 字串 | 可選 |
| `organization_name` | 字串 | 可選 |

```javascript
const result = await host.mcp("expression", "gtex_dataset_info", {})
```

### `gtex_sample_info` {/* #gtex_sample_info */}

獲取固定 GTEx 資料釋出的樣本與供體後設資料，可按組織、資料型別或受試者篩選。分頁並核對總數；無篩選結果較大，建議限定條件或 max_samples。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字串 | 可選 |
| `data_type` | 字串 | 可選 |
| `subject_id` | 字串 | 可選 |
| `max_samples` | 整數 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_sample_info", {"tissue_site_detail_id": "Liver", "data_type": "RNASEQ", "max_samples": 100})
```

### `gtex_resolve_genes` {/* #gtex_resolve_genes */}

將基因符號或無版本 Ensembl ID 解析為該 GTEx 資料釋出使用的帶版本 GENCODE ID，供表達和 eQTL 操作使用。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `genes` | 字串陣列 | **必填** | 7 / 0 / 0 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_resolve_genes", {"genes": ["GAPDH", "BRCA2"]})
```

### `gtex_median_expression` {/* #gtex_median_expression */}

獲取一個或多個帶版本 GENCODE ID 在各組織的表達中位數 TPM；省略組織表示全部組織。按基因/組織行分頁並核對數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gencode_ids` | 字串陣列 | **必填** |
| `tissue_site_detail_ids` | 字串陣列 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_median_expression", {"gencode_ids": ["ENSG00000111640.14"]})
```

### `gtex_expression_summary` {/* #gtex_expression_summary */}

彙總一個基因在全部組織中的表達，按中位 TPM 降序排列。接受符號或 Ensembl ID，並先解析為帶版本 GENCODE ID。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | **必填** |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_expression_summary", {"gene": "GAPDH"})
```

### `gtex_gene_expression` {/* #gtex_gene_expression */}

按帶版本 GENCODE ID 獲取各組織逐樣本 TPM 陣列及樣本數，不是聚合表達值；省略組織表示全部組織。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gencode_id` | 字串 | **必填** |
| `tissue_site_detail_ids` | 字串陣列 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_gene_expression", {"gencode_id": "ENSG00000111640.14", "tissue_site_detail_ids": ["Whole_Blood"]})
```

### `gtex_top_expressed_genes` {/* #gtex_top_expressed_genes */}

獲取一個組織按中位 TPM 排名前 n 的基因，排序由上游 API 完成；filter_mt_gene 預設排除線粒體基因。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字串 | **必填** |
| `n` | 整數 | 可選; 預設值： 100 |
| `filter_mt_gene` | 布林值 | 可選; 預設值： true |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_top_expressed_genes", {"tissue_site_detail_id": "Whole_Blood", "n": 20})
```

### `gtex_eqtl_genes` {/* #gtex_eqtl_genes */}

獲取一個組織全部 eGene，即至少有一個顯著 cis-eQTL 的基因。完整分頁並核對數量，max_genes 限制輸出行數。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `tissue_site_detail_id` | 字串 | **必填** |
| `max_genes` | 整數 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_eqtl_genes", {"tissue_site_detail_id": "Pancreas", "max_genes": 100})
```

### `gtex_single_tissue_eqtls` {/* #gtex_single_tissue_eqtls */}

獲取基因和/或變異的預計算顯著單組織 cis-eQTL，可進一步限定組織；分頁並核對數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gencode_id` | 字串 | 可選 |
| `variant_id` | 字串 | 可選 |
| `tissue_site_detail_id` | 字串 | 可選 |
| `max_results` | 整數 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_single_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_multi_tissue_eqtls` {/* #gtex_multi_tissue_eqtls */}

按帶版本 GENCODE ID 獲取 METASOFT 多組織 cis-eQTL 元分析，可限制變異。返回各變異的逐組織 m-value、NES、p 值和標準誤。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gencode_id` | 字串 | **必填** |
| `variant_id` | 字串 | 可選 |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_multi_tissue_eqtls", {"gencode_id": "ENSG00000111640.14"})
```

### `gtex_calculate_eqtl` {/* #gtex_calculate_eqtl */}

為某個組織中的基因/變異組合即時計算 eQTL，包括非顯著組合。返回 p 值、NES、t 統計量、MAF 及逐樣本基因型和表達陣列。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gencode_id` | 字串 | **必填** |
| `variant_id` | 字串 | **必填** |
| `tissue_site_detail_id` | 字串 | **必填** |
| `dataset_id` | 字串 | 可選; 預設值： &quot;gtex_v8&quot; |

```javascript
const result = await host.mcp("expression", "gtex_calculate_eqtl", {"gencode_id": "ENSG00000111640.14", "variant_id": "chr12_6452899_G_A_b38", "tissue_site_detail_id": "Whole_Blood"})
```

</ToolOperationGroup>

## 蛋白註釋 {/* #family-15 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `get_domain_architecture` {/* #get_domain_architecture */}

獲取 UniProt 蛋白的完整 InterPro 結構域架構，包括成員資料庫簽名和片段座標；分頁結果與服務數量核對。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_domain_architecture", {"accessions": ["P04637"]})
```

### `search_interpro_entries` {/* #search_interpro_entries */}

按關鍵詞檢索 InterPro 或 Pfam、SMART、PROSITE、PANTHER、CDD 等成員資料庫條目，完整遍歷遊標並核對數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |
| `entry_type` | 字串 | 可選 |
| `source_db` | 字串 | 可選; 預設值： &quot;interpro&quot; |
| `go_term` | 字串 | 可選 |

```javascript
const result = await host.mcp("protein-annotation", "search_interpro_entries", {"query": "kinase", "source_db": "pfam"})
```

### `get_interpro_entry` {/* #get_interpro_entry */}

獲取 InterPro IPR 或 Pfam PF 條目的詳情，依據登入號字首選擇介面。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_interpro_entry", {"accession": "IPR000719"})
```

### `search_pfam_clans` {/* #search_pfam_clans */}

按關鍵詞檢索 Pfam clan，即登入號以 CL 開頭的家族集合。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |

```javascript
const result = await host.mcp("protein-annotation", "search_pfam_clans", {"query": "kinase"})
```

### `get_pfam_clan` {/* #get_pfam_clan */}

獲取 Pfam clan 詳情及完整、已排序的成員家族列表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `clan_accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_clan", {"clan_accession": "CL0016"})
```

### `get_pfam_family_proteins` {/* #get_pfam_family_proteins */}

獲取 Pfam 家族的成員蛋白，支援完整分頁核對或僅返回數量。大型家族優先使用 count_only。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pfam_accession` | 字串 | **必填** |
| `reviewed_only` | 布林值 | 可選; 預設值： false |
| `tax_id` | 整數 | 可選 |
| `count_only` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteins", {"pfam_accession": "PF00069", "count_only": true})
```

### `get_pfam_family_proteomes` {/* #get_pfam_family_proteomes */}

獲取包含 Pfam 家族成員的蛋白質組。由於上游深層遊標分頁存在缺陷，count_only 預設開啟。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `pfam_accession` | 字串 | **必填** |
| `count_only` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("protein-annotation", "get_pfam_family_proteomes", {"pfam_accession": "PF00069"})
```

### `get_protein_atlas_gene` {/* #get_protein_atlas_gene */}

按 Ensembl gene ID 或符號獲取 Human Protein Atlas 基因記錄，包括組織、亞細胞、病理、血液、腦表達和抗體資訊。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene` | 字串 | **必填** |
| `full` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("protein-annotation", "get_protein_atlas_gene", {"gene": "TP53"})
```

### `search_protein_atlas` {/* #search_protein_atlas */}

透過 Human Protein Atlas search_download 批次檢索，並選擇所需返回列。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `columns` | 字串 | 可選; 預設值： &quot;g,gs,eg,gd,up,chr,chrp,scl&quot; |

```javascript
const result = await host.mcp("protein-annotation", "search_protein_atlas", {"query": "kinase"})
```

### `map_string_ids` {/* #map_string_ids */}

將基因符號/別名對映為 STRING 蛋白 ID。每項輸入均進入對映結果或 unmapped 列表，便於核對遺漏。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `symbols` | 字串陣列 | **必填** |
| `species` | 整數 | 可選; 預設值： 9606 |

```javascript
const result = await host.mcp("protein-annotation", "map_string_ids", {"symbols": ["TP53", "BRCA1", "EGFR"]})
```

### `get_string_network` {/* #get_string_network */}

按物種和置信閾值獲取 STRING 蛋白相互作用網路。先對映輸入符號並報告未對映項；單個對映輸入請求 10 個鄰居，多個對映輸入不擴充套件。nodes 包含完整返回網路；只需輸入節點時篩選 is_query，全部輸入別名在 queries 中。n_nodes 不是輸入數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `symbols` | 字串陣列 | **必填** |
| `species` | 整數 | 可選; 預設值: 9606 |
| `required_score` | 整數 | 可選; 預設值: 700 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_network", {"symbols": ["TP53", "BRCA1", "EGFR"], "required_score": 700})
```

### `get_string_similarity_scores` {/* #get_string_similarity_scores */}

獲取基因集合中的 STRING Smith-Waterman 蛋白相似性 bitscore。結果是稀疏的；缺少一對記錄表示未記錄相似性，不等於分數為零。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `symbols` | 字串陣列 | **必填** |
| `species` | 整數 | 可選; 預設值： 9606 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_similarity_scores", {"symbols": ["TP53", "MDM2", "MDM4"]})
```

### `get_string_best_similarity_hits` {/* #get_string_best_similarity_hits */}

為每個輸入蛋白獲取目標物種中的最佳同源命中；target_species 為 null 時在所有物種中查詢最佳命中。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `symbols` | 字串陣列 | **必填** |
| `species` | 整數 | 可選; 預設值： 9606 |
| `target_species` | 整數 | 可選 |

```javascript
const result = await host.mcp("protein-annotation", "get_string_best_similarity_hits", {"symbols": ["TP53"], "target_species": 10090})
```

</ToolOperationGroup>

## 腫瘤模型 {/* #family-16 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `cbioportal_list_studies` {/* #cbioportal_list_studies */}

列出 cBioPortal 腫瘤研究，可按關鍵詞和/或精確癌種 ID 篩選。返回研究 ID、名稱、癌種、參考組裝、文獻和各資料型別樣本數。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `keyword` | 字串 | 可選 |
| `cancer_type_id` | 字串 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_list_studies", {"keyword": "glioma"})
```

### `cbioportal_get_study` {/* #cbioportal_get_study */}

按 ID 獲取 cBioPortal 研究詳情，包括各資料型別樣本數、從集合讀取的樣本/患者數，以及分子譜。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `study_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_get_study", {"study_id": "msk_impact_2017"})
```

### `cbioportal_mutations_in_gene` {/* #cbioportal_mutations_in_gene */}

按 HUGO 符號獲取 cBioPortal 研究中某基因的全部突變及復發彙總，包括突變數量、突變樣本數、型別與蛋白變化分佈。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | **必填** |
| `study_id` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutations_in_gene", {"gene_symbol": "IDH1", "study_id": "difg_msk_2023"})
```

### `cbioportal_mutation_frequency` {/* #cbioportal_mutation_frequency */}

查詢 cBioPortal 基因突變頻率。分母使用該基因確實完成相應分子檢測的樣本數，而不是研究中的所有樣本；保留研究、分子資料集、樣本與缺失資訊後再比較頻率。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | **必填** |
| `study_ids` | 字串陣列 | **必填**; 最少項數: 1; 最多項數: 12 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_mutation_frequency", {"gene_symbol": "KRAS", "study_ids": ["msk_impact_2017", "difg_msk_2023"]})
```

### `cbioportal_cna_in_gene` {/* #cbioportal_cna_in_gene */}

獲取 cBioPortal 研究中一個基因的離散複製數變化，預設篩選深度缺失與擴增，並返回完整逐樣本變化分佈。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `gene_symbol` | 字串 | **必填** |
| `study_id` | 字串 | **必填** |
| `event_type` | 字串 | 可選; 預設值： &quot;HOMDEL_AND_AMP&quot;; 列舉： &#91;&quot;HOMDEL_AND_AMP&quot;, &quot;HOMDEL&quot;, &quot;AMP&quot;, &quot;GAIN&quot;, &quot;HETLOSS&quot;, &quot;DIPLOID&quot;, &quot;ALL&quot;&#93; |
| `max_records` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_cna_in_gene", {"gene_symbol": "CDKN2A", "study_id": "msk_impact_2017"})
```

### `cbioportal_clinical_attributes` {/* #cbioportal_clinical_attributes */}

列出 cBioPortal 研究的患者級和樣本級臨床屬性，突出顯示生存終點及總生存資料是否存在。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `study_id` | 字串 | **必填** |
| `max_records` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("cancer-models", "cbioportal_clinical_attributes", {"study_id": "brca_tcga_pan_can_atlas_2018"})
```

</ToolOperationGroup>

## RNA {/* #family-17 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `get_family` {/* #get_family */}

按 RF 登入號或家族名稱獲取 Rfam 後設資料，返回扁平記錄及 raw 中的完整上游 JSON。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_family", {"family": "RF00005"})
```

### `get_seed_alignment` {/* #get_seed_alignment */}

獲取 Rfam 種子比對，預設 Stockholm（含共識二級結構行），也可返回含 gap 的比對 FASTA。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |
| `fmt` | 字串 | 可選; 預設值： &quot;stockholm&quot;; 列舉： &#91;&quot;stockholm&quot;, &quot;fasta&quot;&#93; |
| `max_bytes` | 整數 | 可選; 預設值： 400000 |

```javascript
const result = await host.mcp("rna", "get_seed_alignment", {"family": "RF00162", "fmt": "stockholm"})
```

### `get_covariance_model` {/* #get_covariance_model */}

獲取 Rfam 家族 Infernal 協方差模型 CM 檔案及解析的頭欄位，可供 cmsearch/cmscan 使用。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |
| `max_bytes` | 整數 | 可選; 預設值： 400000 |

```javascript
const result = await host.mcp("rna", "get_covariance_model", {"family": "RF00162"})
```

### `get_tree` {/* #get_tree */}

獲取 Rfam 家族種子系統發育樹，格式為 NHX/Newick 文字。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_tree", {"family": "RF00162"})
```

### `get_sequence_regions` {/* #get_sequence_regions */}

獲取 Rfam 家族在序列資料庫中的全部區域命中並解析 TSV。先檢查 get_family 的 num_full；極大家族的該上游介面可能返回 403。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_sequence_regions", {"family": "RF00162"})
```

### `get_structure_mapping` {/* #get_structure_mapping */}

獲取 Rfam 家族到 PDB 的殘基層級結構對映，並按確定順序排序。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "get_structure_mapping", {"family": "RF00162"})
```

### `accession_to_id` {/* #accession_to_id */}

將 Rfam 登入號轉換為家族名稱，例如 RF00005 轉為 tRNA。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "accession_to_id", {"accession": "RF00005"})
```

### `id_to_accession` {/* #id_to_accession */}

將 Rfam 家族名稱轉換為登入號，例如 tRNA 轉為 RF00005。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `family_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("rna", "id_to_accession", {"family_id": "tRNA"})
```

### `search_sequence` {/* #search_sequence */}

透過 Rfam 官方批次端點搜尋 RNA 序列。等待期間保留返回的作業身份，尚未完成的響應不代表零匹配。完成後檢查命中結果和來源資訊；響應失敗時先診斷或恢復已有作業，不要反覆提交。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `sequence` | 字串 | **必填** |
| `max_wait_s` | 數值 | 可選; 預設值： 300 |
| `poll_interval_s` | 數值 | 可選; 預設值： 5 |

```javascript
const result = await host.mcp("rna", "search_sequence", {"sequence": "GGUUCCGGGAAGGCAGCAGGUGGAAACCUGCCA"})
```

</ToolOperationGroup>

## 組學檔案 {/* #family-18 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `ena_query_runs` {/* #ena_query_runs */}

按 tax_id、library_strategy 或 keyword 發現公開 ENA 執行；至少提供一個條件，組合條件按 AND 匹配。返回查詢表示式、後設資料、實際返回數與 truncated。物種條件包含分類後代；關鍵詞查詢標題和描述，不接受任意 ENA 查詢語法。最多返回 1000 條，無分頁遊標；截斷時縮小條件。n_runs_returned 不是全部匹配數。

至少提供一個列出的檢索條件；完整組合約束見下載的 schema。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `tax_id` | integer | 可選; minimum: `1`; maximum: `2147483647` |
| `library_strategy` | string | 可選; enum: `["AMPLICON", "ATAC-seq", "Bisulfite-Seq", "CLONE", "CLONEEND", "CTS", "ChIA-PET", "ChIP-Seq", "ChM-Seq", "DNase-Hypersensitivity", "EST", "FAIRE-seq", "FINISHING", "FL-cDNA", "GBS", "Hi-C", "MBD-Seq", "MNase-Seq", "MRE-Seq", "MeDIP-Seq", "NOMe-Seq", "OTHER", "POOLCLONE", "RAD-Seq", "RIP-Seq", "RNA-Seq", "Ribo-Seq", "SELEX", "Synthetic-Long-Read", "Targeted-Capture", "Tethered Chromatin Conformation Capture", "Tn-Seq", "VALIDATION", "WCS", "WGA", "WGS", "WXS", "miRNA-Seq", "ncRNA-Seq", "snRNA-seq", "ssRNA-seq"]` |
| `keyword` | string | 可選; minLength: `1`; maxLength: `200`; pattern: `"^(?=[\\s\\S]*\\S)[^\"\\\\*?\\u0000-\\u001f\\u007f]+$"` |
| `limit` | integer | 可選; default: `100`; minimum: `1`; maximum: `1000` |

```javascript
const result = await host.mcp("omics-archives", "ena_query_runs", {"tax_id": 6239, "library_strategy": "RNA-Seq", "keyword": "transcriptome", "limit": 20})
```

### `ena_get_submitted_files` {/* #ena_get_submitted_files */}

查詢某個 ERR/SRR/DRR 執行的原始提交檔案清單，包括上游路徑、格式、大小和 MD5；與 ena_get_run_files 的歸檔生成 FASTQ 分開。found=true 但 submitted_available=false 表示沒有列出提交檔案，不表示執行不存在。ftp_location 保留上游路徑，可能沒有協議字首，檔名可能含字面 #，不能當作已經編碼的 URL 直接解析。此操作不下載或校驗檔案。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `run_accession` | string | **必填**; minLength: `1`; maxLength: `64` |

```javascript
const result = await host.mcp("omics-archives", "ena_get_submitted_files", {"run_accession": "ERR10015065"})
```

### `ena_search_runs` {/* #ena_search_runs */}

按 ENA/INSDC 的專案、實驗、樣本或執行登入號查詢公開測序執行，返回物種、平臺與文庫後設資料，不下載檔案。GEO GSE/GSM、E-MTAB 和 MGYS 需先找到關聯的 INSDC 登入號。本工具不是關鍵詞檢索；最多返回 1000 條，無分頁遊標，重複呼叫不能補齊截斷佇列。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填**; 最短長度: 1; 最長長度: 64 |
| `limit` | 整數 | 可選; 預設值: 100; 最小值: 1; 最大值: 1000 |

```javascript
const result = await host.mcp("omics-archives", "ena_search_runs", {"accession": "PRJNA123835", "limit": 100})
```

### `ena_get_run_files` {/* #ena_get_run_files */}

查詢一個 ERR/SRR/DRR 執行的歸檔生成 FASTQ 清單，包括 URL、位元組數及上游 MD5，不下載或校驗檔案。PAIRED 不保證恰有兩個檔案；file_index 僅代表報告順序，不代表 R1/R2。已找到執行但未列出 FASTQ，與未找到執行不同；提交的 BAM/CRAM/SRA 不在本工具範圍。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `run_accession` | 字串 | **必填**; 最短長度: 1; 最長長度: 64 |

```javascript
const result = await host.mcp("omics-archives", "ena_get_run_files", {"run_accession": "SRR037073"})
```

### `arrayexpress_search_experiments` {/* #arrayexpress_search_experiments */}

檢索 ArrayExpress/BioStudies 功能基因組實驗。關鍵詞、物種、研究型別、技術、釋出日期和額外分面組合為 AND；完整獲取並按 totalHits 核對。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `study_type` | 字串 | 可選 |
| `technology` | 字串 | 可選 |
| `released_after` | 字串 | 可選 |
| `released_before` | 字串 | 可選 |
| `extra_facets` | 物件 | 可選 |
| `max_records` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_search_experiments", {"organism": "Homo sapiens", "study_type": "ChIP-seq", "max_records": 50})
```

### `arrayexpress_get_experiment` {/* #arrayexpress_get_experiment */}

獲取一個 ArrayExpress 實驗的整理後設資料，包括型別、物種、樣本/測定數量、設計、因子、作者、文獻、方案、陣列和檔案摘要。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_files` {/* #arrayexpress_get_experiment_files */}

列出一個 ArrayExpress 實驗的全部檔案、名稱、大小、型別、格式、說明與下載 URL，並附帶 /info 報告的檔案數供對照。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_files", {"accession": "E-MTAB-5061"})
```

### `arrayexpress_get_experiment_samples` {/* #arrayexpress_get_experiment_samples */}

獲取 ArrayExpress 實驗逐樣本 SDRF 註釋，保留 MAGE-TAB 原始表頭，重複列新增序號。無 SDRF 時返回 error 為 no_sdrf。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |
| `max_rows_returned` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("omics-archives", "arrayexpress_get_experiment_samples", {"accession": "E-MTAB-5061", "max_rows_returned": 200})
```

### `geo_search_series` {/* #geo_search_series */}

搜尋 GEO DataSets 並返回系列級後設資料。term 使用 E-utilities 語法，可加入 gse&#91;ETYP&#93; 限制為 Series。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `term` | 字串 | **必填** |
| `retmax` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("omics-archives", "geo_search_series", {"term": "asthma AND gse[ETYP]", "retmax": 20})
```

### `geo_get_series` {/* #geo_get_series */}

按 GSE 登入號獲取 GEO 系列結構化後設資料，包括設計、平臺、樣本特徵、建庫資訊和補充檔案 URL。此操作不會下載資料表。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "geo_get_series", {"accessions": ["GSE131907"]})
```

### `metabolights_list_studies` {/* #metabolights_list_studies */}

列出全部公開 MetaboLights 登入號並按數字排序，附服務報告總數。上游沒有研究搜尋介面，應在候選後設資料中篩選標題或描述。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("omics-archives", "metabolights_list_studies", {})
```

### `metabolights_get_studies` {/* #metabolights_get_studies */}

按 MTBLS 登入號獲取 MetaboLights 的 ISA 後設資料，包括標題、狀態、年份、物種、測定、因子、樣本數和方案；可附逐樣本表。未知或私有專案列入 not_found。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |
| `include_samples` | 布林值 | 可選; 預設值： false |
| `max_sample_rows_returned` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_studies", {"accessions": ["MTBLS1"], "include_samples": false})
```

### `metabolights_get_study_files` {/* #metabolights_get_study_files */}

獲取公開 MetaboLights 研究的完整檔案清單，包括頂層 ISA-Tab、MAF、目錄項，預設遞迴獲取 FILES 資料目錄。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |
| `include_data_files` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("omics-archives", "metabolights_get_study_files", {"accession": "MTBLS1"})
```

### `metabolights_search_data_files` {/* #metabolights_search_data_files */}

在 MetaboLights 研究的 FILES 目錄中按 glob 匹配原始資料檔案，如 &#42;.mzML；省略 pattern 時列出全部資料檔案。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |
| `pattern` | 字串 | 可選 |

```javascript
const result = await host.mcp("omics-archives", "metabolights_search_data_files", {"accession": "MTBLS1", "pattern": "*.zip"})
```

### `mgnify_search_studies` {/* #mgnify_search_studies */}

按自由文字或 biome 譜系查詢 MGnify 宏基因組研究，兩種輸入必須二選一。完整分頁並核對服務數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | 可選 |
| `biome_lineage` | 字串 | 可選 |

```javascript
const result = await host.mcp("omics-archives", "mgnify_search_studies", {"query": "coral"})
```

### `mgnify_get_studies` {/* #mgnify_get_studies */}

按 MGYS 登入號獲取 MGnify 研究記錄；include_analyses 可附完整分析列表及按流程/實驗型別的彙總。未知 ID 列入 missing。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |
| `include_analyses` | 布林值 | 可選; 預設值： false |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_studies", {"accessions": ["MGYS00000410"], "include_analyses": false})
```

### `mgnify_get_study_analyses` {/* #mgnify_get_study_analyses */}

完整列出一個 MGnify 研究的全部 MGYA 分析，包含流程版本、實驗型別、狀態和 run/assembly/sample ID，並核對分頁數量。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "mgnify_get_study_analyses", {"accession": "MGYS00000410"})
```

### `pride_get_project_files` {/* #pride_get_project_files */}

按 PXD／PRD 專案登入號分頁列出 PRIDE 檔案，page 從 0 開始。保留檔案類別、大小、校驗文字與傳輸位置，並根據 next_page 繼續查詢。api_total 為空時不能推斷總量；缺失值保留 null。不要猜測校驗演算法或把 Aspera 地址當作 HTTP 下載地址；返回檔案清單不等於完成下載。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `project_accession` | string | **必填**; maxLength: `32`; pattern: `"^(?:PXD\|PRD)[0-9]{6,}$"` |
| `page` | integer | 可選; default: `0`; minimum: `0`; maximum: `1000000` |
| `page_size` | integer | 可選; default: `100`; minimum: `1`; maximum: `100` |

```javascript
const result = await host.mcp("omics-archives", "pride_get_project_files", {"project_accession": "PXD000001", "page": 0, "page_size": 100})
```

### `pride_search_projects` {/* #pride_search_projects */}

檢索 PRIDE 蛋白質組專案。關鍵詞、物種、儀器、疾病與額外條件組合為 AND；完整獲取並核對 api_total，按登入號升序返回。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `keyword` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `instrument` | 字串 | 可選 |
| `disease` | 字串 | 可選 |
| `extra_filters` | 物件 | 可選 |
| `max_records_returned` | 整數 | 可選; 預設值： 50 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_projects", {"keyword": "phosphoproteome", "organism": "Homo sapiens (human)", "max_records_returned": 50})
```

### `pride_get_projects` {/* #pride_get_projects */}

按 PXD 等登入號獲取 PRIDE 專案完整後設資料，與搜尋結果使用相同記錄結構。未知 ID 列入 not_found。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accessions` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "pride_get_projects", {"accessions": ["PXD010154"]})
```

### `pride_search_project_proteins` {/* #pride_search_project_proteins */}

完整獲取一個 PRIDE 親和蛋白質組專案的蛋白證據行。此介面僅服務親和蛋白質組；傳統質譜 PXD 專案應使用 pride_find_projects_for_protein。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `project_accession` | 字串 | **必填** |
| `keyword` | 字串 | 可選 |

```javascript
const result = await host.mcp("omics-archives", "pride_search_project_proteins", {"project_accession": "PXD010154"})
```

### `pride_find_projects_for_protein` {/* #pride_find_projects_for_protein */}

按 UniProt 登入號查詢包含該蛋白的 PRIDE 質譜專案，再將返回的專案 ID 交給 pride_get_projects 獲取詳情。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `protein_accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("omics-archives", "pride_find_projects_for_protein", {"protein_accession": "P04637"})
```

</ToolOperationGroup>

## CellGuide {/* #family-19 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `get_cell_type_info` {/* #get_cell_type_info */}

按 Cell Ontology ID 或名稱獲取 CellGuide 細胞型別詳情，包含同義詞、本體定義及人工/GPT 描述。解讀描述時注意來源型別。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cell_type` | 字串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_cell_type_info", {"cell_type": "acinar cell"})
```

### `search_cell_types` {/* #search_cell_types */}

按名稱和同義詞自由文字搜尋 CellGuide 細胞型別；工具在下載的後設資料目錄中篩選。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `limit` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("cellguide", "search_cell_types", {"query": "T cell", "limit": 25})
```

### `get_marker_genes` {/* #get_marker_genes */}

獲取 CellGuide 細胞型別的標記基因，可選擇計算得到並帶分數的標記，或文獻整理的經典標記。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cell_type` | 字串 | **必填** |
| `marker_type` | 字串 | 可選; 預設值： &quot;computational&quot;; 列舉： &#91;&quot;computational&quot;, &quot;canonical&quot;&#93; |
| `limit` | 整數 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("cellguide", "get_marker_genes", {"cell_type": "CL:0000084", "marker_type": "computational", "limit": 25})
```

### `get_source_data` {/* #get_source_data */}

獲取 CellGuide 某細胞型別的來源資料集與文獻，包括集合 URL 及其覆蓋組織、疾病和物種。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cell_type` | 字串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_source_data", {"cell_type": "CL:0000622"})
```

### `get_cell_tissues` {/* #get_cell_tissues */}

彙總 CellGuide 來源集合中觀察到某細胞型別的組織，並對組織去重。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `cell_type` | 字串 | **必填** |

```javascript
const result = await host.mcp("cellguide", "get_cell_tissues", {"cell_type": "T cell"})
```

</ToolOperationGroup>

## 調控 {/* #family-20 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `encode_search_experiments` {/* #encode_search_experiments */}

檢索 ENCODE 功能基因組實驗，可按 assay_title、靶標、物種、狀態、釋出日期及額外門戶欄位篩選。完整分頁核對；accessions 保留全部匹配 ID，摘要行受 max_rows 限制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `assay_title` | 字串 | 可選 |
| `target` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `status` | 字串 | 可選; 預設值： &quot;released&quot; |
| `date_released_before` | 字串 | 可選 |
| `extra_filters` | 物件 | 可選 |
| `max_rows` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_experiments", {"target": "CTCF", "assay_title": "TF ChIP-seq", "max_rows": 50})
```

### `encode_search_biosamples` {/* #encode_search_biosamples */}

檢索 ENCODE 細胞系、組織或原代細胞樣本，可按本體名稱、分類、物種、狀態和建立日期篩選。完整核對匹配數；accessions 為完整列表，摘要行有上限。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `term_name` | 字串 | 可選 |
| `classification` | 字串 | 可選 |
| `organism` | 字串 | 可選 |
| `status` | 字串 | 可選; 預設值： &quot;released&quot; |
| `date_created_before` | 字串 | 可選 |
| `extra_filters` | 物件 | 可選 |
| `max_rows` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_search_biosamples", {"term_name": "K562", "classification": "cell line", "max_rows": 25})
```

### `encode_list_files` {/* #encode_list_files */}

按格式、測定和樣本檢索 ENCODE 檔案。assay_term_name 使用本體名稱（如 ChIP-seq），顯示名稱 TF ChIP-seq 應透過 extra_filters 的 assay_title 傳遞。無篩選結果極大，應組合多個條件；摘要行受 max_rows 限制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `file_format` | 字串 | 可選 |
| `assay_term_name` | 字串 | 可選 |
| `biosample_term_name` | 字串 | 可選 |
| `status` | 字串 | 可選; 預設值： &quot;released&quot; |
| `date_created_before` | 字串 | 可選 |
| `extra_filters` | 物件 | 可選 |
| `max_rows` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("regulation", "encode_list_files", {"file_format": "bed", "assay_term_name": "ChIP-seq", "biosample_term_name": "K562", "extra_filters": {"output_type": "peaks", "assembly": "GRCh38"}, "max_rows": 50})
```

### `encode_get_experiment` {/* #encode_get_experiment */}

按 ENCSR 登入號獲取 ENCODE 實驗的穩定欄位，包括測定、靶標、樣本、實驗室、專案、日期、組裝、重複數和 DOI。易變門戶稽核/內部狀態不在記錄中。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_experiment", {"accession": "ENCSR000AKP"})
```

### `encode_get_file` {/* #encode_get_file */}

按 ENCFF 登入號獲取 ENCODE 檔案的格式、輸出型別、測定、組裝、資料集、重複、大小、MD5、讀長和下載地址。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_file", {"accession": "ENCFF002JUR"})
```

### `encode_get_biosample` {/* #encode_get_biosample */}

按 ENCBS 登入號獲取 ENCODE 生物樣本的本體、分類、物種、供體、處理、遺傳修飾、年齡、性別、實驗室及狀態等資訊。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `accession` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "encode_get_biosample", {"accession": "ENCBS013JZP"})
```

### `jaspar_get_matrix` {/* #jaspar_get_matrix */}

按帶版本的 JASPAR matrix ID 獲取 TF 結合譜、PFM、分類、物種、文獻和 logo URL。必須使用 MA0002.2 這樣的完整版本 ID；先用 jaspar_matrix_versions 確認版本。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `matrix_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "jaspar_get_matrix", {"matrix_id": "MA0002.2"})
```

### `jaspar_matrix_versions` {/* #jaspar_matrix_versions */}

列出 JASPAR 基礎矩陣 ID 的全部版本，返回 matrix_id、名稱、集合和 URL 並核對數量。帶版本輸入會歸併到基礎 ID，可據此固定後續查詢版本。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `base_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "jaspar_matrix_versions", {"base_id": "MA0002"})
```

### `jaspar_list_matrices` {/* #jaspar_list_matrices */}

檢索 JASPAR 結合譜，可按集合、分類群、NCBI tax_id、TF 名稱或自由文字篩選，version=latest 可僅取最新版本。完整分頁核對；摘要行受 max_rows 限制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `collection` | 字串 | 可選 |
| `tax_group` | 字串 | 可選 |
| `tax_id` | 整數 | 可選 |
| `name` | 字串 | 可選 |
| `search` | 字串 | 可選 |
| `version` | 字串 | 可選 |
| `max_rows` | 整數 | 可選; 預設值： 1000 |

```javascript
const result = await host.mcp("regulation", "jaspar_list_matrices", {"tax_id": 9606, "collection": "CORE", "version": "latest", "max_rows": 200})
```

### `jaspar_list_species` {/* #jaspar_list_species */}

列出有 JASPAR 結合譜的全部物種與 NCBI tax_id，核對數量；tax_id 可供矩陣查詢使用。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_species", {})
```

### `jaspar_list_taxa` {/* #jaspar_list_taxa */}

列出 JASPAR 分類群，如 vertebrates、plants、fungi；名稱可用於 tax_group 篩選。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_taxa", {})
```

### `jaspar_list_collections` {/* #jaspar_list_collections */}

列出 JASPAR 集合及名稱，供 collection 篩選。CORE 表示整理後的非冗餘結合譜。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_collections", {})
```

### `jaspar_list_releases` {/* #jaspar_list_releases */}

列出 JASPAR 資料釋出的年份、編號和 active 標誌。選擇 motif 時記錄所用釋出，以便後續比較。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("regulation", "jaspar_list_releases", {})
```

### `unibind_search_tfbs` {/* #unibind_search_tfbs */}

檢索 UniBind ChIP-seq 高置信 TFBS 資料集，每項對應實驗、細胞型別與 TF。條件組合為 AND，除 search 外主要為精確匹配；collection 區分 Robust 與 Permissive。total 是實際總數，max_rows 限制返回摘要。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `tf_name` | 字串 | 可選 |
| `cell_line` | 字串 | 可選 |
| `species` | 字串 | 可選 |
| `collection` | 字串 | 可選; 列舉： &#91;&quot;Robust&quot;, &quot;Permissive&quot;&#93; |
| `jaspar_id` | 字串 | 可選 |
| `search` | 字串 | 可選 |
| `max_rows` | 整數 | 可選; 預設值： 200 |

```javascript
const result = await host.mcp("regulation", "unibind_search_tfbs", {"tf_name": "CTCF", "collection": "Robust", "max_rows": 50})
```

### `unibind_get_dataset` {/* #unibind_get_dataset */}

按搜尋返回的 tf_id 獲取 UniBind 資料集詳情，包括來源、TF、條件、JASPAR ID、峰數及逐模型 TFBS 數量/閾值。完整結合位點透過返回的 BED/FASTA URL 下載，而非另一次 MCP 呼叫。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `tf_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("regulation", "unibind_get_dataset", {"tf_id": "ENCSR000AUE.A549_lung_carcinoma.CTCF"})
```

### `unibind_tfbs_in_region` {/* #unibind_tfbs_in_region */}

透過 UCSC hubApi 獲取與區域重疊的 UniBind TFBS。使用支援的 UCSC 組裝、chr 字首及從 0 開始的半開區間；視窗不超過 1000000 bp。每次最多掃描 20000 項，region_scan_complete 為 false 時應縮小視窗，尤其不能將篩選後未命中解釋為沒有位點。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `genome` | 字串 | **必填** |
| `chrom` | 字串 | **必填** |
| `start` | 整數 | **必填** |
| `end` | 整數 | **必填** |
| `tf_name` | 字串 | 可選 |
| `collection` | 字串 | 可選; 預設值： &quot;Robust&quot;; 列舉： &#91;&quot;Robust&quot;, &quot;Permissive&quot;&#93; |
| `max_sites` | 整數 | 可選; 預設值： 2000 |

```javascript
const result = await host.mcp("regulation", "unibind_tfbs_in_region", {"genome": "hg38", "chrom": "chr1", "start": 1000000, "end": 1010000, "collection": "Robust"})
```

</ToolOperationGroup>

## 科研資源 {/* #family-21 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search_grants` {/* #search_grants */}

檢索 Grants.gov 資助機會，至少提供一個條件。預設狀態為 forecasted 和 posted；歷史機會需加入 closed/archived。count_only 只取數量與分面，max_records 限制輸出行，完整獲取與截斷狀態分別報告。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `keyword` | 字串 | 可選 |
| `opportunity_number` | 字串 | 可選 |
| `aln` | 字串 | 可選 |
| `agencies` | 字串陣列 | 可選 |
| `opportunity_statuses` | 字串陣列 | 可選 |
| `eligibilities` | 字串陣列 | 可選 |
| `funding_categories` | 字串陣列 | 可選 |
| `funding_instruments` | 字串陣列 | 可選 |
| `count_only` | 布林值 | 可選; 預設值： false |
| `max_records` | 整數 | 可選; 預設值： 100 |
| `include_facets` | 布林值 | 可選; 預設值： true |

```javascript
const result = await host.mcp("research-resources", "search_grants", {"keyword": "cancer", "agencies": ["HHS-NIH11"], "max_records": 25})
```

### `search_antibodies` {/* #search_antibodies */}

全文檢索 Antibody Registry，按抗體名稱、靶標和目錄文字進行詞項匹配，TP53 與 p53 是不同查詢。匿名訪問深度受限，超出 offset 500 會標記 anonymous_limit_hit；指定頁時從 1 開始並遵守該上限。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `query` | 字串 | **必填** |
| `page` | 整數 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 100 |
| `max_records` | 整數 | 可選; 預設值： 500 |

```javascript
const result = await host.mcp("research-resources", "search_antibodies", {"query": "CD4", "max_records": 100})
```

### `get_antibody` {/* #get_antibody */}

按數字、AB_ 或 RRID:AB_ 標識獲取抗體詳情。一個登入號可能對應多個整理記錄；不存在時 record_count 為 0，不作為異常。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `antibody_id` | 字串 | **必填** |

```javascript
const result = await host.mcp("research-resources", "get_antibody", {"antibody_id": "RRID:AB_3643095"})
```

### `find_antibodies_by_catalog` {/* #find_antibodies_by_catalog */}

按供應商目錄號精確匹配抗體，不區分大小寫；可加供應商名稱縮小結果。工具使用全文候選加本地精確篩選，以處理上游列篩選介面錯誤。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `catalog_number` | 字串 | **必填** |
| `vendor` | 字串 | 可選 |
| `page_size` | 整數 | 可選; 預設值： 100 |

```javascript
const result = await host.mcp("research-resources", "find_antibodies_by_catalog", {"catalog_number": "ab32572"})
```

### `get_antibody_registry_stats` {/* #get_antibody_registry_stats */}

獲取 Antibody Registry 抗體總數及最近更新日期，返回上游統計內容。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("research-resources", "get_antibody_registry_stats", {})
```

</ToolOperationGroup>

## BioMart {/* #family-22 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `list_marts` {/* #list_marts */}

列出 Ensembl BioMart 資料庫。查詢層級為 mart → dataset → attributes/filters，返回的 mart 名用於 list_datasets。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| — | 物件 | No fields; pass an empty 物件. |

```javascript
const result = await host.mcp("biomart", "list_marts", {})
```

### `list_datasets` {/* #list_datasets */}

列出指定 mart 的資料集，返回名稱可用於欄位、篩選與資料查詢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_datasets", {"mart": "ENSEMBL_MART_ENSEMBL"})
```

### `list_common_attributes` {/* #list_common_attributes */}

列出資料集常用欄位的精選子集，建議在請求完整欄位表前使用。mart 引數僅為簽名相容而保留，實際查詢由 dataset 決定。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_common_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_all_attributes` {/* #list_all_attributes */}

列出資料集可用欄位，排除體量較大的同源與晶片探針欄位。結果可能很大，優先使用 list_common_attributes；mart 不參與實際查詢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_all_attributes", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `list_filters` {/* #list_filters */}

列出資料集可用篩選欄位，如染色體和 biotype，可作為 get_data 的 filters 字典。實際查詢由 dataset 決定，mart 不參與。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |

```javascript
const result = await host.mcp("biomart", "list_filters", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl"})
```

### `get_data` {/* #get_data */}

執行 BioMart 資料查詢，返回指定 attributes，可由 filters 限定範圍。實際使用 dataset 定位資料，mart 引數不參與查詢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |
| `attributes` | 字串陣列 | **必填** |
| `filters` | 物件 | 可選 |

```javascript
const result = await host.mcp("biomart", "get_data", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "attributes": ["ensembl_gene_id", "external_gene_name", "chromosome_name"], "filters": {"chromosome_name": "Y", "biotype": "protein_coding"}})
```

### `get_translation` {/* #get_translation */}

在一個 BioMart 資料集中，將單個標識從一種屬性型別對映為另一種；實際查詢由 dataset 決定，mart 不參與。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |
| `from_attr` | 字串 | **必填** |
| `to_attr` | 字串 | **必填** |
| `target` | 字串 | **必填** |

```javascript
const result = await host.mcp("biomart", "get_translation", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "target": "TP53"})
```

### `batch_translate` {/* #batch_translate */}

在同一次 BioMart 查詢中批次對映多個標識，比逐次 get_translation 更高效。實際查詢由 dataset 決定，mart 不參與。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `mart` | 字串 | **必填** |
| `dataset` | 字串 | **必填** |
| `from_attr` | 字串 | **必填** |
| `to_attr` | 字串 | **必填** |
| `targets` | 字串陣列 | **必填** |

```javascript
const result = await host.mcp("biomart", "batch_translate", {"mart": "ENSEMBL_MART_ENSEMBL", "dataset": "hsapiens_gene_ensembl", "from_attr": "hgnc_symbol", "to_attr": "ensembl_gene_id", "targets": ["TP53", "BRCA1", "BRCA2"]})
```

</ToolOperationGroup>

## ZINC {/* #family-23 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `zinc_search_by_id` {/* #zinc_search_by_id */}

批次按最多 100 個 ZINC ID 查詢可購買化合物及供應來源。上游採用提交加輪詢，耗時受 timeout_s 限制。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `zinc_ids` | &#91;'字串', '陣列'&#93; | **必填** |
| `max_results` | 整數 | 可選; 預設值： 50 |
| `timeout_s` | 數值 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_id", {"zinc_ids": ["ZINC000000000012"]})
```

### `zinc_search_by_smiles` {/* #zinc_search_by_smiles */}

按 SMILES 檢索 ZINC22 可購買化學空間，dist 控制從精確到相似結構的範圍；無需單獨相似性工具。此查詢較慢，建議逐步增大 dist。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `smiles` | 字串 | **必填** |
| `dist` | 整數 | 可選; 預設值： 0 |
| `adist` | 整數 | 可選 |
| `max_results` | 整數 | 可選; 預設值： 50 |
| `timeout_s` | 數值 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_smiles", {"smiles": "CC(=O)Oc1ccccc1C(=O)O", "dist": 2})
```

### `zinc_search_by_supplier` {/* #zinc_search_by_supplier */}

批次將最多 100 個供應商目錄號解析為 ZINC 化合物及結構。上游使用提交加輪詢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `supplier_codes` | &#91;'字串', '陣列'&#93; | **必填** |
| `max_results` | 整數 | 可選; 預設值： 50 |
| `timeout_s` | 數值 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_search_by_supplier", {"supplier_codes": ["MCULE-2311834287"]})
```

### `zinc_random_sample` {/* #zinc_random_sample */}

從 ZINC22 隨機抽取可購買化合物，用於篩選集合、屬性基線或誘餌集。count 同時為結果上限；再次呼叫會重新抽樣。上游使用提交加輪詢。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `count` | 整數 | 可選; 預設值： 50 |
| `subset` | 字串 | 可選 |
| `timeout_s` | 數值 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_random_sample", {"count": 25, "subset": "lead-like"})
```

### `zinc_get_3d` {/* #zinc_get_3d */}

為 ZINC 化合物定位適合對接的預生成三維構象檔案，如 db2.gz、mol2.gz、sdf.gz。按 tranche 返回下載位置，每次最多 50 個 ID；此操作解析地址，後續仍需下載並準備對接輸入。

| 欄位 | 型別 | 要求與約束 |
| --- | --- | --- |
| `zinc_ids` | &#91;'字串', '陣列'&#93; | **必填** |
| `timeout_s` | 數值 | 可選; 預設值： 25 |

```javascript
const result = await host.mcp("zinc", "zinc_get_3d", {"zinc_ids": ["ZINC000000000012"]})
```

</ToolOperationGroup>


## 示例響應記錄 {/* #示例响应记录 */}

<ExampleDownload path="/examples/capabilities/public-database-query-receipts.json">示例響應記錄</ExampleDownload>提供準確輸入、截短的響應片段和逐項狀態。請區分返回記錄、空匹配和請求失敗。結果可能是後設資料、結構說明或識別符號；用於研究前，先核對來源欄位與完整性標記。

## GDC {/* #family-24 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `gdc_list_projects` {/* #gdc_list_projects */}

分頁列出 GDC 癌症專案及病例、檔案彙總。篩選條件和結果數量有明確邊界，此操作只發現後設資料，不下載檔案。頁碼從 1 開始，最多 10000 頁；next_page 為空也可能因為總量未知或達到頁數上限，不能單獨證明已獲取全部結果。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `project_ids` | string / array | 可選 |
| `disease_type` | string | 可選; minLength: 1; maxLength: 200 |
| `primary_site` | string | 可選; minLength: 1; maxLength: 200 |
| `page` | integer | 可選; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可選; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_projects", {"project_ids": "TCGA-BRCA", "page_size": 5})
```

### `gdc_list_cases` {/* #gdc_list_cases */}

分頁列出 GDC 病例（樣本提供者）的專案和疾病後設資料，不讀取或下載受控資料。頁碼從 1 開始，最多 10000 頁；結合 total、total_relation 與 next_page 判斷範圍，達到分頁上限時縮小篩選條件。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `project_ids` | string / array | 可選 |
| `submitter_ids` | string / array | 可選 |
| `case_ids` | string / array | 可選 |
| `page` | integer | 可選; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可選; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_list_cases", {"project_ids": ["TCGA-BRCA"], "page_size": 5})
```

### `gdc_search_files` {/* #gdc_search_files */}

檢索 GDC 檔案清單，逐項標明 open 或 controlled。只返回後設資料，不下載檔案或授予訪問權限；受控檔案不提供可下載 URL，狀態為 requires_authorization。access_summary 只描述當前頁。project_id 是單個關聯專案摘要，不代表完整關聯集合。next_page 為空不一定表示全部匹配已取完。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `project_ids` | string / array | 可選 |
| `access` | string | 可選; default: &quot;all&quot;; enum: &#91;&quot;all&quot;, &quot;open&quot;, &quot;controlled&quot;&#93; |
| `data_category` | string | 可選; minLength: 1; maxLength: 200 |
| `data_type` | string | 可選; minLength: 1; maxLength: 200 |
| `data_format` | string | 可選; minLength: 1; maxLength: 50 |
| `file_name` | string | 可選; minLength: 1; maxLength: 500 |
| `page` | integer | 可選; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可選; default: 20; minimum: 1; maximum: 100 |

```javascript
const result = await host.mcp("gdc", "gdc_search_files", {"project_ids": ["TCGA-BRCA"], "access": "open", "page_size": 10})
```

### `gdc_get_file` {/* #gdc_get_file */}

按一個 GDC 檔案 UUID 獲取後設資料和 open／controlled 訪問類別，不下載檔案，也不保證當前使用者可下載。只有公開檔案返回 download_url；受控檔案需在此後設資料查詢之外取得 GDC 授權及相應令牌。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `file_id` | string | **必填**; pattern: &quot;^&#91;0-9a-fA-F&#93;&#123;8&#125;-&#91;0-9a-fA-F&#93;&#123;4&#125;-&#91;1-5&#93;&#91;0-9a-fA-F&#93;&#123;3&#125;-&#91;89abAB&#93;&#91;0-9a-fA-F&#93;&#123;3&#125;-&#91;0-9a-fA-F&#93;&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("gdc", "gdc_get_file", {"file_id": "cb92f61d-041c-4424-a3e9-891b7545f351"})
```

### `gdc_get_manifest` {/* #gdc_get_manifest */}

為最多 100 個檔案 UUID 生成 GDC Data Transfer Tool 清單文字。清單不下載檔案，也不繞過受控訪問授權。按 UUID 對應返回行，不依賴請求順序。任一 UUID 不存在時請求以 HTTP 404 失敗，而非返回部分成功清單。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `file_ids` | array of string | **必填**; minItems: 1; maxItems: 100; uniqueItems: true |

```javascript
const result = await host.mcp("gdc", "gdc_get_manifest", {"file_ids": ["cb92f61d-041c-4424-a3e9-891b7545f351"]})
```

</ToolOperationGroup>

## Zenodo {/* #family-25 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search_records` {/* #search_records */}

使用 Zenodo 查詢語法檢索公開記錄，單次最多 25 條，無需認證。預設僅列出最新版本，all_versions 可包含舊版本。翻頁時保持 query、page_size、sort 和 all_versions 不變。檢索視窗最多 10000 條，pagination_limited 為 true 時需縮小查詢。公開後設資料不代表檔案開放下載；total_relation 區分精確總量 eq 與下界 gte。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `query` | string | **必填**; minLength: 1; maxLength: 1000; pattern: &quot;\\S&quot; |
| `page` | integer | 可選; default: 1; minimum: 1; maximum: 10000 |
| `page_size` | integer | 可選; default: 10; minimum: 1; maximum: 25 |
| `sort` | string | 可選; default: &quot;bestmatch&quot;; enum: &#91;&quot;bestmatch&quot;, &quot;mostrecent&quot;&#93; |
| `all_versions` | boolean | 可選; default: false |

```javascript
const result = await host.mcp("zenodo", "search_records", {"query": "title:climate", "page_size": 5})
```

### `get_record` {/* #get_record */}

按十進位制記錄 ID 獲取 Zenodo 公開後設資料及可見檔案清單，不接受 DOI 或 URL。概念 ID 可能解析到最新版本，應儲存返回的版本級 record_id，區分 requested_record_id 與 concept_record_id。description_html 為未經淨化的上游 HTML。檔案連結和校驗值僅為後設資料，不代表已下載、校驗或探測訪問。檔案清單為 null 表示缺失，空陣列表示明確返回空清單；受限記錄的公開後設資料不保證檔案可訪問。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `record_id` | string | **必填**; maxLength: 20; pattern: &quot;^&#91;1-9&#93;&#91;0-9&#93;&#42;$&quot; |

```javascript
const result = await host.mcp("zenodo", "get_record", {"record_id": "8435696"})
```

</ToolOperationGroup>

## HMMER {/* #family-26 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `search` {/* #hmmer-search */}

提交一次非同步 EMBL-EBI HMMER3 搜尋。program 可選 phmmer（蛋白序列對序列庫）、hmmscan（蛋白序列對 Pfam 模型）、hmmsearch（profile HMM／比對對序列庫）或 jackhmmer（迭代遠緣同源檢索）。input 使用該程式支援的 FASTA、profile HMM 或比對文字，database 為提供方資料庫名。閾值使用 HMMER 引數 incE/incdomE、E/domE、incT/incdomT、T/domT；iterations 控制 jackhmmer 輪數。儲存返回的 job_id，再查詢 status。提交不等於完成；響應丟失可能已有遠端任務，不要自動重提。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `program` | string | **必填**; enum: &#91;&quot;phmmer&quot;, &quot;hmmscan&quot;, &quot;hmmsearch&quot;, &quot;jackhmmer&quot;&#93; |
| `database` | string | **必填**; enum: &#91;&quot;refprot&quot;, &quot;uniprot&quot;, &quot;swissprot&quot;, &quot;pdb&quot;, &quot;rp15&quot;, &quot;rp35&quot;, &quot;rp55&quot;, &quot;rp75&quot;, &quot;pfam&quot;&#93; |
| `input` | string | **必填**; minLength: 1; maxLength: 200000 |
| `incE` | number | 可選; exclusiveMinimum: 0; maximum: 10 |
| `incdomE` | number | 可選; exclusiveMinimum: 0; maximum: 10 |
| `incT` | number | 可選; exclusiveMinimum: 0 |
| `incdomT` | number | 可選; exclusiveMinimum: 0 |
| `E` | number | 可選; exclusiveMinimum: 0; maximum: 10 |
| `domE` | number | 可選; exclusiveMinimum: 0; maximum: 10 |
| `T` | number | 可選; exclusiveMinimum: 0 |
| `domT` | number | 可選; exclusiveMinimum: 0 |
| `popen` | number | 可選; minimum: 0 |
| `pextend` | number | 可選; minimum: 0 |
| `mx` | string | 可選; enum: &#91;&quot;BLOSUM45&quot;, &quot;BLOSUM62&quot;, &quot;BLOSUM90&quot;, &quot;PAM30&quot;, &quot;PAM70&quot;&#93; |
| `iterations` | integer | 可選; minimum: 1; maximum: 9 |

```javascript
const result = await host.mcp("hmmer", "search", {"program":"hmmscan","database":"pfam","input":">query\nMKTIIALSYIFCLVFADYKDDDDK"})
```

### `status` {/* #hmmer-status */}

查詢一次已有 HMMER 任務，不自動輪詢或重提。SUCCESS 表示可獲取結果，PENDING／RUNNING 表示等待後再查；ERROR／FAILURE／NOT_FOUND 是終止狀態，不等於零命中。保留準確 job_id。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 36; pattern: &quot;^&#91;A-Fa-f0-9&#93;&#123;8&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "status", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

### `results` {/* #hmmer-results */}

先查詢一次狀態，僅 SUCCESS 時讀取包含結構域註釋的全部結果頁。等待或失敗時不返回結果載荷；jackhmmer 迭代記錄保留提供方陣列結構。結果保留期有限，應儲存到 Notebook 產物。成功後的空匹配列表是零命中，不能與等待或失敗混淆。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 36; pattern: &quot;^&#91;A-Fa-f0-9&#93;&#123;8&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;4&#125;-&#91;A-Fa-f0-9&#93;&#123;12&#125;$&quot; |

```javascript
const result = await host.mcp("hmmer", "results", {"job_id":"8ebb1d5f-4457-4da8-808c-f811105c3654"})
```

</ToolOperationGroup>

## InterProScan {/* #family-27 */}

<ToolOperationGroup>
<summary>展開操作與引數</summary>

### `status` {/* #interproscan-status */}

透過已有 job_id 查詢一次 InterProScan 註釋任務，至少間隔 10 秒再查。FINISHED 後可獲取結果；ERROR／FAILURE 表示失敗，NOT_FOUND 表示未知或過期，不是零命中。此聯結器不提交或重提任務。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 200; pattern: &quot;^&#91;A-Za-z0-9&#93;&#91;A-Za-z0-9_-&#93;&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "status", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

### `results` {/* #interproscan-results */}

先查詢一次狀態，僅 FINISHED 時獲取完整 TSV 報告，上限 2 MiB，超限報錯而不截斷。不自動重試、輪詢或重提。及時儲存報告，避擴音供方結果過期。每行對應一個 signature 匹配；座標從 1 開始且包含兩端，分數含義由各分析程式決定，可選列含 InterPro、GO 與通路註釋。FINISHED 後的空報告表示沒有返回匹配，不證明蛋白沒有功能。

| 欄位 | 型別 | 必填與約束 |
| --- | --- | --- |
| `job_id` | string | **必填**; maxLength: 200; pattern: &quot;^&#91;A-Za-z0-9&#93;&#91;A-Za-z0-9_-&#93;&#123;0,199&#125;$&quot; |

```javascript
const result = await host.mcp("interproscan", "results", {"job_id":"iprscan5-R20260922-123456-0123-12345678-p1m"})
```

</ToolOperationGroup>
