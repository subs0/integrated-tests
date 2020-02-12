import { map } from "@thi.ng/transducers"
import { isFunction } from "@thi.ng/checks"

import { CMD_SUB$, CMD_ARGS, CMD_RESO, CMD_ERRO, CMD_SRC$, CMD_WORK, $$_CMDS } from "@-0/keys"

import { command$ } from "@-0/spool"

export const supplement$CMD = (cmd: Object, to$ = command$) => {
  const sup$ = cmd[CMD_SRC$]
  const sub$ = cmd[CMD_SUB$]
  const args = cmd[CMD_ARGS]
  const isFn = isFunction(args)
  const load = (x = null) => ({ [CMD_SUB$]: sub$, [CMD_ARGS]: x ? args(x) : args })

  const xport = $ => map(x => $.next(isFn ? load(x) : load()))

  return sup$.subscribe(xport(to$))
}
