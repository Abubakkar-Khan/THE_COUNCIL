"use client";

import { cn } from "@/lib/utils";

interface BlobAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  isTyping?: boolean;
  className?: string;
  showBadge?: boolean;
}

export function BlobAvatar({
  name,
  size = "md",
  isSpeaking = false,
  isTyping = false,
  className,
  showBadge = false,
}: BlobAvatarProps) {
  // Determine size classes
  const dimensions = {
    sm: "w-7 h-6",
    md: "w-9 h-8",
    lg: "w-12 h-10",
    xl: "w-16 h-14",
  }[size];

  // Specific facial expressions based on persona archetype
  const getFeatures = (n: string) => {
    switch (n) {
      case "Father of Initiative":
        return {
          eyes: "founder",
          accessory: "crown",
          color: "#FF6E26",
        };
      case "Vector":
        return {
          eyes: "focused",
          accessory: "monocle",
          color: "#06B6D4",
        };
      case "Daddy BKR":
        return {
          eyes: "smirk",
          accessory: "blush",
          color: "#FF6E26",
        };
      case "Muhammad Abubakar":
        return {
          eyes: "peaceful",
          accessory: "halo",
          color: "#10B981",
        };
      case "The Anomaly":
      case "Creative Me":
        return {
          eyes: "stars",
          accessory: "spark",
          color: "#C084FC",
        };
      case "EGO":
      case "Risk-Taking Me":
        return {
          eyes: "warrior",
          accessory: "bandana",
          color: "#EF4444",
        };
      case "Nerd 1337":
        return {
          eyes: "glasses",
          accessory: "none",
          color: "#A3E635",
        };
      case "صاحبِ سوال":
        return {
          eyes: "poet",
          accessory: "beret",
          color: "#FB7185",
        };
      case "Abubakar Khan":
        return {
          eyes: "hype",
          accessory: "headband",
          color: "#FACC15",
        };
      case "Lazy Me":
        return {
          eyes: "sleepy",
          accessory: "zzz",
          color: "#8B949E",
        };
      default:
        return {
          eyes: "default",
          accessory: "none",
          color: "#FF6E26",
        };
    }
  };

  const feature = getFeatures(name);
  const strokeColor = isSpeaking ? "#FF6E26" : "#ECEFF4";
  const eyeColor = isSpeaking ? "#FF6E26" : "#ECEFF4";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
        isSpeaking && "scale-105",
        dimensions,
        className
      )}
      title={name}
    >
      <svg
        viewBox="0 0 44 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Crown accessory for Founder */}
        {feature.accessory === "crown" && (
          <path
            d="M 16 7 L 18 2 L 22 5 L 26 2 L 28 7 Z"
            fill="#FF6E26"
            stroke="#ECEFF4"
            strokeWidth="1.2"
          />
        )}

        {/* Headband for Jock */}
        {feature.accessory === "headband" && (
          <path
            d="M 6 15 Q 22 17 38 15"
            stroke="#FF6E26"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* Cat / Blob Body Silhouette */}
        <path
          d="M 6 22 
             C 6 14, 8 10, 11 8 
             C 12 7, 13 8, 14 11 
             C 18 10, 26 10, 30 11 
             C 31 8, 32 7, 33 8 
             C 36 10, 38 14, 38 22 
             C 38 31, 33 34, 22 34 
             C 11 34, 6 31, 6 22 Z"
          fill="#0E1013"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Inner ears */}
        <path
          d="M 10 11 L 13 13"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M 34 11 L 31 13"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Glasses for Nerd 1337 */}
        {feature.eyes === "glasses" ? (
          <g stroke="#ECEFF4" strokeWidth="1.2">
            <rect x="13" y="17" width="6" height="5" rx="1" fill="#0E1013" />
            <rect x="25" y="17" width="6" height="5" rx="1" fill="#0E1013" />
            <line x1="19" y1="19" x2="25" y2="19" strokeWidth="1.2" />
          </g>
        ) : feature.eyes === "stars" ? (
          /* Star eyes for Creative / The Anomaly */
          <g fill={eyeColor}>
            <text x="14" y="22" fontSize="7" fontWeight="bold" textAnchor="middle">✦</text>
            <text x="30" y="22" fontSize="7" fontWeight="bold" textAnchor="middle">✦</text>
          </g>
        ) : feature.eyes === "peaceful" || feature.eyes === "sleepy" ? (
          /* Serene closed curved eyes */
          <g stroke={eyeColor} strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M 14 20 Q 16 18 18 20" />
            <path d="M 26 20 Q 28 18 30 20" />
          </g>
        ) : feature.eyes === "warrior" ? (
          /* Determined angled eyes */
          <g stroke={eyeColor} strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M 14 19 L 18 21" />
            <path d="M 30 19 L 26 21" />
          </g>
        ) : (
          /* Expressive Dot Eyes */
          <g fill={eyeColor}>
            <circle cx="16" cy="20" r="1.8" />
            <circle cx="28" cy="20" r="1.8" />
          </g>
        )}

        {/* Cute Mouth */}
        {isSpeaking ? (
          <ellipse cx="22" cy="25" rx="2" ry="2.2" fill={eyeColor} />
        ) : feature.eyes === "smirk" ? (
          <path
            d="M 20 24 Q 23 27 26 23"
            stroke={strokeColor}
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M 19 24 Q 22 26 25 24"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Whiskers */}
        <line x1="9" y1="21" x2="13" y2="21" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="9" y1="24" x2="13" y2="23" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="31" y1="21" x2="35" y2="21" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
        <line x1="31" y1="23" x2="35" y2="24" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
      </svg>

      {/* Live typing pulse dot */}
      {isTyping && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#FF6E26]" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6E26]" />
        </span>
      )}
    </div>
  );
}
