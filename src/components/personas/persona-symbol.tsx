"use client";

import { cn } from "@/lib/utils";

interface PersonaSymbolProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Tailored signatures, kaomojis, and badges for the 10 human personas
const KNOWN_PERSONAS: Record<
  string,
  { glyph: string; badge: string; color: string; border: string; bg: string }
> = {
  "Abubakar": {
    glyph: "(•_•)",
    badge: "ANCHOR",
    color: "text-[#38BDF8]",
    border: "border-[#38BDF8]/40",
    bg: "bg-[#38BDF8]/10",
  },
  "Father of Initiative": {
    glyph: "👑",
    badge: "FOUNDER",
    color: "text-[#F59E0B]",
    border: "border-[#F59E0B]/40",
    bg: "bg-[#F59E0B]/10",
  },
  "Vector": {
    glyph: "⟠",
    badge: "SCIENTIST",
    color: "text-[#06B6D4]",
    border: "border-[#06B6D4]/40",
    bg: "bg-[#06B6D4]/10",
  },
  "Muhammad Abubakar": {
    glyph: "🤲",
    badge: "BELIEVER",
    color: "text-[#10B981]",
    border: "border-[#10B981]/40",
    bg: "bg-[#10B981]/10",
  },
  "Daddy BKR": {
    glyph: "( ͡° ͜ʖ ͡°)",
    badge: "COMEDIAN",
    color: "text-[#FF5722]",
    border: "border-[#FF5722]/40",
    bg: "bg-[#FF5722]/10",
  },
  "The Anomaly": {
    glyph: "(⚡_⚡)",
    badge: "VISIONARY",
    color: "text-[#C084FC]",
    border: "border-[#C084FC]/40",
    bg: "bg-[#C084FC]/10",
  },
  "EGO": {
    glyph: "⚔️",
    badge: "WARRIOR",
    color: "text-[#EF4444]",
    border: "border-[#EF4444]/40",
    bg: "bg-[#EF4444]/10",
  },
  "Nerd 1337": {
    glyph: "1337",
    badge: "HACKER",
    color: "text-[#A3E635]",
    border: "border-[#A3E635]/40",
    bg: "bg-[#A3E635]/10",
  },
  "صاحبِ سوال": {
    glyph: "قلم",
    badge: "POET",
    color: "text-[#FB7185]",
    border: "border-[#FB7185]/40",
    bg: "bg-[#FB7185]/10",
  },
  "Abubakar Khan": {
    glyph: "💪",
    badge: "JOCK",
    color: "text-[#FACC15]",
    border: "border-[#FACC15]/40",
    bg: "bg-[#FACC15]/10",
  },
};

const FALLBACK_PALETTE = [
  { glyph: "(•‿•)", badge: "UNIT.A", color: "text-[#38BDF8]", border: "border-[#38BDF8]/40", bg: "bg-[#38BDF8]/10" },
  { glyph: "(•_•)", badge: "UNIT.B", color: "text-[#A3E635]", border: "border-[#A3E635]/40", bg: "bg-[#A3E635]/10" },
  { glyph: "(^o^)", badge: "UNIT.C", color: "text-[#FACC15]", border: "border-[#FACC15]/40", bg: "bg-[#FACC15]/10" },
  { glyph: "(>_<)", badge: "UNIT.D", color: "text-[#FB7185]", border: "border-[#FB7185]/40", bg: "bg-[#FB7185]/10" },
];

export function PersonaSymbol({ name, size = "md", className }: PersonaSymbolProps) {
  const profile =
    KNOWN_PERSONAS[name] ||
    FALLBACK_PALETTE[
      Math.abs(name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % FALLBACK_PALETTE.length
    ];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center font-mono-code rounded-xs border select-none transition-all shadow-[1.5px_1.5px_0px_#000000]",
        profile.bg,
        profile.color,
        profile.border,
        {
          "h-8 px-2 py-0.5 text-[10px]": size === "sm",
          "h-12 w-14 p-1 text-xs": size === "md",
          "h-16 w-20 p-1.5 text-sm": size === "lg",
        },
        className
      )}
    >
      <span className="font-bold tracking-tighter leading-none">{profile.glyph}</span>
      {size !== "sm" && (
        <span className="font-pixel text-[7px] tracking-widest mt-1 opacity-85 uppercase">
          {profile.badge}
        </span>
      )}
    </div>
  );
}
