// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — NVIDIA API Client Configuration
// ─────────────────────────────────────────────────────────────────────────────

import { ChatOpenAI } from "@langchain/openai";

export function getNvidiaClient(options?: {
  maxTokens?: number;
  temperature?: number;
}): ChatOpenAI {
  const apiKey = process.env.NVIDIA_API_KEY;
  const model = process.env.NVIDIA_MODEL || "nvidia/nemotron-3.5-lightning-30b-a3b";
  const baseURL = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY environment variable is not set");
  }

  return new ChatOpenAI({
    apiKey,
    model,
    configuration: {
      baseURL,
    },
    temperature: options?.temperature ?? 0.7,
    maxTokens: options?.maxTokens ?? 4096,
  });
}

export function getModelName(): string {
  return process.env.NVIDIA_MODEL || "nvidia/nemotron-3.5-lightning-30b-a3b";
}
