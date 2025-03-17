import { z } from "zod";

export const createBanSchema = z.object({
  userId: z.string(),
  reason: z.union([z.string().min(1).max(1024), z.null()]),
  activity: z.boolean(),
  expires: z.string(),
  initiatorId: z.string(),
});

export const canCreateBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});

export const updateBanSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  reason: z.union([z.string().min(1).max(1024), z.null()]).optional(),
  activity: z.boolean().optional(),
  expires: z.string().optional(),
  initiatorId: z.string().optional(),
});

export const canUpdateBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});

export const deleteBanSchema = z.object({
  id: z.string(),
});

export const canDeleteBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});
