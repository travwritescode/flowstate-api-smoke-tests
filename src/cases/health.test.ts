import { beforeAll, describe, expect, it } from "vitest";

import { getHealth } from "../api/health.js";
import { createAnonymousClient } from "../client.js";
import { loadEnv } from "../env.js";

describe("GET /health", () => {
  const env = loadEnv();
  let client: ReturnType<typeof createAnonymousClient>;

  beforeAll(() => {
    client = createAnonymousClient(env.API_BASE_URL);
  });

  it("returns ok", async () => {
    const body = await getHealth(client);
    expect(body.status).toBe("ok");
  });
});
