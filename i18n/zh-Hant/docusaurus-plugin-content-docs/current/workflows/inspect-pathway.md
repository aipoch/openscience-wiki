---
title: "檢查通路及其互作網路"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 檢查通路及其互作網路 {/* #检查通路及其互作网络 */}

<p className="example-label"><strong>案例演示</strong> 透過 Pathway Commons 檢視 Reactome 人類 p53 訊號通路</p>

從整理過的通路記錄出發，檢視 **TP53**、**MDM2** 和 **CDKN1A** 在網路中的關係，儲存來源響應、互作表和研究說明。本流程查詢已有通路連線，不做富集檢驗，也不測量樣本中的通路活性。針對基因列表的統計問題，參見[基因集富集](gene-set-enrichment.md)。

## 1. 準備專案 {/* #prepare */}

1. 建立 **Pathway Commons Research** 專案並新建會話。
2. 在 **Settings → Connectors** 中向當前代理開放 **Pathway Commons**。它連線公共服務，本例不需要上傳私人研究檔案。
3. 選擇已配置的主模型。本例使用 **Codex subscription**；若 Codex 顯示 **Update required**，先[更新執行時](../guides/frameworks.md#update-codex)，再傳送任務。

## 2. 檢索並保留返回的準確標識 {/* #search */}

傳送：

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

開啟會話旁的 **Notebook**，檢查查詢和返回記錄。本例搜尋 `p53 signaling`，限定型別 `Pathway`、物種 `9606`、來源 `reactome`，並透過 `top_pathways` 查詢 `p53`。搜尋報告**總計 1,309 條命中**；第一頁不等於全部結果。

![英文研究請求和 Notebook 中真實執行的 Pathway Commons 查詢](/img/open-science/v0340/pathway-query.webp)

本例選擇 **Transcriptional Regulation by TP53**，準確 URI 為 `http://bioregistry.io/reactome:R-HSA-3700989`，來源為 `pc14:reactome`。保留查詢實際返回的 URI，不要根據名稱拼接標識。來源更新後，命中順序和數量可能變化。

## 3. 匯出選中的通路 {/* #export */}

要求代理對選中的 URI 匯出，並**包含子通路**。本例儲存 SIF、TXT 和 JSON-LD 響應。SIF 提供展平的互作記錄，TXT 還包含節點，JSON-LD 保留更豐富的模型結構。選擇格式或子通路範圍時可查閱[操作參考](../reference/connector-operations.md#pathway_commons_export)。

先檢查保留的響應，再閱讀總結。本例 SIF 有 **3,318 條互作記錄**，TXT 有 **387 個節點**。這些數字對應所選通路和匯出範圍，不代表人類全部 p53 互作。

## 4. 開啟並檢查結果 {/* #inspect */}

1. 點選回覆或生成檔案卡片中的 **tp53_mdm2_cdkn1a_readable_interactions.tsv**。列寬不足時開啟全屏預覽。
2. 將 `source`、`interaction`、`target` 與原始響應對照。九行閱讀表是節選，不是完整網路。
3. 開啟 **tp53_pathway_research_note.md**，確認儲存了通路 URI、來源、日期和解釋邊界。
4. 下載需要的檔案；做彙報時，應把完整網路和原始響應與節選一起保留。

![在應用內開啟九條選定互作記錄](/img/open-science/v0340/pathway-interactions.webp)

實際返回記錄包括 `TP53 controls-expression-of MDM2`、`MDM2 controls-state-change-of TP53` 和 `MDM2 in-complex-with TP53`。CDKN1A 出現在六條記錄中，但此 SIF 匯出沒有直接的 TP53 到 CDKN1A 連邊。所選通路展平後缺少某條邊，不能作為該生物學關係不存在的證據。

![保留通路標識及解釋邊界的英文研究說明](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` 本身不區分啟用或抑制；`in-complex-with` 不能證明兩個分子直接結合。僅憑該網路無法確定組織特異性、突變影響、互作強度、樣本活性或因果關係。這些問題還需要檢視原始通路反應和實驗文獻。

## 本例結果檔案 {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">原始 Connector 響應，ZIP 壓縮包</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">完整匯出互作表</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">九行閱讀表</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">英文研究說明</ExampleDownload>

若要研究基因鄰域或基因集合之間的路徑，可使用 **pathway_commons_graph**，明確方向、路徑模式和步數限制。它與本例按 URI 匯出準確通路是不同查詢。來源能力和連線方式見[科學資料庫](../tools/databases.md#pathway-expression-clinical)。
