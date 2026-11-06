"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, ArrowRight, ArrowLeft, Sparkles, Check, Flame, Brain, Shield, User } from "lucide-react";
import { AvatarDressCustomizer } from "./avatar-dress-customizer";
import { BlobAvatar } from "@/components/council/blob-avatar";
import {
  getPersonaDress,
  embedDressInInstructions,
  inferCatAesthetics,
  type BitCatDress,
} from "@/lib/personas/aesthetics";
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

// Quick inspiration presets to get users creating in 1-click
const PRESETS = [
  {
    title: "The Ruthless Founder",
    name: "CFO Me",
    vibe: "Obsessed with cash runway, unit economics, zero vanity metrics. Hates busywork.",
    worldview: "Numbers never lie. If it doesn't print cash or cut costs, it's a hallucination.",
    argue: "Brutal teardowns of costs, demands ROI proof on every line item.",
    traits: "pragmatic, ruthless, analytical, cost-obsessed",
  },
  {
    title: "The Chaos Creative",
    name: "Wild Visionary",
    vibe: "Unapologetic artistic rebel who thinks normal ideas are a waste of human consciousness.",
    worldview: "Safe is dangerous. If it doesn't make people gasp or get furious, it's already dead.",
    argue: "Attacks boring consensus with radical pivots and bold aesthetic leaps.",
    traits: "theatrical, chaotic, boundary-breaking, highly imaginative",
  },
  {
    title: "The Cypherpunk Hacker",
    name: "1337 Ghost",
    vibe: "Low-level system hacker living in the terminal. Distrusts bloated tech and hype.",
    worldview: "Complexity is an attack surface. Keep it lean, open, self-hosted, and unbreakable.",
    argue: "Points out technical debt, architecture bugs, and naive scalability assumptions.",
    traits: "skeptical, technical, minimalist, cypherpunk",
  },
];

