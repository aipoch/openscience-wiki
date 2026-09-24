---
title: "控制元件與鍵盤參考"
last_update:
  date: '2026-09-24'
---

# 控制元件與鍵盤參考 {/* #控件与键盘参考 */}

本索引用於找到控制元件的主要說明，將欄位限制和快捷鍵集中查詢，避免重複完整教程。標籤對應英文介面。

## 按任務查控制元件 {/* #按任务查控件 */}

| 需要做什麼 | 入口或控制元件 | 詳細行為 |
| --- | --- | --- |
| 建立或描述專案 | **New project**、專案選單 → **Project settings** | [專案欄位](../guides/projects.md) |
| 儲存私人閱讀備註 | 選區 → **For me → Bookmark**，輸入框 **Bookmarks** | [閱讀書籤](../guides/bookmarks.md) |
| 配置模型連線 | **Settings → Model** | [模型接入](../guides/providers.md) |
| 附加來源、傳送或排隊 | 輸入框 **+**、附件標籤、**Send**、佇列控制元件 | [對話與排隊請求](../guides/composer.md) |
| 檢查執行時和包 | **Settings → Runtimes**、直譯器和 Packages 控制元件 | [Python 和 R 執行時](../guides/runtimes.md) |
| 檢查計算和變數 | **View notebook**、**Variables**、產物 **Provenance** | [Notebook 與執行證據](../guides/notebook.md) |
| 授權或撤銷 | 權限卡、**Settings → Permissions** | [權限與審批](../guides/approval-modes.md) |
| 排查包連線 | **Settings → Network** | [域名、代理和映象](../guides/network.md) |
| 配置遠端計算 | **Settings → Compute → Add SSH host** | [SSH 和 Slurm 設定](../guides/remote-compute.md) |
| 核實研究輸出 | 生成檔案卡片、預覽、**Provenance** | [公開資料分析](../workflows/data-quality.md) |
| 查詢限制 | 檔案格式或配置欄位 | [檔案限制](formats.md)、[配置](configuration.md)、[包格式](packages.md) |

[完整控制元件索引](control-index.md)按應用頁面列出控制元件；本頁按常用任務和快捷鍵組織。兩者均指向相同的詳細教程。

## 快捷鍵參考 {/* #快捷键参考 */}

| 操作 | macOS | Windows/Linux | 條件與範圍 |
| --- | --- | --- | --- |
| 應用搜尋 | `⌘K` | `Ctrl+K` | Home／工作區搜尋；Settings 開啟時聚焦設定頂部搜尋 |
| 設定 | `⌘,` | `Ctrl+,` | 當前覆蓋層允許時開啟 Settings |
| 新會話 | `⌘N` | `Ctrl+N` | 工作區已有包含訊息的會話時可用；阻塞對話方塊開啟時忽略 |
| 切換側欄 | `⌘B` | `Ctrl+B` | 工作區中切換窄屏抽屜或桌面側欄 |
| 傳送輸入文字 | `Enter` | `Enter` | 傳送可用時；引用選擇器開啟時由其處理 Enter，輸入法組字時不提交 |
| 換行 | `Shift+Enter` | `Shift+Enter` | 輸入框文字 |
| 上／下一條提示草稿 | `↑` / `↓` | `↑` / `↓` | 游標在開頭且沒有選區時開始瀏覽；引用選擇器優先 |
| 撤銷草稿 | `⌘Z` | `Ctrl+Z` | 輸入框草稿歷史 |
| 重做草稿 | `⌘Shift+Z` | `Ctrl+Shift+Z` | 輸入框草稿歷史 |
| 關閉當前介面層 | `⌘W` | `Ctrl+W` | 桌面應用依次處理適用的臨時預覽、預覽標籤／面板、視窗；瀏覽器入口可能由瀏覽器處理 |
| 關閉覆蓋層 | `Esc` | `Esc` | 在支援的位置使用；儲存中或阻塞確認可能改變關閉行為 |

不要以為連續按關閉快捷鍵只會隱藏檔案。預覽關閉後，下一次可能關閉應用視窗。視窗關閉與程序退出是兩個不同的平臺相關行為。

關閉 Side Chat 標籤需要確認，確認後會停止並刪除該旁聊；檔案預覽的關閉不會刪除檔案。參閱 [Side Chat](../guides/delegation.md)。

## 輸入框引用觸發符 {/* #输入框引用触发符 */}

| 觸發符 | 選擇內容 | 傳送前檢查 |
| --- | --- | --- |
| `/` | 已啟用 Skill | 方法是否正確，依賴是否滿足 |
| `@` | 可用檔案／產物或文獻條目／範圍 | 來源及介面顯示的版本是否正確 |
| `#` | 會話引用 | 是否為預期對話 |

選擇建議項後會插入結構化引用。只輸入一個檔名或 Skill 名稱，不能證明相應引用已經附加，應檢查插入的標籤和請求。

## 搜尋範圍 {/* #搜索范围 */}

應用全域搜尋覆蓋專案、會話、訊息正文、上傳/生成檔案、文獻庫條目和集合，以及支援的上傳檔案中已建立索引的內容。生成檔案按名稱搜尋，未建立索引的內容不會被搜尋。選擇類別縮小結果範圍，核對結果上下文後再開啟。這不表示所有 PDF、圖片和其他二進位制檔案都已建立全文索引。完整操作見[導航與搜尋](../guides/navigation.md)。

Wiki 的 Search 是另一套搜尋，索引當前語言文件的標題、章節和正文。即使應用會話標題沒有“Inbox”，該詞仍可能命中文件中的一段正文。

技術參考：[應用快捷鍵](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [輸入框鍵盤處理](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [關閉行為](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [全域搜尋](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

設定面板或對話方塊內的區域性搜尋使用 macOS 的 **⌘⌥K**、Windows/Linux 的 **Ctrl+Alt+K**；**⌘K / Ctrl+K** 仍聚焦 Settings 頁頭搜尋。見[快捷鍵範圍](../guides/shortcuts.md#local-settings-search)。
