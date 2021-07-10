import { RouterCFG, Router } from "@-0/keys";
export declare const URL__ROUTE: (CFG: Router | RouterCFG) => any;
export declare const URL_DOM__ROUTE: (CFG: any) => (ACC: any) => ({
    sub$: any;
    args: any;
    reso: any;
    erro: any;
} | {
    sub$: any;
    args: any;
    reso?: undefined;
    erro?: undefined;
} | {
    args: {
        [x: number]: boolean | string[];
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
        [x: number]: boolean | string[];
    };
    sub$?: string;
    reso?: (acc: {}, res: {}) => any;
    erro?: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
    work?: (args: any) => any;
    src$?: import("@thi.ng/rstream").ISubscribable<any>;
} | ((ACC: any) => any) | {
    args: (acc: any) => {
        [x: number]: any;
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
        [x: number]: any;
    };
    sub$?: string;
    reso?: (acc: {}, res: {}) => any;
    erro?: (acc: {}, err: Error, out$: import("@thi.ng/rstream").ISubscribable<any>) => any;
    work?: (args: any) => any;
    src$?: import("@thi.ng/rstream").ISubscribable<any>;
})[];
