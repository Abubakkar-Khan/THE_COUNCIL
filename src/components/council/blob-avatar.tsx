"use client";

import { cn } from "@/lib/utils";

interface BitCatAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  isTyping?: boolean;
  className?: string;
  showBadge?: boolean;
}

export type { BitCatAvatarProps };

// Configuration archetype for each bit cat persona
interface CatArchetype {
  ears: "sharp" | "stepped" | "antenna" | "folded" | "tufted" | "fin" | "serene";
  eyes:
    | "glasses"
    | "monocle"
    | "visor"
    | "shades"
    | "stars"
    | "smirk"
    | "spiral"
    | "warrior"
    | "zen"
    | "sleepy"
    | "laser"
    | "hype"
    | "pixel"
    | "goggles";
  accessory:
    | "crown"
    | "bandana"
    | "headset"
    | "beret"
    | "halo"
    | "spark"
    | "nightcap"
    | "shades"
    | "cyberplate"
    | "tophat"
    | "tag"
    | "none";
  accentColor: string;
  mouth: "straight" | "smirk" | "fang" | "open" | "sleepy" | "cat-w";
}

function getArchetype(name: string): CatArchetype {
  switch (name) {
    case "Father of Initiative":
      return {
        ears: "sharp",
        eyes: "pixel",
        accessory: "crown",
        accentColor: "#FF6E26",
        mouth: "smirk",
      };
    case "Vector":
      return {
        ears: "antenna",
        eyes: "monocle",
        accessory: "none",
        accentColor: "#00E5FF",
        mouth: "straight",
      };
    case "Daddy BKR":
      return {
        ears: "sharp",
        eyes: "smirk",
        accessory: "shades",
        accentColor: "#F59E0B",
        mouth: "smirk",
      };
    case "Muhammad Abubakar":
      return {
        ears: "serene",
        eyes: "zen",
        accessory: "halo",
        accentColor: "#10B981",
        mouth: "straight",
      };
    case "The Anomaly":
      return {
        ears: "antenna",
        eyes: "spiral",
        accessory: "spark",
        accentColor: "#A855F7",
        mouth: "fang",
      };
    case "EGO":
      return {
        ears: "sharp",
        eyes: "warrior",
        accessory: "bandana",
        accentColor: "#EF4444",
        mouth: "fang",
      };
    case "Nerd 1337":
      return {
        ears: "stepped",
        eyes: "glasses",
        accessory: "headset",
        accentColor: "#22C55E",
        mouth: "cat-w",
      };
    case "صاحبِ سوال":
      return {
        ears: "tufted",
        eyes: "zen",
        accessory: "beret",
        accentColor: "#F43F5E",
        mouth: "straight",
      };
    case "Abubakar Khan":
      return {
        ears: "sharp",
        eyes: "hype",
        accessory: "bandana",
        accentColor: "#EAB308",
        mouth: "open",
      };
    case "Logical Me":
      return {
        ears: "fin",
        eyes: "monocle",
        accessory: "none",
        accentColor: "#38BDF8",
        mouth: "straight",
      };
    case "Creative Me":
      return {
        ears: "tufted",
        eyes: "stars",
        accessory: "spark",
        accentColor: "#EC4899",
        mouth: "cat-w",
      };
    case "Risk-Taking Me":
      return {
        ears: "sharp",
        eyes: "goggles",
        accessory: "none",
        accentColor: "#FB923C",
        mouth: "fang",
      };
    case "Ambitious Me":
      return {
        ears: "sharp",
        eyes: "visor",
        accessory: "none",
        accentColor: "#FF6E26",
        mouth: "smirk",
      };
    case "Lazy Me":
      return {
        ears: "folded",
        eyes: "sleepy",
        accessory: "nightcap",
        accentColor: "#64748B",
        mouth: "sleepy",
      };
    case "Brutally Honest Me":
      return {
        ears: "sharp",
        eyes: "laser",
        accessory: "none",
        accentColor: "#F87171",
        mouth: "fang",
      };
    case "Future Me":
      return {
        ears: "fin",
        eyes: "visor",
        accessory: "cyberplate",
        accentColor: "#06B6D4",
        mouth: "straight",
      };
    case "Financially Minded Me":
      return {
        ears: "stepped",
        eyes: "monocle",
        accessory: "tophat",
        accentColor: "#EAB308",
        mouth: "smirk",
      };
    case "Abubakar":
    default:
      return {
        ears: "stepped",
        eyes: "pixel",
        accessory: "tag",
        accentColor: "#FF6E26",
        mouth: "straight",
      };
  }
}

