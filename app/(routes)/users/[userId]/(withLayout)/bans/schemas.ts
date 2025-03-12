import { z } from "zod";

const createBanSchema = z.object({
  userId: z.string(),
  reason: z.union([z.string().min(1).max(1024), z.null()]),
  activity: z.boolean(),
  expires: z.string(),
  initiatorId: z.string(),
});

const updateBanSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  reason: z.union([z.string().min(1).max(1024), z.null()]).optional(),
  activity: z.boolean().optional(),
  expires: z.string().optional(),
  initiatorId: z.string().optional(),
});

const deleteBanSchema = z.object({
  id: z.string(),
});

export { updateBanSchema, deleteBanSchema, createBanSchema };
