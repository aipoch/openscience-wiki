---
title: "查詢公共組學資料並整理檔案清單"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 查詢公共組學資料並整理檔案清單 {/* #查找公共组学数据并整理文件清单 */}

從已知登入號或研究主題出發，檢查公開測序執行的後設資料，儲存包含來源地址及可用校驗值的檔案清單。下面的案例產出檔案清單，下載資料和分析資料是後續獨立任務。

開始前，按[科學資料庫](../tools/databases.md#connect-database)啟用所需 Connector，選擇已連線的模型，並確保 [Notebook 執行環境](../guides/runtimes.md)可用。

## 1. 從已知執行編號獲取檔案清單 {/* #ena-runs */}

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

## 2. 按主題發現執行並檢查專案檔案 {/* #omics-discovery */}

有研究主題、還沒有登入號時，使用 `ena_query_runs`。它按 AND 組合物種、文庫策略和關鍵詞條件，至少提供一個條件；`tax_id` 包含下級分類。預設返回上限為 100，最多 1,000。截斷結果沒有續頁標記，應縮小查詢範圍，不能把返回數量當成資料集總數。

<p className="example-label"><strong>案例演示</strong> 查詢五個人類 RNA-Seq 執行，檢查 ENA 與 PRIDE 檔案清單</p>

1. 在 **Settings → Connectors** 中啟用 **Omics Archives**，開啟已連線模型且 Notebook 執行環境可用的會話。本例使用 **Codex subscription**。
2. 傳送下方提示詞，僅查詢後設資料。ENA 查詢與 PRIDE 專案是兩個獨立示例，不是同一研究的配對樣本。
3. 開啟 `ena-discovery.json`，先核對查詢條件、物種、執行登入號和 `truncated`，再選擇檔案。

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![查詢條件及實際返回的 ENA、PRIDE 清單結果](/img/open-science/v0320/omics-discovery-notes.webp)

4. 對照選中 ENA 執行的兩種檔案清單。本例返回 **5 個執行**，`truncated: true`。首個執行 **SRR077868** 有 **1 個歸檔 FASTQ**，大小為 **462,508,712 位元組**，並提供上游 MD5。原始提交清單則為 `found: true`、`submitted_available: false`，返回 **0 個檔案**。執行記錄存在，並不代表兩種清單都有檔案。
5. 檢查 PRIDE 分頁。**PXD000001** 第 0 頁返回 **5 條檔案記錄**，第 1 頁返回 **4 條**，`api_total: 9`，最後的 `next_page: null`。合併 CSV 有 **19 行**：九個 PRIDE 檔案各提供兩個位置，再加一行 ENA FASTQ。統計檔案數量時按檔案登入號計數，不要把不同下載位置算成不同檔案。

![生成的檔案清單表格中區分 ENA 與 PRIDE 條目](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">查詢說明</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">合併清單</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">ENA 檢索結果</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">ENA 檔案清單</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">PRIDE 分頁結果</ExampleDownload>

這裡得到的是檔案清單，還沒有下載測序或蛋白質組資料。歸檔 FASTQ 與 BAM/CRAM 等原始提交檔案用途不同。ENA 原始 FTP 路徑應逐字保留，包括可能出現的 `#`。PRIDE 應按 `next_page` 和返回後設資料判斷分頁；其他專案的 `api_total` 可能缺失，校驗和文字也未必說明演算法。單獨下載前選擇所需格式、檢查儲存空間，有上游校驗值時再核對下載位元組。具體輸入見[操作參考](../reference/connector-operations.md#ena_query_runs)。
