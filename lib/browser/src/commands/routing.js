"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFY_PRERENDER_DOM = exports.HREF_PUSHSTATE_DOM = exports.SET_LINK_ATTRS_DOM = exports.HURL = exports.HURLer = void 0;
var utils_1 = require("@-0/utils");
var keys_1 = require("@-0/keys");
var spool_1 = require("@-0/spool");
var stream_1 = require("../core/stream$");
exports.HURLer = function (ev) {
    var href = ev.target.href;
    var w_href = window.location.href;
    var parsed = utils_1.parse(w_href);
    var w_path = "/" + parsed[keys_1.URL_PATH].join("/");
    if (href === w_href || href === w_path)
        return;
    stream_1.DOMnavigated$.next({
        target: { location: { href: href } },
        currentTarget: ev.currentTarget
    });
    return ev;
};
exports.HURL = spool_1.registerCMD((_a = {},
    _a[keys_1.CMD_SUB$] = "_HURL",
    _a[keys_1.CMD_ARGS] = function (ev) { return ev; },
    _a[keys_1.CMD_WORK] = exports.HURLer,
    _a));
var setLinkAttrs = function (target) {
    document.body.querySelectorAll("a[visited]").forEach(function (el) {
        if (el.href === window.location.href)
            el.setAttribute("active", "");
        else
            el.removeAttribute("active");
    });
    if (target.setAttribute) {
        target.setAttribute("visited", "");
        target.setAttribute("active", "");
    }
};
exports.SET_LINK_ATTRS_DOM = spool_1.registerCMD((_b = {},
    _b[keys_1.CMD_SUB$] = "_SET_LINK_ATTRS_DOM",
    _b[keys_1.CMD_ARGS] = function (acc) {
        var _a;
        return (_a = {}, _a[keys_1.DOM_NODE] = acc[keys_1.DOM_NODE], _a);
    },
    _b[keys_1.CMD_WORK] = function (args) { return setLinkAttrs(args[keys_1.DOM_NODE]); },
    _b));
exports.HREF_PUSHSTATE_DOM = spool_1.registerCMD((_c = {},
    _c[keys_1.CMD_SUB$] = "_HREF_PUSHSTATE_DOM",
    _c[keys_1.CMD_ARGS] = function (acc) {
        var _a;
        return (_a = {}, _a[keys_1.URL_FULL] = acc[keys_1.URL_FULL], _a[keys_1.DOM_NODE] = acc[keys_1.DOM_NODE], _a);
    },
    _c[keys_1.CMD_WORK] = function (args) {
        return !args[keys_1.DOM_NODE].document ? history.pushState(utils_1.parse(args[keys_1.URL_FULL]), null, args[keys_1.URL_FULL]) : null;
    },
    _c));
exports.NOTIFY_PRERENDER_DOM = spool_1.registerCMD((_d = {},
    _d[keys_1.CMD_SUB$] = "_NOTIFY_PRERENDER_DOM",
    _d[keys_1.CMD_ARGS] = true,
    _d[keys_1.CMD_WORK] = function () { return document.dispatchEvent(new Event("rendered")); },
    _d));
