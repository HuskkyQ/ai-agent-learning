# Day 3: LLM API 与消息结构

## 今日问题

今天要回答的问题：

- system / user / assistant message 分别是什么？
- token、上下文窗口、temperature、top-p、stream 分别影响什么？
- `test.ts` 验证了哪些 Agent 能力？
- `index.ts` 和 `test.ts` 的主要区别是什么？

## 1. LLM API 是什么？

LLM API 是把大模型能力接入代码的方式。以前我在网页里输入问题，模型直接回答；使用 API 后，我可以在程序里构造 messages、设置参数、接收返回结果，并把模型嵌入到自己的应用或 Agent 流程中。

在 Day 3 的项目里，核心调用链是：

1. 用 `ChatOpenAI` 创建一个 DeepSeek 兼容模型。
2. 用 `createAgent` 创建 Agent。
3. 把用户问题放进 `messages`。
4. Agent 判断是否需要调用工具。
5. 模型基于工具结果返回回答。

## 2. system / user / assistant message 的区别

### system message

system message 用来告诉模型“你是谁、要遵守什么规则、应该如何完成任务”。它比普通用户输入更像全局约束。

在 `test.ts` 中：

```ts
systemPrompt:
  "你是一个中文天气助手。用户问天气时，先调用 get_weather 工具，再基于工具结果用简洁中文回答。"
```

这句话规定了 Agent 的角色、语言、工具使用方式和回答风格。

### user message

user message 是用户输入的内容，也就是当前这轮任务。

例如：

```ts
{
  role: "user",
  content: "我在上海，帮我查一下天气，并判断是否适合散步。",
}
```

模型需要根据 user message 判断用户想做什么。

### assistant message

assistant message 是模型给出的回复。多轮对话中，前面的 assistant message 会成为后续上下文的一部分，帮助模型理解之前发生过什么。

简单理解：

| message 类型 | 作用 |
| --- | --- |
| system | 设定角色、规则、边界 |
| user | 用户当前输入 |
| assistant | 模型历史回复 |
| tool | 工具调用结果，供模型继续推理 |

## 3. 常见参数怎么理解？

### token

token 是模型处理文本的基本单位，可以粗略理解为“文本被切分后的片段”。输入和输出都会消耗 token。

影响：

- token 越多，成本越高。
- token 越多，延迟可能越高。
- 超过上下文窗口后，模型无法一次处理全部内容。

### 上下文窗口

上下文窗口是模型一次调用最多能看到多少 token。多轮对话、系统提示、工具结果、用户输入都会占用上下文窗口。

如果上下文窗口不够，早期内容可能需要被裁剪、总结或放入 RAG 检索。

### temperature

temperature 控制输出的随机性。

- `temperature` 低：回答更稳定、更确定，适合工具调用、结构化输出、严肃问答。
- `temperature` 高：回答更多样，适合创意写作、头脑风暴。

Day 3 的 `test.ts` 设置为：

```ts
temperature: 0
```

原因是天气工具调用不需要创意，稳定更重要。

### top-p

top-p 也是控制随机性的参数。它会限制模型只从累计概率最高的一部分候选词中选择。

实际使用时，一般不需要同时大幅调整 `temperature` 和 `top-p`。入门阶段先理解 `temperature` 就够了。

### stream

stream 是流式输出。开启后，模型会边生成边返回，用户可以更快看到内容。

适合：

- 聊天界面。
- 长文本生成。
- 希望降低用户等待感的产品。

不一定适合：

- 严格结构化输出。
- 一次性等待完整 JSON 的任务。

## 4. DeepSeek 是怎么接入 LangChain 的？

DeepSeek 提供 OpenAI 兼容接口，所以可以用 LangChain 的 `ChatOpenAI` 接入，只要修改 `baseURL` 和模型名。

`test.ts` 中的核心代码：

```ts
const model = new ChatOpenAI({
  model: "deepseek-v4-flash",
  apiKey,
  temperature: 0,
  streamUsage: false,
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
});
```

这里的关键点：

- `apiKey` 来自 `process.env.DEEPSEEK_API_KEY`。
- `baseURL` 指向 DeepSeek API。
- `model` 使用 DeepSeek 模型。
- `temperature: 0` 让输出更稳定。

## 5. `test.ts` 验证了哪些 Agent 能力？

`test.ts` 不是普通聊天程序，它已经具备一个最小 Agent 的几个关键能力：

1. 接入外部模型：通过 DeepSeek API 调用 LLM。
2. 接收用户任务：通过 user message 输入问题。
3. 调用工具：用户问天气时，Agent 调用 `get_weather`。
4. 使用工具结果：模型读取工具返回的 JSON，再生成自然语言回答。
5. 保留线程上下文：通过 `MemorySaver` 和同一个 `thread_id` 支持第二轮继续问“刚才的城市”。

这说明 Agent 不只是回答问题，它可以在模型和工具之间组织一个小流程。

## 6. `index.ts` 和 `test.ts` 的区别

| 对比点 | `index.ts` | `test.ts` |
| --- | --- | --- |
| 学习定位 | 复杂示例 | 最小可运行示例 |
| 模型 | `deepseek-chat` | `deepseek-v4-flash` |
| 工具 | `get_weather`、`get_user_location` | `get_weather` |
| 上下文 | 使用 `context.user_id` 推断用户位置 | 用户直接提供城市 |
| 输出 | 使用 `responseFormat` 结构化输出 | 打印最后一条 assistant message |
| 适合阶段 | Day 4 之后继续理解 | Day 3 优先跑通 |

我现在应该优先理解 `test.ts`，因为它只保留最核心的模型调用、工具调用和多轮上下文。等 `test.ts` 完全理解后，再回头看 `index.ts` 的 runtime context 和结构化输出。

## 7. 今日结论

Day 3 的核心收获是：使用 LLM API 时，我不只是把一句话发给模型，而是在代码中明确控制模型、消息、参数、工具和上下文。

对 Agent 开发来说，LLM API 是入口能力。后面的结构化输出、Tool Calling、RAG、Workflow 和 Eval，都会建立在这个基础之上。
