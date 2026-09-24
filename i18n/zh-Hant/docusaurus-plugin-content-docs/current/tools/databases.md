---
title: "科學資料庫"
toc_max_heading_level: 2
last_update:
  date: '2026-09-24'
---

# 科學資料庫 {/* #科学数据库 */}

本頁介紹支援哪些資料來源、可以完成什麼任務，以及如何在 Open-Science 中啟用和連線。需要帶操作截圖與結果檔案的完整案例時，進入[科研工作流](#database-workflows)。

<span id="数据源目录" />

## 目前支援哪些資料庫 {/* #supported-databases */}

Open-Science v0.33.1 內建 **27 個資料來源 Connector，提供 269 個操作**。獨立的離線 Molecule Connector 另有兩個操作，完整登錄檔共 271 個。下表名稱對應 **Settings → Connectors** 中的條目，一個 Connector 可以包含多個資料庫。支援某個資料來源不表示覆蓋其網站的全部功能。

| Connector | 來源 | 運算元 | 用途  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | 小分子、化學識別符號、反應及結合資料  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 文獻、作者、引用、DOI 更新及資料集/軟體記錄 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | PubMed 文獻檢索與記錄  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 13 | 基因及蛋白標識對映、UniProt 序列查詢、GO 與 Reactome 註釋、g:Profiler 基因集富集 |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | 基因組註釋、同源及序列資訊；NCBI 物種、組裝與序列身份；BLAST 提交與報告 |
| Variants · `variants` | gnomAD, ClinVar, dbSNP | 15 | 變異頻率與變異記錄  |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | 臨床試驗登記記錄  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets | 20 | 臨床基因組證據資源  |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 16 | 結構檔案與相關記錄  |
| ChEMBL · `chembl` | ChEMBL | 6 | 化合物、靶標和活性記錄  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | 預印本後設資料  |
| Drug Regulatory · `drug-regulatory` | openFDA | 7 | 藥品監管及藥品記錄  |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 14 | 人類遺傳關聯資源  |
| Expression · `expression` | GTEx | 12 | 組織和基因表達資源  |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 13 | 蛋白結構域與功能註釋  |
| Cancer Models · `cancer-models` | cBioPortal | 6 | 癌症研究模型和佇列資源  |
| RNA · `rna` | Rfam | 9 | RNA 家族與相關資源  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 22 | 表達、代謝組、宏基因組與蛋白質組歸檔；ENA 執行發現及 FASTQ/原始提交清單；PRIDE 檔案列表 |
| CellGuide · `cellguide` | CELLxGENE | 5 | 細胞型別參考資訊  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 調控與功能組學記錄  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 研究專案、資助等資源  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 資料集與欄位查詢  |
| ZINC · `zinc` | ZINC | 5 | ZINC 化合物記錄  |
| GDC · `gdc` | NCI GDC | 5 | 癌症專案、病例與檔案後設資料，公開／受控訪問類別及傳輸清單；不下載或授予受控訪問 |
| Zenodo · `zenodo` | Zenodo | 2 | 公開資料集、軟體和文獻記錄的檢索、版本級後設資料與檔案清單；不上傳或下載檔案 |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | 按程式提交蛋白序列／profile HMM／比對檢索，查詢狀態並獲取結果 |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 2 | 查詢已有註釋任務並獲取 TSV 報告；不支援提交任務 |

離線 Molecule 工具見[科學檢視器](viewers.md)。各資料來源實際提供的操作見 [Connector 操作引數參考](../reference/connector-operations.md)。

<span id="选择查询并检查结果" />

## 可以完成什麼任務 {/* #database-capabilities */}

| 科研任務 | 使用的 Connector | 常見輸出 |
| --- | --- | --- |
| 查詢文獻、追蹤引用、檢查 DOI 關聯關係 | Literature Graph、PubMed、bioRxiv | 文獻記錄、編號、引用關係和全文可用資訊 |
| 查詢基因或蛋白並比較序列 | Genes & Ontologies、Genomes | 識別符號對映、蛋白記錄、FASTA 和 BLAST 報告 |
| 發現公開組學資料並檢查可用檔案 | Omics Archives | 專案/執行後設資料，以及帶來源地址、大小和可用校驗值的檔案清單 |
| 解釋基因列表或檢視相互作用網路 | Genes & Ontologies、Protein Annotation | 富集結果表、本體註釋和網路記錄 |
| 核查變異、表達與調控證據 | Variants、Clinical Genomics、Human Genetics、Expression、Regulation | 帶物種、組織、參考基因組版本和相關證據欄位的來源記錄 |
| 獲取化合物、結構或臨床研究記錄 | Chemistry、ChEMBL、Structures & Interactions、Clinical Trials | 化學標識及性質、結構檔案和試驗後設資料 |

批次轉換識別符號時，**Genes & Ontologies** 提供 `submit_uniprot_id_mapping`、`get_uniprot_id_mapping_status` 和 `get_uniprot_id_mapping_results`。儲存任務 ID，至少間隔三秒查詢一次狀態，再取完所有結果頁。保留一對多對映和明確返回的 `failed_ids`，某頁未出現不等於未匹配。最多可提交 100000 個識別符號，結果最長保留約七天。見[對映引數](../reference/connector-operations.md#submit_uniprot_id_mapping)。

**Zenodo** 無需認證即可查詢公開記錄後設資料，應保留版本級記錄 ID、訪問和許可欄位。**GDC** 提供公開後設資料，生成清單不等於獲得下載授權，受控檔案仍需 GDC 權限。[GDC 操作](../reference/connector-operations.md#family-24) · [Zenodo 操作](../reference/connector-operations.md#family-25)。

資料庫響應可以支援一個科研步驟，但不會自動下載資料、把所有論文加入文獻庫或完成整套分析。需要儲存哪些記錄和檔案，應在請求中明確說明。

## 如何連線並開始使用 {/* #connect-database */}

<span id="获取记录并核对身份" />

### 1. 啟用內建 Connector {/* #1-启用内置-connector */}

1. 開啟 **Settings → Connectors**，搜尋上表中的名稱，例如 **Omics Archives**。
2. 開啟詳情並展開 **Tools**，閱讀目標操作的輸入、結果上限和第三方要求。
3. 啟用 **Main** 的訪問權限，檢查 **Used by**。透過資源的 **Manage access** 調整 Main Agent 和 Specialist 關聯。啟用 Connector 與每個工具的審批策略是獨立設定。

![Omics Archives 工具詳情展示 GEO 輸入欄位和僅返回後設資料的範圍](/img/open-science/guides-walkthrough/36-omics-tools.webp)

這些 Connector 已內建，無需為它們新增自定義伺服器。連線自己執行的外部服務時，參閱[自定義 Connector 設定](../guides/connectors.md)。出現在列表中或已啟用，不等於認證透過或查詢成功。

<span id="连接-openalex-并追踪引用关系" />

### 2. 按目標操作配置憑據 {/* #2-按目标操作配置凭据 */}

| 服務或使用條件 | 配置位置 |
| --- | --- |
| OpenAlex | 金鑰可選。需要配置時，開啟 **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**，驗證後儲存 |
| 要求聯絡郵箱的 NCBI 直接變異查詢 | **Settings → Connectors → Manage credentials → Literature access**。填寫 **Contact email** 並點選 **Save**；NCBI API key 為可選項 |
| 其他需要憑據的操作 | 按工具要求及[憑據指南](../guides/connectors.md)配置，並將憑據繫結到目標服務 |

金鑰應填寫在憑據表單中，不要放進科研提示詞或共享結果檔案。按所選操作配置要求；上面的聯絡郵箱要求不表示所有 NCBI 工具都需要同樣的設定。

<span id="查询-doi-及关联研究记录" />

Literature Graph 還提供 `crossref_get_work`、`crossref_get_updates`、`datacite_search_records` 和 `datacite_get_record`，這四個公開方法不需要 OpenAlex key。OpenAlex 引用關係中，`openalex_citations` 查詢引用該成果的文獻，`openalex_references` 查詢該成果引用的文獻。具體欄位見 [Literature Graph 引數](../reference/connector-operations.md#family-2)。

<span id="从一个已知标识开始" />
<span id="本地实际查询" />

### 3. 用一次小查詢確認可用 {/* #3-用一次小查询确认可用 */}

啟用 **Genes & Ontologies**，開啟已連線模型的會話，傳送：

<p className="example-label"><strong>示例</strong> 核對一個已知的人類基因標識</p>

```text
Use Genes & Ontologies query_genes to resolve TP53 with scopes="symbol",
species="human" and fields="symbol,name,entrezgene". Return the input query,
matched records and any unmatched identifiers. Keep the response in English.
```

檢查實際工具返回。對於人 TP53，核對 `query`、`symbol`、Entrez Gene **7157** 和名稱 **tumor protein p53**。有多個匹配時，先保留全部結果，再確認物種與目標記錄。一次查詢成功只說明該操作可用，不代表所有來源均已連通。[準確欄位](../reference/connector-operations.md#query_genes)。

## 進入完整科研工作流 {/* #database-workflows */}

以下文章包含輸入材料、操作步驟、真實英文介面截圖和可下載的案例結果。

<span id="ena-runs" />
<span id="omics-discovery" />

### 查詢公開組學資料 {/* #查找公开组学数据 */}

[查詢公共組學資料並整理檔案清單](../workflows/public-omics-data.md)：從已知執行編號或研究主題出發，檢查 ENA 與 PRIDE 記錄，儲存來源地址和校驗值。下載資料是後續獨立步驟。

<span id="sequence-search" />
<span id="blast-jobs" />
<span id="blast-report" />

### 比較蛋白序列 {/* #比较蛋白序列 */}

[從基因名稱獲取蛋白序列並完成 BLAST 比對](../workflows/protein-sequence-search.md)：獲取 UniProt FASTA，儲存 BLAST 任務編號，再檢查完成後的比對、一致率和查詢覆蓋率。

<span id="gene-set-enrichment" />

### 分析候選基因集 {/* #分析候选基因集 */}

[對候選基因集進行功能富集分析](../workflows/gene-set-enrichment.md)：選擇物種、識別符號和統計背景，執行 g:Profiler，並結合來源版本解讀校正後的機率。

<span id="reference-genome" />

### 核對參考基因組 {/* #核对参考基因组 */}

[分析前核對物種、參考基因組與染色體編號](../workflows/reference-genome-check.md)：關聯記錄前，先核對物種、帶版本的組裝和染色體別名。

其他任務可參閱 [PubChem 結構化記錄獲取](../workflows/database-records.md)、[科學記錄交叉核對](../workflows/cross-check-records.md)及[組會文獻發現](../workflows/journal-club.md)。

<span id="查询结果与报错怎么处理" />
<span id="空结果部分结果与错误" />

## 使用資料時注意什麼 {/* #database-limits */}

- 儲存查詢條件、來源、物種、組織、單位及登入號版本。資料庫記錄、預測和模型生成的總結屬於不同證據型別。
- 檢查返回數量、分頁和截斷標記，再判斷是否完整。零條匹配、部分響應和請求錯誤需要分別處理。
- 檔案清單提供地址與後設資料。下載檔案、校驗內容和分析資料是獨立操作。
- 請求需要憑據時，先填寫對應表單再重試。觸發限流時按服務要求等待，超時時縮小請求範圍。具體處理見[故障排查](../guides/troubleshooting.md)。

### 人群頻率與相互作用網路 {/* #string-network */}

需要人群細節時，對 `get_variant` 設定 `include_populations: true`，保留資料集與參考組裝。外顯子組與基因組觀察應分開；不可用值為 `null`，不等於零；相互重疊的人群或性別分層不能相加。這些是觀察頻率，不是過濾等位基因頻率。[gnomAD 引數](../reference/connector-operations.md#get_variant)

從 v0.31.0 起，`get_string_network.nodes` 包含返回的鄰居及孤立的已對映輸入。單個對映輸入會請求鄰居，多個對映輸入不擴充套件。只需輸入節點時篩選 `is_query`，全部輸入別名使用 `queries`。`n_nodes` 是網路節點數，`n_mapped` 是輸入對映數；複用舊指令碼前修正將兩者等同的邏輯。[STRING 引數](../reference/connector-operations.md#get_string_network)

<span id="查找操作参数" />

## 查詢具體操作引數 {/* #operation-parameters */}

[Connector 操作引數參考](../reference/connector-operations.md)列出必填輸入、可選值和準確呼叫方法。本頁用於選擇和連線資料來源，引數參考用於查詢某個具體工具的欄位。

目錄來源：[catalog.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/catalog.ts)、[registry.ts](https://github.com/aipoch/open-science/blob/v0.33.1/src/main/connectors/registry.ts)。

## 序列檢索與多序列比對 {/* #sequence-tools */}

**HMMER** 支援按程式選擇蛋白序列、profile HMM 或比對輸入。將程式與資料庫配對，儲存任務 ID，等 **SUCCESS** 後獲取結果，見 [HMMER 操作](../reference/connector-operations.md#family-26)。

**InterProScan** 獲取已透過 EMBL-EBI 服務提交的註釋任務。保留任務 ID，至少間隔十秒查詢，等 **FINISHED** 後獲取 TSV。此 Connector 不能提交新任務，見 [InterProScan 操作](../reference/connector-operations.md#family-27)。

**Genomes → Clustal Omega** 對至少三條名稱唯一的蛋白質、DNA 或 RNA FASTA 記錄進行比對。配置服務要求的聯絡郵箱，提交一次並儲存任務 ID，再查詢狀態、儲存返回的比對，見[多序列比對工作流](../workflows/multiple-sequence-alignment.md)。
