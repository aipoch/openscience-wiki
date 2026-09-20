---
title: "服务凭据"
last_update:
  date: '2026-09-20'
---

# 服务凭据

在 **Settings → Credentials** 为实际发起请求的服务配置凭据。Codex 订阅提供模型访问，不提供 OpenAlex、GitHub 或自定义 MCP 账号。

## 内置服务

| 服务 | 字段与用途 | 验证方式 |
| --- | --- | --- |
| GitHub | Skill 发现/导入用 Personal access token | Connect/Manage 后使用目标仓库操作验证 |
| Literature access | 联系邮箱及可选 NCBI API key | 保存真实联系信息；支持的 NCBI 请求中密钥可选 |
| OpenAlex | Literature 中 OpenAlex 操作的 API key | Validate、保存，再运行小查询 |
| Unpaywall | 查询全文位置所需联系邮箱 | 使用文献联系邮箱，不填写虚构地址 |

**Connect** 打开未配置服务，**Manage** 管理已有配置，**Desktop only** 表示需要桌面环境。已存储标记不是密钥明文。

## 补充缺失的 OpenAlex 密钥 {/* #openalex-实际缺密钥流程 */}

1. 未配置密钥时请求 OpenAlex 查询。
2. 对话出现 **Add your OpenAlex API key** 和 **API key** 输入框。
3. **Save key** 成功保存后继续等待中的调用；**Not now** 保持未配置。
4. 检查最终状态。选择 **Not now** 可返回 **credential_required**；配置密钥后再重试。

![英文应用中的 OpenAlex 凭据请求](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

界面说明密钥在本机加密并只发送到 `api.openalex.org`。Settings 表单另有 **Validate、Save、Remove key**（已有密钥时）和 **Cancel**。替换字段不显示旧密钥；安全存储不可用时需先解决系统钥匙串状态。

## 自定义 Connector 凭据

在此创建凭据，再到 [Connector 配置](../guides/connectors.md)选择其名称。修改或移除共享凭据前先核对使用者。

### New credential 表单

| 字段或按钮 | 操作 |
| --- | --- |
| Name | 为凭据设置便于识别的本地名称 |
| Type | 选择 **API key**、**Access token**、**OAuth** |
| Value | key/token 的遮罩输入框；必填项为空时 Save 禁用 |
| OAuth → Resource URL | 填写准确资源地址，Connector 按资源 URL、传输方式和注册配置匹配 |
| Advanced → Transport | 选择服务要求的传输方式，当前默认是 Streamable HTTP |
| Scopes | 用空格或逗号分隔作用域 |
| Use a pre-registered client | 展开 **Authorization server URL**、**Client ID**、**Callback URL**、**Client secret** |
| Callback URL / Copy | 当前默认 `http://127.0.0.1/oauth/callback`，可复制用于服务注册，也可展开自定义回调选项 |
| Discovery | 适用时发现服务器元数据；发现成功本身不是登录成功 |
| Cancel / Save | 放弃草稿或保存有效配置 |

![OAuth 高级注册字段](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

在自定义 Connector 中，将命名凭据绑定到请求头、环境变量或 OAuth 选择器。名称用于引用，不应把密钥放进描述或项目指令。导出的可移植配置以占位符替换密钥；保存凭据后仍需实际服务测试才能确认可用。

## 验证与排错

保存后执行一次小范围操作，读取实际响应。`credential_required` 表示缺少已配置凭据；401 需检查认证，403 需检查权限/策略，不能一律靠换密钥解决。429 涉及限流或用量。保留服务正文，参见[排错](../guides/troubleshooting.md)。

移除凭据可能影响所有绑定的 Connector。Connector 和 Specialist 导出不会携带现成密钥/信任，接收端应重新配置。不要将密钥写入 Skill、提示词、截图或 issue。

OpenAlex 查询需要有效的 OpenAlex 密钥；OAuth Connector 需要完成对应服务登录。处理显示的认证错误后，再重试同一小请求。

实现依据: [CredentialsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnectorAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx)。

可通过本地认证的 [CLI/SDK 凭据管理](../reference/cli.md)创建/更新共享凭据。Linux headless 可显式选择[未加密文件存储](../reference/server.md)，桌面凭据仍遵循正常 OS 存储行为；此选项不解决 Compute 密码存储，也不发起首次 OAuth 登录。

## 打开官方 API Key 页面 {/* #official-api-key-page */}

从 v0.31.0 起，OpenAlex 和 NCBI 的凭据提示包含官方 API Key 页面链接。打开链接时，表单草稿和等待中的 Connector 调用会保留。在服务方完成账户操作后，返回凭据表单，验证并保存所需密钥，再重试查询。仅打开获取密钥的页面，不会自动保存密钥或完成查询。
