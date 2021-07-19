/**
 * @module core/registers
 */

import {
    DOM_NODE,
    URL_FULL,
    CMD_SUB$,
    CMD_ARGS,
    CMD_SRC$,
    CMD_WORK,
    Command,
    Router,
    RouterCFG,
} from "@-0/keys"
import { run$, registerCMD } from "@-0/spool"
import { Err_missing_props } from "@-0/utils"
import { URL_DOM__ROUTE } from "../tasks"
import { DOMnavigated$ } from "../core"

/**
 *
 * Task alias: Command forwards any validated target
 * emissions to a larger set of Commands via a Task. Expects
 * payload of
 * ```
 * { target: { location: { href } }, currentTarget }
 * ```
 */
export const registerRouterDOM = (router: Router | RouterCFG): Command => {
    console.log("DOM Router Registered")
    const routing_task = URL_DOM__ROUTE(router)
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
        [CMD_ARGS]: acc => acc,
        [CMD_WORK]: acc => {
            const url = acc[URL_FULL]
            const node = acc[DOM_NODE]
            const props = { [URL_FULL]: url, [DOM_NODE]: node }
            // @ts-ignore FIXME
            if (url && node) return run$.next(routing_task(props))
            console.warn(Err_missing_props("_URL_NAVIGATED$_DOM (registerRouterDOM)", props))
        },
    })
}
