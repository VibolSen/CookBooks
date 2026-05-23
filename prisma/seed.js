const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'vibolsen2002@gmail.com';
  const hashedPassword = await bcrypt.hash('Vibol2020', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'Admin',
      userName: 'VibolSEN',
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      userName: 'VibolSEN',
      password: hashedPassword,
      role: 'Admin',
    },
  });

  console.log('Admin user upserted:', admin.email);
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
