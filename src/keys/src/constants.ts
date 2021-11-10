/**
 * @module keys
 */

/**
 * these keys are pulled from the accumulator
 * the `_CONST` syntax is used to reduce the
 * chance conflicts with userland keys in
 * multiplex accumulator root
 */
export const URL_PAGE = "_PAGE"
export const URL_DATA = "_DATA"

export const URL_FULL = "_FURL"
export const URL_PATH = "_PATH"
export const URL_DOMN = "_DOMN"
export const URL_SUBD = "_SUBD"
export const URL_QERY = "_QERY"
export const URL_HASH = "_HASH"

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
    NPRS: URL_NPRS,
}

// userland router metadata constants
export const DOM_NODE = "_NODE"
export const DOM_BODY = "data"
export const DOM_HEAD = "head"

// public
export const DOM = {
    NODE: DOM_NODE,
    BODY: DOM_BODY,
    HEAD: DOM_HEAD,
}

export const NAV = {
    FULL: URL_FULL,
    NODE: DOM_NODE,
}
// document head selector shortcuts
export const HD_TITL = "title"
export const HD_ICON = "favicon"
export const HD_DESC = "og_description"
export const HD_IMGU = "og_image"
export const HD_IMGW = "og_image_width"
export const HD_IMGH = "og_image_height"
export const HD_TYPE = "og_type"

export const HEAD = {
    TITL: HD_TITL,
    ICON: HD_ICON,
    DESC: HD_DESC,
    IMGU: HD_IMGU,
    IMGW: HD_IMGW,
    IMGH: HD_IMGH,
    TYPE: HD_TYPE,
}

// set$$tate constants
export const STATE_PATH = "$path$"
export const STATE_DATA = "$data$"

// public
export const STATE = {
    PATH: STATE_PATH,
    DATA: STATE_DATA,
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
    SRC$: CMD_SRC$,
}

// Userland dispatching
// DON'T CHANGE THESE 💢
export const CFG_RUN$ = "run"
export const CFG_STOR = "state"

export const CFG_LOG$ = "log$"
export const CFG_RUTR = "router"

// Context
export const CTX = {
    STOR: CFG_STOR,
    LOG$: CFG_LOG$,
    RUN$: CFG_RUN$,
}

// ROUTER
export const RTR_PREP = "preroute"
export const RTR_POST = "postroute"
export const RTR_PRFX = "ignore_prefix"

// public
export const RTR = {
    PREP: RTR_PREP,
    POST: RTR_POST,
    PRFX: RTR_PRFX,
    RUTR: CFG_RUTR,
}

// scroll position on _HREF_PUSHSATE_DOM
export const PUSH_STATE = "referrer"
export const POP_STATE = "POP_STATE"
export const SCROLL_X = "SCROLL_X"
export const SCROLL_Y = "SCROLL_Y"

// Global state keys/constants

export const $$_PATH = "$$_PATH"
export const $$_LOAD = "$$_LOAD"
export const $$_VIEW = "$$_VIEW"
export const $$_ROOT = "$$_ROOT"

// public
export const $$ = {
    PATH: $$_PATH,
    LOAD: $$_LOAD,
    VIEW: $$_VIEW,
}

// global state private path
export const _ = "router"

// home page / defaults to empty path
export const $$_DEFAULT = {
    [_]: {
        [$$_PATH]: [],
        [$$_LOAD]: true,
        [$$_VIEW]: null,
    },
}

export const DETOUR = "home"
