import { fromAtom, sidechainPartition, fromRAF } from "@thi.ng/rstream";
import { peek } from "@thi.ng/arrays";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { getInUnsafe } from "@thi.ng/paths";
import { $$_LOAD, $$_PATH, $$_ROOT, $$_VIEW, URL_PRSE, RTR_PRFX, CFG_RUTR, CFG_RUN$, CFG_STOR, CFG_ROOT, CFG_VIEW, CFG_DRFT, CFG_LOG$, CFG_KICK, } from "@-0/keys";
import { run$ } from "@-0/spool";
import { URL2obj, diff_keys } from "@-0/utils";
import { registerRouterDOM, DOMnavigated$, $store$ } from "@-0/browser";
const pre = (ctx, body) => (console.log(`
    no ${CFG_VIEW} component provided to boot({ CFG }). 
    Rendering state by route path
    `),
    ["pre", JSON.stringify(body[1], null, 2)]);
export const boot = CFG => {
    const root = CFG[CFG_ROOT] || document.body;
    const view = CFG[CFG_VIEW] || pre;
    const draft = CFG[CFG_DRFT];
    const router = CFG[CFG_RUTR];
    const log$ = CFG[CFG_LOG$];
    const kick = CFG[CFG_KICK];
    const knowns = Object.values(CFG);
    const prfx = router[RTR_PRFX] || null;
    const [, others] = diff_keys(knowns, CFG);
    const escRGX = /[-/\\^$*+?.()|[\]{}]/g;
    const escaped = str => str.replace(escRGX, "\\$&");
    const RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null;
    if (router)
        registerRouterDOM(router);
    else
        throw new Error(`no \`${CFG_RUTR}\` found on config. See documentation for \`boot\``);
    const state$ = fromAtom($store$);
    const shell = state$ => (log$ ? console.log(log$, state$) : null,
        state$[$$_LOAD] ? null : [view, [state$[$$_VIEW], getInUnsafe(state$, state$[$$_PATH])]]);
    if (draft)
        $store$.swap(x => (Object.assign(Object.assign({}, draft), x)));
    $store$.resetInUnsafe($$_ROOT, root);
    state$.subscribe(sidechainPartition(fromRAF())).transform(map(peek), map(shell), updateDOM({
        root,
        span: false,
        ctx: Object.assign({ [CFG_RUN$]: x => run$.next(x), [CFG_STOR]: $store$, [URL_PRSE]: () => URL2obj(window.location.href, RGX) }, others),
    }));
    if (kick) {
        DOMnavigated$.next({
            target: document,
            currentTarget: document,
        });
    }
};
