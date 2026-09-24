---
title: "控件与键盘参考"
last_update:
  date: '2026-09-24'
---

# 控件与键盘参考

本索引用于找到控件的主要说明，将字段限制和快捷键集中查询，避免重复完整教程。标签对应英文界面。

## 按任务查控件

| 需要做什么 | 入口或控件 | 详细行为 |
| --- | --- | --- |
| 创建或描述项目 | **New project**、项目菜单 → **Project settings** | [项目字段](../guides/projects.md) |
| 保存私人阅读备注 | 选区 → **For me → Bookmark**，输入框 **Bookmarks** | [阅读书签](../guides/bookmarks.md) |
| 配置模型连接 | **Settings → Model** | [模型接入](../guides/providers.md) |
| 附加来源、发送或排队 | 输入框 **+**、附件标签、**Send**、队列控件 | [对话与排队请求](../guides/composer.md) |
| 检查运行时和包 | **Settings → Runtimes**、解释器和 Packages 控件 | [Python 和 R 运行时](../guides/runtimes.md) |
| 检查计算和变量 | **View notebook**、**Variables**、产物 **Provenance** | [Notebook 与执行证据](../guides/notebook.md) |
| 授权或撤销 | 权限卡、**Settings → Permissions** | [权限与审批](../guides/approval-modes.md) |
| 排查包连接 | **Settings → Network** | [域名、代理和镜像](../guides/network.md) |
| 配置远程计算 | **Settings → Compute → Add SSH host** | [SSH 和 Slurm 设置](../guides/remote-compute.md) |
| 核实研究输出 | 生成文件卡片、预览、**Provenance** | [公开数据分析](../workflows/data-quality.md) |
| 查询限制 | 文件格式或配置字段 | [文件限制](formats.md)、[配置](configuration.md)、[包格式](packages.md) |

[完整控件索引](control-index.md)按应用页面列出控件；本页按常用任务和快捷键组织。两者均指向相同的详细教程。

## 快捷键参考

| 操作 | macOS | Windows/Linux | 条件与范围 |
| --- | --- | --- | --- |
| 应用搜索 | `⌘K` | `Ctrl+K` | Home／工作区搜索；Settings 打开时聚焦设置顶部搜索 |
| 设置 | `⌘,` | `Ctrl+,` | 当前覆盖层允许时打开 Settings |
| 新会话 | `⌘N` | `Ctrl+N` | 工作区已有包含消息的会话时可用；阻塞对话框打开时忽略 |
| 切换侧栏 | `⌘B` | `Ctrl+B` | 工作区中切换窄屏抽屉或桌面侧栏 |
| 发送输入文本 | `Enter` | `Enter` | 发送可用时；引用选择器打开时由其处理 Enter，输入法组字时不提交 |
| 换行 | `Shift+Enter` | `Shift+Enter` | 输入框文本 |
| 上／下一条提示草稿 | `↑` / `↓` | `↑` / `↓` | 光标在开头且没有选区时开始浏览；引用选择器优先 |
| 撤销草稿 | `⌘Z` | `Ctrl+Z` | 输入框草稿历史 |
| 重做草稿 | `⌘Shift+Z` | `Ctrl+Shift+Z` | 输入框草稿历史 |
| 关闭当前界面层 | `⌘W` | `Ctrl+W` | 桌面应用依次处理适用的临时预览、预览标签／面板、窗口；浏览器入口可能由浏览器处理 |
| 关闭覆盖层 | `Esc` | `Esc` | 在支持的位置使用；保存中或阻塞确认可能改变关闭行为 |

不要以为连续按关闭快捷键只会隐藏文件。预览关闭后，下一次可能关闭应用窗口。窗口关闭与进程退出是两个不同的平台相关行为。

关闭 Side Chat 标签需要确认，确认后会停止并删除该旁聊；文件预览的关闭不会删除文件。参阅 [Side Chat](../guides/delegation.md)。

## 输入框引用触发符

| 触发符 | 选择内容 | 发送前检查 |
| --- | --- | --- |
| `/` | 已启用 Skill | 方法是否正确，依赖是否满足 |
| `@` | 可用文件／产物或文献条目／范围 | 来源及界面显示的版本是否正确 |
| `#` | 会话引用 | 是否为预期对话 |

选择建议项后会插入结构化引用。只输入一个文件名或 Skill 名称，不能证明相应引用已经附加，应检查插入的标签和请求。

## 搜索范围

应用全局搜索覆盖项目、会话、消息正文、上传/生成文件、文献库条目和集合，以及支持的上传文件中已建立索引的内容。生成文件按名称搜索，未建立索引的内容不会被搜索。选择类别缩小结果范围，核对结果上下文后再打开。这不表示所有 PDF、图片和其他二进制文件都已建立全文索引。完整操作见[导航与搜索](../guides/navigation.md)。

Wiki 的 Search 是另一套搜索，索引当前语言文档的标题、章节和正文。即使应用会话标题没有“Inbox”，该词仍可能命中文档中的一段正文。

技术参考：[应用快捷键](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useApplicationEventBindings.ts) · [输入框键盘处理](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/composer/ComposerEditor.tsx) · [关闭行为](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/hooks/useCloseActivePaneShortcut.ts) · [全局搜索](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx).

设置面板或对话框内的局部搜索使用 macOS 的 **⌘⌥K**、Windows/Linux 的 **Ctrl+Alt+K**；**⌘K / Ctrl+K** 仍聚焦 Settings 页头搜索。见[快捷键范围](../guides/shortcuts.md#local-settings-search)。
