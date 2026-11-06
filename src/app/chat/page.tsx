"use client";

import { useState, useEffect, useRef } from "react";
import { BlobAvatar } from "@/components/council/blob-avatar";
import { PersonaForm } from "@/components/personas/persona-form";
import {
  Send,
  Plus,
  Radio,
  Sparkles,
  Terminal,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Trash2,
} from "lucide-react";
import type { Persona, PersonaFormData } from "@/types";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function DirectChatPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loadingPersonas, setLoadingPersonas] = useState(true);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Fetch personas on load
  const fetchPersonas = async () => {
    try {
      const res = await fetch("/api/personas");
      if (res.ok) {
        const data = await res.json();
        setPersonas(data);
        if (data.length > 0 && !selectedPersona) {
          setSelectedPersona(data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load personas:", err);
    } finally {
      setLoadingPersonas(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  // When selected persona changes, reset chat with a personalized greeting
  useEffect(() => {
    if (selectedPersona) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Encrypted link established. I'm ${selectedPersona.name}. What's on your mind?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [selectedPersona?.id]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedPersona || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/personas/${selectedPersona.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.content,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "[Connection interrupted. Check your NVIDIA API connection.]",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePersona = async (formData: PersonaFormData) => {
    const res = await fetch("/api/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create persona");
    }
    const created = await res.json();
    setPersonas((prev) => [created, ...prev]);
    setSelectedPersona(created);
  };

  return (
    <div className="flex h-screen font-mono-code text-xs select-none bg-[#0A0A0C]">
      {/* ── Left Sidebar: Channel Switcher (Agents Roster) ─────── */}
      <aside className="w-64 border-r border-[#1E2228] bg-[#0E1013] flex flex-col justify-between hidden md:flex">
        <div>
          {/* Header */}
          <div className="p-3 border-b border-[#1E2228] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-[#FF6E26] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#ECEFF4]">
                DIRECT_LINK // 1v1
              </span>
            </div>
            <span className="text-[10px] text-[#525A66]">
              [{personas.length}]
            </span>
          </div>

          {/* New Mind Quick Action */}
          <div className="p-2 border-b border-[#1E2228]">
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full btn-terminal-accent py-1.5 px-3 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>[FORGE NEW MIND]</span>
            </button>
          </div>

          {/* Personas List */}
          <div className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {loadingPersonas ? (
              <div className="p-4 text-center text-[#525A66] text-[10px]">
                Loading minds...
              </div>
            ) : (
              personas.map((persona) => {
                const isSelected = selectedPersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona)}
                    className={`w-full text-left p-2 border transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "border-[#FF6E26] bg-[#FF6E26]/10 text-[#ECEFF4] shadow-[0_0_8px_rgba(255,110,38,0.2)]"
                        : "border-transparent hover:border-[#1E2228] text-[#8B949E] hover:text-[#ECEFF4]"
                    }`}
                  >
                    <BlobAvatar
                      name={persona.name}
                      persona={persona}
                      size="sm"
                      isSpeaking={isSelected}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[11px] truncate flex items-center justify-between">
                        <span>{persona.name}</span>
                        {isSelected && (
                          <span className="h-1.5 w-1.5 bg-[#FF6E26] animate-ping" />
                        )}
                      </div>
                      <div className="text-[9px] text-[#525A66] truncate">
                        {persona.personality?.split(",")[0] || "Agent"}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-2.5 border-t border-[#1E2228] text-[9px] text-[#525A66]">
          // PRIVATE_ENCRYPTED_CHANNEL
        </div>
      </aside>

      {/* ── Main Chat Stream ────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <div className="p-3 border-b border-[#1E2228] bg-[#0E1013] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {selectedPersona && (
              <>
                <BlobAvatar
                  name={selectedPersona.name}
                  persona={selectedPersona}
                  size="md"
                  isSpeaking={isLoading}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#ECEFF4] font-mono truncate">
                      {selectedPersona.name}
                    </h2>
                    <span className="text-[9px] px-1 py-0.2 border border-[#FF6E26]/40 bg-[#FF6E26]/10 text-[#FF6E26] font-mono">
                      [1v1 LINK]
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8B949E] truncate">
                    {selectedPersona.description}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFormOpen(true)}
              className="md:hidden btn-terminal-accent px-2 py-1 text-[9px] font-bold"
            >
              + NEW
            </button>
            <span className="text-[10px] text-[#525A66] hidden sm:inline">
              // NO_GROUP_NOISE
            </span>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 p-3 border ${
                  isUser
                    ? "border-[#00E5FF]/30 bg-[#00E5FF]/5 ml-auto max-w-[85%] md:max-w-[70%]"
                    : "border-[#1E2228] bg-[#0E1013] mr-auto max-w-[85%] md:max-w-[75%]"
                }`}
              >
                <div className="flex-shrink-0 pt-0.5">
                  {isUser ? (
                    <BlobAvatar
                      name="Director"
                      dress={{
                        ears: "antenna",
                        eyes: "visor",
                        accessory: "headset",
                        accentColor: "#00E5FF",
                      }}
                      size="sm"
                    />
                  ) : (
                    <BlobAvatar
                      name={selectedPersona?.name || "Agent"}
                      persona={selectedPersona || undefined}
                      size="sm"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-bold text-[10px] ${
                        isUser ? "text-[#00E5FF]" : "text-[#FF6E26]"
                      }`}
                    >
                      {isUser ? "[YOU // DIRECTOR]" : selectedPersona?.name}
                    </span>
                    <span className="text-[9px] text-[#525A66]">{m.timestamp}</span>
                  </div>

                  <p className="text-xs text-[#ECEFF4] leading-relaxed whitespace-pre-wrap font-mono">
                    {m.content}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-[10px] text-[#FF6E26] p-2">
              <span className="h-1.5 w-1.5 bg-[#FF6E26] animate-ping" />
              <span>{selectedPersona?.name} is thinking...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#1E2228] bg-[#0E1013]">
          <div className="flex items-center gap-2 p-1.5 border border-[#2A303A] bg-[#0A0A0C]">
            <span className="text-[#FF6E26] text-xs font-bold px-1">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${selectedPersona?.name || "agent"} directly...`}
              className="flex-1 bg-transparent border-none text-xs text-[#ECEFF4] placeholder:text-[#525A66] focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-terminal-accent px-3 py-1 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <span>SEND</span>
              <Send className="h-3 w-3" />
            </button>
          </div>
        </form>
      </main>

      {/* Persona Creator Wizard Modal */}
      <PersonaForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreatePersona}
      />
    </div>
  );
}
