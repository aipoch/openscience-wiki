---
title: "遠端瀏覽器訪問"
last_update:
  date: '2026-09-20'
---

# 遠端瀏覽器訪問 {/* #远程浏览器访问 */}

遠端瀏覽器訪問讓另一裝置操作本機正在執行的工作區。專案、Agent、檔案和 Notebook 仍在本機執行；它與把計算傳送到遠端主機的 [SSH/Slurm](./remote-compute.md) 不同。

:::caution&#91;連線狀態&#93;
Remote.It 可能已經接受服務變更，但後臺代理尚未報告就緒。還需要在你的裝置上完成瀏覽器配對併成功開啟工作區。下方 Off 狀態截圖用於說明控制元件，不代表已經連線的遠端會話。
:::

## 前置條件和模式 {/* #前置条件和模式 */}

在本機桌面開啟 Settings → Remote。啟用相關模式前需單獨安裝並登入 Remote.It 桌面應用。Open-Science 呼叫其已安裝的 CLI，不代建賬號或捆綁第三方服務。

| 模式 | 用途 |
| --- | --- |
| Off | 暫停遠端訪問，保留 Provider 設定和可信瀏覽器記錄 |
| App access | 透過已登入的移動應用訪問，並完成兩步驗證 |
| Browser access | 透過持久 HTTPS 連結訪問，並完成兩步驗證 |

![實查的 Off 頁面](/img/open-science/walkthrough-2026-09-08/63-remote-off.webp)

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
