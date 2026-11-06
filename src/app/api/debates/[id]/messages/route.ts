import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contributions = await prisma.contribution.findMany({
      where: { debateId: id },
      include: { persona: true },
      orderBy: [{ roundNumber: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content, roundNumber } = body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Message content cannot be empty" },
        { status: 400 }
      );
    }

    const debate = await prisma.debate.findUnique({
      where: { id },
      include: {
        contributions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!debate) {
      return NextResponse.json({ error: "Debate not found" }, { status: 404 });
    }

    // Determine current round
    const calculatedRound =
      roundNumber ||
      debate.contributions[0]?.roundNumber ||
      1;

    // Record user message in debate transcript
    const contribution = await prisma.contribution.create({
      data: {
        debate: { connect: { id } },
        roundNumber: calculatedRound,
        role: "user",
        content: content.trim(),
      },
      include: {
        persona: true,
      },
    });

    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    console.error("Failed to record conversation message:", error);
    return NextResponse.json(
      { error: "Failed to record message" },
      { status: 500 }
    );
  }
}
