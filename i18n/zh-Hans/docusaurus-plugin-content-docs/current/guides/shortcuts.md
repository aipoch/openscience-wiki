---
title: "键盘快捷键"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# 键盘快捷键

键盘操作取决于焦点。同一个按键在输入框中编辑文字，在列表中导航，在预览标签上可能关闭视图。任务运行时先确认焦点与界面提示。

<PlatformGuide />

## 搜索和导航

| 操作 | macOS | Windows/Linux | 焦点与结果 |
| --- | --- | --- | --- |
| 应用搜索 | ⌘K | Ctrl+K | 搜索项目、会话、消息、文件和文献，详见[搜索范围](navigation.md) |
| 搜索设置 | ⌘K | Ctrl+K | 设置窗口打开时聚焦顶部搜索，参阅[设置中心总览](../settings/overview.md) |
| 移动搜索选择 | 上/下 | 上/下 | 命令面板移动高亮 |
| 首个/末个结果 | Home / End | Home / End | 搜索面板处理的结果导航 |
| 打开选择 | Enter | Enter | 查看结果详情，再打开匹配的消息、文件或记录 |
| 关闭搜索/菜单 | Esc | Esc | 关闭当前浮层；未保存表单可能另有确认 |
| 移动焦点 | Tab / Shift+Tab | Tab / Shift+Tab | 前后移动到可用控件 |

按 ⌘K 或 Ctrl+K，输入短语、标题或文件名。选择结果，在详情面板核对上下文，再打开匹配内容。查找文件的来源时，使用来源消息入口。筛选方法与搜索范围见[导航](navigation.md)；文档 Search 搜索的是文档正文。

## 输入请求与引用

| 输入 | 位置 | 继续前检查 |
| --- | --- | --- |
| `@` | Composer | 选择实际文件/产物/文献建议，纯文字不自动绑定文件 |
| `/` | Composer | 选择可用 Skill，出现条目不证明运行前提完备 |
| `#` | Composer | 选择目标会话历史引用 |
| 上/下 | 空 Composer 开头 | 检查恢复的历史请求与附件再发送 |
| ⌘Z / Ctrl+Z | 当前文字编辑器 | 撤销该编辑器处理的草稿修改 |
| ⌘Shift+Z / Ctrl+Shift+Z | Composer | 支持时重做草稿修改 |
| 界面显示的发送快捷键 | Composer | 会提交请求；多行草稿不确定时直接点 Send |

<PlatformContent platform="windows">

在 Windows 桌面应用中，先点击 Composer 草稿区域，再用 **Ctrl+Z** 撤销、**Ctrl+Shift+Z** 重做。确认文字变化后，再继续输入或发送。使用 **Tab / Shift+Tab** 时，查看当前控件的焦点边框，下图以附件按钮为例。打开面板或改变控件状态后应重新确认焦点，不要按固定次数推算位置。

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="Windows 输入框中的附件按钮显示键盘焦点边框"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="打开显示附件按钮焦点的完整 Windows 截图"
/>

局部图展示附件按钮的焦点边框与提示文字。点击图片可查看完整截图。

</PlatformContent>

普通文字撤销不能恢复已删除产物或撤销已执行代码。出现的归档 Undo 提示属于另一类操作。提示消失后，可在[归档](storage.md)中恢复保留工作。

## 预览和队列

先聚焦预览标签，再用 **左/右** 切换、**Home/End** 跳到首末标签。聚焦标签时 **Delete/Backspace** 关闭标签，不删除源文件；聚焦可编辑报告时它们会删文字。不确定焦点时使用可见关闭按钮。

队列中聚焦排序手柄，用 **上/下** 将消息移动一位，发送前检查顺序。它与搜索导航、输入历史是不同操作。队列编辑、移除和延后发送见[对话](composer.md)。

### 调整宽度并保留打开的文件

拖动预览旁的分隔线调整宽度。**Collapse preview panel** 隐藏面板，**Expand preview panel** 恢复原有标签。折叠与展开后，原有标签保留。标签取得焦点后，Home/End 跳转首尾，右方向键切换，Delete 关闭当前标签；文件仍保留在 Files 中。队列排序则需要先按空格提起，再用上下键移动，最后按空格放下。

聚焦 **Side Chat** 标签时，关闭会出现确认；确认后停止该旁聊并删除其保存的对话。要保留它，选择 **Cancel** 或收起预览区，参阅 [Side Chat](delegation.md)。

## 按键无响应时

检查焦点所属字段/对话框，关闭无关浮层，尝试可见按钮。部分 macOS 键盘的 Home/End 需要 Fn 组合。系统或浏览器可能先拦截快捷键，因此桌面端与浏览器入口未必完全一致。

按当前设备显示的按键提示操作。若系统拦截了快捷键，使用对应按钮，并记录系统版本与当时焦点。

源码：[全局搜索](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx)、[预览标签](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx)、[队列](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx)。

## 搜索当前设置面板 {/* #local-settings-search */}

在 Settings 中，**⌘K**（macOS）或 **Ctrl+K**（Windows/Linux）聚焦页头的设置搜索。**⌘⌥K** 或 **Ctrl+Alt+K** 聚焦当前面板或对话框内可用的局部搜索框。局部快捷键需要当前存在可用搜索框，不会打开应用全局搜索或 PDF 正文搜索。
