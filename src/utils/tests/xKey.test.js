import { key_index_err, xKeyError } from "../src/xKey"

import { CMD_SUB$, CMD_ARGS, CMD_ERRO, CMD_RESO, CMD_SRC$, CMD_WORK } from "@-0/keys"

const CMD = {
    [CMD_SUB$] : "_ERROR",
    [CMD_ARGS] : new Error("from _ERROR"),
    [CMD_ERRO] : (acc, res) => null,
    [CMD_WORK] : x => console.error("Huge mistake:", x)
}

describe("key_index_err", () => {
    test("1: helper text: locate the erroneous Command", () =>
        expect(key_index_err(CMD, 1)).toBe(">> it was the 2nd Command in a Task or 1st in a Subtask."))
})

describe("xKeyError", () => {
    test("1: helper text: unrecognized key within a Command", () =>
        expect(xKeyError("funky", CMD, { a: 1, b: 2 }, 2)).toBe(`
funky

🔥 Unrecognized Props 🔥

{
    "sub$": "_ERROR",
    "args": {
        "stack": "Error: from _ERROR ",
        "message": "from _ERROR"
    },
    "erro": "(acc, res) => null...",
    "work": "x => console.error(\\"..."
}

>> it was the 3rd Command in a Task or 2nd in a Subtask.

The problematic entry/entries:

{
  "a": 1,
  "b": 2
}


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
