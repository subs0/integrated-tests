import { isObject } from "@thi.ng/checks";
import { HREF_PUSHSTATE_DOM, NOTIFY_PRERENDER_DOM, SET_LINK_ATTRS_DOM, SET_STATE } from "../commands";
import { $$_VIEW, $$_LOAD, $$_PATH, DOM_NODE, URL_FULL, URL_DATA, URL_PATH, URL_PAGE, RTR_PREP, RTR_POST, RTR_PRFX, CFG_RUTR, CMD_ARGS, CMD_RESO, CMD_ERRO, DOM_BODY, STATE_DATA, STATE_PATH } from "@-0/keys";
import { URL2obj } from "@-0/utils";
const SET_ROUTE_PATH = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
        [STATE_DATA]: _acc[URL_PATH],
        [STATE_PATH]: [$$_PATH]
    }) });
export const URL__ROUTE = (CFG) => {
    let router, preroute, postroute, prefix;
    if (isObject(CFG)) {
        const ruts = CFG[CFG_RUTR];
        const prep = CFG[RTR_PREP];
        const post = CFG[RTR_POST];
        const prfx = CFG[RTR_PRFX] || null;
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
                [URL_PAGE]: (_res && _res[URL_PAGE]) || null,
                [URL_DATA]: (_res && _res[URL_DATA]) || null
            }),
            [CMD_ERRO]: (_acc, _err) => console.warn("Error in URL__ROUTE:", _err, "constructed:", _acc)
        },
        {
            [CMD_ARGS]: prefix ? URL2obj(acc[URL_FULL], prefix) : URL2obj(acc[URL_FULL])
        },
        SET_ROUTE_PATH,
        ...postroute
    ];
    return task;
};
const SET_ROUTE_LOADING_TRUE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: true } });
const SET_ROUTE_LOADING_FALSE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: false } });
export const URL_DOM__ROUTE = CFG => {
    const match = URL__ROUTE(CFG);
    return acc => [
        SET_ROUTE_LOADING_TRUE,
        Object.assign(Object.assign({}, HREF_PUSHSTATE_DOM), { [CMD_ARGS]: { [URL_FULL]: acc[URL_FULL], [DOM_NODE]: acc[DOM_NODE] } }),
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
                [STATE_PATH]: [$$_VIEW],
                [STATE_DATA]: _acc[URL_PAGE] || null
            }) }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
                [STATE_PATH]: _acc[URL_PATH],
                [STATE_DATA]: (_acc[URL_DATA] && _acc[URL_DATA][DOM_BODY]) || _acc[URL_DATA]
            }) }),
        SET_LINK_ATTRS_DOM,
        SET_ROUTE_LOADING_FALSE,
        NOTIFY_PRERENDER_DOM
    ];
};
