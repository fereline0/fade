"use server";

import { prisma } from "@/app/_utils/prisma";
import { createRoleSchema } from "./schemas";
import { canCreateRoleProcedure } from "./procedures";

export const createRole = canCreateRoleProcedure
  .createServerAction()
  .input(createRoleSchema)
  .handler(async ({ input: { name, color, abilities } }) => {
    await prisma.$transaction(async (tx) => {
      const maxPositionRole = await tx.role.findFirstOrThrow({
        orderBy: {
          position: "desc",
        },
      });

      await tx.role.create({
        data: {
          name,
          position: ++maxPositionRole.position,
          color,
          abilities: {
            connect: abilities,
          },
        },
      });
    });
  });
