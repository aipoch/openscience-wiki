---
title: "故障排查與常見問題"
last_update:
  date: '2026-09-24'
---

# 故障排查與常見問題 {/* #故障排查与常见问题 */}

先查詢下面的報錯文字，按對應操作檢查，再重試原步驟。問題仍存在時，可[提交缺陷或向社群求助](#提交问题或向社区求助)，附上報錯和觸發步驟。

<span id="agent-无法启动或会话停住" />

<span id="provider-测试失败" />

<span id="pythonr-或包安装失败" />

<span id="文件不能预览" />

<span id="权限一直等待" />

<span id="remote-control-无法访问" />

<span id="storage-迁移异常" />

<span id="收集问题证据" />

## 按失敗位置排查 {/* #按失败位置排查 */}

| 症狀 | 先檢查 | 操作與成功條件 |
| --- | --- | --- |
| 開啟後工作區為空 | 資料位置、配置檔、Archived | 返回正確根目錄/專案，不要立即新建替代專案 |
| 沒有可用模型 | 登入、Agent、相容性 | 按[接入](providers.md)配置並完成實際小請求 |
| 顯示已連線但任務失敗 | Provider 報錯和選中模型 | 檢查認證、賬號權限與識別符號；介面出現不等於可呼叫 |
| 任務似乎停住 | 計劃、權限、互動卡片 | 回答當前請求，授權前閱讀範圍 |
| 佇列修正沒執行 | Not saved / Sending / 延後狀態 | 見[輸入](composer.md)，確認成為使用者訊息 |
| Module not found | 直譯器和包清單 | 按[執行環境](runtimes.md)在相同環境驗證匯入 |
| 安裝已授權仍失敗 | 首條網路/代理/證書錯誤 | 按[網路](network.md)修復後重試原操作 |
| Notebook 無法讀檔案 | 託管路徑、附件、授權、版本引用 | 使用指定可訪問輸入，不擴大無關目錄權限 |
| 儲存服務拒絕工作路徑 | 是否登記為可釋出檔案 | 使用支援的產物儲存方式並重新開啟 |
| 表格數值不一致 | 校驗和、分隔符、後設資料列、分母 | 從同一輸入重算，不先改預期值 |
| 檔案可見但無法預覽 | 格式/大小、版本、渲染錯誤 | 按[預覽](previews.md)下載以區分顯示與檔案缺失 |
| 文獻看似消失 | 檢視、篩選、Inbox、Trash | 清除篩選，在對應生命週期恢復 |
| 找到全文但新增失敗 | 下載結果和 PDF 校驗 | 使用另一合法來源/本地 PDF 並實際開啟 |
| Side Chat 禁用 | 框架/Provider 提示 | 見[委派](delegation.md)，檢查當前框架顯示的相容性限制 |
| 遠端任務不可執行 | 主機、認證、排程器和環境 | 見[遠端計算](remote-compute.md) |

## HTTP 錯誤：400、403、429 與 5xx {/* #http-错误400403429-与-5xx */}

HTTP 狀態碼來自模型服務、Connector 服務、本地瀏覽器服務或代理的響應。**先確認是誰返回了錯誤，再修改設定。** 同時複製狀態碼和響應中的詳細說明：單看 `403`，無法判斷是 API 權限、代理策略還是資源訪問限制。

### 請求、認證與訪問權限 {/* #请求认证与访问权限 */}

| 狀態碼 | 含義 | 在 Open-Science 中檢查什麼 |
| --- | --- | --- |
| **400 Bad Request** | 服務拒絕當前請求 | 閱讀報錯指出的欄位或引數，檢查服務端點、模型識別符號及支援的請求功能。工具呼叫則檢查輸入格式；涉及附件或可選功能時，先用小型純文字請求定位 |
| **401 Unauthorized** | 缺少有效認證 | 確認失敗服務使用哪個賬號或憑證。重新連線對應訂閱/OAuth 賬號，或在[模型接入](providers.md)、[Connector 憑證](connectors.md)中修正 API key |
| **403 Forbidden** | 服務拒絕訪問 | 檢查模型/資源權限、組織/專案授權，以及服務提示的訪問限制。若報錯為 **HTTP CONNECT 403**，先檢查[代理或網路策略](network.md)，不要直接判定模型金鑰錯誤 |
| **404 Not Found** | 該地址下的端點或資源不可用 | 檢查 Base URL、API 路徑及模型/資源 ID。網站地址不一定是 API 端點；服務也可能用 404 隱藏無權訪問的資源 |
| **405 Method Not Allowed** | 端點不支援當前請求方法 | 對照服務文件檢查 API 協議和 Connector transport。穩定復現的整合不匹配應反饋，不要隨意猜測請求方法 |
| **407 Proxy Authentication Required** | 代理要求認證 | 與網路管理員核對代理配置，模型 API 憑證不能替代代理認證 |
| **413 Content Too Large** | 請求體超過限制 | 減少附件或批次輸入大小，或使用受支援的較小輸入；確認限制來自哪個服務 |
| **422 Unprocessable Content** | 服務無法處理當前內容 | 閱讀欄位校驗訊息，修正工具或模型請求的型別、必填欄位及不支援的值 |

**400 與 403 的處理重點不同：** 400 明確指出不支援某個引數時，應修正請求功能；403 指出某模型受限時，應檢查該模型的訪問權限。沒有明確原因時，保留響應和 request ID 求助，不要僅憑數字判斷原因。

### 額度與臨時服務故障 {/* #额度与临时服务故障 */}

| 狀態碼 | 含義 | 接下來怎麼做 |
| --- | --- | --- |
| **402 Payment Required** | 服務商自定義的支付/訪問處理，HTTP 未規定統一的計費含義 | 閱讀該服務的錯誤詳情與賬號頁面，不要僅憑數字認定必須充值 |
| **429 Too Many Requests** | 請求限流；部分模型 API 也用它表示額度耗盡 | 頻率限制時，減少併發，按 **Retry-After** 或文件中的重置時間等待；額度錯誤則檢查對應服務的可用額度/計費。訂閱限制與 API 餘額分別管理 |
| **500 Internal Server Error** | 返回響應的服務內部失敗 | 檢視服務狀態；適合重試的操作可稍後用小請求驗證，持續失敗時攜帶 request ID 反饋 |
| **502 Bad Gateway** | 閘道器收到無效的上游響應 | 確認對應閘道器/服務商，檢查狀態與上游配置；自定義閘道器持續失敗時聯絡其管理員 |
| **503 Service Unavailable** | 服務暫時不可用 | 有 Retry-After 時按提示等待。本地端點則檢查模型服務是否啟動並就緒 |
| **504 Gateway Timeout** | 閘道器等待上游超時 | 重試前確認操作是否已經開始或完成；分析、任務提交、產物寫入應先檢查原結果，避免重複執行 |

部分內建 Connector 請求會對 429、500、502、503、504 進行有限自動重試。這不適用於全部模型或框架，也不表示可以反覆手動提交；仍以對應服務的響應為準。

### 沒有 HTTP 響應，或問題持續存在 {/* #没有-http-响应或问题持续存在 */}

`ECONNREFUSED`、`ENOTFOUND`、`ETIMEDOUT` 和證書錯誤屬於連線/TLS 問題，不是 HTTP 狀態碼。請求超時也不自動等於 HTTP 408 或 504，先按[網路](network.md)排查。

修改後，用同一模型服務或 Connector 完成小請求，再重試原操作。仍失敗時，按[反饋流程](#提交问题或向社区求助)提供服務名稱、去除秘密資訊的端點主機名/路徑、狀態碼、錯誤正文、可用的 request ID、時間與時區。不要在公開報告中貼上 Authorization 請求頭或含令牌的 URL。

來源：[HTTP 語義規範](https://www.rfc-editor.org/rfc/rfc9110.html#section-15)、[429 與 Retry-After](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)、[OpenAI 的限流與額度錯誤](https://developers.openai.com/api/docs/guides/error-codes)、[Connector 重試策略](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts)。

## 按報錯資訊定位 {/* #按报错信息定位 */}

從失敗的工具、彈窗或日誌中複製完整錯誤碼和附帶說明。**錯誤碼、Python 異常名、系統錯誤文字**屬於不同來源，Open-Science 沒有為所有故障統一分配數字編號。同一報錯也可能有多個原因。遠端作業請查[SSH 與計算錯誤表](remote-compute.md#处理-ssh-与作业错误)。

| 錯誤碼或文字 | 含義與處理 | 恢復後的檢查 |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | 所選 Python 直譯器無法匯入該模組。檢查[執行環境](runtimes.md)，透過該環境支援的包管理方式安裝所需包，並遵循重啟提示 | 在同一 Notebook 環境匯入模組，再執行失敗的單元格 |
| `ENOENT` / `No such file or directory` | 找不到請求的路徑。檢查檔名和來源位置；引用失效時重新附加實際存在的檔案 | 在同一任務中預覽或讀取目標輸入 |
| `EACCES` / `EPERM` / `Permission denied` | 操作缺少檔案權限。同時檢查系統權限與專案目錄授權，按[專案](projects.md)僅授權任務需要的目錄。SSH 的 `Permission denied (publickey)` 應檢查身份認證 | 在預期權限範圍內重試原讀寫操作 |
| `ENOTDIR` / `Not a directory` | 目錄操作收到檔案路徑，或父路徑不是目錄。選擇實際所屬目錄 | 目錄列表正常開啟 |
| `EISDIR` / `Is a directory` | 檔案操作收到目錄路徑。選擇具體檔案 | 檔案正常開啟或下載 |
| 包請求因非公網目標地址被拒絕 | 檢查被拒絕的主機名及解析 IP；代理或 DNS 可能返回網路策略阻止的地址。按[網路](network.md)修正解析，不要盲目擴大訪問範圍 | 原包請求成功，隨後在同一環境成功匯入 |

### 資料庫啟動錯誤 {/* #数据库启动错误 */}

應用無法安全開啟資料時會報告以下錯誤碼。保留原資料資料夾，閱讀詳細說明後再重試，不要透過刪除資料庫排障。

| 錯誤碼 | 含義 | 接下來怎麼做 |
| --- | --- | --- |
| `database_runtime_unavailable` | 內建資料庫引擎載入失敗 | 重新安裝匹配系統的官方應用包，保留獨立存放的資料目錄 |
| `database_open_failed` | 資料庫無法開啟，可能被另一應用例項佔用、磁碟已滿或位置只讀 | 關閉其他例項，檢查可用空間與目錄權限，再重試 |
| `database_newer_than_app` | 資料格式由較新應用版本寫入 | 安裝相容的新版本，重新開啟原資料目錄；不要自行降級資料結構 |
| `database_history_invalid` | 資料遷移歷史與應用預期不一致 | 保留目錄並反饋錯誤碼。有可用備份時，先確認恢復步驟再替換資料 |
| `database_migration_failed` | 資料庫更新未完成 | 檢查空間、其他例項與權限；有 Retry 時重試。再次失敗時一併提供 migration ID |
| `database_validation_failed` | 儲存的資料不符合所需結構 | 更新應用後重啟；仍失敗時反饋錯誤碼，不要自行修改資料庫記錄 |
| `database_startup_unavailable` | 資料庫啟動服務未響應或未完成檢查 | 先重試；持續失敗時完全退出並重新啟動應用，再反饋 |

啟動錯誤消失、原專案能夠開啟，才算恢復。如果介面提供 **Still stuck? Create an issue for help**，按[下方流程](#提交问题或向社区求助)檢查後提交。上述含義依據 [啟動錯誤處理](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx)。

如果啟動頁只顯示 **Quit**，先退出應用，排除報錯指出的原因後再重新啟動；不要尋找頁面未提供的 Retry 按鈕。恢復後確認原專案和檔案可開啟。

![資料庫無法開啟時的啟動提示](/img/open-science/local-acceptance/startup-database-error.webp)

### 恢復提示 {/* #恢复提示 */}

| 現象 | 下一步 |
| --- | --- |
| 儲存恢復後 Compute 作業持續排隊 | 閱讀受影響會話提示，保留列出的檔案，恢復有效副本後選擇 **Recheck saved conversations**；重新提交前檢查原作業 |
| PDF 上傳取消但文獻條目保留 | 開啟已儲存條目檢查附件狀態；批次視窗提供時使用 **Retry unfinished** |
| 另一客戶端編輯後，集合儲存被拒絕 | 重新開啟最新集合，核對併合並修改後再儲存 |
| Windows 更新提示拒絕訪問 | 閱讀具體路徑及 Windows 錯誤，按提示使用官方安裝程式以管理員身份更新 |
| Windows 更新提示檔案被佔用 | 關閉佔用所指安裝檔案的程序後選擇 **Retry**，或 **Cancel** 停止更新 |

Windows 錯誤屬於作業系統程式碼，與 HTTP 狀態碼不同。恢復失敗時，按[反饋流程](#提交问题或向社区求助)提供安裝版本、完整提示及去除秘密資訊後的檔案/作業標識。

## Windows 本地資料重置 {/* #windows-data-reset */}

只有明確打算丟棄本地應用資料並從頭開始時，才使用獨立重置工具。**它會永久刪除列出的資料和已儲存憑據，不會修復或備份它們。** 先把需要保留的科研檔案及備份複製到所有待清理目錄之外；單純重灌應用會保留這些資料。

1. 從[官方重置說明](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md)分別透過 **Download raw file** 下載 `reset-open-science.cmd` 和 `reset-open-science.ps1`，放在同一資料夾，且該資料夾不在應用資料目錄內。
2. 退出 Open-Science 及托盤程序，完成並關閉代理、Notebook、無介面服務和 WSL 程序。使用平時執行應用的 Windows 賬號，無需管理員模式。
3. 在下載資料夾中開啟命令提示符，執行 `reset-open-science.cmd -Preview`，逐項檢查計劃清理的資料、配置、應用配置檔案及執行快取路徑。預覽不會刪除資料。
4. 只有檢查並備份這些位置後，才雙擊 `reset-open-science.cmd`。刪除前必須準確輸入 `RESET OPEN SCIENCE`，其他輸入都會取消。
5. 閱讀最終結果後再開啟應用。重置完成後，需要重新選擇資料位置、配置提供方並安裝託管執行環境。

遇到正在執行或無法檢查的程序、不安全路徑等情況，應先處理提示中的原因，不要繞過拒絕。配置損壞或涉及自定義資料位置時，按照官方說明使用明確的 `-DataRoot` 引數。刪除中途報錯可能已清理部分檔案，不能假定完全沒有變化。工具不會撤銷外部提供方賬號，也不會刪除獨立安裝的 Python/R 環境。

## 收集有效診斷 {/* #收集有效诊断 */}

1. 記錄版本、系統、Agent/模型、專案/會話與發生時間。
2. 複製首條相關工具錯誤及觸發操作，說明預期與實際。
3. 輸入問題提供公開來源、檔名、大小和校驗和；最小可復現輸入優於無關截圖。
4. 必要時在 **Settings → General → Diagnostics** 用 **Open / Reveal** 開啟執行日誌。
5. 分享前去掉令牌、私有源內容和無關路徑；開啟日誌不會自動傳送。
6. 記錄修改後原操作是否實際成功，按鈕可用不是成功條件。

準確技術訊息見[診斷參考](../reference/diagnostics.md)。

### 匯出單個會話的診斷資訊 {/* #session-diagnostics */}

1. 開啟受影響的會話，選擇頁頭 **Export diagnostics…**，或會話選單 **Export → Export diagnostics…**。
2. 檢查可選來源。**session.json** 和 **Session database records** 對應所選會話；**main.log** 及歷史應用日誌也可能包含其他會話的後設資料，只在相關時選擇。
3. 點選 **Export** 並選擇本地儲存位置，等待 **Diagnostics exported.**，使用 **Show in folder** 定位歸檔。
4. 分享前檢查其中的清單與匯出日誌。缺失或損壞的來源可能只留下摘要或被省略，歸檔存在不代表每個來源都已完整收集。

![選擇當前會話的診斷來源並準備本地匯出](/img/open-science/v0330/session-diagnostics.webp)

常規後設資料匯出會排除隱私內容欄位。若 .science 匯出觸發敏感內容檢查，來源列表還可能出現已脫敏的掃描證據和觸發檢查的原始檔案。**原始敏感檔案預設不勾選，主動勾選會將原始位元組寫入診斷歸檔**；只選擇確實需要的來源，分享前檢查歸檔和截圖。匯出僅儲存在本地，不自動上傳或傳送給模型。這是診斷證據，不是研究備份；研究交接應使用 [.science 研究包](research-packages.md)。

## 提交問題或向社群求助 {/* #提交问题或向社区求助 */}

| 需要什麼幫助 | 對應渠道 |
| --- | --- |
| 不確定如何設定，或想了解某條報錯 | [加入 AIPOCH Official Discord](https://discord.gg/zxQAYjReRv)，說明操作、版本和錯誤 |
| 可復現的應用故障，需要跟蹤修復 | 先搜尋[已有 Issue](https://github.com/aipoch/open-science/issues)，再填寫 [Bug report](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml) |
| 新功能或改進建議 | 提交[功能建議](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml)，說明希望解決的研究任務 |

### 向 GitHub 提交有效反饋 {/* #向-github-提交有效反馈 */}

1. 用錯誤碼或有辨識度的報錯文字搜尋已有 Issue。同一問題已存在時，在原 Issue 補充復現資訊。
2. 登入 GitHub，開啟 **Bug report**。標題可參考 `[Bug]: database_open_failed when reopening a project`，替換為實際錯誤。
3. 填寫 **What happened?**（發生了什麼）、**Steps to reproduce**（復現步驟）、**Operating system** 和 **App version**。涉及模型時補充 **Provider / model** 及當前 Agent 框架。
4. 在 **Relevant logs or screenshots** 提供首條報錯和少量上下文。問題依賴輸入資料時，附公開或最小復現樣本。
5. 檢查內容後提交，保留 Issue 連結，並在原 Issue 回覆後續檢查結果。如果當前賬號沒有建立 Issue 的入口，可在 Discord 求助確認反饋渠道。

準備 Issue 或 Discord 提問時，可複製以下清單：

```text
Open-Science 版本与安装方式：
操作系统与芯片架构：
Agent 框架 / Provider / 模型（如相关）：
页面与操作：
复现步骤：
预期结果：
实际结果：
完整错误码与报错文本：
发生时间与时区：
公开或最小复现输入（如需要）：
已尝试的方法及结果：
相关日志片段或截图：
```

遠端故障另附執行模式、應用 job ID、有則提供排程器 job ID、退出碼及相關 stdout/stderr。私有主機使用中性別名。不要提交密碼、令牌、SSH 私鑰、患者資料或完整私有研究目錄；以去除敏感內容的最小樣本復現。

<span id="从启动错误界面反馈" />

### 從錯誤提示準備反饋 {/* #从错误提示准备反馈 */}

點選會話錯誤旁的 **Report this error**。啟動頁也可能提供 **Still stuck? Create an issue for help** 入口。

1. 檢查 **Error details**，分享前去掉私有路徑、識別符號和敏感輸入。
2. 核對 **Also included** 中的應用版本、作業系統、Agent 框架、提供方/模型和執行時版本。
3. **Copy details** 複製編輯後的錯誤文字和環境資訊。**Reveal log file** 定位本機執行日誌；日誌不會自動附加，分享前需要另外檢查。
4. 勾選公開分享確認，啟用 **Open GitHub issue**。修改錯誤文字後，需要重新閱讀並確認更新後的內容。
5. 開啟 GitHub 表單，檢查預填欄位，補充有效的復現步驟，準備好後再提交。僅開啟報告預覽不會提交 Issue。

![可編輯的錯誤詳情及公開分享確認](/img/open-science/sept11-completion/report-preview.webp)

## 常見問題 {/* #常见问题 */}

**所有操作都要模型賬號嗎？** 不需要。瀏覽本地檔案、整理及很多設定無需模型；Agent 回答、計劃與模型審查需要相容接入。

**本地儲存表示全部處理留在電腦嗎？** 不表示。使用配置模型/服務時，選中的請求、檔案或檢索內容可能傳送給它。本地儲存位置與模型執行位置不同。

**能離線使用嗎？** 已有本地檔案和本地檢視可繼續使用；託管模型、線上資料庫及缺失包下載需要對應連線。本地端點也需要服務正在執行。

**Usage 是賬單或訂閱餘額嗎？** 不是。它展示可用遙測，缺失不等於零；服務計費和額度另行管理。

**恢復歸檔會重跑嗎？** 不會，只恢復保留工作入口。核心與失敗操作可能還需顯式重啟/重跑。

**SSH 測試成功就能執行分析嗎？** 不能據此判斷。還要檢查執行模式、排程權限、執行環境和資源請求，再執行小任務並檢查輸出。見[遠端計算](remote-compute.md)。

原始碼：[佇列恢復提示](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx)、[PDF 批次處理](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx)、[集合衝突](https://github.com/aipoch/open-science/commit/dbb9560a)、[Windows 安裝程式](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh)。

原始碼：[缺陷表單欄位](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml)、[啟動反饋彈窗](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx)。
