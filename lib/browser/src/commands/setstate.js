import { CMD_SUB$, CMD_ARGS, CMD_WORK, STATE_DATA, STATE_PATH } from "@-0/keys";
import { set$$tate, $store$ } from "../store";
import { registerCMD } from "@-0/spool";
import { Err_missing_props } from "@-0/utils";
export const createSetStateCMD = (store) => registerCMD({
    [CMD_SUB$]: "_SET_STATE",
    [CMD_ARGS]: x => x,
    [CMD_WORK]: args => {
        const path = args[STATE_PATH];
        const data = args[STATE_DATA];
        const props = {
            [STATE_PATH]: path,
            [STATE_DATA]: data,
        };
        if (path && data !== undefined)
            return set$$tate(path, data, store);
        console.warn(Err_missing_props("_SET_STATE", props));
    },
});
export const SET_STATE = createSetStateCMD($store$);
