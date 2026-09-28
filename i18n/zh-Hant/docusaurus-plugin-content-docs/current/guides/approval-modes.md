---
title: "權限與審批"
last_update:
  date: '2026-09-28'
---

# 權限與審批 {/* #权限与审批 */}

透過 **Agent controls** 選擇當前會話如何請求審批。透過 **Settings → Permissions** 設定新會話預設值、檢查記住的訪問權限。這兩項操作分別生效：修改預設值不會重置已有會話，也不會撤銷其授權。

<span id="安全判断顺序" />

<span id="权限请求" />

<span id="plan-first" />

<span id="活动行" />

## 選擇會話模式 {/* #选择会话模式 */}

| 模式 | 適用情況 | 預期行為 |
| --- | --- | --- |
| **Ask for approval** | 希望檢查請求執行的操作 | 對沒有適用授權或例外的動作顯示權限卡 |
| **Auto-approve edits** | 允許工作區內的常規修改 | 支援的編輯自動透過；命令、網路和 MCP 操作仍可能需要審批 |
| **Full access** | 已決定允許代理無需提示執行操作 | 命令、檔案修改、網路請求可以不經手動權限卡；其他訪問及服務條件仍然存在 |

開啟輸入框旁的 **Agent controls**，閱讀當前模式和框架相容性說明。Full access 控制元件有自己的確認流程。**Auto-review** 是另一個結果稽核選項，不表示自動批准編輯。

![實際英文權限模式選擇器](/img/open-science/walkthrough-2026-09-08/57-permission-modes.webp)

檢查當前 Agent 顯示的實際模式，不同框架支援的審批行為可能不同。選擇前閱讀當前模式的說明。

## 閱讀權限卡 {/* #阅读权限卡 */}

批准前核對操作、選定環境與程式碼。資料檢查應讀取指定輸入並寫入所需結果；安裝缺失依賴屬於另一項操作，需要單獨檢查其目的和影響。

![公開 GSE60450 案例中的 Python 執行授權](/img/open-science/guides-walkthrough/25-python-permission.webp)

| 控制元件或資訊 | 檢查內容或操作 |
| --- | --- |
| 工具標題和摘要 | 確認實際操作、目標和來源 |
| 可展開的程式碼或引數 | 檢查路徑、執行時、包名或服務輸入 |
| **Authorization scope** 箭頭 | 在當前請求支援的範圍中選擇 |
| **Allow once** | 僅放行本次呼叫 |
| **Allow for this conversation** | 記住當前會話的匹配呼叫，重啟後仍保留 |
| **Allow for this project** | 為整個專案儲存匹配授權，並確認較寬範圍 |
| **Allow globally** | 跨專案儲存匹配授權，並確認較寬範圍 |
| **Deny** | 拒絕當前操作；選擇替代方案前檢查返回結果 |
| 提供方附加選項（如有） | 閱讀實際標籤和作用；不同請求的選項可能不同 |

請求支援時，主 Allow 按鈕通常使用會話範圍，請先看完整標籤。命令字首授權還應檢查介面顯示的字首，後續以字首開頭的命令也可能匹配。授權某個執行時不等於授權無關的外部服務。

### 記住網頁讀取授權 {/* #记住网页读取授权 */}

遇到支援該範圍的 **Read web pages** 請求時，可選擇 **Allow for this conversation**，讓同一會話後續的網頁讀取複用授權。這項授權可覆蓋其他網站，並非只允許第一個 URL；**Allow once** 僅批准當前呼叫。可在 **Remembered permissions** 中檢視或撤銷，它不會向 Notebook 網路白名單新增域名，也不代表允許上傳。

### 記住網頁搜尋授權 {/* #remember-web-search */}

從 v0.30.2 起，受支援的 Claude Agent 原生 **Search the web** 請求也可選擇 **Allow for this conversation**。同一會話後續符合條件的搜尋可以複用授權；**Allow once** 只批准當前請求。在 **Remembered permissions** 中檢視或撤銷 **Search the web**。搜尋與 **Read web pages** 是兩項獨立權限；此原生搜尋選項並非所有框架或 Connector 都支援，應以實際提供的範圍為準。

