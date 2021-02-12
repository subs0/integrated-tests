/**
 * @module tasks/routing
 */

import { isObject } from "@thi.ng/checks"

import {
    HREF_PUSHSTATE_DOM,
    NOTIFY_PRERENDER_DOM,
    SET_LINK_ATTRS_DOM,
    SET_STATE
    // msTaskPromiseDelay,
} from "../commands"

import {
    $$_VIEW,
    $$_LOAD,
    $$_PATH,
    DOM_NODE,
    URL_FULL,
    URL_DATA,
    URL_PATH,
    URL_PAGE,
    RTR_PREP,
    RTR_POST,
    RTR_PRFX,
    CFG_RUTR,
    CMD_ARGS,
    CMD_RESO,
    CMD_ERRO,
    DOM_BODY,
    STATE_DATA,
    STATE_PATH
} from "@-0/keys"

import { URL2obj } from "@-0/utils"

/**
 *
 * Universal router (cross-platform) Subtask.
 *
 * This can be used in both a browser and Node context. The
 * parts that handle browser side-effects are included in an
 * Supertask `_URL__ROUTE`
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL }) => [
 *  - set `router_loading` path in global atom to `true`
 *  - call provided `router` with the `URL` and await payload
 *  - `URL2obj(URL)` for `URL_*` components
 *  - set `route_path` in global store/atom to current `URL_path`
 *  - set page state (data, path & page component name) in store
 *  - once promise(s) resolved, set `router_loading` to `false`
 * ]
 * ```
 * reserved Command keys:
 *  - `URL_page`
 *  - `URL_data`
 *  - `URL_path`
 *  - `URL`
 *  - `DOM`
 *
 * TODO: Type ROuter CFG
 */
export const URL__ROUTE = (CFG: Function | Object): any => {
    let router, preroute, postroute, prefix

    if (isObject(CFG)) {
        const ruts = CFG[CFG_RUTR]
        const prep = CFG[RTR_PREP]
        const post = CFG[RTR_POST]
        const prfx = CFG[RTR_PRFX] || null

        const escRGX = /[-/\\^$*+?.()|[\]{}]/g
        const escaped = string => string.replace(escRGX, "\\$&")

        // console.log({ router, pre, post })

        router = ruts
        preroute = isObject(prep) ? [ prep ] : prep || []
        postroute = isObject(post) ? [ post ] : post || []

        /**
         *
         * FIXME: if prefix provided, remove it from result
         * of URL2Obj instead of stripping it from URL
         * strings passed to router
         */

        prefix = prfx ? new RegExp(escaped(prfx), "g") : null
    } else {
        router = CFG
        preroute = []
        postroute = []
        prefix = null
    }
    const task = acc => [
        ...preroute, // 📌 TODO enable progress observation
        /**
     * ## `_SET_ROUTER_LOADING_STATE`cod
     *
     * Routing Command: Universal
     *
     * ### Payload: static
     * default payload `args` signature:
     * ```
     * args: true,
     * ```
     * Simple true or false payload to alert handler
     *
     * ### Handler: side-effecting
     * Sets `route_loading` path in global Atom to true || false
     *
     */
        {
            /**
             *
             * FIXME: if prefix provided, remove it from result
             * of URL2Obj instead of stripping it from URL
             * strings passed to router   
             */
            [CMD_ARGS]: prefix ? router(acc[URL_FULL].replace(prefix, "")) : router(acc[URL_FULL]),
            [CMD_RESO]: (_acc, _res) => ({
                // 🤔: no page in core... can it be migrated/refactored into DOM Router?
                [URL_PAGE]: (_res && _res[URL_PAGE]) || null,
                [URL_DATA]: (_res && _res[URL_DATA]) || null
            }),
            [CMD_ERRO]: (_acc, _err) => console.warn("Error in URL__ROUTE:", _err, "constructed:", _acc)
        },
        {
            [CMD_ARGS]: prefix ? URL2obj(acc[URL_FULL], prefix) : URL2obj(acc[URL_FULL])
        },
        /**
     * ## `_SET_ROUTER_PATH`
     *
     * Routing Command: Universal
     *
     * ### Payload: function
     * default payload `args` signature:
     * ```
     * args: ({ URL_path }) => ({ URL_path }),
     * ```
     * Consumes the `URL_path` property from a `URL2obj`
     * object, handed off from a prior Command
     *
     * ### Handler: side-effecting
     * Sets the current/loading router's `route_path` in the
     * global Atom
     *
     */
        {
            ...SET_STATE,
            [CMD_ARGS]: _acc => ({
                [STATE_DATA]: _acc[URL_PATH],
                [STATE_PATH]: [ $$_PATH ]
            })
        },
        ...postroute
    ]
    return task
}

/**
 *
 * DOM Router that contains a cross-platform routing Subtask
 *
 * Subtask HOF for router registration. Takes a
 * `@thi.ng/associative` `EquivMap` route matching function,
 * registers that router as a member of a Task for following
 * Commands to leverage the returned data (`{ data, page }`)
 *
 * Pseudo
 * ```
 * ( router ) => ({ URL, DOM event }) => [
 *  - if href, push to `history.pushState`
 *  - SUBTASK: _URL__ROUTE (universal router)
 *  - remove `active` attribute from visited links except current
 *  - notify rendertron (TBD) of new page
 * ]
 * ```
 *
 * reserved Command keys:
 *  - `URL`
 *  - `DOM`
 *  - `URL_page`
 *  - `URL_path`
 *  - `URL_data`
 */
export const URL_DOM__ROUTE = CFG => {
    // instantiate router
    const match = URL__ROUTE(CFG)

    return acc => [
        {
            ...SET_STATE,
            [CMD_ARGS]: {
                [STATE_PATH]: [ $$_LOAD ],
                [STATE_DATA]: true
            }
        },
        {
            ...HREF_PUSHSTATE_DOM,
            [CMD_ARGS]: { [URL_FULL]: acc[URL_FULL], [DOM_NODE]: acc[DOM_NODE] }
        },
        // example Subtask injection
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        // { args: msTaskDelay(2000) },
        /**
         * takes the result from two sources: the
         * user-provided
         * [`router`](http://thi.ng/associative) and a
         * `unFURL`d URL
         *
         * ### work: side-effecting
         *
         * Hydrates the page state as well as the name of
         * the active page in the global store
         */
        {
            ...SET_STATE,
            [CMD_ARGS]: _acc => ({
                [STATE_PATH]: [ $$_VIEW ],
                [STATE_DATA]: _acc[URL_PAGE] || null
            })
        },
        {
            ...SET_STATE,
            [CMD_ARGS]: _acc => ({
                [STATE_PATH]: _acc[URL_PATH],
                [STATE_DATA]: (_acc[URL_DATA] && _acc[URL_DATA][DOM_BODY]) || _acc[URL_DATA]
            })
        },
        // example ad-hoc stream injection
        // { sub$: log$, args: () => ({ DOM }) },
        SET_LINK_ATTRS_DOM,
        {
            ...SET_STATE,
            // wait on pending promise(s) w/a fn
            [CMD_ARGS]: _ => ({
                [STATE_PATH]: [ $$_LOAD ],
                [STATE_DATA]: false
            })
        },
        NOTIFY_PRERENDER_DOM
    ]
}
