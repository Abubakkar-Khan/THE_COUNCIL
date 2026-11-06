"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Sparkles, Cpu } from "lucide-react";
import type { Persona, PersonaFormData } from "@/types";

interface PersonaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persona?: Persona | null;
  onSubmit: (data: PersonaFormData) => Promise<void>;
}

const defaultFormData: PersonaFormData = {
  name: "",
  description: "",
  personality: "",
  perspective: "",
  beliefs: "",
  strengths: "",
  blindSpots: "",
  communicationStyle: "",
  debateStyle: "",
  customInstructions: "",
};

const fields: { key: keyof PersonaFormData; label: string; placeholder: string; multiline?: boolean }[] = [
  { key: "name", label: "NAME // IDENTITY", placeholder: "e.g., Ultra-Pragmatic Me" },
  { key: "description", label: "DESCRIPTION // LORE", placeholder: "Short summary of this persona's purpose" },
  { key: "personality", label: "PERSONALITY TRAITS", placeholder: "e.g., hyper-focused, skeptical, numerical" },
  { key: "perspective", label: "ANALYSIS ANGLE", placeholder: "How this persona approaches dilemmas and decisions" },
  { key: "beliefs", label: "CORE AXIOMS", placeholder: "Guiding non-negotiable principles" },
  { key: "strengths", label: "KEY STRENGTHS", placeholder: "What this mind sees before anyone else" },
  { key: "blindSpots", label: "VULNERABILITIES & BIASES", placeholder: "Common pitfalls or blind spots to challenge" },
  { key: "communicationStyle", label: "COMMUNICATION TONE", placeholder: "Fast, punchy, sarcastic, academic, etc." },
  { key: "debateStyle", label: "ARGUMENTATION STRATEGY", placeholder: "How this persona attacks opposing claims" },
  { key: "customInstructions", label: "HARDWARE DIRECTIVES (OPTIONAL)", placeholder: "Additional behavioral constraints", multiline: true },
];

export function PersonaForm({ open, onOpenChange, persona, onSubmit }: PersonaFormProps) {
  const [formData, setFormData] = useState<PersonaFormData>(
    persona
      ? {
          name: persona.name,
          description: persona.description,
          personality: persona.personality,
          perspective: persona.perspective,
          beliefs: persona.beliefs,
          strengths: persona.strengths,
          blindSpots: persona.blindSpots,
          communicationStyle: persona.communicationStyle,
          debateStyle: persona.debateStyle,
          customInstructions: persona.customInstructions,
        }
      : defaultFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
      setFormData(defaultFormData);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] bg-[#FF6E26] text-[#0A0A0C] font-bold px-1.5 py-0.2">
            [CHIP_FORGE]
          </span>
          <span className="font-mono-code text-[10px] text-[#525A66]">
            // COGNITIVE_SYNTHESIS
          </span>
        </div>
        <DialogTitle className="font-mono text-base text-[#ECEFF4] font-bold">
          {persona ? "[ RECALIBRATE PERSONA ]" : "[ FORGE NEW PERSONA ]"}
        </DialogTitle>
        <DialogDescription className="font-mono-code text-xs text-[#8B949E]">
          {persona
            ? "Update behavioral parameters and debate biases."
            : "Program a distinct cognitive persona into the council memory."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="font-mono-code select-none">
        <DialogContent>
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="text-[9px] font-mono text-[#8B949E] mb-1 block uppercase tracking-wider">
                  {field.label}
                </label>
                {field.multiline ? (
                  <Textarea
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    rows={2}
                    className="bg-[#0A0A0C] border-[#1E2228] focus:border-[#FF6E26] text-xs font-mono-code resize-none"
                  />
                ) : (
                  <Input
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="bg-[#0A0A0C] border-[#1E2228] focus:border-[#FF6E26] text-xs font-mono-code h-8"
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-xs text-[#F43F5E] bg-[#F43F5E]/10 border border-[#F43F5E]/30 p-2 mt-2 font-mono text-[9px]">
              [!] {error}
            </p>
          )}
        </DialogContent>

        <DialogFooter className="mt-4 pt-3 border-t border-[#1E2228]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 text-xs font-mono border border-[#1E2228] text-[#8B949E] hover:text-[#ECEFF4] cursor-pointer"
          >
            [ESC] CANCEL
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-terminal-accent px-4 py-1.5 text-xs font-mono font-bold border border-[#FF853E] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
            <span>{persona ? "[UPDATE CHIP]" : "[FORGE CHIP]"}</span>
          </button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
