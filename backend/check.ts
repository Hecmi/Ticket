import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ include: { profile: true } });
  console.log('USERS:', JSON.stringify(users, null, 2));

  const profileOptions = await prisma.profileOption.findMany();
  console.log('PROFILE OPTIONS:', profileOptions);
}

main().catch(console.error).finally(() => prisma.$disconnect());
