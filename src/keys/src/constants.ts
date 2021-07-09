/**
 * @module keys
 */

export const URL_FULL = "URL_FULL"
export const URL_PATH = "URL_PATH"
export const URL_DATA = "URL_DATA"
export const URL_DOMN = "URL_DOMN"
export const URL_SUBD = "URL_SUBD"
export const URL_QERY = "URL_QERY"
export const URL_HASH = "URL_HASH"
export const URL_PAGE = "URL_PAGE"

// DON'T CHANGE THESE 💢
export const URL_PRSE = "unfurl"
export const URL_NPRS = "urlify"

/**
 * Object Keys for a Parsed URL using `parse` from @-0/utils
 */
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
}

// userland router metadata constants
export const DOM_NODE = "DOM_NODE"
export const DOM_BODY = "DOM_BODY"
export const DOM_HEAD = "DOM_HEAD"

// public
export const DOM = {
    NODE: DOM_NODE,
    BODY: DOM_BODY,
    HEAD: DOM_HEAD
}

// document head selector shortcuts
export const HD_TITL = "title"
export const HD_ICON = "favicon"
export const HD_META = "meta"
export const OG_DESC = "og_description"
export const OG_IMGU = "og_image"
export const OG_IMGW = "og_image_width"
export const OG_IMGH = "og_image_height"
export const OG_TYPE = "og_type"

// set$$tate constants
export const SET_PATH = "SET_PATH"
export const SET_DATA = "SET_DATA"

// public
export const STATE = {
    PATH: SET_PATH,
    DATA: SET_DATA
}

// Primary Userland Command Properties
// PRIORITY: DON'T CHANGE THESE 💢
export const CMD_SUB$ = "sub$"
export const CMD_ARGS = "args"
export const CMD_RESO = "reso"
export const CMD_ERRO = "erro"
export const CMD_WORK = "work"
export const CMD_SRC$ = "src$"

// public
export const CMD = {
    SUB$: CMD_SUB$,
    ARGS: CMD_ARGS,
    RESO: CMD_RESO,
    ERRO: CMD_ERRO,
    WORK: CMD_WORK,
    SRC$: CMD_SRC$
}

// Userland dispatching
// DON'T CHANGE THESE 💢
export const CFG_RUN$ = "run"
export const CFG_STOR = "state"

// boot config constants
export const CFG_ROOT = "CFG_ROOT"
export const CFG_VIEW = "CFG_VIEW"
export const CFG_KICK = "CFG_KICK"
export const CFG_DRFT = "CFG_DRFT"
export const CFG_LOG$ = "CFG_LOG$"
export const CFG_RUTR = "CFG_RUTR"

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
}

// ROUTER
export const RTR_PREP = "RTR_PREP"
export const RTR_POST = "RTR_POST"
export const RTR_PRFX = "RTR_PRFX"

// public
export const RTR = {
    PREP: RTR_PREP,
    POST: RTR_POST,
    PRFX: RTR_PRFX,
    RUTR: CFG_RUTR
}

// Global state keys/constants

export const $$_PATH = "$$_PATH"
export const $$_LOAD = "$$_LOAD"
export const $$_VIEW = "$$_VIEW"
export const $$_ROOT = "$$_ROOT"
//export const $$_CMDS = "$$_CMDS"

// public
export const $$: Object = {
    PATH: $$_PATH,
    LOAD: $$_LOAD,
    VIEW: $$_VIEW,
    ROOT: $$_ROOT
    //CMDS: $$_CMDS
}

// home page / defaults to empty path
export const $$_DEFAULT = {
    [$$_PATH]: [],
    [$$_LOAD]: true,
    [$$_VIEW]: null,
    [$$_ROOT]: null
    //[$$_CMDS]: {}
}
