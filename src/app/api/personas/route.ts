import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { personaSchema } from "@/lib/validation/schemas";

export async function GET() {
  try {
    const personas = await prisma.persona.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(personas);
  } catch (error) {
    console.error("Failed to fetch personas:", error);
    return NextResponse.json(
      { error: "Failed to fetch personas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = personaSchema.parse(body);

    const persona = await prisma.persona.create({
      data: validated,
    });

    return NextResponse.json(persona, { status: 201 });
  } catch (error: any) {
    if (error?.issues) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to create persona:", error);
    return NextResponse.json(
      { error: "Failed to create persona" },
      { status: 500 }
    );
  }
}
