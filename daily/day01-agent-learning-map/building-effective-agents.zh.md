# Building Effective Agents 中文学习笔记

> 原文：Anthropic Engineering, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)  
> 发布时间：2024-12-19  
> 抓取日期：2026-07-06  
> 说明：本文档是面向 Day 1 学习任务的中文整理，不收录原文全文，也不是逐段全文翻译。

## 这篇文章解决什么问题

Anthropic 总结了他们和客户一起构建 LLM Agent 的经验：真正有效的系统通常不是最复杂的系统，而是从简单、可组合的模式开始，只在任务确实需要时才增加复杂度。

这和 Day 1 的核心问题直接相关：Agent 不是普通聊天机器人。普通聊天机器人主要是一次或多轮对话；Agentic system 会把 LLM、工具、检索、记忆、外部环境反馈组合起来，让模型参与任务执行过程。

## 核心区分：Workflow 和 Agent

文章把更大的类别称为 agentic systems，并在其中区分两类架构：

- Workflow：LLM 和工具沿着预先写好的代码路径运行。路径由开发者定义，系统更可控、更稳定。
- Agent：LLM 动态决定下一步怎么做、用什么工具、什么时候停止。路径由模型根据任务和环境反馈不断调整。

换句话说，workflow 更像“开发者设计好的流程 + LLM 作为步骤执行器”；agent 更像“LLM 在工具和反馈中持续规划、执行、修正”。

## 什么时候不要用 Agent

文章反复强调：先找最简单的方案。

很多应用不需要 agentic system。单次 LLM 调用、加上检索、示例、结构化输出，往往已经足够。Agentic system 会带来更高延迟、更高成本，也会增加错误累积的风险。

可以用一个判断标准：

- 任务路径固定、可以提前分解：优先 workflow。
- 任务开放、步骤数未知、需要模型自己决策：再考虑 agent。
- 简单提示词或 RAG 就能稳定解决：不要为了“像 Agent”而上 Agent。

## 框架的使用态度

文章提到 Claude Agent SDK、Strands Agents SDK、Rivet、Vellum 等工具都能降低起步成本。但框架也可能带来抽象层，让 prompt、工具调用、模型响应更难调试。

建议是：

- 初学和原型阶段，可以用框架帮助理解常见模式。
- 真正要进生产时，要理解框架底下发生了什么。
- 如果几行 API 调用能表达清楚，就不必引入重框架。

这对学习路径也很重要：先理解 API、prompt、tool schema、状态循环，再学习 LangChain、LangGraph 等框架，会更稳。

## 常见构建模式

### 1. 增强型 LLM

基础构件是 augmented LLM：给 LLM 增加检索、工具、记忆等能力。重点不只是“接上工具”，而是让工具接口对模型足够清楚、文档足够好、返回结果足够可用。

### 2. Prompt Chaining

把任务拆成固定步骤，前一步输出作为后一步输入。中间可以加程序化检查。

适合：任务能稳定拆解，比如先写大纲，再检查大纲，再写正文。

### 3. Routing

先分类输入，再分发到不同提示词、模型或工具链。

适合：客服问题分类、简单问题走低成本模型、复杂问题走强模型。

### 4. Parallelization

让多个 LLM 调用并行工作，再用程序聚合结果。常见两种方式：

- Sectioning：不同子任务并行处理。
- Voting：同一任务多次尝试或多角度判断。

适合：安全检查、代码审查、多维度评估。

### 5. Orchestrator-Workers

一个中心 LLM 负责拆解任务、分配给多个 worker LLM，再汇总结果。

适合：无法预先确定子任务数量和类型的复杂任务，例如跨多个文件的代码修改。

### 6. Evaluator-Optimizer

一个 LLM 生成答案，另一个 LLM 评估并提出反馈，形成迭代循环。

适合：有明确评价标准、迭代能显著提升质量的任务，比如翻译润色、复杂搜索。

### 7. Agent

Agent 通常是“LLM + 工具 + 环境反馈”的循环。它能处理开放任务，但也更贵、更慢、更容易累积错误，所以需要沙盒测试、护栏和清晰的工具设计。

适合：步骤不可预测、需要多轮操作和反馈修正的任务，例如 coding agent 或 computer use。

## 三条工程原则

文章最后给出三条原则，适合直接作为你以后做 Agent 项目的 checklist：

- 保持简单：不要为了炫技增加不必要的多步骤、多模型、多框架。
- 保持透明：尽量显式展示 Agent 的计划、步骤和状态，方便人类检查。
- 认真设计 ACI：Agent-computer interface，也就是给模型用的工具接口。工具说明、参数命名、示例、错误提示都要像面向开发者的 API 一样认真设计。

## 工具设计的关键启发

文章把工具设计放在很重要的位置。模型不是只需要“能调用工具”，还需要“容易正确调用工具”。

实践建议：

- 工具名和参数名要直观。
- 描述要像写给初级开发者的 docstring。
- 返回格式要接近模型熟悉的自然文本或结构。
- 避免让模型承担无意义的格式负担，例如复杂转义、精确行号计数。
- 用大量样例测试模型怎么误用工具，再调整接口。
- 通过参数设计减少出错空间，也就是让错误更难发生。

## 和 Day 1 问题的连接

问题：为什么 Agent 不等于普通聊天机器人？

可以这样回答：

Agent 不只是聊天界面。它的关键是让 LLM 在任务执行中持续观察环境、思考下一步、选择工具、执行动作、读取反馈，再继续迭代。聊天机器人可以只是生成回复；Agent 要能把回复转化为行动，并在行动结果中调整计划。

但也不能把所有 LLM 应用都叫 Agent。固定路径的多步骤系统更准确地说是 workflow；只有当模型能动态控制流程和工具使用时，才更接近 Anthropic 文中定义的 agent。

## 术语对照

| English | 中文理解 |
| --- | --- |
| Agentic system | 具备一定任务执行能力的 LLM 系统总称 |
| Workflow | 预定义流程式 LLM 系统 |
| Agent | 模型动态控制流程和工具使用的系统 |
| Augmented LLM | 接入检索、工具、记忆等能力的 LLM |
| Prompt chaining | 提示词链式调用 |
| Routing | 路由分发 |
| Parallelization | 并行处理 |
| Orchestrator-workers | 编排者-工作者模式 |
| Evaluator-optimizer | 评估者-优化者模式 |
| ACI | Agent-computer interface，Agent 使用工具和环境的接口 |

## 今日可完成的小练习

用自己的话写一段 150-300 字回答：

> Agent、workflow、chatbot 三者有什么区别？什么时候应该避免使用 Agent？

建议结构：

1. 先定义 chatbot、workflow、agent。
2. 再说明 Agent 的 observe -> think -> act -> observe 循环。
3. 最后说明复杂度、成本、延迟和错误累积这些 tradeoff。
