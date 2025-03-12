import { z } from "zod";

const createBanSchema = z.object({
  userId: z.string(),
  reason: z.union([z.string().min(1).max(1024), z.null()]),
  activity: z.boolean(),
  expires: z.string(),
  initiatorId: z.string(),
});

const canCreateBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});

const updateBanSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  reason: z.union([z.string().min(1).max(1024), z.null()]).optional(),
  activity: z.boolean().optional(),
  expires: z.string().optional(),
  initiatorId: z.string().optional(),
});

const canUpdateBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});

const deleteBanSchema = z.object({
  id: z.string(),
});

const canDeleteBanProcedureSchema = z.object({
  userRolePosition: z.number(),
});

export {
  createBanSchema,
  canCreateBanProcedureSchema,
  updateBanSchema,
  canUpdateBanProcedureSchema,
  deleteBanSchema,
  canDeleteBanProcedureSchema,
};
