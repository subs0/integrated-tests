import { CMD_SUB$, CMD_ARGS, CMD_ERRO, CMD_RESO, CMD_SRC$, CMD_WORK } from "@-0/keys";
import { stringify_fn } from "./stringify_fn";
export const key_index_err = (c, i) => {
    const idx_dict0 = Array.from(Array(19).keys()).reduce((a, idx) => (Object.assign(Object.assign({}, a), { [idx]: `${idx + 1}th` })), {});
    const idx_dict = Object.assign(Object.assign({}, idx_dict0), { 0: "1st", 1: "2nd", 2: "3rd" });
    const idx_str = idx_dict[i];
    return `🔍 it was the ${idx_str} Command in a Task or ${idx_dict[i - 1]} in a Subtask.`;
};
export const xKeyError = (str = "NOT OK", c = {}, unknown_keys = [], sub$ = "_NA_", index = 1) => {
    const SOURCE = c[CMD_SRC$] || null;
    const count = Object.entries(c).length;
    return `
🔥 ${str} ERROR:

🔥 Unrecognized Command Key(s)

FAULTY sub$: "${sub$}"
${Object.keys(unknown_keys)[0][0]
        ? `
${index ? key_index_err(c, index) : ""}

The problematic entry/entries:

🤔 ${!index && count > 3 && !SOURCE ? `${Object.entries(unknown_keys)[0][0]}: <Stream>` : stringify_fn(unknown_keys, 2)}` : ""} 🤔

ACCEPTABLE ENTRY KEYS ${index ? "WITHIN A COMMAND" : "DURING REGISTRATION"}:

'${CMD_SUB$}'
- optional
- topic key for for registering & targeting Commands

'${CMD_ARGS}'
- required
- payload or accumulator reshaping payload function (Promises OK)
- allowed values:
  - true/1/"a" : Primitive: static payload is _not_ accumulated
  - {...}      : Object: static payload _is_ accumulated
  - (1) =>     : Unary function (non-nullary): accepts accumulator
  - (0) =>     : Nullary function: dispatch to custom stream (advanced)
  - { P }      : Promise or (#) => { P } Promise returning function

'${CMD_RESO}'
- required for Promise handling
- converts resolved Promise payloads to Command args
- signature: ({ accumulator }, { resolved value }) =>

'${CMD_ERRO}'
- recommended for Promise rejections
- handles rejected Promise payloads
- signature: ({ accumulator }, { error object }) =>
${index ? ``
        : `
'${CMD_WORK}'
- required
- function that is called on payload's arrival
- signature:
  - (#) => : function instruments actual side-effects/work

'${CMD_SRC$}'
- advanced/optional
- source stream (see http://thi.ng/rstream)`}

Hope that helps!
`;
};
