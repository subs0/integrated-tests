import { isObject } from "@thi.ng/checks";
import { HREF_PUSHSTATE_DOM, NOTIFY_PRERENDER_DOM, SET_LINK_ATTRS_DOM, SET_STATE } from "../commands";
import { $$_VIEW, $$_LOAD, $$_PATH, DOM_NODE, URL_FULL, URL_DATA, URL_PATH, URL_PAGE, ROUTER_PREP, ROUTER_POST, ROUTER_PRFX, CFG_RUTR, CMD_ARGS, CMD_RESO, CMD_ERRO, DOM_BODY, STATE_DATA, STATE_PATH } from "@-0/keys";
import { parse } from "@-0/utils";
export const URL__ROUTE = (CFG) => {
    let router, preroute, postroute, prefix;
    if (isObject(CFG)) {
        const ruts = CFG[CFG_RUTR];
        const prep = CFG[ROUTER_PREP];
        const post = CFG[ROUTER_POST];
        const prfx = CFG[ROUTER_PRFX] || null;
        const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
        const escaped = string => string.replace(escRGX, "\\$&");
        router = ruts;
        preroute = isObject(prep) ? [prep] : prep || [];
        postroute = isObject(post) ? [post] : post || [];
        prefix = prfx ? new RegExp(escaped(prfx), "g") : null;
    }
    else {
        router = CFG;
        preroute = [];
        postroute = [];
        prefix = null;
    }
    const task = acc => [
        ...preroute,
        {
            [CMD_ARGS]: prefix ? router(acc[URL_FULL].replace(prefix, "")) : router(acc[URL_FULL]),
            [CMD_RESO]: (_acc, _res) => ({
                [URL_PAGE]: _res[URL_PAGE],
                [URL_DATA]: _res[URL_DATA]
            }),
            [CMD_ERRO]: (_acc, _err) => console.warn("Error in URL__ROUTE:", _err, "constructed:", _acc)
        },
        {
            [CMD_ARGS]: prefix ? parse(acc[URL_FULL], prefix) : parse(acc[URL_FULL])
        },
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
                [STATE_DATA]: _acc[URL_PATH],
                [STATE_PATH]: [$$_PATH]
            }) }),
        ...postroute
    ];
    return task;
};
export const URL_DOM__ROUTE = CFG => {
    const match = URL__ROUTE(CFG);
    return acc => [
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: {
                [STATE_PATH]: [$$_LOAD],
                [STATE_DATA]: true
            } }),
        Object.assign(Object.assign({}, HREF_PUSHSTATE_DOM), { [CMD_ARGS]: { [URL_FULL]: acc[URL_FULL], [DOM_NODE]: acc[DOM_NODE] } }),
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
                [STATE_PATH]: [$$_VIEW],
                [STATE_DATA]: _acc[URL_PAGE]
            }) }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
                [STATE_PATH]: _acc[URL_PATH],
                [STATE_DATA]: _acc[URL_DATA][DOM_BODY] || _acc[URL_DATA]
            }) }),
        SET_LINK_ATTRS_DOM,
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _ => ({
                [STATE_PATH]: [$$_LOAD],
                [STATE_DATA]: false
            }) }),
        NOTIFY_PRERENDER_DOM
    ];
};
