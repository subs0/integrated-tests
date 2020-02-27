/**
 * @module commands/state
 */
import { CMD_SUB$, CMD_ARGS, CMD_WORK, STATE_DATA, STATE_PATH } from "@-0/keys"
import { set$$tate, $store$ } from "../store"
import { registerCMD } from "@-0/spool"

/**
 * Higher-order function that takes a `@thi.ng/Atom` state
 * container and returns a Command object for setting that
 * Atom's state by the provided path (lens)
 */
export const createSetStateCMD: any = store =>
  registerCMD({
    [CMD_SUB$]: "_SET_STATE",
    [CMD_ARGS]: x => x,
    [CMD_WORK]: args => set$$tate(args[STATE_PATH], args[STATE_DATA], store)
  })

export const SET_STATE = createSetStateCMD($store$)
