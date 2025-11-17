/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@environments/(.*)$": "<rootDir>/src/environments/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
    },
  },
};

module.exports = config;
