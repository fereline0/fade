import { roleSchema } from "@/app/schemas";
import { z } from "zod";

export const canUpdateRolesPositionsProcedureSchema = z.object({
  roles: z.array(roleSchema),
});

export const deleteRoleSchema = z.object({
  id: z.string(),
});
