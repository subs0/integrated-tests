import { ISubscribable } from "@thi.ng/rstream/api";
import { IAtom } from "@thi.ng/atom/api";
import * as C from "./constants";
export declare type Accumulator = Record<string, unknown>;
export interface ParsedURL {
    [C.URL_FULL]: string;
    [C.URL_PATH]: string[];
    [C.URL_DOMN]: string[];
    [C.URL_SUBD]: string[];
    [C.URL_QERY]: Record<string, unknown>;
    [C.URL_HASH]: string;
}
export interface TargetDOM {
    [C.DOM_NODE]?: HTMLElement;
    [C.DOM_BODY]?: Record<string, unknown>;
    [C.DOM_HEAD]?: Record<string, unknown>;
}
export interface ICommandObject {
    [C.CMD_ARGS]: any;
    [C.CMD_SUB$]?: string;
    [C.CMD_RESO]?: (acc: Record<string, unknown>, res: Record<string, unknown>) => any;
    [C.CMD_ERRO]?: (acc: Record<string, unknown>, err: Error, out$: ISubscribable<any>) => any;
}
export interface ICommand extends ICommandObject {
    [C.CMD_WORK]: (args: any) => any;
    [C.CMD_SRC$]?: ISubscribable<any>;
}
export declare type Command = ICommandObject | ((acc: Accumulator) => ICommandObject);
export declare type Task = Command[] | HOTask;
export declare type HOTask = (acc: Accumulator) => Task;
export interface HeadData {
    [C.HD_TITL]?: string;
    [C.OG_DESC]?: string;
    [C.OG_IMGU]?: string;
    [C.OG_IMGW]?: string | number;
    [C.OG_IMGH]?: string | number;
    [C.HD_ICON]?: string;
    [C.OG_TYPE]?: string;
}
export declare type Component = (data: any) => any;
export interface RouterHeadBodyData {
    [C.DOM_HEAD]: HeadData;
    [C.DOM_BODY]: any;
}
export interface RouterOutput {
    [C.URL_DATA]: RouterHeadBodyData | any;
    [C.URL_PAGE]: Component;
}
export declare type Router = (path: string) => RouterOutput;
export interface RouterInput {
    [C.URL_FULL]: string;
    [C.DOM_NODE]?: HTMLElement | Window;
}
export interface RouterCFG {
    [C.RTR_PREP]: Command | Task;
    [C.RTR_PRFX]: string;
    [C.RTR_POST]: Command | Task;
    [C.CFG_RUTR]: Router;
}
export interface BootCFG {
    [C.CFG_RUTR]: RouterCFG;
    [C.CFG_RUN$]?: any;
    [C.CFG_STOR]?: IAtom<any>;
    [C.CFG_ROOT]?: HTMLElement;
    [C.CFG_VIEW]?: Component;
    [C.CFG_DRFT]?: Record<string, unknown>;
    [C.CFG_LOG$]?: string;
    [C.CFG_KICK]?: boolean;
}
export interface DefaultDraft {
    [C.$$_PATH]: [];
    [C.$$_LOAD]: boolean;
    [C.$$_VIEW]: Component;
    [C.$$_ROOT]: HTMLElement;
}
