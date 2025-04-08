import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/procedures";
import { canCreateRole } from "../policies";

export const canCreateRoleProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    const authedUserRole = user.role;

    if (!canCreateRole(user.bans || [], authedUserRole?.abilities || [])) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);
