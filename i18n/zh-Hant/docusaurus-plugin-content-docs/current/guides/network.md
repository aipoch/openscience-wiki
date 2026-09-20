---
title: "網路、代理與包映象"
last_update:
  date: '2026-09-20'
---

# 網路、代理與包映象 {/* #网络代理与包镜像 */}

模型、Notebook 或依賴下載無法連線時，開啟 **Settings → Network**。頁面分別管理連線狀態、Notebook 域名白名單、程序代理和軟體包映象。連線檢查為綠色，不代表所有受保護的 Notebook 請求都能成功。

先確認失敗的是提供方請求、Notebook 網路訪問還是包安裝，它們可能使用不同連線路徑。修改設定時保留失敗主機名和完整錯誤。

## 先讀 Network status {/* #先读-network-status */}

該狀態結合本地網路連線與軟體源探測。**READY · Package registries are reachable** 表示該次探測成功；Checking、不可達或離線狀態則需要等待檢查或修復連線。網路變化後，可在入口可用時選擇 **Check again**。

Network 顯示 **Ready** 但工具失敗時，展開該工具的錯誤。狀態探測檢查自己的目標地址，請根據失敗請求的主機名和提示排查對應路徑。

| 現象 | 下一項檢查 | 不應據此得出的結論 |
| --- | --- | --- |
| 模型登入失敗 | 提供方認證和模型連線檢查 | Notebook 域名設定會提供模型憑據 |
| 單個研究域名被拒絕 | **Configure domains** 中的精確域名 | 新增無關的大範圍域名就能修復 |
| 軟體源已允許但 CONNECT 失敗 | 安裝日誌、代理和 DNS 解析 | 再點一次相同授權就能解決所有連線問題 |
| 證書校驗失敗 | CA bundle 和組織信任要求 | 必須關閉證書校驗 |
| 連線報錯後顯示找不到包版本 | 更早的網路錯誤、Python 與平臺 | 該軟體包一定不存在 |

## 配置 Notebook 域名 {/* #配置-notebook-域名 */}

1. 選擇 **Configure domains**。
2. 檢視當前裝置是否啟用 Notebook 網路保護。
3. 展開科學服務分組，檢查域名。分組開關控制對應目的地；本版本軟體源/原始碼分組已開啟且鎖定。
4. 在 **Domain hostname** 輸入額外來源的精確主機名，選擇 **Add**。
5. 檢查新增草稿行，使用 **Remove &#91;hostname&#93;** 撤銷。
6. 選擇 **Save changes** 儲存預期清單。

