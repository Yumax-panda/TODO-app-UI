import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const deletedTask = await prisma.task.delete({
    where: { id: data.id },
  });

  return NextResponse.json(deletedTask);
}
