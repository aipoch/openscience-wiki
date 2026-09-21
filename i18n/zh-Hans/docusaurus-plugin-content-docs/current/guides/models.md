---
title: "模型与任务策略"
last_update:
  date: '2026-09-20'
---

# 模型与任务策略

先按任务选择模型，再核对哪些设置会继承主模型。**Provider** 提供模型访问，**Agent** 执行对话和工具，**Specialist** 提供可复用角色与指定能力。更改其中一项不会自动安装或配置其他项。

Main、Subagent、Reviewer、Vision 和 Session details 需要不同模型时，使用下方任务策略。结果任务中应检查提供方和模型，尤其是多个提供方使用相同模型名称时。

## 选择主模型

1. 打开 **Settings → Model**；工作区输入框的 **Select model** 也提供模型入口。
2. 展开 **Main model**，在已配置的 Provider 下选择可用模型。目录中出现某个名称，不代表账号必然有权限使用。
3. 选择 **Reasoning effort**，以当前模型显示的选项为准。例如部分模型提供 Default、Low、Medium、High、XHigh、Ultra，其他模型可能不同。
4. 关闭并重新打开设置，确认保存状态；先执行一个小请求，再开始长分析。

![主模型与已连接的 Provider](/img/open-science/guides-walkthrough/10-model-main.webp)

更改影响后续请求，不会改变历史回答使用的模型。切换模型时，应用尝试保持相近推理强度；后端可能近似映射不支持的档位。更高强度可能增加耗时和用量，不代表结果一定正确。

## 配置不同任务的模型

点击场景行展开；打开另一行会收起前一行。更改后检查收起行中的摘要，区分继承、固定模型和不可用状态。

| 场景 | 模型选择 | 需要核对 |
| --- | --- | --- |
| Subagent | Same as main model 或单独的兼容模型 | 跟随主模型时独立推理控件不可用；仍需启用 Delegation |
| Reviewer | Follow main model 或指定模型 | 设置模型不等于开启 Auto-review，也不等于已有审查记录 |
| Vision | 支持图像输入的已配置模型 | Not configured 表示未指定专用 Vision 模型；是否需要转交图像取决于当前后端能力 |
| Session details | 跟随主模型或指定兼容模型；检查强度与启用状态 | 用受限调用生成会话标题和说明，与科研任务和产物分开 |

