"use client";

import { useState } from "react";
import { BlobAvatar } from "@/components/council/blob-avatar";
import {
  type BitCatDress,
  type EarType,
  type EyeType,
  type AccessoryType,
  type AccentColor,
  AVAILABLE_EARS,
  AVAILABLE_EYES,
  AVAILABLE_ACCESSORIES,
  AVAILABLE_COLORS,
  inferCatAesthetics,
} from "@/lib/personas/aesthetics";
import { Sparkles, RefreshCw } from "lucide-react";

interface AvatarDressCustomizerProps {
  currentDress: BitCatDress;
  personaData: {
    name?: string;
    description?: string;
    personality?: string;
    perspective?: string;
    beliefs?: string;
  };
  onChange: (dress: BitCatDress) => void;
}

export function AvatarDressCustomizer({
  currentDress,
  personaData,
  onChange,
}: AvatarDressCustomizerProps) {
  const [activeTab, setActiveTab] = useState<"ears" | "eyes" | "accessory" | "color">("accessory");
  const [autoDressedNotice, setAutoDressedNotice] = useState(false);

  const handleAutoDress = () => {
    const auto = inferCatAesthetics(personaData);
    onChange(auto);
    setAutoDressedNotice(true);
    setTimeout(() => setAutoDressedNotice(false), 2000);
  };

  return (
    <div className="border border-[#1E2228] bg-[#0A0A0C] p-3.5 space-y-3 font-mono text-xs select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1E2228] pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#FF6E26] font-bold">
            // MODULAR_DRESS_CLOSET
          </span>
          <span className="text-[9px] text-[#525A66]">[PIXEL_SPRITE]</span>
        </div>

        <button
          type="button"
          onClick={handleAutoDress}
          className="flex items-center gap-1.5 px-2 py-0.5 border border-[#FF6E26]/40 bg-[#FF6E26]/10 text-[#FF6E26] hover:bg-[#FF6E26] hover:text-[#0A0A0C] transition-all text-[10px] font-bold cursor-pointer"
          title="Auto-analyze persona description and equip matching gear"
        >
          <Sparkles className="h-3 w-3" />
          <span>{autoDressedNotice ? "EQUIPPED!" : "[⚡ AUTO_FROM_LORE]"}</span>
        </button>
      </div>

      {/* Main Preview + Live Attributes */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3 border border-[#1E2228] bg-[#0E1013]">
        {/* Large 8-Bit Pixel Cat Live Preview */}
        <div className="flex flex-col items-center justify-center p-3 border border-[#1E2228] bg-[#0A0A0C] min-w-[110px] min-h-[95px] relative">
          <BlobAvatar
            dress={currentDress}
            size="xl"
            isSpeaking={true}
            className="drop-shadow-lg"
          />
          <span className="text-[9px] text-[#525A66] mt-2">
            PREVIEW_8BIT
          </span>
        </div>

        {/* Current Equipped Stats */}
        <div className="flex-1 w-full space-y-1 text-[10px]">
          <div className="flex items-center justify-between border-b border-[#1E2228] pb-1">
            <span className="text-[#525A66]">EARS:</span>
            <span className="text-[#ECEFF4] font-semibold">{currentDress.ears.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2228] pb-1">
            <span className="text-[#525A66]">EYES:</span>
            <span className="text-[#ECEFF4] font-semibold">{currentDress.eyes.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2228] pb-1">
            <span className="text-[#525A66]">ACCESSORY:</span>
            <span className="text-[#ECEFF4] font-semibold">{currentDress.accessory.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#525A66]">ACCENT_PALETTE:</span>
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: currentDress.accentColor }}>
              <span className="h-2 w-2" style={{ backgroundColor: currentDress.accentColor }} />
              {currentDress.accentColor}
            </span>
          </div>
        </div>
      </div>

      {/* Customizer Category Tabs */}
      <div className="flex items-center gap-1 border-b border-[#1E2228] pb-1 text-[10px]">
        {(["accessory", "eyes", "ears", "color"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 font-bold border transition-all cursor-pointer ${
              activeTab === tab
                ? "border-[#FF6E26] bg-[#FF6E26]/10 text-[#FF6E26]"
                : "border-transparent text-[#8B949E] hover:text-[#ECEFF4] hover:bg-[#14171C]"
            }`}
          >
            [{tab.toUpperCase()}]
          </button>
        ))}
      </div>

      {/* Selector Options */}
      <div className="max-h-[140px] overflow-y-auto pr-1">
        {/* Accessories Selector */}
        {activeTab === "accessory" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {AVAILABLE_ACCESSORIES.map((item) => {
              const isSelected = currentDress.accessory === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ ...currentDress, accessory: item.id })}
                  className={`p-1.5 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#FF6E26] bg-[#14171C] text-[#ECEFF4]"
                      : "border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:border-[#2A303A]"
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">
                    {isSelected ? "> " : ""}{item.label}
                  </div>
                  <div className="text-[8px] text-[#525A66] truncate">{item.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Eyes Selector */}
        {activeTab === "eyes" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {AVAILABLE_EYES.map((item) => {
              const isSelected = currentDress.eyes === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ ...currentDress, eyes: item.id })}
                  className={`p-1.5 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#FF6E26] bg-[#14171C] text-[#ECEFF4]"
                      : "border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:border-[#2A303A]"
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">
                    {isSelected ? "> " : ""}{item.label}
                  </div>
                  <div className="text-[8px] text-[#525A66] truncate">{item.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Ears Selector */}
        {activeTab === "ears" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {AVAILABLE_EARS.map((item) => {
              const isSelected = currentDress.ears === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ ...currentDress, ears: item.id })}
                  className={`p-1.5 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#FF6E26] bg-[#14171C] text-[#ECEFF4]"
                      : "border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:border-[#2A303A]"
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">
                    {isSelected ? "> " : ""}{item.label}
                  </div>
                  <div className="text-[8px] text-[#525A66] truncate">{item.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Color Palette Selector */}
        {activeTab === "color" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {AVAILABLE_COLORS.map((item) => {
              const isSelected = currentDress.accentColor === item.color;
              return (
                <button
                  key={item.color}
                  type="button"
                  onClick={() => onChange({ ...currentDress, accentColor: item.color })}
                  className={`p-1.5 border flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#FF6E26] bg-[#14171C] text-[#ECEFF4]"
                      : "border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:border-[#2A303A]"
                  }`}
                >
                  <span className="h-3 w-3 flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] truncate">{item.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
