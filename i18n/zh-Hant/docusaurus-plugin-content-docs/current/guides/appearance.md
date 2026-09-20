---
title: "外觀與通知"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# 外觀與通知 {/* #外观与通知 */}

選擇適合閱讀的主題、設定介面語言，並在使用其他應用時接收任務提醒。開啟 **Settings → General** 調整這些偏好。Open-Science 會在本裝置記住外觀選擇。

<PlatformGuide />

## 修改主題與介面語言 {/* #修改主题与界面语言 */}

1. 在 **General → Appearance** 找到 **Theme**。
2. 選擇 **System** 跟隨系統，或選擇 **Light / Dark** 固定為淺色或深色，之後可隨時切換。
3. 在 **Language** 選擇希望使用的介面語言，或選擇 **System** 使用裝置語言。

<PlatformContent platform="macos">

![General 中的外觀與語言設定](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Windows 的 General 設定中的 Theme 與 Language 控制元件" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="開啟完整的 Windows General 設定截圖" />

</PlatformContent>

| 選擇 | 生效範圍 |
| --- | --- |
| Theme → System | 跟隨裝置的淺色或深色設定 |
| Theme → Light / Dark | 固定主題，不隨系統主題變化 |
| Language → System | 應用啟動時讀取裝置語言。修改系統語言後，重新開啟應用使其生效 |
| 指定一種語言 | 應用使用該介面語言。已儲存的提問、原始檔和歷史模型回答保留原文 |

語言和主題設定位於 **Settings → General → Appearance**。文件網站的語言選擇器獨立於應用，修改它不會改變應用語言。系統檔案視窗遵循作業系統設定。

需要模型用其他語言撰寫報告時，在對話中說明即可，例如：“請用英文撰寫報告，保留原始基因識別符號。”

<PlatformContent platform="windows">

**調整 Windows 顯示縮放**

1. 開啟 Windows **设置 → 系统 → 屏幕**，找到**縮放與佈局**。先記下當前比例，方便恢復。
2. 選擇適合閱讀的文字和應用大小，例如 **125%**。
3. 回到 Open-Science，檢查輸入框和預覽區域。較寬的表格可能需要橫向滾動；必要時拖寬預覽面板或最大化視窗。
4. 要撤銷調整，在螢幕設定中選回原比例。如果 Windows 提示需要重新開啟應用，先儲存工作再重開。

放大後仍可閱讀同一份報告。使用橫向捲軸檢視當前視口外的列；顯示縮放改變的是檢視，不會修改已儲存的資料。

![125% 縮放下的 Open-Science，表格預覽顯示橫向捲軸](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## 設定任務通知 {/* #设置任务通知 */}

如果希望在分析執行時處理其他工作，並在任務需要關注時收到提醒，可以開啟通知。

1. 在 **General → Notifications** 開啟 **Task notifications**。
2. 決定是否開啟 **Show task content in system notifications**。不希望系統提醒暴露任務名稱或請求細節時，保持關閉。
3. 閱讀 **System notification status**，如果可用，點選 **Send test notification**。作業系統詢問時，允許應用傳送通知。
4. 檢查測試返回狀態及系統通知。接收實際任務提醒時，切換到其他應用並讓任務繼續執行。

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| 控制元件 | 效果 |
| --- | --- |
| Task notifications | 在使用其他應用時，針對任務完成、失敗或等待批准傳送提醒。關閉後停止這類任務提醒 |
| Show task content in system notifications | 開啟時包含任務名稱和請求細節；Provider 錯誤保持隱藏。Task notifications 關閉時，此控制元件不可用 |
| System notification status | 顯示裝置是否支援系統通知 |
| Send test notification | 請求傳送測試。請求期間顯示 **Sending test…**；傳送中或裝置不支援系統通知時，按鈕不可用 |
| 已送達的任務通知 | 點選後將 Open-Science 切回前臺，並開啟對應任務 |

主動取消的任務，以及應用自動重試中的失敗，不會提醒。首頁或工作區的 **Messages** 是應用內入口，系統通知權限另行管理。

### 從系統通知回到任務 {/* #从系统通知回到任务 */}

<PlatformContent platform="macos">

任務完成或需要批准時，可以點選系統提醒返回相應會話。錯過橫幅時，在 macOS 通知中心查詢 Open-Science；如果通知被摺疊成一組，先展開，再點選具體一條。點選批准提醒只開啟任務，仍需在應用內閱讀並處理請求。

</PlatformContent>

<PlatformContent platform="windows">

1. 在應用中開啟 **Task notifications**，並透過測試通知檢查系統是否允許提醒。
2. 發出任務後切換到其他應用。收到 **Task completed** 或 **Approval needed** 時，點選對應提醒。
3. 回到 Open-Science 後核對會話和原請求。完成提醒應對應最終結果；批准提醒應開啟仍待處理的請求，需要在應用內選擇 **Allow** 或 **Deny**。點選通知本身不會批准執行。

錯過橫幅時，在 Windows 通知中心查詢該提醒；沒有通知時，檢查 Windows 的橫幅與勿擾設定。若回到首頁，可透過 **Recent sessions** 開啟原會話。通知文字不能替代實際結果檢查。

</PlatformContent>

<PlatformContent platform="macos">

![隱藏任務細節的英文系統完成通知](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
關閉 **Show task content in system notifications** 後，系統使用不含任務內容的通用提醒。點選完成或批准提醒可返回對應會話，再在應用內處理批准請求。

### 沒有收到通知時 {/* #没有收到通知时 */}

先閱讀測試結果，再根據對應情況檢查。

| 結果或現象 | 接下來檢查什麼 |
| --- | --- |
| **Test notification shown.** | 應用報告測試通知已顯示。檢查系統通知；測試提醒與真實任務事件分別觸發 |
| **Test notification sent, but display could not be confirmed.** | 檢查系統通知權限，以及作業系統是否隱藏橫幅。目前尚未確認送達 |
| **Test notification failed.** | 在系統設定中檢查應用通知權限，再測試一次。仍失敗時，按[故障排查](troubleshooting.md)收集錯誤 |
| **System notifications are unavailable on this device.** | 測試控制元件不可用，請在工作區檢視任務進度 |
| 測試有效，但任務沒有提醒 | 確認 Task notifications 已開啟、當前正在使用其他應用，且事件屬於完成、失敗或等待批准。主動取消和自動重試不提醒 |
| 正在錄屏、共享或映象螢幕時沒有提醒 | 檢查系統是否允許錄屏或共享期間顯示通知，以及專注/勿擾設定。僅在需要展示提醒時開啟；提醒可能被錄進畫面 |
| 收到提醒，但沒有任務細節 | 檢查 Show task content in system notifications。希望隱藏內容時，保持關閉即可 |

<PlatformContent platform="windows">

### 關閉視窗後從托盤返回 {/* #关闭窗口后从托盘返回 */}

在 **General → Close button behaviour** 選擇 **Ask every time** 後，關閉視窗會顯示 **Minimize or quit?**。選擇 **Minimize to tray** 可隱藏視窗，再從 Windows 托盤中的 Open-Science 圖示返回。只有希望記住選擇時才勾選 **Don’t ask again**；需要改變行為時回到 General。最小化不等於退出應用。

</PlatformContent>

## 查詢相關設定 {/* #查找相关设置 */}

| 你想要… | 對應入口 |
| --- | --- |
| 檢查應用更新 | **General → About → Check now**；後續步驟見[安裝與更新](installation.md) |
| 閱讀版本變化或獲取幫助 | **About → Release notes / Help Center** 開啟相應外部頁面；本 Wiki 另有 [Changelog](../changelog/v0.31.1.md) |
| 定位或開啟診斷日誌 | **General → Diagnostics → Reveal / Open**；見[故障排查](troubleshooting.md)。日誌在主動分享前保留於本地 |
| 安裝命令列入口 | **General → Install command**；見 [CLI 參考](../reference/cli.md)。使用桌面介面不需要安裝此命令 |
| 管理資料位置或歸檔工作 | [儲存與歸檔](storage.md) |

<span id="验证范围" />

## 作業系統中的通知設定 {/* #操作系统中的通知设置 */}

通知送達還取決於作業系統權限、專注模式及螢幕共享設定。請在實際使用的裝置上按上表檢查。


原始碼：[General 設定](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx)。
