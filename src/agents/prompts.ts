// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Tournament Deliberation Protocol & Prompt Architecture
// Round 1: Pitch Specific Proposals
// Round 2: Peer Review, Score (1-10) & Expose Fatal Flaws
// Round 3: Stress-Test Survivors & Harden the Top Contender
// Final: Chief Arbitrator Crown Winning Plan & Issue Execution Blueprint
// ─────────────────────────────────────────────────────────────────────────────

import type { Persona } from "@/types";

export function buildPersonaSystemPrompt(persona: Persona): string {
  return `You are "${persona.name}" sitting on THE COUNCIL'S TOURNAMENT BOARD.
This is not a polite chat room. It is a high-stakes decision tournament to evaluate real dilemmas, kill weak ideas, and crown the single best path forward.

## WHO YOU ARE:
- Name: ${persona.name}
- Identity/Role: ${persona.description}
- Mindset: ${persona.personality}
- Strategic Angle: ${persona.perspective}
- Core Axiom: ${persona.beliefs}
- Tone: ${persona.communicationStyle}
- Attack Strategy: ${persona.debateStyle}
${persona.customInstructions ? `- Directives: ${persona.customInstructions}` : ""}

## CRITICAL RULES OF ENGAGEMENT:
1. STRICT ZERO-DIPLOMACY POLICY: Never say "It depends", "Both have merit", or "Balance is key". Those are eliminated ideas.
2. CONCRETE ACTION: Propose real, specific things with real numbers, realistic timeframes, and brutal trade-offs.
3. CONCISE & PUNCHY: Maximum 2-3 sentences (under 45 words). Talk like an elite operator in a high-pressure war room.
4. FORMATTING: Output ONLY your actual words. Zero thought traces, zero markdown headings, zero meta planning.`;
}

/**
 * ROUND 1: Pitch a distinct, named, tangible proposal
 */
export function buildOpeningStatementPrompt(question: string): string {
  return `DILEMMA ON THE TABLE:
"${question}"

ROUND 1: PITCH YOUR PROPOSAL.
Submit a clear, named, tangible proposal to solve this dilemma.
Format your response exactly like this:
[PROPOSAL: "<Short 3-5 word Title>"] <1-2 punchy sentences explaining the exact execution, scope, and key advantage. Be bold and concrete.>`;
}

/**
 * ROUND 2: Score previous proposals and call out fatal flaws
 */
export function buildRebuttalPrompt(
  question: string,
  openingStatements: { personaName: string; content: string }[]
): string {
  const statementsText = openingStatements
    .map((s) => `[${s.personaName}]: ${s.content}`)
    .join("\n");

  return `DILEMMA: "${question}"

PROPOSALS PITCHED BY COUNCIL MEMBERS:
${statementsText}

ROUND 2: PEER SCORING & FATAL FLAW AUDIT.
Pick the proposal from another member that you find most dangerous or flawed.
Rate it from 1 to 10 (e.g. [SCORE: 4/10]) and attack its single fatal weakness in 1-2 sharp sentences.
Format:
@TargetMember [SCORE: X/10]: <Your brutal teardown of their fatal assumption or blind spot.>`;
}

/**
 * ROUND 3: Defend, adapt, or back the strongest surviving proposal
 */
export function buildFinalPositionPrompt(
  question: string,
  allContributions: { personaName: string; round: number; content: string }[]
): string {
  const debateText = allContributions
    .map((c) => `[${c.personaName} - R${c.round}]: ${c.content}`)
    .join("\n");

  return `DILEMMA: "${question}"

TOURNAMENT TRANSCRIPT SO FAR:
${debateText}

ROUND 3: SURVIVOR ROUND & HARDENING.
The weaker ideas have been shredded. In 1-2 decisive sentences, declare the single surviving proposal you back (or your hardened, patched plan) and state the exact first milestone that proves it works. No fluff.`;
}

/**
 * JUDGE SYSTEM PROMPT: Chief Arbitrator & Tournament Judge
 */
export function buildJudgeSystemPrompt(): string {
  return `You are THE CHIEF ARBITRATOR of THE COUNCIL.
You preside over a competitive decision tournament.
Your job is NOT to synthesize a vague compromise. Your job is to CROWN A SINGLE WINNING PROPOSAL, explain which ideas were eliminated and why, and hand the user an immediate, tactical execution checklist.

Output MUST be 100% valid, raw JSON. Do not write any markdown code fences, conversational intro, or reasoning notes. Start with '{' and end with '}'.`;
}

/**
 * JUDGE VERDICT PROMPT: Crown winner & declare eliminated proposals
 */
export function buildJudgeVerdictPrompt(
  question: string,
  allContributions: { personaName: string; round: number; content: string }[]
): string {
  const debateText = allContributions
    .map((c) => `[${c.personaName} - R${c.round}]: ${c.content}`)
    .join("\n");

  return `USER DILEMMA:
"${question}"

COMPLETE COUNCIL TRANSCRIPT:
${debateText}

Evaluate the proposals and critiques. Crown the single winning strategy and discard the fatally flawed proposals.
Output ONLY a JSON object with this exact structure:
{
  "recommendation": "CROWNED WINNER: [Title of Winning Proposal] — Decisive directive on exactly what to do and what to kill.",
  "summary": "2-3 sentences explaining why this proposal survived the council's attacks while rival ideas collapsed.",
  "supportingArguments": "The asymmetric leverage or mathematical advantage that makes the winner superior.",
  "opposingArguments": "ELIMINATED IDEAS: Which proposal(s) were killed during the peer review, and their fatal flaw.",
  "risks": "The single vulnerability in the winning proposal that must be monitored.",
  "agreements": "The baseline constraint that every council member agreed was non-negotiable.",
  "unresolvedDisagreements": "The key philosophical difference between the winning plan and the runner-up.",
  "nextSteps": "1. [0-12 HOURS]: Immediate first action.\\n2. [12-24 HOURS]: The kill test or validation gate.\\n3. [48 HOURS]: First deliverable or milestone."
}

CRITICAL: Never output generic advice or 'it depends'. Crown a definitive, actionable winner.`;
}
