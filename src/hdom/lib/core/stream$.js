import { fromDOMEvent, merge } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { URL_FULL, DOM_NODE } from "@-0/keys";
export const popstate$ = fromDOMEvent(window, "popstate");
export const DOMContentLoaded$ = fromDOMEvent(window, "DOMContentLoaded");
export const DOMnavigated$ = merge({
    src: [popstate$, DOMContentLoaded$]
}).transform(map((x) => ({
    [URL_FULL]: x.target.location.href,
    [DOM_NODE]: x.currentTarget
})));
