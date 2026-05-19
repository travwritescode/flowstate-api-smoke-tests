import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);
export const taskPrioritySchema = z.enum(["low", "medium", "high"]);

export const taskResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_date: z.string().nullable(),
  owner_id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type TaskResponse = z.infer<typeof taskResponseSchema>;

export const taskCreateBodySchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  due_date: z.string().optional().nullable(),
});

export type TaskCreateBody = z.infer<typeof taskCreateBodySchema>;
