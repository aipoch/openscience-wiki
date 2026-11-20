---
title: "搜尋網頁與閱讀來源"
last_update:
  date: '2026-11-20'
---

# 搜尋網頁與閱讀來源 {/* #搜索网页与阅读来源 */}

使用內建 **Open-Science Agent**，在會話中查詢公開網頁並閱讀正文，適合尋找報告規範、軟體文件和研究動態。需要論文題錄或全文時，同時使用[科學資料庫](databases.md)和[文獻庫](../guides/library.md)。

## 從問題開始 {/* #start */}

1. 在 **Settings → Agent** 選擇 **Open-Science Agent**，再在 **Settings → Model** 連線支援的 Main 模型；可以使用 Codex 訂閱。
2. 開啟專案會話，說明要查詢什麼、優先採用哪些來源，以及是否有時間範圍要求。讓 Agent 先閱讀相關網頁，再回答問題。
3. 如果出現授權卡片，檢查搜尋詞、時間範圍、結果數量和域名過濾條件，再批准本次請求。網頁閱讀的授權對應具體目標 URL。
4. 展開工具活動，檢查返回來源。使用回答中的結論前，沿引用回到原始證據核對。

可以這樣提問：

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

內建搜尋將搜尋詞傳送到 **Exa**，無需 Exa 賬戶；閱讀網頁會連線該網站。操作仍遵循當前權限模式，取消不能撤回已經傳送的請求。不要把保密研究資料放進公開搜尋詞。

## 閱讀證據，不只看搜尋摘要 {/* #read-sources */}

搜尋結果是摘錄。讓 Agent 閱讀選定網頁，並引用支撐回答的內容。網頁閱讀支援公開 HTML、Markdown 和純文字，不會登入網站、使用瀏覽器 Cookie 或執行網頁 JavaScript。論文和附件應使用 PDF、文獻庫流程，不要把 HTML 介紹頁當成論文全文。

如果返回文字被截斷，讓 Agent 繼續閱讀已儲存的網頁內容，再作判斷。儲存的來源反映抓取當時的內容；需要最新表述時，要求重新抓取。保留的來源可以隨會話分支和符合匯出條件的研究包傳遞，但這不等於存檔整個網站。

## 無法閱讀來源時 {/* #recover */}

- 遇到限流，按提示等待後再試，不要反覆傳送同一個失敗請求。
- 必需的過濾條件不受支援時，保留要求並選擇其他來源或檢索方式，不要默默擴大範圍。
- 遇到登入牆、頁面攔截或不支援的檔案型別，自己開啟官方來源，並在適當時提供有權使用、可讀取的檔案。不要把未讀頁面寫成已核實證據。

需要查詢和篩選論文時，繼續參閱[圍繞問題檢索文獻](../workflows/focused-literature-search.md)。
