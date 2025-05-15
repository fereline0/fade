import { abilitySchema } from "@/app/_schemas/abilitySchema";
import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1).max(128),
  color: z.string().min(4).max(9),
  abilities: z.array(abilitySchema),
});
