import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface PrismaError extends Error {
  code: string;
  meta?: Record<string, unknown>;
}

async function main() {
  const hashedPassword1 = await bcrypt.hash('admin123', 10);
  const hashedPassword2 = await bcrypt.hash('user123', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 've2maxAdmin',
      email: 've2maxAdmin@example.com',
      password: hashedPassword1,
      role: 'admin',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 've2maxUser',
      email: 've2maxUser@example.com',
      password: hashedPassword2,
      role: 'user',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
