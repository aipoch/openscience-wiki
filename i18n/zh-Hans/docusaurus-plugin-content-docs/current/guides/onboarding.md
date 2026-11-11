---
title: "首次设置"
last_update:
  date: '2026-11-11'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# 首次设置

首次启动的步骤顺序为：Environment、Data location、Agent runtime、Model provider、Notebook runtime。底部 `Back` 和主操作按钮负责移动步骤；只有当前步骤达到可继续条件时，主操作才可用。

<PlatformGuide />

如果选择外部 Agent，后续可以在[代理设置](frameworks.md)中管理和更新。内置 **Open-Science Agent** 随应用提供。

## 1. Environment

从 **Prepare environment** 开始。应用会先检查本机环境，再让你选择 Agent 和连接模型。结合每项状态与说明，确认是否有需要处理的要求。

| 检查项或控件 | 含义 | 操作方法 |
| --- | --- | --- |
| System compatibility | 检查操作系统和处理器架构 | 确认识别结果与你的电脑一致 |
| App storage permission | 检查应用配置目录的写入权限 | 失败时处理所示路径的权限，再重新检查 |
| Secure credential storage | 检查操作系统凭据库是否可用 | 先解决凭据库存取问题，再填写密钥 |
| Installation network | 判断所选 Agent 是否需要下载；需要时检查软件包来源 | 使用内置 Agent 时可显示无需下载；这不代表模型连接已通过 |
| `Check again` | 重新执行环境检查 | 检查期间变为 `Checking…` 并禁用，避免重复发起 |
| `Continue` | 进入数据位置设置 | 必需检查通过后可用，检查过程中禁用 |

打开 **Environment** 步骤，阅读四项结果，点击 **Check again**，等待底部出现 **All required environment checks passed.**，再点击 **Continue**。这一步环境检查不需要 API key 或付费模型调用；模型认证在后续步骤配置。

选择空间充足的稳定数据位置，不要把截图中的临时路径用于长期存储。应用使用英文时，系统原生文件选择器仍可能使用操作系统语言。

阅读每行检查的结果和说明。若某项标为 Ready，仍需阅读说明；例如使用已有代理时，安装网络检查可能无需下载文件，并不代表所有外部服务都已连通。

<PlatformContent platform="macos">