## 管理記住的權限 {/* #管理记住的权限 */}

開啟 **Settings → Permissions → Remembered permissions**，按 **All**、**Global**、**Project** 或 **Session** 篩選。每行顯示能力、範圍、限定條件和更寬範圍覆蓋。會話連結開啟對應會話；Connector 策略提示進入相關配置。

| 操作 | 結果 |
| --- | --- |
| 單行 **Revoke** | 立即刪除該條記住的授權，注意檢視 Undo 提示 |
| 分組 **Revoke all** | 請求撤銷該組授權；使用前先確認顯示的範圍完整 |
| **Restore defaults** | 補回缺少的基線全域授權，保留其他授權 |
| **Defaults restored** | 基線授權已齊全，恢復按鈕禁用 |
| 範圍篩選 | 只改變顯示行，不會增加或撤銷授權 |

點選 **Revoke** 撤銷目標授權。誤操作時，在 **Undo** 仍可用期間撤回。**Restore defaults** 只補回缺少的預設授權，不會恢復所有曾被移除的授權。

### 判斷已儲存授權的實際範圍 {/* #判断已保存授权的实际范围 */}

撤銷授權前，核對 Connector/工具、**Global / Project / Session** 範圍及 **Any call / Specific input / Command group** 限定。命令組還可顯示批准摘要和日期。

**Blocked in Connectors; this permission is currently inactive** 表示已存授權不能覆蓋 Connector 的禁止策略。**Allowed by Connector policy even without this permission** 表示僅撤銷該授權不會取消策略層面的允許。可開啟對應 Connector 檢查規則。誤撤銷時，在 **Undo** 仍可用期間撤回，再檢查恢復狀態。

### 撤銷當前範圍的一組權限 {/* #撤销当前范围的一组权限 */}

1. 篩選目標範圍，例如 **Session**。
2. 點選該組的 **Revoke all**。
3. 確認該組已清空，其他範圍的授權仍保留。
4. 下次執行相同操作時，閱讀新出現的審批請求再決定是否繼續。

撤銷影響後續審批，不會逆轉已完成的編輯或網路請求；更寬範圍的授權仍可能允許該操作。

![撤銷會話分組後重新出現執行授權](/img/open-science/local-todo-batch/40-permission-request-renewed.webp)

權限清單不完整時，先等待載入或重試失敗請求，再執行分組撤銷；完成後重新檢查所選範圍。

## 排查不符合預期的行為 {/* #排查不符合预期的行为 */}

| 故障 | 檢查與處理 |
| --- | --- |
| Ask 模式沒有彈卡 | 檢查記住的授權、工具策略和應用自身的特定例外。Ask 並不要求每次讀取、儲存產物或互動提問都彈卡。[權限參考](../reference/permissions.md)列出了基線授權，其中包括自定義能力寫入 |
| 撤銷後同一操作仍能執行 | 查詢更寬的專案／全域授權或允許策略。刪除一條會話授權不會刪除其全域覆蓋 |
| 已經允許，操作仍失敗 | 批准只允許嘗試。缺包、檔案不可訪問、憑據無效或網路目標被拒絕時，應先處理報錯指出的原因，再重試。DNS 和包下載問題見[網路設定](network.md) |
| 缺少某種範圍 | 卡片只顯示當前請求和專案／會話上下文支援的範圍。不要僅為了彌補較窄範圍不可用而改用更寬授權 |

實現依據：[授權顯示與撤銷](https://github.com/aipoch/open-science/commit/469b593b)。

## Auto 模式下的文獻庫操作 {/* #library-auto */}

使用 **Auto-approve edits** 時，應用內建的一組文獻庫操作可自動透過本次代理批准，包括查詢和閱讀文獻、儲存到 Inbox、獲取 PDF、格式化引文與準備引用文件。這樣可以減少日常整理文獻時的重複提示。

該規則只適用於應用識別的內建文獻工具，不表示所有 MCP、命令或網路操作都自動允許；工具本身的檔案、網路和資源規則仍然適用。它也不會建立一條永久授權。需要逐項檢查代理請求時，選擇 **Ask for approval**；文獻進入 Inbox 後仍應稽核再接受。
