import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { debateSetupSchema } from "@/lib/validation/schemas";
import { buildCouncilWorkflow } from "@/graph/workflow";
import { getModelName } from "@/lib/nvidia/client";

export async function GET() {
  try {
    const debates = await prisma.debate.findMany({
      orderBy: { startedAt: "desc" },
      include: {
        personas: {
          include: { persona: true },
        },
        verdict: true,
        contributions: {
          include: { persona: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    return NextResponse.json(debates);
  } catch (error) {
    console.error("Failed to fetch debates:", error);
    return NextResponse.json(
      { error: "Failed to fetch debates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = debateSetupSchema.parse(body);

    // Load personas
    const personas = await prisma.persona.findMany({
      where: { id: { in: validated.personaIds } },
    });

    if (personas.length < 2) {
      return NextResponse.json(
        { error: "At least 2 valid personas are required" },
        { status: 400 }
      );
    }

    // Create debate record
    const debate = await prisma.debate.create({
      data: {
        userQuestion: validated.question,
        model: getModelName(),
        totalRounds: validated.totalRounds,
        status: "pending",
        personas: {
          create: personas.map((p) => ({
            personaId: p.id,
          })),
        },
      },
    });

    // Run the workflow asynchronously (don't await)
    const workflow = buildCouncilWorkflow();
    workflow
      .invoke({
        debateId: debate.id,
        question: validated.question,
        personas: personas,
        currentRound: 1,
        totalRounds: validated.totalRounds,
        contributions: [],
        verdict: null,
        status: "pending",
        error: null,
      })
      .catch(async (error) => {
        console.error("Debate workflow failed:", error);
        await prisma.debate.update({
          where: { id: debate.id },
          data: { status: "failed" },
        });
      });

    return NextResponse.json({ debateId: debate.id }, { status: 201 });
  } catch (error: any) {
    if (error?.issues) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to create debate:", error);
    return NextResponse.json(
      { error: "Failed to create debate" },
      { status: 500 }
    );
  }
}
