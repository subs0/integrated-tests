export declare const URL2obj: (URL_full: string, prefixRGX?: any) => {
    fURL: string;
    subd: any[];
    domn: any[];
    path: any[];
    qery: any;
    hash: string;
};
export declare const obj2URL: (parsed?: {
    fURL: string;
    subd: any[];
    domn: any[];
    path: any[];
    qery: any;
    hash: string;
}, isAbsolute?: boolean) => string;
