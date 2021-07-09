import { HeadData } from "@-0/keys";
interface apiURL {
    [URL_DATA: string]: {
        [DOM_HEAD: string]: HeadData;
    };
}
export declare const injectHead: (args: apiURL) => void;
export declare const INJECT_HEAD: any;
export {};
