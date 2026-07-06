# Day 1: 建立 Agent 学习地图

## 上午：学习新内容

- 阅读 Agent-Learning-Hub 的 How To Use、What To Learn Now、Stage 0。
- 阅读 hello-agents 的项目介绍。
- 明确 chatbot、workflow、agent、multi-agent 的区别。

## 下午：实践任务

- 写一页笔记：为什么 Agent 不等于普通聊天机器人？

## 学习物料

- [Agent-Learning-Hub](https://github.com/datawhalechina/Agent-Learning-Hub)
- [hello-agents](https://github.com/datawhalechina/hello-agents)

## 产出位置

- notes/day01-agent-basic.md

## 验收标准

- 能用自己的话解释 Agent 的 observe -> think -> act -> observe 循环。

## 今日记录

完成内容：

- 补充并完善 `notes/day01-agent-basic.md`，重点解释 Agent 和普通聊天机器人的区别。
- 明确了 chatbot、workflow、agent、multi-agent 的边界。

遇到的问题：

- 原回答方向正确，但对 `observe -> think -> act -> observe` 循环解释不够完整。

我的理解：

- Agent 的关键不是多轮聊天，而是在目标驱动下观察状态、思考下一步、调用工具执行动作，再根据反馈修正行为。

下一步：

- 后续学习 Tool Calling 时，把这个循环落实到一个最小 Agent Loop 代码里。
