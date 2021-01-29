import { diff_keys } from "../lib/diff_keys"

// prettier-ignore
describe("diff_keys", () => {
    test("returns diff as a tuple of [[ keys ], { ks: vs }]", 
        () => expect(diff_keys([ "a", "b" ], { a: 1, b: 2, c: 3, d: 4 })).toMatchObject([
            [ "c", "d" ],
            { c: 3, d: 4 }
        ]))
})
