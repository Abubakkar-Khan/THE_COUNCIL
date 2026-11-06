"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  BookOpen,
  History,
  Radio,
} from "lucide-react";

// Cute Cat Head SVG Icon matching the retro terminal blob aesthetic
function CatHeadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 h-4", className)}
    >
      <path
        d="M 2 10 
           C 2 6, 3 4, 4.5 3 
           C 5 2.5, 5.5 3, 6 4.5 
           C 8 4, 12 4, 14 4.5 
           C 14.5 3, 15 2.5, 15.5 3 
           C 17 4, 18 6, 18 10 
           C 18 15, 15 16.5, 10 16.5 
           C 5 16.5, 2 15, 2 10 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Whiskers */}
      <line x1="3" y1="9.5" x2="5.5" y2="9.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="3" y1="11" x2="5.5" y2="10.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="14.5" y1="9.5" x2="17" y2="9.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="14.5" y1="10.5" x2="17" y2="11" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="7" cy="9" r="0.9" fill="currentColor" />
      <circle cx="13" cy="9" r="0.9" fill="currentColor" />
    </svg>
  );
}

const navigation = [
  {
    idx: "01",
    name: "Debate",
    href: "/debates/new",
    icon: MessageSquare,
  },
  {
    idx: "02",
    name: "1v1 Chat",
    href: "/chat",
    icon: Radio,
  },
  {
    idx: "03",
    name: "Agents",
    href: "/personas",
    icon: CatHeadIcon,
  },
  {
    idx: "04",
    name: "Library",
    href: "/",
    icon: BookOpen,
  },
  {
    idx: "05",
    name: "History",
    href: "/debates",
    icon: History,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-[#1E2228] bg-[#0A0A0C] font-mono-code text-xs select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 p-4 border-b border-[#1E2228] bg-[#0E1013]/50">
        {/* 4 Orange Squares (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-1 flex-shrink-0">
          <div className="w-2.5 h-2.5 border-2 border-[#FF6E26]" />
          <div className="w-2.5 h-2.5 border-2 border-[#FF6E26]" />
          <div className="w-2.5 h-2.5 border-2 border-[#FF6E26]" />
          <div className="w-2.5 h-2.5 border-2 border-[#FF6E26]" />
        </div>

        <div>
          <span className="font-pixel text-[11px] tracking-wider text-[#ECEFF4] block leading-tight">
            THE
          </span>
          <span className="font-pixel text-[11px] tracking-wider text-[#ECEFF4] flex items-center">
            COUNCIL<span className="text-[#FF6E26] animate-cursor-smooth">_</span>
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-2.5 py-4 space-y-1.5">
        <div className="px-2 pb-1.5 text-[9px] text-[#525A66] font-mono tracking-wider">
          // SYS_NAVIGATION
        </div>

        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-2.5 py-2 border text-xs font-mono transition-all",
                isActive
                  ? "border-l-2 border-l-[#FF6E26] border-y border-r border-[#1E2228] bg-[#14171C] text-[#ECEFF4] font-medium"
                  : "border-transparent text-[#8B949E] hover:border-[#1E2228] hover:text-[#ECEFF4] hover:bg-[#0E1013]"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    isActive ? "text-[#FF6E26]" : "text-[#525A66]"
                  )}
                >
                  {isActive ? ">" : item.idx}
                </span>
                <item.icon
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    isActive ? "text-[#FF6E26]" : "text-[#8B949E] group-hover:text-[#ECEFF4]"
                  )}
                />
                <span className="tracking-tight">{item.name}</span>
              </div>

              {isActive && (
                <span className="text-[10px] text-[#FF6E26] font-bold">◄</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom ASCII Dithered Mountain Peaks & Stars */}
      <div className="p-3 border-t border-[#1E2228] relative overflow-hidden text-[#525A66] bg-[#0A0A0C]">
        <svg
          viewBox="0 0 180 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-70"
        >
          <defs>
            <pattern id="side-dither" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.75" fill="#ECEFF4" opacity="0.3" />
            </pattern>
          </defs>

          {/* ASCII Stars with buttery twinkle */}
          <text x="25" y="15" fill="#ECEFF4" fontSize="6" fontFamily="monospace" className="animate-twinkle-2">✦</text>
          <text x="75" y="10" fill="#ECEFF4" fontSize="5" fontFamily="monospace" className="animate-twinkle-1">·</text>
          <text x="120" y="20" fill="#ECEFF4" fontSize="7" fontFamily="monospace" className="animate-twinkle-3">·</text>
          <text x="150" y="12" fill="#ECEFF4" fontSize="6" fontFamily="monospace" className="animate-twinkle-1">✦</text>

          {/* Dithered Mountain Peaks */}
          <path
            d="M 10 80 L 55 35 L 105 80 Z"
            fill="url(#side-dither)"
            stroke="#ECEFF4"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.5"
          />
          <path
            d="M 80 80 L 125 45 L 170 80 Z"
            fill="url(#side-dither)"
            stroke="#ECEFF4"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.35"
          />
        </svg>

        <div className="flex items-center justify-between text-[9px] text-[#525A66] mt-1 font-mono">
          <span>CLAUDE_CODE.V1</span>
          <span className="flex items-center gap-1.5 text-[#FF6E26]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6E26] animate-radar" />
            <span>ONLINE</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
