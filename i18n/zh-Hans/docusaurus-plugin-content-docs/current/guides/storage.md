---
title: "存储与归档内容"
last_update:
  date: '2026-09-24'
---

# 存储与归档内容

**Settings → Storage** 查看托管数据位置和用量，**Settings → Archived** 管理不活跃的项目/会话。归档不会迁移数据根目录，也不保证释放空间。

## 查看与刷新磁盘用量

![研究示例运行后的实际托管存储](/img/open-science/local-acceptance/storage-installed-location.webp)

备份或排查文件丢失前先确认 **Data location**。它是应用托管根目录，与项目授权访问的外部源目录不同。**Refresh** 重新扫描，比较数值前检查最近扫描时间。

| 类别 | 统计内容 | 如何理解 |
| --- | --- | --- |
| Artifacts | 托管研究产物及保留数据 | 最新报告很小，仍可能保留旧版本 |
| Uploads | 上传输入副本 | 删除外部原文件不删除此副本 |
| Runtime | 托管解释器及依赖，可展开 | 通常大于小型示例数据 |
| Notebooks | 会话执行存储 | 删除所属工作前导出所需 Notebook |
| Execution evidence | 版本捕获证据 | 与当前活跃内核不同 |
| Session workspaces | 对话工作文件 | 工作文件未必已发布为产物 |
| Compute cache / Subagent workspaces | 缓存或子任务工作数据 | 先识别用途，不能一概视作可删除 |
| Total / Available space | 托管总量与设备剩余空间 | 是测量值，不是最低安装要求 |

磁盘占用随文件与运行环境变化。读取各类别的实际占用，再使用对应管理入口；统计类别不意味着该类内容可以安全地一键清理。

<span id="提交迁移前检查" />

## 迁移数据位置

### 迁移前准备

结束活动任务，导出重要输入、输出和执行记录。记下当前数据位置及所需软件包。迁移科研数据不会一并迁移所有应用设置和对话历史；它们仍保存在配置位置。

### 选择目标并提交

1. 点击 **Change location** 阅读迁移说明。
2. **Continue** 打开目标目录表单。
3. 填写 **New location**，用 **Browse…** 选择，或选 **Move back to the default location**。
4. 核对源、目标、可用空间和环境重建提示。
5. **Change location** 提交有效迁移，**Cancel** 保留原位置。

![迁移表单与运行环境重建提示](/img/open-science/local-acceptance/storage-destination-form.webp)

应用移动已有科研数据，但 Python/R 环境在**重启后重建，而非复制**。共享包缓存会复制以支持离线重建，仅通过 pip/CRAN 安装的包不保证恢复。额外重建空间无法可靠预估。实际迁移前记录环境依赖，之后测试所需运行环境。

### 重启后检查目标位置

1. 打开 **Settings → Storage**，确认 **Location** 已变为选择的目标。
2. 重开已有项目、保存的报告及历史修订，同时检查文献库、集合、项目关联和 PDF 附件。
3. 打开 Notebook，检查可用运行环境，并用已有输入重新执行一项小型只读计算。复制成功不代表运行环境已经可用。
4. 完成检查前保留原数据与导出文件。比较文件内容或校验和，并核对文献、集合、项目关联、附件和引用设置。另保存并重开一份新结果，确认目标位置可写。

使用外部 R 解释器时，确认所选程序仍存在，Notebook 也绑定到该解释器。加载分析所需的包，重新运行一个小计算，再打开保存的结果。外部解释器及其已有包与应用托管环境分开；托管环境可能仍需重建。

### 移回默认位置

