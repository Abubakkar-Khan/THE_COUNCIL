"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlobAvatar } from "./blob-avatar";
import { Swords, Check, Loader2, Users } from "lucide-react";
import type { Persona } from "@/types";

export function DebateSetup() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [totalRounds, setTotalRounds] = useState(2);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/personas");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPersonas(data);
          // By default select 3-4 contrasting personas
          const enabled = data.filter((p: Persona) => p.isEnabled).slice(0, 4);
          setSelectedIds(enabled.map((p: Persona) => p.id));
        }
      } catch (err) {
        console.error("Failed to load personas:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const togglePersona = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(personas.map((p) => p.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const handleStartDebate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please drop a dilemma or hypothesis into the input buffer.");
      return;
    }
    if (selectedIds.length < 2) {
      setError("At least 2 council minds must be selected for a clash.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/debates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          personaIds: selectedIds,
          totalRounds,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to initialize council chamber");
      }

      const { debateId } = await res.json();
      router.push(`/debates/${debateId}`);
    } catch (err: any) {
      setError(err.message || "Failed to launch debate");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center select-none font-mono-code">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6E26] mx-auto mb-3" />
        <p className="text-xs text-[#ECEFF4] font-mono">
          Assembling council agents...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleStartDebate} className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 select-none font-mono-code">
      {/* Session Header */}
      <div className="border-b border-dashed border-[#1E2228] pb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-dashed border-[#1E2228] bg-[#0E1013] text-[#FF6E26]">
            CHAMBER · DISPATCH
          </span>
          <span className="text-[10px] text-[#525A66]">// NEW CLASH</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold font-display text-[#ECEFF4] tracking-tight">
          What is keeping you up at night?
        </h1>
        <p className="text-xs text-[#8B949E] mt-0.5">
          Formulate your dilemma, assemble your agent squad, and watch them debate in real time.
        </p>
      </div>

      {/* Step 1: Dilemma Input Buffer */}
      <div className="p-5 rounded-md border border-dashed border-[#1E2228] bg-[#0E1013] space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#FF6E26] font-medium">
            STEP 01 // THE QUESTION OR DILEMMA
          </span>
          <span className="text-[#525A66]">{question.length}/1000</span>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Should I build this project this weekend or focus on studying for my exams?"
          rows={3}
          className="w-full bg-[#0A0A0C] border border-[#1E2228] focus:border-[#FF6E26] focus:outline-none p-3 text-xs md:text-sm text-[#ECEFF4] placeholder:text-[#525A66] rounded-sm font-mono-code resize-none transition-colors"
        />

        <p className="text-[11px] text-[#525A66]">
          // Be specific. Give context, stakes, and constraints.
        </p>
      </div>

      {/* Step 2: Character Select Grid */}
      <div className="p-5 rounded-md border border-dashed border-[#1E2228] bg-[#0E1013] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-[#1E2228] pb-3">
          <div>
            <span className="text-[11px] text-[#ECEFF4] font-medium block">
              STEP 02 // CHOOSE WHO ENTERS THE ROOM ({selectedIds.length}/{personas.length} SELECTED)
            </span>
            <p className="text-[11px] text-[#8B949E] mt-0.5">
              Select contrasting minds to debate and challenge assumptions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="px-2.5 py-1 text-[11px] rounded-sm border border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:text-[#ECEFF4] cursor-pointer"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="px-2.5 py-1 text-[11px] rounded-sm border border-[#1E2228] bg-[#0A0A0C] text-[#8B949E] hover:text-[#ECEFF4] cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {personas.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#1E2228] bg-[#0A0A0C] rounded-sm">
            <Users className="h-6 w-6 text-[#525A66] mx-auto mb-2" />
            <p className="text-xs text-[#8B949E]">No agents found in roster.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {personas.map((persona) => {
              const isSelected = selectedIds.includes(persona.id);
              return (
                <div
                  key={persona.id}
                  onClick={() => togglePersona(persona.id)}
                  className={`p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#14171C] border-[#FF6E26] shadow-[0_0_10px_rgba(255,110,38,0.12)]"
                      : "bg-[#0A0A0C] border-[#1E2228] hover:border-[#2D333B]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <BlobAvatar name={persona.name} size="sm" isSpeaking={isSelected} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#ECEFF4] truncate">
                        {persona.name}
                      </p>
                      <p className="text-[10px] text-[#8B949E] truncate">
                        {persona.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-4 w-4 rounded-xs border flex items-center justify-center flex-shrink-0 transition-all text-[10px] ${
                      isSelected
                        ? "bg-[#FF6E26] border-[#FF6E26] text-[#0A0A0C] font-bold"
                        : "border-[#2A303A] bg-[#0E1013] text-transparent"
                    }`}
                  >
                    ✓
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Step 3: Deliberation Depth */}
      <div className="p-5 rounded-md border border-dashed border-[#1E2228] bg-[#0E1013] space-y-3">
        <span className="text-[11px] text-[#ECEFF4] font-medium block">
          STEP 03 // DELIBERATION DEPTH
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              rounds: 1,
              title: "1 Round · Blitz",
              desc: "Quick opening positions directly from each agent.",
            },
            {
              rounds: 2,
              title: "2 Rounds · Debate",
              desc: "Opening statements followed by crossfire and direct tagging.",
              recommended: true,
            },
            {
              rounds: 3,
              title: "3 Rounds · Gauntlet",
              desc: "Opening + heated rebuttals + final stands before the Judge.",
            },
          ].map((item) => {
            const isSelected = totalRounds === item.rounds;
            return (
              <div
                key={item.rounds}
                onClick={() => setTotalRounds(item.rounds)}
                className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#14171C] border-[#FF6E26] text-[#ECEFF4] shadow-[0_0_8px_rgba(255,110,38,0.12)]"
                    : "bg-[#0A0A0C] border-[#1E2228] hover:border-[#2D333B] text-[#8B949E]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#ECEFF4]">
                    {item.title}
                  </span>
                  {item.recommended && (
                    <span className="text-[8px] px-1 py-0.2 rounded-xs bg-[#FF6E26]/10 text-[#FF6E26] border border-[#FF6E26]/30">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#8B949E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/30 border border-red-800 text-red-300 rounded-sm text-xs">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-sm border border-[#1E2228] text-xs text-[#8B949E] hover:text-[#ECEFF4] cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting || selectedIds.length < 2 || !question.trim()}
          className="btn-terminal-accent px-6 py-2.5 rounded-sm text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-40 shadow-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Convening Council...</span>
            </>
          ) : (
            <>
              <Swords className="h-3.5 w-3.5" />
              <span>Convene Council ({selectedIds.length} Agents)</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
