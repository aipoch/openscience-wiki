---
title: "文件、产物与版本"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# 文件、产物与版本

区分原始文件、上传副本与生成产物。本页说明归属、查找与保存修订；查看控件见[预览](previews.md)，文件打包导出见[会话](sessions.md)。

<PlatformGuide />

## 上传输入或引用目录

使用 **Composer → + → Attach files** 选择 `GSE60450_Lactation-GenewiseCounts.txt`，等待附件出现，预览后发送。显示名保持可识别，托管路径可能增加校验和后缀。移除附件只取消当前草稿的引用，不删除电脑原文件。**Your files** 用于选择已有项目文件，避免再次上传。

多份输入需要保留在本地目录时，可使用 **Files → Filter project files → This computer → Add folder…**。进入具体子目录，选择 **Read-only** 或 **Read & write**。点击 **Grant this folder** 前阅读停止内核的确认提示：改变 Notebook 文件权限需要停止现有内核并重建其访问范围。Cancel 不应用草稿权限。详细说明见[项目与源目录](projects.md)。

| 本地文件控件 | 操作及结果 |
| --- | --- |
| Directory path | 输入可访问目录并导航 |
| Go to parent directory | 在访问规则允许范围内进入上级 |
| Go to | 选择保存的位置 |
| Refresh directory | 刷新目录列表 |
| Pin this folder | 增删位置书签，不删除目录 |
| 文件行 | 打开预览 |
| Reload file | 外部文件更改后重新读取 |
| More actions → Copy path | 复制外部路径 |
| More actions → Save as artifact | 保存托管项目副本，等待 Saved |
| Download | 通过系统保存流程另存副本 |

只读授权保护外部目录，同时仍允许在项目工作区生成输出。使用上方本地文件控件刷新来源并保存托管副本。

<PlatformContent platform="windows">

添加已有文件夹时，打开 **Files**，展开 **Artifacts** 下拉菜单，选择 **This computer → Add folder…**。在应用自己的 **Grant folder access** 对话框中选择具体子文件夹和 **Read-only**，再点击 **Grant this folder**。用户主目录根位置可能不可选，请进入研究资料所在的子文件夹。阅读可能出现的 Notebook 内核影响确认；返回 Files 后，核对当前目录及文件列表。

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="Windows 已授权文件夹，列出公开脚本与 CSV" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="打开完整 Windows 截图" />

在 Windows 的 **Attach files** 窗口中，可以选择含中文或空格路径下的文件，也可以在“文件名”框输入完整文件路径后打开。返回应用后先确认附件名称，再打开预览，核对表格行列和内容。不想附加时，点击 **Cancel**，并确认草稿没有新增附件。

</PlatformContent>

## 查找输入和生成结果

1. 打开 **Files → Filter project files → All artifacts**。
2. 区分 **Your uploads** 和按会话分组的 **Generated files**。
3. 用 **List view** 查看名称和大小，或用 **Grid view** 查看卡片。
4. 在 **Search project files** 输入文件名片段，例如 `rnaseq`，核对匹配文件及所属会话。
5. 清除搜索可显示被筛选隐藏的文件。本例共有六份托管文件：一份上传、两份计划、三份研究输出。
6. **Expand files** 展开文件库，**Exit full screen files** 返回工作区。

<PlatformContent platform="macos">

