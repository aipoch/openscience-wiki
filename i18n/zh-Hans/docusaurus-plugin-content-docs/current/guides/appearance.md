---
title: "外观与通知"
last_update:
  date: '2026-09-16'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import PreferenceScreenshot from '@site/src/components/PreferenceScreenshot';
import Screenshot from '@site/src/components/Screenshot';

# 外观与通知

选择适合阅读的主题、设置界面语言，并在使用其他应用时接收任务提醒。打开 **Settings → General** 调整这些偏好。Open-Science 会在本设备记住外观选择。

<PlatformGuide />

## 修改主题与界面语言

1. 在 **General → Appearance** 找到 **Theme**。
2. 选择 **System** 跟随系统，或选择 **Light / Dark** 固定为浅色或深色，之后可随时切换。
3. 在 **Language** 选择希望使用的界面语言，或选择 **System** 使用设备语言。

<PlatformContent platform="macos">

![General 中的外观与语言设置](/img/open-science/v0.27.0/07-general-appearance.webp)

</PlatformContent>

<PlatformContent platform="windows">

<Screenshot src="/img/open-science/windows/general-settings.webp" alt="Windows 的 General 设置中的 Theme 与 Language 控件" width={1920} height={1017} windowBounds={[480, 165, 960, 690]} href="/docs/img/open-science/windows/general-settings.webp" linkLabel="打开完整的 Windows General 设置截图" />

</PlatformContent>

| 选择 | 生效范围 |
| --- | --- |
| Theme → System | 跟随设备的浅色或深色设置 |
| Theme → Light / Dark | 固定主题，不随系统主题变化 |
| Language → System | 应用启动时读取设备语言。修改系统语言后，重新打开应用使其生效 |
| 指定一种语言 | 应用使用该界面语言。已保存的提问、源文件和历史模型回答保留原文 |

语言和主题设置位于 **Settings → General → Appearance**。文档网站的语言选择器独立于应用，修改它不会改变应用语言。系统文件窗口遵循操作系统设置。

需要模型用其他语言撰写报告时，在对话中说明即可，例如：“请用英文撰写报告，保留原始基因标识符。”

<PlatformContent platform="windows">

**调整 Windows 显示缩放**

1. 打开 Windows **设置 → 系统 → 屏幕**，找到**缩放与布局**。先记下当前比例，方便恢复。
2. 选择适合阅读的文字和应用大小，例如 **125%**。
3. 回到 Open-Science，检查输入框和预览区域。较宽的表格可能需要横向滚动；必要时拖宽预览面板或最大化窗口。
4. 要撤销调整，在屏幕设置中选回原比例。如果 Windows 提示需要重新打开应用，先保存工作再重开。

放大后仍可阅读同一份报告。使用横向滚动条查看当前视口外的列；显示缩放改变的是视图，不会修改已保存的数据。

![125% 缩放下的 Open-Science，表格预览显示横向滚动条](/img/open-science/windows/app-scale-125.webp)

</PlatformContent>

## 设置任务通知

如果希望在分析运行时处理其他工作，并在任务需要关注时收到提醒，可以开启通知。

1. 在 **General → Notifications** 打开 **Task notifications**。
2. 决定是否开启 **Show task content in system notifications**。不希望系统提醒暴露任务名称或请求细节时，保持关闭。
3. 阅读 **System notification status**，如果可用，点击 **Send test notification**。操作系统询问时，允许应用发送通知。
4. 检查测试返回状态及系统通知。接收实际任务提醒时，切换到其他应用并让任务继续运行。

<PlatformContent platform="macos">

<PreferenceScreenshot notifications />

</PlatformContent>

| 控件 | 效果 |
| --- | --- |
| Task notifications | 在使用其他应用时，针对任务完成、失败或等待批准发送提醒。关闭后停止这类任务提醒 |
| Show task content in system notifications | 开启时包含任务名称和请求细节；Provider 错误保持隐藏。Task notifications 关闭时，此控件不可用 |
| System notification status | 显示设备是否支持系统通知 |
| Send test notification | 请求发送测试。请求期间显示 **Sending test…**；发送中或设备不支持系统通知时，按钮不可用 |
| 已送达的任务通知 | 点击后将 Open-Science 切回前台，并打开对应任务 |

