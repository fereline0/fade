import { createServerActionProcedure } from "zsa";
import { can, findActiveBan } from "@/app/_utils/user";
import {
  canDeleteCommentProcedureSchema,
  canUpdateCommentProcedureSchema,
} from "@/app/_schemas/comment";
import { authedProcedure } from "@/app/_procedures/auth";

export const canCreateCommentProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    if (findActiveBan(user.bans)) {
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
        findActiveBan(user.bans) &&
        (input.writerId === user.id ||
          can(user.role?.abilities || [], "editComment"))
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
        findActiveBan(user.bans) &&
        (input.writerId === user.id ||
          can(user.role?.abilities || [], "deleteComment"))
      ) {
        throw new Error("UNAUTHORIZED");
      }

      return {
        session,
      };
    },
  );
