// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Judge Agent
// ─────────────────────────────────────────────────────────────────────────────

import { getNvidiaClient } from "@/lib/nvidia/client";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { buildJudgeSystemPrompt, buildJudgeVerdictPrompt } from "./prompts";
import type { ContributionEntry, VerdictData } from "@/types";

function extractField(text: string, field: string): string | null {
  const regex = new RegExp(`"${field}"\\s*:\\s*"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"`, "s");
  const match = text.match(regex);
  if (match && match[1]) {
    return match[1]
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .trim();
  }
  return null;
}

function cleanThinkingContent(raw: string): string {
  // Strip <think>...</think> tags if present
  let cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, "");
  // Strip "Here's a thinking process: ... " headers if present before JSON
  const jsonStart = cleaned.indexOf("{");
  if (jsonStart !== -1) {
    const preamble = cleaned.slice(0, jsonStart);
    if (preamble.toLowerCase().includes("thinking") || preamble.toLowerCase().includes("analyze")) {
      cleaned = cleaned.slice(jsonStart);
    }
  }
  return cleaned.trim();
}

export async function executeJudge(
  question: string,
  contributions: ContributionEntry[]
): Promise<VerdictData> {
  // Use maxTokens: 4096 and low temperature for crisp, deterministic judicial analysis
  const client = getNvidiaClient({ maxTokens: 4096, temperature: 0.2 });
  const systemPrompt = buildJudgeSystemPrompt();
  const userPrompt = buildJudgeVerdictPrompt(
    question,
    contributions.map((c) => ({
      personaName: c.personaName,
      round: c.roundNumber,
      content: c.content,
    }))
  );

  const response = await client.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt),
  ]);

  let rawContent =
    typeof response.content === "string" && response.content.trim()
      ? response.content.trim()
      : typeof response.additional_kwargs?.reasoning_content === "string"
      ? (response.additional_kwargs.reasoning_content as string).trim()
      : JSON.stringify(response.content);

  const content = cleanThinkingContent(rawContent);

  // 1. Try to extract from ```json ... ``` code fence
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    try {
      const parsed = JSON.parse(codeBlockMatch[1].trim());
      return sanitizeParsedVerdict(parsed);
    } catch {
      // Continue to next extraction method
    }
  }

  // 2. Try to locate outermost { ... }
  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidateJson = content.slice(firstBrace, lastBrace + 1);
    try {
      const parsed = JSON.parse(candidateJson);
      return sanitizeParsedVerdict(parsed);
    } catch {
      // Continue to field-by-field regex extraction
    }
  }

  // 3. Robust field-by-field regex extraction (salvages partial or unescaped JSON)
  const summary = extractField(content, "summary");
  const recommendation = extractField(content, "recommendation");
  const supportingArguments = extractField(content, "supportingArguments");
  const opposingArguments = extractField(content, "opposingArguments");
  const risks = extractField(content, "risks");
  const agreements = extractField(content, "agreements");
  const unresolvedDisagreements = extractField(content, "unresolvedDisagreements");
  const nextSteps = extractField(content, "nextSteps");

  if (summary || recommendation) {
    return {
      summary: summary || "The Council has completed deliberations on the submitted dilemma.",
      recommendation: recommendation || "Proceed with caution based on individual member arguments.",
      supportingArguments: supportingArguments || "Arguments weighed in favor of decisive momentum.",
      opposingArguments: opposingArguments || "Cautionary advice centered on risk mitigation.",
      risks: risks || "Unmitigated execution speed or delayed decision-making.",
      agreements: agreements || "Both perspectives recognize the critical stakes involved.",
      unresolvedDisagreements: unresolvedDisagreements || "The fundamental balance between speed and certainty.",
      nextSteps: nextSteps || "Define clear criteria and execute the agreed action plan.",
    };
  }

  // 4. Safe fallback if model generated completely freeform text
  // Filter out any thinking lines from summary
  const cleanSummary = content
    .split("\n")
    .filter((line) => !line.toLowerCase().startsWith("analyze") && !line.toLowerCase().startsWith("here's a thinking"))
    .join(" ")
    .slice(0, 300);

  return {
    summary: cleanSummary || "The Council has reached its final judgment.",
    recommendation: "Review the debate transcript and proceed decisively.",
    supportingArguments: "Multiple perspectives were presented across the council sessions.",
    opposingArguments: "Counter-arguments highlighted potential vulnerabilities.",
    risks: "Execution velocity vs stability trade-off.",
    agreements: "Shared focus on achieving the best possible outcome.",
    unresolvedDisagreements: "Prioritization of immediate action vs further refinement.",
    nextSteps: "Synthesize the council positions and commit to an execution path.",
  };
}

function sanitizeParsedVerdict(parsed: Record<string, unknown>): VerdictData {
  return {
    summary: String(parsed.summary || "Deliberation concluded."),
    recommendation: String(parsed.recommendation || "Take decisive action based on the debate."),
    supportingArguments: String(parsed.supportingArguments || "Key merits noted by council."),
    opposingArguments: String(parsed.opposingArguments || "Key risks noted by council."),
    risks: String(parsed.risks || "Operational or strategic headwinds."),
    agreements: String(parsed.agreements || "Consensus on core objectives."),
    unresolvedDisagreements: String(parsed.unresolvedDisagreements || "Competing priorities remain."),
    nextSteps: String(parsed.nextSteps || "Execute immediate roadmap priorities."),
  };
}
