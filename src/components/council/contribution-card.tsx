"use client";

import { motion } from "motion/react";
import { PersonaSymbol } from "@/components/personas/persona-symbol";
import type { Contribution } from "@/types";

interface ContributionCardProps {
  contribution: Contribution;
}

export function ContributionCard({ contribution }: ContributionCardProps) {
  const personaName = contribution.persona?.name || "Council Member";
  const personaDescription = contribution.persona?.description || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-[#303030] bg-[#191919] p-5 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3 border-b border-[#252525] pb-3">
        <PersonaSymbol name={personaName} size="sm" />
        <div>
          <h4 className="text-sm font-bold text-[#F5F5F5]">{personaName}</h4>
          {personaDescription && (
            <p className="text-[11px] text-[#929292]">{personaDescription}</p>
          )}
        </div>
      </div>
      <div className="prose prose-invert prose-sm max-w-none text-[#E0E0E0] whitespace-pre-wrap leading-relaxed font-sans text-sm">
        {contribution.content}
      </div>
    </motion.div>
  );
}
