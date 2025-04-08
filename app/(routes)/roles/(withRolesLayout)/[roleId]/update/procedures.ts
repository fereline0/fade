import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import { canUpdateRole } from "../../policies";
import { canUpdateRoleProcedureSchema } from "./schemas";

export const canUpdateRoleProcedure = createServerActionProcedure(
  authedProcedure,
)
  .input(canUpdateRoleProcedureSchema)
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
        !canUpdateRole(
          user.bans || [],
          authedUserRole?.abilities || [],
          authedUserRole?.position!,
          input.position,
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