主动取消的任务，以及应用自动重试中的失败，不会提醒。首页或工作区的 **Messages** 是应用内入口，系统通知权限另行管理。

### 从系统通知回到任务

<PlatformContent platform="macos">

任务完成或需要批准时，可以点击系统提醒返回相应会话。错过横幅时，在 macOS 通知中心查找 Open-Science；如果通知被折叠成一组，先展开，再点击具体一条。点击批准提醒只打开任务，仍需在应用内阅读并处理请求。

</PlatformContent>

<PlatformContent platform="windows">

1. 在应用中开启 **Task notifications**，并通过测试通知检查系统是否允许提醒。
2. 发出任务后切换到其他应用。收到 **Task completed** 或 **Approval needed** 时，点击对应提醒。
3. 回到 Open-Science 后核对会话和原请求。完成提醒应对应最终结果；批准提醒应打开仍待处理的请求，需要在应用内选择 **Allow** 或 **Deny**。点击通知本身不会批准执行。

错过横幅时，在 Windows 通知中心查找该提醒；没有通知时，检查 Windows 的横幅与勿扰设置。若回到首页，可通过 **Recent sessions** 打开原会话。通知文字不能替代实际结果检查。

</PlatformContent>

<PlatformContent platform="macos">

![隐藏任务细节的英文系统完成通知](/img/open-science/priority-completion/07-system-completion-notification.webp)

</PlatformContent>
关闭 **Show task content in system notifications** 后，系统使用不含任务内容的通用提醒。点击完成或批准提醒可返回对应会话，再在应用内处理批准请求。

### 没有收到通知时

先阅读测试结果，再根据对应情况检查。

| 结果或现象 | 接下来检查什么 |
| --- | --- |
| **Test notification shown.** | 应用报告测试通知已显示。检查系统通知；测试提醒与真实任务事件分别触发 |
| **Test notification sent, but display could not be confirmed.** | 检查系统通知权限，以及操作系统是否隐藏横幅。目前尚未确认送达 |
| **Test notification failed.** | 在系统设置中检查应用通知权限，再测试一次。仍失败时，按[故障排查](troubleshooting.md)收集错误 |
| **System notifications are unavailable on this device.** | 测试控件不可用，请在工作区查看任务进度 |
| 测试有效，但任务没有提醒 | 确认 Task notifications 已开启、当前正在使用其他应用，且事件属于完成、失败或等待批准。主动取消和自动重试不提醒 |
| 正在录屏、共享或镜像屏幕时没有提醒 | 检查系统是否允许录屏或共享期间显示通知，以及专注/勿扰设置。仅在需要展示提醒时开启；提醒可能被录进画面 |
| 收到提醒，但没有任务细节 | 检查 Show task content in system notifications。希望隐藏内容时，保持关闭即可 |

<PlatformContent platform="windows">

### 关闭窗口后从托盘返回

在 **General → Close button behaviour** 选择 **Ask every time** 后，关闭窗口会显示 **Minimize or quit?**。选择 **Minimize to tray** 可隐藏窗口，再从 Windows 托盘中的 Open-Science 图标返回。只有希望记住选择时才勾选 **Don’t ask again**；需要改变行为时回到 General。最小化不等于退出应用。

</PlatformContent>

## 查找相关设置

| 你想要… | 对应入口 |
| --- | --- |
| 检查应用更新 | **General → About → Check now**；后续步骤见[安装与更新](installation.md) |
| 阅读版本变化或获取帮助 | **About → Release notes / Help Center** 打开相应外部页面；本 Wiki 另有 [Changelog](../changelog/v0.31.1.md) |
| 定位或打开诊断日志 | **General → Diagnostics → Reveal / Open**；见[故障排查](troubleshooting.md)。日志在主动分享前保留于本地 |
| 安装命令行入口 | **General → Install command**；见 [CLI 参考](../reference/cli.md)。使用桌面界面不需要安装此命令 |
| 管理数据位置或归档工作 | [存储与归档](storage.md) |

<span id="验证范围" />

## 操作系统中的通知设置

通知送达还取决于操作系统权限、专注模式及屏幕共享设置。请在实际使用的设备上按上表检查。


源码：[General 设置](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/GeneralPanel.tsx)。
