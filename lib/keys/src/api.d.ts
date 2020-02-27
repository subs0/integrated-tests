import { ISubscribable } from "@thi.ng/rstream";
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
    [C.CMD_ERRO]?: (acc: {}, err: Error) => any;
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
    [C.$$_CMDS]: [];
}
export declare type Router = (path: string) => object;
export interface RouterCFG {
    [C.ROUTER_PREP]: Command | Task;
    [C.ROUTER_PRFX]: string;
    [C.ROUTER_POST]: Command | Task;
    [C.CFG_RUTR]: Router;
}
