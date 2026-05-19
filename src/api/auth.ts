import type { KyInstance } from "ky";

import { tokenResponseSchema, type TokenResponse } from "../schemas/token.js";
import { userResponseSchema, type UserResponse } from "../schemas/user.js";

export type RegisterInput = { email: string; password: string };

export async function registerUser(
  client: KyInstance,
  input: RegisterInput
): Promise<UserResponse> {
  const raw: unknown = await client.post("auth/register", { json: input }).json();
  return userResponseSchema.parse(raw);
}

export async function login(
  client: KyInstance,
  email: string,
  password: string
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    username: email,
    password,
  });
  const raw: unknown = await client.post("auth/login", { body }).json();
  return tokenResponseSchema.parse(raw);
}
