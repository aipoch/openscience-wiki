---
title: "安排定時研究任務"
last_update:
  date: '2026-11-19'
---

# 安排定時研究任務 {/* #安排定时研究任务 */}

把需要在指定時間執行的工作交給定時任務，例如整理新加入的論文、彙總項目變化，或重新運行準備好的腳本。每次運行都有可以打開檢查的記錄。創建任務的電腦需要保持 Open-Science 運行。

## 準備一個能獨立完成的任務 {/* #prepare */}

先在項目中手動完成一次目標操作，確認輸入、模型連接、運行環境、結果保存位置和所需權限。定時任務不會自動修復缺失的憑據，也不會替你補齊所有依賴。運行時不會等待新的人工確認，尚需交互的操作可能使任務停止。爲每次運行創建新會話時，在 **Settings → Model** 中選好可用的 **Main** 模型，或設置項目的新會話默認配置。僅導入訂閱並不等於已經選好模型。使用模型的任務會消耗所選提供商的額度。

## 創建定時任務 {/* #create */}

1. 打開項目，進入 **Schedule**，選擇 **New task**。也可以通過 **Start from an example** 填入每日實驗總結或每週文獻回顧草稿。
2. 填寫容易識別的 **Name**，在 **Action** 中選擇 **Send a message** 或 **Run a script**。
3. 消息任務在 **Instructions** 中填寫要求。通過 **How to run** 選擇 **Continue an existing conversation** 或 **New conversation for each run**；繼續已有會話時，再選擇 **Target conversation**。
4. 腳本任務選擇已有會話，並在 **Language** 中選擇 Python、R 或 Shell，填寫完整的 **Script**。顯式讀取所需輸入，不要依賴舊內核中的臨時變量。
5. **Repeat** 可選 **Once**、**Fixed interval**、**Daily** 或 **Weekly**。按需設置開始時間、間隔或星期，再覈對 **Time zone** 和 **Next run**。
6. 檢查 **Execution permissions**，只授予任務所需權限。已有會話可沿用會話權限；定時任務的權限選擇不會提供賬戶憑據，也不會繞過 Strict 網絡規則。
7. 在 **Advanced** 中按需設置結束時間或最大運行次數；腳本還可檢查執行超時。選擇 **Create**，確認已保存的任務及下一次運行時間。

<p className="example-label"><strong>示例</strong> 準備每週文獻摘要</p>

選擇 **Send a message**，設置星期五和你所在時區的時間。在已經包含論文與筆記的項目中，按需調整以下要求：

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

這個任務回顧項目中已有的材料。如果要查找新發表的論文，應明確提出檢索要求，並先配置所需的[文獻 Connector](../tools/databases.md)。

## 運行一次教學總結 {/* #worked-example */}

<p className="example-label"><strong>案例演示</strong> 定時總結五個數值</p>

選擇 **Send a message**，將任務命名爲 **Teaching summary — one run**，輸入：

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

選擇 **New conversation for each run**、**Repeat → Once**，設置一個未來時間。權限選 **Existing permissions only**：這個任務不需要使用工具。點擊 **Create** 後保持應用運行。

![一次性消息任務：要求、新會話目標和下次運行時間](/img/open-science/v130/schedule-create.webp)

到時打開任務並檢查 **Results**。本例返回的均值和中位數均爲 **6**，並說明五個假設數值不能支持總體推斷。點擊 **Open session** 可打開對應會話，一次性任務轉爲 **Completed**。複用前應覈對結果本身。

![定時消息運行完成，顯示教學示例結果](/img/open-science/v130/schedule-result.webp)

## 檢查運行記錄與調整任務 {/* #run-history */}

打開任務的運行歷史，選擇一次運行，檢查狀態、目標會話和結果。**Run completed** 表示這次運行完成；把結果用於研究前，仍需檢查實際回答或腳本輸出。看到 **Failed**、**Interrupted** 或 **Skipped** 時，閱讀對應原因，不要假定已經產生結果。

通過 **Pause** 暫停後續運行，準備好後使用 **Resume** 恢復；調整時間後重新檢查下一次運行。**Close** 結束任務。已完成或關閉的任務可能爲只讀，此時需要另建任務。尤其在重新連接或重啓應用後，先檢查運行歷史，再決定是否手動重複執行。

執行記錄與環境恢復見 [Notebook](notebook.md)；訪問邊界見[審批模式](approval-modes.md)與[網絡規則](network.md)。
