---
title: "提取文獻證據表"
last_update:
  date: '2026-09-17'
---

# 提取文獻證據表 {/* #提取文献证据表 */}

<p className="example-label"><strong>案例演示</strong> 口罩與呼吸道感染的十項試驗</p>

本流程從明確的十篇論文出發，產出能追溯來源的證據表和不確定性說明，用於演示公共衛生文獻綜述中的證據提取。這裡的論文集是教學選題，不代表完整檢索或已經完成的系統綜述。

## 準備範圍明確的來源集 {/* #准备范围明确的来源集 */}

下載<a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>十篇論文來源清單</a>，其中包含社群、家庭和醫療場景試驗的 DOI、PMCID 與原文連結。按來源說明的訪問條件獲取並閱讀原文。

如需使用與本例相同的文字輸入，下載<a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>來源準備指令碼</a>，在本地工作資料夾中用 Python 3 執行：

```bash
python3 prepare-mask-sources.py
```

指令碼下載指定的十份 Europe PMC XML，保留來源身份、章節標題和表格，生成 **mask-trials-fulltext.md**。某篇失敗時會報告錯誤，不會悄悄跳過。Wiki 不重新分發這些論文全文；下載失敗時，先透過來源連結取得該論文，再把來源集視為完整。

在 Open-Science 專案中選擇可用模型，透過 **+ → Attach files** 新增生成的 Markdown 檔案。核對來源清單確實包含十項不同研究。文字版便於提取；涉及排版、圖片或含義不清的表格時，仍需回到原文。

點選附件開啟預覽。每篇研究以標題、DOI 和原始來源連結開頭，後面保留正文分節和表格。將十篇身份與來源清單逐一對照；重複的章節標題不代表多了一項研究。

![實際附加的全文包保留論文身份和正文分節](/img/open-science/research-workflows/mask-trials-input.webp)

將論文用作證據前，先在來源檢查更正或撤稿。自 v0.30.2 起，`literature-review` Skill 的 `verify_dois` 輔助方法會檢查 Crossref 兩個方向的更新關係。`retracted: true` 可能標記被撤稿論文，也可能標記撤稿通知，應開啟關聯記錄區分；`false` 只表示未發現所檢查的標記，不能證明論文從未撤稿。

## 要求每項試驗佔一行 {/* #要求每项试验占一行 */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

允許預期的來源讀取請求。確認代理讀到了十項研究的相應章節，而不是隻讀第一篇摘要，也不要僅憑標題相似就認定兩篇論文重複。

## 審閱提取結果 {/* #审阅提取结果 */}

回答完成後開啟 CSV，將十個 DOI 與來源清單對照，再逐篇核對結果章節或表格中的效應估計和分析人群。

![Open-Science 中的十項試驗證據表](/img/open-science/research-workflows/mask-trials-evidence.webp)

重點保留以下區別：

- **隨機分配單位：** 村莊、家庭、帳篷或病區不等於單個參與者隨機分組。
- **結局指標：** 有症狀血清陽性、實驗室確診感染和流感樣疾病是不同結局。
- **分析方式：** 按依從性或早期干預篩選的亞組結果，不能替代主要隨機比較。
- **不確定性：** 保留置信區間和不確定的結果；統計不顯著不能改寫成已經證明無效。

可下載<a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>示例證據表</a>和<a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>綜合說明</a>檢視格式。它們是供審閱的起點，科學解釋仍取決於原始來源、研究質量和你要回答的問題。

除 CSV 外，也開啟 **mask-trials-reading-notes.md**。本次最終表為 **10 rows · 12 columns**。可展開預覽或下載檔案閱讀長單元格；單元格被截斷不等於原文缺失。說明檔案保留十篇研究身份，並解釋為何不能自動合併不同結局與人群。

![儲存後的閱讀說明及已完成的十行結果](/img/open-science/research-workflows/mask-trials-notes.webp)

某行錯誤或不完整時，指出論文及具體章節/表格，要求同時修訂**兩份檔案**，然後重新開啟。例如 Cowling 2008 的隨機分配家庭流程與實際分析子集應分別保留。回答文字更新不代表儲存的表格也已更新。

## 繼續形成綜述 {/* #继续形成综述 */}

將審閱後的表格、來源和提取決策一起儲存。正式綜述還需要記錄檢索方法、納入標準、篩選過程、獨立重複提取以及適當的偏倚評估。來源核實可參考[核心閱讀清單工作流](core-reading-list.md)；需要深入檢查某個結論時，參考[論斷核查](pdf-evidence.md)。
