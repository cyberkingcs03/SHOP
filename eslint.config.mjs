import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
  // Apply rules to all JS files (Node.js environment with CommonJS)
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // CommonJS module system
      globals: globals.node,  // Add Node.js globals like __dirname, require
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Use ESLint recommended rules
    },
  },
  // Define global variables for browser code
  {
    files: ["**/*.js"], // Apply to all JavaScript files (could be browser or mixed)
    languageOptions: {
      globals: globals.browser, // Include browser globals like window, document
    },
  },
  // Add Jest plugin configuration for test files
  {
    files: ["**/*.test.js"], // Apply only to test files
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: globals.jest, // Include Jest globals like test, expect
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

