import { Err_missing_props } from "../src"

const expected_string = `
Error: TEST1 Command missing critical \`args\`:

{
  sub$: TEST1,
  args: {
  "a": "a",
  "b": {
    "b1": "undefined <---------------------🔥",
    "b2": "defined"
  },
  "c": "\\"({ here }) => \`I was...\\"",
  "d": {
    "is": {
      "property": "undefined <-------------🔥"
    }
  }
}
}

This Command's registered \`work\` handler failed.
`
describe("Err_missing_props", () => {
    test("Nested Objects with undefined values", () => {
        const obj = {
            a : "a",
            b : { b1: undefined, b2: "defined" },
            c : ({ here }) => `I was ${here}`,
            d : { is: { property: undefined } }
        }

        const result = Err_missing_props("TEST1", obj)

        expect(result).toBe(expected_string)
    })
})
