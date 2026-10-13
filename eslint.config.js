import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const SUPABASE_IMPORT_MESSAGE =
  "Only files in an api/ folder (and src/shared/lib/supabase.ts) may import the Supabase client.";

export default defineConfig([
  globalIgnores(["dist", "coverage"]),

  {
    files: ["**/*.{js,ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "@supabase/supabase-js", message: SUPABASE_IMPORT_MESSAGE },
          ],
        },
      ],
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Folder dependency rules from docs/engineering-guidelines.md.
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true, project: "./tsconfig.app.json" },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app", partialMatch: false },
        {
          type: "feature",
          pattern: "src/features/*",
          partialMatch: false,
          capture: ["featureName"],
        },
        { type: "shared", pattern: "src/shared", partialMatch: false },
        { type: "types", pattern: "src/types", partialMatch: false },
        { type: "styles", pattern: "src/styles", partialMatch: false },
      ],
      // Files that sit directly in src/ belong to no folder, so they are classified one by one.
      "boundaries/files": [
        { category: "entry", pattern: "src/main.tsx" },
        { category: "declaration", pattern: "src/*.d.ts" },
      ],
    },
    rules: {
      "boundaries/no-unknown-files": "error",
      "boundaries/no-unknown-dependencies": "error",
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { file: { categories: "entry" } },
              allow: {
                to: { element: { types: { anyOf: ["app", "styles"] } } },
              },
            },
            {
              from: { element: { type: "app" } },
              allow: {
                to: {
                  element: { types: { anyOf: ["shared", "types", "styles"] } },
                },
              },
            },
            {
              from: { element: { type: "feature" } },
              allow: {
                to: { element: { types: { anyOf: ["shared", "types"] } } },
              },
            },
            {
              from: { element: { type: "shared" } },
              allow: { to: { element: { type: "types" } } },
            },
            // A feature is only reachable from outside through its index.ts.
            {
              from: { element: { types: { anyOf: ["app", "feature"] } } },
              allow: {
                to: {
                  element: { type: "feature", fileInternalPath: "index.ts" },
                },
              },
            },
          ],
        },
      ],
    },
  },

  {
    files: ["src/**/api/**", "src/shared/lib/supabase.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },

  // Tools load their configuration from a default export.
  {
    files: ["*.config.{js,ts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-restricted-exports": "off",
    },
  },

  eslintConfigPrettier,
]);
