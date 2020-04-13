/**
 * @module core/registers
 */
import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream"
import { peek } from "@thi.ng/arrays"
import { map } from "@thi.ng/transducers"
import { updateDOM } from "@thi.ng/transducers-hdom"
import { getInUnsafe } from "@thi.ng/paths"

import {
  DOM_NODE,
  $$_LOAD,
  $$_PATH,
  $$_ROOT,
  $$_VIEW,
  $$_CMDS,
  URL_FULL,
  URL_PRSE,
  ROUTER_PRFX,
  CFG_RUTR,
  CMD_SUB$,
  CMD_ARGS,
  CMD_SRC$,
  CMD_WORK,
  CFG_RUN$,
  CFG_STOR,
  CFG_ROOT,
  CFG_VIEW,
  CFG_DRFT,
  CFG_LOG$,
  CFG_KICK,
  CFG,
  BootCFG,
  Command,
} from "@-0/keys"

import { run$, registerCMD, command$ } from "@-0/spool"

import { parse, diff_keys } from "@-0/utils"

import { URL_DOM__ROUTE } from "../tasks"

import { DOMnavigated$ } from "../core/stream$"

import { $store$ } from "../store"

/**
 *
 * expects payload of
 * ```
 * { target: { location: { href } }, currentTarget }
 * ```
 */
export const registerRouterDOM = (router): Command => {
  console.log("DOM Router Registered")
  const task = URL_DOM__ROUTE(router)
  return registerCMD({
    [CMD_SRC$]: DOMnavigated$,
    [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
    [CMD_ARGS]: (x) => x,
    [CMD_WORK]: (args) =>
      run$.next(task({ [URL_FULL]: args[URL_FULL], [DOM_NODE]: args[DOM_NODE] })),
  })
}

const pre = (ctx, body) => (
  console.log(
    `
    no ${CFG_VIEW} component provided to boot({ CFG }). 
    Rendering state by route path
    `
  ),
  ["pre", JSON.stringify(body[1], null, 2)]
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

// prettier-ignore
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
export const boot = (CFG: BootCFG) => {

  // TODO const [boot, CMDS] = cmds => { ... return [ CFG => {}, [{C},,,] ] }
  const root       = CFG[CFG_ROOT] || document.body
  const view       = CFG[CFG_VIEW] || pre
  const draft      = CFG[CFG_DRFT]
  const router     = CFG[CFG_RUTR]
  const log$       = CFG[CFG_LOG$]
  const kick       = CFG[CFG_KICK]
  
  // TODO const registered: [{C},,,] = registerCommands([...DEFAULT_CMDS(store), ...commands])
  
  const knowns     = Object.values(CFG)
  const prfx       = router[ROUTER_PRFX] || null

  const [, others] = diff_keys(knowns, CFG)
  const escRGX     = /[-/\\^$*+?.()|[\]{}]/g
  const escaped    = str => str.replace(escRGX, "\\$&")
  const RGX        = prfx ? new RegExp(escaped(prfx || ""), "g") : null

  if (router) registerRouterDOM(router)
  else throw new Error(`no \`${CFG_RUTR}\` found on config. See documentation for \`boot\``)

  const state$ = fromAtom($store$)

  const shell = state$ => (
    log$ ? console.log(log$, state$) : null,
    state$[$$_LOAD]
      ? null
      : [view, [state$[$$_VIEW], getInUnsafe(state$, state$[$$_PATH])]]
  )

  if (draft) $store$.swap(x => ({ ...draft, ...x }))
  
  $store$.resetInUnsafe($$_ROOT, root)
  
  // TODO: opportunity for other implementations (e.g., React)
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
        [URL_PRSE]: () =>
          parse(window.location.href, RGX), // <- 🔍
        ...others
      }
    })
  )
  // Just a little kick in the pants for those stubborn sandboxes
  if (kick) {
    DOMnavigated$.next({
      target: document,
      currentTarget: document
    })
  }
  // TODO return registered
}
