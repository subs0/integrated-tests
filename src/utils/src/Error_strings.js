import { isPlainObject, isFunction } from "@thi.ng/checks"
import { CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys"
import { stringify_fn } from "@-0/utils"

const missing_props_str = (CMD = "", required_props) => {
    const labeler = (obj = {}, depth = 0) =>
        Object.entries(obj).reduce((a, [k, v]) => {
            // prettier-ignore
            const len = Math.abs(25 - ((depth * 2) + k.length))
            const err = `undefined <${"-".repeat(len)}🔥`
            if (v === undefined) return (a[k] = err), a
            if (isPlainObject(v)) return (a[k] = labeler(v, depth + 1)), a
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
