import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: [".astro/**", "dist/**", "node_modules/**"],
  },
  eslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  eslintConfigPrettier,
];
