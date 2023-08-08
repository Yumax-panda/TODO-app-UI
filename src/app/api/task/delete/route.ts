import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const deletedTask = await prisma.task.delete({
    where: { id: data.id },
  });

  return NextResponse.json(deletedTask);
}
