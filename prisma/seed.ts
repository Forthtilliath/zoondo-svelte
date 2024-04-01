import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();

const users = [
  {
    email: 'evoli@spamland.com',
    username: 'Evoli'
  },
  {
    email: 'aquali@spamland.com',
    username: 'Aquali'
  },
  {
    email: 'pyroli@spamland.com',
    username: 'Pyroli'
  }
];

async function main() {
  // TODO Fill this ?
  for (const user of users) {
    await createIfNotExists({
      id: crypto.randomUUID(), //SQLite
      ...user
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

function createIfNotExists(data: DB.UserCreate) {
  return prisma.user.upsert({
    where: { username: data.email },
    create: data,
    update: data
  });
}
