---
title: "檔案、產物與版本"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# 檔案、產物與版本 {/* #文件产物与版本 */}

區分原始檔案、上傳副本與生成產物。本頁說明歸屬、查詢與儲存修訂；檢視控制元件見[預覽](previews.md)，檔案打包匯出見[會話](sessions.md)。

<PlatformGuide />

## 上傳輸入或引用目錄 {/* #上传输入或引用目录 */}

使用 **Composer → + → Attach files** 選擇 `GSE60450_Lactation-GenewiseCounts.txt`，等待附件出現，預覽後傳送。顯示名保持可識別，託管路徑可能增加校驗和字尾。移除附件只取消當前草稿的引用，不刪除電腦原檔案。**Your files** 用於選擇已有專案檔案，避免再次上傳。

多份輸入需要保留在本地目錄時，可使用 **Files → Filter project files → This computer → Add folder…**。進入具體子目錄，選擇 **Read-only** 或 **Read & write**。點選 **Grant this folder** 前閱讀停止核心的確認提示：改變 Notebook 檔案權限需要停止現有核心並重建其訪問範圍。Cancel 不應用草稿權限。詳細說明見[專案與源目錄](projects.md)。

| 本地檔案控制元件 | 操作及結果 |
| --- | --- |
| Directory path | 輸入可訪問目錄並導航 |
| Go to parent directory | 在訪問規則允許範圍內進入上級 |
| Go to | 選擇儲存的位置 |
| Refresh directory | 重新整理目錄列表 |
| Pin this folder | 增刪位置書籤，不刪除目錄 |
| 檔案行 | 開啟預覽 |
| Reload file | 外部檔案更改後重新讀取 |
| More actions → Copy path | 複製外部路徑 |
| More actions → Save as artifact | 儲存託管專案副本，等待 Saved |
| Download | 透過系統儲存流程另存副本 |

只讀授權保護外部目錄，同時仍允許在專案工作區生成輸出。使用上方本地檔案控制元件重新整理來源並儲存託管副本。

<PlatformContent platform="windows">

新增已有資料夾時，開啟 **Files**，展開 **Artifacts** 下拉選單，選擇 **This computer → Add folder…**。在應用自己的 **Grant folder access** 對話方塊中選擇具體子資料夾和 **Read-only**，再點選 **Grant this folder**。使用者主目錄根位置可能不可選，請進入研究資料所在的子資料夾。閱讀可能出現的 Notebook 核心影響確認；返回 Files 後，核對當前目錄及檔案列表。

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="Windows 已授權資料夾，列出公開指令碼與 CSV" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="開啟完整 Windows 截圖" />

在 Windows 的 **Attach files** 視窗中，可以選擇含中文或空格路徑下的檔案，也可以在“檔名”框輸入完整檔案路徑後開啟。返回應用後先確認附件名稱，再開啟預覽，核對表格行列和內容。不想附加時，點選 **Cancel**，並確認草稿沒有新增附件。

</PlatformContent>

## 查詢輸入和生成結果 {/* #查找输入和生成结果 */}

1. 開啟 **Files → Filter project files → All artifacts**。
2. 區分 **Your uploads** 和按會話分組的 **Generated files**。
3. 用 **List view** 檢視名稱和大小，或用 **Grid view** 檢視卡片。
4. 在 **Search project files** 輸入檔名片段，例如 `rnaseq`，核對匹配檔案及所屬會話。
5. 清除搜尋可顯示被篩選隱藏的檔案。本例共有六份託管檔案：一份上傳、兩份計劃、三份研究輸出。
6. **Expand files** 展開檔案庫，**Exit full screen files** 返回工作區。

<PlatformContent platform="macos">

