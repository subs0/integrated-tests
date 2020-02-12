import { map } from "@thi.ng/transducers"
import { isFunction } from "@thi.ng/checks"
import { ISubscribable } from "@thi.ng/rstream"

import { CMD, CMD_SUB$, CMD_ARGS, CMD_SRC$ } from "@-0/keys"

export const supplement$CMD = (cmd: Object, to$: ISubscribable<any>) => {
  const sup$: ISubscribable<any> = cmd[CMD_SRC$]
  const sub$ = cmd[CMD_SUB$]
  const args = cmd[CMD_ARGS]
  const isFn = isFunction(args)
  const load = (x = null) => ({ [CMD_SUB$]: sub$, [CMD_ARGS]: x ? args(x) : args })
  const xport = $ => map(x => $.next(isFn ? load(x) : load()))
  return sup$.subscribe(xport(to$))
}
