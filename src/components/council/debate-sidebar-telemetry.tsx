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
    <aside className="w-64 border-l border-dashed border-[#1E2228] bg-[#0A0A0C] p-5 space-y-7 font-mono-code text-xs select-none flex-shrink-0 hidden lg:block">
      {/* Agents Roster Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-xs text-[#ECEFF4] tracking-tight">
          Agents ({personas.length})
        </h3>

        <div className="space-y-2.5">
          {personas.map((persona) => {
            if (!persona) return null;
            const isSpeaking = activeSpeakerName === persona.name;
            const hasSpokenRecently = contributions.some(
              (c) => c.personaId === persona.id
            );

            return (
              <div
                key={persona.id}
                className="flex items-center justify-between py-1 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
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

                {/* Status Dot: Warm orange if active, grey if idle */}
                <span
                  className={`h-2 w-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                    isSpeaking
                      ? "bg-[#FF6E26] shadow-[0_0_10px_#FF6E26] animate-radar"
                      : hasSpokenRecently
                      ? "bg-[#FF6E26] shadow-[0_0_6px_rgba(255,110,38,0.4)]"
                      : "bg-[#2A303A]"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Debate Progress Section */}
      <div className="space-y-3 pt-4 border-t border-dashed border-[#1E2228]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xs text-[#ECEFF4] tracking-tight">
            Debate Progress
          </h3>
          <span className="font-bold text-xs text-[#ECEFF4]">
            {progressPercent}%
          </span>
        </div>

        {/* Chunky Segmented Progress Bar */}
        <div className="flex items-center gap-1 h-3">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full rounded-xs transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i < filledBlocks
                  ? "bg-[#FF6E26] animate-progress-pulse"
                  : "border border-[#1E2228] bg-[#0E1013]"
              }`}
            />
          ))}
        </div>

        {/* Stepper Timeline with Vertical Connector */}
        <div className="relative pl-5 space-y-3 pt-3">
          {/* Vertical connecting line */}
          <div className="absolute left-[7px] top-4 bottom-3 w-[1.5px] bg-[#1E2228]" />

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
              <div key={step.label} className="relative flex items-center gap-2.5">
                {/* Step indicator node */}
                <div
                  className={`absolute -left-5 h-3.5 w-3.5 rounded-full flex items-center justify-center text-[9px] transition-all duration-300 z-10 ${
                    isCompleted
                      ? "bg-[#FF6E26] text-[#0A0A0C]"
                      : isActive
                      ? "bg-[#FF6E26] text-[#0A0A0C] ring-4 ring-[#FF6E26]/25 animate-pulse"
                      : "bg-[#0A0A0C] border border-[#2A303A] text-transparent"
                  }`}
                >
                  {isCompleted && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  {isActive && !isCompleted && <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0C]" />}
                </div>

                {/* Step Pill */}
                <div
                  className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-[#2D1A10] border border-[#FF6E26]/50 text-[#ECEFF4] font-medium shadow-[0_0_14px_rgba(255,110,38,0.2)]"
                      : isCompleted
                      ? "text-[#ECEFF4]"
                      : "text-[#525A66]"
                  }`}
                >
                  {step.label}
                </div>
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
            className="w-full btn-terminal-accent py-2 px-3 rounded-sm font-pixel text-[10px] tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Scale className="h-3.5 w-3.5" />
            <span>[VIEW VERDICT]</span>
          </button>
        </div>
      )}
    </aside>
  );
}
