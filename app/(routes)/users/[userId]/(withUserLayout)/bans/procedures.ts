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
      const authedUserRole = user.role;

      if (
        !canCreateBan(
          userRolePosition,
          user.bans || [],
          authedUserRole?.position!,
          authedUserRole?.abilities || [],
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
      const authedUserRole = user.role;

      if (
        !canUpdateBan(
          userRolePosition,
          user.bans || [],
          authedUserRole?.position!,
          authedUserRole?.abilities || [],
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
      const authedUserRole = user.role;

      if (
        !canDeleteBan(
          userRolePosition,
          user.bans || [],
          authedUserRole?.position!,
          authedUserRole?.abilities || [],
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