![Subagent 继承与禁用的独立强度控件](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

固定场景模型时先选 Provider/模型，再选支持的强度。希望未来主模型变更自动传递时，改回继承选项。**Unavailable** 可能保留已移除或不再兼容的旧模型名，需要重新选择有效项。


Session details 选择器不接受 Codex 订阅模型；Main 或 Vision 中能看到的模型不一定能用于标题生成。选择兼容本地提供方和 OpenCode 后，本地模型可作为固定选项出现。推理强度旁的 **Not supported** 表示该控制项不可用，与能否发送文本请求是两回事。

### 使用独立 Vision 模型读取图表

当会话的 Main 模型无法接收图片时，可以使用 Vision。Main 本身支持图片输入时，也可以直接读取。

<p className="example-label"><strong>案例演示</strong> 核对样本计数图的标签</p>

1. 展开 **Settings → Model → Vision**，选择可用的图像模型。推理强度控件可用时，再选择所需强度。
2. 会话中保持所需的文本模型。更改 Vision 不会替换 Main。
3. 使用 **+ → Attach files** 附加图表，发送前确认输入框中已显示文件名。
4. 明确要求识别标题、坐标轴标签、单位和样本数量等可见信息；看不清的标签应明确说明。
5. 对照原图核对回答。精确数值比较应查看源表格：本例中两个标签都四舍五入为 **24.7M**，不代表原始计数相等。
6. 不再需要独立图像模型时，将 Vision 改回 **Not configured**；这不会删除模型提供方。

![文本 Main 模型与独立 Vision 配置](/img/open-science/sept11-completion/vision-configuration.webp)

![核对图表标签及四舍五入数值的限制](/img/open-science/sept11-completion/vision-result.webp)

当前图片转交逻辑排除了 Codex 订阅提供方，但它们仍可能出现在 Vision 选择器中。如果选择后，文本 Main 仍拒绝接收图片，请改用其他兼容的 Vision 提供方，或选择本身支持图片的 Main 模型。选择已保存不代表图片请求已成功。

### 确认会话标题确实由模型生成

在 **Session details** 选择 **Same as main model** 或指定兼容模型后新建会话。等待标题从首条提示词的截断文本变为简短标题，再检查保存的说明；只看到提示词回退并不能证明生成成功。

辅助请求结束后检查保存的标题和描述。标题仍是截短的提示词时，核对模型兼容性、本地服务负载及调用最终状态；辅助调用超时可能保留该回退标题。会话标题生成使用自己的模型策略，不会执行会话中的科学计算。

## Provider 控件与排查

| 控件或状态 | 下一步 |
| --- | --- |
| Add provider | 按[模型接入](./providers.md)完成认证和端点配置 |
| Check Codex login | 检查订阅登录状态，不会运行科研任务 |
| Re-import Codex login | 通过应用导入已刷新的现有登录 |
| Edit | 检查配置；替代方案验证成功前保留可用配置 |
| Delete 禁用 | 当前状态不允许移除该 Provider，先准备另一套有效配置 |
| 兼容性提示 | 检查 Agent 和 API 格式，避免反复盲目重试 |
| 场景列表为空 | 先配置符合要求的 Provider/模型，不是随意填写模型名 |

执行后端见 [Agent](./frameworks.md)，用量见 [Usage](./usage.md)，优先级见[配置参考](../reference/configuration.md)。

源码：[主模型](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx)、[场景策略](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx)。

## 可选的分类模型 {/* #classification-models */}

打开 **Settings → Model → Classification models**。分类服务在请求开始前辅助选择相关 Skill 和 Connector，不会替换 Main，也不会增加一个聊天模型。可以将 **Automatic capability selection** 保持为 **Use default method**；不配置分类服务，Skill 和 Connector 仍可使用。

v0.31.1 中，该路径用于 **Codex Chat Completions** 或 **CodeBuddy** 的主会话。不能据此认为 Codex 订阅会话或所有框架都会使用此服务。发送给分类服务的内容仅包括当前请求及能力名称、描述；服务不可用或分类结果不明确时，会继续使用默认方式。

![分类模型的默认方式与可选服务入口](/img/open-science/v0311/classification-models.webp)

1. 选择 **Add service**，再选择 **TypeSafe AI** 或 **OpenRouter**。
2. 填写服务名称和 API 凭据。OpenRouter 可复用兼容的已有账户或使用新密钥；截图时保持密钥隐藏。
3. 点击 **Save**，等待验证。验证失败时，原有设置保持不变。
4. 在 **Automatic capability selection** 中选择已保存的服务和目录中提供的模型。通过 **Check model** 检查连接。
5. 在受支持的主会话中发送一个范围明确的请求，查看实际选择的工具。模型连接检查通过，本身不能证明科研结果正确。

移除服务会将其绑定恢复为默认方式。单独保存的服务密钥会一并移除；复用已有账户的服务被移除时，不会删除该账户或其密钥。

聊天模型配置见[提供方设置](providers.md)。本地 PDF 解析资源由另一个 **Local parsing models** 标签页管理。

![分类服务表单，API key 尚未填写](/img/open-science/v0311/classification-add-service.webp)

使用 Jev 时，在 **Automatic capability selection** 中选择 **TypeSafe AI / Jev Latest**，再点击 **Check model**。出现 **Check passed** 表示服务可以响应；重新打开 Settings，确认所选绑定仍然保留。

![已选中 TypeSafe AI / Jev Latest，显示 Check passed，密钥保持隐藏](/img/open-science/v0311/classification-connected.webp)

例如，在 Codex Chat Completions 会话中查询公开的 TP53 信息时，可由 Jev 选择 `mcp-genes`。在活动记录中检查选中的能力，再查看数据库响应获取查询结果。Codex 订阅会话使用原有的能力加载方式；保存 Jev 绑定不会让这类会话改用 Jev。
