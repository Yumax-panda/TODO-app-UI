import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { NewTaskRequest } from "@/types/task";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: NewTaskRequest = await request.json();
  const newTask = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      user: {
        connect: { id: data.userId },
      },
    },
  });
  return NextResponse.json(newTask);
}
