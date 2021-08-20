/**
 * @module tasks/routing
 */

import { isPlainObject } from "@thi.ng/checks"

import { _HREF_PUSHSTATE_DOM, SET_STATE, _NOTIFY_PRERENDER_DOM, _SET_LINK_ATTRS_DOM } from "../commands"

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
    STATE_PATH,
    RouterCFG,
    Router,
    Task,
    HOTask,
    RouterOutput,
} from "@-0/keys"

import { stringify_fn, URL2obj } from "@-0/utils"

const _SET_ROUTE_PATH = {
    ...SET_STATE,
    [CMD_ARGS]: _acc => ({
        [STATE_DATA]: _acc[URL_PATH],
        [STATE_PATH]: [$$_PATH],
    }),
}
const route_error = (_acc, _err, _out) => console.warn("Error in URL__ROUTE:", _err)
const e_s = `Prerequisite property: { ${CMD_ARGS}: { ${URL_FULL}: NOT FOUND 🔥 } }`
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
export const __URL__ROUTE = (CFG: Router | RouterCFG): HOTask => {
    const rtr = CFG[CFG_RUTR] || null
    const pre = CFG[RTR_PREP] || null
    const pst = CFG[RTR_POST] || null
    const pfx = CFG[RTR_PRFX] || null
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g
    const escaped = string => string.replace(escRGX, "\\$&")

    const RUTR = rtr || CFG
    const _PREP = (pre && isPlainObject(pre) ? [pre] : pre) || []
    const _POST = (pst && isPlainObject(pst) ? [pst] : pst) || []
    const prefix = pfx ? new RegExp(escaped(pfx), "g") : null

    /**
     * 📌 TODO enable progress observation by using both the
     * run$ and log$ stream emissions:
     * 1. for each run$ emissions, measure length of:
     *      a. single command = 1
     *      b. task = task.length
     * 2. create for every emission from
     *      the run$ emission
     */
    const subtask = (acc): Task => [
        ..._PREP,
        {
            // 📌 🤔: consider how to handle stage flag URL prefix (e.g., /staging, from AWS)
            [CMD_ARGS]: acc[URL_FULL] ? RUTR(acc[URL_FULL].replace(prefix, "")) : new Error(e_s),
            [CMD_RESO]: (_acc, _res: RouterOutput) => ({
                // no page when used server-side...
                ...(_res && _res[URL_PAGE] && { [URL_PAGE]: _res[URL_PAGE] }),
                ...(_res && _res[URL_DATA] && { [URL_DATA]: _res[URL_DATA] }),
            }),
            [CMD_ERRO]: route_error,
        },
        {
            [CMD_ARGS]: acc[URL_FULL] ? URL2obj(acc[URL_FULL], prefix) : new Error(e_s),
            [CMD_ERRO]: route_error,
        },
        _SET_ROUTE_PATH,
        ..._POST,
    ]
    return subtask
}

const _SET_ROUTE_LOADING_TRUE = {
    ...SET_STATE,
    [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: true },
}
const _SET_ROUTE_LOADING_FALSE = {
    ...SET_STATE,
    [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: false },
}

//export const NOTIFY_PRERENDER_DOM = registerCMD(cmd_notify_prerender_dom)
//export const SET_LINK_ATTRS_DOM = registerCMD(cmd_set_link_attrs_dom)
//export const HREF_PUSHSTATE_DOM = registerCMD(cmd_href_pushstate_dom)

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
 */
export const __DOM_URL__ROUTE = (CFG: Router | RouterCFG): HOTask => {
    // instantiate router
    const match = __URL__ROUTE(CFG)

    const subtask = (ACC): Task => [
        _SET_ROUTE_LOADING_TRUE,
        {
            ..._HREF_PUSHSTATE_DOM,
            [CMD_ARGS]: { [URL_FULL]: ACC[URL_FULL], [DOM_NODE]: ACC[DOM_NODE] },
        },
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        {
            // set page component/function
            ...SET_STATE,
            [CMD_ARGS]: acc => ({
                [STATE_PATH]: [$$_VIEW],
                [STATE_DATA]: acc[URL_PAGE] || (console.log(`no \`${URL_PAGE}\` found for this route`), null),
            }),
        },
        {
            // hydrate page state
            ...SET_STATE,
            [CMD_ARGS]: acc => ({
                [STATE_PATH]: acc[URL_PATH],
                [STATE_DATA]:
                    (acc[URL_DATA] && acc[URL_DATA][DOM_BODY]) ||
                    acc[URL_DATA] ||
                    (console.log(
                        `consider returning a \`${URL_DATA}\` property from your router to isolate the data needed for this route`
                    ),
                    acc) ||
                    null,
            }),
        },
        _SET_LINK_ATTRS_DOM,
        _SET_ROUTE_LOADING_FALSE,
        _NOTIFY_PRERENDER_DOM,
    ]

    return subtask
}
