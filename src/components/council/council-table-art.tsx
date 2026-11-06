"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BlobAvatar } from "./blob-avatar";
import { Trophy, Target, XCircle, ShieldCheck, Zap } from "lucide-react";
import type { Persona, Contribution } from "@/types";

interface CouncilTableArtProps {
  personas: { persona: Persona }[];
  contributions?: Contribution[];
  activeSpeakerName?: string;
  isLive?: boolean;
}

interface ParsedProposal {
  id: string;
  title: string;
  authorName: string;
  authorPersona?: Persona;
  content: string;
  scoreAvg: number;
  scoresCount: number;
  isEliminated: boolean;
  critique?: string;
}

export function CouncilTableArt({
  personas = [],
  contributions = [],
  activeSpeakerName,
  isLive = false,
}: CouncilTableArtProps) {
  const displayPersonas = personas.slice(0, 6);

  // Parse proposals from Round 1 contributions
  const proposals = useMemo(() => {
    const list: ParsedProposal[] = [];
    const r1 = contributions.filter((c) => c.roundNumber === 1 && c.role === "persona");
    const r2 = contributions.filter((c) => c.roundNumber === 2 && c.role === "persona");

    r1.forEach((c) => {
      const match = c.content.match(/\[PROPOSAL:\s*["']?([^"'\]]+)["']?\]/i);
      const title = match ? match[1].trim() : `${c.persona?.name?.split(" ")[0] || "Agent"}'s Strategy`;
      const cleanBody = c.content.replace(/\[PROPOSAL:[^\]]+\]/i, "").trim();

      // Find peer review scores from round 2 referencing this persona
      const reviews = r2.filter(
        (rev) =>
          c.persona?.name &&
          rev.content.toLowerCase().includes(c.persona.name.toLowerCase().split(" ")[0])
      );

      let totalScore = 0;
      let scoresCount = 0;
      let worstCritique: string | undefined;

      reviews.forEach((rev) => {
        const scoreMatch = rev.content.match(/\[SCORE:\s*(\d+(?:\.\d+)?)\s*(?:\/\s*10)?\]/i);
        if (scoreMatch) {
          const val = parseFloat(scoreMatch[1]);
          totalScore += val;
          scoresCount++;
          if (val < 6) {
            worstCritique = rev.content.replace(/@\w+\s*\[SCORE:[^\]]+\]:?/i, "").trim();
          }
        }
      });

      const avg = scoresCount > 0 ? totalScore / scoresCount : 7.5;
      const isEliminated = scoresCount > 0 && avg < 5.5;

      list.push({
        id: c.id,
        title,
        authorName: c.persona?.name || "Council Member",
        authorPersona: c.persona || undefined,
        content: cleanBody || c.content,
        scoreAvg: parseFloat(avg.toFixed(1)),
        scoresCount,
        isEliminated,
        critique: worstCritique,
      });
    });

    return list;
  }, [contributions]);

  return (
    <div className="w-full border border-[#1E2228] bg-[#0A0A0C] font-mono-code select-none overflow-hidden my-3">
      {/* ── Top Bar: Arena Telemetry ────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1E2228] bg-[#0E1013]">
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-[#FF6E26] text-[#0A0A0C] font-bold px-1.5 py-0.2">
            TOURNAMENT_ARENA
          </span>
          <span className="text-[10px] text-[#525A66] hidden sm:inline">
            // ELIMINATION_MATRIX
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          {isLive && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 border border-[#FF6E26]/40 bg-[#FF6E26]/10 text-[#FF6E26] font-bold">
              <span className="h-1.5 w-1.5 bg-[#FF6E26] animate-radar" />
              PEER_AUDIT_ACTIVE
            </span>
          )}
          <span className="text-[#8B949E]">
            PROPOSALS: <span className="text-[#ECEFF4] font-bold">{proposals.length}</span>
          </span>
        </div>
      </div>

      {/* ── Main Arena: Podiums & Live Proposal Board ────────────── */}
      <div className="p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left/Center Column: The Deliberation Podiums (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between border border-[#1E2228] bg-[#0E1013] p-3 relative overflow-hidden min-h-[175px]">
          {/* Subtle radar scanline grid */}
          <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-40" />

          <div className="flex items-center justify-between relative z-10 mb-2">
            <span className="text-[9px] text-[#525A66] font-mono flex items-center gap-1">
              <Target className="h-3 w-3 text-[#FF6E26]" />
              COUNCIL PODIUMS (ACTIVE MINDS)
            </span>
            {activeSpeakerName && (
              <span className="text-[9px] text-[#FF6E26] font-mono animate-pulse">
                ► {activeSpeakerName.toUpperCase()} SPEAKING
              </span>
            )}
          </div>

          {/* Podiums Row with Spotlights */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 relative z-10 my-auto py-2">
            {displayPersonas.map((item) => {
              const persona = item.persona;
              if (!persona) return null;
              const isSpeaking = activeSpeakerName === persona.name;

              return (
                <div
                  key={persona.id}
                  className={`flex flex-col items-center justify-end p-2 border transition-all ${
                    isSpeaking
                      ? "border-[#FF6E26] bg-[#FF6E26]/10 shadow-[0_0_12px_rgba(255,110,38,0.25)]"
                      : "border-[#1E2228] bg-[#0A0A0C]/80 opacity-80"
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="text-[8px] font-mono mb-1">
                    {isSpeaking ? (
                      <span className="text-[#FF6E26] font-bold animate-pulse">[PITCHING]</span>
                    ) : (
                      <span className="text-[#525A66]">[SEATED]</span>
                    )}
                  </div>

                  {/* Bit-Cat Avatar */}
                  <BlobAvatar
                    name={persona.name}
                    persona={persona}
                    size="sm"
                    isSpeaking={isSpeaking}
                    className="mb-1"
                  />

                  {/* Character Name */}
                  <span
                    className={`text-[9px] font-mono truncate max-w-[65px] text-center ${
                      isSpeaking ? "text-[#ECEFF4] font-bold" : "text-[#8B949E]"
                    }`}
                  >
                    {persona.name.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Stage Footnote */}
          <div className="flex items-center justify-between text-[8px] text-[#525A66] pt-2 border-t border-[#1E2228] relative z-10">
            <span>RULE: NO DIPLOMACY</span>
            <span>CRITERIA: SPEED // ASYMMETRY // LOW-RISK</span>
          </div>
        </div>

        {/* Right Column: Live Proposal & Elimination Board (5 Cols) */}
        <div className="lg:col-span-5 border border-[#1E2228] bg-[#0E1013] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#1E2228] pb-1.5 mb-2">
            <span className="text-[10px] text-[#ECEFF4] font-bold flex items-center gap-1.5">
              <Trophy className="h-3 w-3 text-[#FF6E26]" />
              PROPOSAL STANDINGS
            </span>
            <span className="text-[9px] text-[#525A66]">
              {proposals.length > 0 ? "ROUND 1+2" : "WAITING FOR PITCHES"}
            </span>
          </div>

          {/* Proposals List */}
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {proposals.length === 0 ? (
              <div className="py-6 text-center text-[10px] text-[#525A66] font-mono">
                [ Deliberation starting... personas will pitch initial plans in Round 1 ]
              </div>
            ) : (
              proposals.map((prop) => (
                <div
                  key={prop.id}
                  className={`p-2 border transition-all text-xs ${
                    prop.isEliminated
                      ? "border-[#EF4444]/40 bg-[#EF4444]/5 opacity-60 line-through text-[#EF4444]"
                      : prop.scoreAvg >= 8
                      ? "border-[#22C55E]/60 bg-[#22C55E]/5 text-[#ECEFF4]"
                      : "border-[#1E2228] bg-[#0A0A0C] text-[#ECEFF4]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#FF6E26] truncate max-w-[150px]">
                      {prop.title}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1 border ${
                        prop.isEliminated
                          ? "border-[#EF4444] text-[#EF4444] bg-[#EF4444]/10 no-underline"
                          : prop.scoreAvg >= 8
                          ? "border-[#22C55E] text-[#22C55E] bg-[#22C55E]/10"
                          : "border-[#2A303A] text-[#8B949E]"
                      }`}
                    >
                      {prop.isEliminated ? "ELIMINATED" : `SCORE: ${prop.scoreAvg}/10`}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#8B949E] line-clamp-2 leading-relaxed">
                    {prop.content}
                  </p>

                  {prop.critique && !prop.isEliminated && (
                    <div className="mt-1 text-[8px] text-[#EF4444] font-mono flex items-center gap-1">
                      <XCircle className="h-2.5 w-2.5 flex-shrink-0" />
                      <span className="truncate">Flaw: {prop.critique}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="text-[8px] text-[#525A66] pt-1.5 border-t border-[#1E2228] mt-2 flex items-center justify-between">
            <span>PEER VOTED</span>
            <span>CHIEF ARBITRATOR CROWNS 1 WINNER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
