import { get_param_names } from "../src"

const warned = (x = jest.fn()) => (jest.spyOn(console, "warn").mockImplementation(x), x)

describe("`get_param_names`:", () => {
    test("1: single destructured `function` object", () => {
        const _1 = function({ d, e, s }) {}
        expect(get_param_names(_1)).toMatchObject([ "d", "e", "s" ])
    })
    test("2: single destructured arrow function object", () => {
        const _2 = ({ d, e, s }) => {}
        expect(get_param_names(_2)).toMatchObject([ "d", "e", "s" ])
    })
    test("3: one destructured arg and one positional (arrow)", () => {
        const _3 = ({ d, e, s }, x) => {}
        expect(get_param_names(_3)).toMatchObject([ "d", "e", "s", "x" ])
    })
    test("4: two positional args", () => {
        const _4 = function(x, y) {}
        expect(get_param_names(_4)).toMatchObject([ "x", "y" ])
    })
    test("5: one destructured arg and one positional (`function`)", () => {
        const warn_spy = warned()
        const _5 = function({ d, e, s }, x) {}
        expect(get_param_names(_5)).toMatchObject([ "d", "e", "s", "x" ])
        expect(warn_spy.mock.calls.length).toBe(0)
    })
    test("6: Computed Property and positional", () => {
        //const warn_spy = warned()
        const _6 = ({ ["a" + "b"]: c, d }, x) => {}
        expect(get_param_names(_6)).toMatchObject([ "d", "x" ])
        //expect(warn_spy.mock.calls.length).toBe(1)
    })
    test("7: Computed Property with space", () => {
        const warn_spy = warned()
        const _7 = ({ [`comp `]: c, d }) => {}
        expect(get_param_names(_7)).toMatchObject([ "d" ])
        expect(warn_spy.mock.calls.length).toBe(1)
    })
    test("8: line breaks between destructured params", () => {
        // prettier-ignore
        const _8 = ({ 
            d, 
            e,
            s 
        }) => {}
        expect(get_param_names(_8)).toMatchObject([ "d", "e", "s" ])
    })
    test("9: destructured line breaks with inline comments", () => {
        // prettier-ignore
        const _9 = ({ 
            d, // with  
            e, // inline
            s // comments
        }) => {}
        expect(get_param_names(_9)).toMatchObject([ "d", "e", "s" ])
    })
    test("10: positional line breaks with comments", () => {
        // prettier-ignore
        const _10 = (
            // with comment above
            d, 
            e, 
            s 
        ) => {}
        expect(get_param_names(_10)).toMatchObject([ "d", "e", "s" ])
    })
    test("11: Computed properties &+ default values: total warnings = 1", () => {
        const warn_spy = warned()

        // prettier-ignore
        const _11 = ({ 
            // with comment above
            [`comp `]: c, // inline
            d,
            [`another` + "comp"]: w = "destructured",
            e
        }) => {}
        expect(get_param_names(_11)).toMatchObject([ "d", "e" ])
        expect(warn_spy.mock.calls.length).toBe(1)
    })
    test("12: Nested properties gets a warning", () => {
        const warn_spy = warned()

        // prettier-ignore
        const _11 = ({ 
            // with comment above
            c: {
                d // inline
            },
            e
        }) => {}
        expect(get_param_names(_11)).toMatchObject([ "d", "e" ])
        expect(warn_spy.mock.calls.length).toBe(1)
    })
    test("13: Single (default) parameter returns empty list", () => {
        const warn_spy = warned()
        // prettier-ignore
        expect(get_param_names((x) => x)).toMatchObject([])
        expect(get_param_names(x => x)).toMatchObject([])
        expect(warn_spy.mock.calls.length).toBe(0)
    })
})
