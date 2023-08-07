import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
