import { stringify_type } from "../src/stringify_type"

// prettier-ignore
describe("stringify_type handles", () => {
    test("1: NULLARY fns"                , () => expect(stringify_type(() => 1))                           .toBe("NULLARY"))
    test("2: UNARY fns"                  , () => expect(stringify_type(x => x + 1))                        .toBe("UNARY"))
    test("3: UNARY destructured fns"     , () => expect(stringify_type(({ x, y }) => x + y + 1))           .toBe("UNARY"))
    test("4: BINARY fns"                 , () => expect(stringify_type((x, y) => x + y))                   .toBe("BINARY"))
    test("5: N-ARY fns with > 2 args"    , () => expect(stringify_type((x, y, z) => x + y + z))            .toBe("N-ARY"))
    test("6: PROMISEs"                   , () => expect(stringify_type(new Promise((r, e) => r(1))))       .toBe("PROMISE"))
    test("7: awaits returned as PROMISEs", () => expect(stringify_type((async x => { await x })("called"))).toBe("PROMISE"))
    test("8: OBJECTs"                    , () => expect(stringify_type({ x: 1 }))                          .toBe("OBJECT"))
    test("9: PRIMITIVEs: boolean"        , () => expect(stringify_type(true))                              .toBe("PRIMITIVE"))
    test("10: PRIMITIVEs: null"          , () => expect(stringify_type(null))                              .toBe("PRIMITIVE"))
    test("11: PRIMITIVEs: Numbers"       , () => expect(stringify_type(0))                                 .toBe("PRIMITIVE"))
    test("12: PRIMITIVEs: Strings"       , () => expect(stringify_type("hello"))                           .toBe("PRIMITIVE"))
    test("13: UNKNOWN"                   , () => expect(stringify_type(undefined))                         .toBe("UNKNOWN"))
})
