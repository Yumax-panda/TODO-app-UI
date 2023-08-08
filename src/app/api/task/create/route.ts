import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { NewTaskRequest } from "@/types/task";

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
