import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const { id, ...rest } = data;

  const updatedTask = await prisma.task.update({
    where: { id },
    data: rest,
  });

  return NextResponse.json(updatedTask);
}
