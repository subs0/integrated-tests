import { CMD_SUB$, CMD_ARGS, CMD_WORK } from "@-0/keys";
export declare const flipFirstCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: ({ id, target }: {
        id: any;
        target: any;
    }) => {
        id: any;
        target: any;
    };
    [CMD_WORK]: ({ id, target }: {
        id: any;
        target: any;
    }) => void;
};
export declare const FLIP_FIRST: any;
export declare const flipLastCMD: {
    [CMD_SUB$]: string;
    [CMD_ARGS]: ({ id, element }: {
        id: any;
        element: any;
    }) => {
        id: any;
        element: any;
    };
    [CMD_WORK]: ({ id, element }: {
        id: any;
        element: any;
    }) => void;
};
export declare const FLIP_LAST_INVERSE_PLAY: any;
