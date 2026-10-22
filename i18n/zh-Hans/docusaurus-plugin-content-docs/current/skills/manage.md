---
title: "管理与验证 Skills"
last_update:
  date: '2026-10-22'
---

# 管理与验证 Skills

从本地文件或 GitHub 导入方法，导出副本并维护已安装的 Skill。需要保留当前方法版本时，先导出副本。

批量管理时，先在底部操作区核对选中数量，再执行操作。在同一位置阅读完成或失败反馈，并检查条目的最终状态；仅选中条目不会启用、安装或删除它。

## 从市场安装 {/* #marketplace */}

浏览目录、安装和更新市场方法，见 [Skill 市场](marketplace.md)。本页介绍本地与 GitHub 导入、导出和已安装 Skill 的维护。

## 本地导出与导入

<p className="example-label"><strong>示例</strong> 导出并重新导入 RNA-seq Skill</p>

1. 在 **Settings → Skills** 找到 `rnaseq-count-qc`，选择 **Actions → Export** 保存 ZIP。
2. 点击 **Add skill → Upload skills → Upload skill files**，选择刚导出的包。
3. 在 **Confirm import** 检查文件名与诊断；候选项默认未勾选。
4. 打开 **Preview rnaseq-count-qc**，阅读 SKILL.md 与文件列表。实际导出保留了 `references/sample-metric-schema.md`。
5. 关闭预览，勾选候选，点击 **Import selected (1)**。
6. 搜索导入结果，检查最终名称和来源。

