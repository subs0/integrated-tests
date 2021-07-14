import { isPlainObject } from "@thi.ng/checks";
import { cmd_href_pushstate_dom, cmd_notify_prerender_dom, cmd_set_link_attrs_dom, SET_STATE, } from "../commands";
import { $$_VIEW, $$_LOAD, $$_PATH, DOM_NODE, URL_FULL, URL_DATA, URL_PATH, URL_PAGE, RTR_PREP, RTR_POST, RTR_PRFX, CFG_RUTR, CMD_ARGS, CMD_RESO, CMD_ERRO, DOM_BODY, STATE_DATA, STATE_PATH, } from "@-0/keys";
import { URL2obj } from "@-0/utils";
import { registerCMD } from "@-0/spool";
const SET_ROUTE_PATH = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
        [STATE_DATA]: _acc[URL_PATH],
        [STATE_PATH]: [$$_PATH],
    }) });
const route_error = (_acc, _err, _out) => console.warn("Error in URL__ROUTE:", _err);
const e_s = `Prerequisite property: { ${CMD_ARGS}: { ${URL_FULL}: NOT FOUND 🔥 } }`;
export const URL__ROUTE = (CFG) => {
    let router, preroute, postroute, prefix;
    if (isPlainObject(CFG)) {
        const rtr = CFG[CFG_RUTR];
        const pre = CFG[RTR_PREP];
        const pst = CFG[RTR_POST];
        const pfx = CFG[RTR_PRFX] || null;
        const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
        const escaped = string => string.replace(escRGX, "\\$&");
        router = rtr;
        preroute = isPlainObject(pre) ? [pre] : pre || [];
        postroute = isPlainObject(pst) ? [pst] : pst || [];
        prefix = pfx ? new RegExp(escaped(pfx), "g") : null;
    }
    else {
        router = CFG;
        preroute = [];
        postroute = [];
        prefix = "";
    }
    const subtask = acc => [
        ...preroute,
        {
            [CMD_ARGS]: acc[URL_FULL] ? router(acc[URL_FULL].replace(prefix, "")) : new Error(e_s),
            [CMD_RESO]: (_acc, _res) => (Object.assign(Object.assign({}, _res && _res[URL_PAGE] && { [URL_PAGE]: _res[URL_PAGE] }), { [URL_DATA]: (_res && _res[URL_DATA]) || null })),
            [CMD_ERRO]: route_error,
        },
        {
            [CMD_ARGS]: acc[URL_FULL] ? URL2obj(acc[URL_FULL], prefix) : new Error(e_s),
            [CMD_ERRO]: route_error,
        },
        SET_ROUTE_PATH,
        ...postroute,
    ];
    return subtask;
};
const SET_ROUTE_LOADING_TRUE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: true } });
const SET_ROUTE_LOADING_FALSE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: false } });
export const NOTIFY_PRERENDER_DOM = registerCMD(cmd_notify_prerender_dom);
export const SET_LINK_ATTRS_DOM = registerCMD(cmd_set_link_attrs_dom);
export const HREF_PUSHSTATE_DOM = registerCMD(cmd_href_pushstate_dom);
export const URL_DOM__ROUTE = CFG => {
    const match = URL__ROUTE(CFG);
    const subtask = ACC => [
        SET_ROUTE_LOADING_TRUE,
        Object.assign(Object.assign({}, HREF_PUSHSTATE_DOM), { [CMD_ARGS]: { [URL_FULL]: ACC[URL_FULL], [DOM_NODE]: ACC[DOM_NODE] } }),
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: acc => ({
                [STATE_PATH]: [$$_VIEW],
                [STATE_DATA]: acc[URL_PAGE] || null,
            }) }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: acc => ({
                [STATE_PATH]: acc[URL_PATH],
                [STATE_DATA]: (acc[URL_DATA] && acc[URL_DATA][DOM_BODY]) || acc[URL_DATA] || null,
            }) }),
        SET_LINK_ATTRS_DOM,
        SET_ROUTE_LOADING_FALSE,
        NOTIFY_PRERENDER_DOM,
    ];
    return subtask;
};
