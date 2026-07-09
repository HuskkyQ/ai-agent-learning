# Day 3 CLI Chat

这是 Day 3 的最小 LangChain + DeepSeek 示例，用来学习 LLM API、messages、工具调用和同一线程的上下文。

## 文件说明

- `test.ts`：推荐先阅读和运行的最小示例。它使用 DeepSeek、一个 `get_weather` 工具和两轮对话。
- `index.ts`：更复杂的对照示例。它额外包含 runtime context、两个工具和结构化输出。
- `.env`：本地环境变量文件，不要提交到 Git。

## 安装依赖

在当前目录运行：

```bash
pnpm install
```

## 配置 DeepSeek API Key

方式一：使用终端环境变量。

```bash
export DEEPSEEK_API_KEY="your-deepseek-api-key"
```

方式二：使用当前目录下的 `.env` 文件。

```bash
DEEPSEEK_API_KEY="your-deepseek-api-key"
```

不要把真实 API Key 写进 `.ts` 文件。

## 运行最小示例

```bash
pnpm test
```

等价于：

```bash
node --env-file=.env test.ts
```

这个示例会执行两轮对话：

1. 用户说自己在上海，Agent 调用 `get_weather`。
2. 用户继续问穿衣建议，Agent 依靠同一个 `thread_id` 理解“刚才的城市”。

## 运行复杂示例

```bash
pnpm start
```

等价于：

```bash
node --env-file=.env index.ts
```

`index.ts` 更适合理解 Day 4 之后的内容，例如结构化输出和 runtime context。

## 常见错误

### Missing credentials

说明没有设置 `DEEPSEEK_API_KEY`。

处理方式：

```bash
export DEEPSEEK_API_KEY="your-deepseek-api-key"
pnpm test
```

或者确认 `.env` 文件里有 `DEEPSEEK_API_KEY`。

### 401 Authentication Fails

说明程序已经拿到了 key，但 key 无效、被禁用、额度不足，或不是 DeepSeek 的 key。

处理方式：

- 到 DeepSeek 控制台重新生成 API Key。
- 确认 `.env` 中没有多余空格。
- 确认没有把引号、中文符号或注释一起复制进 key。

## 学习重点

- `ChatOpenAI` 可以通过 `configuration.baseURL` 连接 OpenAI 兼容模型。
- `createAgent` 把模型、system prompt、tools 和 memory 组合成 Agent。
- `tool` 用 Zod schema 定义参数，方便模型知道如何调用工具。
- `MemorySaver + thread_id` 可以让同一线程保留上下文。
