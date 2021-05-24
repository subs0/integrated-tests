import { ISubscribable } from "@thi.ng/rstream/api";
import { IAtom } from "@thi.ng/atom/api";
import * as C from "./constants";
export interface ParsedURL {
    [C.URL_FULL]: string;
    [C.URL_PATH]: [];
    [C.URL_DOMN]: [];
    [C.URL_SUBD]: [];
    [C.URL_QERY]: {};
    [C.URL_HASH]: string;
}
export interface TargetDOM {
    [C.DOM_NODE]?: HTMLElement;
    [C.DOM_BODY]?: {};
    [C.DOM_HEAD]?: {};
}
export interface ICommand {
    [C.CMD_ARGS]: any;
    [C.CMD_SUB$]?: string;
    [C.CMD_RESO]?: (acc: {}, res: {}) => any;
    [C.CMD_ERRO]?: (acc: {}, err: Error, out$: ISubscribable<any>) => any;
    [C.CMD_WORK]?: (args: any) => any;
    [C.CMD_SRC$]?: ISubscribable<any>;
}
export declare type Command = ICommand | Function;
export declare type Accumulator = {};
export declare type HOCommand = (acc: Accumulator) => Command;
export declare type Task = [Command | HOCommand];
export declare type HOTask = (acc: Accumulator) => Task;
export interface BootCFG {
    [C.CFG_RUTR]: {} | Function;
    [C.CFG_RUN$]?: any;
    [C.CFG_STOR]?: IAtom<any>;
    [C.CFG_ROOT]?: HTMLElement;
    [C.CFG_VIEW]?: Function;
    [C.CFG_DRFT]?: {};
    [C.CFG_LOG$]?: string;
    [C.CFG_KICK]?: boolean;
}
export interface DefaultDraft {
    [C.$$_PATH]: [];
    [C.$$_LOAD]: boolean;
    [C.$$_VIEW]: Function;
    [C.$$_ROOT]: HTMLElement;
}
export interface HeadData {
    [C.HD_TITL]?: string;
    [C.OG_DESC]?: string;
    [C.OG_IMGU]?: string;
    [C.OG_IMGW]?: string | Number;
    [C.OG_IMGH]?: string | Number;
    [C.HD_ICON]?: string;
    [C.OG_TYPE]?: string;
}
export interface RouterHeadBodyData {
    [C.DOM_HEAD]: HeadData;
    [C.DOM_BODY]: any;
}
export interface RouterOutput {
    [C.URL_DATA]: RouterHeadBodyData | any;
    [C.URL_PAGE]: any;
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
