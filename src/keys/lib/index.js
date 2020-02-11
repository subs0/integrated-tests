/**
 * @module keys
 */
export const URL_FULL = "URL";
export const URL_PATH = "URL_path";
export const URL_DATA = "URL_data";
export const URL_DOMN = "URL_domain";
export const URL_SUBD = "URL_subdomain";
export const URL_QERY = "URL_query";
export const URL_HASH = "URL_hash";
export const URL_PAGE = "URL_page";
export const URL_PRSE = "parse";
export const URL_NPRS = "unparse";
// public
export const URL = {
    FULL: URL_FULL,
    PATH: URL_PATH,
    DATA: URL_DATA,
    DOMN: URL_DOMN,
    SUBD: URL_SUBD,
    QERY: URL_QERY,
    HASH: URL_HASH,
    PAGE: URL_PAGE,
    PRSE: URL_PRSE,
    NPRS: URL_NPRS
};
// userland router metadata constants
export const DOM_NODE = "NODE";
export const DOM_BODY = "BODY";
export const DOM_HEAD = "HEAD";
// public
export const DOM = {
    NODE: DOM_NODE,
    BODY: DOM_BODY,
    HEAD: DOM_HEAD
};
// set$$tate constants
export const STATE_PATH = "PATH";
export const STATE_DATA = "DATA";
// public
export const STATE = {
    PATH: STATE_PATH,
    DATA: STATE_DATA
};
// state setting Command constants
export const CMD_SUB$ = "sub$";
export const CMD_ARGS = "args";
export const CMD_RESO = "reso";
export const CMD_ERRO = "erro";
export const CMD_WORK = "work";
export const CMD_SRC$ = "src$";
// public
export const CMD = {
    SUB$: CMD_SUB$,
    ARGS: CMD_ARGS,
    RESO: CMD_RESO,
    ERRO: CMD_ERRO,
    WORK: CMD_WORK,
    SRC$: CMD_SRC$
};
// boot config constants
export const CFG_RUN$ = "run";
export const CFG_STOR = "state";
export const CFG_ROOT = "root";
export const CFG_VIEW = "app";
export const CFG_DRFT = "draft";
export const CFG_LOG$ = "trace";
export const CFG_RUTR = "router";
export const CFG_KICK = "kick";
// public
export const CFG = {
    RUN$: CFG_RUN$,
    STOR: CFG_STOR,
    ROOT: CFG_ROOT,
    VIEW: CFG_VIEW,
    DRFT: CFG_DRFT,
    LOG$: CFG_LOG$,
    RUTR: CFG_RUTR,
    KICK: CFG_KICK
};
// ROUTER
export const ROUTER_PREP = "prep";
export const ROUTER_POST = "post";
export const ROUTER_PRFX = "prefix";
// public
export const ROUTER = {
    PREP: ROUTER_PREP,
    POST: ROUTER_POST,
    PRFX: ROUTER_PRFX,
    RUTR: CFG_RUTR
};
// Global state keys/constants
export const $$_PATH = "_ROUTE_PATH";
export const $$_LOAD = "_ROUTE_LOADING";
export const $$_VIEW = "_PAGE_TEMPLATE";
export const $$_ROOT = "_ROOT";
// public
export const $$ = {
    PATH: $$_PATH,
    LOAD: $$_LOAD,
    VIEW: $$_VIEW,
    ROOT: $$_ROOT
};
export const $$_DEFAULT = {
    [$$_PATH]: null,
    [$$_LOAD]: true,
    [$$_VIEW]: null,
    [$$_ROOT]: null
};
