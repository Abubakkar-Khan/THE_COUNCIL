import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { getNvidiaClient } from "@/lib/nvidia/client";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { buildPersonaSystemPrompt } from "@/agents/prompts";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { messages } = body; // Array of { role: "user" | "assistant", content: string }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Conversation history cannot be empty" },
        { status: 400 }
      );
    }

    const persona = await prisma.persona.findUnique({
      where: { id },
    });

    if (!persona) {
      return NextResponse.json({ error: "Persona not found" }, { status: 404 });
    }

    // Build system instructions based on persona profile
    const systemPrompt = `${buildPersonaSystemPrompt(persona)}

## 1-ON-1 DIRECT TERMINAL LINK:
You are in a direct 1-on-1 private encrypted channel with the user.
Speak naturally, staying 100% in character.
Be direct, authentic, and unfiltered. Never sound like a generic AI assistant.
Keep your answers punchy, opinionated, and conversational.`;

    const client = getNvidiaClient({ maxTokens: 1024, temperature: 0.7 });

    const formattedMessages = [
      new SystemMessage(systemPrompt),
      ...messages.slice(-10).map((m: any) =>
        m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
      ),
    ];

    const response = await client.invoke(formattedMessages);

    let reply = "";
    if (typeof response.content === "string") {
      reply = response.content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    } else if (response.additional_kwargs?.reasoning_content) {
      reply = String(response.additional_kwargs.reasoning_content).trim();
    }

    return NextResponse.json({
      role: "assistant",
      content: reply || "...",
    });
  } catch (error: any) {
    console.error("1-on-1 chat error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to communicate with persona" },
      { status: 500 }
    );
  }
}
