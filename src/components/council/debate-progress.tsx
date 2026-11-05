"use client";

import { motion } from "motion/react";

interface DebateProgressProps {
  currentRound: number;
  totalRounds: number;
  status: string;
}

export function DebateProgress({ currentRound, totalRounds, status }: DebateProgressProps) {
  const steps = [
    { label: "ROUND 01", desc: "Opening Statements" },
    { label: "ROUND 02", desc: "The Debate" },
    { label: "ROUND 03", desc: "Final Positions" },
    { label: "VERDICT", desc: "The Judge" },
  ].slice(0, totalRounds + 1);

  return (
    <div className="w-full bg-[#191919] border border-[#303030] rounded-lg p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone =
            status === "completed" ||
            (idx === totalRounds && status === "completed") ||
            currentRound > stepNum;
          const isCurrent =
            status === "in_progress" &&
            (idx === totalRounds ? currentRound > totalRounds : currentRound === stepNum);

          return (
            <div
              key={step.label}
              className={`p-3 rounded-md border text-center transition-all ${
                isCurrent
                  ? "border-[#FF5722] bg-[#222222] shadow-sm"
                  : isDone
                  ? "border-[#303030] bg-[#141414] opacity-80"
                  : "border-[#252525] bg-[#111111] opacity-40"
              }`}
            >
              <p
                className={`text-[10px] font-mono tracking-wider font-bold ${
                  isCurrent ? "text-[#FF5722]" : isDone ? "text-emerald-400" : "text-[#777777]"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs font-medium text-[#F5F5F5] truncate mt-0.5">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
