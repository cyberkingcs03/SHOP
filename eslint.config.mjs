import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
  // Apply rules to all JS files with CommonJS support
  {
    files: ["**/*.js"],
    languageOptions: { 
      sourceType: "commonjs", // Use CommonJS module system
      globals: globals.node,  // Enable Node.js globals like `__dirname`, `require`, etc.
    },
    rules: {
      "no-undef": "off", // Disable `no-undef` rule to avoid issues with Node.js globals
    },
  },
  // Define global variables for browser code (if you have frontend code as well)
  {
    languageOptions: { globals: globals.browser },
  },
  // Use recommended ESLint rules
  pluginJs.configs.recommended,
  // Add Jest plugin configuration for test files
  {
    files: ["**/*.test.js"], // Apply only to test files
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: globals.jest, // Define Jest globals like `test` and `expect`
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];

