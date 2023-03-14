module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "node_modules/(?!(react-dotenv)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/tests/components/AuthButton.test.tsx"],
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts(x)?", "!src/**/*.stories.tsx"],
  coverageReporters: ["lcov", "json"],

  modulePaths: ["<rootDir>/src/"],

  testMatch: ["**/*.spec.tsx"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },

  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },

  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
