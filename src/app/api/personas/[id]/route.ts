import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { personaSchema } from "@/lib/validation/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const persona = await prisma.persona.findUnique({ where: { id } });
    if (!persona) {
      return NextResponse.json({ error: "Persona not found" }, { status: 404 });
    }
    return NextResponse.json(persona);
  } catch (error) {
    console.error("Failed to fetch persona:", error);
    return NextResponse.json({ error: "Failed to fetch persona" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = personaSchema.parse(body);

    const persona = await prisma.persona.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(persona);
  } catch (error: any) {
    if (error?.issues) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Failed to update persona:", error);
    return NextResponse.json({ error: "Failed to update persona" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.persona.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete persona:", error);
    return NextResponse.json({ error: "Failed to delete persona" }, { status: 500 });
  }
}
