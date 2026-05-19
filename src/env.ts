import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

const envSchema = z.object({
  API_BASE_URL: z
    .string()
    .url()
    .transform((url) => url.replace(/\/$/, "")),
});

export type Env = z.infer<typeof envSchema>;

function resolvedApiBaseUrl(override?: string): string {
  const raw = (override ?? process.env.API_BASE_URL ?? "").trim();
  if (raw === "") {
    return "http://127.0.0.1:8000";
  }
  return raw;
}

export function loadEnv(overrides?: { API_BASE_URL?: string }): Env {
  return envSchema.parse({
    API_BASE_URL: resolvedApiBaseUrl(overrides?.API_BASE_URL),
  });
}
