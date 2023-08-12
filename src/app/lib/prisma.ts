import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// TODO: リロードによるクライアントインスタンス数の増加を防ぐ
