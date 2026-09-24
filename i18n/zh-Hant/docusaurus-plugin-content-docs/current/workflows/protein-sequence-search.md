---
title: "從基因名稱獲取蛋白序列並完成 BLAST 比對"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 從基因名稱獲取蛋白序列並完成 BLAST 比對 {/* #从基因名称获取蛋白序列并完成-blast-比对 */}

<p className="example-label"><strong>案例演示</strong> 查詢經過審閱的人血紅蛋白 α 亞基條目並獲取序列</p>

從人 HBA1 基因名稱出發，找到已審閱的 UniProt 蛋白及標準 FASTA 序列，提交 BLAST 檢索並檢查完成後的報告。本例使用已知蛋白，演示序列獲取與比對方法。

開始前，按[科學資料庫](../tools/databases.md#connect-database)啟用所需 Connector，選擇已連線的模型，並確保 [Notebook 執行環境](../guides/runtimes.md)可用。

## 1. 找到蛋白並獲取 FASTA 序列 {/* #sequence-search */}

還不知道登入號時，**Genes & Ontologies** 可先發現 UniProt 條目。向 `search_uniprot_entries` 提供基因名、蛋白名稱短語或物種。`organism_id` 匹配指定分類單元；`reviewed: true` 選擇 Swiss-Prot，`false` 選擇未審閱的 TrEMBL 條目，省略則包含兩者。續查時使用 `next_cursor`，保持篩選條件和每頁大小不變。

啟用 **Genes & Ontologies**，開啟已連線模型且 Notebook 執行環境可用的會話，傳送：

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

使用 FASTA 前先開啟 JSON。本次返回 **P69905 / HBA_HUMAN**，物種為 **Homo sapiens**，長度 **142 個氨基酸**，基因名稱包含 **HBA1 和 HBA2**。響應標明 UniProt 版本 **2026_03**、`total_results: 1` 和 `has_more: false`。FASTA 標題行保留登入號和物種，序列包含 142 個殘基。按基因名查詢可能返回關聯多個基因的蛋白條目，不能據此假定基因與條目一一對應。

![UniProt 查詢條件與返回的已審閱人類蛋白條目](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">UniProt 查詢與 FASTA 響應</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">標準 FASTA 序列</ExampleDownload>

## 2. 提交併跟蹤 BLAST 任務 {/* #blast-jobs */}

需要檢索相似序列時，啟用 **Genomes**，使用其中的三個 BLAST 操作。序列會傳送至公共 NCBI 服務，請使用公開或已獲授權的輸入。

1. 使用序列、`molecule_type` 和相容資料庫呼叫一次 `blast_submit`，儲存返回的 `rid` 與輪詢提示。對於上面的蛋白，`molecule_type: protein` 和 `database: swissprot` 表示進行蛋白檢索。
2. 針對該 RID 呼叫 `blast_status`。同一 RID 的請求至少間隔 **60 秒**，所有 BLAST 請求至少間隔 **10 秒**；服務要求更長等待時，按更長間隔執行。`WAITING` 表示仍在排隊或執行，應保留 RID 繼續查詢，不要重複提交。
3. 出現 `READY` 後，仍按同樣的間隔呼叫 `blast_results`。可選格式為 `json2`、`xml2`、`text` 和 `tabular`。報告大小上限為 2 MiB，必要時減少命中數量。表格格式可能帶註釋，不能直接當作 CSV 表。
4. 從實際報告核對查詢長度、實際資料庫、命中登入號、比對範圍、相同殘基比例和 E-value。序列相似性本身不能證明功能；已知血紅蛋白序列適合學習操作，不能當作發現未知蛋白的案例。

如果提交返回 `blast_submission_unknown`，表示無法確定是否已被接受，不要自動重複提交，應保留響應和已有 RID。提交回執或 `WAITING` 狀態都不是完成後的比對結果。具體輸入和返回條件見 [BLAST 參考](../reference/connector-operations.md#blast_submit)。

## 3. 開啟並解讀完成後的報告 {/* #blast-report */}

在上面的同一會話中繼續蛋白序列案例。保留提交回執，後續請求才能接著查詢同一個任務。傳送：

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![BLAST 提交回執中顯示 RID 和最短查詢間隔](/img/open-science/v0320/blast-submitted.webp)

報告就緒後，開啟 **hba1-blast-results.md**，把結果表與 **hba1-blast-raw.json** 對照。本例報告記錄的程式為 **BLASTP 2.17.0+**，實際資料庫為 **swissprot**，查詢序列長 **142 個氨基酸**，返回 **5 個命中**：

| 登入號 | 相同殘基數 / 比對長度 | 查詢覆蓋率 | E-value |
|---|---:|---:|---:|
| P69905 | 142/142 (100%) | 100% | 1.99033e-100 |
| P01923 | 140/141 (99.29%) | 99.30% | 1.06845e-98 |
| Q9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98 |
| P06635 | 139/142 (97.89%) | 100% | 3.57742e-98 |
| P01924 | 138/141 (97.87%) | 99.30% | 3.00466e-97 |

![已完成的 BLAST 報告展示五個真實命中、查詢覆蓋率和一致率的計算方法](/img/open-science/v0320/blast-results.webp)

這裡按每個命中的第一個 HSP 計算：一致率是相同殘基數除以比對長度；查詢覆蓋率是包含首尾位置的查詢跨度除以 142。以 P01923 為例，查詢位置為 2–142，因此覆蓋率為 141/142 = 99.30%，一致率則為 140/141 = 99.29%。兩者回答的問題不同，也都不是功能判斷正確的機率。

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">完整結果報告</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">五個命中的結果表</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">NCBI JSON2 報告</ExampleDownload>

第一項 P69905 就是輸入序列本身，100% 的一致率和覆蓋率用於核對已知序列。其他命中展示序列相似性，不代表發現了新功能。保留原始報告和查詢序列；資料庫更新後，命中列表可能變化。

要比較三條或更多已知序列，繼續[多序列比對與保守位點檢查](multiple-sequence-alignment.md)。

## 用 HMMER 檢查蛋白質結構域 {/* #hmmer-domain */}

<p className="example-label"><strong>案例演示</strong> 將人 P69905 與 Pfam 比對</p>

取得 P69905 規範蛋白質序列後，在 **Settings → Connectors** 中向 Main 開啟 **HMMER**。在同一會話中傳送：

```text
Use the HMMER Connector to scan the same human P69905 sequence against
Pfam with hmmscan. Keep the job ID, retrieve the completed domain
annotations, and save the raw result and a concise English interpretation
with coordinates and significance values. Preserve an unavailable
result as unavailable.
```

1. 核對提交回執中的任務 ID，使用同一個 ID 查詢 **status**。
2. 完成後獲取 **results** 並儲存原始響應。解釋命中前，先檢查 `ready` 和結果狀態。
3. 檢查每個命中的家族編號、查詢序列座標、E-value 和納入標記。返回一個片段不等於發現一個顯著結構域。

![P69905 的 HMMER 完成報告，包含結構域座標和顯著性數值](/img/open-science/v0331/hmmer-result.webp)

本次結果為 **Globin · PF00042.28**：納入的結構域位於查詢序列 **27–137** 位（從 1 開始，包含兩端），得分 **115.572 bits**，獨立結構域 E-value 為 **2.2781 × 10⁻³³**。**10–20** 位的短片段未被納入且不顯著，不能算作第二個結構域。座標對應提交的規範序列，不是成熟蛋白的編號。E-value 受搜尋範圍影響，不直接表示某個生物學解釋正確的機率。

<ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_raw.json">HMMER 原始響應</ExampleDownload> · <ExampleDownload path="/examples/v0331/p69905_pfam_hmmscan_interpretation.md">結構域解釋</ExampleDownload>

HMMER 的輸入隨程式變化。本例使用蛋白質序列與 **hmmscan**，其他程式見[操作參考](../reference/connector-operations.md#family-26)。**InterProScan** 則用於查詢已有任務狀態並獲取 TSV 結果，不提供提交任務的操作。
