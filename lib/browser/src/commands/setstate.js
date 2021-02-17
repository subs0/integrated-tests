import { CMD_SUB$, CMD_ARGS, CMD_WORK, SET_DATA, SET_PATH } from "@-0/keys";
import { set$$tate, $store$ } from "../store";
import { registerCMD } from "@-0/spool";
import { Err_missing_props } from "@-0/utils";
export const createSetStateCMD = store => registerCMD({
    [CMD_SUB$]: "_SET_STATE",
    [CMD_ARGS]: x => x,
    [CMD_WORK]: args => {
        const path = args[SET_PATH];
        const data = args[SET_DATA];
        const props = {
            [SET_PATH]: path,
            [SET_DATA]: data
        };
        if (path && data !== undefined)
            return set$$tate(path, data, store);
        console.warn(Err_missing_props("_SET_STATE", props, args));
    }
});
export const SET_STATE = createSetStateCMD($store$);
