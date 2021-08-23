import { isPlainObject } from "@thi.ng/checks";
import { _HREF_PUSHSTATE_DOM, SET_STATE, _NOTIFY_PRERENDER_DOM, _SET_LINK_ATTRS_DOM } from "../commands";
import { $$_VIEW, $$_LOAD, $$_PATH, DOM_NODE, URL_FULL, URL_DATA, URL_PATH, URL_PAGE, RTR_PREP, RTR_POST, RTR_PRFX, CFG_RUTR, CMD_ARGS, CMD_RESO, CMD_ERRO, DOM_BODY, STATE_DATA, STATE_PATH, } from "@-0/keys";
import { URL2obj } from "@-0/utils";
const _SET_ROUTE_PATH = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: _acc => ({
        [STATE_DATA]: _acc[URL_PATH],
        [STATE_PATH]: [$$_PATH],
    }) });
const route_error = (_acc, _err, _out) => console.warn("Error in URL__ROUTE:", _err);
const e_s = `Prerequisite property: { ${CMD_ARGS}: { ${URL_FULL}: NOT FOUND 🔥 } }`;
export const __URL__ROUTE = (CFG) => {
    const rtr = CFG[CFG_RUTR] || null;
    const pre = CFG[RTR_PREP] || null;
    const pst = CFG[RTR_POST] || null;
    const pfx = CFG[RTR_PRFX] || null;
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
    const escaped = string => string.replace(escRGX, "\\$&");
    const RUTR = rtr || CFG;
    const _PREP = (pre && isPlainObject(pre) ? [pre] : pre) || [];
    const _POST = (pst && isPlainObject(pst) ? [pst] : pst) || [];
    const prefix = pfx ? new RegExp(escaped(pfx), "g") : null;
    const subtask = (ACC) => [
        ..._PREP,
        {
            [CMD_ARGS]: ACC[URL_FULL] ? RUTR(ACC[URL_FULL].replace(prefix, "")) : new Error(e_s),
            [CMD_RESO]: (_acc, _res) => (Object.assign(Object.assign({}, (_res && _res[URL_PAGE] && { [URL_PAGE]: _res[URL_PAGE] })), (_res && _res[URL_DATA] && { [URL_DATA]: _res[URL_DATA] }))),
            [CMD_ERRO]: route_error,
        },
        {
            [CMD_ARGS]: ACC[URL_FULL] ? URL2obj(ACC[URL_FULL], prefix) : new Error(e_s),
            [CMD_ERRO]: route_error,
        },
        _SET_ROUTE_PATH,
        ..._POST,
    ];
    return subtask;
};
const _SET_ROUTE_LOADING_TRUE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: true } });
const _SET_ROUTE_LOADING_FALSE = Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: { [STATE_PATH]: [$$_LOAD], [STATE_DATA]: false } });
export const __DOM_URL__ROUTE = (CFG) => {
    const match = __URL__ROUTE(CFG);
    const subtask = (ACC) => [
        _SET_ROUTE_LOADING_TRUE,
        Object.assign(Object.assign({}, _HREF_PUSHSTATE_DOM), { [CMD_ARGS]: { [URL_FULL]: ACC[URL_FULL], [DOM_NODE]: ACC[DOM_NODE] } }),
        ACC => match({ [URL_FULL]: ACC[URL_FULL] }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: acc => ({
                [STATE_PATH]: [$$_VIEW],
                [STATE_DATA]: acc[URL_PAGE] || (console.log(`no \`${URL_PAGE}\` found for this route`), null),
            }) }),
        Object.assign(Object.assign({}, SET_STATE), { [CMD_ARGS]: acc => ({
                [STATE_PATH]: acc[URL_PATH],
                [STATE_DATA]: (acc[URL_DATA] && acc[URL_DATA][DOM_BODY]) ||
                    acc[URL_DATA] ||
                    (console.log(`consider returning a \`${URL_DATA}\` property from your router to isolate the data needed for this route`),
                        acc) ||
                    null,
            }) }),
        _SET_LINK_ATTRS_DOM,
        _SET_ROUTE_LOADING_FALSE,
        _NOTIFY_PRERENDER_DOM,
    ];
    return subtask;
};
