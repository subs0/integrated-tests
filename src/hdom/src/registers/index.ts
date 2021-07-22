/**
 * @module core/registers
 */
import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream"
import { peek } from "@thi.ng/arrays"
import { map } from "@thi.ng/transducers"
import { updateDOM } from "@thi.ng/transducers-hdom"
import { getInUnsafe } from "@thi.ng/paths"

import {
    $$_LOAD,
    $$_PATH,
    $$_ROOT,
    $$_VIEW,
    URL_PRSE,
    RTR_PRFX,
    CFG_RUTR,
    CFG_RUN$,
    CFG_STOR,
    CFG_ROOT,
    CFG_VIEW,
    CFG_DRFT,
    CFG_LOG$,
    CFG_KICK,
} from "@-0/keys"

import { run$ } from "@-0/spool"

import { URL2obj, diff_keys } from "@-0/utils"

import { registerRouterDOM, DOMnavigated$, $store$ } from "@-0/browser"

const pre = (ctx, body) => (
    console.log(
        `
    no ${CFG_VIEW} component provided to boot({ CFG }). 
    Rendering state by route path
    `,
    ),
    [ "pre", JSON.stringify(body[1], null, 2) ]
)

/**
 * FIXME pseudo:
 *
 * tasks and commands need to be able to be used separately
 * from boot features/spec:
 * - Each command can be registered as a HOF that can
 *   recieve the CFG object and destructure parts off of it
 * - need a way to define/use tasks before they are
 *   registered
 * - ? Prep registration of Commands and Tasks, which return
 *   an Object of Tasks, Commands that you can then "plugin"
 *   to registration
 * Signatures/API:
 * ```js
 * const prepack = (Commands: Command[]) => {
 *  const package = Commands.reduce((a, c) => {
 *    create a function that takes the config object
 *
 *  }, {})
 * // the return payload is split:
 * // commandobject: { a: { sub$: a, args, erro, reso } }
 * // commandfunction: { a: (CFG) => { sub$: a, work, src$ } }
 *  return [ commandobject, commandfunction(CFG) ]
 * }
 *
 *
 * ```
 *
 */

/**
 *
 * Options Object keys
 * - root   : DOM mount node
 * - view   : root data view (app) node
 * - draft  : state scaffolding Object
 * - router : url matching function or config Object
 * - trace  : string triggers logs prepended with it
 * - kick   : boolean triggers kickstart (for some sandboxes)
 * - prefix : ignore a part of the URL (e.g., gitub.io/<prefix>)
 *
 */
export const boot = CFG => {
    // TODO const [boot, CMDS] = cmds => { ... return [ CFG => {}, [{C},,,] ] }
    const root = CFG[CFG_ROOT] || document.body
    const view = CFG[CFG_VIEW] || pre
    const draft = CFG[CFG_DRFT]
    const router = CFG[CFG_RUTR]
    const log$ = CFG[CFG_LOG$]
    const kick = CFG[CFG_KICK]

    // TODO const registered: [{C},,,] = registerCommands([...DEFAULT_CMDS(store), ...commands])

    const knowns = Object.values(CFG)
    const prfx = router[RTR_PRFX] || null

    const [ , others ] = diff_keys(knowns, CFG)
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g
    const escaped = str => str.replace(escRGX, "\\$&")
    const RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null

    if (router) registerRouterDOM(router)
    else throw new Error(`no \`${CFG_RUTR}\` found on config. See documentation for \`boot\``)

    const state$ = fromAtom($store$)

    const shell = state$ => (
        log$ ? console.log(log$, state$) : null,
        state$[$$_LOAD] ? null : [ view, [ state$[$$_VIEW], getInUnsafe(state$, state$[$$_PATH]) ] ]
    )

    if (draft) $store$.swap(x => ({ ...draft, ...x }))

    $store$.resetInUnsafe($$_ROOT, root)

    state$.subscribe(sidechainPartition(fromRAF())).transform(
        map(peek),
        map(shell),
        updateDOM({
            root,
            span: false,
            ctx: {
                [CFG_RUN$]: x => run$.next(x),
                [CFG_STOR]: $store$,
                // remove any staging path components (e.g., gh-pages)
                [URL_PRSE]: () => URL2obj(window.location.href, RGX), // <- 🔍
                ...others,
            },
        }),
    )
    // Just a little kick in the pants for those stubborn sandboxes
    if (kick) {
        DOMnavigated$.next({
            target: document,
            currentTarget: document,
        })
    }
    // TODO return registered
}
