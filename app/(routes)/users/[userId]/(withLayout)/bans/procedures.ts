import { createServerActionProcedure } from "zsa";
import { authedProcedure } from "@/app/_procedures/auth";
import { canCreateBan, canDeleteBan, canUpdateBan } from "./policies";

export const canCreateBanProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    if (!canCreateBan(user.role?.abilities || [], user.bans || [])) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);

export const canUpdateBanProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    if (!canUpdateBan(user.role?.abilities || [], user.bans || [])) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);

export const canDeleteBanProcedure = createServerActionProcedure(
  authedProcedure,
).handler(
  async ({
    ctx: {
      session,
      session: { user },
    },
  }) => {
    if (!canDeleteBan(user.role?.abilities || [], user.bans || [])) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);
