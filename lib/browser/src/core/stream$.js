import { fromDOMEvent, merge } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { URL_FULL, DOM_NODE } from "@-0/keys";
export const popstate$ = fromDOMEvent(window, "popstate");
export const DOMContentLoaded$ = fromDOMEvent(window, "DOMContentLoaded");
export const DOMnavigated$ = merge({
    src: [popstate$, DOMContentLoaded$],
}).transform({
    xform: map((x) => {
        if (x.target.location.href && x.currentTarget) {
            return {
                [URL_FULL]: x.target.location.href,
                [DOM_NODE]: x.currentTarget,
            };
        }
        console.log("DOMnavigated$ triggered, but missing `x.target.location.href &/ x.currentTarget`", JSON.stringify(x, null, 2));
        return x;
    }),
    error: e => {
        console.warn("error in DOMnavigated$:", e);
        return true;
    },
});
