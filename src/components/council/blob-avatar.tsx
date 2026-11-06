"use client";

import { cn } from "@/lib/utils";
import {
  getPersonaDress,
  type BitCatDress,
  type EarType,
  type EyeType,
  type AccessoryType,
} from "@/lib/personas/aesthetics";
import type { Persona } from "@/types";

interface BitCatAvatarProps {
  name?: string;
  persona?: Partial<Persona>;
  dress?: Partial<BitCatDress>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  isTyping?: boolean;
  className?: string;
}

export type { BitCatAvatarProps };

export function BlobAvatar({
  name = "Agent",
  persona,
  dress: explicitDress,
  size = "md",
  isSpeaking = false,
  isTyping = false,
  className,
}: BitCatAvatarProps) {
  // Determine dress: explicit dress prop -> parsed from persona -> inferred from name/lore
  const dress: BitCatDress = explicitDress
    ? {
        ears: explicitDress.ears || "stepped",
        eyes: explicitDress.eyes || "pixel",
        accessory: explicitDress.accessory || "none",
        accentColor: explicitDress.accentColor || "#FF6E26",
        mouth: explicitDress.mouth || "straight",
      }
    : getPersonaDress(persona || { name });

  const dims = {
    xs: "w-5 h-4.5",
    sm: "w-7 h-6",
    md: "w-9 h-8",
    lg: "w-13 h-11",
    xl: "w-18 h-15",
  }[size];

  const strokeColor = isSpeaking ? "#FF6E26" : "#ECEFF4";
  const accent = dress.accentColor;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center flex-shrink-0 select-none transition-transform duration-200",
        isSpeaking && "scale-105",
        dims,
        className
      )}
      title={`${name} [${dress.ears} · ${dress.eyes} · ${dress.accessory}]`}
    >
      <svg
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        shapeRendering="crispEdges"
      >
        {/* ============================================================
            1. ACCESSORIES: BEHIND HEAD (Halo, Crown, Top Hat, Nightcap)
            ============================================================ */}
        {dress.accessory === "halo" && (
          /* Floating Pixel Luminous Ring */
          <g fill={accent} opacity="0.9">
            <rect x="8" y="0" width="12" height="1" />
            <rect x="6" y="1" width="2" height="1" />
            <rect x="20" y="1" width="2" height="1" />
            <rect x="8" y="2" width="12" height="1" />
          </g>
        )}

        {dress.accessory === "crown" && (
          /* 8-Bit Pixel Gold Founder Crown */
          <g>
            <rect x="9" y="1" width="2" height="4" fill={accent} />
            <rect x="13" y="0" width="2" height="5" fill={accent} />
            <rect x="17" y="1" width="2" height="4" fill={accent} />
            <rect x="8" y="4" width="12" height="2" fill="#ECEFF4" />
            <rect x="10" y="5" width="8" height="1" fill={accent} />
          </g>
        )}

        {dress.accessory === "tophat" && (
          /* Tall 8-Bit Banker Top Hat */
          <g>
            <rect x="10" y="0" width="8" height="6" fill="#0A0A0C" />
            <rect x="9" y="0" width="1" height="6" fill="#ECEFF4" />
            <rect x="18" y="0" width="1" height="6" fill="#ECEFF4" />
            <rect x="10" y="0" width="8" height="1" fill="#ECEFF4" />
            <rect x="10" y="4" width="8" height="1.5" fill={accent} />
            <rect x="7" y="5" width="14" height="1.5" fill="#ECEFF4" />
          </g>
        )}

        {dress.accessory === "nightcap" && (
          /* 8-Bit Striped Sleeping Nightcap */
          <g>
            <rect x="9" y="3" width="10" height="2" fill="#ECEFF4" />
            <rect x="13" y="1" width="7" height="2" fill={accent} />
            <rect x="18" y="2" width="4" height="2" fill="#ECEFF4" />
            <rect x="21" y="4" width="3" height="3" fill={accent} />
            <rect x="23" y="6" width="2" height="2" fill="#ECEFF4" />
          </g>
        )}

        {dress.accessory === "beret" && (
          /* Tilted 8-Bit Artist Beret */
          <g>
            <rect x="7" y="4" width="13" height="3" fill={accent} />
            <rect x="6" y="5" width="15" height="1.5" fill="#ECEFF4" />
            <rect x="13" y="3" width="1" height="1.5" fill="#ECEFF4" />
          </g>
        )}

        {dress.accessory === "spark" && (
          /* 8-Bit Lightning Arc */
          <g fill={accent}>
            <rect x="21" y="1" width="2" height="2" />
            <rect x="19" y="3" width="3" height="1.5" />
            <rect x="20" y="4" width="1.5" height="2" />
          </g>
        )}

        {/* ============================================================
            2. CHUNKY PIXEL EARS
            ============================================================ */}
        {dress.ears === "stepped" && (
          /* Classic 8-Bit Stepped Arcade Ears */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            {/* Left Ear */}
            <path d="M 3 8 L 3 5 L 5 5 L 5 3 L 8 3 L 8 8 Z" />
            {/* Right Ear */}
            <path d="M 25 8 L 25 5 L 23 5 L 23 3 L 20 3 L 20 8 Z" />
          </g>
        )}

        {dress.ears === "antenna" && (
          /* Cyber Sensory Antenna (Left ear normal, Right ear antenna) */
          <g>
            <path d="M 3 8 L 5 4 L 8 8 Z" fill="#0A0A0C" stroke={strokeColor} strokeWidth="1" />
            {/* Right antenna */}
            <rect x="21" y="2" width="1" height="6" fill={strokeColor} />
            <rect x="20" y="1" width="3" height="2" fill={accent} />
          </g>
        )}

        {dress.ears === "fin" && (
          /* Robotic Fin Sensory Ears */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            <path d="M 2 8 L 5 3 L 8 5 L 7 8 Z" />
            <path d="M 26 8 L 23 3 L 20 5 L 21 8 Z" />
          </g>
        )}

        {dress.ears === "folded" && (
          /* 90-degree Folded Droop Ears */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            <path d="M 3 7 L 7 4 L 7 8 Z" />
            <path d="M 25 7 L 21 4 L 21 8 Z" />
          </g>
        )}

        {dress.ears === "tufted" && (
          /* Lynx Tufted Ears */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            <path d="M 3 8 L 5 3 L 6 1 L 8 4 L 8 8 Z" />
            <path d="M 25 8 L 23 3 L 22 1 L 20 4 L 20 8 Z" />
          </g>
        )}

        {dress.ears === "serene" && (
          /* Soft Zen Rounded Blocks */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            <path d="M 4 8 L 4 5 L 7 5 L 8 8 Z" />
            <path d="M 24 8 L 24 5 L 21 5 L 20 8 Z" />
          </g>
        )}

        {dress.ears === "sharp" && (
          /* Aggressive Sharp Alert Pixel Ears */
          <g fill="#0A0A0C" stroke={strokeColor} strokeWidth="1">
            <polygon points="3,8 6,2 9,8" />
            <polygon points="25,8 22,2 19,8" />
          </g>
        )}

        {/* Ear Inner Pixel Accents */}
        <rect x="5" y="5" width="2" height="2" fill={accent} />
        <rect x="21" y="5" width="2" height="2" fill={accent} />

        {/* ============================================================
            3. CHUNKY 8-BIT PIXEL HEAD SILHOUETTE
            ============================================================ */}
        {/* Main Head Box with Stepped Pixel Corners */}
        <path
          d="M 4 9 
             L 24 9 
             L 26 11 
             L 26 19 
             L 24 21 
             L 4 21 
             L 2 19 
             L 2 11 Z"
          fill="#0A0A0C"
          stroke={strokeColor}
          strokeWidth="1.2"
        />

        {/* Cyberplate PCB grid for Future Me */}
        {dress.accessory === "cyberplate" && (
          <g stroke={accent} strokeWidth="0.8" opacity="0.8">
            <line x1="18" y1="10" x2="24" y2="10" />
            <line x1="20" y1="10" x2="20" y2="15" />
            <rect x="23" y="11" width="1" height="1" fill={accent} />
          </g>
        )}

        {/* Minimalist Collar Tag */}
        {dress.accessory === "tag" && (
          <rect x="13" y="20" width="2" height="2" fill={accent} />
        )}

        {/* ============================================================
            4. ACCESSORIES: FRONT (Bandana, Headset)
            ============================================================ */}
        {dress.accessory === "bandana" && (
          <g>
            <rect x="2" y="11" width="24" height="2" fill={accent} />
            {/* Flying knot tails on right */}
            <rect x="26" y="11" width="2" height="1" fill={accent} />
            <rect x="27" y="12" width="2" height="1.5" fill={accent} />
            <rect x="26" y="13" width="2" height="1" fill={accent} />
          </g>
        )}

        {dress.accessory === "headset" && (
          <g>
            <rect x="5" y="8" width="18" height="1" fill={accent} />
            <rect x="1" y="11" width="2" height="5" fill={accent} />
            <rect x="25" y="11" width="2" height="5" fill={accent} />
            {/* Mic boom */}
            <rect x="24" y="16" width="3" height="1" fill={accent} />
            <rect x="21" y="17" width="4" height="1" fill={accent} />
            <rect x="19" y="17" width="2" height="2" fill="#ECEFF4" />
          </g>
        )}

        {/* ============================================================
            5. PIXEL EYES / EYEWEAR VARIATIONS
            ============================================================ */}
        {dress.eyes === "glasses" && (
          /* Chunky Green CRT Hacker Frames */
          <g>
            <rect x="6" y="12" width="6" height="5" fill="#0A0A0C" stroke={accent} strokeWidth="1" />
            <rect x="16" y="12" width="6" height="5" fill="#0A0A0C" stroke={accent} strokeWidth="1" />
            <rect x="12" y="13" width="4" height="1" fill={accent} />
            {/* Green matrix scanline reflection */}
            <rect x="8" y="14" width="2" height="1" fill={accent} />
            <rect x="18" y="14" width="2" height="1" fill={accent} />
          </g>
        )}

        {dress.eyes === "shades" && (
          /* 8-Bit Pixel Thug Life Cool Sunglasses */
          <g>
            <rect x="5" y="12" width="7" height="4" fill="#0A0A0C" stroke="#ECEFF4" strokeWidth="0.9" />
            <rect x="16" y="12" width="7" height="4" fill="#0A0A0C" stroke="#ECEFF4" strokeWidth="0.9" />
            <rect x="12" y="13" width="4" height="1" fill="#ECEFF4" />
            {/* White pixel glare */}
            <rect x="6" y="13" width="1" height="1" fill="#ECEFF4" />
            <rect x="17" y="13" width="1" height="1" fill="#ECEFF4" />
          </g>
        )}

        {dress.eyes === "monocle" && (
          /* Cyan HUD Targeting Monocle */
          <g>
            <rect x="5" y="12" width="7" height="6" fill="#0A0A0C" stroke={accent} strokeWidth="1" />
            <line x1="8.5" y1="12" x2="8.5" y2="18" stroke={accent} strokeWidth="0.8" />
            <line x1="5" y1="15" x2="12" y2="15" stroke={accent} strokeWidth="0.8" />
            {/* Standard right pixel eye */}
            <rect x="18" y="14" width="2" height="2" fill="#ECEFF4" />
          </g>
        )}

        {dress.eyes === "visor" && (
          /* Neon Cyber Scan Visor */
          <g>
            <rect x="4" y="13" width="20" height="3" fill={accent} />
            <rect x="10" y="14" width="5" height="1" fill="#ECEFF4" />
          </g>
        )}

        {dress.eyes === "stars" && (
          /* Astral ✦ ✦ Sparkle Eyes */
          <g fill={accent} fontWeight="bold" fontSize="7" fontFamily="monospace">
            <text x="7" y="17">✦</text>
            <text x="17" y="17">✦</text>
          </g>
        )}

        {dress.eyes === "spiral" && (
          /* 8-Bit Hypnotic Concentric Spiral Eyes */
          <g stroke={accent} strokeWidth="0.9" fill="none">
            <rect x="6" y="13" width="5" height="4" />
            <rect x="8" y="14" width="1" height="2" fill={accent} />
            <rect x="17" y="13" width="5" height="4" />
            <rect x="19" y="14" width="1" height="2" fill={accent} />
          </g>
        )}

        {dress.eyes === "warrior" && (
          /* Battle Eyepatch + Fierce Slant Eye */
          <g>
            {/* Left cross-strap eyepatch */}
            <rect x="6" y="13" width="5" height="4" fill="#0A0A0C" stroke="#EF4444" strokeWidth="1" />
            <line x1="4" y1="11" x2="12" y2="18" stroke="#EF4444" strokeWidth="0.8" />
            {/* Right fierce angled eye */}
            <rect x="18" y="14" width="3" height="1.5" fill="#ECEFF4" />
            <rect x="19" y="13" width="3" height="1" fill="#EF4444" />
          </g>
        )}

        {dress.eyes === "zen" && (
          /* Serene Closed Lashes */
          <g stroke={strokeColor} strokeWidth="1.2" strokeLinecap="square">
            <path d="M 6 15 L 8 16 L 10 15" />
            <path d="M 18 15 L 20 16 L 22 15" />
          </g>
        )}

        {dress.eyes === "sleepy" && (
          /* Bored / Sleepy Straight Slits */
          <g fill={strokeColor}>
            <rect x="6" y="15" width="4" height="1.5" />
            <rect x="18" y="15" width="4" height="1.5" />
          </g>
        )}

        {dress.eyes === "laser" && (
          /* Red Laser Pupils */
          <g fill="#EF4444">
            <rect x="6" y="14" width="4" height="1.5" />
            <rect x="7" y="14" width="2" height="1.5" fill="#ECEFF4" />
            <rect x="18" y="14" width="4" height="1.5" />
            <rect x="19" y="14" width="2" height="1.5" fill="#ECEFF4" />
          </g>
        )}

        {dress.eyes === "goggles" && (
          /* Aviator Goggles on Brow */
          <g>
            <rect x="7" y="14" width="2" height="2" fill="#ECEFF4" />
            <rect x="19" y="14" width="2" height="2" fill="#ECEFF4" />
            {/* Goggles resting above */}
            <rect x="5" y="9" width="6" height="3" fill="#0A0A0C" stroke="#FB923C" strokeWidth="0.8" />
            <rect x="17" y="9" width="6" height="3" fill="#0A0A0C" stroke="#FB923C" strokeWidth="0.8" />
            <rect x="11" y="10" width="6" height="1" fill="#FB923C" />
          </g>
        )}

        {dress.eyes === "hype" && (
          /* Wide High-Energy Eyes */
          <g fill="#EAB308">
            <rect x="6" y="13" width="3" height="3" />
            <rect x="6" y="13" width="1" height="1" fill="#ECEFF4" />
            <rect x="19" y="13" width="3" height="3" />
            <rect x="19" y="13" width="1" height="1" fill="#ECEFF4" />
          </g>
        )}

        {dress.eyes === "smirk" && (
          /* Winking Eye */
          <g fill={strokeColor}>
            {/* Left wink */}
            <rect x="6" y="14" width="4" height="1.2" />
            {/* Right wide eye */}
            <rect x="18" y="13" width="3" height="3" />
            <rect x="18" y="13" width="1" height="1" fill="#0A0A0C" />
          </g>
        )}

        {dress.eyes === "pixel" && (
          /* Clean 2x2 Square Pixel Eyes */
          <g fill={strokeColor}>
            <rect x="7" y="14" width="2.5" height="2.5" />
            <rect x="18" y="14" width="2.5" height="2.5" />
          </g>
        )}

        {/* ============================================================
            6. PIXEL MOUTH & NOSE
            ============================================================ */}
        {/* Pixel Nose Dot */}
        <rect x="13.5" y="16" width="1" height="1" fill={accent} />

        {/* Pixel Mouth */}
        {isSpeaking ? (
          /* Speaking Animated Open Pixel Mouth */
          <rect x="12" y="18" width="4" height="2" fill={strokeColor} />
        ) : dress.mouth === "fang" ? (
          <g fill={strokeColor}>
            <rect x="11" y="18" width="6" height="1" />
            <rect x="14" y="19" width="1.5" height="1.5" fill="#ECEFF4" />
          </g>
        ) : dress.mouth === "smirk" ? (
          <g fill={strokeColor}>
            <rect x="12" y="18" width="4" height="1" />
            <rect x="16" y="17" width="1.5" height="1" />
          </g>
        ) : dress.mouth === "cat-w" ? (
          <g fill={strokeColor}>
            <rect x="11" y="18" width="2" height="1" />
            <rect x="13" y="17.5" width="2" height="1" />
            <rect x="15" y="18" width="2" height="1" />
          </g>
        ) : dress.mouth === "open" ? (
          <rect x="13" y="18" width="2" height="2" fill={strokeColor} />
        ) : (
          /* Straight Disciplined Line */
          <rect x="12" y="18" width="4" height="1" fill={strokeColor} />
        )}

        {/* ============================================================
            7. 8-BIT STEPPED WHISKERS
            ============================================================ */}
        <g fill={strokeColor} opacity="0.75">
          {/* Left Whiskers */}
          <rect x="0" y="15" width="2" height="1" />
          <rect x="0" y="17" width="2" height="1" />
          {/* Right Whiskers */}
          <rect x="26" y="15" width="2" height="1" />
          <rect x="26" y="17" width="2" height="1" />
        </g>
      </svg>

      {/* Live Radar Typing Diode Dot */}
      {isTyping && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-radar absolute inline-flex h-full w-full bg-[#FF6E26]" />
          <span className="relative inline-flex h-2 w-2 bg-[#FF6E26]" />
        </span>
      )}
    </div>
  );
}

// Named alias for convenience
export const BitCatAvatar = BlobAvatar;
