"use client";

import { motion } from "motion/react";
import { BlobAvatar } from "@/components/council/blob-avatar";
import { Copy, Edit2, Trash2 } from "lucide-react";
import type { Persona } from "@/types";

interface PersonaCardProps {
  persona: Persona;
  onEdit: (persona: Persona) => void;
  onDuplicate: (persona: Persona) => void;
  onDelete: (id: string) => void;
}

export function PersonaCard({ persona, onEdit, onDuplicate, onDelete }: PersonaCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="p-4 rounded-md border border-dashed border-[#1E2228] bg-[#0E1013] hover:border-[#FF6E26]/60 transition-all flex flex-col justify-between group select-none font-mono-code"
    >
      <div>
        {/* Top: Avatar + Action Buttons */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <BlobAvatar name={persona.name} size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-xs text-[#ECEFF4] group-hover:text-[#FF6E26] transition-colors">
                  {persona.name}
                </h3>
              </div>
              <span className="text-[10px] text-[#525A66] uppercase tracking-wide">
                {persona.personality?.split(",")[0]?.trim() || "AGENT"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(persona)}
              title="Edit Profile"
              className="p-1 rounded-sm text-[#8B949E] hover:text-[#ECEFF4] hover:bg-[#161A20] transition-colors cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
            </button>
            <button
              onClick={() => onDuplicate(persona)}
              title="Clone Character"
              className="p-1 rounded-sm text-[#8B949E] hover:text-[#ECEFF4] hover:bg-[#161A20] transition-colors cursor-pointer"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              onClick={() => onDelete(persona.id)}
              title="Delete"
              className="p-1 rounded-sm text-[#8B949E] hover:text-[#EF4444] hover:bg-[#161A20] transition-colors cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Description / Mindset */}
        <p className="text-[11px] text-[#8B949E] line-clamp-2 leading-relaxed mb-3">
          {persona.description}
        </p>

        {/* Traits & Strategy */}
        <div className="p-2.5 rounded-sm border border-dashed border-[#1E2228] bg-[#0A0A0C] space-y-1 text-[10px] text-[#8B949E]">
          <div className="flex items-center justify-between">
            <span className="text-[#525A66]">PERSPECTIVE:</span>
            <span className="text-[#ECEFF4] truncate max-w-[150px] text-right font-medium">
              {persona.perspective?.slice(0, 32)}...
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#525A66]">STYLE:</span>
            <span className="text-[#FF6E26] truncate max-w-[150px] text-right">
              {persona.debateStyle?.split(",")[0] || "Direct"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="pt-3 mt-3 border-t border-dashed border-[#1E2228] flex items-center justify-between text-[10px] text-[#525A66]">
        <span>ID: #{persona.id.slice(-6).toUpperCase()}</span>
        <span className="text-[#8B949E] flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6E26]" />
          ACTIVE
        </span>
      </div>
    </motion.div>
  );
}
