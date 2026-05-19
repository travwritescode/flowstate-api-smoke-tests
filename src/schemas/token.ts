import { z } from "zod";

export const tokenResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;
