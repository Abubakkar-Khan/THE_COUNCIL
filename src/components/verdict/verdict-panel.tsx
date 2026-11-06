"use client";

import { motion } from "motion/react";
import { Scale, CheckCircle2, AlertTriangle, HelpCircle, CheckSquare, ShieldAlert } from "lucide-react";
import type { Verdict } from "@/types";

interface VerdictPanelProps {
  verdict: Verdict;
}

export function VerdictPanel({ verdict }: VerdictPanelProps) {
  const nextStepLines = verdict.nextSteps
    ? verdict.nextSteps
        .split(/(?:[-•*]|\n)/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 border border-[#1E2228] bg-[#0E1013] select-none font-mono-code relative"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2228] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 border border-[#FF6E26] bg-[#FF6E26]/10 flex items-center justify-center text-[#FF6E26] text-base flex-shrink-0">
            ⚖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 border border-[#FF6E26]/40 text-[#FF6E26] bg-[#0A0A0C]">
                [ JUDICIAL · VERDICT ]
              </span>
              <span className="text-[10px] text-[#525A66]">
                // BINDING_DECREE
              </span>
            </div>
            <h2 className="text-base md:text-lg font-bold font-mono text-[#ECEFF4] tracking-tight mt-0.5">
              The Council Ruling
            </h2>
          </div>
        </div>

        <div className="text-[10px] text-[#525A66]">
          <span>[ID: #{verdict.id.slice(-6).toUpperCase()}]</span>
        </div>
      </div>

      {/* Primary Recommendation Banner: CROWNED TOURNAMENT WINNER */}
      <div className="mb-5 p-4 border border-[#FF6E26] bg-[#FF6E26]/10 relative">
        <div className="flex items-center justify-between text-[10px] text-[#FF6E26] mb-1 font-semibold font-mono">
          <span>// CROWNED_STRATEGY</span>
          <span className="bg-[#FF6E26] text-[#0A0A0C] px-1.5 py-0.2 font-bold text-[8px]">
            [BINDING EXECUTION]
          </span>
        </div>
        <p className="text-sm md:text-base font-semibold text-[#ECEFF4] leading-snug font-mono">
          "{verdict.recommendation}"
        </p>
      </div>

      {/* Synthesis Summary */}
      <div className="mb-5 p-4 border border-[#1E2228] bg-[#0A0A0C]">
        <h3 className="text-[10px] text-[#8B949E] uppercase tracking-wider mb-1.5 font-semibold font-mono">
          // WHY_THIS_PLAN_SURVIVED
        </h3>
        <p className="text-xs text-[#ECEFF4] leading-relaxed whitespace-pre-wrap font-mono">
          {verdict.summary}
        </p>
      </div>

      {/* Key Considerations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {/* Supporting Points */}
        <div className="p-3.5 border border-[#1E2228] bg-[#0A0A0C]">
          <div className="flex items-center gap-1.5 mb-2 text-[#ECEFF4]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#22C55E]" />
            <h4 className="text-[10px] font-semibold tracking-wider uppercase">
              Asymmetric Leverage & Winning Edge
            </h4>
          </div>
          <p className="text-[11px] text-[#8B949E] leading-relaxed whitespace-pre-wrap">
            {verdict.supportingArguments}
          </p>
        </div>

        {/* Counterpoints & Eliminated Ideas */}
        <div className="p-3.5 border border-[#1E2228] bg-[#0A0A0C]">
          <div className="flex items-center gap-1.5 mb-2 text-[#ECEFF4]">
            <AlertTriangle className="h-3.5 w-3.5 text-[#EF4444]" />
            <h4 className="text-[10px] font-semibold tracking-wider uppercase">
              Eliminated Plans & Fatal Flaws
            </h4>
          </div>
          <p className="text-[11px] text-[#8B949E] leading-relaxed whitespace-pre-wrap">
            {verdict.opposingArguments}
          </p>
        </div>

        {/* Risks */}
        <div className="p-3.5 border border-[#1E2228] bg-[#0A0A0C]">
          <div className="flex items-center gap-1.5 mb-2 text-[#ECEFF4]">
            <ShieldAlert className="h-3.5 w-3.5 text-[#FF6E26]" />
            <h4 className="text-[10px] font-semibold tracking-wider uppercase">
              Fatal Trap to Avoid
            </h4>
          </div>
          <p className="text-[11px] text-[#8B949E] leading-relaxed whitespace-pre-wrap">
            {verdict.risks}
          </p>
        </div>

        {/* Unresolved Tensions */}
        <div className="p-3.5 border border-[#1E2228] bg-[#0A0A0C]">
          <div className="flex items-center gap-1.5 mb-2 text-[#ECEFF4]">
            <HelpCircle className="h-3.5 w-3.5 text-[#FF6E26]" />
            <h4 className="text-[10px] font-semibold tracking-wider uppercase">
              Tension with Runner-Up
            </h4>
          </div>
          <p className="text-[11px] text-[#8B949E] leading-relaxed whitespace-pre-wrap">
            {verdict.unresolvedDisagreements}
          </p>
        </div>
      </div>

      {/* Action Plan Checklist */}
      <div className="p-4 border border-[#1E2228] bg-[#0A0A0C]">
        <div className="flex items-center gap-1.5 text-[#FF6E26] mb-2 font-semibold">
          <CheckSquare className="h-3.5 w-3.5" />
          <h4 className="text-[10px] tracking-wider uppercase">
            Tactical Execution Checklist (Chronological)
          </h4>
        </div>

        {nextStepLines.length > 0 ? (
          <div className="space-y-1.5">
            {nextStepLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#ECEFF4]">
                <span className="text-[#FF6E26] font-bold mt-0.5">[✔]</span>
                <span className="leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#ECEFF4] leading-relaxed whitespace-pre-wrap">
            {verdict.nextSteps}
          </p>
        )}
      </div>
    </motion.div>
  );
}
