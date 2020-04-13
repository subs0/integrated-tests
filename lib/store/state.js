import { Atom } from "@thi.ng/atom";
import { $$_DEFAULT } from "@-0/keys";
export const $store$ = new Atom($$_DEFAULT);
export const set$$tate = (path, val, store = $store$) => store.resetInUnsafe(path, val);
