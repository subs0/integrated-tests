export const URL_PAGE = "PAGE";
export const URL_DATA = "DATA";
export const URL_FULL = "FURL";
export const URL_PATH = "PATH";
export const URL_DOMN = "DOMN";
export const URL_SUBD = "SUBD";
export const URL_QERY = "QERY";
export const URL_HASH = "HASH";
export const URL_PRSE = "unfurl";
export const URL_NPRS = "urlify";
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
    NPRS: URL_NPRS,
};
export const DOM_NODE = "NODE";
export const DOM_BODY = "BODY";
export const DOM_HEAD = "HEAD";
export const DOM = {
    NODE: DOM_NODE,
    BODY: DOM_BODY,
    HEAD: DOM_HEAD,
};
export const NAV = {
    FULL: URL_FULL,
    NODE: DOM_NODE,
};
export const HD_TITL = "title";
export const HD_ICON = "favicon";
export const HD_DESC = "og_description";
export const HD_IMGU = "og_image";
export const HD_IMGW = "og_image_width";
export const HD_IMGH = "og_image_height";
export const HD_TYPE = "og_type";
export const HEAD = {
    TITL: HD_TITL,
    ICON: HD_ICON,
    DESC: HD_DESC,
    IMGU: HD_IMGU,
    IMGW: HD_IMGW,
    IMGH: HD_IMGH,
    TYPE: HD_TYPE,
};
export const STATE_PATH = "path";
export const STATE_DATA = "data";
export const STATE = {
    PATH: STATE_PATH,
    DATA: STATE_DATA,
};
export const CMD_SUB$ = "sub$";
export const CMD_ARGS = "args";
export const CMD_RESO = "reso";
export const CMD_ERRO = "erro";
export const CMD_WORK = "work";
export const CMD_SRC$ = "src$";
export const CMD = {
    SUB$: CMD_SUB$,
    ARGS: CMD_ARGS,
    RESO: CMD_RESO,
    ERRO: CMD_ERRO,
    WORK: CMD_WORK,
    SRC$: CMD_SRC$,
};
export const CFG_RUN$ = "run";
export const CFG_STOR = "state";
export const CFG_LOG$ = "log$";
export const CFG_RUTR = "router";
export const CTX = {
    STOR: CFG_STOR,
    LOG$: CFG_LOG$,
    RUN$: CFG_RUN$,
};
export const RTR_PREP = "preroute";
export const RTR_POST = "postroute";
export const RTR_PRFX = "ignore_prefix";
export const RTR = {
    PREP: RTR_PREP,
    POST: RTR_POST,
    PRFX: RTR_PRFX,
    RUTR: CFG_RUTR,
};
export const _ = "_";
export const $$_PATH = "$$_PATH";
export const $$_LOAD = "$$_LOAD";
export const $$_VIEW = "$$_VIEW";
export const $$_ROOT = "$$_ROOT";
export const $$ = {
    PATH: $$_PATH,
    LOAD: $$_LOAD,
    VIEW: $$_VIEW,
    ROOT: $$_ROOT,
};
export const $$_DEFAULT = {
    [_]: {
        [$$_PATH]: [],
        [$$_LOAD]: true,
        [$$_VIEW]: null,
        [$$_ROOT]: null,
    },
};
