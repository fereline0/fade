import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const abilities = [
    { slug: "updateUser" },
    { slug: "deleteUser" },
    { slug: "createBan" },
    { slug: "updateBan" },
    { slug: "deleteBan" },
    { slug: "updateComment" },
    { slug: "deleteComment" },
    { slug: "createRole" },
    { slug: "updateRole" },
    { slug: "deleteRole" },
  ];

  await prisma.ability.createMany({
    data: abilities,
    skipDuplicates: true,
  });

  await prisma.role.upsert({
    where: {
      name: "Admin",
    },
    update: {},
    create: {
      name: "Admin",
      position: 0,
      color: "#ff0000",
      abilities: {
        connect: abilities,
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "Moderator",
    },
    update: {},
    create: {
      name: "Moderator",
      position: 1,
      color: "#028a00",
      abilities: {
        connect: [
          { slug: "createBan" },
          { slug: "updateBan" },
          { slug: "deleteBan" },
          { slug: "updateComment" },
          { slug: "deleteComment" },
        ],
      },
    },
  });

  await prisma.role.upsert({
    where: {
      name: "User",
    },
    update: {},
    create: {
      name: "User",
      position: 2,
      color: "#d1d1d1",
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
