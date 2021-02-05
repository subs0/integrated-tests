/**
 * @module core
 */

import { isFunction, isPromise, isArray } from "@thi.ng/checks"
import { pubsub, Subscription, PubSub } from "@thi.ng/rstream"
import { EquivMap } from "@thi.ng/associative"

import { CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK } from "@-0/keys"
import { stringify_type, xKeyError, key_index_err, diff_keys, stringify_fn } from "@-0/utils"
import { getIn } from "@thi.ng/paths"

const err_str = "🔥 Multiplex Spooling Interrupted 🔥"

const noSubEr = (c, i) => `
${err_str}

 >> No \`${CMD_SUB$}\` included for a Command with primitive \`${CMD_ARGS}\` <<

Ergo, nothing was done with this Command: 

${stringify_fn(c)}

${(i && key_index_err(c, i)) || ""}

Hope that helps!

`

const noEroEr = (c, i) => `
${err_str}

>> Unhandled Error 

This Command:

${stringify_fn(c)}

resulted in an error, but no ${CMD_ERRO} (error) handler was included

${(i && key_index_err(c, i)) || ""}
Unhandled errors terminate Tasks by default

`

const task_not_array_error = x => `
${err_str}

You may have:
1. Ran a Command that has no \`${CMD_ARGS}\` key and thus does nothing
2. Ran a Subtask - a unary Function that accepts an inter-Task accumulator 
    and returns an Array - outside of a Task and has thus starved

Please check this payload for issues:
${stringify_fn(x)}
`

const no_args_error = (C, i = null) => `
${err_str}

You have ran a Command that has no \`${CMD_ARGS}\` key and thus does nothing

Please check this payload for issues:
${stringify_fn(C)}

${i ? key_index_err(C, i) : ""}
`

const NA_keys = (c, i) => {
    const knowns = [ CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO ]
    const [ _, unknown_kvs ] = diff_keys(knowns, c)
    return xKeyError(err_str, c, unknown_kvs, i)
}

// prettier-ignore
export const keys_match = C => new EquivMap([
    [ [],                                         "NO_ARGS" ],
    [ [ CMD_SUB$ ],                               "NO_ARGS" ],
    [ [ CMD_RESO ],                               "NO_ARGS" ],
    [ [ CMD_ERRO ],                               "NO_ARGS" ],
    [ [ CMD_RESO, CMD_SUB$ ],                     "NO_ARGS" ],
    [ [ CMD_ERRO, CMD_SUB$ ],                     "NO_ARGS" ],
    [ [ CMD_ERRO, CMD_RESO ],                     "NO_ARGS" ],
    [ [ CMD_ERRO, CMD_RESO, CMD_SUB$ ],           "NO_ARGS" ],
    [ [ CMD_ARGS ],                               "A" ],
    [ [ CMD_ARGS, CMD_ERRO ],                     "AE" ],
    [ [ CMD_ARGS, CMD_RESO ],                     "AR" ],
    [ [ CMD_ARGS, CMD_SUB$ ],                     "AS" ],
    [ [ CMD_ARGS, CMD_ERRO, CMD_SUB$ ],           "AES" ],
    [ [ CMD_ARGS, CMD_ERRO, CMD_RESO ],           "AER" ],
    [ [ CMD_ARGS, CMD_RESO, CMD_SUB$ ],           "ARS" ],
    [ [ CMD_ARGS, CMD_ERRO, CMD_RESO, CMD_SUB$ ], "AERS" ]
]).get(Object.keys(C).sort()) || "UNKNOWN"

// prettier-ignore
// recursive function that resolves all non static values
export const processArgs = async (acc, args) => {
    const args_type = stringify_type(args)
    switch (args_type) {
        case "PRIMITIVE": case "OBJECT": case "ERROR": case "ARRAY":
            return { args_type, args }
        case "N-ARY": case "BINARY":
            console.warn(`${CMD_ARGS} function arity !== 1: ${stringify_fn(args)}`)
        case "UNARY":
            return await processArgs(acc, args(acc))
        case "PROMISE":
            let resolved = await args.catch(e => e)
            return await processArgs(acc, resolved)
        case "NULLARY":
            return await processArgs(acc, args())
        default:
            return "UNDEFINED"
    }
}

