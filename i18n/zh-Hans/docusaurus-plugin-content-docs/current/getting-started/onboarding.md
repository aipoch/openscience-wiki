---
sidebar_position: 2
title: 首次引导
last_update:
  date: '2026-08-13'
---

# 首次引导

首次启动包含五步：Environment、Agent、Model、Notebook、Location。底部 `Back` 和主操作按钮负责移动步骤；只有当前步骤达到可继续条件时，主操作才可用。

## 1. Environment

![Environment 检查](/img/open-science/onboarding-01-environment.png)

页面检查 System、Storage、Secure vault 和 Install network。每一行显示状态与解释；若某项失败，按行内建议修复后重新检查。这里不会要求输入模型密钥。

## 2. Agent runtime

![Agent runtime 选择](/img/open-science/onboarding-02-agent-runtime.png)

每张卡代表一个 agent framework。已检测到的 runtime 显示版本并可设为 Active；未安装项提供 `Install`。选择 Active 会决定新会话由哪个后端驱动。后续可在 Settings → Agent 切换、修复、导入配置或卸载非活动 runtime。

## 3. Model provider

![空的 Provider 表单](/img/open-science/onboarding-03-model-provider-empty.png)

Provider 表单的主要字段如下：

| 输入/按钮 | 含义与操作 |
| --- | --- |
| `Provider type` | 选择内置 Provider 或 Custom；不同类型会改变后续字段 |
| `Provider name` | 自定义列表中显示的名称 |
| `Base URL` / `Endpoint` | Provider API 根地址或区域端点；不要填到具体模型路径之外 |
| `API format` | Custom Provider 可选 Chat Completions、Responses 等受支持格式 |
| `API key` | 只在本机安全存储；编辑时不会以明文重新显示 |
| `Model` | Provider 实际接受的模型标识，不是任意显示名 |
| `Context window` | 模型上下文上限；影响 Context 使用率和压缩阈值 |
| Images / Reasoning | 声明模型是否支持图片和推理强度；必须与后端能力一致 |
| `Test connection` | 保存前发起最小连接测试；成功不等于所有模型权限都可用 |
| `Add provider` / `Save` | 校验通过后写入 Provider 列表 |

![完成连接验证的 Provider](/img/open-science/onboarding-03-model-provider-configured.png)

:::warning
不要把 API key 写入项目描述、Agent Context、对话或截图。Provider 表单会遮蔽已保存密钥；GitHub token、Connector headers 同样按秘密处理。
:::

## 4. Notebook runtime

![Notebook runtime 设置](/img/open-science/onboarding-04-notebook-runtime.png)

Python 和 R 各自显示检测结果。`Add interpreter` 选择已有解释器，`Download and set up` 安装应用管理环境；语言开关决定 agent 是否可使用该 runtime，`Packages` 打开环境包管理。若暂时只做资料检索，可以先不启用 Notebook，之后在 Settings → Runtimes 补充。

## 5. Data location

![Data location 设置](/img/open-science/onboarding-05-data-location.png)

`Location` 输入/展示项目数据根目录，`Browse` 打开系统目录选择器，`Back` 返回 Notebook，`Finish` 写入设置并进入主页。确认目标磁盘有足够空间且会被备份；不要选择只读、短期挂载或自动清理目录。

## 重新配置

完成引导后不需要重新运行 wizard：Model、Agent、Runtimes、Storage 分别对应上述设置。若数据目录损坏或应用配置目录不可写，Settings → Storage 会显示修复入口。
