---
title: "管理與驗證 Skills"
last_update:
  date: '2026-10-27'
---

# 管理與驗證 Skills {/* #管理与验证-skills */}

從本地檔案或 GitHub 匯入方法，匯出副本並維護已安裝的 Skill。需要保留當前方法版本時，先匯出副本。

批次管理時，先在底部操作區核對選中數量，再執行操作。在同一位置閱讀完成或失敗反饋，並檢查條目的最終狀態；僅選中條目不會啟用、安裝或刪除它。

## 從市場安裝 {/* #marketplace */}

瀏覽目錄、安裝和更新市場方法，見 [Skill 市場](marketplace.md)。本頁介紹本地與 GitHub 匯入、匯出和已安裝 Skill 的維護。

## 本地匯出與匯入 {/* #本地导出与导入 */}

<p className="example-label"><strong>示例</strong> 匯出並重新匯入 RNA-seq Skill</p>

1. 在 **Settings → Skills** 找到 `rnaseq-count-qc`，選擇 **Actions → Export** 儲存 ZIP。
2. 點選 **Add skill → Upload skills → Upload skill files**，選擇剛匯出的包。
3. 在 **Confirm import** 檢查檔名與診斷；候選項預設未勾選。
4. 開啟 **Preview rnaseq-count-qc**，閱讀 SKILL.md 與檔案列表。實際匯出保留了 `references/sample-metric-schema.md`。
5. 關閉預覽，勾選候選，點選 **Import selected (1)**。
6. 搜尋匯入結果，檢查最終名稱和來源。

