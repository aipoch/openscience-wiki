---
title: "檢索科學資料庫並下載結構化記錄"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 檢索科學資料庫並下載結構化記錄 {/* #检索科学数据库并下载结构化记录 */}

<p className="example-label"><strong>案例演示</strong> 檢索 PubChem 中的七種直鏈羧酸</p>

從化合物名稱出發，得到包含已核對識別符號和屬性的表格。本例檢索乙酸到辛酸，覆蓋碳原子數為 2–8 的七種同系物，同時保留原始返回記錄，方便核對每個數值的來源。

## 1. 明確化合物範圍和所需屬性 {/* #1-明确化合物范围和所需属性 */}

在 **Resource center → Connectors** 中確認 **Chemistry** 可用。開啟專案，新建會話並選擇已連線的模型。本例使用 Open-Science 0.30.1 的 Chemistry/PubChem Connector，不需要預先準備輸入表格。

明確限定為**中性、直鏈、飽和一元羧酸**。相近名稱可能指向支鏈異構體、鹽或共軛鹼，僅憑分子式不能區分所有結構。

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![實際會話中的化合物範圍和輸出要求](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. 檢視實際資料庫呼叫 {/* #2-查看实际数据库调用 */}

傳送後，展開工具活動或開啟 **Notebook**。本次先使用 `pubchem_search_compounds` 解析七個名稱，再透過 `pubchem_get_compounds` 獲取記錄。接受一行結果前，檢查返回的 CID 和結構；若名稱對應多個合理候選，應先解決身份歧義。

本例使用明確的酸名稱，取首個返回 CID 後再核對整批屬性。這適用於本例的明確名稱，不能把“總取第一條”當作通用識別規則。

![真實查詢活動和 Notebook 中的檔案回讀](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. 開啟已儲存的表格 {/* #3-打开已保存的表格 */}

等待回答結束、檔案出現在 **Generated** 下，開啟 **pubchem-homologs.csv** 並放大預覽。本例得到 **7 rows · 8 columns**。

| 化合物 | PubChem CID | 分子式 | 分子量，g/mol |
|---|---:|---|---:|
| 乙酸 | 176 | C2H4O2 | 60.05 |
| 丙酸 | 1032 | C3H6O2 | 74.08 |
| 丁酸 | 264 | C4H8O2 | 88.11 |
| 戊酸 | 7991 | C5H10O2 | 102.13 |
| 己酸 | 8892 | C6H12O2 | 116.16 |
| 庚酸 | 8094 | C7H14O2 | 130.18 |
| 辛酸 | 379 | C8H16O2 | 144.21 |

![回讀的七種化合物 CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

按 **CID** 對應記錄，不要依賴顯示順序。同時核對分子式和直鏈 SMILES。本例保留返回欄位名 `SMILES` 和 `ConnectivitySMILES`，這組化合物的兩列內容恰好相同；不要把其中一列改稱其他識別符號，也不能由此推斷實驗測定的立體化學資訊。

## 4. 匯出時保留來源記錄 {/* #4-导出时保留来源记录 */}

開啟 **pubchem-homologs-source.json**，檢查八次操作、精確輸入和原始響應。開啟 **pubchem-homologs-notes.md** 檢視操作與核對說明。本例已將儲存的 CSV 與原始返回記錄逐行比較，七種化合物的身份、分子式及直鏈結構一致。

![儲存的操作步驟、核對結果與解釋範圍](/img/open-science/workflow-extensions/pubchem-notes.webp)

使用預覽中的 **Download** 按鈕保留本地副本，也可以下載本次實操的 <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>、<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">來源記錄</ExampleDownload>和<ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">說明</ExampleDownload>。PubChem 記錄會更新，應把本次來源快照與分析結果一起儲存。

這些屬性來自資料庫計算或結構標準化，不是新開展的實驗測量。分子量不等於精確單同位素質量，此表也不能證明純度、毒性或生物活性。遇到不同來源的數值不一致，可以繼續閱讀[科學記錄交叉核對](cross-check-records.md)。
