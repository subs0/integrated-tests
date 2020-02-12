import { ISubscribable } from "@thi.ng/rstream";
import { IAtom } from "@thi.ng/atom";
import * as C from "./constants";
export interface ParsedURL {
    [C.URL_FULL]: string;
    [C.URL_PATH]: Array<any>;
    [C.URL_DOMN]: Array<any>;
    [C.URL_SUBD]: Array<any>;
    [C.URL_QERY]: Object;
    [C.URL_HASH]: string;
}
export interface TargetDOM {
    [C.DOM_NODE]?: HTMLElement;
    [C.DOM_BODY]?: Object;
    [C.DOM_HEAD]?: Object;
}
export interface Command {
    [C.CMD_ARGS]: any;
    [C.CMD_SUB$]?: string;
    [C.CMD_RESO]?: (acc: Object, res: Object) => any;
    [C.CMD_ERRO]?: (acc: Object, err: Error) => any;
    [C.CMD_WORK]?: (args: any) => any;
    [C.CMD_SRC$]?: ISubscribable<any>;
}
export interface BootCFG {
    [C.CFG_RUTR]: Object | Function;
    [C.CFG_RUN$]?: any;
    [C.CFG_STOR]?: IAtom<any>;
    [C.CFG_ROOT]?: HTMLElement;
    [C.CFG_VIEW]?: Function;
    [C.CFG_DRFT]?: Object;
    [C.CFG_LOG$]?: string;
    [C.CFG_KICK]?: boolean;
}
export interface DefaultDraft {
    [C.$$_PATH]: Array<any>;
    [C.$$_LOAD]: boolean;
    [C.$$_VIEW]: Function;
    [C.$$_ROOT]: HTMLElement;
    [C.$$_CMDS]: Object;
}
