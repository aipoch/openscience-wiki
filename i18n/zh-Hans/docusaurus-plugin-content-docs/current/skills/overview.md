---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills

Skill 为 Agent 提供可重复使用的方法，包括适用条件、输入要求、操作步骤和结果检查。Open-Science 会在需要时加载这些指引。安装 Skill 不会同时安装指引中提到的科学软件。

可以通过 [Skill 市场](marketplace.md)寻找更多方法，使用前检查输入和依赖。

## 选择合适的能力

| 需要完成的事情 | 使用什么 | 例子 |
| --- | --- | --- |
| 获取数据或执行代码 | [工具](../tools/overview.md) | 查询 GEO 元数据、运行 Python |
| 按固定方法组织操作 | Skill | 校验原始基因计数矩阵 |
| 使用带独立指令和能力范围的角色 | [Specialist](../specialists/overview.md) | 单独检查样本 QC 表 |

通过 [Skill 目录](./directory.md) 查找方法，或从[场景配方](./recipes.md)选择。

## 查找并检查 Skill

1. 打开 **Settings → Skills**。
2. 在 **Search skills** 搜索名称或描述。[创建示例](./create.md)后可输入 `rnaseq-count-qc`。
3. 使用 **Filter skills by source**、**Filter Skills by agent** 和 **Filter by Tag** 缩小范围。
4. 打开结果，阅读描述、指令、**Files**、许可证和 **Availability**。显示名称可能与包 ID 不同。
5. 返回列表查看 **Used by**。这里表示哪些 Agent 可以使用，并非已完成运行次数。

![搜索已保存的 RNA-seq Skill](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| 控件 | 实际作用 |
| --- | --- |
| Featured / Imported / Personal 分组标题 | 展开来源分组。分别为应用内置、导入和本地创建 |
| Main Agent 开关 / 行开关 | 改变可由用户控制的 Skill 的可用性；应用必需 Skill 保持启用，包文件保留 |
| Used by | 查看 Main Agent 与 Specialist 的可用性；使用资源的 **Manage access** 调整 Main Agent 和 Specialist 关联 |
| Manage Tags / 移除标签 | 整理资源，不改变执行权限 |
| Add skill | 通过对话创建、直接编写、本地上传、GitHub 导入或扫描已安装目录 |
| 对话 **+ → Save as skill** | 从已完成的当前分支提炼可复用方法，见[创建步骤与不可用原因](./create.md) |
| Manage | 批量管理 Personal 和 Imported 包 |
| Conversation imports → Skill packages | 允许 Agent 识别附件中的 ZIP/`.skill` 并请求导入批准；仅上传附件不会安装 |

### 为什么有些开关不能关闭

**Environment & Packages、Compute Environment Setup、Remote Compute (SSH)、Customize** 支撑核心功能，保持启用。其开关选中且不可操作，悬停或聚焦提示可读到 **This built-in Skill supports core application features and is always enabled.**

启用规则不会自动安装依赖、提供凭据或授权操作。Specialist 分配是独立范围，应检查 **Used by** 和角色能力列表。

公开目录仍有 23 个内置 Skills，内部支持 Skill 不作为额外方法供选择。[必需开关实现](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx)。

下图展示 **Customize** 的原因提示。关闭其他可选方法时，这些必需 Skill 仍保持启用。

![Customize 固定启用及原因提示](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

逐代理访问弹窗及其只读绑定，见[资源访问](../guides/connectors.md#resource-access)。

## 在对话中使用

<p className="example-label"><strong>示例</strong> 请求 rnaseq-count-qc 执行检查</p>

同时说明输入、Skill、交付物和约束。例如：

> Use the rnaseq-count-qc Skill on the attached GSE60450 raw-count matrix. Keep EntrezGeneID and Length as metadata. Validate dimensions and nonnegative integer counts, preserve the original sample IDs, and save a separate methods report with before/after input SHA-256. Use the existing Python Notebook.

出现授权请求时，检查完整指令与操作。执行后重新打开报告和 Notebook 记录，按[示例数据](../reference/example-data.md)核对。后续 Specialist 检查是另一项操作；仅在提示词中提及角色不代表已发生委派。

### 指令与 Notebook 函数的区别

示例 `rnaseq-count-qc` 只有指令和一个参考文件，**没有注册 Notebook 函数**。Agent 阅读方法后编写普通 Python 或 R。

部分内置 Skill 提供内核函数，其指引会列出函数名和对应 `kernelSkillIds`。不要把所有已安装 Skill ID 都填入该字段。加载 Skill 也不会自动授予文件、网络或工具权限。

找不到 Skill 时，依次检查来源筛选、启用状态和 Agent 分配。指令已加载但计算失败时，参见[科学工具](../tools/scientific.md)检查运行环境或输入，而不是反复重新安装 Skill。

实现依据: [SkillsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [SkillDetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx)。
