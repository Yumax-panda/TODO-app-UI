import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";

type SortBy = "deadline" | "priority" | "createdAt" | "updatedAt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  const _sortBy = searchParams.get("sortBy") as SortBy | null;
  const sortBy = _sortBy || "deadline";
  const skip = searchParams.get("skip");
  const pageSize = searchParams.get("pageSize");

  if (!id) {
    const data = await prisma.task.findMany();
    return NextResponse.json(data);
  }

  const data = await prisma.task.findMany({
    where: { userId: id },
    orderBy: { [sortBy]: "desc" },
  });

  if (!(skip && pageSize)) return NextResponse.json({ data, total: data.length });
  const start = parseInt(skip);
  const end = start + parseInt(pageSize);
  return NextResponse.json({ data: data.slice(start, end), total: data.length });
}
