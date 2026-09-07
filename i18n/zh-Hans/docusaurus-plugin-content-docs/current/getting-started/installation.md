---
sidebar_position: 1
title: 安装与运行
last_update:
  date: '2026-08-13'
---

# 安装与运行

普通用户应优先使用 GitHub Releases 提供的桌面安装包。贡献者或需要调试最新版功能的用户可以从源码启动。Open Science 是 Electron 应用，渲染层同时支持受令牌保护的本地 Web 访问。

## 桌面安装

1. 打开 [Open Science Releases](https://github.com/aipoch/open-science/releases)。
2. 选择与你的操作系统和 CPU 架构对应的安装包。
3. 启动应用；首次运行会进入五步 Onboarding。
4. 若系统拦截未签名应用，请只从 AIPOCH 官方 GitHub 仓库重新下载，并按操作系统安全提示确认来源。

## 从源码运行

要求：Git、Node.js 22、npm，以及至少一个受支持的 agent framework。仓库会在安装阶段生成 Prisma Client、应用补丁并准备 Electron 原生依赖。

```bash
git clone https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

构建生产包前先运行：

```bash
npm run build
```

`npm run build` 会依次完成 TypeScript 检查以及 renderer、preload、main 三个 Electron 构建目标。若只想验证 Web/headless 入口，应使用仓库已有的 headless 参数和单独的数据目录，避免测试数据进入默认存储。

## 首次运行需要的外部能力

| 能力 | 是否必需 | 用途 |
| --- | --- | --- |
| OpenCode、Claude Agent 或 Codex | 至少一个 | 驱动对话式 agent session |
| 模型 Provider 与 API key | 是 | 生成计划、回答和工具调用 |
| Python / R | 可选 | Notebook 代码执行；可以使用检测到的系统环境或应用管理环境 |
| 网络 | 推荐 | 安装运行时、连接 Provider、GitHub、远程服务和 MCP Connectors |
| SSH 主机 | 可选 | Compute 面板中的远程任务与结果回收 |

## 本地数据

默认数据目录由引导页显示并可修改。该目录保存项目、artifact 和其他应用数据；私有配置、密钥密文与运行状态位于应用配置目录。不要把数据目录与源码仓库混用，也不要在应用运行中手动搬动数据库。迁移请使用 [Storage 面板](../settings/storage-general.md#storage存储)。

## 启动失败的第一轮检查

- `node --version` 与 `npm --version` 是否可用。
- `npm install` 是否完整结束；网络中断后可直接重试。
- Onboarding 的 Environment 页是否全部为 Ready。
- Agent 页是否至少有一个 runtime 显示 Active/Ready。
- Model 页的 `Test connection` 是否成功。
- 端口、代理或证书软件是否拦截 Provider 与本地 Remote control。
