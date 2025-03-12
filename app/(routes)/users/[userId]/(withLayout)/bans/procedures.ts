import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import { canCreateBan, canDeleteBan, canUpdateBan } from "./policies";
import {
  canCreateBanProcedureSchema,
  canDeleteBanProcedureSchema,
  canUpdateBanProcedureSchema,
} from "./schemas";

export const canCreateBanProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canCreateBanProcedureSchema)
  .handler(
    async ({
      input,
      input: { userRolePosition },
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canCreateBan(
          userRolePosition,
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

export const canUpdateBanProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateBanProcedureSchema)
  .handler(
    async ({
      input,
      input: { userRolePosition },
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canUpdateBan(
          userRolePosition,
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

export const canDeleteBanProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canDeleteBanProcedureSchema)
  .handler(
    async ({
      input,
      input: { userRolePosition },
      ctx: {
        session,
        session: { user },
      },
    }) => {
      if (
        !canDeleteBan(
          userRolePosition,
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
