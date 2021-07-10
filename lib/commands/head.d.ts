import { HeadData } from "@-0/keys";
interface apiURL {
    [URL_DATA: string]: {
        [DOM_HEAD: string]: HeadData;
    };
}
export declare const injectHead: (args: apiURL) => void;
export declare const cmd_inject_head: {
    sub$: string;
    args: (acc: any) => {
        URL_DATA: any;
    };
    work: (args: apiURL) => void;
};
export {};
