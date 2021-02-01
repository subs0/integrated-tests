import { stringify_type } from "../src/stringify_type"

// prettier-ignore
describe("stringify_type handles", () => {
    test("NULLARY fns", () => 
        expect(stringify_type(() => 1)).toBe("NULLARY"))

    test("UNARY fns", () => 
        expect(stringify_type(x => x + 1)).toBe("UNARY"))

    test("UNARY destructured fns", () => 
        expect(stringify_type(({ x, y }) => x + y + 1)).toBe("UNARY"))

    test("BINARY fns", () => 
        expect(stringify_type((x, y) => x + y)).toBe("BINARY"))

    test("N-ARY fns with > 2 args", () => 
        expect(stringify_type((x, y, z) => x + y + z)).toBe("N-ARY"))

    test("PROMISEs", () => 
        expect(stringify_type(new Promise((r, e) => r(1)))).toBe("PROMISE"))

    test("awaits returned as PROMISEs", () => 
        expect(stringify_type((async x => { await x })("called"))).toBe("PROMISE"))

    test("OBJECTs", () => 
        expect(stringify_type({ x: 1 })).toBe("OBJECT"))

    test("PRIMITIVEs: boolean", () => 
        expect(stringify_type(true)).toBe("PRIMITIVE"))

    test("PRIMITIVEs: null", () => 
        expect(stringify_type(null)).toBe("PRIMITIVE"))
    
    test("PRIMITIVEs: Numbers", () => 
        expect(stringify_type(0)).toBe("PRIMITIVE"))

    test("PRIMITIVEs: Strings", () => 
        expect(stringify_type("hello")).toBe("PRIMITIVE"))

    test("UNDEFINED", () => 
        expect(stringify_type(undefined)).toBe("UNDEFINED"))
})
