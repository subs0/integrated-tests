import { DOM_NODE, URL_FULL, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK } from "@-0/keys";
import { run$, registerCMD } from "@-0/spool";
import { Err_missing_props } from "@-0/utils";
import { URL_DOM__ROUTE } from "../tasks";
import { DOMnavigated$ } from "../core";
export const registerRouterDOM = (router) => {
    console.log("DOM Router Registered");
    const task = URL_DOM__ROUTE(router);
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
        [CMD_ARGS]: acc => acc,
        [CMD_WORK]: acc => {
            const url = acc[URL_FULL];
            const node = acc[DOM_NODE];
            const props = { [URL_FULL]: url, [DOM_NODE]: node };
            if (url && node)
                return run$.next(task(props));
            console.warn(Err_missing_props("_URL_NAVIGATED$_DOM (registerRouterDOM)", props));
        }
    });
};