![导入前检查完整包](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

本例中，回导时原 Personal 包已存在，预览显示 **Name exists**，导入产生了独立的 **Imported `rnaseq-count-qc-2`**。原包与 Specialist 绑定仍保留。不能认为每次导入都在更新原包，应检查来源与更新/替换诊断。

![导入副本与原 Personal Skill](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| 控件 | 作用 |
| --- | --- |
| Select all / Invert / 单项勾选 | 选择待导入包，一个归档可以包含多个 Skill |
| Preview / Close preview | 安装前检查指令与文件 |
| Name exists / 诊断 | 提示名称或内容问题；导入后核对最终名称 |
| Choose different files | 重新选择文件 |
| Import selected | 执行导入并统计成功、未改变与失败项 |

Markdown 文件需要 YAML `name` 和 `description`，ZIP/`.skill` 需要包含 SKILL.md。上传不会自动下载指令中链接的支持文件。格式、元数据、大小和不安全路径检查失败时，应修复包。

## 导入本机已安装的 Skill

<p className="example-label"><strong>示例</strong> 导入本机 peer-review 包</p>

**Add skill → Import installed skills** 扫描 `~/.agents/skills` 和 `~/.codex/skills`。候选列表可能默认全部选中。先取消 **Select all installed skills**，再选择具体方法；使用 **Invert** 前应先核对当前选择。

1. 打开 **Preview peer-review**，查看来源目录、说明及引用文件。
2. 点击 **Close preview**，只选 `peer-review`，再点击 **Import selected (1)**。
3. 等待 **Imported 1 skill**，候选随后标为 **Imported**，不能再次按同一来源勾选导入。
4. 返回 Skills 搜索 `peer-review`，检查 Imported 行。来源目录保留，Open-Science 使用导入副本。
5. 本地安装目录变化后点击 **Rescan**，重新核对来源、选择和状态。

![预览本机安装的 peer-review 包](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![在 Skills 列表确认导入结果](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

导入后在 Skill 详情中检查模板与引用文件。使用来自其他助手的方法前，确认它依赖的工具和运行能力在当前会话可用。

## 从 GitHub 导入和更新

<p className="example-label"><strong>示例</strong> 导入并更新 ESM-2 Skill</p>

1. 选择 **Add skill → Import from GitHub**，输入关键词、`owner/repo`、`owner/repo@ref` 或 GitHub URL，点击 **Find skills**。复现已发布包时使用固定 ref。
2. 核对仓库和候选数量。扫描结果默认勾选全部候选，应先取消 **Select all**，再只选需要的方法；这与默认未勾选的 ZIP 确认页不同。
3. 打开 **Preview**，检查解析后的 commit、目录、说明和文件。仓库扫描也可能发现内部 Skill 目录，候选数量不等于应用内置 Skill 数量。
4. 关闭预览，勾选目标，点击 **Import selected (1)**，等待结果并检查 **Imported skills** 中的最终名称。
5. 返回 Skills，搜索该名称，核对来源和可用状态后再使用。

![导入前检查 GitHub Skill 和固定来源](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

从产品仓库导入 `fair-esm2` 时，因内置名称已存在，应用创建 **`fair-esm2-2`**，原内置包保留。导入说明不会安装模型权重，也不能证明推理已经通过。

### 应用上游修订

使用目标新 ref 再次扫描同一仓库，已有候选可以显示 **Update available**。仅选择该候选导入，然后检查已有导入行及预览。例如，更新已有 ESM-2 副本后，再扫描相同 ref 应显示 **Imported**。核对更新后正文与所选 ref 的内容；导入器会重写 frontmatter 及避让重名后的名称，因此整个文件不一定与原 SKILL.md 字节一致。

![已有导入副本发现上游更新](/img/open-science/local-todo-batch/16-github-update-available.webp)

### 处理 GitHub 限流

遇到 **GitHub request was rate-limited**，打开 **Manage GitHub credential**，输入可用 token 并 **Verify and save**。显示 **Token verified and saved** 后重试扫描。**Cancel** 不保存退出；截图和问题报告中不要包含 token。

## 启用、禁用与删除

进入 **Manage**，按来源、状态筛选并搜索具体方法，先勾选再执行。**Selected (n)** 查看选择范围，**Clear selection** 清空选择；改变筛选后仍需检查完整选择集。

![批量管理中已禁用的导入副本](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

实操完成了副本禁用、重新启用和删除，原 Skill 保留。

| 操作 | 预期结果 |
| --- | --- |
| Enable selected | 恢复可用性，检查行状态 |
| Disable selected | 保留可由用户控制的包，取消其后续 Main Agent 请求可用性；应用必需 Skills 不能禁用 |
| Delete selected | 显示准确名称及可删除检查结果 |
| Delete n Skills | 确认后移除本地包；没有 Skill 回收站恢复流程 |
| Cancel | 保留安装内容 |

Featured 和被 Specialist 引用的包可能受到删除保护。按需移除过时绑定，或禁用可由用户控制的包。应用必需 Skills 保持启用，见[启用规则](overview.md#为什么有些开关不能关闭)。删除后检查筛选列表中已无目标包。

## 更新与排错

| 现象 | 检查及处理 |
| --- | --- |
| 导入后找不到 | 清除来源、Agent、标签筛选，搜索带后缀的最终名称 |
| 支持文件缺失 | 检查包列表并重新导出；单独 Markdown 不会自动包含其他文件 |
| 编辑版本冲突 | 重新读取最新版本，对比后再保存 |
| 指令能加载但函数不可用 | 确认包是否提供内核函数；普通指令不是 Notebook 函数 |
| 缺少包或运行环境 | 参见[科学工具](../tools/scientific.md)，使用选定运行环境的包管理 |
| GitHub 或认证错误 | 保留 HTTP 状态与脱敏 URL，参见[故障排除](../guides/troubleshooting.md) |

实现依据: [SkillUploadView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [SkillBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [SkillImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx)。

## 导入和编辑 Skill {/* #import-batches */}

大量已安装 Skill 会分批导入。等待最终结果并检查导入列表后，再决定是否重试。外部 Skill 的名称若使用保留前缀，会获得安全的本地名称；以本地目录显示的名称为准。编辑正文并保存后，检查单独编辑的名称与说明是否仍正确。当前消息附带的图片也可参与 Skill 选择；使用前确认所选 Skill 的范围。
