import { z } from "zod";

const createCommentSchema = z.object({
  value: z.string().min(1).max(1024),
  userId: z.string(),
  published: z.boolean(),
  writerId: z.string().optional(),
  parentId: z.string().optional(),
});

const updateCommentSchema = z.object({
  id: z.string(),
  value: z.string().min(1).max(1024).optional(),
  userId: z.string().optional(),
  published: z.boolean().optional(),
  writerId: z.string().optional(),
  parentId: z.string().optional(),
});

const deleteCommentSchema = z.object({
  id: z.string(),
});

export { createCommentSchema, updateCommentSchema, deleteCommentSchema };
