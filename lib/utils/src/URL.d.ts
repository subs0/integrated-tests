export declare const URL2obj: (URL_full: string, prefixRGX?: any) => {
    FURL: string;
    SUBD: any[];
    DOMN: any[];
    PATH: any[];
    QERY: any;
    HASH: string;
};
export declare const obj2URL: (parsed?: {
    FURL: string;
    SUBD: any[];
    DOMN: any[];
    PATH: any[];
    QERY: any;
    HASH: string;
}, isAbsolute?: boolean) => string;
