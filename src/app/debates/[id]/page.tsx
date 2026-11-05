import { notFound } from "next/navigation";
import { prisma } from "@/lib/database/prisma";
import { CouncilChamber } from "@/components/council/council-chamber";

export const dynamic = "force-dynamic";

export default async function DebateChamberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const debate = await prisma.debate.findUnique({
    where: { id },
    include: {
      personas: {
        include: { persona: true },
      },
      contributions: {
        include: { persona: true },
        orderBy: [{ roundNumber: "asc" }, { createdAt: "asc" }],
      },
      verdict: true,
    },
  });

  if (!debate) {
    notFound();
  }

  return <CouncilChamber initialDebate={JSON.parse(JSON.stringify(debate))} />;
}
