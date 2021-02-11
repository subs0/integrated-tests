/**
 * @module core/registers
 */

import { DOM_NODE, URL_FULL, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK, Command } from "@-0/keys"
import { run$, registerCMD } from "@-0/spool"
import { URL_DOM__ROUTE } from "../tasks"
import { DOMnavigated$ } from "../core"

/**
 *
 * expects payload of
 * ```
 * { target: { location: { href } }, currentTarget }
 * ```
 */
export const registerRouterDOM = (router): Command => {
    //console.log("DOM Router Registered")
    const task = URL_DOM__ROUTE(router)
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
        [CMD_ARGS]: x => x,
        [CMD_WORK]: args => run$.next(task({ [URL_FULL]: args[URL_FULL], [DOM_NODE]: args[DOM_NODE] }))
    })
}
