"use client";

import { motion } from "motion/react";
import { BlobAvatar } from "./blob-avatar";
import type { Persona } from "@/types";

interface CouncilTableArtProps {
  personas: { persona: Persona }[];
  activeSpeakerName?: string;
  isLive?: boolean;
}

// ── Procedural ASCII line generators ─────────────────────────────────────────

function generateCircuitRow(width: number, seed: number): string {
  const segments = [
    "───", "━━━", "┄┄┄", "╌╌╌", "─┬─", "─┴─", "─┼─",
    "◇──", "──◇", "─○─", "─●─", "──┤", "├──", "─╴",
    "╶──", "─◆─", "◈──", "──◈",
  ];
  let line = "";
  let i = seed;
  while (line.length < width) {
    const seg = segments[i % segments.length];
    line += seg;
    i = (i * 31 + 7) % 97;
  }
  return line.slice(0, width);
}

function generateDataStream(width: number, seed: number): string {
  const glyphs = "01·.:░▒▓█│┃╎╏┊┋∴∵⋮⋯≡≈~";
  let line = "";
  let i = seed;
  while (line.length < width) {
    line += glyphs[i % glyphs.length];
    i = (i * 37 + 13) % 53;
  }
  return line.slice(0, width);
}

export function CouncilTableArt({
  personas = [],
  activeSpeakerName,
  isLive = false,
}: CouncilTableArtProps) {
  const displayPersonas = personas.slice(0, 7);
  const agentCount = displayPersonas.length;

  // Generate procedural circuit lines for the background
  const circuit1 = generateCircuitRow(80, 3);
  const circuit2 = generateCircuitRow(80, 17);
  const stream1 = generateDataStream(60, 7);
  const stream2 = generateDataStream(60, 23);

  return (
    <div className="relative w-full overflow-hidden select-none my-2">
      {/* ═══════════════════════════════════════════════════════════
          BACKGROUND: Full ASCII Terminal Chamber Scene
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative border border-[#1E2228] bg-[#0A0A0C] overflow-hidden">
        {/* Top Header Bar — Terminal Window Chrome */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1E2228] bg-[#0E1013]">
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[#FF6E26] font-mono font-bold">
              ◆ COUNCIL_CHAMBER
            </span>
            <span className="text-[9px] text-[#525A66] font-mono">
              v2.0 // {agentCount} AGENTS SEATED
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {isLive && (
              <span className="flex items-center gap-1 text-[9px] text-[#FF6E26] font-mono">
                <span className="h-1.5 w-1.5 bg-[#FF6E26] animate-radar" />
                LIVE
              </span>
            )}
            <span className="text-[9px] text-[#525A66] font-mono">
              [PID:0x{Math.abs(agentCount * 7919).toString(16).toUpperCase().slice(0, 4)}]
            </span>
          </div>
        </div>

        {/* ── Ambient Background Layer: Circuit traces + data streams ─── */}
        <div className="relative">
          {/* Flowing circuit traces (top) */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -120] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="text-[8px] text-[#1E2228] font-mono whitespace-nowrap py-0.5 px-2 select-none"
            >
              {circuit1}{circuit1}
            </motion.div>
          </div>

          {/* ── Main Council Visualization Area ─────────────────────── */}
          <div className="relative h-[200px] md:h-[240px] flex items-center justify-center">

            {/* Center ASCII Art: The Council Sigil */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
              <pre className="font-mono text-[#ECEFF4] text-[8px] md:text-[10px] leading-tight text-center select-none">
{`          ┌─────────────────────────────┐
          │  ╔═══════════════════════╗  │
          │  ║   T H E   C O U N C I L  ║  │
          │  ╚═══════════════════════╝  │
          │         ◆─────◆             │
          │        ╱ ╲   ╱ ╲            │
          │       ╱   ╲ ╱   ╲           │
          │      ◆─────◆─────◆          │
          │       ╲   ╱ ╲   ╱           │
          │        ╲ ╱   ╲ ╱            │
          │         ◆─────◆             │
          │      ┌──┴─────┴──┐          │
          │      │ DELIBERATE │          │
          │      └────────────┘          │
          └─────────────────────────────┘`}
              </pre>
            </div>

            {/* Center Council Table (SVG) */}
            <svg
              viewBox="0 0 600 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] h-[120px] pointer-events-none"
              shapeRendering="crispEdges"
            >
              {/* Table Surface: Hexagonal Slab */}
              <polygon
                points="140,65 460,65 490,85 460,105 140,105 110,85"
                fill="#0E1013"
                stroke="#2A303A"
                strokeWidth="1"
              />
              <polygon
                points="150,70 450,70 475,85 450,100 150,100 125,85"
                fill="none"
                stroke="#1E2228"
                strokeWidth="0.5"
                strokeDasharray="4 3"
              />

              {/* Orange glow under center */}
              <ellipse
                cx="300"
                cy="85"
                rx="60"
                ry="12"
                fill="#FF6E26"
                fillOpacity="0.06"
                className="animate-pulse"
              />

              {/* Scales of Justice: Center Emblem */}
              <g transform="translate(300, 78) scale(0.85)">
                {/* Pillar */}
                <rect x="-1" y="-18" width="2" height="26" fill="#FF6E26" opacity="0.8" />
                {/* Base */}
                <rect x="-10" y="8" width="20" height="2" fill="#FF6E26" opacity="0.8" />
                {/* Top ring */}
                <rect x="-2" y="-20" width="4" height="2" fill="#FF6E26" opacity="0.6" />

                {/* Rocking beam + pans */}
                <g className="animate-scales-balance origin-[0px_-18px]">
                  {/* Beam */}
                  <rect x="-22" y="-18" width="44" height="2" fill="#FF6E26" opacity="0.8" />

                  {/* Left pan chain + pan */}
                  <rect x="-22" y="-16" width="1" height="8" fill="#FF6E26" opacity="0.5" />
                  <rect x="-28" y="-8" width="14" height="2" fill="#FF6E26" opacity="0.4" />
                  <rect x="-26" y="-6" width="10" height="1" fill="#FF6E26" opacity="0.2" />

                  {/* Right pan chain + pan */}
                  <rect x="21" y="-16" width="1" height="8" fill="#FF6E26" opacity="0.5" />
                  <rect x="14" y="-8" width="14" height="2" fill="#FF6E26" opacity="0.4" />
                  <rect x="16" y="-6" width="10" height="1" fill="#FF6E26" opacity="0.2" />
                </g>
              </g>

              {/* Decorative circuit traces on table surface */}
              <line x1="160" y1="85" x2="260" y2="85" stroke="#2A303A" strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="340" y1="85" x2="440" y2="85" stroke="#2A303A" strokeWidth="0.5" strokeDasharray="2 4" />
              <rect x="260" y="83" width="4" height="4" fill="#FF6E26" fillOpacity="0.15" />
              <rect x="336" y="83" width="4" height="4" fill="#FF6E26" fillOpacity="0.15" />
            </svg>

            {/* ── Agent Bit Cats seated around the table ─────────────── */}
            <div className="absolute inset-0">
              <div className="relative w-full h-full max-w-[620px] mx-auto">
                {displayPersonas.map((item, index) => {
                  const persona = item.persona;
                  if (!persona) return null;

                  const total = displayPersonas.length;
                  const step = total > 1 ? index / (total - 1) : 0.5;

                  // Arc positions: spread from 12% to 88% width
                  const leftPercent = total === 1 ? 50 : 12 + step * 76;
                  // Vertical arc: center agents sit higher, sides lower
                  const arcHeight = Math.sin(step * Math.PI) * 18;
                  const topPx = total === 1 ? 50 : 70 - arcHeight;

                  const isSpeaking = activeSpeakerName === persona.name;

                  return (
                    <motion.div
                      key={persona.id || index}
                      className="absolute -translate-x-1/2 flex flex-col items-center select-none"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPx}px`,
                      }}
                      animate={{
                        y: isSpeaking ? [0, -6, 0] : [0, -2.5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: isSpeaking ? 1.6 : 3.4 + index * 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Speech indicator chip */}
                      <motion.div
                        animate={{
                          opacity: isSpeaking ? 1 : 0.55,
                          scale: isSpeaking ? [1, 1.06, 1] : 1,
                          y: isSpeaking ? [-1, -4, -1] : 0,
                        }}
                        transition={{
                          repeat: isSpeaking ? Infinity : 0,
                          duration: 1.6,
                          ease: "easeInOut",
                        }}
                        className="mb-1"
                      >
                        <div
                          className={`px-1.5 py-0.5 border text-[8px] font-mono flex items-center justify-center transition-colors duration-300 ${
                            isSpeaking
                              ? "border-[#FF6E26] bg-[#FF6E26]/10 text-[#FF6E26] shadow-[0_0_10px_rgba(255,110,38,0.3)]"
                              : "border-[#1E2228] bg-[#0A0A0C] text-[#525A66]"
                          }`}
                        >
                          {isSpeaking ? (
                            <span className="flex items-center gap-0.5 px-0.5">
                              <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:0ms]" />
                              <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:150ms]" />
                              <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:300ms]" />
                            </span>
                          ) : (
                            <span>···</span>
                          )}
                        </div>
                      </motion.div>

                      {/* The Bit Cat */}
                      <BlobAvatar
                        name={persona.name}
                        persona={persona}
                        size="md"
                        isSpeaking={isSpeaking}
                        isTyping={isSpeaking && isLive}
                      />

                      {/* Name Tag */}
                      <span
                        className={`mt-1 font-mono text-[8px] tracking-tight truncate max-w-[65px] text-center transition-colors duration-300 ${
                          isSpeaking ? "text-[#FF6E26] font-bold" : "text-[#525A66]"
                        }`}
                      >
                        {persona.name.split(" ")[0]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Flowing data stream (bottom) */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-80, 0] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="text-[7px] text-[#1E2228] font-mono whitespace-nowrap py-0.5 px-2 select-none"
            >
              {stream1}{stream1}
            </motion.div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 border-t border-[#1E2228] bg-[#0E1013]">
          <div className="flex items-center gap-3">
            <span className="text-[8px] text-[#525A66] font-mono">
              AGENTS:{agentCount}
            </span>
            <span className="text-[8px] text-[#525A66] font-mono">
              STATUS:{isLive ? "DELIBERATING" : "STANDBY"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Miniature activity bar */}
            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-[#FF6E26]"
                  animate={{
                    height: isLive ? [2, 4 + Math.random() * 6, 2] : [2, 3, 2],
                    opacity: isLive ? [0.3, 0.8, 0.3] : 0.15,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.15,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>
            <span className="text-[8px] text-[#525A66] font-mono">
              ◆ THE_COUNCIL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
