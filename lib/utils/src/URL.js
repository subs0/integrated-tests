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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparse = exports.parse = void 0;
var querystring_1 = __importDefault(require("querystring"));
var keys_1 = require("@-0/keys");
exports.parse = function (URL_full, prefixRGX) {
    var _a;
    var URL_subdomain = [];
    var URL_domain = [];
    var URL_path = [];
    var splitRGX = /(?=\?)|(?=#)/g;
    var parts = prefixRGX
        ? URL_full.replace(prefixRGX, "").split(splitRGX)
        : URL_full.split(splitRGX);
    var path_str = parts[0];
    var full_path = path_str.split("/").filter(function (x) { return x !== ""; });
    if (/http/i.test(URL_full)) {
        URL_domain = full_path[1].split(".").slice(-2);
        URL_subdomain = full_path[1].split(".").slice(0, -2);
        URL_path = full_path.slice(2);
    }
    else {
        URL_path = full_path;
    }
    var query_str = parts.filter(function (part) { return part.slice(0, 1) === "?"; })[0] || "";
    var hash_str = parts.filter(function (part) { return part.slice(0, 1) === "#"; })[0] || "";
    var URL_query = JSON.parse(JSON.stringify(querystring_1.default.decode(query_str.slice(1))));
    var URL_hash = hash_str.slice(1);
    return _a = {},
        _a[keys_1.URL_FULL] = URL_full,
        _a[keys_1.URL_SUBD] = URL_subdomain,
        _a[keys_1.URL_DOMN] = URL_domain,
        _a[keys_1.URL_PATH] = URL_path,
        _a[keys_1.URL_QERY] = URL_query,
        _a[keys_1.URL_HASH] = URL_hash,
        _a;
};
exports.unparse = function (parsed, isAbsolute) {
    if (parsed === void 0) { parsed = exports.parse(window.location.href); }
    if (isAbsolute === void 0) { isAbsolute = false; }
    var _a = parsed, _b = keys_1.URL_FULL, URL = _a[_b], _c = keys_1.URL_SUBD, URL_subdomain = _a[_c], _d = keys_1.URL_DOMN, URL_domain = _a[_d], _e = keys_1.URL_PATH, URL_path = _a[_e], _f = keys_1.URL_QERY, URL_query = _a[_f], _g = keys_1.URL_HASH, URL_hash = _a[_g];
    var _h = __read(parsed[keys_1.URL_FULL].split("//"), 2), protocol = _h[0], rest = _h[1];
    var _j = __read(rest.split("/"), 1), root = _j[0];
    var _k = __read(root.split(".")), part_one = _k[0], other_parts = _k.slice(1);
    var domain = URL_subdomain && URL_domain
        ? __spread(URL_subdomain, URL_domain) : URL_subdomain && other_parts.length > 1
        ? __spread(URL_subdomain, other_parts) : URL_subdomain && other_parts.length === 1
        ? __spread(URL_subdomain, [part_one], other_parts) : __spread(URL_subdomain, [part_one]);
    var query_string = querystring_1.default.encode(URL_query);
    var rootRelative = "" + (URL_path.length > 0 ? "/" + URL_path.join("/") : "") + (query_string ? "?" + query_string : "") + (URL_hash ? "#" + URL_hash : "");
    return !isAbsolute ? rootRelative : protocol + "//" + domain.join(".") + rootRelative;
};
