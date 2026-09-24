---
title: "用智慧集合篩選文獻"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 用智慧集合篩選文獻 {/* #用智能集合筛选文献 */}

<p className="example-label"><strong>案例演示</strong> 為 CO₂ 電還原組會篩選單原子催化原始研究</p>

用納入和排除標準，將候選文獻整理成經過複核的閱讀集。本例檢索八篇論文，對標題和摘要進行智慧篩選，複核判斷，再匯出五篇原始研究。這是有明確主題的組會選文，不是窮盡式系統綜述，也不是全文質量評價。

## 1. 檢索並接受候選文獻 {/* #screening-inputs */}

建立 **Single-Atom Catalysis Screening** 專案，開啟模型可用的會話。本次使用 **Codex subscription**。啟用相應文獻 Connector，按需配置[服務憑證](../guides/connectors.md)，傳送：

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

開啟 **Library → Inbox**，核對每條標題、DOI 和來源，只選擇這八篇，點選 **Accept**，確認它們關聯到本專案。收件箱中的其他記錄應單獨稽核，不要為了清空收件箱一併接受。

儲存的<ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">候選清單</ExampleDownload>記錄五篇原始研究、三篇綜述／Account，並說明線上發表年與期刊卷期年的差異。若要使用完全相同的輸入，將清單裡的八個 DOI 加入專案；重新按主題檢索可能得到不同候選。

## 2. 繫結篩選模型 {/* #screening-model */}

開啟 **Settings → Model → Classification models**，在 **Smart collections** 下選擇已配置的分類服務及模型。點選服務卡片的 **Check model**，確認 **Check passed**。本例使用 **TypeSafe AI / Jev Latest**，主會話繼續使用 Codex。

![為 Smart collections 單獨繫結分類模型](/img/open-science/v0330/classification-smart.webp)

