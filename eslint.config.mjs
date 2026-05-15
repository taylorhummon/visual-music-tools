import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }],
    },
  },
  {
    files: ["tests/**/*.test.ts", "tests/**/*.test.tsx"], // Target test files
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
