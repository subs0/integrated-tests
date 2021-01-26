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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.multiplex = exports.task$ = exports.command$ = exports.out$ = exports.run$ = void 0;
var checks_1 = require("@thi.ng/checks");
var rstream_1 = require("@thi.ng/rstream");
var keys_1 = require("@-0/keys");
var utils_1 = require("@-0/utils");
var paths_1 = require("@thi.ng/paths");
exports.run$ = rstream_1.pubsub({
    topic: function (x) { return !!x[keys_1.CMD_SUB$]; },
    id: "run$_stream",
    equiv: function (x, y) { return x === y || y === "_TRACE_STREAM"; },
});
exports.out$ = rstream_1.pubsub({
    topic: function (x) { return x[keys_1.CMD_SUB$]; },
    id: "out$_stream",
    equiv: function (x, y) { return x === y || y === "_TRACE_STREAM"; },
});
exports.command$ = exports.run$.subscribeTopic(true, {
    next: function (x) { return exports.out$.next(x); },
    error: console.warn,
}, { id: "command$_stream" });
exports.task$ = exports.run$.subscribeTopic(false, {
    next: multiplex,
    error: console.warn,
}, { id: "task$_stream" });
var err_str = "Spooling Interupted";
var nosub$_err = function (c, i) {
    return console.warn("\n  \uD83D\uDD25 No sub$ included for a Command with a primitive for 'args'. \n  \uD83D\uDD25 Ergo, nothing was done with this Command: \n  \n  " + JSON.stringify(c) + "\n  \n  " + utils_1.key_index_err(c, i) + "\n  \n  Hope that helps!\n  ");
};
function multiplex(task_array) {
    var _this = this;
    return task_array.reduce(function (a, c, i) { return __awaiter(_this, void 0, void 0, function () {
        var acc, recur, sub$, args, erro, reso, knowns, _a, unknowns, arg_type, result, temp, _b, error, resolved;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4, a];
                case 1:
                    acc = _f.sent();
                    if (checks_1.isFunction(c)) {
                        try {
                            recur = c(acc);
                            recur.unshift((_c = {}, _c[keys_1.CMD_ARGS] = acc, _c));
                            return [2, multiplex(recur)];
                        }
                        catch (e) {
                            console.warn(err_str, e);
                            return [2];
                        }
                    }
                    sub$ = c[keys_1.CMD_SUB$];
                    args = c[keys_1.CMD_ARGS];
                    erro = c[keys_1.CMD_ERRO];
                    reso = c[keys_1.CMD_RESO];
                    knowns = [keys_1.CMD_SUB$, keys_1.CMD_ARGS, keys_1.CMD_RESO, keys_1.CMD_ERRO, keys_1.CMD_SRC$, keys_1.CMD_WORK];
                    _a = __read(utils_1.diff_keys(knowns, c), 1), unknowns = _a[0];
                    if (unknowns.length > 0)
                        throw new Error(utils_1.xKeyError(err_str, c, unknowns, sub$, i));
                    arg_type = utils_1.stringify_type(args);
                    result = args;
                    if (arg_type !== "PROMISE" && reso) {
                        result = Promise.resolve(args);
                    }
                    if (args !== Object(args) && !sub$) {
                        nosub$_err(c, i);
                        return [2, acc];
                    }
                    if (!(arg_type === "PROMISE")) return [3, 3];
                    return [4, args.catch(function (e) { return e; })];
                case 2:
                    result = _f.sent();
                    _f.label = 3;
                case 3:
                    if (arg_type === "THUNK") {
                        result = args();
                        console.log("dispatching to ad-hoc stream: " + sub$.id);
                        sub$.next(result);
                        return [2, acc];
                    }
                    if (!(arg_type === "FUNCTION")) return [3, 7];
                    temp = args(acc);
                    if (!checks_1.isPromise(temp)) return [3, 5];
                    return [4, temp.catch(function (e) { return e; })];
                case 4:
                    _b = _f.sent();
                    return [3, 6];
                case 5:
                    _b = temp;
                    _f.label = 6;
                case 6:
                    result = _b;
                    _f.label = 7;
                case 7:
                    if (arg_type === "OBJECT") {
                        if (!sub$)
                            return [2, __assign(__assign({}, acc), args)];
                        exports.out$.next(c);
                        return [2, __assign(__assign({}, acc), args)];
                    }
                    if (reso) {
                        if (result instanceof Error) {
                            if (erro) {
                                error = erro(acc, result);
                                if (paths_1.getIn(error, [keys_1.CMD_SUB$]))
                                    return [2, exports.out$.next(error)];
                                console.warn(err_str, "Promise rejected:", result);
                                return [2, acc];
                            }
                            console.warn("no 'erro' (Error handler) set for error in " + result);
                        }
                        if (!(result instanceof Error)) {
                            resolved = reso(acc, result);
                            if (paths_1.getIn(resolved, [keys_1.CMD_SUB$]))
                                exports.out$.next(resolved);
                            else if (!sub$)
                                return [2, __assign(__assign({}, acc), resolved)];
                            result = resolved;
                        }
                    }
                    if (!reso && !sub$)
                        return [2, __assign(__assign({}, acc), result)];
                    if (result instanceof Error) {
                        console.warn(err_str, result);
                        return [2, acc];
                    }
                    if (result !== Object(result)) {
                        if (!sub$) {
                            nosub$_err(c, i);
                            return [2, acc];
                        }
                        exports.out$.next((_d = {}, _d[keys_1.CMD_SUB$] = sub$, _d[keys_1.CMD_ARGS] = result, _d));
                        return [2, acc];
                    }
                    exports.out$.next((_e = {}, _e[keys_1.CMD_SUB$] = sub$, _e[keys_1.CMD_ARGS] = result, _e));
                    return [2, __assign(__assign({}, acc), result)];
            }
        });
    }); }, Promise.resolve({}));
}
exports.multiplex = multiplex;
