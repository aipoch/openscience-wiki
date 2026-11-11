---
title: "创建 Skill 与支持文件"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 创建 Skill 与支持文件

使用[公开示例输入](../reference/example-data.md)，把重复执行的 RNA-seq 检查整理为可复用方法。该方法检查原始计数，不执行差异表达检验。

本页两条路线使用各自独立的包名：

| 创建路线 | 保存的 Skill ID | 新会话复用 |
| --- | --- | --- |
| 已完成对话中的 **Save as skill** | `rnaseq-descriptive-qc` | 选择发布后的同名 Personal Skill |
| 下方手动包路线 | `rnaseq-count-qc` | 选择手动创建、ID 完全一致的 Skill |

任选一条路线完成发布、搜索和复用，后续调用自己实际保存的名称。两个 ID 不是别名；若修改包名，后续请求也应使用保存后的新名称。

## 选择创建入口

| 你现在有什么 | 使用入口 | 接下来会发生什么 |
| --- | --- | --- |
| 已完成的对话中有值得复用的操作流程 | 对话 **+ → Save as skill** | 代理提炼当前分支，通过 Customize / Skill Creator 整理为可复用的包 |
| 想通过对话描述一个新方法 | 设置 **Add skill → Chat with agent**，或 **Customize** | 与代理协作起草方法，检查后再发布 |
| 已有完整说明和支持文件 | 设置 **Add skill → Write from scratch** | 使用下方编辑器直接填写 |
| 已有 Skill 包或仓库 | **Upload skills / Import from GitHub / Import installed skills** | 检查并导入已有资源，见[管理 Skills](./manage.md) |

## Save as skill：把已完成的对话整理成方法

适合在一套流程已经实际跑通后使用，例如检查 RNA-seq 原始计数矩阵、保留标识符、计算样本指标并重新打开结果。**Save as skill** 读取的是**当前对话分支**，包括目标、使用的工具、关键步骤和用户修正，要求代理提炼可复用的方法，而非逐字保存聊天记录。如果当前分支没有已经明确、值得重复执行的流程，代理可以说明原因并停止，不创建 Skill。

1. 打开相应对话，切换到包含目标流程的分支。
2. 等待当前回复和子代理任务完成。处理未完成的授权、被中断的轮次或会话错误；分支最后必须是一条已完成的 Agent 回复。
3. 打开输入框旁的 **+ 菜单 → Save as skill**。按钮不可用时，悬停查看具体原因。
4. 运行期间菜单显示 **Saving as skill…**。它会在对话中启动模型辅助整理，不会直接打开手工 Name/Description 编辑器，也不是点击后立即导出 ZIP。
5. 检查代理提出的名称、触发描述、步骤、支持文件和校验结果。如果出现澄清问题或操作授权，按实际内容处理。**Customize** 始终启用，当前角色仍需具备相应能力访问范围。
6. 审阅草稿，再确认发布。移除固定研究路径、临时 ID、密钥及没有证据的结论，保留可复用的输入要求和检查规则。替换已有 Personal Skill 必须另行明确决定。
7. 发布后进入 **Resource center → Skills**，搜索实际返回的名称，检查 **Files**、已保存的 SKILL.md 及 Main Agent 可用性。需要核对完整包时再导出。
8. 用新请求测试保存后的 Skill。保存成功不等于已验证第二份数据，也不等于下一次调用必然成功。

### 保存研究方法

<p className="example-label"><strong>案例演示</strong> 把 RNA-seq 方法保存为 Skill</p>

在新会话完成 GSE60450 QC 后，点击 **+ → Save as skill**，要求创建独立的 **rnaseq-descriptive-qc**，保留已有包。应用原生流程创建了只含一个 **SKILL.md** 的草稿，校验结果无错误、无警告。

