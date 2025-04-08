import { roleSchema } from "@/app/schemas/roleSchema";
import { z } from "zod";

export const canUpdateRolesProcedureSchema = z.object({
  roles: z.array(roleSchema),
});

export const deleteRoleSchema = z.object({
  id: z.string(),
});
