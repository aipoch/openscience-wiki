---
sidebar_position: 1
title: "完整頁面與控制元件索引"
description: "按頁面查詢 Open-Science 的按鈕、輸入、開關和結果。"
last_update:
  date: '2026-09-24'
---

# 完整頁面與控制元件索引 {/* #完整页面与控件索引 */}

本頁把實際介面入口按頁面壓縮成可檢索清單。狀態相關控制元件只在條件滿足時出現；Disabled 表示缺少前置條件，不是實現缺失。


<span id="当前验证覆盖" />

## 查詢詳細操作 {/* #查找详细操作 */}

本頁用於定位控制元件。前置條件、操作步驟、預期結果和已知問題以對應教程為準。設定面板見[設定總覽](../settings/overview.md)，常用任務見[控制元件與快捷鍵](controls.md)，報錯處理見[故障排查](../guides/troubleshooting.md)。

## Onboarding {/* #onboarding */}

| 頁面（按嚮導順序） | 控制元件 | 結果或前置條件 |
| --- | --- | --- |
| Environment | Check again、Continue、檢查狀態行 | 重新檢查主機條件，透過後繼續 |
| Data location | Browse…、Use default location instead、Back、Continue | 選擇位置；自定義位置需確認 Keep default 或 Restart |
| Agent runtime | 框架卡片、Install、Re-detect、Back、Continue | 安裝或選擇就緒的活動執行時 |
| Model provider | Provider type、認證方式、條件欄位、Test & continue | 必填校驗與連線測試；成功後進入下一步 |
| Notebook runtime | 直譯器、環境設定、Packages、Back、Finish | 可選設定；已啟動的環境準備必須完成或取消後才能結束 |

完整實操見[首次設定](../guides/onboarding.md)和[提供商配置](../guides/providers.md)。

## Home 與專案 {/* #home-与项目 */}

| 頁面 | 控制元件 | 結果 |
| --- | --- | --- |
| Home header | GitHub、Search、Library、Theme、Messages、Model settings | 外鏈、全域搜尋、文獻資料庫、主題、通知、開啟 Model |
| Home body | New project、專案卡、Recent session | 新建或開啟專案/session |
| Theme menu | System、Light、Dark | 設定外觀並同步 General |
| Search | Search input、類別、Advanced filters、結果詳情、Esc | 按所需範圍[查詢訊息、檔案與文獻](../guides/navigation.md) |
| Messages | 通知項、已讀操作、Close | 跳轉來源和管理未讀 |
| Create project | Name、Description、Agent Context、Cancel、Create project | 建立專案；Name 必填 |
| Project actions | Edit/Archive/Delete 等狀態相關項 | 修改專案後設資料、歸檔或確認刪除 |

## Workspace 左欄與佈局 {/* #workspace-左栏与布局 */}

| 控制元件 | 結果 |
| --- | --- |
| All projects | 返回 Home |
| Project name | 專案入口/選單 |
| Collapse sidebar | 收起/展開左欄 |
| New | 新 session |
| Customize | 啟動 Skill/Specialist 定製對話 |
| Files | 切換右側專案檔案面板 |
| Library | 開啟與專案關聯的資料庫文獻 |
| Session row | 切換 session；狀態顯示 Idle/Running/Permission 等 |
| Session actions | Pin/Unpin、Rename、View notebook、Archive、Delete |
| Messages、Settings、GitHub | 通知、設定、官方倉庫 |
| Resize left/right、Collapse preview | 拖動面板或收起預覽 |

## Conversation 與 Composer {/* #conversation-与-composer */}

| 區域 | 控制元件/輸入 | 結果 |
| --- | --- | --- |
| Message | Copy、Edit | 複製；編輯建立 revision |
| Revision | Previous、`n/N`、Next | 瀏覽訊息修訂 |
| Assistant result | Usage、Elapsed、generated file | 檢查用量/耗時，開啟輸出 |
| Activity | 摺疊標題、Details、Copy、Report error | 展開工具/程式碼/diff/search/錯誤 |
| Input | Ask anything、`↑↓`、`/`、`@`、`#`、`⌘K/Ctrl+K` | 輸入、歷史、Skill、檔案/session 引用、搜尋 |
| `+` | Attach files、Your files、Review、Context | 暫存新/已有檔案、複核、上下文詳情 |
| Attachment chip | Preview、Remove | 傳送前檢查或取消引用 |
| Agent controls | Specialist、Delegation、Auto-review、Permission mode | 改變後續 request 策略 |
| Model | Active model、Reasoning effort | 改變後續 request 的模型/強度 |
| Queue/Send | Queue edit/delete/reorder、Send now、Send、Plan first、Side chat、Branch、Stop | 暫存或傳送 follow-up、選擇模式、停止執行 |
| Scroll to end | 回到最新訊息 |

