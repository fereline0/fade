"use server";

import { prisma } from "@/app/_utils/prisma";
import { canUpdateRolesProcedure } from "./procedures";

export const updateRolesPositions = canUpdateRolesProcedure
  .createServerAction()
  .handler(
    async ({
      ctx: {
        input: { roles },
      },
    }) => {
      await prisma.$transaction(
        roles.map(({ id, ...role }) =>
          prisma.role.update({
            where: { id },
            data: {
              position: role.position,
            },
          }),
        ),
      );
    },
  );
