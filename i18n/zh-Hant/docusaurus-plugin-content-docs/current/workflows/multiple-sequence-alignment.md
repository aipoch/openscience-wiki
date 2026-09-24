---
title: "多序列比對與保守位點檢查"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 多序列比對與保守位點檢查 {/* #多序列比对与保守位点检查 */}

<p className="example-label"><strong>案例演示</strong> 比較人、小鼠和牛的血紅蛋白 α 鏈</p>

獲取三條經過審校的 UniProt 序列，透過遠端 Clustal Omega 比對，檢查哪些列在三個物種中為同一氨基酸。本例得到 142 列，其中 116 列完全保守。這是這組三物種的結果，不是功能註釋或系統發育樹。

連線配置見[科學資料庫](../tools/databases.md#connect-database)。

## 1. 準備會話與序列來源 {/* #alignment-inputs */}

1. 建立 **Hemoglobin Sequence Alignment** 專案，開啟新會話並連線模型。本例使用 **Codex subscription**。
2. 在 **Settings → Connectors** 為 Main 啟用 **Genes & Ontologies** 和 **Genomes**。Clustal Omega 屬於 Genomes，不是單獨的 Connector。
3. 在 **Settings → Privacy → Share contact email with research data services** 配置 Clustal Omega 要求的有效聯絡郵箱，使用真實聯絡方式。序列會傳送到 EMBL-EBI。
4. 傳送下面的提示詞，使用公開或已獲授權的序列。

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

比對前先核對返回記錄：

| 物種 | 已審校條目 | 分類編號 | 標準序列長度 |
| --- | --- | --- | --- |
| 人 · Homo sapiens | P69905 | 9606 | 142 aa |
| 小鼠 · Mus musculus | P01942 | 10090 | 142 aa |
| 牛 · Bos taurus | P01966 | 9913 | 142 aa |

FASTA 名稱為 `human_P69905`、`mouse_P01942` 和 `bovine_P01966`，各名稱必須唯一。人 P69905 同時關聯 HBA1 和 HBA2，一個蛋白條目不一定對應唯一基因。每條序列都應保留 accession 與物種。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">三條輸入序列</ExampleDownload>

## 2. 提交一次並跟蹤任務 {/* #alignment-job */}

Agent 使用 **Genomes → clustalo_submit**，提交合並的 FASTA，並設定 `stype: protein`、`outfmt: clustal_num`。服務要求至少三條記錄，最多 4000 條或 4 MiB。儲存返回的 `job_id`、輸出格式與提交回執。

1. 檢視 Notebook 中的提交響應。得到任務 ID 和 **QUEUED** 表示已接受，不代表完成。
2. 對同一 ID 呼叫 `clustalo_status`，每次至少間隔十秒，並遵循服務返回的更長等待要求。排隊較慢時不要另提一份。
3. 等 **FINISHED** 後，用相同 ID 和格式呼叫 `clustalo_results`。將返回內容儲存為 `.aln`；得到建議檔名不代表檔案已儲存。
4. 會話停止後，保留任務 ID，稍後繼續查詢。提交響應不確定時，遠端仍可能已接受，不要自動重提。**ERROR**、**FAILURE**、**NOT_FOUND** 需要排查，不能解釋成空比對。

![Session Notebook 中的真實任務 ID、排隊查詢和完成狀態](/img/open-science/v0331/clustal-submission.webp)

本例最初回執記錄 **QUEUED**，後續 Notebook 結果返回 **FINISHED** 和 Clustal O(1.2.4) 比對。結果儲存期由提供方控制，文件說明最長約一週，應及時儲存。結果大小上限為 8 MiB，詳見[操作引數](../reference/connector-operations.md#clustalo_submit)。

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">原始提交回執</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">原始比對</ExampleDownload>

## 3. 檢查比對並統計保守列 {/* #alignment-results */}

開啟生成的 **hemoglobin_alpha_conservation_report.md**，將 accession、序列長度與輸入 FASTA、原始比對核對。移除每條比對序列中的空位後，剩餘殘基必須與對應輸入完全一致，以排除序列替換或截斷。

![英文報告中的來源標識、比對統計和解釋限制](/img/open-science/v0331/clustal-report.webp)

本次結果：

| 檢查項 | 結果 |
| --- | --- |
| 輸入和比對序列 | 三條，每條 142 個殘基 |
| 比對列數 | 142 |
| 含空位的列 | 0 |
| 三條序列具有相同殘基 | 116 列 |
| 可變列 | 26 |
| 完全保守比例 | 116 / 142 = 81.7% |

Clustal 輸出中，`*` 表示完全保守，`:` 和 `.` 表示性質相近的分組，不是殘基相同。上述比例只統計相同且無空位的列。示例包括 D7、G16、H59、H88 和 R142。本例沒有空位，因此比對列號與標準序列殘基編號一致；存在空位時應逐條對映，也不要與成熟蛋白的編號混用。

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">結果報告</ExampleDownload>

## 4. 根據證據解釋結果 {/* #alignment-interpretation */}

這三個近緣哺乳動物中的保守性，可以支援有關約束的假設，不能單獨證明殘基功能。摺疊、穩定性、共同祖先及選樣都可能影響結果。更廣的物種取樣、結構背景和實驗驗證是後續工作。多序列比對不等同於 BLAST 檢索，也不是系統發育樹。

將輸入 FASTA、原始比對、回執與報告一起保留。需要從一條未知序列開始時，參見[蛋白髮現與 BLAST](protein-sequence-search.md)；基於模型的檢索見 [HMMER 與 InterProScan 能力](../tools/databases.md#sequence-tools)。

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
