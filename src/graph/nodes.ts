// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — LangGraph Node Definitions
// ─────────────────────────────────────────────────────────────────────────────

import { executePersonaRound } from "@/agents/persona-agent";
import { executeJudge } from "@/agents/judge-agent";
import { prisma } from "@/lib/database/prisma";
import type { CouncilStateType } from "./state";
import type { ContributionEntry } from "@/types";

const CONCURRENCY_LIMIT = 5;

async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const p = task().then((result) => {
      results.push(result);
    });
    executing.push(p);

    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((e) =>
          e.then(
            () => true,
            () => true
          )
        ),
        1
      );
    }
  }

  await Promise.all(executing);
  return results;
}

// ─── Node: Initialize Debate ────────────────────────────────────────────────

export async function initializeDebate(
  state: CouncilStateType
): Promise<Partial<CouncilStateType>> {
  await prisma.debate.update({
    where: { id: state.debateId },
    data: { status: "in_progress" },
  });

  return {
    status: "in_progress",
    currentRound: 1,
  };
}

// ─── Node: Generate Round Contributions ─────────────────────────────────────

export async function generateRoundContributions(
  state: CouncilStateType
): Promise<Partial<CouncilStateType>> {
  const { personas, question, currentRound, debateId } = state;

  // Retrieve full conversation transcript recorded so far (including user messages)
  const recordedContributions = await prisma.contribution.findMany({
    where: { debateId },
    include: { persona: true },
    orderBy: [{ roundNumber: "asc" }, { createdAt: "asc" }],
  });

  const fullConversationHistory: ContributionEntry[] = recordedContributions.map((c) => ({
    personaId: c.personaId || "user",
    personaName: c.persona?.name || (c.role === "user" ? "Director (You)" : "Council Mind"),
    roundNumber: c.roundNumber,
    content: c.content,
  }));

  const tasks = personas.map((persona) => async (): Promise<ContributionEntry> => {
    const content = await executePersonaRound(
      persona,
      question,
      currentRound,
      fullConversationHistory
    );

    // Save to database
    await prisma.contribution.create({
      data: {
        debateId,
        personaId: persona.id,
        roundNumber: currentRound,
        role: "persona",
        content,
      },
    });

    return {
      personaId: persona.id,
      personaName: persona.name,
      roundNumber: currentRound,
      content,
    };
  });

  const newContributions = await runWithConcurrency(tasks, CONCURRENCY_LIMIT);

  return {
    contributions: newContributions,
  };
}

// ─── Node: Advance Round ────────────────────────────────────────────────────

export async function advanceRound(
  state: CouncilStateType
): Promise<Partial<CouncilStateType>> {
  return {
    currentRound: state.currentRound + 1,
  };
}

// ─── Node: Judge Evaluation ─────────────────────────────────────────────────

export async function judgeEvaluation(
  state: CouncilStateType
): Promise<Partial<CouncilStateType>> {
  const { question, debateId } = state;

  // Read entire debate conversation transcript from DB so judge weighs user interventions too
  const allRecorded = await prisma.contribution.findMany({
    where: { debateId },
    include: { persona: true },
    orderBy: [{ roundNumber: "asc" }, { createdAt: "asc" }],
  });

  const conversationTranscript: ContributionEntry[] = allRecorded.map((c) => ({
    personaId: c.personaId || "user",
    personaName: c.persona?.name || (c.role === "user" ? "Director (You)" : "Council Mind"),
    roundNumber: c.roundNumber,
    content: c.content,
  }));

  const verdictData = await executeJudge(question, conversationTranscript);

  // Save verdict to database
  await prisma.verdict.create({
    data: {
      debateId,
      summary: verdictData.summary,
      recommendation: verdictData.recommendation,
      supportingArguments: verdictData.supportingArguments,
      opposingArguments: verdictData.opposingArguments,
      risks: verdictData.risks,
      agreements: verdictData.agreements,
      unresolvedDisagreements: verdictData.unresolvedDisagreements,
      nextSteps: verdictData.nextSteps,
    },
  });

  return {
    verdict: verdictData,
  };
}

// ─── Node: Save Debate ──────────────────────────────────────────────────────

export async function saveDebate(
  state: CouncilStateType
): Promise<Partial<CouncilStateType>> {
  await prisma.debate.update({
    where: { id: state.debateId },
    data: {
      status: "completed",
      completedAt: new Date(),
    },
  });

  return {
    status: "completed",
  };
}

// ─── Conditional: Should Continue Rounds ────────────────────────────────────

export function shouldContinueRounds(
  state: CouncilStateType
): "generate_round" | "judge" {
  if (state.currentRound <= state.totalRounds) {
    return "generate_round";
  }
  return "judge";
}
