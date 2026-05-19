import { defineConfig } from "vitest/dist/config.js";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/cases/**/*.test.ts"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
