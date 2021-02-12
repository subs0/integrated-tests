export const URL_FULL = "URL";
export const URL_PATH = "URL_path";
export const URL_DATA = "URL_data";
export const URL_DOMN = "URL_domain";
export const URL_SUBD = "URL_subdomain";
export const URL_QERY = "URL_query";
export const URL_HASH = "URL_hash";
export const URL_PAGE = "URL_page";
export const URL_PRSE = "unfurl";
export const URL_NPRS = "furl";
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
export const DOM_NODE = "NODE";
export const DOM_BODY = "BODY";
export const DOM_HEAD = "HEAD";
export const DOM = {
    NODE: DOM_NODE,
    BODY: DOM_BODY,
    HEAD: DOM_HEAD
};
export const HD_TITL = "title";
export const OG_DISC = "description";
export const OG_IMGU = "img_url";
export const OG_IMGW = "img_width";
export const OG_IMGH = "img_height";
export const HD_ICON = "favicon";
export const OG_TYPE = "type";
export const STATE_PATH = "PATH";
export const STATE_DATA = "DATA";
export const STATE = {
    PATH: STATE_PATH,
    DATA: STATE_DATA
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
    SRC$: CMD_SRC$
};
export const CFG_RUN$ = "run";
export const CFG_ROOT = "root";
export const CFG_VIEW = "view";
export const CFG_KICK = "kick";
export const CFG_STOR = "store";
export const CFG_DRFT = "draft";
export const CFG_LOG$ = "trace";
export const CFG_RUTR = "router";
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
export const RTR_PREP = "prep";
export const RTR_POST = "post";
export const RTR_PRFX = "prefix";
export const RTR = {
    PREP: RTR_PREP,
    POST: RTR_POST,
    PRFX: RTR_PRFX,
    RUTR: CFG_RUTR
};
export const $$_PATH = "_ROUTE_PATH";
export const $$_LOAD = "_ROUTE_LOADING";
export const $$_VIEW = "_PAGE_TEMPLATE";
export const $$_ROOT = "_DOM_ROOT";
export const $$_CMDS = "_COMMANDS";
export const $$ = {
    PATH: $$_PATH,
    LOAD: $$_LOAD,
    VIEW: $$_VIEW,
    ROOT: $$_ROOT,
    CMDS: $$_CMDS
};
export const $$_DEFAULT = {
    [$$_PATH]: [],
    [$$_LOAD]: true,
    [$$_VIEW]: null,
    [$$_ROOT]: null,
    [$$_CMDS]: {}
};
