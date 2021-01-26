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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLIPkid = void 0;
var browser_1 = require("@-0/browser");
var checks_1 = require("@thi.ng/checks");
var keys_1 = require("@-0/keys");
var err_str = function (prop) { return "\n  No '" + prop + "' property found on FLIPkid firstChild. \n  Ensure you are providing FLIPkid a component with an \n  attributes object as its second argument with a " + prop + "\n  property for proper FLIP routing.\n"; };
var sim_event = function (href) { return ({
    currentTarget: { document: null },
    target: {
        href: href,
    },
}); };
var _attrs = function (ctx) { return ({
    onclick: function (ev) {
        var _a, _b;
        ev.preventDefault();
        var target = ev.target;
        var href = target.getAttribute("href");
        if (!href)
            return new Error(err_str("href"));
        ctx[keys_1.CFG_RUN$]([
            __assign(__assign({}, browser_1.HURL), (_a = {}, _a[keys_1.CMD_ARGS] = sim_event(href), _a)),
            __assign(__assign({}, browser_1.FLIP_FIRST), (_b = {}, _b[keys_1.CMD_ARGS] = { id: href, target: target }, _b)),
        ]);
    },
}); };
exports.FLIPkid = Object.freeze({
    render: function (ctx, attrs) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        return checks_1.isPlainObject(attrs)
            ? __spread([
                "div",
                __assign(__assign({}, attrs), _attrs(ctx))
            ], rest) : __spread(["div", _attrs(ctx), attrs], rest);
    },
    init: function (el, ctx) {
        var _a;
        ctx[keys_1.CFG_RUN$](__assign(__assign({}, browser_1.FLIP_LAST_INVERSE_PLAY), (_a = {}, _a[keys_1.CMD_ARGS] = {
            element: el.firstChild,
            id: el.firstChild.getAttribute("href"),
        }, _a)));
    },
});
