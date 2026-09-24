---
title: "鍵盤快捷鍵"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# 鍵盤快捷鍵 {/* #键盘快捷键 */}

鍵盤操作取決於焦點。同一個按鍵在輸入框中編輯文字，在列表中導航，在預覽標籤上可能關閉檢視。任務執行時先確認焦點與介面提示。

<PlatformGuide />

## 搜尋和導航 {/* #搜索和导航 */}

| 操作 | macOS | Windows/Linux | 焦點與結果 |
| --- | --- | --- | --- |
| 應用搜尋 | ⌘K | Ctrl+K | 搜尋專案、會話、訊息、檔案和文獻，詳見[搜尋範圍](navigation.md) |
| 搜尋設定 | ⌘K | Ctrl+K | 設定視窗開啟時聚焦頂部搜尋，參閱[設定中心總覽](../settings/overview.md) |
| 移動搜尋選擇 | 上/下 | 上/下 | 命令面板移動高亮 |
| 首個/末個結果 | Home / End | Home / End | 搜尋面板處理的結果導航 |
| 開啟選擇 | Enter | Enter | 檢視結果詳情，再開啟匹配的訊息、檔案或記錄 |
| 關閉搜尋/選單 | Esc | Esc | 關閉當前浮層；未儲存表單可能另有確認 |
| 移動焦點 | Tab / Shift+Tab | Tab / Shift+Tab | 前後移動到可用控制元件 |

按 ⌘K 或 Ctrl+K，輸入短語、標題或檔名。選擇結果，在詳情面板核對上下文，再開啟匹配內容。查詢檔案的來源時，使用來源訊息入口。篩選方法與搜尋範圍見[導航](navigation.md)；文件 Search 搜尋的是文件正文。

## 輸入請求與引用 {/* #输入请求与引用 */}

| 輸入 | 位置 | 繼續前檢查 |
| --- | --- | --- |
| `@` | Composer | 選擇實際檔案/產物/文獻建議，純文字不自動繫結檔案 |
| `/` | Composer | 選擇可用 Skill，出現條目不證明執行前提完備 |
| `#` | Composer | 選擇目標會話歷史引用 |
| 上/下 | 空 Composer 開頭 | 檢查恢復的歷史請求與附件再傳送 |
| ⌘Z / Ctrl+Z | 當前文字編輯器 | 撤銷該編輯器處理的草稿修改 |
| ⌘Shift+Z / Ctrl+Shift+Z | Composer | 支援時重做草稿修改 |
| 介面顯示的傳送快捷鍵 | Composer | 會提交請求；多行草稿不確定時直接點 Send |

<PlatformContent platform="windows">

在 Windows 桌面應用中，先點選 Composer 草稿區域，再用 **Ctrl+Z** 撤銷、**Ctrl+Shift+Z** 重做。確認文字變化後，再繼續輸入或傳送。使用 **Tab / Shift+Tab** 時，檢視當前控制元件的焦點邊框，下圖以附件按鈕為例。開啟面板或改變控制元件狀態後應重新確認焦點，不要按固定次數推算位置。

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="Windows 輸入框中的附件按鈕顯示鍵盤焦點邊框"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="開啟顯示附件按鈕焦點的完整 Windows 截圖"
/>

區域性圖展示附件按鈕的焦點邊框與提示文字。點選圖片可檢視完整截圖。

</PlatformContent>

普通文字撤銷不能恢復已刪除產物或撤銷已執行程式碼。出現的歸檔 Undo 提示屬於另一類操作。提示消失後，可在[歸檔](storage.md)中恢復保留工作。

## 預覽和佇列 {/* #预览和队列 */}

先聚焦預覽標籤，再用 **左/右** 切換、**Home/End** 跳到首末標籤。聚焦標籤時 **Delete/Backspace** 關閉標籤，不刪除原始檔；聚焦可編輯報告時它們會刪文字。不確定焦點時使用可見關閉按鈕。

佇列中聚焦排序手柄，用 **上/下** 將訊息移動一位，傳送前檢查順序。它與搜尋導航、輸入歷史是不同操作。佇列編輯、移除和延後傳送見[對話](composer.md)。

### 調整寬度並保留開啟的檔案 {/* #调整宽度并保留打开的文件 */}

拖動預覽旁的分隔線調整寬度。**Collapse preview panel** 隱藏面板，**Expand preview panel** 恢復原有標籤。摺疊與展開後，原有標籤保留。標籤取得焦點後，Home/End 跳轉首尾，右方向鍵切換，Delete 關閉當前標籤；檔案仍保留在 Files 中。佇列排序則需要先按空格提起，再用上下鍵移動，最後按空格放下。

聚焦 **Side Chat** 標籤時，關閉會出現確認；確認後停止該旁聊並刪除其儲存的對話。要保留它，選擇 **Cancel** 或收起預覽區，參閱 [Side Chat](delegation.md)。

## 按鍵無響應時 {/* #按键无响应时 */}

檢查焦點所屬欄位/對話方塊，關閉無關浮層，嘗試可見按鈕。部分 macOS 鍵盤的 Home/End 需要 Fn 組合。系統或瀏覽器可能先攔截快捷鍵，因此桌面端與瀏覽器入口未必完全一致。

按當前裝置顯示的按鍵提示操作。若系統攔截了快捷鍵，使用對應按鈕，並記錄系統版本與當時焦點。

原始碼：[全域搜尋](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx)、[預覽標籤](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx)、[佇列](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx)。

## 搜尋當前設定面板 {/* #local-settings-search */}

在 Settings 中，**⌘K**（macOS）或 **Ctrl+K**（Windows/Linux）聚焦頁頭的設定搜尋。**⌘⌥K** 或 **Ctrl+Alt+K** 聚焦當前面板或對話方塊內可用的區域性搜尋框。區域性快捷鍵需要當前存在可用搜尋框，不會開啟應用全域搜尋或 PDF 正文搜尋。
