---
title: "回放與討論歷史會話"
last_update:
  date: '2026-11-09'
---

# 回放與討論歷史會話 {/* #回放与讨论历史会话 */}

會話回放按順序展示已儲存的訊息、工具步驟和檔案版本，方便理解分析過程、定位證據並提出具體問題。播放不會重新執行程式碼，也不證明分析可以復現；重新執行與結果比較見[可復現性驗證](reproducibility.md)。

## 開啟回放 {/* #open-replay */}

1. 開啟側欄中該會話的操作選單，選擇 **View replay**。匯入的 `.science` 會話也可從 **Imported research history** 面板選擇 **View replay**。
2. 核對會話標題和分支。出現 **Replay branch** 時，選擇要檢查的分支。
3. 使用 **Enter full screen** 放大；**Exit full screen** 返回工作區。關閉預覽不會刪除會話。

匯入的研究仍然只讀，可以檢視和討論。需要繼續執行時，選擇 **Fork to continue** 建立可寫分支。研究包匯入步驟見[匯入並檢查研究包](research-packages.md#import-and-inspect-a-package)。

## 按步驟檢視記錄 {/* #playback-controls */}

| 控制元件 | 操作 |
| --- | --- |
| Play replay / Pause replay | 播放或暫停已儲存的步驟序列 |
| Previous step / Next step | 移動到相鄰的記錄步驟 |
| Replay progress | 跳轉到回放中的其他位置 |
| Playback speed | 改變展示速度，不會加速計算 |
| Browse steps | 按標籤選擇訊息、工具步驟或檔案版本事件 |
| Notebook / View files | 檢視該位置可用的 Notebook 記錄或檔案列表 |
| Watch again | 播放到 Completed 後從頭檢視 |

展開工具卡片讀取保留的輸入和輸出，使用結果前核對檔名及版本。再次進入同一回放時會保留播放位置。舊會話可能使用歸檔記錄重建時間線，展示時長不能作為原始計算耗時的基準。

<p className="example-label"><strong>案例演示</strong> 討論 TP53 通路分析中的證據</p>

本例開啟已記錄的 [Pathway Commons 分析](../workflows/inspect-pathway.md)，其中選取 Reactome 的 **Transcriptional Regulation by TP53** 通路，匯出 3,318 條相互作用記錄和 387 個節點。這是該次儲存結果的數量，不代表之後每次查詢都會得到相同數量。

開啟 **Browse steps**，定位網路匯出、原始響應、研究筆記和 TP53–MDM2–CDKN1A 小型相互作用表。本例共有 12 個記錄步驟。選擇相互作用表的檔案版本步驟，並閱讀前面的網路範圍說明。

![TP53 實際回放中的步驟列表、檔案版本與播放控制元件](/img/open-science/v0350/replay-step-list.webp)

## 針對某一步提問 {/* #discuss-replay */}

1. 暫停在相關步驟，選擇 **Ask about this step**；針對整體研究的問題可使用 **Ask about this research**。
2. 檢查討論草稿及其 **Discuss** 附件。會話、分支和步驟標籤標明正在討論哪份證據。選中 Notebook 運行時，即使部分單元格不在當前視口內，也會攜帶已記錄的上下文。
3. 輸入明確的問題，選擇已連接的模型並 **Send**。打開討論或添加上下文本身不會自動發送問題。
4. 導入研究的討論會成爲關聯的子會話。回到父研究記錄覈對原始步驟；討論不會讓只讀歷史變爲可編輯狀態。需要繼續執行時使用 **Fork to continue**。
5. 檢查工具審批，並將回答與記錄的證據比較。來源鏈接正確不代表模型解釋一定正確。

對於上面的 TP53 案例，可以提問：

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

案例回答指出 `tp53_mdm2_cdkn1a_readable_interactions.tsv`，並區分扁平化導出的內容與生物學結論。下圖保留了這次已記錄的討論，當前關聯討論的控件可能有所不同。

![Codex 完成的討論及旁邊的 TP53 研究回放](/img/open-science/v0350/replay-answer.webp)

如需把已完成的會話做成帶旁白的演示，參閱[研究影片](research-films.md)。回放、討論和影片都會使用已有證據，但都不會重新執行分析。

## 證據無法開啟時 {/* #replay-evidence */}

原執行環境不可用時，記錄中的工具呼叫仍可能顯示。可以閱讀保留的程式碼與輸出，不要把環境提示當成一次新的執行結果。

檔案顯示 **Preview unavailable** 或 **The recorded evidence is unavailable** 時，檢查原會話中的檔案卡片及所選版本。原入口也無法開啟時，使用另行儲存的原檔案，或向作者取得完整研究包。檔名和播放完成的時間線不能證明檔案內容可讀取，只討論能夠實際檢查的證據。

需要重新計算時，[Fork 會話](sessions.md#fork-session)，準備所需檔案與環境後執行。比較新執行和已儲存產物時，應使用[可復現性驗證](reproducibility.md)，不能依據回放中的 **Completed** 判斷。
