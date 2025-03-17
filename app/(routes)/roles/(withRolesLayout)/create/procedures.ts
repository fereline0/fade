import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import { canUpdateRolesPositions } from "./policies";
import { canUpdateRolesPositionsProcedureSchema } from "../schemas";

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

      input.roles.forEach((role) => {
        if (
          !canUpdateRolesPositions(
            authedUserRole?.abilities || [],
            user.bans || [],
            authedUserRole?.position!,
            role.position,
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
