import { HeadData, ICommand } from "@-0/keys";
interface apiURL {
    [URL_DATA: string]: {
        [DOM_HEAD: string]: HeadData;
    };
}
export declare const injectHead: (args: apiURL) => void;
export declare const cmd_inject_head: ICommand;
export {};
