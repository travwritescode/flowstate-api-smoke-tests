import type { KyInstance } from "ky";

import { healthResponseSchema, type HealthResponse } from "../schemas/health.js";

export async function getHealth(client: KyInstance): Promise<HealthResponse> {
  const raw: unknown = await client.get("health").json();
  return healthResponseSchema.parse(raw);
}
