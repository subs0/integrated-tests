"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouterDOM = void 0;
var keys_1 = require("@-0/keys");
var spool_1 = require("@-0/spool");
var tasks_1 = require("../tasks");
var stream_1 = require("../core/stream$");
exports.registerRouterDOM = function (router) {
    var _a;
    console.log("DOM Router Registered");
    var task = tasks_1.URL_DOM__ROUTE(router);
    return spool_1.registerCMD((_a = {},
        _a[keys_1.CMD_SRC$] = stream_1.DOMnavigated$,
        _a[keys_1.CMD_SUB$] = "_URL_NAVIGATED$_DOM",
        _a[keys_1.CMD_ARGS] = function (x) { return x; },
        _a[keys_1.CMD_WORK] = function (args) {
            var _a;
            return spool_1.run$.next(task((_a = {}, _a[keys_1.URL_FULL] = args[keys_1.URL_FULL], _a[keys_1.DOM_NODE] = args[keys_1.DOM_NODE], _a)));
        },
        _a));
};
