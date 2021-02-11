import { DOM_NODE, URL_FULL, URL_PATH, CMD_SUB$, CMD_ARGS, CMD_WORK, CMD_ERRO } from "@-0/keys"

const Err_missing_props = (CMD, ...props) => {
    const missing = props.map(x => `- No ${x} prop found`).join("\n") + `\n`
    return `
Error: Missing critical ${CMD} Command \`${CMD_ARGS}\`:
${missing}
    `
}

Err_missing_props("TEST", DOM_NODE) //?
Err_missing_props("TEST2", DOM_NODE, URL_FULL) //?

let test = {
    [CMD_SUB$] : "_SET_LINK_ATTRS_DOM",
    [CMD_ARGS] : ({ [DOM_NODE]: NODE }) => ({ [DOM_NODE]: NODE }),
    [CMD_WORK] : ({ [DOM_NODE]: NODE }) => {
        if (NODE) return setLinkAttrs(NODE)
        console.warn(Err_missing_props(JSON.stringify(this), DOM_NODE))
    }
}

test[CMD_WORK]({}) //?