![匯入前檢查完整包](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

本例中，回導時原 Personal 包已存在，預覽顯示 **Name exists**，匯入產生了獨立的 **Imported `rnaseq-count-qc-2`**。原包與 Specialist 繫結仍保留。不能認為每次匯入都在更新原包，應檢查來源與更新/替換診斷。

![匯入副本與原 Personal Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| 控制元件 | 作用 |
| --- | --- |
| Select all / Invert / 單項勾選 | 選擇待匯入包，一個歸檔可以包含多個 Skill |
| Preview / Close preview | 安裝前檢查指令與檔案 |
| Name exists / 診斷 | 提示名稱或內容問題；匯入後核對最終名稱 |
| Choose different files | 重新選擇檔案 |
| Import selected | 執行匯入並統計成功、未改變與失敗項 |

Markdown 檔案需要 YAML `name` 和 `description`，ZIP/`.skill` 需要包含 SKILL.md。上傳不會自動下載指令中連結的支援檔案。格式、後設資料、大小和不安全路徑檢查失敗時，應修復包。

## 匯入本機已安裝的 Skill {/* #导入本机已安装的-skill */}

<p className="example-label"><strong>示例</strong> 匯入本機 peer-review 包</p>

**Add skill → Import installed skills** 掃描 `~/.agents/skills` 和 `~/.codex/skills`。候選列表可能預設全部選中。先取消 **Select all installed skills**，再選擇具體方法；使用 **Invert** 前應先核對當前選擇。

1. 開啟 **Preview peer-review**，檢視來源目錄、說明及引用檔案。
2. 點選 **Close preview**，只選 `peer-review`，再點選 **Import selected (1)**。
3. 等待 **Imported 1 skill**，候選隨後標為 **Imported**，不能再次按同一來源勾選匯入。
4. 返回 Skills 搜尋 `peer-review`，檢查 Imported 行。來源目錄保留，Open-Science 使用匯入副本。
5. 本地安裝目錄變化後點選 **Rescan**，重新核對來源、選擇和狀態。

![預覽本機安裝的 peer-review 包](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![在 Skills 列表確認匯入結果](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

匯入後在 Skill 詳情中檢查模板與引用檔案。使用來自其他助手的方法前，確認它依賴的工具和執行能力在當前會話可用。

## 從 GitHub 匯入和更新 {/* #从-github-导入和更新 */}

<p className="example-label"><strong>示例</strong> 匯入並更新 ESM-2 Skill</p>

1. 選擇 **Add skill → Import from GitHub**，輸入關鍵詞、`owner/repo`、`owner/repo@ref` 或 GitHub URL，點選 **Find skills**。復現已釋出包時使用固定 ref。
2. 核對倉庫和候選數量。掃描結果預設勾選全部候選，應先取消 **Select all**，再只選需要的方法；這與預設未勾選的 ZIP 確認頁不同。
3. 開啟 **Preview**，檢查解析後的 commit、目錄、說明和檔案。倉庫掃描也可能發現內部 Skill 目錄，候選數量不等於應用內建 Skill 數量。
4. 關閉預覽，勾選目標，點選 **Import selected (1)**，等待結果並檢查 **Imported skills** 中的最終名稱。
5. 返回 Skills，搜尋該名稱，核對來源和可用狀態後再使用。

![匯入前檢查 GitHub Skill 和固定來源](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

從產品倉庫匯入 `fair-esm2` 時，因內建名稱已存在，應用建立 **`fair-esm2-2`**，原內建包保留。匯入說明不會安裝模型權重，也不能證明推理已經透過。

### 應用上游修訂 {/* #应用上游修订 */}

使用目標新 ref 再次掃描同一倉庫，已有候選可以顯示 **Update available**。僅選擇該候選匯入，然後檢查已有匯入行及預覽。例如，更新已有 ESM-2 副本後，再掃描相同 ref 應顯示 **Imported**。核對更新後正文與所選 ref 的內容；匯入器會重寫 frontmatter 及避讓重名後的名稱，因此整個檔案不一定與原 SKILL.md 位元組一致。

![已有匯入副本發現上游更新](/img/open-science/local-todo-batch/16-github-update-available.webp)

### 處理 GitHub 限流 {/* #处理-github-限流 */}

遇到 **GitHub request was rate-limited**，開啟 **Manage GitHub credential**，輸入可用 token 並 **Verify and save**。顯示 **Token verified and saved** 後重試掃描。**Cancel** 不儲存退出；截圖和問題報告中不要包含 token。

## 啟用、禁用與刪除 {/* #启用禁用与删除 */}

進入 **Manage**，按來源、狀態篩選並搜尋具體方法，先勾選再執行。**Selected (n)** 檢視選擇範圍，**Clear selection** 清空選擇；改變篩選後仍需檢查完整選擇集。

![批次管理中已禁用的匯入副本](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

實操完成了副本禁用、重新啟用和刪除，原 Skill 保留。

| 操作 | 預期結果 |
| --- | --- |
| Enable selected | 恢復可用性，檢查行狀態 |
| Disable selected | 保留可由使用者控制的包，取消其後續 Main Agent 請求可用性；應用必需 Skills 不能禁用 |
| Delete selected | 顯示準確名稱及可刪除檢查結果 |
| Delete n Skills | 確認後移除本地包；沒有 Skill 回收站恢復流程 |
| Cancel | 保留安裝內容 |

Featured 和被 Specialist 引用的包可能受到刪除保護。按需移除過時繫結，或禁用可由使用者控制的包。應用必需 Skills 保持啟用，見[啟用規則](overview.md#为什么有些开关不能关闭)。刪除後檢查篩選列表中已無目標包。

## 更新與排錯 {/* #更新与排错 */}

| 現象 | 檢查及處理 |
| --- | --- |
| 匯入後找不到 | 清除來源、Agent、標籤篩選，搜尋帶字尾的最終名稱 |
| 支援檔案缺失 | 檢查包列表並重新匯出；單獨 Markdown 不會自動包含其他檔案 |
| 編輯版本衝突 | 重新讀取最新版本，對比後再儲存 |
| 指令能載入但函式不可用 | 確認包是否提供核心函式；普通指令不是 Notebook 函式 |
| 缺少包或執行環境 | 參見[科學工具](../tools/scientific.md)，使用選定執行環境的包管理 |
| GitHub 或認證錯誤 | 保留 HTTP 狀態與脫敏 URL，參見[故障排除](../guides/troubleshooting.md) |

實現依據: [SkillUploadView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [SkillBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [SkillImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx)。

## 導入和編輯 Skill {/* #import-batches */}

大量已安裝 Skill 會分批導入。等待最終結果並檢查導入列表後，再決定是否重試。外部 Skill 的名稱若使用保留前綴，會獲得安全的本地名稱；以本地目錄顯示的名稱爲準。編輯正文並保存後，檢查單獨編輯的名稱與說明是否仍正確。當前消息附帶的圖片也可參與 Skill 選擇；使用前確認所選 Skill 的範圍。

## 保存 GitHub 倉庫以便再次使用 {/* #saved-repositories */}

通過 **Import from GitHub → Find skills** 掃描倉庫後，選擇 **Save repository**。下次在 **Saved repositories** 中選擇該倉庫再次掃描，再預覽並導入所需 Skill。保存時指定的 ref 會保留，默認分支則可能變化。保存倉庫不會安裝或自動更新 Skill，移除書籤也不會刪除已安裝的 Skill。
