---
title: "製作與分享研究影片"
last_update:
  date: '2026-11-09'
---

# 製作與分享研究影片

把已完成的會話變成帶旁白的短片，用於組會演示或項目交接。Open-Science 根據會話的凍結記錄編排影片，並在本地生成英文旁白；影片編寫仍使用你配置的模型。影片解釋已有工作，不會重新執行分析，也不代表結論已經得到驗證。

## 準備會話與旁白 {/* #prepare-film */}

1. 使用**桌面應用**，打開準備展示的會話和分支，先等待當前回答結束。空會話或仍在等待回答的會話不能生成影片。
2. 覈對已記錄的輸入、結果和限制。開始前檢查準備分享的來源並處理敏感內容；生成後還要單獨檢查影片，再決定是否分發。
3. 在 **Settings → Model** 確認兼容的 Main 模型及有效憑據。現有 Codex 訂閱可以繼續搭配 Codex 運行時使用。
4. 打開 **Local capabilities → Research narration → Install**，等待顯示 **Installed**。這些資源提供英文語音，後續影片可重複使用。如果尚未安裝，影片對話框也會提供 **Install and generate**。

安裝後的語音引擎在本地運行，但影片編寫會調用所選模型提供方。生成期間保持電腦運行，併爲媒體文件留出足夠存儲空間。

## 生成並播放 {/* #generate-film */}

1. 打開 **Session actions → Generate research film**。回放中也可以從 **More actions** 找到該操作。
2. 閱讀準備提示。模型、憑據或旁白資源缺失時，先解決對應要求再重試。旁白已就緒時，點擊該操作會開始生成。
3. 查看編寫及媒體生成階段。可以關閉對話框讓任務繼續，再通過 **View generation progress** 返回。**Cancel** 停止影片任務，不會停止或刪除原會話。
4. 出現 **Research film ready** 後，檢查標題和時長，選擇 **Play research film**。
5. 完整播放一次，對照源會話檢查數值、單位、解釋、畫面、旁白與限制說明，尤其確認假設案例和初步結果仍被準確標明。

<p className="example-label"><strong>案例演示</strong> 解釋五個數的教學示例</p>

用 Codex 新建會話併發送：

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

已完成的回答給出均值和中位數均爲 **6**，並說明沒有定義真實總體，也沒有抽樣設計。先覈對這兩點，再選擇 **Generate research film**。這是教學示例，不是實證研究。

![根據已完成的教學會話生成研究影片](/img/open-science/v120/film-progress.webp)

![已生成的英文旁白影片與播放入口](/img/open-science/v120/film-ready.webp)

## 導出檢查後的影片 {/* #export-film */}

在預覽區打開生成的播放器，通過 **More actions → Download** 保存可在瀏覽器中播放的便攜 HTML 播放器。需要視頻文件時，在渲染預覽中選擇 **Export MP4**；如提示缺少導出組件，選擇 **Install and export**，再通過桌面保存對話框選擇目的地。旁白資源與 MP4 導出組件是兩次獨立下載。

等待導出結束，然後在 Open-Science 之外重新打開保存的文件，檢查畫面、聲音、字幕和結尾。取消保存對話框不會產生導出文件。如果接收者需要檢查底層證據，保留原會話或 [`.science` 研究包](research-packages.md)；單獨的 MP4 用於演示。

![研究影片播放器與 MP4 導出控件](/img/open-science/v120/film-player.webp)

## 重新生成或恢復 {/* #film-recovery */}

- 提示選擇模型或檢查憑據時，先在 **Settings → Model** 修復對應要求，再回到會話。
- 旁白下載失敗時，選擇 **Retry**，等待 **Installed** 後再生成。
- 會話改變或影片需要再嘗試時，使用 **View research film → Generate again** 並確認。重新生成可能需要數分鐘，也會再次使用模型額度。
- 只有準備刪除當前分支的本地影片文件時，才選擇影片對話框裏的 **More actions → Delete research film**。確認框會說明原會話和另行保存的副本將保留。

查看已記錄的步驟見[會話回放](session-replay.md)，單獨執行驗證見[可復現性](reproducibility.md)。
