---
title: "回放與討論歷史會話"
last_update:
  date: '2026-10-08'
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

## 針對步驟提問 {/* #discuss-replay */}

1. 暫停在相關步驟，選擇 **Ask about this step**；需要討論整體研究時，使用頂部的 **Ask about this research**。
2. 在 **Ask in a conversation** 中選擇一個可寫會話，或選擇 **New conversation**。該操作把上下文加入草稿，不會自動傳送問題。
3. 核對 **Discuss** 附件中的會話和步驟標籤，填寫問題，選擇已連線的模型，再點 **Send**。本例使用 **Codex subscription**。
4. 遇到工具審批時，先檢查申請的訪問內容，再允許任務需要的操作。回答完成後，對照儲存的證據及來源上下文。

```text
From the recorded TP53 pathway analysis, explain why the missing direct
TP53–CDKN1A edge does not show that regulation is absent. Identify the
saved evidence and separate the recorded result from a new biological
claim. Keep the response in English.
```

回答定位到 `tp53_mdm2_cdkn1a_readable_interactions.tsv`，區分扁平化匯出表中的記錄與生物學結論，並指出來源會話、分支和步驟。採用解釋前再次閱讀來源；附帶記錄不代表模型的每項判斷都正確。

![Codex 完成討論，右側保留 TP53 原始分析回放](/img/open-science/v0350/replay-answer.webp)

## 證據無法開啟時 {/* #replay-evidence */}

原執行環境不可用時，記錄中的工具呼叫仍可能顯示。可以閱讀保留的程式碼與輸出，不要把環境提示當成一次新的執行結果。

檔案顯示 **Preview unavailable** 或 **The recorded evidence is unavailable** 時，檢查原會話中的檔案卡片及所選版本。原入口也無法開啟時，使用另行儲存的原檔案，或向作者取得完整研究包。檔名和播放完成的時間線不能證明檔案內容可讀取，只討論能夠實際檢查的證據。

需要重新計算時，[Fork 會話](sessions.md#fork-session)，準備所需檔案與環境後執行。比較新執行和已儲存產物時，應使用[可復現性驗證](reproducibility.md)，不能依據回放中的 **Completed** 判斷。
