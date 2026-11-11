---
title: "Specialists 与可用角色"
last_update:
  date: '2026-11-11'
---

# Specialists 与可用角色

Specialist 是保存下来的研究角色，包含身份、指令和可用 Skills/Connectors。适合需要固定职责或单独执行的子任务。角色名称本身不代表专业能力已经得到验证。

## 理解角色来源

| 角色或来源 | 用途 | 可配置内容 |
| --- | --- | --- |
| Main Agent | 负责当前对话，可组织委派任务 | 会话模型、Agent 控制与能力 |
| Custom Specialist | 本地创建的明确研究角色 | 身份、指令、选定能力或 Full access |
| Imported / Marketplace Specialist | 从包安装，再完成本机设置 | 本地能力范围；检查发布者与版本 |
| 内置 Reviewer | 执行应用复核流程 | 从对话触发复核；不是普通可编辑、可委派的角色 |

打开 **Marketplace** 查找已发布角色。在线目录可独立于已安装应用变化。导入前检查发布者、指令与依赖。

## 查找角色

打开 **Resource center → Specialists**。**Installed** 表示本地注册数量，包含 Reviewer。使用 **Search specialists**、**Filters → Filter specialists by category**，再打开条目检查。**Marketplace** 是另一份目录；市场列出角色不代表已安装，必须完成包和本地设置流程。

![本地已安装的 RNA-seq QC Reviewer](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

<span id="本次市场实际展示的角色" />

## 按职责选择角色

| 角色 | 研究范围 |
| --- | --- |
| Auto Research Specialist | 生物医学证据、分析、验证与写作 |
| Cryo-EM Structure Validation Specialist | 半图、几何与图模验证规划 |
| Pharmacometrics PK/PD Design Specialist | PK/PD 研究设计与不确定性 |
| Multimodal Neuroimaging Connectomics Architect | MRI/fMRI/弥散成像和网络分析 |
| Synthetic Route and Reaction Optimization Specialist | 反应路线与优化证据 |
| Aerodynamics CFD Verification and Validation Specialist | 数值收敛与实验对照 |
| Atmospheric Chemistry Transport Modeling Specialist | 排放、传输与来源归因 |
| High-throughput DFT Screening Specialist | 收敛与热力学一致性 |
| Astronomical Photometry and Time-domain Analysis Specialist | 定标、测光与时变分析 |
| Precision Agriculture Phenotyping and Prescription Design Specialist | 无人机表型与空间验证 |

这些是实际目录描述，不表示已完成十类科学流程。应用内置 Reviewer 也不同于本教程自建的 **RNA-seq QC Reviewer**。

## 按需要继续

- [创建与编写指令](./identity.md)：定义本地研究角色。
- [分配能力](./capabilities.md)：规定可以使用的资源。
- [委派与验证](./delegate.md)：检查真实子任务与证据。
- [Reviewer 与自动复核](./reviewer.md)：使用内置复核流程。
- [管理与分享](./manage.md)：打包、导入、处理冲突并完成本地设置。

实现依据: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。
