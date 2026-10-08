---
title: "期刊資料集與文獻屬性"
last_update:
  date: '2026-10-08'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 期刊資料集與文獻屬性 {/* #期刊数据集与文献属性 */}

透過 **Library → Journals** 匯入期刊目錄、指標或分類，並在匹配的文獻旁顯示。每個資料集保留 **Source** 和 **Metric year**。Open-Science 不附帶商業排名資料庫的訂閱；請匯入有權使用的資料並保留來源。期刊屬性描述期刊本身，不能代替對單篇論文質量和結論的判斷。

## 準備小型資料集 {/* #prepare-dataset */}

<p className="example-label"><strong>案例演示</strong> 為已有論文新增出版方資訊</p>

下載<ExampleDownload path="/examples/journals/journal-publisher-directory.csv">三種期刊的 CSV</ExampleDownload>，其中包含 Nature Communications、PLOS Medicine 和 The BMJ 的電子 ISSN、出版方及網址。來源為 [Nature Communications](https://www.nature.com/ncomms/)、[PLOS Medicine](https://journals.plos.org/plosmedicine/) 和 [The BMJ 訂閱說明](https://www.bmj.com/about-bmj/resources-subscribers)。這是 **2026** 年的出版方目錄快照，使用文字屬性，不虛構影響因子或分割槽。

用於匹配的文獻是 Ju 等人的 **Understanding activity and selectivity of metal-nitrogen-doped carbon catalysts for electrochemical reduction of CO₂**，DOI 為 **10.1038/s41467-017-01035-z**。如果庫中尚無此文獻，先[新增書目記錄](library.md)，並對照來源核對期刊和 ISSN。顯示期刊屬性不需要取得論文全文。

支援 CSV、TSV、XLSX 和 journal bundle，檔案上限為 **32 MB**。**Download template** 提供起始模板。標識列與屬性列應分開；ISSN 按文字儲存，保留連字元及可能出現的末位 X。

## 匯入並匹配列 {/* #import-columns */}

1. 開啟 **Library → Journals → Import attributes**，或點選上傳區域。已有資料集時，開啟 **Journal dataset** 選擇器並選擇 **New dataset**，再選擇 CSV。
2. 檢查 **Header row** 和 **Preview**。本檔案第 **1** 行為列名；只有原始檔把期刊橫向排列時才使用 **Transpose**。
3. 將 **Source** 設為 `Publisher websites`，**Metric year** 設為 `2026`。檢查自動建議值：檔案中類似年份的數字可能被誤識別。匯入真正的指標資料時，應填指標所屬年份，不能直接把檔案釋出年份當成指標年份。
4. 按下表匹配四列。各屬性的儲存名稱應不同；**Skip** 表示不儲存該列。
5. 點選 **Review import**，逐行核對後選擇 **Import attributes**。本例顯示 **3 ready; 0 need attention**，完成後出現 **Journal attributes imported**。

| 原始列 | Import as | Value type |
| --- | --- | --- |
| Journal name | Journal name | 標識欄位 |
| ISSN | ISSN | 標識欄位 |
| Publisher | Journal attribute | Text |
| Journal website | Journal attribute | Text |

![設定期刊標識、出版方屬性及明確的來源和年份](/img/open-science/v0340/journal-column-mapping.webp)

還可使用 先區分列的角色：用於匹配期刊的身份欄位（名稱、ISSN、縮寫或外部 ID）、需要顯示的 **Journal attribute**，以及不匯入的 **Skip**。檢視對映提示後再確認；自動猜測不代表欄位含義正確。

**Abbreviation** 和 **External journal ID** 作為標識。外部 ID 需要填寫所屬名稱空間，不同目錄的 ID 不能混用。屬性型別包括 **Text**、**Number**、**Single choice** 和 **Multiple choices**。數值指標可選 Number，ISSN 和分割槽類別不應作為數值處理。

行狀態可能為 **Matched**、**New**、**Ambiguous match**、**Invalid** 或 **Duplicate**。匯入前檢查衝突標識和重複行。可返回 **Edit mapping** 修改列角色；提供相應入口時，匯出問題行或明確跳過需要處理的行。New 建立的是期刊條目，不是在文獻庫中新增論文。

## 在文獻中顯示屬性 {/* #show-attributes */}

1. 確認選中 **Publisher websites 2026**，並開啟 **Show in literature**。
2. 返回 **All references**，搜尋 `Understanding activity`。
3. 開啟論文，在 **Journal attributes** 中檢視 **Publisher → Springer Nature** 和期刊網址。點選屬性的資訊入口可檢視來源和年份。
4. 將文獻的 **ISSN 2041-1723** 與匯入期刊對照。論文發表年份 **2017** 與資料集快照年份 **2026** 是兩個不同欄位。

![匯入後的期刊表，已開啟 Show in literature](/img/open-science/v0340/journal-dataset.webp)

![已有 Nature Communications 文獻顯示出版方屬性](/img/open-science/v0340/journal-reference-attributes.webp)

**Show in literature** 影響共享文獻庫、專案、集合和文獻詳情。同一來源一次只顯示**一個年份**；啟用同來源另一年份時，會替換此前顯示的年份。缺失屬性不會從其他年份補值。文獻列表中可透過 **Customize** 選擇顯示哪些可用期刊列。

## 處理期刊匹配並維護資料集 {/* #journal-matches */}

從 Journals 的 **More actions → Journal alignment** 進入，透過 **Check library / Recheck library** 檢視匹配、未匹配和歧義記錄。該檢查讀取文獻庫，不會靜默改寫書目後設資料。處理不匹配前，先對照原始出版物確認期刊名稱和 ISSN。

提供相應入口時，使用 **Find journal candidates → Choose journal → Confirm journal association**，將選中的文獻關聯到正確期刊。它只作用於這一條文獻，不會批次影響名稱相似的論文。移除人工確認後恢復自動匹配；修改文獻的期刊標識也可能使原關聯失效。

先選擇目標資料集，再使用 **Update dataset**。重新檢查來源、年份和列對映，匯入後核對受影響文獻。其他年份應保留為單獨資料集，不要覆蓋原有年份的含義。資料集操作可修改名稱、來源、年份，或匯出保留資料及列設定的 journal bundle。同時儲存原始檔案及其使用條件。
