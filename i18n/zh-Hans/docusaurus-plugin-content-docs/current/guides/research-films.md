---
title: "制作与分享研究影片"
last_update:
  date: '2026-11-09'
---

# 制作与分享研究影片

把已完成的会话变成带旁白的短片，用于组会演示或项目交接。Open-Science 根据会话的冻结记录编排影片，并在本地生成英文旁白；影片编写仍使用你配置的模型。影片解释已有工作，不会重新执行分析，也不代表结论已经得到验证。

## 准备会话与旁白 {/* #prepare-film */}

1. 使用**桌面应用**，打开准备展示的会话和分支，先等待当前回答结束。空会话或仍在等待回答的会话不能生成影片。
2. 核对已记录的输入、结果和限制。开始前检查准备分享的来源并处理敏感内容；生成后还要单独检查影片，再决定是否分发。
3. 在 **Settings → Model** 确认兼容的 Main 模型及有效凭据。现有 Codex 订阅可以继续搭配 Codex 运行时使用。
4. 打开 **Local capabilities → Research narration → Install**，等待显示 **Installed**。这些资源提供英文语音，后续影片可重复使用。如果尚未安装，影片对话框也会提供 **Install and generate**。

安装后的语音引擎在本地运行，但影片编写会调用所选模型提供方。生成期间保持电脑运行，并为媒体文件留出足够存储空间。

## 生成并播放 {/* #generate-film */}

1. 打开 **Session actions → Generate research film**。回放中也可以从 **More actions** 找到该操作。
2. 阅读准备提示。模型、凭据或旁白资源缺失时，先解决对应要求再重试。旁白已就绪时，点击该操作会开始生成。
3. 查看编写及媒体生成阶段。可以关闭对话框让任务继续，再通过 **View generation progress** 返回。**Cancel** 停止影片任务，不会停止或删除原会话。
4. 出现 **Research film ready** 后，检查标题和时长，选择 **Play research film**。
5. 完整播放一次，对照源会话检查数值、单位、解释、画面、旁白与限制说明，尤其确认假设案例和初步结果仍被准确标明。

<p className="example-label"><strong>案例演示</strong> 解释五个数的教学示例</p>

用 Codex 新建会话并发送：

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

已完成的回答给出均值和中位数均为 **6**，并说明没有定义真实总体，也没有抽样设计。先核对这两点，再选择 **Generate research film**。这是教学示例，不是实证研究。

![根据已完成的教学会话生成研究影片](/img/open-science/v120/film-progress.webp)

![已生成的英文旁白影片与播放入口](/img/open-science/v120/film-ready.webp)

## 导出检查后的影片 {/* #export-film */}

在预览区打开生成的播放器，通过 **More actions → Download** 保存可在浏览器中播放的便携 HTML 播放器。需要视频文件时，在渲染预览中选择 **Export MP4**；如提示缺少导出组件，选择 **Install and export**，再通过桌面保存对话框选择目的地。旁白资源与 MP4 导出组件是两次独立下载。

等待导出结束，然后在 Open-Science 之外重新打开保存的文件，检查画面、声音、字幕和结尾。取消保存对话框不会产生导出文件。如果接收者需要检查底层证据，保留原会话或 [`.science` 研究包](research-packages.md)；单独的 MP4 用于演示。

![研究影片播放器与 MP4 导出控件](/img/open-science/v120/film-player.webp)

## 重新生成或恢复 {/* #film-recovery */}

- 提示选择模型或检查凭据时，先在 **Settings → Model** 修复对应要求，再回到会话。
- 旁白下载失败时，选择 **Retry**，等待 **Installed** 后再生成。
- 会话改变或影片需要再尝试时，使用 **View research film → Generate again** 并确认。重新生成可能需要数分钟，也会再次使用模型额度。
- 只有准备删除当前分支的本地影片文件时，才选择影片对话框里的 **More actions → Delete research film**。确认框会说明原会话和另行保存的副本将保留。

查看已记录的步骤见[会话回放](session-replay.md)，单独执行验证见[可复现性](reproducibility.md)。