export function PersonaForm({ open, onOpenChange, persona, onSubmit }: PersonaFormProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<PersonaFormData>(defaultFormData);
  const [dress, setDress] = useState<BitCatDress>(() => getPersonaDress(defaultFormData));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state whenever modal opens or active persona changes
  useEffect(() => {
    if (open) {
      if (persona) {
        setFormData({
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
        });
        setDress(getPersonaDress(persona));
        setStep(1);
      } else {
        setFormData(defaultFormData);
        setDress(getPersonaDress(defaultFormData));
        setStep(1);
      }
      setError(null);
    }
  }, [open, persona]);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    const updated = {
      ...formData,
      name: preset.name,
      description: preset.vibe,
      personality: preset.traits,
      perspective: preset.worldview,
      beliefs: preset.worldview,
      strengths: `Instantly spots leverage, cuts through ${preset.traits.split(',')[0]} fluff`,
      blindSpots: "Can be stubborn or dismissive of opposing values",
      communicationStyle: "Punchy, confident, zero corporate filter",
      debateStyle: preset.argue,
    };
    setFormData(updated);
    setDress(inferCatAesthetics(updated));
  };

  const handleNext = () => {
    setError(null);
    if (step === 1 && !formData.name.trim()) {
      setError("Give your mind an identity or codename.");
      return;
    }
    if (step === 2 && !formData.description.trim()) {
      setError("Tell us their vibe or what makes them tick.");
      return;
    }
    if (step === 2) {
      // Auto-infer personality if blank
      if (!formData.personality) {
        setFormData((prev) => ({
          ...prev,
          personality: prev.description.slice(0, 50),
          strengths: "Decisive intuition and direct focus",
          blindSpots: "Overconfidence in initial assumptions",
        }));
      }
      // Auto-dress character based on description
      setDress(inferCatAesthetics({ ...formData }));
    }
    setStep((prev) => Math.min(4, prev + 1) as any);
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1) as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      // Fill smart defaults for any un-entered subfields
      const fullData: PersonaFormData = {
        ...formData,
        perspective: formData.perspective.trim() || formData.description,
        beliefs: formData.beliefs.trim() || formData.perspective.trim() || formData.description,
        personality: formData.personality.trim() || "sharp, direct, opinionated",
        strengths: formData.strengths.trim() || "Ruthless clarity and strong conviction",
        blindSpots: formData.blindSpots.trim() || "Stubbornness when challenged directly",
        communicationStyle: formData.communicationStyle.trim() || "Short, punchy, unvarnished",
        debateStyle: formData.debateStyle.trim() || "Attacks flawed assumptions directly",
      };

      const updatedInstructions = embedDressInInstructions(
        dress,
        fullData.customInstructions
      );

      await onSubmit({
        ...fullData,
        customInstructions: updatedInstructions,
      });

      setFormData(defaultFormData);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to forge persona");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClick={() => onOpenChange(false)} />
      <DialogHeader>
        <div className="flex items-center justify-between border-b border-[#1E2228] pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] bg-[#FF6E26] text-[#0A0A0C] font-bold px-1.5 py-0.2">
              [CHIP_FORGE]
            </span>
            <span className="font-mono text-[10px] text-[#525A66]">
              STEP 0{step} / 04
            </span>
          </div>
          {/* Step Pip indicators */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-5 transition-all ${
                  s === step
                    ? "bg-[#FF6E26]"
                    : s < step
                    ? "bg-[#ECEFF4]/60"
                    : "bg-[#1E2228]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="font-mono text-base text-[#ECEFF4] font-bold">
              {step === 1 && "[ STEP 1: IDENTITY // NAME YOUR ALTER-EGO ]"}
              {step === 2 && "[ STEP 2: LORE // WHAT IS THEIR DEAL? ]"}
              {step === 3 && "[ STEP 3: MENTAL MODEL // HOW THEY ARGUE ]"}
              {step === 4 && "[ STEP 4: BIT-CAT DRIP // OUTFIT THE PIXELS ]"}
            </DialogTitle>
            <DialogDescription className="font-mono-code text-xs text-[#8B949E] mt-0.5">
              {step === 1 && "Every distinct mind in your council starts with a clear moniker."}
              {step === 2 && "Introduce them like a character in a movie. Raw, fun, unapologetic."}
              {step === 3 && "When an argument heats up, how does this mind break the tension?"}
              {step === 4 && "Choose their 8-bit battle gear or hit Auto-Equip to match lore."}
            </DialogDescription>
          </div>

          {/* Mini Avatar Live Preview in Header */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 border border-[#1E2228] bg-[#0A0A0C]">
            <BlobAvatar dress={dress} name={formData.name || "Agent"} size="sm" />
            <span className="text-[10px] font-mono text-[#FF6E26] font-bold max-w-[80px] truncate">
              {formData.name || "UNNAMED"}
            </span>
          </div>
        </div>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="font-mono-code select-none mt-2">
        <DialogContent>
          <div className="min-h-[280px] max-h-[58vh] overflow-y-auto pr-1">

            {/* ── STEP 1: Name & Presets ─────────────────────────── */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-[#FF6E26] font-bold mb-1.5 flex items-center gap-1.5 uppercase">
                    <User className="h-3 w-3" />
                    Give this mind a punchy name:
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Risk-Taking Me, The Pessimist, Abubakar 1337, Vector"
                    className="w-full bg-[#0A0A0C] border border-[#2A303A] focus:border-[#FF6E26] text-sm text-[#ECEFF4] px-3 py-2 font-mono outline-none"
                  />
                  <p className="text-[10px] text-[#525A66] mt-1 font-mono">
                    Pro-tip: Create an alter-ego of yourself (e.g. "Ruthless Me", "Creative Abubakar") or a famous archetype.
                  </p>
                </div>

                {/* Instant Presets */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#8B949E] font-mono mb-2">
                    <Sparkles className="h-3 w-3 text-[#FF6E26]" />
                    <span>OR GRAB A QUICK TEMPLATE:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="text-left p-2.5 border border-[#1E2228] bg-[#0E1013] hover:border-[#FF6E26] hover:bg-[#14171C] transition-all cursor-pointer group"
                      >
                        <span className="text-[10px] text-[#FF6E26] font-bold block mb-0.5 group-hover:underline">
                          [ {p.title} ]
                        </span>
                        <span className="text-[9px] text-[#8B949E] line-clamp-2 block leading-relaxed">
                          {p.vibe}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Lore & Vibe ────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-[#FF6E26] font-bold mb-1.5 flex items-center gap-1.5 uppercase">
                    <Flame className="h-3 w-3" />
                    What is their vibe, obsession, or core trait?
                  </label>
                  <textarea
                    autoFocus
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="e.g. Founder mode. Fast talker. Despises overplanning and wants to ship an MVP before bedtime. Uses humor to deflate overthinking."
                    className="w-full bg-[#0A0A0C] border border-[#2A303A] focus:border-[#FF6E26] text-xs text-[#ECEFF4] p-3 font-mono outline-none resize-none leading-relaxed"
                  />
                  <p className="text-[10px] text-[#525A66] mt-1 font-mono">
                    This lore automatically outfits their 8-bit pixel cat and dictates their tone during council clashes.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8B949E] mb-1 block uppercase">
                    Key personality tags (comma separated, optional):
                  </label>
                  <input
                    type="text"
                    value={formData.personality}
                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                    placeholder="e.g. sarcastic, hyper-analytical, fast-paced, impatient"
                    className="w-full bg-[#0A0A0C] border border-[#1E2228] focus:border-[#FF6E26] text-xs text-[#ECEFF4] px-3 py-1.5 font-mono outline-none"
                  />
                </div>
              </div>
            )}

            {/* ── STEP 3: Mental Model & Argument Style ─────────── */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-[#FF6E26] font-bold mb-1.5 flex items-center gap-1.5 uppercase">
                    <Brain className="h-3 w-3" />
                    Their guiding world-view / filter:
                  </label>
                  <textarea
                    autoFocus
                    value={formData.perspective}
                    onChange={(e) => setFormData({ ...formData, perspective: e.target.value })}
                    rows={2}
                    placeholder="e.g. Life is short, compound interest rules everything, momentum is more important than perfection."
                    className="w-full bg-[#0A0A0C] border border-[#2A303A] focus:border-[#FF6E26] text-xs text-[#ECEFF4] p-2.5 font-mono outline-none resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8B949E] mb-1.5 flex items-center gap-1.5 uppercase">
                    <Shield className="h-3 w-3" />
                    How they attack opposing claims in the group chat:
                  </label>
                  <input
                    type="text"
                    value={formData.debateStyle}
                    onChange={(e) => setFormData({ ...formData, debateStyle: e.target.value })}
                    placeholder="e.g. Calls out wishful thinking directly with realistic numbers."
                    className="w-full bg-[#0A0A0C] border border-[#1E2228] focus:border-[#FF6E26] text-xs text-[#ECEFF4] px-3 py-1.5 font-mono outline-none"
                  />
                </div>

                <div className="p-2.5 border border-[#1E2228] bg-[#0E1013] text-[10px] text-[#525A66] font-mono">
                  💡 <span className="text-[#8B949E]">System Note:</span> Weaknesses, blindspots, and cognitive constraints are automatically generated based on their personality archetype.
                </div>
              </div>
            )}

            {/* ── STEP 4: Modular Bit Cat Dress-Up ──────────────── */}
            {step === 4 && (
              <div className="space-y-3">
                <AvatarDressCustomizer
                  currentDress={dress}
                  personaData={formData}
                  onChange={setDress}
                />
              </div>
            )}

            {error && (
              <div className="p-2 border border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-mono mt-3">
                [!] {error}
              </div>
            )}
          </div>
        </DialogContent>

        <DialogFooter className="mt-4 pt-3 border-t border-[#1E2228] flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-3 py-1.5 text-xs font-mono border border-[#2A303A] text-[#8B949E] hover:text-[#ECEFF4] hover:border-[#FF6E26] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>[BACK]</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-3 py-1.5 text-xs font-mono border border-[#1E2228] text-[#525A66] hover:text-[#ECEFF4] cursor-pointer"
              >
                [CANCEL]
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-terminal-accent px-4 py-1.5 text-xs font-mono font-bold border border-[#FF853E] flex items-center gap-1.5 cursor-pointer"
              >
                <span>NEXT: {step === 1 ? "LORE" : step === 2 ? "LOGIC" : "DRIP"}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-terminal-accent px-5 py-1.5 text-xs font-mono font-bold border border-[#FF853E] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>FORGING CHIP...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{persona ? "[UPDATE CHIP]" : "[FORGE MIND]"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
