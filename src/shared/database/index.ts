/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query'],
});
