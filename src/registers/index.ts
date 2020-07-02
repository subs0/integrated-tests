/**
 * @module core/registers
 */
import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream"
import { peek } from "@thi.ng/arrays"
import { map } from "@thi.ng/transducers"
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
