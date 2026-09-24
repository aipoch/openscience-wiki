---
title: "Skill 目录"
last_update:
  date: '2026-09-24'
---

# Skill 目录

应用提供 **23 个内置 Skill**。本页按工作类型分类；条目描述随应用提供的方法，不表示所有外部模型、依赖和服务已经安装。

安装应用分发的方法，见[市场安装说明](marketplace.md)。下方目录用于选择科研方法，不是市场版本的实时清单。

## 选择前检查可用条件

1. 在 Settings 打开 Skill，阅读完整要求及第三方服务说明。
2. 对照真实输入类型。bulk RNA-seq 表不是单细胞 AnnData，分子绘图也不是对接结果。
3. 检查所选运行环境和包。远程任务应先选择可用 Compute Host，核对环境后提交。
4. 先运行小范围任务，检查实际输出并保留输入版本，再扩大规模。

manifest 还有 self-awareness、skill-creator 两个内部资源，不作为用户目录条目。Personal 或 Imported 包（包括 rnaseq-count-qc）不计入这 23 个。

实现依据: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json)。

Environment 分组的三个应用 Skills 及 Customize 始终启用，见[启用规则](overview.md)。随应用提供的方法见[内置清单](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json)，主机设置和结果送达见[远程计算](../guides/remote-compute.md)。

## 按研究任务查找

### 蛋白结构

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | 蛋白 FASTA，单体或复合物 | ColabFold、权重、GPU；可调用公共 MSA 服务 | 预测结构与置信度 |
| [Boltz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | 蛋白、DNA、RNA、配体复合物定义 | Boltz 包、权重、GPU；按任务使用 MSA | 复合物结构、置信度及可选亲和力输出 |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | 多实体 FASTA | chai-lab、权重、GPU | 全原子复合物与置信度 |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | 序列或复合物输入 | Biohub esm、权重、CUDA；不同于 fair-esm | 结构预测，或按任务生成 ESMC 表征 |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | 蛋白、核酸、配体定义 | OpenFold3、权重访问、CUDA 与相应内核 | 复合物结构与评分 |

### 蛋白设计与对接

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | 靶标 PDB 与配体 SMILES/SDF | DiffDock 仓库、权重和 GPU | 排序后的配体姿势；姿势置信度不等于亲和力 |
| [ProteinMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | 骨架 PDB、设计或固定的链与残基 | 仓库、权重、torch/numpy；小任务支持 CPU | 设计序列与评分 |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | 骨架及配体、金属或核酸上下文 | 仓库与 Python 依赖；小任务支持 CPU | 序列与回填结构 |
| [SolubleMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | 蛋白骨架 | ProteinMPNN 与可溶模型权重；可使用 CPU | 可溶模型先验下的序列 |

### 序列与细胞

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | 蛋白序列 | fair-esm 与权重；内置流程使用 GPU | 嵌入、概率输出或接触预测 |
| [Borzoi](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | 明确基因组与坐标的 DNA 窗口 | borzoi-pytorch、权重与 CUDA | 基因组轨道预测或参考/变异差值 |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNA 序列或前缀 | Evo 2 权重、兼容 CUDA 和足够内存 | 序列似然、嵌入或生成 DNA |
| [scGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | 带基因词表映射的单细胞 AnnData | scGPT、权重与 GPU | 细胞嵌入或注释结果 |
| [scvi-tools](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | 单细胞计数与批次、标签元数据 | scvi-tools/scanpy/anndata；内置训练流程要求 GPU | 潜在表征、标签迁移或模型比较 |

### 证据与写作

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [Literature Review](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | 问题、文献 ID 或论文 | 来源检索；OpenAlex 操作的密钥可选 | 可追溯的证据综合与引用 |
| [Indication Dossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | 以患者群体定义的适应证 | 研究工具和来源访问 | 可继续的阶段文件及研究报告 |

### 环境与计算

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [Environment & Packages](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | 缺包或版本问题 | 选定 Python/R 及可访问的包源 | 包检查、托管安装和导入验证 |
| [Compute Environment Setup](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | SSH/Slurm 主机上的命名环境 | 已配置主机，用户或管理员管理激活文件 | 环境准备指引与验证记录 |
| [Remote Compute (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | 工作负载和可用 Compute Host | SSH 凭据、主机和适用的调度器 | 任务提交、结果收集与发布 |

### 资源与图表创作

| Skill | 输入 | 依赖与执行条件 | 应检查的输出 |
| --- | --- | --- | --- |
| [Customize](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Skill 或 Specialist 修改需求 | 可用 Agent 及原生资源操作 | 保存后可重新读取的包或角色 |
| [Figure Style](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | 真实数据及一张最终图 | Notebook 函数与绘图库 | 检查过数据与标签的图 |
| [Figure Composer](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | 一条主张与不可变数据版本引用 | Main Agent、委派、绘图与复核 | 多面板图及复核记录 |
| [Paper Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | 稿件或摘要、图注及完整图组 | 可追溯文件版本与复核工具 | 论文简报与图组论证顺序 |

按具体方法准备依赖、权重和计算资源。小型 ProteinMPNN CLI 示例见[科学工具](../tools/scientific.md)，GPU 条件见[远程计算](../guides/remote-compute.md)；这些示例不覆盖全部蛋白预测或训练方法。
