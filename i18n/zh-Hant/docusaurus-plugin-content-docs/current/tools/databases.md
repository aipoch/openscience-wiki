---
title: "科學資料庫"
toc_max_heading_level: 2
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';


# 科學資料庫 {/* #科学数据库 */}

應用內建 **23 個資料來源 Connector**，另有離線 Molecule Connector。完整登錄檔包含 **246 個工具操作**，其中 Molecule 有 2 個，本頁資料來源覆蓋其餘 244 個。先啟用相關 Connector，再使用正確編號型別進行小範圍查詢。

<span id="本地实际查询" />

## 資料來源目錄 {/* #数据源目录 */}

根據標識型別與研究問題選擇資料來源。各來源覆蓋範圍不同，具體欄位見操作引數參考。

| Connector | 來源 | 運算元 | 用途  |
| --- | --- | --- | ---  |
| Chemistry · `chemistry` | PubChem, ChEBI, Rhea, BindingDB | 12 | 小分子、化學識別符號、反應及結合資料  |
| Literature Graph · `literature` | OpenAlex, arXiv, Crossref, DataCite | 13 | 文獻、作者、引用、DOI 更新及資料集/軟體記錄 |
| PubMed · `pubmed` | PubMed, PMC, Europe PMC | 7 | PubMed 文獻檢索與記錄  |
| Genes & Ontologies · `genes` | MyGene, UniProt, OLS, QuickGO, Reactome, g:Profiler | 9 | 基因符號與識別符號對映  |
| Genomes · `genomes` | Ensembl, UCSC, NCBI | 14 | 基因組註釋與序列  |
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
| Omics Archives · `omics-archives` | ArrayExpress, GEO, MetaboLights, MGnify, PRIDE, ENA | 19 | GEO 等組學歸檔和研究記錄  |
| CellGuide · `cellguide` | CELLxGENE | 5 | 細胞型別參考資訊  |
| Regulation · `regulation` | ENCODE, JASPAR, UniBind | 16 | 調控與功能組學記錄  |
| Research Resources · `research-resources` | Grants.gov, Antibody Registry | 5 | 研究專案、資助等資源  |
| BioMart · `biomart` | Ensembl BioMart | 8 | BioMart 資料集與欄位查詢  |
| ZINC · `zinc` | ZINC | 5 | ZINC 化合物記錄  |

## 獲取記錄並核對身份 {/* #获取记录并核对身份 */}

1. 開啟 **Settings → Connectors**，搜尋來源並確認目標 Agent 可使用。
2. 開啟詳情，閱讀 **Tools**、輸入、示例與第三方要求。
3. 明確查詢詞/編號和條數上限，整理文獻或證據時保留準確查詢。
4. 核對返回 ID 和來源欄位。空結果、截斷結果和錯誤不是同一種狀態。
5. 按需要明確儲存到專案/文獻庫。查詢返回不表示所有論文已入庫或全文已下載。

### 從一個已知標識開始 {/* #从一个已知标识开始 */}

<p className="example-label"><strong>案例演示</strong> 解析人 TP53 基因標識</p>

