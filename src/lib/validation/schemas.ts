// ─────────────────────────────────────────────────────────────────────────────
// THE COUNCIL — Zod Validation Schemas
// ─────────────────────────────────────────────────────────────────────────────

import { z } from "zod";

export const personaSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  description: z.string().min(1, "Description is required").max(200, "Description too long"),
  personality: z.string().min(1, "Personality is required").max(500),
  perspective: z.string().min(1, "Perspective is required").max(500),
  beliefs: z.string().min(1, "Beliefs are required").max(500),
  strengths: z.string().min(1, "Strengths are required").max(500),
  blindSpots: z.string().min(1, "Blind spots are required").max(500),
  communicationStyle: z.string().min(1, "Communication style is required").max(500),
  debateStyle: z.string().min(1, "Debate style is required").max(500),
  customInstructions: z.string().max(1000).default(""),
});

export const debateSetupSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters").max(1000, "Question too long"),
  personaIds: z.array(z.string()).min(2, "Select at least 2 personas").max(10, "Maximum 10 personas"),
  totalRounds: z.number().min(1).max(5).default(3),
});

export type PersonaInput = z.infer<typeof personaSchema>;
export type DebateSetupInput = z.infer<typeof debateSetupSchema>;
