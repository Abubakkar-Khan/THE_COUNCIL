// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Shared TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Persona {
  id: string;
  name: string;
  description: string;
  personality: string;
  perspective: string;
  beliefs: string;
  strengths: string;
  blindSpots: string;
  communicationStyle: string;
  debateStyle: string;
  customInstructions: string;
  isEnabled: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PersonaFormData {
  name: string;
  description: string;
  personality: string;
  perspective: string;
  beliefs: string;
  strengths: string;
  blindSpots: string;
  communicationStyle: string;
  debateStyle: string;
  customInstructions: string;
}

export interface Debate {
  id: string;
  userQuestion: string;
  status: DebateStatus;
  model: string;
  totalRounds: number;
  startedAt: string | Date;
  completedAt: string | Date | null;
  personas: DebatePersonaRelation[];
  contributions: Contribution[];
  verdict: Verdict | null;
}

export interface DebatePersonaRelation {
  debateId: string;
  personaId: string;
  persona: Persona;
}

export type DebateStatus = "pending" | "in_progress" | "completed" | "failed";

export interface Contribution {
  id: string;
  debateId: string;
  personaId: string;
  roundNumber: number;
  role: string;
  content: string;
  createdAt: string | Date;
  persona?: Persona;
}

export interface Verdict {
  id: string;
  debateId: string;
  summary: string;
  recommendation: string;
  supportingArguments: string;
  opposingArguments: string;
  risks: string;
  agreements: string;
  unresolvedDisagreements: string;
  nextSteps: string;
  createdAt: string | Date;
}

export interface DebateSetupData {
  question: string;
  personaIds: string[];
  totalRounds: number;
}

// LangGraph State Types
export interface CouncilState {
  debateId: string;
  question: string;
  personas: Persona[];
  currentRound: number;
  totalRounds: number;
  contributions: ContributionEntry[];
  verdict: VerdictData | null;
  status: DebateStatus;
  error: string | null;
}

export interface ContributionEntry {
  personaId: string;
  personaName: string;
  roundNumber: number;
  content: string;
}

export interface VerdictData {
  summary: string;
  recommendation: string;
  supportingArguments: string;
  opposingArguments: string;
  risks: string;
  agreements: string;
  unresolvedDisagreements: string;
  nextSteps: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
