"use strict";
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
exports.registerCMD = exports.supplement$CMD = void 0;
var transducers_1 = require("@thi.ng/transducers");
var checks_1 = require("@thi.ng/checks");
var keys_1 = require("@-0/keys");
var utils_1 = require("@-0/utils");
var core_1 = require("../core");
exports.supplement$CMD = function (cmd, downstream) {
    var upstream = cmd[keys_1.CMD_SRC$];
    var sub$ = cmd[keys_1.CMD_SUB$];
    var args = cmd[keys_1.CMD_ARGS];
    var isFn = checks_1.isFunction(args);
    var load = function (x) {
        var _a;
        if (x === void 0) { x = null; }
        return (_a = {}, _a[keys_1.CMD_SUB$] = sub$, _a[keys_1.CMD_ARGS] = x ? args(x) : args, _a);
    };
    var xport = function (downstream) { return transducers_1.map(function (x) { return downstream.next(isFn ? load(x) : load()); }); };
    return upstream.subscribe(xport(downstream));
};
var err_str = "command Registration `registerCMD`";
exports.registerCMD = function (command) {
    var _a, _b;
    if (command === void 0) { command = null; }
    var sub$ = command[keys_1.CMD_SUB$];
    var args = command[keys_1.CMD_ARGS];
    var erro = command[keys_1.CMD_ERRO];
    var reso = command[keys_1.CMD_RESO];
    var src$ = command[keys_1.CMD_SRC$];
    var work = command[keys_1.CMD_WORK];
    var knowns = [keys_1.CMD_SUB$, keys_1.CMD_ARGS, keys_1.CMD_RESO, keys_1.CMD_ERRO, keys_1.CMD_SRC$, keys_1.CMD_WORK];
    var _c = __read(utils_1.diff_keys(knowns, command), 1), unknowns = _c[0];
    if (unknowns.length > 0) {
        throw new Error(utils_1.xKeyError(err_str, command, unknowns, sub$, undefined));
    }
    if (src$)
        exports.supplement$CMD(command, core_1.command$);
    core_1.out$.subscribeTopic(sub$, { next: work, error: console.warn }, transducers_1.map(function (puck) { return puck[keys_1.CMD_ARGS]; }));
    var CMD = reso
        ? (_a = {},
            _a[keys_1.CMD_SUB$] = sub$,
            _a[keys_1.CMD_ARGS] = args,
            _a[keys_1.CMD_RESO] = reso,
            _a[keys_1.CMD_ERRO] = erro,
            _a) : (_b = {}, _b[keys_1.CMD_SUB$] = sub$, _b[keys_1.CMD_ARGS] = args, _b);
    return CMD;
};