啟用 **Genes & Ontologies**，請求：**使用 query_genes 解析 TP53，scopes="symbol"、species="human"、fields="symbol,name,entrezgene"。返回輸入 query 及未匹配記錄。** 本例返回的人 TP53 記錄對應 Entrez Gene **7157**，名稱為 **tumor protein p53**。使用對映 ID 前，核對返回記錄的 `query` 與 `symbol`。符號可能多重匹配，應保留全部結果，直到確認物種與目標記錄。[準確欄位](../reference/connector-operations.md#query_genes)。

## 選擇查詢並檢查結果 {/* #选择查询并检查结果 */}

<p className="example-label"><strong>示例</strong> 小範圍資料庫查詢與返回值</p>

下表記錄這些示例查詢的返回，實時檢索結果可能不同。

| Connector / 工具 | 輸入 | 實際結果 |
| --- | --- | --- |
| Omics Archives / geo_get_series | `accessions: ["GSE60450"]` | 返回系列及 12 個樣本後設資料，不代表重算上傳矩陣 |
| Genes / query_genes | TP53、symbol、human | Entrez Gene ID 7157，TP53，tumor protein p53 |
| PubMed / search_articles | GSE60450，上限 2 | PMID 38059347、37306301；是查詢匹配，不自動等於資料集原始論文 |
| Chemistry / pubchem_search_compounds | aspirin，上限 1 CID | CID 2244、C9H8O4、分子量 180.16 |
| Literature / openalex_search_works | `CRISPR base editing`；2020 年起；開放獲取；上限 2 | 兩條成果記錄，包含 OpenAlex ID、來源欄位及完整性標記 |

### 連線 OpenAlex 並追蹤引用關係 {/* #连接-openalex-并追踪引用关系 */}

1. 開啟 **Settings → Connectors → Literature Graph → Manage credentials → OpenAlex**。
2. 輸入自己的 API key，點選 **Validate**，驗證成功後點選 **Save**。
3. 按主題檢索，並設定較小的 `max_records`。檢查 `n_records_returned` 和 `records_truncated`，再判斷結果是否完整。
4. 將返回的成果 ID 交給 `openalex_get_work` 獲取詳情。`openalex_citations` 查詢引用該成果的文獻；`openalex_references` 查詢該成果引用的文獻，兩者方向不同。
5. 按作者檢索時，先核對機構和 ORCID，再獲取作者檔案。查詢期刊時可用來源 ID 或 ISSN 區分同名結果。

篩選條件和返回欄位見 [OpenAlex 操作引數](../reference/connector-operations.md#openalex_search_works)。
<span id="空结果部分结果与错误" />

### 查詢 DOI 及關聯研究記錄 {/* #查询-doi-及关联研究记录 */}

啟用 **Literature Graph**。出版方後設資料使用 `crossref_get_work`，登記的更正/撤稿關係使用 `crossref_get_updates`。透過 `datacite_search_records` 查詢資料集或軟體 DOI，再用 `datacite_get_record` 檢查選定條目。這四個公開方法不需要 OpenAlex key。下載或引用前核對 DOI 身份、關係方向和複用條件，準確欄位見[操作引數參考](../reference/connector-operations.md#family-2)。

Rfam 序列搜尋現在使用官方批次端點。舊安裝返回已停用端點錯誤時，先更新應用，再重試目標操作。尚在等待的作業不等於搜尋完成且無命中。

## 查詢結果與報錯怎麼處理 {/* #查询结果与报错怎么处理 */}

檢查數量、分頁遊標、`truncated`/`may_be_truncated`、未找到的 ID 和逐項錯誤。返回條數上限不能證明沒有更多記錄。按資源保留基因組版本、物種、組織、單位及編號版本。

400/422 檢查欄位、型別和編號體系；401/403 檢查服務憑據與範圍；429 按服務響應等待並縮小批次。

使用結果前檢查返回狀態。示例及其有限範圍的響應記錄保留在[操作引數參考](../reference/connector-operations.md)。

| 實際遇到的結果 | 下一步 |
| --- | --- |
| `found: false`、零條記錄、研究者或供應商匹配為空 | 檢查識別符號、物種、範圍和篩選條件，保留空結果，不能寫成已取得記錄 |
| OpenAlex 的 `credential_required` | 開啟請求的憑據表單，繫結自己的金鑰後重試 |
| 直接訪問 NCBI 的變異查詢返回 `contact_email_required` | 前往 **Settings → Connectors → Manage credentials → Literature access**，填寫 **Contact email** 並點選 **Save**，再重試失敗的查詢。NCBI API key 為可選項。核對返回的識別符號、匹配數量和截斷標記；空結果與連線錯誤不同 |
| eQTL 返回 HTTP `410` | 保留來源 URL、操作和響應，先檢查服務狀態，不要為了消除報錯修改科學輸入 |
| Connector request timed out after `30000ms` | 縮小請求後重試。僅提高外層 Notebook 超時不會改變 Connector 自身的截止時間 |
| Notebook execution timed out after `60000ms` | 本次執行未取得結果。逐項重試，不能據此認定批次內所有上游服務均失效 |
| BioMart 返回 HTML 維護頁面；PRIDE 返回 `Unexpected end of JSON input` | 未獲得預期結構化響應。稍後重試，並保留響應型別或錯誤以便反饋 |
| ZINC task did not complete in time | 保留返回的任務與結果 URL，檢查原任務；反覆新建任務不能恢復它的結果 |

透過[故障排查](../guides/troubleshooting.md)反饋時，提供操作名、限定輸入、錯誤原文和時間；分享前移除憑據與私有資料。


## 查詢 ENA 測序執行與 FASTQ 檔案 {/* #ena-runs */}

1. 在 **Settings → Connectors** 中啟用 **Omics Archives**。向 `ena_search_runs` 提供公開的 ENA/INSDC 登入號，如 PRJ 專案或 SRR 執行。GEO 的 `GSE` 標識需要先找到關聯的 INSDC 專案；本工具不接受關鍵詞搜尋。
2. 檢查 `run_accession`、物種、文庫策略與佈局，以及 `truncated`。最多返回 1,000 個執行，沒有偏移量或續頁標記；結果截斷時應縮小登入號範圍。
3. 將返回的某個執行傳給 `ena_get_run_files`，檢查 `found`、`fastq_available` 和全部 `fastq_files` 條目。清單提供地址、壓縮檔案大小和上游 MD5，本身不會下載或校驗檔案。
4. 單獨下載前檢查儲存空間並儲存清單，下載後按列出的校驗值核對檔案。雙端文庫未必恰有兩個檔案，不能把 `file_index` 當作 R1/R2 標記。

<p className="example-label"><strong>案例演示</strong> 生成 SRR037073 的檔案清單</p>

本例在 v0.31.1 使用 **Codex subscription** 和已啟用的 **Omics Archives** Connector。開啟 Notebook 執行環境可用的會話，傳送：

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

開啟生成的說明。本次實際返回 **1 個執行**，物種為 **Caenorhabditis elegans**，專案為 **PRJNA123835**，文庫為 **RNA-Seq、SINGLE**，且 `truncated: false`。使用檔案前，先核對物種和文庫佈局。

![生成說明中的 ENA 查詢輸入、執行身份和完整性標記](/img/open-science/v0311/ena-notes.webp)

開啟 CSV 並與 `ena-files.json` 對照。本次 `found: true`、`fastq_available: true`，返回 **1 個檔案**，大小為 **25,154,397 位元組**。清單保留 FTP 地址和上游 MD5；預覽列顯示不全時，從下載檔案中複製完整值。

![實際返回的單檔案 ENA 清單，包含地址、大小和上游校驗值](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">查詢說明</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">FASTQ 清單</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">執行響應</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">檔案響應</ExampleDownload>

兩次查詢和清單生成均已完成。本例**沒有下載 FASTQ 或校驗檔案內容**，後續下載是獨立步驟。[具體引數](../reference/connector-operations.md#ena_search_runs)

## 執行並檢查基因集富集 {/* #gene-set-enrichment */}

<p className="example-label"><strong>案例演示</strong> 人工選定的人類 DNA 損傷相關基因集</p>

本例在 v0.31.1 使用 11 個公開基因符號演示 g:Profiler。這些基因按已知生物學功能選定，出現富集符合預期；它們不是 GSE60450 專案的差異表達結果，也不能當作無偏發現的證據。

1. 在 **Settings → Connectors** 中確認 **Genes & Ontologies** 對 Agent 可用，開啟已連線模型且 Notebook 執行環境可用的會話。
2. 指定物種、基因標識、資料來源和統計背景。真實實驗應根據哪些基因有機會被實驗篩選來確定背景；本例明確使用全部已註釋基因，沒有提交自定義的實測基因背景。
3. 傳送下方提示詞，在同一會話中查詢來源版本並執行富集，儲存實際結果。

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

4. 開啟生成的說明，核對查詢與對映數量。本次 **11/11** 個標識對映成功，未對映、歧義和重複標識均為 **0**。記錄的版本為 **GRCh38.p14**、g:Profiler **e114_eg62_p19_27110d83**、GO 類別 **2026-01-23**、Reactome 類別 **2026-03-20**。後續服務更新可能返回不同條目。

![儲存的英文查詢、背景、來源版本及標識核對](/img/open-science/v0311/enrichment-notes.webp)

5. 開啟 CSV 並與完整 JSON 比較。本次按 FDR 0.05 返回 **891 條**。預覽只顯示前 100 行，這個顯示上限不是結果總數。解釋條目時保留 `source`、`native`、已校正的 `p_value`、`intersection_size`、`query_size` 和 `effective_domain_size`。

![實際富集結果表及校正機率、背景大小](/img/open-science/v0311/enrichment-table.webp)

<ExampleDownload path="/examples/v0311/dna-damage-enrichment-notes.md">分析說明</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.csv">全部 891 行結果</ExampleDownload> · <ExampleDownload path="/examples/v0311/dna-damage-enrichment.json">完整響應</ExampleDownload>

`background_size: null` 表示沒有提交自定義背景列表，不代表統計總體有零個基因；應檢查每個條目的有效背景大小。富集不能確定因果、差異表達或上調、下調方向。[操作引數](../reference/connector-operations.md#enrich_gene_set)

## 核對參考基因組身份 {/* #reference-genome */}

<p className="example-label"><strong>案例演示</strong> 核對人類 GRCh38.p14 的 1 號染色體</p>

1. 在 **Settings → Connectors** 中啟用 **Genomes**，開啟已連線模型、Notebook 執行環境可用的會話。本例在 v0.31.1 使用 **Codex subscription**。
2. 按物種、**帶版本號**的組裝、序列的順序查詢，傳送：

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

3. 開啟說明，對照三個 JSON 中返回的標識。本例三次呼叫均成功。

![三次實際 NCBI 呼叫及返回的物種、組裝身份](/img/open-science/v0311/ncbi-notes.webp)

| 核對項 | 本例結果 |
| --- | --- |
| 物種 | Homo sapiens，TaxID **9606**；一個匹配，`ambiguous: false` |
| 請求與當前組裝 | **GCF_000001405.40**，**GRCh38.p14**，UCSC 名稱 **hg38** |
| 配對的 GenBank 組裝 | **GCA_000001405.29**；返回記錄說明其與 RefSeq 存在差異 |
| 1 號染色體別名 | **1**、**chr1**、RefSeq **NC_000001.11**、GenBank **CM000663.2** |
| 選定序列 | **248956422 bp**，Primary Assembly；一個匹配，`matches_truncated: false` |

![1 號染色體原始響應中的帶版本別名與匹配數量](/img/open-science/v0311/ncbi-aliases.webp)

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">查詢說明</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">身份對照表</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">物種響應</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">組裝響應</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">序列響應</ExampleDownload>

這裡完成的是**一條選定染色體**的查詢，不是全部組裝序列的匯出。更換查詢時，仍需保留歧義匹配和截斷標記。組裝名稱不能替代帶版本號的登入號；響應中出現當前登入號，也不能據此默默替換歷史版本。序列別名描述同一組裝內的命名關係，不會執行跨組裝座標轉換。[準確輸入](../reference/connector-operations.md#ncbi_get_assembly_info)

## 讀取 gnomAD 人群與 STRING 網路 {/* #string-network */}

需要人群細節時，對 `get_variant` 設定 `include_populations: true`，保留資料集與參考組裝。外顯子組與基因組觀察應分開；不可用值為 `null`，不等於零；相互重疊的人群或性別分層不能相加。這些是觀察頻率，不是過濾等位基因頻率。[gnomAD 引數](../reference/connector-operations.md#get_variant)

從 v0.31.0 起，`get_string_network.nodes` 包含返回的鄰居及孤立的已對映輸入。單個對映輸入會請求鄰居，多個對映輸入不擴充套件。只需輸入節點時篩選 `is_query`，全部輸入別名使用 `queries`。`n_nodes` 是網路節點數，`n_mapped` 是輸入對映數；複用舊指令碼前修正將兩者等同的邏輯。[STRING 引數](../reference/connector-operations.md#get_string_network)

## 查詢操作引數 {/* #查找操作参数 */}

需要必填欄位、可接受的值與呼叫示例時，查閱 [Connector 操作引數參考](../reference/connector-operations.md)。先在本頁選擇來源，再按具體操作查引數。

實現依據: [ConnectorsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx)。

目錄來源: [catalog.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/catalog.ts), [registry.ts](https://github.com/aipoch/open-science/blob/v0.31.1/src/main/connectors/registry.ts).
