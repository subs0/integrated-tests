import { RouterCFG, Router } from "@-0/keys";
export declare const URL__ROUTE: (CFG: Router | RouterCFG) => any;
export declare const NOTIFY_PRERENDER_DOM: {
    sub$: string;
    args: any;
    reso: (acc: {}, res: {}) => any;
    erro: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
} | {
    sub$: string;
    args: any;
    reso?: undefined;
    erro?: undefined;
};
export declare const SET_LINK_ATTRS_DOM: {
    sub$: string;
    args: any;
    reso: (acc: {}, res: {}) => any;
    erro: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
} | {
    sub$: string;
    args: any;
    reso?: undefined;
    erro?: undefined;
};
export declare const HREF_PUSHSTATE_DOM: {
    sub$: string;
    args: any;
    reso: (acc: {}, res: {}) => any;
    erro: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
} | {
    sub$: string;
    args: any;
    reso?: undefined;
    erro?: undefined;
};
export declare const URL_DOM__ROUTE: (CFG: Router | RouterCFG) => any;
