import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/_procedures/auth";
import { canUpdateRole } from "./policies";
import { canUpdateRolesProcedureSchema } from "./schemas";

export const canUpdateRoleProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateRolesProcedureSchema)
  .handler(
    async ({
      input,
      ctx: {
        session,
        session: { user },
      },
    }) => {
      const authedUserRole = user.role;

      input.roles.forEach((role) => {
        if (
          !canUpdateRole(
            authedUserRole?.abilities || [],
            user.bans || [],
            authedUserRole?.position || -Infinity,
            role.position || Infinity,
          )
        ) {
          throw new Error("UNAUTHORIZED");
        }
      });

      return {
        input,
        session,
      };
    },
  );