## 權限、計劃與結構化追問 {/* #权限计划与结构化追问 */}

| 表面 | 控制元件 | 結果 |
| --- | --- | --- |
| Permission | Impact info、Permission info、可展開 Skill 文件、Allow once、Deny | 檢查並批准/拒絕一次 |
| Scope confirmation | Cancel、Confirm project/global | 儲存更寬 grant；寬 scope 需二次確認 |
| Plan | Approve/Run、Feedback 輸入、Cancel | 接受計劃、要求修改或取消 |
| Elicitation | 結構化輸入/選項、Submit、Cancel | 回答 agent 追問 |
| Subagent permission | 身份/待處理計數、Allow/Deny | 單獨審批 subagent 請求 |

## Files 與 Preview {/* #files-与-preview */}

| 控制元件 | 結果 |
| --- | --- |
| Filter、Search | 過濾 All/Artifacts 和檔名 |
| Grid/List | 改變檔案佈局 |
| Expand/Exit full screen | 檔案庫全屏/返回分欄 |
| Category accordion | 展開 uploads 或某 session 的 generated files |
| File card/body | 模態 preview |
| Download | 儲存原檔案/版本 |
| Open in split view | 新增右側 preview tab |
| Preview tab、Close tab | 切換/關閉預覽 |
| Full screen preview | 放大當前檔案 |
| File actions → Provenance | 開啟 artifact 證據；普通 upload 無此項 |
| File actions → Edit/Compare | 釋出新文字版本或與前一版本比較 |
| Previous/vN/Next | 切 artifact version |
| PDB Cartoon/Stick/Sphere/Surface/Line | 改變三維表示方式 |
| PDF/Office/Image controls | 翻頁/搜尋、縮放、選擇 PDF evidence、縮圖或下載 |
| Preview content context menu | 按來源提供 Copy path、Download、Save as artifact、Provenance 或返回上下文 |

## 文獻資料庫 {/* #文献资料库 */}

| 區域 | 控制元件 | 結果 |
| --- | --- | --- |
| 側欄 | Inbox、All references、Duplicates、Trash、Projects、Collections、Citation settings | 選擇 catalog scope 或管理引用樣式 |
| Add | Add reference、Import PDF、Import references | 建立後設資料或預覽 PDF/BibTeX/RIS/NBIB 匯入 |
| Catalog | Search、Sort、Filters、Customize columns、page size | 篩選並排列文獻 |
| Selection rail | 集合/專案目標、全文查詢、Trash、export | 對已選文獻執行有邊界的批次操作 |
| 文獻詳情 | 後設資料 edit/complete、識別符號、集合、專案、附件、citation、full text | 檢查或更新單條文獻 |
| Inbox | Accept、Dismiss、batch selection、Undo | 文獻正式入庫前複核智慧體候選項 |
| Duplicates | Select groups、Compare、欄位選擇、Merge | 複核併合並記錄，同時保留關聯 |
| Background tasks | Pause、Resume、Review、Cancel | 控制批次後設資料/全文任務 |

## Notebook 與 Provenance {/* #notebook-与-provenance */}

| 頁面 | 控制元件 | 結果 |
| --- | --- | --- |
| Notebook | Agent filter、Python/R/Bash tabs、Variables | 按 agent/語言檢視 run，或檢查 live kernel namespace |
| Notebook cell | Copy、Show/Hide output | 複製輸入、展開輸出 |
| Notebook footer | Download `.ipynb`、Close | 可轉換時下載；關閉對話方塊 |
| Provenance | version arrows、Close Provenance | 版本導航/返回 preview |
| Provenance tabs | Code、Execution Log、Messages、Environment、Review | 切換證據型別 |
| Code | Generate script、Download、Copy | 生成派生指令碼或儲存 producer block |

## 書籤與旁聊 {/* #书签与旁聊 */}

| 入口 | 控制元件與行為 |
| --- | --- |
| 私人閱讀書籤 | 選區 → For me → Bookmark；輸入框 Bookmarks 開啟列表，可編輯備註、返回來源或刪除書籤。[詳細說明](../guides/bookmarks.md) |
| Side Chat 標籤 | 獨立標籤與追問草稿、批註轉移、取消生成，以及刪除旁聊的關閉確認。[詳細說明](../guides/delegation.md) |

## Settings 全域 {/* #settings-全局 */}

