---
title: "Token 用量與活動"
last_update:
  date: '2026-10-08'
---

# Token 用量與活動 {/* #token-用量与活动 */}

在 **Settings → Usage** 檢視已報告的 Token 和本地活動。單次回答的 **Token usage** 與會話 **Context window** 提供更小範圍的視角。累計呼叫用量與當前上下文佔用不是同一個指標。

按顯示的時間範圍和指標解讀圖表。Token 數量描述呼叫活動，訂閱額度或賬單應到提供方查詢。

## 篩選頂部彙總 {/* #筛选顶部汇总 */}

1. 開啟 Usage，選擇 Today、This week、Last 30 days 或 All time。
2. 檢查更新時間；任務完成後頁面過期可用 Refresh。
3. 對照四類 Token 和 New/Total 活動計數。
4. 比較圖表前先看圖表自身的時間範圍。

![Today 彙總與獨立的每日圖表](/img/open-science/guides-walkthrough/13-usage-today.webp)

| 欄位 | 解釋 |
| --- | --- |
| Total tokens | 所選時期報告的累計用量 |
| Input tokens | 後端報告的輸入部分，不是按本地文字長度推算 |
| Cache tokens | 後端歸入快取的用量 |
| Cache share | 相關輸入/快取量的比例；橫線表示不可用，不表示免費 |
| Output tokens | 報告的輸出部分 |
| New sessions/projects/runs/artifacts | 所選期間新增的物件 |
| Total sessions/projects/runs/artifacts | 總體計數，不必等於所選期間新增數 |

當前執行尚未記錄用量時，Today 的 Token 為零，但固定 30 天圖仍有昨天的活動，這是週期不同。上傳輸入與生成產物也不同，上傳原始檔不會自動增加生成產物數。

## 每日活動和組成 {/* #每日活动和组成 */}

**Daily activity metric** 可選 Total tokens、Input tokens、Output tokens、Cache tokens、New sessions、New projects、New artifacts 和 Runs。選擇指標後檢視日期單元；顏色越深表示在當前刻度內數值越大。

**Daily token usage** 按輸入、快取、輸出堆疊。兩個圖都固定標註 **last 30 days**，頂部彙總的 Today 不會把圖表縮成一天。比較趨勢前需對齊週期。

## 缺失和異常數值 {/* #缺失和异常数值 */}

| 現象 | 檢查方向 |
| --- | --- |
| 完成的會話沒有用量 | 部分 Provider 和舊記錄不報告。重新整理後檢查回答自身用量 |
| 累計很高但上下文百分比低 | 累計用量跨多次呼叫，上下文是某個時點的佔用 |
| 新增計數變化但 Token 不變 | 建立專案或管理會話可以不呼叫模型 |
| 數值與賬單不同 | 此頁不是 Provider 賬單或訂閱限額面板 |
| 快取比例高 | 只能說明報告的組成，不能據此直接推算節省金額 |

缺失用量不會被自動補算。上下文組成和壓縮見[記憶與上下文](./memory.md)。

原始碼：[Usage 頁面](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/TokenUsagePanel.tsx)。

## 連續檢視相鄰日期 {/* #inspect-daily-usage */}

在 **Daily token usage** 圖表上移動指標，連續檢視不同日期的輸入、快取和輸出用量。鍵盤操作時，用 **Tab / Shift+Tab** 聚焦不同日期，用 **Escape** 關閉詳情。核對顯示的日期和分項；此圖仍覆蓋最近 30 天，不會補出提供商未報告的用量。
