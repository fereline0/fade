import { z } from "zod";

const canUpdateRolesProcedureSchema = z.object({
  roles: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(1024),
      position: z.number(),
    }),
  ),
});

const deleteRoleSchema = z.object({
  id: z.string(),
});

export { canUpdateRolesProcedureSchema, deleteRoleSchema };
