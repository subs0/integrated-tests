"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$$_DEFAULT = exports.$$ = exports.$$_CMDS = exports.$$_ROOT = exports.$$_VIEW = exports.$$_LOAD = exports.$$_PATH = exports.ROUTER = exports.ROUTER_PRFX = exports.ROUTER_POST = exports.ROUTER_PREP = exports.CFG = exports.CFG_RUTR = exports.CFG_LOG$ = exports.CFG_DRFT = exports.CFG_STOR = exports.CFG_KICK = exports.CFG_VIEW = exports.CFG_ROOT = exports.CFG_RUN$ = exports.CMD = exports.CMD_SRC$ = exports.CMD_WORK = exports.CMD_ERRO = exports.CMD_RESO = exports.CMD_ARGS = exports.CMD_SUB$ = exports.STATE = exports.STATE_DATA = exports.STATE_PATH = exports.DOM = exports.DOM_HEAD = exports.DOM_BODY = exports.DOM_NODE = exports.URL = exports.URL_NPRS = exports.URL_PRSE = exports.URL_PAGE = exports.URL_HASH = exports.URL_QERY = exports.URL_SUBD = exports.URL_DOMN = exports.URL_DATA = exports.URL_PATH = exports.URL_FULL = void 0;
exports.URL_FULL = "URL";
exports.URL_PATH = "URL_path";
exports.URL_DATA = "URL_data";
exports.URL_DOMN = "URL_domain";
exports.URL_SUBD = "URL_subdomain";
exports.URL_QERY = "URL_query";
exports.URL_HASH = "URL_hash";
exports.URL_PAGE = "URL_page";
exports.URL_PRSE = "unfurl";
exports.URL_NPRS = "furl";
exports.URL = {
    FULL: exports.URL_FULL,
    PATH: exports.URL_PATH,
    DATA: exports.URL_DATA,
    DOMN: exports.URL_DOMN,
    SUBD: exports.URL_SUBD,
    QERY: exports.URL_QERY,
    HASH: exports.URL_HASH,
    PAGE: exports.URL_PAGE,
    PRSE: exports.URL_PRSE,
    NPRS: exports.URL_NPRS,
};
exports.DOM_NODE = "NODE";
exports.DOM_BODY = "BODY";
exports.DOM_HEAD = "HEAD";
exports.DOM = {
    NODE: exports.DOM_NODE,
    BODY: exports.DOM_BODY,
    HEAD: exports.DOM_HEAD,
};
exports.STATE_PATH = "PATH";
exports.STATE_DATA = "DATA";
exports.STATE = {
    PATH: exports.STATE_PATH,
    DATA: exports.STATE_DATA,
};
exports.CMD_SUB$ = "sub$";
exports.CMD_ARGS = "args";
exports.CMD_RESO = "reso";
exports.CMD_ERRO = "erro";
exports.CMD_WORK = "work";
exports.CMD_SRC$ = "src$";
exports.CMD = {
    SUB$: exports.CMD_SUB$,
    ARGS: exports.CMD_ARGS,
    RESO: exports.CMD_RESO,
    ERRO: exports.CMD_ERRO,
    WORK: exports.CMD_WORK,
    SRC$: exports.CMD_SRC$,
};
exports.CFG_RUN$ = "run";
exports.CFG_ROOT = "root";
exports.CFG_VIEW = "view";
exports.CFG_KICK = "kick";
exports.CFG_STOR = "store";
exports.CFG_DRFT = "draft";
exports.CFG_LOG$ = "trace";
exports.CFG_RUTR = "router";
exports.CFG = {
    RUN$: exports.CFG_RUN$,
    STOR: exports.CFG_STOR,
    ROOT: exports.CFG_ROOT,
    VIEW: exports.CFG_VIEW,
    DRFT: exports.CFG_DRFT,
    LOG$: exports.CFG_LOG$,
    RUTR: exports.CFG_RUTR,
    KICK: exports.CFG_KICK,
};
exports.ROUTER_PREP = "prep";
exports.ROUTER_POST = "post";
exports.ROUTER_PRFX = "prefix";
exports.ROUTER = {
    PREP: exports.ROUTER_PREP,
    POST: exports.ROUTER_POST,
    PRFX: exports.ROUTER_PRFX,
    RUTR: exports.CFG_RUTR,
};
exports.$$_PATH = "_ROUTE_PATH";
exports.$$_LOAD = "_ROUTE_LOADING";
exports.$$_VIEW = "_PAGE_TEMPLATE";
exports.$$_ROOT = "_DOM_ROOT";
exports.$$_CMDS = "_COMMANDS";
exports.$$ = {
    PATH: exports.$$_PATH,
    LOAD: exports.$$_LOAD,
    VIEW: exports.$$_VIEW,
    ROOT: exports.$$_ROOT,
    CMDS: exports.$$_CMDS,
};
exports.$$_DEFAULT = (_a = {},
    _a[exports.$$_PATH] = [],
    _a[exports.$$_LOAD] = true,
    _a[exports.$$_VIEW] = null,
    _a[exports.$$_ROOT] = null,
    _a[exports.$$_CMDS] = {},
    _a);
