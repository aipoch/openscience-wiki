---
title: "文獻庫與引用"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 文獻庫與引用 {/* #文献库与引用 */}

線上找文獻時，在對話中說明主題、年份範圍和篩選條件，再到 **Library → Inbox** 審閱候選記錄。實作見[組會主題檢索工作流程](../workflows/journal-club.md)。**Search references** 用於篩選 Library 中已有的記錄，不會執行線上文獻檢索。

文獻庫是共享的本地書目。專案和集合引用其中的條目，把同一論文加入另一個集合無需複製。本章使用[核心閱讀清單](../workflows/core-reading-list.md)中的三篇真實 PRISMA 論文；工作流負責研究目標和驗收，本頁說明頁面控制元件及條目生命週期。

需要複用附件 PDF 中的圖片或表格時，按 [PDF 圖表提取](previews.md#pdf-extraction)操作。匯入後設資料或自動獲取全文字身不會完成圖表提取。

## 選擇正確檢視 {/* #选择正确视图 */}

從 Home 或工作區進入 **Library**，**Back to Home** 返回專案。文獻庫內 **Settings** 開啟引文樣式，不是全域模型設定。

| 檢視 | 內容 | 用途 |
| --- | --- | --- |
| Inbox | Agent 發現、等待稽核的候選 | 接受前核對身份和來源 |
| All references | 已接受的活躍條目 | 搜尋、編輯、整理 |
| Duplicates | 識別符號/後設資料疑似重複組 | 比較後再決定合併 |
| Trash | 已移除條目 | 恢復或明確永久刪除 |
| Project | 與專案關聯的文獻 | 保持研究問題相關範圍 |
| Collection | 主題分組，可巢狀 | 跨專案複用閱讀集合 |

![真實 PRISMA 集合中的三篇論文](/img/open-science/guides-walkthrough/51-library-collection.webp)

## 新增或匯入條目 {/* #添加或导入条目 */}

點選 **Add** 選擇來源。選擇一份 PDF 進入後設資料編輯器，選擇多份則開啟 **Import PDFs**。

| 入口 | 輸入 | 儲存前檢查 |
| --- | --- | --- |
| Add reference | 手填書目 | 必填標題、文獻型別和識別符號 |
| Import PDF | 一份或多份本地 PDF | 對照每篇論文檢查提取的後設資料；多檔案走下面的批次流程 |
| Import references | BibTeX、RIS、NBIB | 有效/無效記錄、目標和識別符號匹配 |

<ToolOperationGroup>
<summary>匯入一批選定的 PDF</summary>

### 匯入一批選定的 PDF {/* #导入一批选定的-pdf */}

1. 選擇本次閱讀集合需要的 PDF，等待後設資料提取。應用可透過識別出的 DOI 補全書目欄位，仍需與論文核對。
2. 確認 **Import to** 顯示的是預期目標；目標來自啟動匯入時所在的文獻庫檢視，在 **When identifiers match** 選擇下表中的處理方式。
3. 使用單項核取方塊或 **Select all** 選擇本批檔案；**Show more** 顯示更多已列出的檔案。
4. 點選 **Import selected**，檢查總進度與每個檔案的狀態；失敗檔案不算匯入完成。
5. 需要停止時點選 **Stop**，等待 **Stopping…** 結束。已經提交的條目保留，正在提交的操作可能先完成。
6. 停止後，選擇仍為 Ready 的檔案，點選 **Import selected** 繼續。如果失敗後顯示 **Retry unfinished**，用它重試未完成項。尤其在 PDF 上傳中斷後，先檢查保留下來的條目，再決定是否重新發起匯入。
7. 對話方塊提供 **Done / Close** 後退出，開啟目標位置核對條目和 PDF。匯入前的 **Cancel** 放棄準備。

| 識別符號匹配策略 | 結果 |
| --- | --- |
| Reuse existing reference | 複用匹配記錄，不重複建立書目 |
| Keep as separate reference | 保留獨立記錄，之後再比較和去重 |
| Fill empty fields | 補空欄位，保留已有及衝突值 |

批次狀態包括 **Pending、Reading…、Ready、Importing…、Completed、Failed、Skipped**。選中檔案、後設資料準備就緒和匯入完成是不同階段。若顯示 **PDF upload cancelled. The reference was kept.**，檢查保留條目的附件；取消上傳沒有刪除書目條目。

![選擇兩份真實 PRISMA PDF 並核對匹配策略](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

選擇 **Reuse existing reference** 時，如果 PDF 提取的標題或 DOI 未匹配，仍可能建立獨立條目。匯入後逐篇開啟，核對標題和 DOI；修正身份後再[合併重複條目](#去重与恢复条目)。**Completed** 表示匯入完成，不代表識別準確。

![兩份 PDF 的實際匯入結果](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>停止批次匯入並保留已完成項</summary>

### 停止批次匯入並保留已完成項 {/* #停止批量导入并保留已完成项 */}

**Stop** 允許當前條目先完成。逐行檢查狀態：**Completed** 條目保留且不能再次勾選；選擇剩餘 **Ready** 行，再用 **Import selected** 繼續。失敗後若出現 **Retry unfinished**，先處理所報原因，再重試並檢查已完成記錄沒有重複匯入。

![停止 PDF 匯入後保留已完成行](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

出現 **The reference was kept. Retry to finish adding its PDF.** 時，文獻條目已儲存，附件尚未完成。確認原 PDF 仍在選取的位置、可以開啟，再點選 **Retry unfinished**。重試會繼續處理未完成行；完成後回到原集合，開啟 PDF 檢查內容。若提示結果無法確認，先檢查文獻庫，再決定是否重新匯入。


</ToolOperationGroup>

<ToolOperationGroup>
<summary>從其他文獻管理器遷入書目</summary>

### 從其他文獻管理器遷入書目 {/* #从其他文献管理器迁入书目 */}

<p className="example-label"><strong>案例演示</strong> 用三種匹配策略匯入 PRISMA 書目</p>

先開啟目標集合，再選擇 **Import references** 和 `.bib`、`.ris` 或 `.nbib` 檔案。預覽顯示識別格式、目標位置、新增／已有／跳過數量和匹配條目。展開 **View details**，核對題名與作者後再匯入。書目匯入不會下載 PDF。

| 策略 | PRISMA 宣告的實測結果 |
| --- | --- |
| Keep as separate reference | BibTeX 新建一條記錄，Duplicates 隨後出現一個 DOI 匹配組 |
| Reuse existing reference | RIS 複用一條記錄，新增、跳過、失敗均為零 |
| Fill empty fields | [PubMed NBIB 記錄](https://pubmed.ncbi.nlm.nih.gov/19621072/)補入 PMID `19621072` 和 PMCID `PMC2707599`，原題名與五個作者條目保留 |

點選 **Import references**，等待 **Import complete**，核對 Created／Reused／Skipped／Failed 後選擇 **Done**。重新開啟條目檢查欄位，匯入數量不能證明後設資料準確。補空欄位可以增加識別符號和期刊縮寫，同時保留完整期刊名。

![明確選擇重複策略的 BibTeX 匯入](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![透過 NBIB 補充缺少的書目欄位](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## 稽核 Inbox 來源 {/* #审核-inbox-来源 */}

<p className="example-label"><strong>案例演示</strong> 稽核三篇 PRISMA 候選</p>

開啟候選標題或 **View details**，檢查 Provider、源連結、DOI 等識別符號，與出版社核對年份、作者順序、期刊。**Accept** 加入文獻庫，**Dismiss** 移出待審佇列。批次操作前確認勾選範圍。

![等待稽核的三篇真實 PRISMA 候選](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

本例的三篇候選已逐條接受，Inbox 清空。Provider 匹配只是初始記錄，不代表書目完整無誤。標題中的 2020 對應宣告論文的發表年份是 **2021**；兩篇 2009 論文的 DOI 和作者列表不同。

## 檢查和修正後設資料 {/* #检查和修正元数据 */}

條目 **More actions → Edit metadata** 開啟當前欄位。**Complete metadata** 會查詢來源，與純本地編輯不同。

![已儲存並重新開啟的機構作者欄位](/img/open-science/v0.27.0/04-organization-author.webp)

| 欄位/控制元件 | 輸入與作用 |
| --- | --- |
| Reference type | 論文、綜述、預印本、書籍、資料集等支援的型別 |
| Title | 必填，保留髮表標題 |
| Year / Publication | 發表年份與期刊/載體，不一定等於標題中的年份 |
| Advanced settings | Volume、Issue、Pages、Publisher、Place、Edition |
| Add creator / Remove creator | 新增或移除草稿中的作者行 |
| Creator role | 按來源選擇 Author、Editor 或 Translator |
| Name type → Person | 填寫 Given name 和 Family name |
| Name type → Organization | 填寫機構完整名稱，不拆成虛構人名 |
| Add identifier | DOI、PMID、PMCID、ARXIV、ISBN、ISSN、OTHER 型別和值 |
| Preferred for DOI / ISSN 等 | 選擇該型別的首選識別符號；不是所有型別共用一個單選項 |
| Remove identifier | 移除草稿識別符號行 |
| URL / Abstract | 來源地址與摘要 |
| Save | 儲存有效更改 |
| Cancel / Close | 放棄草稿 |

<p className="example-label"><strong>案例演示</strong> 將 The PRISMA Group 保留為機構作者</p>

補充 **The PRISMA Group** 時，選擇 **Add creator → Creator role: Author → Name type: Organization**，填寫完整名稱並 **Save**。重新開啟條目，確認機構位於四位個人作者之後，再將生成引用與[出版方作者列表](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097)比較。

![APA 引文保留機構作者](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 更正了 PubMed 作者姓名的解析，包括姓氏、名字縮寫和字尾。匯入或補全文獻後設資料後，對照來源檢查作者欄位及生成的引用。不要假定安裝更新會自動重寫文獻庫中已有的後設資料。

## 整理已接受記錄 {/* #整理已接受记录 */}

使用 **New collection**，填寫必填 **Name** 與可選 **Description**，點選 **Create collection**。說明用於整理，不是 Agent Context；Cancel/Close 放棄草稿。在 All references 勾選條目，使用 **Add to collection / Add to project**。完成後勾選清空，增加另一個目標時重新選擇。

詳情中的專案/集合核取方塊顯示關聯。**Manage Tags** 分配標籤，表格一至五星是人工標記，不是自動證據質量評估。**Clear selection** 清除選擇而不改變條目。

| 表格控制元件 | 範圍 |
| --- | --- |
| Search references | 標題、作者、期刊、識別符號、摘要、筆記等書目欄位 |
| Sort references | 更改顯示順序 |
| Filters | 按型別、年份、標籤、全文狀態等篩選 |
| Customize | 選擇/重排顯示列 |
| References per page | 25、50、100 行 |
| 行復選框 / Select all | 設定批次操作目標 |
| Export | 匯出所選書目，不自動打包全部 PDF |

文獻庫總數與當前搜尋、篩選結果數分別統計。批次操作前核對當前檢視和選擇數量，篩選結果變少不代表條目被刪除。

判斷條目丟失前清除搜尋和篩選。關聯專案/集合不會為各目標建立獨立後設資料副本。

## 新增並閱讀全文 {/* #添加并阅读全文 */}

**Find full-text PDF** 檢查適用的 Europe PMC/PMC、OpenAlex、Unpaywall、arXiv；識別符號和聯絡方式/憑據決定適用來源。點選 **Add attachment** 前核對來源、版本標記和 URL。

<p className="example-label"><strong>案例演示</strong> 為 PRISMA 2020 條目補充出版社 PDF</p>

找到來源後，如果 **Add attachment** 失敗，從出版社下載公開 PDF，再透過同一條目的 **Add PDF** 上傳。開啟附件，對照出版記錄檢查標題及 DOI。本例的 **Preview prisma-2020-statement.pdf** 顯示了對應的 PRISMA 2020 論文：**806.1 KB、15 頁**。

![成功關聯的出版社 PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

找到來源不等於附件已儲存，附件存在不等於 Agent 已閱讀全文。**Read with agent** 為後續請求提供上下文。Composer 的 `@` 可選精確條目、專案 Library 或 Collection；集合提供檢索範圍，不會自動裝入全部全文。PDF 控制元件見[預覽](previews.md)。

找不到公開副本時保留已核對後設資料，適當使用合法獲取的本地 PDF。後臺查詢/下載任務可提供當前條目後暫停、恢復、稽核、取消；取消不撤銷已完成的前麵條目。

<ToolOperationGroup>
<summary>分批補全文，暫停後繼續</summary>

### 分批補全文，暫停後繼續 {/* #分批补全文暂停后继续 */}

1. 在文獻列表選擇目標條目，開啟所選項的 **More actions → Find full-text PDF**。
2. 等待檢索開始。需要暫停時點選 **Pause**；當前條目處理完後才進入暫停狀態。
3. 核對 **Checked** 和 **Pending** 數量，再選擇 **Continue search**。關閉面板後，可從 **Background tasks → Open** 返回同一任務。
4. 檢索結束後檢查每條候選來源與警告，選擇需要的專案，再點選 **Add selected**。
5. 下載階段也可暫停，之後用 **Continue download** 繼續。檢查最終 **Added / Failed / Skipped** 狀態，並重新開啟成功附件。
6. 不再需要待稽核任務時，在 **Background tasks** 使用 **Remove task**。移除後檢查該任務已消失，並確認文獻與附件仍可開啟；移除任務不等於刪除文獻或附件。

![檢索在當前條目完成後暫停，保留剩餘專案](/img/open-science/priority-completion/14-literature-batch-paused.webp)

暫停的檢索會保留已檢查與待處理條目。繼續或重新開啟任務後，檢查最終數量和每條結果。找到候選來源與成功附加 PDF 是兩個不同結果。

![從後臺任務重新開啟已完成的五條檢索](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>有來源但無法新增 PDF</summary>

### 有來源但無法新增 PDF {/* #有来源但无法添加-pdf */}

若出現 **PDF could not be added**，檢查來源是否要求登入、連結是否有效、檔案是否超過提示的大小限制，以及當前代理/DNS。不要反覆建立同一文獻。

如果 PDF 來源被解析為 `198.18.x.x` 等保留地址，下載模組會拒絕它。按[網路](network.md)恢復可驗證的公網解析後重試，不要關閉地址檢查。若已有合法下載的 PDF，可用 **Add PDF**，然後核對標題、DOI 和頁數。


</ToolOperationGroup>

## 格式化與複製引文 {/* #格式化与复制引文 */}

進入 **More actions → Citation**，選擇 **Citation style**，檢查完整條目及文內形式，再用 **Copy reference / Copy in-text citation / Copy BibTeX / Copy RIS**。使用前對照原來源核對作者、年份、標點和 DOI，格式轉換不會修復缺失欄位。

**Manage citation styles…** 開啟樣式管理，內建 APA、MLA、Chicago author-date、Vancouver、IEEE、Nature、AMA、Harvard。**Preview** 顯示格式樣例，**Browse styles** 開啟外部目錄，**Import CSL** 匯入本地樣式。下文已驗證 PLOS CSL 的匯入和使用。複製與檔案匯出是不同操作，遷移書目時應分別檢查。

<ToolOperationGroup>
<summary>匯入期刊樣式後核對真實引文</summary>

### 匯入期刊樣式後核對真實引文 {/* #导入期刊样式后核对真实引文 */}

<p className="example-label"><strong>案例演示</strong> 為 PRISMA 條目應用 PLOS 引文樣式</p>

在 **Library → Settings → Import CSL** 選擇從 [CSL 樣式倉庫](https://github.com/citation-style-language/styles/blob/master/plos.csl)下載的獨立 `plos.csl`。本例中，**Imported styles** 由 0 變為 1，並顯示 **Public Library of Science**。返回真實 PRISMA 條目的 **Citation**，在 **Citation style** 中選擇該樣式，核對生成的編號引文與 `[1]` 文內引用。樣式預覽中的示例文章不屬於你的文獻庫，正式引用應以實際條目為準。

![匯入的 PLOS 樣式用於真實 PRISMA 條目](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>複製引文或匯出可複用記錄</summary>

### 複製引文或匯出可複用記錄 {/* #复制引文或导出可复用记录 */}

<p className="example-label"><strong>案例演示</strong> 複製並往返匯出 PRISMA 引文記錄</p>

Citation 的四個複製按鈕寫入不同格式。貼上到目標編輯器，檢查結果後再離開面板。

| 按鈕 | PRISMA 2009 的核對結果 |
| --- | --- |
| Copy reference | APA 引文保留四位個人作者、The PRISMA Group、年份和 DOI |
| Copy in-text citation | `(Moher et al., 2009)` |
| Copy BibTeX | `@article` 記錄，機構作者使用額外花括號包圍 |
| Copy RIS | `TY  - JOUR` 記錄，含作者、題名、年份和 DOI 欄位 |

![真實 PRISMA 條目的引文複製控制元件](/img/open-science/local-todo-batch/01-citation-copy.webp)

需要檔案時，關閉 Citation，勾選表格行，選擇 **Export → BibTeX** 或 **RIS**。在系統儲存視窗選擇位置，等待 **Saved**。匯出的是書目記錄，不包含 PDF 附件包。將儲存的檔案重新匯入測試集合，選擇 **Reuse existing reference** 並核對匹配數量。兩份 PRISMA 匯出檔案均複用了已有 DOI，沒有新增記錄。

這裡的 BibTeX 儲存年份和月份，往返後為 `2009-7`；RIS 保留 `2009-07-21`，合併時應核對日期精度。普通 RIS 作者欄位在其他管理器中不一定保留獨立的機構型別；如需保持該區別，應檢查匯入後的作者編輯器。


</ToolOperationGroup>

## 去重與恢復條目 {/* #去重与恢复条目 */}

<p className="example-label"><strong>案例演示</strong> 合併並恢復 PRISMA 條目及其附件</p>

<ToolOperationGroup>
<summary>保留一條記錄及其附件</summary>

### 保留一條記錄及其附件 {/* #保留一条记录及其附件 */}

1. 開啟 **Duplicates → Review duplicates**。檢查範圍是整個文獻庫的活躍記錄，不限當前集合。
2. 在 **Keep reference** 選擇身份已核對的記錄，比較 DOI、作者、附件數量和新增時間。**Show all fields** 展示衝突檢視中隱藏的其他欄位。
3. 逐項選擇衝突欄位來源。例如 PRISMA 的 BibTeX 往返中，保留完整日期 `2009-07-21`，而不是 `2009-7`。空欄位可從另一條記錄補入。
4. 核對 **After merging** 的附件、集合和專案數量，再點選 **Merge references**；**Cancel** 保持記錄分開。
5. 重新開啟保留條目，檢查後設資料、關聯和 PDF 正文。被合併的條目在 Trash 中標為 **Merged duplicate**。

![比較保留條目和衝突日期](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

標題被提取為 `pmed.1000097 1..6` 的 PDF 最初沒有進入重複組。核對論文後，修正標題並補入 DOI `10.1371/journal.pmed.1000097`，才出現匹配組。本例合併到已核對的書目條目後，保留了 **1 份 PDF、2 個集合關聯和 1 個專案關聯**；六頁 PDF 可重新開啟。先確認論文身份，不能只憑檔名相似就合併。

![合併後保留 PDF 和組織關聯](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>恢復誤移入回收站的文獻</summary>

### 恢復誤移入回收站的文獻 {/* #恢复误移入回收站的文献 */}

行選單 **More actions → Move to Trash** 會從活躍文獻、專案和集合檢視移除該條目。在 **Trash** 搜尋標題或識別符號，開啟行選單並選擇 **Restore**。應先恢復再編輯、預覽或匯出：這些控制元件在 Trash 中被禁用。返回原專案與集合檢查關聯。本例的 PRISMA 條目恢復後，PDF 和三個關聯均保留。

![透過回收站行選單恢復文獻](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>永久刪除不需要的重複條目</summary>

### 永久刪除不需要的重複條目 {/* #永久删除不需要的重复条目 */}

在 Trash 選擇 **More actions → Delete permanently**，閱讀確認範圍；**Cancel** 保留條目。確認後刪除選中文獻及後設資料，不再共享的附件檔案隨後清理。歷史輸出保留，搜尋索引另行過期，因此它不是安全擦除。刪除前匯出仍需保留的內容。

刪除後檢查所選記錄已從 Trash 消失，保留的文獻及附件仍可開啟。解除集合關聯、移入回收站和永久刪除分別作用於不同範圍。

![核對永久刪除的具體範圍](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## 附件更改與併發編輯 {/* #附件更改与并发编辑 */}

移除附件前，閱讀刪除確認並核對目標檔案和版本；透過可用的版本歷史檢視舊附件版本。刪除 PDF、把文獻移入 Trash、永久刪除文獻的範圍不同，歷史對話中保留的證據還可能限制檔案清理。

另一客戶端在編輯期間修改了集合時，過期儲存可能被拒絕。重新開啟最新集合，比較已儲存值與本次修改，再重試。儲存後的重新整理或清理報錯不一定表示儲存失敗，應先檢查實際條目再重複操作。


原始碼：[批次匯入](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx)、[後設資料編輯器](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx)、[附件歷史與刪除](https://github.com/aipoch/open-science/commit/f4a82d4a)、[併發編輯](https://github.com/aipoch/open-science/commit/dbb9560a)。

## 儲存 PDF 閱讀筆記 {/* #保存-pdf-阅读笔记 */}

在文獻附件中開啟 PDF，使用 **Notes & Annotations** 儲存批註、頁級問題和整篇筆記。同一文獻庫檔案版本在不同專案和會話中共享這些筆記。透過全域搜尋的 **Library** 結果找到筆記，再選擇 **Show annotation source** 返回原文。步驟和匯出方法見 [PDF 批註與文件筆記](pdf-notes.md)。
