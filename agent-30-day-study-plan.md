# Agent 开发 30 天学习计划

创建日期：2026-07-05

## 计划假设

- 每天学习时间：1.5 到 2 小时。
- 目标方向：Agent 开发工程师 / AI 应用工程师。
- 学习方式：每天必须有可检查产出，避免只看资料。
- 主线仓库：
  - Agent-Learning-Hub：总路线和资料索引
  - hello-agents：Agent 原理与系统教程
  - AgentGuide：求职导向、工程能力、项目表达
  - ai-agents-from-zero：实战路线、项目和面试补充
  - awesome-ai-agents：扩展视野，不作为主线
  - LangGraph：状态化 Agent 和工作流编排主框架

## 总体节奏

| 周期 | 主题 | 目标产出 |
|---|---|---|
| 第 1 周 | Agent 基础、LLM API、Prompt、Tool Calling | 最小 Agent Loop |
| 第 2 周 | RAG、Embedding、知识库问答 | 本地知识库问答 Demo |
| 第 3 周 | LangChain / LangGraph、状态与工作流 | 可控的多步骤 Agent |
| 第 4 周 | 项目工程化、评估、部署、简历表达 | 一个可展示 Agent 项目 |

## 每日计划

### Day 1：建立 Agent 学习地图

学习内容：

- 阅读 Agent-Learning-Hub 的 How To Use、What To Learn Now、Stage 0。
- 阅读 hello-agents 的项目介绍。
- 明确 chatbot、workflow、agent、multi-agent 的区别。

实践任务：

- 写一页笔记：为什么 Agent 不等于普通聊天机器人？

产出：

- `notes/day01-agent-basic.md`

验收标准：

- 能用自己的话解释 Agent 的 observe -> think -> act -> observe 循环。

### Day 2：理解 Agent 开发岗位需要什么

学习内容：

- 阅读 AgentGuide 的目录、适合人群、Agent 工程能力部分。
- 对照自己的目标：先走开发工程路线，不走算法研究路线。

实践任务：

- 整理 Agent 开发岗位技能清单：LLM、RAG、Tool、Workflow、Eval、Deploy。

产出：

- 一张技能清单表。

验收标准：

- 能说清楚 Agent 开发和大模型算法岗的区别。

### Day 3：LLM API 与消息结构

学习内容：

- 学习 system / user / assistant message。
- 复习 token、上下文窗口、temperature、top-p、stream。

实践任务：

- 写一个最小命令行聊天程序。

产出：

- `projects/day03_cli_chat/`

验收标准：

- 能输入一句话，模型返回回答。

### Day 4：结构化输出

学习内容：

- 学习 JSON 输出、schema、输出约束。

实践任务：

- 让模型把用户输入解析成固定 JSON，例如：
  - intent
  - entities
  - confidence

产出：

- `projects/day04_structured_output/`

验收标准：

- 同一类输入能稳定输出相同字段。

### Day 5：Tool Calling 基础

学习内容：

- 阅读 Agent-Learning-Hub Stage 1。
- 理解工具函数、工具参数、工具返回值。

实践任务：

- 写 2 个工具：
  - calculator
  - get_current_time

产出：

- `projects/day05_tools/`

验收标准：

- 模型能根据问题选择调用哪个工具。

### Day 6：手写最小 Agent Loop

学习内容：

- 学习 ReAct 的 Thought / Action / Observation 思路。

实践任务：

- 不依赖框架，手写一个 50 到 150 行的最小 Agent Loop。
- 加最大轮数限制，防止无限循环。

产出：

- `projects/day06_min_agent_loop/`

验收标准：

- Agent 能思考、调用工具、读取工具结果、给最终答案。

### Day 7：第 1 周复盘

学习内容：

- 回看 Day 1 到 Day 6 的代码和笔记。

实践任务：

- 写一份周复盘：
  - 我理解了什么？
  - 我还不理解什么？
  - 最小 Agent Loop 的缺点是什么？

产出：

- `notes/week01-review.md`

验收标准：

- 能解释为什么真实 Agent 需要日志、超时、重试、权限控制。

### Day 8：RAG 基础

学习内容：

- 阅读 Agent-Learning-Hub Stage 2。
- 复习 RAG：chunk、embed、retrieve、answer with citations。

实践任务：

- 找一篇 Markdown 或 PDF 作为知识库材料。

产出：

