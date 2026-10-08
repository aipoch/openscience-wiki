---
title: "科學資料庫"
toc_max_heading_level: 2
last_update:
  date: '2026-10-08'
---

# 科學資料庫 {/* #科学数据库 */}

本頁介紹支援哪些資料來源、可以完成什麼任務，以及如何在 Open-Science 中啟用和連線。需要帶操作截圖與結果檔案的完整案例時，進入[科研工作流](#database-workflows)。

<span id="数据源目录" />

## 目前支援哪些資料庫 {/* #supported-databases */}

Open-Science v0.35.1 內建 **33 個資料來源 Connector，提供 341 個操作**。獨立的離線 Molecule Connector 另有兩個操作，完整登錄檔共 343 個。下表名稱對應 **Settings → Connectors** 中的條目，一個 Connector 可以包含多個資料庫。支援某個資料來源不表示覆蓋其網站的全部功能。

| Connector | 來源 | 運算元 | 用途  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | 小分子、化學識別符號、反應及結合資料  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 文獻、作者、引用、DOI 更新及資料集/軟體記錄 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | PubMed 文獻檢索與記錄  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler, Enrichr | 15 | 基因及蛋白標識對映、UniProt 序列查詢、GO 與 Reactome 註釋、g:Profiler 與 Enrichr 基因集富集 |
| Genomes · `genomes` | Ensembl, UCSC, NCBI, BLAST, Clustal Omega | 20 | 基因組註釋、同源及序列資訊；NCBI 物種、組裝與序列身份；BLAST 提交與報告 |
| Variants · `variants` | gnomAD, ClinVar, dbSNP, MaveDB | 21 | 群體頻率、臨床記錄，以及實驗特定的功能分數、變異對映和實驗資訊 |
| Clinical Trials · `clinical-trials` | ClinicalTrials.gov | 6 | 臨床試驗登記記錄  |
| Clinical Genomics · `clinical-genomics` | ClinGen, CIViC, Open Targets, ClinPGx | 30 | 臨床基因組證據資源；新增 ClinPGx 藥物基因組學記錄 |
| Structures & Interactions · `structures` | PDB, AlphaFold, EMDB, Complex Portal, IntAct | 17 | 結構檔案與相關記錄  |
| ChEMBL · `chembl` | ChEMBL | 6 | 化合物、靶標和活性記錄  |
| bioRxiv · `biorxiv` | bioRxiv, medRxiv, ROR | 7 | 預印本後設資料  |
| Drug Regulatory · `drug-regulatory` | openFDA | 10 | Drugs@FDA、藥品標籤、FAERS 不良事件報告和藥品召回 |
| Human Genetics · `human-genetics` | GWAS Catalog, eQTL Catalogue, PheWeb | 15 | 人類遺傳關聯資源  |
| Expression · `expression` | GTEx, Bgee | 16 | GTEx 人類組織表達和 eQTL；Bgee 跨物種基線表達 |
| Protein Annotation · `protein-annotation` | InterPro, Pfam, Human Protein Atlas, STRING | 14 | 蛋白結構域與功能註釋；新增互作富集檢驗 |
| Cancer Models · `cancer-models` | cBioPortal | 10 | 研究、突變、複製數、樣本、患者、臨床屬性及分子 profile 表達 |
| RNA · `rna` | Rfam | 9 | RNA 家族與相關資源  |
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, Metabolomics Workbench, MGnify, PRIDE, ENA | 28 | 組學研究／執行後設資料與檔案清單；代謝組樣本、實驗因素、分析及化合物記錄 |
| CellGuide · `cellguide` | CELLxGENE | 5 | 細胞型別參考資訊  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 調控與功能組學記錄  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 研究專案、資助等資源  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 資料集與欄位查詢  |
| ZINC · `zinc` | ZINC | 5 | ZINC 化合物記錄  |
| GDC · `gdc` | NCI GDC | 5 | 癌症專案、病例與檔案後設資料，公開／受控訪問類別及傳輸清單；不下載或授予受控訪問 |
| Zenodo · `zenodo` | Zenodo | 2 | 公開資料集、軟體和文獻記錄的檢索、版本級後設資料與檔案清單；不上傳或下載檔案 |
| HMMER · `hmmer` | EMBL-EBI HMMER3 | 3 | 按程式提交蛋白序列／profile HMM／比對檢索，查詢狀態並獲取結果 |
| InterProScan · `interproscan` | EMBL-EBI InterProScan | 3 | 提交蛋白序列、查詢註釋任務狀態並獲取 TSV 報告 |
| Pathway Commons · `pathway-commons` | Pathway Commons / Reactome | 4 | 通路檢索、頂層通路、圖查詢及 BioPAX 子模型匯出 |
| Alliance Genome Resources · `alliance` | Alliance of Genome Resources | 8 | 人類與模式生物基因、直系同源、疾病模型、表型、等位基因及表達 |
| CELLxGENE Discover · `cellxgene-discover` | CELLxGENE Discover | 9 | 單細胞集合與資料集發現、釋出版本、檔案格式／大小／下載 URL |
| Cellosaurus · `cellosaurus` | Cellosaurus | 2 | 查詢細胞系名稱和別名，再檢查編號身份及質量註釋 |
| Monarch Initiative · `monarch` | Monarch Initiative | 2 | 查詢疾病或基因與表型的關聯，保留物種和支援證據 |
| IEDB · `iedb` | Immune Epitope Database | 8 | 檢索表位、抗原、T 細胞、B 細胞和 MHC 實驗、TCR/BCR 證據及來源文獻 |

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

## 單細胞、模式生物及變異功能資料 {/* #single-cell-model-organisms */}

在 **Settings → Connectors** 搜尋下表中的入口，開啟 **Main** 的可用性，再向會話說明研究物件、物種及需要儲存的記錄。這四類新增操作讀取公開資料，無需另外新增自定義 MCP 伺服器、API key 或 NCBI 聯絡郵箱；同一 Connector 的其他服務可能有不同要求。

| 入口 | 可以做什麼 | 使用要點 |
| --- | --- | --- |
| CELLxGENE Discover | 按物種、組織、疾病、實驗方法或細胞型別發現單細胞資料集；查詢版本及檔案清單 | 本體過濾使用精確標籤或 ID，多個條件同時滿足。保留 dataset_version_id，按釋出快照讀取檔案清單；普通 dataset_id 指向當前版本。只返回可用下載 URL，不下載檔案或查詢 Census 表達矩陣。細胞型別說明和標記基因仍使用獨立的 CellGuide |
| Alliance Genome Resources | 查詢人類、小鼠、大鼠、果蠅、線蟲、斑馬魚、酵母和蛙的基因、同源關係、疾病模型、表型及表達 | 先搜尋並核對物種，再沿返回的基因 ID 查詢。保留證據及同源嚴格程度；模型生物的表型不等於人類疾病結論 |
| Variants → MaveDB | 查詢變異效應實驗分數集、實驗方法、CSV 分數頁及已有 VRS 對映 | 保留 URN、許可、實驗方法與分數校準。功能分數不是臨床致病分類；CSV 按 start/limit 分頁，返回文字仍需儲存成檔案。對映查詢不會執行 liftover |
| Omics Archives → Metabolomics Workbench | 搜尋研究，檢視 ST 編號對應的樣本、因素、分析及代謝物；查化合物結構和交叉引用 | section 區分 summary、factors、analysis、metabolites。化合物名稱先用 PubChem 解析為支援的識別符號；這些操作不下載原始測量矩陣 |

CELLxGENE 的篩選與分頁在本地對當次取得的上游目錄執行，跨請求目錄可能更新。固定釋出版本時使用版本 ID；上游沒有報告的檔案大小為 -1，不能當成零位元組。MaveDB、Workbench 的缺失值和實驗定義也應隨結果保留。

具體輸入見 [CELLxGENE Discover](../reference/connector-operations.md#family-30)、[Alliance](../reference/connector-operations.md#family-29)、[MaveDB](../reference/connector-operations.md#mavedb_search_score_sets) 和 [Metabolomics Workbench](../reference/connector-operations.md#workbench_search_studies)。

## 細胞系、表型與免疫實驗證據 {/* #cell-lines-phenotypes-immunity */}

在 **Settings → Connectors** 啟用 **Cellosaurus**、**Monarch Initiative** 或 **IEDB**，並將其提供給 **Main**。這些操作讀取公共記錄，無需自建伺服器或 API key。

| 入口 | 可以查詢什麼 | 應保留和核對什麼 |
| --- | --- | --- |
| Cellosaurus | 按細胞系名稱或別名搜尋，再讀取返回的 CVCL 編號或 RRID | 物種、身份、別名，以及汙染或錯誤鑑定註釋。搜尋接受普通短語，不接受原始 Solr 查詢。缺少質量註釋不代表細胞系已透過認證 |
| Monarch Initiative | 使用 MONDO:0007254、HGNC:11998 等規範 CURIE 查詢疾病或基因的表型關聯 | 物種、表型、來源與證據。別名不會自動轉換，先解析識別符號。直接匹配描述的是識別符號匹配方式，不代表實驗確認 |
| IEDB | 檢索表位、抗原，或具體的 T 細胞、B 細胞、MHC 實驗 | 至少提供一個生物學或證據篩選條件，僅分頁不夠。antigen_iri 與 uniprot_accession 二選一。保留實驗方法、結果、單位和文獻；MHC 洗脫觀察不等於親和力測量 |

聚合的表位或抗原記錄可能合併多個實驗的觀察。如果多個篩選條件必須在同一實驗中成立，應查詢相應的實驗操作。零匹配不代表生物學上的陰性結論。[Cellosaurus 引數](../reference/connector-operations.md#family-31) · [Monarch 引數](../reference/connector-operations.md#family-32) · [IEDB 引數](../reference/connector-operations.md#family-33)。

## 查詢 GEO 矩陣和序列匹配結構 {/* #geo-matrices-pdb-sequences */}

**Omics Archives → geo_get_matrix_files** 查詢官方 GEO Series Matrix 和 NCBI 生成的計數、FPKM、TPM、註釋檔案。它返回檔案位置，不會下載檔案內容。**geo_get_series** 仍用於後設資料查詢。

取得矩陣後，**geo_preflight_matrix** 檢查已經讀取、解壓的文字，大小上限為 8 MiB。該操作不訪問網路或檔案系統。保留 GSM 識別符號與平臺後設資料，按樣本 ID 對映，而不是依賴列的位置。預覽片段必須設定 **complete: false**；只有傳入完整檔案時才能使用 **complete: true**。片段不能證明整個檔案的維度。壓縮包、稀疏矩陣和 HDF5 檔案不能直接交給此文字檢查器。見[矩陣發現](../reference/connector-operations.md#geo_get_matrix_files)和[文字預檢查](../reference/connector-operations.md#geo_preflight_matrix)。

**Structures & Interactions → pdb_search_sequence** 接受一條 25–10,000 個殘基的蛋白質序列，可用原始序列或單條 FASTA。序列一致性和查詢覆蓋度閾值均為 0 到 1 的比例。返回的查詢覆蓋度描述與輸入序列的比對範圍，不等於實驗解析的結構覆蓋度。上游總數是在本地覆蓋度篩選前計算的，有上限的掃描也可能未讀到後續匹配。該操作查詢結構記錄，不下載座標檔案。見[精確輸入與掃描上限](../reference/connector-operations.md#pdb_search_sequence)。

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

### 檢查通路網路 {/* #检查通路网络 */}

[檢查通路及其互作網路](../workflows/inspect-pathway.md)：透過 Pathway Commons 查詢人類 Reactome 通路，保留返回的 URI、匯出互作，並區分選定的網路與通路活性證據。

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

目錄來源：[catalog.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/catalog.ts)、[registry.ts](https://github.com/aipoch/open-science/blob/v0.35.1/src/main/connectors/registry.ts)。

## 序列檢索與多序列比對 {/* #sequence-tools */}

**HMMER** 支援按程式選擇蛋白序列、profile HMM 或比對輸入。將程式與資料庫配對，儲存任務 ID，等 **SUCCESS** 後獲取結果，見 [HMMER 操作](../reference/connector-operations.md#family-26)。

**InterProScan** 從 v0.35.1 起支援提交蛋白序列，再查詢任務狀態並獲取 TSV 註釋。具體連線與步驟見[提交 InterProScan](#interproscan-submit)。

**Genomes → Clustal Omega** 對至少三條名稱唯一的蛋白質、DNA 或 RNA FASTA 記錄進行比對。配置服務要求的聯絡郵箱，提交一次並儲存任務 ID，再查詢狀態、儲存返回的比對，見[多序列比對工作流](../workflows/multiple-sequence-alignment.md)。

## Enrichr、STRING 與 ClinPGx {/* #enrichment-pharmacogenomics */}

- **Genes & Ontologies → Enrichr**：先列出當前庫，再用基因列表查詢功能、轉錄因子、擾動、藥物、疾病、組織或細胞型別相關富集。選擇與物種和問題相符的庫；記錄背景、庫名稱及校正 P 值。
- **Protein Annotation → STRING**：檢查蛋白網路的互作數量是否超過背景預期。它與通路過度代表分析回答不同問題，不能用網路 P 值代替通路檢驗。參見[基因集富集工作流](../workflows/gene-set-enrichment.md#enrichr-string)。
- **Clinical Genomics → ClinPGx**：按藥物、基因或變異查閱臨床註釋、指南、監管標籤和族群頻率。先解析識別符號，再按操作所需欄位查詢，保留原始來源和證據等級。該入口用於檢索資料，不自動給出個體用藥方案。

在 **Settings → Connectors** 中向當前代理開啟相應 Connector；這些內建入口不需要另建自定義 MCP 伺服器。準確欄位和條件見[操作參考](../reference/connector-operations.md)。

## 通路、表達及臨床資料 {/* #pathway-expression-clinical */}

在 **Settings → Connectors** 中開啟對應家族，再向代理說明物種、來源、識別符號和所需範圍。這些擴充套件沿用內建 Connector，無需另建自定義 MCP 伺服器。

| 入口 | 可以做什麼 | 連線和解釋要點 |
| --- | --- | --- |
| Pathway Commons | 搜尋通路、查頂層通路、查詢基因間路徑或匯出子模型 | 公共服務；保留實際返回的 URI、物種和來源。圖查詢與富集檢驗不同，見[通路互作工作流](../workflows/inspect-pathway.md) |
| Expression → Bgee | 跨物種表達存在／缺失判斷、標準化分數、有界 SPARQL 查詢及下載連結 | 先查物種，保留 NCBI taxonomy ID；SPARQL 的基因、物種、組織均必填。健康野生型基線不是差異表達結果，下載連結不等於已下載檔案 |
| Cancer Models → cBioPortal | 列出樣本與患者、查詢臨床屬性和 mRNA／蛋白表達 | 先定 study，再查 profile，明確測量與歸一化。臨床值按樣本／患者層級提供相應 ID；表達查詢提供明確基因，並在 sample_ids 與 sample_list_id 中恰好選一個。缺失行不是零 |
| Drug Regulatory → openFDA | 搜尋／統計 FAERS 報告及藥品召回 | 限定日期和產品，保留截斷資訊。報告計數不是發生率或因果證據；多值分組可能重疊，不能相加當作去重報告總數 |
| Omics Archives → MGnify | 按 MGYA 分析編號列出結果檔案 | 返回型別、類別、來源 URL 和可用大小；沒有下載檔案內容，缺少大小或 URL 時保留 null |

準確必填欄位、條件和示例見[Connector 操作參考](../reference/connector-operations.md)。

## 查詢 GWAS 彙總統計檔案 {/* #gwas-summary-statistics */}

在 **Settings → Connectors** 將 **Human Genetics** 提供給 Main。用研究的 **GCST 編號**請求發現彙總統計檔案，保留返回的原始／標準化檔案 URL、後設資料和宣告的參考基因組。公開查詢不需要 API key。

`gwas_get_summary_statistics` 列出研究檔案並讀取可用的 YAML 後設資料，不下載大型關聯結果表。返回的 GWAS-SSF 列定義描述的是標準，不是已檢查的實際檔案表頭。另行下載目標檔案後，核對實際列名、基因組版本、效應等位基因和單位，再進行分析。顯著關聯位點不能代替完整彙總統計。[引數與輸出](../reference/connector-operations.md#gwas_get_summary_statistics)。

## 向 InterProScan 提交蛋白序列 {/* #interproscan-submit */}

1. 在 **Settings → Connectors** 將 **InterProScan** 提供給 Main。在 **Settings → Credentials → Literature access** 儲存用於 EMBL-EBI 任務的有效聯絡郵箱，不需要 API key。
2. 提供蛋白序列或名稱唯一的蛋白 FASTA 記錄，請求提交一次。序列和聯絡郵箱會傳送到 EMBL-EBI。單次最多 1,000 條記錄，每條最多 10,000 個殘基，編碼後的請求體不超過 4 MiB。
3. 儲存返回的 **job_id**。**SUBMITTED** 且 **ready: false** 是提交回執，不是註釋結果。至少間隔十秒查詢一次 **status**，系統不會自動輪詢。
4. 狀態為 **FINISHED** 後獲取 **results**，在遠端結果過期前儲存完整 TSV。超過 2 MiB 獲取限制時會報錯，不會靜默返回截斷報告。
5. 核對蛋白標識、來源程式及從 1 開始且包含兩端的座標。不同成員程式的得分不能直接比較；沒有命中不代表蛋白沒有功能。

超時後避免重複提交，先找回已有任務 ID。取消本地請求不會取消已提交的遠端任務。見[提交、狀態和結果引數](../reference/connector-operations.md#family-27)。

## 查詢 IEDB 的 TCR 與 BCR 證據 {/* #iedb-receptors */}

將 **IEDB** 提供給 Main，使用 **search_tcrs** 或 **search_bcrs**，至少給出一個生物學或證據篩選條件，僅分頁不夠。`sequence` 指**表位序列**，`chain1_cdr3` 與 `chain2_cdr3` 才篩選受體的 CDR3 序列。這些公開查詢不需要 API key。

保留受體組 ID、鏈資訊、返回的實驗 ID 和來源文獻。宿主及結果條件作用於聚合後的組，可能分別由不同實驗滿足。若要確認條件在同一實驗中成立，應按返回的實驗 ID 查詢對應的實驗操作，並在那裡應用所需篩選。分頁針對受體組，不保證每條內嵌匯出記錄都完整。這是在檢索已有證據，不是在預測受體結合。[IEDB 引數](../reference/connector-operations.md#family-33)。
