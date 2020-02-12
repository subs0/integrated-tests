/**
 * @module commands/register
 */

import { map } from "@thi.ng/transducers"
import { isFunction } from "@thi.ng/checks"
import { getIn } from "@thi.ng/paths"
import { IAtom } from "@thi.ng/atom"

import { CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK, $$_CMDS } from "@-0/keys"

// import { command$, out$ } from "../core"
// import { $store$ } from "../store"

import { xKeyError, stringify_w_functions, diff_keys } from "@-0/utils"
import { command$ } from "@-0/spool"

const feedCMDtoTarget$fromSource$ = (cmd: Object, target$ = command$) => {
  const src$ = cmd[CMD_SRC$]
  const sub$ = cmd[CMD_SUB$]
  const args = cmd[CMD_ARGS]
  const isFn = isFunction(args)
  const deliver = x => ({ [CMD_SUB$]: sub$, [CMD_ARGS]: args(x) })
  const delivery = { [CMD_SUB$]: sub$, [CMD_ARGS]: args }

  const feed = $ => (isFn ? map(x => $.next(deliver(x))) : map(() => $.next(delivery)))

  return src$.subscribe(feed(target$))
}

const err_str = "command Registration `registerCMD`"

/**
 *
 *
 * Takes a Command object with some additional information
 * and returns a Command `run`able in a Task or as-is.
 *
 * ### Example
 *
 * ```js
 * const genie = {
 *   sub$: "GENIE",
 *   args: "your wish"
 *   work: x => console.log("🧞 says:", x, "is my command")
 * }
 *
 * const GENIE = registerCMD(genie)
 *
 * run(GENIE)
 * // 🧞 says: your wish is my command
 * ```
 *
 * A Command object can have four keys:
 *  1. `sub$` (required)
 *  2. `args` (optional, sets default) during registration
 *  3. `work` (required)
 *  4. `src$` (optional, enables stream to feed Command)
 *
 */
export const registerCMDtoStore = (store: IAtom<any>, stream$ = null) => (
  command: Object = null
) => {
  /**
   * enables inspection of the existing Command registrations
   * if using Chrome, there's an additional advantage of being
   * able to find the `[[FunctionLocation]]` of the Command
   */
  if (!command) return getIn(store.deref(), $$_CMDS)
  const sub$ = command[CMD_SUB$]
  const args = command[CMD_ARGS]
  const erro = command[CMD_ERRO]
  const reso = command[CMD_RESO]
  const src$ = command[CMD_SRC$]
  const work = command[CMD_WORK]

  const knowns = [CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK]
  const [unknowns] = diff_keys(knowns, command)
  // console.log({ knowns, unknowns })

  if (unknowns.length > 0) {
    throw new Error(xKeyError(err_str, command, unknowns, sub$, undefined))
  }

  if (src$) feedCMDtoTarget$fromSource$(command, stream$)

  // @ts-ignore
  out$.subscribeTopic(
    sub$,
    { next: work, error: console.warn },
    map(puck => puck[CMD_ARGS])
  )

  const CMD = reso
    ? {
        [CMD_SUB$]: sub$,
        [CMD_ARGS]: args,
        [CMD_RESO]: reso,
        [CMD_ERRO]: erro
      }
    : { [CMD_SUB$]: sub$, [CMD_ARGS]: args }
  if (getIn(store.deref(), [$$_CMDS, sub$])) {
    throw new Error(
      `

    🔥 duplicate \`sub$\` value detected in Command:
    ${stringify_w_functions(CMD)}
    existing registered Commands:
    ${JSON.stringify(getIn(store.deref(), $$_CMDS), null, 2)}
    🔥 Please use a different/unique Command \`sub$\` string

    🔎 Inspect existing Commands using empty call: \`registerCMD()\`

      `
    )
  }
  //@ts-ignore
  store.swapIn($$_CMDS, x => ({ ...x, [sub$.toString()]: CMD }))
  return CMD
}

export const registerCMD = registerCMDtoStore($store$)