![原生 Skill 草稿及校验结果](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

检查名称、触发条件、输入要求、指标定义与停止条件，再确认发布到 Personal Skills。发布后通过 **Resource center → Skills → Search skills** 搜索名称，打开说明，核对 **Availability** 与 **Files**。该示例的文件可下载为 <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.md</ExampleDownload>。

![原生发布后在 Personal 中找到 Skill](/img/open-science/v0.27.0/17-native-skill-published.webp)

![打开已发布的说明与可用范围](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### 按钮为什么不可用

提示显示的是当前首先遇到的阻断条件，处理后可能出现下一个条件。**Wait for the current agent activity to finish.** 不只表示正在运行：会话处于非空闲状态（包括错误状态）也可能出现它，因此不一定靠等待就能恢复。先检查对话中的报错横幅和待处理交互。若回复中断，使用应用提供的恢复操作处理当前轮次，完成后再保存方法。

| 完整英文提示 | 应检查或处理的内容 |
| --- | --- |
| Open a conversation before saving it as a Skill. | 先打开包含目标流程的对话 |
| The Customize Skill is unavailable to the active Specialist. | 检查当前角色的能力访问范围。Customize 保持全局启用，这条提示针对当前 Specialist |
| Wait for conversation history to finish loading. | 等待当前分支历史加载完成 |
| Close Side chat before saving this conversation as a Skill. | 先保留有用建议；确认[关闭 Side Chat](../guides/delegation.md) 会停止它并删除其保存的对话，再回到 Main |
| Wait for all subagents to finish. | 检查尚未结束的子任务及其授权请求 |
| Save as skill is running. | 查看已启动的创建过程，不重复发起 |
| Resolve the current Session operation first. | 先处理恢复、历史重放/上下文重置、修正循环或上下文压缩 |
| Wait for the current agent activity to finish. | 检查运行中任务、待处理交互，以及非空闲或错误状态 |
| Resolve the conversation branch synchronization error first. | 先解决界面显示的分支同步错误 |
| Conversation branch history is unavailable. | 重新打开实际可用的目标分支；若仍无法加载，保留具体错误 |
| Wait for a completed Agent response. | 分支必须以已完成的代理回复结尾，空分支或最后只有用户消息都不满足 |

恢复与待完成的会话操作仍可能阻止动作，应按当前提示处理，避免反复发起新的创建请求。可用条件与服务认证是不同层面。如果流程已启动，但模型请求失败，应按实际模型/服务错误处理，见[故障排除](../guides/troubleshooting.md)。

## Write from scratch：使用编辑器创建

已有方法说明和支持文件时，使用 **Write from scratch** 填写并发布 Skill。以下步骤以 `rnaseq-count-qc` 为例。

### 准备包文件

<p className="example-label"><strong>示例</strong> 创建 rnaseq-count-qc 方法包</p>

下载实际使用的 <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.md</ExampleDownload>、<ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">sample-metric-schema.md</ExampleDownload>，或<ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">应用导出的 ZIP</ExampleDownload>。

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

参考文件定义样本指标及解释范围。研究数据保留在项目里；Skill 保存复用规则，避免把私人数据放进可分享的包。

<span id="创建并保存" />

### 填写字段并发布

1. 打开 **Resource center → Skills → Add skill → Write from scratch**。
2. 将完整 SKILL.md 粘贴到 **Skill body**，YAML 元数据会填入 **Name** 与 **Description**。
3. 确认名称为 `rnaseq-count-qc`，检查正文；名称通过校验不代表分析方法正确。
4. 展开 **Advanced settings → Add reference files**，选择 `sample-metric-schema.md`，编辑器会将其放入 `references/`。
5. 检查参考文件数量与包大小，点击 **Publish**。
6. 搜索新的 Personal 条目，重新打开指令、可用性与文件，再导出检查两个包条目。

![RNA-seq Skill 指令与参考文件](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| 字段或按钮 | 填写和检查方式 |
| --- | --- |
| Name | 使用可识别的方法 ID；为空时提示 **Name is required.** |
| Description | 说明何时选择此方法，不能只写研究领域 |
| Write / Upload | 直接输入正文，或选择文件作为正文来源 |
| Skill body | 写明输入、检查、输出和停止条件 |
| Advanced settings | 展开支持文件和容量信息 |
| Add reference files | 添加结构定义、示例或脚本；正文引用路径必须与包一致 |
| 移除参考文件 | 删除草稿中的资源后，检查正文是否仍引用该路径 |
| Cancel / Back to skills | 离开编辑器；放弃草稿使用 Cancel |
| Publish / Saving… | 创建 Personal 包；等待完成后检查已保存条目 |

编辑器在 **128 MB** 包预算内最多允许 **16,383 个参考文件**。导入还需通过归档校验，详见[管理 Skills](./manage.md)。

## 让指令可以验收

示例要求保留完整基因和样本 ID，将 `EntrezGeneID`、`Length` 与计数分开，拒绝畸形行与缺失值，比较前后哈希，并规定四个样本指标和独立输出文件。这样才能发现错误或遗漏。

明确停止条件：源文件不可读或计数缺失时，应报告问题，而不是修改数据或偷偷更换分析方法。

<span id="验证保存后的-skill" />

## 验证与复用 Skill

手动创建 `rnaseq-count-qc` 后，使用 [Skills](./overview.md) 中的提示词。打开报告和 Notebook 记录，按[示例数据](../reference/example-data.md)核对输入、维度、指标定义与输出。

修改时从 Personal 条目的 **Actions → Edit** 进入，保存后发起新请求，与原结果比较。修改或禁用不会撤回当前运行轮次已经读取的指令。

也可以使用 **Add skill → Chat with agent** 或 **Customize** 协助起草。仍须检查拟保存内容并重新打开包；对话中描述了一个 Skill，不代表已经保存。

### 在新会话中复用已发布 Skill

1. 新建会话，附加原始公开 GSE60450 计数矩阵。
2. 指定使用 **rnaseq-descriptive-qc**，要求计算四项逐样本指标、保持输入不变，并生成 CSV 与简短报告。
3. 检查 Notebook 执行，打开两个生成文件，对照原始输入核验结果，不只依赖完成消息。

重新打开新 CSV 与报告，按完整样本标识与[公共基准](../reference/example-data.md)比较，并检查输入哈希。用于其他研究时，需要针对该研究的输入与实验设计重新核对。

![独立调用与重新打开的 QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

实现依据: [SkillEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [host-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts)。

Save as skill 实现依据: [availability](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [conversation distillation](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill Creator](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
