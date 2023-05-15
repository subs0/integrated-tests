import {
    CMD_ARGS,
    CMD_SRC$,
    CMD_ERRO,
    CMD_RESO,
    CMD_SUB$,
    CMD_WORK,
    URL_FULL,
    URL_PATH,
    URL_DOMN,
    URL_SUBD,
    URL_QERY,
    URL_HASH,
    DOM_NODE,
    DOM_BODY,
    DOM_HEAD,
    HD_TITL,
    HD_DESC,
    HD_IMGU,
    HD_IMGW,
    HD_IMGH,
    HD_ICON,
    HD_TYPE,
    URL_DATA,
    URL_PAGE,
    RTR_PREP,
    RTR_PRFX,
    RTR_POST,
    CFG_RUTR,
    $$_PATH,
    $$_LOAD,
    $$_VIEW,
    $$_ROOT,
    POP_STATE,
} from "./constants"

/**
 * Command Object.
 *
 * The only required property is `args`
 */
export const MINIMAL_CMD = {
    [CMD_ARGS]: (({}) => null) || {},
}

export const DEFAULT_CMD_ASYNC = {
    [CMD_ARGS]: null,
    [CMD_SUB$]: "",
    [CMD_RESO]: (acc, res) => null,
    [CMD_ERRO]: (acc, err, out$) => null,
}

export const DEFAULT_CMD_COMPLETE = {
    ...DEFAULT_CMD_ASYNC,
    [CMD_WORK]: args => null,
    [CMD_SRC$]: null,
}

export const DEFAULT_PARSED_URL = {
    [URL_FULL]: "",
    [URL_PATH]: [""],
    [URL_DOMN]: [""],
    [URL_SUBD]: [""],
    [URL_QERY]: {},
    [URL_HASH]: "",
}

const HD = {
    [HD_TITL]: "",
    [HD_DESC]: "",
    [HD_IMGU]: "",
    [HD_IMGW]: "",
    [HD_IMGH]: "",
    [HD_ICON]: "",
    [HD_TYPE]: "",
}

const navNode = document.createElement("a") || document.getElementById("some-id") || document

/**
 * Provides targets for data injection from DOM router
 */
const TDOM = {
    [DOM_NODE]: navNode,
    [DOM_BODY]: null,
    [DOM_HEAD]: HD,
}

const RHBD = {
    [DOM_HEAD]: HD,
    [DOM_BODY]: null,
}

export const empty_page =
    ({ data }) =>
    () =>
        null

export const DEFAULT_ROUTE_DATA = {
    [URL_DATA]: RHBD,
    [URL_PAGE]: empty_page,
}

export const BLANK_NAV_OBJ = {
    target: {
        location: {
            href: "",
        },
    },
    currentTarget: navNode,
    state: {},
}

export const DEFAULT_ROUTER_CMD_INPUT = {
    [URL_FULL]: BLANK_NAV_OBJ.target.location.href,
    [DOM_NODE]: BLANK_NAV_OBJ.currentTarget,
    [POP_STATE]: BLANK_NAV_OBJ.state,
}

export const ROUTER_CONFIG_COMPLETE = {
    [RTR_PREP]: [],
    [RTR_PRFX]: new RegExp("") || "",
    [RTR_POST]: [],
    [CFG_RUTR]: (url = "") => RHBD,
}

export const ROUTER_CONFIG_DEFAULT = {
    [CFG_RUTR]: (url = "") => RHBD,
}

export const DefaultState = {
    [$$_PATH]: [""],
    [$$_LOAD]: false,
    [$$_VIEW]: empty_page,
    [$$_ROOT]: document.getElementById("root") || document,
}
