import { ISubscribable, ISubscriber } from "@thi.ng/rstream/api";
import * as C from "./constants";
import { PubSub } from "@thi.ng/rstream";
export declare type Accumulator = Record<string, unknown>;
export declare type ICommandObject = {
    [C.CMD_ARGS]: any;
    [C.CMD_SUB$]?: string;
    [C.CMD_RESO]?: (acc: Accumulator, res: any) => any;
    [C.CMD_ERRO]?: (acc: Accumulator, err: Error, out$: PubSub<unknown, unknown, any>) => any;
};
export declare type ICommand = ICommandObject & {
    [C.CMD_WORK]: (args: any) => any;
    [C.CMD_SRC$]?: ISubscribable<any> | ISubscriber<any>;
};
export declare type Command = ICommandObject | HOTask;
export declare type HOTask = (acc: Accumulator) => Task;
export declare type Task = Command[];
export declare type Component = (data: any) => any;
export declare type ParsedURL = {
    [C.URL_FULL]: string;
    [C.URL_PATH]: string[];
    [C.URL_DOMN]: string[];
    [C.URL_SUBD]: string[];
    [C.URL_QERY]: Record<string, unknown>;
    [C.URL_HASH]: string;
};
export declare type TargetDOM = {
    [C.DOM_NODE]?: HTMLElement;
    [C.DOM_BODY]?: Record<string, unknown>;
    [C.DOM_HEAD]?: Record<string, unknown>;
};
export declare type HeadData = {
    [C.HD_TITL]?: string;
    [C.HD_DESC]?: string;
    [C.HD_IMGU]?: string;
    [C.HD_IMGW]?: string | number;
    [C.HD_IMGH]?: string | number;
    [C.HD_ICON]?: string;
    [C.HD_TYPE]?: string;
};
export declare type RouterHeadBodyData = {
    [C.DOM_HEAD]: HeadData;
    [C.DOM_BODY]: any;
};
export declare type RouterOutput = {
    [C.URL_DATA]: RouterHeadBodyData | any;
    [C.URL_PAGE]: Component;
};
export declare type Router = (path: string) => RouterOutput;
export declare type RouterInput = {
    [C.URL_FULL]: string;
    [C.DOM_NODE]?: HTMLElement | Window;
};
export declare type RouterCFG = {
    [C.RTR_PREP]: Command | Task;
    [C.RTR_PRFX]: string;
    [C.RTR_POST]: Command | Task;
    [C.CFG_RUTR]: Router;
};
export declare type DefaultDraft = {
    [C.$$_PATH]: string[];
    [C.$$_LOAD]: boolean;
    [C.$$_VIEW]: Component;
    [C.$$_ROOT]: HTMLElement;
};
