"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMnavigated$ = exports.DOMContentLoaded$ = exports.popstate$ = void 0;
var rstream_1 = require("@thi.ng/rstream");
var transducers_1 = require("@thi.ng/transducers");
var keys_1 = require("@-0/keys");
exports.popstate$ = rstream_1.fromDOMEvent(window, "popstate");
exports.DOMContentLoaded$ = rstream_1.fromDOMEvent(window, "DOMContentLoaded");
exports.DOMnavigated$ = rstream_1.merge({
    src: [exports.popstate$, exports.DOMContentLoaded$]
}).transform(transducers_1.map(function (x) {
    var _a;
    return (_a = {},
        _a[keys_1.URL_FULL] = x.target.location.href,
        _a[keys_1.DOM_NODE] = x.currentTarget,
        _a);
}));
