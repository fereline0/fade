"use server";

import { prisma } from "@/app/_utils/prisma";
import { canUpdateRoleProcedure } from "./procedures";

export const updateRoles = canUpdateRoleProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    await prisma.$transaction(
      ctx.input.roles.map(({ id, ...role }) =>
        prisma.role.update({
          where: { id },
          data: role,
        }),
      ),
    );
  });
