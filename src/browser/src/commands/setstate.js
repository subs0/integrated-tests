/**
 * @module commands/state
 */
import { CMD_SUB$, CMD_ARGS, CMD_WORK, STATE_DATA, STATE_PATH } from "@-0/keys"
import { set$$tate, $store$ } from "../store"
import { registerCMD } from "@-0/spool"
import { Err_missing_props } from "@-0/utils"

/**
 * Higher-order function that takes a `@thi.ng/Atom` state
 * container and returns a Command object for setting that
 * Atom's state by the provided path (lens)
 *
 * Some of -0's other exported functions (e.g.,
 * registerRouterDOM) will use the output of this function
 * to set data to the global store. It is important to
 * retain the work handler's signature when sending these
 * Commands:
 * ```js
 * args: {
 *      STATE_PATH: [], // <- must be an Array
 *      STATE_DATA: {}  // <- can be anything, but preferrably an Object
 * }
 * ```
 */
export const createSetStateCMD = (store = $store$, sub$ = "_SET_STATE") =>
    registerCMD({
        [CMD_SUB$]: sub$,
        [CMD_ARGS]: ({ [STATE_PATH]: path, [STATE_DATA]: data }) => ({
            [STATE_PATH]: path,
            [STATE_DATA]: data,
        }),
        [CMD_WORK]: ({ [STATE_PATH]: path, [STATE_DATA]: data }) => {
            const props = {
                [STATE_PATH]: path,
                [STATE_DATA]: data,
            }
            if (path && data !== undefined) return set$$tate(path, data, store)
            console.warn(Err_missing_props(sub$, props))
        },
    })

/**
 *
 * Command that sets global store state using a path and
 * data key from args
 */
export const SET_STATE = createSetStateCMD()
