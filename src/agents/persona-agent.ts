// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Persona Agent (Dynamic Execution Node)
// ─────────────────────────────────────────────────────────────────────────────

import { getNvidiaClient } from "@/lib/nvidia/client";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
  buildPersonaSystemPrompt,
  buildOpeningStatementPrompt,
  buildRebuttalPrompt,
  buildFinalPositionPrompt,
} from "./prompts";
import type { Persona, ContributionEntry } from "@/types";

export async function executePersonaRound(
  persona: Persona,
  question: string,
  roundNumber: number,
  allContributions: ContributionEntry[]
): Promise<string> {
  const client = getNvidiaClient();
  const systemPrompt = buildPersonaSystemPrompt(persona);

  let userPrompt: string;

  switch (roundNumber) {
    case 1:
      // Opening statement — short punchy take
      userPrompt = buildOpeningStatementPrompt(question);
      break;

    case 2:
      // Rebuttal — challenge others directly in chat
      const openingStatements = allContributions
        .filter((c) => c.roundNumber === 1 && c.personaId !== persona.id)
        .map((c) => ({ personaName: c.personaName, content: c.content }));
      userPrompt = buildRebuttalPrompt(question, openingStatements);
      break;

    case 3:
      // Final position — decisive bottom line
      const history = allContributions
        .filter((c) => c.personaId !== persona.id)
        .map((c) => ({
          personaName: c.personaName,
          round: c.roundNumber,
          content: c.content,
        }));
      userPrompt = buildFinalPositionPrompt(question, history);
      break;

    default:
      throw new Error(`Invalid round number: ${roundNumber}`);
  }

  const response = await client.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt),
  ]);

  let content = "";
  if (typeof response.content === "string" && response.content.trim()) {
    const raw = response.content
      .trim()
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .trim();
    // Filter out meta-planning bullet lines
    const cleanLines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => {
        const lower = l.toLowerCase();
        return (
          l.length > 0 &&
          !lower.startsWith("- embodies") &&
          !lower.startsWith("- tag") &&
          !lower.startsWith("plan:") &&
          !lower.startsWith("strategy:")
        );
      });
    content = cleanLines.join(" ").trim();
  } else if (response.additional_kwargs?.reasoning_content) {
    // Fallback if model only emitted reasoning
    const r = String(response.additional_kwargs.reasoning_content).trim();
    const lines = r
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#") && !l.toLowerCase().includes("thinking"));
    content = lines[lines.length - 1] || r.slice(-150);
  }

  return content || `${persona.name} stands firm on their perspective.`;
}
