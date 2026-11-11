---
title: "管理与分享 Specialists"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 管理与分享 Specialists

使用包迁移配置好的角色，导入后完成本地设置。Skills、Connector 引用与本机授权的可迁移范围不同。

批量管理时，先在底部操作区核对选中数量，再执行操作。在同一位置阅读完成或失败反馈，并检查条目的最终状态；仅选中条目不会启用、安装或删除它。

## 列表控件

| 控件 | 操作与预期结果 |
| --- | --- |
| Search specialists / 类别筛选 | 缩小已安装列表，找不到已保存角色时清除筛选 |
| Edit / 角色名称 | 编辑已有角色；保存后重新打开检查 |
| Change appearance | 修改图标/颜色，不改指令 |
| Manage Tags | 添加整理标签 |
| Toggle | 启用或禁用，不删除角色 |
| Actions → Duplicate | 打开复制了指令和绑定的新草稿，名称带 Copy；仍须点击 Create specialist |
| Actions → Export ZIP | 选择导出内容并保存可迁移包 |
| Actions → Delete | 永久删除确认；单独检查可选的 Skill 删除项 |

删除角色前，检查是否同时删除其 Skills。其他角色仍在使用时保留共享 Skill；删除副本不需要删除原角色。

![删除验证副本并保留共享 Skill](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## 共享与导入包

### 导出所需 Skill 文件

<p className="example-label"><strong>示例</strong> 分享包含 Skill 的复核角色</p>

1. 在角色上选择 **Actions → Export ZIP**。
2. 在 **Choose Skills to include** 明确勾选 `rnaseq-count-qc`；Personal/Imported Skill 不一定默认包含。
3. 导出后检查归档内容。

![选择随 Specialist 包导出的 Skill](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

实际<ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">含 Skill 的包</ExampleDownload>包含 `manifest.json`、`specialist.json`、`skills/rnaseq-count-qc/SKILL.md` 及参考结构。最小导出可只有两个 JSON。Connector ID 只是引用，凭据、本机信任和 Full access 不会作为现成授权迁移。

### 导入、解决冲突、完成设置

1. **Add specialist → Import ZIP → Choose ZIP**，一个包恰好包含一个 Specialist。**Download template** 可下载模板。
2. 检查名称、不可变 ID、版本、随包 Skills、归档上限和诊断。
3. Skill 冲突需逐项选择 **Keep installed Skill** 或 **Use package Skill**。后者替换所有当前使用者的 Skill 文件，应阅读 **Affected now**。
4. Specialist ID 已存在时点击 **Review overwrite**，比较版本，必要时先导出当前包，再单独确认 **Overwrite and continue**。
5. 导入后角色处于 **disabled / SETUP INCOMPLETE**。在编辑器检查指令与能力，选择访问范围，再 **Save changes** 完成设置并启用。
6. 重新打开角色，运行小范围任务验收。

![回导时出现的真实 Skill 冲突](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Version unchanged** 仍可能伴随 Skill 冲突。明确选择 Skill 来源，导入后重新打开角色，核对能力绑定和访问范围。

| 预览控件 | 检查内容 |
| --- | --- |
| 展开随包 Skill | 版本、处理方式、原因与文件列表 |
| Archive limits | 本界面为压缩 50 MB、展开 200 MB、2,000 文件、单文件 25 MB |
| Diagnostics | 阻断错误、警告和信息；警告可能需要明确选择 |
| Copy report / Download JSON | 保存诊断用于排错，分享前检查内容 |
| Cancel | 退出预览，不安装 |
| Next / Review overwrite | 必要选择和校验通过后继续 |

**从浏览器导入：** 通过 **Import ZIP → Choose ZIP** 选择包，检查内容、处理冲突并完成本地设置后再启用。目标设备仍需单独配置凭据和信任。上传失败时保留错误，按[故障排查](../guides/troubleshooting.md)处理。

## 使用市场

打开 **Marketplace**，搜索角色，选择 **View details**。检查发布者、来源、版本、许可证、下载大小、Skills 与 Connector 引用。**Refresh Marketplace** 刷新目录，**Manage Marketplace sources** 管理来源。All/Official/Community 表示来源类型，不表示运行环境已就绪。

![实际 Auto Research Specialist 包详情](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

点击 **Install Specialist**，确认角色出现在 **Marketplace**，核对启用状态与绑定。目录中的包数量仅描述该包，不是应用能力总数。安装不会执行研究任务，也不会准备全部外部依赖；使用前完成所需配置。

![Auto Research 已安装并启用](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

归档损坏、预览过期、绑定缺失或下载失败时，保留诊断代码、应用/包版本与来源 URL，通过[故障排除](../guides/troubleshooting.md)反馈，不在 issue 中公开密钥或研究数据。

实现依据: [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。

## 分享前验证

导入或修改角色后，使用其已分配能力完成一个小任务，并打开保存结果核对。已有方法写作、PCA 与矩阵案例见[使用已安装 Specialist 扩展分析](../workflows/extend-analysis.md)。按所选路线检查输入要求和未解决限制。
