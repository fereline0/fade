"use server";

import { prisma } from "@/app/_utils/prisma";
import {
  canCreateBanProcedure,
  canDeleteBanProcedure,
  canUpdateBanProcedure,
} from "./procedures";
import { createBanSchema, deleteBanSchema, updateBanSchema } from "./schemas";

export const createBan = canCreateBanProcedure
  .createServerAction()
  .input(createBanSchema)
  .handler(async ({ input }) => {
    await prisma.ban.create({
      data: {
        userId: input.userId,
        reason: input.reason,
        activity: input.activity,
        expires: input.expires,
        initiatorId: input.initiatorId,
      },
    });
  });

export const updateBan = canUpdateBanProcedure
  .createServerAction()
  .input(updateBanSchema)
  .handler(async ({ input }) => {
    await prisma.ban.update({
      where: {
        id: input.id,
      },
      data: {
        userId: input.userId,
        reason: input.reason,
        activity: input.activity,
        expires: input.expires,
        initiatorId: input.initiatorId,
      },
    });
  });

export const deleteBan = canDeleteBanProcedure
  .createServerAction()
  .input(deleteBanSchema)
  .handler(async ({ input }) => {
    await prisma.ban.delete({
      where: {
        id: input.id,
      },
    });
  });
