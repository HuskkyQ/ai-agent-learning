# Day 3: LLM API 与消息结构

## 今日目标

- 理解 LLM API 的基本调用方式。
- 掌握 system / user / assistant message 的作用。
- 复习 token、上下文窗口、temperature、top-p、stream 等基础参数。
- 跑通一个使用 DeepSeek 模型的 LangChain 最小 Agent 示例。

## 任务清单

### 1. 学习任务

- [ ] 学习 system / user / assistant message 分别负责什么。
- [ ] 复习 token、上下文窗口、temperature、top-p、stream。
- [ ] 理解为什么 DeepSeek 可以通过 OpenAI 兼容接口接入 LangChain。
- [ ] 区分 `index.ts` 和 `test.ts` 两个示例的学习重点。

### 2. 实践任务

- [ ] 在 `projects/day03_cli_chat/` 中安装依赖并设置 `DEEPSEEK_API_KEY`。
- [ ] 运行 `pnpm test`，跑通 `test.ts` 的最小 DeepSeek Agent 示例。
- [ ] 观察第一轮对话中 Agent 如何调用 `get_weather` 工具。
- [ ] 观察第二轮对话中 Agent 如何使用同一个 `thread_id` 记住上下文。
- [ ] 可选：运行 `pnpm start`，对比更复杂的 `index.ts` 示例。

### 3. 需要回答/完成的问题

- 回答：system / user / assistant message 分别是什么？
- 回答：token、上下文窗口、temperature、top-p、stream 分别影响什么？
- 回答：`test.ts` 验证了哪些 Agent 能力？
- 回答：`index.ts` 和 `test.ts` 的主要区别是什么？

## 学习物料

- [LangChain JS Docs](https://docs.langchain.com/oss/javascript/langchain/overview)
- [LangChain OpenAI-compatible models](https://docs.langchain.com/oss/javascript/integrations/chat/openai)
- [DeepSeek API Docs](https://api-docs.deepseek.com/)

## 产出位置

- projects/day03_cli_chat/
- notes/day03-llm-api-messages.md
- 本 README 的「今日记录」同步记录完成情况。

## 验收标准

- 能在 `projects/day03_cli_chat/` 下运行 `pnpm test`。
- 能说明 `test.ts` 如何通过 `ChatOpenAI` 的 `baseURL` 接入 DeepSeek。
- 能说清楚 system / user / assistant message 的区别。
- 能解释 token、上下文窗口、temperature、top-p、stream 的基本作用。
- 能说明 `MemorySaver + thread_id` 为什么可以支持同一线程上下文。
- 不把 DeepSeek API Key 写进代码或提交到 Git。

## 今日记录

完成状态：

- [x] 已完成任务清单
- [x] 已完成产出文件
- [ ] 已达到验收标准

完成内容：

- 已完成 `projects/day03_cli_chat/test.ts`：使用 DeepSeek 模型、LangChain `createAgent`、一个 `get_weather` 工具和两轮对话。
- 已保留 `projects/day03_cli_chat/index.ts` 作为更复杂示例：包含 runtime context、两个工具、结构化输出。
- 已补充 `notes/day03-llm-api-messages.md`，整理 LLM API、消息结构、参数和两个示例的区别。
- 已补充 `projects/day03_cli_chat/README.md`，说明依赖安装、环境变量、运行命令和常见错误。

遇到的问题（自由记录）：

- 不能把 `export DEEPSEEK_API_KEY=...` 写在 TypeScript 注释里；环境变量必须在终端或 `.env` 中设置。
- 如果没有设置 key，会出现 `Missing credentials`；如果 key 无效，会出现 `401 Authentication Fails`。
- `deepseek-chat` 可以作为兼容模型使用，但新示例优先使用 `deepseek-v4-flash`。

我的理解（自由记录）：

- Day 3 的重点不是先做复杂 Agent，而是理解一次模型调用由哪些部分组成：模型、消息、参数、环境变量、上下文和输出。
- system message 负责设定角色和规则，user message 代表用户输入，assistant message 是模型回复；多轮对话本质上就是把这些消息按顺序传给模型。
- `test.ts` 验证的是最小 Agent 能力：接入模型、接收用户问题、调用工具、读取工具结果、返回回答，并在同一个线程中继续对话。

## 下一步

- 明天进入 Day 4：结构化输出。先打开 `daily/day04-structured-output/README.md`，按任务清单继续完成。
