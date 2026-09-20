---
title: "安装与更新"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 安装与更新

普通用户应优先使用 GitHub Releases 提供的桌面安装包。贡献者或需要调试最新版功能的用户可以从源码启动。Open-Science 是 Electron 应用，渲染层同时支持受令牌保护的本地 Web 访问。

<PlatformGuide />

## 选择安装方式

### 下载安装包 {/* #桌面安装 */}

1. 打开 [Open-Science Releases](https://github.com/aipoch/open-science/releases)。
2. 选择与你的操作系统和 CPU 架构对应的安装包。
3. 阅读安装器显示的许可说明并完成安装，再启动应用；首次运行会进入五步 Onboarding。
4. 若系统拦截未签名应用，请只从 AIPOCH 官方 GitHub 仓库重新下载，并按操作系统安全提示确认来源。

在发行页 **Assets** 中选择安装包，不要把自动生成的源码 ZIP 当成桌面安装包。可下载格式以该次发行实际提供的文件为准。

<PlatformContent platform="macos">

| 电脑 | 确认架构 | 文件选择与安装 |
| --- | --- | --- |
| macOS，Apple Silicon | “关于本机”显示 Apple M 系列芯片 | 选择 `mac-arm64.dmg`，打开后将应用拖入 Applications，再从该目录启动 |
| macOS，Intel | “关于本机”显示 Intel 处理器 | 选择 `mac-x64.dmg`，安装到 Applications；应用要求 macOS 12 或更高版本 |

**通过 Homebrew 安装**

也可以通过 Homebrew 安装：

~~~bash
brew install --cask open-science
~~~

Homebrew 自动选择 Apple Silicon 或 Intel。安装后在 **Settings → General → About** 检查实际版本，包管理器可能安装比文档基线更新的版本。[标签版本安装说明](https://github.com/aipoch/open-science/blob/v0.27.0/README.md)。

</PlatformContent>

<PlatformContent platform="windows">

| 电脑 | 确认架构 | 文件选择与安装 |
| --- | --- | --- |
| Windows | 设置 → 系统 → 关于 → 系统类型 | 选择匹配的 `win-…-setup.exe`，运行当前用户安装器，按提示选择安装位置 |

1. 双击下载的 Windows 安装包，按安装向导进入安装位置页面。
2. 保留默认安装位置，或通过 **浏览…** 选择存放应用程序的文件夹，然后点击 **安装**。
3. 等待出现安装完成页面。保留“运行”选项并点击 **完成**，打开 Open-Science。
4. 首次启动后，按照[首次设置](onboarding.md)完成环境检查、数据位置、代理和模型配置。

</PlatformContent>

<PlatformContent platform="linux">

| 电脑 | 确认架构 | 文件选择与安装 |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`：`x86_64` 对应 x64，`aarch64` 对应 ARM64 | 选择匹配的 `.deb`，用系统软件安装器打开，再从应用菜单启动 |
| 其他受支持的 Linux 发行版 | 查看 `uname -m` | 选择匹配的 `.AppImage`，在文件权限中允许执行，再打开；若系统提示缺少依赖，按报错补齐 |

</PlatformContent>

安装位置用于存放应用程序；向导中的 **Data location** 用于科研文件和运行环境，两者分别设置。安装后继续[首次设置](onboarding.md)。

### 从源码运行

要求：Git、Node.js 22、npm，以及 Electron 在当前平台的构建前提。代理框架可在应用中安装或选择。仓库会在安装阶段生成 Prisma Client、应用补丁并准备 Electron 原生依赖。

需要复现源码安装时，先从 [Changelog](../changelog/v0.31.1.md) 确定目标发布标签，再安装依赖。默认克隆跟随分支，不会固定到某个发布版本。记录所选标签、源码提交及运行时版本，便于他人复现环境。

将下方 `RELEASE_TAG` 替换为所选发行页的完整标签（包括开头的 `v`）。如果需要跟随开发分支，省略 `--branch RELEASE_TAG --depth 1`；这条路线会使用默认分支。

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

构建生产包前先运行：

```bash
npm run build
```

`npm run build` 会依次完成 TypeScript 检查以及 renderer、preload、main 三个 Electron 构建目标。若只想验证 Web/headless 入口，应使用仓库已有的 headless 参数和单独的数据目录，避免测试数据进入默认存储。

## 完成首次配置

### 首次运行需要的外部能力

| 能力 | 是否必需 | 用途 |
| --- | --- | --- |
| OpenCode、Claude Agent、Codex 或 CodeBuddy | 至少一个 | 驱动对话式 agent session |
| 模型接入 | 执行代理请求时必需 | 可用支持的订阅或 API 提供方；订阅无需单独 API 密钥 |
| Python / R | 可选 | Notebook 代码执行；可以使用检测到的系统环境或应用管理环境 |
| 网络 | 推荐 | 安装运行时、连接 Provider、GitHub、远程服务和 MCP Connectors |
| SSH 主机 | 可选 | Compute 面板中的远程任务与结果回收 |

### 本地数据

首次设置显示用于产物、Notebook 文件和运行环境等大型科研文件的托管数据位置。应用设置和对话历史仍保存在配置位置，迁移科研数据目录不等于完整备份应用。不要与源码仓库混用；需要迁移时使用[存储](storage.md)，不要在应用运行时手动移动内部文件。

## 确认安装可用 {/* #如何确认安装可用 */}

应用能够打开、Environment 必需检查通过、代理已安装、模型连接通过，才能执行代理请求。模型接入可以使用支持的订阅或 API；Codex 订阅不要求另行购买 API 密钥。需要执行 Python/R 时还要准备相应运行时，能预览 CSV 或 PDF 并不表示 Notebook 可运行。

接着阅读[首次设置](./onboarding.md)与[提供方及本地模型设置](./providers.md)。

## 检查应用更新 {/* #固定复现版本与检查更新 */}

在 **Settings → General → About** 检查安装版本，点击 **Check now** 查询更新。安装前确认目标版本并完成正在运行的任务。源码开发版与打包安装版的更新表现可能不同。更新前保留重要输出的导出副本，不要手动重命名应用内部数据目录。

<PlatformContent platform="macos">

出现 **Install Open-Science before updating** 时，应用正在只读位置运行。选择 **Install in Applications**，或通过 Finder 将应用移入 Applications。安装完成后使用 **Restart**，或退出当前副本、从 Applications 重新打开，再检查更新。**Continue using** 只会继续使用当前副本，不会让该位置变为可更新。安装失败时先按显示的错误处理。

</PlatformContent>

<PlatformContent platform="windows">

重新安装会保留已有数据。如果数据损坏后明确需要从头开始，可参阅 [Windows 本地数据重置](troubleshooting.md#windows-data-reset)。这个独立工具会删除数据，不属于普通更新步骤。

</PlatformContent>

## 排查安装与启动问题 {/* #启动失败的第一轮检查 */}

| 失败位置 | 首先检查 |
| --- | --- |
| 安装包或应用启动 | 核对下载来源、操作系统与 CPU 架构，再阅读系统提示 |
| 源码安装 | 确认 `node --version`、`npm --version` 可用，`npm install` 已完成；依赖下载中断时重试 |
| 首次配置 | 阅读 Environment 中未通过的检查，解决其提示的具体要求 |
| 首次代理请求 | 确认 Agent 为 Active/Ready，并在 Model 页面执行 **Test connection** |
| 提供方或本地浏览器连接 | 检查报错中的端口、代理或证书信息，参见[故障排查](troubleshooting.md) |

## v0.31.0 之后的产品名称 {/* #product-name */}

当前界面和新安装包统一使用 **Open-Science**。升级会保留已有安装名称与位置、研究数据、凭据和设置。旧安装路径仍包含 `Open Science`，本身不代表升级失败；不要为了匹配新的显示名称而重命名或移动数据目录。
