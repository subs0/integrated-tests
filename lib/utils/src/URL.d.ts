export declare const URL2obj: (URL_full: string, prefixRGX?: any) => {
    _FURL: string;
    _SUBD: any[];
    _DOMN: any[];
    _PATH: any[];
    _QERY: any;
    _HASH: string;
};
export declare const obj2URL: (parsed?: {
    _FURL: string;
    _SUBD: any[];
    _DOMN: any[];
    _PATH: any[];
    _QERY: any;
    _HASH: string;
}, isAbsolute?: boolean) => string;
