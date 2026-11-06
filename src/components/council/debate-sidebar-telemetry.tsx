"use client";

import { useMemo } from "react";
import { BlobAvatar } from "./blob-avatar";
import { Trophy, Check, Flame, AlertOctagon, Scale, ArrowRight, ShieldAlert } from "lucide-react";
import type { Debate } from "@/types";

interface DebateSidebarTelemetryProps {
  debate: Debate;
  activeSpeakerName?: string;
  onScrollToVerdict?: () => void;
}

export function DebateSidebarTelemetry({
  debate,
  activeSpeakerName,
  onScrollToVerdict,
}: DebateSidebarTelemetryProps) {
  const personas = debate.personas?.map((p) => p.persona) || [];
  const contributions = debate.contributions || [];

  // Compute progress percentage
  const totalRounds = debate.totalRounds || 3;
  const currentRound =
    contributions.length > 0
      ? Math.max(...contributions.map((c) => c.roundNumber))
      : 1;

  let progressPercent = 0;
  if (debate.status === "completed") {
    progressPercent = 100;
  } else {
    const currentRoundCount = contributions.filter(
      (c) => c.roundNumber === currentRound
    ).length;
    const intraProgress = personas.length > 0 ? currentRoundCount / personas.length : 0.5;
    const raw = (((currentRound - 1) + Math.max(intraProgress, 0.5)) / totalRounds) * 100;
    progressPercent = Math.min(Math.max(Math.round(raw), 25), 92);
  }

  // Segmented progress bar (12 blocks)
  const totalBlocks = 12;
  const filledBlocks = Math.round((progressPercent / 100) * totalBlocks);

  // Tournament Stages
  const tournamentStages = [
    { num: 1, label: "STAGE 01 · PITCH PROPOSALS", desc: "Each mind proposes a concrete plan" },
    { num: 2, label: "STAGE 02 · PEER REVIEW & FLAWS", desc: "Audit rival plans, assign 1-10 scores" },
    { num: 3, label: "STAGE 03 · HARDEN SURVIVORS", desc: "Top contenders battle, fix vulnerabilities" },
    { num: 4, label: "DECREE · CROWN WINNING PLAN", desc: "Binding execution checklist", isVerdict: true },
  ];

  // Extract top peer attacks / fatal flaws from contributions
  const fatalFlaws = useMemo(() => {
    const flaws: { target: string; attacker: string; score: string; text: string }[] = [];
    contributions.forEach((c) => {
      const match = c.content.match(/@(\w+)\s*\[SCORE:\s*(\d+(?:\.\d+)?\s*(?:\/\s*10)?)\]:?\s*(.*)/i);
      if (match) {
        flaws.push({
          attacker: c.persona?.name?.split(" ")[0] || "Agent",
          target: match[1],
          score: match[2],
          text: match[3].slice(0, 75),
        });
      }
    });
    return flaws.slice(-3); // Latest 3 attacks
  }, [contributions]);

  return (
    <aside className="w-72 border-l border-[#1E2228] bg-[#0A0A0C] p-4 space-y-6 font-mono-code text-xs select-none flex-shrink-0 hidden lg:block overflow-y-auto max-h-screen">
      
      {/* ── Section 1: Tournament Progress ────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1E2228]">
          <span className="font-semibold text-[#ECEFF4] tracking-tight">
            // TOURNAMENT_PROGRESS
          </span>
          <span className="text-[#FF6E26] font-mono font-bold">
            {progressPercent}%
          </span>
        </div>

        {/* 12-Segment Progress Block */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 transition-all duration-300 ${
                i < filledBlocks
                  ? "bg-[#FF6E26]"
                  : "border border-[#1E2228] bg-[#111418]"
              }`}
            />
          ))}
        </div>

        {/* Tournament Stages Nodes */}
        <div className="space-y-2 pt-1">
          {tournamentStages.map((step) => {
            const isCompleted =
              debate.status === "completed" || currentRound > step.num;
            const isCurrent =
              debate.status === "in_progress" && currentRound === step.num;

            return (
              <div
                key={step.num}
                className={`p-2 border transition-all ${
                  isCurrent
                    ? "border-[#FF6E26] bg-[#FF6E26]/10 text-[#ECEFF4]"
                    : isCompleted
                    ? "border-[#2A303A] bg-[#0E1013] text-[#8B949E]"
                    : "border-transparent text-[#525A66]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isCurrent
                        ? "text-[#FF6E26]"
                        : isCompleted
                        ? "text-[#22C55E]"
                        : "text-[#525A66]"
                    }`}
                  >
                    {isCompleted ? "[✓]" : isCurrent ? "[►]" : "[ ]"}
                  </span>
                  <span className="font-bold text-[10px]">{step.label}</span>
                </div>
                <p className="text-[9px] text-[#525A66] pl-5 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 2: Fatal Flaw Audit Feed ──────────────────── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1E2228]">
          <span className="font-semibold text-[#ECEFF4] tracking-tight flex items-center gap-1.5">
            <Flame className="h-3 w-3 text-[#FF6E26]" />
            FATAL_FLAW_LOG
          </span>
          <span className="text-[10px] text-[#525A66]">
            [AUDITS]
          </span>
        </div>

        {fatalFlaws.length === 0 ? (
          <div className="p-3 border border-dashed border-[#1E2228] text-center text-[10px] text-[#525A66]">
            Audits and fatal flaw reviews unlock during Stage 02.
          </div>
        ) : (
          <div className="space-y-2">
            {fatalFlaws.map((flaw, idx) => (
              <div
                key={idx}
                className="p-2 border border-[#1E2228] bg-[#0E1013] text-[10px] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#FF6E26] font-bold">
                    {flaw.attacker} ⚔️ {flaw.target}
                  </span>
                  <span className="text-[9px] font-mono text-[#EF4444] px-1 border border-[#EF4444]/40 bg-[#EF4444]/10">
                    SCORE: {flaw.score}
                  </span>
                </div>
                <p className="text-[#8B949E] text-[9px] leading-relaxed">
                  "{flaw.text}..."
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Section 3: Final Blueprint CTA ────────────────────── */}
      {debate.verdict && (
        <div className="p-3 border border-[#FF6E26] bg-[#FF6E26]/10 space-y-2">
          <div className="flex items-center gap-1.5 text-[#FF6E26] font-bold text-[10px]">
            <Trophy className="h-3.5 w-3.5" />
            <span>WINNING BLUEPRINT ISSUED</span>
          </div>
          <p className="text-[10px] text-[#D8DEE9] leading-snug">
            The Chief Arbitrator has crowned the single viable path forward.
          </p>
          {onScrollToVerdict && (
            <button
              onClick={onScrollToVerdict}
              className="w-full btn-terminal-accent py-1.5 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>INSPECT WINNER</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Telemetry Footnote */}
      <div className="pt-2 border-t border-[#1E2228] text-[9px] text-[#525A66] space-y-1 font-mono">
        <div>PROTOCOL: TOURNAMENT_V2</div>
        <div>MODEL: {debate.model?.split("/")[1] || "LLAMA-3.1-70B"}</div>
        <div>STATUS: {debate.status.toUpperCase()}</div>
      </div>
    </aside>
  );
}
