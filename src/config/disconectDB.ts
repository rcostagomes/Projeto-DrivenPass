import prisma from "./db/database";

export async function disconnectDB(): Promise<void> {
    await prisma?.$disconnect();
  }