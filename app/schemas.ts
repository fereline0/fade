import { z } from "zod";

export const abilitySchema = z.object({
  id: z.string(),
  slug: z.string(),
});
