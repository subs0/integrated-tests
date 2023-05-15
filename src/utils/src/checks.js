import { isPlainObject, isArray } from "@thi.ng/checks"

export const isEmpty = x => {
    const is_empty_object = isPlainObject(x) && !Object.keys(x).length
    const is_empty_array = isArray(x) && !x.length
    const is_bogus = x === undefined || x === null
    return is_bogus || is_empty_array || is_empty_object ? true : false
}
