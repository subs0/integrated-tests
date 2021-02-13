import { CMD_WORK } from "@-0/keys";
import { stringify_fn } from "./stringify_fn";
const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
const DESTRUCT = /{|}/g;
let err_str = (name = "", comp = "", CMD = null) => CMD
    ? `
🔥 Warning: \`registerCMD\` 🔥 

Computed property names prevent static analysis of args passed to 
your ${CMD_WORK} handler in this Command:

${stringify_fn(CMD, 2)}

This prevented us from prop checking inputs to the handler.
Consider using static destructured properties instead.
`
    : `
@-0/utls > \`get_param_names\`: ${name}({ ${comp} ...
Computed property names prevent static analysis of function
parameters. Consider using static destructuring instead
`;
export function get_param_names(func, CMD = null) {
    let warned = false;
    let fnStr = func.toString().replace(STRIP_COMMENTS, "");
    let result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    let computed = result.map(x => x.replace(DESTRUCT, "")).filter(x => x !== "");
    let done = [];
    computed.forEach((c, i, d) => {
        if (c.match(/\]/g)) {
            d.splice(i + 1, 1);
            return;
        }
        if (c.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/g)) {
            return done.push(c);
        }
        if (warned)
            return;
        console.warn(err_str(func.name, c, CMD));
        return (warned = true);
    });
    return done;
}
