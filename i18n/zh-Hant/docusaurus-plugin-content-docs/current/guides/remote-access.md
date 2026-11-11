---
title: "遠端瀏覽器訪問"
last_update:
  date: '2026-11-11'
---

# 遠端瀏覽器訪問 {/* #远程浏览器访问 */}

遠程瀏覽器訪問讓另一臺設備操作這臺計算機上正在運行的工作區。項目、Agent、文件和 Notebook 運行時仍在本機運行。它與把任務交給執行目標的[遠程計算](./remote-compute.md)不同。

## 配對手機或平板 {/* #mobile-pairing */}

桌面端 **Settings → Remote** 的 **Connect mobile device** 區域提供 **WiFi** 和 **Internet** 兩種方式。這與下文的 Remote.It 模式獨立，二維碼連接無需 Remote.It 賬戶。

打開配對面板時，遠程訪問保持 **Off**，需主動選擇 **WiFi** 或 **Internet** 纔會開啓；已有連接會保留當前狀態。僅在確實需要連接其他設備時選擇模式，並保持主機喚醒和運行。

1. 同一局域網內選擇 **WiFi**。如果列出多個主機地址，選擇手機能夠訪問的地址。訪客網絡隔離可能導致兩臺設備雖然顯示相同 WiFi 名稱，仍無法互相訪問。
2. 局域網外訪問選擇 **Internet**。閱讀 Pinggy 連接提示，等待可用鏈接和二維碼出現。流量經過第三方隧道，請檢查界面顯示的密碼及連接要求。
3. 用手機或平板掃描當前二維碼。Internet 模式要求時，輸入 **Connection password**；按配對提示操作，確認打開的是預期工作區。
4. 二維碼過期或隧道重新連接後，選擇 **Refresh QR code** 並重新掃碼。免費 Pinggy 隧道每 60 分鐘更換地址，舊書籤可能失效。
5. 查看 **Connected devices**。用完後可通過 **Revoke all** 撤銷這些設備的授權，並在 Remote 設置中選擇 **Off** 停止遠程訪問。撤銷設備與停止連接是兩個獨立操作。

不要公開配對鏈接、二維碼或密碼。二維碼出現只代表可以發起配對，不代表另一臺設備已經連接。連接失敗時，先檢查主機是否運行、網絡地址是否正確及防火牆權限，再生成新的配對信息。

## 前置條件和模式 {/* #前置条件和模式 */}

在本機桌面開啟 Settings → Remote。啟用相關模式前需單獨安裝並登入 Remote.It 桌面應用。Open-Science 呼叫其已安裝的 CLI，不代建賬號或捆綁第三方服務。

| 模式 | 用途 |
| --- | --- |
| Off | 暫停遠端訪問，保留 Provider 設定和可信瀏覽器記錄 |
| App access | 透過已登入的移動應用訪問，並完成兩步驗證 |
| Browser access | 透過持久 HTTPS 連結訪問，並完成兩步驗證 |

![實查的 Off 頁面](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

![Open-Science Remote control 頁面，顯示 Remote.It 應用程式連結與 Off、App access、Browser access 三種模式](/img/open-science/settings-remote-control.webp)

訪問模式只能在本機桌面視窗修改。有權限的已連線瀏覽器可管理配對/信任，但不能代替本機修改模式。

## 環境就緒後的配對步驟 {/* #环境就绪后的配对步骤 */}

1. 選擇模式，等待 ready/running。錯誤或 Changing access mode 不代表可用。
2. Browser access 使用 Copy、Open 或二維碼；App access 按移動端說明並使用同一 Remote.It 賬號。
3. 比對請求裝置與批准裝置的六位碼，核對瀏覽器、平臺、時間和地址。
4. 選擇 Reject、Allow for up to 12 hours 或 Trust this browser for 180 days。臨時允許不等於永久信任。
5. 開啟目標工作區，完成一個小的只讀操作，不能用“連結已複製”代替連通驗證。

請妥善保管訪問連結，只向目標裝置提供連線，並在建立信任前確認配對請求。

## 撤銷和停止 {/* #撤销和停止 */}

Trusted browsers 顯示裝置和上次使用時間。Revoke &#91;browser&#93; 撤銷其後續受保護訪問/重連資格。Off 暫停訪問但保留信任，裝置丟失時需單獨撤銷。

若提示關閉未完成，使用 Retry turning off 並確認已儲存。原始碼提示 Off 未儲存時，重啟後訪問可能重新開啟，所以只看到選中按鈕不夠。

### 服務變更已接受，代理仍在重啟 {/* #服务变更已接受代理仍在重启 */}

若提示 **Remote.It accepted the service changes, but its background agent is still restarting**，新的 Service IDs 已儲存。等待幾秒後點選 **Detect** 或 **Detect again**。不要重新新增裝置或反覆切換模式，應複用已接受的服務配置。

頁面給出瀏覽器連結和配對控制元件後再繼續。若持續檢測失敗，請確認 Remote.It 桌面應用已登入、後臺代理正在執行，保留準確報錯並按[故障排查](troubleshooting.md)反饋。子面板顯示 **Ready**，但頁面仍有錯誤時，不能據此確認遠端訪問成功。

## 按階段排查 {/* #按阶段排查 */}

| 階段 | 排查 |
| --- | --- |
| Provider 未發現 | Remote.It 是否安裝、登入，檢測結果是什麼 |
| 模式切換失敗 | 當前錯誤，本機應用和 Provider 是否仍執行 |
| 連結可開但無工作區 | 配對碼、有效期、信任和授權裝置 |
| 原有裝置被拒絕 | 是否撤銷、過期或已 Off |
| 工作區可開但任務失敗 | 本機模型、執行時和工具權限，遠端入口不會自動配置這些 |

本地無介面/瀏覽器服務命令見[服務參考](../reference/server.md)，與此處 Remote.It 模式分開。

原始碼：[Remote 頁面](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/RemoteControlPanel.tsx)。

Linux headless 沒有可用系統金鑰環時，見 [憑據儲存選項](../reference/server.md)。該選項改變適用秘密的本地儲存方式，不會配置 Remote.It、配對瀏覽器或授權遠端訪問。

## v0.31.1 的配對與撤銷 {/* #pairing-v0311 */}

待處理配對請求顯示在 **Trusted browsers** 前方，並提供剩餘時間和臨近到期提示。授權前核對請求裝置顯示的配對碼；到期後需要重新發起請求。受信任瀏覽器可以撤銷自身信任，此後受保護訪問會結束；再次訪問時需要重新配對。**Off**、臨時訪問和撤銷信任仍是不同操作。
