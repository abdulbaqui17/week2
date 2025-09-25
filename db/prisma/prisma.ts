import { PrismaClient } from '../../packages/db/generated/prisma/index.js';
// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;