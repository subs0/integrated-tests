module.exports = {
    preset: "ts-jest", // "jest-playwright-preset",
    testEnvironment: "jest-environment-jsdom", //"jsdom", // "node",
    testMatch: [ "**/**/*.test.(js|ts|tsx)" ],
    //  moduleFileExtensions: ["js", "ts", "jsx", "tsx", "json", "node"],
    verbose: true,
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: [ "node_modules/?!(@-0)" ],
    watchPathIgnorePatterns: [ "^.+\\.repl.(ts|js)$" ]
}
