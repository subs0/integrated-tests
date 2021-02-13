let STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
let ARGUMENT_NAMES = /([^\s,]+)/g;
let err_str = (name = "", comp = "") => `
@-0/utls > \`get_param_names\`: ${name}({ ${comp} })
Computed property names prevent static analysis of function
parameters. Consider using static destructuring instead

`;
export function get_param_names(func) {
    let fnStr = func.toString().replace(STRIP_COMMENTS, "");
    let result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    let computed = result.map(x => x.replace(/{|}/g, "")).filter(x => x !== "");
    let done = [];
    let warned = false;
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
        console.log(err_str(func.name, c));
        return (warned = true);
    });
    return done;
}
