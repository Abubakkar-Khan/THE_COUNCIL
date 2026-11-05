"use client";

import { ContributionCard } from "./contribution-card";
import { getRoundLabel } from "@/lib/utils";
import type { Contribution } from "@/types";

interface RoundDisplayProps {
  roundNumber: number;
  contributions: Contribution[];
}

export function RoundDisplay({ roundNumber, contributions }: RoundDisplayProps) {
  const roundContributions = contributions.filter(
    (c) => c.roundNumber === roundNumber
  );

  if (roundContributions.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#222222] border border-[#353535] text-[#FF5722] font-semibold">
          Round {String(roundNumber).padStart(2, "0")}
        </span>
        <h3 className="text-base font-bold text-[#F5F5F5]">
          {getRoundLabel(roundNumber)}
        </h3>
        <div className="flex-1 h-px bg-[#303030]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roundContributions.map((contribution) => (
          <ContributionCard key={contribution.id} contribution={contribution} />
        ))}
      </div>
    </div>
  );
}
