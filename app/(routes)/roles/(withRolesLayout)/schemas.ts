import { z } from "zod";

export const canUpdateRolesPositionsProcedureSchema = z.object({
  roles: z.array(
    z.object({
      id: z.string(),
      position: z.number(),
    }),
  ),
});

export const deleteRoleSchema = z.object({
  id: z.string(),
});
