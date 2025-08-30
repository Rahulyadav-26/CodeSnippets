import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create Prisma client if we're not in build time
const createPrismaClient = () => {
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    // In production without DATABASE_URL, return a mock client
    return {
      snippet: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async () => ({ id: 1, title: "Mock", code: "Mock code" }),
        update: async () => ({ id: 1, title: "Mock", code: "Mock code" }),
        delete: async () => ({ id: 1, title: "Mock", code: "Mock code" }),
      },
    } as any;
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