1. 结束正在运行的任务，选择 **Change location → Continue → Or move it back to the default location**。
2. 核对来源、默认目标、可用空间与运行环境重建提示，提交后等待 **Data copied**。
3. 点击 **Restart now**。重启后到 **Settings → Storage** 检查 **Location**；复制完成但未切换位置时，按[迁移恢复](#数据已复制但切换失败)处理。
4. 重新打开原项目及保存文件。在 **Runtimes** 检查托管 Python/R，需要时执行 **Download and setup**，再用原输入做一次小型只读计算。

移回后，打开一个已有项目，检查原始输入和已保存报告能否读取。确认托管运行环境已就绪，再运行一个小任务并保存新结果；重新打开该结果，确认应用使用的是默认数据位置。

![返回默认位置后重新打开的 R 结果](/img/open-science/local-acceptance/r-default-chart.webp)

如果显示 **A different folder named OpenScience already exists here. Choose another location.**，应用会阻止覆盖。取消并保留冲突目录；确认它的归属、内容及备份后再处理，不要直接删除同名目录。只有目标通过校验后才重新提交迁移。

### 数据已复制，但切换失败

**Data copied** 表示复制与检查完成，仍需 **Restart now** 完成数据位置切换。如果出现 **Could not prepare the app to switch data locations safely. Please try again.**，不要把迁移视为成功，也不要手动更改内部路径。

1. 记下错误和原始、目标位置，确认原项目与文件仍可打开。
2. 再次打开 **Change location**。检测到未完成复制时，选择 **Resolve unfinished move**。
3. **Finish move** 尝试完成已有复制的切换；**Discard copy** 放弃未完成迁移的副本，保留原位置。先阅读确认范围。
4. 若出现 **Conversation storage needs attention**，处理未完成迁移后选择 **Retry**，然后重开原项目和报告。

![未完成迁移的恢复选项](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

如果最终切换反复失败，先结束活动任务，退出并重新打开应用，再重试迁移。仍报错时，保留原位置和错误详情，先排查原因，再决定是否重新迁移。


## 归档并恢复会话

先选择准备归档的会话，完成或停止其中的活动任务。需要比较恢复状态时，保留另一份已完成会话。

1. 会话行菜单选择 **Archive**。
2. 确认它离开活跃列表。
3. 打开 **Settings → Archived**。
4. 在 **Sessions** 下核对标题、项目和归档时间。
5. 点击该行 **Restore**。
6. 返回项目确认会话重新可见。

恢复归档会话应点击**条目行的 Restore**，窗口级 Restore 只调整设置布局。归档项目从 **Projects → Manage** 查看其会话后再恢复或删除。

## 归档并恢复整个项目

1. 在首页项目卡片菜单选择 **Archive**。
2. 打开 **Settings → Archived → Projects**，进入该项目的 **Manage** 行。
3. 核对项目及会话列表。会话可能显示 **Hidden because its project is archived**，这不等于每个会话都被单独归档。
4. 选择 **Restore project**。
5. 重开项目、对话和已保存报告。

![管理已归档的 GSE60450 项目](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

恢复后重新打开保存报告及其修订。归档用于整理项目，不会重新运行分析或删除报告的版本历史。

<span id="删除可丢弃的测试项目" />

## 永久删除项目

**Delete project** 会打开永久删除确认。确认前阅读影响范围：托管产物与上传文件不同于外部工作目录文件，后者不会被删除。检查哪些任务和内核将停止，以及 Storage 中保留哪些托管 Session 工作区。归档与删除的结果不同。

![单独创建的空项目的删除范围](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

学习删除流程时，使用单独的空项目。删除包含研究工作的项目之前，核对确认框列出的受影响记录。

## 区分移除操作

| 操作 | 恢复性与影响 |
| --- | --- |
| Unpin | 仅更改会话排序位置 |
| Archive | 可恢复的整理，保留工作 |
| Restore | 恢复使用，不重新运行科研任务 |
| 移除目录授权 | 更改外部目录访问，不删除目录 |
| 删除项目/会话 | 经确认永久删除，先阅读涉及记录与文件 |
| 文献 Move to Trash | 独立的文献生命周期，在文献 Trash 恢复 |

永久删除前，导出需要保留的输入、输出和执行记录，检查其他工作是否仍引用它们。确认范围包含应保留内容时，请取消操作。

## 存储或恢复失败

下载失败检查目标目录和空间；托管文件不可用先核对数据位置和配置档，不要立即新建替代项目；迁移后缺包检查重建环境，不要直接判断研究数据丢失。如何收集版本和首条有效错误见[排查](troubleshooting.md)。

源码：[存储面板](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx)、[迁移表单](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx)。 [文献库迁移检查](https://github.com/aipoch/open-science/commit/d00c722d)。

## 升级后重新打开已有数据 {/* #historical-data-location */}

应用优先使用已保存的数据位置。旧安装已完成初始化、但没有明确保存位置时，Open-Science 会保留历史位置并保存该选择。已保存的文件夹不可用时，先重新连接，再启动。若多个历史位置都含有研究数据，应用会要求选择或恢复原文件夹，不会静默选一个。核对项目与文件前保留各份数据，不要用新建空目录处理看似丢失的数据。
