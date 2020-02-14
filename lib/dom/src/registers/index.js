import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream";
import { peek } from "@thi.ng/arrays";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { getIn } from "@thi.ng/paths";
import { DOM_NODE, $$_LOAD, $$_PATH, $$_ROOT, $$_VIEW, URL_FULL, URL_PRSE, ROUTER_PRFX, CFG_RUTR, CMD_SUB$, CMD_ARGS, CMD_SRC$, CMD_WORK, CFG_RUN$, CFG_STOR, CFG_ROOT, CFG_VIEW, CFG_DRFT, CFG_LOG$, CFG_KICK } from "@-0/keys";
import { registerCMD, $store$, run$, registerCMDtoStore, createSetStateCMD } from "@-0/spool";
import { flipFirstCMD, flipLastCMD, hrefPushStateCMD, hurlCMD, injectHeadCMD, notifyPrerenderCMD, setLinkAttrsCMD } from "../commands";
import { parse, diff_keys } from "@-0/utils";
import { URL_DOM__ROUTE } from "../tasks";
import { DOMnavigated$ } from "../core/stream$";
export const registerRouterCMD = {
    [CMD_SRC$]: DOMnavigated$,
    [CMD_SUB$]: "_URL_NAVIGATED$_DOM",
    [CMD_ARGS]: x => x
};
const _CMD_WORK = router => {
    const task = URL_DOM__ROUTE(router);
    return {
        [CMD_WORK]: args => run$.next(task({ [URL_FULL]: args[URL_FULL], [DOM_NODE]: args[DOM_NODE] }))
    };
};
export const registerRouterDOM = router => {
    console.log("DOM Router Registered");
    return registerCMD(Object.assign(Object.assign({}, registerRouterCMD), _CMD_WORK(router)));
};
export const registerDOMrouterCMD = (router) => {
    console.log("DOM Router Registered");
    return Object.assign(Object.assign({}, registerRouterCMD), _CMD_WORK(router));
};
const pre = (ctx, body) => (console.log(`
    no ${CFG_VIEW} component provided to boot({ CFG }). 
    Rendering state by route path
    `),
    ["pre", JSON.stringify(body[1], null, 2)]);
export const pair = (globalStore = $store$, Commands = []) => {
    const allCommands = [...baseCommands, ...Commands];
    const CMDS = allCommands.reduce((a, c) => {
        c[CMD_SUB$]
            ?
                { [c[CMD_SUB$]]: registerCMDtoStore(globalStore)(c) }
            :
                ((c = registerCMDtoStore(globalStore)(c)), { [c[CMD_SUB$]]: c });
    }, {});
    const boot = (CFG) => {
        const root = CFG[CFG_ROOT] || document.body;
        const view = CFG[CFG_VIEW] || pre;
        const store = CFG[CFG_STOR] || globalStore;
        const draft = CFG[CFG_DRFT];
        const router = CFG[CFG_RUTR];
        const log$ = CFG[CFG_LOG$];
        const kick = CFG[CFG_KICK];
        const knowns = Object.values(CFG);
        const prfx = router[ROUTER_PRFX] || null;
        const [, others] = diff_keys(knowns, CFG);
        const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
        const escaped = str => str.replace(escRGX, "\\$&");
        const RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null;
        if (router)
            registerRouterDOM(router);
        const state$ = fromAtom(globalStore);
        const shell = state$ => (log$ ? console.log(log$, state$) : null,
            state$[$$_LOAD] ? null : [view, [state$[$$_VIEW], getIn(state$, state$[$$_PATH])]]);
        if (draft)
            globalStore.swap(x => (Object.assign(Object.assign({}, draft), x)));
        globalStore.resetIn($$_ROOT, root);
        state$.subscribe(sidechainPartition(fromRAF())).transform(map(peek), map(shell), updateDOM({
            root,
            span: false,
            ctx: Object.assign({ [CFG_RUN$]: x => run$.next(x), [CFG_STOR]: globalStore, [URL_PRSE]: () => parse(window.location.href, RGX) }, others)
        }));
        if (kick) {
            DOMnavigated$.next({
                target: document,
                currentTarget: document
            });
        }
    };
    return [boot];
};
const baseCommands = [
    createSetStateCMD,
    flipFirstCMD,
    flipLastCMD,
    hrefPushStateCMD,
    hurlCMD,
    injectHeadCMD,
    notifyPrerenderCMD,
    setLinkAttrsCMD
];
export const boot = (CFG) => {
    const root = CFG[CFG_ROOT] || document.body;
    const view = CFG[CFG_VIEW] || pre;
    const store = CFG[CFG_STOR] || $store$;
    const draft = CFG[CFG_DRFT];
    const router = CFG[CFG_RUTR];
    const log$ = CFG[CFG_LOG$];
    const kick = CFG[CFG_KICK];
    const knowns = Object.values(CFG);
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
