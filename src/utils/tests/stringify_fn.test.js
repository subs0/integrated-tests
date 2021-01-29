import { stringify_fn } from "../lib/stringify_fn"

// prettier-ignore
describe("stringify_fn", () => {
    test("handles arrow functions", () => 
        expect(stringify_fn(x => x + 1)).toMatch("x => x + 1..."))
    test("handles arrow functions", () =>
        expect(stringify_fn(({ x }) => ({ x: x + 1 }))).toMatch("({ x }) => ({ x: x +..."))
    test("handles arrow functions", () =>
        expect(stringify_fn(({ x }) => x + 1)).toMatch("({ x }) => x + 1..."))
})
