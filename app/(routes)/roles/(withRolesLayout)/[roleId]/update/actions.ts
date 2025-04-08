"use server";

import { prisma } from "@/app/_utils/prisma";
import { canUpdateRoleProcedure } from "./procedures";

export const updateRole = canUpdateRoleProcedure.createServerAction().handler(
  async ({
    ctx: {
      input: { id, name, color, abilities },
    },
  }) => {
    await prisma.role.update({
      where: { id },
      data: {
        name,
        color,
        abilities: {
          connect: abilities,
        },
      },
    });
  },
);
