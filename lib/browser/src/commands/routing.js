import { URL2obj, Err_missing_props } from "@-0/utils";
import { DOM_NODE, URL_FULL, URL_PATH, CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys";
import { DOMnavigated$ } from "../core/stream$";
export const navEventHandler = ev => {
    var _a;
    const href = (_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.href;
    if (!href)
        console.warn(Err_missing_props("navEventHandler", { target: { href } }));
    const w_href = window.location.href;
    const parsed = URL2obj(w_href);
    const w_path = `/${parsed[URL_PATH].join("/")}`;
    if (href === w_href || href === w_path)
        return;
    DOMnavigated$.next({
        target: { location: { href } },
        currentTarget: ev.currentTarget
    });
    return ev;
};
export const cmd_nav = {
    [CMD_SUB$]: "_NAV",
    [CMD_ARGS]: ev => ev,
    [CMD_WORK]: navEventHandler
};
const setLinkAttrs = target => {
    var _a;
    (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.querySelectorAll("a[visited]").forEach((el) => {
        if (el.href === window.location.href)
            el.setAttribute("active", "");
        else
            el.removeAttribute("active");
    });
    if (target.setAttribute) {
        target.setAttribute("visited", "");
        target.setAttribute("active", "");
    }
};
export const cmd_set_link_attrs_dom = {
    [CMD_SUB$]: "_SET_LINK_ATTRS_DOM",
    [CMD_ARGS]: acc => acc,
    [CMD_WORK]: acc => {
        const node = acc[DOM_NODE];
        const props = {
            [DOM_NODE]: node
        };
        if (node)
            return setLinkAttrs(node);
        return console.warn(Err_missing_props("_SET_LINK_ATTRS_DOM", props));
    }
};
export const cmd_href_pushstate_dom = {
    [CMD_SUB$]: "_HREF_PUSHSTATE_DOM",
    [CMD_ARGS]: acc => acc,
    [CMD_WORK]: acc => {
        const url = acc[URL_FULL];
        const node = acc[DOM_NODE];
        const props = {
            [URL_FULL]: url,
            [DOM_NODE]: node
        };
        if (url && node && !node.document)
            return history.pushState(URL2obj(url), null, url);
        if (!url || !node)
            return console.warn(Err_missing_props("_HREF_PUSHSTATE_DOM", props));
    }
};
export const cmd_notify_prerender_dom = {
    [CMD_SUB$]: "_NOTIFY_PRERENDER_DOM",
    [CMD_ARGS]: true,
    [CMD_WORK]: () => document === null || document === void 0 ? void 0 : document.dispatchEvent(new Event("rendered"))
};
