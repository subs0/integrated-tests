import { isObject, isFunction, isPromise } from "@thi.ng/checks";
export const stringify_type = x => {
    if (isFunction(x) && x.length === 0)
        return "THUNK";
    if (isFunction(x) && x.length > 0)
        return "FUNCTION";
    if (isPromise(x))
        return "PROMISE";
    if (isObject(x))
        return "OBJECT";
    return "type_str NOT FOUND";
};
