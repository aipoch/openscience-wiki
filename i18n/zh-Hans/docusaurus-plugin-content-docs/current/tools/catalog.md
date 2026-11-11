---
title: "科学工具目录"
last_update:
  date: '2026-11-11'
---

# 科学工具目录

本目录帮助你找到科学方法在 Open-Science 中的入口及运行条件。它是文档索引，不是安装所有列出程序的应用页面。

## 软件类别与执行位置

| 软件类别 | 应用入口 | 准备检查 | 首次验证 |
| --- | --- | --- | --- |
| Python 标准库与绘图 | Session Notebook | 当前 Python 和绘图依赖 | 读取真实 QC CSV 并生成小图 |
| R / base R | Notebook；Settings → Runtimes → R | 已启用托管或检测到的解释器 | 打印版本并复现样本汇总 |
| 结构预测框架 | 对应 Skill，通常使用 Compute | GPU、包、权重、输入与适用的 MSA 服务 | 小范围真实序列/复合物及置信度 |
| MPNN 序列设计 | ProteinMPNN / LigandMPNN / SolubleMPNN | 仓库、权重、Python 依赖；支持小型 CPU 任务 | 明确固定/设计位点的单骨架 |
| 单细胞框架 | scGPT / scvi-tools | AnnData、细胞/基因标识、包及计算资源 | 训练前检查维度与所需层 |
| 分子结构绘制 | Molecule Connector / 查看器 | 内置离线 OpenChemLib | 保存并重开 aspirin.mol |
| 文件渲染器 | 文件预览 | 扩展名与预览大小限制 | 打开实际下载的文件 |
| 远程批处理软件 | Compute Host 与远程 Skill | 主机、调度器、命名环境 | 主机探测后执行小任务 |

完整 24 个 Skill 的方法表见 [Skill 目录](../skills/directory.md)，此处集中说明软件就绪条件。

## 核对当前环境

在 **Settings → Runtimes** 查看 Python/R，确认会话实际绑定的环境，并在该环境检查包。电脑其他位置安装了解释器，不代表 Notebook 正在使用它。

解释器准备见[运行环境](../guides/runtimes.md)，计算核对见 [Notebook](../guides/notebook.md)。需要新增软件包时，在该环境中检查安装和导入。下载失败则根据受影响域名与报错，按[网络说明](../guides/network.md)处理。

## 执行安装指令前

阅读已安装 Skill 的具体要求与环境支持的安装路径。注意命名冲突：**fair-esm** 与 Biohub **esm** 共享 `esm` 命名空间，但不是同一个实现。模型代码和权重也可能有不同版本与访问条件。

本地 Notebook 使用[科学工具](./scientific.md)的受支持包管理，远程主机参见[远程计算](../guides/remote-compute.md)。能打开 PDB 只证明结构查看器可用，不证明 AlphaFold 等预测程序已经安装。

实现依据: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [notebook-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts)。

通过[后台任务](../guides/notebook.md)跟踪适用的长任务并检查送达结果。所需科学软件仍须在选定运行时中可用。
