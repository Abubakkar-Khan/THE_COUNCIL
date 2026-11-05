import { prisma } from "@/lib/database/prisma";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentDebates } from "@/components/dashboard/recent-debates";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [personas, debates] = await Promise.all([
    prisma.persona.findMany({ where: { isEnabled: true } }),
    prisma.debate.findMany({
      orderBy: { startedAt: "desc" },
      include: {
        personas: { include: { persona: true } },
        verdict: true,
      },
    }),
  ]);

  const completedDebates = debates.filter((d) => d.status === "completed");

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 font-mono-code select-none">
      <WelcomeCard />
      <StatsBar
        totalPersonas={personas.length}
        totalDebates={debates.length}
        completedDebates={completedDebates.length}
      />
      <QuickActions />
      <RecentDebates debates={JSON.parse(JSON.stringify(debates))} />
    </div>
  );
}
