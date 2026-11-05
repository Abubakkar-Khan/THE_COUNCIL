"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PersonaCard } from "./persona-card";
import { PersonaForm } from "./persona-form";
import { Plus, Users } from "lucide-react";
import type { Persona, PersonaFormData } from "@/types";

export function PersonaGrid() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);

  const fetchPersonas = useCallback(async () => {
    try {
      const res = await fetch("/api/personas");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPersonas(data);
      }
    } catch (error) {
      console.error("Failed to fetch personas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  const handleCreate = async (data: PersonaFormData) => {
    const res = await fetch("/api/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create persona");
    }
    await fetchPersonas();
  };

  const handleEdit = async (data: PersonaFormData) => {
    if (!editingPersona) return;
    const res = await fetch(`/api/personas/${editingPersona.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update persona");
    }
    setEditingPersona(null);
    await fetchPersonas();
  };

  const handleDuplicate = async (persona: Persona) => {
    const data: PersonaFormData = {
      name: `${persona.name} (Copy)`,
      description: persona.description,
      personality: persona.personality,
      perspective: persona.perspective,
      beliefs: persona.beliefs,
      strengths: persona.strengths,
      blindSpots: persona.blindSpots,
      communicationStyle: persona.communicationStyle,
      debateStyle: persona.debateStyle,
      customInstructions: persona.customInstructions,
    };
    await handleCreate(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this persona?")) return;
    await fetch(`/api/personas/${id}`, { method: "DELETE" });
    await fetchPersonas();
  };

  const openEdit = (persona: Persona) => {
    setEditingPersona(persona);
    setFormOpen(true);
  };

  const openCreate = () => {
    setEditingPersona(null);
    setFormOpen(true);
  };

  if (loading) {
    return (
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-44 rounded-md bg-[#0E1013] animate-pulse border border-dashed border-[#1E2228]" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 select-none font-mono-code max-w-6xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dashed border-[#1E2228]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-dashed border-[#1E2228] bg-[#0E1013] text-[#FF6E26]">
              AGENTS · STUDIO
            </span>
            <span className="text-[10px] text-[#525A66]">
              // {personas.length} TOTAL MINDS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-[#ECEFF4] tracking-tight">
            Council Agents Studio
          </h1>
          <p className="text-xs text-[#8B949E] mt-0.5">
            Configure custom behavioral directives, perspectives, and biases for your council members.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="btn-terminal-accent px-4 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Agent</span>
        </button>
      </div>

      {personas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 text-center rounded-md border border-dashed border-[#1E2228] bg-[#0E1013]"
        >
          <Users className="h-10 w-10 text-[#525A66] mx-auto mb-3" />
          <h3 className="text-xs font-semibold text-[#ECEFF4] mb-1">ROSTER EMPTY</h3>
          <p className="text-xs text-[#8B949E] mb-4">
            Initialize your first AI agent to join the deliberations.
          </p>
          <button
            onClick={openCreate}
            className="btn-terminal-accent px-4 py-2 rounded-sm text-xs cursor-pointer font-semibold"
          >
            Create First Agent
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {personas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                onEdit={openEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <PersonaForm
        key={editingPersona?.id || "new"}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingPersona(null);
        }}
        persona={editingPersona}
        onSubmit={editingPersona ? handleEdit : handleCreate}
      />
    </div>
  );
}
