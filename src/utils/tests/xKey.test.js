import { key_index_err, xKeyError } from "../src/xKey"

const CMD = {
    sub$ : "_ERROR",
    args : new Error("from _ERROR"),
    erro : (acc, res) => null,
    work : x => console.error("Huge mistake:", x)
}

describe("key_index_err", () => {
    test("helper text: locate the erroneous Command", () =>
        expect(key_index_err(CMD, 1)).toBe(
            "🔍 it was the 2nd Command in a Task or 1st in a Subtask."
        ))
})

describe("xKeyError", () => {
    test("helper text: unrecognized key within a Command", () =>
        expect(xKeyError("funky", CMD, { a: 1, b: 2 }, "MY_CMD", 2)).toBe(`
🔥 funky ERROR:

🔥 Unrecognized Command Key(s)

FAULTY sub$: "MY_CMD"

🔍 it was the 3rd Command in a Task or 2nd in a Subtask.

The problematic entry/entries:

🤔 {
  "a": 1,
  "b": 2
} 🤔

ACCEPTABLE ENTRY KEYS WITHIN A COMMAND:

'sub$'
- optional
- topic key for for registering & targeting Commands

'args'
- required
- payload or accumulator reshaping payload function (Promises OK)
- allowed values:
  - true/1/"a" : Primitive: static payload is _not_ accumulated
  - {...}      : Object: static payload _is_ accumulated
  - (1) =>     : Unary function (non-nullary): accepts accumulator
  - (0) =>     : Nullary function: dispatch to custom stream (advanced)
  - { P }      : Promise or (#) => { P } Promise returning function

'reso'
- required for Promise handling
- converts resolved Promise payloads to Command args
- signature: ({ accumulator }, { resolved value }) =>

'erro'
- recommended for Promise rejections
- handles rejected Promise payloads
- signature: ({ accumulator }, { error object }) =>


Hope that helps!
`))
})
