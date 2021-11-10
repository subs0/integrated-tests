import { CMD_WORK } from "@-0/keys";
import { stringify_fn } from "./stringify_fn";
const err_str = (name = "", comp = "", CMD = null) => CMD
    ? `
Warning: \`registerCMD\` \`${CMD_WORK}\` handler analysis

Computed property names prevent static analysis of args 
passed to your ${CMD_WORK} handler in this Command:

${stringify_fn(CMD, 2)}

This prevented us from prop checking inputs to the handler.
Consider using static destructured properties instead.
`
    : `
Warning: Complex Properties 

${name}({ ${comp} ...

Nested/computed properties prevent reliable static runtime 
analysis of function parameters against their incoming 
arguments. Consider using shallow & static destructuring.
`;
const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
const DST_BEG = /{/g;
const DST_END = /}/g;
const VALID_VAR = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/g;
export function get_shallow_static_destructured_params(func, CMD = null) {
    const fnStr = func.toString().replace(STRIP_COMMENTS, "");
    let results = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
    if (results === null)
        results = [];
    if (!results.length)
        return [];
    let idx_map = {};
    results.forEach((c, i) => {
        if (c.match(DST_BEG) && !idx_map["start"])
            return (idx_map["start"] = i);
        if (c.match(DST_END))
            return (idx_map["end"] = i);
    });
    if (!idx_map["end"])
        return [];
    const destructured = results.slice(idx_map["start"] + 1, idx_map["end"]);
    let done = [];
    let warned = false;
    destructured.forEach((c, i, d) => {
        if (c.match(/\]/g)) {
            d.splice(i + 1, 1);
            return;
        }
        if (c.match(VALID_VAR))
            return done.push(c);
        if (warned)
            return;
        console.warn(err_str(func.name, c, CMD));
        return (warned = true);
    });
    return done;
}
