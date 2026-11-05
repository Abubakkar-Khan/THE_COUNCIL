"use client";

interface RoundDividerProps {
  roundNumber: number;
}

export function RoundDivider({ roundNumber }: RoundDividerProps) {
  const titles: Record<number, { title: string; subtitle: string; icon: string }> = {
    1: { title: "STAGE 01 // OPENING TAKES", subtitle: "RAW GUT POSITIONS", icon: "⚔️" },
    2: { title: "STAGE 02 // DIRECT CROSSFIRE", subtitle: "REBUTTALS & BLIND SPOTS", icon: "⚡" },
    3: { title: "STAGE 03 // FINAL STAND", subtitle: "LAST WORD BEFORE VERDICT", icon: "🛡️" },
  };

  const info = titles[roundNumber] || {
    title: `STAGE ${String(roundNumber).padStart(2, "0")} // DELIBERATION`,
    subtitle: "COUNCIL DISCOURSE",
    icon: "◆",
  };

  return (
    <div className="flex items-center justify-center my-6 select-none font-mono-code">
      <div className="flex items-center gap-2 px-3 py-1 rounded-xs bg-[#131518] border border-[#2A2E33] shadow-[2px_2px_0px_#000000]">
        <span className="font-pixel text-[9px]">{info.icon}</span>
        <span className="font-pixel text-[9px] text-[#FF5722] tracking-wider">
          {info.title}
        </span>
        <span className="text-[9px] text-[#5A626C]">//</span>
        <span className="font-pixel text-[8px] text-[#8B949E] tracking-widest uppercase">
          {info.subtitle}
        </span>
      </div>
    </div>
  );
}
