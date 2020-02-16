import { parse } from "@-0/utils";
import { DOM_NODE, URL_FULL, URL_PATH, CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys";
import { registerCMD } from "@-0/spool";
import { DOMnavigated$ } from "../core/stream$";
export const HURLer = ev => {
    const href = ev.target.href;
    const w_href = window.location.href;
    const parsed = parse(w_href);
    const w_path = `/${parsed[URL_PATH].join("/")}`;
    if (href === w_href || href === w_path)
        return;
    DOMnavigated$.next({
        target: { location: { href } },
        currentTarget: ev.currentTarget
    });
    return ev;
};
export const HURL = registerCMD({
    [CMD_SUB$]: "_HURL",
    [CMD_ARGS]: ev => ev,
    [CMD_WORK]: HURLer
});
const setLinkAttrs = target => {
    document.body.querySelectorAll("a[visited]").forEach((el) => {
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
export const SET_LINK_ATTRS_DOM = registerCMD({
    [CMD_SUB$]: "_SET_LINK_ATTRS_DOM",
    [CMD_ARGS]: acc => ({ [DOM_NODE]: acc[DOM_NODE] }),
    [CMD_WORK]: args => setLinkAttrs(args[DOM_NODE])
});
export const HREF_PUSHSTATE_DOM = registerCMD({
    [CMD_SUB$]: "_HREF_PUSHSTATE_DOM",
    [CMD_ARGS]: acc => ({ [URL_FULL]: acc[URL_FULL], [DOM_NODE]: acc[DOM_NODE] }),
    [CMD_WORK]: args => !args[DOM_NODE].document ? history.pushState(parse(args[URL_FULL]), null, args[URL_FULL]) : null
});
export const NOTIFY_PRERENDER_DOM = registerCMD({
    [CMD_SUB$]: "_NOTIFY_PRERENDER_DOM",
    [CMD_ARGS]: true,
    [CMD_WORK]: () => document.dispatchEvent(new Event("rendered"))
});
