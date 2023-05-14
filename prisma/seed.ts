import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  const master = await prisma.user.upsert({
    create: {
      email: 'master@carteiradigital.com',
      name: 'Master',
      password: hashSync('123456', 8),
      role: 'Master',
      cpf: '00000000000',
      birth_date: new Date(),
    },
    update: {},
    where: {
      email: 'master@carteiradigital.com',
    },
  });
  console.log({ master });
};

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
