import { URL_DATA, CMD_SUB$, CMD_ARGS, CMD_WORK, DOM_HEAD } from "@-0/keys";
interface apiURL {
    [URL_data_: string]: {
        [HEAD_: string]: {
            title: any;
            description: any;
            image: any;
            favicon: any;
            type: any;
        };
    };
}
export declare const injectHeadCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: (acc: any) => {
        [URL_DATA]: any;
    };
    [CMD_WORK]: ({ [URL_DATA]: { [DOM_HEAD]: { title, description, image, favicon, type } } }: apiURL) => void;
};
export declare const INJECT_HEAD: any;
export {};
