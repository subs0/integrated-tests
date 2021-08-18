import { DOM_NODE, URL_FULL, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK } from "@-0/keys";
import { run$, registerCMD } from "@-0/spool";
import { Err_missing_props } from "@-0/utils";
import { DOM_URL__ROUTE } from "../tasks";
import { DOMnavigated$ } from "../core";
export const registerRouterDOM = (router) => {
    console.log("DOM Router Registered");
    const routing_task = DOM_URL__ROUTE(router);
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_NAVIGATE",
        [CMD_ARGS]: ({ [URL_FULL]: url, [DOM_NODE]: node }) => ({
            [URL_FULL]: url,
            [DOM_NODE]: node,
        }),
        [CMD_WORK]: ({ [URL_FULL]: url, [DOM_NODE]: node = document }) => {
            const props = { [URL_FULL]: url, [DOM_NODE]: node };
            if (url)
                return run$.next(routing_task(props));
            console.warn(Err_missing_props("_NAVIGATE (from registerRouterDOM)", props));
        },
    });
};
