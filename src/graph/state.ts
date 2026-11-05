// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — LangGraph State Definition
// ─────────────────────────────────────────────────────────────────────────────

import { Annotation } from "@langchain/langgraph";
import type { Persona, ContributionEntry, VerdictData, DebateStatus } from "@/types";

export const CouncilStateAnnotation = Annotation.Root({
  debateId: Annotation<string>,
  question: Annotation<string>,
  personas: Annotation<Persona[]>,
  currentRound: Annotation<number>,
  totalRounds: Annotation<number>,
  contributions: Annotation<ContributionEntry[]>({
    reducer: (prev, next) => [...prev, ...next],
    default: () => [],
  }),
  verdict: Annotation<VerdictData | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
  status: Annotation<DebateStatus>({
    reducer: (_prev, next) => next,
    default: () => "pending" as DebateStatus,
  }),
  error: Annotation<string | null>({
    reducer: (_prev, next) => next,
    default: () => null,
  }),
});

export type CouncilStateType = typeof CouncilStateAnnotation.State;
