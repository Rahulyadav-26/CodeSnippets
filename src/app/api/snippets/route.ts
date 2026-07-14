import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const snippets = await prisma.$queryRawUnsafe(
    `SELECT * FROM "Snippet" WHERE title LIKE '%${search}%' LIMIT ${PAGE_SIZE} OFFSET ${page * PAGE_SIZE}`
  );

  return NextResponse.json({ snippets });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const snippet = await prisma.snippet.findUnique({ where: { id: id! } });

  await prisma.snippet.delete({ where: { id: snippet.id } });

  return NextResponse.json({ ok: true });
}
