"use server";

import { prisma } from "@/app/_utils/prisma";
import {
  canCreateCommentProcedure,
  canDeleteCommentProcedure,
  canUpdateCommentProcedure,
} from "./procedures";
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "./schemas";

export const createComment = canCreateCommentProcedure
  .createServerAction()
  .input(createCommentSchema)
  .handler(async ({ input }) => {
    await prisma.comment.create({
      data: {
        value: input.value,
        userId: input.userId,
        published: input.published,
        writerId: input.writerId,
        parentId: input.parentId ?? null,
      },
    });
  });

export const updateComment = canUpdateCommentProcedure
  .createServerAction()
  .input(updateCommentSchema)
  .handler(async ({ input }) => {
    await prisma.comment.update({
      where: {
        id: input.id,
      },
      data: {
        value: input.value,
        userId: input.userId,
        published: input.published,
        parentId: input.parentId ?? null,
      },
    });
  });

export const deleteComment = canDeleteCommentProcedure
  .createServerAction()
  .input(deleteCommentSchema)
  .handler(async ({ input }) => {
    await prisma.comment.delete({
      where: {
        id: input.id,
      },
    });
  });
