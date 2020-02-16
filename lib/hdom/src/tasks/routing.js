import { HREF_PUSHSTATE_DOM, NOTIFY_PRERENDER_DOM, SET_LINK_ATTRS_DOM } from "../commands";
import { SET_STATE, URL__ROUTE } from "@-0/spool";
import { $$_VIEW, $$_LOAD, DOM_NODE, URL_FULL, URL_DATA, URL_PATH, URL_PAGE, CMD_ARGS, DOM_BODY, STATE_DATA, STATE_PATH } from "@-0/keys";
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
