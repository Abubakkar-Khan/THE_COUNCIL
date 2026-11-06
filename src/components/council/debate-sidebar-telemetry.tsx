"use client";

import { BlobAvatar } from "./blob-avatar";
import { Check, Scale } from "lucide-react";
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

  // Compute progress percentage based on rounds completed
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

  // Define steps
  const steps = [
    { num: 1, label: "R1 · Opening" },
    { num: 2, label: "R2 · Debate" },
    ...(totalRounds >= 3 ? [{ num: 3, label: "R3 · Rebuttal" }] : []),
    { num: totalRounds + 1, label: "Final · Verdict", isVerdict: true },
  ];

  return (
    <aside className="w-64 border-l border-[#1E2228] bg-[#0A0A0C] p-4 space-y-6 font-mono-code text-xs select-none flex-shrink-0 hidden lg:block">
      {/* Agents Roster Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1E2228]">
          <span className="font-semibold text-[#ECEFF4] tracking-tight">
            // ROSTER: AGENTS
          </span>
          <span className="text-[#FF6E26] font-mono">
            [{personas.length.toString().padStart(2, "0")}]
          </span>
        </div>

        <div className="space-y-1.5">
          {personas.map((persona) => {
            if (!persona) return null;
            const isSpeaking = activeSpeakerName === persona.name;
            const hasSpokenRecently = contributions.some(
              (c) => c.personaId === persona.id
            );

            return (
              <div
                key={persona.id}
                className="flex items-center justify-between p-1.5 border border-transparent hover:border-[#1E2228] hover:bg-[#0E1013] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <BlobAvatar
                    name={persona.name}
                    size="sm"
                    isSpeaking={isSpeaking}
                  />
                  <span
                    className={`truncate text-xs ${
                      isSpeaking
                        ? "text-[#FF6E26] font-semibold"
                        : "text-[#8B949E] group-hover:text-[#ECEFF4]"
                    }`}
                  >
                    {persona.name.split(" ")[0]}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isSpeaking ? (
                    <span className="text-[10px] text-[#FF6E26] font-mono">
                      [SPEAKING]
                    </span>
                  ) : hasSpokenRecently ? (
                    <span className="h-1.5 w-1.5 bg-[#FF6E26]" />
                  ) : (
                    <span className="h-1.5 w-1.5 bg-[#2A303A]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Debate Progress Section */}
      <div className="space-y-3 pt-3 border-t border-[#1E2228]">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1E2228]">
          <span className="font-semibold text-[#ECEFF4] tracking-tight">
            // PROGRESS
          </span>
          <span className="font-bold text-[#FF6E26]">
            {progressPercent}%
          </span>
        </div>

        {/* Chunky Segmented Progress Bar (Sharp Blocks) */}
        <div className="flex items-center gap-1 h-2.5">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-300 ${
                i < filledBlocks
                  ? "bg-[#FF6E26]"
                  : "border border-[#1E2228] bg-[#0E1013]"
              }`}
            />
          ))}
        </div>

        {/* Stepper Timeline (Sharp Terminal Nodes) */}
        <div className="space-y-2 pt-2">
          {steps.map((step) => {
            const isCompleted =
              step.isVerdict
                ? debate.status === "completed"
                : currentRound > step.num || debate.status === "completed";

            const isActive =
              step.isVerdict
                ? debate.status === "completed"
                : currentRound === step.num && debate.status !== "completed";

            return (
              <div
                key={step.label}
                className={`p-2 border transition-all text-xs font-mono flex items-center justify-between ${
                  isActive
                    ? "border-[#FF6E26] bg-[#14171C] text-[#ECEFF4] shadow-[0_0_12px_rgba(255,110,38,0.15)] font-semibold"
                    : isCompleted
                    ? "border-transparent text-[#ECEFF4]"
                    : "border-transparent text-[#525A66]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs ${
                      isActive
                        ? "text-[#FF6E26]"
                        : isCompleted
                        ? "text-[#FF6E26]"
                        : "text-[#525A66]"
                    }`}
                  >
                    {isCompleted ? "[✓]" : isActive ? "[►]" : "[ ]"}
                  </span>
                  <span>{step.label}</span>
                </div>

                {isActive && (
                  <span className="text-[10px] text-[#FF6E26] font-mono animate-pulse">
                    CURRENT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Jump to Verdict Action when completed */}
      {debate.verdict && (
        <div className="pt-2">
          <button
            onClick={onScrollToVerdict}
            className="w-full btn-terminal-accent py-2 px-3 border border-[#FF853E] font-mono text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Scale className="h-3.5 w-3.5" />
            <span>[ VIEW_VERDICT ]</span>
          </button>
        </div>
      )}
    </aside>
  );
}
