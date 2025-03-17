"use server";

import { prisma } from "@/app/_utils/prisma";
import { canUpdateRolesPositionsProcedure } from "./procedures";

export const updateRolesPositions = canUpdateRolesPositionsProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    await prisma.$transaction(
      ctx.input.roles.map(({ id, ...role }) =>
        prisma.role.update({
          where: { id },
          data: {
            position: role.position,
          },
        }),
      ),
    );
  });
