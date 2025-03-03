"use server";

import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "@/app/_schemas/comment";
import { prisma } from "@/app/_utils/prisma";
import {
  canCreateCommentProcedure,
  canDeleteCommentProcedure,
  canUpdateCommentProcedure,
} from "./procedures";

export const createComment = canCreateCommentProcedure
  .createServerAction()
  .input(createCommentSchema)
  .handler(async ({ input }) => {
    await prisma.comment.create({
      data: {
        value: input.value as string,
        userId: input.userId as string,
        published: input.published,
        writerId: input.writerId as string,
        parentId: (input.parentId as string) ?? null,
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
        value: input.value as string,
        userId: input.userId as string,
        published: input.published,
        parentId: (input.parentId as string) ?? null,
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
