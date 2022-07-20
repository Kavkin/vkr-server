import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      email: 'admin',
      name: 'Ilya',
      password: await hash('admin', 8),
      role: 'ADMIN',
      phone: 'admin',
    },
  });

  const enquiry = await prisma.enquiry.create({
    data: {
      phone: '+7343544656',
      name: 'ILYA',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
