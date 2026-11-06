"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChatBubble } from "./chat-bubble";
import { CouncilTableArt } from "./council-table-art";
import { DebateSidebarTelemetry } from "./debate-sidebar-telemetry";
import { VerdictPanel } from "@/components/verdict/verdict-panel";
import { Plus, Send, AlertCircle } from "lucide-react";
import type { Debate, Contribution } from "@/types";

interface CouncilChamberProps {
  initialDebate: Debate;
}

export function CouncilChamber({ initialDebate }: CouncilChamberProps) {
  const router = useRouter();
  const [debate, setDebate] = useState<Debate>(initialDebate);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const fetchDebate = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch(`/api/debates/${debate.id}`);
      if (res.ok) {
        const data = await res.json();
        setDebate(data);
      }
    } catch (err) {
      console.error("Error polling debate:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [debate.id]);

  // Poll debate every 2.5s while pending or in_progress
  useEffect(() => {
    if (debate.status === "completed" || debate.status === "failed") return;

    const interval = setInterval(() => {
      fetchDebate();
    }, 2500);

    return () => clearInterval(interval);
  }, [debate.status, fetchDebate]);

  // Auto-scroll to bottom as messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [debate.contributions?.length, debate.status]);

  const contributions = debate.contributions || [];

  // Determine current active round number
  const currentRound =
    contributions.length > 0
      ? Math.max(...contributions.map((c) => c.roundNumber))
      : 1;

  // Find who has spoken in the current round
  const currentRoundContributions = contributions.filter(
    (c) => c.roundNumber === currentRound
  );
  const spokenPersonaIds = new Set(
    currentRoundContributions.map((c) => c.personaId)
  );

  // Next persona to speak in this round (or first persona if round just started)
  const nextPersonaToSpeak = debate.personas?.find(
    (p) => !spokenPersonaIds.has(p.persona.id)
  )?.persona;

  const activeSpeakerName =
    debate.status === "in_progress"
      ? nextPersonaToSpeak?.name ||
        contributions[contributions.length - 1]?.persona?.name ||
        debate.personas?.[0]?.persona?.name
      : undefined;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    // In our live session, we can prompt or add comments
    setUserMessage("");
  };

  const scrollToVerdict = () => {
    const el = document.getElementById("verdict-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex w-full min-h-screen font-mono-code text-xs select-none">
      {/* Center Column: The Main Debate Feed */}
      <div className="flex-1 flex flex-col px-4 md:px-8 py-5 min-w-0">
        {/* Top Header Bar: [ R2 · DEBATE ] --------------------------- [ ● LIVE ] */}
        <div className="flex items-center justify-between gap-4 mb-3 border-b border-[#1E2228] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1 border border-[#2A303A] bg-[#0E1013] text-xs font-mono">
              <span className="h-2 w-2 bg-[#FF6E26]" />
              <span className="text-[#ECEFF4] font-medium tracking-tight">
                {debate.status === "completed"
                  ? "[ FINAL · VERDICT ]"
                  : `[ R${currentRound} · DEBATE ]`}
              </span>
            </div>
            <span className="text-[10px] text-[#525A66] hidden md:inline font-mono">
              // CHAMBER_SESSION: {debate.id.slice(-8)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {debate.status === "in_progress" && (
              <div className="flex items-center gap-2 px-2 py-0.5 border border-[#FF6E26]/40 bg-[#FF6E26]/10">
                <span className="h-1.5 w-1.5 bg-[#FF6E26] animate-radar" />
                <span className="text-[#FF6E26] font-semibold tracking-wider text-[11px]">[ LIVE ]</span>
              </div>
            )}
            {debate.status === "completed" && (
              <div className="flex items-center gap-2 px-2 py-0.5 border border-[#A3E635]/40 bg-[#A3E635]/10">
                <span className="h-1.5 w-1.5 bg-[#A3E635]" />
                <span className="text-[#A3E635] font-semibold tracking-wider text-[11px]">[ CONCLUDED ]</span>
              </div>
            )}
          </div>
        </div>

        {/* Large Chunky Question Heading */}
        <div className="mb-4">
          <div className="text-[10px] text-[#FF6E26] font-mono mb-1">
            // ACTIVE_DILEMMA
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-mono text-[#ECEFF4] tracking-tight leading-snug">
            {debate.userQuestion}
          </h1>
        </div>

        {/* The Council Table ASCII / Dithered Illustration */}
        <div className="w-full mb-6 relative">
          <CouncilTableArt
            personas={debate.personas || []}
            activeSpeakerName={activeSpeakerName}
            isLive={debate.status === "in_progress"}
          />
        </div>

        {/* Error Notice */}
        {debate.status === "failed" && (
          <div className="mb-4 rounded-md border border-red-800 bg-red-950/30 p-3 flex items-center gap-3 text-red-300">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <p className="text-xs">
              Council session failed. Check your NVIDIA API key and connection.
            </p>
          </div>
        )}

        {/* Chronological Message Stream */}
        <div className="space-y-1 mb-6">
          {contributions.map((msg, idx) => (
            <ChatBubble key={msg.id} contribution={msg} index={idx} />
          ))}

          {/* Empty starting state */}
          {contributions.length === 0 && debate.status === "in_progress" && (
            <div className="py-8 text-center text-[#8B949E] text-xs font-mono">
              <span className="text-[#FF6E26] animate-pulse">···</span> Assembling council personas...
            </div>
          )}

          {/* Live Typing Indicator: [ ··· ] Persona is typing... */}
          <AnimatePresence>
            {debate.status === "in_progress" && activeSpeakerName && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 py-2.5 text-xs text-[#8B949E]"
              >
                <div className="flex items-center gap-1 px-2 py-0.5 border border-[#2A303A] bg-[#0E1013] text-[#FF6E26]">
                  <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:0ms]" />
                  <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:150ms]" />
                  <span className="h-1 w-1 bg-[#FF6E26] animate-bounce [animation-delay:300ms]" />
                </div>
                <span className="font-mono tracking-tight text-[#D8DEE9]">
                  <span className="text-[#FF6E26] font-semibold">{activeSpeakerName}</span> is deliberating...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={chatBottomRef} />
        </div>

        {/* Message Input Bar (Sharp Terminal Command Box) */}
        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-4 z-20 mt-auto pt-2"
        >
          <div className="flex items-center gap-2 p-1.5 border border-[#2A303A] bg-[#0E1013] shadow-xl">
            <button
              type="button"
              className="h-7 w-7 border border-[#2A303A] bg-[#0A0A0C] text-[#8B949E] hover:text-[#ECEFF4] hover:border-[#FF6E26] flex items-center justify-center transition-colors cursor-pointer text-xs font-mono"
              title="Add directive"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>

            <div className="text-[11px] text-[#FF6E26] font-mono select-none px-1">
              &gt;
            </div>

            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Message the council..."
              className="flex-1 bg-transparent border-none text-xs text-[#ECEFF4] placeholder:text-[#525A66] focus:outline-none font-mono-code px-1"
            />

            <button
              type="submit"
              className="h-7 px-3 bg-[#FF6E26] text-[#0A0A0C] hover:bg-[#FF853E] font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 shadow-sm"
              title="Send"
            >
              <span>SEND</span>
              <Send className="h-3 w-3" />
            </button>
          </div>
        </form>

        {/* The Final Verdict Decree Section */}
        {debate.verdict && (
          <div id="verdict-section" className="pt-8 pb-12 scroll-mt-6">
            <VerdictPanel verdict={debate.verdict} />
          </div>
        )}
      </div>

      {/* Right Column: Telemetry & Progress Sidebar */}
      <DebateSidebarTelemetry
        debate={debate}
        activeSpeakerName={activeSpeakerName}
        onScrollToVerdict={scrollToVerdict}
      />
    </div>
  );
}
