import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";

type SortBy = "deadline" | "priority" | "createdAt" | "updatedAt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  const _sortBy = searchParams.get("sortBy") as SortBy | null;
  const sortBy = _sortBy || "deadline";

  if (!id) {
    const data = await prisma.task.findMany();
    return NextResponse.json(data);
  }

  const data = await prisma.task.findMany({
    where: { userId: id },
    orderBy: { [sortBy]: "desc" },
  });
  return NextResponse.json(data);
}
