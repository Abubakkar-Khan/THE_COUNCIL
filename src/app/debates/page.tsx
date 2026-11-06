import Link from "next/link";
import { prisma } from "@/lib/database/prisma";
import { formatDate } from "@/lib/utils";
import { BlobAvatar } from "@/components/council/blob-avatar";
import { Swords, ArrowRight, History, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DebateHistoryPage() {
  const debates = await prisma.debate.findMany({
    orderBy: { startedAt: "desc" },
    include: {
      personas: {
        include: { persona: true },
      },
      verdict: true,
      contributions: true,
    },
  });

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6 select-none font-mono-code">
      {/* Archive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2228]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] px-2 py-0.5 border border-[#FF6E26]/40 bg-[#FF6E26]/10 text-[#FF6E26] font-mono">
              [ ARCHIVE · HISTORY ]
            </span>
            <span className="text-[10px] text-[#525A66] font-mono">
              // {debates.length} TOTAL SESSIONS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-mono text-[#ECEFF4] tracking-tight">
            Debate Archives & Logs
          </h1>
          <p className="text-xs text-[#8B949E] mt-0.5">
            Audit historical multi-agent debate transcripts and judicial rulings.
          </p>
        </div>

        <Link href="/debates/new">
          <button className="btn-terminal-accent px-4 py-2 border border-[#FF853E] text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-sm">
            <Plus className="h-3.5 w-3.5" />
            <span>[ NEW_DEBATE ]</span>
          </button>
        </Link>
      </div>

      {debates.length === 0 ? (
        <div className="p-12 text-center border border-[#1E2228] bg-[#0E1013]">
          <History className="h-10 w-10 text-[#525A66] mx-auto mb-3" />
          <h3 className="text-xs font-semibold text-[#ECEFF4] mb-1">// NO_ARCHIVES_RECORDED</h3>
          <p className="text-xs text-[#8B949E] mb-4">
            Drop a dilemma to the council to store your first deliberation tape.
          </p>
          <Link href="/debates/new">
            <button className="btn-terminal-accent px-4 py-2 border border-[#FF853E] text-xs font-bold cursor-pointer">
              [ START_FIRST_DEBATE ⚔ ]
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {debates.map((debate) => {
            const isCompleted = debate.status === "completed";
            const isInProgress = debate.status === "in_progress";

            return (
              <Link
                key={debate.id}
                href={`/debates/${debate.id}`}
                className="group block p-3.5 border border-[#1E2228] bg-[#0E1013] hover:border-[#FF6E26] hover:bg-[#12151A] transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#525A66]">
                        {formatDate(debate.startedAt)}
                      </span>
                      {isCompleted ? (
                        <span className="text-[10px] px-2 py-0.2 border border-[#1E2228] text-[#ECEFF4] bg-[#0A0A0C] font-mono">
                          [✔ VERDICT SEALED]
                        </span>
                      ) : isInProgress ? (
                        <span className="text-[10px] px-2 py-0.2 border border-[#FF6E26] text-[#FF6E26] bg-[#FF6E26]/10 animate-pulse font-mono">
                          [● LIVE DEBATING]
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 border border-[#2A303A] text-[#8B949E] bg-[#14171C] font-mono">
                          [PENDING]
                        </span>
                      )}
                      <span className="text-[10px] text-[#525A66]">
                        ID: #{debate.id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm font-semibold text-[#ECEFF4] line-clamp-1 group-hover:text-[#FF6E26] transition-colors">
                      "{debate.userQuestion}"
                    </h3>

                    {debate.verdict && (
                      <p className="text-xs text-[#8B949E] line-clamp-1">
                        <span className="text-[#FF6E26] font-semibold mr-1">[VERDICT]:</span>
                        {debate.verdict.recommendation}
                      </p>
                    )}

                    {/* Agent bit cat icons row */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-[#525A66] font-mono">AGENTS:</span>
                      {debate.personas?.map((dp) => (
                        <div
                          key={dp.personaId}
                          className="flex items-center gap-1 text-[11px] text-[#8B949E]"
                        >
                          <BlobAvatar
                            name={dp.persona?.name || "Agent"}
                            size="xs"
                          />
                          <span className="hidden sm:inline text-[10px]">
                            {dp.persona?.name.split(" ")[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#8B949E] group-hover:text-[#ECEFF4] self-end md:self-center flex-shrink-0 font-mono">
                    <span>[OPEN_CHAMBER]</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
