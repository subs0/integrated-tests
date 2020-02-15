/**
 * @module tasks/routing
 */

import { isObject } from "@thi.ng/checks"

import {
  HREF_PUSHSTATE_DOM,
  NOTIFY_PRERENDER_DOM,
  SET_LINK_ATTRS_DOM
  // msTaskPromiseDelay,
} from "../commands"

import { $store$, SET_STATE, URL__ROUTE } from "@-0/spool"
import {
  $$_VIEW,
  $$_LOAD,
  $$_PATH,
  DOM_NODE,
  URL_FULL,
  URL_DATA,
  URL_PATH,
  URL_PAGE,
  ROUTER_PREP,
  ROUTER_POST,
  ROUTER_PRFX,
  CFG_RUTR,
  CMD_ARGS,
  CMD_RESO,
  CMD_ERRO,
  DOM_BODY,
  STATE_DATA,
  STATE_PATH
} from "@-0/keys"

import { parse } from "@-0/utils"

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
        [STATE_PATH]: [$$_LOAD],
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
     * takes the result from two sources: the user-provided
     * [`router`](http://thi.ng/associative) and a `unFURL`d URL
     *
     * ### work: side-effecting
     *
     * Hydrates the page state as well as the name of the active
     * page in the global store
     */
    {
      ...SET_STATE,
      [CMD_ARGS]: _acc => ({
        [STATE_PATH]: [$$_VIEW],
        [STATE_DATA]: _acc[URL_PAGE]
      })
    },
    {
      ...SET_STATE,
      [CMD_ARGS]: _acc => ({
        [STATE_PATH]: _acc[URL_PATH],
        [STATE_DATA]: _acc[URL_DATA][DOM_BODY] || _acc[URL_DATA]
      })
    },
    // example ad-hoc stream injection
    // { sub$: log$, args: () => ({ DOM }) },
    SET_LINK_ATTRS_DOM,
    {
      ...SET_STATE,
      // wait on pending promise(s) w/a non-nullary fn (+)=>
      [CMD_ARGS]: _ => ({
        [STATE_PATH]: [$$_LOAD],
        [STATE_DATA]: false
      })
    },
    NOTIFY_PRERENDER_DOM
  ]
}
