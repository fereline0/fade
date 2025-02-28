import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const abilities = [
    { slug: "editUser" },
    { slug: "deleteUser" },
    { slug: "createBan" },
    { slug: "editComment" },
    { slug: "deleteComment" },
  ];

  await prisma.ability.createMany({
    data: abilities,
    skipDuplicates: true,
  });

  await prisma.role.upsert({
    where: {
      name: "User",
    },
    update: {},
    create: {
      name: "User",
      position: 1,
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Moderator",
    },
    update: {},
    create: {
      name: "Moderator",
      position: 2,
      abilities: {
        connect: [{ slug: "deleteComment" }],
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Admin",
    },
    update: {},
    create: {
      name: "Admin",
      position: 3,
      abilities: {
        connect: [
          { slug: "editUser" },
          { slug: "createBan" },
          { slug: "editComment" },
          { slug: "deleteComment" },
        ],
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Developer",
    },
    update: {},
    create: {
      name: "Developer",
      position: 4,
      abilities: {
        connect: abilities,
      },
    },
  });
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
