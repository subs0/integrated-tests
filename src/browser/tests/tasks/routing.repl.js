import { isFunction, isPlainObject } from "@thi.ng/checks"
import { stringify_fn } from "@-0/utils"

const labeler = (obj = {}) =>
    Object.entries(obj).reduce((a, [ k, v ], i) => {
        if (v === undefined) return (a[k] = "undefined 🔥"), a
        if (isPlainObject(v)) return (a[k] = labeler(v)), a
        if (isFunction(v)) return (a[k] = stringify_fn(v)), a
        return (a[k] = v), a
    }, {})

const obj = { a: "a", b: { b1: undefined, b2: "defined" }, c: ({ here }) => `I was ${here}` }

labeler(obj) //?
