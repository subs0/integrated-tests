import { CMD_SUB$, CMD_ARGS, CMD_WORK, CMD_ERRO, CMD_RESO } from "@-0/keys"
import { stringify_fn } from "@-0/utils"

const missing_props_str = (CMD = "", args, ...props) => {
    const missing = props.map(x => `    ${x}: 🔥`).join(",\n")
    return `
Error: ${CMD} Command missing critical \`${CMD_ARGS}\`:

{ ...,
  ${CMD_SUB$}: ${CMD},
  ${CMD_ARGS}: {
${missing}
  }
}

This Command's registered \`${CMD_WORK}\` handler failed.

Here were the supplied \`${CMD_ARGS}\`:
${stringify_fn(args, 2)}
    `
}

export const missing_prop_list = (obj = {}) => {
    return Object.entries(obj).map(([ k, v ]) => (v ? k : null)).filter(x => x !== null)
}

export const Err_missing_props = (CMD = "", obj = {}, args = {}) => {
    return missing_props_str(CMD, args, ...missing_prop_list(obj))
}
