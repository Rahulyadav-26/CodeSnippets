import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam);
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: { code },
    });

    return NextResponse.json(updatedSnippet);
  } catch (error) {
    console.error("Error updating snippet:", error);
    return NextResponse.json(
      { error: "Failed to update snippet" },
      { status: 500 }
    );
  }
}
