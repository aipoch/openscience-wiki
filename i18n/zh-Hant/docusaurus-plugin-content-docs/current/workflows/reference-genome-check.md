---
title: "分析前核對物種、參考基因組與染色體編號"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 分析前核對物種、參考基因組與染色體編號 {/* #分析前核对物种参考基因组与染色体编号 */}

<p className="example-label"><strong>案例演示</strong> 核對人類 GRCh38.p14 的 1 號染色體</p>

合併不同資料庫的記錄前，先確認物種、帶版本的參考組裝和染色體別名。最終保留一個染色體的身份核對表及原始響應。

開始前，按[科學資料庫](../tools/databases.md#connect-database)啟用所需 Connector，選擇已連線的模型，並確保 [Notebook 執行環境](../guides/runtimes.md)可用。

## 1. 查詢物種、組裝與染色體 {/* #reference-genome */}

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

## 2. 對照返回的識別符號 {/* #compare-identifiers */}

開啟說明，對照三個 JSON 中返回的標識。本例三次呼叫均成功。

![三次實際 NCBI 呼叫及返回的物種、組裝身份](/img/open-science/v0311/ncbi-notes.webp)

| 核對項 | 本例結果 |
| --- | --- |
| 物種 | Homo sapiens，TaxID **9606**；一個匹配，`ambiguous: false` |
| 請求與當前組裝 | **GCF_000001405.40**，**GRCh38.p14**，UCSC 名稱 **hg38** |
| 配對的 GenBank 組裝 | **GCA_000001405.29**；返回記錄說明其與 RefSeq 存在差異 |
| 1 號染色體別名 | **1**、**chr1**、RefSeq **NC_000001.11**、GenBank **CM000663.2** |
| 選定序列 | **248956422 bp**，Primary Assembly；一個匹配，`matches_truncated: false` |

![1 號染色體原始響應中的帶版本別名與匹配數量](/img/open-science/v0311/ncbi-aliases.webp)

## 3. 儲存身份核對表和來源記錄 {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">查詢說明</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">身份對照表</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">物種響應</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">組裝響應</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">序列響應</ExampleDownload>

這裡完成的是**一條選定染色體**的查詢，不是全部組裝序列的匯出。更換查詢時，仍需保留歧義匹配和截斷標記。組裝名稱不能替代帶版本號的登入號；響應中出現當前登入號，也不能據此默默替換歷史版本。序列別名描述同一組裝內的命名關係，不會執行跨組裝座標轉換。[準確輸入](../reference/connector-operations.md#ncbi_get_assembly_info)
