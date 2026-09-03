---
sidebar_position: 5
title: Notebook 与 Provenance
---

# Notebook 与 Provenance

Session Notebook 汇总代理实际运行的 Python、R 与 shell 单元；Provenance 以 artifact version 为中心，串联生产代码、执行日志、消息、环境和复核证据。

## 打开 Session Notebook

Session `…` → `View notebook`。

![Session Notebook](/img/open-science/session-notebook.png)

| 控件 | 行为 |
| --- | --- |
| `Agent` 下拉 | 在 Main Agent 与 subagent 的运行间过滤 |
| `Python` / `R` / `Bash` 标签 | 标签数字是该语言/类型的 run 数量 |
| 单元标题 `[0]` | 表示执行顺序与工具类型 |
| `Copy to clipboard` | 复制输入代码/命令 |
| `Hide/Show output` | 折叠或展开 stdout、结果、图像与错误 |
| `.ipynb` | 有可转换 Notebook cell 时下载 Jupyter 文件；只有 shell 时可能禁用 |
| `Close` | 关闭对话框，不终止 agent 或删除 runs |

输入数据条会标注运行引用的文件；figure/output 与 notebook run 关联。安装包后应重启 kernel，避免旧进程仍使用过期环境。

## 生成 artifact

代理产生文件后，assistant 消息出现 `GENERATED · n` 与文件卡片。点击打开；Generated files 也会按 session 分组出现在 Files 面板。

![生成 artifact 的消息](/img/open-science/provenance-artifact-response.png)
![生成文件预览](/img/open-science/generated-artifact-preview.png)

## 打开 Provenance

文件预览 → `File actions` → `Provenance`。

![文件操作菜单](/img/open-science/artifact-actions-menu.png)

### Code

![Provenance Code](/img/open-science/provenance-code.png)

显示 Captured producer block。`Download` 保存代码，`Copy to clipboard` 复制，`Generate script` 可用当前 Provider/model 从不可变 Execution Log 生成独立脚本；生成脚本是新的派生结果，不能替代原始证据。

### Execution Log

![Execution Log](/img/open-science/provenance-execution-log.png)

按顺序显示实际工具、输入、输出、状态与时间，是复现“执行了什么”的主要证据。不要只从最终文件反推流程。

### Messages

![Provenance Messages](/img/open-science/provenance-messages.png)

显示与该版本产生相关的用户/assistant 消息，帮助解释意图、约束和决策。

### Environment

![Provenance Environment](/img/open-science/provenance-environment.png)

显示运行环境信息与捕获到的依赖/上下文。用于发现 Python/R 版本、包或运行位置差异。

### Review

![Provenance Review](/img/open-science/provenance-review.png)

显示 reviewer 状态与审查材料。`Review` 不等于证明结论正确；它记录何种检查在何时对哪个版本执行。

顶部 `Previous/Next Artifact version` 和 `vN` 在不可变版本间导航，`Close Provenance` 返回文件预览。每个版本独立保留证据链。