![萬用字元被域名校驗拒絕](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

填寫 `data.example.org` 這樣的主機名，不帶協議、路徑、埠、萬用字元或 IP 地址。若顯示 **Enter a hostname only, without a scheme, path, port, or wildcard.**，去掉這些部分後再儲存。

按名稱允許的域名仍可能在其他連線檢查中失敗。例如，`pypi.org` 即使已在允許範圍內，解析為 `198.18.*` 時仍會被判定為非公網目的地。這與“域名未授權”是不同問題。

## 選擇代理模式 {/* #选择代理模式 */}

選擇 **Configure proxy**。代理地址應來自自己的網路配置，截圖中的埠僅適用於演示電腦。

| 模式 | 行為 | 必填內容 |
| --- | --- | --- |
| **System** | 應用請求遵循系統代理；代理程序繼承應用啟動時的代理環境 | 不填伺服器 |
| **Manual** | 為之後的應用請求和程序提供固定代理 | **Proxy server** URL |
| **Direct** | 新程序直接連線，不使用配置或繼承的代理 | 不填伺服器 |

Manual 支援 HTTP、HTTPS、SOCKS、SOCKS4、SOCKS5 URL，不支援 URL 內嵌憑據。**Bypass rules** 可填寫逗號分隔的直連主機列表，localhost 始終繞過代理。

1. 選擇 **Manual**。
2. 在 **Proxy server** 輸入當前網路實際使用的代理地址。
3. 僅在目的地需要直連時新增 Bypass rules。
4. 選擇 **Save**，等待 **Proxy settings saved.**。
5. 啟動新請求或程序，重試原來的失敗操作。已有代理會話、核心、安裝程序可能保留舊連線。

Manual 模式提示 **Enter a proxy server URL** 時，填寫可用代理地址，或透過 **Done** 放棄草稿。儲存有效地址本身不能證明該代理能完成原來失敗的請求。

### 域名解析為非公網地址時 {/* #本次遇到的-fake-ip-问题 */}

安裝提示 `destination resolves to a non-public network address` 時，即使短錯誤只有 `conda install failed` 或 `pip install failed`，也要開啟詳細安裝日誌。

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. 檢查受影響域名及其解析地址。`198.18.*` 等地址不屬於公網目的地。
2. 區分域名名單與目標地址檢查。`alreadyAllowed` 不表示解析出的地址符合要求。
3. 與網路維護者檢查公網 DNS 解析和預期代理路徑，再重試原來的小型請求。保持域名防護開啟。
4. 分別驗證安裝結果和實際匯入。代理已儲存、直譯器 Ready 或已有包能執行，都不足以證明新包安裝成功。

如果同一錯誤持續出現，保留域名、解析地址、代理模式和安裝日誌，按[故障排查](troubleshooting.md)反饋。設定儲存成功不等於下載成功。


## 軟體包映象與證書 {/* #软件包镜像与证书 */}

在 Package mirror 下選擇 **Configure** 或 **Edit**。

| 欄位 | 輸入與作用 |
| --- | --- |
| **Conda channel mirror** | Conda channel 下載所用映象根地址 |
| **Python package index (pip)** | Python 包索引 URL，通常以 `/simple` 結尾 |
| **CA bundle path** | 完整 PEM 信任包路徑，應包含需要的公共與組織根證書；留空使用公共證書機構 |
| **View available mirrors** | 開啟外部映象幫助 |
| **Save** | 儲存，供後續軟體包操作使用 |
| **Cancel** | 放棄草稿 |

![映象與 CA bundle 欄位](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

包映象改變軟體包來源。核對映象所需的根地址或索引格式，儲存後在所選環境中重試小規模安裝。模型提供方代理需單獨配置。

已配置的 Conda、PyPI 和 CRAN 映象主機會在本次包管理操作中獲得臨時訪問權限。這不會將其加入永久 Notebook 域名列表，也不會授予普通 Notebook 程式碼相同權限。跳轉到其他主機時仍按網路審批流程處理。

填寫受支援的 HTTP(S) 映象地址，不包含內嵌憑據、空白字元、localhost 或純 IP 地址。映象設定被接受，不代表伺服器可用，也不會修復域名解析到保留地址的問題。安裝失敗時先檢視該操作真正訪問的目標和錯誤，再重試。遠端**模型**端點另外遵循[HTTPS 要求](providers.md)。

## 保留哪些排查資訊 {/* #保留哪些排查信息 */}

記錄應用版本、操作、執行時/環境、包名或域名、代理模式和最早的有效錯誤。保留完整安裝輸出：末尾“找不到版本”可能掩蓋更早的連線失敗。分享診斷資料時移除 token 和代理憑據。

網路已連通但 Python 仍缺模組時，繼續檢視[執行時與軟體包](./runtimes.md)。遠端主機配置單獨見 [Compute](remote-compute.md)。

[網路設定原始碼](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx)、[Notebook 網路邊界](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts)。

## 查詢 HTTP 報錯 {/* #查询-http-报错 */}

遇到 400、401、403、404、429 或 5xx 響應時，檢視 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同時記錄返回錯誤的服務與詳細訊息。

## R 單元格在執行前被阻止 {/* #r-network-warning */}

v0.31.1 中，網路保護阻止 R 執行時，Notebook 會顯示行內提示。透過其中的設定連結檢查所需訪問。提示表示單元格沒有執行，不能作為科研結果或已完成的執行。處理具體要求後重新執行並檢視輸出。Windows 支援標準模式 R，並不意味著網路保護已經啟用。
