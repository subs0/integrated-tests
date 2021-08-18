import { ISubscribable, ISubscriber } from "@thi.ng/rstream/api";
import { CMD_ARGS, CMD_SRC$, CMD_ERRO, CMD_RESO, CMD_SUB$, CMD_WORK, URL_FULL, URL_PATH, URL_DOMN, URL_SUBD, URL_QERY, URL_HASH, DOM_NODE, DOM_BODY, DOM_HEAD, HD_TITL, HD_DESC, HD_IMGU, HD_IMGW, HD_IMGH, HD_ICON, HD_TYPE, URL_DATA, URL_PAGE, RTR_PREP, RTR_PRFX, RTR_POST, CFG_RUTR, $$_PATH, $$_LOAD, $$_VIEW, $$_ROOT } from "./constants";
import { PubSub } from "@thi.ng/rstream";
export declare type Accumulator = Record<string, unknown>;
export declare type ICommandObject = {
    [CMD_ARGS]: any;
    [CMD_SUB$]?: string;
    [CMD_RESO]?: (acc: Accumulator, res: any) => any;
    [CMD_ERRO]?: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export declare type ICommand = ICommandObject & {
    [CMD_WORK]: (args: any) => any;
    [CMD_SRC$]?: ISubscribable<any> | ISubscriber<any>;
};
export declare type Command = ICommandObject | HOTask;
export declare type HOTask = (acc: Accumulator) => Task;
export declare type Task = Command[];
export declare type Component = (data: any) => any;
export declare type ParsedURL = {
    [URL_FULL]: string;
    [URL_PATH]: string[];
    [URL_DOMN]: string[];
    [URL_SUBD]: string[];
    [URL_QERY]: Record<string, unknown>;
    [URL_HASH]: string;
};
export declare type TargetDOM = {
    [DOM_NODE]?: HTMLElement;
    [DOM_BODY]?: Record<string, unknown>;
    [DOM_HEAD]?: Record<string, unknown>;
};
export declare type HeadData = {
    [HD_TITL]?: string;
    [HD_DESC]?: string;
    [HD_IMGU]?: string;
    [HD_IMGW]?: string | number;
    [HD_IMGH]?: string | number;
    [HD_ICON]?: string;
    [HD_TYPE]?: string;
};
export declare type RouterHeadBodyData = {
    [DOM_HEAD]: HeadData;
    [DOM_BODY]: any;
};
export declare type RouterOutput = {
    [URL_DATA]: RouterHeadBodyData | any;
    [URL_PAGE]: Component;
};
export declare type Router = (path: string) => RouterOutput;
export declare type RouterInput = {
    [URL_FULL]: string;
    [DOM_NODE]?: HTMLElement | Window;
};
export declare type RouterCFG = {
    [RTR_PREP]: Command | Task;
    [RTR_PRFX]: string;
    [RTR_POST]: Command | Task;
    [CFG_RUTR]: Router;
};
export declare type DefaultDraft = {
    [$$_PATH]: string[];
    [$$_LOAD]: boolean;
    [$$_VIEW]: Component;
    [$$_ROOT]: HTMLElement;
};
