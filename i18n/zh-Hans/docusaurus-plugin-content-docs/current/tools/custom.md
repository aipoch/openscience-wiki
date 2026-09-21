---
title: "连接自定义 MCP 工具"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# 连接自定义 MCP 工具

<p className="example-label"><strong>案例演示</strong> 通过本地 MCP 查询公开 QC 表</p>

本例通过小型本地 MCP 服务提供公开 RNA-seq QC 表。它读取固定 CSV，提供两个操作，不联网、不安装包、不修改数据。

<PlatformGuide />

## 下载真实示例

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-server.py</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">rnaseq-sample-qc.csv</ExampleDownload>

保存到本地并记下完整路径。服务只用 Python 标准库，启动时读取 CSV；替换输入后应明确重启/重连。

## 在应用中添加

1. **Settings → Connectors → Add connector → Local command**。
2. **Display name** 填 `GSE60450 QC`。
3. **Command** 选择 **python3 — script file**；Windows 也可选择 **Other…** 并填写实际 Python 程序路径。
4. 展开 **Advanced settings**，名称/ID 填 `gse60450-qc`，描述为只读访问 QC 表。
5. **Arguments** 第一行写脚本绝对路径，第二行写 CSV 绝对路径。每行是一个参数，路径有空格也不要额外添加 Shell 引号。
6. 本例 Environment 留空，检查脚本后勾选 **I trust this connector**，点击 **Add**。
7. 搜索 `GSE60450`，确认 **Connected** 及 Main Agent 可用性。

<PlatformContent platform="macos">

![实际本地 MCP 配置](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

这是路径模板，不能原样粘贴。若应用找不到 `python3`，选择 Other 填实际解释器路径；启动器必须在当前电脑存在。

<PlatformContent platform="windows">

Windows 可通过 **Other…** 填写已安装 `python.exe` 的完整路径；选中 `python3` 预设不代表本机存在该命令。先在[运行环境](../guides/runtimes.md)核对解释器路径。脚本与 CSV 路径分别放在 **Arguments** 的两行，文件夹名含空格也一样。不要将程序和参数合成一条 Shell 命令。

</PlatformContent>

## 工具输入与实际输出

| 工具 | 输入 | 实际内容 |
| --- | --- | --- |
| get_dataset_summary | 空对象 | GSE60450、来源 URL、文件名、12 行与完整样本 ID |
| get_sample_qc | `sample_id` 字符串 | 指定样本的四个 QC 指标 |

可以请求：

> Use the connected gse60450-qc Connector. Call get_dataset_summary, then get_sample_qc for MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1. Report only actual responses and preserve the CSV.

本例中，原生应用返回该样本**总计数 23,227,641、零基因 8,664、检出基因 18,515、中位数 237**，汇总返回 12 行，与保存的 QC 表一致。

<PlatformContent platform="macos">

![成功连接的自定义 Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

打开两次工具调用的 Notebook 活动，再重开保存的 JSON，对照 CSV 检查样本 ID 和指标。下方 Windows 运行使用连接器 ID `gse60450-qc-win`，发出请求时应使用你自己配置的 ID。

![Windows 本地 MCP 调用，包含保存的 JSON 与 Notebook 输出](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## 服务与错误行为

脚本通过 stdio 实现 MCP 初始化、ping、工具发现与调用，两个工具结构都在下载源码中。标准输出是协议通道，普通调试打印可能破坏连接，诊断应写入标准错误。

**错误提示：** 无效样本名可能在应用中显示为 **connector_unavailable**，即使自定义服务返回的是具体业务错误。先查看服务日志并核对样本标识，再决定是否重新连接。提示与原因持续不符时，按[故障排查](../guides/troubleshooting.md)反馈。

应用在连接时会发现服务工具。通过 `host.mcp` 调用时，使用发现的业务操作名称；协议方法 `tools/list` 不是业务工具。输入结构可查看下载脚本中的定义。

## 导出与迁移

选择 **Actions → Export**，检查格式与预览。实际导出提示两个参数为本地路径。**Save configuration** 只保存配置，不包含 Python、脚本或 CSV。单独复制文件、更新路径、确认本地信任，再复测两个正常操作。

<PlatformContent platform="windows">

选择 **MCP client config** 时，检查 `mcpServers`：本例导出一个服务，包含 `command` 和两个 `args`。Windows 路径中的反斜杠在 JSON 中会被转义。换电脑后，将这三个路径改为实际文件位置，再重试两个调用。配置导出成功不能证明目标电脑已连通。

</PlatformContent>

| 失败 | 检查 |
| --- | --- |
| 命令无法启动 | 解释器、脚本路径及权限 |
| CSV 不可读 | 第二参数和真实文件位置 |
| 已连接但工具不可用 | Agent 分配、当前目录和操作名 |
| 输入错误 | 必填 `sample_id` 和完整原始 ID，不使用绘图短标签替代 |
| 失败后出现 Connector 错误 | 检查应用/服务详情，按情况重连 |
| 终端可用、应用不可用 | 应用可见环境及 stdout 是否只输出协议 |

扩展时定义范围明确的输入，返回来源编号，验证正常、空结果和错误输入，让用户能检查每次读取或修改什么。

实现依据: [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts)。

需要在脚本中管理同一份自定义 MCP 配置时，使用 [Connector CLI](../reference/cli.md) 或 [SDK 方法](../reference/api.md)。连接测试成功只证明工具发现，仍需单独完成一个有边界的业务调用。
