import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const updatedTask = await prisma.task.update({
    where: { id: data.id },
    data,
  });

  return NextResponse.json(updatedTask);
}
