/**
 * @module store/state
 */

import { Atom } from "@thi.ng/atom"
import { isPlainObject, isArray } from "@thi.ng/checks"
import { $$_DEFAULT, DefaultDraft } from "@-0/keys"

// Global $store$ Container from [@thi.ng/atom](http://thi.ng/atom)
export const $store$ = new Atom($$_DEFAULT)

/**
 *
 * Swaps the current value at the given path/lens into the
 * global store with that of the given value. Checks to see
 * if that value should be either spread into an existing
 * object or a complete replacement.
 *
 * If the path is empty (e.g., [] = home page),
 */

export const set$$tate = (path, val, store = $store$) =>
  store.swapIn(path, (x: Object) => {
    return isPlainObject(x) && isPlainObject(val)
      ? // if both swap and target are objects, merge
        { ...x, ...val }
      : // else just reset to val at path (i.e., careful!)
        val
  })