智慧集合沒有預設模型。**Automatic capability selection** 是另一項功能，不能代替此繫結。所有智慧集合共用篩選繫結，詳見[分類模型設定](../guides/models.md#smart-collection-model)。

## 3. 設定範圍與規則 {/* #screening-rules */}

在文獻庫選擇 **New collection**，填寫 **CO2 Reduction - Primary Studies**，開啟 **Smart collection**。將 **Scope** 設為 **Single-Atom Catalysis Screening**，只評估專案中的八篇文獻。

| 欄位 | 本例填寫內容 |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

規則要求滿足全部納入條件，且不觸發任何排除條件。本次只篩選標題和摘要，保持 **Use available full text**、**Update automatically** 關閉，再選擇 **Create collection**。下圖是透過 **Collection rule → Edit rule** 重新開啟的已儲存規則。

![已儲存的篩選標準、專案範圍和證據選項](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview** 可輔助調整草稿，但不會儲存結果。**Use available full text** 會將可用的 PDF 文字傳送給分類服務；長文件使用相關片段，PDF 不可用時回退到標題和摘要。應檢查每條判斷實際使用的證據，再決定能否把它視為全文評價。

## 4. 先執行小規模試篩 {/* #screening-trial */}

開啟 **Collection actions → Trial run (up to 20 references)**，核對範圍後選擇 **Start trial run**。試執行會儲存決定，並進入 **Screening process**。觀察已處理數量、待處理候選和逐步出現的結果；**AI matches** 只表示本輪模型判斷，人工決定仍決定最終集合成員。

需要中斷時選擇 **Pause**（提示為 **Pause analysis**），等介面顯示 **Paused**，再用 **Resume analysis** 繼續。規則、候選文獻或儲存進度變化後，原執行可能無法續跑，應核對當前規則再發起新一輪。選擇 **Back to results** 返回納入、待複核、排除和未評估檢視；**Run details** 可檢視本輪資訊。

![同一組八篇候選的 Screening process 完成介面](/img/open-science/v0331/smart-completed.webp)

| 檢視 | 處理方式 |
| --- | --- |
| Included | 閱讀匹配文獻並確認是否符合標準 |
| Needs review | 對照真實來源解決不確定或過期的判斷 |
| Excluded | 檢查排除理由是否符合規則 |
| Not evaluated | 先檢查缺失證據或評估錯誤，再決定是否重試；它不表示排除 |

點選行內 **Evaluation details**，檢視決定、匹配分數、證據和模型歷史。分數描述規則匹配程度，不衡量研究質量或效應大小。

![實際的不確定判斷、標題摘要證據及模型分數](/img/open-science/v0330/screening-review.webp)

## 5. 複核並確認閱讀集 {/* #screening-review */}

開啟論文標題，閱讀摘要，必要時沿 DOI 或來源連結核對。逐項比較發表時間、研究型別、催化劑和反應是否符合規則，再選擇 **Include** 或 **Exclude**。

本例首輪排除了兩篇綜述，將五篇原始研究列為 **Needs review**，另有一篇因可讀證據不足未評估。複核後手動納入五篇原始研究；檢查來源確認最後一篇為綜述後，手動排除。最終納入的五篇均由人工確認。

![對照摘要與規則後，一篇原始研究顯示 Manually included](/img/open-science/v0330/screening-manual-decision.webp)

| 複核記錄 | 最終決定 | 依據 |
| --- | --- | --- |
| Ju，2017 · [10.1038/s41467-017-01035-z](https://doi.org/10.1038/s41467-017-01035-z) | 納入 | 實驗比較金屬–氮–碳 CO₂ 電催化劑 |
| Zhang，2019 · [10.1002/anie.201906079](https://doi.org/10.1002/anie.201906079) | 納入 | 製備 FeN₅ 位點並進行電化學測試 |
| Cai，2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | 納入 | Cu 位點催化 CO₂ 制甲烷的實驗研究 |
| Li，2022 · [10.1021/acs.nanolett.1c04382](https://doi.org/10.1021/acs.nanolett.1c04382) | 納入 | 透過磷調節 Fe 單原子催化劑的實驗研究 |
| Zhang，2021 · [10.1002/anie.202014718](https://doi.org/10.1002/anie.202014718) | 納入 | 負載 Ag 位點的實驗製備與 CO₂ 催化測試 |
| Su，2019 · [10.1021/acs.accounts.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | 排除 | Account，不符合原始研究規則 |
| Li，2020 · [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | 排除 | 綜述，可單獨保留作背景閱讀 |
| Wang，2022 · [10.1002/smm2.1101](https://doi.org/10.1002/smm2.1101) | 排除 | 核對來源後人工確認為綜述 |

集合更新會保留人工決定。**Use model decision** 撤銷單條人工覆蓋；集合選單中的 **Reset manual decisions** 範圍更大，使用前應核對。

## 6. 匯出並使用入選論文 {/* #screening-export */}

確認 **Included 5**、**Excluded 3**，且 **Needs review**、**Not evaluated** 均為零。本例納入行應顯示 **Manually included**；重新執行時，模型首輪分數可能不同。

![五篇人工納入論文與最終 5/3 分類結果](/img/open-science/v0330/screening-included.webp)

選擇 **Collection actions → Export included references → BibTeX** 或 **RIS**，儲存後檢查檔案包含五條 DOI 記錄。<ExampleDownload path="/examples/v0330/screened-primary-studies.bib">示例 BibTeX</ExampleDownload>保留匯出的引用資訊，為便於再分發已移除摘要。它是書目檔案，不包含篩選決定日誌或 PDF 全文。交接時可同時保留<ExampleDownload path="/examples/v0330/screening-decisions.csv">複核決定表</ExampleDownload>。

將入選文獻用於[組會資料包](journal-club.md)。提取詳細結果或比較催化效能前，先取得並閱讀全文。**Update automatically** 可評估所選範圍內新增或變化的記錄，並可能產生服務費用；它不會去外部資料庫檢索新論文。