- `data/knowledge_base_source/`

验收标准：

- 能画出 RAG 流程图。

### Day 9：Embedding 与向量检索

学习内容：

- 学习文本如何转为向量。
- 学习相似度检索。

实践任务：

- 把文档切分成 chunk。
- 生成 embedding。
- 存入本地向量库。

产出：

- `projects/day09_embedding_search/`

验收标准：

- 输入问题后能返回最相关的 3 个片段。

### Day 10：最小 RAG 问答

学习内容：

- 学习如何把检索结果注入 prompt。

实践任务：

- 基于 Day 9 的检索结果，让模型回答问题。

产出：

- `projects/day10_min_rag/`

验收标准：

- 回答必须只基于检索片段，不知道就说不知道。

### Day 11：RAG 引用来源

学习内容：

- 学习 grounded answer 和 citations。

实践任务：

- 给每个 chunk 增加 source、page、section。
- 回答时输出引用来源。

产出：

- 带引用的 RAG 问答。

验收标准：

- 每条答案至少能追溯到一个来源片段。

### Day 12：RAG 失败案例分析

学习内容：

- 阅读 AgentGuide 中 RAG、Eval、Observability 相关部分。

实践任务：

- 构造 10 个测试问题。
- 记录回答正确、错误、找不到资料的情况。

产出：

- `evals/rag_eval_10_cases.md`

验收标准：

- 能区分失败原因：检索失败、上下文不足、模型幻觉、问题超范围。

### Day 13：把 RAG 接成 Agent 工具

学习内容：

- 理解 RAG 不只是问答系统，也可以是 Agent 的一个工具。

实践任务：

- 给 Day 6 的 Agent Loop 增加 `search_knowledge_base` 工具。

产出：

- `projects/day13_agent_with_rag_tool/`

验收标准：

- Agent 遇到知识类问题时调用知识库工具。

### Day 14：第 2 周复盘

学习内容：

- 回看 RAG 项目的代码和测试集。

实践任务：

- 写一份 RAG 复盘：
  - chunk 怎么切？
  - 检索为什么会失败？
  - 如何减少幻觉？

产出：

- `notes/week02-rag-review.md`

验收标准：

- 能讲清楚 RAG 和微调的区别。

### Day 15：LangChain 基础

学习内容：

- 阅读 LangChain 快速开始。
- 学习 Chat Model、Prompt Template、Output Parser。

实践任务：

- 用 LangChain 重写 Day 3 的聊天程序。

产出：

- `projects/day15_langchain_chat/`

验收标准：

- 能使用 invoke 调用模型。

### Day 16：LangChain Runnable

学习内容：

- 学习 Runnable、invoke、stream、batch。

实践任务：

- 把 prompt、model、parser 串成一个 chain。

产出：

- `projects/day16_langchain_chain/`

验收标准：

- 能说明 chain 每一步的输入输出。

### Day 17：LangChain Tools

学习内容：

- 学习 LangChain tool 定义。

实践任务：

- 把 calculator、knowledge_search 封装成 LangChain tools。

产出：

- `projects/day17_langchain_tools/`

验收标准：

- 工具有清晰名称、描述、参数和返回值。

### Day 18：LangChain Agent

学习内容：

- 学习 LangChain Agent 的最小使用方式。

实践任务：

- 做一个可以调用 calculator 和 knowledge_search 的 Agent。

产出：

- `projects/day18_langchain_agent/`

验收标准：

- Agent 能根据问题自动选择工具。

### Day 19：LangGraph 入门

学习内容：

- 阅读 LangGraph 概览。
- 理解 State、Node、Edge、Graph。

实践任务：

- 写一个两节点流程：分析问题 -> 生成答案。

产出：

- `projects/day19_langgraph_basic/`

验收标准：

- 能画出状态图。

### Day 20：LangGraph 条件分支

学习内容：

- 学习 conditional edge。

实践任务：

- 构建一个流程：
  - 如果需要知识库，走 RAG
  - 如果是计算问题，走 calculator
  - 否则直接回答

产出：

- `projects/day20_langgraph_router/`

验收标准：

- 3 类问题能走不同分支。

### Day 21：第 3 周复盘

学习内容：

- 对比裸 Agent Loop、LangChain Agent、LangGraph。

实践任务：

- 写一份技术选型笔记。

产出：

- `notes/week03-framework-review.md`

验收标准：

