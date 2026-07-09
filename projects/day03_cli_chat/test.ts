import { createAgent, tool } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import * as z from "zod";

const apiKey = process.env.DEEPSEEK_API_KEY;

if (!apiKey) {
  console.error(
    [
      "Missing DEEPSEEK_API_KEY.",
      "Run this command first:",
      'export DEEPSEEK_API_KEY="your-deepseek-api-key"',
    ].join("\n"),
  );
  process.exit(1);
}

const model = new ChatOpenAI({
  model: "deepseek-v4-flash",
  apiKey,
  temperature: 0,
  streamUsage: false,
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
});

const getWeather = tool(
  async ({ city }) => {
    return JSON.stringify({
      city,
      condition: "sunny",
      temperature_c: 26,
      suggestion: "适合散步，但建议带水。",
    });
  },
  {
    name: "get_weather",
    description: "获取指定城市的模拟天气信息",
    schema: z.object({
      city: z.string().describe("要查询天气的城市，例如 Shanghai"),
    }),
  },
);

const agent = createAgent({
  model,
  systemPrompt:
    "你是一个中文天气助手。用户问天气时，先调用 get_weather 工具，再基于工具结果用简洁中文回答。",
  tools: [getWeather],
  checkpointer: new MemorySaver(),
});

const config = {
  configurable: {
    thread_id: "day03-deepseek-test",
  },
};

function printLastMessage(title: string, result: Awaited<ReturnType<typeof agent.invoke>>) {
  const lastMessage = result.messages.at(-1);

  console.log(`\n=== ${title} ===`);
  console.log(lastMessage?.content ?? result);
}

const firstResponse = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "我在上海，帮我查一下天气，并判断是否适合散步。",
      },
    ],
  },
  config,
);

printLastMessage("first response", firstResponse);

const secondResponse = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "基于刚才的城市，再给我一句穿衣建议。",
      },
    ],
  },
  config,
);

printLastMessage("second response", secondResponse);
