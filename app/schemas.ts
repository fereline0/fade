import { z } from "zod";

export const abilitySchema = z.object({
  id: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.number().int(),
  color: z.string(),
  abilities: z.union([z.array(abilitySchema).optional(), z.null()]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
