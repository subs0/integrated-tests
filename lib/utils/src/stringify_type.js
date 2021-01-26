"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify_type = void 0;
var checks_1 = require("@thi.ng/checks");
exports.stringify_type = function (x) {
    if (checks_1.isFunction(x) && x.length === 0)
        return "THUNK";
    if (checks_1.isFunction(x) && x.length > 0)
        return "FUNCTION";
    if (checks_1.isPromise(x))
        return "PROMISE";
    if (checks_1.isObject(x))
        return "OBJECT";
    return "type_str NOT FOUND";
};
