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
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = void 0;
var rstream_1 = require("@thi.ng/rstream");
var arrays_1 = require("@thi.ng/arrays");
var transducers_1 = require("@thi.ng/transducers");
var transducers_hdom_1 = require("@thi.ng/transducers-hdom");
var paths_1 = require("@thi.ng/paths");
var keys_1 = require("@-0/keys");
var spool_1 = require("@-0/spool");
var utils_1 = require("@-0/utils");
var browser_1 = require("@-0/browser");
var pre = function (ctx, body) { return (console.log("\n    no " + keys_1.CFG_VIEW + " component provided to boot({ CFG }). \n    Rendering state by route path\n    "),
    ["pre", JSON.stringify(body[1], null, 2)]); };
exports.boot = function (CFG) {
    var _a;
    var root = CFG[keys_1.CFG_ROOT] || document.body;
    var view = CFG[keys_1.CFG_VIEW] || pre;
    var draft = CFG[keys_1.CFG_DRFT];
    var router = CFG[keys_1.CFG_RUTR];
    var log$ = CFG[keys_1.CFG_LOG$];
    var kick = CFG[keys_1.CFG_KICK];
    var knowns = Object.values(CFG);
    var prfx = router[keys_1.ROUTER_PRFX] || null;
    var _b = __read(utils_1.diff_keys(knowns, CFG), 2), others = _b[1];
    var escRGX = /[-/\\^$*+?.()|[\]{}]/g;
    var escaped = function (str) { return str.replace(escRGX, "\\$&"); };
    var RGX = prfx ? new RegExp(escaped(prfx || ""), "g") : null;
    if (router)
        browser_1.registerRouterDOM(router);
    else
        throw new Error("no `" + keys_1.CFG_RUTR + "` found on config. See documentation for `boot`");
    var state$ = rstream_1.fromAtom(browser_1.$store$);
    var shell = function (state$) { return (log$ ? console.log(log$, state$) : null,
        state$[keys_1.$$_LOAD]
            ? null
            : [view, [state$[keys_1.$$_VIEW], paths_1.getInUnsafe(state$, state$[keys_1.$$_PATH])]]); };
    if (draft)
        browser_1.$store$.swap(function (x) { return (__assign(__assign({}, draft), x)); });
    browser_1.$store$.resetInUnsafe(keys_1.$$_ROOT, root);
    state$.subscribe(rstream_1.sidechainPartition(rstream_1.fromRAF())).transform(transducers_1.map(arrays_1.peek), transducers_1.map(shell), transducers_hdom_1.updateDOM({
        root: root,
        span: false,
        ctx: __assign((_a = {}, _a[keys_1.CFG_RUN$] = function (x) { return spool_1.run$.next(x); }, _a[keys_1.CFG_STOR] = browser_1.$store$, _a[keys_1.URL_PRSE] = function () {
            return utils_1.parse(window.location.href, RGX);
        }, _a), others)
    }));
    if (kick) {
        browser_1.DOMnavigated$.next({
            target: document,
            currentTarget: document
        });
    }
};
