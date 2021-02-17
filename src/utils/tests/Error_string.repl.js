import { isPlainObject, isFunction } from "@thi.ng/checks"
import { CMD_SUB$, CMD_ARGS, CMD_WORK, CMD_ERRO, CMD_RESO } from "@-0/keys"
import { stringify_fn } from "@-0/utils"

const missing_props_str = (CMD = "", required_props) => {
    const labeler = (obj = {}) =>
        Object.entries(obj).reduce((a, [ k, v ], i) => {
            if (v === undefined) return (a[k] = "undefined 🔥"), a
            if (isPlainObject(v)) return (a[k] = labeler(v)), a
            if (isFunction(v)) return (a[k] = stringify_fn(v)), a
            return (a[k] = v), a
        }, {})

    return `
Error: ${CMD} Command missing critical \`${CMD_ARGS}\`:

{
  ${CMD_SUB$}: ${CMD},
  ${CMD_ARGS}: ${JSON.stringify(labeler(required_props), null, 2)}
}

This Command's registered \`${CMD_WORK}\` handler failed.
    `
}

export const Err_missing_props = (CMD = "", required_props) => {
    return missing_props_str(CMD, required_props)
}
const obj = { a: "a", b: { b1: undefined, b2: "defined" }, c: ({ here }) => `I was ${here}` }

const result = Err_missing_props("TEST1", obj)
console.log({ result })
