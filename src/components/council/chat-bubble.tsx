"use client";

import { motion } from "motion/react";
import { BlobAvatar } from "./blob-avatar";
import type { Contribution } from "@/types";

interface ChatBubbleProps {
  contribution: Contribution;
  index: number;
}

function formatRelativeTime(dateStr: string | Date | undefined) {
  if (!dateStr) return "just now";
  const now = new Date();
  const d = new Date(dateStr);
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffSec < 45) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

export function ChatBubble({ contribution, index }: ChatBubbleProps) {
  const personaName = contribution.persona?.name || "Council Member";
  const time = formatRelativeTime(contribution.createdAt);

  // Format content to highlight @mentions in warm orange
  const renderContent = (text: string) => {
    const parts = text.split(/(@[\w\s]+?)(?=[:\s]|$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={i}
            className="font-semibold text-[#FF6E26] bg-[#FF6E26]/10 px-1 py-0.2 rounded-xs"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1], // Buttery smooth spring curve
        delay: Math.min(index * 0.03, 0.2),
      }}
      className="group relative flex items-start gap-3 py-3 border-b border-dashed border-[#1E2228] select-none font-mono-code transition-colors hover:bg-[#0E1013]/50"
    >
      {/* Orange Vertical Accent Bar with ambient glow */}
      <div className="w-1 self-stretch rounded-xs bg-[#FF6E26] opacity-90 flex-shrink-0 shadow-[0_0_8px_rgba(255,110,38,0.3)] transition-all group-hover:shadow-[0_0_12px_rgba(255,110,38,0.5)]" />

      {/* Cute Blob Cat Avatar */}
      <div className="pt-0.5 flex-shrink-0">
        <BlobAvatar name={personaName} size="md" isSpeaking={index === 0} />
      </div>

      {/* Message Content Area */}
      <div className="flex-1 min-w-0 pr-2">
        {/* Header: Persona Name + Relative Timestamp */}
        <div className="flex items-baseline gap-2.5 mb-1">
          <span className="font-semibold text-xs md:text-sm text-[#ECEFF4] tracking-tight">
            {personaName}
          </span>
          <span className="text-[11px] text-[#525A66]">
            {time}
          </span>
        </div>

        {/* Message Monospace Body */}
        <p className="text-xs md:text-sm text-[#D8DEE9] leading-relaxed break-words whitespace-pre-wrap font-mono-code">
          {renderContent(contribution.content)}
        </p>
      </div>
    </motion.div>
  );
}