- 能说清楚什么时候用简单脚本、什么时候用 LangChain、什么时候用 LangGraph。

### Day 22：确定最终项目

学习内容：

- 阅读 AgentGuide 的项目落地和实战项目部分。
- 从 ai-agents-from-zero 中参考项目组织方式。

实践任务：

- 选择一个最终项目：
  - 个人知识库 Agent
  - 简历分析 Agent
  - 资料研究 Agent
  - 网页信息提取 Agent

产出：

- `projects/final-agent/README.md`

验收标准：

- README 中写清楚用户、场景、输入、输出、成功标准。

### Day 23：项目架构设计

学习内容：

- 学习 Agent Harness 的基本组成：
  - model
  - tools
  - state
  - memory
  - trace
  - eval

实践任务：

- 画最终项目架构图。

产出：

- `projects/final-agent/docs/architecture.md`

验收标准：

- 能说明每个模块负责什么。

### Day 24：实现最终项目 MVP

学习内容：

- 不新增理论，专注实现。

实践任务：

- 完成最小可运行版本：
  - 输入
  - 任务判断
  - 工具调用
  - 输出结果

产出：

- `projects/final-agent/src/`

验收标准：

- 能跑通 1 条完整任务。

### Day 25：加入 RAG 或外部工具

学习内容：

- 复用第 2 周 RAG 或第 1 周工具调用能力。

实践任务：

- 给最终项目加入至少一个真实工具：
  - 知识库检索
  - 文件读取
  - 网页搜索
  - API 查询

产出：

- 可调用工具的最终项目。

验收标准：

- 工具失败时有明确错误信息。

### Day 26：加入日志和 Trace

学习内容：

- 学习可观测性：输入、输出、工具调用、耗时、错误。

实践任务：

- 每次运行记录：
  - user_input
  - selected_tool
  - tool_result
  - final_answer
  - latency

产出：

- `projects/final-agent/logs/`

验收标准：

- 能复盘一次 Agent 的完整执行过程。

### Day 27：建立评估集

学习内容：

- 阅读 Agent-Learning-Hub Stage 7。
- 参考 AgentGuide 的 Eval / Observability / Safety 方向。

实践任务：

- 准备 20 条测试任务。
- 标注期望结果。

产出：

- `projects/final-agent/evals/eval_cases.md`

验收标准：

- 能统计成功、失败、部分成功。

### Day 28：安全与边界

学习内容：

- 学习权限控制、人类确认、防止危险工具误调用。

实践任务：

- 给危险动作加确认机制。
- 明确哪些工具只读，哪些工具可写。

产出：

- `projects/final-agent/docs/safety.md`

验收标准：

- Agent 不会在未确认时执行写入、删除、发送、发布类动作。

### Day 29：项目整理与展示

学习内容：

- 阅读 AgentGuide 关于项目表达和简历亮点的内容。

实践任务：

- 完成最终项目 README：
  - 项目背景
  - 架构图
  - 功能列表
  - 运行方式
  - 示例输入输出
  - 已知限制
  - 后续计划

产出：

- 完整 README。

验收标准：

- 其他人能按 README 跑起来。

### Day 30：总复盘

学习内容：

- 回顾 30 天所有笔记、代码和项目。

实践任务：

- 写一份总复盘：
  - 我掌握了哪些能力？
  - 我做出了哪些东西？
  - 我还欠缺哪些工程能力？
  - 下一个 30 天学什么？

产出：

- `notes/month01-agent-review.md`

验收标准：

- 能完整讲清楚最终项目：为什么做、怎么设计、怎么运行、如何评估、有什么限制。

## 每日固定打卡模板

```markdown
### YYYY-MM-DD Day N

今日主题：

完成内容：

- 

代码 / 文档产出：

- 

遇到的问题：

- 

我的理解：

- 

明天计划：

- 
```

## 30 天后的能力目标

完成这套计划后，应具备以下能力：

- 能解释 Agent、Workflow、RAG、Tool Calling、Memory、LangGraph 的区别。
- 能手写一个最小 Agent Loop。
- 能做一个带引用来源的 RAG 系统。
- 能用 LangChain 封装模型、Prompt、Parser 和 Tool。
- 能用 LangGraph 编排多步骤 Agent 工作流。
- 能为 Agent 加日志、评估集、安全边界和 README。
- 能拿出一个可展示的 Agent 项目。

