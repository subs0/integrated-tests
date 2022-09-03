module.exports = {
    preset: "@babel/preset-env",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.(js|ts|tsx)"],
    verbose: true,
    transform: {
        "\\.[jt]sx?$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: ["node_modules/?!(@-0)"],
    watchPathIgnorePatterns: ["^.+\\.repl.(ts|js)$"],
}
