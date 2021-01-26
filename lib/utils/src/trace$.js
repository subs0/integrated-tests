"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace$ = void 0;
var rstream_1 = require("@thi.ng/rstream");
exports.trace$ = function (log_prefix, stream) {
    return stream.subscribeTopic
        ? stream.subscribeTopic("_TRACE_STREAM", {
            next: function (x) { return console.log(log_prefix, x); },
            error: console.warn
        })
        : stream.subscribe(rstream_1.trace(log_prefix));
};
