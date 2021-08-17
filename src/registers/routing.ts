/**
 * @module core/registers
 */
import { DOM_NODE, URL_FULL, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK, Command, Router, RouterCFG } from "@-0/keys"
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
 * returns a Command Object whos arguments are expected to
 * fit the signature: { [URL_FULL], [DOM_NODE] }
 *
 * @example
 * ```js
 * import { registerRouterDOM, $store$ } from "@-0/browser"
 * import { URL2obj } from "@-0/utils"
 * import { $$_VIEW, URL } from "@-0/keys"
 * import { getIn } from "@thi.ng/paths"
 *
 * // arbitrary router, always returns the same object
 * const router = (url) => ({
 *      [URL_PAGE]: (data) => console.log("🎨:", data),
 *      [URL_DATA]: "navigated to " + url
 * })
 *
 * const _NAVIGATE = registerRouterDOM(router)
 * // 🕗 will handle popstate events
 *
 * // can also be called on for on demand routing
 * // (e.g., within a Link component)
 * const url = "/some/path?and=query"
 * run$.next({
 *      ..._NAVIGATE,
 *      [CMD_ARGS]: {
 *          [URL_FULL]: url,
 *          [DOM_NODE]: document
 *      }
 *  })
 * const {
 *      [URL.PATH]: path
 * } = URL2Obj(url)
 *
 * const {
 *      [$$_VIEW]: View,
 *      ...store
 * } = $store$.deref()
 *
 * const data = getIn(store, path)
 * View(data)
 * // => 🎨: navigated to /some/path?and=query
 * ```
 */
export const registerRouterDOM = (router: Router | RouterCFG): Command => {
    console.log("DOM Router Registered")
    const routing_task = URL_DOM__ROUTE(router)
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_NAVIGATE",
        [CMD_ARGS]: ({ [URL_FULL]: url, [DOM_NODE]: node }) => ({
            [URL_FULL]: url,
            [DOM_NODE]: node,
        }),
        [CMD_WORK]: ({ [URL_FULL]: url, [DOM_NODE]: node = document }) => {
            const props = { [URL_FULL]: url, [DOM_NODE]: node }
            if (url) return run$.next(routing_task(props))
            console.warn(Err_missing_props("_NAVIGATE (from registerRouterDOM)", props))
        },
    })
}
