import { abilitySchema } from "@/app/_schemas/abilitySchema";
import { z } from "zod";

export const canUpdateRoleProcedureSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(128),
  position: z.number().int(),
  color: z.string().min(4).max(9),
  abilities: z.array(abilitySchema),
});