export function BlobAvatar({
  name,
  size = "md",
  isSpeaking = false,
  isTyping = false,
  className,
}: BitCatAvatarProps) {
  const arc = getArchetype(name);

  // Scaled dimensions
  const dims = {
    xs: "w-5 h-4",
    sm: "w-7 h-6",
    md: "w-9 h-8",
    lg: "w-12 h-10",
    xl: "w-16 h-14",
  }[size];

  const primaryStroke = isSpeaking ? "#FF6E26" : "#ECEFF4";
  const glow = isSpeaking ? `drop-shadow(0 0 6px ${arc.accentColor}80)` : undefined;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center flex-shrink-0 select-none transition-all duration-200",
        isSpeaking && "scale-105",
        dims,
        className
      )}
      style={{ filter: glow }}
      title={`${name} [${arc.ears} · ${arc.eyes}]`}
    >
      <svg
        viewBox="0 0 44 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        shapeRendering="geometricPrecision"
      >
        {/* --- ACCESSORY: BEHIND BODY (Halo, Crown, Tophat, Nightcap) --- */}
        {arc.accessory === "halo" && (
          <ellipse
            cx="22"
            cy="4"
            rx="12"
            ry="3.5"
            stroke={arc.accentColor}
            strokeWidth="1.4"
            strokeDasharray="3 2"
            fill="none"
            opacity="0.9"
          />
        )}

        {arc.accessory === "crown" && (
          <path
            d="M 13 8 L 15 1 L 22 5 L 29 1 L 31 8 Z"
            fill={arc.accentColor}
            stroke="#ECEFF4"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        )}

        {arc.accessory === "tophat" && (
          <g>
            <rect x="15" y="0" width="14" height="9" fill="#0A0A0C" stroke="#ECEFF4" strokeWidth="1.2" />
            <line x1="12" y1="9" x2="32" y2="9" stroke="#ECEFF4" strokeWidth="1.6" />
            <rect x="15" y="6" width="14" height="2" fill={arc.accentColor} />
          </g>
        )}

        {arc.accessory === "nightcap" && (
          <g>
            <path
              d="M 14 9 Q 22 2 34 8 Q 38 14 36 18"
              stroke="#ECEFF4"
              strokeWidth="1.4"
              fill="#0E1013"
              strokeLinejoin="round"
            />
            <circle cx="36" cy="18" r="2.2" fill={arc.accentColor} stroke="#ECEFF4" strokeWidth="1" />
          </g>
        )}

        {arc.accessory === "beret" && (
          <path
            d="M 10 9 C 14 4, 30 3, 34 8 C 36 10, 32 12, 12 11 Z"
            fill={arc.accentColor}
            stroke="#ECEFF4"
            strokeWidth="1.2"
          />
        )}

        {arc.accessory === "spark" && (
          <g fill={arc.accentColor}>
            <text x="35" y="7" fontSize="8" fontFamily="monospace" fontWeight="bold">⚡</text>
          </g>
        )}

        {/* --- EAR ARCHITECTURES --- */}
        {arc.ears === "stepped" ? (
          /* 8-Bit Pixel Stepped Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            {/* Left Pixel Ear */}
            <path d="M 9 12 L 9 7 L 12 7 L 12 4 L 15 4 L 15 10" />
            {/* Right Pixel Ear */}
            <path d="M 35 12 L 35 7 L 32 7 L 32 4 L 29 4 L 29 10" />
          </g>
        ) : arc.ears === "antenna" ? (
          /* Cyber Sensory Antenna (Left Ear = normal, Right Ear = antenna) */
          <g stroke={primaryStroke} strokeWidth="1.4">
            <path d="M 8 13 L 13 4 L 17 10" fill="#0E1013" />
            <line x1="29" y1="10" x2="35" y2="2" strokeWidth="1.5" stroke={arc.accentColor} />
            <circle cx="36" cy="2" r="1.8" fill={arc.accentColor} stroke="#ECEFF4" strokeWidth="1" />
          </g>
        ) : arc.ears === "folded" ? (
          /* Folded / Droop Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            <path d="M 8 12 Q 10 7 13 8 Q 14 11 11 14 Z" />
            <path d="M 36 12 Q 34 7 31 8 Q 30 11 33 14 Z" />
          </g>
        ) : arc.ears === "fin" ? (
          /* Futuristic Cyber Fin Sensory Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            <polygon points="7,14 11,3 16,8 14,12" strokeLinejoin="round" />
            <polygon points="37,14 33,3 28,8 30,12" strokeLinejoin="round" />
            <line x1="11" y1="6" x2="14" y2="10" stroke={arc.accentColor} strokeWidth="1" />
            <line x1="33" y1="6" x2="30" y2="10" stroke={arc.accentColor} strokeWidth="1" />
          </g>
        ) : arc.ears === "tufted" ? (
          /* Lynx Tufted Fluffy Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            <path d="M 8 13 L 12 4 L 13 2 L 15 5 L 17 10" strokeLinejoin="round" />
            <path d="M 36 13 L 32 4 L 31 2 L 29 5 L 27 10" strokeLinejoin="round" />
          </g>
        ) : arc.ears === "serene" ? (
          /* Gentle Soft Curved Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            <path d="M 9 12 C 9 6, 15 6, 17 11" strokeLinejoin="round" />
            <path d="M 35 12 C 35 6, 29 6, 27 11" strokeLinejoin="round" />
          </g>
        ) : (
          /* Classic Sharp Alert Ears */
          <g stroke={primaryStroke} strokeWidth="1.4" fill="#0E1013">
            <polygon points="8,13 13,3 17,10" strokeLinejoin="round" />
            <polygon points="36,13 31,3 27,10" strokeLinejoin="round" />
            {/* Inner ear notch */}
            <line x1="11" y1="10" x2="13" y2="7" stroke={arc.accentColor} strokeWidth="1.2" />
            <line x1="33" y1="10" x2="31" y2="7" stroke={arc.accentColor} strokeWidth="1.2" />
          </g>
        )}

        {/* --- MAIN BIT CAT HEAD SILHOUETTE --- */}
        <path
          d="M 7 21 
             C 7 13, 10 10, 14 10 
             L 30 10 
             C 34 10, 37 13, 37 21 
             C 37 30, 32 33, 22 33 
             C 12 33, 7 30, 7 21 Z"
          fill="#0A0A0C"
          stroke={primaryStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Cyberplate Pattern for Future Me */}
        {arc.accessory === "cyberplate" && (
          <g stroke={arc.accentColor} strokeWidth="0.9" opacity="0.7">
            <line x1="28" y1="12" x2="35" y2="18" />
            <line x1="31" y1="12" x2="36" y2="15" />
            <circle cx="28" cy="12" r="0.8" fill={arc.accentColor} />
          </g>
        )}

        {/* --- ACCESSORY: BANDANA / HEADBAND / HEADPHONES --- */}
        {arc.accessory === "bandana" && (
          <g>
            <path
              d="M 7 15 Q 22 17 37 15"
              stroke={arc.accentColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Bandana Knot tails on right */}
            <path d="M 37 15 L 42 12" stroke={arc.accentColor} strokeWidth="1.5" />
            <path d="M 37 16 L 41 18" stroke={arc.accentColor} strokeWidth="1.5" />
          </g>
        )}

        {arc.accessory === "headset" && (
          <g stroke={arc.accentColor} strokeWidth="1.4">
            <path d="M 7 18 Q 22 8 37 18" fill="none" />
            <rect x="5" y="15" width="3" height="7" rx="1" fill="#0A0A0C" />
            <rect x="36" y="15" width="3" height="7" rx="1" fill="#0A0A0C" />
            {/* Mic boom */}
            <path d="M 37 20 L 32 26 L 27 26" strokeWidth="1" fill="none" />
            <circle cx="27" cy="26" r="1.2" fill={arc.accentColor} />
          </g>
        )}

        {/* Minimalist Pixel Tag for Default Abubakar */}
        {arc.accessory === "tag" && (
          <rect x="21" y="31" width="2" height="3" fill="#FF6E26" />
        )}

        {/* --- EYES / EYEWEAR VARIATIONS --- */}
        {arc.eyes === "glasses" ? (
          /* Chunky Green CRT Hacker Frames */
          <g stroke={arc.accentColor} strokeWidth="1.3">
            <rect x="11" y="16" width="8" height="6" fill="#0A0A0C" />
            <rect x="25" y="16" width="8" height="6" fill="#0A0A0C" />
            <line x1="19" y1="19" x2="25" y2="19" strokeWidth="1.4" />
            {/* Green terminal reflection lines */}
            <line x1="13" y1="18" x2="17" y2="18" strokeWidth="1" />
            <line x1="27" y1="18" x2="31" y2="18" strokeWidth="1" />
          </g>
        ) : arc.eyes === "monocle" ? (
          /* Analytical HUD Targeting Crosshair Monocle */
          <g>
            <circle cx="16" cy="19" r="4.5" stroke={arc.accentColor} strokeWidth="1.3" fill="#0A0A0C" />
            <line x1="13" y1="19" x2="19" y2="19" stroke={arc.accentColor} strokeWidth="0.8" />
            <line x1="16" y1="16" x2="16" y2="22" stroke={arc.accentColor} strokeWidth="0.8" />
            {/* Left standard eye */}
            <circle cx="28" cy="19" r="1.8" fill="#ECEFF4" />
          </g>
        ) : arc.eyes === "visor" ? (
          /* Futuristic Neon Cyber Visor Sweep */
          <g>
            <polygon points="11,17 33,17 31,21 13,21" fill={arc.accentColor} opacity="0.85" />
            <line x1="11" y1="17" x2="33" y2="17" stroke="#ECEFF4" strokeWidth="0.9" />
          </g>
        ) : arc.eyes === "shades" ? (
          /* Pixel Cool 8-Bit Sunglasses */
          <g fill="#0A0A0C" stroke="#ECEFF4" strokeWidth="1.2">
            <polygon points="10,16 19,16 18,21 11,21" />
            <polygon points="25,16 34,16 33,21 26,21" />
            <line x1="19" y1="18" x2="25" y2="18" stroke="#ECEFF4" strokeWidth="1.2" />
          </g>
        ) : arc.eyes === "stars" ? (
          /* Star Astral ✦ ✦ Eyes */
          <g fill={arc.accentColor}>
            <text x="15" y="22" fontSize="8" fontWeight="bold" textAnchor="middle">✦</text>
            <text x="29" y="22" fontSize="8" fontWeight="bold" textAnchor="middle">✦</text>
          </g>
        ) : arc.eyes === "spiral" ? (
          /* Mad Visionary Hypnotic Eyes */
          <g stroke={arc.accentColor} strokeWidth="1.2" fill="none">
            <circle cx="16" cy="19" r="3" />
            <circle cx="16" cy="19" r="1.2" fill={arc.accentColor} />
            <circle cx="28" cy="19" r="3" />
            <circle cx="28" cy="19" r="1.2" fill={arc.accentColor} />
          </g>
        ) : arc.eyes === "warrior" ? (
          /* Fierce Warrior Eye + Battle Eyepatch */
          <g>
            {/* Left eyepatch */}
            <polygon points="12,16 18,16 16,21 13,21" fill="#0A0A0C" stroke="#EF4444" strokeWidth="1.2" />
            <line x1="9" y1="13" x2="21" y2="23" stroke="#EF4444" strokeWidth="0.9" />
            {/* Right fierce angled eye */}
            <path d="M 27 18 L 31 20" stroke="#ECEFF4" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ) : arc.eyes === "zen" ? (
          /* Serene Curved Lashes */
          <g stroke={primaryStroke} strokeWidth="1.5" strokeLinecap="round" fill="none">
            <path d="M 14 20 Q 16 17 18 20" />
            <path d="M 26 20 Q 28 17 30 20" />
          </g>
        ) : arc.eyes === "sleepy" ? (
          /* Half-Closed Droopy Eyes */
          <g stroke={primaryStroke} strokeWidth="1.5" strokeLinecap="round">
            <line x1="13" y1="20" x2="18" y2="20" />
            <line x1="26" y1="20" x2="31" y2="20" />
          </g>
        ) : arc.eyes === "laser" ? (
          /* Brutal Laser Slit Eyes */
          <g fill="#EF4444">
            <ellipse cx="16" cy="19" rx="3.5" ry="1.2" />
            <ellipse cx="28" cy="19" rx="3.5" ry="1.2" />
            <circle cx="16" cy="19" r="0.8" fill="#ECEFF4" />
            <circle cx="28" cy="19" r="0.8" fill="#ECEFF4" />
          </g>
        ) : arc.eyes === "goggles" ? (
          /* Aviator Goggles Resting Above Eyes */
          <g>
            <circle cx="16" cy="19" r="1.8" fill="#ECEFF4" />
            <circle cx="28" cy="19" r="1.8" fill="#ECEFF4" />
            {/* Goggles on forehead */}
            <circle cx="16" cy="13" r="3" stroke="#FB923C" strokeWidth="1" fill="#0A0A0C" />
            <circle cx="28" cy="13" r="3" stroke="#FB923C" strokeWidth="1" fill="#0A0A0C" />
            <line x1="19" y1="13" x2="25" y2="13" stroke="#FB923C" strokeWidth="1.2" />
          </g>
        ) : arc.eyes === "hype" ? (
          /* Wide High-Energy Eyes */
          <g fill="#FACC15">
            <circle cx="16" cy="19" r="2.2" />
            <circle cx="28" cy="19" r="2.2" />
            <circle cx="17" cy="18" r="0.8" fill="#0A0A0C" />
            <circle cx="29" cy="18" r="0.8" fill="#0A0A0C" />
          </g>
        ) : (
          /* Expressive Pixel Square / Dot Eyes */
          <g fill={primaryStroke}>
            <rect x="15" y="18" width="2.5" height="2.5" />
            <rect x="27" y="18" width="2.5" height="2.5" />
          </g>
        )}

        {/* --- MOUTH EXPRESSIONS --- */}
        {isSpeaking ? (
          /* Animated Speaking Mouth */
          <rect x="20" y="24" width="4" height="3" fill={primaryStroke} />
        ) : arc.mouth === "fang" ? (
          /* Little Cute Fang */
          <g stroke={primaryStroke} strokeWidth="1.2" fill="none">
            <path d="M 19 24 Q 22 26 25 24" />
            <path d="M 23 25 L 24 27 L 25 25" fill={primaryStroke} />
          </g>
        ) : arc.mouth === "smirk" ? (
          <path d="M 20 23 Q 23 27 26 23" stroke={primaryStroke} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        ) : arc.mouth === "open" ? (
          <circle cx="22" cy="25" r="1.8" fill={primaryStroke} />
        ) : arc.mouth === "cat-w" ? (
          /* Classic Cat :3 Mouth */
          <path d="M 18 24 Q 20 26 22 24 Q 24 26 26 24" stroke={primaryStroke} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        ) : (
          /* Disciplined Straight Line / Subtle Curve */
          <line x1="20" y1="24" x2="24" y2="24" stroke={primaryStroke} strokeWidth="1.3" strokeLinecap="round" />
        )}

        {/* --- CRISP RETRO WHISKERS --- */}
        <line x1="8" y1="20" x2="12" y2="20" stroke={primaryStroke} strokeWidth="0.9" opacity="0.8" />
        <line x1="8" y1="23" x2="12" y2="22" stroke={primaryStroke} strokeWidth="0.9" opacity="0.8" />
        <line x1="32" y1="20" x2="36" y2="20" stroke={primaryStroke} strokeWidth="0.9" opacity="0.8" />
        <line x1="32" y1="22" x2="36" y2="23" stroke={primaryStroke} strokeWidth="0.9" opacity="0.8" />
      </svg>

      {/* Live Radar Typing Indicator Dot */}
      {isTyping && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#FF6E26]" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6E26]" />
        </span>
      )}
    </div>
  );
}

// Named alias so both BitCatAvatar and BlobAvatar work across the app
export const BitCatAvatar = BlobAvatar;
