"use client";

import { motion } from "motion/react";
import { Swords, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlobAvatar } from "@/components/council/blob-avatar";

export function WelcomeCard() {
  const featuredBlobs = [
    "Father of Initiative",
    "Vector",
    "Daddy BKR",
    "Muhammad Abubakar",
    "The Anomaly",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6 md:p-8 border border-[#1E2228] bg-[#0E1013] relative overflow-hidden select-none font-mono-code"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-4 max-w-xl">
          {/* Top Pill & Mode */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 border border-[#2A303A] bg-[#0A0A0C] text-[10px] font-mono">
              <span className="h-1.5 w-1.5 bg-[#FF6E26]" />
              <span className="text-[#ECEFF4] font-medium tracking-tight">
                [ COUNCIL_OS · V1.0 ]
              </span>
            </div>
            <span className="text-[10px] text-[#525A66] font-mono">// 18 AUTONOMOUS AGENTS</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-mono text-[#ECEFF4] tracking-tight leading-tight">
              Different Minds. <span className="text-[#FF6E26]">Conflicting Perspectives</span>. One Verdict.
            </h1>
            <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
              Drop any hard decision, career gamble, or hypothesis. Your council of expressive bit cat agents will debate in real time until the Judge renders a final ruling.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/debates/new">
              <button className="btn-terminal-accent px-5 py-2.5 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md border border-[#FF853E]">
                <Swords className="h-3.5 w-3.5" />
                <span>[ START_NEW_DEBATE ⚔ ]</span>
              </button>
            </Link>

            <Link href="/personas">
              <button className="btn-terminal px-4 py-2.5 text-xs font-mono flex items-center gap-2 cursor-pointer border border-[#2A303A]">
                <span>[ VIEW_AGENTS ]</span>
                <span className="text-[#FF6E26] text-[10px] font-mono">[18]</span>
              </button>
            </Link>
          </div>
        </div>

        {/* ASCII Blob Lineup (Right Side) */}
        <div className="p-4 border border-[#1E2228] bg-[#0A0A0C] flex flex-col items-center justify-center min-w-[220px] space-y-3">
          <div className="flex items-center justify-between w-full text-[9px] text-[#525A66] border-b border-[#1E2228] pb-1.5 font-mono">
            <span>// ACTIVE_ROSTER</span>
            <span className="text-[#FF6E26]">[READY]</span>
          </div>

          {/* Blobs Row */}
          <div className="flex items-center justify-center gap-2 py-1">
            {featuredBlobs.map((name) => (
              <BlobAvatar key={name} name={name} size="sm" />
            ))}
          </div>

          <div className="w-full text-center text-[10px] text-[#8B949E] border-t border-[#1E2228] pt-1.5 font-mono">
            <span className="text-[#FF6E26]">⚖</span> [ THE_COUNCIL_CHAMBER ]
          </div>
        </div>
      </div>
    </motion.div>
  );
}
