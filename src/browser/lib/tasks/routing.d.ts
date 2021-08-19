import { RouterCFG, Router, HOTask } from "@-0/keys";
export declare const URL__ROUTE: (CFG: Router | RouterCFG) => HOTask;
export declare const NOTIFY_PRERENDER_DOM: Partial<{
    args: any;
    sub$: string;
    reso: (acc: import("@-0/keys").Accumulator, res: any) => any;
    erro: (acc: import("@-0/keys").Accumulator, err: Error, out$: import("@thi.ng/rstream").PubSub<unknown, unknown, any>) => any;
}>;
export declare const SET_LINK_ATTRS_DOM: Partial<{
    args: any;
    sub$: string;
    reso: (acc: import("@-0/keys").Accumulator, res: any) => any;
    erro: (acc: import("@-0/keys").Accumulator, err: Error, out$: import("@thi.ng/rstream").PubSub<unknown, unknown, any>) => any;
}>;
export declare const HREF_PUSHSTATE_DOM: Partial<{
    args: any;
    sub$: string;
    reso: (acc: import("@-0/keys").Accumulator, res: any) => any;
    erro: (acc: import("@-0/keys").Accumulator, err: Error, out$: import("@thi.ng/rstream").PubSub<unknown, unknown, any>) => any;
}>;
export declare const DOM_URL__ROUTE: (CFG: Router | RouterCFG) => HOTask;