**Search settings** 可以跨四組面板查詢設定。`Back`、`Forward`、麵包屑、`Maximize/Restore`、`Close settings`、移動端導航及錯誤 `Dismiss` 適用於設定框架。分組與搜尋快捷鍵見[設定中心總覽](../settings/overview.md)。

### Skills {/* #skills */}

Conversation Skill imports、source filter、Search、Add skill、分類摺疊、Skill detail、Enable toggle、Create/Upload/Import、Preview、Edit、Export、Delete、Cancel/Save。

### Memory、Tags、Credentials 與 Usage {/* #memorytagscredentials-与-usage */}

Memory category/entry 的 Create、Edit、Delete、Clear；Tags 的 create/edit/delete、assignment、Favorites、filter 與 reorder；Credentials 的 create/recover/remove、health、usage 與 Connector binding；Usage 的 period、metric、heatmap、daily chart、Turns/Calls 與 grouping。

### Connectors {/* #connectors */}

Filter/Search、Add/Import、Enable、Detail、Test/Reconnect、Edit、Export、Remove；Add form 包含 Type、Display name、ID、Description、Command、Arguments、Environment variables、URL、Transport、Authentication、OAuth scopes、Authorization server URL、Client metadata URL、Headers、Trust、Cancel、Add/Save。

### Specialists {/* #specialists */}

Category filter、Search、Enable、Detail、Actions、Create/Import；Editor 包含 Icon、Color、Name、Description、Instructions、Full access、Capability type、Skill/Connector searches、selected capabilities、Cancel、Save。Import 包含 Select ZIP、Preview、Diagnostics、Cancel、Import。

### Compute {/* #compute */}

Add host、Host card/enable、Probe/Retry、Detail/Edit/Remove、Resources、Direct SSH/Slurm execution mode、Details document、Scratch root Edit/Input/Save/Cancel、Concurrent job limit Edit/Input/Save/Cancel；執行審批含 Deny、once、session、project、global。

### Network {/* #network */}

Check again；Proxy System/Manual/Direct；Notebook domain allowlist；Package mirror Configure/Edit；Conda channel、pip index、CA bundle；View mirrors、Cancel、Save。

### Model {/* #model */}

Active model、Reasoning radios、Subagent/Reviewer/Vision/Session-details model policy；Provider Test/Edit/Delete/Add；Provider 表單所有 Onboarding Model 欄位以及 Cancel/Save。

### Agent {/* #agent */}

OpenCode/Claude/Codex/CodeBuddy framework card、Switch、Install source、Install/Cancel/Retry、Install log、Repair、Sign in/auth、Import config/home、Uninstall confirmation。

### Permissions {/* #permissions */}

Default profile；scope filter；grant scope link、connector hint、Revoke 與確認；不完整 store 警告/重新整理。

### Runtimes {/* #runtimes */}

Python/R；環境 Enable、Add interpreter、Download/setup、Repair、Allow package install、Packages、Filter、Add/Install/Remove package、Disable/Uninstall 與確認。

### Storage {/* #storage */}

Application storage Reveal/Repair；Data location Change、Path、Browse、檢查、Migrate/Adopt/Cancel；遷移進度 Cancel/Retry/Restart/Discard；Disk usage 分類展開。

### General {/* #general */}

Task notifications、Theme radios、App icon radios、close behavior、GitHub token Open/Input/Save/Clear、About/Check updates/安裝更新。

### Remote control {/* #remote-control */}

Start/Stop/Refresh、Copy/Open URL、QR；Remote.It setup/retry/disconnect；Trusted browser Revoke；Pair request Reject/Allow once/Always trust。

### Archived {/* #archived */}

Project Manage、Restore project、Delete project；Session Restore/Delete；刪除確認 Cancel/Confirm。


## 文獻篩選與資源訪問 {/* #screening-and-access */}

| 區域 | 控制元件 | 指南 |
| --- | --- | --- |
| 文獻庫 | Smart collection、Scope、Inclusion criteria、Exclusion criteria、Use available full text、Live rule preview、Update automatically | [智慧集合](../guides/library.md#smart-collections) |
| 智慧集合 | Trial run、判斷檢視、Evaluation details、Include、Exclude、Use model decision、匯出納入文獻 | [篩選與複核文獻](../workflows/screen-literature.md) |
| 分類模型 | 獨立的 Smart collections 與 Automatic capability selection 繫結；Check model | [模型繫結](../guides/models.md#smart-collection-model) |
| Skills / Connectors | Manage access、Main Agent、Specialist associations、只讀角色繫結 | [資源訪問](../guides/connectors.md#resource-access) |
| 會話 | Export diagnostics、所選來源、Export、Show in folder | [本地診斷匯出](../guides/troubleshooting.md#session-diagnostics) |
