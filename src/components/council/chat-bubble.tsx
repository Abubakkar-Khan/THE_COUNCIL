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
  const isUser = contribution.role === "user" || !contribution.personaId;
  const personaName = isUser ? "YOU // DIRECTOR" : contribution.persona?.name || "Council Member";
  const time = formatRelativeTime(contribution.createdAt);

  // Format content to highlight @mentions in warm orange
  const renderContent = (text: string) => {
    const parts = text.split(/(@[\w\s]+?)(?=[:\s]|$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={i}
            className="font-semibold text-[#FF6E26] bg-[#FF6E26]/10 px-1 py-0.2"
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
      className={`group relative flex items-start gap-3 py-3 border-b border-dashed border-[#1E2228] select-none font-mono-code transition-colors ${
        isUser ? "bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10" : "hover:bg-[#0E1013]/50"
      }`}
    >
      {/* Vertical Accent Bar: Cyan for User, Orange for Persona */}
      <div
        className={`w-0.5 self-stretch opacity-90 flex-shrink-0 transition-all ${
          isUser
            ? "bg-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_12px_rgba(0,229,255,0.7)]"
            : "bg-[#FF6E26] shadow-[0_0_8px_rgba(255,110,38,0.3)] group-hover:shadow-[0_0_12px_rgba(255,110,38,0.5)]"
        }`}
      />

      {/* Bit Cat Avatar */}
      <div className="pt-0.5 flex-shrink-0">
        <BlobAvatar
          name={personaName}
          persona={contribution.persona || undefined}
          dress={
            isUser
              ? {
                  ears: "antenna",
                  eyes: "visor",
                  accessory: "headset",
                  accentColor: "#00E5FF",
                }
              : undefined
          }
          size="md"
          isSpeaking={index === 0}
        />
      </div>

      {/* Message Content Area */}
      <div className="flex-1 min-w-0 pr-2">
        {/* Header: Persona Name + Tag + Relative Timestamp */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className={`font-semibold text-xs md:text-sm tracking-tight ${
              isUser ? "text-[#00E5FF]" : "text-[#ECEFF4]"
            }`}
          >
            {personaName}
          </span>
          {isUser ? (
            <span className="text-[9px] font-mono px-1 py-0.2 border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]">
              [DIRECTOR]
            </span>
          ) : (
            <span className="text-[9px] font-mono px-1 py-0.2 border border-[#2A303A] bg-[#0E1013] text-[#8B949E]">
              [R{contribution.roundNumber}]
            </span>
          )}
          <span className="text-[10px] text-[#525A66] font-mono">
            [{time}]
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
