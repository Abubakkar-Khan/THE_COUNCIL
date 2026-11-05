"use client";

import { motion } from "motion/react";
import { BlobAvatar } from "./blob-avatar";
import type { Persona } from "@/types";

interface CouncilTableArtProps {
  personas: { persona: Persona }[];
  activeSpeakerName?: string;
  isLive?: boolean;
}

export function CouncilTableArt({
  personas = [],
  activeSpeakerName,
  isLive = false,
}: CouncilTableArtProps) {
  // Use up to 5 personas to form the semicircle around the table
  const displayPersonas = personas.slice(0, 5);

  return (
    <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden select-none flex items-center justify-center my-2">
      {/* Background SVG: Dotted concentric arch + dithered mountain silhouettes */}
      <svg
        viewBox="0 0 700 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="dot-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#ECEFF4" opacity="0.25" />
          </pattern>
          <pattern id="dot-dense" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.75" fill="#ECEFF4" opacity="0.4" />
          </pattern>
        </defs>

        {/* Concentric Dotted Arches (Rainbow) with buttery smooth flowing beam */}
        <path
          d="M 120 230 C 120 70, 580 70, 580 230"
          stroke="#ECEFF4"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          opacity="0.35"
          className="animate-ascii-flow"
        />
        <path
          d="M 160 230 C 160 95, 540 95, 540 230"
          stroke="#ECEFF4"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          opacity="0.25"
          className="animate-ascii-flow-reverse"
        />
        <path
          d="M 200 230 C 200 120, 500 120, 500 230"
          stroke="#ECEFF4"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          opacity="0.18"
          className="animate-ascii-flow"
        />

        {/* Dithered Mountain Peaks (Left & Right) */}
        {/* Left Peak */}
        <path
          d="M 20 240 L 90 150 L 170 240 Z"
          fill="url(#dot-pattern)"
          stroke="#ECEFF4"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          opacity="0.4"
        />
        <path
          d="M 50 240 L 90 150 L 130 240 Z"
          fill="url(#dot-dense)"
          opacity="0.2"
        />

        {/* Right Peak */}
        <path
          d="M 530 240 L 610 145 L 680 240 Z"
          fill="url(#dot-pattern)"
          stroke="#ECEFF4"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          opacity="0.4"
        />
        <path
          d="M 570 240 L 610 145 L 650 240 Z"
          fill="url(#dot-dense)"
          opacity="0.2"
        />

        {/* Twinkling ASCII Stars with staggered buttery organic pulse */}
        <text x="75" y="80" fill="#ECEFF4" fontSize="10" fontFamily="monospace" className="animate-twinkle-1">✦</text>
        <text x="140" y="55" fill="#ECEFF4" fontSize="8" fontFamily="monospace" className="animate-twinkle-2">·</text>
        <text x="260" y="65" fill="#ECEFF4" fontSize="7" fontFamily="monospace" className="animate-twinkle-3">·</text>
        <text x="440" y="60" fill="#ECEFF4" fontSize="7" fontFamily="monospace" className="animate-twinkle-1">·</text>
        <text x="560" y="75" fill="#ECEFF4" fontSize="9" fontFamily="monospace" className="animate-twinkle-2">✦</text>
        <text x="625" y="110" fill="#ECEFF4" fontSize="8" fontFamily="monospace" className="animate-twinkle-3">·</text>

        {/* Dotted Ground Horizon */}
        <line
          x1="60"
          y1="230"
          x2="640"
          y2="230"
          stroke="#ECEFF4"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.25"
        />

        {/* The Oval Council Table */}
        <ellipse
          cx="350"
          cy="200"
          rx="145"
          ry="38"
          fill="#0A0A0C"
          stroke="#ECEFF4"
          strokeWidth="1.5"
        />
        <ellipse
          cx="350"
          cy="200"
          rx="135"
          ry="32"
          fill="#0D0E11"
          stroke="#ECEFF4"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.4"
        />

        {/* Warm Ambient Table Reflection under the Scales */}
        <ellipse
          cx="350"
          cy="198"
          rx="46"
          ry="14"
          fill="#FF6E26"
          fillOpacity="0.09"
          className="animate-pulse"
        />

        {/* Scales of Justice in the center (Harmonic Rocking Animation) */}
        <g transform="translate(350, 192) scale(0.9)">
          {/* Base & Pillar */}
          <line x1="-12" y1="14" x2="12" y2="14" stroke="#FF6E26" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="14" x2="0" y2="-12" stroke="#FF6E26" strokeWidth="1.5" strokeLinecap="round" />

          {/* Rocking Crossbeam & Suspended Pans Group */}
          <g className="animate-scales-balance origin-[0px_-12px]">
            {/* Crossbeam */}
            <line x1="-18" y1="-12" x2="18" y2="-12" stroke="#FF6E26" strokeWidth="1.5" strokeLinecap="round" />
            {/* Left Pan */}
            <line x1="-18" y1="-12" x2="-23" y2="-3" stroke="#FF6E26" strokeWidth="1" />
            <line x1="-18" y1="-12" x2="-13" y2="-3" stroke="#FF6E26" strokeWidth="1" />
            <path d="M -25 -3 Q -18 2 -11 -3 Z" fill="#FF6E26" fillOpacity="0.2" stroke="#FF6E26" strokeWidth="1.2" />
            {/* Right Pan */}
            <line x1="18" y1="-12" x2="13" y2="-3" stroke="#FF6E26" strokeWidth="1" />
            <line x1="18" y1="-12" x2="23" y2="-3" stroke="#FF6E26" strokeWidth="1" />
            <path d="M 11 -3 Q 18 2 25 -3 Z" fill="#FF6E26" fillOpacity="0.2" stroke="#FF6E26" strokeWidth="1.2" />
          </g>

          {/* Top Ring */}
          <circle cx="0" cy="-14" r="1.5" stroke="#FF6E26" strokeWidth="1" fill="none" />
        </g>
      </svg>

      {/* Dynamic Blob Creatures Seated Around the Table */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="relative w-full max-w-[620px] h-[220px]">
          {displayPersonas.map((item, index) => {
            const persona = item.persona;
            if (!persona) return null;

            // Compute positions along an arc above the table
            const total = displayPersonas.length;
            const step = total > 1 ? index / (total - 1) : 0.5;

            // Arc positioning: x from 20% to 80%, y from 145px (sides) to 130px (center)
            const leftPercent = total === 1 ? 50 : 20 + step * 60;
            const yOffset = Math.sin(step * Math.PI) * 14;
            const topPx = 135 - yOffset;

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
                  y: isSpeaking ? [0, -5, 0] : [0, -2.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: isSpeaking ? 1.6 : 3.4 + index * 0.4,
                  ease: "easeInOut",
                }}
              >
                {/* Floating Dotted Speech Bubble with Bouncing Pulse */}
                <motion.div
                  animate={{
                    opacity: isSpeaking ? 1 : 0.65,
                    scale: isSpeaking ? [1, 1.05, 1] : 1,
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
                    className={`px-2 py-0.5 rounded-sm border text-[9px] font-mono flex items-center justify-center transition-colors duration-300 ${
                      isSpeaking
                        ? "border-[#FF6E26] bg-[#0E1013] text-[#FF6E26] shadow-[0_0_8px_rgba(255,110,38,0.25)]"
                        : "border-[#ECEFF4]/30 border-dashed bg-[#0A0A0C]/90 text-[#ECEFF4]/60"
                    }`}
                  >
                    {isSpeaking ? (
                      <span className="flex items-center gap-0.5 px-0.5">
                        <span className="h-1 w-1 rounded-full bg-[#FF6E26] animate-bounce [animation-delay:0ms]" />
                        <span className="h-1 w-1 rounded-full bg-[#FF6E26] animate-bounce [animation-delay:150ms]" />
                        <span className="h-1 w-1 rounded-full bg-[#FF6E26] animate-bounce [animation-delay:300ms]" />
                      </span>
                    ) : (
                      <span>···</span>
                    )}
                  </div>
                </motion.div>

                {/* The Blob Creature Avatar */}
                <BlobAvatar
                  name={persona.name}
                  size="md"
                  isSpeaking={isSpeaking}
                  isTyping={isSpeaking && isLive}
                  className="shadow-sm"
                />

                {/* Subtle Name Tag */}
                <span
                  className={`mt-1 font-mono text-[9px] tracking-tight truncate max-w-[70px] text-center transition-colors duration-300 ${
                    isSpeaking ? "text-[#FF6E26] font-semibold" : "text-[#8B949E]"
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
  );
}
