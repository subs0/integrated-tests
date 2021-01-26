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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.INJECT_HEAD = void 0;
var keys_1 = require("@-0/keys");
var spool_1 = require("@-0/spool");
var setFavicon = function (href) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = href;
    document.getElementsByTagName("head")[0].appendChild(link);
};
var defalt_cfg = {
    meta: {
        "og:title": document.title,
        "og:image": document.head.querySelector("meta[property=\"og:image\"]").content,
        "og:image:width": document.head.querySelector("meta[property=\"og:image:width\"]").content,
        "og:image:height": document.head.querySelector("meta[property=\"og:image:height\"]").content,
        "og:description": document.head.querySelector("meta[property=\"og:description\"]").content,
        "og:type": document.head.querySelector("meta[property=\"og:image\"]").content,
    },
    title: document.title,
    favicon: document.querySelector("link[rel*='icon']"),
};
var replaceMeta = function (obj) {
    if (obj === void 0) { obj = defalt_cfg; }
    Object.entries(obj).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], val = _b[1];
        try {
            return {
                HEAD_title: function () {
                    document.title = val;
                },
                HEAD_meta: function () {
                    Object.entries(val).forEach(function (_a) {
                        var _b = __read(_a, 2), prop = _b[0], content = _b[1];
                        document.head.querySelector("meta[property=\"" + prop + "\"]").content = content;
                    });
                },
                HEAD_favicon: function () { return setFavicon(val); },
            }[key]();
        }
        catch (e) {
            console.warn(e);
        }
    });
};
var conformToHead = function (_a) {
    var _b = _a.title, title = _b === void 0 ? defalt_cfg.title : _b, _c = _a.description, description = _c === void 0 ? defalt_cfg.meta["og:description"] : _c, _d = _a.img_url, img_url = _d === void 0 ? defalt_cfg.meta["og:image"] : _d, _e = _a.img_height, img_height = _e === void 0 ? defalt_cfg.meta["og:image:height"] : _e, _f = _a.img_width, img_width = _f === void 0 ? defalt_cfg.meta["og:image:width"] : _f, _g = _a.favicon, favicon = _g === void 0 ? defalt_cfg.favicon : _g, _h = _a.type, type = _h === void 0 ? defalt_cfg.meta["og:type"] : _h;
    return ({
        HEAD_meta: {
            "og:title": title,
            "og:type": type,
            "og:description": description,
            "og:image:width": img_width,
            "og:image:height": img_height,
            "og:image": img_url,
        },
        HEAD_title: title,
        HEAD_favicon: favicon,
    });
};
exports.INJECT_HEAD = spool_1.registerCMD((_a = {},
    _a[keys_1.CMD_SUB$] = "_INJECT_HEAD",
    _a[keys_1.CMD_ARGS] = function (acc) {
        var _a;
        return (_a = {}, _a[keys_1.URL_DATA] = acc[keys_1.URL_DATA], _a);
    },
    _a[keys_1.CMD_WORK] = function (_a) {
        var _b = keys_1.URL_DATA, _c = keys_1.DOM_HEAD, _d = _a[_b][_c], title = _d.title, description = _d.description, img_url = _d.img_url, img_height = _d.img_height, img_width = _d.img_width, favicon = _d.favicon, type = _d.type;
        return replaceMeta(conformToHead({ title: title, description: description, img_url: img_url, img_height: img_height, img_width: img_width, favicon: favicon, type: type }));
    },
    _a));
