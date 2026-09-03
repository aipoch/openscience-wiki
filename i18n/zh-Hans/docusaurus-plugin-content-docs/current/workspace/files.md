---
sidebar_position: 3
title: 附件与项目文件
---

# 附件与项目文件

项目文件分为 `Your uploads` 与 `Generated files`。上传文件由用户引入；生成文件绑定到产生它的 session、消息与 artifact version。

## 上传附件

1. 点击 Composer 左下角 `+` → `Attach files`。
2. 在系统选择器中选一个或多个文件。
3. 等待每个 attachment chip 完成；传输中不要发送。
4. 点击 chip 可预览，移除按钮仅从本次 Composer 取消引用。
5. 输入请求并发送；发送后的 attachment 固化在该消息中。

![已暂存五个科研附件](/img/open-science/composer-attachments.png)

若模型不支持图片，图片附件会被拒绝并提示换用支持 Images 的模型；这不会影响已经成功上传的非图片文件。重复文件会按项目文件策略识别，显示名与存储标识并不等同。

`Your files` 用于引用已存在文件，不再上传副本。使用 `@` 提及文件可把明确的 artifact/文件引用插入文本，适合描述“用哪个版本做什么”。

## Files 面板

![分栏文件面板](/img/open-science/project-files-grid-split.png)

| 控件 | 行为 |
| --- | --- |
| `Filter project files` | 在 All/Artifacts 等范围间过滤 |
| `Search project files` | 按文件名搜索当前项目 |
| `Grid view` / `List view` | 切换卡片缩略图或紧凑列表 |
| `Expand files` | 文件面板全屏；`Exit full screen files` 返回分栏 |
| 分类标题 | 展开/折叠 Your uploads 或某个 session 的 Generated files |
| 文件主体 | 打开模态预览 |
| `Download` | 保存该文件；浏览器入口使用下载流程 |
| `Open … in split view` | 在右侧标签中打开，保持对话可见 |
| `No more` | 当前分类已加载完，不是错误 |

![全屏网格](/img/open-science/project-files-grid.png)
![全屏列表](/img/open-science/project-files-list.png)

右侧 Open previews 使用标签管理多个预览：点击标签切换，`Close preview` 关闭单个文件，边缘按钮折叠整个面板。文件预览与 Files 标签的状态会在合理范围内保留。

## 下载与追踪

Generated file 的文件操作菜单可出现 `Provenance`；普通 upload 没有生成链，因此不会伪造 provenance。下载整个项目/会话 artifact 的对话框会让你选择范围并生成可保存的数据包。移动、删除本地下载不会反向修改 Open Science 受管理的项目文件。
