const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Create Roles
  const roles = await prisma.role.createMany({
    data: [
      { name: 'SUPERADMIN' },
      { name: 'ADMIN' },
      { name: 'MANAGER' },
      { name: 'USER' },
    ],
  });

  // Fetch roles for reference
  const superadminRole = await prisma.role.findUnique({
    where: { name: 'SUPERADMIN' },
  });
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const managerRole = await prisma.role.findUnique({
    where: { name: 'MANAGER' },
  });
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });

  // Create Tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Acme Corp',
      description: 'A global organization',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Tech Innovators',
      description: 'A tech-focused company',
    },
  });

  // Create Branches for Tenant 1
  const branch1 = await prisma.branch.create({
    data: {
      name: 'Headquarters',
      description: 'Main office',
      tenantId: tenant1.id,
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: 'Regional Office',
      description: 'East Coast office',
      tenantId: tenant1.id,
    },
  });

  // Create Branches for Tenant 2
  const branch3 = await prisma.branch.create({
    data: {
      name: 'Tech Hub',
      description: 'Innovation center',
      tenantId: tenant2.id,
    },
  });

  // Create Pictures
  const picture1 = await prisma.picture.create({
    data: {
      url: 'https://example.com/picture1.jpg',
      description: 'Profile picture for John Doe',
    },
  });

  const picture2 = await prisma.picture.create({
    data: {
      url: 'https://example.com/picture2.jpg',
      description: 'Profile picture for Jane Smith',
    },
  });

  // Create Users with Profiles
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash(`password${i}`, 10); // Hash the password

    // Create the user first
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        username: `username${i}`,
        password: hashedPassword, // Use the hashed password
        firstName: `User${i}`,
        lastName: `Last${i}`,
        tenantId: i <= 5 ? tenant1.id : tenant2.id, // First 5 users in Tenant 1, next 5 in Tenant 2
        branchId: i <= 5 ? branch1.id : branch3.id, // Assign users to branches
      },
    });

    // Create the profile and link it to the user and picture
    const profile = await prisma.profile.create({
      data: {
        bio: `Bio for User${i}`,
        picture: {
          connect: { id: i % 2 === 0 ? picture1.id : picture2.id }, // Alternate pictures
        },
        user: {
          connect: { id: user.id }, // Link the profile to the user
        },
      },
    });

    // Update the user with the profileId
    await prisma.user.update({
      where: { id: user.id },
      data: {
        profileId: profile.id, // Set the profileId in the User table
      },
    });

    users.push(user);
  }

  // Assign Users to Branches with Roles
  await prisma.userBranchRole.createMany({
    data: [
      // Tenant 1 - Branch 1 (Headquarters)
      { userId: users[0].id, branchId: branch1.id, roleId: adminRole.id },
      { userId: users[1].id, branchId: branch1.id, roleId: managerRole.id },
      { userId: users[2].id, branchId: branch1.id, roleId: userRole.id },

      // Tenant 1 - Branch 2 (Regional Office)
      { userId: users[3].id, branchId: branch2.id, roleId: managerRole.id },
      { userId: users[4].id, branchId: branch2.id, roleId: userRole.id },

      // Tenant 2 - Branch 3 (Tech Hub)
      { userId: users[5].id, branchId: branch3.id, roleId: adminRole.id },
      { userId: users[6].id, branchId: branch3.id, roleId: managerRole.id },
      { userId: users[7].id, branchId: branch3.id, roleId: userRole.id },
      { userId: users[8].id, branchId: branch3.id, roleId: userRole.id },
      { userId: users[9].id, branchId: branch3.id, roleId: userRole.id },
    ],
  });

  // Create Invitations
  await prisma.invitation.createMany({
    data: [
      {
        email: 'invite1@example.com',
        token: 'token1',
        branchId: branch1.id,
        tenantId: tenant1.id,
        status: 'PENDING',
      },
      {
        email: 'invite2@example.com',
        token: 'token2',
        branchId: branch2.id,
        tenantId: tenant1.id,
        status: 'PENDING',
      },
      {
        email: 'invite3@example.com',
        token: 'token3',
        branchId: branch3.id,
        tenantId: tenant2.id,
        status: 'PENDING',
      },
    ],
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
