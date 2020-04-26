module.exports = {
  collectCoverageFrom: ["src/**/*.{ts, js}"],
  globals: {
      "ts-jest": {
          tsConfig: "test/tsconfig.json"
      }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/test/**/*.test.(ts)"],
  testEnvironment: "node"
};
