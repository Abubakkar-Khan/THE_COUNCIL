import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
      return NextResponse.json({ error: "Debate not found" }, { status: 404 });
    }

    return NextResponse.json(debate);
  } catch (error) {
    console.error("Failed to fetch debate:", error);
    return NextResponse.json(
      { error: "Failed to fetch debate" },
      { status: 500 }
    );
  }
}
