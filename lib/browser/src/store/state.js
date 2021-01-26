"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set$$tate = exports.$store$ = void 0;
var atom_1 = require("@thi.ng/atom");
var checks_1 = require("@thi.ng/checks");
var keys_1 = require("@-0/keys");
exports.$store$ = new atom_1.Atom(keys_1.$$_DEFAULT);
exports.set$$tate = function (path, val, store) {
    if (store === void 0) { store = exports.$store$; }
    return store.swapIn(path, function (x) {
        return checks_1.isPlainObject(x) && checks_1.isPlainObject(val)
            ? __assign(__assign({}, x), val) :
            val;
    });
};
