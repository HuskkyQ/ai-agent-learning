# AI Agent Learning

这是一个 30 天 Agent 开发学习项目，用于记录学习、实践、复盘和最终项目沉淀。

## 学习节奏

- 上午：学习当天新知识。
- 下午：完成当天实践任务。
- 晚上或学习结束后：记录完成内容、问题、产出和下一步。

## 目录结构

```text
ai-tasks/ai-agent-learning/
├── README.md
├── agent-30-day-study-plan.md
├── learning-log.md
├── resources.md
├── daily/
│   ├── day01-*/README.md
│   └── ...
├── notes/
├── projects/
├── data/
└── evals/
```

## 使用方式

1. 每天打开 `daily/dayXX-*/README.md`。
2. 上午完成“学习内容”。
3. 下午完成“实践任务”。
4. 把笔记、代码或评估结果放入当天 README 指定的产出路径。
5. 在 `learning-log.md` 追加当天学习记录。

## 主线资料

- [Agent-Learning-Hub](https://github.com/datawhalechina/Agent-Learning-Hub)
- [hello-agents](https://github.com/datawhalechina/hello-agents)
- [AgentGuide](https://github.com/adongwanai/AgentGuide)
- [ai-agents-from-zero](https://github.com/didilili/ai-agents-from-zero)
- [awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents)
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [LangChain Docs](https://docs.langchain.com/oss/python/langchain/overview)
- [LangGraph Docs](https://docs.langchain.com/oss/python/langgraph/overview)

## 当前目标

30 天后完成一个可展示的 Agent 项目，至少包含：

- LLM 调用
- Tool Calling
- RAG 或外部工具
- LangChain 或 LangGraph 编排
- 日志 / Trace
- 评估集
- README 和项目说明

## 静态网站

本仓库已经配置为 Astro 静态站，可以部署到 Vercel。

本地开发：

```bash
pnpm install
pnpm run dev
```

构建验证：

```bash
pnpm run build
```

Vercel 导入仓库时使用：

- Framework Preset: `Astro`
- Install Command: `pnpm install`
- Build Command: `pnpm run build`
- Output Directory: `dist`
