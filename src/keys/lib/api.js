import { CMD_ARGS, CMD_SRC$, CMD_ERRO, CMD_RESO, CMD_SUB$, CMD_WORK, URL_FULL, URL_PATH, URL_DOMN, URL_SUBD, URL_QERY, URL_HASH, DOM_NODE, DOM_BODY, DOM_HEAD, HD_TITL, HD_DESC, HD_IMGU, HD_IMGW, HD_IMGH, HD_ICON, HD_TYPE, URL_DATA, URL_PAGE, RTR_PREP, RTR_PRFX, RTR_POST, CFG_RUTR, $$_PATH, $$_LOAD, $$_VIEW, $$_ROOT, } from "./constants";
import { Stream } from "@thi.ng/rstream";
const ICO = {
    [CMD_ARGS]: null,
    [CMD_SUB$]: "",
    [CMD_RESO]: (acc, res) => null,
    [CMD_ERRO]: (acc, err, out$) => null,
};
const IC = Object.assign(Object.assign({}, ICO), { [CMD_WORK]: (args) => null, [CMD_SRC$]: Stream });
const C = (data) => null;
const PURL = {
    [URL_FULL]: "",
    [URL_PATH]: [""],
    [URL_DOMN]: [""],
    [URL_SUBD]: [""],
    [URL_QERY]: {},
    [URL_HASH]: "",
};
const HD = {
    [HD_TITL]: "",
    [HD_DESC]: "",
    [HD_IMGU]: "",
    [HD_IMGW]: 1 || "",
    [HD_IMGH]: 1 || "",
    [HD_ICON]: "",
    [HD_TYPE]: "",
};
const TDOM = {
    [DOM_NODE]: new HTMLElement(),
    [DOM_BODY]: null,
    [DOM_HEAD]: HD,
};
const RHBD = {
    [DOM_HEAD]: HD,
    [DOM_BODY]: null,
};
const RO = {
    [URL_DATA]: RHBD || null,
    [URL_PAGE]: C,
};
const RI = {
    [URL_FULL]: "",
    [DOM_NODE]: new HTMLElement() || document,
};
const RCFG = {
    [RTR_PREP]: {} || [],
    [RTR_PRFX]: "",
    [RTR_POST]: {} || [],
    [CFG_RUTR]: ((url) => null),
};
const DD = {
    [$$_PATH]: [""],
    [$$_LOAD]: false,
    [$$_VIEW]: C,
    [$$_ROOT]: new HTMLElement(),
};
