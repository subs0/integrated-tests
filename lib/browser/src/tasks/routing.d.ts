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
export declare const URL_DOM__ROUTE: (CFG: any) => (ACC: any) => ({
    args: {
        STE_PATH: string[];
        STE_DATA: boolean;
    };
    apply(this: Function, thisArg: any, argArray?: any): any;
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    toString(): string;
    prototype: any;
    length: number;
    arguments: any;
    caller: Function;
    name: string;
    [Symbol.hasInstance](value: any): boolean;
} | {
    args: {
        STE_PATH: string[];
        STE_DATA: boolean;
    };
    sub$?: string;
    reso?: (acc: {}, res: {}) => any;
    erro?: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
    work?: (args: any) => any;
    src$?: import("@thi.ng/rstream").ISubscribable<any>;
} | {
    sub$: string;
    args: any;
    reso: (acc: {}, res: {}) => any;
    erro: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
} | {
    sub$: string;
    args: any;
    reso?: undefined;
    erro?: undefined;
} | ((ACC: any) => any) | {
    args: (acc: any) => {
        STE_PATH: any;
        STE_DATA: any;
    };
    apply(this: Function, thisArg: any, argArray?: any): any;
    call(this: Function, thisArg: any, ...argArray: any[]): any;
    bind(this: Function, thisArg: any, ...argArray: any[]): any;
    toString(): string;
    prototype: any;
    length: number;
    arguments: any;
    caller: Function;
    name: string;
    [Symbol.hasInstance](value: any): boolean;
} | {
    args: (acc: any) => {
        STE_PATH: any;
        STE_DATA: any;
    };
    sub$?: string;
    reso?: (acc: {}, res: {}) => any;
    erro?: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
    work?: (args: any) => any;
    src$?: import("@thi.ng/rstream").ISubscribable<any>;
})[];
