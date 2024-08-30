/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  setupFiles: ["./jest.setup.js"],
  preset: "ts-jest",
  testEnvironment: "node",
  detectOpenHandles: true,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
