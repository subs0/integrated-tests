import { URL_FULL, URL_SUBD, URL_DOMN, URL_QERY, URL_HASH, URL_PATH } from "@-0/keys";
export declare const URL2obj: (URL_full: string, prefixRGX?: any) => {
    URL_FULL: string;
    URL_SUBD: any[];
    URL_DOMN: any[];
    URL_PATH: any[];
    URL_QERY: any;
    URL_HASH: string;
};
export declare const obj2URL: (parsed?: {
    URL_FULL: string;
    URL_SUBD: any[];
    URL_DOMN: any[];
    URL_PATH: any[];
    URL_QERY: any;
    URL_HASH: string;
}, isAbsolute?: boolean) => string;
