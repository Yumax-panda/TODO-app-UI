import { NextResponse } from "next/server";

import { prisma } from "../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userId");

  if (!id) {
    const data = await prisma.task.findMany();
    return NextResponse.json(data);
  }

  const data = await prisma.task.findMany({
    where: { userId: id },
  });
  return NextResponse.json(data);
}
