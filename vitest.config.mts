import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    dir: "tests",
    setupFiles: ["vitest.setup.ts"],
    execArgv: [
      '--no-webstorage',
    ],
  },
})
