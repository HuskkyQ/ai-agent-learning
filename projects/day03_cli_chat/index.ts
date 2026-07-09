import { createAgent, tool, type ToolRuntime } from "langchain";
import * as z from "zod";
import { MemorySaver } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

const checkpointer = new MemorySaver();

const systemPrompt = `你是一位擅长说双关语的天气预报专家。

你可以使用两种工具：

- get_weather_for_location：用于获取特定地点的天气
- get_user_location：用于获取用户的位置

如果用户询问天气，请确保你知道地点。如果你能从问题中判断他们指的是他们所在的位置，请使用 get_user_location 工具来查找他们的位置。`;

const responseFormat = z.object({
  punny_response: z.string(),
  weather_conditions: z.string().optional(),
});

const getWeather = tool((input) => `It's always sunny in ${input.city}!`, {
  name: "get_weather",
  description: "获取指定城市的天气",
  schema: z.object({
    city: z.string().describe("要获取天气的城市"),
  }),
});

type AgentRuntime = ToolRuntime<unknown, { user_id: string }>;

const getUserLocation = tool(
  (_, config: AgentRuntime) => {
    const { user_id } = config.context;
    return user_id === "1" ? "Florida" : "SF";
  },
  {
    name: "get_user_location",
    description: "根据用户 ID 检索用户信息",
  },
);

const model = new ChatOpenAI({
  model: "deepseek-chat",
  apiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: "https://api.deepseek.com",
  },
});

const agent = createAgent({
  // model: "claude-sonnet-4-6",
  model,
  systemPrompt,
  tools: [getWeather, getUserLocation],
  responseFormat,
  checkpointer,
});

const config = {
  configurable: {
    thread_id: "1",
  },
  context: {
    user_id: "1",
  },
};

const response = await agent.invoke(
  {
    messages: [{ role: "user", content: "What's the weather outside?" }],
  },
  config,
);

console.log(response.structuredResponse);

const thankYouResponse = await agent.invoke(
  {
    messages: [{ role: "user", content: "Thank you!" }],
  },
  config,
);

console.log(thankYouResponse.structuredResponse);
