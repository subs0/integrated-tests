import { get_param_names } from "../lib"
/**
 * @module commands/register
 */

import { map } from "@thi.ng/transducers"
import { isFunction } from "@thi.ng/checks"
import { stream, pubsub } from "@thi.ng/rstream"

import { CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK } from "@-0/keys"
import { xKeyError, diff_keys, stringify_fn } from "@-0/utils"

const err_str = "command Registration `registerCMD`"

const no_work_or_src_error = `
Error registering ${CMD_SUB$}:
Commands with no \`${CMD_WORK}\` & no \`${CMD_SRC$}\` handler 
can/need not be registered:

- \`${CMD_WORK}\`: registers side-effecting handlers
- \`${CMD_SRC$}\`: registers upstream Command producers

if your Command is for data acquisition/transformation, 
you can run$.next(YOUR_COMMAND) without registration.
`

const warnOnIncongruentInput = (work_params, sub$) => (args, CMD) => {
    const args_params = Object.keys(args)
    let missing = work_params.reduce((a, c) => (args_params.some(x => x === c) ? a : a.concat(c)), [])
    if (!missing.length) return
    console.warn(
        `Command { \`${CMD_SUB$}\`: '${sub$}' } missing argument${missing.length === 1
            ? ""
            : "s"} specified by its \`${CMD_WORK}\` handler: ${missing.map(x => `\`${x}\``)}

${stringify_fn(CMD, 2)}
        `
    )
    //  return args_params
}

const test$ = pubsub({
    topic : x => x[CMD_SUB$],
    id    : "out$_stream"
    //equiv: (res, tpc) => res === tpc
})

export const registerCMD = (command = null) => {
    const sub$ = command[CMD_SUB$]
    const args = command[CMD_ARGS]
    const erro = command[CMD_ERRO]
    const reso = command[CMD_RESO]
    const src$ = command[CMD_SRC$]
    const work = command[CMD_WORK]

    if (!work && !src$) {
        throw new Error(no_work_or_src_error)
    }

    const known_CMD_props = [ CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK ]
    const [ unknown_CMD_props ] = diff_keys(known_CMD_props, command)
    // console.log({ known_CMD_props, unknown_CMD_props })

    if (unknown_CMD_props.length > 0) {
        throw new Error(xKeyError(err_str, command, unknown_CMD_props, undefined))
    }

    const sans_src = { ...command, [CMD_SRC$]: undefined }

    const work_params = get_param_names(work, sans_src)
    const param_warning = work_params.length ? warnOnIncongruentInput(work_params, sub$) : false

    const CMD = reso
        ? {
              [CMD_SUB$] : sub$,
              [CMD_ARGS] : args,
              [CMD_RESO] : reso,
              [CMD_ERRO] : erro
          }
        : { [CMD_SUB$]: sub$, [CMD_ARGS]: args }

    // @ts-ignore
    test$.subscribeTopic(
        sub$,
        {
            next  : x => {
                param_warning && param_warning(x[CMD_ARGS], x)
                //log$.next(x) // send every Command to log$ stream
                return work(x[CMD_ARGS]) // execute side-effects, etc.
            },
            error : console.warn
        } // pluck the args from the incoming Command
        //map(x => x[CMD_ARGS])
    )

    return CMD
}

const _1 = function({ d, e, s }) {}
const _2 = ({ d, e, s }) => {}
const _3 = ({ d, e, s }, x) => {}
const _4 = function(x, y) {}
const _5 = function({ d, e, s }, x) {}
const _6 = ({ ["a" + "b"]: c, d }, x) => {}
const _7 = ({ [`comp`]: c, d }) => {}

// prettier-ignore
const _8 = ({ 
    d, 
    e, 
    s 
}) => {}

// prettier-ignore
const _9 = ({ 
    d, // with  
    e, // inline
    s // comments
}) => {}

// prettier-ignore
const _10 = ({ 
    // with comment above
    d, 
    e, 
    s 
}) => {}

const key = "computed"
// prettier-ignore
const _11 = ({ 
    // with comment above
    [key]: d_c, // inline
    e: {
        e2
    },
    [`another` + 1]: s_c = `destruct`,
    t
}) => {}

//get_param_names(_1) //?
//get_param_names(_2) //?
//get_param_names(_3) //?
//get_param_names(_4) //?
//get_param_names(_5) //?
//get_param_names(_6) //?
//get_param_names(_7) //?
//get_param_names(_8) //?
//get_param_names(_9) //?
//get_param_names(_10) //?
//get_param_names(_11) //?

const cb = ({ fire, ["computed"]: prop }) => ({ rocket: fire + "🚀" })

const TEST2 = registerCMD({
    [CMD_SUB$] : "TEST2",
    [CMD_ARGS] : { fire: "🍑" },
    [CMD_WORK] : _11
}) //?

test$.next(TEST2)
const TEST3 = registerCMD({
    [CMD_SUB$] : "TEST3",
    [CMD_ARGS] : { fire: "🎹" },
    [CMD_WORK] : _7
}) //?
