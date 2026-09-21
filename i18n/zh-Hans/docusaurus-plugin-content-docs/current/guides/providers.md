---
title: "提供商与本地模型配置"
last_update:
  date: '2026-09-20'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 提供商与本地模型配置

## 选择访问方式

![英文首次设置中的 Codex 订阅连接](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type` 用来选择订阅登录、官方 API 或 `Custom Gateway`。订阅选项受当前智能体框架影响。Codex 的提供方选项包括 Codex subscription、xAI OAuth、官方 API 和 Custom Gateway；其他框架不一定显示完全相同的选项。

| 选择 | 需要准备 | 继续前检查 |
| --- | --- | --- |
| Codex subscription | 兼容的 Codex 登录 | 检查 `Codex authentication`；导入现有登录会将认证复制到 Open-Science |
| 官方 API | 提供方账号及具体模型访问权限 | 确认提供方、适用区域和 API 凭据 |
| Custom Gateway | 兼容端点、准确的模型标识，以及服务要求的 API key | 向网关维护者确认 API 格式及模型能力 |

选择 **Import existing Codex sign-in**，将本机可用的登录复制到 Open-Science。导入可包含兼容的非秘密本地回环路由，其他全局配置、Skills 和会话保持独立。在 **Advanced settings → Transport** 保留 **Auto (recommended)**，除非连接需要其他传输方式。

## 选择提供商区域或免费目录模型 {/* #provider-regions */}

使用 **SenseNova** 时，先在提供商表单中选择 **China** 或 **Global**，再选择模型。填写该区域对应的 API key，核对模型列表，点击 **Save**，等待连接验证成功后提交修改。切换区域可能同时改变地址和可选模型，另一区域的密钥或模型名未必可用。

使用 **OpenRouter**、**OpenCode Zen** 等网关时，只选择当前框架目录中实际提供的免费模型条目，并按服务要求配置账号和凭据。免费条目仍可能有用量限制，也不代表支持全部工具或图片输入。不要给任意模型 ID 自行添加 `:free`。先发送一个小请求，核对返回模型和结果，再用于研究任务。

## 接入已有 Codex 订阅 {/* #接入已有-codex-订阅已实操路径 */}

1. 打开 **Settings → Model → Add provider**。
2. 将 **Provider type** 设为 **Codex subscription**。
3. 在 **Codex authentication** 中选择 **Import existing Codex sign-in**。电脑需要已有可用登录。该操作复制认证到应用配置，不导入其他 Codex 会话和 Skills。
4. 点击 **Save**。提供方显示 **Testing…** 时等待检查结束；仅出现一行配置不代表已连通。
5. 确认提供方显示 **Connection verified** 和认证已导入的提示。已发布版本的界面名称可能尚未使用连字符。
6. 在 **Main model** 选择订阅可用模型。例如，账号提供 **gpt-5.6-sol** 时可选择该条目。有多个提供方时，同时核对模型名称和提供方。
7. 打开项目发送范围明确的请求。连接测试检查认证，实际回复检查请求链路。确认该会话中出现回复及适用的工具审批请求。

![订阅连接已验证，并选定主模型](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| 提供方行操作 | 使用时机 | 检查结果 |
| --- | --- | --- |
| **Check Codex login** | 怀疑已保存登录过期 | 等待显示已验证或具体失败状态 |
| **Re-import Codex login** | 外部登录更新后，希望更新应用中的副本 | 重新导入并检查认证 |
| **Edit** | 检查认证方式或传输设置 | 点击 Save，等待验证成功后提交修改 |
| **Delete** | 移除不再使用的提供方 | 取决于是否仍被依赖；仍被使用的提供方可能无法删除 |

**Testing…** 不表示失败，**Connection verified** 也不表示所有模型与工具均已运行成功。导入失败时，先完成支持的 Codex 登录流程再重试；不要将认证 JSON 粘贴到提示词或文档中。


智能体运行时负责执行任务，模型提供方负责提供模型。安装 Codex 不会自动完成模型连接。首次设置中，本页位于 Agent runtime 之后；完成设置后可通过 **Settings → Model** 管理模型访问。

如果导入提示缺少保存在文件中的 Codex 登录，应通过受支持的 Codex 登录流程完成登录，再重试 **Re-import Codex login**。仅保存在外部凭据库中的登录不一定能作为文件导入。

## 更新或移除 API 凭据

服务端更换密钥后，在 **Settings → Model** 找到对应提供方，点击 **Edit**，将新密钥填入 **API key** 并点击 **Save**。编辑时留空会保留旧密钥，不表示清除。先等待连接验证成功，再提交修改；若显示认证失败，先核对服务地址、密钥所属账号和有效期，再重试。

确认 **Connection verified** 后，用该提供方完成一个小请求。只移除不再被使用的提供方：点击 **Delete** 并核对确认框名称。删除应用中的配置不会替你撤销服务端密钥。

## Custom Gateway：逐项填写

![自定义网关的必填项错误](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

先选择 `Custom Gateway`。切换类型时，显示名称可能保留上一类型的值，因此需要手动检查名称。

| 字段或控件 | 填写方式与行为 |
| --- | --- |
| `Provider type` | 选择提供方类型，并改变后续表单 |
| `Name`／`Provider name` | 可选显示名，例如 `Lab gateway`，不是模型标识 |
| `Base URL` | 必填的网关基础地址。远程模型端点必须使用 HTTPS；localhost 和回环地址可以使用 HTTP。填写运营方提供的真实地址，不要使用不可连接的 `https://gateway.example` 占位地址 |
| `API format` | 选择 Chat Completions、Messages 或 Responses，旁边的路由帮助识别协议 |
| `API key` | 远程网关需要填写；无需认证的本地回环网关可留空。如果本地服务启用了认证，仍需填写真实凭据 |
| 眼睛／`Show API key` | 切换当前输入的可见性；截图和分享前保持隐藏 |
| `Model` | 必填端点接受的准确模型标识；截图中的 `demo-model` 仅为占位示例 |
| `Context window` | 可选上下文上限；留空使用提供方默认值 |
| 上下文预设 | 32K、64K、128K、200K、256K、1M；选择 128K 时填入 `128000` |
| `Advanced settings` | 展开或收起能力与词元限制字段 |
| `More information`（i） | 查看相邻字段的帮助说明 |
| `Back` | 返回 Agent runtime；表单草稿由引导流程保存，可在返回时保留 |
| `Test & continue` | 先检查必填项，再在输入有效时保存并测试；有效且成功的验证结果才允许进入下一步 |

API 格式菜单包含：

- **Chat Completions**：`/v1/chat/completions`。
- **Messages**：`/v1/messages`。
- **Responses**：`/v1/responses`。

这些路由用于区分协议，不是要求把所有路由都拼进 Base URL。网关支持一种格式不等于支持另外两种。

<ToolOperationGroup>
<summary>高级字段与条件显示</summary>

旧的远程 HTTP 配置仍可编辑，但不能发送请求。向服务运营方取得 HTTPS 地址，保存后重新测试。本机回环地址的模型服务可以继续使用 HTTP；局域网中的远程服务器仍需 HTTPS。

### 高级字段与条件显示

| 字段或控件 | 设置方法 |
| --- | --- |
| `Image input` | 只有网关和模型都接受图片输入时才启用 |
| `Thinking mode` | 只有网关和模型接受思考或推理强度控制时才启用 |
| `Supported effort levels` | 启用思考后显示；选择实际支持的档位，不要仅凭模型名称判断 |
| `Reasoning request format` | 使用 Chat Completions 且思考已启用时出现；按网关要求选择参数格式 |
| `Maximum input tokens` | 独立的最大输入词元数；留空使用默认值。预设为 32K、64K、128K、200K、256K、1M |
| `Maximum output tokens` | 独立的最大输出词元数。预设为 4K、8K、16K、32K、64K、128K |

启用 **Thinking mode** 后可配置支持的推理强度。使用 **Chat Completions** 时，还应选择端点支持的推理请求格式。这些声明需要与提供方 API 能力一致。


</ToolOperationGroup>

### 测试网关配置 {/* #跟着操作 */}

1. 选择 Custom Gateway，展开 Advanced settings。
2. 填入提供方给出的 Base URL 和准确模型 ID，并按要求填写 API key。缺少必填项时会出现行内错误，并留在当前页。
3. 填写可识别的显示名。准备真实连接时，使用提供方给出的真实端点和模型；演示占位值不能通过连接测试。
4. 选择一个上下文预设，检查输入框中的数值。
5. 仅在实际支持时启用 Thinking mode，观察新增字段；切换 API format 可能改变字段集合。
6. 需要密钥时私下填写并保持隐藏，准备向提供方发起请求时点击 `Test & continue`。
7. 等待结果。验证期间显示 `Testing connection…` 并阻止重复提交。适用的订阅流程会显示 `Sign in & continue`、`Waiting for sign-in…` 和 `Cancel sign-in`。

## 连接本地模型端点

<p className="example-label"><strong>示例</strong> 通过 Ollama 接入本地 Qwen 模型</p>

本地模型服务独立于 Open-Science 运行。使用 **Custom Gateway** 接入兼容端点，并选择支持该 API 格式的 Agent。下例使用 Ollama 和 OpenCode；安装 Python Notebook 解释器不会同时安装模型服务。

### 启动服务并下载模型

安装 [Ollama](https://ollama.com/download)，在终端启动仅限本机访问的测试服务：

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

保持该终端运行，在另一个终端下载模型：

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

等待下载完成。服务已启动但模型尚不存在时，应用可能提示 **Test failed: the configured model was not found.** 完成下载、确认模型 ID 后，再点击 **Test connection**。

### 填写提供方设置

打开 **Settings → Model → Add provider**，填写：

| 字段 | 本地连接示例 |
| --- | --- |
| Provider type | Custom Gateway |
| Name | Local Qwen demo |
| Base URL | `http://127.0.0.1:11435` |
| API format | Chat Completions（`/v1/chat/completions`） |
| API key | 本例无需认证的回环端点可留空；有认证的网关必须填写实际凭据 |
| Model | `qwen3:0.6b` |
| Context window | `32768`，与运行中的服务一致 |
| Advanced settings → Maximum output tokens | `4096` |
| Image input / Thinking mode | 此文本示例保持关闭；只有模型和网关支持时才启用 |

![本地地址、接口格式与准确模型 ID](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

表单会在网关根地址后补充 `/v1`。Open-Science 允许 `localhost`、`127.0.0.1`、`[::1]` 等回环地址的 API key 留空，旧截图中可能仍显示占位值。远程或局域网网关仍需要 HTTPS 和 API key；API 格式应与本地服务支持的格式一致。

输出预算需要为输入和会话历史留下空间。Maximum output tokens 留空时，OpenCode 会自行预留输出预算；对于较小的上下文窗口，过大的预留可能造成反复压缩。表单中的上下文大小也应与模型服务实际分配一致，仅修改表单不会改变 Ollama 的运行配置。

### 选择兼容 Agent 并检查实际回复

在 **Settings → Agent** 中，若未安装 OpenCode，选择 **OpenCode → App-managed download**。安装后点击其卡片并确认 **Switch**，再回到 **Model** 选择本地模型。先新建会话发送简短的连接检查，再用于研究任务。确认请求实际结束；保存配置或连接测试成功，不代表科学推理、工具调用或图像输入已经可靠。

本例通过配置的本地端点和 OpenCode 正常完成请求，返回 **Local model connected.**，验证的是文本连接，不是生物医学分析。

![本地模型连接检查正常完成](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

使用期间保持模型服务运行。Agent 在另一台主机运行时，`localhost` 指向那台主机；浏览器可以访问某个地址，不代表 Agent 同样可以访问。

### 核对真实工具调用

<p className="example-label"><strong>示例</strong> 检查本地模型的 Notebook 工具调用</p>

连接成功后，用结果已知的小任务检查工具路径。可要求 Agent 通过 Python Notebook 实际执行以下代码，而不是直接给出算术答案：

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

这些数字对应 GSE60450 第一个样本的零计数与检出基因数。检查权限面板中的代码，批准后打开 **Notebook**，核对输出 **27179 / True**。

![本地模型发起的 Notebook 代码与真实输出](/img/open-science/priority-completion/21-local-model-python-result.webp)

如果本地模型提出不存在的辅助模块，先检查代码，再明确提供上方无依赖代码。确认 Notebook 实际执行并返回预期结果后，才继续较复杂任务；一次小计算不能保证完整分析可靠。

## 无法继续时

| 现象 | 检查方向 |
| --- | --- |
| 必填提示 | 补齐提示指出的字段，仅有显示名不够 |
| 安全存储不可用 | 解锁或授权系统凭据库，恢复后才能保存密钥 |
| 连接或认证失败 | 检查凭据、端点、协议，以及当前账号对该模型的权限 |
| 提供方在测试中改变 | 检查当前选择后重新测试；过时结果不能完成设置 |
| 登录被取消 | 准备好后重新开始，取消不等于连接成功 |
| 运行时已安装但模型不可用 | 继续完成模型连接；安装运行时和授权模型是两个步骤 |

### 查询 HTTP 报错

遇到 400、401、403、404、429 或 5xx 响应时，查看 [HTTP 故障排查表](troubleshooting.md#http-错误400403429-与-5xx)，同时记录返回错误的服务与详细消息。

源码：[ProviderForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx)、[ProviderStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx)。

## v0.31.0 及后续版本如何保存提供方修改 {/* #validated-provider-save */}

提供方修改先经过连接验证，通过后才提交保存。点击 **Save** 后等待结果，确认成功再关闭表单。验证失败不会替换原有可用配置。已保存的连接在请求中被拒绝时，可用状态会更新；检查凭据和端点后重新测试。**Conversation models**、**Classification models** 和 **Local parsing models** 用途不同，详见[模型设置](models.md#classification-models)。
