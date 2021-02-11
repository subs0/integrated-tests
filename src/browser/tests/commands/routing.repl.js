import { DOM_NODE, URL_FULL, URL_PATH, CMD_SUB$, CMD_ARGS, CMD_WORK, CMD_ERRO } from "@-0/keys"

const Err_missing_props = (CMD, ...props) => {
    const missing = props.map(x => `    ${x}: 🔥`).join(",\n")
    return `
Error: ${CMD} Command missing critical \`${CMD_ARGS}\`:
{ ...,
  ${CMD_ARGS}: {
${missing}
  }
}
This Command's registered \`${CMD_WORK}\` handler failed 
    `
}

const check_prereqs = (obj = {}) => Object.entries(obj).map(([ k, v ]) => (v ? k : null)).filter(x => x !== null)

let test_obj1 = {
    key : "val",
    ke2 : undefined
}

export const Err_missing_prereqs = (CMD = "", obj = {}) => Err_missing_props(CMD, ...check_prereqs(obj))

check_prereqs(test_obj1) //?

Err_missing_prereqs("HELLO", test_obj1) //?

Err_missing_props("TEST", DOM_NODE) //?
Err_missing_props("TEST2", DOM_NODE, URL_FULL, CMD_ARGS) //?

let test = {
    [CMD_SUB$] : "_SET_LINK_ATTRS_DOM",
    [CMD_ARGS] : ({ [DOM_NODE]: NODE }) => ({ [DOM_NODE]: NODE }),
    [CMD_WORK] : ({ [DOM_NODE]: NODE }) => {
        if (NODE) return setLinkAttrs(NODE)
        console.warn(Err_missing_props("_SET_LINK_ATTRS_DOM", DOM_NODE))
    }
}

test[CMD_WORK]({ a: 1 }) //?
