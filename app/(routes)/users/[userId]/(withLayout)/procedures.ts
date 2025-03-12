import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import {
  canDeleteCommentProcedureSchema,
  canUpdateCommentProcedureSchema,
} from "./schemas";
import {
  canCreateComment,
  canDeleteComment,
  canUpdateComment,
} from "./policies";

export const canCreateCommentProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    if (!canCreateComment(user.bans || [])) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);

export const canUpdateCommentProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateCommentProcedureSchema)
  .handler(
    async ({
      input,
      input: { writerId, writerRolePosition },
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canUpdateComment(
          writerId,
          writerRolePosition,
          user.id,
          user.role?.position || -Infinity,
          user.role?.abilities || [],
          user.bans || [],
        )
      ) {
        throw new Error("UNAUTHORIZED");
      }

      return {
        input,
        session,
      };
    },
  );

export const canDeleteCommentProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canDeleteCommentProcedureSchema)
  .handler(
    async ({
      input,
      input: { writerId, writerRolePosition },
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canDeleteComment(
          writerId,
          writerRolePosition,
          user.id,
          user.role?.position || -Infinity,
          user.role?.abilities || [],
          user.bans || [],
        )
      ) {
        throw new Error("UNAUTHORIZED");
      }

      return {
        input,
        session,
      };
    },
  );
