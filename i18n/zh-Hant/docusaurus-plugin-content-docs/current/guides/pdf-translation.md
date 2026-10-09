---
title: "PDF 全文翻譯"
last_update:
  date: '2026-10-09'
---

# PDF 全文翻譯 {/* #pdf-全文翻译 */}

在保留原文的同時，用另一種語言閱讀論文。**Full-text translation** 會準備全文、逐段儲存翻譯進度，並將已儲存的譯本關聯到受管理的 PDF。它不會覆蓋原始 PDF，也不負責驗證論文結論。

## 準備論文與模型 {/* #prepare-translation */}

1. 取得完整 PDF，從[文獻庫](library.md)、Reading、Inbox、上傳附件或已儲存檔案中開啟。只有後設資料或摘要的文獻記錄不能代替全文 PDF。
2. 按需放大預覽，在 PDF 工具欄選擇 **Full-text translation**。
3. 點選 **Prepare full text**，等到 **Full text prepared** 再開始翻譯。若文字缺失或 PDF 是掃描件，應先檢視原始頁面；準備完成不代表所有圖中文字和表格均已提取。
4. 選擇 **Target language**，再選擇 **Translation method** 和 **Model**。以選擇器中可用的模型為準。

| 方式 | 需要的配置 |
| --- | --- |
| **Agent** | 使用可用的 Agent 模型，或受支援的 **Main model**。v0.36.0 中 Codex 訂閱模型不能執行此 PDF 翻譯操作；可單獨選擇相容的翻譯模型，無需替換會話主模型 |
| **Direct API** | 配置可用的 API 模型。訂閱登入不能作為 Direct API 憑據，見[提供商設定](providers.md) |
| **Local model**（提供此選項時） | 按介面控制元件安裝模型，等待就緒。本地翻譯一次處理一個段落 |

Agent 和 Direct API 會把文件文字與術語表傳送給選定模型。翻譯受限材料前，應確認使用的服務。截圖展示全文準備和模型控制元件；其中選擇的 Codex 訂閱使 **Translate document** 按鈕不可用。

![全文準備完成後的目標語言、翻譯方式與模型設定](/img/open-science/v0360/translation-settings.webp)

圖中論文為 Lang 等的 [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3)，採用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 許可。

## 翻譯與繼續 {/* #translate-resume */}

1. 需要統一專業術語時，開啟 **Translation glossary**，用 **Add term** 新增 **Source term** 和 **Preferred translation**，開始前核對詞條。
2. 首次使用可保留 **Advanced → Concurrent translations** 的預設值。提高併發可能觸發提供商限流。
3. 點選 **Translate document**，觀察已翻譯段落數；部分完成不能視為整篇完成。
4. 要中斷時，點選 **Cancel**，已完成段落會保留。用 **Continue translation** 繼續已儲存的工作；發生錯誤且介面提供 **Retry** 時可重試。使用 **Skip and continue** 前先看段落錯誤，它會留下需要檢查的空缺。
5. 重新開啟同一受管理 PDF，在 **Saved translations** 中選取譯本，用 **Saved translation parameters** 核對語言與模型。修改這些設定應選擇 **New translation**，不要在一次重試中混用設定。

應用核驗為相同 PDF 內容的副本，可在 Literature、Reading、Inbox 和 Workspace 之間共享已儲存的譯本。僅檔名或 DOI 相同不足以證明內容一致。這種本地共享不會把譯文同步到另一臺電腦。

## 對照與匯出 {/* #compare-export */}

當相關檢視可用時，用 **Original**、**Translation** 和 **Compare** 檢查原文與譯文。逐項核對術語、否定詞、數值、單位和圖表引用。檢視 **Translation issues** 以及保留原文的段落；段落翻譯完成不等於每段都完整排入了頁面。

選擇 **Export translated PDF**，另存一份檔案，再用 PDF 閱讀器開啟。檢查頁數，並抽查文字較多和圖表較多的頁面。未翻譯的內容保留原語言；某些段落會在 PDF 中保留原文，其譯文仍可在側欄閱讀。引用與解釋研究結果時應保留原文供核對。

| 介面提示 | 下一步 |
| --- | --- |
| **Prepare full text before translating.** | 完成全文準備，檢查是否找到了可翻譯段落 |
| **This subscription model cannot run PDF translation. Select another model.** | 選擇受支援的翻譯模型；改變目標語言不能解決模型相容性 |
| 提供商限流或暫時不可用 | 等待後使用同一份儲存設定重試，避免為同一次中斷重複建立譯本 |
| 無法儲存進度 | 重新開啟 PDF，載入最新儲存結果後再繼續 |

需要記錄閱讀問題時，使用 [PDF 批註與文件筆記](pdf-notes.md)。翻譯與批註是兩個獨立工具。
