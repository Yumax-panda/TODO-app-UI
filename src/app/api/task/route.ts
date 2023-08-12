import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";

type SortBy = "deadline" | "priority" | "createdAt" | "updatedAt";
type TaskQuery = {
  userId: string;
  tagId?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");
  const _sortBy = searchParams.get("sortBy") as SortBy | null;
  const sortBy = _sortBy || "deadline";
  const tagId = searchParams.get("tagId");

  if (!id) {
    const data = await prisma.task.findMany();
    return NextResponse.json(data);
  }
  const where: TaskQuery = { userId: id };
  if (tagId) {
    where.tagId = tagId;
  }

  const data = await prisma.task.findMany({
    where,
    orderBy: { [sortBy]: "desc" },
  });
  return NextResponse.json(data);
}
