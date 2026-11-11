---
title: "管理與分享 Specialists"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 管理與分享 Specialists {/* #管理与分享-specialists */}

使用包遷移配置好的角色，匯入後完成本地設定。Skills、Connector 引用與本機授權的可遷移範圍不同。

批次管理時，先在底部操作區核對選中數量，再執行操作。在同一位置閱讀完成或失敗反饋，並檢查條目的最終狀態；僅選中條目不會啟用、安裝或刪除它。

## 列表控制元件 {/* #列表控件 */}

| 控制元件 | 操作與預期結果 |
| --- | --- |
| Search specialists / 類別篩選 | 縮小已安裝列表，找不到已儲存角色時清除篩選 |
| Edit / 角色名稱 | 編輯已有角色；儲存後重新開啟檢查 |
| Change appearance | 修改圖示/顏色，不改指令 |
| Manage Tags | 新增整理標籤 |
| Toggle | 啟用或禁用，不刪除角色 |
| Actions → Duplicate | 開啟復制了指令和繫結的新草稿，名稱帶 Copy；仍須點選 Create specialist |
| Actions → Export ZIP | 選擇匯出內容並儲存可遷移包 |
| Actions → Delete | 永久刪除確認；單獨檢查可選的 Skill 刪除項 |

刪除角色前，檢查是否同時刪除其 Skills。其他角色仍在使用時保留共享 Skill；刪除副本不需要刪除原角色。

![刪除驗證副本並保留共享 Skill](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## 共享與匯入包 {/* #共享与导入包 */}

### 匯出所需 Skill 檔案 {/* #导出所需-skill-文件 */}

<p className="example-label"><strong>示例</strong> 分享包含 Skill 的複核角色</p>

1. 在角色上選擇 **Actions → Export ZIP**。
2. 在 **Choose Skills to include** 明確勾選 `rnaseq-count-qc`；Personal/Imported Skill 不一定預設包含。
3. 匯出後檢查歸檔內容。

![選擇隨 Specialist 包匯出的 Skill](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

實際<ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">含 Skill 的包</ExampleDownload>包含 `manifest.json`、`specialist.json`、`skills/rnaseq-count-qc/SKILL.md` 及參考結構。最小匯出可只有兩個 JSON。Connector ID 只是引用，憑據、本機信任和 Full access 不會作為現成授權遷移。

### 匯入、解決衝突、完成設定 {/* #导入解决冲突完成设置 */}

1. **Add specialist → Import ZIP → Choose ZIP**，一個包恰好包含一個 Specialist。**Download template** 可下載模板。
2. 檢查名稱、不可變 ID、版本、隨包 Skills、歸檔上限和診斷。
3. Skill 衝突需逐項選擇 **Keep installed Skill** 或 **Use package Skill**。後者替換所有當前使用者的 Skill 檔案，應閱讀 **Affected now**。
4. Specialist ID 已存在時點選 **Review overwrite**，比較版本，必要時先匯出當前包，再單獨確認 **Overwrite and continue**。
5. 匯入后角色處於 **disabled / SETUP INCOMPLETE**。在編輯器檢查指令與能力，選擇訪問範圍，再 **Save changes** 完成設定並啟用。
6. 重新開啟角色，執行小範圍任務驗收。

![回導時出現的真實 Skill 衝突](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Version unchanged** 仍可能伴隨 Skill 衝突。明確選擇 Skill 來源，匯入後重新開啟角色，核對能力繫結和訪問範圍。

| 預覽控制元件 | 檢查內容 |
| --- | --- |
| 展開隨包 Skill | 版本、處理方式、原因與檔案列表 |
| Archive limits | 本介面為壓縮 50 MB、展開 200 MB、2,000 檔案、單檔案 25 MB |
| Diagnostics | 阻斷錯誤、警告和資訊；警告可能需要明確選擇 |
| Copy report / Download JSON | 儲存診斷用於排錯，分享前檢查內容 |
| Cancel | 退出預覽，不安裝 |
| Next / Review overwrite | 必要選擇和校驗透過後繼續 |

**從瀏覽器匯入：** 透過 **Import ZIP → Choose ZIP** 選擇包，檢查內容、處理衝突並完成本地設定後再啟用。目標裝置仍需單獨配置憑據和信任。上傳失敗時保留錯誤，按[故障排查](../guides/troubleshooting.md)處理。

## 使用市場 {/* #使用市场 */}

開啟 **Marketplace**，搜尋角色，選擇 **View details**。檢查釋出者、來源、版本、許可證、下載大小、Skills 與 Connector 引用。**Refresh Marketplace** 重新整理目錄，**Manage Marketplace sources** 管理來源。All/Official/Community 表示來源型別，不表示執行環境已就緒。

![實際 Auto Research Specialist 包詳情](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

點選 **Install Specialist**，確認角色出現在 **Marketplace**，核對啟用狀態與繫結。目錄中的包數量僅描述該包，不是應用能力總數。安裝不會執行研究任務，也不會準備全部外部依賴；使用前完成所需配置。

![Auto Research 已安裝並啟用](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

歸檔損壞、預覽過期、繫結缺失或下載失敗時，保留診斷程式碼、應用/包版本與來源 URL，透過[故障排除](../guides/troubleshooting.md)反饋，不在 issue 中公開金鑰或研究資料。

實現依據: [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。

## 分享前驗證 {/* #分享前验证 */}

匯入或修改角色後，使用其已分配能力完成一個小任務，並開啟儲存結果核對。已有方法寫作、PCA 與矩陣案例見[使用已安裝 Specialist 擴充套件分析](../workflows/extend-analysis.md)。按所選路線檢查輸入要求和未解決限制。
