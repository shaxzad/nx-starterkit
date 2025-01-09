import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: 'user1@example.com', password: 'password1', name: 'User One' },
    { email: 'user2@example.com', password: 'password2', name: 'User Two' },
    { email: 'user3@example.com', password: 'password3', name: 'User Three' },
    { email: 'user4@example.com', password: 'password4', name: 'User Four' },
    { email: 'user5@example.com', password: 'password5', name: 'User Five' },
    { email: 'user6@example.com', password: 'password6', name: 'User Six' },
    { email: 'user7@example.com', password: 'password7', name: 'User Seven' },
    { email: 'user8@example.com', password: 'password8', name: 'User Eight' },
    { email: 'user9@example.com', password: 'password9', name: 'User Nine' },
    { email: 'user10@example.com', password: 'password10', name: 'User Ten' },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });
  }

  console.log('Seed data successfully added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
