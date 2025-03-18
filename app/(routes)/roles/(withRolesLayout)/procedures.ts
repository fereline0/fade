import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import { canUpdateRoles } from "./policies";
import { canUpdateRolesPositionsProcedureSchema } from "./schemas";

export const canUpdateRolesPositionsProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateRolesPositionsProcedureSchema)
  .handler(
    async ({
      input,
      ctx: {
        session,
        session: { user },
      },
    }) => {
      const authedUserRole = user.role;

      if (
        !canUpdateRoles(
          user.bans || [],
          authedUserRole?.abilities || [],
          authedUserRole?.position!,
          input.roles,
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
