import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/_procedures/auth";
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
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canUpdateComment(
          input.writerId,
          user.id,
          user.role?.abilities || [],
          user.bans || [],
        )
      ) {
        throw new Error("UNAUTHORIZED");
      }

      return {
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
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canDeleteComment(
          input.writerId,
          user.id,
          user.role?.abilities || [],
          user.bans || [],
        )
      ) {
        throw new Error("UNAUTHORIZED");
      }

      return {
        session,
      };
    },
  );
