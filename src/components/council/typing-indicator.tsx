"use client";

import { motion } from "motion/react";
import { Cpu, Radio } from "lucide-react";

interface TypingIndicatorProps {
  names: string[];
}

export function TypingIndicator({ names }: TypingIndicatorProps) {
  const label =
    names.length === 1
      ? `${names[0]} is formulating rebuttal...`
      : names.length === 2
      ? `${names[0]} & ${names[1]} are clashing...`
      : `${names[0]} & others are synthesizing counterpoints...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex items-center gap-2.5 py-1 px-1 font-mono-code text-[11px] select-none"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#131518] border border-[#2A2E33] shadow-[1.5px_1.5px_0px_#000000]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-ping" />
        <span className="font-pixel text-[8px] text-[#FF5722] uppercase tracking-wider">
          CALCULATING
        </span>
        <div className="flex items-end gap-0.5 h-2.5 ml-1">
          <span className="w-0.5 h-full bg-[#A3E635] animate-pulse" />
          <span className="w-0.5 h-2 bg-[#FACC15] animate-pulse [animation-delay:0.1s]" />
          <span className="w-0.5 h-1 bg-[#FF5722] animate-pulse [animation-delay:0.2s]" />
        </div>
      </div>

      <span className="text-[#8B949E] text-[10px] animate-pulse">
        {label}
      </span>
    </motion.div>
  );
}
