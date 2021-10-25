module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.(js|ts|tsx)"],
    verbose: true,
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            useESM: true,
        },
    },
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: ["node_modules/?!(@-0)"],
    watchPathIgnorePatterns: ["^.+\\.repl.(ts|js)$"],
};
