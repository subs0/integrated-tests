export const URL_FULL: "URL";
export const URL_PATH: "URL_path";
export const URL_DATA: "URL_data";
export const URL_DOMN: "URL_domain";
export const URL_SUBD: "URL_subdomain";
export const URL_QERY: "URL_query";
export const URL_HASH: "URL_hash";
export const URL_PAGE: "URL_page";
export const URL_PRSE: "unfurl";
export const URL_NPRS: "furl";
export namespace URL {
    export { URL_FULL as FULL };
    export { URL_PATH as PATH };
    export { URL_DATA as DATA };
    export { URL_DOMN as DOMN };
    export { URL_SUBD as SUBD };
    export { URL_QERY as QERY };
    export { URL_HASH as HASH };
    export { URL_PAGE as PAGE };
    export { URL_PRSE as PRSE };
    export { URL_NPRS as NPRS };
}
export const DOM_NODE: "NODE";
export const DOM_BODY: "BODY";
export const DOM_HEAD: "HEAD";
export namespace DOM {
    export { DOM_NODE as NODE };
    export { DOM_BODY as BODY };
    export { DOM_HEAD as HEAD };
}
export const STATE_PATH: "PATH";
export const STATE_DATA: "DATA";
export namespace STATE {
    export { STATE_PATH as PATH };
    export { STATE_DATA as DATA };
}
export const CMD_SUB$: "sub$";
export const CMD_ARGS: "args";
export const CMD_RESO: "reso";
export const CMD_ERRO: "erro";
export const CMD_WORK: "work";
export const CMD_SRC$: "src$";
export namespace CMD {
    export { CMD_SUB$ as SUB$ };
    export { CMD_ARGS as ARGS };
    export { CMD_RESO as RESO };
    export { CMD_ERRO as ERRO };
    export { CMD_WORK as WORK };
    export { CMD_SRC$ as SRC$ };
}
export const CFG_RUN$: "run";
export const CFG_ROOT: "root";
export const CFG_VIEW: "view";
export const CFG_KICK: "kick";
export const CFG_STOR: "store";
export const CFG_DRFT: "draft";
export const CFG_LOG$: "trace";
export const CFG_RUTR: "router";
export namespace CFG {
    export { CFG_RUN$ as RUN$ };
    export { CFG_STOR as STOR };
    export { CFG_ROOT as ROOT };
    export { CFG_VIEW as VIEW };
    export { CFG_DRFT as DRFT };
    export { CFG_LOG$ as LOG$ };
    export { CFG_RUTR as RUTR };
    export { CFG_KICK as KICK };
}
export const ROUTER_PREP: "prep";
export const ROUTER_POST: "post";
export const ROUTER_PRFX: "prefix";
export namespace ROUTER {
    export { ROUTER_PREP as PREP };
    export { ROUTER_POST as POST };
    export { ROUTER_PRFX as PRFX };
    export { CFG_RUTR as RUTR };
}
export const $$_PATH: "_ROUTE_PATH";
export const $$_LOAD: "_ROUTE_LOADING";
export const $$_VIEW: "_PAGE_TEMPLATE";
export const $$_ROOT: "_DOM_ROOT";
export const $$_CMDS: "_COMMANDS";
export namespace $$ {
    export { $$_PATH as PATH };
    export { $$_LOAD as LOAD };
    export { $$_VIEW as VIEW };
    export { $$_ROOT as ROOT };
    export { $$_CMDS as CMDS };
}
export namespace $$_DEFAULT {
    export const _ROUTE_PATH: any[];
    export const _ROUTE_LOADING: boolean;
    export const _PAGE_TEMPLATE: any;
    export const _DOM_ROOT: any;
    export const _COMMANDS: {};
}
