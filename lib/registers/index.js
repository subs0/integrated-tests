import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream";
import { peek } from "@thi.ng/arrays";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { getIn } from "@thi.ng/paths";
import { DOM_NODE, $$_LOAD, $$_PATH, $$_ROOT, $$_VIEW, URL_FULL, URL_PRSE, ROUTER_PRFX, CFG_RUTR, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK, CFG_RUN$, CFG_STOR, CFG_ROOT, CFG_VIEW, CFG_DRFT, CFG_LOG$, CFG_KICK } from "@-0/keys";
import { registerCMD, $store$, run$ } from "@-0/spool";
import { parse, diff_keys } from "@-0/utils";
import { URL_DOM__ROUTE } from "../tasks";
import { DOMnavigated$ } from "../core/stream$";
export const registerRouterDOM = router => {
    console.log("DOM Router Registered");
    const taskFrom = URL_DOM__ROUTE(router);
    return registerCMD({
        [CMD_SRC$]: DOMnavigated$,
        [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
        [CMD_ARGS]: x => x,
        [CMD_WORK]: args => run$.next(taskFrom({ [URL_FULL]: args[URL_FULL], [DOM_NODE]: args[DOM_NODE] }))
    });
};
const pre = (ctx, body) => (console.log(`
    no ${CFG_VIEW} component provided to boot({ CFG }). 
    Rendering state by route path
    `),
    ["pre", JSON.stringify(body[1], null, 2)]);
export const boot = (CFG) => {
    const root = CFG[CFG_ROOT] || document.body;
    const view = CFG[CFG_VIEW] || pre;
    const draft = CFG[CFG_DRFT];
    const router = CFG[CFG_RUTR];
    const log$ = CFG[CFG_LOG$];
    const kick = CFG[CFG_KICK];
    const knowns = [CFG_ROOT, CFG_VIEW, CFG_DRFT, CFG_RUTR, CFG_LOG$];
    const prfx = router[ROUTER_PRFX] || null;
    const [, others] = diff_keys(knowns, CFG);
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
    const escaped = str => str.replace(escRGX, "\\$&");
    const RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null;
    if (router)
        registerRouterDOM(router);
    const state$ = fromAtom($store$);
    const shell = state$ => (log$ ? console.log(log$, state$) : null,
        state$[$$_LOAD]
            ? null
            : [view, [state$[$$_VIEW], getIn(state$, state$[$$_PATH])]]);
    if (draft)
        $store$.swap(x => (Object.assign(Object.assign({}, draft), x)));
    $store$.resetIn($$_ROOT, root);
    state$.subscribe(sidechainPartition(fromRAF())).transform(map(peek), map(shell), updateDOM({
        root,
        span: false,
        ctx: Object.assign({ [CFG_RUN$]: x => run$.next(x), [CFG_STOR]: $store$, [URL_PRSE]: () => parse(window.location.href, RGX) }, others)
    }));
    if (kick) {
        DOMnavigated$.next({
            target: document,
            currentTarget: document
        });
    }
};
