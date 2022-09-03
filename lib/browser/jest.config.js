module.exports = {
    preset: "@babel/preset-env",
    testEnvironment: "jsdom",
    testMatch: ["**/**/*.test.(js|ts|tsx)"],
    verbose: true,
    transform: {
        "\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["node_modules/?!(@-0)"],
    watchPathIgnorePatterns: ["^.+\\.repl.(ts|js)$"],
}