![macOS 首次设置中的环境检查已完成](/img/open-science/v121/onboarding-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Windows 首次设置中的环境检查](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Linux 首次设置中四项环境检查均已通过](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. Data location

<PlatformContent platform="macos">

![选择文件夹前的数据位置页面](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
在安装运行时之前确定大型文件的存放位置。产物、Notebook 和环境使用数据目录；配置和历史记录留在配置位置。页面显示的路径是只读摘要，不能直接在其中输入。

| 控件 | 操作和结果 |
| --- | --- |
| `Location`／路径显示 | 展示默认数据目录，或你刚选定的目标目录 |
| `Browse…` | 打开系统目录选择器；选择父文件夹后，回到页面检查最终的应用管理路径 |
| 系统选择器 `Cancel` | 取消本次选择，保留此前路径 |
| `Use default location instead` | 选过自定义目录后出现；清空自定义选择及相关错误 |
| `Back` | 返回 Environment |
| 保持默认位置时点击 `Continue` | 进入 Agent runtime |
| 选过新位置后点击 `Continue` | 打开 `Restart to set up your data?`，不会静默切换目录 |
| `Retry` | 默认位置读取失败时出现，用于重新读取 |

<PlatformContent platform="macos">

![选择父文件夹后显示最终应用数据路径](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
点击 **Browse…**，在空间充足的磁盘上选择空父文件夹，检查向导显示的完整受管理路径。选择 **Continue** 并阅读重启确认。研究数据应放在稳定位置，不要使用临时目录。

<PlatformContent platform="macos">

![数据位置重启确认](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| 确认框控件 | 结果 |
| --- | --- |
| 关闭按钮 `×` | 返回位置页，并保留刚选的路径 |
| `Keep default` | 清除刚选的路径，以默认位置继续下一步 |
| `Restart` | 启用所选数据位置并重启应用；重启后继续 Agent runtime |

应用会先检查目标文件夹。已有且可识别的数据目录可以原地接管，页面会说明没有搬移数据；不可用目录会显示错误。启用或重启失败时可显示错误，并允许重试或使用默认位置。不要手动搬动或改名应用管理的数据文件夹。

### 接管已有数据目录

1. 选择 **Browse…**，选中包含已识别应用数据目录的父文件夹。
2. 确认提示 **This folder already contains Open Science data — it will be used as-is (nothing is moved).**，核对完整路径后选择 **Continue → Restart**。
3. 重启后向导续接到 **Agent runtime**，所选数据位置保留，再完成后续设置。

接管后打开代表性文件，确认所需数据仍在。接管针对大文件存储，不会导入另一安装的设置、会话数据库或凭据。**Keep default** 清除拟用位置并继续使用原生效位置。

### 数据位置无法保存时如何恢复

若提示 **Could not finish setting up storage: EACCES: permission denied**，先看报错指向的路径。配置目录同样需要可写；只选择可写的数据目标目录未必能解决问题。恢复受影响的应用专用配置位置访问权限后，可重试，或选择 **Use default location instead → Continue**。

<PlatformContent platform="macos">

![实际配置写入失败与恢复入口](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
如果重启在新位置生效前失败，恢复应用配置目录的写入权限后重新打开向导。先核对当前生效路径并打开已有文件，再决定是否重试切换位置。具体检查见[存储与归档内容](storage.md)。

## 3. Agent runtime

新配置默认使用内置 **Open-Science Agent**。它随应用提供，支持兼容的 API 提供方和 **Codex subscription**；无需再安装其他 Agent 即可完成这一步。

1. 在 **Installed** 下找到 **Open-Science Agent**，确认卡片显示 **Active**。
2. 等待页面显示 **All required environment checks passed.** 后继续。若检查未通过，先按页面提示处理，再点击 **Re-detect**。
3. 点击 **Continue** 进入 **Model provider**，在下一步连接并测试模型后，才能发送请求。

<PlatformContent platform="macos">

![内置 Open-Science Agent 已为 Active，五个外部运行时均未安装，Continue 可用](/img/open-science/v121/onboarding-builtin-agent.webp)

</PlatformContent>

Agent 卡片上的版本号属于运行时或适配器，不是模型版本。**Active** 表示当前选中了该运行时，不代表模型已连接。下一步选择 **Codex subscription**，也不需要先安装独立的 **Codex** 运行时。

<details>
<summary>选择外部 Agent（可选）</summary>

如果需要 **Codex**、**Claude Agent**、**OpenCode**、**CodeBuddy** 或 **Pi** 的提供方支持或运行方式，可以改选对应运行时。已有安装时，点击 **Re-detect** 后选择其卡片；尚未安装时，打开 **Install**，选择受支持的来源并等待安装完成。确认 **Active** 且必需检查通过后，再继续。

安装来源、切换和修复方法见[安装与切换代理框架](frameworks.md)。完成向导后，也可以在 **Settings → Agent** 中更换运行时。

</details>

## 4. Model provider

表单会随 **Provider type**、所选 Agent 和认证方式变化。使用内置 Agent 连接 Codex 订阅时，选择 **Codex subscription**。如果本机已有 Codex 登录，在 **Codex authentication** 中选择 **Import existing Codex sign-in**，再点击 **Test & continue**。若没有可用登录，选择受支持的登录方式并按提示操作，详见[提供方配置](providers.md#builtin-codex-subscription)。连接检查通过后再继续。

<PlatformContent platform="macos">

![尚未认证的英文 Codex 订阅表单](/img/open-science/v121/onboarding-codex-provider.webp)

</PlatformContent>
使用 API 提供商时，选择类型，填写其要求的端点和模型信息，然后选择 **Test & continue**。向导先检查必填字段，再执行连接测试。测试成功后推进向导；输入或连接错误会保留在表单中供修改。

<PlatformContent platform="macos">

![Custom Gateway 必填字段校验](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
认证方式、高级字段及连接失败的处理见[提供方设置](providers.md)。

API Key 只填写在专用凭据字段中，不放入截图、项目指令或对话消息。

## 5. Notebook runtime

最后一步为可选设置，复用完整的 **Settings → Runtimes** 界面。默认使用应用管理的 Python，也可以选择已检测到的解释器，或稍后配置其他环境。

| 向导控件或状态 | 操作结果 |
| --- | --- |
| **Back** | 返回 Model provider。运行时准备中或正在完成设置时禁用 |
| **Finish** | 保存初始设置完成状态。Notebook 配置可选，不要求先准备好自定义解释器 |
| 已启动环境准备 | 等待完成或先取消准备任务；期间 **Back** 与 **Finish** 禁用，避免遗留半成品环境 |
| 完成失败 | 显示错误，并允许重试 |

选择 **Finish**，确认首页打开，再按[首次项目](first-project.md)创建小项目并保存结果。重新打开应用，确认项目仍可访问。若向导意外重新出现，先检查数据位置和配置写入错误，不要立即新建另一套配置。

<PlatformContent platform="windows">

Windows 的 **Notebook runtime** 页面还可能显示 **Local Shell · WSL2 Bash Preview**。阅读底部 **Optional — nothing here is required to finish setup.**：暂不配置 Python/R、没有安装 WSL2 时，也可以点击 **Finish**。请求代码执行前仍需准备相应运行环境；完成向导不会自动安装这些可选环境。

![Windows 可选 Notebook 与 WSL2 设置，Finish 按钮可用](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## 设置后的验收清单

| 检查项 | 应看到的证据 | 失败时处理 |
| --- | --- | --- |
| Environment | 必需检查通过 | 解决具体要求后重新检查 |
| Data location | 最终托管路径符合预期 | 回到路径页检查，不能只凭选择器里的父目录判断 |
| Agent | 所选运行时就绪且显示 **Active**；内置 Agent 无需另行安装 | 按提示处理后点击 **Re-detect** |
| Provider | 连接已验证，主模型已选择 | 检查登录或提供方专有字段 |
| Notebook | 需要代码执行时，运行时 Ready 且已启用 | 先配置 **Settings → Runtimes** |
| 首个任务 | 有代理回复与可打开的保存结果 | 分别检查权限、工具错误和模型连接 |

<span id="完整设置后的实际结果" />

## 重新配置

完成引导后不需要重新运行 wizard：Model、Agent、Runtimes、Storage 分别对应上述设置。若数据目录损坏或应用配置目录不可写，Settings → Storage 会显示修复入口。

## 源码依据

[OnboardingWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironmentStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [LocationStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
