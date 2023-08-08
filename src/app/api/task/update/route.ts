import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();

  const updatedTask = await prisma.task.update({
    where: { id: data.id },
    data,
  });

  return NextResponse.json(updatedTask);
}
