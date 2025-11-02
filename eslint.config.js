// @ts-check
import vitest from "@vitest/eslint-plugin";
// @ts-expect-error: Missing types
import nextVitals from "eslint-config-next/core-web-vitals";
// @ts-expect-error: Missing types
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  tseslint.configs.recommendedTypeChecked,
  nextVitals,
  nextTs,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // Disable hooks rules outside of React files
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: ["test/vitest/**/*.ts"],
    ...vitest.configs.recommended,
  },
  globalIgnores([
    ".github/**",
    ".makefiles/**",
    "artifacts/**",
    "next-env.d.ts",
  ]),
]);
