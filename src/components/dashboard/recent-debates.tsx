"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Scale, Swords } from "lucide-react";
import type { Debate } from "@/types";

interface RecentDebatesProps {
  debates: Debate[];
}

export function RecentDebates({ debates }: RecentDebatesProps) {
  if (debates.length === 0) {
    return (
      <div className="p-8 border border-[#1E2228] bg-[#0E1013] text-center select-none font-mono-code">
        <Scale className="h-8 w-8 text-[#525A66] mx-auto mb-3" />
        <p className="text-xs text-[#ECEFF4] font-semibold mb-1">
          // NO_DEBATES_ON_RECORD
        </p>
        <p className="text-[11px] text-[#8B949E] mb-4">
          Drop your first dilemma to convene the digital council.
        </p>
        <Link href="/debates/new">
          <button className="btn-terminal-accent px-4 py-2 text-xs border border-[#FF853E] cursor-pointer font-bold">
            [ START_FIRST_DEBATE ⚔ ]
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="select-none font-mono-code">
      <div className="flex items-center justify-between mb-3 border-b border-[#1E2228] pb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#ECEFF4]">// RECENT_DEBATES</span>
          <span className="text-[10px] text-[#525A66]">[{debates.length.toString().padStart(2, "0")}]</span>
        </div>
        <Link
          href="/debates"
          className="text-xs text-[#8B949E] hover:text-[#FF6E26] transition-colors flex items-center gap-1 font-mono"
        >
          <span>[VIEW_ALL]</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2">
        {debates.slice(0, 5).map((debate, i) => {
          const isCompleted = debate.status === "completed";
          const isInProgress = debate.status === "in_progress";

          return (
            <motion.div
              key={debate.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: 0.1 + i * 0.03 }}
            >
              <Link
                href={`/debates/${debate.id}`}
                className="group flex items-center justify-between p-3 border border-[#1E2228] bg-[#0E1013] hover:border-[#FF6E26] hover:bg-[#12151A] transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-4">
                  {/* Status Indicator */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <span className="text-[10px] px-2 py-0.5 border border-[#1E2228] text-[#ECEFF4] bg-[#0A0A0C] font-mono">
                        [✔ VERDICT]
                      </span>
                    ) : isInProgress ? (
                      <span className="text-[10px] px-2 py-0.5 border border-[#FF6E26] text-[#FF6E26] bg-[#FF6E26]/10 animate-pulse font-mono">
                        [● LIVE]
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 border border-[#2A303A] text-[#8B949E] bg-[#14171C] font-mono">
                        [QUEUED]
                      </span>
                    )}
                  </div>

                  {/* Question and Metadata */}
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-[#ECEFF4] truncate group-hover:text-[#FF6E26] transition-colors">
                      {debate.userQuestion}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#525A66] mt-0.5">
                      <span>{formatDate(debate.startedAt)}</span>
                      <span>•</span>
                      <span>{debate.personas?.length || 0} agents</span>
                      <span>•</span>
                      <span>ID: #{debate.id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] text-[#525A66] group-hover:text-[#ECEFF4] transition-colors hidden sm:inline">
                    Open
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#525A66] group-hover:text-[#FF6E26] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
