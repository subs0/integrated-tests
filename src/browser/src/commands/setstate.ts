/**
 * @module commands/state
 */
import { CMD_SUB$, CMD_ARGS, CMD_WORK, STATE_DATA, STATE_PATH, Command } from "@-0/keys"
import { set$$tate, $store$ } from "../store"
import { registerCMD } from "@-0/spool"
import { Err_missing_props } from "@-0/utils"

/**
 * Higher-order function that takes a `@thi.ng/Atom` state
 * container and returns a Command object for setting that
 * Atom's state by the provided path (lens)
 */
export const createSetStateCMD = (store): Command =>
    registerCMD({
        [CMD_SUB$]: "_SET_STATE",
        [CMD_ARGS]: x => x,
        [CMD_WORK]: args => {
            const path = args[STATE_PATH]
            const data = args[STATE_DATA]
            const props = {
                [STATE_PATH]: path,
                [STATE_DATA]: data,
            }
            if (path && data !== undefined) return set$$tate(path, data, store)
            console.warn(Err_missing_props("_SET_STATE", props))
        },
    })

/**
 *
 * Command that sets global store state using a path and
 * data key from args
 */
export const SET_STATE: Command = createSetStateCMD($store$)
