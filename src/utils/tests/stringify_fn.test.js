import { stringify_fn } from "../src/stringify_fn"
import { jest, expect, test, describe, beforeEach } from "@jest/globals"

// prettier-ignore
describe("stringify_fn", () => {
    test("1: handles simple arrow functions", () => 
        expect(stringify_fn(x => x + 1)).toMatch("x => x + 1..."))

    test("2: handles destructured arrow functions", () =>
        expect(stringify_fn(({ x }) => x + 1)).toMatch("({ x }) => x + 1..."))

    test("3: handles destructured arrow functions", () =>
        expect(stringify_fn(({ x }) => ({ x: x + 1 }))).toMatch("({ x }) => ({ x: x +..."))

    test("4: handles Objects with function values", () =>
        expect(stringify_fn({ key: ({ x }) => ({ x: x + 1 }) })).toMatch(`{"key":"({ x }) => ({ x: x +..."}`))

    test("5: handles Error Objects", () =>
        expect(stringify_fn({ key: new Error("bloop") })).toMatch(`{\"key\":{\"stack\":\"Error: bloop    at \",\"message\":\"bloop\"}}`))
})
