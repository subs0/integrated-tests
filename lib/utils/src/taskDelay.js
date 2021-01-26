"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msTaskPromiseDelay = void 0;
exports.msTaskPromiseDelay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
