import { DOM_NODE, URL_FULL, CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys";
export declare const HURLer: (ev: any) => any;
export declare const hurlCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: (ev: any) => any;
    [CMD_WORK]: (ev: any) => any;
};
export declare const HURL: any;
export declare const setLinkAttrsCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: (acc: any) => {
        [DOM_NODE]: any;
    };
    [CMD_WORK]: (args: any) => void;
};
export declare const SET_LINK_ATTRS_DOM: any;
export declare const hrefPushStateCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: (acc: any) => {
        [URL_FULL]: any;
        [DOM_NODE]: any;
    };
    [CMD_WORK]: (args: any) => void;
};
export declare const HREF_PUSHSTATE_DOM: any;
export declare const notifyPrerenderCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: boolean;
    [CMD_WORK]: () => boolean;
};
export declare const NOTIFY_PRERENDER_DOM: any;
