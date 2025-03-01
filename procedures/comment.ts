import { createServerActionProcedure } from "zsa";
import {
  canDeleteCommentProcedureSchema,
  canUpdateCommentProcedureSchema,
} from "@/schemas/comment";
import { canDelete, canEdit } from "@/policies/comment";
import { authedProcedure } from "@/procedures/auth";

export const canUpdateCommentProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateCommentProcedureSchema)
  .handler(async ({ input, ctx }) => {
    const { session } = ctx;

    if (
      session?.user.id &&
      !canEdit(
        session.user.id,
        input.writerId,
        session.user.role?.abilities || [],
      )
    ) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  });

export const canDeleteCommentProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canDeleteCommentProcedureSchema)
  .handler(async ({ input, ctx }) => {
    const { session } = ctx;

    if (
      session?.user.id &&
      !canDelete(
        session.user.id,
        input.writerId,
        session.user.role?.abilities || [],
      )
    ) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  });
