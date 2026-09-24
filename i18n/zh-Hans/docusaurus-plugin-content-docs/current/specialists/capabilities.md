---
title: "分配 Skills 与 Connectors"
last_update:
  date: '2026-09-24'
---

# 分配 Skills 与 Connectors

Specialist 的能力列表决定它能访问哪些 Skills 和 Connectors。某个 Connector 全局启用，不代表所有受限角色都能访问。

## 配置明确的能力范围

<p className="example-label"><strong>示例</strong> 为 RNA-seq QC Reviewer 分配能力</p>

1. 打开 **Settings → Specialists**，编辑 **RNA-seq QC Reviewer**。
2. 关闭 **Full access**。
3. 在 **Skills → Add a skill** 搜索并添加 Personal `rnaseq-count-qc`，确认 **Skills 1**。
4. 在 **Connectors → Add a connector** 添加 **Omics Archives**，确认 **Connectors 1**。
5. 打开能力详情核对资源，保存后重新打开角色确认绑定保留。

![明确分配能力的 Specialist](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| 控件 | 作用 |
| --- | --- |
| Full access 开启 | 使用继承的能力范围，同时应用逐项排除；更改 **Manage access** 后检查实际资源列表 |
| Full access 关闭 | 使用明确列表；提示词提及某工具不能替代绑定 |
| Add a skill / Add a connector | 打开相应类型的选择器 |
| 能力详情 | 检查资源，不执行科学流程 |
| Remove | 移除当前角色的绑定，不卸载底层资源 |
| Save changes | 保存能力范围 |

应用必需 Skills 保持全局启用，但不替代 Specialist 能力列表，也不会自动打开 Full access。若此角色不能使用 Customize，应检查绑定和实际解析的资源。见 [Skill 启用规则](../skills/overview.md)。

## 从资源调整访问 {/* #resource-access */}

在 **Settings → Skills** 或 **Connectors** 打开资源的 **Manage access** 弹窗，可以一起查看 Main Agent 和 Specialist 的关联。此操作更新所选角色的绑定，不会启用角色。Full access 角色可以逐项排除资源；受限角色使用明确的选择列表。市场角色绑定在此弹窗中可能只读。操作图见[资源访问控件](../guides/connectors.md#resource-access)。

更改绑定后，确认角色已启用、服务凭证就绪，并允许执行所需操作。**Used by** 显示资源分配，不表示执行记录。

## 分开检查四层可用性

| 层级 | 应检查什么 | 失败例子 |
| --- | --- | --- |
| 角色 | 已安装、启用、设置完成 | 导入后尚未保存本地设置，角色仍禁用 |
| 能力 | 绑定正确且运行时能解析 | 显示名称或短名称未解析到已分配资源 |
| 服务/环境 | 连接、凭据、内核及依赖 | 缺少服务要求的凭据或依赖包 |
| 操作 | 当前输入版本与实际授权 | 文件交接失败，子任务尚未开始 |

本地角色在创建及包导入后保留了 Skill 和 Omics Archives 绑定。首个子任务未通过其尝试的短名称加载 Skill，但用 Python 完成了明确提供的表格检查。这证明委派和算术检查成功，不证明子任务成功加载 Skill。遇到这种情况，要求 Agent 查看实际可用目录并使用准确资源 ID，不应通过扩大 Full access 掩盖名称问题。

## 能力范围不等于授权模式

Full access 不表示“所有操作免确认”。[授权模式](../guides/approval-modes.md)、文件/网络边界和运行环境规则仍然生效。子任务的授权请求会显示在父对话中，需核对请求角色与操作。

导出角色时，Connector ID 只是引用，不包含连接配置和密钥；Skill 文件可以明确选择随包导出。在另一台电脑上核对绑定、配置凭据并进行小范围测试后再使用，参见[管理与分享](./manage.md)。

实现依据: [SpecialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。
