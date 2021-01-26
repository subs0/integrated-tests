"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_STATE = exports.createSetStateCMD = void 0;
var keys_1 = require("@-0/keys");
var store_1 = require("../store");
var spool_1 = require("@-0/spool");
exports.createSetStateCMD = function (store) {
    var _a;
    return spool_1.registerCMD((_a = {},
        _a[keys_1.CMD_SUB$] = "_SET_STATE",
        _a[keys_1.CMD_ARGS] = function (x) { return x; },
        _a[keys_1.CMD_WORK] = function (args) { return store_1.set$$tate(args[keys_1.STATE_PATH], args[keys_1.STATE_DATA], store); },
        _a));
};
exports.SET_STATE = exports.createSetStateCMD(store_1.$store$);