// prettier-ignore
/**
 * @example
 * acc = await pattern_match(acc, { args: { a: 1 } }, out$)
 */
export const handlePattern = async (acc, C, out$ = { next: null }, i = null) => {
    if (acc === null) return null
    const K_M = keys_match(C)
    if (K_M === "NO_ARGS") {
        console.warn(no_args_error(C, i))
        return acc
    }
    const _args = C[CMD_ARGS]
    const { args_type, args } = await processArgs(acc, _args)

    //console.log(`
    //K_M: ${K_M}
    //args_type: ${args_type}
    //args: ${args}
    //`)

    const __R = K_M.includes("R") && C[CMD_RESO](acc, args) 
    const __C = { ...C, [CMD_ARGS]: args }
    const __A = args_type === "OBJECT" && { ...acc, ...args }
    const __RA = __R && { ...acc, ...__R }

    // equivalent matches are returned in LIFO order -> add least least restrictive cases first ⬇
    let result = new EquivMap([ 
        [ { K_M,                                 args_type: "UNKNOWN"   },() => (console.warn(NA_keys(C, i)), null) ],
        [ { K_M,                                 args_type: "OBJECT"    },() => __A ],
        [ { K_M: `${!K_M.includes("S") && K_M}`, args_type: "PRIMITIVE" },() => (console.warn(noSubEr(__C, i)), acc) ],
        [ { K_M: `${K_M.includes("S") && K_M}`,  args_type: "PRIMITIVE" },() => (out$.next(__C), acc) ],
        [ { K_M: `${K_M.includes("S") && K_M}`,  args_type: "OBJECT"    },() => (out$.next(__C), __A) ],
        [ { K_M: `${K_M.includes("R") && K_M}`,  args_type              },() => __RA ],
        [ { K_M: `${K_M.includes("RS") && K_M}`, args_type              },() => (out$.next(__R), __RA) ],
        [ { K_M,                                 args_type: "ERROR"     },() => (console.warn(noEroEr(__C, i)), null) ],
        [ { K_M: `${K_M.includes("E") && K_M}`,  args_type: "ERROR"     },() => C[CMD_ERRO](acc, args, out$) ]
    ]).get({ K_M, args_type }) || null

    return result && result()
}

/**
 *
 * Handles Collections (array) of Commands ("Tasks") which
 * require _ordered_ choreography and/or have a dependency
 * on some (a)sync data produced by a user interaction.
 *
 * ### Subtasks:
 *
 * Subtasks are the way you compose tasks. Insert a Task and
 * the spool will unpack it in place (super -> sub order
 * preserved) A Subtask must be defined as a unary function
 * that accepts an accumulator object and returns a Task,
 * e.g.:
 *
 * #### PSEUDO
 * ```js
 * // { C: Command }
 * // ( { A: Accumulator }: Object ) => [{C},{C}]: Subtask
 * let someSubtask = ({A}) => [{C}, {C}, ({A})=>[{C},{C}], ...]
 * ```
 *
 * #### Example
 * ```js
 * // subtask example:
 * let subtask1 = acc => [
 *  { sub$: "acc"
 *  , args: { data: acc.data } },
 *  { sub$: "route"
 *  , args: { route: { href: acc.href } } }
 * ]
 *
 * // task
 * let task = [
 *  { args: { href: "https://my.io/todos" } }, // acc init
 *  { sub$: "fetch"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ data: res }) },
 *  acc => subtask1(acc), // subtask reference
 *  { sub$: "FLIP" , args: "done" }
 * ]
 * ```
 * ### Ad-hoc stream injection Example
 *
 * ```js
 * import { stream } from "@thi.ng/rstream"
 * import { map, comp } from "@thi.ng/transducers"
 *
 * // ad-hoc stream
 * let login = stream().subscribe(comp(
 *  map(x => console.log("login ->", x)),
 *  map(({ token }) => loginToMyAuth(token))
 * ))
 *
 * // subtask
 * let subtask_login = ({ token }) => [
 *  { sub$: login // <- stream
 *  , args: () => ({ token }) } // <- use acc
 * ]
 *
 * // task
 * let task = [
 *  // no sub$, just pass data
 *  { args: { href: "https://my.io/auth" } },
 *  { sub$: login , args: () => "logging in..." },
 *  { sub$: "AUTH"
 *  , args: ({ href }) => fetch(href).then(r => r.json())
 *  , erro: (acc, err) => ({ sub$: "cancel", args: err })
 *  , reso: (acc, res) => ({ token: res }) },
 *  acc => subtask_login(acc),
 *  { sub$: login , args: () => "log in success" }
 * ]
 * ```
 *
 * 🔥 IMPORTANT 🔥
 *
 * the accumulation object that's passed between Commands
 * within a task is spread together between Commands. I.e.,
 * later Commands payloads are spread into the accumulator -
 * potentially overwriting earlier Commands playoads, but -
 * if no later payloads keys overlap with keys from earlier
 * payloads those key/value pairs remain intact.
 *
 * ### Example that doesn't work
 * ```js
 * export const pruneKVPairs = (obj, ...keys) => {
 *   let out = {}
 *   Object.entries(obj).forEach(([k, v]) => {
 *     if (keys.some(x => x === k)) return
 *     else return (out[k] = v)
 *   })
 *   return out
 * }
 * const PRUNE_PROPS_CMD = registerCMD({
 *  sub$: "PRUNE_PROPS_CMD",
 *  args: acc => pruneKVPairs(acc, "remove_me", "omit_key")
 * })
 * ```
 * This Command doesn't actually prune the accumulator. It
 * does prune upon receipt, but that pruned result is
 * thereafter spread back together with the prior result,
 * effectively undoing the prune
 *
 * In order to "prune" entries from the accumulator, you
 * must do so at the receiving end of the Task. E.g., by
 * applying it to the output
 *
 */
