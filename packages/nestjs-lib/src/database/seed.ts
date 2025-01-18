const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'user1@example.com',
      password: 'password1',
      name: 'User One',
      username: 'user_one',
    },
    {
      email: 'user2@example.com',
      password: 'password2',
      name: 'User Two',
      username: 'user_two',
    },
    {
      email: 'user3@example.com',
      password: 'password3',
      name: 'User Three',
      username: 'user_three',
    },
    {
      email: 'user4@example.com',
      password: 'password4',
      name: 'User Four',
      username: 'user_four',
    },
    {
      email: 'user5@example.com',
      password: 'password5',
      name: 'User Five',
      username: 'user_five',
    },
    {
      email: 'user6@example.com',
      password: 'password6',
      name: 'User Six',
      username: 'user_six',
    },
    {
      email: 'user7@example.com',
      password: 'password7',
      name: 'User Seven',
      username: 'user_seven',
    },
    {
      email: 'user8@example.com',
      password: 'password8',
      name: 'User Eight',
      username: 'user_eight',
    },
    {
      email: 'user9@example.com',
      password: 'password9',
      name: 'User Nine',
      username: 'user_nine',
    },
    {
      email: 'user10@example.com',
      password: 'password10',
      name: 'User Ten',
      username: 'user_ten',
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        username: user.username,
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
