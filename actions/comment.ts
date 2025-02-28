"use server";

import { createServerAction } from "zsa";
import { prisma } from "@/utils/prisma";
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from "@/schemas/comment";

export const createComment = createServerAction()
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

export const updateComment = createServerAction()
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

export const deleteComment = createServerAction()
  .input(deleteCommentSchema)
  .handler(async ({ input }) => {
    await prisma.comment.delete({
      where: {
        id: input.id,
      },
    });
  });
