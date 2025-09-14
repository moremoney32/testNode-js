import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.ts"],
};

export default config;
