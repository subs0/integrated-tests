"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registers_1 = require("../registers");
Object.defineProperty(exports, "registerRouterDOM", { enumerable: true, get: function () { return registers_1.registerRouterDOM; } });
var stream_1 = require("./stream$");
Object.defineProperty(exports, "DOMnavigated$", { enumerable: true, get: function () { return stream_1.DOMnavigated$; } });
Object.defineProperty(exports, "DOMContentLoaded$", { enumerable: true, get: function () { return stream_1.DOMContentLoaded$; } });
Object.defineProperty(exports, "popstate$", { enumerable: true, get: function () { return stream_1.popstate$; } });