![真实 RNA-seq 结果的文件筛选](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
数量对应当前筛选。无结果不代表文件被删除。**No more** 表示该组已加载完成，点击组标题可收起。文件主体打开独立预览；**Open … in split view beside the session** 将文件放在对话旁。下载针对相应视图选择的文件或版本。

### 返回本地文件夹并保存阅读副本

1. 打开 **Files → Filter project files → This computer**，在 **Directory path** 输入允许访问的源目录。
2. 选择 **Pin this folder**。转到其他位置后，通过 **Go to → Pinned** 返回。**Remove bookmark** 或固定行的 **Unpin** 只移除快捷入口。
3. 新增文件后选择 **Refresh directory**。已打开的文件若在应用外改变，用 **Reload file** 重新读取内容。
4. 在本地预览中选择 **More actions → Save as artifact**，等待 **Saved**。
5. 返回 **All artifacts → Your uploads**，重开保存的副本；它显示托管文件版本控件，标题下不再是本地源路径。

重新打开托管副本，与本地来源内容比较。之后修改源文件不会自动更新已保存副本；编辑托管内容发生冲突时，按下方步骤处理。

## 编辑报告并对比版本

<p className="example-label"><strong>案例演示</strong> 添加阅读笔记并比较报告修订</p>

打开支持编辑的托管文本或 Markdown 文件。下面以向已有报告添加阅读笔记为例：保存会创建新修订，不会改动原始输入或重新运行分析。

1. 打开托管 Markdown，点击 **Edit rnaseq-qc-report.md**。
2. 编辑源文字，保留原有方法与溯源说明。
3. 点击 **Save changes**，标题栏从 **v1** 变为 **v2**。
4. 点击 **Compare … with its source version** 查看新增文字。
5. **Stop comparing** 返回渲染后的报告。
6. **Previous file version** 查看 v1，**Next file version** 返回 v2。

<PlatformContent platform="macos">

![报告 v2 与原始版本的差异](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| 控件或状态 | 处理 |
| --- | --- |
| Save changes 禁用 | 先作有效修改；未改变的内容无需保存 |
| Cancel | 放弃当前编辑草稿 |
| 版本箭头禁用 | 该方向没有更早或更新版本 |
| Compare 禁用 | 没有可比较的来源版本或格式不支持 |
| 保存冲突 | 重新载入当前版本，再协调修改，不要假定已覆盖另一位写入者 |
| 没有 Edit | 当前格式或来源不可编辑，二进制文件和 CSV 表格不会因此变成表格编辑器 |

受支持的托管文本、代码和 Markdown 可提供编辑。CSV 表格预览为只读，图像等二进制格式没有文本编辑功能。手动保存产生文件版本，不会重新运行 Notebook，也不会生成模型审查。引用执行历史前见 [Notebook 证据](notebook.md)。

### 处理保存冲突并保留双方修改

编辑器打开期间，其他写入方保存了同一报告，**Save changes** 可能提示 **This file has a newer version. View latest version**。这表示旧草稿没有覆盖新版本。

1. 先另行保留尚未保存的文字。
2. 选择 **View latest version**。如果出现 **Discard unsaved changes?**，尚未保留草稿时先取消。
3. 打开最新已保存报告，检查另一方新增的内容。
4. 选择 **Edit**，在最新正文上补回自己的修改，再保存。
5. 重开结果，并用版本箭头检查先前修订。

<PlatformContent platform="macos">

![另一版本已保存，当前草稿被拦截](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
保存后确认最新修订同时包含另一位写入者的更改和你保留的草稿。通过版本控件仍可查看先前文件修订；文件修订与对话消息修订是不同记录。

需要重跑捕获的结果并比较输出时，使用[复现检查](reproducibility.md)。需要一起传递会话分支、文件和证据时，使用 [.science 研究包](research-packages.md)。

## 导出并保留研究记录

文件 **Download** 下载单份结果。会话 **Download all artifacts** 将所选文件保存到文件夹；项目 **Download artifacts…** 创建 ZIP，并区分 `generated` 与 `uploads` 路径。确认范围、文件名与保存位置。会话 **Export** 导出对话，与产物下载分开。下载副本不包含完整运行状态、凭据或所有外部输入。

复用时一起保存原矩阵、CSV、图和方法报告。[数据工作流](../workflows/data-quality.md)提供实测文件及精确验收值。下载失败先检查目标目录权限和空间，再重试；不完整的外部副本不改变托管版本。

### 打开下载的报告

选择所需报告版本并点击 **Download**。在保存位置用文本编辑器打开 `.md` 文件，核对标题、段落和数据；阅读排版效果时可回到应用内预览。

<PlatformContent platform="windows">

在记事本中打开下载的 `.md` 文件。记事本显示 Markdown 源文字，其中的 `##` 和反引号属于排版标记；核对标题、段落和表格内容即可。需要阅读排版后的效果时，回到应用内预览。

</PlatformContent>

### 复制和导出时保留正确文件

复制含托管引用的消息后，粘贴到目标对话，发送前检查生成的每个附件/引用。文件名可读还不够，应打开引用，确认当前所属会话和版本。

导出所选产物或文件包前，确认完整选择范围，等待结果并重新打开下载文件。编辑、刷新或导出失败时，保留草稿和源版本，核对实际保存结果；刷新失败不证明此前保存失败。

会话 **Download all artifacts** 将所选文件保存到文件夹；项目 **Download artifacts…** 创建包含 `generated` 与 `uploads` 路径的 ZIP。对话 PDF 则属于文字记录导出，具体步骤及已重开的结果见[会话](sessions.md)。

源码：[项目文件库](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx)、[本地文件操作](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx)。

实现参考：[复制引用](https://github.com/aipoch/open-science/commit/f0c0e081)、[完整导出选择](https://github.com/aipoch/open-science/commit/f0468f35)、[预览编辑](https://github.com/aipoch/open-science/commit/8763f9aa)。

## 将已授权的本地文件保存为产物 {/* #import-local-artifact */}

在 **This computer** 中打开已授权文件夹内的文件，在预览中选择 **… → Save as artifact**，等待完成后打开会话中生成的产物，检查内容。Open-Science 保存的是应用管理的不可变副本；之后编辑本地原文件不会更新此副本。仅预览文件夹内的文件并不等于导入。
