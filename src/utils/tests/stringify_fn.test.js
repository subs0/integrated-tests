import { stringify_fn } from "../src/stringify_fn"

// prettier-ignore
describe("stringify_fn", () => {
    test("handles simple arrow functions", () => 
        expect(stringify_fn(x => x + 1)).toMatch("x => x + 1..."))

    test("handles destructured arrow functions", () =>
        expect(stringify_fn(({ x }) => x + 1)).toMatch("({ x }) => x + 1..."))

    test("handles destructured arrow functions", () =>
        expect(stringify_fn(({ x }) => ({ x: x + 1 }))).toMatch("({ x }) => ({ x: x +..."))

    test("handles Objects with function values", () =>
        expect(stringify_fn({ key: ({ x }) => ({ x: x + 1 }) })).toMatch(`{"key":"({ x }) => ({ x: x +..."}`))
})
