import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Prisma connected');
  await prisma.$disconnect();
}

main().catch(console.error);