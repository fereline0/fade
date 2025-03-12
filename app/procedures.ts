import { createServerActionProcedure } from "zsa";
import { auth } from "@/auth";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    const session = await auth();

    if (!session?.user) {
      throw new Error("UNAUTHORIZED");
    }

    return {
      session,
    };
  },
);
