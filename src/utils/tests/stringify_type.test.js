import { stringify_type } from "../lib/stringify_type"

// prettier-ignore
describe("stringify_type handles", () => {
    test("NULLARY fns", () => 
        expect(stringify_type(() => 1)).toBe("NULLARY"))
    test("UNARY fns", () => 
        expect(stringify_type(x => x + 1)).toBe("UNARY"))
    test("destructured UNARY fns", () => 
        expect(stringify_type(({ x, y }) => x + y + 1)).toBe("UNARY"))
    test("BINARY fns", () => 
        expect(stringify_type((x, y) => x + y)).toBe("BINARY"))
    test("N-ARY fns with > 2 args", () => 
        expect(stringify_type((x, y, z) => x + y + z)).toBe("N-ARY"))
    test("PROMISEs", () => 
        expect(stringify_type(new Promise((r, e) => r(1)))).toBe("PROMISE"))
    test("OBJECTs", () => 
        expect(stringify_type({ x: 1 })).toBe("OBJECT"))
    test("& type_str NOT FOUND for primitives", () => 
        expect(stringify_type(true)).toBe("type_str NOT FOUND"))
})
