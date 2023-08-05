import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ status: 400, message: "id is required" });
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ status: 400, message: "id is required" });
  }
  const user = await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json(user);
}