![真實 RNA-seq 結果的檔案篩選](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
數量對應當前篩選。無結果不代表檔案被刪除。**No more** 表示該組已載入完成，點選組標題可收起。檔案主體開啟獨立預覽；**Open … in split view beside the session** 將檔案放在對話旁。下載針對相應檢視選擇的檔案或版本。

### 返回本地資料夾並儲存閱讀副本 {/* #返回本地文件夹并保存阅读副本 */}

1. 開啟 **Files → Filter project files → This computer**，在 **Directory path** 輸入允許訪問的源目錄。
2. 選擇 **Pin this folder**。轉到其他位置後，透過 **Go to → Pinned** 返回。**Remove bookmark** 或固定行的 **Unpin** 只移除快捷入口。
3. 新增檔案後選擇 **Refresh directory**。已開啟的檔案若在應用外改變，用 **Reload file** 重新讀取內容。
4. 在本地預覽中選擇 **More actions → Save as artifact**，等待 **Saved**。
5. 返回 **All artifacts → Your uploads**，重開儲存的副本；它顯示託管檔案版本控制元件，標題下不再是本地源路徑。

重新開啟託管副本，與本地來源內容比較。之後修改原始檔不會自動更新已儲存副本；編輯託管內容發生衝突時，按下方步驟處理。

## 編輯報告並對比版本 {/* #编辑报告并对比版本 */}

<p className="example-label"><strong>案例演示</strong> 新增閱讀筆記並比較報告修訂</p>

開啟支援編輯的託管文字或 Markdown 檔案。下面以向已有報告新增閱讀筆記為例：儲存會建立新修訂，不會改動原始輸入或重新執行分析。

1. 開啟託管 Markdown，點選 **Edit rnaseq-qc-report.md**。
2. 編輯源文字，保留原有方法與溯源說明。
3. 點選 **Save changes**，標題欄從 **v1** 變為 **v2**。
4. 點選 **Compare … with its source version** 檢視新增文字。
5. **Stop comparing** 返回渲染後的報告。
6. **Previous file version** 檢視 v1，**Next file version** 返回 v2。

<PlatformContent platform="macos">

![報告 v2 與原始版本的差異](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| 控制元件或狀態 | 處理 |
| --- | --- |
| Save changes 禁用 | 先作有效修改；未改變的內容無需儲存 |
| Cancel | 放棄當前編輯草稿 |
| 版本箭頭禁用 | 該方向沒有更早或更新版本 |
| Compare 禁用 | 沒有可比較的來源版本或格式不支援 |
| 儲存衝突 | 重新載入當前版本，再協調修改，不要假定已覆蓋另一位寫入者 |
| 沒有 Edit | 當前格式或來源不可編輯，二進位制檔案和 CSV 表格不會因此變成表格編輯器 |

受支援的託管文字、程式碼和 Markdown 可提供編輯。CSV 表格預覽為只讀，影象等二進位制格式沒有文字編輯功能。手動儲存產生檔案版本，不會重新執行 Notebook，也不會生成模型審查。引用執行歷史前見 [Notebook 證據](notebook.md)。

### 處理儲存衝突並保留雙方修改 {/* #处理保存冲突并保留双方修改 */}

編輯器開啟期間，其他寫入方儲存了同一報告，**Save changes** 可能提示 **This file has a newer version. View latest version**。這表示舊草稿沒有覆蓋新版本。

1. 先另行保留尚未儲存的文字。
2. 選擇 **View latest version**。如果出現 **Discard unsaved changes?**，尚未保留草稿時先取消。
3. 開啟最新已儲存報告，檢查另一方新增的內容。
4. 選擇 **Edit**，在最新正文上補回自己的修改，再儲存。
5. 重開結果，並用版本箭頭檢查先前修訂。

<PlatformContent platform="macos">

![另一版本已儲存，當前草稿被攔截](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
儲存後確認最新修訂同時包含另一位寫入者的更改和你保留的草稿。透過版本控制元件仍可檢視先前檔案修訂；檔案修訂與對話訊息修訂是不同記錄。

需要重跑捕獲的結果並比較輸出時，使用[復現檢查](reproducibility.md)。需要一起傳遞會話分支、檔案和證據時，使用 [.science 研究包](research-packages.md)。

## 匯出並保留研究記錄 {/* #导出并保留研究记录 */}

檔案 **Download** 下載單份結果。會話 **Download all artifacts** 將所選檔案儲存到資料夾；專案 **Download artifacts…** 建立 ZIP，並區分 `generated` 與 `uploads` 路徑。確認範圍、檔名與儲存位置。會話 **Export** 匯出對話，與產物下載分開。下載副本不包含完整執行狀態、憑據或所有外部輸入。

複用時一起儲存原矩陣、CSV、圖和方法報告。[資料工作流](../workflows/data-quality.md)提供實測檔案及精確驗收值。下載失敗先檢查目標目錄權限和空間，再重試；不完整的外部副本不改變託管版本。

### 開啟下載的報告 {/* #打开下载的报告 */}

選擇所需報告版本並點選 **Download**。在儲存位置用文字編輯器開啟 `.md` 檔案，核對標題、段落和資料；閱讀排版效果時可回到應用內預覽。

<PlatformContent platform="windows">

在記事本中開啟下載的 `.md` 檔案。記事本顯示 Markdown 源文字，其中的 `##` 和反引號屬於排版標記；核對標題、段落和表格內容即可。需要閱讀排版後的效果時，回到應用內預覽。

</PlatformContent>

### 複製和匯出時保留正確檔案 {/* #复制和导出时保留正确文件 */}

複製含託管引用的訊息後，貼上到目標對話，傳送前檢查生成的每個附件/引用。檔名可讀還不夠，應開啟引用，確認當前所屬會話和版本。

匯出所選產物或檔案包前，確認完整選擇範圍，等待結果並重新開啟下載檔案。編輯、重新整理或匯出失敗時，保留草稿和源版本，核對實際儲存結果；重新整理失敗不證明此前儲存失敗。

會話 **Download all artifacts** 將所選檔案儲存到資料夾；專案 **Download artifacts…** 建立包含 `generated` 與 `uploads` 路徑的 ZIP。對話 PDF 則屬於文字記錄匯出，具體步驟及已重開的結果見[會話](sessions.md)。

原始碼：[專案檔案庫](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx)、[本地檔案操作](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx)。

實現參考：[複製引用](https://github.com/aipoch/open-science/commit/f0c0e081)、[完整匯出選擇](https://github.com/aipoch/open-science/commit/f0468f35)、[預覽編輯](https://github.com/aipoch/open-science/commit/8763f9aa)。

## 將已授權的本地文件保存爲產物 {/* #import-local-artifact */}

在 **This computer** 中打開已授權文件夾內的文件，在預覽中選擇 **… → Save as artifact**，等待完成後打開會話中生成的產物，檢查內容。Open-Science 保存的是應用管理的不可變副本；之後編輯本地原文件不會更新此副本。僅預覽文件夾內的文件並不等於導入。
