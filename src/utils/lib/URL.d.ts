import { URL_FULL, URL_SUBD, URL_DOMN, URL_QERY, URL_HASH, URL_PATH } from "@-0/keys";
export declare const URL2obj: (URL_full: string, prefixRGX?: any) => {
    URL: string;
    URL_subdomain: any[];
    URL_domain: any[];
    URL_path: any[];
    URL_query: any;
    URL_hash: string;
};
export declare const obj2URL: (parsed?: {
    URL: string;
    URL_subdomain: any[];
    URL_domain: any[];
    URL_path: any[];
    URL_query: any;
    URL_hash: string;
}, isAbsolute?: boolean) => string;
