import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
