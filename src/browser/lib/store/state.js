import { Atom } from "@thi.ng/atom";
import { isPlainObject } from "@thi.ng/checks";
import { $$_DEFAULT } from "@-0/keys";
export const $store$ = new Atom($$_DEFAULT);
export const set$$tate = (path, val, store = $store$) => store.swapIn(path, (x) => {
    return isPlainObject(x) && isPlainObject(val) ? Object.assign(Object.assign({}, x), val) : val;
});