export const multiplex = out$ => task_array =>
    isArray(task_array)
        ? task_array.reduce(async (a, c, i) => {
              let acc = await a

              /**
               * @example
               * let SubTask = ({ inter_task_prop }) => [
               *      { sub$: "A", args: inter_task_prop + 1 },
               *      { sub$: "B", args: inter_task_prop + 2 }
               * ]
               */
              if (isFunction(c)) {
                  try {
                      const queue = c(acc)
                      // ensures accumulator is preserved
                      // between stack calls
                      queue.unshift({ [CMD_ARGS]: acc })
                      // recur
                      return multiplex(out$)(queue)
                  } catch (e) {
                      console.warn(err_str, e)
                      return
                  }
              }

              return await handlePattern(acc, c, out$, i) // returns accumulator
          }, Promise.resolve({}))
        : (() => {
              throw new Error(task_not_array_error(task_array))
          })()

/**
 * User-land event dispatch stream
 *
 * This stream is directly exposed to users. Any one-off
 * Commands `next`ed into this stream are sent to the
 * `cmd$` stream. Arrays of Commands (Tasks) are sent to
 * the `task$` stream.
 *
 * TODO: add examples,`beforeunload` event handler within #4
 *    (orphan): SEE https://youtu.be/QQukWZcIptM and enable
 *    ctx.run.cancel() via external or internal events
 *    (e.g., popstate / { sub$:  "cancel" })
 *
 */
export const run$: PubSub<any, any> = pubsub({
    topic: x => !!x[CMD_ARGS],
    id: "run$_stream"
    //equiv: (res, tpc) => res === tpc
})

/**
 * Primary user-land _READ_ stream. For attaching handlers
 * for responding to emmitted Commands
 */
export const out$: PubSub<any, any> = pubsub({
    topic: x => x[CMD_SUB$],
    id: "out$_stream"
    //equiv: (res, tpc) => res === tpc
})

/**
 *
 * Primary fork/bisect stream for indivual commands.
 * attached to a `pubsub` stemming from this stream. The
 * `topic` function used to alert downstream handlers is a
 * simple lookup of the `sub$` key of the command
 */
export const cmd$: Subscription<any, any> = run$.subscribeTopic(
    true,
    {
        next: x => out$.next(x),
        error: console.warn
    },
    { id: "cmd$_stream" }
)

/**
 *
 * Task stream that handles Arrays of Commands. Dispatches
 * to `multiplex`er (the heart of `spule`)
 *
 */
export const task$: Subscription<any, any> = run$.subscribeTopic(
    false,
    {
        next: multiplex(out$),
        error: console.warn
    },
    { id: "task$_stream" }
)
